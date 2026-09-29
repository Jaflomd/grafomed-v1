# Design iterations and validation gates

Date: 2026-09-17. Status: research/design review completed; implementation and learner testing not performed. Pillars: amauta-education (primary), ai-enhancement, research.

## Bounded autoresearch record

No installed autoresearch workflow or empirical dataset was available. This run used a bounded evidence–design–critique cycle, not autonomous efficacy optimization.

| Iteration | Input and challenge | Revision |
|---|---|---|
| R0: reconstruct | Latest user agreement and existing product/prototype; older note says MCQ-focused mastery | Preserve concepts as teaching, multiformat integrated mastery, shared supports and independent/assisted evidence; mark earlier MCQ-only emphasis superseded by conversation, not silently amend binding spec |
| R1: research | Ten primary educational studies; positive examples, null adaptation, constrained transfer, expertise effects | Add worked/completion examples and skippable scaffolding; feedback depth optional; separate retention from transfer; test simple adaptation against fixed route |
| R2: adversarial review | Engineering reviewer inspected prototype and eight failure scenarios; education reviewer checked mechanism evidence | Require a complete remedial teaching trajectory, serial-step dependence controls, indeterminate scoring, content versions, nonmonotonic current evidence and explicit authoring workload |

Independent reviewer perspectives are reasoning checks, not independently collected empirical evidence. No learner outcomes, statistical tests, production code tests or clinical validation were generated in this run. A final engineering read of all three outputs found no material implementation-claim contradiction and requested a containment-cycle clarification; that clarification was incorporated. This review did not independently revalidate the bibliography.

## Compatibility findings

- PRODUCT_SPEC.md v0.4.1 remains binding. The new proposal must be approved and reconciled through a later spec amendment before migration.
- Earlier `reviews/learning-unit-interaction-model-2026-09-17.md` captures an earlier stage. Latest user confirmation permits multiple mastery assessment formats and serial cases.
- Reconcile the spec's single-observable-objective language with an integrated mastery containing decisions: define a bounded integrated performance and explicit component evidence, rather than silently merge independently scored targets.
- Current relation registry has typed relationships and limits prerequisite cycles; preserve that distinction rather than make the entire clinical graph acyclic.
- Engineering inspection: the upper-limb prototype pack has teaching plus evaluable activities but a shared node reference, limited hints, no full instructional-variant/serial dependency model; short answers use a whitelist; feedback is immediate; demo progress includes best-ever monotonic behavior. These are prototype limitations, not demonstrated production defects. No code was changed.

## Ten adversarial design checks

All rows are required acceptance scenarios for future implementation, NOT executed software tests.

| Scenario | Required behavior | Prohibited shortcut |
|---|---|---|
| Repeated failure after reading | Alternative example, simpler task or review escape | Endless equivalent quizzes or credit for viewing |
| Answer-revealing hint followed by success | Record help; fresh later unaided check | Count as independent evidence |
| Shared rule gets a material update | Preserve old evidence/version; review affected links | Rewrite history or invalidate everything indiscriminately |
| Wrong early case step | Canonical continuation with supplied information recorded | Cascade punishment or independent credit for cued steps |
| High average, applicable critical violation | Explicit reviewed critical criterion remains visible | Hide under average or apply in irrelevant contexts |
| Valid answer outside key; two valid orders | Alternatives, partial order, or review/indeterminate | Infer learner deficit from scorer limitations |
| Prior success reused in new cluster | Credit prior evidence; check relevant context difference | Repeat everything or certify transfer automatically |
| Immediate success, delayed failure | Update present recommendation; retain historical success | Best-ever-only state or inactivity treated as error |
| Two concurrent prerequisite inserts jointly create cycle | Atomic/serialized validation rejects invalid final graph | Independent pre-insert checks without concurrency protection |
| Integrated answer correct but components not observable | Attribute only directly supported evidence | Mark all ancestors and supporting rules mastered |

## Empirical plan, explicitly not completed

### Gate 1: content and inference audit

Two qualified reviewers independently inspect targets, acceptable alternatives, help disclosure, case dependency and critical-rule applicability. Reconcile disagreements before release; repeated disagreement triggers item redesign, not average scoring. Reserve case families and scenario differences before instruction authoring is finalized to reduce assessment leakage. Use fictitious or appropriately deidentified cases, never identifiable patient records.

### Gate 2: feasibility and usability

Proposed initial 8–12 learners spanning relevant prior knowledge. This is a practical usability range, not an efficacy sample-size calculation. Observe whether they can complete an entire teaching/remediation/independent-check route. Measure broken routes, explanation clarity, hint exposure accuracy, burden, scoring disputes and editorial minutes per usable activity. Use consent and institutional review as applicable to the intended study/data use. No performance claims from a small uncontrolled pilot.

Pause a route for a confirmed unsafe key, evidence leakage in evaluation, untraceable scoring or critical data isolation failure. Record other issues by severity and revise before expansion. Lack of spare reviewer capacity is a scope limit, not a reason to auto-publish clinical content.

### Gate 3: incremental adaptation evaluation

Compare an evidence-informed fixed teaching route with a simple adaptive route using the same content pool and comparable access/time allowance. Both arms receive teaching, practice and feedback. Randomize at learner level if contamination can be controlled; otherwise choose a justified cluster design and account for clustering. Keep case families held out from practice.

Proposed primary outcome: independently scored performance on novel, relevant cases after a prespecified delay (e.g. 2–4 weeks as a study choice, not an optimal interval claim). Use blinded raters where feasible. Separate recall, near transfer, broader transfer and help use. Secondary outcomes: learner time, critical-rule errors, completion, burden and content-maintenance cost. Analyze by assigned group, disclose missingness/attrition, and prespecify baseline knowledge adjustment. Model dependence within learner and case; do not count serial steps as independent people or cases.

Specify the educationally meaningful difference, primary estimand, analysis and sample size before recruiting; estimate needed variance from a suitable pilot or external data. If seeking equal learning with lower time, design a justified noninferiority framework plus efficiency outcome; nonsignificant score differences alone are not equivalence. Do not optimize only the students who complete.

### Gate 4: decision to retain or simplify

Retain adaptation if independent delayed performance or rigorously demonstrated efficiency improves without unacceptable harm, burden or maintenance. If the fixed route performs similarly and is cheaper, ship the fixed route with optional support. If only recall improves, report recall improvement and revise case teaching before claiming decision transfer. Any move toward workplace or clinical outcome claims needs a separate validation program.

## Re-entry point

Next authorized decision: review the revised proposal, then approve a narrow PRODUCT_SPEC amendment and a one-cluster implementation contract. Start with target/teaching/evidence authoring and one complete remedial path, not a large knowledge graph or a formal cognitive model. Open issues: first cluster, reviewer capacity, exact rubric criteria and pilot access. These do not prevent completion of this research deliverable.
