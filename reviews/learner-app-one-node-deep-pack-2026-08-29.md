# GrafoMed learner app · one-node deep-unit verification

Status: `functional_candidate_demo_not_promoted`

Date: 2026-08-29

## Scope

This implementation tests what “Duolingo-level extension” means for one
GrafoMed mastery atom rather than superficially adding questions to every node.
The selected atom is `gm-ma-identify-upper-limb-long-flat-bones`, whose single
objective is to identify and orient the clavicle, scapula, humerus, radius and
ulna through their principal anatomical landmarks.

## Implemented learning unit

- 7 micro-lessons: diagnostic map; clavicle/scapula; humerus; radius/ulna;
  orientation; clinical transfer; and checkpoint.
- 33 activities: 4 teaching interactions and 29 scored interactions.
- Four scored response formats: single choice, multiple selection, ordered
  sequence and normalized short answer.
- Activities span A1 recognition, A2 explanation, A3 application and A4
  transfer without treating them as interchangeable evidence.
- Every scored activity retains confidence, assistance, response, latency,
  phase, evidence level, error pattern and version identity in browser-local
  evidence events.
- Completing the checkpoint schedules separate reviews at +1, +3, +7 and +21
  days; it does not establish competence or transfer.
- The unit map persists local progress, identifies the next micro-lesson and
  preserves learner access to the wider 33-node journey.

## Content architecture

- Versioned candidate source:
  `prototypes/learner-app-v0/content-packs/upper-limb-bones.v0.json`
- Pack contract:
  `prototypes/learner-app-v0/contracts/node-learning-pack.v0.schema.json`
- Deterministic compiler: `scripts/build_node_learning_pack.py`
- Browser assignment: `prototypes/learner-app-v0/node-pack.js`

This separation makes a node editable without embedding its curriculum inside
the interface code. Activity IDs and versions provide stable identities for
future item revision, retirement and evidence interpretation.

## Verification

- All 54 GrafoMed product tests passed.
- The source pack contains 7 lessons, 33 unique activities, 29 scored
  activities, 4 teaching interactions and the four intended response formats.
- The compiler output is deterministic and all JavaScript assignments parse.
- Browser testing completed one full diagnostic lesson (4/4), persisted 1/7
  progress and exposed the next lesson.
- Browser testing exercised teaching, single choice, multiple selection,
  sequencing and short answer; accent-insensitive normalization accepted
  `CAPITULO` for `capítulo`.
- The fixed answer/confidence dock remained available inside deep activities.
- Desktop and 390-by-844 mobile unit maps rendered without observed horizontal
  overflow; the mobile cards collapse to one column and retain bottom navigation.
- Automated checks confirm the review schedule and the explicit boundary that
  completion does not confer mastery.

## Honest boundaries

- The content is candidate instructional material and has not completed
  anatomical, educational or independent editorial review.
- The unit includes textual and relational transfer prompts. It does not yet
  contain licensed and expert-annotated specimens, radiographs, CT, MRI or
  ultrasound images; therefore image-recognition validity is not claimed.
- Item quality, difficulty, discrimination, accessibility and learning efficacy
  have not been established empirically.
- Browser-local progression is demonstrative, not a production review service.
- This is one deeply implemented node. The other 32 upper-limb atoms have not
  been expanded to the same depth.

## Decision

The one-node prototype is sufficient to test the content-engine contract and
the learner journey before horizontal expansion. The next responsible step is
expert review of this pack plus a small set of licensed image assets and a
learner pilot; bulk generation of 32 additional deep packs should wait until
those results identify what to preserve, revise or retire.
