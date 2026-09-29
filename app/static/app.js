'use strict';

(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const main = $('#main');
  // Learner navigation is intentionally a single route. Internal teaching,
  // practice, cases and evidence remain implementation surfaces behind a node.
  const navItems = [ ['home', 'Mi recorrido', 'home'] ];
  const curriculum = [
    ['medicine','Medicina interna','Patrones y decisiones generales','MI',[['internal-syndromes','Síndromes frecuentes'],['diagnostic-reasoning','Razonamiento diagnóstico'],['treatment-followup','Tratamiento y seguimiento']]],
    ['cardio','Cardiología','Ritmo, bomba y perfusión','CA',[['chest-pain','Dolor torácico'],['heart-failure','Insuficiencia cardiaca'],['arrhythmias','Arritmias']]],
    ['endocrine','Endocrinología','Ejes y regulación hormonal','EN',[['thyroid','Eje tiroideo'],['glucose-metabolism','Metabolismo de la glucosa'],['adrenal-axes','Ejes suprarrenales']]],
    ['neuro','Neurología','Localización y síndromes','NE',[['neurologic-localization','Localización neurológica'],['headache','Cefaleas'],['seizures','Síndromes convulsivos']]],
    ['psychiatry','Psiquiatría','Temas y rutas de salud mental','PS',[['ptsd','TEPT'],['psychiatric-assessment','Evaluación y entrevista psiquiátrica'],['depression-suicide','Depresión y riesgo suicida'],['bipolar-disorder','Trastorno bipolar'],['anxiety-ocd','Ansiedad, pánico y TOC'],['psychosis-first-episode','Psicosis y primer episodio psicótico'],['substance-use','Trastornos por consumo de sustancias'],['psychiatric-emergencies','Urgencias psiquiátricas'],['neurocognition-delirium','Neurocognición y delirium'],['neurodevelopment','Neurodesarrollo: TDAH y autismo'],['personality-crisis','Trastornos de personalidad y crisis']]],
    ['pediatrics','Pediatría','Desarrollo y urgencias','PE',[['growth-development','Crecimiento y desarrollo'],['pediatric-fever','Fiebre en la infancia'],['pediatric-emergencies','Urgencias pediátricas']]],
    ['obgyn','Gineco-obstetricia','Reproducción y embarazo','GO',[['reproductive-health','Salud reproductiva'],['pregnancy','Embarazo'],['obstetric-emergencies','Urgencias obstétricas']]],
    ['surgery','Cirugía general','Evaluación y abdomen agudo','CG',[['preoperative','Evaluación preoperatoria'],['acute-abdomen','Abdomen agudo'],['postoperative','Cuidado posoperatorio']]],
    ['pulmonology','Neumología','Disnea e intercambio gaseoso','NU',[['dyspnea','Disnea'],['airflow-obstruction','Obstrucción al flujo'],['gas-exchange','Intercambio gaseoso']]],
    ['nephrology','Nefrología','Función renal y electrolitos','NF',[['renal-function','Función renal'],['electrolytes','Trastornos hidroelectrolíticos'],['urinary-syndromes','Síndromes urinarios']]],
    ['dermatology','Dermatología','Patrones y lesiones','DE',[['elementary-lesions','Lesiones elementales'],['inflammatory-patterns','Patrones inflamatorios'],['skin-infections','Infecciones cutáneas']]],
    ['emergency','Emergencias','Priorizar y estabilizar','EM',[['prioritization','Priorización'],['initial-stabilization','Estabilización inicial'],['critical-decisions','Decisiones críticas']]]
  ];
  const typeLabels = {cluster:'Cluster', 'cluster-maj':'Cluster mayor · especialidad', 'cluster-min':'Cluster menor · tema', mastery:'Mastery · capacidad integrada',decision:'Decisión',concept:'Concepto · enseñanza',rule:'Regla / heurística',procedure:'Procedimiento'};
  const phaseLabels = {guided:'Práctica guiada',independent:'Sin ayuda inicial',review:'Recuperación espaciada'};
  const formatLabels = {choice:'Una respuesta',multi:'Selección múltiple',order:'Ordenar pasos',short:'Respuesta breve'};
  const statusLabels = {unseen:'Sin evidencia',new:'Sin evidencia',not_started:'Sin evidencia',not_observed:'Sin evidencia',exposed:'Contenido abierto',learning:'En aprendizaje',practicing:'En práctica',needs_practice:'Necesita práctica',with_help:'Demostrado con ayuda',assisted:'Demostrado con ayuda',supported:'Demostrado con ayuda',independent:'Demostrado sin ayuda',demonstrated:'Demostrado sin ayuda',retained:'Retención observada',needs_review:'Necesita revisión',review_due:'Repaso pendiente',uncertain:'Evidencia insuficiente',insufficient:'Evidencia insuficiente'};
  const outcomeLabels = {correct:'Respuesta correcta',incorrect:'Oportunidad de aprendizaje',indeterminate:'Respuesta por revisar'};
  let data = null;
  let page = 'home';
  let activeRun = null;
  let graphSelection = null;
  let selectedCurriculum = 'endocrine';
  let selectedTopic = 'eje-tiroides';
  let graphObserver = null;
  let toastTimer;
  let busy = false;

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }
  function add(parent, ...children) {children.filter(Boolean).forEach(child => parent.append(child)); return parent;}
  function button(text, handler, cls = 'button') {
    const node = el('button', cls, text); node.type = 'button';
    node.addEventListener('click', () => perform(handler)); return node;
  }
  function badge(text, tone = '') {return el('span', `badge ${tone}`, text);}
  function icon(name) {
    const paths = {home:'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',book:'M12 5C8 2 4 3 2 4v16c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-1-10 1Zm0 0v16',bolt:'m13 2-9 12h7l-1 8 10-12h-7Z',layers:'m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5',graph:'M5 5h4v4H5Zm10 10h4v4h-4ZM15 3h4v4h-4ZM3 17h4v4H3ZM9 7l6-2M8 9l7 7M6 9 5 17',chart:'M4 3v18h17M8 16v-5m5 5V6m5 10V9'};
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('fill','none'); svg.setAttribute('stroke','currentColor'); svg.setAttribute('stroke-width','1.7'); svg.setAttribute('stroke-linecap','round'); svg.setAttribute('stroke-linejoin','round'); svg.setAttribute('aria-hidden','true');
    const path = document.createElementNS(svg.namespaceURI,'path'); path.setAttribute('d',paths[name] || paths.book); svg.append(path); return svg;
  }
  function notice(message) {$('#notice').textContent = message; $('#notice').hidden = !message;}
  function toast(message) {clearTimeout(toastTimer); $('#toast').textContent=message; $('#toast').hidden=false; toastTimer=setTimeout(()=>{$('#toast').hidden=true;},4500);}
  async function perform(fn) {
    if (busy) return;
    busy=true; notice('');
    const focused=document.activeElement;
    if(focused instanceof HTMLButtonElement) focused.disabled=true;
    try {await fn();} catch(error) {notice(error.message || 'No se pudo completar la acción. Tu historial anterior se conserva.');}
    finally {busy=false; if(focused instanceof HTMLButtonElement && focused.isConnected && focused.dataset.locked!=='true') focused.disabled=false;}
  }
  async function api(path, body) {
    const options={credentials:'same-origin',headers:{'Accept':'application/json'}};
    if(body!==undefined){options.method='POST';options.headers['Content-Type']='application/json';options.headers['X-CSRF-Token']=data?.csrf || '';options.body=JSON.stringify(body);}
    let response;
    try {response=await fetch(path,options);} catch {throw new Error('No hay conexión con el servidor local. Comprueba que sigue abierto y vuelve a intentar.');}
    let result;
    try {result=await response.json();} catch {throw new Error('El servidor no devolvió una respuesta válida. No se ha confirmado el guardado.');}
    if(!response.ok) throw new Error(result.error || `No se pudo completar la solicitud (${response.status}).`);
    return result;
  }
  function lookup(id){return data.nodes.find(node=>node.id===id);}
  function title(id){return lookup(id)?.title || id || 'Sin título';}
  function learningUnitsForDecision(decisionId){return (data.learning_units||[]).filter(unit=>unit.decision_id===decisionId).sort((a,b)=>a.position-b.position);}
  function nodeState(id){return data.states.find(state=>state.node_id===id);}
  function date(value, time=false){if(!value)return 'Sin registro';const d=new Date(value);return Number.isNaN(d.valueOf())?'Sin fecha válida':new Intl.DateTimeFormat('es-PE',{day:'numeric',month:'short',...(time?{hour:'2-digit',minute:'2-digit'}:{})}).format(d);}
  function isSeen(id){return (data.seen_units||[]).some(unit=>(typeof unit==='string'?unit:unit.unit_id || unit.id)===id);}
  function stateName(state){return state?statusLabels[state.status] || 'Evidencia registrada':'Sin evidencia';}
  function stateTone(state){if(!state)return '';if(['needs_practice','needs_review','uncertain'].includes(state.status))return 'amber';if(['with_help','assisted','supported'].includes(state.status))return 'teal';if(['independent','retained','demonstrated'].includes(state.status))return 'green';return '';}
  function heading(kicker, name, description, action){const h=el('div','page-heading');const copy=el('div');add(copy,el('span','eyebrow',kicker),el('h1','',name),description&&el('p','',description));return add(h,copy,action);}
  function section(name, description, action){const s=el('div','section-heading');const copy=el('div');add(copy,el('h2','',name),description&&el('p','',description));return add(s,copy,action);}
  function callout(name,body,tone=''){const c=el('div',`callout ${tone}`);return add(c,el('strong','',name),el('span','',body));}
  function empty(name,body){return add(el('div','empty'),el('h3','',name),el('p','',body));}
  function drawNav(){const nav=$('#navigation');nav.replaceChildren();navItems.forEach(([id,label,shape])=>{const b=button('',()=>navigate(id),`nav-button${page===id?' active':''}`);add(b,icon(shape),el('span','',label));if(page===id)b.setAttribute('aria-current','page');nav.append(b);});}
  function refreshShell(){ $('#profile-name').textContent=data.learner?.name || 'Mi perfil';$('#avatar').textContent=(data.learner?.name || 'G').slice(0,1).toUpperCase();const attempts=Number(data.stats?.attempts||0);const dates=new Set((data.recent||[]).map(item=>String(item.created_at||'').slice(0,10)));const xp=attempts*8+Number(data.stats?.units_seen||0)*5;const streak=document.querySelector('#streak-stat');const xpStat=document.querySelector('#xp-stat');if(streak)streak.textContent=`🔥 ${dates.size}`;if(xpStat)xpStat.textContent=`⚡ ${xp}`;document.body.classList.add('duo-ui'); }
  async function refreshData(){data=await api('/api/bootstrap');refreshShell();}
  function render(view){if(graphObserver){graphObserver.disconnect();graphObserver=null;}main.replaceChildren(view);view.classList.add('view-enter');drawNav();$('#view-label').textContent=navItems.find(([id])=>id===page)?.[1] || 'Mi recorrido';}
  function navigate(next, updateHash=true){page=navItems.some(([id])=>id===next)?next:'home';activeRun=null;notice('');if(updateHash)history.replaceState(null,'',`#${page}`);const views={home:homeView,learn:learnView,practice:practiceView,cases:casesView,map:mapView,progress:progressView};render(views[page]());if(page==='map')attachGraph();window.scrollTo({top:0,behavior:'instant'});}

  function homeView(){
    const view=el('div');const first=(data.learner?.name || '').split(' ')[0];
    add(view,heading('APRENDER · PRACTICAR · CONECTAR',first?`Tu siguiente paso, ${first}.`:'Tu siguiente paso.','Cada intento deja evidencia. Cada error puede abrir una explicación distinta.'));
    const hero=el('section','hero');const content=el('div');const next=data.next || {kind:'complete',title:'Explora tu recorrido',reason:'Puedes volver a tus conceptos, practicar o integrar decisiones.'};
    const kinds={teach:'PRIMERO, COMPRENDE',practice:'LLEVA LA IDEA A UNA DECISIÓN',review:'VUELVE A RECUPERARLO',case:'CONECTA TUS DECISIONES',complete:'SIGUE EXPLORANDO'};
    add(content,el('span','eyebrow',kinds[next.kind] || 'TU SIGUIENTE PASO'),el('h2','',next.title),el('p','',next.reason),button(next.kind==='teach'?'Abrir explicación →':next.kind==='case'?'Abrir caso →':next.kind==='complete'?'Ver mi evidencia →':'Empezar práctica →',()=>followNext(next),'button primary'));
    const side=el('div','hero-side');add(side,el('strong','',data.nodes.filter(n=>n.type==='decision').length),el('span','','decisiones conectadas en este cluster'),el('div','mini-rule'),el('strong','',data.nodes.filter(n=>n.type==='mastery').length),el('span','','capacidades integradas para explorar'));
    add(hero,content,side);view.append(hero);
    const stats=el('div','stats-row');[['attempts','Intentos registrados'],['independent','Aciertos sin ayuda registrada'],['assisted','Aciertos con ayuda'],['units_seen','Unidades abiertas']].forEach(([key,label])=>add(stats,add(el('div','stat-card'),el('strong','',data.stats?.[key] ?? 0),el('span','',label))));view.append(stats);
    add(view,section('No estudias temas aislados.','Tus decisiones se conectan en capacidades más amplias.',button('Explorar el grafo →',()=>navigate('map'),'button-link')));
    const cards=el('div','card-grid');data.nodes.filter(n=>n.type==='mastery').forEach((node,index)=>{const c=el('article','card');add(c,add(el('div','card-top'),el('span','number-tag',String(index+1).padStart(2,'0')),badge('Mastery · integración','blue')),el('h3','',node.title),el('p','',node.description));const decisions=data.edges.filter(e=>e.source===node.id&&e.kind==='integrates');const list=el('ul','mastery-decisions');decisions.forEach(edge=>{const state=nodeState(edge.target);add(list,add(el('li'),el('span',`dot ${stateTone(state)}`),el('span','',title(edge.target))));});add(c,list,add(el('div','actions'),button('Ver casos relacionados',()=>navigate('cases'),'button small-button')));cards.append(c);});view.append(cards);
    add(view,section('Aprender también cuenta. Pero no es demostrar.'),callout('Un video leído o una explicación vista no certifican dominio.','Se registran por separado la enseñanza, la resolución con ayuda, la resolución independiente y las comprobaciones posteriores. Tu siguiente paso usa esa evidencia, no una racha.','teal'));
    return view;
  }
  // Duolingo-like learner home: motivation is visible, but never presented as mastery.
  function homeView(){
    const view=el('div','journey-home');
    const first=(data.learner?.name || '').split(' ')[0] || 'explorador';
    const next=data.next || {kind:'complete',title:'Explora tu recorrido',reason:'Puedes volver a tus conceptos, practicar o integrar decisiones.'};
    const attempts=Number(data.stats?.attempts || 0);
    const xp=attempts*8+Number(data.stats?.units_seen || 0)*5;
    const today=new Date().toISOString().slice(0,10);
    const activeDates=new Set((data.recent || []).map(item=>String(item.created_at || '').slice(0,10)));
    const dayDots=Array.from({length:7},(_,index)=>{const d=new Date();d.setDate(d.getDate()-(6-index));const iso=d.toISOString().slice(0,10);return `<span class="rh-day${activeDates.has(iso)?' active':''}${iso===today?' today':''}" title="${iso}">${d.toLocaleDateString('es-PE',{weekday:'short'}).slice(0,2)}</span>`;}).join('');
    const nextLabel=next.kind==='teach'?'Abrir explicación':next.kind==='case'?'Abrir caso':next.kind==='complete'?'Ver mi evidencia':'Empezar práctica';
    add(view,el('div','rh-welcome',`Hola, ${first}.`),el('p','rh-subtitle','Hoy no necesitas abarcarlo todo. Solo dar el siguiente paso correcto.'));
    const rhythm=el('section','rh-rhythm');
    add(rhythm,add(el('div','rh-rhythm-copy'),el('span','eyebrow','TU RITMO'),el('strong','',attempts?`${attempts} pasos registrados`:'Primer paso disponible'),el('p','',`Esta semana · ${activeDates.size} ${activeDates.size===1?'día activo':'días activos'}`)),add(el('div','rh-week'),el('div','rh-days',dayDots),el('span','rh-xp',`${xp} puntos de práctica`),el('small','',`No son puntos de dominio`)));
    view.append(rhythm);
    const roadmap=el('section','rh-roadmap');
    add(roadmap,el('div','rh-roadmap-head'),add(el('div'),el('span','eyebrow','TU ROADMAP'),el('h1','rh-roadmap-title','Cada decisión es una estación.'),el('p','rh-roadmap-intro','Primero ves hacia dónde vas. Luego construyes cada decisión en tres pasos: concepto, fact/regla y procedimiento.')));
    const roadmapLevels=el('div','rh-roadmap-levels');
    const phaseDefs=[['concept','CONCEPTO','Entiende la idea'],['rule','FACT / REGLA','Reconoce el principio'],['procedure','PROCEDURE','Ordena cómo actuar']];
    data.nodes.filter(node=>node.type==='mastery').forEach((mastery,levelIndex)=>{
      const level=el('section','rh-roadmap-level');
      const levelCopy=el('div');add(levelCopy,el('span','rh-level-kicker',levelIndex===0?'PRIMERA RUTA':'SIGUIENTE RUTA'),el('h2','',mastery.title));
      add(level,add(el('div','rh-roadmap-level-title'),el('span','rh-level-marker',String(levelIndex+1).padStart(2,'0')),levelCopy));
        const stations=el('div','rh-stations');
      data.edges.filter(edge=>edge.source===mastery.id&&edge.kind==='integrates').map(edge=>lookup(edge.target)).filter(Boolean).forEach((decision,decisionIndex)=>{
        const decisionState=nodeState(decision.id);
        const station=el('article',`rh-station ${decisionState?.status==='independent'?'completed':''}${decisionState?.status==='needs_practice'?' needs-practice':''}`);
        add(station,el('span','rh-station-number rh-decision-orb',String(decisionIndex+1).padStart(2,'0')),el('h3','',decision.title));
        const lanes=el('div','rh-station-lanes');
        const supports=data.edges.filter(edge=>edge.target===decision.id&&edge.kind==='supports').map(edge=>lookup(edge.source)).filter(Boolean);
        station.style.setProperty('--node-count',Math.max(1,supports.length));
        station.setAttribute('aria-label',`${decision.title}. ${supports.length} nodos de aprendizaje.`);
        phaseDefs.forEach(([type,label,description])=>{
          const source=supports.find(item=>item.type===type);
          const lane=el('button',`rh-lane${source?'':' locked'}`);lane.type='button';
          const targetActivity=source&&data.activities.find(item=>item.target_id===source.id);
          const unit=type==='concept'&&data.units.find(item=>item.target_id===decision.id);
          add(lane,el('span','rh-lane-icon',source?(type==='concept'?'💡':type==='rule'?'◆':'↗'):'·'),add(el('span','rh-lane-copy'),el('strong','',label),el('small','',source?source.title:description)),el('span','rh-lane-arrow',source?'→':'🔒'));
          lane.disabled=!source;
          if(source)lane.addEventListener('click',()=>perform(()=>unit?showUnit(unit.id):targetActivity?startActivity(targetActivity.id):Promise.resolve()));
          lanes.append(lane);
        });
        const decisionActivity=data.activities.find(item=>item.target_id===decision.id&&item.phase==='independent')||data.activities.find(item=>item.target_id===decision.id);
        const decisionOrb=station.querySelector('.rh-decision-orb');
        if(decisionOrb){decisionOrb.setAttribute('role','button');decisionOrb.setAttribute('tabindex',decisionActivity?'0':'-1');decisionOrb.setAttribute('title',decision.title);decisionOrb.addEventListener('click',()=>{if(decisionActivity)perform(()=>startActivity(decisionActivity.id));});decisionOrb.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();if(decisionActivity)perform(()=>startActivity(decisionActivity.id));}});}
        if(decisionActivity)lanes.append(button('Aplicar decisión →',()=>startActivity(decisionActivity.id),'button small-button'));
        station.append(lanes);stations.append(station);
      });
      level.append(stations);roadmapLevels.append(level);
    });
    roadmap.append(roadmapLevels);view.append(roadmap);
    const mission=el('section','rh-mission');
    const missionCopy=el('div','rh-mission-copy');
    add(missionCopy,el('span','eyebrow','MISIÓN DE HOY · 5–10 MIN'),el('h1','',next.title),el('p','',next.reason),el('p','rh-mission-proof',`Tu evidencia se conserva: ${data.stats?.independent || 0} aciertos sin ayuda · ${data.stats?.assisted || 0} con ayuda.`));
    add(mission,missionCopy,add(el('div','rh-mission-action'),el('div','rh-mission-orb','✦'),button(nextLabel+' →',()=>followNext(next),'button primary')));view.append(mission);
    add(view,section('Tu ruta de aprendizaje','Dos capacidades integradas. Cada nodo te prepara para decidir; ningún porcentaje aquí certifica dominio.'));
    const route=el('section','rh-route');
    const masteries=data.nodes.filter(node=>node.type==='mastery');
    /*
    masteries.forEach((node,index)=>{const state=nodeState(node.id);const decisions=data.edges.filter(edge=>edge.source===node.id&&edge.kind==='integrates').map(edge=>lookup(edge.target)).filter(Boolean);const observed=Number(state?.independent||0)+Number(state?.assisted||0);const width=Math.min(100,observed*25);const card=el('article',`rh-level${index===0?' current':''}`);add(card,add(el('div','rh-level-marker',String(index+1).padStart(2,'0')),add(el('div','rh-level-copy'),el('span','rh-level-kicker',index===0?'EN CURSO':'SIGUIENTE RUTA'),el('h2','',node.title),el('p','',`${decisions.length} decisiones conectadas · ${observed?observed+' evidencias observadas':'lista para comenzar'}`)),badge(stateName(state),stateTone(state)));const bar=el('div','rh-progress-track');const fill=el('span');fill.style.width=`${width}%`;bar.append(fill);card.append(bar);const steps=el('div','rh-steps');decisions.forEach(decision=>{const ds=nodeState(decision.id);const activity=data.activities.find(item=>item.target_id===decision.id);const step=el('button','rh-step');step.type='button';step.className=`rh-step ${ds?.status==='independent'?'done':''}`;step.setAttribute('aria-label',`${decision.title}. ${stateName(ds)}`);add(step,el('span','rh-step-dot',ds?.status==='independent'?'✓':index===0?'›':'·'),el('span','',decision.title),el('small','',stateName(ds)));if(activity)step.addEventListener('click',()=>perform(()=>startActivity(activity.id)));steps.append(step);});card.append(steps);route.append(card);});view.append(route);
    */
    masteries.forEach((node,index)=>{
      const state=nodeState(node.id);
      const decisions=data.edges.filter(edge=>edge.source===node.id&&edge.kind==='integrates').map(edge=>lookup(edge.target)).filter(Boolean);
      const observed=Number(state?.independent||0)+Number(state?.assisted||0);
      const width=Math.min(100,observed*25);
      const card=el('article',`rh-level${index===0?' current':''}`);
      const marker=el('div','rh-level-marker',String(index+1).padStart(2,'0'));
      const copy=el('div','rh-level-copy');
      add(copy,el('span','rh-level-kicker',index===0?'EN CURSO':'SIGUIENTE RUTA'),el('h2','',node.title),el('p','',`${decisions.length} decisiones conectadas · ${observed?observed+' evidencias observadas':'lista para comenzar'}`));
      add(card,marker,copy,badge(stateName(state),stateTone(state)));
      const bar=el('div','rh-progress-track');const fill=el('span');fill.style.width=`${width}%`;bar.append(fill);card.append(bar);
      const steps=el('div','rh-steps');
      decisions.forEach(decision=>{const ds=nodeState(decision.id);const activity=data.activities.find(item=>item.target_id===decision.id);const step=el('button','rh-step');step.type='button';step.className=`rh-step ${ds?.status==='independent'?'done':''}`;step.setAttribute('aria-label',`${decision.title}. ${stateName(ds)}`);add(step,el('span','rh-step-dot',ds?.status==='independent'?'✓':index===0?'›':'·'),el('span','',decision.title),el('small','',stateName(ds)));if(activity)step.addEventListener('click',()=>perform(()=>startActivity(activity.id)));steps.append(step);});
      card.append(steps);route.append(card);
    });
    view.append(route);
    add(view,section('Tres opciones para continuar','La ruta se adapta a tu evidencia, pero tú puedes elegir.'));
    const frontier=el('div','rh-frontier');
    const candidates=data.nodes.filter(node=>node.type==='decision').slice(0,3);
    candidates.forEach((node,index)=>{const state=nodeState(node.id);const activity=data.activities.find(item=>item.target_id===node.id&&item.phase==='independent')||data.activities.find(item=>item.target_id===node.id);const card=el('article','rh-frontier-card');add(card,el('span','rh-frontier-number',String(index+1)),el('h3','',node.title),el('p','',state?.status==='independent'?'Puedes volver para recuperar la idea.':'Una decisión breve para avanzar.'),badge(stateName(state),stateTone(state)),activity&&button('Elegir →',()=>startActivity(activity.id),'button small-button'));frontier.append(card);});view.append(frontier);
    add(view,callout('La motivación no reemplaza la evidencia.','Los puntos celebran volver, intentar y reflexionar. La evidencia de aprendizaje se observa por separado —con ayuda, sin ayuda, después de un intervalo y en casos integrados.','teal'));
    return view;
  }
  // Final product home: one focused map, one mission, no dashboard clutter.
  function importedNotesHomeView(){
    const view=el('div','duo-home');
    const topics=data.nodes.filter(node=>node.type==='concept');
    const groups=new Map();
    topics.forEach(topic=>{
      const cluster=data.edges.find(edge=>edge.target===topic.id&&edge.kind==='contains');
      const name=cluster?title(cluster.source):'Sin especialidad';
      if(!groups.has(name))groups.set(name,[]);
      groups.get(name).push(topic);
    });
    const first=(data.learner?.name||'').split(' ')[0]||'explorador';
    add(view,add(el('section','duo-unit-header'),add(el('div','duo-unit-copy'),el('span','duo-kicker','USAMEDIC · BASE IMPORTADA'),el('h1','',`Hola, ${first}`),el('p','',`Explora ${topics.length} temas clínicos organizados por especialidad.`)),add(el('div','duo-unit-stats'),add(el('div','duo-unit-stat'),el('strong','',topics.length),el('span','','nodos')),add(el('div','duo-unit-stat'),el('strong','',groups.size),el('span','','especialidades')))));
    const intro=el('section','duo-info-card');add(intro,el('span','duo-kicker','RELEASE CANDIDATO'),el('h2','','Notas clínicas disponibles'),el('p','',`Cada tarjeta abre la nota maestra importada. El contenido está disponible para enriquecer el MVP, pero aún no contiene actividades evaluativas ni certifica dominio clínico.`));view.append(intro);
    const search=el('input','field-input');search.type='search';search.placeholder='Buscar tema o especialidad…';search.setAttribute('aria-label','Buscar tema o especialidad');view.append(search);
    const list=el('div','note-library-list');
    const render=()=>{const query=search.value.trim().toLocaleLowerCase('es-PE');list.replaceChildren();groups.forEach((items,name)=>{const visible=items.filter(item=>!query||name.toLocaleLowerCase('es-PE').includes(query)||item.title.toLocaleLowerCase('es-PE').includes(query));if(!visible.length)return;const section=el('section','note-specialty-section');add(section,el('h2','',name),el('p','muted small',`${visible.length} tema${visible.length===1?'':'s'}`));const cards=el('div','card-grid');visible.forEach((item,index)=>{const unit=data.units.find(candidate=>candidate.target_id===item.id);const card=el('article','card');add(card,add(el('div','card-top'),el('span','number-tag',String(index+1).padStart(2,'0')),badge('Nodo · nota clínica','blue')),el('h3','',item.title),el('p','',item.description),unit&&button('Abrir nota →',()=>showUnit(unit.id),'button small-button'));cards.append(card);});section.append(cards);list.append(section);});if(!list.children.length)list.append(empty('No encontramos ese tema.','Prueba con otra palabra o especialidad.'));};
    search.addEventListener('input',render);render();view.append(list);return view;
  }
  function routeMastery(curriculumId, topicId){
    const clusterId=curriculumId==='psychiatry'?topicId:curriculumId==='endocrine'?'thyroid':null;
    if(!clusterId)return null;
    const current=curriculum.find(item=>item[0]===curriculumId);
    const topicIndex=curriculumId==='psychiatry'?0:Math.max(0,current?.[4].findIndex(topic=>topic[0]===topicId) ?? 0);
    const masteryIds=data.edges.filter(edge=>edge.source===clusterId&&edge.kind==='contains').map(edge=>edge.target);
    return lookup(masteryIds[topicIndex]) || null;
  }
  function homeView(){
    const view=el('div','duo-home');
    const next=data.next || {kind:'complete',title:'Explora tu recorrido',reason:'Elige una decisión para continuar.'};
    const activeCurriculum=curriculum.find(item=>item[0]===selectedCurriculum)||curriculum[2];
    const activeTopic=activeCurriculum[4].find(topic=>topic[0]===selectedTopic)||activeCurriculum[4][0];
    const topicNode=lookup(selectedTopic);
    const selectedMastery=routeMastery(selectedCurriculum,selectedTopic);
    const decisions=selectedMastery?data.edges.filter(edge=>edge.source===selectedMastery.id&&edge.kind==='integrates').map(edge=>lookup(edge.target)).filter(Boolean):topicNode?.type==='cluster-min'?[]:selectedCurriculum==='endocrine'&&selectedTopic==='eje-tiroides'?data.nodes.filter(node=>node.type==='decision'):[`Reconocer ${activeTopic[1].toLowerCase()}`,'Elegir el dato clave','Interpretar la relación','Aplicar la decisión'].map((title,index)=>({id:`preview-${selectedCurriculum}-${selectedTopic}-${index}`,type:'decision',title}));
    const masteries=data.nodes.filter(node=>node.type==='mastery');
    if(!data.nodes.some(node=>node.type==='decision') && data.units.length)return importedNotesHomeView();
    const attempts=Number(data.stats?.attempts||0);
    const xp=attempts*8+Number(data.stats?.units_seen||0)*5;
    const completed=decisions.filter(node=>['independent','retained','demonstrated'].includes(nodeState(node.id)?.status)).length;
    const isUnbuiltTopic=topicNode?.type==='cluster-min'&&!decisions.length;
    const firstName=(data.learner?.name||'').split(' ')[0]||'explorador';
    const header=el('section','duo-unit-header');
    add(header,add(el('div','duo-unit-copy'),el('span','duo-kicker',`${activeCurriculum[1].toUpperCase()} · ${activeTopic[1].toUpperCase()}`),el('h1','',`Hola, ${firstName}`),el('p','',isUnbuiltTopic?'Tema incorporado al MVP. Sus masteries están por construir.':`Construye ${decisions.length} decisiones, una estación a la vez.`)),add(el('div','duo-unit-stats'),add(el('div','duo-unit-stat'),el('strong','',isUnbuiltTopic?'MVP':`${completed}/${decisions.length}`),el('span','',isUnbuiltTopic?'estado':'decisiones')),add(el('div','duo-unit-stat'),el('strong','',`⚡ ${xp}`),el('span','','puntos'))));
    const progress=el('div','duo-unit-progress');const progressFill=el('span');progressFill.style.width=`${decisions.length?Math.round(completed/decisions.length*100):0}%`;progress.append(progressFill);header.append(progress);view.append(header);
    if(topicNode?.type==='cluster-min'&&!decisions.length){const emptyTopic=el('section','duo-info-card');add(emptyTopic,el('span','duo-kicker','TEMA MVP'),el('h2','',topicNode.title),el('p','',`${topicNode.description} Este tema ya pertenece a la especialidad, pero sus masteries, decisiones y nodos de apoyo todavía están por construir.`),callout('Siguiente paso','Convertir este tema en masteries observables y después conectar sus decisiones, conceptos, reglas y procedimientos.','teal'));view.append(emptyTopic);add(view,el('p','duo-boundary','Tema incorporado a la taxonomía MVP; contenido de aprendizaje pendiente de curación.'));return view;}
    const clusterId=selectedCurriculum==='psychiatry'?selectedTopic:selectedCurriculum==='endocrine'?'thyroid':null;
    const routeMasteries=clusterId?data.edges.filter(edge=>edge.source===clusterId&&edge.kind==='contains').map(edge=>lookup(edge.target)).filter(Boolean):[];
    const routePanel=(mastery,index,explicitDecisions=null)=>{
      const routeDecisions=explicitDecisions||data.edges.filter(edge=>edge.source===mastery.id&&edge.kind==='integrates').map(edge=>lookup(edge.target)).filter(Boolean);
      const panel=el('section','duo-map-panel');const panelHeading=el('div','duo-panel-heading');
      add(panelHeading,add(el('div'),el('span','duo-kicker',`TU RECORRIDO · RUTA ${String(index+1).padStart(2,'0')}`),el('h2','',mastery.title)),el('span','duo-map-count',`${routeDecisions.length} decisiones`));panel.append(panelHeading);
      const path=el('div','duo-path');
      routeDecisions.forEach((decision,decisionIndex)=>{
        const state=nodeState(decision.id);const supports=data.edges.filter(edge=>edge.target===decision.id&&edge.kind==='supports').map(edge=>lookup(edge.source)).filter(Boolean);const decisionUnits=learningUnitsForDecision(decision.id);const firstTeaching=decisionUnits.find(item=>item.kind==='teaching');const firstAssessment=decisionUnits.find(item=>item.kind==='assessment');const unit=firstTeaching&&data.units.find(item=>item.id===firstTeaching.ref_id);const activity=firstAssessment&&data.activities.find(item=>item.id===firstAssessment.ref_id);const mastered=['independent','retained','demonstrated'].includes(state?.status);const status=mastered?'completed':state?.status==='needs_practice'?'needs-practice':activity||unit?'available':'locked';
        const row=el('div',`duo-path-row ${decisionIndex%2?'right':'left'} ${status}`);const orb=el('button','duo-decision-orb');orb.type='button';orb.style.setProperty('--node-count',Math.max(1,supports.length));orb.disabled=!activity&&!unit;orb.title=decision.title;orb.setAttribute('aria-label',`${decision.title}. ${supports.length} nodos. ${mastered?'Dominada':'Aún no dominada'}`);add(orb,el('span','duo-orb-number',String(decisionIndex+1).padStart(2,'0')),el('span','duo-orb-symbol',status==='completed'?'✓':status==='needs-practice'?'!':status==='locked'?'🔒':'★'));if(activity||unit)orb.addEventListener('click',()=>perform(()=>unit?showUnit(unit.id,decision.id):startActivity(activity.id)));const label=el('div','duo-path-label');add(label,el('span','duo-kicker',status==='completed'?'DOMINADA':status==='available'?'SIGUIENTE':'DECISIÓN'),el('strong','',decision.title),el('small','',`${supports.length} nodos · ${unit?'Empieza con una learning unit de enseñanza':status==='locked'?'Próximamente':'Toca para continuar'}`));add(row,orb,label);path.append(row);
      });
      panel.append(path);return panel;
    };
    const layout=el('div','duo-product-grid');
    if(selectedCurriculum==='psychiatry'&&routeMasteries.length){
      const windows=el('div','duo-route-windows');windows.style.display='grid';windows.style.gap='18px';routeMasteries.forEach((mastery,index)=>windows.append(routePanel(mastery,index)));layout.append(windows);
    }else{layout.append(routePanel(selectedMastery||{id:'preview-route',title:activeTopic[1]},0,selectedMastery?null:decisions));}
    const aside=el('aside','duo-aside');
    const mission=el('section','duo-mission-card');add(mission,el('span','duo-kicker','MISIÓN DE HOY'),el('h2','',next.title),el('p','',next.reason),add(el('div','duo-mission-meta'),el('span','','5–10 min'),el('span','','·'),el('span','',`${data.stats?.independent||0} aciertos sin ayuda`)),button(next.kind==='teach'?'Aprender ahora →':next.kind==='case'?'Abrir caso →':next.kind==='complete'?'Ver evidencia →':'Continuar →',()=>followNext(next),'button primary'));aside.append(mission);
    const nodes=el('section','duo-info-card');add(nodes,el('span','duo-kicker','CÓMO AVANZAS'),el('h3','','Una decisión se construye así'));const sequence=el('ol','duo-sequence');[['01','Concepto','entiende la idea'],['02','Fact / regla','reconoce el principio'],['03','Procedure','ordena cómo actuar'],['04','Decisión','aplícalo en contexto']].forEach(([number,titleText,copy])=>add(sequence,add(el('li'),el('b','',number),add(el('span'),el('strong','',titleText),el('small','',copy)))));nodes.append(sequence);aside.append(nodes);
    // The learner sees the route only. The supporting lesson flow opens after
    // selecting a decision; it is never exposed as a module-level navigation.
    view.append(layout);add(view,el('p','duo-boundary','Cada círculo es una decisión. Selecciona el siguiente disponible para continuar.'));return view;
  }
  async function followNext(next){if(next.kind==='teach')return showUnit(next.id);if(next.kind==='practice'||next.kind==='review')return startActivity(next.id);if(next.kind==='case')return startCase(next.id);navigate('progress');}
  function learnView(){const view=el('div');add(view,heading('ENSEÑANZA BREVE, CON CONTEXTO','Primero, entiende.','Ideas, ejemplos resueltos y límites. Puedes volver a una explicación tantas veces como necesites.'));const cards=el('div','card-grid');data.units.forEach((unit,index)=>{const c=el('article','card');add(c,add(el('div','card-top'),el('span','number-tag',String(index+1).padStart(2,'0')),badge(isSeen(unit.id)?'Abierta · no equivale a dominio':'Por explorar',isSeen(unit.id)?'teal':'')),el('h3','',unit.title),el('p','',`Conecta con: ${title(unit.target_id)}`),add(el('div','actions'),button(isSeen(unit.id)?'Volver a la explicación →':'Abrir explicación →',()=>showUnit(unit.id),'button')));cards.append(c);});view.append(cards);return view;}
  async function showUnit(id, decisionId=null){
    const unit=data.units.find(u=>u.id===id);if(!unit)throw new Error('Esta unidad no está disponible en la versión de contenido actual.');
    await api('/api/teach',{unit_id:unit.id});await refreshData();page='learn';
    const view=el('div');add(view,el('div','back-row'));view.firstChild.append(button('← Todas las explicaciones',()=>navigate('learn'),'button-link'));
    const layout=el('div','lesson-layout');const lesson=el('article','lesson-main');add(lesson,add(el('header','lesson-head'),el('span','eyebrow',unit.media?.kind==='microvideo'?'MICROVIDEO · NODO DE DECISIÓN':'CONCEPTO · UNIDAD DE ENSEÑANZA'),el('h2','',unit.title)));const body=el('div','lesson-body');
    if(unit.media?.kind==='microvideo'){const video=el('section','microvideo-card');add(video,add(el('div','microvideo-screen'),el('span','microvideo-badge',unit.media.label||'MICROVIDEO'),el('strong','',unit.media.caption||'Microvideo clínico'),el('span','microvideo-play','▶'),el('span','microvideo-progress')),add(el('p','microvideo-note'),'Storyboard MVP · listo para reemplazar por el clip final sin cambiar la ruta de aprendizaje.'));body.append(video);}
    add(body,el('p','prose',unit.body));
    if(unit.example)add(body,add(el('section','lesson-block'),el('h3','','Así se ve en un ejemplo'),el('div','example-box',unit.example)));
    if(unit.alternative){const details=el('details','alternative');add(details,el('summary','','Explícamelo de otra manera'),el('p','',unit.alternative));body.append(details);}
    if(unit.boundary)add(body,add(el('section','lesson-block'),el('h3','','¿Dónde deja de aplicar?'),el('p','prose',unit.boundary)));
    const linkedLearningUnit=(data.learning_units||[]).find(item=>item.kind==='teaching'&&item.ref_id===unit.id&&(!decisionId||item.decision_id===decisionId));const microCase=unit.media?.kind==='microvideo' ? data.cases.find(candidate=>candidate.route_decision_id===linkedLearningUnit?.decision_id||candidate.route_decision_id===unit.target_id) : null;const nextAssessment=linkedLearningUnit&&data.learning_units.find(item=>item.kind==='assessment'&&item.decision_id===linkedLearningUnit.decision_id);const nextActivity=nextAssessment&&data.activities.find(item=>item.id===nextAssessment.ref_id);
    add(body,add(el('div','actions'),button(microCase?'Ver ejemplos y comprobar →':'Ya lo revisé · pasar a practicar →',async()=>{if(microCase)return startCase(microCase.id);if(nextActivity)return startActivity(nextActivity.id);const activity=data.activities.find(a=>a.target_id===unit.target_id&&a.phase==='guided') || data.activities.find(a=>a.target_id===unit.target_id);if(activity)await startActivity(activity.id);else{navigate('practice');toast('Unidad abierta registrada. Elige una práctica para comprobar lo aprendido.');}},'button primary')));lesson.append(body);
    const side=el('aside','lesson-sidebar');const guide=el('div','card');add(guide,el('h3','','De comprender a decidir'));const steps=el('ol','step-list');['Entiende una idea y observa un ejemplo.','Practica; puedes pedir ayuda.','Comprueba si puedes resolver sin ayuda.','Vuelve después y conecta con otro contexto.'].forEach((text,i)=>add(steps,add(el('li'),el('b','',i+1),el('span','',text))));add(guide,steps);side.append(guide);add(side,callout('Abrir no equivale a aprender.','Se registra que abriste esta unidad. No se presupone lectura completa, comprensión ni una decisión resuelta.','teal'));
    if(unit.source_ids?.length){const refs=el('div','card');add(refs,el('h3','','Fuentes de esta unidad'),el('p','small muted','Contenido candidato: las fuentes no equivalen a validación del ejercicio.'));const ids=el('div','source-ids');unit.source_ids.forEach(sourceId=>{const source=(data.sources||[]).find(s=>s.id===sourceId);if(source && /^https?:\/\//i.test(source.url)){const link=el('a','',source.title || sourceId);link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';ids.append(link);}else ids.append(el('span','',sourceId));});add(refs,ids);side.append(refs);}
    add(layout,lesson,side);view.append(layout);render(view);window.scrollTo(0,0);
  }
  function practiceView(filter='all'){const view=el('div');add(view,heading('PRÁCTICA CON PROPÓSITO','Una decisión a la vez.','Empieza con ayuda si hace falta. Cada respuesta se atribuye a su objetivo directo, no a todos sus prerrequisitos.'));const tabs=el('div','tabs');[['all','Todas'],['guided','Guiadas'],['independent','Independientes'],['review','Repaso']].forEach(([key,label])=>{const b=button(label,()=>render(practiceView(key)),`filter-button${filter===key?' selected':''}`);b.setAttribute('aria-pressed',String(filter===key));tabs.append(b);});view.append(tabs);const list=el('div','activity-list');data.activities.filter(a=>filter==='all'||a.phase===filter).forEach(activity=>{const row=el('article','activity-row');const copy=el('div');add(copy,add(el('div','chips'),badge(phaseLabels[activity.phase] || 'Práctica',activity.phase==='guided'?'teal':'blue'),badge(formatLabels[activity.format] || activity.format)),el('h3','',activity.title),el('p','',title(activity.target_id)));add(row,copy,button('Practicar →',()=>startActivity(activity.id),'button small-button'));list.append(row);});add(view,list.children.length?list:empty('No hay actividades en esta categoría.','El paquete actual puede no incluir todas las modalidades.'));return view;}
  async function startActivity(id){const result=await api('/api/start',{activity_id:id});activeRun={...result,key:crypto.randomUUID(),case_run_id:null};page='practice';renderExercise();window.scrollTo(0,0);}
  function responseControls(activity){
    let response=null;const box=el('div');const format=activity.format;const options=activity.options || [];
    if(format==='choice'||format==='multi'){const group=el('fieldset','response-options');add(group,el('legend','',format==='multi'?'Selecciona todas las opciones que correspondan.':'Elige una respuesta.'));options.forEach((option,index)=>{const label=el('label','option');const input=el('input');input.type=format==='choice'?'radio':'checkbox';input.name='response';input.value=option.id;input.id=`response-${index}`;add(label,input,el('span','',option.text));group.append(label);});box.append(group);response=()=>{const selected=[...box.querySelectorAll('input:checked')].map(input=>input.value);if(!selected.length)throw new Error('Selecciona al menos una opción antes de enviar.');return format==='choice'?selected[0]:selected;};}
    else if(format==='short'){const label=el('label','field-label','Tu respuesta breve');label.htmlFor='short-answer';const textarea=el('textarea');textarea.id='short-answer';textarea.maxLength=1500;textarea.placeholder='Escribe la decisión o interpretación solicitada…';add(box,label,textarea,el('p','footnote','La corrección local compara respuestas previstas. Una formulación no reconocida queda por revisar, no demuestra automáticamente un error.'));response=()=>{const value=textarea.value.trim();if(!value)throw new Error('Escribe una respuesta antes de enviar.');return value;};}
    else if(format==='order'){add(box,el('p','footnote','Ordena los pasos usando las flechas. También puedes navegar con Tab y activar con Enter.'));const list=el('ol','order-list');list.style.marginTop='14px';let ordering=options.slice();for(let i=ordering.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ordering[i],ordering[j]]=[ordering[j],ordering[i]];}const draw=(focusId=null,direction=null)=>{list.replaceChildren();ordering.forEach((option,index)=>{const item=el('li','order-item');const controls=el('div','order-buttons');const move=(delta)=>{const other=index+delta;if(other<0||other>=ordering.length)return;[ordering[index],ordering[other]]=[ordering[other],ordering[index]];draw(option.id,delta);};const up=button('↑',()=>move(-1),'icon-button');up.setAttribute('aria-label',`Subir: ${option.text}`);up.disabled=index===0;up.dataset.option=option.id;up.dataset.direction='-1';const down=button('↓',()=>move(1),'icon-button');down.setAttribute('aria-label',`Bajar: ${option.text}`);down.disabled=index===ordering.length-1;down.dataset.option=option.id;down.dataset.direction='1';add(controls,up,down);add(item,el('span','order-number',index+1),el('span','order-text',option.text),controls);list.append(item);});if(focusId){const candidates=[...list.querySelectorAll('button')];(candidates.find(b=>b.dataset.option===focusId&&b.dataset.direction===String(direction)&&!b.disabled)||candidates.find(b=>b.dataset.option===focusId&&!b.disabled))?.focus();}};draw();box.append(list);response=()=>ordering.map(option=>option.id);}
    else {box.append(callout('Formato no compatible',`No se puede responder a esta actividad (${format}).`,'amber'));response=()=>{throw new Error('Este formato de actividad no está implementado.');};}
    return {box,response};
  }
  function renderExercise(previous=null){
    const run=activeRun;const activity=run.activity;const isCase=Boolean(run.case_run_id);const evaluation=isCase&&run.mode==='evaluation';const view=el('div','exercise-wrap duo-lesson');if(!isCase)add(view,add(el('div','duo-session-head'),badge('Misión de hoy','teal'),el('span','small muted','Paso breve · evidencia separada de los puntos')));
    add(view,add(el('div','back-row'),button(isCase?'← Volver a casos':'← Volver a prácticas',()=>navigate(isCase?'cases':'practice'),'button-link')));
    if(isCase){const meta=el('div','exercise-meta');add(meta,badge(evaluation?'Caso · evaluación':'Caso · aprendizaje',evaluation?'blue':'teal'),el('span','muted',`Paso ${Number(run.step_index)+1} de ${run.total}`));view.append(meta);const track=el('div','progress-track');const fill=el('span');fill.style.width=`${Math.min(100,Number(run.step_index)/Math.max(1,run.total)*100)}%`;track.append(fill);view.append(track);if(evaluation)add(view,callout('Primero decide; al final revisamos.','Sin pistas ni corrección entre pasos. Es una evaluación local, no supervisada: «sin ayuda» significa sin ayuda registrada en la app. El contexto posterior puede aportar información; ese apoyo también se registra.'));}
    if(previous) add(view,feedbackBox(previous));
    const panel=el('section','exercise-panel');if(isCase)panel.style.marginTop='18px';add(panel,add(el('div','chips'),badge(formatLabels[activity.format] || activity.format),badge(phaseLabels[activity.phase] || 'Práctica','blue')),el('h2','',activity.title));panel.querySelector('h2').style.marginTop='17px';
    const context=run.context || activity.context;if(context)add(panel,el('div','context-box',typeof context==='string'?context:JSON.stringify(context)));
    add(panel,el('p','question-prompt',activity.prompt));const controls=responseControls(activity);panel.append(controls.box);
    const hintBox=el('div');panel.append(hintBox);const bottom=el('div','exercise-bottom');const hintButton=button('Necesito una pista',async()=>{const result=await api('/api/hint',{run_id:run.run_id});hintBox.replaceChildren(el('div','hint',result.hint));hintButton.textContent='Pista consultada · cuenta como ayuda';hintButton.dataset.locked='true';hintButton.disabled=true;},'button');if(!evaluation)bottom.append(hintButton);else bottom.append(el('span','small muted','Sin pistas durante la evaluación'));
    const submit=button(isCase?'Guardar decisión y continuar →':'Comprobar respuesta →',async()=>{const response=controls.response();if(isCase){const result=await api('/api/case/answer',{case_run_id:run.case_run_id,run_id:run.run_id,response,key:run.key});if(result.done){activeRun=null;await refreshData();showCaseSummary(result.summary);}else{activeRun={...result,case_run_id:run.case_run_id,key:crypto.randomUUID()};renderCaseFeedback(result.previous);window.scrollTo(0,0);}}else{const result=await api('/api/submit',{run_id:run.run_id,response,key:run.key});controls.box.querySelectorAll('input,textarea,button').forEach(input=>input.disabled=true);bottom.remove();const feedback=feedbackBox(result);panel.append(feedback);if(result.remediation){const r=el('div','lesson-block');add(r,el('h3','','Volvamos a la idea'),el('p','prose',result.remediation.body));if(result.remediation.unit_id)add(r,add(el('div','actions'),button('Revisar explicación completa',()=>showUnit(result.remediation.unit_id),'button')));panel.append(r);}add(panel,add(el('div','actions'),button('Seguir mi recorrido →',async()=>{await refreshData();navigate('home');},'button primary'),button('Nuevo intento',()=>startActivity(activity.id),'button')));await refreshData();feedback.tabIndex=-1;feedback.focus();}},'button primary');bottom.append(submit);panel.append(bottom);view.append(panel);render(view);
  }
  function renderCaseFeedback(previous){
    const run=activeRun;const view=el('div','exercise-wrap duo-lesson');
    add(view,add(el('div','back-row'),button('← Volver a casos',()=>navigate('cases'),'button-link')));
    const meta=el('div','exercise-meta');add(meta,badge('Caso · aprendizaje','teal'),el('span','muted',`Paso ${Number(run.step_index)} de ${run.total} completado`));view.append(meta);
    const track=el('div','progress-track');const fill=el('span');fill.style.width=`${Math.min(100,Number(run.step_index)/Math.max(1,run.total)*100)}%`;track.append(fill);view.append(track);
    const incorrect=previous?.outcome==='incorrect';
    const panel=el('section',`exercise-panel feedback-hold ${incorrect?'feedback-stop':''}`);add(panel,el('span','duo-kicker',incorrect?'RESPUESTA INCORRECTA':'FEEDBACK INMEDIATO'),el('h2','',incorrect?'Detente aquí: revisemos el error':'Pausa de aprendizaje'));panel.append(feedbackBox(previous));
    if(incorrect){panel.append(callout('No avanzas todavía','La ruta permanece en este assessment unit. Revisa la explicación y vuelve a intentarlo.','amber'));panel.append(add(el('div','actions'),button('Intentar de nuevo →',()=>{renderExercise();window.scrollTo(0,0);},'button primary')));}
    else{const next=el('div','callout teal');add(next,el('strong','','Siguiente assessment unit'),el('span','',run.activity?.title || 'Continúa con el siguiente paso de la ruta.'));panel.append(next);panel.append(add(el('div','actions'),button('Siguiente →',()=>{renderExercise();window.scrollTo(0,0);},'button primary')));}
    view.append(panel);render(view);
  }
  function feedbackBox(result){const box=el('div',`feedback ${result.outcome || ''}`);box.setAttribute('role','status');add(box,el('h3','',outcomeLabels[result.outcome] || 'Respuesta registrada'),el('p','',result.feedback || 'La evidencia de este intento se ha registrado.'));if(result.assisted)add(box,badge('Con ayuda registrada','teal'));if(result.critical)add(box,badge('Regla crítica vulnerada en este contexto','red'));if(result.outcome==='indeterminate')add(box,el('p','footnote','No se convierte en acierto ni fallo concluyente. La interpretación requiere revisión.'));return box;}
  function casesView(){const view=el('div');add(view,heading('VARIAS DECISIONES, UN MISMO HILO','Integra lo que sabes.','Un caso conecta decisiones. La evidencia se conserva por paso; completar el caso no acredita automáticamente todos los conceptos relacionados.'));add(view,callout('Dos modos, dos propósitos.','Aprendizaje: feedback después de cada decisión y pistas disponibles. Evaluación: feedback al terminar, sin pistas durante el caso.','teal'));add(view,section('Casos del cluster','Escenarios educativos de fisiología. No son pacientes reales.'));const cards=el('div','card-grid');data.cases.forEach(c=>{const card=el('article','card case-card');add(card,add(el('div','card-top'),badge(c.mode==='evaluation'?'Evaluación · feedback al final':'Aprendizaje · feedback por paso',c.mode==='evaluation'?'blue':'teal'),el('span','small muted',`${c.step_count} pasos`)),el('h3','',c.title),el('p','',c.description),el('p','footnote',`Integra: ${title(c.mastery_id)}`),add(el('div','actions'),button('Abrir o continuar caso →',()=>startCase(c.id),'button')));cards.append(card);});add(view,cards.children.length?cards:empty('Todavía no hay casos publicados.','Las actividades individuales siguen disponibles.'));return view;}
  async function startCase(id){const result=await api('/api/case/start',{case_id:id});activeRun={...result,key:crypto.randomUUID()};page='cases';renderExercise();window.scrollTo(0,0);}
  function showCaseSummary(summary){const view=el('div','exercise-wrap');add(view,heading('CASO COMPLETADO',summary.title || 'Tus decisiones, en conjunto.',summary.message || 'Revisa la evidencia de cada paso.'));const list=el('div','case-summary');(summary.results||[]).forEach((result,i)=>{const c=el('article','summary-item');add(c,badge(`Paso ${i+1}`),el('h3','',result.title),feedbackBox(result));list.append(c);});add(view,list,add(el('div','actions'),button('Ver mi evidencia →',()=>navigate('progress'),'button primary'),button('Más casos',()=>navigate('cases'),'button')));render(view);window.scrollTo(0,0);}

  function mapView(){
    const view=el('div');add(view,heading('UNA RED, NO UNA LISTA DE TEMAS','El mapa detrás de tu aprendizaje.','Selecciona un nodo para ver sus conexiones. Una regla o procedimiento puede apoyar distintas decisiones sin duplicarse.'));
    const shell=el('div','graph-shell');const board=el('div','graph-board');board.id='graph-board';const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('graph-svg');svg.setAttribute('aria-hidden','true');board.append(svg);
    [['CLUSTERS · ESPECIALIDAD / TEMA',['cluster','cluster-maj','cluster-min']],['CAPACIDADES INTEGRADAS',['mastery']],['DECISIONES',['decision']],['ENSEÑANZA Y APOYOS',['concept','rule','procedure']]].forEach(([label,types])=>{const col=el('div','graph-column');col.append(el('span','graph-column-label',label));data.nodes.filter(node=>types.includes(node.type)).forEach(node=>{const b=button('',()=>selectGraphNode(node.id),'graph-node');b.dataset.node=node.id;b.dataset.type=node.type;b.setAttribute('aria-pressed','false');add(b,el('small','',typeLabels[node.type] || node.type),el('span','',node.title));col.append(b);});board.append(col);});shell.append(board);view.append(shell);
    add(view,el('p','footnote','Las líneas muestran relaciones declaradas. Solo los prerrequisitos «requires» forman un grafo dirigido acíclico; no se interpreta toda la fisiología como una cadena sin retroalimentación.'));
    const detail=el('div','card graph-detail');detail.id='graph-detail';view.append(detail);return view;
  }
  function attachGraph(){const board=$('#graph-board');if(!board)return;graphObserver=new ResizeObserver(()=>drawGraphLines());graphObserver.observe(board);selectGraphNode(graphSelection&&lookup(graphSelection)?graphSelection:data.nodes.find(n=>n.type==='decision')?.id || data.nodes[0]?.id);requestAnimationFrame(drawGraphLines);}
  function selectGraphNode(id){graphSelection=id;const node=lookup(id);if(!node)return;const connections=data.edges.filter(edge=>edge.source===id||edge.target===id);const related=new Set([id,...connections.flatMap(e=>[e.source,e.target])]);document.querySelectorAll('.graph-node').forEach(button=>{button.classList.toggle('selected',button.dataset.node===id);button.classList.toggle('dimmed',!related.has(button.dataset.node));button.setAttribute('aria-pressed',String(button.dataset.node===id));});const detail=$('#graph-detail');if(!detail)return;detail.replaceChildren();add(detail,badge(typeLabels[node.type] || node.type,'blue'),el('h3','',node.title),el('p','',node.description));const edges=el('ul','edge-list');const verbs={contains:'contiene',integrates:'integra',supports:'apoya',requires:'requiere'};connections.forEach(edge=>{add(edges,add(el('li'),button(title(edge.source),()=>selectGraphNode(edge.source),'button-link'),el('span','',`— ${verbs[edge.kind] || edge.kind} →`),button(title(edge.target),()=>selectGraphNode(edge.target),'button-link')));});detail.append(edges);const firstTeaching=(data.learning_units||[]).find(unit=>unit.decision_id===id&&unit.kind==='teaching');const firstAssessment=(data.learning_units||[]).find(unit=>unit.decision_id===id&&unit.kind==='assessment');const unit=firstTeaching&&data.units.find(candidate=>candidate.id===firstTeaching.ref_id);const activity=firstAssessment&&data.activities.find(candidate=>candidate.id===firstAssessment.ref_id);if(unit||activity){const actions=el('div','actions');if(unit)actions.append(button('Abrir teaching unit',()=>showUnit(unit.id,id),'button small-button'));if(activity)actions.append(button('Abrir assessment unit',()=>startActivity(activity.id),'button small-button'));detail.append(actions);}drawGraphLines();}
  function drawGraphLines(){const board=$('#graph-board');if(!board)return;const svg=board.querySelector('svg');svg.replaceChildren();const rect=board.getBoundingClientRect();const nodes=new Map([...board.querySelectorAll('.graph-node')].map(node=>[node.dataset.node,node]));data.edges.forEach(edge=>{const from=nodes.get(edge.source),to=nodes.get(edge.target);if(!from||!to)return;const a=from.getBoundingClientRect(),b=to.getBoundingClientRect();const goesRight=b.left>a.left;const x1=(goesRight?a.right:a.left)-rect.left;const x2=(goesRight?b.left:b.right)-rect.left;const y1=a.top+a.height/2-rect.top,y2=b.top+b.height/2-rect.top;const curve=Math.max(15,Math.abs(x2-x1)/2);const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',`M ${x1} ${y1} C ${x1+(goesRight?curve:-curve)} ${y1}, ${x2+(goesRight?-curve:curve)} ${y2}, ${x2} ${y2}`);if(edge.source===graphSelection||edge.target===graphSelection)path.classList.add('highlight');if(edge.kind==='requires')path.setAttribute('stroke-dasharray','4 4');svg.append(path);});}

  function progressView(){const view=el('div');add(view,heading('EVIDENCIA, NO ETIQUETAS PERMANENTES','Esto has demostrado.','Los intentos se conservan. La lectura, la ayuda, la independencia y el tiempo cuentan cosas distintas.',button('Exportar mis datos ↓',exportData,'button')));
    const observedTypes=['mastery','decision','rule','procedure'];
    observedTypes.forEach(type=>{
      const nodes=data.nodes.filter(n=>n.type===type);
      if(!nodes.length)return;
      const labels={mastery:'Integración en casos',decision:'Decisiones',rule:'Reglas y heurísticas',procedure:'Procedimientos'};
      add(view,section(labels[type],type==='mastery'?'Solo casos completos aportan evidencia integrada.':'Evidencia directa de estos objetivos; no heredada de sus conexiones.'));
      const states=el('div','state-grid');
      nodes.forEach(node=>{
        const state=nodeState(node.id);const c=el('article','state-card');
        add(c,badge(stateName(state),stateTone(state)),el('h3','',node.title));
        const dimensions=el('div','dimensions');
        let retention='Sin comprobación diferida';
        if(state?.retention===true || ['retained','demonstrated','confirmed'].includes(state?.retention))retention='Retención observada';
        else if(state?.retention==='needs_review')retention='Repaso necesario';
        const due=state?.due_at?date(state.due_at):'Aún no programado';
        const countLabel=type==='mastery'?'casos correctos':'aciertos';
        [['Sin ayuda registrada',`${state?.independent || 0} ${countLabel}`],['Con ayuda',`${state?.assisted || 0} ${countLabel}`],['Retención',retention],['Próximo repaso',due]].forEach(([label,value])=>add(dimensions,add(el('div','dimension'),el('span','',label),el('strong','',value))));
        c.append(dimensions);const contexts=state?.contexts || [];
        add(c,el('p','contexts',contexts.length?`Contextos registrados: ${contexts.map(context=>typeof context==='string'?(data.cases.find(item=>item.id===context)?.title || context):context.title||context.id||'Contexto').join(' · ')}`:'Todavía no hay contextos demostrados.'),el('p','footnote',state?.last_at?`Última evidencia: ${date(state.last_at,true)} · ${state.errors||0} errores registrados`:'Un primer intento permitirá empezar a construir evidencia.'));
        if(state?.critical_errors)add(c,badge(`${state.critical_errors} errores críticos contextuales`,'red'));
        states.append(c);
      });view.append(states);
    });
    add(view,section('Cómo leer tu progreso'),callout('Un acierto no equivale a dominio clínico.','Estas dimensiones resumen desempeño dentro del paquete educativo actual. No garantizan transferencia a otros casos ni desempeño con pacientes reales. Un repaso posterior aporta evidencia nueva; no borra tus intentos anteriores.','teal'));
    add(view,section('Respuestas recientes','Tu registro local, sin puntos de racha ni porcentajes de dominio.'));const recent=data.recent || [];if(!recent.length)view.append(empty('Tu historial de respuestas empieza con el primer intento.','Las aperturas de explicaciones se registran por separado y están disponibles en la exportación.'));else{const list=el('div','event-list');recent.slice(0,12).forEach(event=>{const row=el('div','event-row');const text=event.title || data.activities.find(a=>a.id===event.activity_id)?.title || (event.node_id?title(event.node_id):'Evidencia registrada');const copy=el('div');add(copy,el('strong','',text));if(event.outcome)add(copy,el('p','muted small',`${outcomeLabels[event.outcome] || 'Resultado registrado'}${event.assisted?' · Con ayuda registrada':''}`));add(row,copy,el('time','',date(event.created_at || event.at || event.timestamp,true)));list.append(row);});view.append(list);}
    add(view,el('p','footnote',`Versión de contenido: ${data.release?.id || 'No disponible'} · Estado: ${data.release?.status==='candidate'?'candidato, pendiente de revisión':data.release?.status || 'No disponible'}. Los datos se guardan en SQL en esta computadora.`));return view;
  }
  async function exportData(){const exported=await api('/api/export');const blob=new Blob([JSON.stringify(exported,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=el('a');a.href=url;a.download=`grafomed-evidencia-${new Date().toISOString().slice(0,10)}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Exportación preparada. Contiene tus datos educativos del perfil local.');}

  function renderUnitOptions(){const options=$('#unit-options');if(!options)return;options.replaceChildren();curriculum.forEach(([id,name,description,abbr])=>{const option=el('button',`unit-option ${selectedCurriculum===id?'selected':''}`);option.type='button';add(option,el('span','unit-option-code',abbr),add(el('span'),el('strong','',name),el('small','',description)),el('span','unit-option-chevron','›'));option.addEventListener('click',()=>{selectedCurriculum=id;selectedTopic=curriculum.find(item=>item[0]===id)[4][0][0];$('#unit-label').textContent=name.toUpperCase();$('#unit-dialog').close();navigate('home');});options.append(option);});}
  function renderRouteOptions(){const options=$('#route-options');const current=curriculum.find(item=>item[0]===selectedCurriculum)||curriculum[2];if(!options)return;$('#route-dialog-title').textContent=`Temas de ${current[1]}`;$('#route-dialog-copy').textContent='Selecciona un tema para ver sus masteries y decisiones.';options.replaceChildren();current[4].forEach(([topicId,topicName],index)=>{const option=el('button',`route-option ${selectedTopic===topicId?'selected':''}`);option.type='button';const theme=selectedCurriculum==='psychiatry'?lookup(topicId):null;const masteryCount=theme?data.edges.filter(edge=>edge.source===topicId&&edge.kind==='contains').length:0;add(option,el('span','route-number',String(index+1).padStart(2,'0')),add(el('span'),el('strong','',`Tema ${String(index+1).padStart(2,'0')}`),el('small','',`${topicName}${theme?(masteryCount?` · ${masteryCount} masteries`:' · En construcción'):''}`)),selectedTopic===topicId&&el('span','route-check','✓'));option.addEventListener('click',()=>{selectedTopic=topicId;$('#route-label').textContent=`TEMA ${String(index+1).padStart(2,'0')}`;$('#unit-label').textContent=`${current[1].toUpperCase()} / ${topicName.toUpperCase()}`;$('#route-dialog').close();navigate('home');});options.append(option);});}

  $('#profile-button').addEventListener('click',()=>$('#profile-dialog').showModal());
  $('#close-profile').addEventListener('click',()=>$('#profile-dialog').close());
  $('#profile-form').addEventListener('submit',event=>{event.preventDefault();perform(async()=>{const name=$('#learner-name').value.trim();if(!name)throw new Error('Escribe un nombre o alias para el perfil.');data=await api('/api/profile',{name});$('#profile-dialog').close();$('#profile-form').reset();refreshShell();navigate('home');toast('Nuevo perfil local creado. El historial anterior se conserva en la base de datos.');});});
  $('#unit-selector').addEventListener('click',()=>{renderUnitOptions();$('#unit-dialog').showModal();});
  $('#close-unit').addEventListener('click',()=>$('#unit-dialog').close());
  $('#route-selector').addEventListener('click',()=>{renderRouteOptions();$('#route-dialog').showModal();});
  $('#close-route').addEventListener('click',()=>$('#route-dialog').close());
  window.addEventListener('hashchange',()=>{if(data)navigate(location.hash.slice(1),false);});
  async function initialize(){try{await refreshData();const current=curriculum.find(item=>item[0]===selectedCurriculum)||curriculum[2];const topic=current[4].find(item=>item[0]===selectedTopic)||current[4][0];$('#unit-label').textContent=`${current[1].toUpperCase()} / ${topic[1].toUpperCase()}`;navigate(location.hash.slice(1)||'home',false);}catch(error){notice(error.message);const view=empty('El espacio local no está disponible.','Comprueba que el servidor esté en ejecución. No hemos reemplazado ni borrado tus datos.');add(view,add(el('div','actions'),button('Volver a conectar',initialize,'button primary')));render(view);}}
  perform(initialize);
})();
