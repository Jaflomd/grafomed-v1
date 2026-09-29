import concurrent.futures
import copy
import hashlib
import http.client
import importlib.util
import json
from pathlib import Path
import sqlite3
import tempfile
import threading
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('grafomed_server',ROOT/'server.py')
app=importlib.util.module_from_spec(spec)
spec.loader.exec_module(app)


class AppTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.store=app.Store(Path(self.temp.name)/'test.sqlite3')
        self.content=json.loads((ROOT/'content/thyroid.v1.json').read_text())
        self.store.install(self.content)
        self.learner,self.token=self.store.profile('Test learner')
        self.lid=self.learner['id']
        self.rid=self.content['release']['id']

    def tearDown(self):
        self.temp.cleanup()

    def activity(self,phase='independent',fmt='choice'):
        case_ids={s['activity_id'] for c in self.content['cases'] for s in c['steps']}
        return next(a for a in self.content['activities'] if a['phase']==phase and a['format']==fmt and a['id'] not in case_ids)

    def answer(self,a,response=None,hint=False):
        run=self.store.start(self.lid,a['id'])
        if hint:
            self.store.hint(self.lid,run['run_id'])
        return self.store.submit(self.lid,run['run_id'],a['answer'] if response is None else response,app.uid())

    def test_seed_idempotent_and_immutable_release(self):
        self.store.install(self.content)
        altered=copy.deepcopy(self.content)
        altered['release']['title']='Changed'
        with self.assertRaises(app.AppError):self.store.install(altered)
        with self.store.connect() as db:
            self.assertEqual(db.execute('SELECT count(*) FROM releases').fetchone()[0],1)
            self.assertEqual(db.execute('PRAGMA foreign_keys').fetchone()[0],1)
            self.assertEqual(db.execute('PRAGMA integrity_check').fetchone()[0],'ok')

    def test_new_release_preserves_old_attempt(self):
        a=self.activity()
        self.answer(a)
        new=copy.deepcopy(self.content)
        new['release']['id']='test-next-release'
        new['release']['version']+=1
        self.store.install(new)
        export=self.store.export(self.learner)
        self.assertEqual(export['attempts'][0]['release_id'],self.rid)
        state=next(s for s in export['states'] if s['node_id']==a['target_id'])
        self.assertEqual(state['independent'],0)  # No silent semantic transfer across versions.

    def test_teaching_is_exposure_not_mastery(self):
        unit=self.content['units'][0]
        self.store.teach(self.lid,unit['id'])
        b=self.store.bootstrap(self.learner)
        self.assertEqual(b['stats']['units_seen'],1)
        self.assertEqual(b['stats']['attempts'],0)
        self.assertTrue(all(s['independent']==0 for s in b['states']))

    def test_hint_and_guided_are_assisted(self):
        a=self.activity()
        result=self.answer(a,hint=True)
        self.assertEqual(result['outcome'],'correct')
        self.assertTrue(result['assisted'])
        self.assertEqual(result['state']['independent'],0)
        guided=self.activity(phase='guided')
        self.assertTrue(self.answer(guided)['assisted'])

    def test_public_payload_contains_no_key(self):
        b=self.store.bootstrap(self.learner)
        self.assertTrue(all('answer' not in a and 'feedback' not in a for a in b['activities']))
        a=self.activity()
        public=self.store.start(self.lid,a['id'])['activity']
        self.assertFalse(set(public)&{'answer','accepted','hint','feedback','critical_responses'})

    def test_submission_idempotent_and_conflict(self):
        a=self.activity()
        run=self.store.start(self.lid,a['id'])['run_id']
        key=app.uid()
        first=self.store.submit(self.lid,run,a['answer'],key)
        self.assertEqual(first,self.store.submit(self.lid,run,a['answer'],key))
        with self.assertRaises(app.AppError):self.store.submit(self.lid,run,'other',key)
        with self.assertRaises(app.AppError):self.store.submit(self.lid,run,a['answer'],app.uid())
        self.assertEqual(len(self.store.export(self.learner)['attempts']),1)

    def test_concurrent_duplicate_submit_once(self):
        a=self.activity()
        run=self.store.start(self.lid,a['id'])['run_id']
        key=app.uid()
        with concurrent.futures.ThreadPoolExecutor(2) as pool:
            answers=list(pool.map(lambda _:self.store.submit(self.lid,run,a['answer'],key),range(2)))
        self.assertEqual(answers[0],answers[1])
        self.assertEqual(len(self.store.export(self.learner)['attempts']),1)

    def test_learner_isolation_and_session_hash(self):
        other,_=self.store.profile('Other')
        a=self.activity()
        run=self.store.start(self.lid,a['id'])
        with self.assertRaises(app.AppError):self.store.hint(other['id'],run['run_id'])
        with self.assertRaises(app.AppError):self.store.submit(other['id'],run['run_id'],a['answer'],app.uid())
        self.answer(a)
        self.assertEqual(self.store.export(other)['attempts'],[])
        with self.store.connect() as db:
            tokens=[r[0] for r in db.execute('SELECT token_hash FROM sessions')]
            self.assertNotIn(self.token,tokens)
            self.assertIn(hashlib.sha256(self.token.encode()).hexdigest(),tokens)

    def test_unrecognized_short_is_not_wrong(self):
        a=self.activity(fmt='short')
        result=self.answer(a,'Una respuesta no incluida en la clave')
        self.assertEqual(result['outcome'],'indeterminate')
        self.assertEqual(result['state']['errors'],0)
        self.assertIsNotNone(result['remediation'])

    def test_multi_order_and_partial_order(self):
        for fmt in ('multi','order'):
            a=next(a for a in self.content['activities'] if a['format']==fmt)
            self.assertEqual(self.store.score(a,a['answer'])[0],'correct')
            if fmt=='order':
                self.assertEqual(self.store.score(a,list(reversed(a['answer'])))[0],'incorrect')
                with self.assertRaises(app.AppError):self.store.score(a,a['answer'][:1])
        partial={'format':'order','options':[{'id':'a'},{'id':'b'},{'id':'c'}],'answer':['a','b','c'],'order_constraints':[['a','c']]}
        self.assertEqual(self.store.score(partial,['b','a','c'])[0],'correct')

    def test_failure_changes_current_state_and_route_preserves_history(self):
        a=self.activity()
        self.answer(a)
        wrong=next(o['id'] for o in a['options'] if o['id']!=a['answer'])
        result=self.answer(a,wrong)
        self.assertEqual(result['state']['status'],'needs_practice')
        self.assertEqual(result['state']['independent'],1)
        self.assertIsNotNone(result['remediation'])
        self.assertEqual(result['state']['errors'],1)

    def test_support_nodes_not_credited_by_decision(self):
        a=self.activity()
        self.answer(a)
        states=self.store.bootstrap(self.learner)['states']
        for edge in self.content['edges']:
            if edge['target']==a['target_id'] and edge['kind']=='supports':
                state=next(s for s in states if s['node_id']==edge['source'])
                self.assertEqual(state['independent'],0)

    def test_case_evaluation_feedback_hidden_until_complete(self):
        case=next(c for c in self.content['cases'] if c['mode']=='evaluation')
        payload=self.store.case_start(self.lid,case['id'])
        self.assertEqual(payload,self.store.case_start(self.lid,case['id']))
        with self.assertRaises(app.AppError):self.store.hint(self.lid,payload['run_id'])
        # Route stations and evaluation cases may share an activity. Starting the
        # station must be allowed; only case submission remains case-scoped.
        station_run=self.store.start(self.lid,case['steps'][0]['activity_id'])
        self.assertIsNotNone(station_run['run_id'])
        first_activity=next(a for a in self.content['activities'] if a['id']==payload['activity']['id'])
        with self.assertRaises(app.AppError):self.store.submit(self.lid,payload['run_id'],first_activity['answer'],app.uid())
        for index,step in enumerate(case['steps']):
            activity=next(a for a in self.content['activities'] if a['id']==step['activity_id'])
            payload=self.store.case_answer(self.lid,payload['case_run_id'],payload['run_id'],activity['answer'],app.uid())
            if index<len(case['steps'])-1:
                self.assertIsNone(payload['previous'])
                self.assertEqual(self.store.export(self.learner)['attempts'],[])
                self.assertEqual(self.store.bootstrap(self.learner)['stats']['attempts'],0)
        self.assertTrue(payload['done'])
        self.assertEqual(len(payload['summary']['results']),len(case['steps']))
        self.assertEqual(len(self.store.export(self.learner)['attempts']),len(case['steps']))
        state=next(s for s in self.store.bootstrap(self.learner)['states'] if s['node_id']==case['mastery_id'])
        self.assertEqual(state['independent'],1)  # one case observation, not one per step

    def test_case_practice_continuation_records_assistance(self):
        case=next(c for c in self.content['cases'] if any(s.get('supplied') for s in c['steps']))
        payload=self.store.case_start(self.lid,case['id'])
        for step in case['steps']:
            activity=next(a for a in self.content['activities'] if a['id']==step['activity_id'])
            payload=self.store.case_answer(self.lid,payload['case_run_id'],payload['run_id'],activity['answer'],app.uid())
        self.assertTrue(payload['summary']['results'][1]['assisted'])
        state=next(s for s in self.store.bootstrap(self.learner)['states'] if s['node_id']==case['mastery_id'])
        self.assertEqual(state['independent'],0)

    def test_cycle_and_invalid_containment_rejected(self):
        with self.assertRaises(sqlite3.IntegrityError):
            with self.store.transaction() as db:
                db.execute('INSERT INTO edges VALUES(?,?,?,?)',(self.rid,'d-feedback','d-availability','requires'))
        with self.assertRaises(sqlite3.IntegrityError):
            with self.store.transaction() as db:
                db.execute('INSERT INTO edges VALUES(?,?,?,?)',(self.rid,'d-feedback','thyroid','contains'))

    def test_concurrent_graph_insert_cannot_create_cycle(self):
        def insert(source,target):
            try:
                with self.store.transaction() as db:
                    db.execute('INSERT INTO edges VALUES(?,?,?,?)',(self.rid,source,target,'requires'))
                return True
            except sqlite3.IntegrityError:return False
        with concurrent.futures.ThreadPoolExecutor(2) as pool:
            result=list(pool.map(lambda pair:insert(*pair),[('d-synthesis','d-conversion'),('d-conversion','d-synthesis')]))
        self.assertEqual(sorted(result),[False,True])

    def test_evidence_immutable(self):
        self.answer(self.activity())
        for table in ('attempts','events'):
            with self.assertRaises(sqlite3.IntegrityError):
                with self.store.transaction() as db:db.execute('DELETE FROM '+table)
            with self.assertRaises(sqlite3.IntegrityError):
                with self.store.transaction() as db:db.execute('UPDATE '+table+" SET created_at='x'")

    def test_invalid_content_rolls_back(self):
        bad=copy.deepcopy(self.content)
        bad['release']['id']='bad'
        bad['edges'].append({'source':'d-feedback','target':'d-availability','kind':'requires'})
        with self.assertRaises(sqlite3.IntegrityError):self.store.install(bad)
        with self.store.connect() as db:
            self.assertFalse(db.execute("SELECT 1 FROM releases WHERE id='bad'").fetchone())

    def test_reopen_persists(self):
        self.answer(self.activity())
        reopened=app.Store(self.store.path)
        self.assertEqual(len(reopened.export(self.learner)['attempts']),1)
        self.assertEqual(reopened.session(self.token)['id'],self.lid)

    def test_delayed_review_and_retention(self):
        a=self.activity()
        with patch.object(app,'now',return_value='2026-01-01T12:00:00.000000+00:00'):
            first=self.answer(a)
        self.assertEqual(first['state']['retention'],'pending')
        with patch.object(app,'now',return_value='2026-01-03T12:00:00.000000+00:00'):
            second=self.answer(a)
        self.assertEqual(second['state']['retention'],'demonstrated')
        wrong=next(o['id'] for o in a['options'] if o['id']!=a['answer'])
        with patch.object(app,'now',return_value='2026-01-05T12:00:00.000000+00:00'):
            failed=self.answer(a,wrong)
        self.assertEqual(failed['state']['retention'],'needs_review')
        self.assertEqual(failed['state']['independent'],2)

    def test_instruction_opened_during_attempt_counts_help(self):
        a=self.activity()
        run=self.store.start(self.lid,a['id'])
        self.store.teach(self.lid,self.content['units'][0]['id'])
        result=self.store.submit(self.lid,run['run_id'],a['answer'],app.uid())
        self.assertTrue(result['assisted'])

    def test_every_rule_and_procedure_has_direct_assessment(self):
        targets={a['target_id'] for a in self.content['activities']}
        for n in self.content['nodes']:
            if n['type'] in ('rule','procedure'):
                self.assertIn(n['id'],targets)

    def test_full_remedial_route(self):
        a=next(a for a in self.content['activities'] if a['id']=='feedback-g')
        self.store.teach(self.lid,'u-feedback')
        wrong=next(o['id'] for o in a['options'] if o['id']!=a['answer'])
        result=self.answer(a,wrong)
        self.assertIsNotNone(result['remediation'])
        self.assertEqual(self.store.bootstrap(self.learner)['next']['id'],'feedback-g')
        self.answer(a)
        self.assertEqual(self.store.bootstrap(self.learner)['next']['id'],'feedback-i')
        independent=next(a for a in self.content['activities'] if a['id']=='feedback-i')
        self.answer(independent)
        self.assertNotEqual(self.store.bootstrap(self.learner)['next']['id'],'feedback-g')

    def finish_case(self,payload,wrong_first=False):
        index=0
        while not payload.get('done'):
            activity=next(a for a in self.content['activities'] if a['id']==payload['activity']['id'])
            response=activity['answer']
            if wrong_first and index==0:
                if activity['format']=='choice':response=next(o['id'] for o in activity['options'] if o['id']!=response)
                elif activity['format']=='order':response=list(reversed(response))
                elif activity['format']=='multi':response=[]
                else:response='no reconocido'
            payload=self.store.case_answer(self.lid,payload['case_run_id'],payload['run_id'],response,app.uid())
            index+=1
        return payload

    def test_mastery_latest_completion_not_start_controls_state(self):
        practice=self.store.case_start(self.lid,'case-axis-practice')
        evaluation=self.store.case_start(self.lid,'case-axis-evaluation')
        self.finish_case(evaluation)
        self.finish_case(practice,wrong_first=True)
        state=next(s for s in self.store.bootstrap(self.learner)['states'] if s['node_id']=='m-axis')
        self.assertEqual(state['status'],'needs_practice')

    def test_parallel_feedback_marks_evaluation_assisted(self):
        evaluation=self.store.case_start(self.lid,'case-axis-evaluation')
        self.answer(self.activity())
        result=self.finish_case(evaluation)
        self.assertTrue(all(r['assisted'] for r in result['summary']['results']))

    def test_failed_integration_cannot_complete_route(self):
        for case in self.content['cases']:
            self.finish_case(self.store.case_start(self.lid,case['id']),wrong_first=True)
        case_ids={s['activity_id'] for c in self.content['cases'] for s in c['steps']}
        for a in self.content['activities']:
            if a['phase']=='independent' and a['id'] not in case_ids:
                self.answer(a)
        recommendation=self.store.bootstrap(self.learner)['next']
        self.assertEqual(recommendation['kind'],'case')
        self.assertNotEqual(recommendation['kind'],'complete')


