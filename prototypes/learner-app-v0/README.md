# GrafoMed learner-app prototype · literature-integrated v1

This is a functional, local prototype of an adaptive learning experience over
the candidate upper-limb cluster. It is not a production app and it does not
write to canonical GrafoMed learner state.

## Product hypothesis

- The learner chooses a destination; MIA ranks a small, reversible ready-to-learn frontier and explains the recommendation.
- The home screen contains one focal mission rather than the full graph.
- Every mission maps to one mastery atom and one observable objective.
- A mission interleaves orientation, diagnostic retrieval, teaching, guided
  practice, contrast, transfer, and a bounded check.
- Completion and XP never establish mastery. Evidence is shown separately for
  A1 recognition, A2 explanation, A3 application, and A4 transfer.
- Hints, tutoring and retries are retained as assistance and do not weigh like
  independent retrieval.
- Confidence calibration and productive-error remediation are part of the
  observable learning loop.
- Answer confidence, optional help and submission remain together in a fixed
  lesson response dock; the learner never has to scroll the question to find
  the confidence control.
- Immediate acquisition, delayed retention, near transfer and workplace
  performance are distinct claims.
- The journey and map expose the curriculum only when the learner asks for it.
- Motivation rewards return and effort without threatening the learner with a
  broken streak or obscuring uncertainty.
- The learner can inspect, contest and export the local learner model.

## Literature-derived safeguards now represented

- Concept route and resource route are separate.
- Time, fatigue and modality can rerank the frontier without changing mastery.
- Missing activity remains missingness; it is never silently converted to failure.
- Every new response produces an evidence event with assistance, confidence,
  context, scorer and exact version references.
- The assessment-use contract prohibits competence certification or entrustment.
- Game state is structurally separate from mastery state.
- Every pedagogical mechanism declares a hypothesis, expected outcome, harms
  and falsification or retirement condition.
- Pilot metrics prioritize retention, transfer, calibration, route coherence,
  accessibility and fairness rather than clicks or completion.

The candidate contracts live in `contracts/`. Their existence does not make
them validated production standards.

## One-node deep unit

The atom `gm-ma-identify-upper-limb-long-flat-bones` is implemented as the
first complete deep-unit candidate. It contains 7 micro-lessons and 33
activities: 4 teaching interactions and 29 scored interactions across single
choice, multiple selection, sequencing and short answer. The last lesson is a
bounded checkpoint; completion schedules separate reviews at +1, +3, +7 and
+21 days.

The canonical candidate source is `content-packs/upper-limb-bones.v0.json` and
must satisfy `contracts/node-learning-pack.v0.schema.json`. The browser reads a
deterministically compiled assignment from `node-pack.js`. Regenerate it with:

```text
python3 products/grafomed-v1/scripts/build_node_learning_pack.py \
  products/grafomed-v1/prototypes/learner-app-v0/content-packs/upper-limb-bones.v0.json \
  products/grafomed-v1/prototypes/learner-app-v0/node-pack.js
```

This pack is a content-architecture proof for one node, not evidence that the
full cluster has Duolingo-scale depth. Its clinical/anatomical copy remains
candidate, and its transfer prompts are image-ready placeholders rather than
licensed, annotated specimen or diagnostic-image assets.

## USAMEDIC brand layer

The prototype uses the original USAMEDIC PNG lockup and shield together with
the canonical visual tokens: primary blue `#2A7DE1`, secondary turquoise
`#1DCAD3`, accent cyan `#1BACE4`, Montserrat headings and Poppins body text.
GrafoMed Quest remains the product name under the USAMEDIC parent brand.

This layer changes presentation only. It does not alter mission selection,
assessment logic, evidence events, browser-local state, or any canonical
learner-state boundary. Green, amber and red remain reserved for semantic
success, warning and danger states.

## State boundary

The prototype stores synthetic demo progress only in browser `localStorage`
under `grafomed.learning.prototype.upper-limb.v1.2`. Resetting the demo removes
that browser-local state. No request is made to `learner-state/`, `graph/`, or
any canonical workspace object.

## Run

Serve `products/grafomed-v1` and open:

```text
http://127.0.0.1:8765/prototypes/learner-app-v0/index.html
```

Regenerate the browser data after editing the candidate cluster:

```text
python3 products/grafomed-v1/scripts/build_upper_limb_learning_prototype_data.py \
  products/grafomed-v1/designs/objective-clusters/upper-limb-v0.yaml \
  products/grafomed-v1/prototypes/learner-app-v0/data.js
```
