# Thyroid candidate pack: provenance and review boundary

Status: **candidate / not clinically validated**, authored 2026-09-17. Spanish explanations, scenarios, prompts and distractors are original educational material, not copied questions. No real patient records, dosing, treatment recommendations or clinical certification are included. This is a physiology demonstrator, not a full thyroid curriculum.

Current release: `thyroid.v1.1`, version `2`; filename retained as the loader contract. This revision adds direct assessment of three rules and the synthesis procedure without altering installed version-1 evidence. Spanish terminology uses `desyodasa` (enzyme, no accent) and `desyodación` (process, accented).

## Source map

| Source ID | Authoritative source | Consulted scope | Maps to |
|---|---|---|---|
| ata-tests | [American Thyroid Association: Thyroid Function Tests](https://www.thyroid.org/thyroid-function-tests/) | Public professional-society explanation; full webpage reviewed, especially total/free hormone and intact-axis limitations | u-availability, availability items, rule boundaries and axis cases |
| endotext-synthesis | [Rousset, Dupuy, Miot and Dumont: Thyroid Hormone Synthesis And Secretion](https://www.ncbi.nlm.nih.gov/books/NBK285550/) | Specialist reference chapter, last update 2015-09-02; abstract and synthesis sections reviewed | u-synthesis, synthesis items and production cases |
| physiology-hormone | [Physiology, Thyroid Hormone](https://www.ncbi.nlm.nih.gov/books/NBK500006/) | Reference chapter webpage reviewed for feedback and hormone transformation | u-feedback and feedback items |
| signaling-review | [Paradigms of Dynamic Control of Thyroid Hormone Signaling](https://pubmed.ncbi.nlm.nih.gov/31033998/) | Search-indexed abstract consulted; direct PubMed opening returned no text. Full article not read | u-conversion and conversion items; cross-checked with the physiology chapter |

Accessed 2026-09-17. These are source-supported educational claims, **not validation of the authored items or their scoring**. No source figures or long excerpts are embedded. The `source_ids` on every instructional unit and activity are the machine-readable map. Source updates require a new content release and review; do not silently change past attempt evidence.

## Scope and simplifications

- Four decisions are choices of physiological interpretation in educational experiments, not treatment orders. Concepts remain instruction, rules support interpretation, and the ordered synthesis sequence is a reduced procedural learning task, not a clinical checklist.
- Predictions explicitly assume an intact axis, enough time to reach a stable response, and other pathways held constant where stated. Real endocrine feedback includes delays and context that this candidate model does not simulate.
- Total/free hormone examples deliberately exclude pregnancy, acute illness and assay interference. Normal TSH cannot universally rule out thyroid dysfunction. The module does not teach clinical testing algorithms or reference intervals.
- Synthesis is reduced to three stations; organification and coupling are grouped for ordering, while localization items distinguish incorporation of iodine. Transport into the follicular lumen, storage details and recycling are not separately assessed.
- T4→T3 and T4→rT3 are contrasted as distinct destinations. The pack does not teach that all desyodation activates hormone or that rT3 should be ordered routinely.
- Every `critical` flag is false: the physiology exercises have no reviewed patient-safety critical-error rubric. Do not label a basic knowledge error as a clinical safety event.
- Short responses use narrow direction/term tasks. A response outside explicit accepted variants must be reviewable/indeterminate rather than a claim of wrong clinical reasoning. No free-text reasoning competence is inferred.
- Two practice and two evaluation cases contain separate item IDs. They are short serial laboratory scenarios, not a longitudinal patient simulator; some steps are independent experiments. The production practice continuation is explicitly supplied and therefore aided evidence.
- Mastery m-production also uses the availability decision shared with m-axis. Both production cases include a third step for this target. One correct case still cannot establish durable mastery; aggregate direct targets without assuming every prerequisite was tested.
- This first pack has 26 items: 12 standalone decision items, 4 direct rule/procedure items and 10 case-specific items. Concepts remain instructional exposures, not automatically mastered nodes. Direct rule/procedure success does not certify the decisions they support.
- There is no sealed external holdout bank. Case variants are close to teaching; passing does not demonstrate far transfer. All evaluation content is inspectable in this local source repository.

## Human review required before release

An endocrinology educator should review scientific scope, wording, plausible distractors, canonical continuation, accessibility and answer variants. Pilot response-process review is required before interpreting score differences. Test developers should replace intentionally simple first-pass distractors with plausible misconceptions where appropriate and create separate held-out case families. No effectiveness claim or learner-data validation has been performed.
