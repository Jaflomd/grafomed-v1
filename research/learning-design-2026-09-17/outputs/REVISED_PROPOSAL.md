# Grafo Med: teach, support, decide, integrate, revisit

Date: 2026-09-17. Status: proposed refinement, not an amendment to the binding PRODUCT_SPEC.md v0.4.1. Owner: Ajolito; educational review: Alexei. Pillars: amauta-education (primary), ai-enhancement, research.

## Product promise

Grafo Med teaches the learner what they need, helps them practise with progressively less support, and collects contextual evidence of what they can do independently. It recommends the next useful learning action without pretending to know the learner's mind or to certify clinical competence.

“Medical Duolingo” is the experience analogy, not the validation claim. The advantage to test is better independent, retained decision performance for an acceptable learner and editorial workload—not longer streaks, more questions, or a more elaborate graph.

## Preserve the agreed model, separate its meanings

| Layer | Meaning | What it is not |
|---|---|---|
| Cluster | A curricular context containing several mastery targets | A separate copy of every shared node |
| Mastery target | An integrated capability involving multiple decisions | A particular MCQ or a permanently acquired badge |
| Decision | An observable choice that changes the next action, instantiated in many scenarios | The wording or format of one assessment item |
| Concept, in the learner vocabulary | A brief instructional unit: explanation, diagram, reading or video | The medical ontology entity itself, or evidence of mastery merely because it was viewed |
| Fact/rule/heuristic | An assessable proposition with conditions, exceptions and provenance | An unconditional truth or an automatically critical safety rule |
| Procedure | An assessable sequence, grouping or operation | Always a single rigid order; some steps may commute |
| Activity or case | A versioned teaching/practice/assessment delivery | The capability being learned |

Use a separate internal name such as `instructional_unit` for the learner's “concept”, while preserving their familiar label in the app. Link it to medical entities and learning targets. A decision may use multiple supports; a support or decision can serve several masteries and clusters. Instruction in physiology or biochemistry remains legitimate without artificially converting every mechanism into a clinical action.

The curriculum's containment, prerequisite relations and clinical relationships are different edge families. Enforce a DAG for prerequisites, not indiscriminately for all relationships; a physiological feedback loop is not an invalid curriculum. Containment must also respect its allowed types and directions, with cycle checks if same-type nesting is introduced. A runtime learning loop can revisit a node without adding a cyclic prerequisite edge.

## The minimum complete teaching loop

1. Orient: show the capability and why it matters; offer a brief entry check when useful.
2. Teach: concise explanation plus an example demonstrating why the principle applies. A boundary or counterexample prevents overgeneralization.
3. Complete: ask the learner to finish part of a worked example, with optional support.
4. Decide independently: use a new task without revealed answer cues.
5. Integrate: connect several decisions in a coherent case, with an explicit practice or evaluation mode.
6. Revisit: check retention later and, separately, application to a meaningfully different context.

This is a set of available actions, not a mandatory staircase. Existing pertinent evidence can shorten the route; all learners can request explanations. An error may lead to a different explanation, an example, simpler practice, or a focused check—not automatically another equivalent question. Repeated failures also trigger an escape route and possible content review, not an endless remedial queue. Active case-based retrieval should complement instruction rather than rely on rereading alone [E10].

Each instructional unit should have an objective, a concise explanation, a worked example, a scope boundary, an associated check, and at least one alternative route where novices commonly struggle. These are an authoring contract, not a requirement to put six screens in every lesson. Duration is a usability hypothesis, not a universal two-minute scientific threshold. Worked examples and gradual withdrawal have supporting evidence, but expert learners may find compulsory examples redundant [E1–E3].

During practice, provide a brief explanation of the relevant principle and optional expanded reasoning. Do not require self-explanation after every click. During evaluation, defer corrective feedback until the defined evaluation unit ends; this protects interpretation of unaided evidence, not a claim that delayed feedback always teaches better [E3–E4].

## Transparent adaptation before cognitive diagnosis

