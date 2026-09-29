---
id: grafomed-learning-design-research-20260917
type: SPEC
project_kind: app
status: complete
owner: ajolito
created_at: 2026-09-17
updated_at: 2026-09-17
review_due: 2026-09-24
pillars: [amauta-education, ai-enhancement, research]
pillar_role:
  primary: amauta-education
  secondary: [ai-enhancement, research]
risk_level: medium
sensitivity: internal
project: grafomed-v1
agent: agent.md
---

# Evidence-informed improvement of Grafo Med's learning design

## Objective
Improve Javier's confirmed medical-learning product proposal through targeted research, explicit counterevidence, design revision, and adversarial checks.

## Context
Grafo Med is intended to teach through short conceptual inputs, then provide practice on heuristics, procedures, decisions and integrated mastery. Clusters contain multiple mastery targets; each integrates several decisions with reusable learning supports. Learner evidence retains context, assistance, versions and time. The latest conversation confirms multiformat mastery assessment and serial cases, superseding the earlier MCQ-only emphasis. The product should adapt instruction as well as assessment. A formal cognitive diagnosis model is deferred.

## Output
- A traceable evidence review including findings that constrain or contradict proposed mechanisms.
- A revised product proposal with a concrete teaching/practice/remediation loop, learner model, SQL implications, and bounded MVP.
- An iteration log, design consistency checks, and an empirical validation plan with explicit limits.

## Constraints
- Remain within the existing product; no new active front, migration, or publication.
- Do not implement production code, amend PRODUCT_SPEC.md, or promote clinical content in this task.
- Research is targeted, not systematic. Distinguish primary research, vendor reports, inference, and proposal.
- Do not claim user testing, clinical validity, experimental efficacy, or causal product improvements without data.
- Avoid a formal CDM, automatic clinical certification, and an unrestricted AI examiner in the first version.
- Preserve approved design direction separately from recommendations still open for review.

## Acceptance Criteria
- Verify cited study identity and findings against accessible primary records.
- Include positive, mixed/null, and transfer-limiting evidence.
- Give every material proposed feature a rationale, implementation cost and observable falsification criterion.
- Address instruction, learner adaptation, serial-case dependence, context transfer, scoring ambiguity, content versioning, and maintenance.
- Resolve or expose contradictions with current project artifacts.

## Done When
Reviewable outputs are saved under outputs/, claims are source-linked, and outstanding empirical work is identified without being presented as completed.

## Requirements Debt
No empirical learner dataset or field trial is available. No installed autoresearch procedure was located; this run uses explicit research/design/review iterations. The binding product schema remains v0.4.1. No efficacy or psychometric threshold is set by this research task.
