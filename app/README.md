# Grafo Med — local teaching-first SQL app

Working internal candidate, not a public medical service. Spanish learner UI; no external packages or cloud account required. Python 3.9+ with SQLite is sufficient. Existing prototypes are preserved.

## Start

From this directory:

```sh
python3 server.py
```

Open [Grafo Med locally](http://127.0.0.1:8787). Keep the terminal running; Ctrl-C stops the server without deleting progress. Only 127.0.0.1 is bound. Use `--port 8788` if the default port is occupied. Paths are resolved relative to the app, not the current working directory.

The same local server now exposes [Builder / Viewer](http://127.0.0.1:8787/builder.html). Builder is a read-only integration surface over the current graph projection, routes, candidate GUD packet and learner release metadata. It does not receive learner evidence and cannot promote or mutate canonical content. The full standalone viewer remains available at `/viewer/index.html`.

The first start creates `data/grafomed.sqlite3`, applies the migration, validates and imports the content release. Later starts preserve records. The app uses SQL—not browser localStorage—for learning history. A browser cookie identifies a local learner. Creating a new profile starts separate evidence and keeps the previous records in SQL; this is not a secure shared-device account system or cloud sign-in. Keep/export your current profile before changing it; a profile picker/recovery UI is not implemented.

## Included

- One candidate physiology cluster, two integrated mastery targets, four decision targets and shared instructional/rule/procedure supports.
- Four brief teaching units with examples, alternate explanations and boundaries.
- 26 original activities: 16 standalone and 10 case-specific. Choice, multi-select, ordering and constrained short answer.
- Two practice and two evaluation serial laboratory cases, feedback deferred in evaluation.
- A deterministic route based on observed evidence, assistance and a clearly experimental one-day review interval.
- Interactive graph, direct rule/procedure assessments, separate integration evidence, progress dimensions and JSON export.
- Unified internal shell with Builder/Viewer and Learner modes; deterministic read-only integration snapshot with candidate governance labels.
- Immutable attempt/event history, exact release and rubric references, idempotent submissions, SQL foreign keys, typed edges and concurrent-safe prerequisite cycle rejection.
- Server-side scoring. Unrecognized free text stays indeterminate rather than automatically wrong. No AI medical grading.

## Database and operations

`migrations/001_initial.sql` is executable SQL. `server.py` applies it idempotently. `releases` retains exact content JSON and a SHA-256 digest. Reusing a release ID with changed content is rejected: copy/edit the candidate pack with a new release ID/version, then run `--content PATH`. Import rolls back atomically on validation/constraint failure. Historical attempts retain their original release; a new release conservatively starts new current-state evidence rather than silently transfer old success.

```sh
python3 server.py --check
python3 server.py --backup /absolute/path/grafomed-backup.sqlite3
python3 -m unittest discover -s tests -v
node --check static/app.js
```

Backup uses SQLite's online backup API and refuses to overwrite an existing destination. To verify restoration without overwriting the live database, run `python3 server.py --db /absolute/path/grafomed-backup.sqlite3 --port 8788`. Keep the matching content release. Do not copy only the main SQLite file while WAL writes are active. Do not commit databases, backups or learner exports to source control. The folder may inherit the user's iCloud synchronization because of its existing location; choose `--db` outside synced folders for nonsynced local storage.

### Logical data model

| SQL group | Purpose |
|---|---|
| releases, nodes, node_versions, edges | Stable identity, versioned learning graph and constrained topology |
| units, activities, activity_targets | Teaching resources and directly assessed targets |
| cases, case_steps | Integration, information supplied and feedback mode |
| learners, sessions | Pseudonymous local profile; session tokens stored only as hashes |
| runs, case_runs | Resumable cases and recorded help disclosure |
| attempts, events, submissions | Immutable evidence and idempotent delivery |

Learner state and route are derived on demand from versioned evidence. There is no mutable “mastered” flag and no best-ever percentage. Case steps are grouped into a single integration observation rather than independent case replications. An integrated success never updates all prerequisite nodes. Opening instruction during a live attempt is logged as help; no system can observe off-app assistance here.

## Content authoring

Edit a new JSON release following API_CONTRACT.md and validate with `--check` against a new test DB. The pack's `source_ids` map instruction and rationales to linked sources; source notes and human review requirements are in content/SOURCES.md. Add meaningful variants, not only cosmetic changes. Use `critical_responses` only with a reviewed conditional criterion; current physiology content deliberately has no patient-safety critical flags.

No browser admin editor, adjudication workflow or sealed external holdout bank is delivered. File-based authoring plus validation is the initial editorial interface. Indeterminate responses remain visible/exportable for review; do not rewrite an immutable attempt to resolve them.

## Security and validity boundary

The server restricts Host/Origin, requires session plus CSRF for mutations, serves an explicit static-file allowlist, limits request size and uses parameterized SQL. These protections are not a production security audit. No public bind option is provided. Do not reverse-proxy this app to the internet as-is; production requires authenticated accounts, authorization review, TLS, rate limits, monitored backups, retention/deletion policy, operational migrations and load testing.

The evaluation is unproctored and source code/content are locally inspectable. “Without help” means without recorded help in the app, not proof of closed-book performance. Current cases are short laboratory sequences, not a full patient simulator. The module and grading are candidates pending medical/educational review. App tests establish software behavior only, not learning efficacy, psychometric validity, far transfer or clinical competence.

Privacy: do not enter real patient details or identifying free text. There is no account erasure UI; learner-data collection beyond personal/internal testing requires a retention/deletion design. No analytics, external fonts or cloud calls are required by the application.

See VERIFICATION.md for actual tested results and remaining work.
