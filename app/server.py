#!/usr/bin/env python3
"""Grafo Med's loopback-only, dependency-free teaching and evidence service."""
import argparse
import hashlib
import json
import secrets
import sqlite3
import sys
import unicodedata
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
if str(ROOT.parent) not in sys.path:
    sys.path.insert(0, str(ROOT.parent))
from integration import build_snapshot, validate_snapshot
POLICY = 'transparent-v1'
REVIEW_DAYS = 1  # Explicit experimental schedule, not calibrated forgetting prediction.


def now():
    return datetime.now(timezone.utc).isoformat(timespec='microseconds')


def uid():
    return secrets.token_hex(16)


def encoded(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'))


def normalize(value):
    return ' '.join(''.join(c for c in unicodedata.normalize('NFKD', value.lower())
                            if not unicodedata.combining(c)).split())


class AppError(Exception):
    def __init__(self, message, status=400):
        super().__init__(message)
        self.status = status


class Store:
    def __init__(self, path):
        self.path = str(path)
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as db:
            db.execute('PRAGMA journal_mode=WAL')
            db.executescript((ROOT / 'migrations/001_initial.sql').read_text())
        self.ensure_cluster_types()
        self.ensure_retryable_case_attempts()
        self.ensure_learning_unit_schema()

    def learning_unit_rows(self, content, rid):
        nodes={n['id']:n for n in content['nodes']}
        edges=content['edges']
        def decision_for(target):
            if nodes.get(target,{}).get('type')=='decision': return target
            matches=[e['target'] for e in edges if e['source']==target and e['kind']=='supports']
            return matches[0] if matches else None
        teaching=[]; assessments=[]
        for item in content['units']:
            decision=decision_for(item['target_id'])
            if not decision: continue
            teaching.append((decision,item['target_id']==decision,item))
        for item in content['activities']:
            decision=decision_for(item['target_id'])
            if not decision: continue
            assessments.append((decision,item))
        rows=[]
        for decision in sorted({decision for decision,_,_ in teaching}|{decision for decision,_ in assessments}):
            position=0
            for _,_,item in sorted((row for row in teaching if row[0]==decision),key=lambda row:(not row[1],row[2]['id'])):
                position+=1; rows.append((f'teaching:{item["id"]}',rid,decision,'teaching','unit',item['id'],position,encoded(item)))
            for _,item in [row for row in assessments if row[0]==decision]:
                position+=1; rows.append((f'assessment:{item["id"]}',rid,decision,'assessment','activity',item['id'],position,encoded(item)))
        return rows

    def ensure_learning_unit_schema(self):
        """Make learning_units canonical while preserving legacy projections."""
        db=self.connect()
        try:
            db.executescript("""CREATE TABLE IF NOT EXISTS learning_units(
                id TEXT NOT NULL, release_id TEXT NOT NULL REFERENCES releases(id), decision_id TEXT NOT NULL,
                kind TEXT NOT NULL CHECK(kind IN ('teaching','assessment')), ref_type TEXT NOT NULL CHECK(ref_type IN ('unit','activity')),
                ref_id TEXT NOT NULL, position INTEGER NOT NULL, data_json TEXT NOT NULL, PRIMARY KEY(id,release_id),
                FOREIGN KEY(decision_id,release_id) REFERENCES node_versions(node_id,release_id));
            CREATE UNIQUE INDEX IF NOT EXISTS learning_unit_order ON learning_units(release_id,decision_id,position);
            CREATE INDEX IF NOT EXISTS learning_units_decision ON learning_units(release_id,decision_id,kind);""")
            columns={row['name'] for row in db.execute('PRAGMA table_info(runs)').fetchall()}
            if 'learning_unit_id' not in columns:
                db.execute('ALTER TABLE runs ADD COLUMN learning_unit_id TEXT')
            for release in db.execute('SELECT id,content_json FROM releases').fetchall():
                content=json.loads(release['content_json'])
                db.execute('DELETE FROM learning_units WHERE release_id=?',(release['id'],))
                db.executemany('INSERT INTO learning_units VALUES(?,?,?,?,?,?,?,?)',self.learning_unit_rows(content,release['id']))
            db.commit()
        finally:
            db.close()

    def ensure_retryable_case_attempts(self):
        """Allow immutable attempts to be repeated within one practice step."""
        db = self.connect()
        try:
            sql = db.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='attempts'").fetchone()[0]
            db.execute('DROP INDEX IF EXISTS case_step_run')
            if 'run_id TEXT NOT NULL UNIQUE' not in sql:
                db.execute('CREATE INDEX IF NOT EXISTS case_step_run ON runs(case_run_id,step_index) WHERE case_run_id IS NOT NULL')
                return
            db.execute('PRAGMA foreign_keys=OFF')
            db.execute('BEGIN')
            db.execute('DROP TRIGGER IF EXISTS immutable_attempt_update')
            db.execute('DROP TRIGGER IF EXISTS immutable_attempt_delete')
            db.execute("""CREATE TABLE attempts_retryable(
                id TEXT PRIMARY KEY, learner_id TEXT NOT NULL REFERENCES learners(id), run_id TEXT NOT NULL REFERENCES runs(id),
                release_id TEXT NOT NULL REFERENCES releases(id), node_id TEXT NOT NULL REFERENCES nodes(id), response_json TEXT NOT NULL,
                outcome TEXT NOT NULL CHECK(outcome IN ('correct','incorrect','indeterminate')), assisted INTEGER NOT NULL CHECK(assisted IN (0,1)),
                help_json TEXT NOT NULL, critical INTEGER NOT NULL CHECK(critical IN (0,1)), context TEXT NOT NULL, created_at TEXT NOT NULL,
                policy_version TEXT NOT NULL, rubric_version TEXT NOT NULL)""")
            db.execute('INSERT INTO attempts_retryable SELECT * FROM attempts')
            db.execute('DROP TABLE attempts')
            db.execute('ALTER TABLE attempts_retryable RENAME TO attempts')
            db.executescript("""CREATE TRIGGER immutable_attempt_update BEFORE UPDATE ON attempts BEGIN SELECT RAISE(ABORT,'immutable evidence'); END;
CREATE TRIGGER immutable_attempt_delete BEFORE DELETE ON attempts BEGIN SELECT RAISE(ABORT,'immutable evidence'); END;
CREATE INDEX IF NOT EXISTS learner_attempts ON attempts(learner_id,created_at);
CREATE INDEX IF NOT EXISTS case_step_run ON runs(case_run_id,step_index) WHERE case_run_id IS NOT NULL;""")
            db.commit()
        except Exception:
            db.rollback()
            raise
        finally:
            db.execute('PRAGMA foreign_keys=ON')
            db.close()

    def ensure_cluster_types(self):
        """Upgrade the legacy node_versions CHECK constraint for hierarchy levels."""
        db = self.connect()
        try:
            sql = db.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='node_versions'").fetchone()[0]
            if "cluster-maj" in sql and "cluster-min" in sql:
                return
            db.execute('PRAGMA foreign_keys=OFF')
            db.execute('BEGIN')
            db.execute('DROP TRIGGER IF EXISTS edge_types')
            db.execute("""CREATE TABLE node_versions_hierarchy (
                node_id TEXT NOT NULL REFERENCES nodes(id), release_id TEXT NOT NULL REFERENCES releases(id),
                type TEXT NOT NULL CHECK(type IN ('cluster','cluster-maj','cluster-min','mastery','decision','concept','rule','procedure')),
                title TEXT NOT NULL, description TEXT NOT NULL,
                PRIMARY KEY(node_id,release_id))""")
            db.execute('INSERT INTO node_versions_hierarchy SELECT node_id,release_id,type,title,description FROM node_versions')
            db.execute('DROP TABLE node_versions')
            db.execute('ALTER TABLE node_versions_hierarchy RENAME TO node_versions')
            db.executescript("""CREATE TRIGGER edge_types BEFORE INSERT ON edges BEGIN
 SELECT CASE WHEN NEW.kind='contains' AND NOT (
  (SELECT type FROM node_versions WHERE node_id=NEW.source AND release_id=NEW.release_id) IN ('cluster','cluster-maj','cluster-min') AND
  (SELECT type FROM node_versions WHERE node_id=NEW.target AND release_id=NEW.release_id) IN ('cluster','cluster-maj','cluster-min','mastery','concept')) THEN RAISE(ABORT,'invalid containment types') END;
 SELECT CASE WHEN NEW.kind='integrates' AND NOT (
  (SELECT type FROM node_versions WHERE node_id=NEW.source AND release_id=NEW.release_id)='mastery' AND
  (SELECT type FROM node_versions WHERE node_id=NEW.target AND release_id=NEW.release_id)='decision') THEN RAISE(ABORT,'invalid integration types') END;
 SELECT CASE WHEN NEW.kind='supports' AND NOT (
  (SELECT type FROM node_versions WHERE node_id=NEW.source AND release_id=NEW.release_id) IN ('concept','rule','procedure') AND
  (SELECT type FROM node_versions WHERE node_id=NEW.target AND release_id=NEW.release_id)='decision') THEN RAISE(ABORT,'invalid support types') END;
 SELECT CASE WHEN NEW.kind='requires' AND EXISTS(
  WITH RECURSIVE path(id) AS (SELECT NEW.target UNION SELECT e.target FROM edges e JOIN path p ON e.source=p.id WHERE e.kind='requires' AND e.release_id=NEW.release_id)
  SELECT 1 FROM path WHERE id=NEW.source) THEN RAISE(ABORT,'prerequisite cycle') END;
END""")
            db.commit()
        except Exception:
            db.rollback()
            raise
        finally:
            db.execute('PRAGMA foreign_keys=ON')
            db.close()

    def connect(self):
        db = sqlite3.connect(self.path, timeout=10)
        db.row_factory = sqlite3.Row
        db.execute('PRAGMA foreign_keys=ON')
        db.execute('PRAGMA busy_timeout=10000')
        return db

    @contextmanager
    def transaction(self):
        db = self.connect()
        try:
            db.execute('BEGIN IMMEDIATE')
            yield db
            db.commit()
        except Exception:
            db.rollback()
            raise
        finally:
            db.close()

    def install(self, content):
        validate_content(content)
        release = content['release']
        rid = release['id']
        digest = hashlib.sha256(encoded(content).encode()).hexdigest()
        with self.transaction() as db:
            previous = db.execute('SELECT digest FROM releases WHERE id=?', (rid,)).fetchone()
            if previous:
                if previous['digest'] != digest:
                    raise AppError('Release content changed: create a new release ID/version instead.')
                return
            db.execute('INSERT INTO releases VALUES(?,?,?,?,?,?,?)',
                       (rid, release['version'], release['title'], release['status'], digest, encoded(content), now()))
            for n in content['nodes']:
                db.execute('INSERT OR IGNORE INTO nodes VALUES(?)', (n['id'],))
                db.execute('INSERT INTO node_versions VALUES(?,?,?,?,?)',
                           (n['id'], rid, n['type'], n['title'], n.get('description', '')))
            for edge in content['edges']:
                db.execute('INSERT INTO edges VALUES(?,?,?,?)', (rid, edge['source'], edge['target'], edge['kind']))
            for u in content['units']:
                db.execute('INSERT INTO units VALUES(?,?,?,?)', (u['id'], rid, u['target_id'], encoded(u)))
            for a in content['activities']:
                db.execute('INSERT INTO activities VALUES(?,?,?,?,?,?)',
                           (a['id'], rid, a['target_id'], a['format'], a['phase'], encoded(a)))
                db.execute('INSERT INTO activity_targets VALUES(?,?,?,?)', (a['id'], rid, a['target_id'], 'direct'))
            db.executemany('INSERT INTO learning_units VALUES(?,?,?,?,?,?,?,?)',self.learning_unit_rows(content,rid))
            for c in content['cases']:
                db.execute('INSERT INTO cases VALUES(?,?,?,?,?)', (c['id'], rid, c['mastery_id'], c['mode'], encoded(c)))
                for index, step in enumerate(c['steps']):
                    db.execute('INSERT INTO case_steps VALUES(?,?,?,?,?,?)',
                               (c['id'], rid, index, step['activity_id'], step['context'], int(step.get('supplied', False))))

    def active(self, db):
        row = db.execute('SELECT * FROM releases ORDER BY installed_at DESC,id DESC LIMIT 1').fetchone()
        if not row:
            raise AppError('No hay contenido instalado.', 503)
        return row

    def content(self, db, rid=None):
        row = db.execute('SELECT * FROM releases WHERE id=?', (rid,)).fetchone() if rid else self.active(db)
        return json.loads(row['content_json'])

    def session(self, token):
        with self.connect() as db:
            row = db.execute('SELECT learners.* FROM sessions JOIN learners ON learners.id=sessions.learner_id '
                             'WHERE token_hash=? AND expires_at>?',
                             (hashlib.sha256(token.encode()).hexdigest(), now())).fetchone()
            return dict(row) if row else None

    def profile(self, name):
        if not isinstance(name, str) or not 1 <= len(name.strip()) <= 60:
            raise AppError('Usa un nombre local de 1 a 60 caracteres.')
        learner, token = {'id': uid(), 'name': name.strip()}, secrets.token_urlsafe(32)
        with self.transaction() as db:
            db.execute('INSERT INTO learners VALUES(?,?,?)', (learner['id'], learner['name'], now()))
            db.execute('INSERT INTO sessions VALUES(?,?,?)', (hashlib.sha256(token.encode()).hexdigest(), learner['id'],
                       (datetime.now(timezone.utc) + timedelta(days=30)).isoformat()))
        return learner, token

    def event(self, db, learner, rid, kind, payload):
        db.execute('INSERT INTO events VALUES(?,?,?,?,?,?)', (uid(), learner, rid, kind, encoded(payload), now()))

    def visible_attempts(self, db, learner, rid=None):
        sql = ('SELECT a.*,r.activity_id,r.case_run_id FROM attempts a JOIN runs r ON r.id=a.run_id '
               'LEFT JOIN case_runs cr ON cr.id=r.case_run_id LEFT JOIN cases c ON c.id=cr.case_id AND c.release_id=cr.release_id '
               "WHERE a.learner_id=? AND (r.case_run_id IS NULL OR c.mode='practice' OR cr.closed=1)")
        args = [learner]
        if rid:
            sql += ' AND a.release_id=?'
            args.append(rid)
        return [dict(r) for r in db.execute(sql + ' ORDER BY a.created_at,a.id', args)]

    def states(self, db, learner, content):
        rid = content['release']['id']
        attempts = self.visible_attempts(db, learner, rid)
        activities = {a['id']: a for a in content['activities']}
        states = []
        for node in content['nodes']:
            if node['type'] == 'cluster':
                continue
            direct = [a for a in attempts if a['node_id'] == node['id']]
            if node['type'] == 'mastery':
                # Integration observations exist only for complete cases; never copy all child successes.
                direct = []
                for cr in db.execute('SELECT * FROM case_runs WHERE learner_id=? AND release_id=? AND closed=1 ORDER BY created_at', (learner, rid)):
                    case = next(c for c in content['cases'] if c['id'] == cr['case_id'])
                    if case['mastery_id'] != node['id']:
                        continue
                    aa = [a for a in attempts if a['case_run_id'] == cr['id']]
                    outcome = ('incorrect' if any(a['outcome'] == 'incorrect' or a['critical'] for a in aa) else
                               'indeterminate' if any(a['outcome'] == 'indeterminate' for a in aa) else 'correct')
                    direct.append({'outcome': outcome, 'assisted': int(any(a['assisted'] for a in aa)),
                                   'critical': int(any(a['critical'] for a in aa)), 'context': case['id'],
                                   'created_at': max(a['created_at'] for a in aa), 'activity_id': None})
            direct.sort(key=lambda a:a['created_at'])
            independent = sum(a['outcome'] == 'correct' and not a['assisted'] for a in direct)
            assisted = sum(a['outcome'] == 'correct' and a['assisted'] for a in direct)
            errors = sum(a['outcome'] == 'incorrect' for a in direct)
            last = direct[-1] if direct else None
            successes = [a for a in direct if a['outcome'] == 'correct' and not a['assisted']]
            retention = 'pending'
            for a in direct:
                prior = [p for p in successes if p['created_at'] < a['created_at']]
                delayed = prior and datetime.fromisoformat(a['created_at']) - datetime.fromisoformat(prior[0]['created_at']) >= timedelta(days=REVIEW_DAYS)
                if delayed and not a['assisted']:
                    retention = 'demonstrated' if a['outcome'] == 'correct' else 'needs_review' if a['outcome'] == 'incorrect' else retention
            if not last:
                status = 'not_observed'
            elif last['outcome'] == 'indeterminate':
                status = 'needs_review'
            elif last['outcome'] == 'incorrect' or last['critical']:
                status = 'needs_practice'
            elif last['assisted']:
                status = 'with_help'
            else:
                status = 'independent'
            due = (datetime.fromisoformat(successes[-1]['created_at']) + timedelta(days=REVIEW_DAYS)).isoformat() if successes else None
            states.append({'node_id': node['id'], 'title': node['title'], 'status': status,
                           'independent': independent, 'assisted': assisted, 'errors': errors,
                           'contexts': sorted({a['context'] for a in successes}), 'last_at': last['created_at'] if last else None,
                           'due_at': due, 'retention': retention, 'critical_errors': sum(a['critical'] for a in direct)})
        return states

    def route(self, db, learner, content, states, seen):
        case_ids = {s['activity_id'] for c in content['cases'] for s in c['steps']}
        activities = [a for a in content['activities'] if a['id'] not in case_ids]
        attempts = self.visible_attempts(db, learner, content['release']['id'])
        completed = {a['activity_id'] for a in attempts if a['outcome'] == 'correct' and not a['assisted']}
        state_map = {s['node_id']: s for s in states}
        decisions = [n for n in content['nodes'] if n['type'] == 'decision']
        def ready(node_id):
            dependencies = [e['target'] for e in content['edges'] if e['source'] == node_id and e['kind'] == 'requires']
            return all(state_map.get(d, {}).get('independent', 0) > 0 and state_map[d]['status'] == 'independent' for d in dependencies)
        for n in decisions:
            s = state_map[n['id']]
            if not ready(n['id']):
                continue
            aa = [a for a in activities if a['target_id'] == n['id']]
            unit = next((u for u in content['units'] if u['target_id'] == n['id']), None)
            if not s['independent'] and unit and unit['id'] not in seen:
                return {'kind': 'teach', 'id': unit['id'], 'title': unit['title'], 'reason': 'Una explicación y un ejemplo antes de decidir.'}
            if s['status'] in ('needs_practice', 'needs_review', 'with_help'):
                choice = next((a for a in aa if a['phase'] == 'guided'), aa[0] if aa else None)
                # After an assisted/guided success move to an independent variant, not a permanent scaffold loop.
                last = next((a for a in reversed(attempts) if a['node_id'] == n['id']), None)
                if last and last['outcome'] == 'correct':
                    choice = next((a for a in aa if a['phase'] == 'independent'), choice)
                if choice:
                    return {'kind': 'practice', 'id': choice['id'], 'title': choice['title'], 'reason': 'Cambia de ejemplo y retira el apoyo; el error no borra tus logros previos.'}
            if s['due_at'] and s['due_at'] <= now():
                choice = next((a for a in aa if a['phase'] == 'review'), None)
                if choice:
                    return {'kind': 'review', 'id': choice['id'], 'title': choice['title'], 'reason': 'Comprobación diferida; el intervalo de un día es experimental.'}
            if not s['independent']:
                choice = next((a for a in aa if a['phase'] == 'independent' and a['id'] not in completed), None)
                if choice:
                    return {'kind': 'practice', 'id': choice['id'], 'title': choice['title'], 'reason': 'Comprueba el principio en una decisión sin pistas.'}
        for n in content['nodes']:
            if n['type'] not in ('rule','procedure'):
                continue
            s=state_map[n['id']]
            if s['status']!='independent' or (s['due_at'] and s['due_at']<=now()):
                choice=next((a for a in activities if a['target_id']==n['id']),None)
                if choice:
                    return {'kind':'practice','id':choice['id'],'title':choice['title'],'reason':'Comprueba directamente esta regla o procedimiento; no lo inferimos de otro acierto.'}
        closed = {r['case_id'] for r in db.execute('SELECT case_id FROM case_runs WHERE learner_id=? AND release_id=? AND closed=1', (learner, content['release']['id']))}
        for case in content['cases']:
            if case['id'] not in closed:
                return {'kind': 'case', 'id': case['id'], 'title': case['title'], 'reason': 'Integra varias decisiones; cada paso conserva su contexto y ayuda.'}
        for n in content['nodes']:
            if n['type']!='mastery':
                continue
            s=state_map[n['id']]
            if s['status']!='independent' or (s['due_at'] and s['due_at']<=now()):
                mode='practice' if s['status'] in ('needs_practice','needs_review') else 'evaluation'
                case=next((c for c in content['cases'] if c['mastery_id']==n['id'] and c['mode']==mode),None)
                if case:
                    return {'kind':'case','id':case['id'],'title':case['title'],'reason':'Cerrar casos no equivale a resolverlos: revisa la integración pendiente o compruébala sin ayuda registrada.'}
        return {'kind': 'complete', 'id': '', 'title': 'Recorrido completado', 'reason': 'Puedes explorar otra variante. La retención se comprueba después; completar no certifica competencia clínica.'}

    def bootstrap(self, learner):
        with self.connect() as db:
            content = self.content(db)
            rid = content['release']['id']
            states = self.states(db, learner['id'], content)
            events = [dict(r) for r in db.execute("SELECT * FROM events WHERE learner_id=? AND release_id=? AND kind='teach'", (learner['id'], rid))]
            seen = sorted({json.loads(e['payload_json'])['unit_id'] for e in events})
            attempts = self.visible_attempts(db, learner['id'], rid)
            learning_units=[dict(row) for row in db.execute('SELECT id,decision_id,kind,ref_type,ref_id,position,data_json FROM learning_units WHERE release_id=? ORDER BY decision_id,position',(rid,)).fetchall()]
            for learning_unit in learning_units:
                payload=json.loads(learning_unit.pop('data_json'))
                learning_unit.update({'title':payload.get('title',''),'target_id':payload.get('target_id'),'format':payload.get('format')})
            case_ids = {s['activity_id'] for c in content['cases'] for s in c['steps']}
            return {'learner': learner, 'release': content['release'], 'nodes': content['nodes'], 'edges': content['edges'],
                    'sources': content['sources'], 'units': content['units'], 'learning_units': learning_units, 'seen_units': seen, 'states': states,
                    # The learner map needs every decision activity to render an
                    # honest path. Case membership does not make a decision
                    # unavailable; the cases surface the same activity in a
                    # different context and remain separately listed below.
                    'activities': [{k: a[k] for k in ('id','title','target_id','format','phase','context')} for a in content['activities']],
                    'cases': [{k: c[k] for k in ('id','title','mode','description','mastery_id')} | ({'route_decision_id': c['route_decision_id']} if c.get('route_decision_id') else {}) | {'step_count': len(c['steps'])} for c in content['cases']],
                    'next': self.route(db, learner['id'], content, states, seen),
                    'recent': list(reversed(attempts[-12:])),
                    'stats': {'attempts': len(attempts), 'independent': sum(a['outcome']=='correct' and not a['assisted'] for a in attempts),
                              'assisted': sum(a['outcome']=='correct' and a['assisted'] for a in attempts), 'units_seen': len(seen)}}

    def teach(self, learner, unit_id):
        with self.transaction() as db:
            rid = self.active(db)['id']
            if not db.execute('SELECT 1 FROM units WHERE id=? AND release_id=?', (unit_id,rid)).fetchone():
                raise AppError('Unidad no encontrada.',404)
            self.event(db, learner, rid, 'teach', {'unit_id':unit_id})
            # Reading during an open attempt is disclosed help, not independent recall.
            for run in db.execute('SELECT * FROM runs WHERE learner_id=? AND closed=0 AND release_id=?',(learner,rid)).fetchall():
                help_used=json.loads(run['help_json'])
                marker='instruction_opened:'+unit_id
                if marker not in help_used:
                    help_used.append(marker)
                    db.execute('UPDATE runs SET help_json=? WHERE id=?',(encoded(help_used),run['id']))
        return {'ok':True}

    def feedback_exposure(self,db,learner,rid,source_run):
        """Cross-task answer feedback can contaminate any concurrently open check."""
        self.event(db,learner,rid,'feedback_disclosed',{'run_id':source_run})
        for run in db.execute('SELECT * FROM runs WHERE learner_id=? AND closed=0',(learner,)).fetchall():
            help_used=json.loads(run['help_json'])
            marker='feedback_from_other_attempt'
            if marker not in help_used:
                help_used.append(marker)
                db.execute('UPDATE runs SET help_json=? WHERE id=?',(encoded(help_used),run['id']))

    def activity(self, db, activity_id, rid):
        row = db.execute('SELECT data_json FROM activities WHERE id=? AND release_id=?', (activity_id,rid)).fetchone()
        if not row:
            raise AppError('Actividad no encontrada.',404)
        return json.loads(row['data_json'])

    def public_activity(self, activity):
        return {k: activity[k] for k in ('id','title','prompt','format','options','phase','context','target_id') if k in activity}

    def new_run(self, db, learner, aid, rid, case_run=None, index=None, supplied=False):
        activity = self.activity(db,aid,rid)
        learning_unit_id=f'assessment:{aid}'
        help_used = []
        if supplied:
            help_used.append('canonical_continuation')
        if activity['phase'] == 'guided':
            help_used.append('guided_format')
        if case_run:
            case_created=db.execute('SELECT created_at FROM case_runs WHERE id=?',(case_run,)).fetchone()['created_at']
            if db.execute("SELECT 1 FROM events WHERE learner_id=? AND kind IN ('teach','feedback_disclosed') AND created_at>=? LIMIT 1",(learner,case_created)).fetchone():
                help_used.append('learning_support_during_case')
        run_id=uid()
        db.execute('INSERT INTO runs(id,learner_id,activity_id,release_id,learning_unit_id,case_run_id,step_index,help_json,closed,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)',
                   (run_id,learner,aid,rid,learning_unit_id,case_run,index,encoded(help_used),0,now()))
        self.event(db,learner,rid,'activity_started',{'run_id':run_id,'activity_id':aid,'case_run_id':case_run})
        return {'run_id':run_id,'activity':self.public_activity(activity)}

    def start(self,learner,aid):
        with self.transaction() as db:
            rid=self.active(db)['id']
            # A decision can be practiced from its route and later revisited
            # inside an integrating case. The case is an additional context,
            # not a gate that makes the route station appear clickable but fail.
            return self.new_run(db,learner,aid,rid)

    def run(self,db,learner,run_id):
        row=db.execute('SELECT * FROM runs WHERE id=? AND learner_id=?',(run_id,learner)).fetchone()
        if not row:
            raise AppError('Intento no encontrado.',404)
        return row

    def hint(self,learner,run_id):
        with self.transaction() as db:
            run=self.run(db,learner,run_id)
            if run['closed']:
                raise AppError('Intento cerrado.',409)
            if run['case_run_id']:
                mode=db.execute('SELECT c.mode FROM cases c JOIN case_runs cr ON cr.case_id=c.id AND cr.release_id=c.release_id WHERE cr.id=?',(run['case_run_id'],)).fetchone()['mode']
                if mode=='evaluation':
                    raise AppError('Las pistas no están disponibles durante la evaluación.',403)
            activity=self.activity(db,run['activity_id'],run['release_id'])
            help_used=json.loads(run['help_json'])
            if 'hint' not in help_used:
                help_used.append('hint')
                db.execute('UPDATE runs SET help_json=? WHERE id=?',(encoded(help_used),run_id))
                self.event(db,learner,run['release_id'],'hint',{'run_id':run_id,'text':activity['hint']})
            return {'hint':activity['hint']}

    def score(self,activity,response):
        fmt=activity['format']
        options={o['id'] for o in activity.get('options',[])}
        if fmt=='short':
            if not isinstance(response,str) or not 1<=len(response.strip())<=1000:
                raise AppError('Escribe una respuesta breve.')
            accepted=activity.get('accepted',[])+([activity['answer']] if isinstance(activity.get('answer'),str) else [])
            # Unrecognized free text is not automatically wrong; preserve scorer uncertainty.
            outcome='correct' if normalize(response) in {normalize(v) for v in accepted} else 'indeterminate'
        elif fmt=='choice':
            if not isinstance(response,str) or response not in options:
                raise AppError('Selecciona una opción válida.')
            outcome='correct' if response==activity['answer'] else 'incorrect'
        else:
            if not isinstance(response,list) or not all(isinstance(v,str) and v in options for v in response) or len(set(response))!=len(response):
                raise AppError('Selecciona opciones válidas sin duplicados.')
            if fmt=='order' and set(response)!=options:
                raise AppError('Ordena todos los elementos.')
            correct=set(response)==set(activity['answer']) if fmt=='multi' else response==activity['answer']
            if fmt=='order' and activity.get('order_constraints'):
                correct=all(response.index(a)<response.index(b) for a,b in activity['order_constraints'])
            outcome='correct' if correct else 'incorrect'
        critical=bool(outcome=='incorrect' and activity.get('critical') and response in activity.get('critical_responses',[]))
        return outcome,critical

    def record_attempt(self,db,learner,run,response):
        if run['closed']:
            raise AppError('Intento ya cerrado; abre otra variante.',409)
        activity=self.activity(db,run['activity_id'],run['release_id'])
        outcome,critical=self.score(activity,response)
        aid=uid()
        help_used=json.loads(run['help_json'])
        db.execute('INSERT INTO attempts VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                   (aid,learner,run['id'],run['release_id'],activity['target_id'],encoded(response),outcome,int(bool(help_used)),
                    encoded(help_used),int(critical),activity['context'],now(),POLICY,run['release_id']+':'+activity['id']))
        db.execute('UPDATE runs SET closed=1 WHERE id=?',(run['id'],))
        self.event(db,learner,run['release_id'],'response_submitted',{'attempt_id':aid,'run_id':run['id']})
        remediation=None
        if outcome!='correct':
            row=db.execute('SELECT data_json FROM units WHERE release_id=? AND target_id=? LIMIT 1',(run['release_id'],activity['target_id'])).fetchone()
            if not row:
                row=db.execute("SELECT u.data_json FROM units u JOIN edges e ON e.target=u.target_id AND e.release_id=u.release_id WHERE e.source=? AND e.release_id=? AND e.kind='supports' ORDER BY u.id LIMIT 1",(activity['target_id'],run['release_id'])).fetchone()
            if row:
                unit=json.loads(row['data_json'])
                remediation={'unit_id':unit['id'],'body':unit['alternative']}
        feedback=activity['feedback']
        if outcome=='indeterminate':
            feedback='Tu respuesta requiere revisión: la clave automática no permite juzgarla. No la contamos como error. '+feedback
        return {'outcome':outcome,'feedback':feedback,'assisted':bool(help_used),'critical':critical,'remediation':remediation}

    def cached(self,db,learner,key,request):
        if not isinstance(key,str) or not 8<=len(key)<=120:
            raise AppError('Se requiere una clave de envío válida.')
        row=db.execute('SELECT * FROM submissions WHERE learner_id=? AND idempotency_key=?',(learner,key)).fetchone()
        if row:
            if row['request_json']!=encoded(request):
                raise AppError('Clave de envío reutilizada con otra respuesta.',409)
            return json.loads(row['response_json'])
        return None

    def cache(self,db,learner,key,request,response):
        db.execute('INSERT INTO submissions VALUES(?,?,?,?)',(learner,key,encoded(request),encoded(response)))

    def submit(self,learner,run_id,response,key):
        request={'run_id':run_id,'response':response,'kind':'standalone'}
        with self.transaction() as db:
            cached=self.cached(db,learner,key,request)
            if cached is not None:
                return cached
            run=self.run(db,learner,run_id)
            if run['case_run_id']:
                raise AppError('Usa el flujo del caso.',409)
            result=self.record_attempt(db,learner,run,response)
            self.feedback_exposure(db,learner,run['release_id'],run['id'])
            content=self.content(db,run['release_id'])
            result['state']=next(s for s in self.states(db,learner,content) if s['node_id']==self.activity(db,run['activity_id'],run['release_id'])['target_id'])
            self.cache(db,learner,key,request,result)
            return result

    def case_payload(self,db,learner,cr):
        case=json.loads(db.execute('SELECT data_json FROM cases WHERE id=? AND release_id=?',(cr['case_id'],cr['release_id'])).fetchone()['data_json'])
        index=cr['position']
        step=case['steps'][index]
        row=db.execute('SELECT id,closed FROM runs WHERE case_run_id=? AND step_index=?',(cr['id'],index)).fetchone()
        if row:
            if row['closed']:
                # Practice-mode remediation reuses the step run after the
                # failed attempt; attempts remain separately recorded.
                db.execute('UPDATE runs SET closed=0 WHERE id=?',(row['id'],))
            run={'run_id':row['id'],'activity':self.public_activity(self.activity(db,step['activity_id'],cr['release_id']))}
        else:
            # Earlier feedback in practice is also assistance relevant to following decisions.
            run=self.new_run(db,learner,step['activity_id'],cr['release_id'],cr['id'],index,step.get('supplied',False) or (index>0 and case['mode']=='practice'))
        return {'case_run_id':cr['id'],'step_index':index,'total':len(case['steps']),'mode':case['mode'],'context':step['context'],**run}

    def case_start(self,learner,case_id):
        with self.transaction() as db:
            rid=self.active(db)['id']
            if not db.execute('SELECT 1 FROM cases WHERE id=? AND release_id=?',(case_id,rid)).fetchone():
                raise AppError('Caso no encontrado.',404)
            cr=db.execute('SELECT * FROM case_runs WHERE learner_id=? AND case_id=? AND release_id=? AND closed=0 ORDER BY created_at DESC LIMIT 1',(learner,case_id,rid)).fetchone()
            if not cr:
                cid=uid()
                db.execute('INSERT INTO case_runs VALUES(?,?,?,?,?,?,?)',(cid,learner,case_id,rid,0,0,now()))
                cr=db.execute('SELECT * FROM case_runs WHERE id=?',(cid,)).fetchone()
            return self.case_payload(db,learner,cr)

    def case_answer(self,learner,cid,run_id,response,key):
        request={'case_run_id':cid,'run_id':run_id,'response':response,'kind':'case'}
        with self.transaction() as db:
            cached=self.cached(db,learner,key,request)
            if cached is not None:
                return cached
            cr=db.execute('SELECT * FROM case_runs WHERE id=? AND learner_id=?',(cid,learner)).fetchone()
            if not cr:
                raise AppError('Caso no encontrado.',404)
            run=self.run(db,learner,run_id)
            if cr['closed'] or run['case_run_id']!=cid or run['step_index']!=cr['position']:
                raise AppError('El paso no es el activo.',409)
            result=self.record_attempt(db,learner,run,response)
            case=json.loads(db.execute('SELECT data_json FROM cases WHERE id=? AND release_id=?',(cr['case_id'],cr['release_id'])).fetchone()['data_json'])
            # In learning mode, an incorrect response is a remediation loop:
            # record the attempt, keep the learner on this assessment unit and
            # issue a fresh run for the retry. The route cannot advance until
            # the current unit is answered correctly.
            advance=not (case['mode']=='practice' and result['outcome']!='correct')
            next_index=cr['position']+1 if advance else cr['position']
            done=next_index>=len(case['steps'])
            db.execute('UPDATE case_runs SET position=?,closed=? WHERE id=?',(next_index,int(done),cid))
            if done or case['mode']=='practice':
                self.feedback_exposure(db,learner,cr['release_id'],run['id'])
            if done:
                results=[]
                for row in db.execute('SELECT a.*,r.activity_id FROM attempts a JOIN runs r ON r.id=a.run_id WHERE r.case_run_id=? ORDER BY r.step_index',(cid,)):
                    a=self.activity(db,row['activity_id'],cr['release_id'])
                    results.append({'title':a['title'],'outcome':row['outcome'],'feedback':a['feedback'],'assisted':bool(row['assisted']),'critical':bool(row['critical'])})
                payload={'done':True,'summary':{'title':case['title'],'results':results,
                         'message':'Caso completado. La integración observada no certifica todos los apoyos ni competencia clínica.'}}
                self.event(db,learner,cr['release_id'],'case_completed',{'case_run_id':cid,'case_id':case['id']})
            else:
                updated=db.execute('SELECT * FROM case_runs WHERE id=?',(cid,)).fetchone()
                payload={'done':False,**self.case_payload(db,learner,updated),
                         'previous':{'outcome':result['outcome'],'feedback':result['feedback']} if case['mode']=='practice' else None}
            self.cache(db,learner,key,request,payload)
            return payload

    def export(self,learner):
        with self.connect() as db:
            content=self.content(db)
            attempts=self.visible_attempts(db,learner['id'])
            # Export cannot act as an answer oracle for an unfinished evaluation.
            allowed_runs={a['run_id'] for a in attempts}
            events=[]
            for row in db.execute('SELECT * FROM events WHERE learner_id=? ORDER BY created_at',(learner['id'],)):
                event=dict(row)
                payload=json.loads(event.pop('payload_json'))
                if payload.get('run_id') and payload['run_id'] not in allowed_runs:
                    continue
                event['payload']=payload
                events.append(event)
            return {'learner':learner,'exported_at':now(),'policy_version':POLICY,'release':content['release'],
                    'attempts':attempts,'events':events,'states':self.states(db,learner['id'],content),
                    'notice':'Datos educativos locales. No certifican competencia clínica.'}


