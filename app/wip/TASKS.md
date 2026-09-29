---
project: grafomed-v1
source: products/grafomed-v1/app/mini-PRD.md
updated_at: 2026-09-22
queue_status: blocked
---

# TASKS — Grafo Med unified internal alpha

## Goal
Deliver one local product with Builder/Viewer and Learner modes connected by a deterministic read-only snapshot.
## Sources of truth
- products/grafomed-v1/app/mini-PRD.md
- products/grafomed-v1/app/API_CONTRACT.md
## Dependency graph
`T00 -> T01 -> T02 -> T03 -> T04`
## Queue
### T00 — Requirements and integration contract
- **Status:** done
- **Objective:** Define unified snapshot, mode permissions and governance boundaries.
- **Owner:** mia
- **Route:** project-cell + task-decomposer
- **Inputs:** PRODUCT_SPEC.md, app/API_CONTRACT.md, viewer/VIEWER_SPEC.md
- **Output:** app/mini-PRD.md, app/agent.md, integration.py, this queue
- **Dependencies:** none
- **Acceptance:** Snapshot excludes learner state and canonical write authority.
- **Verification:** integration unit tests.
- **Assumptions:** Local alpha only.
- **Blockers:** none
### T01 — Snapshot and adapters
- **Status:** done
- **Objective:** Build deterministic cross-surface snapshot for viewer, packet and learner release metadata.
- **Owner:** cris
- **Route:** MIA engineering execution
- **Inputs:** canonical viewer data, GUD packet, thyroid release
- **Output:** integration.py and GET /api/integration
- **Dependencies:** T00
- **Acceptance:** Stable hash, identity validation, governance metadata and candidate labels.
- **Verification:** integration tests.
- **Assumptions:** GUD packet remains candidate-only.
- **Blockers:** none
### T02 — Unified shell and Builder mode
- **Status:** done
- **Objective:** Provide one local entrypoint with Learner and Builder navigation.
- **Owner:** mia
- **Route:** frontend integration
- **Inputs:** T01 snapshot
- **Output:** app/static/builder.html, app/static/builder.js, learner navigation
- **Dependencies:** T01
- **Acceptance:** Builder summary, routes, packet gates, read-only viewer link and return path work.
- **Verification:** syntax checks and browser walkthrough.
- **Assumptions:** Viewer remains a separate read-only projection.
- **Blockers:** none
### T03 — Learner integration guardrails
- **Status:** done
- **Objective:** Preserve thyroid SQL flow and expose content scope/release provenance in the shell.
- **Owner:** cris + alexei
- **Route:** app backend and content review
- **Inputs:** T01, T02, app/API_CONTRACT.md
- **Output:** release/snapshot metadata and learner governance UI
- **Dependencies:** T02
- **Acceptance:** No learner evidence leaks into Builder snapshot; thyroid remains operational; GUD is not opened as learner content without an approved release.
- **Verification:** cross-surface tests and browser walkthrough.
- **Assumptions:** Human content review remains future work.
- **Blockers:** none
### T04 — Integration QA and handoff
- **Status:** blocked
- **Objective:** Verify reproducibility, isolation and honest alpha boundaries.
- **Owner:** mia + ghost
- **Route:** independent integration audit
- **Inputs:** T01, T02, T03
- **Output:** tests and updated VERIFICATION.md
- **Dependencies:** T03
- **Acceptance:** Backend and browser flows pass; remaining clinical/educational limits explicit.
- **Verification:** full test suite, node syntax, local HTTP smoke test.
- **Assumptions:** Supervised internal alpha, not public release.
- **Blockers:** live HTTP socket walkthrough still requires a permitted local test run.
## Coverage
- Requirements -> T00
- Snapshot/adapters -> T01
- Shell -> T02
- Learner guardrails -> T03
- Verification and delivery -> T04
## Handoff
- **First ready task:** none
- **Blockers:** live HTTP socket walkthrough still requires a permitted local test run.
- **Next owner:** mia + ghost after socket permission is available
