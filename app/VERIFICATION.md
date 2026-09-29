# Verification — 2026-09-17

Status: functional local candidate delivered. Owner: MIA/Ajolito. Pillars: amauta-education (primary), ai-enhancement.

## Unified alpha verification — 2026-09-22

- Deterministic `grafomed-integration-snapshot.v1` joins viewer nodes/routes, the GUD candidate packet and active thyroid release metadata.
- Snapshot validation rejects canonical write authority and learner-state inclusion; Builder receives no attempts, sessions or answer keys.
- Builder/Viewer is served by the same loopback server at `/builder.html`; the full read-only viewer is available at `/viewer/index.html`.
- Product integration suite: **64 tests passed**. JavaScript syntax checks for learner and Builder passed.
- The HTTP socket test remains environment-blocked in the restricted sandbox; the requested escalated retry was rejected by the host usage-limit gate. No claim of a fresh live HTTP pass is made in this environment.
- Learner vision surface implemented: focal daily mission, seven-day rhythm, non-mastery practice points, two-level capability route, three-choice frontier and explicit motivation/evidence boundary.

The unified alpha is locally implemented and structurally verified, with live socket verification still requiring a permitted local test run.

## Observed results

- `python3 -m unittest discover -s app/tests -v` (from product root): **27 tests passed**. Temporary databases; HTTP test uses an ephemeral loopback port. The initial restricted sandbox refused socket binding; rerun with approved local-server permission passed.
- `python3 -m unittest discover -s tests -v` (legacy product suite): **60 tests passed**. No canonical graph/content promotion was performed.
- `node --check app/static/app.js`: passed.
- Task queue validator: passed at creation; final-state validation recorded in the session.
- Real SQLite initialized and candidate release `thyroid.v1.1`, version 2, installed. Earlier draft release remains preserved rather than overwritten.
- Online backup `data/backups/verified-20260917.sqlite3`: SQLite integrity check returned `ok`; contained the seven deliberately generated browser-QA attempts at backup time. It is local operational data, excluded from source control. It is not a human learner dataset.

## Automated coverage

Seed idempotency and release immutability; atomic rollback; release-specific history; teaching versus mastery; guided/hint/parallel-feedback assistance; server payload excludes answer keys; repeated and concurrent submission idempotency; learner/session isolation; unknown short answer is indeterminate; choice/multi/order/partial-order scoring; later errors alter current state without erasing prior successes; delayed retention and review using a controlled clock; direct assessment of rules/procedures; no prerequisite auto-credit; complete remedial teaching route; serial evaluation hides feedback and evidence until completion; supplied continuation; integrated observations sorted by completion; failed integration cannot complete the route; typed edges and concurrent cycle rejection; immutable evidence; reopen persistence; Host/Origin/CSRF protections and static-path allowlist.

## Browser walkthrough actually performed

Opened the real app at http://127.0.0.1:8787 using a local QA profile. Verified:

1. Opening instruction logs exposure and leaves attempt counts unchanged.
2. A deliberate wrong guided response displays an alternate explanation.
3. A correct guided retry is labeled assisted and recommends an independent variant.
4. A short independent response is scored and persisted.
5. Server restart and page reload preserve prior evidence and route.
6. A two-step evaluation presents no hint control, reveals no result between steps, then shows both results on completion.
7. Ordering controls reorder a procedure and submit correctly; multiple checkboxes submit a directly assessed rule correctly.
8. Progress separates integrated masteries, decisions, rules and procedures; unobserved supports are not marked learned from a connected success.
9. Graph nodes and relation details render; narrow-screen graph has contained horizontal scrolling. Narrow and 1280×900 desktop layouts were visually inspected. No automated accessibility conformance claim is made.
10. Browser console returned no error entries in the inspected session.

## Independent engineering review

A separate agent that had not authored the backend reproduced three defects against temporary databases. The root author fixed them and added regression tests:

- Case mastery used start order rather than completion order: fixed by sorting integrated observations by completion timestamp.
- Parallel practice feedback could assist an open evaluation without being recorded: fixed by logging feedback disclosure and marking active/future related case runs conservatively assisted.
- Closed failed cases could lead to route completion: fixed by checking latest integrated status and directly assessing supports before completion.

The reviewer independently reran the three regressions and all 26 non-HTTP application tests successfully. Its sandbox could not bind a port, so the root's successful full 27-test run supplies the HTTP verification. This is bounded engineering review, not an exhaustive security audit or clinical review.

## Remaining boundaries

- No public hosting, production authentication, cross-device sync or multi-host SQL scaling. SQLite is real SQL and is appropriate for this local implementation; a PostgreSQL deployment/migration is not included.
- One bounded physiology candidate cluster, not a complete medicine curriculum. Cases are serial laboratory scenarios, not a generative or longitudinal patient simulator.
- Clinical/educational human review, difficulty calibration, external holdout cases and efficacy trials remain pending. No safety-critical rubric is enabled in this content.
- Rule policy and one-day review schedule are experimental. No calibrated knowledge probability, formal CDM or clinical competence certification.
- No browser authoring CMS, automatic adjudication of indeterminate responses, deletion UI or old-profile recovery UI. Authoring is via versioned JSON and validated SQL import; uncertain answers remain reviewable in export.
- Local assessment is unproctored; off-app help and local source inspection cannot be detected.
- Content version changes conservatively reset current-version evidence while retaining old attempts; selective cross-version evidence reconciliation is not implemented.

## Re-entry

Start with `python3 app/server.py` from the product root. Main code: server.py, migrations/001_initial.sql, static/, content/. Contract: mini-PRD.md and API_CONTRACT.md. Next product step is supervised content review and a small usability pilot, not more unvalidated nodes. No external service was published or paid for.
