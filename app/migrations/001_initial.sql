PRAGMA foreign_keys = ON;
BEGIN IMMEDIATE;
CREATE TABLE IF NOT EXISTS schema_migrations(version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS releases(id TEXT PRIMARY KEY, version INTEGER NOT NULL, title TEXT NOT NULL,
 status TEXT NOT NULL CHECK(status IN ('candidate','reviewed')), digest TEXT NOT NULL, content_json TEXT NOT NULL, installed_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS nodes(id TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS node_versions(node_id TEXT NOT NULL REFERENCES nodes(id), release_id TEXT NOT NULL REFERENCES releases(id),
 type TEXT NOT NULL CHECK(type IN ('cluster','cluster-maj','cluster-min','mastery','decision','concept','rule','procedure')), title TEXT NOT NULL, description TEXT NOT NULL,
 PRIMARY KEY(node_id,release_id));
CREATE TABLE IF NOT EXISTS edges(release_id TEXT NOT NULL REFERENCES releases(id), source TEXT NOT NULL, target TEXT NOT NULL,
 kind TEXT NOT NULL CHECK(kind IN ('contains','integrates','supports','requires')), CHECK(source<>target), PRIMARY KEY(release_id,source,target,kind),
 FOREIGN KEY(source,release_id) REFERENCES node_versions(node_id,release_id), FOREIGN KEY(target,release_id) REFERENCES node_versions(node_id,release_id));
DROP TRIGGER IF EXISTS edge_types;
CREATE TRIGGER edge_types BEFORE INSERT ON edges BEGIN
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
END;
CREATE TABLE IF NOT EXISTS units(id TEXT NOT NULL, release_id TEXT NOT NULL REFERENCES releases(id), target_id TEXT NOT NULL, data_json TEXT NOT NULL,
 PRIMARY KEY(id,release_id), FOREIGN KEY(target_id,release_id) REFERENCES node_versions(node_id,release_id));
CREATE TABLE IF NOT EXISTS activities(id TEXT NOT NULL, release_id TEXT NOT NULL REFERENCES releases(id), target_id TEXT NOT NULL,
 format TEXT NOT NULL CHECK(format IN ('choice','multi','order','short')), phase TEXT NOT NULL CHECK(phase IN ('guided','independent','review')),
 data_json TEXT NOT NULL, PRIMARY KEY(id,release_id), FOREIGN KEY(target_id,release_id) REFERENCES node_versions(node_id,release_id));
CREATE TABLE IF NOT EXISTS learning_units(id TEXT NOT NULL, release_id TEXT NOT NULL REFERENCES releases(id), decision_id TEXT NOT NULL,
 kind TEXT NOT NULL CHECK(kind IN ('teaching','assessment')), ref_type TEXT NOT NULL CHECK(ref_type IN ('unit','activity')),
 ref_id TEXT NOT NULL, position INTEGER NOT NULL, data_json TEXT NOT NULL, PRIMARY KEY(id,release_id),
 FOREIGN KEY(decision_id,release_id) REFERENCES node_versions(node_id,release_id));
CREATE UNIQUE INDEX IF NOT EXISTS learning_unit_order ON learning_units(release_id,decision_id,position);
CREATE INDEX IF NOT EXISTS learning_units_decision ON learning_units(release_id,decision_id,kind);
CREATE TABLE IF NOT EXISTS activity_targets(activity_id TEXT NOT NULL, release_id TEXT NOT NULL, node_id TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('direct','supporting','background')), PRIMARY KEY(activity_id,release_id,node_id),
 FOREIGN KEY(activity_id,release_id) REFERENCES activities(id,release_id), FOREIGN KEY(node_id,release_id) REFERENCES node_versions(node_id,release_id));
CREATE TABLE IF NOT EXISTS cases(id TEXT NOT NULL, release_id TEXT NOT NULL REFERENCES releases(id), mastery_id TEXT NOT NULL,
 mode TEXT NOT NULL CHECK(mode IN ('practice','evaluation')), data_json TEXT NOT NULL, PRIMARY KEY(id,release_id), FOREIGN KEY(mastery_id,release_id) REFERENCES node_versions(node_id,release_id));
CREATE TABLE IF NOT EXISTS case_steps(case_id TEXT NOT NULL, release_id TEXT NOT NULL, position INTEGER NOT NULL,
 activity_id TEXT NOT NULL, context TEXT NOT NULL, supplied INTEGER NOT NULL CHECK(supplied IN (0,1)), PRIMARY KEY(case_id,release_id,position),
 FOREIGN KEY(case_id,release_id) REFERENCES cases(id,release_id), FOREIGN KEY(activity_id,release_id) REFERENCES activities(id,release_id));
CREATE TABLE IF NOT EXISTS learners(id TEXT PRIMARY KEY,name TEXT NOT NULL,created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,learner_id TEXT NOT NULL REFERENCES learners(id),expires_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS case_runs(id TEXT PRIMARY KEY,learner_id TEXT NOT NULL REFERENCES learners(id),case_id TEXT NOT NULL,release_id TEXT NOT NULL,
 position INTEGER NOT NULL DEFAULT 0,closed INTEGER NOT NULL DEFAULT 0 CHECK(closed IN (0,1)),created_at TEXT NOT NULL,
 FOREIGN KEY(case_id,release_id) REFERENCES cases(id,release_id));
CREATE TABLE IF NOT EXISTS runs(id TEXT PRIMARY KEY,learner_id TEXT NOT NULL REFERENCES learners(id),activity_id TEXT NOT NULL,release_id TEXT NOT NULL,
 learning_unit_id TEXT,
 case_run_id TEXT REFERENCES case_runs(id),step_index INTEGER,help_json TEXT NOT NULL DEFAULT '[]',closed INTEGER NOT NULL DEFAULT 0 CHECK(closed IN (0,1)),created_at TEXT NOT NULL,
 FOREIGN KEY(activity_id,release_id) REFERENCES activities(id,release_id));
CREATE INDEX IF NOT EXISTS case_step_run ON runs(case_run_id,step_index) WHERE case_run_id IS NOT NULL;
CREATE TABLE IF NOT EXISTS attempts(id TEXT PRIMARY KEY,learner_id TEXT NOT NULL REFERENCES learners(id),run_id TEXT NOT NULL REFERENCES runs(id),
 release_id TEXT NOT NULL REFERENCES releases(id),node_id TEXT NOT NULL REFERENCES nodes(id),response_json TEXT NOT NULL,
 outcome TEXT NOT NULL CHECK(outcome IN ('correct','incorrect','indeterminate')),assisted INTEGER NOT NULL CHECK(assisted IN (0,1)),
 help_json TEXT NOT NULL,critical INTEGER NOT NULL CHECK(critical IN (0,1)),context TEXT NOT NULL,created_at TEXT NOT NULL,
 policy_version TEXT NOT NULL,rubric_version TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS events(id TEXT PRIMARY KEY,learner_id TEXT NOT NULL REFERENCES learners(id),release_id TEXT NOT NULL REFERENCES releases(id),
 kind TEXT NOT NULL,payload_json TEXT NOT NULL,created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS submissions(learner_id TEXT NOT NULL REFERENCES learners(id),idempotency_key TEXT NOT NULL,
 request_json TEXT NOT NULL,response_json TEXT NOT NULL,PRIMARY KEY(learner_id,idempotency_key));
CREATE INDEX IF NOT EXISTS learner_attempts ON attempts(learner_id,created_at);
CREATE INDEX IF NOT EXISTS learner_events ON events(learner_id,created_at);
CREATE TRIGGER IF NOT EXISTS immutable_attempt_update BEFORE UPDATE ON attempts BEGIN SELECT RAISE(ABORT,'immutable evidence'); END;
CREATE TRIGGER IF NOT EXISTS immutable_attempt_delete BEFORE DELETE ON attempts BEGIN SELECT RAISE(ABORT,'immutable evidence'); END;
CREATE TRIGGER IF NOT EXISTS immutable_event_update BEFORE UPDATE ON events BEGIN SELECT RAISE(ABORT,'immutable evidence'); END;
CREATE TRIGGER IF NOT EXISTS immutable_event_delete BEFORE DELETE ON events BEGIN SELECT RAISE(ABORT,'immutable evidence'); END;
CREATE TRIGGER IF NOT EXISTS immutable_release BEFORE UPDATE ON releases BEGIN SELECT RAISE(ABORT,'immutable release'); END;
CREATE TRIGGER IF NOT EXISTS immutable_activity BEFORE UPDATE ON activities BEGIN SELECT RAISE(ABORT,'immutable activity version'); END;
CREATE TRIGGER IF NOT EXISTS immutable_unit BEFORE UPDATE ON units BEGIN SELECT RAISE(ABORT,'immutable instructional version'); END;
CREATE TRIGGER IF NOT EXISTS immutable_edge BEFORE UPDATE ON edges BEGIN SELECT RAISE(ABORT,'replace release instead'); END;
INSERT OR IGNORE INTO schema_migrations VALUES(1,strftime('%Y-%m-%dT%H:%M:%fZ','now'));
COMMIT;