Start with a small versioned rule policy. It chooses one next action and exposes a short reason:

| Evidence available | Candidate next action | Learner-facing reason |
|---|---|---|
| No relevant evidence | Brief teaching or optional entry check | “Primero veremos cómo funciona.” |
| Correct only with substantial help | Similar principle in a fresh, less-supported task | “Lo resolviste con apoyo; probemos sin la pista.” |
| Wrong answer with uncertain cause | Targeted check or learner-selected explanation | “Revisemos qué parte te está dificultando la decisión.” |
| Repeated difficulty | Alternative example and simpler completion task | “Probemos otra explicación antes de volver al caso.” |
| Independent recent success | Integration or selected new context | “Ahora combinemos esta decisión con otras.” |
| Prior independent success, delayed failure | Targeted review, preserving historical success | “Esto necesita refrescarse.” |
| Important rule/content revision | Check the affected change | “Esta recomendación se actualizó.” |

A failed decision does not identify its missing prerequisite. Any diagnostic attribution remains a hypothesis until a task designed to discriminate it provides evidence. Opening an optional explanation is not an error. Inactivity is missing evidence, not observed forgetting. Do not infer immutable learning styles or expertise from one correct answer.

Adaptive scheduling has promising efficiency results but not universal superiority; adaptive scaffolding and notification interventions have also produced null findings [E5–E7]. Compare this policy with a good fixed teaching sequence before adding ML or formal CDM. Interleave selected contrasts when learners have foundations; do not mix everything from the outset [E8].

## Evidence, not a single mastery percentage

Keep raw attempts immutable and a recomputable learner-target summary containing: observed performance; exact help disclosed; content/rubric version; direct versus supporting evidence; case family and context; observation date; delayed retention observations; unresolved scoring disputes; and the reason for the next recommendation.

Separate dimensions: exposure, assisted performance, independent performance, context coverage, delayed retention and evidence uncertainty. “Solved independently in two reviewed contexts; delayed check pending” is more honest than “92% mastered.” Any future probability requires calibration against an explicitly defined outcome.

A correct integrated answer does not certify all its dependencies. An activity's author must label targets as directly assessed, supporting or background, and state which response features support each inference. A mastery can have strong evidence for some constituent decisions and insufficient integration evidence. A rule-recall result does not establish novel-case transfer [E4].

Example end-of-module copy, with illustrative counts rather than thresholds:

> “Completaste el recorrido de tiroides. Resolviste dos decisiones sin ayuda en los casos practicados. En otra utilizaste una pista: te ofrecemos una explicación breve y un caso nuevo. Tu comprobación de retención está pendiente. Esto describe tu desempeño en la app, no una certificación clínica.”

## Serial cases without false independence

Use authored linear cases first. Each step declares available information, prior-step dependency, directly assessed targets, accepted alternatives and conditional critical rules. Distinguish a learner-chosen clinical path from a neutral canonical continuation supplied to make later steps assessable.

If an early response is wrong, a later stage can say “For the next question, assume X has been established.” Record that X was supplied. Avoid both cascading penalties for the same initial error and treating later cued responses as fully independent successes. A case's related steps are not interchangeable with independent case replications.

Practice permits feedback and hints. Evaluation suppresses them until the chosen unit ends, but newly revealed clinical information may itself help: record that dependency. Critical-rule violations require a reviewed rule, an applicable condition and an observable opportunity to violate it; a high average cannot hide one, and an inapplicable rule cannot manufacture one.

Short answers use reviewed rubrics with acceptable alternatives and an indeterminate/review outcome. Procedures can use partial-order constraints rather than one exact sequence. Do not deploy unrestricted automated clinical scoring as the first version.

## Minimal SQL architecture, not a new database paradigm

This is a logical mapping for a later migration design, not production DDL. Reuse current stable object IDs and contracts where possible.

