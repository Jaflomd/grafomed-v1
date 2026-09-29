(() => {
  "use strict";

  const DATA = window.GRAFOMED_UPPER_LIMB;
  const DEEP_PACK = window.GRAFOMED_NODE_PACK;
  const STORAGE_KEY = "grafomed.learning.prototype.upper-limb.v1.2";
  const STATE_VERSION = 2;
  const TODAY = "2026-08-29";
  const PROTOTYPE_VERSION = "grafomed-learner-app-v1.0.0-candidate";
  const ALGORITHM_VERSION = "explainable-frontier-v0.1";
  const RUBRIC_VERSION = "formative-a1-a4-v0.1";
  const STATE_WEIGHTS = { unknown: 0, exposed: 0.08, practicing: 0.3, competent: 0.58, transferable: 0.82, consolidated: 1 };
  const STATE_LABELS = { unknown: "Desconocido", exposed: "Expuesto", practicing: "Practicando", competent: "Competente", transferable: "Transferible", consolidated: "Consolidado" };
  const MISSINGNESS_LABELS = {
    not_attempted: "No intentado",
    not_observed: "No observado",
    insufficient_sample: "Muestra insuficiente",
    declined: "Declinado",
    unavailable: "No disponible",
    invalidated: "Invalidado",
    failed: "Desempeño insuficiente observado",
  };
  const LEVEL_COLORS = { A1: "#2A7DE1", A2: "#1DCAD3", A3: "#10b981", A4: "#1BACE4" };
  const WORLD_COLORS = ["#1DCAD3", "#2A7DE1", "#1BACE4", "#5a6b7c", "#1a2b3c"];

  if (!DATA || !Array.isArray(DATA.atoms)) {
    document.body.innerHTML = "<p>No se pudieron cargar los datos candidatos del cluster.</p>";
    return;
  }

  const escapeHTML = value => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
  const clamp = value => Math.max(0, Math.min(1, value));
  const byId = id => DATA.atoms.find(atom => atom.id === id);
  const makeId = prefix => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const formatLabels = {
    teach: "Modelo",
    single_choice: "Elección",
    multiple_select: "Selección múltiple",
    sequence: "Secuencia",
    short_answer: "Respuesta abierta",
  };

  const MISSION_CONFIGS = {
    "gm-ma-identify-upper-limb-long-flat-bones": {
      duration: 7,
      clinicalValue: 0.82,
      foundation: 1,
      modalities: ["mixed", "image", "text"],
      resources: { mixed: "recuperación + tarjetas discriminadoras + imagen", image: "imagen orientada + contraste", text: "reglas espaciales + MCQ" },
      teachTitle: "Cinco huesos, cinco anclas espaciales",
      teachLead: "Reconstruye posición, articulaciones y accidentes distintivos; no memorices una lista aislada.",
      teachCards: [
        ["C", "Clavícula", "Conecta el miembro al axial; extremos esternal y acromial."],
        ["E", "Escápula", "Hueso plano con espina, acromion y glenoides lateral."],
        ["H", "Húmero", "Cabeza proximal; capítulo y tróclea distales."],
        ["R", "Radio", "Lateral, lado del pulgar; extremo distal más ancho."],
        ["U", "Ulna", "Medial; olécranon e incisura troclear."],
      ],
      memoryRule: "Orienta proximal–distal y medial–lateral; localiza una superficie articular; recién entonces nombra el hueso.",
      questions: [
        { phase: "diagnostic", kicker: "Diagnóstico · A1", title: "¿Qué hueso conecta el miembro superior con el esqueleto axial?", lead: "El error inicial orienta la enseñanza; no te resta dominio.", choices: ["Escápula", "Clavícula", "Húmero", "Ulna"], correct: 1, evidence: "A1", hint: "Busca la única articulación ósea directa con el esternón.", explanation: "La clavícula conecta la cintura pectoral con el esqueleto axial mediante la articulación esternoclavicular.", errorPattern: "confunde_conexion_axial" },
        { phase: "guided", kicker: "Práctica guiada · A1", title: "¿Qué hueso contiene la cavidad glenoidea?", lead: "Busca la estructura que recibe la cabeza del húmero.", choices: ["Escápula", "Clavícula", "Radio", "Ulna"], correct: 0, evidence: "A1", hint: "Piensa en la pared posterior de la cintura pectoral.", explanation: "La cavidad glenoidea está en el ángulo lateral de la escápula y participa en la articulación glenohumeral.", errorPattern: "confunde_glenoides" },
        { phase: "retrieval", kicker: "Recuperación · A1", title: "En posición anatómica, ¿qué hueso del antebrazo es lateral?", lead: "Imagina la palma mirando hacia delante.", choices: ["Ulna", "Radio", "Húmero", "Escápula"], correct: 1, evidence: "A1", hint: "Ubica el lado del pulgar.", explanation: "El radio ocupa el lado lateral; la ulna ocupa el medial.", errorPattern: "invierte_radio_ulna" },
        { phase: "contrast", kicker: "Contraste funcional · A2", title: "La tróclea del húmero articula principalmente con…", lead: "Elige la relación que explica la bisagra dominante del codo.", choices: ["la cabeza del radio", "la cavidad glenoidea", "la incisura troclear de la ulna", "el acromion"], correct: 2, evidence: "A2", hint: "Tróclea e incisura comparten una geometría de polea.", explanation: "La tróclea humeral articula con la incisura troclear de la ulna; el capítulo lo hace con la cabeza radial.", errorPattern: "confunde_superficies_codo" },
        { phase: "near_transfer", kicker: "Transferencia cercana · A4 candidato", title: "En una radiografía AP del antebrazo, el hueso alineado con el pulgar es…", lead: "La representación cambió; conserva la orientación antes de nombrar.", choices: ["el radio", "la ulna", "el húmero", "la clavícula"], correct: 0, evidence: "A4", hint: "Reconstruye lateralidad desde la mano, no desde la pantalla.", explanation: "El radio está en el lado del pulgar. Una sola imagen es una muestra de transferencia, no A4 establecida.", errorPattern: "pierde_orientacion_en_imagen" },
      ],
    },
    "gm-ma-locate-upper-limb-pulses": {
      duration: 6,
      clinicalValue: 0.92,
      foundation: 0.72,
      modalities: ["mixed", "text"],
      resources: { mixed: "mapa superficial + simulación verbal + caso", image: "referencias superficiales ilustradas", text: "trayecto + decisiones de palpación" },
      teachTitle: "Tres pulsos, tres relaciones superficiales",
      teachLead: "Localizar no equivale a recitar: usa referencias, posición del miembro y trayecto esperado.",
      teachCards: [
        ["B", "Braquial", "Fosa cubital, medial al tendón del bíceps."],
        ["R", "Radial", "Muñeca lateral, próximo al radio y al tendón flexor radial del carpo."],
        ["U", "Ulnar", "Muñeca medial, lateral al tendón del flexor ulnar del carpo."],
      ],
      memoryRule: "Referencia ósea o tendinosa → trayecto arterial → presión gradual → comparar lados y declarar límites.",
      questions: [
        { phase: "diagnostic", kicker: "Diagnóstico · A1", title: "En la fosa cubital, el pulso braquial se busca respecto al tendón del bíceps…", lead: "Usa una relación anatómica, no una coordenada visual fija.", choices: ["lateral", "medial", "posterior", "superficial al olécranon"], correct: 1, evidence: "A1", hint: "Recuerda el orden lateral a medial de la fosa cubital.", explanation: "La arteria braquial se palpa medial al tendón del bíceps en la fosa cubital.", errorPattern: "invierte_relacion_braquial" },
        { phase: "guided", kicker: "Práctica guiada · A3", title: "¿Qué referencia orienta mejor la búsqueda del pulso radial distal?", lead: "Elige la referencia compatible con el lado lateral de la muñeca.", choices: ["pisiforme", "estiloides radial", "epicóndilo medial", "olécranon"], correct: 1, evidence: "A3", hint: "Ubica el lado del pulgar.", explanation: "La estiloides radial y el trayecto adyacente orientan la palpación del pulso radial distal.", errorPattern: "confunde_referencia_radial" },
        { phase: "retrieval", kicker: "Recuperación · A2", title: "Si el pulso no se palpa al primer intento, la mejor inferencia es…", lead: "Distingue ausencia de evidencia de evidencia de ausencia.", choices: ["arteria ocluida", "hallazgo aún no observado", "shock", "lesión del nervio mediano"], correct: 1, evidence: "A2", hint: "Una técnica fallida no prueba una condición clínica.", explanation: "Debe registrarse como no observado y revisar posición, referencia y técnica; no como fallo ni oclusión demostrada.", errorPattern: "sobreinterpreta_no_observado" },
        { phase: "near_transfer", kicker: "Transferencia cercana · A3", title: "Tras trauma de muñeca, ¿qué acción anatómica precede a interpretar un pulso radial difícil?", lead: "Prioriza una observación reproducible.", choices: ["declarar isquemia", "comparar ambos lados y revisar referencias", "buscar solo el pulso ulnar", "asignar dominio A4"], correct: 1, evidence: "A3", hint: "Primero mejora la calidad de la observación.", explanation: "Comparar lados y revisar referencias reduce error de técnica. La práctica simulada no certifica palpación clínica independiente.", errorPattern: "salta_a_inferencia_clinica" },
      ],
    },
    "gm-ma-reconstruct-brachial-plexus": {
      duration: 8,
      clinicalValue: 0.86,
      foundation: 0.88,
      modalities: ["mixed", "image", "text"],
      resources: { mixed: "reconstrucción desde memoria + diagrama", image: "diagrama progresivo", text: "cadena raíces–ramas terminales" },
      teachTitle: "Reconstruye el plexo como una transformación",
      teachLead: "Mantén la secuencia y la relación con la arteria axilar; después agrega excepciones.",
      teachCards: [
        ["R", "Raíces", "Ramos anteriores C5–T1."],
        ["T", "Troncos", "Superior, medio e inferior."],
        ["D", "Divisiones", "Cada tronco: anterior y posterior."],
        ["F", "Fascículos", "Lateral, posterior y medial respecto a la arteria axilar."],
        ["N", "Terminales", "Musculocutáneo, axilar, radial, mediano y ulnar."],
      ],
      memoryRule: "Raíces → troncos → divisiones → fascículos → ramas; reconstruye primero el orden y luego las conexiones.",
      questions: [
        { phase: "diagnostic", kicker: "Diagnóstico · A1", title: "¿Qué raíces forman típicamente el plexo braquial?", lead: "Selecciona el rango habitual.", choices: ["C1–C4", "C5–T1", "T1–T5", "L1–L5"], correct: 1, evidence: "A1", hint: "Comienza en la región cervical baja.", explanation: "El plexo braquial se forma típicamente por los ramos anteriores de C5 a T1.", errorPattern: "confunde_raices_plexo" },
        { phase: "guided", kicker: "Práctica guiada · A2", title: "Después de los troncos aparecen…", lead: "Recupera la secuencia completa.", choices: ["fascículos", "divisiones", "nervios terminales", "dermatomas"], correct: 1, evidence: "A2", hint: "Cada tronco se separa en dos.", explanation: "Cada tronco produce una división anterior y otra posterior antes de reorganizarse en fascículos.", errorPattern: "altera_secuencia_plexo" },
        { phase: "retrieval", kicker: "Recuperación · A2", title: "Los fascículos se nombran por su relación con…", lead: "La referencia es vascular.", choices: ["la clavícula", "la arteria axilar", "la vena cefálica", "el húmero"], correct: 1, evidence: "A2", hint: "Lateral, posterior y medial necesitan un punto de referencia.", explanation: "Los fascículos se nombran según su relación con la segunda porción de la arteria axilar.", errorPattern: "pierde_referencia_fasciculos" },
        { phase: "near_transfer", kicker: "Transferencia cercana · A4 candidato", title: "Un esquema invierte izquierda y derecha. ¿Qué estrategia conserva la orientación del plexo?", lead: "Evita depender de la apariencia memorizada.", choices: ["memorizar colores", "usar relación con arteria y continuidad proximal–distal", "nombrar solo nervios", "ignorar fascículos"], correct: 1, evidence: "A4", hint: "Usa relaciones invariantes.", explanation: "La continuidad proximal–distal y la relación de fascículos con la arteria permiten transferir a una vista nueva.", errorPattern: "depende_de_diagrama_identico" },
      ],
    },
  };

  const routeCandidateIds = Object.keys(MISSION_CONFIGS);
  const worldShortNames = ["Huesos e imagen", "Trauma neurovascular", "Arterias y pulsos", "Venas y linfa", "Plexo y nervios", "Hombro y axila", "Codo y antebrazo", "Muñeca y mano", "Retináculos y vainas", "Compartimentos"];

  const emptyMastery = () => ({
    state: "unknown",
    evidence: { A1: 0, A2: 0, A3: 0, A4: 0 },
    uncertainty: 1,
    missingness: "not_attempted",
    attempts: 0,
    lastPracticed: null,
    due: null,
    forgettingRisk: "unknown",
    errorPatterns: [],
    contested: false,
    scheduledChecks: [],
  });

  const seedEvidenceEvent = ({ id, atomId, level, correct, assistance, title, daysAgo }) => ({
    id,
    type: "learning_evidence_event",
    occurredAt: `2026-08-${String(29 - daysAgo).padStart(2, "0")}T15:00:00-05:00`,
    learnerRef: "demo-local-learner",
    atomRef: atomId,
    objectiveRef: byId(atomId)?.objectiveId || null,
    activityRef: "seeded-simulation",
    assessmentUseRef: "upper-limb-formative-v0",
    evidenceLevel: level,
    phase: level === "A4" ? "near_transfer" : "retrieval",
    response: "seeded demonstration event",
    correct,
    assistance: { level: assistance, hints: assistance === "none" ? [] : ["seeded hint"] },
    attemptNumber: 1,
    confidence: "medium",
    latencyMs: null,
    context: { language: "es", modality: "mixed", device: "demo", interruption: "unknown" },
    scorer: { method: "deterministic_key", confidence: 1, reviewStatus: "synthetic" },
    validity: "synthetic_formative_only",
    versions: { prototype: PROTOTYPE_VERSION, atom: "upper-limb-v0", item: "seed-v0", rubric: RUBRIC_VERSION, algorithm: ALGORITHM_VERSION },
    title,
  });

  const createSeedState = () => {
    const mastery = {};
    DATA.atoms.forEach(atom => { mastery[atom.id] = emptyMastery(); });
    const seeds = [
      [0, "practicing", [0.62, 0.28, 0.08, 0], "2026-08-29", 0.42, "high"],
      [1, "exposed", [0.22, 0, 0, 0], "2026-08-30", 0.78, "medium"],
      [3, "competent", [0.82, 0.68, 0.56, 0.31], "2026-09-01", 0.34, "low"],
      [7, "exposed", [0.28, 0, 0.2, 0], "2026-09-02", 0.74, "medium"],
      [10, "practicing", [0.58, 0.42, 0.18, 0], "2026-08-29", 0.52, "high"],
      [11, "exposed", [0.3, 0.25, 0, 0], "2026-09-03", 0.7, "medium"],
      [14, "transferable", [0.94, 0.88, 0.79, 0.72], "2026-09-05", 0.2, "low"],
      [20, "competent", [0.84, 0.73, 0.58, 0.38], "2026-09-02", 0.3, "medium"],
      [25, "practicing", [0.61, 0.48, 0.28, 0.12], "2026-08-31", 0.55, "medium"],
    ];
    seeds.forEach(([index, state, values, due, uncertainty, forgettingRisk]) => {
      const atom = DATA.atoms[index];
      if (!atom) return;
      mastery[atom.id] = {
        ...emptyMastery(), state, evidence: { A1: values[0], A2: values[1], A3: values[2], A4: values[3] },
        uncertainty, missingness: null, attempts: state === "exposed" ? 1 : 3,
        lastPracticed: "2026-08-26", due, forgettingRisk,
      };
    });
    return {
      version: STATE_VERSION,
      synthetic: true,
      mastery,
      game: { xp: 240, activeDays: 4, reflectionTokens: 3, questProgress: 2 },
      context: { timeBudget: "10", fatigue: "normal", modality: "mixed", language: "es", lowBandwidth: false },
      route: { selectedMissionId: routeCandidateIds[0], manualOverride: false, overrideReason: null, overrideCount: 0, lastDecision: null },
      events: [
        seedEvidenceEvent({ id: "evt-demo-pulse-a3", atomId: "gm-ma-locate-upper-limb-pulses", level: "A3", correct: true, assistance: "tutored", title: "Localización de pulsos del miembro superior", daysAgo: 1 }),
        seedEvidenceEvent({ id: "evt-demo-plexus-a2", atomId: "gm-ma-reconstruct-brachial-plexus", level: "A2", correct: true, assistance: "none", title: "Reconstrucción del plexo braquial", daysAgo: 2 }),
        seedEvidenceEvent({ id: "evt-demo-imaging-a1", atomId: "gm-ma-interpret-upper-limb-imaging", level: "A1", correct: false, assistance: "none", title: "Imagen anatómica del miembro superior", daysAgo: 3 }),
      ],
      contests: [],
    };
  };

  const loadState = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored && stored.version === STATE_VERSION && stored.mastery && stored.game && stored.context) return stored;
    } catch (_error) {
      // A corrupt demo state is replaced; canonical state is never touched.
    }
    return createSeedState();
  };

  let learner = loadState();
  if (!learner.deepPack || learner.deepPack.packId !== DEEP_PACK?.id) {
    learner.deepPack = {
      version: 1,
      packId: DEEP_PACK?.id || null,
      completedLessons: [],
      lessonAttempts: {},
      activityResults: {},
      reviewQueue: [],
      lastLessonId: null,
    };
  }
  let currentScreen = "today";
  let selectedMapObjective = DATA.objectives[0].id;
  let lessonMode = "full";
  let lessonSequence = [];
  let lessonStep = 0;
  let lessonXP = 0;
  let lessonCommitted = false;
  let selectedChoice = null;
  let confidence = null;
  let assistance = { level: "none", hints: [] };
  let answeredCurrentStep = false;
  let questionStartedAt = null;
  let sessionEvents = [];
  let activePackLessonId = null;
  let toastTimer;

  const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(learner));
  const masteryFor = atomId => {
    if (!learner.mastery[atomId]) learner.mastery[atomId] = emptyMastery();
    return learner.mastery[atomId];
  };
  const currentMission = () => byId(learner.route.selectedMissionId) || byId(routeCandidateIds[0]);
  const currentConfig = () => MISSION_CONFIGS[currentMission().id];
  const activePackLesson = () => DEEP_PACK?.lessons.find(lesson => lesson.id === activePackLessonId) || null;
  const isDeepPackMission = () => Boolean(DEEP_PACK && currentMission().id === DEEP_PACK.nodeRef);
  const nextDeepLesson = () => DEEP_PACK?.lessons.find(lesson => !learner.deepPack.completedLessons.includes(lesson.id)) || DEEP_PACK?.lessons[0];

  const showToast = message => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
  };

  const timeFit = duration => {
    const budget = Number(learner.context.timeBudget);
    return duration <= budget ? 1 : clamp(1 - ((duration - budget) / 8));
  };
  const rankCandidates = () => routeCandidateIds.map(id => {
    const atom = byId(id);
    const config = MISSION_CONFIGS[id];
    const state = masteryFor(id);
    const masteryGap = 1 - STATE_WEIGHTS[state.state];
    const spacingNeed = state.due && state.due <= TODAY ? 1 : state.lastPracticed ? 0.42 : 0.3;
    const modalityFit = config.modalities.includes(learner.context.modality) || learner.context.modality === "mixed" ? 1 : 0.55;
    const fatigueFit = learner.context.fatigue === "high" ? (config.duration <= 6 ? 1 : 0.55) : 1;
    const factors = { masteryGap, spacingNeed, clinicalValue: config.clinicalValue, timeFit: timeFit(config.duration), modalityFit, foundation: config.foundation, fatigueFit };
    const score = (0.26 * masteryGap) + (0.2 * spacingNeed) + (0.17 * config.clinicalValue) +
      (0.13 * factors.timeFit) + (0.09 * modalityFit) + (0.09 * config.foundation) + (0.06 * fatigueFit);
    return { atom, config, state, factors, score };
  }).sort((a, b) => b.score - a.score);

  const updateRouteDecision = trigger => {
    const ranked = rankCandidates();
    if (!learner.route.manualOverride) learner.route.selectedMissionId = ranked[0].atom.id;
    learner.route.lastDecision = {
      id: makeId("route"), trigger, algorithmVersion: ALGORITHM_VERSION,
      selected: learner.route.selectedMissionId,
      candidates: ranked.map(item => ({ atomRef: item.atom.id, score: Number(item.score.toFixed(3)), factors: item.factors })),
      context: { ...learner.context },
      limitation: "Pesos sintéticos; requieren evaluación empírica y auditoría de equidad.",
    };
    saveState();
  };

  const averageClusterProgress = () => Math.round((DATA.atoms.reduce((sum, atom) => sum + STATE_WEIGHTS[masteryFor(atom.id).state], 0) / DATA.atoms.length) * 100);
  const reusableEvidenceCount = () => DATA.atoms.filter(atom => ["competent", "transferable", "consolidated"].includes(masteryFor(atom.id).state)).length;
  const renderEvidenceMini = evidence => DATA.assessmentLevels.map(level => {
    const value = Math.round((evidence[level.code] || 0) * 100);
    return `<div class="evidence-mini"><span>${escapeHTML(level.code)} · ${escapeHTML(level.label)}</span><i style="--value:${value}%"></i></div>`;
  }).join("");

  const routeExplanation = rankedItem => {
    const { state, factors } = rankedItem;
    const reasons = [];
    if (state.due && state.due <= TODAY) reasons.push("repaso espaciado vencido");
    if (factors.masteryGap > 0.6) reasons.push("brecha de evidencia");
    if (factors.foundation > 0.8) reasons.push("alto valor como prerrequisito");
    if (factors.timeFit >= 0.9) reasons.push("cabe en tu tiempo disponible");
    if (learner.route.manualOverride) reasons.unshift("elección manual conservada");
    return reasons.slice(0, 3);
  };

  const renderToday = () => {
    const ranked = rankCandidates();
    const mission = currentMission();
    const config = currentConfig();
    const current = masteryFor(mission.id);
    const rankedCurrent = ranked.find(item => item.atom.id === mission.id) || ranked[0];
    const reasons = routeExplanation(rankedCurrent);
    document.getElementById("mission-title").textContent = mission.title;
    document.getElementById("mission-objective").textContent = mission.objective;
    document.getElementById("mission-kicker").textContent = `Misión ${learner.route.manualOverride ? "elegida" : "adaptativa"} · ${config.duration} min`;
    document.getElementById("mission-reason").textContent = reasons.length
      ? `MIA la prioriza por ${reasons.join(", ")}. La recomendación tiene incertidumbre y puedes cambiarla.`
      : "Esta unidad está en la frontera lista para aprender según el estado sintético actual.";
    document.getElementById("reason-factors").innerHTML = [
      ["Brecha", rankedCurrent.factors.masteryGap], ["Espaciado", rankedCurrent.factors.spacingNeed],
      ["Valor clínico", rankedCurrent.factors.clinicalValue], ["Ajuste al tiempo", rankedCurrent.factors.timeFit],
    ].map(([label, value]) => `<span>${escapeHTML(label)} ${Math.round(value * 100)}</span>`).join("");
    document.getElementById("reason-change").textContent = "¿Qué cambiaría la recomendación? Nueva evidencia independiente, un repaso vencido, menos tiempo o una modalidad distinta.";
    const modality = learner.context.lowBandwidth ? "text" : learner.context.modality;
    document.getElementById("resource-route").innerHTML = `<span><strong>Ruta conceptual:</strong> ${escapeHTML(mission.title)}</span><span><strong>Ruta de recursos:</strong> ${escapeHTML(config.resources[modality] || config.resources.mixed)}</span>`;
    document.getElementById("mission-evidence").innerHTML = renderEvidenceMini(current.evidence);
    const deepAvailable = Boolean(DEEP_PACK && mission.id === DEEP_PACK.nodeRef);
    document.getElementById("open-deep-unit").hidden = !deepAvailable;
    document.getElementById("deep-node-panel").hidden = !deepAvailable;
    document.getElementById("start-mission").textContent = deepAvailable
      ? `${learner.deepPack.completedLessons.length ? "Continuar" : "Comenzar"} unidad profunda`
      : "Comenzar misión";
    if (deepAvailable) renderNodePack();

    const progress = averageClusterProgress();
    document.getElementById("cluster-progress-label").textContent = `${progress}%`;
    document.getElementById("cluster-progress-bar").style.width = `${progress}%`;
    document.getElementById("cluster-progress-copy").textContent = `${reusableEvidenceCount()} de ${DATA.atoms.length} unidades tienen evidencia reutilizable; no es un porcentaje de competencia.`;
    document.getElementById("xp-value").textContent = learner.game.xp;
    document.getElementById("active-days").textContent = learner.game.activeDays;

    document.getElementById("context-time").value = learner.context.timeBudget;
    document.getElementById("context-fatigue").value = learner.context.fatigue;
    document.getElementById("context-modality").value = learner.context.modality;
    document.body.classList.toggle("low-bandwidth", learner.context.lowBandwidth);

    document.getElementById("frontier-list").innerHTML = ranked.map((item, index) => {
      const active = item.atom.id === mission.id;
      const status = item.state.missingness ? MISSINGNESS_LABELS[item.state.missingness] : STATE_LABELS[item.state.state];
      return `<button class="frontier-item${active ? " is-active" : ""}" type="button" data-frontier-id="${escapeHTML(item.atom.id)}"><span class="frontier-rank">${index + 1}</span><span><strong>${escapeHTML(item.atom.title)}</strong><small>${escapeHTML(status)} · ${item.config.duration} min · ajuste ${Math.round(item.score * 100)}</small></span><span>${active ? "Activa" : "Elegir"}</span></button>`;
    }).join("");
    document.querySelectorAll("[data-frontier-id]").forEach(button => button.addEventListener("click", () => selectMission(button.dataset.frontierId, "frontier_override")));

    const reviews = DATA.atoms.filter(atom => masteryFor(atom.id).due && masteryFor(atom.id).state !== "unknown")
      .sort((a, b) => masteryFor(a.id).due.localeCompare(masteryFor(b.id).due)).slice(0, 2);
    document.getElementById("review-count").textContent = reviews.length;
    document.getElementById("review-list").innerHTML = reviews.map(atom => {
      const item = masteryFor(atom.id);
      const when = item.due <= TODAY ? "hoy" : item.due.slice(5).replace("-", "/");
      return `<div class="review-item"><span class="review-item-icon" aria-hidden="true">↻</span><div><strong>${escapeHTML(atom.title)}</strong><small>${escapeHTML(STATE_LABELS[item.state])} · riesgo ${escapeHTML(item.forgettingRisk)}</small></div><time>${escapeHTML(when)}</time></div>`;
    }).join("");
  };

  const renderNodePack = () => {
    if (!DEEP_PACK) return;
    const lessons = DEEP_PACK.lessons;
    const completed = learner.deepPack.completedLessons;
    const totalActivities = lessons.reduce((sum, lesson) => sum + lesson.activities.length, 0);
    document.getElementById("deep-node-title").textContent = DEEP_PACK.title;
    document.getElementById("deep-node-description").textContent = DEEP_PACK.description;
    document.getElementById("deep-lesson-count").textContent = lessons.length;
    document.getElementById("deep-activity-count").textContent = totalActivities;
    document.getElementById("deep-format-count").textContent = DEEP_PACK.design.formats.length;
    document.getElementById("deep-progress-label").textContent = `${completed.length} de ${lessons.length} completadas`;
    document.getElementById("deep-progress-bar").style.width = `${Math.round((completed.length / lessons.length) * 100)}%`;
    document.getElementById("deep-lesson-path").innerHTML = lessons.map((lesson, index) => {
      const isCompleted = completed.includes(lesson.id);
      const isNext = nextDeepLesson()?.id === lesson.id;
      const scored = lesson.activities.filter(activity => activity.type !== "teach").length;
      const formats = [...new Set(lesson.activities.map(activity => formatLabels[activity.type]))];
      const status = isCompleted ? "Completada" : isNext ? "Siguiente" : "Explorable";
      return `<button class="deep-lesson-card" type="button" data-deep-lesson-id="${escapeHTML(lesson.id)}" data-deep-status="${isCompleted ? "completed" : isNext ? "next" : "available"}" aria-label="${escapeHTML(lesson.title)}: ${status}"><span class="deep-lesson-index">${isCompleted ? "✓" : String(index + 1).padStart(2, "0")}</span><span class="deep-lesson-copy"><span class="deep-lesson-meta">${escapeHTML(lesson.kind)} · ${lesson.durationMinutes} min · ${scored} evaluables</span><strong>${escapeHTML(lesson.title)}</strong><small>${escapeHTML(lesson.description)}</small><span class="deep-format-list">${formats.map(format => `<i>${escapeHTML(format)}</i>`).join("")}</span></span><span class="deep-lesson-action">${status} →</span></button>`;
    }).join("");
    document.getElementById("deep-lesson-path").querySelectorAll("[data-deep-lesson-id]").forEach(button => {
      button.addEventListener("click", () => startDeepLesson(button.dataset.deepLessonId));
    });
    document.getElementById("deep-review-timeline").innerHTML = DEEP_PACK.reviewPlan.map(review => `<span><strong>+${review.delayDays} día${review.delayDays === 1 ? "" : "s"}</strong>${escapeHTML(review.purpose)}</span>`).join("");
  };

  const selectMission = (id, reason) => {
    if (!MISSION_CONFIGS[id]) return;
    learner.route.selectedMissionId = id;
    learner.route.manualOverride = reason !== "algorithm";
    learner.route.overrideReason = reason;
    if (learner.route.manualOverride) learner.route.overrideCount += 1;
    updateRouteDecision(reason);
    renderAll();
    showToast(`Ruta actualizada: «${byId(id).title}». La elección queda registrada como contexto, no como evidencia de dominio.`);
  };

  const availabilityFor = atom => {
    const item = masteryFor(atom.id);
    if (item.state !== "unknown") return item.state;
    if (routeCandidateIds.includes(atom.id)) return "ready";
    if (atom.atomIndex === 0) return "explore";
    return "blocked";
  };

  const renderJourney = () => {
    const path = document.getElementById("journey-path");
    const mission = currentMission();
    path.innerHTML = DATA.objectives.map((objective, index) => {
      const nodes = objective.atoms.map((atom, atomIndex) => {
        const availability = availabilityFor(atom);
        const current = atom.id === mission.id ? " is-current" : "";
        const observed = Object.hasOwn(STATE_LABELS, availability);
        const label = observed ? STATE_LABELS[availability] : availability === "ready" ? "Listo para aprender" : availability === "explore" ? "Explorable" : "Prerrequisitos candidatos pendientes";
        const symbol = availability === "blocked" ? "◇" : availability === "ready" ? "→" : availability === "explore" ? "·" : availability === "unknown" ? atomIndex + 1 : "✓";
        return `<button class="path-node${current}" type="button" data-atom-id="${escapeHTML(atom.id)}" data-state="${escapeHTML(availability)}" aria-label="${escapeHTML(atom.title)}: ${escapeHTML(label)}"><span class="path-node-orb">${escapeHTML(symbol)}</span><span class="path-node-label">${escapeHTML(atom.title)}</span><small>${escapeHTML(label)}</small></button>`;
      }).join("");
      return `<article class="journey-world" style="--world-color:${WORLD_COLORS[index % WORLD_COLORS.length]}"><header class="world-heading"><span class="world-number">${String(index + 1).padStart(2, "0")}</span><div><h3>${escapeHTML(objective.title)}</h3><p>${objective.atoms.length} misiones · resultados fuente ${objective.sourceOutcomes.join(", ")}</p></div></header><div class="path-nodes">${nodes}</div></article>`;
    }).join("");
    path.querySelectorAll("[data-atom-id]").forEach(button => button.addEventListener("click", () => {
      const atom = byId(button.dataset.atomId);
      const availability = button.dataset.state;
      if (MISSION_CONFIGS[atom.id]) selectMission(atom.id, "journey_override");
      else if (availability === "blocked") showToast(`«${atom.title}» requiere revisar relaciones candidatas; no se interpreta como fallo del estudiante.`);
      else showToast(`${atom.title} · ${masteryFor(atom.id).missingness ? MISSINGNESS_LABELS[masteryFor(atom.id).missingness] : STATE_LABELS[masteryFor(atom.id).state]}`);
    }));
  };

  const objectiveProgress = objective => Math.round((objective.atoms.reduce((total, atom) => total + STATE_WEIGHTS[masteryFor(atom.id).state], 0) / objective.atoms.length) * 100);
  const renderMapDetail = objectiveId => {
    const objective = DATA.objectives.find(item => item.id === objectiveId) || DATA.objectives[0];
    selectedMapObjective = objective.id;
    document.getElementById("map-detail-title").textContent = objective.title;
    document.getElementById("map-detail-copy").textContent = objective.objective;
    const observed = objective.atoms.filter(atom => !masteryFor(atom.id).missingness).length;
    document.getElementById("map-detail-stats").innerHTML = [
      `<span class="detail-chip">${objective.atoms.length} unidades</span>`,
      `<span class="detail-chip">${observed} con observación</span>`,
      `<span class="detail-chip">${objectiveProgress(objective)}% índice experimental</span>`,
    ].join("");
    document.querySelectorAll(".map-region").forEach(button => button.classList.toggle("is-selected", button.dataset.objectiveId === objective.id));
  };
  const renderMap = () => {
    const map = document.getElementById("world-map");
    map.innerHTML = DATA.objectives.map((objective, index) => {
      const pips = objective.atoms.map(atom => `<i class="atom-pip" data-state="${escapeHTML(masteryFor(atom.id).state)}" aria-hidden="true"></i>`).join("");
      return `<button class="map-region" type="button" data-objective-id="${escapeHTML(objective.id)}"><span class="map-region-top"><span class="map-region-index">${String(index + 1).padStart(2, "0")}</span><span class="map-region-percent">${objectiveProgress(objective)}%</span></span><strong>${escapeHTML(worldShortNames[index] || objective.title)}</strong><span class="atom-pips">${pips}</span></button>`;
    }).join("");
    map.querySelectorAll(".map-region").forEach(button => button.addEventListener("click", () => renderMapDetail(button.dataset.objectiveId)));
    renderMapDetail(selectedMapObjective);
  };

  const aggregateEvidence = code => DATA.atoms.reduce((sum, atom) => sum + (masteryFor(atom.id).evidence[code] || 0), 0) / DATA.atoms.length;
  const evidenceEventMarkup = event => {
    const help = event.assistance?.level || "unknown";
    const correctness = event.correct === true ? "correcta" : event.correct === false ? "incorrecta" : "no puntuada";
    return `<details class="ledger-item"><summary><span><strong>${escapeHTML(event.title || byId(event.atomRef)?.title || "Evento")}</strong><small>${escapeHTML(event.evidenceLevel || "—")} · ${escapeHTML(correctness)} · ayuda: ${escapeHTML(help)}</small></span><time>${escapeHTML(event.occurredAt?.slice(0, 10) || "sin fecha")}</time></summary><dl class="event-detail"><div><dt>Fase</dt><dd>${escapeHTML(event.phase || "—")}</dd></div><div><dt>Confianza</dt><dd>${escapeHTML(event.confidence || "—")}</dd></div><div><dt>Modalidad</dt><dd>${escapeHTML(event.context?.modality || "—")}</dd></div><div><dt>Uso</dt><dd>formativo, bajo riesgo</dd></div><div><dt>Versión del ítem</dt><dd>${escapeHTML(event.versions?.item || "—")}</dd></div><div><dt>Versión del objetivo</dt><dd>${escapeHTML(event.versions?.atom || "—")}</dd></div><div><dt>Validez</dt><dd>${escapeHTML(event.validity || "—")}</dd></div></dl></details>`;
  };

  const renderProfile = () => {
    const progress = averageClusterProgress();
    const ring = document.getElementById("mastery-ring");
    ring.style.setProperty("--ring-value", `${progress}%`);
    document.getElementById("mastery-percent").textContent = `${progress}%`;
    document.querySelector("#mastery-ring small").textContent = "cobertura";
    document.getElementById("mastery-state-title").textContent = "Cobertura observada, no competencia";
    document.getElementById("mastery-state-copy").textContent = "Este índice resume estados candidatos del grafo. La decisión educativa debe revisar evidencia, incertidumbre, asistencia, retención y transferencia.";
    document.getElementById("profile-evidence-bars").innerHTML = DATA.assessmentLevels.map(level => {
      const value = Math.round(aggregateEvidence(level.code) * 100);
      return `<div class="evidence-bar-row"><span class="evidence-code">${escapeHTML(level.code)}</span><span class="evidence-track"><span style="--value:${value}%;--bar-color:${LEVEL_COLORS[level.code]}"></span></span><span class="evidence-value">${value}%</span><span class="evidence-bar-label">${escapeHTML(level.label)} · ${escapeHTML(level.meaning)} · índice experimental</span></div>`;
    }).join("");
    const distribution = Object.keys(STATE_LABELS).map(state => ({ state, count: DATA.atoms.filter(atom => masteryFor(atom.id).state === state).length }));
    const missing = DATA.atoms.filter(atom => masteryFor(atom.id).missingness === "not_attempted").length;
    document.getElementById("state-distribution").innerHTML = distribution.map(item => `<div class="distribution-row"><span>${escapeHTML(STATE_LABELS[item.state])}</span><strong>${item.count}</strong></div>`).join("") + `<div class="distribution-row missing-row"><span>No intentado ≠ fallado</span><strong>${missing}</strong></div>`;
    document.getElementById("evidence-ledger").innerHTML = learner.events.slice().reverse().slice(0, 8).map(evidenceEventMarkup).join("");

    const mission = currentMission();
    const item = masteryFor(mission.id);
    const missingLabel = item.missingness ? MISSINGNESS_LABELS[item.missingness] : "observado";
    document.getElementById("open-model").innerHTML = `<div class="belief-card"><strong>${escapeHTML(mission.title)}</strong><dl><div><dt>Estado candidato</dt><dd>${escapeHTML(STATE_LABELS[item.state])}</dd></div><div><dt>Datos faltantes</dt><dd>${escapeHTML(missingLabel)}</dd></div><div><dt>Incertidumbre</dt><dd>${Math.round(item.uncertainty * 100)}%</dd></div><div><dt>Riesgo de olvido</dt><dd>${escapeHTML(item.forgettingRisk)}</dd></div></dl><p><strong>Por qué:</strong> ${item.attempts} sesiones agregadas y ${learner.events.filter(event => event.atomRef === mission.id).length} eventos visibles. Las ayudas y los errores se conservan.</p><p><strong>Qué lo cambiaría:</strong> recuperación independiente demorada, nueva modalidad y transferencia a un caso o imagen no vista.</p>${item.contested ? '<p class="contested-note">Inferencia contestada por el estudiante; requiere revisión contextual.</p>' : ""}</div>`;
    const contestButton = document.getElementById("contest-inference");
    contestButton.disabled = item.contested;
    contestButton.textContent = item.contested ? "Marcada para revisión" : "Contestar esta inferencia";

    document.getElementById("game-state").innerHTML = `<div class="game-stats"><span><strong>${learner.game.xp}</strong> XP de aventura</span><span><strong>${learner.game.reflectionTokens}</strong> fichas de reflexión</span><span><strong>${learner.game.questProgress}/5</strong> acciones de la misión</span></div>`;
    const delayed = learner.events.filter(event => event.phase === "delayed_retention").length;
    const transfer = learner.events.filter(event => ["near_transfer", "far_transfer"].includes(event.phase)).length;
    document.getElementById("evaluation-grid").innerHTML = [
      ["Adquisición inmediata", `${learner.events.filter(event => event.phase === "retrieval").length} observaciones`, "descriptivo"],
      ["Retención demorada", delayed ? `${delayed} observaciones` : "pendiente", "resultado clave"],
      ["Transferencia", `${transfer} muestras`, "requiere variedad"],
      ["Rutas renegociadas", `${learner.route.overrideCount}`, "agencia"],
      ["Equidad y acceso", "sin auditar", "no interpretar eficacia"],
    ].map(([label, value, note]) => `<div><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong><small>${escapeHTML(note)}</small></div>`).join("");
    document.getElementById("toggle-low-bandwidth").textContent = learner.context.lowBandwidth ? "Desactivar modo texto" : "Activar modo texto";
  };

  const screenTitles = { today: "Tu siguiente misión", journey: "Camino de aprendizaje", map: "Mapa de dominio", profile: "Tu learner state abierto" };
  const navigate = screen => {
    currentScreen = screen;
    document.querySelectorAll("[data-screen]").forEach(section => section.classList.toggle("is-active", section.dataset.screen === screen));
    document.querySelectorAll("[data-nav]").forEach(button => {
      const active = button.dataset.nav === screen;
      button.classList.toggle("is-active", active);
      if (button.classList.contains("nav-item")) active ? button.setAttribute("aria-current", "page") : button.removeAttribute("aria-current");
    });
    document.getElementById("screen-heading").textContent = screenTitles[screen];
    if (screen === "journey") renderJourney();
    if (screen === "map") renderMap();
    if (screen === "profile") renderProfile();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildLessonSequence = () => {
    const config = currentConfig();
    const mission = currentMission();
    if (lessonMode === "deep") {
      const packLesson = activePackLesson();
      if (!packLesson) return [];
      const activities = packLesson.activities.map(activity => {
        if (activity.type === "teach") return { kind: "pack_teach", ...activity };
        return {
          kind: "question",
          activityType: activity.type,
          kicker: `${formatLabels[activity.type]} · ${activity.evidenceLevel}`,
          title: activity.title,
          lead: activity.instruction,
          evidence: activity.evidenceLevel,
          ...activity,
        };
      });
      return [
        { kind: "intro", kicker: `Microlección ${DEEP_PACK.lessons.indexOf(packLesson) + 1} de ${DEEP_PACK.lessons.length}`, title: packLesson.title, lead: packLesson.description, packLessonId: packLesson.id },
        ...activities,
        { kind: "result", kicker: "Cierre de microlección", title: "Evidencia guardada; la unidad continúa", lead: "Esta sesión actualiza evidencia formativa y el progreso de la unidad, pero no declara dominio.", packLessonId: packLesson.id },
      ];
    }
    const questionSteps = config.questions.map(question => ({ kind: "question", ...question }));
    const full = [
      { kind: "intro", kicker: "Contrato de la misión", title: mission.title, lead: "Primero recuperarás sin enseñanza. Cada respuesta registra asistencia y confianza; el error orienta remediación y no se confunde con una omisión." },
      questionSteps[0],
      { kind: "teach", kicker: "Modelo discriminador", title: config.teachTitle, lead: config.teachLead },
      ...questionSteps.slice(1),
      { kind: "result", kicker: "Cierre formativo", title: "La sesión termina; la inferencia continúa", lead: "Separa adquisición inmediata, retención demorada y transferencia. El resultado de hoy solo actualiza evidencia formativa." },
    ];
    if (lessonMode === "quick") return [questionSteps[0], questionSteps.at(-1), full.at(-1)];
    return full;
  };

  const renderTeachingStep = step => {
    const config = currentConfig();
    const isPack = step.kind === "pack_teach";
    const cards = isPack ? step.cards.map(card => [card.symbol, card.label, card.copy]) : config.teachCards;
    const lead = isPack ? step.instruction : step.lead;
    const memoryRule = isPack ? step.memoryRule : config.memoryRule;
    const mechanism = isPack ? step.mechanism : "contraste + recuperación generativa";
    return `<span class="lesson-step-kicker">${escapeHTML(isPack ? "Modelo breve" : step.kicker)}</span><h2 id="lesson-title">${escapeHTML(step.title)}</h2><p class="lesson-lead">${escapeHTML(lead)}</p><div class="teaching-grid">${cards.map(card => `<article class="teaching-card"><span class="bone-glyph">${escapeHTML(card[0])}</span><h3>${escapeHTML(card[1])}</h3><p>${escapeHTML(card[2])}</p></article>`).join("")}</div><div class="memory-rule"><strong>Regla de reconstrucción:</strong> ${escapeHTML(memoryRule)}</div><div class="mechanism-note"><strong>Mecanismo:</strong> ${escapeHTML(mechanism)}. Su contribución debe comprobarse mediante retención y transferencia posteriores.</div>`;
  };

  const renderQuestionStep = step => {
    const activityType = step.activityType || "single_choice";
    const typeNote = activityType === "multiple_select" ? "Selecciona todas las respuestas que consideres correctas." : activityType === "sequence" ? "Toca cada elemento en el orden que propones." : activityType === "short_answer" ? "Escribe una respuesta breve; se ignorarán mayúsculas y tildes." : "Selecciona una respuesta.";
    let interaction = "";
    if (["single_choice", "multiple_select", "sequence"].includes(activityType)) {
      const choices = step.choices.map((choice, index) => `<button class="choice-button${activityType === "sequence" ? " sequence-choice" : ""}" type="button" data-choice="${index}"><span class="choice-letter">${activityType === "multiple_select" ? "□" : activityType === "sequence" ? "·" : String.fromCharCode(65 + index)}</span><span>${escapeHTML(choice)}</span></button>`).join("");
      interaction = `<div class="choice-list" data-activity-type="${escapeHTML(activityType)}">${choices}</div>${activityType === "sequence" ? '<div class="sequence-status"><span id="sequence-selection">Aún no has construido la secuencia.</span><button type="button" id="clear-sequence">Reiniciar orden</button></div>' : ""}`;
    } else {
      interaction = `<label class="short-answer-shell"><span>Tu respuesta</span><input id="short-answer" type="text" autocomplete="off" spellcheck="false" placeholder="Escribe aquí…"><small>Se evalúa el término anatómico, no la ortografía de mayúsculas o tildes.</small></label>`;
    }
    return `<span class="lesson-step-kicker">${escapeHTML(step.kicker)}</span><h2 id="lesson-title">${escapeHTML(step.title)}</h2><p class="lesson-lead">${escapeHTML(step.lead)}</p><div class="assessment-boundary"><strong>Uso:</strong> práctica formativa de bajo riesgo · ${escapeHTML(typeNote)} · una respuesta no certifica el objetivo</div>${interaction}`;
  };

  const resultEvidence = () => {
    const current = masteryFor(currentMission().id).evidence;
    return DATA.assessmentLevels.map(level => `<div class="result-evidence-item"><strong>${level.code} · ${Math.round((current[level.code] || 0) * 100)}%</strong><span>${escapeHTML(level.label)} · índice candidato</span></div>`).join("");
  };

  const assistanceWeight = event => ({ none: 1, hint: 0.65, retry: 0.45, tutored: 0.25 }[event.assistance.level] || 0.25);
  const addDays = (dateString, days) => {
    const date = new Date(`${dateString}T12:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  };
  const commitLessonResult = () => {
    if (lessonCommitted) return;
    lessonCommitted = true;
    const item = masteryFor(currentMission().id);
    const validEvents = sessionEvents.filter(event => event.validity === "formative_low_stakes");
    const weightedCorrect = validEvents.reduce((sum, event) => sum + (event.correct ? assistanceWeight(event) : 0), 0);
    const possible = Math.max(1, validEvents.length);
    const sessionSignal = weightedCorrect / possible;
    item.state = sessionSignal >= 0.45 ? "practicing" : "exposed";
    item.attempts += 1;
    item.missingness = null;
    item.lastPracticed = TODAY;
    item.due = "2026-08-30";
    item.forgettingRisk = "high";
    item.uncertainty = clamp(0.78 - (validEvents.length * 0.06) + (validEvents.filter(event => event.assistance.level !== "none").length * 0.05));
    item.errorPatterns = [...new Set([...item.errorPatterns, ...validEvents.filter(event => !event.correct).map(event => event.errorPattern)])].filter(Boolean);
    DATA.assessmentLevels.forEach(level => {
      const levelEvents = validEvents.filter(event => event.evidenceLevel === level.code);
      if (!levelEvents.length) return;
      const signal = levelEvents.reduce((sum, event) => sum + (event.correct ? assistanceWeight(event) : 0), 0) / levelEvents.length;
      item.evidence[level.code] = Math.max(item.evidence[level.code], Number((0.25 + (0.55 * signal)).toFixed(2)));
    });
    item.scheduledChecks = [
      { type: "delayed_retention", due: "2026-08-30", modality: learner.context.modality },
      { type: "near_transfer", due: "2026-09-05", modality: learner.context.modality === "image" ? "text" : "image" },
    ];
    if (lessonMode === "deep" && activePackLessonId) {
      if (!learner.deepPack.completedLessons.includes(activePackLessonId)) learner.deepPack.completedLessons.push(activePackLessonId);
      learner.deepPack.lessonAttempts[activePackLessonId] = (learner.deepPack.lessonAttempts[activePackLessonId] || 0) + 1;
      learner.deepPack.lastLessonId = activePackLessonId;
      sessionEvents.forEach(event => {
        learner.deepPack.activityResults[event.activityRef] = {
          correct: event.correct,
          confidence: event.confidence,
          assistance: event.assistance.level,
          occurredAt: event.occurredAt,
          itemVersion: event.versions.item,
        };
      });
      if (activePackLesson()?.kind === "checkpoint") {
        learner.deepPack.reviewQueue = DEEP_PACK.reviewPlan.map(review => ({
          reviewId: review.id,
          due: addDays(TODAY, review.delayDays),
          purpose: review.purpose,
          activityMix: review.activityMix,
          status: "scheduled_candidate",
        }));
      }
    }
    learner.game.xp += lessonXP + 5;
    learner.game.reflectionTokens += 1;
    learner.game.questProgress = Math.min(5, learner.game.questProgress + 1);
    saveState();
  };

  const renderResultStep = step => {
    commitLessonResult();
    const independent = sessionEvents.filter(event => event.assistance.level === "none");
    const independentCorrect = independent.filter(event => event.correct).length;
    const assisted = sessionEvents.length - independent.length;
    const calibrated = sessionEvents.filter(event => event.calibrated).length;
    const deepSummary = lessonMode === "deep" ? `<div class="deep-result-summary"><strong>${escapeHTML(activePackLesson()?.title || "Microlección")}</strong><span>${learner.deepPack.completedLessons.length}/${DEEP_PACK.lessons.length} microlecciones completadas · ${DEEP_PACK.lessons.length - learner.deepPack.completedLessons.length} todavía disponibles</span></div>` : "";
    return `<div class="result-layout"><div class="result-orb"><strong>${independentCorrect}/${independent.length || 0}</strong><span>recuperación independiente</span></div><div><span class="lesson-step-kicker">${escapeHTML(step.kicker)}</span><h2 id="lesson-title">${escapeHTML(step.title)}</h2><p class="lesson-lead">${escapeHTML(step.lead)}</p>${deepSummary}<div class="objective-contract"><strong>Estado candidato: ${escapeHTML(STATE_LABELS[masteryFor(currentMission().id).state])}</strong>${assisted} respuestas usaron ayuda; ${calibrated}/${sessionEvents.length} juicios de confianza fueron calibrados. Ninguna respuesta perfecta produce por sí sola “transferible”.</div><div class="scheduled-checks"><span><strong>Mañana</strong> recuperación demorada</span><span><strong>En 7 días</strong> transferencia en otra modalidad</span></div><div class="result-evidence">${resultEvidence()}</div></div></div>`;
  };

  const renderLesson = () => {
    const step = lessonSequence[lessonStep];
    const progress = Math.round((lessonStep / Math.max(1, lessonSequence.length - 1)) * 100);
    document.getElementById("lesson-progress-bar").style.width = `${progress}%`;
    document.getElementById("lesson-xp").textContent = lessonXP;
    const content = document.getElementById("lesson-content");
    const feedback = document.getElementById("lesson-feedback");
    const continueButton = document.getElementById("lesson-continue");
    const responsePanel = document.getElementById("lesson-response-panel");
    const hintButton = document.getElementById("use-hint");
    const hintBox = document.getElementById("hint-box");
    feedback.textContent = "";
    feedback.className = "lesson-feedback";
    responsePanel.hidden = true;
    responsePanel.querySelectorAll("[data-confidence]").forEach(button => {
      button.disabled = false;
      button.classList.remove("is-selected");
      button.onclick = null;
    });
    hintButton.disabled = false;
    hintButton.onclick = null;
    hintBox.hidden = true;
    hintBox.innerHTML = "";
    answeredCurrentStep = false;
    selectedChoice = null;
    confidence = null;
    assistance = { level: "none", hints: [] };
    questionStartedAt = null;

    if (step.kind === "intro") {
      content.innerHTML = `<span class="lesson-step-kicker">${escapeHTML(step.kicker)}</span><h2 id="lesson-title">${escapeHTML(step.title)}</h2><p class="lesson-lead">${escapeHTML(step.lead)}</p><div class="objective-contract"><strong>Un objetivo observable</strong>${escapeHTML(currentMission().objective)}</div><div class="objective-contract validity-contract"><strong>Límite de la inferencia</strong>Esta actividad apoya decisiones formativas. No autoriza certificación, entrustment ni práctica clínica independiente.</div>`;
      continueButton.disabled = false;
      continueButton.textContent = lessonMode === "deep" ? "Comenzar microlección" : "Empezar diagnóstico";
    } else if (step.kind === "teach" || step.kind === "pack_teach") {
      content.innerHTML = renderTeachingStep(step);
      continueButton.disabled = false;
      continueButton.textContent = step.kind === "pack_teach" ? "Ponerlo en práctica" : "Practicar sin pistas";
    } else if (step.kind === "question") {
      content.innerHTML = renderQuestionStep(step);
      responsePanel.hidden = false;
      continueButton.disabled = true;
      continueButton.textContent = "Comprobar";
      questionStartedAt = performance.now();
      const activityType = step.activityType || "single_choice";
      if (["multiple_select", "sequence"].includes(activityType)) selectedChoice = [];
      if (activityType === "single_choice") {
        content.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
          if (answeredCurrentStep) return;
          selectedChoice = Number(button.dataset.choice);
          content.querySelectorAll("[data-choice]").forEach(item => item.classList.toggle("is-selected", item === button));
          updateQuestionReadyState();
        }));
      } else if (activityType === "multiple_select") {
        content.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
          if (answeredCurrentStep) return;
          const index = Number(button.dataset.choice);
          selectedChoice = selectedChoice.includes(index) ? selectedChoice.filter(item => item !== index) : [...selectedChoice, index];
          content.querySelectorAll("[data-choice]").forEach(item => {
            const selected = selectedChoice.includes(Number(item.dataset.choice));
            item.classList.toggle("is-selected", selected);
            item.querySelector(".choice-letter").textContent = selected ? "✓" : "□";
          });
          updateQuestionReadyState();
        }));
      } else if (activityType === "sequence") {
        const renderSequence = () => {
          content.querySelectorAll("[data-choice]").forEach(item => {
            const position = selectedChoice.indexOf(Number(item.dataset.choice));
            item.classList.toggle("is-selected", position >= 0);
            item.querySelector(".choice-letter").textContent = position >= 0 ? String(position + 1) : "·";
          });
          document.getElementById("sequence-selection").textContent = selectedChoice.length
            ? `${selectedChoice.length}/${step.choices.length} posiciones construidas`
            : "Aún no has construido la secuencia.";
          updateQuestionReadyState();
        };
        content.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
          if (answeredCurrentStep) return;
          const index = Number(button.dataset.choice);
          selectedChoice = selectedChoice.includes(index) ? selectedChoice.filter(item => item !== index) : [...selectedChoice, index];
          renderSequence();
        }));
        document.getElementById("clear-sequence").addEventListener("click", () => { selectedChoice = []; renderSequence(); });
      } else if (activityType === "short_answer") {
        const input = document.getElementById("short-answer");
        input.addEventListener("input", () => { selectedChoice = input.value; updateQuestionReadyState(); });
        input.focus();
      }
      responsePanel.querySelectorAll("[data-confidence]").forEach(button => {
        button.onclick = () => {
          if (answeredCurrentStep) return;
          confidence = button.dataset.confidence;
          responsePanel.querySelectorAll("[data-confidence]").forEach(item => item.classList.toggle("is-selected", item === button));
          updateQuestionReadyState();
        };
      });
      hintButton.onclick = () => useHint(step);
    } else {
      content.innerHTML = renderResultStep(step);
      continueButton.disabled = false;
      continueButton.textContent = lessonMode === "deep" ? "Volver a la unidad" : "Volver a mi ruta";
    }
    content.scrollTop = 0;
  };

  const updateQuestionReadyState = () => {
    const button = document.getElementById("lesson-continue");
    const step = lessonSequence[lessonStep];
    const activityType = step?.activityType || "single_choice";
    const hasAnswer = activityType === "sequence"
      ? Array.isArray(selectedChoice) && selectedChoice.length === step.choices.length
      : Array.isArray(selectedChoice)
        ? selectedChoice.length > 0
        : typeof selectedChoice === "string"
          ? selectedChoice.trim().length > 0
          : selectedChoice !== null;
    button.disabled = !hasAnswer || confidence === null;
  };
  const useHint = step => {
    if (answeredCurrentStep || assistance.level === "hint") return;
    assistance = { level: "hint", hints: [step.hint] };
    const box = document.getElementById("hint-box");
    box.hidden = false;
    box.innerHTML = `<strong>Pista registrada:</strong> ${escapeHTML(step.hint)} <span>Esta respuesta aportará evidencia asistida, no recuperación independiente.</span>`;
    document.getElementById("use-hint").disabled = true;
  };
  const isCalibrated = (certainty, correct) => (certainty === "high" && correct) || (certainty === "low" && !correct) || certainty === "medium";
  const normalizeAnswer = value => String(value).trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const sameIndices = (left, right) => left.length === right.length && left.every((value, index) => value === right[index]);
  const evaluateResponse = step => {
    const activityType = step.activityType || "single_choice";
    if (activityType === "single_choice") return selectedChoice === (step.correctIndex ?? step.correct);
    if (activityType === "multiple_select") return sameIndices([...selectedChoice].sort((a, b) => a - b), [...step.correctIndices].sort((a, b) => a - b));
    if (activityType === "sequence") return sameIndices(selectedChoice, step.correctOrder);
    return step.acceptedAnswers.map(normalizeAnswer).includes(normalizeAnswer(selectedChoice));
  };
  const responseLabel = (step, response = selectedChoice) => {
    const activityType = step.activityType || "single_choice";
    if (activityType === "single_choice") return step.choices[response];
    if (["multiple_select", "sequence"].includes(activityType)) return response.map(index => step.choices[index]).join(activityType === "sequence" ? " → " : ", ");
    return String(response).trim();
  };
  const correctResponseLabel = step => {
    const activityType = step.activityType || "single_choice";
    if (activityType === "single_choice") return step.choices[step.correctIndex ?? step.correct];
    if (activityType === "multiple_select") return step.correctIndices.map(index => step.choices[index]).join(", ");
    if (activityType === "sequence") return step.correctOrder.map(index => step.choices[index]).join(" → ");
    return step.acceptedAnswers[0];
  };

  const submitQuestion = step => {
    if (answeredCurrentStep || selectedChoice === null || confidence === null) return;
    answeredCurrentStep = true;
    const correct = evaluateResponse(step);
    const calibrated = isCalibrated(confidence, correct);
    const xpAward = (correct ? (assistance.level === "none" ? 6 : 3) : 0) + (calibrated ? 2 : 0);
    lessonXP += xpAward;
    const activityType = step.activityType || "single_choice";
    document.querySelectorAll(".choice-button").forEach(choice => {
      const index = Number(choice.dataset.choice);
      choice.disabled = true;
      const expected = activityType === "single_choice" ? index === (step.correctIndex ?? step.correct) : activityType === "multiple_select" ? step.correctIndices.includes(index) : false;
      const chosen = Array.isArray(selectedChoice) ? selectedChoice.includes(index) : index === selectedChoice;
      if (expected) choice.classList.add("is-correct");
      else if (chosen && !correct) choice.classList.add("is-wrong");
    });
    const shortInput = document.getElementById("short-answer");
    if (shortInput) {
      shortInput.disabled = true;
      shortInput.classList.add(correct ? "is-correct" : "is-wrong");
    }
    document.querySelectorAll("[data-confidence]").forEach(button => { button.disabled = true; });
    const renderedResponse = responseLabel(step);
    const event = {
      id: makeId("evt"), type: "learning_evidence_event", occurredAt: new Date().toISOString(),
      learnerRef: "demo-local-learner", atomRef: currentMission().id, objectiveRef: currentMission().objectiveId,
      activityRef: step.id || `${currentMission().id}-${step.phase}`, assessmentUseRef: "upper-limb-formative-v0",
      evidenceLevel: step.evidence, phase: step.phase, response: renderedResponse, responseIndex: selectedChoice,
      correct, assistance: { ...assistance }, attemptNumber: masteryFor(currentMission().id).attempts + 1,
      confidence, calibrated, latencyMs: Math.round(performance.now() - questionStartedAt), errorPattern: correct ? null : step.errorPattern,
      context: { language: learner.context.language, modality: learner.context.modality, device: window.innerWidth <= 560 ? "mobile" : "desktop", interruption: "not_observed", fatigue: learner.context.fatigue },
      scorer: { method: "deterministic_key", confidence: 1, reviewStatus: "unreviewed_demo" },
      validity: "formative_low_stakes",
      versions: { prototype: PROTOTYPE_VERSION, atom: "upper-limb-v0", item: step.id ? `${step.id}-v${step.version}` : `${currentMission().id}-${step.phase}-v0`, rubric: RUBRIC_VERSION, algorithm: ALGORITHM_VERSION },
      title: currentMission().title,
    };
    sessionEvents.push(event);
    learner.events.push(event);
    saveState();
    const feedback = document.getElementById("lesson-feedback");
    document.getElementById("lesson-response-panel").hidden = true;
    feedback.classList.add(correct ? "is-correct" : "is-wrong");
    const confidenceLabel = { low: "estoy adivinando", medium: "tengo dudas", high: "estoy seguro" }[confidence];
    feedback.innerHTML = `<strong>${correct ? "Correcto." : "Error productivo."}</strong> ${escapeHTML(step.explanation)} <span class="calibration-feedback">Declaraste «${confidenceLabel}». ${calibrated ? "Tu confianza estuvo calibrada." : "Compara tu confianza con el resultado; calibrarla también se aprende."}</span>${correct ? "" : `<span class="remediation-feedback"><strong>Remediación:</strong> contrasta «${escapeHTML(renderedResponse)}» con «${escapeHTML(correctResponseLabel(step))}» y reconstruye la relación que los separa.</span>`}`;
    document.getElementById("lesson-xp").textContent = lessonXP;
    const continueButton = document.getElementById("lesson-continue");
    continueButton.disabled = false;
    continueButton.textContent = "Continuar";
  };

  const startLesson = mode => {
    lessonMode = mode;
    lessonStep = 0;
    lessonXP = 0;
    lessonCommitted = false;
    sessionEvents = [];
    lessonSequence = buildLessonSequence();
    const overlay = document.getElementById("lesson-overlay");
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    renderLesson();
    document.getElementById("close-lesson").focus();
  };
  const startDeepLesson = lessonId => {
    if (!DEEP_PACK?.lessons.some(lesson => lesson.id === lessonId)) return;
    activePackLessonId = lessonId;
    startLesson("deep");
  };
  const closeLesson = () => {
    const returnToDeepUnit = lessonMode === "deep";
    document.getElementById("lesson-overlay").hidden = true;
    document.body.style.overflow = "";
    if (lessonCommitted) {
      if (returnToDeepUnit) {
        learner.route.selectedMissionId = DEEP_PACK.nodeRef;
        learner.route.manualOverride = true;
        learner.route.overrideReason = "continue_deep_pack";
        updateRouteDecision("post_deep_lesson_update");
      } else {
        learner.route.manualOverride = false;
        updateRouteDecision("post_assessment_update");
      }
    }
    renderAll();
    if (returnToDeepUnit) {
      document.getElementById("deep-node-panel").scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelector(`[data-deep-lesson-id="${activePackLessonId}"]`)?.focus();
    } else {
      document.getElementById("start-mission").focus();
    }
  };
  const nextLessonStep = () => {
    const step = lessonSequence[lessonStep];
    if (step.kind === "question" && !answeredCurrentStep) {
      submitQuestion(step);
      return;
    }
    if (lessonStep >= lessonSequence.length - 1) {
      closeLesson();
      showToast("Evidencia formativa guardada solo en esta demostración local.");
      return;
    }
    lessonStep += 1;
    renderLesson();
  };

  const renderAll = () => {
    renderToday();
    if (currentScreen === "journey") renderJourney();
    if (currentScreen === "map") renderMap();
    if (currentScreen === "profile") renderProfile();
  };

  const contestInference = () => {
    const item = masteryFor(currentMission().id);
    item.contested = true;
    learner.contests.push({ id: makeId("contest"), atomRef: currentMission().id, at: new Date().toISOString(), reason: "student_requested_context_review", status: "open" });
    saveState();
    renderProfile();
    showToast("Inferencia marcada para revisión. Contestarla no borra evidencia ni cambia la verdad anatómica.");
  };
  const exportEvidence = () => {
    const payload = { exportedAt: new Date().toISOString(), prototype: PROTOTYPE_VERSION, learnerModel: learner };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "grafomed-demo-evidence.json";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Copia portable de la evidencia preparada.");
  };

  document.querySelectorAll("[data-nav]").forEach(button => button.addEventListener("click", event => {
    if (button.tagName === "A") event.preventDefault();
    navigate(button.dataset.nav);
  }));
  document.getElementById("start-mission").addEventListener("click", () => {
    if (isDeepPackMission()) startDeepLesson(nextDeepLesson().id);
    else startLesson("full");
  });
  document.getElementById("quick-review").addEventListener("click", () => startLesson("quick"));
  document.getElementById("open-deep-unit").addEventListener("click", () => document.getElementById("deep-node-panel").scrollIntoView({ behavior: "smooth", block: "start" }));
  document.getElementById("change-mission").addEventListener("click", () => document.getElementById("frontier-panel").scrollIntoView({ behavior: "smooth", block: "center" }));
  document.getElementById("close-lesson").addEventListener("click", closeLesson);
  document.getElementById("lesson-continue").addEventListener("click", nextLessonStep);
  ["context-time", "context-fatigue", "context-modality"].forEach(id => document.getElementById(id).addEventListener("change", event => {
    const key = id === "context-time" ? "timeBudget" : id === "context-fatigue" ? "fatigue" : "modality";
    learner.context[key] = event.target.value;
    learner.route.manualOverride = false;
    updateRouteDecision(`context_${key}`);
    renderAll();
    showToast("Ruta recalculada con tu contexto. El ajuste no cambia tu dominio.");
  }));
  document.getElementById("contest-inference").addEventListener("click", contestInference);
  document.getElementById("export-evidence").addEventListener("click", exportEvidence);
  document.getElementById("toggle-low-bandwidth").addEventListener("click", () => {
    learner.context.lowBandwidth = !learner.context.lowBandwidth;
    learner.context.modality = learner.context.lowBandwidth ? "text" : "mixed";
    updateRouteDecision("accessibility_mode_change");
    renderAll();
    renderProfile();
  });
  document.getElementById("reset-demo").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    learner = createSeedState();
    updateRouteDecision("demo_reset");
    renderAll();
    showToast("Demostración reiniciada; el learner state canónico no fue tocado.");
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !document.getElementById("lesson-overlay").hidden) closeLesson();
  });

  if (!learner.route.lastDecision) updateRouteDecision("initial_load");
  saveState();
  renderAll();
})();