def validate_content(c):
    """Fail closed before opening an install transaction; no draft with dangling keys."""
    if not isinstance(c,dict):
        raise AppError('Content must be an object.')
    for key in ('release','sources','nodes','edges','units','activities','cases'):
        if key not in c:
            raise AppError('Missing content field '+key)
    if c['release'].get('status') not in ('candidate','reviewed'):
        raise AppError('Invalid release status.')
    for collection in ('sources','nodes','units','activities','cases'):
        ids=[item['id'] for item in c[collection]]
        if len(ids)!=len(set(ids)):
            raise AppError('Duplicate IDs in '+collection)
    nodes={n['id']:n for n in c['nodes']}
    sources={s['id'] for s in c['sources']}
    activities={a['id']:a for a in c['activities']}
    for x in c['units']+c['activities']:
        if x['target_id'] not in nodes or not x.get('source_ids') or not set(x['source_ids'])<=sources:
            raise AppError('Missing target or source mapping: '+x['id'])
    for a in c['activities']:
        options=[o['id'] for o in a.get('options',[])]
        if len(options)!=len(set(options)):
            raise AppError('Duplicate option IDs.')
        if a['format']=='choice' and a['answer'] not in options:
            raise AppError('Invalid choice answer.')
        if a['format'] in ('multi','order') and (not isinstance(a['answer'],list) or not set(a['answer'])<=set(options)):
            raise AppError('Invalid array answer.')
        if a['format']=='order' and set(a['answer'])!=set(options):
            raise AppError('Ordering key must cover options.')
        if not a.get('hint') or not a.get('feedback'):
            raise AppError('Missing instructional feedback.')
    for case in c['cases']:
        if nodes.get(case['mastery_id'],{}).get('type')!='mastery' or len(case['steps'])<2:
            raise AppError('Case requires an integrated mastery and multiple steps.')
        for step in case['steps']:
            if step['activity_id'] not in activities or not step.get('context'):
                raise AppError('Invalid case step.')


