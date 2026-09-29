# GrafoMed learner-app prototype · literature-integrated v1 review

Status: `functional_candidate_demo_not_promoted`

## Implemented product decisions

- The learner selects a destination; MIA ranks and explains a three-option ready-to-learn frontier.
- The home screen protects attention by showing one focal action.
- The complete path and graph remain available as secondary exploration modes.
- Every visible mission maps to one source mastery atom and its one observable objective.
- Progress is represented by states and separate A1–A4 evidence dimensions.
- Completion and reward points cannot independently confer mastery.
- A single successful lesson remains in `practicing` and schedules later retrieval and transfer.
- Assistance, confidence and error patterns are retained in immutable-style evidence events with exact version references.
- Missingness, uncertainty and contest status are visible in the open learner model.
- XP and quest progress are stored separately and never enter the mastery update.

## Functional scope

- 10 key-objective regions.
- 33 upper-limb mastery missions.
- Four screens: Today, Journey, Map, and Mastery.
- Three complete candidate lessons: orient major bones, localize upper-limb pulses, and reconstruct the brachial plexus.
- Full lesson cycle: contract, diagnostic retrieval, discriminating model, guided practice, free retrieval, functional contrast, transfer, feedback, and local learner-state update.
- Route controls for time, energy, modality, manual override and text/low-bandwidth mode.
- Evidence inspection, model contest, JSON portability and literature-derived candidate contracts.
- Responsive desktop and mobile navigation.

## Validation

- Generated directly from the source-locked upper-limb candidate cluster.
- JavaScript syntax pass for app and generated data.
- Automated acceptance checks cover the route explanation, three lessons, assistance weighting, missingness, version identity, open learner model, retention/transfer separation, privacy/accessibility controls, and all four candidate contracts.
- Browser checks cover route override, assisted error, confidence calibration, delayed checks, open-model evidence and mobile layout.

## Boundaries

- Mastery weights, evidence updates, review dates, XP, and thresholds are synthetic UX assumptions.
- The first lesson uses text and schematic discrimination cards, not source-locked specimens or diagnostic images.
- No psychometric, learning-efficacy, accessibility-user, fairness, or clinical-content validation has been completed.
- All demo state remains in browser local storage and has no canonical write authority.
- The contracts and route weights remain candidate design artifacts; they are not validated standards or empirical cut scores.