| Logical tables | Responsibility |
|---|---|
| `nodes`, `node_versions`, typed `edges` | Stable target identity, versioned definitions, membership/support/prerequisites |
| `instructional_units`, `resource_versions`, `resource_variants` | Learner-facing teaching separated from medical truth and assessment |
| `activity_versions`, `activity_targets`, `rubric_versions` | Delivery format, direct/supporting/background targets, acceptable responses |
| `case_versions`, `case_steps` | Information state, dependencies, continuation and feedback mode |
| `learning_events`, `attempts`, `attempt_target_evidence` | Exposure, hints, responses and target-level observations linked to exact versions |
| `learner_target_state`, `route_actions` | Rebuildable summary and recommendation with evidence/policy provenance |
| `content_releases`, `policy_versions` | Which reviewed package and adaptation rule set produced a session |

An attempt records learner pseudonymous ID, activity/rubric version, case run and step, response, timestamp, mode, help events and scorer outcome. Idempotency keys prevent retries becoming extra evidence. Regrading creates an auditable correction, not silent historical replacement. Apply user access controls and retention/deletion policy before real learner data; do not ingest identifiable patient material.

Prerequisite cycle checks must operate with appropriate transaction serialization or locking, including concurrent inserts. Checking for a cycle and inserting outside a protected transaction is insufficient. A reviewer-controlled release prevents incomplete authoring edits becoming live learner content.

## What to build and what to defer

Proposed scope: one reviewed cluster, two integrated mastery targets, four to six decisions with shared supports, and a small set of practice, evaluation and held-out case families. Exact counts depend on coverage and reviewer capacity, not a psychometric claim. One complete path must demonstrate failure → different teaching → guided completion → unaided new task → delayed check.

Before broadening content, provide structured authoring, review and change-impact tracking. Editing JSON/Markdown with validation is acceptable initially; a large CMS is not necessary. Separate author from clinical reviewer for high-risk content. Every clinical rule needs source, jurisdiction where relevant, review date, exceptions and affected activities. Reserve meaningful scenario axes, such as presentation or uncertainty, rather than generate thousands of cosmetic variants.

Defer formal CDM/BKT/IRT, a huge branching patient simulator, live AI-generated clinical grading, learned recommendation models, personalized video generation and clinical certification. These can be reconsidered only if a measured bottleneck justifies them.

Current prototype is a useful starting point, not this system already delivered: it includes teaching and practice in one upper-limb mastery, local browser state, a short-answer whitelist and a demo progress index. It lacks the proposed full teaching adaptation and serial-case evidence controls. Replace monotonic best-ever progress before interpreting it as current knowledge. A browser demo is not a production SQL backend.

## Decision ledger: rationale, cost, disconfirmation

| Proposed improvement | Rationale | Relative cost | What would make us change it |
|---|---|---|---|
| Worked example → completion → independent task, skippable | E1–E2; protect explicit teaching (E9) | Medium editorial, low engine | Extra time without better independent delayed performance; redundancy for advanced learners |
| Short feedback plus optional depth | E3–E4; avoid compulsory prompting | Medium editorial, low engine | No useful outcome gain from added depth, or avoidable burden |
| Simple explainable routing | E5–E7 are mixed | Medium engineering | Good fixed route performs as well with less maintenance or burden |
| Distinct help, retention and context evidence | Avoid unearned mastery inference; E4 | Medium engineering/editorial | Learner confusion or inference disagreements require simpler labels, not hidden false precision |
| Linear serial cases with dependency control | Preserve integrated decisions without double-counting | Medium | Review cannot attribute evidence reliably; redesign steps before expanding |
| Selective contrast and held-out cases | E4/E8 limit blanket transfer assumptions | Medium–high editorial | Recall improves but new-context decision performance does not |
| Versioned content/rubrics and change-impact review | Clinical correctness and reproducibility requirement | Medium technical, recurring reviewer cost | Untraceable state or unaffordable updates require a narrower content scope |

Sources: [Evidence review](EVIDENCE_REVIEW.md). Design challenges and empirical gates: [Validation and iterations](VALIDATION_AND_ITERATIONS.md).
