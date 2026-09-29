---
id: grafomed-unified-alpha
type: mini-PRD
project_kind: app
status: active
owner: ajolito
created_at: 2026-09-17
updated_at: 2026-09-22
review_due: 2026-10-06
pillars: [amauta-education, ai-enhancement, research]
pillar_role:
  primary: amauta-education
  secondary: [ai-enhancement, research]
risk_level: medium
sensitivity: internal
agent: agent.md
---

# Grafo Med unified internal alpha

## Objective
Unify the read-only Builder/Viewer surfaces and the teaching-first SQL Learner into one local product while preserving medical truth, learning representation and private learner evidence as separate authorities.
## Context
The existing SQL app is functional for thyroid candidate content. The viewer and GUD packet already provide derived graph, route and provenance surfaces. The alpha joins them through a deterministic read-only integration snapshot. This is an internal candidate app, not public clinical decision support.
## Output
Unified snapshot contract, Python standard-library integration endpoint, Spanish local shell with Builder and Learner modes, thyroid learner flow, GUD candidate packet visibility, viewer deep link, governance status surfaces, tests and operation guide.
## Constraints
Loopback-only server; no cloud costs, publication, real patient data, clinical certification, or automatic canonical content promotion. No secrets embedded. Existing prototype and canonical graph remain unchanged. No unrestricted AI scoring. Candidate and pending-review content visibly labeled. Viewer has no canonical write authority and learner state is never included in builder snapshots.
## Acceptance Criteria
Integration snapshot is deterministic and validates schema, identity, lifecycle and release boundaries; Builder and Learner open from one shell; thyroid teaching/evaluation remains operational; GUD remains candidate-only; routes and releases retain provenance; learner evidence remains private; SQL foreign keys, cycle protection, immutable evidence and idempotency continue to pass; server and browser verification pass.
## Done When
App runs locally from one entrypoint, Builder and Learner modes are navigable, the snapshot is reproducible, tests and observed UI flow pass, and remaining production/clinical/educational limits are documented.
## Decisions
SQLite is a real transactional SQL database with no required install; backend Python stdlib and frontend vanilla JS keep local operation reproducible. The integration layer is a read-only adapter over existing viewer data, routes and packet metadata. Thyroid is the primary learner release; GUD is candidate-only; upper limb remains a Builder demo. New learning projection uses cluster/mastery/decision/support types without mutating canonical truth.
## Risks
Draft content can be mistaken for validated teaching: persistent candidate label and no promotion. Local sessions are not internet authentication: bind only loopback and verify Host/Origin/CSRF. SQLite deployment is single-host; no public readiness claim. Snapshot drift is controlled by deterministic hashing and cross-surface tests.
## Requirements Debt
[ASSUMPTION] The first unified alpha is local and supervised, not a public product. Thyroid physiology is the operational learner flow; GUD demonstrates governed packet integration; upper limb remains builder-only. Clinical review, empirical efficacy, public authentication and hosting remain separate future work. mini-PRD remains sufficient because this is a bounded integration of existing components, not a public platform launch.
