# Local API and content contract v1

All JSON responses; errors `{error: message}`. Same-origin cookies, CSRF header `X-CSRF-Token` on POST (value from GET /api/bootstrap). No third-party dependencies. Text rendered with textContent, never untrusted HTML.

GET `/api/integration`: read-only `grafomed-integration-snapshot.v1` joining the disposable viewer projection, candidate packet metadata, routes and active learner release metadata. It never includes learner state, attempts, session identifiers or answer keys. `governance.canonical_write` is always `false`; the snapshot is internal-only and candidate-scoped.

GET `/api/bootstrap`: `{learner:{id,name},csrf,release:{id,title,status},nodes:[{id,type,title,description}],edges:[{source,target,kind}],learning_units:[{id,decision_id,kind:'teaching'|'assessment',ref_type:'unit'|'activity',ref_id,position,title,target_id,format}],units:[...legacy teaching projections...],activities:[...legacy assessment projections...],cases:[{id,title,mode,description,mastery_id,step_count}],states:[{node_id,title,status,independent,assisted,errors,contexts:[],last_at,due_at,retention,critical_errors}],next:{kind:'teach'|'practice'|'review'|'case'|'complete',id,title,reason},recent:[],stats:{attempts,independent,assisted,units_seen},seen_units:[]}`.

Learner contract: the graph `node` is not the minimum executable product unit. A `learning unit` is the smallest learner-facing step and is represented operationally as either a teaching `unit` (explanation, example, boundary or microvideo) or an assessment `activity` (choice, multi-select, ordering or short response). One decision may contain several learning units and several assessment formats; free text is optional and should not be used when a decision can be assessed by selection.

POST `/api/profile` `{name}` creates a NEW local learner/session, preserves previous learner in DB. Returns bootstrap shape. Browser cookie isolates users; no arbitrary learner ID in API accepted. UI clarify local-only profiles, no cloud auth.
POST `/api/teach` `{unit_id}` records exposure, returns `{ok:true}`. Reading is not mastery.
POST `/api/start` `{activity_id}` returns `{run_id,activity}`.
Public `activity`: `{id,title,prompt,format:'choice'|'multi'|'order'|'short',options:[{id,text}],phase,context,target_id}`. No accepted responses, key, hint or feedback before disclosure.
POST `/api/hint` `{run_id}` returns `{hint}` and logs help. Not allowed evaluation.
POST `/api/submit` `{run_id,response,key}` response uses option ID string / array of option IDs / short text. Idempotency `key` required, unique per submission. Returns `{outcome:'correct'|'incorrect'|'indeterminate',feedback,assisted,critical,remediation:{unit_id,body}|null,state}`. Closed run cannot be resubmitted with different key.
POST `/api/case/start` `{case_id}` returns `{case_run_id,step_index,total,mode,context,run_id,activity}`. May resume active run.
POST `/api/case/answer` `{case_run_id,run_id,response,key}` returns `{done:false,step_index,total,mode,context,run_id,activity,previous:{outcome,feedback}|null}` OR `{done:true,summary:{title,results:[{title,outcome,feedback,assisted,critical}],message}}`. Evaluation `previous` always null; no feedback until complete. Context can include canonical continuation; this is logged as implicit support. Cases do not auto-credit every prerequisite.
GET `/api/export`: JSON learner events, attempts, state, release and policy versions (no session tokens).
GET `/api/health`: `{ok:true,schema_version:1}`.

## Content JSON shape: content/thyroid.v1.json

`{release:{id,title,status:'candidate',version:1},sources:[{id,title,url,accessed,scope,rights}],nodes:[{id,type:'cluster'|'cluster-maj'|'cluster-min'|'mastery'|'decision'|'concept'|'rule'|'procedure',title,description}],edges:[{source,target,kind:'contains'|'integrates'|'supports'|'requires'}],units:[{id,title,target_id,body,example,alternative,boundary,source_ids:[],media?:{kind,label,caption,status}}],activities:[{id,title,target_id,format:'choice'|'multi'|'order'|'short',phase:'guided'|'independent'|'review',context,prompt,options:[{id,text}],answer:string|array,accepted:[] (short only),hint,feedback,critical:false,source_ids:[]}],cases:[{id,title,mastery_id,mode:'practice'|'evaluation',description,route_decision_id?,steps:[{activity_id,context,supplied:false}]}]}`.

Content: 2 masteries, 4 decision learning targets, shared rules/procedure, ~4 units, each decision has guided/independent/review variants. Case-specific activities phase independent are not offered standalone (server excludes their IDs). Two practice cases + two evaluation cases with 2–3 steps, explicit context for every step. Use educational physiological interpretation decisions, not treatment dosing. Supplied=true means continuation reveals prior answer; counts support. All items original, source-mapped, no invented clinical validation.
