# GrafoMed learner app · literature-to-product traceability

Status: `implemented_as_candidate_demo_not_validated`

Date: 2026-08-29

## Purpose

This review traces the main findings from the saved learning-route synthesis,
the GrafoMed gap literature search, and the original-graph audit into observable
prototype behavior or a candidate data contract. “Implemented” means visible or
testable in this local prototype; it does not mean empirically validated.

## Traceability matrix

| Literature-derived finding | Product rule | Implementation | Current limit |
|---|---|---|---|
| Tags retrieve; graphs order; learner state personalizes; assessment closes the loop | Route ranking uses learner state and is updated after formative evidence | `app.js`: `rankCandidates`, `updateRouteDecision`, `commitLessonResult` | Prerequisite relations and weights remain synthetic |
| Use a ready-to-learn frontier, not a forced linear sequence | Show three viable missions and let the learner override | Today frontier and Journey availability states | Only three missions have complete lesson content |
| Recommendations should be explainable | Show rank factors, why now, uncertainty and what would change the choice | Today mission card and route decision record | Explanations need user testing |
| Separate concept route from resource route | Keep objective choice distinct from modality/resource choice | `resource-route` display and context controls | Resource quality metadata is not yet source-locked |
| Context changes the route, not mastery | Time, fatigue, modality and low-bandwidth mode rerank only the route | Context controls; route decision snapshot | No learned personalization model |
| A single score or item cannot prove competence | All activity is explicitly low-stakes formative | Assessment boundary in every question; `assessment-use.v0.json` | No high-stakes validity program exists |
| Evidence must preserve assistance and exact versions | Record hint level, confidence, latency, context, scorer and version pins | Evidence ledger and `evidence-event.v0.schema.json` | Browser events are not signed or server-immutable |
| Missing activity is not failure | Model seven explicit missingness states | Learner state, distribution copy and governance contract | Only `not_attempted` and `not_observed` are exercised in the demo |
| Learners should inspect and contest the model | Expose belief, evidence, uncertainty, change conditions and contest action | Open learner model in Profile | Contest resolution workflow is not implemented |
| Game rewards must not masquerade as competence | Store XP/quest state separately; exclude speed and streak penalties | `game` object and Profile game card | Reward parameters are synthetic |
| Reward retrieval, reflection, transfer and calibration | Award game XP for correct retrieval and calibrated confidence, not speed | Question submission and result flow | Effects on motivation are untested |
| Productive error should guide remediation | Contrast chosen and correct alternatives and retain the error pattern | Wrong-answer feedback and evidence event | No adaptive distractor model yet |
| Durable mastery requires delayed retention and transfer | Schedule both after immediate acquisition | Result screen and `scheduledChecks` | Scheduler is demonstrative, not operational |
| Every pedagogical mechanic needs a falsification contract | Declare construct, hypothesis, data, intervention, harms and retirement rule | `pedagogical-mechanisms.v0.yaml` | No experiment has yet executed these contracts |
| Fairness, accessibility and privacy are first-class | Surface audit axes, text mode, export, reset and local-only boundary | Profile governance card and `governance.v0.yaml` | Fairness and accessibility audits are explicitly not started |
| Measure learning rather than clicks | Show retention, transfer, agency and audit status | Pilot evaluation card | No empirical outcome data exists |
| Structural validity is not educational validity | Keep candidate and validation labels visible everywhere | Banner, contracts, reviews and tests | External content and psychometric review remain pending |

## Source artifacts used

- `knowledge/domains/medical-education/syntheses/learning-route-graph-systems-cheat-sheet.md`
- legacy lit-search report `2026-08-28-grafomed-overlooked-design-requirements.md`
- `memory/learnings/grafomed-original-audit.md`
- `memory/events/event-20260828-1014-grafomed-gap-literature-search.json`

## Decision

The literature findings are now executable candidate rules rather than prose-only
principles. The next evidentiary step is not more interface expansion: it is a
small pilot that tests route coherence, burden, calibration, delayed retention,
near transfer, accessibility, and subgroup harms against explicit retirement
criteria.