class HTTPTests(unittest.TestCase):
    activity=AppTests.activity

    def setUp(self):
        AppTests.setUp(self)
        self.httpd=app.ThreadingHTTPServer(('127.0.0.1',0),app.Handler)
        self.httpd.store=self.store
        self.thread=threading.Thread(target=self.httpd.serve_forever,daemon=True)
        self.thread.start()
        self.port=self.httpd.server_port

    def tearDown(self):
        self.httpd.shutdown()
        self.httpd.server_close()
        AppTests.tearDown(self)

    def request(self,path,method='GET',body=None,headers=None):
        con=http.client.HTTPConnection('127.0.0.1',self.port)
        con.request(method,path,body,headers or {})
        response=con.getresponse()
        data=response.read()
        result=(response.status,dict(response.getheaders()),data)
        con.close()
        return result

    def test_http_security_and_roundtrip(self):
        status,headers,raw=self.request('/api/bootstrap')
        self.assertEqual(status,200)
        boot=json.loads(raw)
        cookie=headers['Set-Cookie'].split(';')[0]
        self.assertIn('HttpOnly',headers['Set-Cookie'])
        self.assertNotIn('answer',raw.decode())
        valid={'Cookie':cookie,'Content-Type':'application/json','X-CSRF-Token':boot['csrf']}
        a=self.activity()
        status,_,raw=self.request('/api/start','POST',json.dumps({'activity_id':a['id']}),valid)
        self.assertEqual(status,200)
        run=json.loads(raw)
        status,_,_=self.request('/api/submit','POST',json.dumps({'run_id':run['run_id'],'response':a['answer'],'key':app.uid()}),valid)
        self.assertEqual(status,200)
        no_csrf=dict(valid);no_csrf.pop('X-CSRF-Token')
        self.assertEqual(self.request('/api/teach','POST','{}',no_csrf)[0],403)
        origin=dict(valid,Origin='https://attacker.invalid')
        self.assertEqual(self.request('/api/teach','POST','{}',origin)[0],403)
        self.assertEqual(self.request('/api/health',headers={'Host':'attacker.invalid'})[0],403)
        self.assertEqual(self.request('/../server.py')[0],404)
        self.assertEqual(self.request('/api/export')[0],401)
        self.assertEqual(self.request('/api/start','POST','[]',valid)[0],400)


if __name__=='__main__':unittest.main()