class Handler(BaseHTTPRequestHandler):
    server_version='GrafoMed/1'

    def headers_safe(self):
        host=self.headers.get('Host','')
        allowed={f'127.0.0.1:{self.server.server_port}',f'localhost:{self.server.server_port}'}
        if host not in allowed:
            raise AppError('Host no permitido.',403)
        origin=self.headers.get('Origin')
        if origin and origin!='http://'+host:
            raise AppError('Origen no permitido.',403)

    def get_token(self):
        cookie=SimpleCookie()
        try:
            cookie.load(self.headers.get('Cookie',''))
            return cookie['gm_session'].value if 'gm_session' in cookie else ''
        except Exception:
            return ''

    def csrf(self,token):
        return hashlib.sha256(('grafomed-csrf:'+token).encode()).hexdigest()

    def send(self,data,status=200,cookie=None,content_type='application/json; charset=utf-8'):
        body=encoded(data).encode() if not isinstance(data,bytes) else data
        self.send_response(status)
        self.send_header('Content-Type',content_type)
        self.send_header('Content-Length',str(len(body)))
        self.send_header('Cache-Control','no-store')
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('Referrer-Policy','no-referrer')
        self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
        if cookie:
            self.send_header('Set-Cookie',f'gm_session={cookie}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000')
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        try:
            self.headers_safe()
            path=urlsplit(self.path).path
            if path=='/api/health':
                return self.send({'ok':True,'schema_version':1})
            if path=='/api/integration':
                with self.server.store.connect() as db:
                    release = self.server.store.active(db)
                    metadata = {'id': release['id'], 'version': release['version'], 'status': release['status'], 'title': release['title']}
                snapshot = build_snapshot(metadata)
                errors = validate_snapshot(snapshot)
                if errors:
                    raise AppError('Snapshot de integración inválido: '+', '.join(errors), 500)
                return self.send(snapshot)
            if not path.startswith('/api/'):
                files={'/':ROOT/'static/index.html','/index.html':ROOT/'static/index.html','/app.js':ROOT/'static/app.js','/styles.css':ROOT/'static/styles.css',
                       '/builder.html':ROOT/'static/builder.html','/builder.js':ROOT/'static/builder.js','/builder.css':ROOT/'static/builder.css',
                       '/catalog.html':ROOT/'static/catalog.html','/catalog.js':ROOT/'static/catalog.js','/catalog.css':ROOT/'static/catalog.css',
                       '/assets/usamedic-logo-horizontal.png':ROOT.parent/'prototypes/learner-app-v0/assets/usamedic-logo-horizontal.png',
                       '/viewer/index.html':ROOT.parent/'viewer/index.html','/viewer/app.js':ROOT.parent/'viewer/app.js',
                       '/viewer/styles.css':ROOT.parent/'viewer/styles.css','/viewer/data/viewer-data.js':ROOT.parent/'viewer/data/viewer-data.js',
                       '/viewer/locales/es.yaml':ROOT.parent/'viewer/locales/es.yaml'}
                file=files.get(path)
                if not file or not file.is_file():
                    raise AppError('No encontrado.',404)
                mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.yaml':'text/plain; charset=utf-8'}[file.suffix]
                return self.send(file.read_bytes(),content_type=mime)
            token=self.get_token()
            learner=self.server.store.session(token)
            fresh=None
            if not learner:
                if path!='/api/bootstrap':
                    raise AppError('Abre la aplicación para iniciar una sesión local.',401)
                learner,token=self.server.store.profile('Explorador local')
                fresh=token
            if path=='/api/bootstrap':
                return self.send({**self.server.store.bootstrap(learner),'csrf':self.csrf(token)},cookie=fresh)
            if path=='/api/export':
                return self.send(self.server.store.export(learner))
            raise AppError('Ruta no encontrada.',404)
        except AppError as exc:
            self.send({'error':str(exc)},exc.status)
        except Exception:
            self.log_error('GET failed (details intentionally excluded from client)')
            self.send({'error':'Error interno; revisa el servidor local.'},500)

    def do_POST(self):
        try:
            self.headers_safe()
            token=self.get_token()
            learner=self.server.store.session(token)
            if not learner:
                raise AppError('Sesión local requerida.',401)
            if not secrets.compare_digest(self.headers.get('X-CSRF-Token',''),self.csrf(token)):
                raise AppError('Solicitud no autorizada.',403)
            if self.headers.get('Content-Type','').split(';')[0]!='application/json':
                raise AppError('Se requiere JSON.',415)
            try:
                size=int(self.headers.get('Content-Length','0'))
            except ValueError:
                raise AppError('Tamaño inválido.')
            if not 0<size<=65536:
                raise AppError('Solicitud demasiado grande o vacía.',413)
            try:
                body=json.loads(self.rfile.read(size))
            except (ValueError,UnicodeError):
                raise AppError('JSON inválido.')
            if not isinstance(body,dict):
                raise AppError('Se requiere un objeto JSON.')
            path=urlsplit(self.path).path
            store=self.server.store
            lid=learner['id']
            if path=='/api/profile':
                learner,token=store.profile(body.get('name',''))
                return self.send({**store.bootstrap(learner),'csrf':self.csrf(token)},cookie=token)
            routes={
                '/api/teach':lambda:store.teach(lid,body.get('unit_id')),
                '/api/start':lambda:store.start(lid,body.get('activity_id')),
                '/api/hint':lambda:store.hint(lid,body.get('run_id')),
                '/api/submit':lambda:store.submit(lid,body.get('run_id'),body.get('response'),body.get('key')),
                '/api/case/start':lambda:store.case_start(lid,body.get('case_id')),
                '/api/case/answer':lambda:store.case_answer(lid,body.get('case_run_id'),body.get('run_id'),body.get('response'),body.get('key'))}
            if path not in routes:
                raise AppError('Ruta no encontrada.',404)
            return self.send(routes[path]())
        except AppError as exc:
            self.send({'error':str(exc)},exc.status)
        except sqlite3.IntegrityError:
            self.send({'error':'La operación contradice una restricción de integridad.'},409)
        except Exception:
            self.log_error('POST failed (details intentionally excluded from client)')
            self.send({'error':'Error interno; revisa el servidor local.'},500)


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--db',default=str(ROOT/'data/grafomed.sqlite3'))
    parser.add_argument('--port',type=int,default=8787)
    parser.add_argument('--content',default=str(ROOT/'content/thyroid.v1.json'))
    parser.add_argument('--check',action='store_true',help='Validate/install content and exit')
    parser.add_argument('--backup',help='Create consistent SQLite backup and exit')
    args=parser.parse_args()
    store=Store(args.db)
    if args.backup:
        target=Path(args.backup)
        if target.exists():
            parser.error('Backup target already exists; choose a new file.')
        target.parent.mkdir(parents=True,exist_ok=True)
        with store.connect() as source,sqlite3.connect(str(target)) as dest:
            source.backup(dest)
        print('Backup created:',target)
        return
    store.install(json.loads(Path(args.content).read_text()))
    if args.check:
        print('Content valid; SQL release installed.')
        return
    httpd=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    httpd.store=store
    print(f'Grafo Med: http://127.0.0.1:{httpd.server_port} — local candidate only',flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()


if __name__=='__main__':
    main()
