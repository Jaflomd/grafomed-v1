/**
 * GrafoMed · Laboratorio de Juegos (Assessment Units)
 * Prototipo 01: DAG Concept Map Builder (Canvas Grande + Drag & Drop + Sistema de Pistas)
 */

const GAMES_CATALOG = [
  {
    id: "game-01",
    num: "01",
    title: "DAG Concept Map Builder",
    subtitle: "Canvas Grande · Drag & Drop · Pistas",
    purpose: "Causalidad fisiopatológica, modelado en red sin ciclos (DAG)",
    format: "Canvas Grande superior con drag & drop directo desde bandeja inferior y sistema de pistas",
    status: "active"
  },
  {
    id: "game-02",
    num: "02",
    title: "Pathway Target Spotter",
    subtitle: "Dianas Farmacológicas & Vías de Señalización",
    purpose: "Localización precisa del mecanismo de acción molecular en cascadas fisiopatológicas",
    format: "Diagrama interactivo de vía biológica + desafío farmacológico + detección de diana en 1 clic",
    status: "active"
  },
  {
    id: "game-03",
    num: "03",
    title: "Illness Script Matrix",
    subtitle: "Fx Riesgo · Curso · Síntomas · Signos/Labs",
    purpose: "Reconocimiento de patrones clínicos y contrastes diagnósticos diferenciales",
    format: "Construcción de 3 pacientes modelo con baraja de fichas una por una y despacho en 1 clic",
    status: "active"
  },
  {
    id: "game-04",
    num: "04",
    title: "Management Script Matrix",
    subtitle: "Labs · Imágenes · Criterios Dx · Tto · Complicaciones",
    purpose: "Plan de investigación diagnóstica, tratamiento de urgencia y prevención de complicaciones",
    format: "Construcción de 3 planes de manejo con baraja de fichas una por una y despacho en 1 clic",
    status: "active"
  },
  {
    id: "game-05",
    num: "05",
    title: "Script Concordance Test",
    subtitle: "Certeza Diagnóstica · Slider -1 a +1",
    purpose: "Juicio clínico bajo incertidumbre y actualización bayesiana de hipótesis",
    format: "Vignette + Slider interactivo (-1.0 a +1.0) comparado con panel de 15 expertos",
    status: "active"
  },
  {
    id: "game-06",
    num: "06",
    title: "Clinical Vignette MCQ",
    subtitle: "Decisión Terapéutica & Ficha EHR",
    purpose: "Resolución de casos clínicos tipo Board con discriminación profunda de distractores",
    format: "Ficha médica EHR con signos vitales dinámicos + 5 opciones de elección + desglose de distractores",
    status: "active"
  },
  {
    id: "game-07",
    num: "07",
    title: "Structure Spotter",
    subtitle: "Anatomía & Radiología · Hotspot Pinpoint",
    purpose: "Identificación topográfica y espacial de estructuras anatómicas en figuras médicas",
    format: "Figura anatómica interactiva vectorial (SVG) con zonas activas + retos clínicos 1-por-1",
    status: "active"
  },
  {
    id: "game-08",
    num: "08",
    title: "Therapeutic Shooter",
    subtitle: "Selección de Tratamiento · 4 Cañones",
    purpose: "Prescripción de precisión bajo presión temporal y neutralización de patologías sin iatrogenias",
    format: "Arcade shooter interactivo: nave defensora con 4 balas farmacológicas conmutables ante invasores clínicos",
    status: "active"
  },
  {
    id: "game-09",
    num: "09",
    title: "Therapeutic Synapse Match",
    subtitle: "Conector Etiología · Tratamiento",
    purpose: "Asociación directa y memoria de trabajo de esquemas antimicrobianos y terapéuticos dirigidos",
    format: "Dos columnas interactivas (Patógeno/Causa ↔ Tratamiento): Unión por cables táctiles y drag & drop con feedback y racional",
    status: "active"
  },
  {
    id: "game-10",
    num: "10",
    title: "Clinical MythBuster",
    subtitle: "Swipe Verdadero / Falso · Juicio Crítico",
    purpose: "Detección rápida de dogmas médicos erróneos, contraindicaciones críticas y sesgos cognitivos",
    format: "Baraja de tarjetas swipeables (izquierda Falso / derecha Verdadero) y botones 1-clic con desglose de mitos",
    status: "active"
  },
  {
    id: "game-11",
    num: "11",
    title: "Patient Cluster Matrix",
    subtitle: "Clasificación Diagnóstica & Severidad",
    purpose: "Estratificación de riesgo, determinación de severidad y clasificación de fenotipos clínicos",
    format: "Ficha clínica de paciente con signos vitales dinámicos + Bahías de clusters de severidad/diagnóstico a 1-clic y atajos",
    status: "active"
  },
  {
    id: "game-12",
    num: "12",
    title: "Workflow Sequencer",
    subtitle: "Orden de Decisiones · Línea Temporal",
    purpose: "Precedencia temporal y priorización de pasos críticos en urgencias sin inversiones iatrogénicas",
    format: "Dossier clínico EHR + Slots cronológicos (1º, 2º, 3º, 4º) + Cajitas de acciones ordenables por arrastre y 1-clic",
    status: "active"
  },
  { id: "game-13", num: "13", title: "Próximo juego", subtitle: "Por definir", purpose: "Definir con el usuario", format: "Pendiente", status: "pending" },
  { id: "game-14", num: "14", title: "Próximo juego", subtitle: "Por definir", purpose: "Definir con el usuario", format: "Pendiente", status: "pending" },
  { id: "game-15", num: "15", title: "Próximo juego", subtitle: "Por definir", purpose: "Definir con el usuario", format: "Pendiente", status: "pending" },
  { id: "game-16", num: "16", title: "Próximo juego", subtitle: "Por definir", purpose: "Definir con el usuario", format: "Pendiente", status: "pending" },
  { id: "game-17", num: "17", title: "Próximo juego", subtitle: "Por definir", purpose: "Definir con el usuario", format: "Pendiente", status: "pending" },
  { id: "game-18", num: "18", title: "Próximo juego", subtitle: "Por definir", purpose: "Definir con el usuario", format: "Pendiente", status: "pending" },
  { id: "game-19", num: "19", title: "Próximo juego", subtitle: "Por definir", purpose: "Definir con el usuario", format: "Pendiente", status: "pending" },
  { id: "game-20", num: "20", title: "Próximo juego", subtitle: "Por definir", purpose: "Definir con el usuario", format: "Pendiente", status: "pending" }
];

let activeGameId = "game-11";

const GAME01_DATA = {
  title: "EPOC: Patogenia Fisiopatológica (DAG)",
  sourceRef: "The Calgary Guide to Understanding Disease",
  nodes: [
    { id: "genetic", title: "Susceptibilidad Genética", subtitle: "Déficit α1-antitripsina", category: "Etiología", initX: 100, initY: 30 },
    { id: "environmental", title: "Insulto Ambiental", subtitle: "Tabaquismo / Polución", category: "Etiología", initX: 520, initY: 30 },
    { id: "radicals", title: "Radicales Libres y Antiproteasas", subtitle: "Estrés oxidativo", category: "Mecanismo", initX: 310, initY: 110 },
    { id: "inflammation", title: "Inflamación Pulmonar", subtitle: "Neutrófilos y Macrófagos", category: "Mediador", initX: 310, initY: 195 },
    { id: "bronchial_injury", title: "Lesión Continua Bronquial", subtitle: "Células caliciformes y moco", category: "Daño Vía Aérea", initX: 100, initY: 280 },
    { id: "proteolysis", title: "Destrucción Proteolítica", subtitle: "Pérdida elastina parénquima", category: "Daño Tisular", initX: 520, initY: 280 },
    { id: "bronchitis", title: "Bronquitis Crónica", subtitle: "Fibrosis y tapones de moco", category: "Fenotipo", initX: 100, initY: 365 },
    { id: "emphysema", title: "Enfisema", subtitle: "Pérdida de elasticidad y colapso", category: "Fenotipo", initX: 520, initY: 365 },
    { id: "copd", title: "EPOC (Diagnóstico Final)", subtitle: "Limitación irreversible de flujo", category: "Síndrome", initX: 310, initY: 410 }
  ],
  edges: [
    { source: "genetic", target: "radicals", rationale: "Déficit genético disminuye la neutralización de proteasas libres." },
    { source: "environmental", target: "radicals", rationale: "El humo del tabaco produce radicales libres e inactiva antiproteasas." },
    { source: "radicals", target: "inflammation", rationale: "Estrés oxidativo activa macrófagos y neutrófilos, mediando la inflamación crónica." },
    { source: "inflammation", target: "bronchial_injury", rationale: "La inflamación bronquial crónica estimula hipersecreción de moco." },
    { source: "inflammation", target: "proteolysis", rationale: "Las proteasas de neutrófilos degradan la elastina del parénquima alveolar." },
    { source: "bronchial_injury", target: "bronchitis", rationale: "La lesión bronquial continua y tapones de moco configuran la bronquitis crónica." },
    { source: "proteolysis", target: "emphysema", rationale: "La lisis del parénquima causa pérdida de elasticidad y enfisema." },
    { source: "bronchitis", target: "copd", rationale: "La bronquitis crónica contribuye a la limitación fija del flujo en EPOC." },
    { source: "emphysema", target: "copd", rationale: "El enfisema provoca colapso alveolar y atrapamiento aéreo en EPOC." }
  ]
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const gameState01 = {
  canvasNodes: {},     // id -> { id, x, y }
  edges: [],           // [{ source, target }]
  shuffledNodes: [],   // Arreglo aleatorizado
  arrowToolActive: false,
  arrowSource: null,
  currentHintData: null
};

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const hashParam = window.location.hash ? window.location.hash.replace("#", "") : null;
  const requestedGame = urlParams.get("game") || hashParam;
  if (requestedGame && GAMES_CATALOG.some(g => g.id === requestedGame && g.status === 'active')) {
    activeGameId = requestedGame;
  }
  renderNavbar();
  LabGamification.init();
  loadGame(activeGameId);
});

function renderNavbar() {
  const strip = document.getElementById("games-pill-strip");
  if (!strip) return;
  strip.innerHTML = "";

  const completedBadge = document.getElementById("games-completed-count");
  if (completedBadge) completedBadge.textContent = "12 / 20";

  GAMES_CATALOG.forEach(game => {
    const isCurrent = (game.id === activeGameId);
    const isAvailable = (game.status === 'active');
    const pill = document.createElement("button");
    pill.id = `nav-tab-${game.id}`;
    pill.className = `game-tab-pill ${isAvailable ? 'available' : 'locked'} ${isCurrent ? 'active' : ''}`.trim();
    pill.innerHTML = `
      <span class="pill-num">${game.num}</span>
      <span class="pill-title">${game.title}</span>
      ${isAvailable ? '<span class="pill-ready-dot" title="Listo para jugar">●</span>' : ''}
    `;
    if (isAvailable) {
      pill.addEventListener("click", () => {
        loadGame(game.id);
      });
    }
    strip.appendChild(pill);
  });
}

function loadGame(gameId) {
  activeGameId = gameId;
  const game = GAMES_CATALOG.find(g => g.id === gameId);
  if (!game) return;

  // Actualizar clase activa en la barra de navegación
  document.querySelectorAll(".game-tab-pill").forEach(p => p.classList.remove("active"));
  const currentPill = document.getElementById(`nav-tab-${gameId}`);
  if (currentPill) currentPill.classList.add("active");

  const purposeEl = document.getElementById("game-purpose-text");
  const formatEl = document.getElementById("game-format-text");
  if (purposeEl) purposeEl.textContent = game.purpose;
  if (formatEl) formatEl.textContent = game.format;

  const statusLabel = document.querySelector(".status-label");
  if (statusLabel) statusLabel.textContent = `Prototipo ${game.num} Activo · ${game.title}`;

  const stage = document.getElementById("lab-stage");
  if (!stage) return;
  stage.innerHTML = "";

  if (gameId === "game-01") {
    renderGame01Large(stage);
  } else if (gameId === "game-02") {
    renderGame02(stage);
  } else if (gameId === "game-03") {
    renderGame03(stage);
  } else if (gameId === "game-04") {
    renderGame04(stage);
  } else if (gameId === "game-05") {
    renderGame05(stage);
  } else if (gameId === "game-06") {
    renderGame06(stage);
  } else if (gameId === "game-07") {
    renderGame07(stage);
  } else if (gameId === "game-08") {
    renderGame08(stage);
  } else if (gameId === "game-09") {
    renderGame09(stage);
  } else if (gameId === "game-10") {
    renderGame10(stage);
  } else if (gameId === "game-11") {
    renderGame11(stage);
  } else if (gameId === "game-12") {
    renderGame12(stage);
  }
}

// RENDERIZADO DEL LAYOUT CANVAS GRANDE
function renderGame01Large(stage) {
  const container = document.createElement("div");
  container.className = "game01-container-large";

  container.innerHTML = `
    <!-- Barra de Herramientas Superior -->
    <div class="builder-toolbar">
      <div class="toolbar-stats">
        <div class="stat-item">
          <span class="stat-label">Nodos en Canvas</span>
          <span class="stat-val" id="stat-nodes-placed">0 / 9</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Flechas Causales</span>
          <span class="stat-val highlight" id="stat-links-connected">0 / 9</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Modo</span>
          <span class="stat-val" id="canvas-mode-status" style="font-size:12px; color:#38bdf8;">Arrastre Libre de Nodos</span>
        </div>
      </div>
      <div class="toolbar-actions">
        <!-- BOTÓN PEDIR PISTA -->
        <button class="lab-btn secondary" id="btn-request-hint" style="border-color:#f59e0b; color:#fbbf24; background:rgba(245,158,11,0.15);">
          💡 Pedir Pista
        </button>
        <button class="lab-btn secondary" id="btn-open-ref">
          📖 Modelo de Referencia
        </button>
        <button class="lab-btn secondary" id="btn-reset-canvas">
          ↺ Reiniciar
        </button>
      </div>
    </div>

    <!-- 1. VENTANA SUPERIOR: EL CANVAS GRANDE -->
    <div class="canvas-large-card" id="large-canvas">
      <div class="canvas-grid-bg"></div>

      <!-- Guía en Canvas Vacío -->
      <div class="canvas-drop-hint-overlay" id="canvas-empty-overlay">
        <div style="font-size:32px; margin-bottom:8px;">⬇</div>
        <strong style="color:#94a3b8; font-size:14px;">Arrastra los nodos desde la bandeja inferior hacia aquí</strong>
        <span style="color:#64748b; font-size:12px;">También puedes hacer clic en cada nodo de la ventana de abajo</span>
      </div>

      <!-- Banner de Toast Flotante -->
      <div class="feedback-toast" id="feedback-toast">
        <span id="toast-icon">✓</span>
        <span id="toast-message">Mensaje</span>
      </div>

      <!-- Capa SVG para flechas reactivas -->
      <svg class="canvas-svg-layer" id="canvas-svg-layer">
        <defs>
          <marker id="arrow-head-success" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
          </marker>
          <marker id="arrow-head-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
          </marker>
        </defs>
      </svg>

      <!-- Capa de nodos posicionados libremente -->
      <div id="canvas-nodes-layer" style="position:absolute; inset:0; pointer-events:none; z-index:20;"></div>
    </div>

    <!-- 2. VENTANA INFERIOR: CAJA DE HERRAMIENTAS (NODOS & FLECHAS) -->
    <div class="bank-card">
      <div class="bank-header">
        <div class="bank-title-group">
          <h3>Ventana Inferior: Caja de Herramientas (Nodos & Flechas)</h3>
          <p>Arrastra los nodos hacia el canvas grande de arriba. Usa la herramienta de flechas para conectar relaciones de causa y efecto.</p>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 220px 1fr; gap:16px; align-items:center;">
        <!-- Herramienta de Flechas y Pistas -->
        <div style="background:rgba(11,17,32,0.6); padding:10px 14px; border-radius:10px; border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:8px;">
          <!-- BOTÓN PEDIR PISTA MUY VISIBLE EN LA BANDEJA -->
          <button id="btn-request-hint-tray" class="lab-btn" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#0b1120; font-weight:800; font-size:12px; justify-content:center; box-shadow:0 4px 12px rgba(245,158,11,0.3); border:none;">
            💡 ¿Dudas? Pedir Pista
          </button>
          <div style="height:1px; background:var(--border-subtle); margin:2px 0;"></div>
          <span style="font-size:11px; font-weight:700; color:#38bdf8;">Herramienta: Flechas</span>
          <button id="btn-toggle-arrow-tool" class="lab-btn secondary" style="font-size:12px; justify-content:center; border-color:#06b6d4; color:#38bdf8; width:100%;">
            ➔ Trazar Flecha (Inactivo)
          </button>
          <span style="font-size:10px; color:#94a3b8; line-height:1.2;">Pulsa Causa ➔ Efecto para conectar.</span>
        </div>

        <!-- Banco de Nodos Disponibles (Aleatorizados) -->
        <div style="background:rgba(11,17,32,0.6); padding:10px 14px; border-radius:10px; border:1px solid var(--border-subtle); min-height:85px; display:flex; flex-direction:column; justify-content:center;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span style="font-size:11px; font-weight:700; color:#f8fafc;">Nodos Disponibles (🎲 Orden Aleatorio)</span>
            <span style="font-size:10px; color:#94a3b8;" id="pool-remaining-label">9 disponibles</span>
          </div>
          <div class="node-pool" id="node-pool" style="border:none; padding:0; background:transparent;"></div>
        </div>
      </div>
    </div>

    <!-- MODAL DE PISTAS (SISTEMA DE ASISTENCIA PEDAGÓGICA) -->
    <dialog class="modal-dialog" id="hint-dialog">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:22px;">💡</span>
          <div>
            <h3 style="font-size:15px; font-weight:700; color:#f8fafc;">Pista Pedagógica</h3>
            <span style="font-size:11px; color:#fbbf24; font-weight:600;">Razonamiento Fisiopatológico</span>
          </div>
        </div>
        <button id="btn-close-hint" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">✕</button>
      </div>

      <div id="hint-dialog-body" style="background:#020617; padding:14px; border-radius:8px; border:1px solid #1e293b; font-size:12px; line-height:1.6; color:#cbd5e1; margin-bottom:16px;">
        Cargando pista...
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        <button class="lab-btn secondary" id="btn-hint-highlight" style="border-color:#f59e0b; color:#fbbf24; justify-content:center;">
          ✨ Resaltar en la bandeja el nodo recomendado
        </button>
        <button class="lab-btn secondary" id="btn-hint-autocomplete" style="justify-content:center;">
          ⚙ Completar y conectar este paso automáticamente
        </button>
      </div>
    </dialog>

    <!-- MODAL DE MODELO IDEAL -->
    <dialog class="modal-dialog" id="ref-dialog" style="max-width:580px;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px; margin-bottom:14px;">
        <h3 style="font-size:15px; font-weight:700; color:#f8fafc;">📖 Modelo Ideal de Referencia (Calgary Guide)</h3>
        <button id="btn-close-ref" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">✕</button>
      </div>
      <div class="calgary-card" style="max-height:480px; overflow-y:auto;">
        <div class="calgary-flow">
          <div class="flow-row">
            <div class="ref-node-box blue"><strong>Susceptibilidad genética</strong><br><small>(Déficit α1-antitripsina)</small></div>
            <div class="ref-node-box blue"><strong>Insulto ambiental</strong><br><small>(Tabaquismo / Polución)</small></div>
          </div>
          <div class="ref-arrow-down">↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓</div>
          <div class="flow-row">
            <div class="ref-node-box blue" style="max-width:320px;"><strong>Radicales libres e inactivación antiproteasas</strong><br><small>Estrés oxidativo + daño tisular</small></div>
          </div>
          <div class="ref-arrow-down">↓</div>
          <div class="flow-row">
            <div class="ref-node-box blue" style="max-width:340px; background:#eff6ff;"><strong>Inflamación Pulmonar</strong><br><small>Neutrófilos, macrófagos y citoquinas</small></div>
          </div>
          <div class="ref-arrow-down">↙ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↘</div>
          <div class="flow-row">
            <div class="ref-node-box purple"><strong>Lesión continua bronquial</strong><br><small>Células caliciformes y moco</small></div>
            <div class="ref-node-box purple"><strong>Destrucción proteolítica</strong><br><small>Degradación elastina parénquima</small></div>
          </div>
          <div class="ref-arrow-down">↓ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↓</div>
          <div class="flow-row">
            <div class="ref-node-box coral"><strong>Bronquitis Crónica</strong><br><small>Fibrosis y tapones de moco</small></div>
            <div class="ref-node-box coral"><strong>Enfisema</strong><br><small>Pérdida de elasticidad y colapso</small></div>
          </div>
          <div class="ref-arrow-down">↘ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↙</div>
          <div class="flow-row">
            <div class="ref-node-box green" style="max-width:340px; background:#ecfdf5; border-color:#10b981;">
              <strong style="color:#065f46;">EPOC (Diagnóstico Final)</strong><br><small>Limitación persistente e irreversible del flujo</small>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  `;

  stage.appendChild(container);
  initGame01LargeEvents();
}

function initGame01LargeEvents() {
  const refDialog = document.getElementById("ref-dialog");
  document.getElementById("btn-open-ref").addEventListener("click", () => refDialog.showModal());
  document.getElementById("btn-close-ref").addEventListener("click", () => refDialog.close());

  const hintDialog = document.getElementById("hint-dialog");
  document.getElementById("btn-request-hint").addEventListener("click", openHintSystem);
  const trayHintBtn = document.getElementById("btn-request-hint-tray");
  if (trayHintBtn) trayHintBtn.addEventListener("click", openHintSystem);
  document.getElementById("btn-close-hint").addEventListener("click", () => hintDialog.close());
  document.getElementById("btn-hint-highlight").addEventListener("click", executeHintHighlight);
  document.getElementById("btn-hint-autocomplete").addEventListener("click", executeHintAutocomplete);

  // Inicializar arreglo aleatorio de nodos
  if (!gameState01.shuffledNodes || gameState01.shuffledNodes.length === 0) {
    gameState01.shuffledNodes = shuffleArray(GAME01_DATA.nodes);
  }

  document.getElementById("btn-reset-canvas").addEventListener("click", resetAll);
  document.getElementById("btn-toggle-arrow-tool").addEventListener("click", toggleArrowTool);

  setupCanvasDropTarget();
  renderNodePool();
  renderCanvasNodes();
}

// SETUP DRAG AND DROP DESDE BANDEJA INFERIOR AL CANVAS
function setupCanvasDropTarget() {
  const canvas = document.getElementById("large-canvas");
  if (!canvas) return;

  canvas.addEventListener("dragover", e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    canvas.style.borderColor = "#38bdf8";
  });

  canvas.addEventListener("dragleave", () => {
    canvas.style.borderColor = "var(--border-subtle)";
  });

  canvas.addEventListener("drop", e => {
    e.preventDefault();
    canvas.style.borderColor = "var(--border-subtle)";

    const nodeId = e.dataTransfer.getData("text/plain");
    if (!nodeId) return;

    const cRect = canvas.getBoundingClientRect();
    const dropX = Math.max(10, Math.min(e.clientX - cRect.left - 85, cRect.width - 180));
    const dropY = Math.max(10, Math.min(e.clientY - cRect.top - 30, cRect.height - 70));

    addNodeToCanvas(nodeId, dropX, dropY);
  });
}

function renderNodePool() {
  const pool = document.getElementById("node-pool");
  if (!pool) return;
  pool.innerHTML = "";

  if (!gameState01.shuffledNodes || gameState01.shuffledNodes.length === 0) {
    gameState01.shuffledNodes = shuffleArray(GAME01_DATA.nodes);
  }
  const unplaced = gameState01.shuffledNodes.filter(n => !gameState01.canvasNodes[n.id]);
  const poolLabel = document.getElementById("pool-remaining-label");
  if (poolLabel) poolLabel.textContent = `${unplaced.length} disponibles`;

  const emptyOverlay = document.getElementById("canvas-empty-overlay");
  if (emptyOverlay) {
    emptyOverlay.style.opacity = Object.keys(gameState01.canvasNodes).length === 0 ? "1" : "0";
  }

  unplaced.forEach(node => {
    const chip = document.createElement("div");
    chip.className = "pool-node-chip";
    chip.id = `tray-node-${node.id}`;
    chip.draggable = true;
    chip.innerHTML = `<span>⋮⋮</span> <strong>${node.title}</strong>`;
    chip.title = "Arrastra hacia el lienzo grande (o haz clic para posicionar)";

    chip.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", node.id);
      chip.style.opacity = "0.5";
    });
    chip.addEventListener("dragend", () => {
      chip.style.opacity = "1";
    });

    chip.addEventListener("click", () => {
      addNodeToCanvas(node.id, node.initX, node.initY);
    });

    pool.appendChild(chip);
  });

  updateStats();
}

function addNodeToCanvas(nodeId, x, y) {
  if (gameState01.canvasNodes[nodeId]) return;

  const canvas = document.getElementById("large-canvas");
  const cRect = canvas.getBoundingClientRect();

  const posX = Math.max(10, Math.min(x || 100, cRect.width - 180));
  const posY = Math.max(10, Math.min(y || 100, cRect.height - 70));

  gameState01.canvasNodes[nodeId] = { id: nodeId, x: posX, y: posY };

  renderNodePool();
  renderCanvasNodes();
  showToast("info", `Nodo «${GAME01_DATA.nodes.find(n=>n.id===nodeId)?.title}» colocado. Puedes moverlo arrastrándolo.`);
}

function renderCanvasNodes() {
  const layer = document.getElementById("canvas-nodes-layer");
  if (!layer) return;
  layer.innerHTML = "";

  Object.values(gameState01.canvasNodes).forEach(item => {
    const nodeInfo = GAME01_DATA.nodes.find(n => n.id === item.id);
    if (!nodeInfo) return;

    const el = document.createElement("div");
    el.id = `node-${nodeInfo.id}`;
    el.className = "canvas-node";
    el.style.left = `${item.x}px`;
    el.style.top = `${item.y}px`;
    el.style.position = "absolute";
    el.style.pointerEvents = "auto";
    el.style.cursor = "grab";

    el.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="node-category-tag">${nodeInfo.category}</span>
        <button class="remove-node-btn" style="background:none; border:none; color:#64748b; font-size:11px; cursor:pointer;" title="Devolver a la ventana inferior">✕</button>
      </div>
      <div class="node-title">${nodeInfo.title}</div>
      <div style="font-size:10px; color:#94a3b8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${nodeInfo.subtitle}</div>
    `;

    el.querySelector(".remove-node-btn").addEventListener("pointerdown", e => e.stopPropagation());
    el.querySelector(".remove-node-btn").addEventListener("click", e => {
      e.stopPropagation();
      removeNodeFromCanvas(nodeInfo.id);
    });

    setupDragging(el, nodeInfo.id);

    el.addEventListener("click", e => {
      e.stopPropagation();
      handleNodeArrowClick(nodeInfo.id);
    });

    layer.appendChild(el);
  });

  drawAllArrows();
  updateStats();
}

function removeNodeFromCanvas(nodeId) {
  delete gameState01.canvasNodes[nodeId];
  gameState01.edges = gameState01.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
  renderNodePool();
  renderCanvasNodes();
}

function setupDragging(el, nodeId) {
  let isDragging = false;
  let startX, startY;
  let initialLeft, initialTop;

  el.addEventListener("pointerdown", e => {
    if (gameState01.arrowToolActive) return;

    isDragging = true;
    el.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = gameState01.canvasNodes[nodeId].x;
    initialTop = gameState01.canvasNodes[nodeId].y;

    el.style.zIndex = "50";
    el.style.cursor = "grabbing";
    el.style.borderColor = "#38bdf8";
  });

  el.addEventListener("pointermove", e => {
    if (!isDragging) return;

    const canvas = document.getElementById("large-canvas");
    const cRect = canvas.getBoundingClientRect();

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newX = Math.max(0, Math.min(initialLeft + dx, cRect.width - el.offsetWidth));
    let newY = Math.max(0, Math.min(initialTop + dy, cRect.height - el.offsetHeight));

    gameState01.canvasNodes[nodeId].x = newX;
    gameState01.canvasNodes[nodeId].y = newY;

    el.style.left = `${newX}px`;
    el.style.top = `${newY}px`;

    drawAllArrows();
  });

  const endDrag = e => {
    if (!isDragging) return;
    isDragging = false;
    el.style.zIndex = "20";
    el.style.cursor = "grab";
    el.style.borderColor = "#3b82f6";
    try { el.releasePointerCapture(e.pointerId); } catch (err) {}
  };

  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointercancel", endDrag);
}

function toggleArrowTool() {
  gameState01.arrowToolActive = !gameState01.arrowToolActive;
  gameState01.arrowSource = null;
  updateArrowToolUI();
}

function updateArrowToolUI() {
  const btn = document.getElementById("btn-toggle-arrow-tool");
  const statusLabel = document.getElementById("canvas-mode-status");

  if (gameState01.arrowToolActive) {
    btn.style.background = "rgba(245, 158, 11, 0.2)";
    btn.style.borderColor = "#f59e0b";
    btn.style.color = "#f59e0b";
    btn.textContent = gameState01.arrowSource ? "➔ Selecciona Efecto..." : "➔ Modo Flecha ACTIVO";
    statusLabel.textContent = gameState01.arrowSource 
      ? `Trazando desde «${GAME01_DATA.nodes.find(n=>n.id===gameState01.arrowSource)?.title}»...`
      : "Pulsa en el nodo Causa.";
    statusLabel.style.color = "#fbbf24";
  } else {
    btn.style.background = "transparent";
    btn.style.borderColor = "#06b6d4";
    btn.style.color = "#38bdf8";
    btn.textContent = "➔ Trazar Flecha (Inactivo)";
    statusLabel.textContent = "Arrastre Libre de Nodos";
    statusLabel.style.color = "#38bdf8";
  }
}

function handleNodeArrowClick(nodeId) {
  if (!gameState01.arrowSource) {
    gameState01.arrowSource = nodeId;
    gameState01.arrowToolActive = true;
    updateArrowToolUI();
    const el = document.getElementById(`node-${nodeId}`);
    if (el) el.classList.add("selected-for-link");
    showToast("info", `Causa elegida: «${GAME01_DATA.nodes.find(n=>n.id===nodeId)?.title}». Ahora haz clic en su Efecto.`);
    return;
  }

  if (gameState01.arrowSource === nodeId) {
    const el = document.getElementById(`node-${nodeId}`);
    if (el) el.classList.remove("selected-for-link");
    gameState01.arrowSource = null;
    updateArrowToolUI();
    return;
  }

  const sourceId = gameState01.arrowSource;
  const targetId = nodeId;
  const prevEl = document.getElementById(`node-${sourceId}`);
  if (prevEl) prevEl.classList.remove("selected-for-link");
  gameState01.arrowSource = null;
  updateArrowToolUI();

  addDirectedEdge(sourceId, targetId);
}

function addDirectedEdge(sourceId, targetId) {
  if (gameState01.edges.some(e => e.source === sourceId && e.target === targetId)) {
    showToast("info", "Esta flecha ya existe en el mapa.");
    return;
  }

  // Detección de ciclos DAG
  if (createsCycle(sourceId, targetId)) {
    shakeNodes(sourceId, targetId);
    showToast("error", "¡Violación DAG (Ciclo detectado)! Una causa no puede ser indirectamente su propio efecto.");
    return;
  }

  const canonical = GAME01_DATA.edges.find(e => e.source === sourceId && e.target === targetId);
  const reversed = GAME01_DATA.edges.find(e => e.source === targetId && e.target === sourceId);

  if (canonical) {
    gameState01.edges.push({ source: sourceId, target: targetId });
    drawAllArrows();
    updateStats();
    pulseNodes(sourceId, targetId);
    showToast("success", `✓ ¡Correcto! ${canonical.rationale}`);
  } else if (reversed) {
    shakeNodes(sourceId, targetId);
    showToast("error", "¡Causalidad invertida! Causa y efecto están al revés.");
  } else {
    shakeNodes(sourceId, targetId);
    showToast("error", "No existe relación causal directa entre estos dos nodos.");
  }
}

function createsCycle(source, target) {
  let visited = new Set();
  let queue = [target];
  while (queue.length > 0) {
    let curr = queue.shift();
    if (curr === source) return true;
    visited.add(curr);
    let neighbors = gameState01.edges.filter(e => e.source === curr).map(e => e.target);
    for (let n of neighbors) {
      if (!visited.has(n)) queue.push(n);
    }
  }
  return false;
}

function drawAllArrows() {
  const svg = document.getElementById("canvas-svg-layer");
  if (!svg) return;

  const paths = svg.querySelectorAll("path.arrow-path");
  paths.forEach(p => p.remove());

  const canvas = document.getElementById("large-canvas");
  const cRect = canvas.getBoundingClientRect();

  gameState01.edges.forEach(edge => {
    const sEl = document.getElementById(`node-${edge.source}`);
    const tEl = document.getElementById(`node-${edge.target}`);
    if (!sEl || !tEl) return;

    const sRect = sEl.getBoundingClientRect();
    const tRect = tEl.getBoundingClientRect();

    const sCenterX = (sRect.left + sRect.width / 2) - cRect.left;
    const sCenterY = (sRect.top + sRect.height / 2) - cRect.top;
    const tCenterX = (tRect.left + tRect.width / 2) - cRect.left;
    const tCenterY = (tRect.top + tRect.height / 2) - cRect.top;

    let x1, y1, x2, y2;
    if (sCenterY < tCenterY - 20) {
      x1 = sCenterX;
      y1 = sRect.bottom - cRect.top;
      x2 = tCenterX;
      y2 = tRect.top - cRect.top;
    } else if (sCenterY > tCenterY + 20) {
      x1 = sCenterX;
      y1 = sRect.top - cRect.top;
      x2 = tCenterX;
      y2 = tRect.bottom - cRect.top;
    } else {
      x1 = sCenterX > tCenterX ? sRect.left - cRect.left : sRect.right - cRect.left;
      y1 = sCenterY;
      x2 = sCenterX > tCenterX ? tRect.right - cRect.left : tRect.left - cRect.left;
      y2 = tCenterY;
    }

    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx1 = x1 + dx * 0.15;
    const cy1 = y1 + dy * 0.45;
    const cx2 = x2 - dx * 0.15;
    const cy2 = y2 - dy * 0.45;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
    path.setAttribute("class", "arrow-path confirmed");
    path.setAttribute("marker-end", "url(#arrow-head-success)");

    svg.appendChild(path);
  });
}

function updateStats() {
  const placedCount = Object.keys(gameState01.canvasNodes).length;
  const linksCount = gameState01.edges.length;

  const statNodes = document.getElementById("stat-nodes-placed");
  const statLinks = document.getElementById("stat-links-connected");

  if (statNodes) statNodes.textContent = `${placedCount} / ${GAME01_DATA.nodes.length}`;
  if (statLinks) statLinks.textContent = `${linksCount} / ${GAME01_DATA.edges.length}`;

  if (linksCount === GAME01_DATA.edges.length) {
    showToast("success", "🏆 ¡Concept Map DAG completado! 100% de coherencia causal fisiopatológica.");
  }
}

// SISTEMA DE PISTAS ("PEDIR PISTA")
function openHintSystem() {
  const dialog = document.getElementById("hint-dialog");
  const body = document.getElementById("hint-dialog-body");

  // ¿Faltan nodos en canvas?
  const unplaced = GAME01_DATA.nodes.filter(n => !gameState01.canvasNodes[n.id]);
  if (unplaced.length > 0) {
    const nextNode = unplaced[0];
    gameState01.currentHintData = { type: "place_node", node: nextNode };
    body.innerHTML = `
      <strong style="color:#fbbf24; display:block; margin-bottom:4px;">Pista de Colocación:</strong>
      Para continuar la cadena causal, incorpora al canvas el concepto <strong style="color:#fff;">«${nextNode.title}»</strong> (${nextNode.category}).
      <p style="margin-top:6px; color:#94a3b8;">¿Cuál es su lugar en la secuencia de patogenia respecto a los factores etiológicos y los mediadores?</p>
    `;
  } else {
    // Faltan flechas
    const missingEdge = GAME01_DATA.edges.find(e => !gameState01.edges.some(edge => edge.source === e.source && edge.target === e.target));
    if (missingEdge) {
      const sNode = GAME01_DATA.nodes.find(n => n.id === missingEdge.source);
      const tNode = GAME01_DATA.nodes.find(n => n.id === missingEdge.target);
      gameState01.currentHintData = { type: "connect_edge", edge: missingEdge, sNode, tNode };
      body.innerHTML = `
        <strong style="color:#fbbf24; display:block; margin-bottom:4px;">Pista de Relación Causal:</strong>
        Falta una conexión directa entre <strong style="color:#fff;">«${sNode.title}»</strong> y <strong style="color:#fff;">«${tNode.title}»</strong>.
        <p style="margin-top:6px; color:#94a3b8; font-style:italic;">"${missingEdge.rationale}"</p>
      `;
    } else {
      gameState01.currentHintData = null;
      body.innerHTML = `<span style="color:#10b981; font-weight:bold;">¡Felicitaciones! Todos los nodos y flechas del mapa están completos.</span>`;
    }
  }

  dialog.showModal();
}

function executeHintHighlight() {
  const dialog = document.getElementById("hint-dialog");
  dialog.close();

  if (!gameState01.currentHintData) return;

  if (gameState01.currentHintData.type === "place_node") {
    const chip = document.getElementById(`tray-node-${gameState01.currentHintData.node.id}`);
    if (chip) {
      chip.classList.add("hint-chip-gold");
      setTimeout(() => chip.classList.remove("hint-chip-gold"), 3000);
      showToast("info", `💡 Nodo «${gameState01.currentHintData.node.title}» resaltado con pulso dorado en la bandeja.`);
    }
  } else if (gameState01.currentHintData.type === "connect_edge") {
    const el1 = document.getElementById(`node-${gameState01.currentHintData.sNode.id}`);
    const el2 = document.getElementById(`node-${gameState01.currentHintData.tNode.id}`);
    if (el1) el1.classList.add("hint-chip-gold");
    if (el2) el2.classList.add("hint-chip-gold");
    setTimeout(() => {
      if (el1) el1.classList.remove("hint-chip-gold");
      if (el2) el2.classList.remove("hint-chip-gold");
    }, 3000);
    showToast("info", `💡 Resaltados en dorado los dos nodos a conectar.`);
  }
}

function executeHintAutocomplete() {
  const dialog = document.getElementById("hint-dialog");
  dialog.close();

  if (!gameState01.currentHintData) return;

  if (gameState01.currentHintData.type === "place_node") {
    const node = gameState01.currentHintData.node;
    addNodeToCanvas(node.id, node.initX, node.initY);
    showToast("success", `💡 Nodo «${node.title}» colocado automáticamente.`);
  } else if (gameState01.currentHintData.type === "connect_edge") {
    const edge = gameState01.currentHintData.edge;
    gameState01.edges.push({ source: edge.source, target: edge.target });
    drawAllArrows();
    updateStats();
    pulseNodes(edge.source, edge.target);
    showToast("success", `💡 Flecha conectada: ${edge.rationale}`);
  }
}

function pulseNodes(id1, id2) {
  const el1 = document.getElementById(`node-${id1}`);
  const el2 = document.getElementById(`node-${id2}`);
  if (el1) { el1.classList.add("correct-pulse"); setTimeout(() => el1.classList.remove("correct-pulse"), 600); }
  if (el2) { el2.classList.add("correct-pulse"); setTimeout(() => el2.classList.remove("correct-pulse"), 600); }
}

function shakeNodes(id1, id2) {
  const el1 = document.getElementById(`node-${id1}`);
  const el2 = document.getElementById(`node-${id2}`);
  if (el1) { el1.classList.add("error-shake"); setTimeout(() => el1.classList.remove("error-shake"), 500); }
  if (el2) { el2.classList.add("error-shake"); setTimeout(() => el2.classList.remove("error-shake"), 500); }
}

function resetAll() {
  gameState01.canvasNodes = {};
  gameState01.edges = [];
  gameState01.arrowToolActive = false;
  gameState01.arrowSource = null;
  updateArrowToolUI();
  renderNodePool();
  renderCanvasNodes();
  showToast("info", "Lienzo reiniciado. Listo para construir de nuevo.");
}

function showToast(type, message) {
  const toast = document.getElementById("feedback-toast");
  const icon = document.getElementById("toast-icon");
  const msg = document.getElementById("toast-message");
  if (!toast || !msg) return;

  toast.className = `feedback-toast ${type} show`;
  icon.textContent = type === "success" ? "✓" : type === "error" ? "✗" : "ℹ";
  msg.textContent = message;

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

// ========================================================
// JUEGO 02: PATHWAY TARGET SPOTTER (ALGORITMO & FLUJO BIOLÓGICO)
// ========================================================
const GAME02_PATHWAYS = {
  sraa: {
    id: "sraa",
    title: "Sistema Renina-Angiotensina-Aldosterona (SRAA)",
    icon: "🫀",
    subtitle: "Hemodinamia Renal, Tono Vascular & Vía de Péptidos Natriuréticos",
    treeTemplate: `
      <!-- Paso 1: Angiotensinógeno -->
      <div class="g02-algo-node substrate-capsule" id="g02-node-sraa_angiotensinogen">
        <span class="g02-algo-title">Angiotensinógeno</span>
        <span class="g02-algo-sub">α2-globulina hepática continua</span>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <!-- Diana 1: Renina -->
      <div class="g02-algo-node enzyme-target" id="g02-node-sraa_renin" data-node-id="sraa_renin">
        <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Enzima Catalítica Yuxtaglomerular</span>
        <div class="g02-algo-title">Renina Plasmática</div>
        <div class="g02-algo-sub">Paso marcapasos limitante del eje hormonal</div>
        <div class="g02-solved-badge" id="g02-solved-tag-sraa_renin">🔒 <span class="drug-name"></span></div>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <!-- Paso 2: Angiotensina I -->
      <div class="g02-algo-node substrate-capsule" id="g02-node-sraa_ang1">
        <span class="g02-algo-title">Angiotensina I</span>
        <span class="g02-algo-sub">Decapéptido fisiológicamente inactivo</span>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <!-- Diana 2: ECA -->
      <div class="g02-algo-node enzyme-target" id="g02-node-sraa_ace" data-node-id="sraa_ace">
        <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Enzima Convertidora Vascular</span>
        <div class="g02-algo-title">ECA (Enzima Convertidora de Angiotensina)</div>
        <div class="g02-algo-sub">Ectoenzima endotelial pulmonar y renal</div>
        <div class="g02-solved-badge" id="g02-solved-tag-sraa_ace">🔒 <span class="drug-name"></span></div>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <!-- Paso 3: Angiotensina II -->
      <div class="g02-algo-node substrate-capsule" id="g02-node-sraa_ang2" style="border-color:#38bdf8;">
        <span class="g02-algo-title">Angiotensina II</span>
        <span class="g02-algo-sub">Octapéptido vasoconstrictor central</span>
      </div>

      <!-- Bifurcación del Algoritmo -->
      <div class="g02-branch-row">
        <!-- Rama A: Receptor AT1 -->
        <div class="g02-branch-column">
          <span class="g02-branch-label">Rama A · Tono Arteriolar</span>
          <div class="g02-algo-node receptor-target" id="g02-node-sraa_at1" data-node-id="sraa_at1">
            <span class="g02-algo-type-tag g02-tag-receptor">🛡️ Receptor de Membrana GPCR (Gq)</span>
            <div class="g02-algo-title">Receptor AT1</div>
            <div class="g02-algo-sub">Vascular sistémico y arteriola eferente renal</div>
            <div class="g02-solved-badge" id="g02-solved-tag-sraa_at1">🔒 <span class="drug-name"></span></div>
          </div>
          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>
          <div class="g02-algo-node effector-capsule">
            <div class="g02-algo-title">💥 Vasoconstricción Eferente</div>
            <div class="g02-algo-sub">Hiperfiltración glomerular y resistencia periférica ↑</div>
          </div>
        </div>

        <!-- Rama B: Aldosterona y Receptor Mineralocorticoide -->
        <div class="g02-branch-column">
          <span class="g02-branch-label">Rama B · Regulación Hidrosalina</span>
          <div class="g02-algo-node substrate-capsule" style="min-width:180px; padding:6px 14px;">
            <span class="g02-algo-title" style="font-size:12px;">Aldosterona (Corteza)</span>
          </div>
          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>
          <div class="g02-algo-node receptor-target" id="g02-node-sraa_mr" data-node-id="sraa_mr">
            <span class="g02-algo-type-tag g02-tag-receptor">🛡️ Receptor Nuclear Tubular</span>
            <div class="g02-algo-title">Receptor Mineralocorticoide (MR)</div>
            <div class="g02-algo-sub">Células principales del túbulo colector</div>
            <div class="g02-solved-badge" id="g02-solved-tag-sraa_mr">🔒 <span class="drug-name"></span></div>
          </div>
          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>
          <div class="g02-algo-node effector-capsule">
            <div class="g02-algo-title">💥 Expresión de ENaC</div>
            <div class="g02-algo-sub">Retención de Na⁺/H₂O y excreción neta de K⁺/H⁺</div>
          </div>
        </div>
      </div>

      <!-- Rama Paralela: Neprilisina -->
      <div style="width:100%; border-top:1px dashed #334155; margin-top:20px; padding-top:14px; display:flex; flex-direction:column; align-items:center;">
        <span class="g02-branch-label" style="background:#0c4a6e; color:#7dd3fc; border-color:#0284c7;">Vía Contrarreguladora · Péptidos Natriuréticos</span>
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:8px;">
          <div class="g02-algo-node substrate-capsule" style="min-width:160px;">
            <span class="g02-algo-title" style="font-size:12px;">ANP / BNP Vasodilatador</span>
          </div>
          <span style="color:#38bdf8; font-size:16px;">──►</span>
          <div class="g02-algo-node enzyme-target" id="g02-node-sraa_neprilysin" data-node-id="sraa_neprilysin">
            <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Metaloproteasa de Membrana</span>
            <div class="g02-algo-title">Neprilisina (NEP 24.11)</div>
            <div class="g02-algo-sub">Degrada péptidos natriuréticos y bradicinina</div>
            <div class="g02-solved-badge" id="g02-solved-tag-sraa_neprilysin">🔒 <span class="drug-name"></span></div>
          </div>
          <span style="color:#38bdf8; font-size:16px;">──►</span>
          <div class="g02-algo-node effector-capsule" style="min-width:160px;">
            <div class="g02-algo-title" style="font-size:11px;">Inactivación de ANP/BNP</div>
          </div>
        </div>
      </div>
    `,
    challenges: [
      {
        key: "enalapril",
        drugName: "Enalapril (IECA)",
        drugClass: "Inhibidor Enzimático · Antihipertensivo / Nefroprotector",
        targetNodeId: "sraa_ace",
        prompt: "Paciente de 54 años, hipertenso y con diabetes tipo 2 con microalbuminuria incipiente. Se indica este fármaco para vasodilatar la arteriola eferente renal y disminuir la presión intraglomerular, suprimiendo la síntesis de un potente vasoconstrictor sistémico.",
        mechanism: "Inhibición competitiva y reversible de la Enzima Convertidora de Angiotensina (ECA-1). Bloquea la conversión de Angiotensina I a Angiotensina II e impide la degradación fisiológica de bradicinina.",
        impact: "Vasodilatación preferente de la arteriola eferente renal > aferente, reducción de la hiperfiltración intraglomerular, caída de aldosterona sérica y aumento de bradicinina y sustancia P.",
        pearl: "📌 Perla USMLE / Examen: La tos seca nocturna (hasta en 20%) y el angioedema son mediados por acumulación de bradicinina. Contraindicado de manera absoluta en estenosis bilateral de la arteria renal.",
        differential: {
          sraa_at1: "❌ Has tocado el Receptor AT1. Aquí actúa Losartán (un ARA-II). Enalapril actúa aguas arriba, inhibiendo la enzima convertidora (ECA) que cataliza la síntesis de Angiotensina II.",
          sraa_renin: "❌ Has tocado la Renina. Aquí actúa el inhibidor directo Aliskiren.",
          sraa_mr: "❌ Has tocado el Receptor Mineralocorticoide. Aquí actúa la Espironolactona.",
          sraa_neprilysin: "❌ Has tocado Neprilisina. Aquí actúa Sacubitril."
        }
      },
      {
        key: "losartan",
        drugName: "Losartán (ARA-II)",
        drugClass: "Antagonista de Receptor GPCR · Antihipertensivo",
        targetNodeId: "sraa_at1",
        prompt: "Paciente hipertenso que experimentó tos seca nocturna intolerable con IECAs. Requiere un agente que antagonice selectivamente los efectos vasoconstrictores y estimuladores de aldosterona de la Angiotensina II sin elevar bradicininas.",
        mechanism: "Antagonista no peptídico altamente selectivo y competitivo del receptor AT1 acoplado a proteína Gq. No tiene efecto inhibitorio sobre la enzima ECA ni altera el catabolismo de bradicininas.",
        impact: "Bloqueo directo de la vasoconstricción mediada por IP3 y Ca²⁺ libre en la musculatura lisa vascular. Suprime la secreción de aldosterona sin inducir broncoespasmo ni tos.",
        pearl: "📌 Perla USMLE / Examen: Los ARA-II no causan tos por bradicinina. Losartán posee la propiedad uricosúrica intrínseca adicional (inhibe URAT1 renal), siendo ideal en pacientes hipertensos con hiperuricemia o gota.",
        differential: {
          sraa_ace: "❌ Has tocado la ECA. Enalapril actúa allí. Losartán actúa directamente en el receptor de membrana AT1 para evitar la acumulación de bradicinina.",
          sraa_mr: "❌ Has tocado el Receptor Mineralocorticoide. Espironolactona actúa allí.",
          sraa_renin: "❌ Has tocado Renina. Aliskiren actúa allí."
        }
      },
      {
        key: "spironolactone",
        drugName: "Espironolactona (ARM)",
        drugClass: "Antagonista del Receptor Mineralocorticoide · Ahorrador de K⁺",
        targetNodeId: "sraa_mr",
        prompt: "Paciente con insuficiencia cardíaca con fracción de eyección reducida (IC-FER, FEVI 30%) y edema pretibial. Se añade a la terapia para frenar la fibrosis miocárdica y evitar la hipopotasemia inducida por furosemida.",
        mechanism: "Inhibidor competitivo del receptor citosólico/nuclear de mineralocorticoides (MR) en las células principales del túbulo contorneado distal tardío y túbulo colector.",
        impact: "Impide la translocación nuclear del complejo receptor-aldosterona, reduciendo la síntesis de canales epiteliales de sodio (ENaC) y bombas Na⁺/K⁺ ATPasa basolaterales. Natriuresis con retención neta de K⁺ e H⁺.",
        pearl: "📌 Perla USMLE / Examen: El ensayo RALES demostró reducción marcada de mortalidad en IC-FER. Provoca ginecomastia dosis-dependiente por antagonismo del receptor de andrógenos (eplerenona es la alternativa selectiva sin efecto antiandrogénico).",
        differential: {
          sraa_at1: "❌ Has tocado el Receptor AT1. Losartán actúa allí. La espironolactona actúa en el receptor de aldosterona en el túbulo colector.",
          sraa_ace: "❌ Has tocado la ECA. Enalapril actúa allí.",
          sraa_neprilysin: "❌ Has tocado Neprilisina. Sacubitril actúa allí."
        }
      },
      {
        key: "sacubitril",
        drugName: "Sacubitril (Inhibidor de Neprilisina)",
        drugClass: "Inhibidor de Metaloproteasa Neutra (ARNI)",
        targetNodeId: "sraa_neprilysin",
        prompt: "Componente farmacológico del innovador complejo ARNI (combinado con Valsartán). Su objetivo es prevenir la hidrólisis y degradación biológica de los péptidos natriuréticos endógenos (ANP y BNP).",
        mechanism: "Prodroga que se metaboliza a sacubitrilat, un inhibidor potente de la endopeptidasa neutra (neprilisina / NEP 24.11), la enzima responsable del clivaje de péptidos natriuréticos vasoactivos.",
        impact: "Aumenta la concentración tisular de ANP y BNP → activación de receptor NPR-A → incremento de GMP cíclico (GMPc) → vasodilatación sistémica, natriuresis, diuresis y bloqueo del remodelado adverso miocárdico.",
        pearl: "📌 Perla USMLE / Examen: Como la neprilisina también degrada bradicinina, NUNCA debe combinarse con un IECA; debe respetarse una ventana de lavado estricta de 36 horas entre el IECA y el ARNI para prevenir angioedema fatal.",
        differential: {
          sraa_ace: "❌ Has tocado la ECA. Sacubitril inhibe la neprilisina para preservar ANP y BNP. Coadministrarlos juntos está estrictamente prohibido.",
          sraa_at1: "❌ Has tocado el Receptor AT1. Valsartán bloquea AT1; el Sacubitril actúa en la enzima neprilisina."
        }
      },
      {
        key: "aliskiren",
        drugName: "Aliskiren (Inhibidor Directo de Renina)",
        drugClass: "Inhibidor Enzimático Yuxtaglomerular (IDR)",
        targetNodeId: "sraa_renin",
        prompt: "Fármaco desarrollado para inhibir de forma competitiva el primer paso enzimático limitante y marcapasos de toda la cascada del SRAA, bloqueando la escisión del angiotensinógeno.",
        mechanism: "Inhibición directa de alta especificidad del sitio catalítico de la renina plasmática (aspartil proteasa producida en el aparato yuxtaglomerular).",
        impact: "Disminución profunda de la actividad de renina plasmática (ARP) y colapso tanto de Angiotensina I como de Angiotensina II desde el origen mismo del eje hormonal.",
        pearl: "📌 Perla USMLE / Examen: El estudio ALTITUDE demostró que la combinación de Aliskiren con IECAs o ARA-II en pacientes diabéticos aumenta significativamente eventos adversos (hiperpotasemia, síncope e insuficiencia renal) sin beneficio clínico.",
        differential: {
          sraa_ace: "❌ Has tocado la ECA. Aliskiren actúa más arriba, directamente sobre la renina yuxtaglomerular.",
          sraa_at1: "❌ Has tocado el Receptor AT1. Losartán actúa allí."
        }
      }
    ]
  },

  arachidonic: {
    id: "arachidonic",
    title: "Cascada del Ácido Araquidónico & Eicosanoides",
    icon: "🫁",
    subtitle: "Inflamación, Broncoconstricción, Agregación Plaquetaria y Protección Gástrica",
    treeTemplate: `
      <!-- Paso 1: Fosfolípidos -->
      <div class="g02-algo-node substrate-capsule" id="g02-node-aa_phospholipids">
        <span class="g02-algo-title">Fosfolípidos de Membrana</span>
        <span class="g02-algo-sub">Fosfatidilcolina y fosfatidiletanolamina de la bicapa</span>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <!-- Diana 1: Fosfolipasa A2 -->
      <div class="g02-algo-node enzyme-target" id="g02-node-aa_pla2" data-node-id="aa_pla2">
        <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Enzima de Membrana</span>
        <div class="g02-algo-title">Fosfolipasa A2 (PLA2)</div>
        <div class="g02-algo-sub">Escinde el enlace éster sn-2 liberando ácidos grasos</div>
        <div class="g02-solved-badge" id="g02-solved-tag-aa_pla2">🔒 <span class="drug-name"></span></div>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <!-- Paso 2: Ácido Araquidónico -->
      <div class="g02-algo-node substrate-capsule" id="g02-node-aa_acid" style="border-color:#38bdf8;">
        <span class="g02-algo-title">Ácido Araquidónico Libre</span>
        <span class="g02-algo-sub">Ácido graso poliinsaturado omega-6 de 20 carbonos</span>
      </div>

      <!-- Bifurcación Eicosanoides -->
      <div class="g02-branch-row">
        <!-- Rama Izquierda: Vía Ciclooxigenasa -->
        <div class="g02-branch-column">
          <span class="g02-branch-label" style="background:#1e3a8a; color:#93c5fd; border-color:#3b82f6;">Rama 1 · Vía Ciclooxigenasa (COX)</span>
          
          <!-- Diana 2: COX-1 / COX-2 -->
          <div class="g02-algo-node enzyme-target" id="g02-node-aa_cox1_2" data-node-id="aa_cox1_2" style="margin-top:6px;">
            <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Enzima Constitutiva / Plaquetas</span>
            <div class="g02-algo-title">COX-1 & COX-2</div>
            <div class="g02-algo-sub">Prostaglandina H sintasa; sintetiza TXA2 y PGE2 gástrica</div>
            <div class="g02-solved-badge" id="g02-solved-tag-aa_cox1_2">🔒 <span class="drug-name"></span></div>
          </div>

          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

          <!-- Diana 3: COX-2 Inducible -->
          <div class="g02-algo-node enzyme-target" id="g02-node-aa_cox2" data-node-id="aa_cox2">
            <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Enzima Inducible / Endotelio</span>
            <div class="g02-algo-title">COX-2 Inducible (Bolsillo Voluminoso)</div>
            <div class="g02-algo-sub">Inducida por citoquinas inflamatorias; produce PGI2</div>
            <div class="g02-solved-badge" id="g02-solved-tag-aa_cox2">🔒 <span class="drug-name"></span></div>
          </div>

          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

          <div class="g02-algo-node effector-capsule">
            <div class="g02-algo-title">💥 PGE2, PGI2, TXA2</div>
            <div class="g02-algo-sub">Inflamación, agregación plaquetaria y dolor</div>
          </div>
        </div>

        <!-- Rama Derecha: Vía Lipoxigenasa -->
        <div class="g02-branch-column">
          <span class="g02-branch-label" style="background:#581c87; color:#e9d5ff; border-color:#a855f7;">Rama 2 · Vía 5-Lipoxigenasa (5-LOX)</span>

          <!-- Diana 4: 5-Lipoxigenasa -->
          <div class="g02-algo-node enzyme-target" id="g02-node-aa_5lox" data-node-id="aa_5lox" style="margin-top:6px;">
            <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Enzima Citosólica (Hierro no hemo)</span>
            <div class="g02-algo-title">5-Lipoxigenasa (5-LOX)</div>
            <div class="g02-algo-sub">Oxigena ácido araquidónico hacia 5-HPETE y leucotrienos</div>
            <div class="g02-solved-badge" id="g02-solved-tag-aa_5lox">🔒 <span class="drug-name"></span></div>
          </div>

          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

          <div class="g02-algo-node substrate-capsule" style="min-width:180px; padding:6px 14px;">
            <span class="g02-algo-title" style="font-size:12px;">Cisteinil Leucotrienos (LTC4, LTD4)</span>
          </div>

          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

          <!-- Diana 5: Receptor CysLT1 -->
          <div class="g02-algo-node receptor-target" id="g02-node-aa_cyslt1" data-node-id="aa_cyslt1">
            <span class="g02-algo-type-tag g02-tag-receptor">🛡️ Receptor de Músculo Liso Bronquial</span>
            <div class="g02-algo-title">Receptor CysLT1</div>
            <div class="g02-algo-sub">GPCR acoplado a Gq; broncoconstricción masiva y moco</div>
            <div class="g02-solved-badge" id="g02-solved-tag-aa_cyslt1">🔒 <span class="drug-name"></span></div>
          </div>

          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

          <div class="g02-algo-node effector-capsule">
            <div class="g02-algo-title">💥 Broncoespasmo Asmático</div>
            <div class="g02-algo-sub">Hiperreactividad bronquial y edema tisular</div>
          </div>
        </div>
      </div>
    `,
    challenges: [
      {
        key: "corticoids",
        drugName: "Prednisona / Dexametasona (Glucocorticoides)",
        drugClass: "Esteroide Antiinflamatorio Sistémico",
        targetNodeId: "aa_pla2",
        prompt: "Crisis de asma grave con inflamación bronquial difusa. Fármaco que induce la transcripción de anexina A1 (lipocortina-1) para bloquear la liberación inicial del ácido graso desde la membrana biológica.",
        mechanism: "Unión al receptor glucocorticoide intracelular (GR), transactivación génica de Anexina A1, la cual inhibe directamente la actividad catalítica de la Fosfolipasa A2 (PLA2).",
        impact: "Apagado simultáneo de ambas ramas metabólicas: suprime la génesis tanto de prostaglandinas y tromboxanos (vía COX) como de leucotrienos (vía 5-LOX).",
        pearl: "📌 Perla USMLE / Examen: A diferencia de los AINEs (que solo bloquean COX y desvían el flujo a leucotrienos), los corticoides impiden la formación del precursor basal, siendo el pilar antiinflamatorio del asma.",
        differential: {
          aa_cox1_2: "❌ Has tocado la COX-1/COX-2. Los AINEs actúan allí. Los corticoides actúan más arriba, inhibiendo la Fosfolipasa A2.",
          aa_5lox: "❌ Has tocado la 5-Lipoxigenasa. Zileutón actúa allí.",
          aa_cyslt1: "❌ Has tocado el Receptor CysLT1. Montelukast bloquea este receptor."
        }
      },
      {
        key: "aspirin",
        drugName: "Aspirina (Ácido Acetilsalicílico)",
        drugClass: "Antiagregante Plaquetario Irreversible / AINE",
        targetNodeId: "aa_cox1_2",
        prompt: "Prevención secundaria tras infarto de miocardio. Fármaco que acetila de manera covalente e irreversible el residuo de serina en el canal catalítico de la enzima en las plaquetas anucleadas.",
        mechanism: "Acetilación irreversible covalente de Ser-529 en COX-1 (y Ser-516 en COX-2), bloqueando el acceso del ácido araquidónico al sitio catalítico por toda la vida útil de la plaqueta.",
        impact: "Abolición de la síntesis de Tromboxano A2 (TXA2) plaquetario durante 7 a 10 días, inhibiendo la activación y agregación plaquetaria.",
        pearl: "📌 Perla USMLE / Examen: Debido a que las plaquetas carecen de núcleo, no pueden sintetizar nueva enzima COX-1; la función plaquetaria solo se restablece con la entrada de nuevas plaquetas desde la médula ósea.",
        differential: {
          aa_cox2: "❌ Has tocado la COX-2 selectiva. Celecoxib actúa allí de forma reversible. La aspirina acetila irreversiblemente tanto COX-1 como COX-2.",
          aa_pla2: "❌ Has tocado Fosfolipasa A2. Corticoides actúan allí.",
          aa_cyslt1: "❌ Has tocado Receptor CysLT1. Montelukast actúa allí."
        }
      },
      {
        key: "celecoxib",
        drugName: "Celecoxib (Coxib)",
        drugClass: "AINE Selectivo de COX-2",
        targetNodeId: "aa_cox2",
        prompt: "Paciente de 70 años con artrosis dolorosa y antecedente de úlcera gástrica por ibuprofeno. Requiere un antiinflamatorio que preserve las prostaglandinas citoprotectoras gástricas dependientes de COX-1.",
        mechanism: "Inhibidor reversible y altamente selectivo de la COX-2 inducible. Su grupo sulfamida voluminoso encaja de manera óptima en el bolsillo lateral hidrofóbico exclusivo de la COX-2.",
        impact: "Efecto analgésico y antiinflamatorio con menor incidencia de erosiones y sangrado gastrointestinal en comparación con los AINEs no selectivos.",
        pearl: "📌 Perla USMLE / Examen: Al inhibir la prostaciclina endotelial (PGI2, vasodilatadora y antiagregante) sin suprimir el tromboxano plaquetario (TXA2, mediado por COX-1), los coxibs aumentan el riesgo de eventos trombóticos cardiovasculares.",
        differential: {
          aa_cox1_2: "❌ Has tocado COX-1/COX-2 tradicional. Los AINEs clásicos bloquean ambas enzimas. Celecoxib tiene preferencia por el bolsillo voluminoso de COX-2.",
          aa_5lox: "❌ Has tocado 5-LOX. Zileutón actúa allí."
        }
      },
      {
        key: "montelukast",
        drugName: "Montelukast",
        drugClass: "Antagonista del Receptor de Cisteinil Leucotrienos (LTRA)",
        targetNodeId: "aa_cyslt1",
        prompt: "Paciente con asma inducida por ejercicio y rinitis alérgica. Fármaco oral que antagoniza los potentes efectos broncoconstrictores de los leucotrienos LTC4 y LTD4 en las vías respiratorias.",
        mechanism: "Antagonista competitivo selectivo de alta afinidad del receptor CysLT1 acoplado a proteína Gq en el músculo liso bronquial.",
        impact: "Prevención del espasmo bronquial, inhibición de la hipersecreción mucosa y disminución de la permeabilidad vascular microvascular en las vías aéreas.",
        pearl: "📌 Perla USMLE / Examen: Especialmente útil en la tríada de Samter (enfermedad respiratoria exacerbada por aspirina / AERD). Posee advertencia (Black Box) de la FDA por eventos neuropsiquiátricos (pesadillas, agitación, ideación suicida).",
        differential: {
          aa_5lox: "❌ Has tocado la 5-Lipoxigenasa. Zileutón inhibe esa enzima. Montelukast no inhibe enzimas: bloquea el receptor CysLT1 en la membrana del músculo liso.",
          aa_pla2: "❌ Has tocado Fosfolipasa A2. Corticoides actúan allí."
        }
      },
      {
        key: "zileuton",
        drugName: "Zileutón",
        drugClass: "Inhibidor de la 5-Lipoxigenasa (5-LOX)",
        targetNodeId: "aa_5lox",
        prompt: "Fármaco antiasmático que actúa inhibiendo directamente la enzima citosólica responsable de añadir oxígeno molecular al ácido araquidónico para formar leucotrienos.",
        mechanism: "Inhibidor competitivo y reversible de la enzima 5-Lipoxigenasa mediante quelación del átomo de hierro no hemo presente en el sitio activo.",
        impact: "Bloquea totalmente la formación de LTA4, interrumpiendo tanto la síntesis de LTB4 (quimiotáctico de neutrófilos) como de cisteinil leucotrienos (LTC4, LTD4, LTE4).",
        pearl: "📌 Perla USMLE / Examen: A diferencia de Montelukast (que solo bloquea el receptor CysLT1), Zileutón suprime también al LTB4. Requiere monitorización periódica de transaminasas hepáticas por riesgo de hepatotoxicidad.",
        differential: {
          aa_cyslt1: "❌ Has tocado el Receptor CysLT1. Montelukast actúa en el receptor; Zileutón actúa en la enzima 5-LOX impidiendo la síntesis de todos los leucotrienos.",
          aa_cox1_2: "❌ Has tocado COX. Aspirina actúa allí."
        }
      }
    ]
  },

  gastric: {
    id: "gastric",
    title: "Célula Parietal Gástrica & Secreción Ácida",
    icon: "🧪",
    subtitle: "Vías Paracrinas, Vagal, Prostaglandinas y Bomba H+/K+ ATPasa",
    treeTemplate: `
      <!-- Membrana Basolateral -->
      <div style="width:100%; border:1px solid #1e3a8a; background:rgba(30, 58, 138, 0.15); border-radius:12px; padding:12px 16px; margin-bottom:12px;">
        <span style="font-size:10px; font-weight:800; text-transform:uppercase; color:#93c5fd; letter-spacing:0.5px; display:block; margin-bottom:10px; text-align:center;">
          MEMBRANA BASOLATERAL (RECEPTORES ESTIMULADORES E INHIBIDORES)
        </span>
        <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
          <!-- Diana 1: Receptor H2 -->
          <div class="g02-algo-node receptor-target" id="g02-node-gas_h2" data-node-id="gas_h2" style="flex:1; min-width:210px;">
            <span class="g02-algo-type-tag g02-tag-receptor">🛡️ GPCR (Gs) · Histamina</span>
            <div class="g02-algo-title">Receptor H2</div>
            <div class="g02-algo-sub">Activa Adenilato Ciclasa → ↑ AMPc</div>
            <div class="g02-solved-badge" id="g02-solved-tag-gas_h2">🔒 <span class="drug-name"></span></div>
          </div>

          <!-- Diana 2: Receptor M3 -->
          <div class="g02-algo-node receptor-target" id="g02-node-gas_m3" data-node-id="gas_m3" style="flex:1; min-width:210px;">
            <span class="g02-algo-type-tag g02-tag-receptor">🛡️ GPCR (Gq) · Vago (ACh)</span>
            <div class="g02-algo-title">Receptor M3 Muscarínico</div>
            <div class="g02-algo-sub">Vía Vagal / Acetilcolina → ↑ Ca²⁺ libre</div>
            <div class="g02-solved-badge" id="g02-solved-tag-gas_m3">🔒 <span class="drug-name"></span></div>
          </div>

          <!-- Diana 3: Receptor EP3 -->
          <div class="g02-algo-node receptor-target" id="g02-node-gas_ep3" data-node-id="gas_ep3" style="flex:1; min-width:210px;">
            <span class="g02-algo-type-tag g02-tag-receptor">🛡️ GPCR (Gi) · Prostaglandina</span>
            <div class="g02-algo-title">Receptor EP3 (PGE2)</div>
            <div class="g02-algo-sub">Inhibe Adenilato Ciclasa → ↓ AMPc</div>
            <div class="g02-solved-badge" id="g02-solved-tag-gas_ep3">🔒 <span class="drug-name"></span></div>
          </div>
        </div>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <!-- Convergencia Intracelular -->
      <div class="g02-algo-node substrate-capsule" style="background:#0b1329; border-color:#0284c7;">
        <span class="g02-algo-title">Convergencia de Segundos Mensajeros (AMPc & Ca²⁺)</span>
        <span class="g02-algo-sub">Fosforilación de proteínas citoesqueléticas y translocación tubular</span>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <!-- Membrana Apical & Bomba -->
      <div style="width:100%; border:1px solid #7c2d12; background:rgba(124, 45, 18, 0.15); border-radius:12px; padding:12px 16px; margin-top:4px;">
        <span style="font-size:10px; font-weight:800; text-transform:uppercase; color:#fdba74; letter-spacing:0.5px; display:block; margin-bottom:10px; text-align:center;">
          MEMBRANA APICAL (CANALÍCULO SECRETOR & VÍA FINAL COMÚN)
        </span>
        <div style="display:flex; justify-content:center;">
          <!-- Diana 4: Bomba H+/K+ ATPasa -->
          <div class="g02-algo-node transporter-target" id="g02-node-gas_pump" data-node-id="gas_pump" style="min-width:280px; max-width:440px;">
            <span class="g02-algo-type-tag g02-tag-transporter">⚡ Bomba Transportadora Activa Primaria</span>
            <div class="g02-algo-title">Bomba H⁺/K⁺ ATPasa</div>
            <div class="g02-algo-sub">Expulsa protones H⁺ al canalículo e intercambia K⁺</div>
            <div class="g02-solved-badge" id="g02-solved-tag-gas_pump">🔒 <span class="drug-name"></span></div>
          </div>
        </div>
      </div>

      <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>

      <div class="g02-algo-node effector-capsule" style="border-color:#38bdf8;">
        <div class="g02-algo-title" style="color:#38bdf8;">💥 Secreción de Ácido Clorhídrico (HCl)</div>
        <div class="g02-algo-sub">Acidificación luminal gástrica (pH 1.0-2.0)</div>
      </div>
    `,
    challenges: [
      {
        key: "omeprazole",
        drugName: "Omeprazol / Esomeprazol (IBP)",
        drugClass: "Inhibidor de la Bomba de Protones",
        targetNodeId: "gas_pump",
        prompt: "Tratamiento de primera línea para esofagitis erosiva y erradicación de H. pylori. Pródroga lipofílica que requiere activación en el medio ácido del canalículo secretor de la célula parietal.",
        mechanism: "Atrapamiento iónico en el canalículo secretor ácido (pH < 2), donde se transforma en sulfenamida reactiva y forma enlaces disulfuro covalentes e irreversibles con las cisteínas de la H⁺/K⁺ ATPasa.",
        impact: "Inhibición de la vía final común de secreción ácida, bloqueando tanto la secreción basal como la estimulada por cualquier agonista (histamina, gastrina o vago) en más de un 90%.",
        pearl: "📌 Perla USMLE / Examen: Tomar 30-60 minutos antes de la primera comida. El uso prolongado causa hipergastrinemia reactiva, riesgo de colitis por Clostridioides difficile, hipomagnesemia y malabsorción de vitamina B12 y calcio.",
        differential: {
          gas_h2: "❌ Has tocado el Receptor H2. Famotidina actúa allí. El Omeprazol actúa en el transportador final activo (Bomba H⁺/K⁺ ATPasa).",
          gas_ep3: "❌ Has tocado el Receptor EP3. Misoprostol actúa allí.",
          gas_m3: "❌ Has tocado el Receptor M3 muscarínico."
        }
      },
      {
        key: "famotidine",
        drugName: "Famotidina (Antagonista H2)",
        drugClass: "Antagonista Competitivo de Receptores H2",
        targetNodeId: "gas_h2",
        prompt: "Fármaco indicado para alivio sintomático de dispepsia y control de la acidez gástrica nocturna. Bloquea selectivamente el receptor acoplado a proteína Gs en la membrana basolateral de la célula parietal.",
        mechanism: "Antagonista competitivo reversible del receptor H2, bloqueando la activación de adenilil ciclasa y disminuyendo los niveles intracelulares de AMPc y la subsiguiente activación de la PKA.",
        impact: "Reducción marcada de la secreción de ácido clorhídrico, con especial potencia en la supresión de la secreción ácida basal nocturna.",
        pearl: "📌 Perla USMLE / Examen: El uso continuo genera taquifilaxia (tolerancia farmacológica) en cuestión de pocos días debido a la regulación al alza y desensibilización del receptor; la cimetidina (de la misma familia) causa ginecomastia e inhibe múltiples citocromos P450.",
        differential: {
          gas_pump: "❌ Has tocado la Bomba de Protones. Omeprazol actúa allí de forma irreversible. La Famotidina actúa en el receptor basolateral H2.",
          gas_ep3: "❌ Has tocado el Receptor EP3 de Prostaglandinas."
        }
      },
      {
        key: "misoprostol",
        drugName: "Misoprostol",
        drugClass: "Agonista del Receptor EP3 de PGE1",
        targetNodeId: "gas_ep3",
        prompt: "Fármaco gastroprotector administrado en pacientes que requieren dosis altas obligatorias de AINEs para prevenir úlceras gástricas. Estimula la producción de moco y bicarbonato.",
        mechanism: "Análogo sintético de prostaglandina E1 (PGE1) que actúa como agonista del receptor EP3 acoplado a Gi en la célula parietal y células epiteliales mucosas.",
        impact: "Inhibe la adenilil ciclasa disminuyendo el AMPc celular (reduciendo la secreción ácida) y estimula la secreción de moco citoprotector y bicarbonato (HCO3⁻) por el epitelio gástrico.",
        pearl: "📌 Perla USMLE / Examen: Contraindicado de forma absoluta en mujeres en edad fértil sin anticoncepción estricta o durante el embarazo, ya que estimula contracciones uterinas enérgicas y aborto.",
        differential: {
          gas_pump: "❌ Has tocado la Bomba de Protones. Misoprostol estimula el receptor EP3 de prostaglandinas acoplado a Gi.",
          gas_h2: "❌ Has tocado el Receptor H2. Famotidina bloquea H2."
        }
      },
      {
        key: "pirenzepine",
        drugName: "Pirenzepina / Atropina",
        drugClass: "Antagonista Muscarínico M1/M3",
        targetNodeId: "gas_m3",
        prompt: "Fármaco colinérgico que bloquea la vía neural vagal dependiente de acetilcolina responsable de la fase cefálica de la secreción de ácido gástrico.",
        mechanism: "Antagonista competitivo de los receptores muscarínicos M3 en la célula parietal (y M1 en plexos intramurales), impidiendo el flujo de calcio citosólico mediado por IP3.",
        impact: "Disminución de la estimulación secretora ácida desencadenada por el nervio vago y la distensión gástrica.",
        pearl: "📌 Perla USMLE / Examen: Prácticamente en desuso clínico debido a sus efectos adversos anticolinérgicos típicos (boca seca, visión borrosa, retención urinaria, taquicardia) y la notable superioridad de los IBPs.",
        differential: {
          gas_pump: "❌ Has tocado la Bomba H⁺/K⁺ ATPasa. Pirenzepina bloquea el receptor muscarínico M3.",
          gas_h2: "❌ Has tocado el Receptor H2."
        }
      }
    ]
  },

  incretins: {
    id: "incretins",
    title: "Eje Incretinas & Homeostasis Glucémica en DM2",
    icon: "🩸",
    subtitle: "Secreción de Insulina, Filtrado Glucídico Renal y Gluconeogénesis Hepática",
    treeTemplate: `
      <!-- Eje Incretinas Pancreáticas -->
      <div style="width:100%; border:1px solid #065f46; background:rgba(6, 95, 70, 0.15); border-radius:12px; padding:12px 16px; margin-bottom:12px;">
        <span style="font-size:10px; font-weight:800; text-transform:uppercase; color:#6ee7b7; letter-spacing:0.5px; display:block; margin-bottom:10px; text-align:center;">
          EJE INCRETINAS PANCREÁTICAS (GLP-1 & CONTROL GLUCOSA-DEPENDIENTE)
        </span>
        <div style="display:flex; justify-content:center; align-items:center; gap:16px; flex-wrap:wrap;">
          <!-- Diana 1: DPP-4 -->
          <div class="g02-algo-node enzyme-target" id="g02-node-inc_dpp4" data-node-id="inc_dpp4" style="flex:1; min-width:210px;">
            <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Serina Proteasa Degradadora</span>
            <div class="g02-algo-title">Enzima DPP-4</div>
            <div class="g02-algo-sub">Degrada GLP-1 y GIP activos circulantes</div>
            <div class="g02-solved-badge" id="g02-solved-tag-inc_dpp4">🔒 <span class="drug-name"></span></div>
          </div>

          <span style="color:#10b981; font-size:20px;">⚡</span>

          <!-- Diana 2: Receptor GLP-1 -->
          <div class="g02-algo-node receptor-target" id="g02-node-inc_glp1r" data-node-id="inc_glp1r" style="flex:1; min-width:210px;">
            <span class="g02-algo-type-tag g02-tag-receptor">🛡️ GPCR en Células β Pancreáticas</span>
            <div class="g02-algo-title">Receptor GLP-1</div>
            <div class="g02-algo-sub">Estimula insulina y saciedad hipotalámica</div>
            <div class="g02-solved-badge" id="g02-solved-tag-inc_glp1r">🔒 <span class="drug-name"></span></div>
          </div>
        </div>
      </div>

      <!-- Ejes Renales y Hepáticos -->
      <div class="g02-branch-row">
        <!-- Columna Renal: SGLT2 -->
        <div class="g02-branch-column">
          <span class="g02-branch-label" style="background:#7c2d12; color:#fed7aa; border-color:#ea580c;">Riñón · Nefrón Proximal</span>
          <div class="g02-algo-node transporter-target" id="g02-node-inc_sglt2" data-node-id="inc_sglt2" style="width:100%;">
            <span class="g02-algo-type-tag g02-tag-transporter">⚡ Cotransportador Na⁺-Glucosa</span>
            <div class="g02-algo-title">Cotransportador SGLT2</div>
            <div class="g02-algo-sub">Reabsorbe el 90% de la glucosa filtrada en túbulo proximal</div>
            <div class="g02-solved-badge" id="g02-solved-tag-inc_sglt2">🔒 <span class="drug-name"></span></div>
          </div>
          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>
          <div class="g02-algo-node effector-capsule">
            <div class="g02-algo-title">💥 Glucosuria & Natriuresis</div>
            <div class="g02-algo-sub">Descompresión glomerular y reducción de precarga</div>
          </div>
        </div>

        <!-- Columna Hepática: AMPK -->
        <div class="g02-branch-column">
          <span class="g02-branch-label" style="background:#1e3a8a; color:#bfdbfe; border-color:#3b82f6;">Hígado · Metabolismo Energético</span>
          <div class="g02-algo-node enzyme-target" id="g02-node-inc_ampk" data-node-id="inc_ampk" style="width:100%;">
            <span class="g02-algo-type-tag g02-tag-enzyme">⚙️ Quinasa Sensor de Energía</span>
            <div class="g02-algo-title">AMPK Hepática / Complejo I</div>
            <div class="g02-algo-sub">Inhibe transcripción de genes gluconeogénicos (PEPCK)</div>
            <div class="g02-solved-badge" id="g02-solved-tag-inc_ampk">🔒 <span class="drug-name"></span></div>
          </div>
          <div class="g02-flow-connector"><div class="g02-flow-line"></div><span class="g02-flow-arrow">▼</span></div>
          <div class="g02-algo-node effector-capsule">
            <div class="g02-algo-title">💥 Supresión de Gluconeogénesis</div>
            <div class="g02-algo-sub">Descenso de glucosa basal en ayunas sin hipoglucemia</div>
          </div>
        </div>
      </div>
    `,
    challenges: [
      {
        key: "sitagliptin",
        drugName: "Sitagliptina (iDPP-4)",
        drugClass: "Inhibidor de Dipeptidil Peptidasa-4 (Gliptina)",
        targetNodeId: "inc_dpp4",
        prompt: "Paciente diabético tipo 2 anciano con alto riesgo de hipoglucemia. Se prescribe un antidiabético oral que actúa prolongando la vida media fisiológica de las hormonas incretinas endógenas.",
        mechanism: "Inhibición competitiva y selectiva de la enzima DPP-4, evitando la rápida degradación enzimática del GLP-1 y GIP endógenos.",
        impact: "Aumento de 2 a 3 veces en las concentraciones de incretinas biológicamente activas, potenciando la secreción de insulina dependiente de glucosa y suprimiendo glucagón posprandial.",
        pearl: "📌 Perla USMLE / Examen: Efecto neutro sobre el peso corporal y riesgo casi nulo de hipoglucemia en monoterapia. No ha demostrado reducción significativa de eventos cardiovasculares adversos mayores (ensayo TECOS).",
        differential: {
          inc_glp1r: "❌ Has tocado el Receptor GLP-1. Liraglutida estimula directamente este receptor. Sitagliptina inhibe la enzima DPP-4 que degrada las hormonas.",
          inc_sglt2: "❌ Has tocado el cotransportador SGLT2. Empagliflozina actúa allí en el riñón.",
          inc_ampk: "❌ Has tocado AMPK hepática. Metformina actúa allí."
        }
      },
      {
        key: "liraglutide",
        drugName: "Liraglutida / Semaglutida (GLP-1 RA)",
        drugClass: "Agonista del Receptor de GLP-1 (Incretinmimético)",
        targetNodeId: "inc_glp1r",
        prompt: "Paciente diabético tipo 2 con obesidad severa (IMC 35 kg/m²) y enfermedad coronaria previa. Se busca un fármaco con comprobada reducción de eventos cardiovasculares (MACE) y supresión del apetito central.",
        mechanism: "Agonista selectivo de alta afinidad del receptor de GLP-1, diseñado con modificaciones estructurales (cadena de ácido graso) que le otorgan resistencia absoluta a la degradación por DPP-4.",
        impact: "Estimulación dependiente de glucosa de la secreción de insulina, enlentecimiento del vaciamiento gástrico y acción en el hipotálamo generando saciedad y pérdida de peso ponderal sustancial.",
        pearl: "📌 Perla USMLE / Examen: Comprobada reducción de mortalidad cardiovascular y protección renal (ensayos LEADER y SUSTAIN-6). Contraindicado en antecedentes personales o familiares de carcinoma medular de tiroides o NEM 2.",
        differential: {
          inc_dpp4: "❌ Has tocado la enzima DPP-4. Sitagliptina inhibe esa enzima. Liraglutida es un agonista directo que activa el receptor GLP-1.",
          inc_sglt2: "❌ Has tocado el SGLT2 renal. Empagliflozina actúa allí."
        }
      },
      {
        key: "empagliflozin",
        drugName: "Empagliflozina / Dapagliflozina (iSGLT2)",
        drugClass: "Inhibidor del Cotransportador SGLT2 (Gliflozina)",
        targetNodeId: "inc_sglt2",
        prompt: "Paciente diabético con insuficiencia cardíaca congestiva y microalbuminuria. Fármaco que bloquea la reabsorción proximal de glucosa y sodio, produciendo glucosuria terapéutica y natriuresis osmótica.",
        mechanism: "Inhibición selectiva del cotransportador de sodio-glucosa tipo 2 (SGLT2) en el túbulo proximal renal, reduciendo el umbral renal para la excreción de glucosa.",
        impact: "Induce glucosuria (60-80 g/día) y diuresis osmótica, reduce la presión arterial y la precarga, activa el feedback tubuloglomerular dilatando la arteriola eferente y frena la falla cardíaca.",
        pearl: "📌 Perla USMLE / Examen: Demostró reducción drástica de hospitalizaciones por falla cardíaca y muerte cardiovascular (ensayo EMPA-REG). Riesgo de micosis genitales, hipovolemia y cetoacidosis diabética euglucémica.",
        differential: {
          inc_glp1r: "❌ Has tocado el Receptor GLP-1. Liraglutida actúa en páncreas/SNC. Empagliflozina actúa en el túbulo contorneado proximal renal.",
          inc_ampk: "❌ Has tocado AMPK hepática. Metformina actúa allí."
        }
      },
      {
        key: "metformin",
        drugName: "Metformina (Biguanida)",
        drugClass: "Sensibilizador a la Insulina · Fármaco Oral de 1ª Línea",
        targetNodeId: "inc_ampk",
        prompt: "Fármaco oral de primera elección en diabetes tipo 2 sin contraindicaciones. No estimula la secreción de insulina ni provoca hipoglucemia, actuando principalmente reduciendo la producción hepática de glucosa.",
        mechanism: "Inhibición del Complejo I mitocondrial en el hepatocito → aumento del cociente AMP/ATP intracelular → activación alostérica de la AMPK (AMP-activated protein kinase).",
        impact: "Inhibe la expresión de enzimas clave de la gluconeogénesis hepática (PEPCK y Glucosa-6-Fosfatasa), disminuye la absorción intestinal de glucosa y mejora la sensibilidad periférica a la insulina.",
        pearl: "📌 Perla USMLE / Examen: Fármaco ahorrador de peso. Riesgo raro pero potencialmente fatal de acidosis láctica; contraindicado cuando el filtrado glomerular (eGFR) cae por debajo de 30 mL/min/1.73m² o en sepsis/hipoperfusión.",
        differential: {
          inc_sglt2: "❌ Has tocado el transportador SGLT2. Empagliflozina actúa en el riñón. La metformina actúa en la mitocondria y AMPK hepática.",
          inc_dpp4: "❌ Has tocado DPP-4. Sitagliptina actúa allí."
        }
      }
    ]
  }
};

let g02CurrentPathwayKey = "sraa";
let g02CurrentChallengeIndex = 0;
let g02Score = 0;
let g02Combo = 1;
let g02TotalAttempts = 0;
let g02CorrectAttempts = 0;
let g02SolvedDrugs = new Set();

function renderGame02(stage) {
  const container = document.createElement("div");
  container.className = "g02-container";

  container.innerHTML = `
    <!-- Barra superior de estado -->
    <div class="builder-toolbar">
      <div class="toolbar-stats">
        <div class="stat-item">
          <span class="stat-label">Puntos</span>
          <span class="stat-val highlight" id="g02-hud-score">0</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Racha Combo</span>
          <span class="stat-val" id="g02-hud-combo" style="color:#f59e0b;">🔥 x1</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Precisión</span>
          <span class="stat-val" id="g02-hud-accuracy" style="color:#10b981;">100%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Progreso Vía</span>
          <span class="stat-val" id="g02-hud-progress" style="color:#38bdf8;">0/5</span>
        </div>
      </div>
      <div class="toolbar-actions">
        <button class="lab-btn secondary" id="g02-btn-reset-pathway">
          ↺ Reiniciar Vía
        </button>
      </div>
    </div>

    <!-- Selector de Vías Biológicas / Clínicas -->
    <nav class="g02-pathway-nav-strip" id="g02-pathways-nav"></nav>

    <!-- Ficha de Desafío Farmacológico Activo -->
    <div class="g02-challenge-card" id="g02-challenge-card">
      <div class="g02-challenge-badge-row">
        <span class="g02-target-cue-pill">🎯 LOCALIZA LA DIANA EN EL FLUJO</span>
        <span class="g02-drug-class-tag" id="g02-challenge-drug-class">Cargando...</span>
      </div>

      <div class="g02-drug-name-title">
        <span style="font-size:24px;">💊</span>
        <span id="g02-challenge-drug-name">Fármaco</span>
      </div>

      <p class="g02-challenge-prompt-text" id="g02-challenge-prompt">
        Cargando viñeta clínica y contexto farmacodinámico...
      </p>

      <div class="g02-challenge-action-hint">
        <span>👉</span>
        <span><strong>Acción (1 solo clic):</strong> Toca directamente sobre la enzima catalítica, receptor o transportador del diagrama de flujo donde actúa este principio activo.</span>
      </div>
    </div>

    <!-- Toast de Error Diferencial -->
    <div class="g02-differential-toast" id="g02-differential-toast">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <strong id="g02-differential-title">⚠️ Diana Incorrecta</strong>
        <span style="font-size:10px; opacity:0.8;">Inténtalo de nuevo</span>
      </div>
      <p id="g02-differential-text">Explicación diferencial...</p>
    </div>

    <!-- Tablero del Diagrama de Flujo (Algoritmo Biológico) -->
    <div class="g02-board-card">
      <div class="g02-board-header">
        <span id="g02-board-title">ALGORITMO Y CASCADA DE FLUJO</span>
        <div class="g02-flow-legend">
          <span style="color:#38bdf8;">⚙️ Enzima Catalítica</span>
          <span style="color:#c084fc;">🛡️ Receptor</span>
          <span style="color:#fbbf24;">⚡ Transportador</span>
          <span style="color:#94a3b8;">💊 Sustrato</span>
        </div>
      </div>

      <!-- Contenedor del Árbol de Flujo Algorítmico -->
      <div class="g02-algo-tree" id="g02-algo-tree"></div>
    </div>

    <!-- Panel de Revelación Farmacodinámica (Aparece tras acierto) -->
    <div class="g02-revelation-panel" id="g02-revelation-panel">
      <div class="g02-revelation-header">
        <div class="g02-revelation-title">
          <span>✓</span>
          <span id="g02-revelation-heading">¡Diana Molecular Identificada!</span>
        </div>
        <span style="font-size:11px; font-weight:800; color:#10b981; font-family:var(--font-mono);" id="g02-revelation-pts">+100 PTS</span>
      </div>

      <div class="g02-revelation-body-grid">
        <div class="g02-revelation-card">
          <span class="g02-revelation-card-title">Mecanismo Molecular Exacto</span>
          <p class="g02-revelation-card-content" id="g02-revelation-mechanism"></p>
        </div>
        <div class="g02-revelation-card">
          <span class="g02-revelation-card-title">Impacto Hemodinámico / Celular</span>
          <p class="g02-revelation-card-content" id="g02-revelation-impact"></p>
        </div>
      </div>

      <div class="g02-pearl-box" id="g02-revelation-pearl"></div>

      <div class="g02-revelation-footer">
        <button class="g02-next-drug-btn" id="g02-btn-next-drug">
          <span>Siguiente Desafío Farmacológico</span>
          <span>➡️</span>
        </button>
      </div>
    </div>

    <!-- Banner de Vía Completada -->
    <div class="g02-completed-banner" id="g02-completed-banner">
      <div style="font-size:42px;">🏆</div>
      <h2 style="font-size:19px; font-weight:800; color:#34d399;">¡Algoritmo Biológico Dominado al 100%!</h2>
      <p style="font-size:13px; color:#cbd5e1; max-width:600px;">
        Has localizado con precisión todas las dianas terapéuticas de esta cascada fisiopatológica.
      </p>
      <button class="g02-next-drug-btn" id="g02-btn-switch-pathway" style="background:#0284c7; box-shadow:0 4px 14px rgba(2,132,199,0.4);">
        <span>Explorar Siguiente Vía Biológica</span>
        <span>🧬</span>
      </button>
    </div>
  `;

  stage.appendChild(container);
  initGame02Events();
}

function initGame02Events() {
  renderGame02Nav();
  loadGame02Pathway(g02CurrentPathwayKey);

  document.getElementById("g02-btn-next-drug").addEventListener("click", nextGame02Challenge);
  document.getElementById("g02-btn-reset-pathway").addEventListener("click", () => {
    loadGame02Pathway(g02CurrentPathwayKey);
  });
  document.getElementById("g02-btn-switch-pathway").addEventListener("click", () => {
    const keys = Object.keys(GAME02_PATHWAYS);
    const nextIdx = (keys.indexOf(g02CurrentPathwayKey) + 1) % keys.length;
    loadGame02Pathway(keys[nextIdx]);
  });
}

function renderGame02Nav() {
  const nav = document.getElementById("g02-pathways-nav");
  if (!nav) return;
  nav.innerHTML = "";

  Object.keys(GAME02_PATHWAYS).forEach(key => {
    const p = GAME02_PATHWAYS[key];
    const btn = document.createElement("button");
    btn.className = `g02-pathway-tab-btn ${key === g02CurrentPathwayKey ? 'active' : ''}`;
    btn.id = `g02-tab-btn-${key}`;
    btn.innerHTML = `
      <span>${p.icon}</span>
      <span>${p.title.split("(")[0].trim()}</span>
      <span class="g02-tab-counter" id="g02-tab-cnt-${key}">0/${p.challenges.length}</span>
    `;
    btn.addEventListener("click", () => {
      loadGame02Pathway(key);
    });
    nav.appendChild(btn);
  });
}

function loadGame02Pathway(pathwayKey) {
  g02CurrentPathwayKey = pathwayKey;
  g02CurrentChallengeIndex = 0;
  g02SolvedDrugs.clear();

  document.querySelectorAll(".g02-pathway-tab-btn").forEach(b => b.classList.remove("active"));
  const activeBtn = document.getElementById(`g02-tab-btn-${pathwayKey}`);
  if (activeBtn) activeBtn.classList.add("active");

  const p = GAME02_PATHWAYS[pathwayKey];
  const titleEl = document.getElementById("g02-board-title");
  if (titleEl) titleEl.textContent = `ALGORITMO DE FLUJO: ${p.title.toUpperCase()}`;

  const revPanel = document.getElementById("g02-revelation-panel");
  if (revPanel) revPanel.style.display = "none";
  const diffToast = document.getElementById("g02-differential-toast");
  if (diffToast) diffToast.style.display = "none";
  const compBanner = document.getElementById("g02-completed-banner");
  if (compBanner) compBanner.style.display = "none";
  const chalCard = document.getElementById("g02-challenge-card");
  if (chalCard) chalCard.style.display = "flex";

  // Inyectar el árbol de algoritmo
  const treeContainer = document.getElementById("g02-algo-tree");
  if (treeContainer) {
    treeContainer.innerHTML = p.treeTemplate;

    // Vincular clics a nodos con data-node-id
    treeContainer.querySelectorAll("[data-node-id]").forEach(el => {
      const nodeId = el.dataset.nodeId;
      el.addEventListener("click", () => handleGame02NodeClick(nodeId));
    });
  }

  loadGame02Challenge(g02CurrentChallengeIndex);
  updateGame02Hud();
}

function loadGame02Challenge(index) {
  const pathway = GAME02_PATHWAYS[g02CurrentPathwayKey];
  const challenge = pathway.challenges[index];
  if (!challenge) {
    showGame02PathwayCompleted();
    return;
  }

  const nameEl = document.getElementById("g02-challenge-drug-name");
  if (nameEl) nameEl.textContent = challenge.drugName;
  const classEl = document.getElementById("g02-challenge-drug-class");
  if (classEl) classEl.textContent = challenge.drugClass;
  const promptEl = document.getElementById("g02-challenge-prompt");
  if (promptEl) promptEl.textContent = challenge.prompt;

  const revPanel = document.getElementById("g02-revelation-panel");
  if (revPanel) revPanel.style.display = "none";
  const diffToast = document.getElementById("g02-differential-toast");
  if (diffToast) diffToast.style.display = "none";
  const chalCard = document.getElementById("g02-challenge-card");
  if (chalCard) chalCard.style.display = "flex";

  updateGame02Hud();
}

function handleGame02NodeClick(nodeId) {
  const pathway = GAME02_PATHWAYS[g02CurrentPathwayKey];
  const challenge = pathway.challenges[g02CurrentChallengeIndex];
  if (!challenge) return;

  g02TotalAttempts++;
  const nodeEl = document.getElementById(`g02-node-${nodeId}`);

  if (nodeId === challenge.targetNodeId) {
    // ACIERTO
    g02CorrectAttempts++;
    LabGamification.addXP(120, "Diana Certera 🧬");
    LabGamification.incrementStreak();
    g02Combo++;
    g02Score += (100 * Math.min(g02Combo, 5));
    g02SolvedDrugs.add(challenge.key);

    playLabSuccessSound();

    if (nodeEl) {
      nodeEl.classList.remove("shake-error");
      nodeEl.classList.add("locked-success");
      const solvedTag = document.getElementById(`g02-solved-tag-${nodeId}`);
      if (solvedTag) {
        solvedTag.style.display = "inline-flex";
        const drugLabel = solvedTag.querySelector(".drug-name");
        if (drugLabel) drugLabel.textContent = `Diana de ${challenge.drugName.split("(")[0].trim()}`;
      }
    }

    showGame02Revelation(challenge);
    const diffToast = document.getElementById("g02-differential-toast");
    if (diffToast) diffToast.style.display = "none";

  } else {
    // ERROR
    g02Combo = 1;
    LabGamification.resetStreak();
    playLabErrorSound();

    if (nodeEl) {
      nodeEl.classList.add("shake-error");
      setTimeout(() => nodeEl.classList.remove("shake-error"), 500);
    }

    showGame02Differential(nodeId, challenge);
  }

  updateGame02Hud();
}

function showGame02Revelation(challenge) {
  const panel = document.getElementById("g02-revelation-panel");
  if (!panel) return;

  const headingEl = document.getElementById("g02-revelation-heading");
  if (headingEl) headingEl.textContent = `¡Diana en el Flujo: ${challenge.drugName}!`;
  const ptsEl = document.getElementById("g02-revelation-pts");
  if (ptsEl) ptsEl.textContent = `+${100 * Math.min(g02Combo, 5)} PTS`;
  const mechEl = document.getElementById("g02-revelation-mechanism");
  if (mechEl) mechEl.textContent = challenge.mechanism;
  const impEl = document.getElementById("g02-revelation-impact");
  if (impEl) impEl.textContent = challenge.impact;
  const pearlEl = document.getElementById("g02-revelation-pearl");
  if (pearlEl) pearlEl.textContent = challenge.pearl;

  panel.style.display = "flex";
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showGame02Differential(nodeId, challenge) {
  const toast = document.getElementById("g02-differential-toast");
  if (!toast) return;

  const title = document.getElementById("g02-differential-title");
  const text = document.getElementById("g02-differential-text");

  const nodeEl = document.getElementById(`g02-node-${nodeId}`);
  const nodeTitle = nodeEl ? (nodeEl.querySelector(".g02-algo-title")?.textContent || nodeId) : nodeId;

  if (title) title.textContent = `❌ Diana Incorrecta: ${nodeTitle}`;

  if (text) {
    if (challenge.differential && challenge.differential[nodeId]) {
      text.textContent = challenge.differential[nodeId];
    } else {
      text.textContent = `Has seleccionado "${nodeTitle}". En este paso del algoritmo no actúa ${challenge.drugName}. Analiza si este agente actúa como enzima catalítica, receptor de membrana o transportador.`;
    }
  }

  toast.style.display = "block";
  toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextGame02Challenge() {
  const pathway = GAME02_PATHWAYS[g02CurrentPathwayKey];
  g02CurrentChallengeIndex++;

  if (g02CurrentChallengeIndex >= pathway.challenges.length) {
    showGame02PathwayCompleted();
  } else {
    loadGame02Challenge(g02CurrentChallengeIndex);
  }
}

function showGame02PathwayCompleted() {
  playLabVictorySound();
  LabGamification.triggerConfetti();
  LabGamification.unlockBadge("pathway_scout");
  LabGamification.addXP(400, "Vía Dominada 🏆");
  const chalCard = document.getElementById("g02-challenge-card");
  if (chalCard) chalCard.style.display = "none";
  const revPanel = document.getElementById("g02-revelation-panel");
  if (revPanel) revPanel.style.display = "none";
  const diffToast = document.getElementById("g02-differential-toast");
  if (diffToast) diffToast.style.display = "none";

  const compBanner = document.getElementById("g02-completed-banner");
  if (compBanner) {
    compBanner.style.display = "flex";
    compBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function updateGame02Hud() {
  const pathway = GAME02_PATHWAYS[g02CurrentPathwayKey];
  if (!pathway) return;

  const scoreEl = document.getElementById("g02-hud-score");
  if (scoreEl) scoreEl.textContent = g02Score;

  const comboEl = document.getElementById("g02-hud-combo");
  if (comboEl) comboEl.textContent = `🔥 x${g02Combo}`;

  const acc = g02TotalAttempts > 0 ? Math.round((g02CorrectAttempts / g02TotalAttempts) * 100) : 100;
  const accEl = document.getElementById("g02-hud-accuracy");
  if (accEl) accEl.textContent = `${acc}%`;

  const solvedCount = g02SolvedDrugs.size;
  const totalCount = pathway.challenges.length;
  const progEl = document.getElementById("g02-hud-progress");
  if (progEl) progEl.textContent = `${solvedCount}/${totalCount}`;

  const tabCnt = document.getElementById(`g02-tab-cnt-${g02CurrentPathwayKey}`);
  if (tabCnt) tabCnt.textContent = `${solvedCount}/${totalCount}`;
}
// ========================================================
// SISTEMA GLOBAL DE GAMIFICACIÓN CLÍNICA (XP, RACHAS, TROFEOS)
// ========================================================
const LabGamification = {
  xp: 850,
  streak: 1,
  unlockedBadges: new Set(["first_win", "streak_3", "pathway_scout"]),

  badgesCatalog: [
    { id: "first_win", title: "Ojo Clínico", desc: "Acierto preciso en el primer intento.", icon: "🎯" },
    { id: "streak_3", title: "Racha Imparable", desc: "Alcanzar una racha de 3 o más aciertos continuos.", icon: "🔥" },
    { id: "pathway_scout", title: "Maestro de Vías", desc: "Localizar dianas moleculares en la cascada biológica.", icon: "🧬" },
    { id: "cardio_master", title: "Cardiólogo Sagaz", desc: "Completar la matriz de Illness Script en Cardio.", icon: "🫀" },
    { id: "triage_chief", title: "Comandante de Urgencias", desc: "Completar un plan en Management Script sin iatrogenias.", icon: "⚡" },
    { id: "expert_consensus", title: "Consenso de Expertos", desc: "Alta concordancia con el panel de especialistas en SCT.", icon: "⚖️" },
    { id: "mcq_sniper", title: "Maestro del Board", desc: "Resolver un caso de vignette MCQ con razonamiento impecable.", icon: "🎓" },
    { id: "anatomy_scout", title: "Cartógrafo Anatómico", desc: "Localizar estructuras anatómicas críticas en figuras médicas.", icon: "🗺️" },
    { id: "therapeutic_sniper", title: "Tirador Terapéutico", desc: "Neutralizar patologías con la munición farmacológica exacta sin iatrogenias.", icon: "🚀" },
    { id: "clinical_mythbuster", title: "Cazador de Dogmas", desc: "Demoler mitos clínicos y trampas de examen en Verdadero/Falso.", icon: "⚡" },
    { id: "patient_cluster_master", title: "Estratega de Triage & Severidad", desc: "Clasificar pacientes en clusters de severidad y diagnóstico sin errores.", icon: "🏥" }
  ],

  levelRanks: [
    { minXp: 0, title: "Nivel 1 · Estudiante Clínico" },
    { minXp: 500, title: "Nivel 2 · Residente Junior" },
    { minXp: 1200, title: "Nivel 3 · Residente Senior" },
    { minXp: 2200, title: "Nivel 4 · Especialista Adjunto" },
    { minXp: 3500, title: "Nivel 5 · Jefe de Servicio Clínico" }
  ],

  init() {
    this.updateHUD();
    this.setupBadgesModal();
    this.setupSoundToggle();
    this.setupConfetti();
  },

  addXP(amount, label = "Acierto", x = null, y = null) {
    this.xp += amount;
    this.spawnFloatingXP(amount, label, x, y);
    this.updateHUD();
    playLabTone(880, 'sine', 0.12, 0.08);
  },

  incrementStreak() {
    this.streak++;
    if (this.streak >= 3) {
      this.unlockBadge("streak_3");
    }
    this.updateHUD();
  },

  resetStreak() {
    this.streak = 1;
    this.updateHUD();
  },

  unlockBadge(badgeId) {
    if (!this.unlockedBadges.has(badgeId)) {
      this.unlockedBadges.add(badgeId);
      const b = this.badgesCatalog.find(x => x.id === badgeId);
      if (b) {
        showToast("success", `🏆 ¡Nuevo Logro Desbloqueado!: ${b.icon} ${b.title}`);
        this.triggerConfetti();
      }
      this.updateHUD();
    }
  },

  updateHUD() {
    let currentRank = this.levelRanks[0];
    let nextRank = this.levelRanks[1];
    for (let i = this.levelRanks.length - 1; i >= 0; i--) {
      if (this.xp >= this.levelRanks[i].minXp) {
        currentRank = this.levelRanks[i];
        nextRank = this.levelRanks[i + 1] || { minXp: this.xp + 1000, title: "Máximo Nivel" };
        break;
      }
    }

    const rankTitleEl = document.getElementById("player-rank-title");
    if (rankTitleEl) rankTitleEl.textContent = currentRank.title;

    const xpCountEl = document.getElementById("player-xp-count");
    if (xpCountEl) xpCountEl.textContent = `⚡ ${this.xp} XP`;

    const xpNextEl = document.getElementById("player-xp-next");
    if (xpNextEl) xpNextEl.textContent = `${nextRank.minXp} XP`;

    const xpFillEl = document.getElementById("player-xp-fill");
    if (xpFillEl) {
      const currentLevelBase = currentRank.minXp;
      const range = nextRank.minXp - currentLevelBase;
      const progress = Math.min(100, Math.max(5, Math.round(((this.xp - currentLevelBase) / range) * 100)));
      xpFillEl.style.width = `${progress}%`;
    }

    const streakEl = document.getElementById("player-streak-text");
    if (streakEl) streakEl.textContent = `🔥 x${this.streak}`;

    const badgeCountEl = document.getElementById("badges-count-text");
    if (badgeCountEl) badgeCountEl.textContent = `${this.unlockedBadges.size}/${this.badgesCatalog.length}`;
  },

  spawnFloatingXP(amount, label, x, y) {
    const chip = document.createElement("div");
    chip.className = "floating-xp-chip";
    chip.textContent = `+${amount} XP ${label ? '· ' + label : ''}`;

    const posX = (x && x > 50 && x < window.innerWidth - 50) ? x : (window.innerWidth / 2);
    const posY = (y && y > 100 && y < window.innerHeight - 50) ? y : (window.innerHeight * 0.45);

    chip.style.left = `${posX}px`;
    chip.style.top = `${posY}px`;

    document.body.appendChild(chip);
    setTimeout(() => {
      if (chip.parentNode) chip.parentNode.removeChild(chip);
    }, 1250);
  },

  setupBadgesModal() {
    const btnOpen = document.getElementById("btn-open-badges");
    const btnClose = document.getElementById("btn-close-badges");
    const modal = document.getElementById("achievement-modal");
    const grid = document.getElementById("achievement-grid");

    if (btnOpen && modal) {
      btnOpen.addEventListener("click", () => {
        if (grid) {
          grid.innerHTML = "";
          this.badgesCatalog.forEach(b => {
            const isUnlocked = this.unlockedBadges.has(b.id);
            const item = document.createElement("div");
            item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            item.innerHTML = `
              <div class="achievement-icon">${b.icon}</div>
              <div class="achievement-info">
                <h4>${b.title} ${isUnlocked ? '✓' : '🔒'}</h4>
                <p>${b.desc}</p>
              </div>
            `;
            grid.appendChild(item);
          });
        }
        modal.style.display = "flex";
      });
    }

    if (btnClose && modal) {
      btnClose.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
    }
  },

  setupSoundToggle() {
    const btn = document.getElementById("btn-toggle-sound");
    const icon = document.getElementById("sound-icon");
    if (btn && icon) {
      btn.addEventListener("click", () => {
        labSoundEnabled = !labSoundEnabled;
        icon.textContent = labSoundEnabled ? "🔊" : "🔇";
        btn.style.opacity = labSoundEnabled ? "1" : "0.5";
        showToast("info", labSoundEnabled ? "Efectos de sonido activados 🔊" : "Efectos de sonido silenciados 🔇");
      });
    }
  },

  setupConfetti() {
    const canvas = document.getElementById("lab-confetti-canvas");
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  },

  triggerConfetti() {
    const canvas = document.getElementById("lab-confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const colors = ["#10b981", "#38bdf8", "#f59e0b", "#c084fc", "#f43f5e", "#ffffff"];

    for (let i = 0; i < 65; i++) {
      particles.push({
        x: window.innerWidth * (0.3 + Math.random() * 0.4),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        life: 1,
        decay: Math.random() * 0.015 + 0.012
      });
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35;
          p.rotation += p.rotSpeed;
          p.life -= p.decay;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });
      if (alive) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    render();
  }
};

// ========================================================
// SISTEMA DE AUDIO COMPARTIDO (WEB AUDIO API)
// ========================================================
let labAudioCtx = null;
let labSoundEnabled = true;

function playLabTone(freq, type, duration, gainVal = 0.1) {
  if (!labSoundEnabled) return;
  try {
    if (!labAudioCtx) labAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (labAudioCtx.state === 'suspended') labAudioCtx.resume();
    const osc = labAudioCtx.createOscillator();
    const gain = labAudioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, labAudioCtx.currentTime);
    gain.gain.setValueAtTime(gainVal, labAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, labAudioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(labAudioCtx.destination);
    osc.start();
    osc.stop(labAudioCtx.currentTime + duration);
  } catch (e) {}
}

function playLabSuccessSound() {
  playLabTone(523.25, 'triangle', 0.1, 0.12);
  setTimeout(() => playLabTone(659.25, 'triangle', 0.1, 0.12), 80);
  setTimeout(() => playLabTone(783.99, 'triangle', 0.18, 0.15), 160);
}

function playLabErrorSound() {
  playLabTone(220, 'sawtooth', 0.15, 0.15);
  setTimeout(() => playLabTone(185, 'sawtooth', 0.22, 0.15), 100);
}

function playLabVictorySound() {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    setTimeout(() => playLabTone(freq, 'sine', 0.25, 0.15), idx * 120);
  });
}

// ========================================================
// JUEGO 03: ILLNESS SCRIPT MATRIX (PACIENTES MODELO 1-POR-1)
// ========================================================
const GAME03_SCENARIOS = {
  cardio: {
    id: "cardio",
    title: "Síndromes Torácicos Agudos de Emergencia",
    subtitle: "Contraste diferencial: Infarto STEMI vs Pericarditis Aguda vs TEP",
    pearl: "El Infarto STEMI se distingue por su dolor opresivo con irradiación típica a brazo izquierdo/mandíbula y necrosis troponínica progresiva; la Pericarditis Aguda por su carácter pleurítico que alivia al inclinarse adelante con frote auscultatorio y elevación de PCR; y el TEP por su debut súbito con disnea extrema, factores de riesgo trombótico y sobrecarga ventricular derecha con Dímero D marcadamente positivo.",
    columns: [
      { id: "col0", key: "risk", label: "Fx de Riesgo", icon: "⚠️", badgeClass: "risk" },
      { id: "col1", key: "course", label: "Curso", icon: "⏱️", badgeClass: "course" },
      { id: "col2", key: "symptom", label: "Síntomas", icon: "🗣️", badgeClass: "symptom" },
      { id: "col3", key: "signs_labs", label: "Signos y Labs Marcados", icon: "🩺", badgeClass: "signs_labs" }
    ],
    rows: [
      { id: "row-stemi", label: "Infarto STEMI", icon: "🫀", tag: "Oclusión Coronaria Aguda" },
      { id: "row-peri", label: "Pericarditis Aguda", icon: "🛡️", tag: "Inflamación Pericárdica" },
      { id: "row-pe", label: "Tromboembolismo TEP", icon: "🫁", tag: "Oclusión Vascular Pulmonar" }
    ],
    tokens: [
      {
        id: "tok-stemi-risk",
        rowId: "row-stemi",
        colIndex: 0,
        text: "Tabaquismo activo, diabetes mellitus tipo 2, dislipidemia aterogénica (LDL >160 mg/dL) e hipertensión arterial mal controlada",
        mismatchNote: "Los factores de aterosclerosis coronaria clásica (tabaco, diabetes, dislipidemia) son el sustrato del STEMI."
      },
      {
        id: "tok-stemi-course",
        rowId: "row-stemi",
        colIndex: 1,
        text: "Inicio agudo de minutos a pocas horas de evolución, constante, progresivo y sin mejoría con el reposo ni con cambios posicionales",
        mismatchNote: "La persistencia implacable del dolor isquémico sin alivio postural define el curso temporal del STEMI."
      },
      {
        id: "tok-stemi-symp",
        rowId: "row-stemi",
        colIndex: 2,
        text: "Dolor torácico retroesternal opresivo/pesado («pata de elefante»), irradiado a mandíbula y brazo izquierdo, con sensación de muerte inminente",
        mismatchNote: "El dolor opresivo retroesternal con irradiación ulnar/mandibular es la semiología cardinal del STEMI."
      },
      {
        id: "tok-stemi-signs",
        rowId: "row-stemi",
        colIndex: 3,
        text: "Diaforesis fría profusa, palidez cenicienta, galope por 4° ruido (S4) y elevación dinámica marcada de Troponina ultrasensible (hs-cTn)",
        mismatchNote: "La diaforesis profusa, el 4° ruido y la curva dinámica de troponinas definen la signología biológica del STEMI."
      },
      {
        id: "tok-peri-risk",
        rowId: "row-peri",
        colIndex: 0,
        text: "Infección viral respiratoria o gastrointestinal reciente (Coxsackie, influenza, COVID-19), enfermedad autoinmune (LES) o uremia",
        mismatchNote: "El pródromo viral reciente o la condición autoinmune/urémica es el gatillante inflamatorio de la Pericarditis."
      },
      {
        id: "tok-peri-course",
        rowId: "row-peri",
        colIndex: 1,
        text: "Inicio agudo a subagudo (días), continuo pero fluctuante con los movimientos torácicos; empeora marcadamente en decúbito supino",
        mismatchNote: "El dolor que empeora en supino y se prolonga por días con fluctuación respiratoria señala Pericarditis."
      },
      {
        id: "tok-peri-symp",
        rowId: "row-peri",
        colIndex: 2,
        text: "Dolor punzante o urente pleurítico retroesternal irradiado a reborde de trapecio, que alivia marcadamente al sentarse e inclinarse hacia adelante",
        mismatchNote: "El alivio posicional característico al inclinarse hacia adelante (posición mahometana) es patognomónico de dolor pericárdico."
      },
      {
        id: "tok-peri-signs",
        rowId: "row-peri",
        colIndex: 3,
        text: "Frote pericárdico trifásico superficial a la auscultación; PCR y VSG marcadamente elevadas con troponina normal o mínima microfuga",
        mismatchNote: "El frote auscultatorio y la respuesta inflamatoria sistémica (PCR/VSG) alta sin necrosis masiva identifican la Pericarditis."
      },
      {
        id: "tok-pe-risk",
        rowId: "row-pe",
        colIndex: 0,
        text: "Inmovilización prolongada, cirugía ortopédica reciente, cáncer activo, uso de anticonceptivos orales/TRH o antecedente de trombofilia",
        mismatchNote: "La estasis venosa, hipercoagulabilidad y lesión endotelial (Tríada de Virchow) son los factores de riesgo de TEP."
      },
      {
        id: "tok-pe-course",
        rowId: "row-pe",
        colIndex: 1,
        text: "Inicio abrupto en segundos o minutos («disnea de la nada»), sin pródromos, desencadenado por esfuerzo leve o cambio postural",
        mismatchNote: "El debut instantáneo sin pródromos previos («disnea súbita inexplicable») es la marca temporal del TEP."
      },
      {
        id: "tok-pe-symp",
        rowId: "row-pe",
        colIndex: 2,
        text: "Disnea súbita e inexplicable, dolor torácico de tipo pleurítico unilateral, aprehensión extrema y en ocasiones síncope",
        mismatchNote: "La disnea súbita con dolor pleurítico lateralizado y síncope por compromiso hemodinámico define los síntomas del TEP."
      },
      {
        id: "tok-pe-signs",
        rowId: "row-pe",
        colIndex: 3,
        text: "Taquipnea (>20 rpm), taquicardia sinusal, segundo ruido pulmonar reforzado (P2 fuerte) ± edema asimétrico de pierna; Dímero-D >500 ng/mL",
        mismatchNote: "Taquipnea, P2 aumentado, signos de TVP periférica y Dímero D muy elevado configuran el cuadro de TEP."
      }
    ]
  },
  pulmo: {
    id: "pulmo",
    title: "Síndromes Obstructivos & ACOS",
    subtitle: "Contraste diferencial: Asma Grave (Th2) vs EPOC Exacerbado vs ACOS (Overlap)",
    pearl: "El Asma debuta en jóvenes con atopia, curso paroxístico nocturno y eosinofilia/FeNO alto; el EPOC en fumadores mayores de 40 años con disnea de esfuerzo progresiva e inflamación neutrofílica; y el ACOS fusiona la base atópica previa con el daño por tabaco generando un curso mixto inestable.",
    columns: [
      { id: "col0", key: "risk", label: "Fx de Riesgo", icon: "⚠️", badgeClass: "risk" },
      { id: "col1", key: "course", label: "Curso", icon: "⏱️", badgeClass: "course" },
      { id: "col2", key: "symptom", label: "Síntomas", icon: "🗣️", badgeClass: "symptom" },
      { id: "col3", key: "signs_labs", label: "Signos y Labs Marcados", icon: "🩺", badgeClass: "signs_labs" }
    ],
    rows: [
      { id: "row-asthma", label: "Asma Grave (Th2)", icon: "🌬️", tag: "Atopia & Hiperreactividad" },
      { id: "row-copd", label: "EPOC Exacerbado", icon: "🫁", tag: "Limitación Fija Flujo" },
      { id: "row-acos", label: "ACOS (Overlap)", icon: "🧬", tag: "Fenotipo Mixto" }
    ],
    tokens: [
      {
        id: "tok-a-risk",
        rowId: "row-asthma",
        colIndex: 0,
        text: "Historia personal o familiar de atopia (rinitis alérgica, dermatitis atópica), debut en infancia o juventud y sensibilización a aeroalérgenos",
        mismatchNote: "La predisposición alérgica y el debut juvenil con atopia es el terreno biológico del Asma Th2."
      },
      {
        id: "tok-a-course",
        rowId: "row-asthma",
        colIndex: 1,
        text: "Paroxístico y episódico con marcada variabilidad circadiana (peor en madrugada) y crisis gatilladas por alérgenos o infecciones virales",
        mismatchNote: "La variabilidad diurna paroxística con períodos intercrisis asintomáticos caracteriza al Asma."
      },
      {
        id: "tok-a-symp",
        rowId: "row-asthma",
        colIndex: 2,
        text: "Disnea sibilante paroxística, opresión torácica recurrente y tos espasmódica nocturna que alivian tras inhalar broncodilatador (SABA)",
        mismatchNote: "Las sibilancias audibles y la opresión rápidamente reversible con SABA definen los síntomas asmáticos."
      },
      {
        id: "tok-a-signs",
        rowId: "row-asthma",
        colIndex: 3,
        text: "Sibilancias espiratorias polifónicas difusas; fracción de óxido nítrico exhalado (FeNO) muy elevada (>50 ppb) y marcada eosinofilia periférica",
        mismatchNote: "FeNO >50 ppb y eosinofilia alta traducen la inflamación eosinofílica de vía aérea del Asma."
      },
      {
        id: "tok-c-risk",
        rowId: "row-copd",
        colIndex: 0,
        text: "Tabaquismo intenso acumulado (>20-30 paquetes-año) o exposición crónica a humo de biomasa/leña en adultos mayores de 40 años",
        mismatchNote: "El tabaquismo pesado o biomasa en mayores de 40 años es el factor etiológico primordial del EPOC."
      },
      {
        id: "tok-c-course",
        rowId: "row-copd",
        colIndex: 1,
        text: "Crónico y lentamente progresivo a lo largo de años, sin remisiones espontáneas, con empeoramientos infecciosos (exacerbaciones)",
        mismatchNote: "La pérdida acelerada y no reversible de función pulmonar a través de décadas es el curso del EPOC."
      },
      {
        id: "tok-c-symp",
        rowId: "row-copd",
        colIndex: 2,
        text: "Disnea de esfuerzo progresiva a lo largo de meses/años, tos productiva crónica matutina y limitación funcional para la marcha",
        mismatchNote: "La disnea progresiva de esfuerzo y la tos con esputo matutino crónico definen la presentación del EPOC."
      },
      {
        id: "tok-c-signs",
        rowId: "row-copd",
        colIndex: 3,
        text: "Tórax en tonel, espiración marcadamente alargada, roncus y crepitantes gruesos; esputo con neutrofilia prominente e interleucina-8 (IL-8)",
        mismatchNote: "La neutrofilia en esputo y signos de hiperinsuflación crónica corresponden al fenotipo de EPOC."
      },
      {
        id: "tok-ac-risk",
        rowId: "row-acos",
        colIndex: 0,
        text: "Adulto con historia previa documentada de asma infantil o atopia que posteriormente desarrolló tabaquismo significativo y persistente",
        mismatchNote: "La combinación de base asmática infantil con adicción al tabaco posterior es la cuna del ACOS."
      },
      {
        id: "tok-ac-course",
        rowId: "row-acos",
        colIndex: 1,
        text: "Curso mixto: limitación obstructiva persistente de base pero con exacerbaciones frecuentes, graves y fluctuaciones estacionales intensas",
        mismatchNote: "El ACOS combina el deterioro basal crónico con la inestabilidad y crisis frecuentes del asma."
      },
      {
        id: "tok-ac-symp",
        rowId: "row-acos",
        colIndex: 2,
        text: "Disnea crónica permanente de esfuerzo pero acompañada de episodios sobreagregados de broncoespasmo severo y sibilancias angustiantes",
        mismatchNote: "Disnea basal de esfuerzo sumada a paroxismos sibilantes asmáticos es la clínica típica de ACOS."
      },
      {
        id: "tok-ac-signs",
        rowId: "row-acos",
        colIndex: 3,
        text: "Disminución del murmullo vesicular con sibilancias bifásicas; eosinofilia sanguínea moderada-alta (>300 céls/µL) con reactividad IgE",
        mismatchNote: "La eosinofilia >300 céls/µL coexistiendo con obstrucción persistente es el biomarcador cardinal de ACOS."
      }
    ]
  },
  neuro: {
    id: "neuro",
    title: "Cefaleas de Emergencia",
    subtitle: "Contraste diferencial: Hemorragia Subaracnoidea vs Meningitis Aguda vs Migraña con Aura",
    pearl: "La Hemorragia Subaracnoidea se define por la «peor cefalea de la vida» de debut en trueno (<1 minuto) con rigidez de nuca precoz; la Meningitis Aguda por el debut febril subagudo con signos meníngeos (Kernig/Brudzinski) y pleocitosis neutrofílica; y la Migraña por su curso recurrente pulsátil hemicraneano precedido de aura visual reversible.",
    columns: [
      { id: "col0", key: "risk", label: "Fx de Riesgo", icon: "⚠️", badgeClass: "risk" },
      { id: "col1", key: "course", label: "Curso", icon: "⏱️", badgeClass: "course" },
      { id: "col2", key: "symptom", label: "Síntomas", icon: "🗣️", badgeClass: "symptom" },
      { id: "col3", key: "signs_labs", label: "Signos y Labs Marcados", icon: "🩺", badgeClass: "signs_labs" }
    ],
    rows: [
      { id: "row-sah", label: "HSA (Aneurisma)", icon: "💥", tag: "Cefalea en Trueno" },
      { id: "row-mening", label: "Meningitis Aguda", icon: "🦠", tag: "Infección Meníngea" },
      { id: "row-migr", label: "Migraña con Aura", icon: "⚡", tag: "Neurovascular Benigno" }
    ],
    tokens: [
      {
        id: "tok-sah-risk",
        rowId: "row-sah",
        colIndex: 0,
        text: "Hipertensión arterial no controlada, tabaquismo activo, poliquistosis renal autosómica dominante (PQRAD) o antecedente de aneurisma cerebral",
        mismatchNote: "La hipertensión y la predisposición a aneurismas saculares son los factores de riesgo primarios de la HSA."
      },
      {
        id: "tok-sah-course",
        rowId: "row-sah",
        colIndex: 1,
        text: "Inicio ultra-súbito en trueno alcanzando intensidad máxima 10/10 en menos de 60 segundos («como un golpe de rayo en el cráneo»)",
        mismatchNote: "El debut instantáneo alcanzando el pico en segundos (cefalea en trueno) es la firma temporal de la HSA."
      },
      {
        id: "tok-sah-symp",
        rowId: "row-sah",
        colIndex: 2,
        text: "«La peor cefalea de toda mi vida», dolor occipito-cervical excruciante, náuseas en escopetazo, pérdida transitoria de conciencia o síncope",
        mismatchNote: "La cefalea de máxima intensidad histórica con síncope inicial describe los síntomas de HSA."
      },
      {
        id: "tok-sah-signs",
        rowId: "row-sah",
        colIndex: 3,
        text: "Rigidez de nuca progresiva, hemorragias prerretinianas subhialoideas (signo de Terson) y TAC cerebral simple con hiperdensidad en cisternas basales",
        mismatchNote: "La sangre en cisternas basales en la TAC y la rigidez de nuca sin fiebre identifican la HSA."
      },
      {
        id: "tok-men-risk",
        rowId: "row-mening",
        colIndex: 0,
        text: "Asplenia funcional/anatómica, hacinamiento (dormitorios universitarios/cuarteles), inmunosupresión o sinusitis/otitis media no tratada",
        mismatchNote: "El déficit de opsonización o foco parameníngeo otorrinolaringológico predispone a Meningitis Bacteriana."
      },
      {
        id: "tok-men-course",
        rowId: "row-mening",
        colIndex: 1,
        text: "Evolución subaguda de 12 a 36 horas con deterioro progresivo del estado de alerta y aumento febril continuo e implacable",
        mismatchNote: "La instauración gradual en horas con fiebre y somnolencia creciente describe la Meningitis."
      },
      {
        id: "tok-men-symp",
        rowId: "row-mening",
        colIndex: 2,
        text: "Cefalea holocraneana pulsátil severa acompañada de fiebre alta (>38.5°C), fotofobia intensa, dolor de cuello y vómitos",
        mismatchNote: "La tríada de cefalea + fiebre + fotofobia severa es la presentación cardinal de la Meningitis."
      },
      {
        id: "tok-men-signs",
        rowId: "row-mening",
        colIndex: 3,
        text: "Signos meníngeos francamente positivos (Kernig y Brudzinski); LCR turbio con pleocitosis polimorfonuclear (>1000 céls), hipoglucorraquia y proteínas >100 mg/dL",
        mismatchNote: "El LCR purulento con neutrofilia e hipoglucorraquia severa confirma Meningitis Bacteriana."
      },
      {
        id: "tok-mig-risk",
        rowId: "row-migr",
        colIndex: 0,
        text: "Historia familiar de migraña (herencia multigénica), sexo femenino en edad fértil y desencadenantes conocidos (estrés, falta de sueño, ayuno)",
        mismatchNote: "El patrón genético familiar y el perfil hormonal/estresor es característico de la Migraña."
      },
      {
        id: "tok-mig-course",
        rowId: "row-migr",
        colIndex: 1,
        text: "Episódico y recurrente, con dolor que escala gradualmente a lo largo de 1-2 horas y dura entre 4 a 72 horas si no se trata",
        mismatchNote: "El desarrollo gradual en horas y la duración típica de hasta 72 horas es el curso migrañoso."
      },
      {
        id: "tok-mig-symp",
        rowId: "row-migr",
        colIndex: 2,
        text: "Cefalea hemicraneana unilateral pulsátil que empeora con el movimiento físico rutinario, asociada a náuseas, fotofobia y sonofobia",
        mismatchNote: "El carácter hemicraneano pulsátil agravado por escaleras o movimiento define la Migraña."
      },
      {
        id: "tok-mig-signs",
        rowId: "row-migr",
        colIndex: 3,
        text: "Aura visual transitoria (escotoma centelleante / espectro de fortificación en 5-60 min); examen físico neurológico normal entre crisis",
        mismatchNote: "El aura visual reversible con examen neurológico intercrisis normal caracteriza a la Migraña con Aura."
      }
    ]
  }
};

let g03CurrentScenarioId = 'cardio';
let g03Deck = [];
let g03CurrentCard = null;
let g03PatientSlots = {};
let g03StreakCount = 1;
let g03TotalAttempts = 0;
let g03CorrectPlacements = 0;

function renderGame03(stage) {
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
  g03PatientSlots = {};
  g03StreakCount = 1;
  g03TotalAttempts = 0;
  g03CorrectPlacements = 0;
  g03Deck = shuffleArray([...scen.tokens]);
  g03CurrentCard = g03Deck.shift() || null;

  const container = document.createElement("div");
  container.className = "cip-wrapper";

  container.innerHTML = `
    <!-- BARRA SUPERIOR CON CONTROLES -->
    <header class="cip-top-bar">
      <div class="cip-title-group">
        <h1>
          Illness Script Matrix
          <span class="badge-cip">Juego 03 · Pacientes Modelo</span>
        </h1>
        <p>Construye los 3 pacientes modelo enviando cada ficha con 1 solo clic.</p>
      </div>

      <div class="cip-top-actions">
        <div class="scenario-nav">
          <button class="scenario-pill ${g03CurrentScenarioId === 'cardio' ? 'active' : ''}" id="g03-btn-scen-cardio">🫀 Cardio (Torácico)</button>
          <button class="scenario-pill ${g03CurrentScenarioId === 'pulmo' ? 'active' : ''}" id="g03-btn-scen-pulmo">🫁 Pulmonar & ACOS</button>
          <button class="scenario-pill ${g03CurrentScenarioId === 'neuro' ? 'active' : ''}" id="g03-btn-scen-neuro">🧠 Cefaleas</button>
        </div>

        <button class="icon-circle-btn" id="g03-btn-sound" title="Alternar Sonido">🔊</button>
        <button class="icon-circle-btn" id="g03-btn-reset" title="Reiniciar Escenario">↺</button>
      </div>
    </header>

    <!-- CINTA DE MÉTRICAS Y PROGRESO -->
    <section class="stats-ribbon">
      <div class="stats-counters">
        <div class="stat-box">
          <span class="stat-label">Fichas Asignadas</span>
          <span class="stat-value highlight" id="g03-stat-slots">0 / 12</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Racha de Coherencia</span>
          <span class="stat-value streak" id="g03-stat-streak">🔥 x1</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Precisión</span>
          <span class="stat-value accuracy" id="g03-stat-acc">100%</span>
        </div>
      </div>

      <div class="deck-progress-bar-container">
        <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; font-family:var(--font-mono);">
          <span>Progreso de Baraja</span>
          <span id="g03-deck-progress-text">0%</span>
        </div>
        <div class="deck-progress-bar-track">
          <div class="deck-progress-bar-fill" id="g03-deck-progress-fill"></div>
        </div>
      </div>
    </section>

    <!-- EL DESPACHADOR DE FICHAS 1-POR-1 -->
    <section class="active-card-dealer" id="g03-active-card-dealer">
      <div class="card-top-row">
        <div class="card-badge-group">
          <span class="dimension-pill" id="g03-dim-badge">
            <span id="g03-dim-icon">🎯</span>
            <span id="g03-dim-label">Dimensión</span>
          </span>
          <span class="card-counter-tag" id="g03-card-counter">Ficha 1 de 12</span>
        </div>

        <div class="card-actions-top">
          <button class="skip-card-btn" id="g03-btn-skip" title="Poner esta ficha al final del mazo">
            <span>⏭️ Dejar para luego</span>
          </button>
        </div>
      </div>

      <div class="card-content-text" id="g03-card-text">
        Cargando hallazgo clínico...
      </div>

      <div class="card-feedback-box" id="g03-card-feedback"></div>

      <div class="dispatch-prompt">
        <span>👉 ¿A qué Paciente Modelo pertenece este hallazgo? (1 clic):</span>
      </div>

      <div class="dispatch-buttons-grid" id="g03-dispatch-buttons"></div>
    </section>

    <!-- LOS 3 PACIENTES MODELO COMPARADOS SIMULTÁNEAMENTE -->
    <main class="models-container" id="g03-models-container"></main>

    <!-- MODAL DE VICTORIA -->
    <dialog class="modal-dialog" id="g03-victory-dialog">
      <div style="text-align:center; padding: 10px 0 16px;">
        <div style="font-size:36px; margin-bottom:4px;">🏆</div>
        <h2 style="font-size:22px; font-weight:800; color:#ffffff;">¡Pacientes Modelo Completados!</h2>
        <p style="font-size:13px; color:#94a3b8; margin-top:4px;">
          Has integrado con precisión los 3 Illness Scripts diferenciales sin ambigüedad.
        </p>
      </div>

      <div style="background:#131d31; border:1px solid #1e293b; border-radius:12px; padding:12px; margin-bottom:16px;">
        <h4 style="font-size:12px; font-weight:800; color:#38bdf8; text-transform:uppercase; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <span>🔍 Síntesis Clínica & Discriminadores Cardinales</span>
        </h4>
        <p id="g03-victory-pearl-text" style="font-size:12.5px; color:#cbd5e1; line-height:1.45;"></p>
      </div>

      <div style="overflow-x:auto;">
        <table class="summary-matrix-table" id="g03-victory-summary-table"></table>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button class="skip-card-btn" id="g03-btn-victory-replay" style="font-size:12px; padding:8px 14px;">↺ Jugar de Nuevo</button>
        <button class="skip-card-btn" id="g03-btn-victory-next" style="font-size:12px; padding:8px 14px; background:#0284c7; color:#fff; border-color:#0284c7;">Siguiente Escenario →</button>
      </div>
    </dialog>
  `;

  stage.appendChild(container);

  // Wire controls
  document.getElementById("g03-btn-scen-cardio").addEventListener("click", () => switchG03Scenario("cardio"));
  document.getElementById("g03-btn-scen-pulmo").addEventListener("click", () => switchG03Scenario("pulmo"));
  document.getElementById("g03-btn-scen-neuro").addEventListener("click", () => switchG03Scenario("neuro"));

  document.getElementById("g03-btn-skip").addEventListener("click", skipG03ActiveCard);
  document.getElementById("g03-btn-reset").addEventListener("click", () => {
    renderGame03(stage);
    showToast("info", "Escenario reiniciado.");
  });

  document.getElementById("g03-btn-sound").addEventListener("click", (e) => {
    labSoundEnabled = !labSoundEnabled;
    e.target.textContent = labSoundEnabled ? '🔊' : '🔇';
    showToast("info", labSoundEnabled ? "Sonido activado" : "Sonido silenciado");
  });

  document.getElementById("g03-btn-victory-replay").addEventListener("click", () => {
    document.getElementById("g03-victory-dialog").close();
    renderGame03(stage);
  });

  document.getElementById("g03-btn-victory-next").addEventListener("click", () => {
    document.getElementById("g03-victory-dialog").close();
    const scenKeys = Object.keys(GAME03_SCENARIOS);
    const nextIdx = (scenKeys.indexOf(g03CurrentScenarioId) + 1) % scenKeys.length;
    switchG03Scenario(scenKeys[nextIdx]);
  });

  renderG03ModelsLayout();
  updateG03ActiveCardUI();
  updateG03StatsUI();
}

function switchG03Scenario(scenId) {
  g03CurrentScenarioId = scenId;
  const stage = document.getElementById("lab-stage");
  stage.innerHTML = "";
  renderGame03(stage);
  showToast("info", `Cargado: ${GAME03_SCENARIOS[scenId].title}`);
}

function renderG03ModelsLayout() {
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
  const container = document.getElementById("g03-models-container");
  if (!container) return;
  container.innerHTML = "";

  scen.rows.forEach(row => {
    const pCard = document.createElement("div");
    pCard.className = "patient-model-card";
    pCard.id = `g03-patient-card-${row.id}`;

    const filledCount = scen.columns.filter((_, cIdx) => g03PatientSlots[`${row.id}_${cIdx}`]).length;

    pCard.innerHTML = `
      <header class="patient-header">
        <div class="patient-title-wrap">
          <div class="patient-avatar">${row.icon}</div>
          <div>
            <h3 class="patient-name-h3">${row.label}</h3>
            <span class="patient-tag">${row.tag}</span>
          </div>
        </div>
        <span class="patient-badge-count" id="g03-badge-${row.id}">${filledCount} / 4</span>
      </header>

      <div class="patient-slots-list">
        ${scen.columns.map((col, colIdx) => {
          const slotKey = `${row.id}_${colIdx}`;
          const placedTokId = g03PatientSlots[slotKey];
          const placedTok = placedTokId ? scen.tokens.find(t => t.id === placedTokId) : null;
          const isFilled = !!placedTok;

          return `
            <div class="model-slot-item ${isFilled ? 'filled' : ''}" 
                 id="g03-slot-${slotKey}" 
                 data-slot-key="${slotKey}"
                 onclick="handleG03DirectSlotClick('${slotKey}')">
              <div class="slot-meta-row">
                <span class="slot-dimension-label ${col.badgeClass}">
                  ${col.icon} ${col.label}
                </span>
                <span class="slot-status-indicator">
                  ${isFilled ? '✓ Confirmado' : 'Pendiente'}
                </span>
              </div>
              <div class="slot-body-content">
                ${isFilled ? `
                  <p class="slot-finding-text">${placedTok.text}</p>
                ` : `
                  <div class="slot-empty-placeholder">
                    <span>Esperando hallazgo...</span>
                    <span class="slot-tap-cta">👈 Enviar aquí</span>
                  </div>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.appendChild(pCard);
  });

  renderG03DispatchButtons();
}

function renderG03DispatchButtons() {
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
  const grid = document.getElementById("g03-dispatch-buttons");
  if (!grid) return;
  grid.innerHTML = "";

  scen.rows.forEach(row => {
    const filledCount = scen.columns.filter((_, cIdx) => g03PatientSlots[`${row.id}_${cIdx}`]).length;
    const isComplete = filledCount === 4;

    const btn = document.createElement("button");
    btn.className = `dispatch-patient-btn ${isComplete ? 'completed' : ''}`;
    btn.id = `g03-btn-dispatch-${row.id}`;
    btn.innerHTML = `
      <span class="p-icon">${row.icon}</span>
      <span class="p-name">${row.label}</span>
      <span class="p-progress">${filledCount}/4 completado</span>
    `;
    btn.addEventListener("click", () => dispatchG03ActiveCard(row.id));
    grid.appendChild(btn);
  });
}

function updateG03ActiveCardUI() {
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
  const dealer = document.getElementById("g03-active-card-dealer");
  if (!dealer) return;

  if (!g03CurrentCard) {
    dealer.style.display = "none";
    checkG03VictoryCondition();
    return;
  }

  dealer.style.display = "flex";
  dealer.classList.remove("shake", "success-flash");

  const col = scen.columns[g03CurrentCard.colIndex];
  const dimBadge = document.getElementById("g03-dim-badge");
  dimBadge.className = `dimension-pill ${col.badgeClass}`;
  document.getElementById("g03-dim-icon").textContent = col.icon;
  document.getElementById("g03-dim-label").textContent = col.label;

  const totalTokens = scen.tokens.length;
  const completedCount = Object.keys(g03PatientSlots).length;
  document.getElementById("g03-card-counter").textContent = `Ficha ${completedCount + 1} de ${totalTokens}`;
  document.getElementById("g03-card-text").textContent = g03CurrentCard.text;

  highlightG03ActiveDimension(g03CurrentCard.colIndex);
}

function highlightG03ActiveDimension(colIdx) {
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
  document.querySelectorAll(".model-slot-item").forEach(slot => {
    slot.classList.remove("active-dimension-target");
  });

  scen.rows.forEach(row => {
    const slotKey = `${row.id}_${colIdx}`;
    if (!g03PatientSlots[slotKey]) {
      const el = document.getElementById(`g03-slot-${slotKey}`);
      if (el) el.classList.add("active-dimension-target");
    }
  });
}

function dispatchG03ActiveCard(targetRowId) {
  if (!g03CurrentCard) return;
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];

  g03TotalAttempts++;
  const isCorrect = (g03CurrentCard.rowId === targetRowId);
  const targetSlotKey = `${targetRowId}_${g03CurrentCard.colIndex}`;

  if (isCorrect) {
    g03CorrectPlacements++;
    g03StreakCount++;
    playLabSuccessSound();

    g03PatientSlots[targetSlotKey] = g03CurrentCard.id;

    const dealer = document.getElementById("g03-active-card-dealer");
    dealer.classList.add("success-flash");

    showToast("success", `✓ ¡Correcto! Asignado a ${scen.rows.find(r => r.id === targetRowId).label}`);
    hideG03CardFeedback();

    setTimeout(() => {
      renderG03ModelsLayout();
      if (g03Deck.length > 0) {
        g03CurrentCard = g03Deck.shift();
      } else {
        g03CurrentCard = null;
      }
      updateG03ActiveCardUI();
      updateG03StatsUI();
    }, 220);

  } else {
    g03StreakCount = 1;
    playLabErrorSound();

    const dealer = document.getElementById("g03-active-card-dealer");
    dealer.classList.remove("shake");
    void dealer.offsetWidth;
    dealer.classList.add("shake");

    showG03CardFeedback(g03CurrentCard.mismatchNote);
    showToast("error", "✗ No coincide con ese paciente modelo");
    updateG03StatsUI();
  }
}

function handleG03DirectSlotClick(slotKey) {
  if (!g03CurrentCard) return;
  const [rowId, colIdxStr] = slotKey.split('_');
  const colIdx = parseInt(colIdxStr, 10);

  if (colIdx === g03CurrentCard.colIndex) {
    dispatchG03ActiveCard(rowId);
  } else {
    const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
    showToast("error", `Esta ficha corresponde a: ${scen.columns[g03CurrentCard.colIndex].label}`);
  }
}

function skipG03ActiveCard() {
  if (!g03CurrentCard || g03Deck.length === 0) {
    showToast("info", "No hay más fichas en espera en la baraja.");
    return;
  }
  g03Deck.push(g03CurrentCard);
  g03CurrentCard = g03Deck.shift();
  hideG03CardFeedback();
  updateG03ActiveCardUI();
  showToast("info", "Ficha postergada para el final del mazo.");
}

function showG03CardFeedback(note) {
  const box = document.getElementById("g03-card-feedback");
  if (!box) return;
  box.style.display = "block";
  box.innerHTML = `<strong>💡 Discriminador Clínico:</strong> ${note}`;
}

function hideG03CardFeedback() {
  const box = document.getElementById("g03-card-feedback");
  if (!box) return;
  box.style.display = "none";
  box.innerHTML = "";
}

function updateG03StatsUI() {
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
  const placedCount = Object.keys(g03PatientSlots).length;
  const totalTokens = scen.tokens.length;

  const slotEl = document.getElementById("g03-stat-slots");
  const streakEl = document.getElementById("g03-stat-streak");
  const accEl = document.getElementById("g03-stat-acc");

  if (slotEl) slotEl.textContent = `${placedCount} / ${totalTokens}`;
  if (streakEl) streakEl.textContent = `🔥 x${g03StreakCount}`;

  const acc = g03TotalAttempts > 0 ? Math.round((g03CorrectPlacements / g03TotalAttempts) * 100) : 100;
  if (accEl) accEl.textContent = `${acc}%`;

  const pct = Math.round((placedCount / totalTokens) * 100);
  const progText = document.getElementById("g03-deck-progress-text");
  const progFill = document.getElementById("g03-deck-progress-fill");
  if (progText) progText.textContent = `${pct}%`;
  if (progFill) progFill.style.width = `${pct}%`;
}

function checkG03VictoryCondition() {
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
  const totalTokens = scen.tokens.length;
  const placedCount = Object.keys(g03PatientSlots).length;

  if (placedCount === totalTokens) {
    playLabVictorySound();
    openG03VictoryModal();
  }
}

function openG03VictoryModal() {
  const scen = GAME03_SCENARIOS[g03CurrentScenarioId];
  const dialog = document.getElementById("g03-victory-dialog");
  document.getElementById("g03-victory-pearl-text").textContent = scen.pearl;

  const table = document.getElementById("g03-victory-summary-table");
  table.innerHTML = `
    <thead>
      <tr>
        <th style="width:130px;">Dimensión</th>
        ${scen.rows.map(r => `<th>${r.icon} ${r.label}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${scen.columns.map((col, cIdx) => `
        <tr>
          <td class="dim-header">${col.icon} ${col.label}</td>
          ${scen.rows.map(r => {
            const tok = scen.tokens.find(t => t.rowId === r.id && t.colIndex === cIdx);
            return `<td>${tok ? tok.text : ''}</td>`;
          }).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;

  dialog.showModal();
}


// ========================================================
// JUEGO 04: MANAGEMENT SCRIPT MATRIX (PLANES MODELO 1-POR-1)
// ========================================================
const GAME04_SCENARIOS = {
  cardio: {
    id: "cardio",
    title: "Manejo Urgente de Síndromes Torácicos",
    subtitle: "Contraste terapéutico: Infarto STEMI vs Pericarditis Aguda vs TEP Agudo",
    pearl: "El STEMI requiere reperfusión emergente inmediata por hemodinamia (<90 min) y doble antiagregación; la Pericarditis se maneja con AINEs a dosis plenas combinados con Colchicina por 3 meses para evitar recurrencias; y el TEP agudo exige estratificación por Wells/sPESI y anticoagulación inmediata, reservando la trombólisis con r-tPA exclusivamente para el shock obstructivo.",
    columns: [
      { id: "col0", key: "labs", label: "Labs Alteraciones", icon: "🔬", badgeClass: "labs" },
      { id: "col1", key: "imaging", label: "Imágenes Alteraciones", icon: "🩻", badgeClass: "imaging" },
      { id: "col2", key: "criteria", label: "Criterios Dx", icon: "📋", badgeClass: "criteria" },
      { id: "col3", key: "treatment", label: "Tratamiento", icon: "💊", badgeClass: "treatment" },
      { id: "col4", key: "complications", label: "Complicaciones", icon: "⚠️", badgeClass: "complications" }
    ],
    rows: [
      { id: "row-stemi", label: "Infarto STEMI", icon: "🫀", tag: "Reperfusión Urgente" },
      { id: "row-peri", label: "Pericarditis Aguda", icon: "🛡️", tag: "Antiinflamatorio + Colchicina" },
      { id: "row-pe", label: "Tromboembolismo TEP", icon: "🫁", tag: "Anticoagulación / Lisis" }
    ],
    tokens: [
      {
        id: "tok-s-labs",
        rowId: "row-stemi",
        colIndex: 0,
        text: "Elevación dinámica exponencial de Troponina ultrasensible (hs-cTn >99 percentil con delta significativo a las 1-3h) y CK-MB elevada",
        mismatchNote: "La cinética ascendente de necrosis miocárdica pura con troponinas muy elevadas identifica al STEMI."
      },
      {
        id: "tok-s-img",
        rowId: "row-stemi",
        colIndex: 1,
        text: "ECG con supradesnivel del ST convexo en derivaciones anatómicamente contiguas; Ecocardiograma con hipoquinesia o aquinesia segmentaria",
        mismatchNote: "El ST convexo con imagen en espejo y la alteración de motilidad regional corresponden al STEMI."
      },
      {
        id: "tok-s-crit",
        rowId: "row-stemi",
        colIndex: 2,
        text: "4ª Definición Universal de Infarto: Daño miocárdico agudo con elevación de troponina + evidencia de isquemia miocárdica clínica o ECG",
        mismatchNote: "La Cuarta Definición Universal es el marco regulatorio diagnóstico formal del Infarto."
      },
      {
        id: "tok-s-tx",
        rowId: "row-stemi",
        colIndex: 3,
        text: "Intervencionismo Coronario Percutáneo (ICP) primario en <90 min + Doble antiagregación (AAS + Ticagrelor) + Heparina no fraccionada",
        mismatchNote: "La angioplastia primaria emergente con stent y doble antiagregación es el tratamiento de elección del STEMI."
      },
      {
        id: "tok-s-comp",
        rowId: "row-stemi",
        colIndex: 4,
        text: "Shock cardiogénico, arritmias ventriculares letales (FV/TV sostenida), rotura de pared libre / septum o insuficiencia mitral aguda",
        mismatchNote: "El shock de bomba y las complicaciones mecánicas de necrosis son exclusivas del infarto transmural."
      },
      {
        id: "tok-p-labs",
        rowId: "row-peri",
        colIndex: 0,
        text: "Elevación marcada de marcadores inflamatorios sistémicos (PCR >50-100 mg/L y VSG elevada) con troponinas normales o mínima microfuga",
        mismatchNote: "PCR/VSG elevadas con disociación de troponinas mínimas/negativas caracterizan a la Pericarditis."
      },
      {
        id: "tok-p-img",
        rowId: "row-peri",
        colIndex: 1,
        text: "ECG con supradesnivel del ST cóncavo difuso en casi todas las derivaciones + infradesnivel del PR en DII/aVF; Eco con derrame pericárdico",
        mismatchNote: "El ST cóncavo difuso y el infradesnivel patognomónico del PR con o sin derrame corresponden a la Pericarditis."
      },
      {
        id: "tok-p-crit",
        rowId: "row-peri",
        colIndex: 2,
        text: "Criterios ESC (≥2 de 4): 1) Dolor pleurítico posicional; 2) Frote pericárdico; 3) Elevación cóncava ST / infradesnivel PR; 4) Derrame pericárdico",
        mismatchNote: "Los criterios diagnósticos de la Sociedad Europea de Cardiología (ESC) definen la Pericarditis Aguda."
      },
      {
        id: "tok-p-tx",
        rowId: "row-peri",
        colIndex: 3,
        text: "AINEs a dosis plenas (Ibuprofeno 600 mg c/8h o AAS 1g c/8h) + Colchicina 0.5 mg/día por 3 meses; restricción estricta de ejercicio",
        mismatchNote: "AINEs más Colchicina por 3 meses para prevenir recidivas es el estándar de oro de la Pericarditis."
      },
      {
        id: "tok-p-comp",
        rowId: "row-peri",
        colIndex: 4,
        text: "Taponamiento cardíaco agudo con pulso paradójico y tríada de Beck (hipotensión, ruidos apagados, ingurgitación) o pericarditis constrictiva",
        mismatchNote: "El taponamiento por compromiso de distensibilidad diastólica y la constricción pericárdica complican la pericarditis."
      },
      {
        id: "tok-tep-labs",
        rowId: "row-pe",
        colIndex: 0,
        text: "Dímero-D marcadamente positivo (>500-1000 ng/mL) + elevación de troponina y BNP/NT-proBNP como marcadores de sobrecarga ventricular derecha",
        mismatchNote: "Dímero D alto con biomarcadores de estrés de cavidades derechas (BNP/troponina) define el laboratorio de TEP."
      },
      {
        id: "tok-tep-img",
        rowId: "row-pe",
        colIndex: 1,
        text: "Angio-TAC pulmonar con defectos de repleción intraluminal en ramas arteriales; Ecocardiograma con signo de McConnell y dilatación de VD",
        mismatchNote: "El defecto vascular en la Angio-TAC y la sobrecarga de VD en el ecocardiograma evidencian TEP."
      },
      {
        id: "tok-tep-crit",
        rowId: "row-pe",
        colIndex: 2,
        text: "Score de Wells o Criterios de Ginebra para probabilidad pre-test + algoritmo YEARS / regla PERC + confirmación imagenológica",
        mismatchNote: "La escala de Wells y la regla PERC son los criterios de estratificación para sospecha de TEP."
      },
      {
        id: "tok-tep-tx",
        rowId: "row-pe",
        colIndex: 3,
        text: "Anticoagulación inmediata con HBPM o DOACs (Rivaroxabán/Apixabán); si cursa con shock obstructivo hemodinámico: trombólisis con r-tPA",
        mismatchNote: "Anticoagulación precoz y rescate fibrinolítico sistémico únicamente si hay hipotensión/shock definen el TEP."
      },
      {
        id: "tok-tep-comp",
        rowId: "row-pe",
        colIndex: 4,
        text: "Shock obstructivo por falla ventricular derecha aguda («cor pulmonale» agudo), paro por AESP e hipertensión pulmonar tromboembólica crónica",
        mismatchNote: "El shock obstructivo agudo de VD y la HPTEC a largo plazo son las complicaciones del TEP."
      }
    ]
  },
  resp: {
    id: "resp",
    title: "Manejo de Urgencias Respiratorias Críticas",
    subtitle: "Contraste terapéutico: Crisis Asmática Severa vs Exacerbación Grave EPOC vs Anafilaxia",
    pearl: "La Crisis Asmática Severa se revierte con SABA inhalado a altas dosis + Bromuro de Ipratropio + Corticoide sistémico temprano; la Exacerbación Grave de EPOC requiere oxigenoterapia controlada (SpO2 88-92%), broncodilatadores, corticoide oral por 5 días y antibióticos si hay esputo purulento; mientras que la Anafilaxia exige adrenalina intramuscular inmediata en cara anterolateral del muslo.",
    columns: [
      { id: "col0", key: "labs", label: "Labs Alteraciones", icon: "🔬", badgeClass: "labs" },
      { id: "col1", key: "imaging", label: "Imágenes Alteraciones", icon: "🩻", badgeClass: "imaging" },
      { id: "col2", key: "criteria", label: "Criterios Dx", icon: "📋", badgeClass: "criteria" },
      { id: "col3", key: "treatment", label: "Tratamiento", icon: "💊", badgeClass: "treatment" },
      { id: "col4", key: "complications", label: "Complicaciones", icon: "⚠️", badgeClass: "complications" }
    ],
    rows: [
      { id: "row-as", label: "Crisis Asmática Severa", icon: "🌬️", tag: "Broncoespasmo Agudo" },
      { id: "row-copde", label: "Exacerbación EPOC", icon: "🫁", tag: "Falla Ventilatoria Crónica" },
      { id: "row-ana", label: "Anafilaxia Respiratoria", icon: "⚡", tag: "Colapso Inmune Sistémico" }
    ],
    tokens: [
      {
        id: "tok-as-labs",
        rowId: "row-as",
        colIndex: 0,
        text: "Gases arteriales iniciales con alcalosis respiratoria e hipoxemia; la «normalización» o elevación de PaCO2 (>40-45 mmHg) alerta fatiga muscular inminente",
        mismatchNote: "La pseudo-normalización de PaCO2 en asma grave es un signo de alarma roja de agotamiento diafragmático."
      },
      {
        id: "tok-as-img",
        rowId: "row-as",
        colIndex: 1,
        text: "Radiografía de tórax normal o con hiperinsuflación limpia bilateral; útil principalmente para descartar neumotórax o neumomediastino como complicación",
        mismatchNote: "La Rx de tórax en crisis asmática suele ser normal y se reserva para descartar barotrauma."
      },
      {
        id: "tok-as-crit",
        rowId: "row-as",
        colIndex: 2,
        text: "Criterios GINA de crisis casi fatal: Disnea en reposo, imposibilidad de completar frases, PEF o VEF1 <50% del predicho, taquipnea >30 rpm y uso de accesorios",
        mismatchNote: "Los criterios GINA categorizan la severidad del ataque asmático agudo."
      },
      {
        id: "tok-as-tx",
        rowId: "row-as",
        colIndex: 3,
        text: "Salbutamol nebulizado continuo + Bromuro de Ipratropio + Corticoides sistémicos (Metilprednisolona/Hidrocortisona IV o Prednisona oral) ± Sulfato de Magnesio IV",
        mismatchNote: "SABA + Ipratropio + corticoides sistémicos tempranos constituyen el pilar de la crisis asmática."
      },
      {
        id: "tok-as-comp",
        rowId: "row-as",
        colIndex: 4,
        text: "Tórax silente (ausencia de sibilancias por colapso de flujo), paro respiratorio hipercápnico, neumotórax a tensión y muerte por asfixia",
        mismatchNote: "El tórax silente por atrapamiento aéreo crítico es la complicación terminal del asma refractario."
      },
      {
        id: "tok-ce-labs",
        rowId: "row-copde",
        colIndex: 0,
        text: "Gasometría arterial con acidosis respiratoria hipercápnica aguda descompensada (PaCO2 >50 mmHg y pH <7.35) con retención crónica de bicarbonato (HCO3 alto)",
        mismatchNote: "La acidosis hipercápnica sobre una hipercapnia crónica compensada es el laboratorio típico de exacerbación de EPOC."
      },
      {
        id: "tok-ce-img",
        rowId: "row-copde",
        colIndex: 1,
        text: "Rx de tórax con aplanamiento diafragmático marcado, aumento de espacios intercostales, hiperclaridad retroesternal y descarte de consolidación neumónica",
        mismatchNote: "Los signos marcados de atrapamiento crónico con silueta cardíaca en gota caracterizan al EPOC."
      },
      {
        id: "tok-ce-crit",
        rowId: "row-copde",
        colIndex: 2,
        text: "Criterios de Anthonisen: Presencia de los 3 síntomas cardinales (aumento de disnea, incremento de volumen del esputo y mayor purulencia del mismo)",
        mismatchNote: "La clasificación de Anthonisen define las exacerbaciones de EPOC e indica si se requieren antibióticos."
      },
      {
        id: "tok-ce-tx",
        rowId: "row-copde",
        colIndex: 3,
        text: "Oxigenoterapia con titulación estricta a meta SpO2 88-92% (Venturi) + SABA/SAMA + Prednisona 40 mg/día por 5 días + Antibiótico (Amoxicilina/Clavulánico o Macrólido)",
        mismatchNote: "Oxígeno controlado (meta 88-92%) y corticoides por solo 5 días es la conducta específica en EPOC."
      },
      {
        id: "tok-ce-comp",
        rowId: "row-copde",
        colIndex: 4,
        text: "Encefalopatía hipercápnica (narcosis por CO2 inducida por O2 excesivo), necesidad de VMNI, falla cardíaca derecha aguda («cor pulmonale») y dependencia de VM",
        mismatchNote: "La narcosis hipercápnica y el requerimiento de ventilación no invasiva (VMNI) complican la crisis de EPOC."
      },
      {
        id: "tok-an-labs",
        rowId: "row-ana",
        colIndex: 0,
        text: "Elevación transitoria de Triptasa sérica total tomada entre 30 min y 2 horas del inicio (marcador de desgranulación masiva de mastocitos e histamina)",
        mismatchNote: "La elevación de triptasa sérica confirma biológicamente la activación y desgranulación anafiláctica."
      },
      {
        id: "tok-an-img",
        rowId: "row-ana",
        colIndex: 1,
        text: "Laringoscopia o visualización directa de edema supraglótico marcado con obstrucción inminente de la vía aérea superior (edema de cuerdas y epiglotis)",
        mismatchNote: "El edema angioneurótico laríngeo con obstrucción inspiratoria es el hallazgo físico de anafilaxia respiratoria."
      },
      {
        id: "tok-an-crit",
        rowId: "row-ana",
        colIndex: 2,
        text: "Criterios NIAID/WAO: Inicio agudo (minutos) de afectación mucocutánea (urticaria/angioedema) + al menos compromiso respiratorio o hipotensión arterial",
        mismatchNote: "Los criterios del NIAID/WAO establecen el diagnóstico clínico inmediato de la anafilaxia."
      },
      {
        id: "tok-an-tx",
        rowId: "row-ana",
        colIndex: 3,
        text: "Adrenalina (Epinefrina) 0.3-0.5 mg intramuscular en cara anterolateral del muslo (inmediata, sin demoras) + Fluidoterapia agresiva con cristaloides + Posición supina",
        mismatchNote: "La adrenalina IM en el muslo es el único fármaco de primera línea capaz de salvar la vida en anafilaxia."
      },
      {
        id: "tok-an-comp",
        rowId: "row-ana",
        colIndex: 4,
        text: "Asfixia por cierre glótico completo (estridor fatal), shock distributivo distributivo-vasopléjico refractario y reacciones bifásicas tardías (hasta 72h)",
        mismatchNote: "El colapso de la vía aérea superior y el shock refractario por vasodilatación son las complicaciones de anafilaxia."
      }
    ]
  },
  vasc: {
    id: "vasc",
    title: "Manejo de Emergencias Cardiovasculares Hipertensivas",
    subtitle: "Contraste terapéutico: Disección Aórtica Aguda vs EAP Hipertensivo vs Feocromocitoma",
    pearl: "La Disección Aórtica Aguda exige control hemodinámico ultra-rápido («anti-impulso») con Betabloqueantes IV (Esmolol/Labetalol) antes de vasodilatadores para bajar FC <60 lpm y PAS <120 mmHg; el EAP Hipertensivo se trata con Nitroglicerina IV a dosis altas + Furosemida y VMNI; mientras que el Feocromocitoma exige bloqueo alfa-adrenérgico previo obligatorio (Fenoxibenzamina/Doxazosina) antes de cualquier betabloqueante.",
    columns: [
      { id: "col0", key: "labs", label: "Labs Alteraciones", icon: "🔬", badgeClass: "labs" },
      { id: "col1", key: "imaging", label: "Imágenes Alteraciones", icon: "🩻", badgeClass: "imaging" },
      { id: "col2", key: "criteria", label: "Criterios Dx", icon: "📋", badgeClass: "criteria" },
      { id: "col3", key: "treatment", label: "Tratamiento", icon: "💊", badgeClass: "treatment" },
      { id: "col4", key: "complications", label: "Complicaciones", icon: "⚠️", badgeClass: "complications" }
    ],
    rows: [
      { id: "row-ad", label: "Disección Aórtica (A)", icon: "💔", tag: "Emergencia Quirúrgica" },
      { id: "row-eap", label: "EAP Hipertensivo", icon: "🫁", tag: "Falla Izquierda Aguda" },
      { id: "row-pheo", label: "Crisis Feocromocitoma", icon: "⚡", tag: "Tormenta Catecolaminérgica" }
    ],
    tokens: [
      {
        id: "tok-ad-labs",
        rowId: "row-ad",
        colIndex: 0,
        text: "Dímero-D extremadamente elevado (>1600 ng/mL por ruptura de media arterial) con caída aguda de hematocrito o elevación de creatinina si hay malperfusión renal",
        mismatchNote: "Dímero D muy elevado por la falsa luz disecada y marcadores de isquemia visceral señalan disección."
      },
      {
        id: "tok-ad-img",
        rowId: "row-ad",
        colIndex: 1,
        text: "Angio-TAC de aorta toraco-abdominal con flap intimal visible separando la verdadera luz de la falsa luz; Eco transesofágico con regurgitación aórtica masiva",
        mismatchNote: "La visualización del flap intimal en la Angio-TAC aórtica es el gold standard de disección."
      },
      {
        id: "tok-ad-crit",
        rowId: "row-ad",
        colIndex: 2,
        text: "Clasificación de Stanford: Tipo A (compromiso de aorta ascendente requiriendo cirugía de urgencia) versus Tipo B (aorta descendente)",
        mismatchNote: "La clasificación de Stanford norma la conducta quirúrgica vs médica en disección aórtica."
      },
      {
        id: "tok-ad-tx",
        rowId: "row-ad",
        colIndex: 3,
        text: "Terapia médica «anti-impulso»: Esmolol o Labetalol IV primero (meta FC <60 lpm) + Nitroprusiato (meta PAS 100-120 mmHg) + Cirugía abierta inmediata (Stanford A)",
        mismatchNote: "Frenar la contractilidad cardíaca con betabloqueantes antes de vasodilatar es la regla inviolable de la disección."
      },
      {
        id: "tok-ad-comp",
        rowId: "row-ad",
        colIndex: 4,
        text: "Hemopericardio con taponamiento cardíaco súbito, shock hipovolémico por rotura libre al mediastino/pleura, o ictus isquémico por oclusión de carótidas",
        mismatchNote: "El hemopericardio agudo y la rotura de la aorta ascendente son las causas de muerte en Stanford A."
      },
      {
        id: "tok-eap-labs",
        rowId: "row-eap",
        colIndex: 0,
        text: "Elevación masiva de BNP (>400-500 pg/mL) o NT-proBNP (>900-1800 pg/mL) por sobrecarga volumétrica y distensión transmural aguda del ventrículo izquierdo",
        mismatchNote: "Péptidos natriuréticos desproporcionadamente elevados traducen la congestión pulmonar del EAP."
      },
      {
        id: "tok-eap-img",
        rowId: "row-eap",
        colIndex: 1,
        text: "Rx de tórax con infiltrado alveolar en «alas de mariposa», edema peribronquial y líneas B de Kerley; Ecografía pulmonar con múltiples líneas B coalescentes",
        mismatchNote: "El infiltrado en alas de mariposa y las líneas B ecográficas son las imágenes cardinales del EAP."
      },
      {
        id: "tok-eap-crit",
        rowId: "row-eap",
        colIndex: 2,
        text: "Criterios ESC de Insuficiencia Cardíaca Aguda / Emergencia Hipertensiva: PAS severamente elevada (>180/110 mmHg) + falla respiratoria hipoxémica con estertores húmedos",
        mismatchNote: "La crisis hipertensiva con edema alveolar bilateral define la emergencia hipertensiva con EAP."
      },
      {
        id: "tok-eap-tx",
        rowId: "row-eap",
        colIndex: 3,
        text: "Vasodilatadores venosos y arteriales a dosis altas (Nitroglicerina IV continua) + VMNI (CPAP/BiPAP) + Diuréticos de asa (Furosemida IV a dosis moderada)",
        mismatchNote: "Nitroglicerina a dosis agresivas para reducir poscarga y precarga combinada con VMNI es el tratamiento del EAP."
      },
      {
        id: "tok-eap-comp",
        rowId: "row-eap",
        colIndex: 4,
        text: "Falla respiratoria hipoxémica severa con necesidad de intubación orotraqueal, acidosis metabólica láctica por hipoperfusión y muerte por asfixia alveolar",
        mismatchNote: "La inundación alveolar masiva y la fatiga muscular respiratoria complican el EAP hipertensivo."
      },
      {
        id: "tok-ph-labs",
        rowId: "row-pheo",
        colIndex: 0,
        text: "Metanefrinas libres fraccionadas en plasma o metanefrinas fraccionadas en orina de 24 horas elevadas >3-4 veces por encima del límite superior normal",
        mismatchNote: "Las metanefrinas plasmáticas u urinarias altas son el estándar bioquímico del feocromocitoma."
      },
      {
        id: "tok-ph-img",
        rowId: "row-pheo",
        colIndex: 1,
        text: "TAC abdominal o RMN con contraste que demuestra masa suprarrenal hipervascular heterogénea (o gammagrafía con 123I-MIBG / PET-TAC 68Ga-DOTATATE)",
        mismatchNote: "La masa suprarrenal captante en TAC/RMN o MIBG localiza el tumor productor de catecolaminas."
      },
      {
        id: "tok-ph-crit",
        rowId: "row-pheo",
        colIndex: 2,
        text: "Tríada clásica de paroxismos hipertensivos: Cefalea intensa + diaforesis profusa episódica + taquicardia/palpitaciones asociada a crisis de HTA severa",
        mismatchNote: "La tríada de cefalea, diaforesis y palpitaciones paroxísticas define la sospecha de feocromocitoma."
      },
      {
        id: "tok-ph-tx",
        rowId: "row-pheo",
        colIndex: 3,
        text: "Bloqueo ALFA-adrenérgico primero e imperativo (Fenoxibenzamina o Doxazosina) por ≥10-14 días; luego y SOLO DESPUÉS se adiciona Betabloqueante para la taquicardia",
        mismatchNote: "¡Regla clínica de oro!: Nunca dar betabloqueantes solos sin bloqueo alfa previo para evitar crisis vasoconstrictora mortal."
      },
      {
        id: "tok-ph-comp",
        rowId: "row-pheo",
        colIndex: 4,
        text: "Crisis hipertensiva maligna por bloqueo beta aislado con estimulación alfa desinhibida, miocardiopatía por estrés (Takotsubo), ACV hemorrágico o arritmias ventriculares",
        mismatchNote: "El vasoespasmo fulminante coronario o cerebral por estimulación alfa sin oposición complica el mal manejo del feocromocitoma."
      }
    ]
  }
};

let g04CurrentScenarioId = 'cardio';
let g04Deck = [];
let g04CurrentCard = null;
let g04PatientSlots = {};
let g04StreakCount = 1;
let g04TotalAttempts = 0;
let g04CorrectPlacements = 0;

function renderGame04(stage) {
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
  g04PatientSlots = {};
  g04StreakCount = 1;
  g04TotalAttempts = 0;
  g04CorrectPlacements = 0;
  g04Deck = shuffleArray([...scen.tokens]);
  g04CurrentCard = g04Deck.shift() || null;

  const container = document.createElement("div");
  container.className = "cip-wrapper";

  container.innerHTML = `
    <!-- BARRA SUPERIOR CON CONTROLES -->
    <header class="cip-top-bar">
      <div class="cip-title-group">
        <h1>
          Management Script Matrix
          <span class="badge-cip" style="background:rgba(139,92,246,0.18); border-color:rgba(139,92,246,0.45); color:#c4b5fd;">
            Juego 04 · Planes Modelo
          </span>
        </h1>
        <p>Construye los 3 planes de manejo clínico enviando cada ficha con 1 solo clic.</p>
      </div>

      <div class="cip-top-actions">
        <div class="scenario-nav">
          <button class="scenario-pill ${g04CurrentScenarioId === 'cardio' ? 'active' : ''}" style="${g04CurrentScenarioId === 'cardio' ? 'background:#7c3aed;' : ''}" id="g04-btn-scen-cardio">🫀 Cardio (Torácico)</button>
          <button class="scenario-pill ${g04CurrentScenarioId === 'resp' ? 'active' : ''}" style="${g04CurrentScenarioId === 'resp' ? 'background:#7c3aed;' : ''}" id="g04-btn-scen-resp">🫁 Urgencias Respiratorias</button>
          <button class="scenario-pill ${g04CurrentScenarioId === 'vasc' ? 'active' : ''}" style="${g04CurrentScenarioId === 'vasc' ? 'background:#7c3aed;' : ''}" id="g04-btn-scen-vasc">⚡ Emergencias Vasculares</button>
        </div>

        <button class="icon-circle-btn" id="g04-btn-sound" title="Alternar Sonido">🔊</button>
        <button class="icon-circle-btn" id="g04-btn-reset" title="Reiniciar Escenario">↺</button>
      </div>
    </header>

    <!-- CINTA DE MÉTRICAS Y PROGRESO -->
    <section class="stats-ribbon">
      <div class="stats-counters">
        <div class="stat-box">
          <span class="stat-label">Fichas Asignadas</span>
          <span class="stat-value highlight" style="color:#a78bfa;" id="g04-stat-slots">0 / 15</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Racha Terapéutica</span>
          <span class="stat-value streak" id="g04-stat-streak">🔥 x1</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Precisión</span>
          <span class="stat-value accuracy" id="g04-stat-acc">100%</span>
        </div>
      </div>

      <div class="deck-progress-bar-container">
        <div style="display:flex; justify-content:space-between; font-size:10px; color:#94a3b8; font-family:var(--font-mono);">
          <span>Progreso de Baraja</span>
          <span id="g04-deck-progress-text">0%</span>
        </div>
        <div class="deck-progress-bar-track">
          <div class="deck-progress-bar-fill purple" id="g04-deck-progress-fill"></div>
        </div>
      </div>
    </section>

    <!-- EL DESPACHADOR DE FICHAS 1-POR-1 -->
    <section class="active-card-dealer purple-theme" id="g04-active-card-dealer">
      <div class="card-top-row">
        <div class="card-badge-group">
          <span class="dimension-pill" id="g04-dim-badge">
            <span id="g04-dim-icon">💊</span>
            <span id="g04-dim-label">Dimensión</span>
          </span>
          <span class="card-counter-tag" id="g04-card-counter">Ficha 1 de 15</span>
        </div>

        <div class="card-actions-top">
          <button class="skip-card-btn" id="g04-btn-skip" title="Poner esta ficha al final del mazo">
            <span>⏭️ Dejar para luego</span>
          </button>
        </div>
      </div>

      <div class="card-content-text" id="g04-card-text">
        Cargando decisión terapéutica...
      </div>

      <div class="card-feedback-box" id="g04-card-feedback"></div>

      <div class="dispatch-prompt">
        <span>👉 ¿A qué Plan de Manejo Modelo pertenece esta conducta? (1 clic):</span>
      </div>

      <div class="dispatch-buttons-grid" id="g04-dispatch-buttons"></div>
    </section>

    <!-- LOS 3 PLANES MODELO COMPARADOS SIMULTÁNEAMENTE -->
    <main class="models-container" id="g04-models-container"></main>

    <!-- MODAL DE VICTORIA -->
    <dialog class="modal-dialog" id="g04-victory-dialog" style="border-color:#7c3aed; box-shadow:0 0 30px rgba(124,58,237,0.3);">
      <div style="text-align:center; padding: 10px 0 16px;">
        <div style="font-size:36px; margin-bottom:4px;">🏆</div>
        <h2 style="font-size:22px; font-weight:800; color:#ffffff;">¡Planes de Manejo Modelo Completados!</h2>
        <p style="font-size:13px; color:#94a3b8; margin-top:4px;">
          Has integrado con precisión diagnóstica y terapéutica los 3 Management Scripts.
        </p>
      </div>

      <div style="background:#1e1b4b; border:1px solid #334155; border-radius:12px; padding:12px; margin-bottom:16px;">
        <h4 style="font-size:12px; font-weight:800; color:#c4b5fd; text-transform:uppercase; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <span>🔍 Síntesis de Conducta Terapéutica & Criterios Clave</span>
        </h4>
        <p id="g04-victory-pearl-text" style="font-size:12.5px; color:#cbd5e1; line-height:1.45;"></p>
      </div>

      <div style="overflow-x:auto;">
        <table class="summary-matrix-table" id="g04-victory-summary-table"></table>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button class="skip-card-btn" id="g04-btn-victory-replay" style="font-size:12px; padding:8px 14px;">↺ Jugar de Nuevo</button>
        <button class="skip-card-btn" id="g04-btn-victory-next" style="font-size:12px; padding:8px 14px; background:#7c3aed; color:#fff; border-color:#7c3aed;">Siguiente Escenario →</button>
      </div>
    </dialog>
  `;

  stage.appendChild(container);

  // Wire controls
  document.getElementById("g04-btn-scen-cardio").addEventListener("click", () => switchG04Scenario("cardio"));
  document.getElementById("g04-btn-scen-resp").addEventListener("click", () => switchG04Scenario("resp"));
  document.getElementById("g04-btn-scen-vasc").addEventListener("click", () => switchG04Scenario("vasc"));

  document.getElementById("g04-btn-skip").addEventListener("click", skipG04ActiveCard);
  document.getElementById("g04-btn-reset").addEventListener("click", () => {
    renderGame04(stage);
    showToast("info", "Escenario reiniciado.");
  });

  document.getElementById("g04-btn-sound").addEventListener("click", (e) => {
    labSoundEnabled = !labSoundEnabled;
    e.target.textContent = labSoundEnabled ? '🔊' : '🔇';
    showToast("info", labSoundEnabled ? "Sonido activado" : "Sonido silenciado");
  });

  document.getElementById("g04-btn-victory-replay").addEventListener("click", () => {
    document.getElementById("g04-victory-dialog").close();
    renderGame04(stage);
  });

  document.getElementById("g04-btn-victory-next").addEventListener("click", () => {
    document.getElementById("g04-victory-dialog").close();
    const scenKeys = Object.keys(GAME04_SCENARIOS);
    const nextIdx = (scenKeys.indexOf(g04CurrentScenarioId) + 1) % scenKeys.length;
    switchG04Scenario(scenKeys[nextIdx]);
  });

  renderG04ModelsLayout();
  updateG04ActiveCardUI();
  updateG04StatsUI();
}

function switchG04Scenario(scenId) {
  g04CurrentScenarioId = scenId;
  const stage = document.getElementById("lab-stage");
  stage.innerHTML = "";
  renderGame04(stage);
  showToast("info", `Cargado: ${GAME04_SCENARIOS[scenId].title}`);
}

function renderG04ModelsLayout() {
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
  const container = document.getElementById("g04-models-container");
  if (!container) return;
  container.innerHTML = "";

  scen.rows.forEach(row => {
    const pCard = document.createElement("div");
    pCard.className = "patient-model-card";
    pCard.id = `g04-patient-card-${row.id}`;

    const filledCount = scen.columns.filter((_, cIdx) => g04PatientSlots[`${row.id}_${cIdx}`]).length;

    pCard.innerHTML = `
      <header class="patient-header">
        <div class="patient-title-wrap">
          <div class="patient-avatar">${row.icon}</div>
          <div>
            <h3 class="patient-name-h3">${row.label}</h3>
            <span class="patient-tag">${row.tag}</span>
          </div>
        </div>
        <span class="patient-badge-count purple" id="g04-badge-${row.id}">${filledCount} / 5</span>
      </header>

      <div class="patient-slots-list">
        ${scen.columns.map((col, colIdx) => {
          const slotKey = `${row.id}_${colIdx}`;
          const placedTokId = g04PatientSlots[slotKey];
          const placedTok = placedTokId ? scen.tokens.find(t => t.id === placedTokId) : null;
          const isFilled = !!placedTok;

          return `
            <div class="model-slot-item ${isFilled ? 'filled' : ''}" 
                 id="g04-slot-${slotKey}" 
                 data-slot-key="${slotKey}"
                 onclick="handleG04DirectSlotClick('${slotKey}')">
              <div class="slot-meta-row">
                <span class="slot-dimension-label ${col.badgeClass}">
                  ${col.icon} ${col.label}
                </span>
                <span class="slot-status-indicator">
                  ${isFilled ? '✓ Confirmado' : 'Pendiente'}
                </span>
              </div>
              <div class="slot-body-content">
                ${isFilled ? `
                  <p class="slot-finding-text">${placedTok.text}</p>
                ` : `
                  <div class="slot-empty-placeholder">
                    <span>Esperando conducta...</span>
                    <span class="slot-tap-cta" style="color:#a78bfa;">👈 Enviar aquí</span>
                  </div>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.appendChild(pCard);
  });

  renderG04DispatchButtons();
}

function renderG04DispatchButtons() {
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
  const grid = document.getElementById("g04-dispatch-buttons");
  if (!grid) return;
  grid.innerHTML = "";

  scen.rows.forEach(row => {
    const filledCount = scen.columns.filter((_, cIdx) => g04PatientSlots[`${row.id}_${cIdx}`]).length;
    const isComplete = filledCount === 5;

    const btn = document.createElement("button");
    btn.className = `dispatch-patient-btn purple-btn ${isComplete ? 'completed' : ''}`;
    btn.id = `g04-btn-dispatch-${row.id}`;
    btn.innerHTML = `
      <span class="p-icon">${row.icon}</span>
      <span class="p-name">${row.label}</span>
      <span class="p-progress">${filledCount}/5 completado</span>
    `;
    btn.addEventListener("click", () => dispatchG04ActiveCard(row.id));
    grid.appendChild(btn);
  });
}

function updateG04ActiveCardUI() {
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
  const dealer = document.getElementById("g04-active-card-dealer");
  if (!dealer) return;

  if (!g04CurrentCard) {
    dealer.style.display = "none";
    checkG04VictoryCondition();
    return;
  }

  dealer.style.display = "flex";
  dealer.classList.remove("shake", "success-flash");

  const col = scen.columns[g04CurrentCard.colIndex];
  const dimBadge = document.getElementById("g04-dim-badge");
  dimBadge.className = `dimension-pill ${col.badgeClass}`;
  document.getElementById("g04-dim-icon").textContent = col.icon;
  document.getElementById("g04-dim-label").textContent = col.label;

  const totalTokens = scen.tokens.length;
  const completedCount = Object.keys(g04PatientSlots).length;
  document.getElementById("g04-card-counter").textContent = `Ficha ${completedCount + 1} de ${totalTokens}`;
  document.getElementById("g04-card-text").textContent = g04CurrentCard.text;

  highlightG04ActiveDimension(g04CurrentCard.colIndex);
}

function highlightG04ActiveDimension(colIdx) {
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
  document.querySelectorAll(".model-slot-item").forEach(slot => {
    slot.classList.remove("active-dimension-target", "purple");
  });

  scen.rows.forEach(row => {
    const slotKey = `${row.id}_${colIdx}`;
    if (!g04PatientSlots[slotKey]) {
      const el = document.getElementById(`g04-slot-${slotKey}`);
      if (el) el.classList.add("active-dimension-target", "purple");
    }
  });
}

function dispatchG04ActiveCard(targetRowId) {
  if (!g04CurrentCard) return;
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];

  g04TotalAttempts++;
  const isCorrect = (g04CurrentCard.rowId === targetRowId);
  const targetSlotKey = `${targetRowId}_${g04CurrentCard.colIndex}`;

  if (isCorrect) {
    g04CorrectPlacements++;
    g04StreakCount++;
    playLabSuccessSound();

    g04PatientSlots[targetSlotKey] = g04CurrentCard.id;

    const dealer = document.getElementById("g04-active-card-dealer");
    dealer.classList.add("success-flash");

    showToast("success", `✓ ¡Correcto! Asignado a ${scen.rows.find(r => r.id === targetRowId).label}`);
    hideG04CardFeedback();

    setTimeout(() => {
      renderG04ModelsLayout();
      if (g04Deck.length > 0) {
        g04CurrentCard = g04Deck.shift();
      } else {
        g04CurrentCard = null;
      }
      updateG04ActiveCardUI();
      updateG04StatsUI();
    }, 220);

  } else {
    g04StreakCount = 1;
    playLabErrorSound();

    const dealer = document.getElementById("g04-active-card-dealer");
    dealer.classList.remove("shake");
    void dealer.offsetWidth;
    dealer.classList.add("shake");

    showG04CardFeedback(g04CurrentCard.mismatchNote);
    showToast("error", "✗ No coincide con ese plan de manejo");
    updateG04StatsUI();
  }
}

function handleG04DirectSlotClick(slotKey) {
  if (!g04CurrentCard) return;
  const [rowId, colIdxStr] = slotKey.split('_');
  const colIdx = parseInt(colIdxStr, 10);

  if (colIdx === g04CurrentCard.colIndex) {
    dispatchG04ActiveCard(rowId);
  } else {
    const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
    showToast("error", `Esta ficha corresponde a: ${scen.columns[g04CurrentCard.colIndex].label}`);
  }
}

function skipG04ActiveCard() {
  if (!g04CurrentCard || g04Deck.length === 0) {
    showToast("info", "No hay más fichas en espera en la baraja.");
    return;
  }
  g04Deck.push(g04CurrentCard);
  g04CurrentCard = g04Deck.shift();
  hideG04CardFeedback();
  updateG04ActiveCardUI();
  showToast("info", "Ficha postergada para el final del mazo.");
}

function showG04CardFeedback(note) {
  const box = document.getElementById("g04-card-feedback");
  if (!box) return;
  box.style.display = "block";
  box.innerHTML = `<strong>💡 Racional Terapéutico:</strong> ${note}`;
}

function hideG04CardFeedback() {
  const box = document.getElementById("g04-card-feedback");
  if (!box) return;
  box.style.display = "none";
  box.innerHTML = "";
}

function updateG04StatsUI() {
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
  const placedCount = Object.keys(g04PatientSlots).length;
  const totalTokens = scen.tokens.length;

  const slotEl = document.getElementById("g04-stat-slots");
  const streakEl = document.getElementById("g04-stat-streak");
  const accEl = document.getElementById("g04-stat-acc");

  if (slotEl) slotEl.textContent = `${placedCount} / ${totalTokens}`;
  if (streakEl) streakEl.textContent = `🔥 x${g04StreakCount}`;

  const acc = g04TotalAttempts > 0 ? Math.round((g04CorrectPlacements / g04TotalAttempts) * 100) : 100;
  if (accEl) accEl.textContent = `${acc}%`;

  const pct = Math.round((placedCount / totalTokens) * 100);
  const progText = document.getElementById("g04-deck-progress-text");
  const progFill = document.getElementById("g04-deck-progress-fill");
  if (progText) progText.textContent = `${pct}%`;
  if (progFill) progFill.style.width = `${pct}%`;
}

function checkG04VictoryCondition() {
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
  const totalTokens = scen.tokens.length;
  const placedCount = Object.keys(g04PatientSlots).length;

  if (placedCount === totalTokens) {
    playLabVictorySound();
    openG04VictoryModal();
  }
}

function openG04VictoryModal() {
  const scen = GAME04_SCENARIOS[g04CurrentScenarioId];
  const dialog = document.getElementById("g04-victory-dialog");
  document.getElementById("g04-victory-pearl-text").textContent = scen.pearl;

  const table = document.getElementById("g04-victory-summary-table");
  table.innerHTML = `
    <thead>
      <tr>
        <th style="width:140px;">Dimensión</th>
        ${scen.rows.map(r => `<th>${r.icon} ${r.label}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${scen.columns.map((col, cIdx) => `
        <tr>
          <td class="dim-header purple">${col.icon} ${col.label}</td>
          ${scen.rows.map(r => {
            const tok = scen.tokens.find(t => t.rowId === r.id && t.colIndex === cIdx);
            return `<td>${tok ? tok.text : ''}</td>`;
          }).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;

  dialog.showModal();
}


// ========================================================
// JUEGO 05: SCRIPT CONCORDANCE TEST (SCT) · SLIDER -1.0 A +1.0
// ========================================================
const GAME05_SCENARIOS = {
  cardio: {
    id: "cardio",
    title: "Urgencias Cardiovasculares en Zona Gris",
    cases: [
      {
        id: "cardio-c1",
        vignette: "Varón de 62 años hipertenso con dolor torácico retroesternal atípico de 4 horas de evolución. El ECG de ingreso muestra ritmo sinusal sin supradesnivel evidente del ST, con depresión sutil de 0.5 mm en V5-V6.",
        hypothesis: "Síndrome Coronario Agudo (NSTEMI) de alto riesgo con indicación de coronariografía invasiva urgente (<24h).",
        finding: "La Troponina I ultrasensible seriada a las 2h resulta en 12 ng/L (normal <14 ng/L, por debajo del P99), pero con un ascenso del 35% respecto a su valor inicial de 8.8 ng/L.",
        expertVotes: { "-1.0": 0, "-0.5": 1, "0.0": 2, "+0.5": 9, "+1.0": 3 },
        modalOption: "+0.5",
        rationale: "Un delta relativo de ascenso >20-30% en troponina ultrasensible en las primeras horas, incluso estando aún por debajo del percentil 99, confiere un alto valor predictivo positivo para daño miocárdico agudo en evolución. El 60% de los cardiólogos votó (+0.5) y un 20% (+1.0), respaldando fuertemente la sospecha de NSTEMI y la estrategia invasiva."
      },
      {
        id: "cardio-c2",
        vignette: "Mujer de 48 años sin antecedentes médicos previos que acude a urgencias por disnea súbita y taquicardia sinusal tras un vuelo internacional de 6 horas. La escala de Wells arroja 3 puntos (probabilidad clínica intermedia de TEP).",
        hypothesis: "Descartar con seguridad Tromboembolismo Pulmonar y dar de alta sin realizar Angio-TAC.",
        finding: "El Dímero-D por técnica cuantitativa ELISA de alta sensibilidad retorna en 420 ng/mL (valor de corte convencional <500 ng/mL).",
        expertVotes: { "-1.0": 1, "-0.5": 1, "0.0": 1, "+0.5": 4, "+1.0": 8 },
        modalOption: "+1.0",
        rationale: "En pacientes con probabilidad intermedia/baja no alta por Wells, un Dímero-D ELISA <500 ng/mL tiene un Valor Predictivo Negativo >99%. La mayoría del panel (53% en +1.0 y 27% en +0.5) concuerda en que este resultado confirma la seguridad del descarte sin exponer a la paciente a radiación ni contraste intravenoso."
      },
      {
        id: "cardio-c3",
        vignette: "Joven de 26 años con dolor torácico retroesternal pleurítico y frote pericárdico auscultable dos semanas después de un catarro viral. El ecocardiograma transtorácico no muestra alteraciones de la motilidad y solo un despegamiento pericárdico mínimo sin compromiso hemodinámico.",
        hypothesis: "Manejo ambulatorio con AINEs a dosis plenas + Colchicina y alta a domicilio.",
        finding: "La Troponina I ultrasensible de control se eleva discretamente a 0.08 ng/mL (límite superior normal 0.04 ng/mL).",
        expertVotes: { "-1.0": 7, "-0.5": 6, "0.0": 2, "+0.5": 0, "+1.0": 0 },
        modalOption: "-1.0",
        rationale: "La elevación de biomarcadores de necrosis miocárdica reclasifica el cuadro a Miopericarditis. Aunque la función ventricular sea normal, la afectación miocárdica es un criterio mandatorio de ingreso hospitalario según las guías ESC para monitorización continua de arritmias ventriculares y reposo. Por ello, el 87% de los expertos rechazó el alta ambulatoria (-1.0 o -0.5)."
      }
    ]
  },
  sepsis: {
    id: "sepsis",
    title: "Sepsis & Infectología en Zona Gris",
    cases: [
      {
        id: "sepsis-c1",
        vignette: "Anciano de 78 años con tos y fiebre. En urgencias presenta crépitos basales derechos. Su score CURB-65 suma solo 1 punto (edad >65 años; urea 30 mg/dL, FR 22 rpm, PA 128/78 mmHg, lúcido y orientado).",
        hypothesis: "Tratamiento ambulatorio en domicilio con antibióticos orales (Amoxicilina/Clavulánico).",
        finding: "El paciente vive solo en un área rural sin transporte, y la pulsioximetría al aire ambiente se encuentra en 91% (su basal informado es 95%).",
        expertVotes: { "-1.0": 9, "-0.5": 5, "0.0": 1, "+0.5": 0, "+1.0": 0 },
        modalOption: "-1.0",
        rationale: "Las guías de práctica clínica especifican que factores sociales de vulnerabilidad (vivir solo, falta de red de apoyo) y la presencia de hipoxemia (SpO2 ≤92%) anulan la recomendación de manejo en casa del CURB-65 numérico bajo. El 93% de los especialistas votó en contra del alta domiciliaria."
      },
      {
        id: "sepsis-c2",
        vignette: "Paciente de 34 años con síndrome meníngeo agudo (fiebre alta, cefalea punzante y rigidez de nuca marcada).",
        hypothesis: "Realizar Punción Lumbar (PL) diagnóstica antes de iniciar antibióticos para no alterar los cultivos del LCR.",
        finding: "Al examen neurológico se detecta midriasis arreactiva izquierda y hemiparesia derecha sutil, requiriendo una TAC de cráneo previa que demorará al menos 90 minutos.",
        expertVotes: { "-1.0": 0, "-0.5": 0, "0.0": 0, "+0.5": 2, "+1.0": 13 },
        modalOption: "+1.0",
        rationale: "Ante focalidad neurológica que exige neuroimagen previa a la PL, la regla de oro inviolable es administrar Ceftriaxona + Vancomicina + Dexametasona de forma inmediata sin esperar la TAC. Retrasar el antibiótico en meningitis bacteriana aumenta exponencialmente la mortalidad cada hora. El 87% del panel seleccionó +1.0 (iniciar antibiótico previo)."
      },
      {
        id: "sepsis-c3",
        vignette: "Paciente oncológico en tratamiento con quimioterapia que acude con neutropenia severa (recuento absoluto de neutrófilos: 320/µL) y fiebre de 38.6°C sin foco clínico aparente.",
        hypothesis: "Iniciar monoterapia antipseudomónica empírica estándar con Cefepima IV a dosis plena.",
        finding: "La enfermera detecta eritema, calor y dolor a la palpación en el trayecto subcutáneo de su catéter venoso central implantado (Port-a-Cath).",
        expertVotes: { "-1.0": 0, "-0.5": 0, "0.0": 1, "+0.5": 3, "+1.0": 11 },
        modalOption: "+1.0",
        rationale: "Aunque la monoterapia antipseudomónica con betalactámico es el estándar inicial, la sospecha evidente de infección de catéter venoso es una indicación formal para añadir Vancomicina empírica inmediata para cobertura de estafilococos resistentes (MRSA / S. epidermidis). El 73% de los infectólogos votó +1.0."
      }
    ]
  },
  abdomen: {
    id: "abdomen",
    title: "Abdomen Agudo & Cirugía de Urgencias",
    cases: [
      {
        id: "abdomen-c1",
        vignette: "Mujer de 22 años con dolor en fosa ilíaca derecha de 18 horas de evolución, signo de Blumberg positivo y leucocitosis de 12.500 con neutrofilia del 82%.",
        hypothesis: "Trasladar de inmediato a quirófano para apendicectomía laparoscópica de urgencia sin más exámenes.",
        finding: "La paciente refiere retraso menstrual de 6 semanas y la prueba rápida de embarazo en orina (hCG) resulta POSITIVA.",
        expertVotes: { "-1.0": 10, "-0.5": 4, "0.0": 1, "+0.5": 0, "+1.0": 0 },
        modalOption: "-1.0",
        rationale: "Una prueba de embarazo positiva en una mujer joven con abdomen agudo exige descartar en primer lugar un Embarazo Ectópico mediante Ecografía Transvaginal y cuantificación de beta-hCG antes de cualquier intervención por presunta apendicitis. El 67% del panel votó -1.0 y el 27% -0.5."
      },
      {
        id: "abdomen-c2",
        vignette: "Varón de 55 años con antecedente de cirugía abdominal hace 10 años que consulta por cuadro obstructivo mecánico por bridas (vómitos, distensión y niveles hidroaéreos en Rx simple).",
        hypothesis: "Mantener manejo conservador no quirúrgico (sonda nasogástrica descompresiva, fluidoterapia y observación durante 48h).",
        finding: "El lactato sérico asciende a 3.8 mmol/L y el dolor abdominal se vuelve continuo, intenso y desproporcionado a la palpación.",
        expertVotes: { "-1.0": 13, "-0.5": 2, "0.0": 0, "+0.5": 0, "+1.0": 0 },
        modalOption: "-1.0",
        rationale: "El dolor continuo desproporcionado y la hiperlactatemia son signos de alarma máxima de sufrimiento de asa intestinal / estrangulación / isquemia mesentérica. Esta situación contraindica la continuación del tratamiento conservador y exige laparotomía o laparoscopia exploradora urgente. El 87% de los cirujanos votó -1.0."
      },
      {
        id: "abdomen-c3",
        vignette: "Mujer de 60 años con cólico biliar persistente, Murphy ecográfico positivo y colelitiasis litiásica impactada en el cuello vesicular.",
        hypothesis: "Proceder a colecistectomía laparoscópica temprana (<72h) de rutina sin colangiografía preoperatoria.",
        finding: "El laboratorio revela Fosfatasa Alcalina de 450 U/L, GGT 400 U/L y la ecografía reporta un colédoco dilatado a 11 mm.",
        expertVotes: { "-1.0": 0, "-0.5": 0, "0.0": 1, "+0.5": 4, "+1.0": 10 },
        modalOption: "+1.0",
        rationale: "La presencia de colédoco dilatado (>8-10 mm) asociado a colestasis marcada sitúa al paciente en alto riesgo de coledocolitiasis coexistente según las guías ASGE/WSES, requiriendo evaluación de la vía biliar principal (Colangio-RMN o CPRE/colangiografía intraoperatoria). El 66% votó +1.0 y el 27% +0.5."
      }
    ]
  }
};

let g05CurrentScenarioId = 'cardio';
let g05CurrentCaseIndex = 0;
let g05UserSliderValue = 0.0;
let g05SessionScores = [];

function renderGame05(stage) {
  const container = document.createElement("div");
  container.className = "cip-wrapper";

  const scen = GAME05_SCENARIOS[g05CurrentScenarioId];
  g05CurrentCaseIndex = 0;
  g05SessionScores = [];
  g05UserSliderValue = 0.0;

  container.innerHTML = `
    <!-- TOP BAR -->
    <header class="cip-top-bar">
      <div class="cip-title-group">
        <h1>
          Script Concordance Test (SCT)
          <span class="badge-cip" style="background:rgba(6,182,212,0.18); border-color:rgba(6,182,212,0.45); color:#67e8f9;">
            Juego 05 · Incertidumbre
          </span>
        </h1>
        <p>Evalúa cómo un nuevo dato clínico modifica la hipótesis diagnóstica o terapéutica inicial.</p>
      </div>

      <div class="cip-top-actions">
        <div class="scenario-nav">
          <button class="scenario-pill ${g05CurrentScenarioId === 'cardio' ? 'active' : ''}" style="${g05CurrentScenarioId === 'cardio' ? 'background:#0891b2;' : ''}" id="g05-btn-scen-cardio">🫀 Cardio (Urgencias)</button>
          <button class="scenario-pill ${g05CurrentScenarioId === 'sepsis' ? 'active' : ''}" style="${g05CurrentScenarioId === 'sepsis' ? 'background:#0891b2;' : ''}" id="g05-btn-scen-sepsis">🦠 Sepsis & Infecciosas</button>
          <button class="scenario-pill ${g05CurrentScenarioId === 'abdomen' ? 'active' : ''}" style="${g05CurrentScenarioId === 'abdomen' ? 'background:#0891b2;' : ''}" id="g05-btn-scen-abdomen">🔪 Abdomen Agudo</button>
        </div>

        <button class="icon-circle-btn" id="g05-btn-sound" title="Alternar Sonido">🔊</button>
        <button class="icon-circle-btn" id="g05-btn-reset" title="Reiniciar Escenario">↺</button>
      </div>
    </header>

    <!-- METRICS RIBBON -->
    <section class="stats-ribbon">
      <div class="stats-counters">
        <div class="stat-box">
          <span class="stat-label">Ítem Activo</span>
          <span class="stat-value highlight" style="color:#67e8f9;" id="g05-stat-item-num">1 / 3</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Concordancia Media</span>
          <span class="stat-value streak" style="color:#10b981;" id="g05-stat-mean-score">-- %</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Panel de Expertos</span>
          <span class="stat-value" style="color:#94a3b8; font-size:12px;">15 Especialistas</span>
        </div>
      </div>
      <div style="font-size:11px; color:#64748b; font-family:var(--font-mono);">
        Escala: <strong style="color:#ef4444;">-1.0</strong> (Invalida) a <strong style="color:#10b981;">+1.0</strong> (Confirma)
      </div>
    </section>

    <!-- TARJETA CENTRAL DE SCT -->
    <main class="sct-card" id="g05-sct-card">

      <!-- 1. CASO CLÍNICO / VIGNETTE -->
      <div class="vignette-box">
        <div class="box-header-title">
          <span>📋 Contexto Clínico Activo</span>
        </div>
        <div class="vignette-text" id="g05-vignette-text">
          Cargando caso clínico...
        </div>
      </div>

      <!-- 2. HIPÓTESIS INICIAL vs NUEVO DATO CLÍNICO -->
      <div class="sct-grid-contrast">
        <div class="hypothesis-box">
          <span class="contrast-badge hyp">💡 Hipótesis de Trabajo</span>
          <div class="contrast-text" id="g05-hypothesis-text">
            Cargando hipótesis...
          </div>
        </div>

        <div class="finding-box">
          <span class="contrast-badge find">⚡ Nuevo Dato / Hallazgo</span>
          <div class="contrast-text" id="g05-finding-text">
            Cargando nuevo hallazgo...
          </div>
        </div>
      </div>

      <!-- 3. SLIDER DE CONCORDANCIA (-1.0 A +1.0) -->
      <section class="slider-interactive-section" id="g05-slider-section">
        <div class="slider-header-prompt">
          ¿Cómo impacta este nuevo hallazgo sobre la <span class="accent">Hipótesis de Trabajo</span>?
        </div>

        <!-- INDICADOR NUMÉRICO FLOTANTE -->
        <div class="value-display-badge zero" id="g05-slider-value-badge">
          <span id="g05-slider-numeric-val">0.0</span>
          <span class="value-label-text" id="g05-slider-text-label">Sin Impacto (Neutro)</span>
        </div>

        <!-- TRACK DEL SLIDER -->
        <div class="slider-container">
          <input type="range" class="sct-slider" id="g05-sct-slider" min="-1.0" max="1.0" step="0.1" value="0.0">
        </div>

        <!-- BOTONES DE ANCLAJE RÁPIDO (-1.0, -0.5, 0.0, +0.5, +1.0) -->
        <div class="slider-scale-ticks">
          <button class="scale-preset-btn" data-val="-1.0">
            <span class="preset-val">-1.0</span>
            <span class="preset-desc">Descarta / Invalida</span>
          </button>
          <button class="scale-preset-btn" data-val="-0.5">
            <span class="preset-val">-0.5</span>
            <span class="preset-desc">Menos Probable</span>
          </button>
          <button class="scale-preset-btn active" data-val="0.0">
            <span class="preset-val">0.0</span>
            <span class="preset-desc">Neutro / No cambia</span>
          </button>
          <button class="scale-preset-btn" data-val="+0.5">
            <span class="preset-val">+0.5</span>
            <span class="preset-desc">Más Probable</span>
          </button>
          <button class="scale-preset-btn" data-val="+1.0">
            <span class="preset-val">+1.0</span>
            <span class="preset-desc">Confirma / Mandatorio</span>
          </button>
        </div>

        <!-- BOTÓN DE CONFIRMACIÓN -->
        <div class="confirm-btn-wrap">
          <button class="confirm-btn" id="g05-btn-confirm">
            <span>⚖️ Confirmar Juicio Clínico</span>
          </button>
        </div>
      </section>

      <!-- 4. PANEL DE REVELACIÓN DE EXPERTOS -->
      <section class="expert-revelation-panel" id="g05-expert-panel">
        <div class="revelation-top">
          <div class="concordance-score-wrap">
            <div class="score-circle" id="g05-score-circle">100%</div>
            <div>
              <div style="font-size:13px; font-weight:800; color:#ffffff;">Puntaje de Concordancia con Expertos</div>
              <div style="font-size:11px; color:#94a3b8;" id="g05-concordance-qualitative">Alineado con el consenso del panel</div>
            </div>
          </div>
          <button class="next-case-btn" id="g05-btn-next-case">Siguiente Caso →</button>
        </div>

        <!-- HISTOGRAMA DE VOTACIÓN DE EXPERTOS -->
        <div class="histogram-card">
          <div class="histogram-title">
            <span>Distribución de Respuestas (Panel de 15 Expertos)</span>
            <span style="font-family:var(--font-mono); color:#38bdf8;" id="g05-modal-expert-stat">Moda: +0.5 (60%)</span>
          </div>

          <div class="bars-distribution-row" id="g05-histogram-bars-row"></div>
        </div>

        <!-- EXPLICACIÓN CLÍNICA DEL CONSENSO -->
        <div class="expert-rationale-box" id="g05-expert-rationale-text"></div>
      </section>

    </main>
  `;

  stage.appendChild(container);

  // Wire controls
  document.getElementById("g05-btn-scen-cardio").addEventListener("click", () => switchG05Scenario("cardio"));
  document.getElementById("g05-btn-scen-sepsis").addEventListener("click", () => switchG05Scenario("sepsis"));
  document.getElementById("g05-btn-scen-abdomen").addEventListener("click", () => switchG05Scenario("abdomen"));

  const slider = document.getElementById("g05-sct-slider");
  slider.addEventListener("input", (e) => setG05SliderValue(e.target.value));

  document.querySelectorAll(".scale-preset-btn").forEach(btn => {
    btn.addEventListener("click", () => setG05SliderValue(btn.dataset.val));
  });

  document.getElementById("g05-btn-confirm").addEventListener("click", evaluateG05Concordance);
  document.getElementById("g05-btn-next-case").addEventListener("click", nextG05Case);

  document.getElementById("g05-btn-sound").addEventListener("click", (e) => {
    labSoundEnabled = !labSoundEnabled;
    e.target.textContent = labSoundEnabled ? '🔊' : '🔇';
    showToast("info", labSoundEnabled ? "Sonido activado" : "Sonido silenciado");
  });

  document.getElementById("g05-btn-reset").addEventListener("click", () => {
    renderGame05(stage);
    showToast("info", "Escenario reiniciado.");
  });

  loadG05CurrentCase();
}

function switchG05Scenario(scenId) {
  g05CurrentScenarioId = scenId;
  const stage = document.getElementById("lab-stage");
  stage.innerHTML = "";
  renderGame05(stage);
  showToast("info", `Cargado: ${GAME05_SCENARIOS[scenId].title}`);
}

function loadG05CurrentCase() {
  const scen = GAME05_SCENARIOS[g05CurrentScenarioId];
  const curCase = scen.cases[g05CurrentCaseIndex];

  document.getElementById("g05-expert-panel").style.display = "none";
  document.getElementById("g05-slider-section").style.opacity = "1";
  document.getElementById("g05-slider-section").style.pointerEvents = "auto";

  document.getElementById("g05-vignette-text").textContent = curCase.vignette;
  document.getElementById("g05-hypothesis-text").textContent = curCase.hypothesis;
  document.getElementById("g05-finding-text").textContent = curCase.finding;

  document.getElementById("g05-stat-item-num").textContent = `${g05CurrentCaseIndex + 1} / ${scen.cases.length}`;
  updateG05MeanScoreDisplay();

  setG05SliderValue(0.0);
}

function setG05SliderValue(val) {
  g05UserSliderValue = Math.round(parseFloat(val) * 10) / 10;
  const slider = document.getElementById("g05-sct-slider");
  if (slider) slider.value = g05UserSliderValue;

  const badge = document.getElementById("g05-slider-value-badge");
  const numSpan = document.getElementById("g05-slider-numeric-val");
  const labelSpan = document.getElementById("g05-slider-text-label");

  if (!badge) return;

  const formattedVal = (g05UserSliderValue > 0 ? `+${g05UserSliderValue.toFixed(1)}` : g05UserSliderValue.toFixed(1));
  numSpan.textContent = formattedVal;

  badge.classList.remove("neg", "zero", "pos");
  if (g05UserSliderValue < -0.1) {
    badge.classList.add("neg");
    labelSpan.textContent = g05UserSliderValue <= -0.8 ? "Invalida / Descarta" : "Reduce Probabilidad";
  } else if (g05UserSliderValue > 0.1) {
    badge.classList.add("pos");
    labelSpan.textContent = g05UserSliderValue >= 0.8 ? "Confirma / Mandatorio" : "Aumenta Probabilidad";
  } else {
    badge.classList.add("zero");
    labelSpan.textContent = "Sin Impacto (Neutro)";
  }

  document.querySelectorAll(".scale-preset-btn").forEach(btn => {
    const btnVal = parseFloat(btn.dataset.val);
    if (Math.abs(btnVal - g05UserSliderValue) < 0.05) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function evaluateG05Concordance() {
  const scen = GAME05_SCENARIOS[g05CurrentScenarioId];
  const curCase = scen.cases[g05CurrentCaseIndex];

  const anchors = [-1.0, -0.5, 0.0, 0.5, 1.0];
  let closestAnchor = anchors[0];
  let minDiff = 999;
  anchors.forEach(a => {
    const diff = Math.abs(a - g05UserSliderValue);
    if (diff < minDiff) {
      minDiff = diff;
      closestAnchor = a;
    }
  });

  const anchorKey = (closestAnchor > 0 ? `+${closestAnchor.toFixed(1)}` : closestAnchor.toFixed(1));
  const votesForChoice = curCase.expertVotes[anchorKey] || 0;

  let maxVotes = 0;
  Object.values(curCase.expertVotes).forEach(v => {
    if (v > maxVotes) maxVotes = v;
  });

  const scoreRatio = maxVotes > 0 ? (votesForChoice / maxVotes) : 0;
  const distancePenalty = Math.max(0, 1 - (minDiff * 0.5));
  const finalScore = Math.round(scoreRatio * distancePenalty * 100);

  g05SessionScores.push(finalScore);
  updateG05MeanScoreDisplay();

  if (finalScore >= 80) {
    playLabSuccessSound();
  } else if (finalScore >= 40) {
    playLabTone(440, 'sine', 0.12, 0.12);
  } else {
    playLabErrorSound();
  }

  displayG05ExpertPanel(curCase, anchorKey, finalScore, maxVotes);
}

function displayG05ExpertPanel(curCase, userAnchorKey, score, maxVotes) {
  const panel = document.getElementById("g05-expert-panel");
  panel.style.display = "flex";

  document.getElementById("g05-slider-section").style.opacity = "0.7";
  document.getElementById("g05-slider-section").style.pointerEvents = "none";

  const scoreCircle = document.getElementById("g05-score-circle");
  scoreCircle.textContent = `${score}%`;
  const qualText = document.getElementById("g05-concordance-qualitative");

  if (score >= 80) {
    scoreCircle.style.borderColor = "#10b981";
    scoreCircle.style.color = "#34d399";
    qualText.textContent = "Alta concordancia con el panel de especialistas (Moda).";
  } else if (score >= 40) {
    scoreCircle.style.borderColor = "#f59e0b";
    scoreCircle.style.color = "#fbbf24";
    qualText.textContent = "Concordancia parcial: Opción respaldada por una minoría de expertos.";
  } else {
    scoreCircle.style.borderColor = "#ef4444";
    scoreCircle.style.color = "#f87171";
    qualText.textContent = "Disonancia clínica: La opción elegida no fue respaldada por el panel.";
  }

  document.getElementById("g05-expert-rationale-text").innerHTML = `
    <strong>💡 Consenso del Panel de Expertos:</strong> ${curCase.rationale}
  `;

  renderG05Histogram(curCase, userAnchorKey, maxVotes);
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderG05Histogram(curCase, userAnchorKey, maxVotes) {
  const container = document.getElementById("g05-histogram-bars-row");
  container.innerHTML = "";

  const keys = ["-1.0", "-0.5", "0.0", "+0.5", "+1.0"];
  const totalExperts = 15;

  keys.forEach(k => {
    const count = curCase.expertVotes[k] || 0;
    const heightPct = maxVotes > 0 ? Math.round((count / maxVotes) * 65) + 10 : 8;
    const isModal = (k === curCase.modalOption);
    const isUserChoice = (k === userAnchorKey);

    const col = document.createElement("div");
    col.className = "bar-column";

    col.innerHTML = `
      <span class="bar-count-tag">${count}</span>
      <div class="bar-fill-track ${isModal ? 'modal-choice' : ''} ${isUserChoice ? 'user-choice-marker' : ''}" 
           style="height:${heightPct}px; background:${k.startsWith('-') ? '#f87171' : (k === '0.0' ? '#64748b' : '#34d399')};">
      </div>
      <span class="bar-axis-label">${k}</span>
    `;

    container.appendChild(col);
  });

  document.getElementById("g05-modal-expert-stat").textContent = `Moda: ${curCase.modalOption} (${curCase.expertVotes[curCase.modalOption]} de ${totalExperts} expertos)`;
}

function updateG05MeanScoreDisplay() {
  const scoreEl = document.getElementById("g05-stat-mean-score");
  if (!scoreEl) return;
  if (g05SessionScores.length === 0) {
    scoreEl.textContent = "-- %";
  } else {
    const sum = g05SessionScores.reduce((a, b) => a + b, 0);
    const mean = Math.round(sum / g05SessionScores.length);
    scoreEl.textContent = `${mean}%`;
  }
}

function nextG05Case() {
  const scen = GAME05_SCENARIOS[g05CurrentScenarioId];
  if (g05CurrentCaseIndex < scen.cases.length - 1) {
    g05CurrentCaseIndex++;
    loadG05CurrentCase();
  } else {
    showToast("success", "🏆 ¡Has completado todos los ítems de concordancia de este escenario!");
    LabGamification.triggerConfetti();
    LabGamification.addXP(400, "SCT Superado 🏆");
  }
}


// ========================================================
// JUEGO 06: CLINICAL VIGNETTE MCQ (PREGUNTAS DE OPCIÓN MÚLTIPLE CON RAZONAMIENTO CLÍNICO)
// ========================================================

const GAME06_CASES = [
  {
    id: "case-01",
    dept: "Cardiología Crítica & Hemodinamia",
    severity: "🔴 Código Rojo / Shock Cardiogénico",
    patientName: "Don Hernando, 66 años",
    patientSub: "Fumador 30 paq/año · HTA · Día 4 post-IAM inferior no reperfundido",
    hcTag: "HC-84920-CARDIO",
    vitals: [
      { label: "PA", val: "82/48 mmHg", state: "Hipotensión severa", alert: "danger" },
      { label: "FC", val: "122 lpm", state: "Taquicardia sinusal", alert: "danger" },
      { label: "FR", val: "32 rpm", state: "Taquipnea severa", alert: "danger" },
      { label: "SatO2", val: "86% amb.", state: "Hipoxemia refractaria", alert: "danger" },
      { label: "T°", val: "36.8°C", state: "Afebril", alert: "normal" }
    ],
    narrative: "Paciente que acudió tardíamente por dolor torácico hace 4 días (IAM con elevación de ST inferior). Hace 45 minutos presenta disnea súbita en reposo, ortopnea extrema, frialdad distal y diaforesis profusa. A la auscultación se detectan estertores crepitantes húmedos bilaterales difusos hasta ambos ápices y un <strong>nuevo soplo holosistólico grado IV/VI rudo en ápex con irradiación axilar</strong> y tercer tono cardíaco (S3). No se palpa frémito paraesternal izquierdo.",
    tabs: {
      labs: [
        { name: "Troponina I", val: "14.2 ng/mL (curva descendente)" },
        { name: "Lactato arterial", val: "4.2 mmol/L (hipoperfusión tisular)" },
        { name: "Creatinina sérica", val: "1.8 mg/dL (daño renal agudo prerrenal)" },
        { name: "Gases arteriales", val: "pH 7.28, PaO2 54 mmHg, PaCO2 31 mmHg, HCO3 15" }
      ],
      imaging: "<strong>Rx de Tórax:</strong> Infiltrado alveolar bilateral masivo en 'alas de mariposa', cardiomegalia leve y cefalización de flujo.<br><strong>ECG:</strong> Ondas Q patológicas en II, III y aVF; taquicardia sinusal a 120 lpm sin elevación recurrente del segmento ST.",
      exam: "<strong>Cardiovascular:</strong> Nuevo soplo holosistólico en foco mitral rudo con S3 galopante. R2 conservado.<br><strong>Pulmonar:</strong> Estertores crepitantes difusos bilaterales en marea ascendente.<br><strong>Periferia:</strong> Llenado capilar >4 segundos, piel moteada (mottling score 3 en rodillas)."
    },
    question: "¿Cuál es el siguiente paso diagnóstico y terapéutico MÁS determinante para la sobrevida de este paciente?",
    options: [
      {
        letter: "A",
        text: "Administrar bolo IV de furosemida 80 mg y titular nitroglicerina en infusión continua a altas dosis.",
        isCorrect: false,
        distractorReason: "Contraindicación crítica: Aunque hay congestión alveolar extrema, el paciente se encuentra en shock cardiogénico profundo (PA 82/48 mmHg). Los vasodilatadores potentes y los diuréticos en bolo precipitan el colapso hemodinámico irreversible por pérdida de precarga."
      },
      {
        letter: "B",
        text: "Ecocardiograma emergente de urgencia, soporte con balón de contrapulsación intraaórtico (BCIAo) y consulta quirúrgica cardiovascular de emergencia.",
        isCorrect: true,
        distractorReason: null
      },
      {
        letter: "C",
        text: "Trombólisis intravenosa inmediata con Tenecteplasa ante sospecha de reoclusión coronaria aguda.",
        isCorrect: false,
        distractorReason: "Error catastrófico: No es una reoclusión trombótica coronaria aguda, sino una complicación mecánica (ruptura del músculo papilar). La trombólisis intravenosa causaría hemorragia miocárdica masiva e imposibilitaría la cirugía urgente."
      },
      {
        letter: "D",
        text: "Pericardiocentesis urgente subxifoidea guiada por ecografía para alivio de taponamiento cardíaco.",
        isCorrect: false,
        distractorReason: "Falso diagnóstico: En taponamiento cardíaco los pulmones suelen estar limpios (sin estertores masivos) y los ruidos cardíacos están apagados con pulso paradójico (tríada de Beck). Aquí el hallazgo cardinal es el soplo de regurgitación mitral aguda y edema alveolar masivo."
      },
      {
        letter: "E",
        text: "Inicio inmediato de betabloqueador IV (Metoprolol 5 mg) para control de la taquicardia y reducir consumo miocárdico de oxígeno.",
        isCorrect: false,
        distractorReason: "Contraindicación absoluta: El betabloqueo intravenoso está formalmente contraindicado en shock cardiogénico o insuficiencia cardíaca aguda descompensada clase Killip IV, ya que precipita paro cardíaco en asistolia."
      }
    ],
    goldExplanation: "La <strong>ruptura del músculo papilar</strong> (típicamente posteromedial por irrigación única de la arteria coronaria descendente posterior) se manifiesta típicamente entre los días 2 y 7 post-IAM inferior con insuficiencia mitral masiva aguda, edema agudo de pulmón y shock cardiogénico. El tratamiento definitivo es la reparación o reemplazo quirúrgico de emergencia. Como puente a quirófano, el <strong>balón de contrapulsación intraaórtico (BCIAo)</strong> o el soporte ventricular percutáneo reduce la postcarga, disminuye el volumen regurgitante y mejora la perfusión coronaria en diástole.",
    boardPearl: "El músculo papilar posteromedial tiene irrigación univascular (DP procedente de la CD en el 90%), haciéndolo entre 6 y 12 veces más susceptible de ruptura que el anterolateral (que recibe doble irrigación: DA y Cx). Además, el soplo en insuficiencia mitral aguda puede ser sorprendentemente suave o corto porque la presión de la aurícula izquierda se iguala muy rápido a la del ventrículo izquierdo."
  },
  {
    id: "case-02",
    dept: "Nefrología & Cuidados Críticos",
    severity: "🟠 Riesgo Neurológico / Convulsión",
    patientName: "Doña Teresa, 68 años",
    patientSub: "Tabaquismo pesado (45 paq/año) · Masa pulmonar parahiliar derecha",
    hcTag: "HC-71203-NEFRO",
    vitals: [
      { label: "PA", val: "128/76 mmHg", state: "Normotensa", alert: "normal" },
      { label: "FC", val: "74 lpm", state: "Normal", alert: "normal" },
      { label: "FR", val: "16 rpm", state: "Eupneica", alert: "normal" },
      { label: "SatO2", val: "95% amb.", state: "Adecuada", alert: "normal" },
      { label: "T°", val: "36.7°C", state: "Afebril", alert: "normal" }
    ],
    narrative: "Mujer de 68 años con masa hiliar espiculada en estudio. Traída a urgencias por su hija debido a letargia y somnolencia progresiva de 3 días, culminando hace 1 hora con una <strong>crisis convulsiva tónico-clónica generalizada de 2 minutos</strong>. Al examen: obnubilada pero localiza estímulos dolorosos; mucosas húmedas, sin edemas periféricos, sin ingurgitación yugular y con turgencia cutánea normal (estado clínico euvolémico).",
    tabs: {
      labs: [
        { name: "Sodio sérico (Na+)", val: "112 mEq/L (severo sintomático)" },
        { name: "Osmolaridad plasmática", val: "234 mOsm/kg (hipotónica)" },
        { name: "Osmolaridad urinaria", val: "480 mOsm/kg (orina concentrada inapropiada)" },
        { name: "Sodio urinario (Na+ u)", val: "58 mEq/L (>30 mEq/L)" },
        { name: "Ácido úrico sérico", val: "2.8 mg/dL (hipouricemia clásica)" },
        { name: "TSH y Cortisol basal", val: "Normales" }
      ],
      imaging: "<strong>TAC de Cráneo Simple:</strong> Edema cerebral difuso leve con borramiento simétrico de surcos corticales, sin hemorragia ni lesiones focales.<br><strong>TAC de Tórax:</strong> Masa central de 4 cm en hilio derecho sugestiva de carcinoma neuroendocrino de células pequeñas.",
      exam: "<strong>Neurológico:</strong> Glasgow 11/15 (O3, V3, M5), pupilas isocóricas reactivas, sin signos meníngeos ni focalización motora piramidal.<br><strong>Estado de volumen:</strong> Signo del pliegue negativo, presión venosa yugular a 2 cm sobre ángulo esternal."
    },
    question: "¿Cuál es la conducta terapéutica INMEDIATA más adecuada y cuál es el límite estricto de seguridad para evitar daño neurológico iatrogénico?",
    options: [
      {
        letter: "A",
        text: "Bolo de Solución Salina al 3% (100 mL IV en 10-15 min, repetible según clínica), con meta estricta de no superar un ascenso de 8 mEq/L en las primeras 24 horas.",
        isCorrect: true,
        distractorReason: null
      },
      {
        letter: "B",
        text: "Infusión continua rápida de Suero Salino Fisiológico al 0.9% a 250 mL/h con el objetivo de normalizar el sodio sérico (>135 mEq/L) en las primeras 12 horas.",
        isCorrect: false,
        distractorReason: "Peligro dual de iatrogenia: 1) En SIADH el suero al 0.9% puede empeorar la hiponatremia (el riñón excreta el Na+ en poco volumen y retiene el agua libre); 2) Corregir a >135 en 12 horas produce Síndrome de Desmielinización Osmótica (mielinolisis pontina) irreversible con cuadriplejía."
      },
      {
        letter: "C",
        text: "Inicio inmediato de Tolvaptán oral a dosis de 30 mg cada 12 horas como monoterapia de urgencia para bloqueo del receptor V2.",
        isCorrect: false,
        distractorReason: "Uso indebido de fármaco: Los antagonistas del receptor V2 (vaptanos) no están aprobados ni indicados para la fase aguda de urgencia con convulsiones debido a su latencia de acción y al riesgo de sobrecorrección rápida e incontrolada."
      },
      {
        letter: "D",
        text: "Restricción hídrica estricta a <500 mL/día como medida aislada de tratamiento urgente.",
        isCorrect: false,
        distractorReason: "Manejo insuficiente y negligente: La restricción de líquidos es el pilar para el SIADH crónico o asintomático, pero es totalmente insuficiente ante convulsiones y edema cerebral agudo que amenazan la vida en minutos."
      },
      {
        letter: "E",
        text: "Infusión de Dextrosa al 5% en agua destilada con Bicarbonato de sodio para forzar alcalinización osmótica.",
        isCorrect: false,
        distractorReason: "Grave error fisiológico: La dextrosa al 5% aporta agua libre sin sodio, lo que diluiría aún más el espacio extracelular empeorando el edema cerebral y precipitando la herniación de amígdalas cerebelosas."
      }
    ],
    goldExplanation: "Ante una <strong>hiponatremia severa sintomática con manifestaciones neurológicas graves (crisis convulsivas, coma)</strong>, la prioridad absoluta es revertir el edema cerebral agudo elevando el sodio en 4-6 mEq/L en los primeros minutos mediante bolos de solución salina hipertónica al 3%. Sin embargo, el límite absoluto de seguridad para prevenir el <strong>Síndrome de Desmielinización Osmótica (Mielinolisis Pontina Central)</strong> es no superar los <strong>8 mEq/L en 24 horas</strong> (o 6-8 mEq/L en pacientes de alto riesgo).",
    boardPearl: "Regla mnemotécnica de seguridad del sodio: 'Six in six hours, eight in twenty-four' (con subir 4 a 6 mEq/L se aborta el riesgo inminente de herniación cerebral; jamás sobrepasar los 8 mEq/L en 24 horas para preservar la vaina de mielina de la protuberancia cerebral)."
  },
  {
    id: "case-03",
    dept: "Medicina Crítica & UCI",
    severity: "🔴 Falla Respiratoria Hipoxémica / SDRA",
    patientName: "Don Gustavo, 52 años",
    patientSub: "Día 3 de shock séptico por peritonitis fecal perforada en UCI",
    hcTag: "HC-93310-UCI",
    vitals: [
      { label: "PA", val: "110/68 mmHg", state: "Con Noradrenalina", alert: "warning" },
      { label: "FC", val: "98 lpm", state: "Sinusal", alert: "normal" },
      { label: "FR mec.", val: "24 rpm", state: "Controlada", alert: "warning" },
      { label: "SatO2", val: "88%", state: "Hipoxemia con FiO2 0.80", alert: "danger" },
      { label: "T°", val: "38.2°C", state: "Febril", alert: "warning" }
    ],
    narrative: "Paciente intubado en UCI al tercer día de postoperatorio por laparotomía de urgencia. Presenta caída severa de la oxigenación. Peso corporal predicho por talla (PBW): 70 kg (altura 1.75 m). La radiografía portátil evidencia opacidades alveolares bilaterales difusas en cuatro cuadrantes sin derrame pleural. El ecocardiograma descarta disfunción ventricular izquierda (FEVI 60%, cavidades izquierdas no dilatadas).",
    tabs: {
      labs: [
        { name: "Gasometría (FiO2 0.80, PEEP 12)", val: "pH 7.28, PaO2 62 mmHg, PaCO2 48 mmHg, HCO3 22" },
        { name: "Índice PaO2 / FiO2", val: "77.5 mmHg (SDRA Severo de Berlín < 100)" },
        { name: "Volumen Corriente actual", val: "600 mL (8.6 mL/kg PBW)" },
        { name: "Presión Meseta (Pplat)", val: "34 cmH2O (elevada > 30)" },
        { name: "Driving Pressure (Pplat - PEEP)", val: "34 - 12 = 22 cmH2O (riesgo alto de VILI)" }
      ],
      imaging: "<strong>Rx Tórax Portátil:</strong> Infiltrados pulmonares bilaterales homogéneos no cardiogénicos distribuidos en las cuatro zonas pulmonares.<br><strong>Ecocardiografía bedside:</strong> Ventrículo izquierdo con contractilidad global normal, sin insuficiencia mitral ni presiones de llenado elevadas.",
      exam: "<strong>Ventilatorio:</strong> Secreciones endotraqueales escasas no purulentas, asincronía paciente-ventilador leve.<br><strong>Hemodinámico:</strong> Noradrenalina a 0.08 mcg/kg/min, lactato sérico en descenso (1.7 mmol/L)."
    },
    question: "¿Cuál es el ajuste ventilatorio prioritario y basado en evidencia (ensayo ARMA / Amato et al.) para reducir la mortalidad por daño pulmonar inducido por el ventilador (VILI)?",
    options: [
      {
        letter: "A",
        text: "Disminuir el volumen corriente a 420 mL (6 mL/kg de peso predicho) o menos, con metas de Presión Meseta ≤30 cmH2O y Presión de Conducción (Driving Pressure) <15 cmH2O.",
        isCorrect: true,
        distractorReason: null
      },
      {
        letter: "B",
        text: "Aumentar el volumen corriente a 750 mL (10.7 mL/kg) para corregir rápidamente la acidosis respiratoria leve y normalizar la PaCO2 a 38 mmHg.",
        isCorrect: false,
        distractorReason: "Genera volutrauma y biotrauma masivo: En SDRA se acepta la hipercapnia permisiva (pH ≥ 7.20). Aumentar el volumen corriente sobredistiende los alvéolos sanos remanentes ('baby lung') e incrementa exponencialmente la mortalidad."
      },
      {
        letter: "C",
        text: "Reducir la PEEP a 5 cmH2O de inmediato para evitar el barotrauma alveolar sin alterar el volumen corriente.",
        isCorrect: false,
        distractorReason: "Atelectrauma destructivo: Reducir la PEEP en SDRA severo desrecluta los alvéolos dependientes, provocando colapso y apertura cíclica lesiva y una caída fulminante de la relación PaO2/FiO2."
      },
      {
        letter: "D",
        text: "Retirar la sedación y transferir al paciente inmediatamente a ventilación espontánea en presión de soporte (PSV).",
        isCorrect: false,
        distractorReason: "Riesgo de autolesión pulmonar (P-SILI): En SDRA severo (PaO2/FiO2 < 100), el estímulo respiratorio no controlado genera oscilaciones de presión transpulmonar destructivas. Requiere sedación y a menudo relajación neuromuscular temprana (estudio ACURASYS)."
      },
      {
        letter: "E",
        text: "Aumentar la FiO2 al 100% de forma indefinida sin alterar los parámetros de volumen ni presiones de vía aérea.",
        isCorrect: false,
        distractorReason: "Atelectasia por reabsorción y toxicidad por oxígeno: La hiperoxia no resuelve el estrés mecánico alveolar y produce radicales libres que perpetúan la lesión de la membrana alvéolo-capilar."
      }
    ],
    goldExplanation: "La estrategia de <strong>ventilación mecánica protectora</strong> (ARDSNet ARMA Trial) reduce la mortalidad al limitar el volumen corriente a <strong>4-6 mL/kg de peso predicho</strong> (PBW) y mantener la presión meseta $\\le 30\\text{ cmH}_2O$. Marcelo Amato et al. demostraron que la <strong>Driving Pressure ($\\Delta P = P_{plat} - PEEP$)</strong> es el predictor individual más potente de supervivencia; mantenerla $<15\\text{ cmH}_2O$ es la meta primordial para prevenir volutrauma y barotrauma.",
    boardPearl: "El volumen corriente SIEMPRE se calcula sobre el PESO PREDICHO por talla y sexo biológico (PBW), jamás sobre el peso real del paciente ni el peso con anasarca. Un paciente de 120 kg con obesidad que mide 1.70 m tiene exactamente el mismo tamaño pulmonar que un sujeto delgado de 66 kg."
  },
  {
    id: "case-04",
    dept: "Infectología & Medicina Interna",
    severity: "🟡 Riesgo Séptico / Embolismo",
    patientName: "Don Camilo, 34 años",
    patientSub: "Uso de drogas por vía intravenosa (UDVP) hace 2 semanas",
    hcTag: "HC-55219-INFECT",
    vitals: [
      { label: "PA", val: "116/66 mmHg", state: "Normotenso", alert: "normal" },
      { label: "FC", val: "106 lpm", state: "Taquicardia sinusal", alert: "warning" },
      { label: "FR", val: "20 rpm", state: "Leve taquipnea", alert: "warning" },
      { label: "SatO2", val: "96% amb.", state: "Adecuada", alert: "normal" },
      { label: "T°", val: "39.4°C", state: "Fiebre alta con picos", alert: "danger" }
    ],
    narrative: "Hombre de 34 años con antecedente de uso de heroína parenteral. Ingresa por picos febriles diarios de 39°C con escalofríos intensos y dolor pleurítico derecho desde hace 5 días. Al examen físico: microhemorragias en astilla subungueales bilaterales, máculas eritematosas indoloras en palmas y plantas (<strong>lesiones de Janeway</strong>) y un <strong>soplo holosistólico grado III/VI en borde esternal inferior izquierdo que se acentúa con la inspiración profunda (signo de Rivero-Carvallo)</strong>.",
    tabs: {
      labs: [
        { name: "Leucocitos", val: "19,800/mm³ (88% neutrófilos, 8% bandas)" },
        { name: "Proteína C Reactiva (PCR)", val: "192 mg/L (marcadamente elevada)" },
        { name: "VSG", val: "94 mm/h" },
        { name: "Examen de orina", val: "Microhematuria con proteinuria leve" }
      ],
      imaging: "<strong>Rx de Tórax:</strong> Múltiples opacidades nodulares periféricas bilaterales en ambos campos pulmonares, algunas con cavitación central precoz (émbolos sépticos pulmonares).<br><strong>ECG:</strong> Ritmo sinusal a 104 lpm, intervalo PR normal (0.15s, sin bloqueo AV de nuevo comienzo).",
      exam: "<strong>Cardíaco:</strong> Soplo holosistólico en foco tricuspídeo con acentuación inspiratoria (Rivero-Carvallo positivo).<br><strong>Piel y faneras:</strong> Lesiones de Janeway en eminencias tenares e hipotenares; hemorragias en astilla en lechos ungueales de dedos 2 y 3 de mano derecha."
    },
    question: "¿Cuál es la secuencia de acción INICIAL obligatoria antes de administrar cualquier antibiótico empírico para maximizar el rendimiento de los Criterios de Duke?",
    options: [
      {
        letter: "A",
        text: "Tomar de inmediato 3 juegos de hemocultivos obtenidos de sitios venosos periféricos independientes, separados entre sí, y solicitar ecocardiograma de urgencia antes de iniciar antibióticos.",
        isCorrect: true,
        distractorReason: null
      },
      {
        letter: "B",
        text: "Administrar inmediatamente Vancomicina 1g IV en bolo y tomar un único hemocultivo a los 60 minutos de la infusión.",
        isCorrect: false,
        distractorReason: "Grave error microbiológico: Administrar antibióticos antes de completar la toma seriada de hemocultivos reduce la tasa de positividad diagnóstica en más del 50%, provocando una 'endocarditis con cultivo negativo' y retrasando el tratamiento de precisión."
      },
      {
        letter: "C",
        text: "Realizar aspirado de médula ósea y biopsia tisular de las lesiones cutáneas de Janeway antes de cualquier otra intervención.",
        isCorrect: false,
        distractorReason: "Conducta invasiva e injustificada: Las lesiones de Janeway son fenómenos vasculares por microembolización séptica pero el aislamiento del germen se logra en sangre periférica mediante hemocultivos seriados, no con biopsias dolorosas de piel o médula."
      },
      {
        letter: "D",
        text: "Programar de urgencia cirugía de reemplazo valvular tricúspide sin esperar ecocardiograma ni terapia médica inicial.",
        isCorrect: false,
        distractorReason: "Indicación quirúrgica precipitada: La endocarditis tricuspídea en usuarios de drogas suele responder favorablemente a antibióticos endovenosos; la cirugía solo se indica ante insuficiencia cardíaca derecha intratable, vegetaciones >20 mm tras embolias repetidas o falla microbiológica."
      },
      {
        letter: "E",
        text: "Iniciar anticoagulación terapéutica plena con heparina por el hallazgo de nódulos pulmonares sugestivos de tromboembolismo pulmonar.",
        isCorrect: false,
        distractorReason: "Contraindicación formal: En endocarditis infecciosa la anticoagulación plena está contraindicada debido al alto riesgo de transformación hemorrágica masiva de émbolos cerebrales sépticos o rotura de aneurismas micóticos."
      }
    ],
    goldExplanation: "La demostración de bacteriemia persistente es un <strong>criterio mayor de Duke</strong> fundamental. Para aislar el microorganismo causante (frecuentemente *Staphylococcus aureus*) sin esterilización farmacológica previa, deben obtenerse <strong>3 series de hemocultivos</strong> de sitios periféricos distintos separados en el tiempo por al menos 30 a 60 minutos. Inmediatamente tras la toma, se inicia antibioticoterapia empírica (ej. Vancomicina) y se realiza ecocardiografía.",
    boardPearl: "En sospecha de endocarditis por S. aureus en válvula nativa (especialmente en cavidades izquierdas), la ecocardiografía transtorácica (ETT) tiene una sensibilidad de apenas ~60%. Un ETT negativo NUNCA descarta endocarditis infecciosa ante alta sospecha; el ecocardiograma transesofágico (ETE, sensibilidad >95%) es el estudio mandatorio."
  },
  {
    id: "case-05",
    dept: "Neurología Vascular & Neurointervención",
    severity: "🔴 Código Ictus / Ventana Terapéutica",
    patientName: "Doña Marina, 72 años",
    patientSub: "Fibrilación auricular no anticoagulada · HTA",
    hcTag: "HC-66401-NEURO",
    vitals: [
      { label: "PA", val: "168/94 mmHg", state: "Hipertensión reactiva", alert: "warning" },
      { label: "FC", val: "112 lpm", state: "Arritmia completa (FA)", alert: "danger" },
      { label: "FR", val: "18 rpm", state: "Normal", alert: "normal" },
      { label: "SatO2", val: "98% amb.", state: "Adecuada", alert: "normal" },
      { label: "Glucometría", val: "118 mg/dL", state: "Descarta hipoglucemia", alert: "normal" }
    ],
    narrative: "Mujer de 72 años con antecedente de FA no anticoagulada. Ingresa al servicio de urgencias exactamente a los <strong>75 minutos</strong> de presentar súbitamente incapacidad para comunicarse y parálisis del lado derecho del cuerpo mientras desayunaba. Al examen neurológico: afasia global motora y sensitiva, desviación conjugada de la mirada cefálica hacia la izquierda y hemiplejía facio-braquio-crural derecha flácida (fuerza 0/5). <strong>Escala NIHSS: 21 puntos (déficit neurológico severo)</strong>.",
    tabs: {
      labs: [
        { name: "Glucometría capilar", val: "118 mg/dL (normal)" },
        { name: "Plaquetas", val: "245,000 /mm³" },
        { name: "INR / TP", val: "1.08 / 12.1 segundos (no anticoagulada)" },
        { name: "Creatinina sérica", val: "0.9 mg/dL" }
      ],
      imaging: "<strong>TAC Cerebral Simple sin contraste:</strong> ASPECTS de 9/10 (mínima hipodensidad insular precoz, sin hemorragia intracraneal).<br><strong>Angio-TAC de Vasos Supraaórticos y Cerebrales:</strong> Oclusión completa y abrupta del <strong>segmento M1 de la arteria cerebral media izquierda</strong> con aceptable circulación colateral leptomeníngea.",
      exam: "<strong>Escala NIHSS:</strong> 21 puntos (Afasia global, paresia de mirada hacia la izquierda, hemiplejía derecha completa, hemihipoestesia derecha severa).<br><strong>Tiempo transcurrido desde inicio ('Door-to-Needle'):</strong> 85 minutos totales."
    },
    question: "Estando la paciente a 90 minutos de evolución y con oclusión proximal demostrada de M1, ¿cuál es la conducta terapéutica de reperfusión recomendada según las guías AHA/ASA?",
    options: [
      {
        letter: "A",
        text: "Administrar inmediatamente trombólisis intravenosa (Alteplasa IV o Tenecteplasa IV) Y activar al mismo tiempo la sala de hemodinamia para trombectomía mecánica endovascular sin esperar la respuesta al trombolítico.",
        isCorrect: true,
        distractorReason: null
      },
      {
        letter: "B",
        text: "Administrar únicamente Alteplasa IV y mantener observación en UCI durante 4 horas; si no presenta mejoría clínica a las 4 horas, solicitar trombectomía mecánica.",
        isCorrect: false,
        distractorReason: "Retraso letal ('Tiempo es cerebro'): Esperar 4 horas saca al paciente de la ventana de máxima eficacia y condena a muerte el tejido en penumbra isquémica (se pierden 1.9 millones de neuronas por minuto en oclusión de gran vaso)."
      },
      {
        letter: "C",
        text: "Proceder únicamente a trombectomía mecánica endovascular y omitir la trombólisis intravenosa porque los trombos de M1 no responden a fármacos.",
        isCorrect: false,
        distractorReason: "Omisión no respaldada por guías: En pacientes que se presentan en centros con capacidad de trombectomía dentro de las 4.5 horas sin contraindicaciones, los ensayos clínicos apoyan la terapia combinada puente ('bridging therapy') con trombolítico IV + trombectomía mecánica."
      },
      {
        letter: "D",
        text: "Administrar de inmediato dosis de carga de Ácido Acetilsalicílico (300 mg) más Clopidogrel (300 mg) y diferir cualquier terapia de reperfusión invasiva.",
        isCorrect: false,
        distractorReason: "Tratamiento ineficaz y de alto riesgo: La doble antiagregación no recanaliza una oclusión de vaso grande proximal; además, los antiagregantes están contraindicados en las primeras 24 horas tras la trombólisis por riesgo de hemorragia cerebral."
      },
      {
        letter: "E",
        text: "Infundir Labetalol IV en bolo para reducir intensamente la presión arterial a cifras <120/80 mmHg antes de decidir cualquier reperfusión.",
        isCorrect: false,
        distractorReason: "Iatrogenia hemodinámica severa: En la fase aguda del ictus isquémico, la hipertensión reactiva mantiene la perfusión cerebral a través de vasos colaterales hacia la penumbra isquémica. Solo se interviene si la PA supera los 185/110 mmHg para trombolizar."
      }
    ],
    goldExplanation: "En pacientes con ACV isquémico agudo dentro de la ventana de $\\le 4.5$ horas desde el inicio de los síntomas sin contraindicaciones, la <strong>trombólisis intravenosa</strong> (Alteplasa o Tenecteplasa) es obligatoria. Además, ante una <strong>oclusión de gran vaso proximal (LVO) en la circulación anterior (segmento M1 de la ACM)</strong> con ASPECTS $\\ge 6$, está indicada la <strong>trombectomía mecánica endovascular inmediata (Grado IA)</strong>. La preparación para trombectomía nunca debe demorar la infusión del trombolítico IV, ni la infusión del trombolítico debe retrasar la movilización a hemodinamia ('bridging therapy').",
    boardPearl: "En trombectomía mecánica, la escala ASPECTS evalúa 10 regiones del territorio de la arteria cerebral media en TAC simple. Cada área de hipodensidad temprana resta 1 punto. Una puntuación ASPECTS ≥ 6 refleja un núcleo infartado pequeño con un área generosa de penumbra isquémica salvable."
  }
];

let g06CurrentCaseIdx = 0;
let g06SelectedOptionLetter = null;
let g06IsCaseLocked = false;
let g06SolvedCases = new Set();
let g06CurrentActiveTab = "labs";

function renderGame06(stage) {
  const container = document.createElement("div");
  container.className = "g06-container";

  container.innerHTML = `
    <!-- Barra superior de selección de casos -->
    <div class="g06-nav-strip">
      <div class="g06-pills-row" id="g06-case-pills-row"></div>
      <div class="g06-progress-indicator" id="g06-progress-stat">
        <span>Resueltos:</span> <strong id="g06-progress-val">0 / 5</strong>
      </div>
    </div>

    <!-- Ficha Clínica Electrónica (EHR) -->
    <div class="g06-ehr-card" id="g06-ehr-card">
      <div class="g06-ehr-header">
        <div class="g06-patient-meta">
          <div class="g06-category-row">
            <span class="g06-dept-badge" id="g06-ehr-dept">Cardiología</span>
            <span class="g06-severity-badge" id="g06-ehr-severity">Código Rojo</span>
          </div>
          <h2 class="g06-patient-title" id="g06-patient-name">Paciente</h2>
          <div class="g06-patient-sub" id="g06-patient-sub">Antecedentes</div>
        </div>
        <div class="g06-id-pill" id="g06-id-tag">HC-00000</div>
      </div>

      <!-- Tira de Signos Vitales -->
      <div class="g06-vitals-strip" id="g06-vitals-strip"></div>

      <!-- Cuadro Narrativo / Viñeta Clínica -->
      <div class="g06-narrative-box" id="g06-narrative-box"></div>

      <!-- Tabs de Datos Paraclínicos -->
      <div class="g06-paraclinical-tabs-card">
        <div class="g06-tabs-header-strip">
          <button class="g06-para-tab-btn active" data-tab="labs">🧪 Laboratorio</button>
          <button class="g06-para-tab-btn" data-tab="imaging">🩻 Imágenes & ECG</button>
          <button class="g06-para-tab-btn" data-tab="exam">🩺 Examen Físico Clave</button>
        </div>
        <div class="g06-para-tab-body" id="g06-para-tab-body"></div>
      </div>

      <!-- Pregunta Focal -->
      <div class="g06-question-card">
        <div class="g06-question-icon">❓</div>
        <div class="g06-question-text" id="g06-question-text">Pregunta...</div>
      </div>

      <!-- Opciones Múltiples de 1 Clic -->
      <div class="g06-options-grid" id="g06-options-grid"></div>

      <!-- Panel de Revelación Pedagógica Post-Respuesta -->
      <div class="g06-pedagogical-panel" id="g06-pedagogical-panel" style="display: none;">
        <div class="g06-verdict-banner" id="g06-verdict-banner">
          <div class="g06-verdict-title" id="g06-verdict-title">Veredicto</div>
          <div class="g06-verdict-xp" id="g06-verdict-xp">+120 XP</div>
        </div>

        <div class="g06-gold-card">
          <div class="g06-section-tag">🏆 Fundamentación y Estándar de Oro Clínico</div>
          <div class="g06-gold-text" id="g06-gold-text"></div>
        </div>

        <div class="g06-distractors-wrap">
          <div class="g06-distractor-header">
            <span>🔍 Desglose de Distractores: ¿Por qué NO las otras conductas?</span>
          </div>
          <div class="g06-distractor-cards-list" id="g06-distractor-cards-list"></div>
        </div>

        <div class="g06-pearl-card">
          <div class="g06-pearl-icon">💡</div>
          <div class="g06-pearl-content">
            <div class="g06-pearl-title">Perla de Examen / USMLE Board Pearl</div>
            <div class="g06-pearl-text" id="g06-pearl-text"></div>
          </div>
        </div>

        <div class="g06-actions-row">
          <button class="lab-btn secondary" id="g06-btn-retry" onclick="resetCurrentG06Case()">↺ Reintentar Caso</button>
          <button class="lab-btn" id="g06-btn-next" onclick="nextG06Case()">Siguiente Caso Clínico →</button>
        </div>
      </div>
    </div>
  `;

  stage.appendChild(container);

  setupG06TabListeners();
  renderG06CaseNavigation();
  loadG06Case(g06CurrentCaseIdx);
}

function setupG06TabListeners() {
  document.querySelectorAll(".g06-para-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      switchG06Tab(tab);
    });
  });
}

function switchG06Tab(tabKey) {
  g06CurrentActiveTab = tabKey;
  document.querySelectorAll(".g06-para-tab-btn").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-tab") === tabKey);
  });

  const c = GAME06_CASES[g06CurrentCaseIdx];
  const container = document.getElementById("g06-para-tab-body");
  if (!container) return;

  if (tabKey === "labs") {
    if (Array.isArray(c.tabs.labs)) {
      let html = `<div class="g06-para-data-grid">`;
      c.tabs.labs.forEach(l => {
        html += `<div class="g06-data-pill"><span>${l.name}:</span> <strong>${l.val}</strong></div>`;
      });
      html += `</div>`;
      container.innerHTML = html;
    } else {
      container.innerHTML = c.tabs.labs;
    }
  } else if (tabKey === "imaging") {
    container.innerHTML = c.tabs.imaging;
  } else if (tabKey === "exam") {
    container.innerHTML = c.tabs.exam;
  }
}

function renderG06CaseNavigation() {
  const container = document.getElementById("g06-case-pills-row");
  if (!container) return;
  container.innerHTML = "";

  GAME06_CASES.forEach((c, idx) => {
    const btn = document.createElement("button");
    btn.className = `g06-tab-btn ${idx === g06CurrentCaseIdx ? 'active' : ''} ${g06SolvedCases.has(c.id) ? 'solved' : ''}`;
    btn.innerHTML = `<span>Caso 0${idx + 1}</span> · <small>${c.dept.split('&')[0].trim()}</small>`;
    btn.addEventListener("click", () => {
      loadG06Case(idx);
    });
    container.appendChild(btn);
  });

  const valEl = document.getElementById("g06-progress-val");
  if (valEl) valEl.textContent = `${g06SolvedCases.size} / ${GAME06_CASES.length}`;
}

function loadG06Case(idx) {
  g06CurrentCaseIdx = idx;
  g06SelectedOptionLetter = null;
  g06IsCaseLocked = false;

  const c = GAME06_CASES[idx];

  // Actualizar botones de navegación
  document.querySelectorAll(".g06-tab-btn").forEach((b, i) => {
    b.classList.toggle("active", i === idx);
    b.classList.toggle("solved", g06SolvedCases.has(GAME06_CASES[i].id));
  });

  // EHR Header
  const deptEl = document.getElementById("g06-ehr-dept");
  const sevEl = document.getElementById("g06-ehr-severity");
  const nameEl = document.getElementById("g06-patient-name");
  const subEl = document.getElementById("g06-patient-sub");
  const idEl = document.getElementById("g06-id-tag");

  if (deptEl) deptEl.textContent = c.dept;
  if (sevEl) sevEl.textContent = c.severity;
  if (nameEl) nameEl.textContent = c.patientName;
  if (subEl) subEl.textContent = c.patientSub;
  if (idEl) idEl.textContent = c.hcTag;

  // Vitals Ribbon
  const vitalsContainer = document.getElementById("g06-vitals-strip");
  if (vitalsContainer) {
    vitalsContainer.innerHTML = "";
    c.vitals.forEach(v => {
      const vEl = document.createElement("div");
      vEl.className = `g06-vital-item alert-${v.alert}`;
      vEl.innerHTML = `
        <span class="g06-vital-label">${v.label}</span>
        <span class="g06-vital-val">${v.val}</span>
        <span class="g06-vital-state-tag">${v.state}</span>
      `;
      vitalsContainer.appendChild(vEl);
    });
  }

  // Narrative
  const narrEl = document.getElementById("g06-narrative-box");
  if (narrEl) narrEl.innerHTML = c.narrative;

  // Switch tab
  switchG06Tab(g06CurrentActiveTab || "labs");

  // Question
  const qEl = document.getElementById("g06-question-text");
  if (qEl) qEl.textContent = c.question;

  // Render Options
  renderG06Options(c);

  // Hide pedagogical panel
  const panel = document.getElementById("g06-pedagogical-panel");
  if (panel) panel.style.display = "none";
}

function renderG06Options(c) {
  const container = document.getElementById("g06-options-grid");
  if (!container) return;
  container.innerHTML = "";

  c.options.forEach(opt => {
    const card = document.createElement("div");
    card.className = "g06-option-card";
    card.id = `g06-opt-${opt.letter}`;

    card.innerHTML = `
      <div class="g06-letter-badge">${opt.letter}</div>
      <div class="g06-option-content">
        <div class="g06-option-text">${opt.text}</div>
        <div id="g06-badge-slot-${opt.letter}"></div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (g06IsCaseLocked) return;
      handleG06OptionSelection(opt.letter, c);
    });

    container.appendChild(card);
  });
}

function handleG06OptionSelection(letter, c) {
  g06IsCaseLocked = true;
  g06SelectedOptionLetter = letter;

  const chosenOption = c.options.find(o => o.letter === letter);
  const isCorrect = chosenOption.isCorrect;

  // Visual state on cards
  c.options.forEach(opt => {
    const card = document.getElementById(`g06-opt-${opt.letter}`);
    if (!card) return;
    card.classList.add("locked");

    if (opt.isCorrect) {
      card.classList.add("correct-revealed");
      const slot = document.getElementById(`g06-badge-slot-${opt.letter}`);
      if (slot) slot.innerHTML = `<span class="g06-status-badge g06-badge-correct">✓ Estándar de Oro / Conducta de Elección</span>`;
    } else if (opt.letter === letter && !isCorrect) {
      card.classList.add("user-incorrect");
      const slot = document.getElementById(`g06-badge-slot-${opt.letter}`);
      if (slot) slot.innerHTML = `<span class="g06-status-badge g06-badge-wrong">✗ Distractor de Riesgo Clínico</span>`;
    }
  });

  // Gamification integration
  if (isCorrect) {
    LabGamification.addXP(120, "MCQ Acierto");
    LabGamification.incrementStreak();
    LabGamification.unlockBadge("mcq_sniper");
    g06SolvedCases.add(c.id);
    renderG06CaseNavigation();

    if (g06SolvedCases.size === GAME06_CASES.length) {
      LabGamification.triggerConfetti();
      setTimeout(() => {
        LabGamification.addXP(350, "¡Examen Completo!");
        showToast("success", "🏆 ¡Felicitaciones! Has completado con éxito todos los casos clínicos del MCQ Board.");
      }, 500);
    }
  } else {
    playLabErrorSound();
    LabGamification.resetStreak();
    showToast("error", "⚠️ Opción incorrecta. Revisa el análisis de distractores abajo.");
  }

  showG06PedagogicalBreakdown(isCorrect, chosenOption, c);
}

function showG06PedagogicalBreakdown(isCorrect, chosenOption, c) {
  const panel = document.getElementById("g06-pedagogical-panel");
  if (!panel) return;
  panel.style.display = "flex";

  const banner = document.getElementById("g06-verdict-banner");
  const title = document.getElementById("g06-verdict-title");
  const xpChip = document.getElementById("g06-verdict-xp");

  if (isCorrect) {
    banner.className = "g06-verdict-banner success";
    title.innerHTML = `🎯 ¡Razonamiento Clínico Impecable! Opción [${chosenOption.letter}] Correcta`;
    xpChip.textContent = `+120 XP ✨ Racha x${LabGamification.streak}`;
  } else {
    banner.className = "g06-verdict-banner error";
    title.innerHTML = `⚠️ Error Cognitivo / Trampa en Opción [${chosenOption.letter}]`;
    xpChip.textContent = `Racha reiniciada a x1 · Revisa los distractores`;
  }

  const goldTextEl = document.getElementById("g06-gold-text");
  if (goldTextEl) goldTextEl.innerHTML = c.goldExplanation;

  const distractorsContainer = document.getElementById("g06-distractor-cards-list");
  if (distractorsContainer) {
    distractorsContainer.innerHTML = "";
    c.options.forEach(opt => {
      if (!opt.isCorrect) {
        const item = document.createElement("div");
        item.className = "g06-distractor-item";
        item.innerHTML = `
          <div class="g06-distractor-title">
            <span>Opción ${opt.letter}:</span> ${opt.text.substring(0, 75)}...
          </div>
          <div class="g06-distractor-desc">${opt.distractorReason}</div>
        `;
        distractorsContainer.appendChild(item);
      }
    });
  }

  const pearlEl = document.getElementById("g06-pearl-text");
  if (pearlEl) pearlEl.innerHTML = c.boardPearl;

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetCurrentG06Case() {
  loadG06Case(g06CurrentCaseIdx);
}

function nextG06Case() {
  if (g06CurrentCaseIdx < GAME06_CASES.length - 1) {
    loadG06Case(g06CurrentCaseIdx + 1);
  } else {
    loadG06Case(0);
  }
}


// ========================================================
// JUEGO 07: ANATOMICAL STRUCTURE SPOTTER (FIGURA INTERACTIVA & HOTSPOTS)
// ========================================================

const GAME07_FIGURES = [
  {
    id: "fig-01",
    title: "Polígono de Willis",
    sub: "Angio-Anatomía Cerebral",
    dept: "Neurorradiología & Neurocirugía",
    svgViewBox: "0 0 600 480",
    svgContent: `
      <!-- Fondo y Guías de referencia -->
      <circle cx="300" cy="240" r="160" fill="none" stroke="#1e293b" stroke-dasharray="4,4" opacity="0.6"/>

      <!-- 1. Arterias Vertebrales (Base) -->
      <g class="g07-hotspot" data-id="vertebral" data-name="Arterias Vertebrales (V4)">
        <path d="M 270 450 L 290 370 L 300 350 L 310 370 L 330 450" fill="none" stroke="#ef4444" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="300" y="435" fill="#fca5a5" font-size="10" font-weight="700" text-anchor="middle">Vertebrales</text>
      </g>

      <!-- 2. PICA (Arteria Cerebelosa Posteroinferior) -->
      <g class="g07-hotspot" data-id="pica" data-name="Arteria Cerebelosa Posteroinferior (PICA)">
        <path d="M 278 410 C 240 420 220 390 200 405" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
        <path d="M 322 410 C 360 420 380 390 400 405" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
        <circle cx="200" cy="405" r="7" fill="#ef4444" opacity="0.8"/>
        <text x="175" y="410" fill="#fca5a5" font-size="9" font-weight="700">PICA</text>
      </g>

      <!-- 3. Arteria Basilar -->
      <g class="g07-hotspot" data-id="basilar" data-name="Arteria Basilar">
        <path d="M 300 350 L 300 270" fill="none" stroke="#ef4444" stroke-width="16" stroke-linecap="round"/>
        <text x="325" y="315" fill="#fca5a5" font-size="11" font-weight="700">A. Basilar</text>
      </g>

      <!-- 4. AICA (Arteria Cerebelosa Anteroinferior) -->
      <g class="g07-hotspot" data-id="aica" data-name="Arteria Cerebelosa Anteroinferior (AICA)">
        <path d="M 300 330 C 260 330 240 345 220 340" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <path d="M 300 330 C 340 330 360 345 380 340" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <text x="185" y="345" fill="#fca5a5" font-size="9" font-weight="700">AICA</text>
      </g>

      <!-- 5. Arterias Cerebelosas Superiores (SCA) -->
      <g class="g07-hotspot" data-id="sca" data-name="Arteria Cerebelosa Superior (SCA)">
        <path d="M 300 275 C 250 275 220 285 190 280" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
        <path d="M 300 275 C 350 275 380 285 410 280" fill="none" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
      </g>

      <!-- 6. Arteria Cerebral Posterior (ACP) -->
      <g class="g07-hotspot" data-id="acp" data-name="Arteria Cerebral Posterior (ACP)">
        <path d="M 300 268 C 260 260 210 250 160 245" fill="none" stroke="#ef4444" stroke-width="10" stroke-linecap="round"/>
        <path d="M 300 268 C 340 260 390 250 440 245" fill="none" stroke="#ef4444" stroke-width="10" stroke-linecap="round"/>
        <text x="135" y="245" fill="#fca5a5" font-size="10" font-weight="700">ACP (P1)</text>
        <text x="445" y="245" fill="#fca5a5" font-size="10" font-weight="700">ACP (P1)</text>
      </g>

      <!-- 7. Arteria Comunicante Posterior (ACoP / PCoA) -->
      <g class="g07-hotspot" data-id="acop" data-name="Arteria Comunicante Posterior (ACoP)">
        <path d="M 235 255 L 220 180" fill="none" stroke="#f43f5e" stroke-width="6" stroke-linecap="round"/>
        <path d="M 365 255 L 380 180" fill="none" stroke="#f43f5e" stroke-width="6" stroke-linecap="round"/>
        <text x="175" y="215" fill="#fda4af" font-size="9" font-weight="700">ACoP</text>
        <text x="390" y="215" fill="#fda4af" font-size="9" font-weight="700">ACoP</text>
      </g>

      <!-- 8. Arteria Carótida Interna (ACI Terminal) -->
      <g class="g07-hotspot" data-id="aci" data-name="Carótida Interna (Terminal)">
        <circle cx="218" cy="175" r="14" fill="#ef4444" stroke="#fff" stroke-width="2"/>
        <circle cx="382" cy="175" r="14" fill="#ef4444" stroke="#fff" stroke-width="2"/>
        <text x="218" y="179" fill="#fff" font-size="8" font-weight="800" text-anchor="middle">ACI</text>
        <text x="382" y="179" fill="#fff" font-size="8" font-weight="800" text-anchor="middle">ACI</text>
      </g>

      <!-- 9. Arteria Cerebral Media (ACM) -->
      <g class="g07-hotspot" data-id="acm" data-name="Arteria Cerebral Media (ACM)">
        <path d="M 210 175 L 80 165" fill="none" stroke="#ef4444" stroke-width="14" stroke-linecap="round"/>
        <path d="M 390 175 L 520 165" fill="none" stroke="#ef4444" stroke-width="14" stroke-linecap="round"/>
        <text x="90" y="150" fill="#fca5a5" font-size="11" font-weight="800">ACM (M1)</text>
        <text x="470" y="150" fill="#fca5a5" font-size="11" font-weight="800">ACM (M1)</text>
      </g>

      <!-- 10. Arteria Cerebral Anterior (ACA - Segmento A1) -->
      <g class="g07-hotspot" data-id="aca" data-name="Arteria Cerebral Anterior (ACA)">
        <path d="M 220 165 C 240 120 270 95 290 90" fill="none" stroke="#ef4444" stroke-width="9" stroke-linecap="round"/>
        <path d="M 380 165 C 360 120 330 95 310 90" fill="none" stroke="#ef4444" stroke-width="9" stroke-linecap="round"/>
        <!-- A2 distales -->
        <path d="M 290 85 L 285 20" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
        <path d="M 310 85 L 315 20" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
        <text x="240" y="70" fill="#fca5a5" font-size="10" font-weight="700">ACA (A1/A2)</text>
      </g>

      <!-- 11. Arteria Comunicante Anterior (ACoA) -->
      <g class="g07-hotspot" data-id="acoa" data-name="Arteria Comunicante Anterior (ACoA)">
        <path d="M 288 88 L 312 88" fill="none" stroke="#38bdf8" stroke-width="9" stroke-linecap="round"/>
        <circle cx="300" cy="88" r="8" fill="#06b6d4" opacity="0.9"/>
        <text x="300" y="60" fill="#38bdf8" font-size="11" font-weight="800" text-anchor="middle">ACoA</text>
      </g>
    `,
    targets: [
      {
        id: "acoa",
        title: "Arteria Comunicante Anterior (ACoA)",
        cue: "Sitio más común de aneurismas saculares intracraneales (30-35%); su rotura produce hemorragia subaracnoidea.",
        spatialHint: "Busca el puente horizontal más anterior en la cima del polígono, conectando ambas ramas de la ACA.",
        officialName: "Arteria communicans anterior",
        relations: "Cruza por encima del quiasma óptico y por delante de la lámina terminalis.",
        clinical: "La compresión aneurismática o su rotura puede ocasionar hemianopsia bitemporal, amnesia anterógrada aguda y mutismo acinético por compromiso de ramas para la rodilla del cuerpo calloso.",
        pearl: "Los aneurismas de la ACoA son la causa más frecuente de HSA aneurismática. En el USMLE/MIR suelen asociarse a Enfermedad Renal Poliquística Autosómica Dominante (ADPKD) y Coartación Aórtica."
      },
      {
        id: "acop",
        title: "Arteria Comunicante Posterior (ACoP)",
        cue: "Comunica el territorio carotídeo con el vertebrobasilar; un aneurisma aquí comprime directamente el III par craneal.",
        spatialHint: "Ubica los dos vasos conectores longitudinales laterales entre la carótida interna y la cerebral posterior.",
        officialName: "Arteria communicans posterior",
        relations: "Discurre paralela y adyacente al trayecto del Nervio Oculomotor (III par craneal).",
        clinical: "Un aneurisma expansivo de la ACoP produce compresión externa pupilar: midriasis pupilar arreactiva precoz ('blown pupil') seguida de ptosis y parálisis de la mirada ('abajo y afuera').",
        pearl: "Regla de oro: parálisis dolorosa del III par con midriasis es aneurisma de la ACoP hasta que se demuestre lo contrario (a diferencia de la neuropatía diabética, que respeta la pupila por ser isquemia microvascular central)."
      },
      {
        id: "basilar",
        title: "Arteria Basilar",
        cue: "Tronco principal formado por la confluencia de ambas arterias vertebrales en la unión bulbopontina.",
        spatialHint: "Vaso grueso vertical medial que recorre el surco basilar del puente en la línea media inferior.",
        officialName: "Arteria basilaris",
        relations: "Asciende en el surco basilar del puente de Varolio entre los pares craneales VI y finaliza bifurcándose en las dos ACP.",
        clinical: "La trombosis basilar aguda es una emergencia catastrófica. La isquemia de la base del puente produce el Síndrome de Enclaustramiento (Locked-in): tetraplejía y anartria con preservación de parpadeo y movimientos oculares verticales.",
        pearl: "De la arteria basilar nacen las arterias pontinas paramedianas y circunferenciales, la AICA y las cerebelosas superiores (SCA). Su oclusión del tercio superior se conoce como 'Síndrome de la cima de la basilar'."
      },
      {
        id: "acm",
        title: "Arteria Cerebral Media (ACM - M1)",
        cue: "La arteria intracraneal de mayor calibre y la más frecuentemente comprometida en ictus isquémicos embólicos.",
        spatialHint: "Vaso horizontal potente que sale lateralmente hacia los lados izquierdo y derecho hacia la cisura de Silvio.",
        officialName: "Arteria cerebri media",
        relations: "Se proyecta lateralmente hacia la cisura lateral (de Silvio) irrigando la corteza convexitaria motora y del lenguaje.",
        clinical: "Su oclusión proximal (M1) genera hemiplejía facio-braquial contralateral, hemihipoestesia, desviación oculocefálica ipsilateral y afasia global (si es hemisferio dominante) o heminegligencia visuoespacial (no dominante).",
        pearl: "De M1 nacen las arterias lenticuloestriadas (arterias de Charcot), principales responsables de infartos lacunares en cápsula interna y hemorragias hipertensivas en ganglios basales (putamen)."
      },
      {
        id: "pica",
        title: "Arteria Cerebelosa Posteroinferior (PICA)",
        cue: "Nace de la arteria vertebral e irriga la porción dorsolateral del bulbo raquídeo y el hemisferio cerebeloso inferior.",
        spatialHint: "Ramas arteriales inferiores que se desprenden lateralmente desde las arterias vertebrales antes de formar la basilar.",
        officialName: "Arteria cerebelli inferior posterior",
        relations: "Rodea la médula oblongada (bulbo raquídeo) en íntima relación con las raíces de los pares IX, X y XI.",
        clinical: "Su trombosis causa el Síndrome Bulbar Lateral de Wallenberg: ataxia cerebelosa ipsilateral, síndrome de Horner ipsilateral, pérdida termoalgésica facial ipsilateral y corporal contralateral, disfagia y disfonía por lesión del núcleo ambiguo.",
        pearl: "En el Síndrome de Wallenberg la motilidad del cuerpo está CONSERVADA (las vías piramídeas anteriores están respetadas), lo que descarta una lesión de territorio pontino o capsular."
      }
    ]
  },
  {
    id: "fig-02",
    title: "Anatomía Interna del Corazón",
    sub: "Corte Frontal 4 Cámaras & Válvulas",
    dept: "Cardiología & Cirugía Cardiotorácica",
    svgViewBox: "0 0 600 480",
    svgContent: `
      <!-- Contorno Miocárdico General -->
      <path d="M 200 130 C 130 180 110 320 220 440 C 270 470 330 470 380 440 C 490 320 470 180 400 130 Z" fill="#881337" opacity="0.4" stroke="#9f1239" stroke-width="3"/>

      <!-- 1. Vena Cava Superior -->
      <g class="g07-hotspot" data-id="vcs" data-name="Vena Cava Superior">
        <path d="M 180 50 L 180 160" fill="none" stroke="#0284c7" stroke-width="26" stroke-linecap="round"/>
        <text x="145" y="100" fill="#38bdf8" font-size="11" font-weight="700">VCS</text>
      </g>

      <!-- 2. Aorta Ascendente / Cayado -->
      <g class="g07-hotspot" data-id="aorta" data-name="Aorta Ascendente">
        <path d="M 285 180 C 285 90 310 50 350 50 C 390 50 410 90 410 140" fill="none" stroke="#ef4444" stroke-width="26" stroke-linecap="round"/>
        <text x="350" y="40" fill="#fca5a5" font-size="11" font-weight="800" text-anchor="middle">Aorta</text>
      </g>

      <!-- 3. Aurícula Derecha (AD) -->
      <g class="g07-hotspot" data-id="ad" data-name="Aurícula Derecha (AD)">
        <ellipse cx="195" cy="210" rx="42" ry="48" fill="#0369a1" opacity="0.6" stroke="#38bdf8" stroke-width="2"/>
        <text x="195" y="215" fill="#fff" font-size="13" font-weight="800" text-anchor="middle">AD</text>
      </g>

      <!-- 4. Válvula Tricúspide -->
      <g class="g07-hotspot" data-id="tricuspide" data-name="Válvula Tricúspide">
        <ellipse cx="210" cy="275" rx="28" ry="10" fill="#1e293b" stroke="#38bdf8" stroke-width="4"/>
        <line x1="192" y1="275" x2="228" y2="275" stroke="#fff" stroke-width="2.5"/>
        <text x="155" y="295" fill="#7dd3fc" font-size="10" font-weight="700">V. Tricúspide</text>
      </g>

      <!-- 5. Ventrículo Derecho (VD) -->
      <g class="g07-hotspot" data-id="vd" data-name="Ventrículo Derecho (VD)">
        <path d="M 185 295 C 170 360 210 410 265 420 L 265 295 Z" fill="#0284c7" opacity="0.5" stroke="#38bdf8" stroke-width="2"/>
        <text x="225" y="360" fill="#fff" font-size="13" font-weight="800" text-anchor="middle">VD</text>
      </g>

      <!-- 6. Tabique Interventricular (Septum IV) -->
      <g class="g07-hotspot" data-id="septum" data-name="Tabique Interventricular">
        <path d="M 275 250 L 275 440 L 305 440 L 305 250 Z" fill="#9f1239" stroke="#fda4af" stroke-width="2"/>
        <ellipse cx="290" cy="265" rx="10" ry="14" fill="#fb7185" opacity="0.8"/>
        <text x="290" y="350" fill="#fff" font-size="10" font-weight="700" text-anchor="middle" transform="rotate(-90 290 350)">Septum IV</text>
      </g>

      <!-- 7. Aurícula Izquierda (AI) -->
      <g class="g07-hotspot" data-id="ai" data-name="Aurícula Izquierda (AI)">
        <ellipse cx="380" cy="205" rx="38" ry="42" fill="#be123c" opacity="0.6" stroke="#fb7185" stroke-width="2"/>
        <text x="380" y="210" fill="#fff" font-size="13" font-weight="800" text-anchor="middle">AI</text>
      </g>

      <!-- 8. Válvula Mitral (Bicúspide) -->
      <g class="g07-hotspot" data-id="mitral" data-name="Válvula Mitral">
        <ellipse cx="370" cy="275" rx="28" ry="10" fill="#1e293b" stroke="#f43f5e" stroke-width="4"/>
        <line x1="352" y1="275" x2="388" y2="275" stroke="#fff" stroke-width="2.5"/>
        <text x="415" y="295" fill="#fda4af" font-size="10" font-weight="700">V. Mitral</text>
      </g>

      <!-- 9. Ventrículo Izquierdo (VI) -->
      <g class="g07-hotspot" data-id="vi" data-name="Ventrículo Izquierdo (VI)">
        <path d="M 315 295 L 315 425 C 370 420 420 365 405 295 Z" fill="#e11d48" opacity="0.5" stroke="#fb7185" stroke-width="2"/>
        <text x="360" y="360" fill="#fff" font-size="14" font-weight="800" text-anchor="middle">VI</text>
      </g>

      <!-- 10. Válvula Aórtica (Tracto de salida) -->
      <g class="g07-hotspot" data-id="valvula_aortica" data-name="Válvula Aórtica">
        <ellipse cx="300" cy="225" rx="18" ry="8" fill="#1e293b" stroke="#ef4444" stroke-width="3"/>
        <circle cx="300" cy="225" r="5" fill="#fca5a5"/>
        <text x="290" y="208" fill="#fca5a5" font-size="9" font-weight="700" text-anchor="middle">V. Aórtica</text>
      </g>
    `,
    targets: [
      {
        id: "mitral",
        title: "Válvula Mitral (Bicúspide)",
        cue: "Válvula auriculoventricular izquierda compuesta por valvas anterior y posterior; su insuficiencia da soplo holosistólico apical.",
        spatialHint: "Localiza la válvula ubicada entre la Aurícula Izquierda y el Ventrículo Izquierdo.",
        officialName: "Valva atrioventricularis sinistra (Valva mitralis)",
        relations: "Anclada por cuerdas tendinosas a los músculos papilares anterolateral y posteromedial del VI.",
        clinical: "La ruptura de cuerdas tendinosas o del músculo papilar posteromedial post-IAM causa edema agudo de pulmón fulminante. La estenosis mitral por fiebre reumática genera sobrecarga auricular izquierda.",
        pearl: "El soplo de insuficiencia mitral es holosistólico en ápex y se irradia a la axila. En cambio, el prolapso mitral presenta clic mesosistólico que se adelanta con maniobras de Valsalva."
      },
      {
        id: "valvula_aortica",
        title: "Válvula Aórtica (Semilunar)",
        cue: "Regula el flujo eyectivo del ventrículo izquierdo hacia la aorta; su estenosis calcificada produce síncope y angina de esfuerzo.",
        spatialHint: "Busca la válvula semilunar en el centro del corazón, en el tracto de salida del VI hacia la raíz de la aorta.",
        officialName: "Valva aortae",
        relations: "Presenta 3 cúspides semilunares (valva coronaria derecha, izquierda y no coronaria) con los senos de Valsalva.",
        clinical: "La estenosis aórtica severa se caracteriza por la tríada clásica de SAD (Síncope, Angina, Disnea) y pulso 'parvus et tardus'. Su reemplazo quirúrgico o percutáneo (TAVI) está indicado al hacerse sintomática.",
        pearl: "La válvula aórtica bicúspide es la anomalía cardíaca congénita más común de la población general (1-2%), predisponiendo a estenosis aórtica temprana (quinta década) y disección aórtica."
      },
      {
        id: "septum",
        title: "Tabique Interventricular (Porción Membranosa)",
        cue: "Pared que divide ambos ventrículos; asiento del 70-80% de las comunicaciones interventriculares (CIV).",
        spatialHint: "Estructura central gruesa vertical que separa el ventrículo derecho del izquierdo.",
        officialName: "Septum interventriculare (pars membranacea)",
        relations: "En íntima relación con el haz de His del sistema de conducción eléctrica cardíaco.",
        clinical: "Una CIV produce un soplo holosistólico en barra en borde esternal izquierdo inferior con frémito. Los defectos no corregidos a largo plazo pueden revertir el cortocircuito de derecha a izquierda (Síndrome de Eisenmenger).",
        pearl: "La porción membranosa del tabique se forma por la fusión del cojinete endocárdico, el tabique conotruncal y el tabique muscular. Es la estructura que falla en cerrarse en la Tetralogía de Fallot."
      },
      {
        id: "tricuspide",
        title: "Válvula Tricúspide",
        cue: "Válvula de tres valvas que separa la AD del VD; diana típica de endocarditis infecciosa en usuarios de drogas endovenosas.",
        spatialHint: "Válvula situada en el lado derecho entre la Aurícula Derecha y el Ventrículo Derecho.",
        officialName: "Valva atrioventricularis dextra (Valva tricuspidalis)",
        relations: "Constituida por valvas anterior, posterior y septal; insertada en el anillo fibroso derecho.",
        clinical: "Su regurgitación produce ondas 'v' gigantes en el pulso venoso yugular y soplo holosistólico que se acentúa con la inspiración profunda (Signo de Carvallo).",
        pearl: "La anomalía de Ebstein es el desplazamiento apical congénito de la valva septal tricuspídea hacia el ventrículo derecho, provocando 'atrialización' del VD; asociada a la exposición materna a Litio."
      }
    ]
  },
  {
    id: "fig-03",
    title: "Vía Biliar & Complejo Duodenal",
    sub: "Árbol Biliar Extrahepático & Páncreas",
    dept: "Cirugía General & Gastroenterología",
    svgViewBox: "0 0 600 480",
    svgContent: `
      <!-- 1. Duodeno en 'C' -->
      <g class="g07-hotspot" data-id="duodeno" data-name="Segunda Porción Duodenal (Descendente)">
        <path d="M 280 120 C 370 120 400 160 400 240 C 400 320 370 380 260 380" fill="none" stroke="#fdba74" stroke-width="44" stroke-linecap="round"/>
        <path d="M 280 120 C 370 120 400 160 400 240 C 400 320 370 380 260 380" fill="none" stroke="#c2410c" stroke-width="2"/>
        <text x="440" y="245" fill="#fed7aa" font-size="11" font-weight="800">Duodeno (D2)</text>
      </g>

      <!-- 2. Cabeza del Páncreas -->
      <g class="g07-hotspot" data-id="pancreas" data-name="Cabeza del Páncreas">
        <ellipse cx="320" cy="250" rx="55" ry="60" fill="#f59e0b" opacity="0.4" stroke="#d97706" stroke-width="2"/>
        <path d="M 320 220 L 170 200" fill="none" stroke="#f59e0b" stroke-width="24" stroke-linecap="round" opacity="0.4"/>
        <text x="320" y="260" fill="#fff" font-size="11" font-weight="800" text-anchor="middle">Cabeza del Páncreas</text>
      </g>

      <!-- 3. Vesícula Biliar -->
      <g class="g07-hotspot" data-id="vesicula" data-name="Vesícula Biliar">
        <path d="M 140 180 C 110 130 130 80 160 70 C 190 60 210 110 190 160 Z" fill="#10b981" opacity="0.8" stroke="#059669" stroke-width="3"/>
        <text x="145" y="120" fill="#fff" font-size="11" font-weight="800">Vesícula</text>
      </g>

      <!-- 4. Conducto Cístico -->
      <g class="g07-hotspot" data-id="cistico" data-name="Conducto Cístico">
        <path d="M 185 165 C 205 175 220 160 235 170" fill="none" stroke="#10b981" stroke-width="8" stroke-linecap="round"/>
        <text x="180" y="195" fill="#6ee7b7" font-size="9" font-weight="700">C. Cístico</text>
      </g>

      <!-- 5. Conducto Hepático Común -->
      <g class="g07-hotspot" data-id="hepatico_comun" data-name="Conducto Hepático Común">
        <path d="M 235 110 L 235 170" fill="none" stroke="#10b981" stroke-width="9" stroke-linecap="round"/>
        <text x="210" y="130" fill="#6ee7b7" font-size="9" font-weight="700">Hepático</text>
      </g>

      <!-- 6. Conducto Colédoco -->
      <g class="g07-hotspot" data-id="coledoco" data-name="Conducto Colédoco">
        <path d="M 235 170 C 240 220 270 240 330 255" fill="none" stroke="#10b981" stroke-width="11" stroke-linecap="round"/>
        <text x="235" y="230" fill="#34d399" font-size="12" font-weight="800">Colédoco</text>
      </g>

      <!-- 7. Conducto Pancreático Principal (Wirsung) -->
      <g class="g07-hotspot" data-id="wirsung" data-name="Conducto Pancreático Principal (Wirsung)">
        <path d="M 180 200 C 230 210 280 230 330 255" fill="none" stroke="#f8fafc" stroke-width="5" stroke-dasharray="3,3" stroke-linecap="round"/>
        <text x="230" y="210" fill="#f8fafc" font-size="9" font-weight="700">Wirsung</text>
      </g>

      <!-- 8. Ampolla de Vater & Esfínter de Oddi -->
      <g class="g07-hotspot" data-id="ampolla" data-name="Ampolla de Vater / Papila Duodenal Mayor">
        <circle cx="335" cy="256" r="14" fill="#06b6d4" stroke="#fff" stroke-width="3"/>
        <text x="365" y="280" fill="#38bdf8" font-size="10" font-weight="800">Ampolla de Vater</text>
      </g>
    `,
    targets: [
      {
        id: "coledoco",
        title: "Conducto Colédoco",
        cue: "Conducto biliar principal formado por la confluencia del cístico y el hepático común; su obstrucción litiásica genera coledocolitiasis.",
        spatialHint: "Sigue el conducto verde que desciende desde la unión del cístico y se introduce detrás de la cabeza del páncreas.",
        officialName: "Ductus choledochus",
        relations: "Discurre en el borde libre del omento menor (ligamento hepatoduodenal) anterior a la vena porta y a la derecha de la arteria hepática propia.",
        clinical: "La coledocolitiasis cursa con cólico biliar prolongado, ictericia fluctuante, coluria y acolia. Si se infecta de forma ascendente, produce colangitis aguda (Tríada de Charcot y Pentalogía de Reynolds).",
        pearl: "El calibre normal del colédoco en ecografía es de hasta 6 mm (aumentando ~1 mm por cada década sobre los 60 años o post-colecistectomía hasta 8-10 mm)."
      },
      {
        id: "ampolla",
        title: "Ampolla de Vater / Esfínter de Oddi",
        cue: "Desembocadura común del colédoco y del conducto de Wirsung en la pared medial de D2; diana de canulación en CPRE.",
        spatialHint: "Busca el punto de unión terminal entre el colédoco y el conducto pancreático sobre la pared del duodeno.",
        officialName: "Ampulla hepatopancreatica (Papilla duodeni major)",
        relations: "Localizada en la cara posteromedial de la segunda porción del duodeno, rodeada por el esfínter muscular de Oddi.",
        clinical: "Un lito biliar enclavado en la ampolla obstruye simultáneamente la vía biliar y la pancreática, siendo el mecanismo desencadenante principal de la Pancreatitis Aguda Biliar.",
        pearl: "En la CPRE terapéutica para extraer coledocolitiasis o colocar stents biliares, se realiza una esfinterotomía de la papila mayor con electrocauterio para seccionar las fibras del esfínter de Oddi."
      },
      {
        id: "cistico",
        title: "Conducto Cístico",
        cue: "Comunica el cuello vesicular con el conducto hepático común; su impactación litiásica causa cólico biliar o colecistitis aguda.",
        spatialHint: "Conducto corto y sinuoso que une la vesícula biliar al tronco biliar principal.",
        officialName: "Ductus cysticus",
        relations: "Contiene los pliegues espirales mucosos (válvulas de Heister) y delimita el triángulo hepatocístico de Calot.",
        clinical: "La impactación persistente de un cálculo en el cístico o en la bolsa de Hartmann causa distensión vesicular, isquemia parietal y sobrecrecimiento bacteriano (Colecistitis Aguda Litiásica).",
        pearl: "La identificación crítica durante la colecistectomía laparoscópica exige lograr la 'Visión Crítica de Seguridad de Strasberg': identificar claramente solo dos estructuras que ingresan a la vesícula (el conducto cístico y la arteria cística)."
      },
      {
        id: "pancreas",
        title: "Cabeza del Páncreas",
        cue: "Rodeada íntimamente por el marco en 'C' del duodeno; localización más frecuente del adenocarcinoma ductal pancreático.",
        spatialHint: "Masa glandular central anidada en el arco cóncavo del duodeno.",
        officialName: "Caput pancreatis",
        relations: "Atravesada en su porción posterior por el conducto colédoco distal y en íntimo contacto con la vena mesentérica superior.",
        clinical: "El cáncer de cabeza de páncreas se presenta típicamente con ictericia obstructiva indolora progresiva y vesícula biliar palpable no dolorosa (Signo de Bard y Pick / Ley de Courvoisier-Terrier).",
        pearl: "El procedimiento quirúrgico de elección con intención curativa para neoplasias de la cabeza pancreática es la Duodenopancreatectomía Cefálica (Operación de Whipple)."
      }
    ]
  }
];

let g07CurFigIdx = 0;
let g07CurTargetIdx = 0;
let g07IsTargetSolved = false;
let g07SolvedFigures = new Set();

function renderGame07(stage) {
  const container = document.createElement("div");
  container.className = "g07-container";

  container.innerHTML = `
    <!-- Barra superior de selección de figuras -->
    <div class="g07-nav-strip">
      <div class="g07-pills-row" id="g07-fig-pills-row"></div>
      <div class="g07-counter-pill" id="g07-global-stat">
        <span>Figuras:</span> <strong id="g07-fig-stat-val">1 / 3</strong>
      </div>
    </div>

    <!-- Tarjeta Principal del Desafío -->
    <div class="g07-card">
      <!-- Misión / Estructura a Localizar -->
      <div class="g07-target-mission">
        <div class="g07-target-left">
          <div class="g07-reticle-icon">🎯</div>
          <div class="g07-target-info">
            <span class="g07-target-tag" id="g07-mission-dept">Especialidad</span>
            <h2 class="g07-target-title" id="g07-mission-target-name">Nombre de Estructura</h2>
            <p class="g07-target-cue" id="g07-mission-target-cue">Descripción clínica funcional...</p>
          </div>
        </div>
        <div class="g07-target-right">
          <div class="g07-counter-pill" id="g07-fig-progress-counter">
            <span>Objetivo:</span> <strong id="g07-fig-step-val">1 / 5</strong>
          </div>
          <button class="g07-hint-btn" id="g07-btn-toggle-hint" onclick="toggleG07Hint()">
            💡 <span>Ver Pista Espacial</span>
          </button>
        </div>
      </div>

      <!-- Lienzo de la Figura Interactiva (SVG) -->
      <div class="g07-canvas-box" id="g07-canvas-box">
        <div class="g07-toast" id="g07-toast">
          <span>⚠️</span> <span id="g07-toast-msg">¡Has tocado otra estructura!</span>
        </div>
        <div class="g07-tooltip" id="g07-tooltip">Tooltip</div>
        <div class="g07-svg-wrap" id="g07-svg-wrap"></div>
      </div>

      <!-- Panel Pedagógico Post-Acierto -->
      <div class="g07-revelation-panel" id="g07-revelation-panel" style="display: none;">
        <div class="g07-rev-header">
          <div class="g07-rev-badge-title">
            <span>✓</span> <span id="g07-rev-title">¡Estructura Localizada con Precisión!</span>
          </div>
          <div class="g07-rev-xp-pill" id="g07-rev-xp">+100 XP ✨</div>
        </div>

        <div class="g07-rev-grid">
          <div class="g07-rev-card-item">
            <span class="g07-rev-label">Nombre Anatómico Oficial</span>
            <div class="g07-rev-text" id="g07-rev-official-name">Nombre</div>
          </div>
          <div class="g07-rev-card-item">
            <span class="g07-rev-label">Relaciones Anatómicas Clave</span>
            <div class="g07-rev-text" id="g07-rev-relations">Relaciones</div>
          </div>
          <div class="g07-rev-card-item" style="grid-column: 1 / -1;">
            <span class="g07-rev-label">Correlación Clínica & Quirúrgica</span>
            <div class="g07-rev-text" id="g07-rev-clinical">Clínica</div>
          </div>
        </div>

        <div class="g07-pearl-callout">
          <div class="g07-pearl-icon">💡</div>
          <div class="g07-pearl-body">
            <span class="g07-pearl-title">Perla de Examen / USMLE Board Pearl</span>
            <div class="g07-pearl-desc" id="g07-rev-pearl">Perla</div>
          </div>
        </div>

        <div class="g07-rev-actions">
          <button class="lab-btn" id="g07-btn-next-target" onclick="nextG07Target()">Siguiente Estructura →</button>
        </div>
      </div>
    </div>
  `;

  stage.appendChild(container);

  renderG07FigureNavigation();
  loadG07Figure(g07CurFigIdx);
}

function renderG07FigureNavigation() {
  const container = document.getElementById("g07-fig-pills-row");
  if (!container) return;
  container.innerHTML = "";

  GAME07_FIGURES.forEach((fig, idx) => {
    const btn = document.createElement("button");
    btn.className = `g07-tab-btn ${idx === g07CurFigIdx ? 'active' : ''} ${g07SolvedFigures.has(fig.id) ? 'solved' : ''}`;
    btn.innerHTML = `<span>${fig.title}</span> · <small>${fig.sub}</small>`;
    btn.addEventListener("click", () => {
      loadG07Figure(idx);
    });
    container.appendChild(btn);
  });

  const statEl = document.getElementById("g07-fig-stat-val");
  if (statEl) statEl.textContent = `${g07CurFigIdx + 1} / ${GAME07_FIGURES.length}`;
}

function loadG07Figure(idx) {
  g07CurFigIdx = idx;
  g07CurTargetIdx = 0;
  g07IsTargetSolved = false;

  renderG07FigureNavigation();

  const fig = GAME07_FIGURES[idx];
  const svgWrap = document.getElementById("g07-svg-wrap");
  if (svgWrap) {
    svgWrap.innerHTML = `
      <svg viewBox="${fig.svgViewBox}" xmlns="http://www.w3.org/2000/svg">
        ${fig.svgContent}
      </svg>
    `;
  }

  setupG07HotspotListeners();
  loadG07Target(0);

  const panel = document.getElementById("g07-revelation-panel");
  if (panel) panel.style.display = "none";
}

function loadG07Target(targetIndex) {
  g07CurTargetIdx = targetIndex;
  g07IsTargetSolved = false;

  const fig = GAME07_FIGURES[g07CurFigIdx];
  const target = fig.targets[g07CurTargetIdx];

  const deptEl = document.getElementById("g07-mission-dept");
  const nameEl = document.getElementById("g07-mission-target-name");
  const cueEl = document.getElementById("g07-mission-target-cue");
  const stepEl = document.getElementById("g07-fig-step-val");

  if (deptEl) deptEl.textContent = fig.dept;
  if (nameEl) nameEl.textContent = target.title;
  if (cueEl) cueEl.textContent = target.cue;
  if (stepEl) stepEl.textContent = `${g07CurTargetIdx + 1} / ${fig.targets.length}`;

  const hintBtn = document.getElementById("g07-btn-toggle-hint");
  if (hintBtn) {
    hintBtn.innerHTML = `💡 <span>Ver Pista Espacial</span>`;
    hintBtn.style.background = "";
  }

  const panel = document.getElementById("g07-revelation-panel");
  if (panel) panel.style.display = "none";
}

function setupG07HotspotListeners() {
  const tooltip = document.getElementById("g07-tooltip");
  const box = document.getElementById("g07-canvas-box");

  document.querySelectorAll(".g07-hotspot").forEach(zone => {
    const structName = zone.getAttribute("data-name");

    zone.addEventListener("mouseenter", (e) => {
      if (tooltip) {
        tooltip.style.display = "block";
        tooltip.textContent = structName;
      }
    });

    zone.addEventListener("mousemove", (e) => {
      if (tooltip && box) {
        const rect = box.getBoundingClientRect();
        tooltip.style.left = `${e.clientX - rect.left + 15}px`;
        tooltip.style.top = `${e.clientY - rect.top - 25}px`;
      }
    });

    zone.addEventListener("mouseleave", () => {
      if (tooltip) tooltip.style.display = "none";
    });

    zone.addEventListener("click", () => {
      if (g07IsTargetSolved) return;
      const clickedId = zone.getAttribute("data-id");
      handleG07HotspotClick(clickedId, zone);
    });
  });
}

function handleG07HotspotClick(clickedId, element) {
  const fig = GAME07_FIGURES[g07CurFigIdx];
  const expectedTarget = fig.targets[g07CurTargetIdx];

  if (clickedId === expectedTarget.id) {
    // ACIERTO
    g07IsTargetSolved = true;
    element.classList.add("solved");

    LabGamification.addXP(100, "Estructura Localizada");
    LabGamification.incrementStreak();
    LabGamification.unlockBadge("anatomy_scout");

    showG07RevelationPanel(expectedTarget);

    if (g07CurTargetIdx === fig.targets.length - 1) {
      g07SolvedFigures.add(fig.id);
      renderG07FigureNavigation();
      LabGamification.triggerConfetti();
      setTimeout(() => {
        LabGamification.addXP(250, "¡Figura Completa!");
        showToast("success", `🏆 ¡Excelente! Has completado todas las estructuras de: ${fig.title}`);
      }, 500);
    }
  } else {
    // ERROR
    playLabErrorSound();
    LabGamification.resetStreak();

    element.classList.add("error-shake");
    setTimeout(() => element.classList.remove("error-shake"), 400);

    const clickedName = element.getAttribute("data-name");
    showG07Toast(`⚠️ Has tocado: ${clickedName}. Busca: ${expectedTarget.title}`);
  }
}

function showG07Toast(msg) {
  const toast = document.getElementById("g07-toast");
  const msgEl = document.getElementById("g07-toast-msg");
  if (!toast || !msgEl) return;

  msgEl.textContent = msg;
  toast.classList.add("visible");
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 2400);
}

function toggleG07Hint() {
  const fig = GAME07_FIGURES[g07CurFigIdx];
  const target = fig.targets[g07CurTargetIdx];
  const hintBtn = document.getElementById("g07-btn-toggle-hint");
  if (!hintBtn) return;

  hintBtn.innerHTML = `🧭 <span>${target.spatialHint}</span>`;
  hintBtn.style.background = "rgba(245, 158, 11, 0.3)";
}

function showG07RevelationPanel(target) {
  const panel = document.getElementById("g07-revelation-panel");
  if (!panel) return;
  panel.style.display = "flex";

  const titleEl = document.getElementById("g07-rev-title");
  const xpEl = document.getElementById("g07-rev-xp");
  const nameEl = document.getElementById("g07-rev-official-name");
  const relEl = document.getElementById("g07-rev-relations");
  const clinEl = document.getElementById("g07-rev-clinical");
  const pearlEl = document.getElementById("g07-rev-pearl");

  if (titleEl) titleEl.textContent = `¡${target.title} Localizada!`;
  if (xpEl) xpEl.textContent = `+100 XP ✨ Racha x${LabGamification.streak}`;
  if (nameEl) nameEl.textContent = target.officialName;
  if (relEl) relEl.textContent = target.relations;
  if (clinEl) clinEl.textContent = target.clinical;
  if (pearlEl) pearlEl.textContent = target.pearl;

  const fig = GAME07_FIGURES[g07CurFigIdx];
  const nextBtn = document.getElementById("g07-btn-next-target");
  if (nextBtn) {
    if (g07CurTargetIdx < fig.targets.length - 1) {
      nextBtn.textContent = `Siguiente Estructura (${g07CurTargetIdx + 2}/${fig.targets.length}) →`;
    } else {
      nextBtn.textContent = `¡Figura Completada! Siguiente Esquema →`;
    }
  }

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextG07Target() {
  const fig = GAME07_FIGURES[g07CurFigIdx];
  if (g07CurTargetIdx < fig.targets.length - 1) {
    loadG07Target(g07CurTargetIdx + 1);
  } else {
    if (g07CurFigIdx < GAME07_FIGURES.length - 1) {
      loadG07Figure(g07CurFigIdx + 1);
    } else {
      loadG07Figure(0);
    }
  }
}


// ========================================================
// JUEGO 08: THERAPEUTIC SPACE SHOOTER (SELECCIÓN TERAPÉUTICA CON 4 TIPOS DE BALAS)
// ========================================================

const GAME08_WAVES = [
  {
    id: "wave-01",
    title: "Artropatías & Reumatología",
    shortTitle: "Reumatología",
    weapons: [
      { slot: 0, key: "1", name: "Dicloxacilina IV", sub: "Anti-Estafilococo (S. aureus)", color: "#38bdf8" },
      { slot: 1, key: "2", name: "Colchicina + AINEs", sub: "Anti-Gotosa (Cristales Urato)", color: "#34d399" },
      { slot: 2, key: "3", name: "Metotrexato", sub: "FARME (Artritis Reumatoide)", color: "#a78bfa" },
      { slot: 3, key: "4", name: "Artrocentesis", sub: "Drenaje Descompresivo", color: "#fbbf24" }
    ],
    enemies: [
      { id: "e1", name: "Artritis Séptica", cue: "S. aureus · Líquido >50k leucos", weaknessSlot: 0, hp: 1, speed: 0.9, icon: "🦠", color: "#f87171" },
      { id: "e2", name: "Ataque Agudo de Gota", cue: "Cristales UMS birrefringentes -", weaknessSlot: 1, hp: 1, speed: 0.85, icon: "🦶", color: "#fb923c" },
      { id: "e3", name: "Artritis Reumatoide", cue: "Poliartritis simétrica · Anti-CCP+", weaknessSlot: 2, hp: 1, speed: 0.75, icon: "🤲", color: "#c084fc" },
      { id: "e4", name: "Derrame Articular a Tensión", cue: "Líquido purulento a presión", weaknessSlot: 3, hp: 1, speed: 0.8, icon: "💉", color: "#fde047" }
    ],
    pedagogy: [
      { pat: "Artritis Séptica", tx: "Dicloxacilina / Cefazolina (o Vancomicina si hay sospecha de MRSA)", rationale: "Urgencia médica reumatológica. El S. aureus destruye el cartílago articular en 48 horas sin antibioticoterapia bactericida temprana." },
      { pat: "Ataque Agudo de Gota", tx: "Colchicina oral (1.2 mg seguido de 0.6 mg) + AINEs", rationale: "Inhibe la polimerización de tubulina y la quimiotaxis neutrofílica hacia los cristales de urato monosódico en la sinovia." },
      { pat: "Artritis Reumatoide Activa", tx: "Metotrexato (Dosis semanal 15-25 mg) + Ácido Fólico", rationale: "Pilar de inicio en AR (FARME sintético convencional). Inhibe la dihidrofolato reductasa reduciendo la proliferación sinovial destructiva." },
      { pat: "Derrame Articular a Tensión", tx: "Artrocentesis evacuadora y diagnóstica", rationale: "Alivia de inmediato el dolor por sobrepresión capsular intraarticular y proporciona líquido para citoquímico y tinción de Gram." }
    ]
  },
  {
    id: "wave-02",
    title: "Infectología & Bacterias",
    shortTitle: "Infectología",
    weapons: [
      { slot: 0, key: "1", name: "Vancomicina IV", sub: "Glicopéptido (MRSA Gram+)", color: "#38bdf8" },
      { slot: 1, key: "2", name: "Meropenem / Pip-Tazo", sub: "Carbapenémico (Pseudomonas)", color: "#34d399" },
      { slot: 2, key: "3", name: "Fidaxomicina / Vanco VO", sub: "Colitis por C. difficile", color: "#a78bfa" },
      { slot: 3, key: "4", name: "Amoxi-Clavulanato", sub: "Neumonía comunitaria típica", color: "#fbbf24" }
    ],
    enemies: [
      { id: "e1", name: "Staphylococcus aureus MRSA", cue: "Gen mecA · PBP2a mutada", weaknessSlot: 0, hp: 1, speed: 0.95, icon: "🧫", color: "#f87171" },
      { id: "e2", name: "Pseudomonas aeruginosa", cue: "Bacilo Gram- no fermentador", weaknessSlot: 1, hp: 1, speed: 0.85, icon: "🧪", color: "#34d399" },
      { id: "e3", name: "Clostridioides difficile", cue: "Toxinas A y B post-antibióticos", weaknessSlot: 2, hp: 1, speed: 0.8, icon: "⚠️", color: "#c084fc" },
      { id: "e4", name: "Streptococcus pneumoniae", cue: "Diplococo Gram+ encapsulado", weaknessSlot: 3, hp: 1, speed: 0.9, icon: "🫁", color: "#fde047" }
    ],
    pedagogy: [
      { pat: "Staphylococcus aureus MRSA", tx: "Vancomicina IV / Daptomicina", rationale: "La mutación de la proteína ligadora de penicilina (PBP2a) confiere resistencia absoluta a todos los betalactámicos estándar." },
      { pat: "Pseudomonas aeruginosa", tx: "Meropenem o Piperacilina-Tazobactam", rationale: "Patógeno nosocomial oportunista con múltiples bombas de eflujo y betalactamasas que requiere cobertura antipseudomónica estricta." },
      { pat: "Clostridioides difficile", tx: "Fidaxomicina oral o Vancomicina oral", rationale: "Requiere antibióticos de acción luminal tópica intraintestinal; la vancomicina IV NO se excreta en el colon y es ineficaz." },
      { pat: "Streptococcus pneumoniae", tx: "Amoxicilina-Clavulanato o Ceftriaxona", rationale: "Causa número uno de NAC. Sensible a aminopenicilinas y cefalosporinas de 3ª generación." }
    ]
  },
  {
    id: "wave-03",
    title: "Toxicología & Antídotos de Urgencia",
    shortTitle: "Toxicología",
    weapons: [
      { slot: 0, key: "1", name: "N-Acetilcisteína", sub: "Donador de glutatión (NAPQI)", color: "#38bdf8" },
      { slot: 1, key: "2", name: "Naloxona IV", sub: "Antagonista mu-opioide", color: "#34d399" },
      { slot: 2, key: "3", name: "Flumazenil", sub: "Antagonista receptor GABA-A", color: "#a78bfa" },
      { slot: 3, key: "4", name: "Glucagón IV", sub: "Inótropo AMPc no dependiente", color: "#fbbf24" }
    ],
    enemies: [
      { id: "e1", name: "Sobredosis Paracetamol", cue: "Metabolito tóxico NAPQI hepático", weaknessSlot: 0, hp: 1, speed: 0.95, icon: "💊", color: "#f87171" },
      { id: "e2", name: "Sobredosis de Opioides", cue: "Miosis puntiforme + Bradipnea", weaknessSlot: 1, hp: 1, speed: 0.9, icon: "💉", color: "#34d399" },
      { id: "e3", name: "Intoxicación Benzodiacepinas", cue: "Coma flácido con signos estables", weaknessSlot: 2, hp: 1, speed: 0.8, icon: "😴", color: "#c084fc" },
      { id: "e4", name: "Intoxicación Betabloqueantes", cue: "Bradicardia severa + Shock", weaknessSlot: 3, hp: 1, speed: 0.85, icon: "🫀", color: "#fde047" }
    ],
    pedagogy: [
      { pat: "Sobredosis Paracetamol", tx: "N-Acetilcisteína (NAC)", rationale: "Restaura las reservas hepáticas de glutatión para neutralizar el metabolito tóxico NAPQI antes de la necrosis centrolobulillar." },
      { pat: "Sobredosis de Opioides", tx: "Naloxona IV / intranasal", rationale: "Desplaza competitivamente a los agonistas de los receptores mu-opioides, revirtiendo la depresión respiratoria potencialmente mortal." },
      { pat: "Intoxicación Benzodiacepinas", tx: "Flumazenil (con precaución)", rationale: "Antagonista competitivo del sitio de unión benzodiacepínico en el receptor GABA-A (cuidado con convulsiones de abstinencia)." },
      { pat: "Intoxicación Betabloqueantes", tx: "Glucagón intravenoso", rationale: "Estimula la adenilil ciclasa y aumenta el AMPc miocárdico puenteando los receptores adrenérgicos beta bloqueados." }
    ]
  }
];

let g08CurrentWaveIdx = 0;
let g08GameState = "IDLE"; // IDLE, PLAYING, WON, GAMEOVER
let g08PlayerLives = 3;
let g08Score = 0;
let g08ActiveWeaponSlot = 0;

let g08Canvas, g08Ctx;
let g08Player = { x: 300, y: 430, width: 44, height: 32, muzzleFlash: 0 };
let g08Bullets = [];
let g08ActiveEnemies = [];
let g08Particles = [];
let g08FloatingTexts = [];
let g08SpawnTimer = 0;
let g08SpawnedCount = 0;
let g08TotalToSpawn = 12;
let g08AnimationId = null;
let g08ManualTarget = null;
let g08CurrentAimAngle = -Math.PI / 2;

const g08Stars = Array.from({ length: 45 }, () => ({
  x: Math.random() * 800,
  y: Math.random() * 500,
  size: Math.random() * 1.5 + 0.5,
  speed: Math.random() * 0.4 + 0.2
}));

function renderGame08(stage) {
  const container = document.createElement("div");
  container.className = "g08-container";

  container.innerHTML = `
    <!-- Barra superior de selección de oleadas -->
    <div class="g08-wave-strip">
      <div class="g08-pills-row" id="g08-wave-pills-row"></div>
      <div class="g08-wave-tag" id="g08-wave-indicator-tag">Oleada 1: Artropatías Agudas</div>
    </div>

    <!-- Caja del Arcade -->
    <div class="g08-arcade-box">
      <div class="g08-status-bar">
        <div class="g08-status-left">
          <div class="g08-hearts" id="g08-hearts-box" title="Integridad del Escudo Clínico">
            <span>🛡️</span>
            <span id="g08-hearts-display">❤️❤️❤️</span>
          </div>
          <div class="g08-score-badge" id="g08-score-badge">Puntos: 0</div>
        </div>
        <div style="font-size:12px; color:#94a3b8;">
          Control: <strong style="color:#fff;">Cañón Fijo Central</strong> · Pulsa <strong style="color:#38bdf8;">[1][2][3][4]</strong> para disparar al objetivo fijado (o toca el invasor)
        </div>
      </div>

      <!-- Viewport del Canvas -->
      <div class="g08-canvas-viewport" id="g08-canvas-viewport">
        <canvas class="g08-canvas" id="g08-game-canvas"></canvas>

        <!-- Overlay de Inicio / Fin -->
        <div class="g08-overlay-banner" id="g08-overlay-banner">
          <div class="g08-overlay-title" id="g08-overlay-title">🛸 ¡Defensor Terapéutico Listo!</div>
          <div class="g08-overlay-sub" id="g08-overlay-sub">
            Vienen monstruos clínicos. Selecciona la bala farmacológica adecuada para cada patología y neutralízalas antes de que alcancen la línea de emergencia.
          </div>
          <button class="lab-btn" id="g08-btn-start-game" onclick="startG08Game()">▶ Comenzar Misión</button>
        </div>
      </div>

      <!-- Arsenal de 4 Cañones Farmacológicos -->
      <div class="g08-weapons-card">
        <div class="g08-weapons-header">
          <span>Arsenal Terapéutico (Pulsa el botón o teclas 1, 2, 3, 4 para disparar)</span>
          <span style="color:#38bdf8;">Munición: Ilimitada</span>
        </div>
        <div class="g08-weapons-grid" id="g08-weapons-grid"></div>
      </div>
    </div>

    <!-- Guía Pedagógica de Correspondencia -->
    <div class="g08-pedagogical-box">
      <div class="g08-ped-header">
        <span>📖 Guía de Correspondencia Terapéutica & Farmacodinámica</span>
      </div>
      <table class="g08-table" id="g08-match-reference-table"></table>
    </div>
  `;

  stage.appendChild(container);

  setupG08WaveNavigation();
  loadG08Wave(g08CurrentWaveIdx);
  initG08Canvas();
  setupG08Controls();
}

function initG08Canvas() {
  g08Canvas = document.getElementById("g08-game-canvas");
  if (!g08Canvas) return;
  g08Ctx = g08Canvas.getContext("2d");

  resizeG08Canvas();
  window.addEventListener("resize", resizeG08Canvas);

  if (g08AnimationId) cancelAnimationFrame(g08AnimationId);
  g08AnimationId = requestAnimationFrame(g08GameLoop);
}

function resizeG08Canvas() {
  const vp = document.getElementById("g08-canvas-viewport");
  if (!vp || !g08Canvas) return;
  const rect = vp.getBoundingClientRect();
  g08Canvas.width = rect.width;
  g08Canvas.height = rect.height;
  g08Player.x = g08Canvas.width / 2;
  g08Player.y = g08Canvas.height - 35;
}

function setupG08WaveNavigation() {
  const container = document.getElementById("g08-wave-pills-row");
  if (!container) return;
  container.innerHTML = "";

  GAME08_WAVES.forEach((w, idx) => {
    const btn = document.createElement("button");
    btn.className = `g08-wave-btn ${idx === g08CurrentWaveIdx ? 'active' : ''}`;
    btn.innerHTML = `<span>Oleada 0${idx + 1}</span> · <small>${w.shortTitle}</small>`;
    btn.addEventListener("click", () => {
      loadG08Wave(idx);
    });
    container.appendChild(btn);
  });
}

function loadG08Wave(idx) {
  g08CurrentWaveIdx = idx;
  const wave = GAME08_WAVES[idx];

  document.querySelectorAll(".g08-wave-btn").forEach((b, i) => {
    b.classList.toggle("active", i === idx);
  });

  const tag = document.getElementById("g08-wave-indicator-tag");
  if (tag) tag.textContent = `Oleada 0${idx + 1}: ${wave.title}`;

  renderG08WeaponButtons(wave);
  renderG08PedagogyTable(wave);

  // Reiniciar estado
  g08Bullets = [];
  g08ActiveEnemies = [];
  g08Particles = [];
  g08FloatingTexts = [];
  g08SpawnedCount = 0;
  g08PlayerLives = 3;
  updateG08Hearts();

  showG08Banner("🛸 ¡Oleada Lista!", `Enfrenta: ${wave.title}. Selecciona la bala farmacológica indicada para cada patología.`, "▶ Iniciar Oleada");
}

function renderG08WeaponButtons(wave) {
  const grid = document.getElementById("g08-weapons-grid");
  if (!grid) return;
  grid.innerHTML = "";

  wave.weapons.forEach(w => {
    const btn = document.createElement("button");
    btn.className = `g08-weapon-btn ${w.slot === g08ActiveWeaponSlot ? 'active' : ''}`;
    btn.setAttribute("data-slot", w.slot);

    btn.innerHTML = `
      <span class="g08-key-badge">[${w.key}]</span>
      <div class="g08-weapon-title" style="color:${w.color};">
        <span>●</span> ${w.name}
      </div>
      <div class="g08-weapon-sub">${w.sub}</div>
    `;

    btn.addEventListener("click", () => {
      selectG08Weapon(w.slot);
      if (g08GameState === "PLAYING") {
        fireG08Bullet();
      }
    });

    grid.appendChild(btn);
  });
}

function renderG08PedagogyTable(wave) {
  const table = document.getElementById("g08-match-reference-table");
  if (!table) return;
  let html = `
    <thead>
      <tr>
        <th>Patología Invasora</th>
        <th>Tratamiento de Elección (Bala)</th>
        <th>Racional Fisiopatológico / Guías</th>
      </tr>
    </thead>
    <tbody>
  `;

  wave.pedagogy.forEach(item => {
    html += `
      <tr>
        <td><strong>${item.pat}</strong></td>
        <td><span style="color:#38bdf8; font-weight:700;">${item.tx}</span></td>
        <td>${item.rationale}</td>
      </tr>
    `;
  });

  html += `</tbody>`;
  table.innerHTML = html;
}

function selectG08Weapon(slot) {
  g08ActiveWeaponSlot = slot;
  document.querySelectorAll(".g08-weapon-btn").forEach(b => {
    b.classList.toggle("active", parseInt(b.getAttribute("data-slot")) === slot);
  });
}

function updateG08Hearts() {
  const display = document.getElementById("g08-hearts-display");
  if (!display) return;
  let hearts = "";
  for (let i = 0; i < g08PlayerLives; i++) hearts += "❤️";
  for (let i = g08PlayerLives; i < 3; i++) hearts += "🖤";
  display.textContent = hearts;
}

function getG08TargetEnemy() {
  if (g08ManualTarget && g08ActiveEnemies.includes(g08ManualTarget)) {
    return g08ManualTarget;
  }
  g08ManualTarget = null;
  if (g08ActiveEnemies.length === 0) return null;
  return g08ActiveEnemies.reduce((lowest, curr) => curr.y > lowest.y ? curr : lowest, g08ActiveEnemies[0]);
}

function setupG08Controls() {
  const vp = document.getElementById("g08-canvas-viewport");
  if (!vp) return;

  vp.addEventListener("pointerdown", (e) => {
    if (g08GameState !== "PLAYING" || !g08Canvas) return;
    const rect = g08Canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let clickedEnemy = null;
    for (let enemy of g08ActiveEnemies) {
      if (Math.hypot(clickX - enemy.x, clickY - enemy.y) < enemy.radius + 18) {
        clickedEnemy = enemy;
        break;
      }
    }

    if (clickedEnemy) {
      g08ManualTarget = clickedEnemy;
    }
    fireG08Bullet();
  });

  window.addEventListener("keydown", (e) => {
    if (activeGameId !== "game-08") return;
    if (e.key === "1") { selectG08Weapon(0); fireG08Bullet(); }
    else if (e.key === "2") { selectG08Weapon(1); fireG08Bullet(); }
    else if (e.key === "3") { selectG08Weapon(2); fireG08Bullet(); }
    else if (e.key === "4") { selectG08Weapon(3); fireG08Bullet(); }
    else if (e.code === "Space") {
      e.preventDefault();
      if (g08GameState === "PLAYING") fireG08Bullet();
    }
  });
}

function fireG08Bullet() {
  if (g08GameState !== "PLAYING" || !g08Canvas) return;
  const wave = GAME08_WAVES[g08CurrentWaveIdx];
  const weapon = wave.weapons[g08ActiveWeaponSlot];
  const target = getG08TargetEnemy();

  g08Player.x = g08Canvas.width / 2;
  g08Player.y = g08Canvas.height - 35;

  let vx = 0;
  let vy = -15;
  if (target) {
    const dx = target.x - g08Player.x;
    const dy = target.y - (g08Player.y - 18);
    const dist = Math.hypot(dx, dy) || 1;
    const speed = 16;
    vx = (dx / dist) * speed;
    vy = (dy / dist) * speed;
  }

  g08Bullets.push({
    x: g08Player.x,
    y: g08Player.y - 18,
    vx: vx,
    vy: vy,
    targetRef: target,
    slot: g08ActiveWeaponSlot,
    color: weapon.color,
    radius: 6
  });

  g08Player.muzzleFlash = 8;
  playLabTone(750 + g08ActiveWeaponSlot * 90, 'sawtooth', 0.08, 0.06);
}

function startG08Game() {
  const banner = document.getElementById("g08-overlay-banner");
  if (banner) banner.style.display = "none";
  g08GameState = "PLAYING";
  g08SpawnTimer = 0;
  g08Score = 0;
  g08SpawnedCount = 0;
  g08PlayerLives = 3;
  updateG08Hearts();
  const sb = document.getElementById("g08-score-badge");
  if (sb) sb.textContent = `Puntos: ${g08Score}`;
}

function showG08Banner(title, sub, btnText) {
  const banner = document.getElementById("g08-overlay-banner");
  if (!banner) return;
  banner.style.display = "flex";
  document.getElementById("g08-overlay-title").textContent = title;
  document.getElementById("g08-overlay-sub").textContent = sub;
  const btn = document.getElementById("g08-btn-start-game");
  if (btn) btn.textContent = btnText;
}

function g08GameLoop() {
  if (activeGameId === "game-08" && g08Canvas && g08Ctx) {
    updateG08();
    drawG08();
  }
  g08AnimationId = requestAnimationFrame(g08GameLoop);
}

function updateG08() {
  if (g08GameState !== "PLAYING") return;

  const wave = GAME08_WAVES[g08CurrentWaveIdx];

  // Spawn de invasores
  g08SpawnTimer++;
  if (g08SpawnTimer > 85 && g08SpawnedCount < g08TotalToSpawn) {
    g08SpawnTimer = 0;
    spawnG08Enemy(wave);
  }

  // Actualizar proyectiles
  for (let i = g08Bullets.length - 1; i >= 0; i--) {
    const b = g08Bullets[i];
    b.x += b.vx;
    b.y += b.vy;

    let hit = false;
    for (let j = g08ActiveEnemies.length - 1; j >= 0; j--) {
      const e = g08ActiveEnemies[j];
      const dist = Math.hypot(b.x - e.x, b.y - e.y);

      if (dist < e.radius + b.radius + 8) {
        hit = true;
        handleG08Collision(b, e, j);
        break;
      }
    }

    if (hit || b.y < -20 || b.y > g08Canvas.height + 20 || b.x < -20 || b.x > g08Canvas.width + 20) {
      g08Bullets.splice(i, 1);
    }
  }

  // Actualizar invasores
  for (let i = g08ActiveEnemies.length - 1; i >= 0; i--) {
    const e = g08ActiveEnemies[i];
    e.y += e.speed;

    if (e.y > g08Canvas.height - 20) {
      g08ActiveEnemies.splice(i, 1);
      g08PlayerLives--;
      updateG08Hearts();
      playLabErrorSound();
      createG08FloatingText("¡BRECHA CLÍNICA! (-1 Vida)", e.x, g08Canvas.height - 40, "#f43f5e");

      if (g08PlayerLives <= 0) {
        handleG08GameOver();
      }
    }
  }

  // Partículas
  for (let i = g08Particles.length - 1; i >= 0; i--) {
    const p = g08Particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.02;
    if (p.alpha <= 0) g08Particles.splice(i, 1);
  }

  // Comprobar victoria
  if (g08SpawnedCount >= g08TotalToSpawn && g08ActiveEnemies.length === 0 && g08PlayerLives > 0) {
    handleG08WaveWin();
  }
}

function spawnG08Enemy(wave) {
  const template = wave.enemies[Math.floor(Math.random() * wave.enemies.length)];
  const laneWidth = g08Canvas.width - 120;
  const xPos = 60 + Math.random() * laneWidth;

  g08ActiveEnemies.push({
    ...template,
    x: xPos,
    y: -40,
    radius: 26,
    shieldPulse: 0
  });
  g08SpawnedCount++;
}

function handleG08Collision(bullet, enemy, enemyIndex) {
  const isMatch = (bullet.slot === enemy.weaknessSlot);

  if (isMatch) {
    createG08Explosion(enemy.x, enemy.y, bullet.color);
    g08ActiveEnemies.splice(enemyIndex, 1);

    g08Score += 150 * LabGamification.streak;
    const sb = document.getElementById("g08-score-badge");
    if (sb) sb.textContent = `Puntos: ${g08Score}`;

    LabGamification.addXP(100, "Tratamiento Certero");
    LabGamification.incrementStreak();
    LabGamification.unlockBadge("therapeutic_sniper");

    playLabTone(220, 'sine', 0.2, 0.12);
    createG08FloatingText(`¡CRÍTICO! +${150 * LabGamification.streak}`, enemy.x, enemy.y, "#34d399");
  } else {
    enemy.shieldPulse = 18;
    playLabErrorSound();
    LabGamification.resetStreak();

    createG08FloatingText("¡RESISTENTE / IATROGENIA!", enemy.x, enemy.y - 15, "#f43f5e");
  }
}

function handleG08WaveWin() {
  g08GameState = "WON";
  LabGamification.triggerConfetti();
  LabGamification.addXP(300, "¡Oleada Superada!");
  showG08Banner("🏆 ¡Oleada Despejada con Éxito!", `Has neutralizado a todos los invasores clínicos con las armas terapéuticas correctas.`, "▶ Continuar / Siguiente Oleada");

  const btn = document.getElementById("g08-btn-start-game");
  if (btn) {
    btn.onclick = () => {
      if (g08CurrentWaveIdx < GAME08_WAVES.length - 1) {
        loadG08Wave(g08CurrentWaveIdx + 1);
      } else {
        loadG08Wave(0);
      }
      startG08Game();
    };
  }
}

function handleG08GameOver() {
  g08GameState = "GAMEOVER";
  playLabErrorSound();
  showG08Banner("💀 Defensas Desbordadas", "Las patologías superaron el umbral clínico. Revisa la guía de farmacodinamia abajo e inténtalo de nuevo.", "↺ Reintentar Oleada");

  const btn = document.getElementById("g08-btn-start-game");
  if (btn) {
    btn.onclick = () => {
      loadG08Wave(g08CurrentWaveIdx);
      startG08Game();
    };
  }
}

function createG08Explosion(x, y, color) {
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = Math.random() * 5 + 1.5;
    g08Particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      color: color,
      radius: Math.random() * 3 + 2,
      alpha: 1
    });
  }
}

function createG08FloatingText(text, x, y, color) {
  g08FloatingTexts.push({ text, x, y, color, alpha: 1, vy: -1.2 });
}

function drawG08() {
  g08Ctx.clearRect(0, 0, g08Canvas.width, g08Canvas.height);

  // Estrellas
  g08Ctx.fillStyle = "#334155";
  g08Stars.forEach(s => {
    s.y += s.speed;
    if (s.y > g08Canvas.height) s.y = 0;
    g08Ctx.beginPath();
    g08Ctx.arc(s.x % g08Canvas.width, s.y, s.size, 0, Math.PI * 2);
    g08Ctx.fill();
  });

  // Balas
  g08Bullets.forEach(b => {
    g08Ctx.save();
    g08Ctx.fillStyle = b.color;
    g08Ctx.shadowColor = b.color;
    g08Ctx.shadowBlur = 14;

    const bulletAngle = Math.atan2(b.vy, b.vx);
    g08Ctx.translate(b.x, b.y);
    g08Ctx.rotate(bulletAngle + Math.PI / 2);

    // Proyectil de plasma alargado en dirección de tiro
    g08Ctx.beginPath();
    g08Ctx.roundRect(-3.5, -12, 7, 24, 3.5);
    g08Ctx.fill();

    // Núcleo blanco brillante
    g08Ctx.fillStyle = "#ffffff";
    g08Ctx.beginPath();
    g08Ctx.roundRect(-1.5, -8, 3, 16, 1.5);
    g08Ctx.fill();

    g08Ctx.restore();
  });

  const lockedTarget = getG08TargetEnemy();

  // Línea de rastreo láser hacia el objetivo fijado
  if (lockedTarget && g08GameState === "PLAYING") {
    g08Ctx.save();
    g08Ctx.beginPath();
    g08Ctx.moveTo(g08Player.x, g08Player.y - 18);
    g08Ctx.lineTo(lockedTarget.x, lockedTarget.y);
    g08Ctx.strokeStyle = "rgba(56, 189, 248, 0.28)";
    g08Ctx.setLineDash([6, 6]);
    g08Ctx.lineWidth = 1.5;
    g08Ctx.stroke();
    g08Ctx.restore();
  }

  // Enemigos
  g08ActiveEnemies.forEach(e => {
    g08Ctx.save();
    g08Ctx.translate(e.x, e.y);

    const isLocked = (e === lockedTarget && g08GameState === "PLAYING");

    // Retícula de objetivo fijado (HUD)
    if (isLocked) {
      const pulse = Math.sin(Date.now() / 150) * 3;
      const r = e.radius + 12 + pulse;

      g08Ctx.strokeStyle = "#38bdf8";
      g08Ctx.lineWidth = 2;
      g08Ctx.setLineDash([8, 6]);
      g08Ctx.beginPath();
      g08Ctx.arc(0, 0, r, 0, Math.PI * 2);
      g08Ctx.stroke();
      g08Ctx.setLineDash([]);

      // 4 esquinas de mira HUD
      const cornerSize = 8;
      g08Ctx.strokeStyle = "#38bdf8";
      g08Ctx.lineWidth = 2.5;

      // Arriba izquierda
      g08Ctx.beginPath();
      g08Ctx.moveTo(-r, -r + cornerSize); g08Ctx.lineTo(-r, -r); g08Ctx.lineTo(-r + cornerSize, -r);
      g08Ctx.stroke();
      // Arriba derecha
      g08Ctx.beginPath();
      g08Ctx.moveTo(r - cornerSize, -r); g08Ctx.lineTo(r, -r); g08Ctx.lineTo(r, -r + cornerSize);
      g08Ctx.stroke();
      // Abajo izquierda
      g08Ctx.beginPath();
      g08Ctx.moveTo(-r, r - cornerSize); g08Ctx.lineTo(-r, r); g08Ctx.lineTo(-r + cornerSize, r);
      g08Ctx.stroke();
      // Abajo derecha
      g08Ctx.beginPath();
      g08Ctx.moveTo(r - cornerSize, r); g08Ctx.lineTo(r, r); g08Ctx.lineTo(r, r - cornerSize);
      g08Ctx.stroke();

      // Etiqueta LOCK-ON
      g08Ctx.font = "bold 9px JetBrains Mono, monospace";
      g08Ctx.fillStyle = "#38bdf8";
      g08Ctx.textAlign = "center";
      g08Ctx.fillText("🎯 LOCK-ON", 0, -r - 5);
    }

    if (e.shieldPulse > 0) {
      g08Ctx.beginPath();
      g08Ctx.arc(0, 0, e.radius + 10, 0, Math.PI * 2);
      g08Ctx.strokeStyle = `rgba(244, 63, 94, ${e.shieldPulse / 18})`;
      g08Ctx.lineWidth = 3;
      g08Ctx.stroke();
      e.shieldPulse--;
    }

    g08Ctx.beginPath();
    g08Ctx.arc(0, 0, e.radius, 0, Math.PI * 2);
    g08Ctx.fillStyle = "#1e293b";
    g08Ctx.strokeStyle = e.color;
    g08Ctx.lineWidth = 2.5;
    g08Ctx.fill();
    g08Ctx.stroke();

    g08Ctx.font = "18px sans-serif";
    g08Ctx.textAlign = "center";
    g08Ctx.textBaseline = "middle";
    g08Ctx.fillText(e.icon, 0, -2);

    g08Ctx.font = "bold 11px Plus Jakarta Sans, sans-serif";
    g08Ctx.fillStyle = "#fff";
    g08Ctx.shadowColor = "rgba(0,0,0,0.8)";
    g08Ctx.shadowBlur = 4;
    g08Ctx.fillText(e.name, 0, -e.radius - 12);

    g08Ctx.font = "9.5px JetBrains Mono, monospace";
    g08Ctx.fillStyle = "#94a3b8";
    g08Ctx.fillText(e.cue, 0, e.radius + 14);

    g08Ctx.restore();
  });

  // Torreta Fija Central
  drawG08Turret();

  // Partículas
  g08Particles.forEach(p => {
    g08Ctx.save();
    g08Ctx.globalAlpha = p.alpha;
    g08Ctx.fillStyle = p.color;
    g08Ctx.beginPath();
    g08Ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    g08Ctx.fill();
    g08Ctx.restore();
  });

  // Textos flotantes
  for (let i = g08FloatingTexts.length - 1; i >= 0; i--) {
    const ft = g08FloatingTexts[i];
    ft.y += ft.vy;
    ft.alpha -= 0.02;

    g08Ctx.save();
    g08Ctx.globalAlpha = Math.max(0, ft.alpha);
    g08Ctx.font = "bold 13px Plus Jakarta Sans, sans-serif";
    g08Ctx.fillStyle = ft.color;
    g08Ctx.textAlign = "center";
    g08Ctx.fillText(ft.text, ft.x, ft.y);
    g08Ctx.restore();

    if (ft.alpha <= 0) g08FloatingTexts.splice(i, 1);
  }
}

function drawG08Turret() {
  if (!g08Canvas || !g08Ctx) return;
  g08Ctx.save();
  g08Player.x = g08Canvas.width / 2;
  g08Player.y = g08Canvas.height - 35;

  const wave = GAME08_WAVES[g08CurrentWaveIdx];
  const activeColor = wave.weapons[g08ActiveWeaponSlot].color;
  const target = getG08TargetEnemy();

  // Calcular ángulo de orientación del cañón
  let targetAngle = -Math.PI / 2;
  if (target) {
    targetAngle = Math.atan2(target.y - g08Player.y, target.x - g08Player.x);
  }
  // Suavizado de giro
  g08CurrentAimAngle += (targetAngle - g08CurrentAimAngle) * 0.25;

  // 1. BASE FORTIFICADA / BUNKER FIJO
  g08Ctx.beginPath();
  g08Ctx.arc(g08Player.x, g08Player.y + 12, 42, Math.PI, 0, false);
  g08Ctx.fillStyle = "#0f172a";
  g08Ctx.strokeStyle = "#334155";
  g08Ctx.lineWidth = 3;
  g08Ctx.fill();
  g08Ctx.stroke();

  // Anillo de blindaje interno con acento
  g08Ctx.beginPath();
  g08Ctx.arc(g08Player.x, g08Player.y + 12, 28, Math.PI, 0, false);
  g08Ctx.strokeStyle = activeColor;
  g08Ctx.lineWidth = 2;
  g08Ctx.stroke();

  // 2. TORRETA GIRATORIA CENTRAL
  g08Ctx.save();
  g08Ctx.translate(g08Player.x, g08Player.y);
  g08Ctx.rotate(g08CurrentAimAngle + Math.PI / 2);

  // Cañones duales de plasma
  g08Ctx.fillStyle = "#1e293b";
  g08Ctx.strokeStyle = activeColor;
  g08Ctx.lineWidth = 1.5;

  // Cañón izquierdo
  g08Ctx.fillRect(-8, -26, 4, 18);
  g08Ctx.strokeRect(-8, -26, 4, 18);
  // Cañón derecho
  g08Ctx.fillRect(4, -26, 4, 18);
  g08Ctx.strokeRect(4, -26, 4, 18);

  // Fogonazo de disparo (Muzzle Flash)
  if (g08Player.muzzleFlash > 0) {
    g08Ctx.beginPath();
    g08Ctx.arc(0, -32, g08Player.muzzleFlash * 2.2, 0, Math.PI * 2);
    g08Ctx.fillStyle = activeColor;
    g08Ctx.shadowColor = activeColor;
    g08Ctx.shadowBlur = 16;
    g08Ctx.fill();
    g08Player.muzzleFlash--;
  }

  // Cúpula / Carcasa rotatoria de la torreta
  g08Ctx.beginPath();
  g08Ctx.arc(0, 0, 16, 0, Math.PI * 2);
  g08Ctx.fillStyle = "#1e293b";
  g08Ctx.strokeStyle = activeColor;
  g08Ctx.lineWidth = 2.5;
  g08Ctx.shadowColor = activeColor;
  g08Ctx.shadowBlur = 10;
  g08Ctx.fill();
  g08Ctx.stroke();

  // Núcleo energético central del arma seleccionada
  g08Ctx.beginPath();
  g08Ctx.arc(0, 0, 7, 0, Math.PI * 2);
  g08Ctx.fillStyle = activeColor;
  g08Ctx.shadowColor = activeColor;
  g08Ctx.shadowBlur = 12;
  g08Ctx.fill();

  g08Ctx.restore();

  // Línea de defensa de emergencia en la base
  g08Ctx.beginPath();
  g08Ctx.moveTo(0, g08Canvas.height - 8);
  g08Ctx.lineTo(g08Canvas.width, g08Canvas.height - 8);
  g08Ctx.strokeStyle = "rgba(244, 63, 94, 0.4)";
  g08Ctx.lineWidth = 2;
  g08Ctx.setLineDash([8, 6]);
  g08Ctx.stroke();
  g08Ctx.setLineDash([]);

  g08Ctx.restore();
}

// ========================================================
// JUEGO 09: THERAPEUTIC SYNAPSE MATCH (CONECTOR ETIOLOGÍA ↔ TRATAMIENTO)
// ========================================================

const GAME09_SETS = [
  {
    id: "set-01",
    title: "Bacteriología & Resistencia Antibiótica",
    shortTitle: "Bacteriología",
    pairs: [
      {
        id: "p1",
        left: {
          title: "Staphylococcus aureus MRSA",
          sub: "Gen mecA · PBP2a con baja afinidad a betalactámicos",
          tag: "Gram+ Resistente",
          tagClass: "gram-pos",
          icon: "🧫"
        },
        right: {
          title: "Vancomicina IV / Daptomicina",
          sub: "Glicopéptido bactericida · Inhibe síntesis de peptidoglicano",
          tag: "Infusión IV",
          tagClass: "route-iv",
          icon: "💉"
        },
        rationale: "La mutación de la proteína ligadora de penicilina (PBP2a) confiere resistencia a todas las penicilinas y cefalosporinas estándar. Requiere glicopéptidos o lipopéptidos cíclicos.",
        pearl: "USMLE Pearl: La vancomicina requiere monitorización de niveles valle (AUC/MIC 400-600) para prevenir nefrotoxicidad tubular."
      },
      {
        id: "p2",
        left: {
          title: "Pseudomonas aeruginosa",
          sub: "Bacilo Gram- nosocomial no fermentador · Frecuente en UCI",
          tag: "Gram- Oportunista",
          tagClass: "gram-neg",
          icon: "🧪"
        },
        right: {
          title: "Meropenem / Pip-Tazo",
          sub: "Betalactámicos con cobertura antipseudomónica estricta",
          tag: "Infusión IV",
          tagClass: "route-iv",
          icon: "💧"
        },
        rationale: "Posee porinas impermeables, betalactamasas tipo AmpC y bombas de eflujo. Carbapenémicos antipseudomónicos o ureidopenicilinas son pilares obligatorios.",
        pearl: "Clinical Pearl: Ceftriaxona y Ertapenem NO tienen actividad antipseudomónica; su uso empírico resulta en falla terapéutica."
      },
      {
        id: "p3",
        left: {
          title: "Clostridioides difficile",
          sub: "Colitis pseudomembranosa post-antibioticoterapia",
          tag: "Esporulada Anaerobia",
          tagClass: "gram-pos",
          icon: "⚠️"
        },
        right: {
          title: "Fidaxomicina VO / Vanco VO",
          sub: "Acción luminal intraintestinal tópica sin absorción sistémica",
          tag: "Oral Tópica",
          tagClass: "route-po",
          icon: "💊"
        },
        rationale: "La infección está confinada a la mucosa colónica. La Vancomicina IV NO se secreta en el colon; debe administrarse por vía oral o usar fidaxomicina para reducir recidivas.",
        pearl: "Board Pearl: Metronidazol oral ya no es de primera línea debido a mayores tasas de fracaso y recidiva precoz (IDSA 2021)."
      },
      {
        id: "p4",
        left: {
          title: "Listeria monocytogenes",
          sub: "Meningitis en extremos de la vida (RN, >50a, gestantes)",
          tag: "Bacilo Gram+",
          tagClass: "gram-pos",
          icon: "🧀"
        },
        right: {
          title: "Ampicilina IV",
          sub: "Aminopenicilina bactericida de alta afinidad por PBP3",
          tag: "Infusión IV",
          tagClass: "route-iv",
          icon: "💉"
        },
        rationale: "Listeria presenta resistencia intrínseca a todas las cefalosporinas debido a baja afinidad de sus PBPs. En meningitis comunitaria de neonatos o adultos mayores, la ampicilina se añade obligatoriamente.",
        pearl: "High-Yield: Siempre que veas una punción lumbar con bacilos Gram+ móviles en 'voltereta' (tumbling motility), prescribe Ampicilina."
      },
      {
        id: "p5",
        left: {
          title: "Streptococcus pneumoniae",
          sub: "Causa #1 de NAC típica · Diplococo lanceolado",
          tag: "Gram+ Cápsula",
          tagClass: "gram-pos",
          icon: "🫁"
        },
        right: {
          title: "Amoxicilina-Clavulanato / Ceftriaxona",
          sub: "Aminopenicilina o cefalosporina 3G de alta biodisponibilidad",
          tag: "Oral o IV",
          tagClass: "route-po",
          icon: "💊"
        },
        rationale: "El neumococo sigue siendo altamente sensible a betalactámicos a dosis plenas en infecciones del tracto respiratorio inferior sin criterios de resistencia extrema.",
        pearl: "Guías ATS/IDSA: Amoxicilina a dosis altas (1g c/8h) o Ceftriaxona IV es el estándar bactericida de primera línea en NAC ambulatoria y hospitalaria."
      },
      {
        id: "p6",
        left: {
          title: "Treponema pallidum",
          sub: "Espiroqueta causante de Sífilis primaria y secundaria",
          tag: "Espiroqueta",
          tagClass: "atypic",
          icon: "🔬"
        },
        right: {
          title: "Penicilina G Benzatínica IM",
          sub: "Liberación lenta prolongada durante 3-4 semanas",
          tag: "Intramuscular",
          tagClass: "route-im",
          icon: "💉"
        },
        rationale: "Treponema pallidum carece de plásmidos de resistencia y sigue siendo 100% sensible a la penicilina G benzatínica a nivel global.",
        pearl: "CDC Pearl: Una sola dosis IM de 2.4 millones UI es curativa en sífilis primaria o secundaria; en neurosífilis se requiere Penicilina G Cristalina IV."
      }
    ]
  },
  {
    id: "set-02",
    title: "Atípicos, Hongos & Oportunistas",
    shortTitle: "Atípicos & Hongos",
    pairs: [
      {
        id: "p1",
        left: {
          title: "Pneumocystis jirovecii",
          sub: "Neumonía intersticial difusa en VIH con CD4 < 200",
          tag: "Hongo Atípico",
          tagClass: "atypic",
          icon: "🫁"
        },
        right: {
          title: "Trimetoprim-Sulfametoxazol (TMP-SMX)",
          sub: "Inhibición secuencial enzimática de síntesis de folatos",
          tag: "Oral o IV",
          tagClass: "route-po",
          icon: "💊"
        },
        rationale: "P. jirovecii carece de ergosterol en su membrana celular (no responde a azoles ni anfotericina). La inhibición de la vía de folatos es bactericida/fungicida específica.",
        pearl: "Regla Clínica: Si la PaO2 es <70 mmHg o el gradiente A-a es >35 mmHg, añade corticoides sistémicos (prednisona) antes del antibiótico."
      },
      {
        id: "p2",
        left: {
          title: "Legionella pneumophila",
          sub: "Neumonía atípica severa + Hiponatremia + Síntomas GI",
          tag: "Intracelular",
          tagClass: "gram-neg",
          icon: "🏢"
        },
        right: {
          title: "Levofloxacino o Azitromicina",
          sub: "Fluoroquinolona respiratoria o macrólido con penetración celular",
          tag: "Oral o IV",
          tagClass: "route-po",
          icon: "💊"
        },
        rationale: "Legionella sobrevive y prolifera dentro de los macrófagos alveolares. Los betalactámicos no penetran la célula y carecen de eficacia; se requieren quinolonas o macrólidos.",
        pearl: "Diagnostic Pearl: El antígeno urinario detecta rápidamente el serogrupo 1 en urgencias con alta especificidad."
      },
      {
        id: "p3",
        left: {
          title: "Aspergillus fumigatus",
          sub: "Aspergilosis pulmonar invasiva con signo del halo en TAC",
          tag: "Hongo Hialino",
          tagClass: "atypic",
          icon: "🧫"
        },
        right: {
          title: "Voriconazol IV/VO",
          sub: "Triazol de 2ª generación · Inhibe 14α-lanosterol desmetilasa",
          tag: "Infusión / Oral",
          tagClass: "route-iv",
          icon: "💉"
        },
        rationale: "Voriconazol demostró superioridad de sobrevida frente a Anfotericina B desoxicolato en aspergilosis invasiva, convirtiéndose en el tratamiento estándar de primera línea.",
        pearl: "Tox Watch: Monitorear efectos visuales transitorios (fotopsias/discromatopsia) y prolongación del intervalo QTc."
      },
      {
        id: "p4",
        left: {
          title: "Cryptococcus neoformans",
          sub: "Meningoencefalitis en SIDA · Tinta china positiva (halo capsular)",
          tag: "Levadura Encapsulada",
          tagClass: "atypic",
          icon: "🧠"
        },
        right: {
          title: "Anfotericina B Liposomal + Flucitosina",
          sub: "Inducción sinérgica fungicida durante al menos 2 semanas",
          tag: "Infusión IV",
          tagClass: "route-iv",
          icon: "💧"
        },
        rationale: "La combinación de anfotericina B liposomal y flucitosina esteriliza el LCR significativamente más rápido que el fluconazol solo, previniendo secuelas letales de hipertensión endocraneana.",
        pearl: "Management Pearl: Mantenimiento posterior con Fluconazol oral diario durante al menos 8 semanas o hasta recuperación de CD4."
      },
      {
        id: "p5",
        left: {
          title: "Toxoplasma gondii",
          sub: "Lesiones cerebrales múltiples en anillo en TAC/RMN de VIH",
          tag: "Protozoo Tisular",
          tagClass: "atypic",
          icon: "🐱"
        },
        right: {
          title: "Sulfadiazina + Pirimetamina + Ácido Folínico",
          sub: "Inhibición combinada de dihidrofolato reductasa parasitaria",
          tag: "Vía Oral",
          tagClass: "route-po",
          icon: "💊"
        },
        rationale: "Bloqueo sinérgico del metabolismo de folatos del taquizoíto. El ácido folínico (leucovorina) rescata a la médula ósea del huésped previniendo pancitopenia.",
        pearl: "Imaging Pearl: Si tras 14 días de tratamiento empírico las lesiones en anillo no reducen de tamaño, sospecha Linfoma Primario del SNC (EBV+)."
      },
      {
        id: "p6",
        left: {
          title: "Mycobacterium tuberculosis",
          sub: "Tuberculosis pulmonar activa bacilífera (BAAR+)",
          tag: "Ácido-Alcohol Resistente",
          tagClass: "gram-pos",
          icon: "🫁"
        },
        right: {
          title: "Esquema RIPE (Rifampicina, INH, PZA, EMB)",
          sub: "Fase intensiva de 2 meses seguida de 4 meses de Rifampicina + INH",
          tag: "Oral Combinada",
          tagClass: "route-po",
          icon: "💊"
        },
        rationale: "La terapia cuádruple ataca bacilos intra y extracelulares en distintas fases metabólicas, previniendo la emergencia de mutantes resistentes.",
        pearl: "Side Effect Pearl: Rifampicina tiñe secreciones corporales de naranja; Isoniazida requiere Vitamina B6 (Piridoxina) para prevenir neuropatía periférica."
      }
    ]
  },
  {
    id: "set-03",
    title: "Urgencias Clínicas & Antídotos",
    shortTitle: "Urgencias & Antídotos",
    pairs: [
      {
        id: "p1",
        left: {
          title: "Intoxicación Aguda por Paracetamol",
          sub: "Ingesta > 7.5 g · Metabolito tóxico hepatocelular NAPQI",
          tag: "Toxicología",
          tagClass: "toxic",
          icon: "💊"
        },
        right: {
          title: "N-Acetilcisteína (NAC)",
          sub: "Precursor de glutatión · Neutraliza el radical reactivo NAPQI",
          tag: "Infusión IV",
          tagClass: "route-iv",
          icon: "💧"
        },
        rationale: "Restaura los depósitos hepáticos de glutatión para conjugar el NAPQI antes de que ocurra la necrosis centrolobulillar masiva.",
        pearl: "Nomograma de Rumack-Matthew: Administrar antes de las 8 horas post-ingesta para una eficacia hepatoprotectora cercana al 100%."
      },
      {
        id: "p2",
        left: {
          title: "Sobredosis Severa de Opioides",
          sub: "Miosis puntiforme + Bradipnea (<8 rpm) + Depresión del SNC",
          tag: "Depresión Respiratoria",
          tagClass: "toxic",
          icon: "💉"
        },
        right: {
          title: "Naloxona IV / Intranasal",
          sub: "Antagonista competitivo puro del receptor mu-opioide",
          tag: "IV o Spray Nasal",
          tagClass: "route-iv",
          icon: "💨"
        },
        rationale: "Desplaza competitivamente a los agonistas opioides de los centros respiratorios del tronco encefálico, revirtiendo la apnea en segundos.",
        pearl: "Caution Pearl: La vida media de la naloxona (30-90 min) suele ser menor que la del opioide (ej. Metadona); vigilar resedación tardía."
      },
      {
        id: "p3",
        left: {
          title: "Hiperpotasemia con Cambios en ECG",
          sub: "K+ > 6.5 mEq/L · Ondas T picudas + Ensanchamiento QRS",
          tag: "Emergencia Cardíaca",
          tagClass: "toxic",
          icon: "⚡"
        },
        right: {
          title: "Gluconato de Calcio IV",
          sub: "Estabilizador de membrana miocárdica de acción inmediata",
          tag: "Bolo IV",
          tagClass: "route-iv",
          icon: "💉"
        },
        rationale: "El calcio antagónico restaura el potencial umbral cardíaco previniendo fibrilación ventricular, aunque NO reduce la concentración sérica de potasio.",
        pearl: "Paso 1 Obligatorio: Administrar calcio primero para proteger el corazón, y luego dar insulina + glucosa o salbutamol para redistribuir el K+."
      },
      {
        id: "p4",
        left: {
          title: "Cetoacidosis Diabética Severa (CAD)",
          sub: "Glucosa >250 + pH <7.3 + Bicarbonato <15 + Cetonemia",
          tag: "Crisis Metabólica",
          tagClass: "toxic",
          icon: "🩸"
        },
        right: {
          title: "Insulina Cristalina IV + SSN 0.9%",
          sub: "Infusión de 0.1 U/kg/h con reemplazo de volumen agresivo",
          tag: "Infusión Continua",
          tagClass: "route-iv",
          icon: "💧"
        },
        rationale: "La insulina suprime de inmediato la lipólisis adiposa y la cetogénesis hepática, cerrando la brecha aniónica mientras la hidratación restaura la perfusión renal.",
        pearl: "K+ Rule: Si el potasio sérico es < 3.3 mEq/L, pospón la insulina y administra KCl primero para prevenir paro cardíaco por hipopotasemia."
      },
      {
        id: "p5",
        left: {
          title: "Shock Anafiláctico Sistémico",
          sub: "Estridor laríngeo + Hipotensión + Urticaria generalizada",
          tag: "Shock Distributivo",
          tagClass: "toxic",
          icon: "🐝"
        },
        right: {
          title: "Adrenalina IM (1:1000, 0.5 mg)",
          sub: "Agonista alfa-1 (vasoconstricción) y beta-2 (broncodilatación)",
          tag: "IM Muslo Anterolateral",
          tagClass: "route-im",
          icon: "💉"
        },
        rationale: "La adrenalina intramusular es el único fármaco que previene la muerte por colapso cardiovascular y edema laríngeo agudo. Los antihistamínicos y corticoides son secundarios.",
        pearl: "Site Pearl: La inyección en el vasto lateral del muslo alcanza niveles plasmáticos pico tres veces más rápido que en el deltoides o glúteo."
      },
      {
        id: "p6",
        left: {
          title: "SCACEST < 12 Horas de Evolución",
          sub: "Dolor torácico opresivo con supradesnivel ST > 1 mm en 2 derivaciones",
          tag: "Oclusión Coronaria",
          tagClass: "toxic",
          icon: "🫀"
        },
        right: {
          title: "Angioplastia Primaria (ICP) o Tenecteplasa",
          sub: "Reperfusión mecánica o farmacológica de la arteria culpable",
          tag: "Hemodinamia / IV",
          tagClass: "route-iv",
          icon: "🫀"
        },
        rationale: "La restauración inmediata del flujo epicárdico rescata miocardio isquémico en riesgo. Tiempo puerta-balón objetivo <90 minutos (<120 min si hay traslado).",
        pearl: "Golden Rule: 'El tiempo es músculo'. Si la ICP no está disponible en <120 minutos, administrar fibrinolítico (Tenecteplasa) en los primeros 10 minutos."
      }
    ]
  }
];

let g09CurrentSetIdx = 0;
let g09SelectedLeftId = null;
let g09SelectedRightId = null;
let g09MatchedPairs = new Set();
let g09TotalAttempts = 0;
let g09CorrectAttempts = 0;

let g09IsDragging = false;
let g09DragStartPos = { x: 0, y: 0 };
let g09DragLeftId = null;

function renderGame09(stage) {
  const container = document.createElement("div");
  container.className = "g09-container";

  container.innerHTML = `
    <!-- Barra superior de selección de sets -->
    <div class="g09-category-ribbon">
      <div class="g09-category-pills" id="g09-category-pills-row"></div>
      <div class="g09-cat-tag" id="g09-current-cat-tag">Set 1: Bacteriología & Resistencia</div>
    </div>

    <!-- Cinta de Métricas -->
    <div class="g09-metrics-ribbon">
      <div class="g09-metrics-left">
        <div class="g09-metric-item">
          <span class="g09-metric-label">Pares Conectados</span>
          <span class="g09-metric-value highlight" id="g09-stat-matched-count">0 / 6</span>
        </div>
        <div class="g09-metric-item">
          <span class="g09-metric-label">Racha Terapéutica</span>
          <span class="g09-metric-value success" id="g09-stat-streak-count">🔥 x1</span>
        </div>
        <div class="g09-metric-item">
          <span class="g09-metric-label">Precisión</span>
          <span class="g09-metric-value" id="g09-stat-accuracy">100%</span>
        </div>
      </div>

      <div class="g09-interaction-prompt">
        <span>⚡ Modo Híbrido:</span> 
        <strong>Toca un elemento de cada columna</strong> o <strong>arrastra el cable</strong> para unir.
      </div>
    </div>

    <!-- Arena de Unión Sináptica -->
    <div class="g09-synapse-arena" id="g09-synapse-arena">
      <svg class="g09-svg-canvas" id="g09-svg-connector-canvas"></svg>

      <div class="g09-synapse-grid">
        <!-- Columna Izquierda: Patógenos / Causas -->
        <div class="g09-col-wrap">
          <div class="g09-col-header">
            <span class="g09-col-title etiology">🦠 Patógeno / Causa Etiológica</span>
            <span class="g09-col-count" id="g09-count-left">6 pendientes</span>
          </div>
          <div class="g09-cards-list" id="g09-cards-left-container"></div>
        </div>

        <!-- Columna Derecha: Tratamientos de Elección -->
        <div class="g09-col-wrap">
          <div class="g09-col-header">
            <span class="g09-col-title treatment">💊 Tratamiento de Elección</span>
            <span class="g09-col-count" id="g09-count-right">6 opciones</span>
          </div>
          <div class="g09-cards-list" id="g09-cards-right-container"></div>
        </div>
      </div>
    </div>

    <!-- Feedback Contextual / Racional Clínico -->
    <div class="g09-feedback-strip" id="g09-feedback-strip">
      <div class="g09-fb-header">
        <span class="g09-fb-title" id="g09-fb-title">✓ Enlace Correcto</span>
        <span class="g09-xp-pill" id="g09-fb-xp-pill">+100 XP ✨</span>
      </div>
      <p class="g09-fb-rationale" id="g09-fb-rationale"></p>
      <div class="g09-fb-pearl" id="g09-fb-pearl"></div>
    </div>

    <!-- Modal de Ronda Completada -->
    <div class="g09-modal-overlay" id="g09-round-win-modal">
      <div class="g09-modal-card">
        <div class="g09-modal-header">
          <div style="font-size:42px;">🏆</div>
          <div class="g09-modal-title">¡Sinapsis Terapéuticas Completas!</div>
          <p style="font-size:13px; color:#94a3b8;">
            Has emparejado cada patógeno con su tratamiento estándar de oro sin errores de concordancia.
          </p>
        </div>

        <div style="overflow-x:auto;">
          <table class="g09-summary-table">
            <thead>
              <tr>
                <th>Etiología</th>
                <th>Tratamiento Estándar</th>
                <th>Mecanismo / Racional Guía</th>
              </tr>
            </thead>
            <tbody id="g09-modal-summary-tbody"></tbody>
          </table>
        </div>

        <div class="g09-modal-actions">
          <button class="lab-btn secondary" onclick="restartG09CurrentSet()">↺ Repetir Set</button>
          <button class="lab-btn" id="g09-btn-next-set" onclick="goToG09NextSet()">Siguiente Categoría →</button>
        </div>
      </div>
    </div>
  `;

  stage.appendChild(container);

  setupG09CategoryNavigation();
  loadG09Set(g09CurrentSetIdx);

  window.addEventListener("resize", updateG09SVGConnections);
}

function setupG09CategoryNavigation() {
  const container = document.getElementById("g09-category-pills-row");
  if (!container) return;
  container.innerHTML = "";

  GAME09_SETS.forEach((s, idx) => {
    const btn = document.createElement("button");
    btn.className = `g09-cat-btn ${idx === g09CurrentSetIdx ? 'active' : ''}`;
    btn.innerHTML = `<span>Set 0${idx + 1}</span> · <small>${s.shortTitle}</small>`;
    btn.addEventListener("click", () => {
      loadG09Set(idx);
    });
    container.appendChild(btn);
  });
}

function loadG09Set(idx) {
  g09CurrentSetIdx = idx;
  const set = GAME09_SETS[idx];

  document.querySelectorAll(".g09-cat-btn").forEach((b, i) => {
    b.classList.toggle("active", i === idx);
  });

  const tag = document.getElementById("g09-current-cat-tag");
  if (tag) tag.textContent = `Set 0${idx + 1}: ${set.title}`;

  g09SelectedLeftId = null;
  g09SelectedRightId = null;
  g09MatchedPairs.clear();
  g09TotalAttempts = 0;
  g09CorrectAttempts = 0;
  hideG09Feedback();
  updateG09MetricsDisplay();

  renderG09Cards(set);
  setTimeout(updateG09SVGConnections, 50);
}

function renderG09Cards(set) {
  const leftCol = document.getElementById("g09-cards-left-container");
  const rightCol = document.getElementById("g09-cards-right-container");
  if (!leftCol || !rightCol) return;

  leftCol.innerHTML = "";
  rightCol.innerHTML = "";

  // Columna izquierda en orden
  set.pairs.forEach(pair => {
    const card = document.createElement("div");
    card.className = "g09-synapse-card left-card";
    card.id = `g09-left-card-${pair.id}`;
    card.setAttribute("data-id", pair.id);

    card.innerHTML = `
      <div class="g09-card-body">
        <div class="g09-card-meta-row">
          <span class="g09-card-tag ${pair.left.tagClass}">${pair.left.tag}</span>
          <span class="g09-matched-badge">✓ CONECTADO</span>
        </div>
        <div class="g09-card-title">
          <span>${pair.left.icon}</span> ${pair.left.title}
        </div>
        <div class="g09-card-subtitle">${pair.left.sub}</div>
      </div>
      <div class="g09-socket-pin left-socket" id="g09-socket-left-${pair.id}" title="Pin de conexión"></div>
    `;

    card.addEventListener("click", () => handleG09LeftCardClick(pair.id));
    setupG09DragEvents(card, pair.id);

    leftCol.appendChild(card);
  });

  // Columna derecha barajada
  const shuffledRight = shuffleArray(set.pairs);
  shuffledRight.forEach(pair => {
    const card = document.createElement("div");
    card.className = "g09-synapse-card right-card";
    card.id = `g09-right-card-${pair.id}`;
    card.setAttribute("data-id", pair.id);

    card.innerHTML = `
      <div class="g09-socket-pin right-socket" id="g09-socket-right-${pair.id}" title="Pin de recepción"></div>
      <div class="g09-card-body" style="padding-left: 12px; padding-right: 0;">
        <div class="g09-card-meta-row">
          <span class="g09-card-tag ${pair.right.tagClass}">${pair.right.tag}</span>
          <span class="g09-matched-badge">✓ EMPAREJADO</span>
        </div>
        <div class="g09-card-title">
          <span>${pair.right.icon}</span> ${pair.right.title}
        </div>
        <div class="g09-card-subtitle">${pair.right.sub}</div>
      </div>
    `;

    card.addEventListener("click", () => handleG09RightCardClick(pair.id));

    rightCol.appendChild(card);
  });
}

function handleG09LeftCardClick(id) {
  if (g09MatchedPairs.has(id)) return;

  if (g09SelectedLeftId === id) {
    g09SelectedLeftId = null;
  } else {
    g09SelectedLeftId = id;
  }

  updateG09CardVisualStates();

  if (g09SelectedLeftId && g09SelectedRightId) {
    checkG09Match(g09SelectedLeftId, g09SelectedRightId);
  }
}

function handleG09RightCardClick(id) {
  if (g09MatchedPairs.has(id)) return;

  if (g09SelectedRightId === id) {
    g09SelectedRightId = null;
  } else {
    g09SelectedRightId = id;
  }

  updateG09CardVisualStates();

  if (g09SelectedLeftId && g09SelectedRightId) {
    checkG09Match(g09SelectedLeftId, g09SelectedRightId);
  }
}

function checkG09Match(leftId, rightId) {
  g09TotalAttempts++;
  const set = GAME09_SETS[g09CurrentSetIdx];
  const leftPair = set.pairs.find(p => p.id === leftId);

  const isMatch = (leftId === rightId);

  if (isMatch) {
    g09CorrectAttempts++;
    g09MatchedPairs.add(leftId);

    LabGamification.addXP(100, "Conexión Terapéutica");
    LabGamification.incrementStreak();
    LabGamification.unlockBadge("therapeutic_synapse");

    showG09Feedback(true, leftPair);

    g09SelectedLeftId = null;
    g09SelectedRightId = null;
    updateG09CardVisualStates();
    updateG09SVGConnections();

    if (g09MatchedPairs.size === set.pairs.length) {
      setTimeout(handleG09SetVictory, 700);
    }
  } else {
    const rightPair = set.pairs.find(p => p.id === rightId);
    playLabErrorSound();
    LabGamification.resetStreak();

    const leftEl = document.getElementById(`g09-left-card-${leftId}`);
    const rightEl = document.getElementById(`g09-right-card-${rightId}`);

    if (leftEl) leftEl.classList.add("shake-error");
    if (rightEl) rightEl.classList.add("shake-error");

    setTimeout(() => {
      if (leftEl) leftEl.classList.remove("shake-error");
      if (rightEl) rightEl.classList.remove("shake-error");
    }, 450);

    showG09Feedback(false, leftPair, rightPair);

    g09SelectedLeftId = null;
    g09SelectedRightId = null;
    updateG09CardVisualStates();
    drawG09TemporaryErrorLine(leftId, rightId);
  }

  updateG09MetricsDisplay();
}

function updateG09CardVisualStates() {
  document.querySelectorAll(".g09-synapse-card.left-card").forEach(c => {
    const id = c.getAttribute("data-id");
    c.classList.toggle("active-source", id === g09SelectedLeftId);
    c.classList.toggle("matched", g09MatchedPairs.has(id));
  });

  document.querySelectorAll(".g09-synapse-card.right-card").forEach(c => {
    const id = c.getAttribute("data-id");
    c.classList.toggle("active-source", id === g09SelectedRightId);
    c.classList.toggle("matched", g09MatchedPairs.has(id));
  });
}

function updateG09MetricsDisplay() {
  const set = GAME09_SETS[g09CurrentSetIdx];
  const matched = g09MatchedPairs.size;
  const total = set.pairs.length;

  const countEl = document.getElementById("g09-stat-matched-count");
  if (countEl) countEl.textContent = `${matched} / ${total}`;

  const leftCount = document.getElementById("g09-count-left");
  if (leftCount) leftCount.textContent = `${total - matched} pendientes`;

  const rightCount = document.getElementById("g09-count-right");
  if (rightCount) rightCount.textContent = `${total - matched} opciones`;

  const accEl = document.getElementById("g09-stat-accuracy");
  if (accEl) {
    const acc = g09TotalAttempts > 0 ? Math.round((g09CorrectAttempts / g09TotalAttempts) * 100) : 100;
    accEl.textContent = `${acc}%`;
  }

  const streakEl = document.getElementById("g09-stat-streak-count");
  if (streakEl) streakEl.textContent = `🔥 x${LabGamification.streak}`;
}

function updateG09SVGConnections() {
  const svg = document.getElementById("g09-svg-connector-canvas");
  const arena = document.getElementById("g09-synapse-arena");
  if (!svg || !arena) return;
  const arenaRect = arena.getBoundingClientRect();

  let svgContent = '';

  g09MatchedPairs.forEach(id => {
    const leftPin = document.getElementById(`g09-socket-left-${id}`);
    const rightPin = document.getElementById(`g09-socket-right-${id}`);

    if (leftPin && rightPin) {
      const lRect = leftPin.getBoundingClientRect();
      const rRect = rightPin.getBoundingClientRect();

      const x1 = lRect.left + lRect.width / 2 - arenaRect.left;
      const y1 = lRect.top + lRect.height / 2 - arenaRect.top;
      const x2 = rRect.left + rRect.width / 2 - arenaRect.left;
      const y2 = rRect.top + rRect.height / 2 - arenaRect.top;

      const dx = (x2 - x1) * 0.45;
      const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

      svgContent += `<path d="${d}" class="g09-connection-line matched" />`;
    }
  });

  svg.innerHTML = svgContent;
}

function drawG09TemporaryErrorLine(leftId, rightId) {
  const svg = document.getElementById("g09-svg-connector-canvas");
  const arena = document.getElementById("g09-synapse-arena");
  if (!svg || !arena) return;
  const arenaRect = arena.getBoundingClientRect();

  const leftPin = document.getElementById(`g09-socket-left-${leftId}`);
  const rightPin = document.getElementById(`g09-socket-right-${rightId}`);

  if (leftPin && rightPin) {
    const lRect = leftPin.getBoundingClientRect();
    const rRect = rightPin.getBoundingClientRect();

    const x1 = lRect.left + lRect.width / 2 - arenaRect.left;
    const y1 = lRect.top + lRect.height / 2 - arenaRect.top;
    const x2 = rRect.left + rRect.width / 2 - arenaRect.left;
    const y2 = rRect.top + rRect.height / 2 - arenaRect.top;

    const dx = (x2 - x1) * 0.45;
    const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

    const errPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    errPath.setAttribute("d", d);
    errPath.setAttribute("class", "g09-connection-line error");
    svg.appendChild(errPath);

    setTimeout(() => {
      errPath.remove();
      updateG09SVGConnections();
    }, 500);
  }
}

function setupG09DragEvents(card, id) {
  const socket = card.querySelector(".g09-socket-pin");
  if (!socket) return;

  socket.addEventListener("pointerdown", (e) => {
    if (g09MatchedPairs.has(id)) return;
    e.stopPropagation();

    g09IsDragging = true;
    g09DragLeftId = id;
    g09SelectedLeftId = id;
    updateG09CardVisualStates();

    const arena = document.getElementById("g09-synapse-arena");
    if (!arena) return;
    const arenaRect = arena.getBoundingClientRect();
    const sRect = socket.getBoundingClientRect();
    g09DragStartPos = {
      x: sRect.left + sRect.width / 2 - arenaRect.left,
      y: sRect.top + sRect.height / 2 - arenaRect.top
    };

    socket.setPointerCapture(e.pointerId);
  });

  socket.addEventListener("pointermove", (e) => {
    if (!g09IsDragging || g09DragLeftId !== id) return;
    const arena = document.getElementById("g09-synapse-arena");
    if (!arena) return;
    const arenaRect = arena.getBoundingClientRect();
    const currentX = e.clientX - arenaRect.left;
    const currentY = e.clientY - arenaRect.top;

    renderG09LiveDragCable(g09DragStartPos.x, g09DragStartPos.y, currentX, currentY);
  });

  socket.addEventListener("pointerup", (e) => {
    if (!g09IsDragging || g09DragLeftId !== id) return;
    g09IsDragging = false;
    socket.releasePointerCapture(e.pointerId);

    const liveEl = document.getElementById("g09-live-drag-cable");
    if (liveEl) liveEl.remove();

    const dropElem = document.elementFromPoint(e.clientX, e.clientY);
    const rightCard = dropElem ? dropElem.closest(".right-card") : null;

    if (rightCard) {
      const rightId = rightCard.getAttribute("data-id");
      checkG09Match(g09DragLeftId, rightId);
    } else {
      updateG09SVGConnections();
    }
    g09DragLeftId = null;
  });
}

function renderG09LiveDragCable(x1, y1, x2, y2) {
  const svg = document.getElementById("g09-svg-connector-canvas");
  if (!svg) return;

  let livePath = document.getElementById("g09-live-drag-cable");
  if (!livePath) {
    livePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    livePath.id = "g09-live-drag-cable";
    livePath.setAttribute("class", "g09-connection-line live");
    svg.appendChild(livePath);
  }

  const dx = (x2 - x1) * 0.45;
  const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  livePath.setAttribute("d", d);
}

function showG09Feedback(isSuccess, leftPair, rightPair = null) {
  const strip = document.getElementById("g09-feedback-strip");
  const title = document.getElementById("g09-fb-title");
  const xpPill = document.getElementById("g09-fb-xp-pill");
  const rationale = document.getElementById("g09-fb-rationale");
  const pearl = document.getElementById("g09-fb-pearl");
  if (!strip || !title || !rationale) return;

  strip.className = `g09-feedback-strip visible ${isSuccess ? 'success' : 'error'}`;

  if (isSuccess) {
    title.className = "g09-fb-title success";
    title.innerHTML = `<span>✓ ¡Enlace Terapéutico Correcto!</span> <strong>${leftPair.left.title}</strong> ↔ <strong>${leftPair.right.title}</strong>`;
    if (xpPill) {
      xpPill.style.display = "inline-block";
      xpPill.textContent = `+100 XP ✨ Racha x${LabGamification.streak}`;
    }
    rationale.textContent = leftPair.rationale;
    if (pearl) pearl.textContent = leftPair.pearl;
  } else {
    title.className = "g09-fb-title error";
    title.innerHTML = `<span>✗ Discrepancia Terapéutica</span> <strong>${leftPair.left.title}</strong> ≠ <strong>${rightPair.right.title}</strong>`;
    if (xpPill) xpPill.style.display = "none";
    rationale.innerHTML = `Ese régimen no es de primera línea para este cuadro. Recuerda: <em>${leftPair.left.title}</em> requiere cobertura dirigida según su mecanismo fisiopatológico.`;
    if (pearl) pearl.textContent = leftPair.pearl;
  }

  strip.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideG09Feedback() {
  const strip = document.getElementById("g09-feedback-strip");
  if (strip) strip.classList.remove("visible");
}

function handleG09SetVictory() {
  LabGamification.triggerConfetti();
  LabGamification.addXP(250, "¡Set Completado!");

  const modal = document.getElementById("g09-round-win-modal");
  const tbody = document.getElementById("g09-modal-summary-tbody");
  if (!modal || !tbody) return;
  tbody.innerHTML = "";

  const set = GAME09_SETS[g09CurrentSetIdx];
  set.pairs.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${p.left.title}</strong><br><small style="color:#94a3b8;">${p.left.sub}</small></td>
      <td><span style="color:#38bdf8; font-weight:700;">${p.right.title}</span><br><small style="color:#94a3b8;">${p.right.sub}</small></td>
      <td>${p.rationale}<br><small style="color:#fde047; font-weight:600;">${p.pearl}</small></td>
    `;
    tbody.appendChild(row);
  });

  const nextBtn = document.getElementById("g09-btn-next-set");
  if (nextBtn) {
    if (g09CurrentSetIdx < GAME09_SETS.length - 1) {
      nextBtn.textContent = `Siguiente Categoría (Set 0${g09CurrentSetIdx + 2}) →`;
    } else {
      nextBtn.textContent = `Volver al Set 01 →`;
    }
  }

  modal.style.display = "flex";
}

function restartG09CurrentSet() {
  const modal = document.getElementById("g09-round-win-modal");
  if (modal) modal.style.display = "none";
  loadG09Set(g09CurrentSetIdx);
}

function goToG09NextSet() {
  const modal = document.getElementById("g09-round-win-modal");
  if (modal) modal.style.display = "none";
  if (g09CurrentSetIdx < GAME09_SETS.length - 1) {
    loadG09Set(g09CurrentSetIdx + 1);
  } else {
    loadG09Set(0);
  }
}

// ========================================================
// JUEGO 10: CLINICAL MYTHBUSTER (VERDADERO / FALSO CLÍNICO)
// ========================================================
const GAME10_ROUNDS = [
  {
    id: "round-01",
    title: "Farmacología & Contraindicaciones Críticas",
    shortTitle: "Farmacología",
    claims: [
      {
        id: "c1",
        category: "Farmacología Renal",
        catClass: "pharma",
        context: "Infecciones Urinarias Altas",
        claim: "La nitrofurantoína es un tratamiento de primera línea adecuado para la pielonefritis aguda no complicada.",
        verdict: false,
        rationale: "La nitrofurantoína se excreta rápidamente por orina y no alcanza concentraciones terapéuticas en el parénquima renal ni en sangre. Solo está indicada en cistitis baja no complicada; su uso en pielonefritis genera fallo terapéutico bacterémico.",
        trap: "Confundir la eficacia bactericida excelente de la nitrofurantoína en vejiga con cobertura para tejido renal parenquimatoso."
      },
      {
        id: "c2",
        category: "Toxicología & UCI",
        catClass: "pharma",
        context: "Coma Tóxico / Urgencias",
        claim: "En la sobredosis de benzodiacepinas en un paciente con consumo crónico conocido, el flumazenil debe administrarse rutinariamente en bolo rápido.",
        verdict: false,
        rationale: "El flumazenil precipita una abstinencia aguda fulminante en dependientes crónicos de benzodiacepinas, desencadenando estatus epiléptico refractario y arritmias con alta morbimortalidad.",
        trap: "Asumir que por ser el antídoto específico deba administrarse de rutina; en sobredosis mixtas o uso crónico el soporte de vía aérea es prioritario."
      },
      {
        id: "c3",
        category: "Cardiología de Urgencias",
        catClass: "pharma",
        context: "Aorta Torácica Aguda",
        claim: "En la disección aórtica aguda tipo A, los betabloqueantes IV deben iniciarse antes que los vasodilatadores puros para reducir el estrés de cizallamiento (dP/dt).",
        verdict: true,
        rationale: "Si se inicia un vasodilatador directo (nitroprusiato o hidralazina) sin betabloqueo previo, la taquicardia refleja simpática resultante incrementa la fuerza contráctil (dP/dt), acelerando la disección y rotura aórtica.",
        trap: "Iniciar vasodilatador primero por angustia de ver cifras tensionales >180 mmHg, olvidando la regla cardinal de bajar primero la frecuencia cardíaca (<60 lpm)."
      },
      {
        id: "c4",
        category: "Hepatología Clínica",
        catClass: "pharma",
        context: "Cirrosis & Dolor",
        claim: "Los AINEs están indicados para el control del dolor articular agudo en pacientes con cirrosis descompensada y ascitis por su alta potencia antiinflamatoria.",
        verdict: false,
        rationale: "Los AINEs inhiben las prostaglandinas renales vasodilatadoras (PGE2/PGI2), las cuales mantienen el filtrado glomerular en cirróticos. Su uso precipita síndrome hepatorrenal oligúrico y hemorragia digestiva por úlceras o várices.",
        trap: "Temer excesivamente al paracetamol (que a dosis ≤ 2 g/día es el analgésico de elección seguro en cirrosis) y optar erróneamente por AINEs."
      },
      {
        id: "c5",
        category: "Endocrinología Crítica",
        catClass: "pharma",
        context: "Cetoacidosis Diabética (CAD)",
        claim: "En la cetoacidosis diabética, si el potasio sérico inicial es menor a 3.3 mEq/L, la infusión de insulina debe postergarse hasta reponer potasio.",
        verdict: true,
        rationale: "La insulina internaliza rápidamente el potasio al espacio intracelular. Si se administra con hipopotasemia severa basal, puede inducir fibrilación ventricular, asistolia o parálisis diafragmática fatal.",
        trap: "La urgencia de corregir la hiperglucemia hace que con frecuencia se olvide comprobar el potasio antes de abrir la bomba de insulina."
      },
      {
        id: "c6",
        category: "Infectología",
        catClass: "pharma",
        context: "Bacteriemia / MRSA",
        claim: "La vancomicina oral tiene una absorción sistémica superior al 90%, por lo que es la vía de elección para tratar bacteriemias y endocarditis por MRSA.",
        verdict: false,
        rationale: "La vancomicina oral tiene una biodisponibilidad sistémica prácticamente nula (<5%); permanece confinada en la luz intestinal, siendo útil exclusivamente para C. difficile. Las infecciones sistémicas requieren siempre vancomicina intravenosa.",
        trap: "Recetar vancomicina por vía oral a pacientes dados de alta con celulitis o bacteriemias para evitar accesos venosos."
      }
    ]
  },
  {
    id: "round-02",
    title: "Urgencias Clínicas & Reanimación ACLS",
    shortTitle: "Urgencias & ACLS",
    claims: [
      {
        id: "c1",
        category: "Soporte Vital ACLS",
        catClass: "emergency",
        context: "Paro Cardiorrespiratorio",
        claim: "La atropina intravenosa sigue siendo un fármaco recomendado dentro del algoritmo de soporte vital avanzado (ACLS) para ritmos de asistolia y AESP.",
        verdict: false,
        rationale: "La atropina fue retirada formalmente de las guías AHA en 2010 para asistolia y AESP tras múltiples ensayos clínicos que demostraron ausencia de beneficio en sobrevida. Solo se mantiene en bradicardia sinusal sintomática con pulso.",
        trap: "Memorias nostálgicas de algoritmos antiguos que prescribían 'adrenalina + atropina' en todos los paros no desfibrilables."
      },
      {
        id: "c2",
        category: "Trauma & Vía Aérea",
        catClass: "emergency",
        context: "Shock Obstructivo",
        claim: "En el neumotórax a tensión, la descompresión con aguja o toracostomía con dedo debe realizarse de inmediato con base en el juicio clínico antes de tomar una radiografía.",
        verdict: true,
        rationale: "El neumotórax a tensión es un diagnóstico 100% clínico de descompresión inmediata. Esperar una radiografía en un paciente con colapso cardiovascular y desviación traqueal es causa prevenible de muerte.",
        trap: "Solicitar una TAC o Rx de tórax 'para confirmar' antes de descomprimir un hemitórax a tensión."
      },
      {
        id: "c3",
        category: "Reanimación Avanzada",
        catClass: "emergency",
        context: "Vía Aérea Avanzada",
        claim: "Durante la RCP con paciente intubado con tubo orotraqueal confirmado, las compresiones deben pausarse cada 30 masajes para dar 2 ventilaciones.",
        verdict: false,
        rationale: "Una vez colocado un dispositivo de vía aérea avanzada (tubo o máscara laríngea), las compresiones torácicas son 100% continuas (100-120 cpm) sin pausas, y se administra 1 ventilación asincrónica cada 6 segundos (10 rpm).",
        trap: "Mantener el ciclo de pausas 30:2 incluso con tubo orotraqueal posicionado correctamente."
      },
      {
        id: "c4",
        category: "Arritmias Críticas",
        catClass: "emergency",
        context: "Paro Desfibrilable",
        claim: "En un paciente en fibrilación ventricular sin pulso, la primera descarga del desfibrilador debe ser sincronizada con la onda R del monitor.",
        verdict: false,
        rationale: "La fibrilación ventricular es una actividad caótica sin ondas R identificables. Si se activa el modo 'Sincrónico', el monitor no encontrará onda R y nunca disparará la descarga. Se requiere desfibrilación asincrónica inmediata.",
        trap: "Confundir la cardioversión eléctrica sincronizada (para taquiarritmias inestables CON pulso) con la desfibrilación asincrónica (paro sin pulso)."
      },
      {
        id: "c5",
        category: "Cuidados Críticos",
        catClass: "emergency",
        context: "Sepsis & Shock",
        claim: "La fluidoterapia inicial recomendada en choque séptico por las guías Surviving Sepsis es un bolo de 30 mL/kg de cristaloides isotónicos dentro de las primeras 3 horas.",
        verdict: true,
        rationale: "La reanimación guiada por metas recomienda 30 mL/kg de cristaloides balanceados o solución salina para restaurar el volumen circulante efectivo y la perfusión microvascular antes de desescalar a vasoactivos.",
        trap: "Subdosificar los líquidos en choque séptico por temor a edema agudo sin haber alcanzado una precarga adecuada."
      },
      {
        id: "c6",
        category: "Neurotrauma",
        catClass: "emergency",
        context: "Hipertensión Endocraneana",
        claim: "En el TEC severo, la hiperventilación profiláctica agresiva prolongada (PaCO2 < 25 mmHg) es la terapia de neuroprotección estándar recomendada.",
        verdict: false,
        rationale: "La hipocapnia severa provoca vasoconstricción cerebral extrema que disminuye el flujo sanguíneo cerebral, causando isquemia cerebral secundaria masiva. Solo se permite hiperventilación transitoria leve como medida de rescate ante signos de herniación inminente.",
        trap: "Creer que bajar la PIC a expensas de inducir isquemia cerebral difusa es benéfico para el paciente."
      }
    ]
  },
  {
    id: "round-03",
    title: "Diagnóstico Clínico & Paraclínicos",
    shortTitle: "Paraclínicos & Labs",
    claims: [
      {
        id: "c1",
        category: "Neumología & Urgencias",
        catClass: "lab",
        context: "Enfermedad Tromboembólica",
        claim: "Un valor de Dímero-D normal en un paciente con probabilidad clínica baja de TEP según Wells descarta con seguridad el tromboembolismo pulmonar sin requerir angioTAC.",
        verdict: true,
        rationale: "El Dímero-D tiene un valor predictivo negativo >98% en pacientes con baja probabilidad pretest; permite evitar radiación ionizante y nefropatía inducida por contraste.",
        trap: "Pedir angioTAC a todos los pacientes con disnea a pesar de tener un Wells bajo y Dímero-D rigurosamente negativo."
      },
      {
        id: "c2",
        category: "Geriatría / Medicina Interna",
        catClass: "lab",
        context: "Infecciones en Adulto Mayor",
        claim: "La ausencia de fiebre en un paciente anciano con neumonía descarta un proceso infeccioso bacteriano agudo.",
        verdict: false,
        rationale: "Hasta un 30-40% de los ancianos con bacteriemia o neumonía severa no presentan fiebre e incluso pueden presentar hipotermia debido a la inmunosenescencia; el debut cardinal suele ser delirio agudo, taquipnea o caídas inexplicables.",
        trap: "Descartar sepsis en un adulto mayor porque 'tiene 36.5°C' sin evaluar taquipnea o alteración del sensorio."
      },
      {
        id: "c3",
        category: "Infectología & Neurología",
        catClass: "lab",
        context: "Punción Lumbar",
        claim: "En el LCR de una meningitis bacteriana aguda, lo característico es encontrar hipoglucorraquia con una relación glucosa LCR/sérica menor a 0.4.",
        verdict: true,
        rationale: "Tanto las bacterias como la densa masa de neutrófilos consumen activamente glucosa anaerobia, mientras la inflamación meníngea deteriora los transportadores GLUT1.",
        trap: "Asumir que la glucosa baja solo se presenta en tuberculosis o micosis; en meningitis bacteriana purulenta la relación LCR/plasma suele ser <0.4 o indetectable."
      },
      {
        id: "c4",
        category: "Cardiología & Biomarcadores",
        catClass: "lab",
        context: "Dolor Torácico",
        claim: "Una troponina sérica elevada confirma de forma inequívoca un infarto de miocardio por rotura aguda de placa aterosclerótica (IAM Tipo 1).",
        verdict: false,
        rationale: "La troponina es específica de daño miocárdico pero NO del mecanismo fisiopatológico; se eleva en TEP masivo, miocarditis, sepsis, choque, insuficiencia renal e infarto tipo 2 por desbalance oferta-demanda.",
        trap: "Llevar a cateterismo de urgencia a todo paciente con troponina positiva sin correlacionar con la semiología del dolor torácico y el ECG."
      },
      {
        id: "c5",
        category: "Reumatología & Ortopedia",
        catClass: "lab",
        context: "Líquido Sinovial",
        claim: "Una tinción de Gram negativa en líquido sinovial descarta definitivamente el diagnóstico de artritis séptica bacteriana.",
        verdict: false,
        rationale: "La sensibilidad de la tinción de Gram en líquido articular es de apenas 50-60%. Si el líquido tiene >50.000 leucocitos con >90% PMN y clínica inflamatoria aguda, el drenaje y la antibioticoterapia empírica son obligatorios.",
        trap: "Suspender antibióticos en una monoartritis aguda purulenta con el pretexto de que 'el frotis de Gram no mostró bacterias'."
      },
      {
        id: "c6",
        category: "Oncología & Nefrología",
        catClass: "lab",
        context: "Síndrome Lisis Tumoral",
        claim: "El síndrome de lisis tumoral se caracteriza típicamente por hiperuricemia, hiperpotasemia, hiperfosfatemia e HIPOCALCEMIA secundaria.",
        verdict: true,
        rationale: "La destrucción masiva de blastos libera potasio, fosfato y ácidos nucleicos. El fosfato libre precipita con el calcio circulante en forma de fosfato de calcio tisular, provocando hipocalcemia aguda sintomática.",
        trap: "Creer erróneamente que todos los iones suben al lisar la célula; el calcio desciende bruscamente por precipitación con el fosfato liberado."
      }
    ]
  }
];

let g10CurrentRoundIdx = 0;
let g10CurrentClaimIdx = 0;
let g10RoundAnswers = [];
let g10CardAnswered = false;

let g10IsDragging = false;
let g10StartX = 0;
let g10CurrentTranslateX = 0;
let g10KeyboardHandlerAttached = false;

function renderGame10(stage) {
  const container = document.createElement("div");
  container.className = "g10-wrapper";

  container.innerHTML = `
    <!-- Barra superior de selección de rondas -->
    <div class="g10-round-nav-strip">
      <div class="g10-round-pills" id="g10-round-pills-row"></div>
      <div class="g10-round-tag" id="g10-current-round-tag">Ronda 01: Farmacología & Contraindicaciones</div>
    </div>

    <!-- Cinta de Métricas -->
    <div class="g10-metrics-ribbon">
      <div class="g10-metrics-left">
        <div class="g10-metric-item">
          <span class="g10-metric-label">Progreso</span>
          <span class="g10-metric-value highlight" id="g10-stat-card-count">Ficha 1 / 6</span>
        </div>
        <div class="g10-metric-item">
          <span class="g10-metric-label">Racha Crítica</span>
          <span class="g10-metric-value success" id="g10-stat-streak-count">🔥 x1</span>
        </div>
        <div class="g10-metric-item">
          <span class="g10-metric-label">Precisión</span>
          <span class="g10-metric-value" id="g10-stat-accuracy">100%</span>
        </div>
      </div>

      <div class="g10-progress-bar-wrap">
        <div class="g10-progress-bar-bg">
          <div class="g10-progress-bar-fill" id="g10-deck-progress-fill" style="width: 0%;"></div>
        </div>
        <span class="g10-progress-pct" id="g10-stat-pct-text">0%</span>
      </div>
    </div>

    <!-- Arena Central de Deslizamiento (Swipe Card Arena) -->
    <div class="g10-swipe-arena" id="g10-swipe-arena">
      <!-- Tarjetas fantasma de fondo -->
      <div class="g10-card-ghost behind-2"></div>
      <div class="g10-card-ghost behind-1"></div>

      <!-- Tarjeta Interactiva Activa -->
      <div class="g10-active-card" id="g10-active-swipe-card">
        <!-- Sellos de Veredicto (Stamps) -->
        <div class="g10-stamp g10-stamp-true" id="g10-stamp-true">VERDADERO</div>
        <div class="g10-stamp g10-stamp-false" id="g10-stamp-false">FALSO</div>

        <div class="g10-card-top-strip">
          <span class="g10-card-category-badge pharma" id="g10-card-cat-badge">💊 Farmacología Renal</span>
          <span class="g10-card-counter" id="g10-card-index-counter">1 de 6</span>
        </div>

        <div class="g10-card-claim-text" id="g10-card-claim-text">
          Cargando aseveración clínica...
        </div>

        <div class="g10-card-clue-hint" id="g10-card-clue-hint">
          <span>💡 Contexto Clínico:</span> <span id="g10-card-context-text">Infecciones Urinarias Altas</span>
        </div>
      </div>
    </div>

    <!-- Botones de Decisión a 1-Clic -->
    <div class="g10-action-controls-row">
      <button class="g10-btn-decision false-btn" id="g10-btn-false">
        <span>✗ FALSO</span>
        <span class="g10-btn-key-tag">[F / ◀]</span>
      </button>

      <button class="g10-btn-decision true-btn" id="g10-btn-true">
        <span>✓ VERDADERO</span>
        <span class="g10-btn-key-tag">[V / ▶]</span>
      </button>
    </div>

    <!-- Panel de Revelación & Desglose Fisiopatológico -->
    <div class="g10-revelation-panel" id="g10-revelation-panel">
      <div class="g10-rev-top-row">
        <div class="g10-rev-verdict" id="g10-rev-verdict">
          <span>✓</span> ¡Correcto! Es FALSO
        </div>
        <span class="g10-rev-xp-badge" id="g10-rev-xp-badge">+100 XP ✨</span>
      </div>

      <p class="g10-rev-rationale" id="g10-rev-rationale"></p>

      <div class="g10-rev-trap-box" id="g10-rev-trap-box">
        <span class="g10-rev-trap-title">⚠️ Trampa Frecuente de Examen / Error Clínico Habitual:</span>
        <p class="g10-rev-trap-text" id="g10-rev-trap-text"></p>
      </div>

      <button class="g10-btn-next-card" id="g10-btn-next-card">
        Siguiente Ficha →
      </button>
    </div>

    <!-- Modal de Fin de Ronda -->
    <div class="g10-modal-overlay" id="g10-round-win-modal">
      <div class="g10-modal-card">
        <div class="g10-modal-header">
          <div style="font-size:42px;">🏆</div>
          <div class="g10-modal-title">¡Ronda Desmitificada con Éxito!</div>
          <p style="font-size:13px; color:#94a3b8;">
            Has evaluado todas las afirmaciones clínicas de esta categoría discriminando dogmas y contraindicaciones críticas.
          </p>
        </div>

        <div style="overflow-x:auto;">
          <table class="g10-summary-table">
            <thead>
              <tr>
                <th>Aseveración Clínica</th>
                <th>Veredicto</th>
                <th>Racional Fisiopatológico & Evidencia</th>
              </tr>
            </thead>
            <tbody id="g10-summary-tbody"></tbody>
          </table>
        </div>

        <div class="g10-modal-actions">
          <button class="g10-btn-secondary" id="g10-btn-restart-round">↺ Repetir Ronda</button>
          <button class="g10-btn-action" id="g10-btn-modal-next-round">Siguiente Categoría →</button>
        </div>
      </div>
    </div>
  `;

  stage.appendChild(container);

  // Setup round navigation
  setupG10RoundNavigation();
  loadG10Round(0);

  // Attach button events
  const btnFalse = document.getElementById("g10-btn-false");
  const btnTrue = document.getElementById("g10-btn-true");
  const btnNext = document.getElementById("g10-btn-next-card");
  const btnRestart = document.getElementById("g10-btn-restart-round");
  const btnModalNext = document.getElementById("g10-btn-modal-next-round");

  if (btnFalse) btnFalse.onclick = () => handleG10Decision(false);
  if (btnTrue) btnTrue.onclick = () => handleG10Decision(true);
  if (btnNext) btnNext.onclick = () => advanceG10NextCard();
  if (btnRestart) btnRestart.onclick = () => restartG10CurrentRound();
  if (btnModalNext) btnModalNext.onclick = () => goToG10NextRound();

  // Setup gestures and keyboard
  setupG10SwipeGestures();
  setupG10KeyboardEvents();
}

function setupG10RoundNavigation() {
  const container = document.getElementById("g10-round-pills-row");
  if (!container) return;
  container.innerHTML = "";

  GAME10_ROUNDS.forEach((r, idx) => {
    const btn = document.createElement("button");
    btn.className = `g10-round-btn ${idx === g10CurrentRoundIdx ? 'active' : ''}`;
    btn.innerHTML = `<span>Ronda 0${idx + 1}</span> · <small>${r.shortTitle}</small>`;
    btn.addEventListener("click", () => {
      loadG10Round(idx);
    });
    container.appendChild(btn);
  });
}

function loadG10Round(idx) {
  g10CurrentRoundIdx = idx;
  g10CurrentClaimIdx = 0;
  g10RoundAnswers = [];
  g10CardAnswered = false;

  const round = GAME10_ROUNDS[idx];
  document.querySelectorAll(".g10-round-btn").forEach((b, i) => {
    b.classList.toggle("active", i === idx);
  });

  const tagEl = document.getElementById("g10-current-round-tag");
  if (tagEl) tagEl.textContent = `Ronda 0${idx + 1}: ${round.title}`;

  hideG10RevelationPanel();
  renderG10ActiveClaim();
  updateG10MetricsDisplay();
}

function renderG10ActiveClaim() {
  const round = GAME10_ROUNDS[g10CurrentRoundIdx];
  const claim = round.claims[g10CurrentClaimIdx];
  g10CardAnswered = false;

  const card = document.getElementById("g10-active-swipe-card");
  if (card) {
    card.style.transform = "none";
    card.style.borderColor = "var(--border-accent, #334155)";
    card.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.6)";
  }

  const stampTrue = document.getElementById("g10-stamp-true");
  const stampFalse = document.getElementById("g10-stamp-false");
  if (stampTrue) stampTrue.style.opacity = "0";
  if (stampFalse) stampFalse.style.opacity = "0";

  const catBadge = document.getElementById("g10-card-cat-badge");
  if (catBadge) {
    catBadge.className = `g10-card-category-badge ${claim.catClass}`;
    catBadge.textContent = claim.category;
  }

  const counterEl = document.getElementById("g10-card-index-counter");
  if (counterEl) counterEl.textContent = `${g10CurrentClaimIdx + 1} de ${round.claims.length}`;

  const claimTextEl = document.getElementById("g10-card-claim-text");
  if (claimTextEl) claimTextEl.textContent = `«${claim.claim}»`;

  const contextTextEl = document.getElementById("g10-card-context-text");
  if (contextTextEl) contextTextEl.textContent = claim.context;

  hideG10RevelationPanel();
  enableG10DecisionButtons(true);
}

function handleG10Decision(userChoice) {
  if (g10CardAnswered) return;
  g10CardAnswered = true;
  enableG10DecisionButtons(false);

  const round = GAME10_ROUNDS[g10CurrentRoundIdx];
  const claim = round.claims[g10CurrentClaimIdx];
  const isCorrect = (userChoice === claim.verdict);

  g10RoundAnswers.push({ claim, userChoice, isCorrect });

  const card = document.getElementById("g10-active-swipe-card");
  const stampTrue = document.getElementById("g10-stamp-true");
  const stampFalse = document.getElementById("g10-stamp-false");

  if (card) {
    if (userChoice === true) {
      card.style.transform = "translateX(120px) rotate(10deg)";
      card.style.borderColor = "#10b981";
      if (stampTrue) stampTrue.style.opacity = "1";
    } else {
      card.style.transform = "translateX(-120px) rotate(-10deg)";
      card.style.borderColor = "#f43f5e";
      if (stampFalse) stampFalse.style.opacity = "1";
    }
  }

  if (isCorrect) {
    LabGamification.addXP(100, "Juicio Crítico Certero 🎯");
    LabGamification.incrementStreak();
    playLabSuccessSound();
  } else {
    playLabErrorSound();
    LabGamification.resetStreak();
    if (card) {
      card.animate([
        { transform: userChoice ? 'translateX(120px) rotate(10deg)' : 'translateX(-120px) rotate(-10deg)' },
        { transform: userChoice ? 'translateX(105px) rotate(8deg)' : 'translateX(-105px) rotate(-8deg)' },
        { transform: userChoice ? 'translateX(125px) rotate(11deg)' : 'translateX(-125px) rotate(-11deg)' }
      ], { duration: 350 });
    }
  }

  showG10RevelationPanel(isCorrect, claim, userChoice);
  updateG10MetricsDisplay();
}

function showG10RevelationPanel(isCorrect, claim, userChoice) {
  const panel = document.getElementById("g10-revelation-panel");
  if (!panel) return;
  panel.style.display = "flex";

  const verdictEl = document.getElementById("g10-rev-verdict");
  const xpBadge = document.getElementById("g10-rev-xp-badge");
  const rationaleEl = document.getElementById("g10-rev-rationale");
  const trapTextEl = document.getElementById("g10-rev-trap-text");

  const correctWord = claim.verdict ? "VERDADERO" : "FALSO";
  const choiceWord = userChoice ? "VERDADERO" : "FALSO";

  if (verdictEl) {
    if (isCorrect) {
      verdictEl.className = "g10-rev-verdict correct";
      verdictEl.innerHTML = `<span>✓</span> ¡Correcto! Es <strong>${correctWord}</strong>`;
      if (xpBadge) {
        xpBadge.style.display = "inline-block";
        xpBadge.textContent = `+100 XP ✨ Racha x${LabGamification.streak}`;
      }
    } else {
      verdictEl.className = "g10-rev-verdict incorrect";
      verdictEl.innerHTML = `<span>✗</span> Discrepancia: Marcaste <em>${choiceWord}</em>, pero es <strong>${correctWord}</strong>`;
      if (xpBadge) xpBadge.style.display = "none";
    }
  }

  if (rationaleEl) rationaleEl.textContent = claim.rationale;
  if (trapTextEl) trapTextEl.textContent = claim.trap;

  const nextBtn = document.getElementById("g10-btn-next-card");
  const round = GAME10_ROUNDS[g10CurrentRoundIdx];
  if (nextBtn) {
    if (g10CurrentClaimIdx < round.claims.length - 1) {
      nextBtn.textContent = `Siguiente Ficha (${g10CurrentClaimIdx + 2}/${round.claims.length}) →`;
    } else {
      nextBtn.textContent = "Ver Resultados de la Ronda →";
    }
  }

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideG10RevelationPanel() {
  const panel = document.getElementById("g10-revelation-panel");
  if (panel) panel.style.display = "none";
}

function advanceG10NextCard() {
  const round = GAME10_ROUNDS[g10CurrentRoundIdx];
  if (g10CurrentClaimIdx < round.claims.length - 1) {
    g10CurrentClaimIdx++;
    renderG10ActiveClaim();
    updateG10MetricsDisplay();
  } else {
    handleG10RoundVictory();
  }
}

function enableG10DecisionButtons(enabled) {
  const btnFalse = document.getElementById("g10-btn-false");
  const btnTrue = document.getElementById("g10-btn-true");
  if (btnFalse) {
    btnFalse.disabled = !enabled;
    btnFalse.style.opacity = enabled ? "1" : "0.5";
  }
  if (btnTrue) {
    btnTrue.disabled = !enabled;
    btnTrue.style.opacity = enabled ? "1" : "0.5";
  }
}

function updateG10MetricsDisplay() {
  const round = GAME10_ROUNDS[g10CurrentRoundIdx];
  if (!round) return;
  const total = round.claims.length;
  const current = Math.min(total, g10CurrentClaimIdx + 1);

  const cardCountEl = document.getElementById("g10-stat-card-count");
  if (cardCountEl) cardCountEl.textContent = `Ficha ${current} / ${total}`;

  const streakEl = document.getElementById("g10-stat-streak-count");
  if (streakEl) streakEl.textContent = `🔥 x${LabGamification.streak}`;

  const answeredCount = g10RoundAnswers.length;
  const correctCount = g10RoundAnswers.filter(a => a.isCorrect).length;
  const acc = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 100;

  const accEl = document.getElementById("g10-stat-accuracy");
  if (accEl) accEl.textContent = `${acc}%`;

  const pct = Math.round((answeredCount / total) * 100);
  const fillEl = document.getElementById("g10-deck-progress-fill");
  if (fillEl) fillEl.style.width = `${pct}%`;

  const pctTextEl = document.getElementById("g10-stat-pct-text");
  if (pctTextEl) pctTextEl.textContent = `${pct}%`;
}

function setupG10SwipeGestures() {
  const card = document.getElementById("g10-active-swipe-card");
  if (!card) return;

  card.addEventListener("pointerdown", (e) => {
    if (g10CardAnswered) return;
    g10IsDragging = true;
    g10StartX = e.clientX;
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener("pointermove", (e) => {
    if (!g10IsDragging || g10CardAnswered) return;
    g10CurrentTranslateX = e.clientX - g10StartX;
    const rotateDeg = g10CurrentTranslateX * 0.08;

    card.style.transform = `translateX(${g10CurrentTranslateX}px) rotate(${rotateDeg}deg)`;

    const stampTrue = document.getElementById("g10-stamp-true");
    const stampFalse = document.getElementById("g10-stamp-false");

    if (g10CurrentTranslateX > 40) {
      const opacity = Math.min(1, (g10CurrentTranslateX - 40) / 90);
      if (stampTrue) stampTrue.style.opacity = opacity;
      if (stampFalse) stampFalse.style.opacity = 0;
    } else if (g10CurrentTranslateX < -40) {
      const opacity = Math.min(1, (-g10CurrentTranslateX - 40) / 90);
      if (stampFalse) stampFalse.style.opacity = opacity;
      if (stampTrue) stampTrue.style.opacity = 0;
    } else {
      if (stampTrue) stampTrue.style.opacity = 0;
      if (stampFalse) stampFalse.style.opacity = 0;
    }
  });

  card.addEventListener("pointerup", (e) => {
    if (!g10IsDragging || g10CardAnswered) return;
    g10IsDragging = false;
    card.releasePointerCapture(e.pointerId);

    const stampTrue = document.getElementById("g10-stamp-true");
    const stampFalse = document.getElementById("g10-stamp-false");

    if (g10CurrentTranslateX > 90) {
      handleG10Decision(true);
    } else if (g10CurrentTranslateX < -90) {
      handleG10Decision(false);
    } else {
      card.style.transform = "none";
      if (stampTrue) stampTrue.style.opacity = 0;
      if (stampFalse) stampFalse.style.opacity = 0;
    }
    g10CurrentTranslateX = 0;
  });
}

function setupG10KeyboardEvents() {
  if (g10KeyboardHandlerAttached) return;
  g10KeyboardHandlerAttached = true;

  window.addEventListener("keydown", (e) => {
    if (activeGameId !== "game-10") return;

    if (g10CardAnswered) {
      if (e.key === "Enter" || e.code === "Space") {
        e.preventDefault();
        advanceG10NextCard();
      }
      return;
    }

    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "f") {
      e.preventDefault();
      handleG10Decision(false);
    } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "v") {
      e.preventDefault();
      handleG10Decision(true);
    }
  });
}

function handleG10RoundVictory() {
  LabGamification.triggerConfetti();
  LabGamification.unlockBadge("clinical_mythbuster");
  LabGamification.addXP(250, "¡Ronda Desmitificada!");
  playLabVictorySound();

  const modal = document.getElementById("g10-round-win-modal");
  const tbody = document.getElementById("g10-summary-tbody");
  if (!modal || !tbody) return;
  tbody.innerHTML = "";

  g10RoundAnswers.forEach(ans => {
    const row = document.createElement("tr");
    const vColor = ans.claim.verdict ? "#10b981" : "#f43f5e";
    const vWord = ans.claim.verdict ? "VERDADERO" : "FALSO";
    const statusIcon = ans.isCorrect ? "✅" : "❌";

    row.innerHTML = `
      <td><strong>${ans.claim.claim}</strong><br><small style="color:#94a3b8;">${ans.claim.category} · ${ans.claim.context}</small></td>
      <td><span style="color:${vColor}; font-weight:800;">${statusIcon} ${vWord}</span></td>
      <td>${ans.claim.rationale}<br><small style="color:#fde047; font-weight:600;">⚠️ ${ans.claim.trap}</small></td>
    `;
    tbody.appendChild(row);
  });

  const nextBtn = document.getElementById("g10-btn-modal-next-round");
  if (nextBtn) {
    if (g10CurrentRoundIdx < GAME10_ROUNDS.length - 1) {
      nextBtn.textContent = `Siguiente Categoría (Ronda 0${g10CurrentRoundIdx + 2}) →`;
    } else {
      nextBtn.textContent = "Volver a Ronda 01 →";
    }
  }

  modal.style.display = "flex";
}

function restartG10CurrentRound() {
  const modal = document.getElementById("g10-round-win-modal");
  if (modal) modal.style.display = "none";
  loadG10Round(g10CurrentRoundIdx);
}

function goToG10NextRound() {
  const modal = document.getElementById("g10-round-win-modal");
  if (modal) modal.style.display = "none";
  if (g10CurrentRoundIdx < GAME10_ROUNDS.length - 1) {
    loadG10Round(g10CurrentRoundIdx + 1);
  } else {
    loadG10Round(0);
  }
}

// ========================================================
// JUEGO 11: PATIENT CLUSTER (PALITROQUE & 3 CÍRCULOS)
// ========================================================
const GAME11_ROUNDS = [
  {
    id: "round-01",
    title: "Estratificación de Severidad en Neumonía (CURB-65 / ATS-IDSA)",
    shortTitle: "Severidad NAC",
    circles: [
      {
        id: "circle-mild",
        themeClass: "theme-mild",
        icon: "🏡",
        title: "Círculo 1: Leve",
        subtitle: "Manejo Ambulatorio",
        criteria: "CURB-65 = 0 a 1 punto",
        hotkey: "1"
      },
      {
        id: "circle-moderate",
        themeClass: "theme-moderate",
        icon: "🛏️",
        title: "Círculo 2: Moderada",
        subtitle: "Sala General",
        criteria: "CURB-65 = 2 puntos",
        hotkey: "2"
      },
      {
        id: "circle-severe",
        themeClass: "theme-severe",
        icon: "🚨",
        title: "Círculo 3: Severa",
        subtitle: "Ingreso a UCI",
        criteria: "Criterio Mayor ATS / Shock",
        hotkey: "3"
      }
    ],
    patients: [
      {
        id: "p1",
        name: "Don Carlos",
        shortName: "Carlos",
        age: 68,
        arrival: "🚑 SVA con sirena",
        avatar: "👴",
        vitals: {
          bp: { val: "84/50", status: "danger" },
          hr: { val: "126 lpm", status: "danger" },
          rr: { val: "36 rpm", status: "danger" },
          sat: { val: "86% (Aire)", status: "danger" },
          temp: { val: "39.2 °C", status: "warning" },
          gcs: { val: "12 / Confuso", status: "danger" }
        },
        vignette: "Tos con expectoración herrumbrosa de 4 días. Al examen: estertores crepitantes y matidez en base derecha. Gasometría: PaO2/FiO2 de 180 mmHg. Lactato: 3.8 mmol/L. A pesar de 2000 mL de cristaloides, la PAM persiste en 58 mmHg.",
        discriminator: "Shock séptico refractario con vasopresor (Criterio Mayor ATS/IDSA)",
        targetCircleId: "circle-severe",
        rationale: "Cumple con el criterio mayor absoluto de la ATS/IDSA: shock séptico con necesidad de soporte vasopresor (PAM <65 persistente), sumado a PaO2/FiO2 <200. Requiere el Círculo 3 (UCI).",
        triageImpact: {
          optimal: "Ingreso inmediato a UCI: soporte vasopresor precoz y monitorización hemodinámica invasiva, reduciendo la mortalidad en shock séptico.",
          subTriage: "¡ERROR CRÍTICO DE SUB-TRIAGE! Enviar este palitroque al Círculo 2 (Sala) o 1 causará paro por shock distributivo descompensado.",
          overTriage: "N/A"
        }
      },
      {
        id: "p2",
        name: "Lucas",
        shortName: "Lucas",
        age: 26,
        arrival: "🚶 Deambulando solo",
        avatar: "👦",
        vitals: {
          bp: { val: "118/74", status: "normal" },
          hr: { val: "88 lpm", status: "normal" },
          rr: { val: "18 rpm", status: "normal" },
          sat: { val: "98% (Aire)", status: "normal" },
          temp: { val: "38.2 °C", status: "normal" },
          gcs: { val: "15 / Alerta", status: "normal" }
        },
        vignette: "Joven previamente sano con tos productiva mucopurulenta de 3 días, fiebre y dolor pleurítico leve en hemitórax izquierdo. Rx de tórax: infiltrado alveolar lobar inferior izquierdo segmentario sin derrame.",
        discriminator: "CURB-65 = 0 puntos (Confusión 0, Urea normal, FR <30, PA normal, Edad <65)",
        targetCircleId: "circle-mild",
        rationale: "Paciente joven sin comorbilidades, hemodinámicamente estable, con CURB-65 de 0 puntos y SatO2 >95%. Debe ir al Círculo 1 (Ambulatorio) con amoxicilina o azitromicina oral.",
        triageImpact: {
          optimal: "Manejo ambulatorio seguro: evita infecciones nosocomiales y optimiza camas hospitalarias con excelente tasa de curación.",
          subTriage: "N/A",
          overTriage: "¡SOBRE-TRIAGE! Moverlo al Círculo 2 o 3 satura recursos asistenciales y lo expone a patógenos nosocomiales sin beneficio."
        }
      },
      {
        id: "p3",
        name: "Doña Teresa",
        shortName: "Teresa",
        age: 74,
        arrival: "♿ Silla de ruedas",
        avatar: "👵",
        vitals: {
          bp: { val: "135/82", status: "normal" },
          hr: { val: "102 lpm", status: "warning" },
          rr: { val: "31 rpm", status: "danger" },
          sat: { val: "91% (Gafas 2L)", status: "warning" },
          temp: { val: "38.5 °C", status: "warning" },
          gcs: { val: "15 / Alerta", status: "normal" }
        },
        vignette: "Historia de hipertensión bien controlada. Presenta fiebre, disnea progresiva y tos de 5 días. Rx tórax: consolidación bilobar derecha. Urea sérica: 45 mg/dL (BUN 21 mg/dL). No hay confusión ni hipotensión.",
        discriminator: "CURB-65 = 2 puntos (Edad ≥65 + Taquipnea FR ≥30)",
        targetCircleId: "circle-moderate",
        rationale: "Con 2 puntos en CURB-65 (Edad ≥65 años y FR ≥30 rpm), la mortalidad alcanza el 9%. Corresponde al Círculo 2 (Sala General) para antibióticos parenterales y soporte oxigenatorio supervisado.",
        triageImpact: {
          optimal: "Hospitalización en Sala General con ceftriaxona + claritromicina IV.",
          subTriage: "¡SUB-TRIAGE PELIGROSO! Dar el alta al Círculo 1 conlleva un riesgo de deterioro respiratorio rápido en domicilio.",
          overTriage: "Moverla al Círculo 3 (UCI) cuando no hay criterios mayores de la ATS satura camas de cuidados intensivos."
        }
      },
      {
        id: "p4",
        name: "Martín",
        shortName: "Martín",
        age: 54,
        arrival: "🚑 Ambulancia",
        avatar: "👨",
        vitals: {
          bp: { val: "90/58", status: "warning" },
          hr: { val: "118 lpm", status: "warning" },
          rr: { val: "38 rpm", status: "danger" },
          sat: { val: "84% (Venturi 50%)", status: "danger" },
          temp: { val: "39.6 °C", status: "warning" },
          gcs: { val: "13 / Somnoliento", status: "danger" }
        },
        vignette: "Neumonía por Influenza complicada con sobreinfección por S. aureus. Gasometría arterial: PaO2/FiO2 = 142 mmHg, acidosis respiratoria e hipercapnia progresiva con tiraje intercostal exhaustivo.",
        discriminator: "Fallo respiratorio hipercápnico severo con indicación de VMI (Criterio Mayor ATS)",
        targetCircleId: "circle-severe",
        rationale: "Fallo ventilatorio inminente por agotamiento muscular y PaO2/FiO2 <150. Requiere intubación y ventilación mecánica en el Círculo 3 (UCI).",
        triageImpact: {
          optimal: "UCI inmediata: vía aérea protegida antes del colapso respiratorio catastrófico.",
          subTriage: "¡SUB-TRIAGE FATAL! Mantener a este palitroque en sala general derivará en paro hipóxico.",
          overTriage: "N/A"
        }
      },
      {
        id: "p5",
        name: "Sofía",
        shortName: "Sofía",
        age: 38,
        arrival: "🚶 Deambulando",
        avatar: "👩",
        vitals: {
          bp: { val: "112/68", status: "normal" },
          hr: { val: "78 lpm", status: "normal" },
          rr: { val: "16 rpm", status: "normal" },
          sat: { val: "97% (Aire)", status: "normal" },
          temp: { val: "37.9 °C", status: "normal" },
          gcs: { val: "15 / Alerta", status: "normal" }
        },
        vignette: "Faringoamigdalitis tratada hace 10 días, consulta por persistencia de tos seca en accesos, cefalea y febrícula. Auscultación con crepitantes finos bilaterales. Rx tórax: infiltrados intersticiales reticulares (Mycoplasma).",
        discriminator: "CURB-65 = 0 puntos · Sin criterios de severidad",
        targetCircleId: "circle-mild",
        rationale: "Neumonía atípica en paciente joven y estable sin hipoxemia ni comorbilidades. Su destino es el Círculo 1 (Ambulatorio) con Azitromicina oral.",
        triageImpact: {
          optimal: "Manejo ambulatorio correcto y coste-efectivo.",
          subTriage: "N/A",
          overTriage: "Hospitalizar a neumonías atípicas leves sin hipoxemia es una práctica de sobre-triage innecesaria."
        }
      },
      {
        id: "p6",
        name: "Don Alberto",
        shortName: "Alberto",
        age: 79,
        arrival: "🚑 Ambulancia básica",
        avatar: "👴",
        vitals: {
          bp: { val: "128/70", status: "normal" },
          hr: { val: "94 lpm", status: "normal" },
          rr: { val: "24 rpm", status: "normal" },
          sat: { val: "92% (Aire)", status: "warning" },
          temp: { val: "38.0 °C", status: "normal" },
          gcs: { val: "13 / Desorientado", status: "danger" }
        },
        vignette: "Traído por su hija por desorientación témporo-espacial de inicio agudo y disminución de la ingesta de 48h. Analítica: Urea 62 mg/dL. Rx tórax: neumonía lobar media derecha.",
        discriminator: "CURB-65 = 3 puntos (Confusión aguda + Urea >42 + Edad ≥65) sin shock",
        targetCircleId: "circle-moderate",
        rationale: "Puntaje CURB-65 de 3 puntos. Requiere hospitalización inmediata supervisada en el Círculo 2 (Sala General Monitorizada) para hidratación y ceftriaxona + levofloxacino IV.",
        triageImpact: {
          optimal: "Hospitalización monitorizada con cobertura antibiótica IV y corrección de deshidratación.",
          subTriage: "El Círculo 1 (alta) en este paciente conlleva un riesgo de mortalidad del 15-20%.",
          overTriage: "Si no hay shock ni fallo ventilatorio invasivo, el Círculo 2 con estrecho seguimiento es el estándar inicial."
        }
      }
    ]
  },
  {
    id: "round-02",
    title: "Clusters Diagnósticos ante Dolor Torácico de Emergencia",
    shortTitle: "Dolor Torácico",
    circles: [
      {
        id: "circle-coronary",
        themeClass: "theme-severe",
        icon: "🫀",
        title: "Círculo 1: Coronario",
        subtitle: "SCA / Infarto de Miocardio",
        criteria: "STEMI / NSTEMI / Angina",
        hotkey: "1"
      },
      {
        id: "circle-aortic-pe",
        themeClass: "theme-moderate",
        icon: "⚡",
        title: "Círculo 2: Aórtico / TEP",
        subtitle: "Emergencia Vascular Mayor",
        criteria: "Disección Aórtica / TEP Agudo",
        hotkey: "2"
      },
      {
        id: "circle-benign",
        themeClass: "theme-mild",
        icon: "🛡️",
        title: "Círculo 3: No Cardíaco",
        subtitle: "Pared Torácica / Digestivo",
        criteria: "Costocondritis / Reflujo",
        hotkey: "3"
      }
    ],
    patients: [
      {
        id: "p1",
        name: "Don Fernando",
        shortName: "Fernando",
        age: 62,
        arrival: "🚑 Ambulancia",
        avatar: "👨",
        vitals: {
          bp: { val: "135/85", status: "normal" },
          hr: { val: "88 lpm", status: "normal" },
          rr: { val: "20 rpm", status: "normal" },
          sat: { val: "96% (Aire)", status: "normal" },
          temp: { val: "36.7 °C", status: "normal" },
          gcs: { val: "15 / Alerta", status: "normal" }
        },
        vignette: "Dolor retroesternal opresivo de 1 hora de duración irradiado a cuello y hombro izquierdo, con diaforesis profusa. ECG: Supradesnivel del segmento ST de 3 mm en derivaciones V1 a V4.",
        discriminator: "Supradesnivel de ST anterior V1-V4 (SCACEST)",
        targetCircleId: "circle-coronary",
        rationale: "Infarto con elevación del ST (SCACEST). El palitroque debe ir al Círculo 1 (Coronario) para activar el laboratorio de hemodinámica (cateterismo primario).",
        triageImpact: {
          optimal: "Activación inmediata de código infarto (puerta-balón <90 min).",
          subTriage: "Retrasar el cateterismo causa necrosis transmural y rotura miocárdica.",
          overTriage: "N/A"
        }
      },
      {
        id: "p2",
        name: "Héctor",
        shortName: "Héctor",
        age: 56,
        arrival: "🚑 SVA",
        avatar: "👨",
        vitals: {
          bp: { val: "195/110", status: "danger" },
          hr: { val: "98 lpm", status: "warning" },
          rr: { val: "22 rpm", status: "normal" },
          sat: { val: "95% (Aire)", status: "normal" },
          temp: { val: "36.8 °C", status: "normal" },
          gcs: { val: "15 / Alerta", status: "normal" }
        },
        vignette: "Hipertenso mal controlado. Dolor torácico súbito de intensidad 10/10, desgarrador entre las escápulas. Se ausculta soplo diastólico aórtico y el pulso radial derecho es francamente más débil que el izquierdo.",
        discriminator: "Dolor desgarrador interescapular + asimetría de pulsos (Disección Aórtica)",
        targetCircleId: "circle-aortic-pe",
        rationale: "Disección Aórtica Aguda tipo A. Debe ir al Círculo 2 (Emergencia Vascular Mayor) para angioTAC inmediata y cirugía cardíaca urgente.",
        triageImpact: {
          optimal: "AngioTAC inmediata y betabloqueo IV estricto para preparar cirugía aórtica.",
          subTriage: "¡FATAL! Administrar anticoagulantes o antiagregantes causará taponamiento cardíaco y muerte por hemopericardio.",
          overTriage: "N/A"
        }
      },
      {
        id: "p3",
        name: "Andrés",
        shortName: "Andrés",
        age: 28,
        arrival: "🚶 Deambulando",
        avatar: "👦",
        vitals: {
          bp: { val: "120/75", status: "normal" },
          hr: { val: "72 lpm", status: "normal" },
          rr: { val: "14 rpm", status: "normal" },
          sat: { val: "99% (Aire)", status: "normal" },
          temp: { val: "36.5 °C", status: "normal" },
          gcs: { val: "15 / Alerta", status: "normal" }
        },
        vignette: "Entrenamiento de pesas intenso hace 2 días. Molestia punzante paraesternal izquierda. La presión digital sobre la 3ra y 4ta articulación condrocostal reproduce el 100% de su dolor. ECG y troponinas normales.",
        discriminator: "Dolor reproducible a la palpación condrocostal (Costocondritis)",
        targetCircleId: "circle-benign",
        rationale: "Costocondritis benigna de la pared torácica. El palitroque va al Círculo 3 (No Cardíaco / Benigno) para analgesia con AINEs y calor local.",
        triageImpact: {
          optimal: "Manejo conservador y tranquilidad al paciente.",
          subTriage: "N/A",
          overTriage: "Someter a coronariografía o angioTAC supone radiación innecesaria."
        }
      }
    ]
  },
  {
    id: "round-03",
    title: "Estratificación de Pancreatitis Aguda (Atlanta Revisado)",
    shortTitle: "Pancreatitis Atlanta",
    circles: [
      {
        id: "circle-panc-mild",
        themeClass: "theme-mild",
        icon: "🟢",
        title: "Círculo 1: Leve",
        subtitle: "Sin Fallo Orgánico",
        criteria: "Resolución espontánea en 48-72h",
        hotkey: "1"
      },
      {
        id: "circle-panc-mod",
        themeClass: "theme-moderate",
        icon: "🟡",
        title: "Círculo 2: Mod. Severa",
        subtitle: "Fallo Transitorio (<48h)",
        criteria: "O complicaciones locales",
        hotkey: "2"
      },
      {
        id: "circle-panc-sev",
        themeClass: "theme-severe",
        icon: "🔴",
        title: "Círculo 3: Severa Crítica",
        subtitle: "Fallo Persistente (>48h)",
        criteria: "Shock / Renal / PaO2-FiO2 <300",
        hotkey: "3"
      }
    ],
    patients: [
      {
        id: "p1",
        name: "Don Jorge",
        shortName: "Jorge",
        age: 52,
        arrival: "🚑 SVA",
        avatar: "👨",
        vitals: {
          bp: { val: "80/48", status: "danger" },
          hr: { val: "132 lpm", status: "danger" },
          rr: { val: "32 rpm", status: "danger" },
          sat: { val: "87% (Venturi)", status: "danger" },
          temp: { val: "38.9 °C", status: "warning" },
          gcs: { val: "12 / Letárgico", status: "danger" }
        },
        vignette: "Dolor epigástrico transfictivo de 72 horas con lipasa de 2400 U/L. Tras 8L de Ringer Lactato en 3 días, persiste oligúrico (Creatinina 3.4 mg/dL), PaO2/FiO2 160 mmHg y requiere noradrenalina a 0.25 mcg/kg/min.",
        discriminator: "Fallo multiorgánico persistente > 48h (Renal, Respiratorio y Shock)",
        targetCircleId: "circle-panc-sev",
        rationale: "Pancreatitis Severa Crítica según Atlanta: fallo orgánico que persiste más allá de 48 horas. El palitroque debe entrar al Círculo 3 (Severa / UCI).",
        triageImpact: {
          optimal: "Ingreso inmediato a UCI con soporte renal continuo y vigilancia de necrosis.",
          subTriage: "¡ERROR LETAL! Mantener en sala común triplica la mortalidad por sepsis y necrosis.",
          overTriage: "N/A"
        }
      },
      {
        id: "p2",
        name: "Gabriela",
        shortName: "Gabriela",
        age: 34,
        arrival: "🚶 Deambulando",
        avatar: "👩",
        vitals: {
          bp: { val: "115/72", status: "normal" },
          hr: { val: "84 lpm", status: "normal" },
          rr: { val: "16 rpm", status: "normal" },
          sat: { val: "98% (Aire)", status: "normal" },
          temp: { val: "37.1 °C", status: "normal" },
          gcs: { val: "15 / Alerta", status: "normal" }
        },
        vignette: "Dolor en hemiabdomen superior de 12 horas tras comida copiosa. Lipasa: 1850 U/L. Ecografía: colelitiasis múltiple sin dilatación coledociana. Sin taquicardia ni fallo orgánico.",
        discriminator: "Sin fallo orgánico ni necrosis (Responde a analgesia)",
        targetCircleId: "circle-panc-mild",
        rationale: "Pancreatitis aguda litiásica leve. Ausencia absoluta de fallo orgánico. El palitroque va al Círculo 1 (Leve) para hidratación y colecistectomía en el mismo ingreso.",
        triageImpact: {
          optimal: "Manejo estándar en planta médica y colecistectomía temprana.",
          subTriage: "N/A",
          overTriage: "Ingresar en UCI o pedir TAC con contraste antes de las 72h es innecesario e iatrogénico."
        }
      },
      {
        id: "p3",
        name: "Don Manuel",
        shortName: "Manuel",
        age: 61,
        arrival: "♿ Silla de ruedas",
        avatar: "👨",
        vitals: {
          bp: { val: "105/65", status: "normal" },
          hr: { val: "104 lpm", status: "warning" },
          rr: { val: "22 rpm", status: "normal" },
          sat: { val: "93% (Gafas 2L)", status: "warning" },
          temp: { val: "38.1 °C", status: "warning" },
          gcs: { val: "15 / Alerta", status: "normal" }
        },
        vignette: "Pancreatitis enólica de 48h. Al ingreso presentó Creatinina de 2.2 mg/dL y PaO2/FiO2 de 280 mmHg que se normalizaron a las 30h tras rehidratación. TAC con colección líquida peripancreática aguda estéril.",
        discriminator: "Fallo transitorio resuelto antes de 48h + Colección local estéril",
        targetCircleId: "circle-panc-mod",
        rationale: "Pancreatitis Moderadamente Severa según Atlanta: fallo orgánico transitorio que resuelve antes de 48 horas con colección local. Corresponde al Círculo 2 (Moderadamente Severa).",
        triageImpact: {
          optimal: "Hospitalización intermedia y vigilancia de la colección.",
          subTriage: "Subestimar como 'leve' arriesga complicaciones infecciosas tardías.",
          overTriage: "Ocupar una cama de UCI con ventilación cuando el fallo ya resolvió es sobre-triage."
        }
      }
    ]
  }
];

let g11CurrentRoundIdx = 0;
let g11CurrentPatientIdx = 0;
let g11RoundAnswers = [];
let g11PatientAnswered = false;
let g11KeyboardHandlerAttached = false;

// Variables de arrastre físico del Palitroque
let g11IsDraggingPawn = false;
let g11DragStartX = 0;
let g11DragStartY = 0;
let g11PawnCurrentX = 0;
let g11PawnCurrentY = 0;

function renderGame11(stage) {
  const container = document.createElement("div");
  container.className = "g11-main-wrap";

  container.innerHTML = `
    <!-- Barra superior compacta unificada de rondas y métricas -->
    <div class="g11-compact-top-strip">
      <div class="g11-round-pills" id="g11-round-pills-row"></div>
      <div class="g11-round-tag" id="g11-current-round-tag">
        Ronda 01: Severidad en Neumonía (CURB-65 / ATS)
      </div>
      <div class="g11-metrics-mini">
        <span class="g11-mini-stat" id="g11-stat-patient-counter">Paciente 1 / 6</span>
        <span class="g11-mini-stat fire" id="g11-stat-streak-counter">🔥 x1</span>
        <span class="g11-mini-stat acc" id="g11-stat-accuracy-counter">100%</span>
        <div class="g11-mini-progress-track">
          <div class="g11-progress-bar-fill" id="g11-progress-bar-fill" style="width: 0%;"></div>
        </div>
        <span class="g11-progress-pct-txt" id="g11-stat-progress-pct">0%</span>
      </div>
    </div>

    <!-- Cockpit de 2 Columnas: Dossier (Izq) + Triángulo de Triage (Der) -->
    <div class="g11-cockpit-arena" id="g11-cockpit-arena">
      <!-- Columna Izquierda: Ficha Clínica y Feedback -->
      <div class="g11-dossier-column">
        <div class="g11-patient-staging-card" id="g11-patient-staging-card">
          <div class="g11-patient-top-bar">
            <div class="g11-patient-id-group">
              <span class="g11-patient-avatar" id="g11-pawn-avatar-preview">👴</span>
              <div class="g11-patient-demographics">
                <h3 id="g11-patient-name-age">Don Carlos · 68 años</h3>
                <p>
                  <span id="g11-patient-arrival-mode" class="g11-arrival-pill">🚑 SVA</span>
                  <span id="g11-patient-setting-tag">Servicio de Urgencias</span>
                </p>
              </div>
            </div>
            <span class="g11-card-counter-tag" id="g11-patient-index-tag">Ficha 1 de 6</span>
          </div>

          <!-- Tira de Constantes Vitales -->
          <div class="g11-vitals-grid">
            <div class="g11-vital-box">
              <span class="g11-vital-name">PA</span>
              <span class="g11-vital-val" id="g11-vital-bp">85/52</span>
            </div>
            <div class="g11-vital-box">
              <span class="g11-vital-name">FC</span>
              <span class="g11-vital-val" id="g11-vital-hr">124</span>
            </div>
            <div class="g11-vital-box">
              <span class="g11-vital-name">FR</span>
              <span class="g11-vital-val" id="g11-vital-rr">34</span>
            </div>
            <div class="g11-vital-box">
              <span class="g11-vital-name">SatO₂</span>
              <span class="g11-vital-val" id="g11-vital-sat">88%</span>
            </div>
            <div class="g11-vital-box">
              <span class="g11-vital-name">Temp</span>
              <span class="g11-vital-val" id="g11-vital-temp">39.1°</span>
            </div>
            <div class="g11-vital-box">
              <span class="g11-vital-name">GCS</span>
              <span class="g11-vital-val" id="g11-vital-gcs">12/Conf</span>
            </div>
          </div>

          <!-- Viñeta Clínica y Hallazgos -->
          <div class="g11-patient-vignette" id="g11-patient-vignette-text">
            Cargando caso clínico...
          </div>

          <!-- Clave de Estratificación / Discriminador -->
          <div class="g11-discriminator-box" id="g11-patient-discriminator-box">
            <span class="g11-disc-title">Clave:</span>
            <span id="g11-patient-discriminator-text">Criterio mayor ATS/IDSA</span>
          </div>
        </div>

        <!-- Panel de Revelación & Feedback Fisiopatológico en Columna Izquierda -->
        <div class="g11-revelation-panel" id="g11-revelation-panel">
          <div class="g11-rev-top-row">
            <div class="g11-rev-verdict" id="g11-rev-verdict">
              <span>✓</span> ¡Asignación Óptima!
            </div>
            <span class="g11-rev-xp-badge" id="g11-rev-xp-badge">+100 XP ✨</span>
          </div>

          <p class="g11-rev-rationale" id="g11-rev-rationale"></p>

          <div class="g11-rev-triage-type-box optimal" id="g11-rev-triage-box">
            <span class="g11-rev-triage-title" id="g11-rev-triage-title">Impacto de la Decisión Clínica:</span>
            <p class="g11-rev-triage-desc" id="g11-rev-triage-desc"></p>
          </div>

          <button class="g11-btn-next-patient" id="g11-btn-next-patient">
            Siguiente Paciente →
          </button>
        </div>
      </div>

      <!-- Columna Derecha: Holograma Triangular / Cuadrado con Círculos en los Vértices y Palitroque Central -->
      <div class="g11-triangle-arena-wrap" id="g11-triangle-arena-wrap">
        <div class="g11-arena-prompt-tag">
          <span>🎯 Vértices de Triage · Arrastra el palitroque hacia el círculo o selecciónalo</span>
        </div>

        <div class="g11-constellation-arena" id="g11-constellation-arena">
          <!-- SVG Geométrico con el Triángulo / Cuadrado de Triage -->
          <svg class="g11-constellation-svg" id="g11-constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- Dibujado dinámico según 3 o 4 círculos -->
          </svg>

          <!-- Podio Central en el Baricentro con el Palitroque Físico -->
          <div class="g11-podium-container center-podium" id="g11-podium-container">
            <div class="g11-podium-ring"></div>

            <!-- Palitroque Pawn -->
            <div class="g11-palitroque-pawn" id="g11-palitroque-pawn" title="Toca y arrastra el palitroque hacia uno de los vértices">
              <div class="g11-pawn-head">
                <span class="g11-pawn-avatar" id="g11-pawn-avatar">👴</span>
              </div>
              <div class="g11-pawn-neck"></div>
              <div class="g11-pawn-body">
                <span class="g11-pawn-badge-name" id="g11-pawn-badge-name">Carlos</span>
                <span class="g11-pawn-hospital-cross">✚</span>
              </div>
              <div class="g11-pawn-base-flare"></div>
              <div class="g11-pawn-ground-shadow"></div>
            </div>

            <span class="g11-pawn-instruction-tag">👆 Mueve a un vértice</span>
          </div>

          <!-- Capa de Círculos de Triage en los Vértices -->
          <div class="g11-circles-constellation-layer" id="g11-circles-grid">
            <!-- Círculos dinámicos en los vértices -->
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Victoria y Resumen de Ronda -->
    <div class="g11-modal-overlay" id="g11-round-win-modal">
      <div class="g11-modal-card">
        <div class="g11-modal-header">
          <div style="font-size:42px;">🏆</div>
          <div class="g11-modal-title">¡Ronda de Clustering Completada!</div>
          <p style="font-size:13px; color:#94a3b8;">
            Has movido con precisión al palitroque a su círculo correspondiente demostrando juicio clínico y evitando errores de sub-triage o sobre-triage.
          </p>
        </div>

        <div style="overflow-x:auto;">
          <table class="g11-summary-table">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Círculo Correcto</th>
                <th>Criterio Clínico & Racional</th>
              </tr>
            </thead>
            <tbody id="g11-summary-tbody"></tbody>
          </table>
        </div>

        <div class="g11-modal-actions">
          <button class="g11-btn-secondary" id="g11-btn-restart-round">↺ Repetir Ronda</button>
          <button class="g11-btn-action" id="g11-btn-modal-next-round">Siguiente Ronda →</button>
        </div>
      </div>
    </div>
  `;

  stage.appendChild(container);

  setupG11RoundNavigation();
  loadG11Round(0);

  const btnNext = document.getElementById("g11-btn-next-patient");
  const btnRestart = document.getElementById("g11-btn-restart-round");
  const btnModalNext = document.getElementById("g11-btn-modal-next-round");

  if (btnNext) btnNext.onclick = () => advanceG11NextPatient();
  if (btnRestart) btnRestart.onclick = () => restartG11CurrentRound();
  if (btnModalNext) btnModalNext.onclick = () => goToG11NextRound();

  setupG11PalitroqueDrag();
  setupG11KeyboardEvents();
}

function setupG11RoundNavigation() {
  const container = document.getElementById("g11-round-pills-row");
  if (!container) return;
  container.innerHTML = "";

  GAME11_ROUNDS.forEach((r, idx) => {
    const btn = document.createElement("button");
    btn.className = `g11-round-tab-btn ${idx === g11CurrentRoundIdx ? 'active' : ''}`;
    btn.innerHTML = `<span>Ronda 0${idx + 1}</span> · <small>${r.shortTitle}</small>`;
    btn.addEventListener("click", () => {
      loadG11Round(idx);
    });
    container.appendChild(btn);
  });
}

function loadG11Round(idx) {
  g11CurrentRoundIdx = idx;
  g11CurrentPatientIdx = 0;
  g11RoundAnswers = [];
  g11PatientAnswered = false;

  const round = GAME11_ROUNDS[idx];
  document.querySelectorAll(".g11-round-tab-btn").forEach((b, i) => {
    b.classList.toggle("active", i === idx);
  });

  const tagEl = document.getElementById("g11-current-round-tag");
  if (tagEl) tagEl.textContent = `Ronda 0${idx + 1}: ${round.title}`;

  renderG11CirclesGrid(round.circles);
  hideG11RevelationPanel();
  resetG11PalitroquePosition();
  renderG11ActivePatient();
  updateG11Metrics();
}

function renderG11CirclesGrid(circles) {
  const grid = document.getElementById("g11-circles-grid");
  const svgEl = document.getElementById("g11-constellation-svg");
  if (!grid) return;
  grid.innerHTML = "";

  const isSquare = (circles.length === 4);

  // Render SVG Constellation Geometry
  if (svgEl) {
    if (isSquare) {
      svgEl.innerHTML = `
        <polygon points="18,18 82,18 82,82 18,82" class="g11-tri-outer" />
        <line x1="50" y1="50" x2="18" y2="18" class="g11-tri-spoke" />
        <line x1="50" y1="50" x2="82" y2="18" class="g11-tri-spoke" />
        <line x1="50" y1="50" x2="82" y2="82" class="g11-tri-spoke" />
        <line x1="50" y1="50" x2="18" y2="82" class="g11-tri-spoke" />
        <circle cx="50" cy="50" r="14" class="g11-tri-radar" />
        <circle cx="50" cy="50" r="28" class="g11-tri-radar" />
      `;
    } else {
      // Triángulo imaginario con 3 vértices (Arriba, Abajo-Izq, Abajo-Der)
      svgEl.innerHTML = `
        <polygon points="50,15 16,84 84,84" class="g11-tri-outer" />
        <line x1="50" y1="52" x2="50" y2="15" class="g11-tri-spoke" />
        <line x1="50" y1="52" x2="16" y2="84" class="g11-tri-spoke" />
        <line x1="50" y1="52" x2="84" y2="84" class="g11-tri-spoke" />
        <circle cx="50" cy="52" r="14" class="g11-tri-radar" />
        <circle cx="50" cy="52" r="28" class="g11-tri-radar" />
      `;
    }
  }

  circles.forEach((c, idx) => {
    const pad = document.createElement("div");
    const vertexClass = isSquare ? `vertex-quad-${idx}` : `vertex-tri-${idx}`;
    pad.className = `g11-triage-circle-pad ${vertexClass} ${c.themeClass}`;
    pad.setAttribute("data-circle-id", c.id);
    pad.innerHTML = `
      <div class="g11-circle-target-reticle"></div>
      <span class="g11-circle-hotkey-badge">[${idx + 1}]</span>
      <div class="g11-circle-icon-wrap">${c.icon}</div>
      <h4 class="g11-circle-title">${c.title}</h4>
      <p class="g11-circle-subtitle">${c.subtitle}</p>
      <span class="g11-circle-criteria-pill">${c.criteria}</span>
      <span class="g11-circle-drop-cta">Soltar aquí ⬇</span>
    `;

    pad.addEventListener("click", () => {
      if (g11PatientAnswered) return;
      animateG11PawnToCircle(pad, () => {
        handleG11CircleDrop(c.id);
      });
    });

    grid.appendChild(pad);
  });
}

function renderG11ActivePatient() {
  const round = GAME11_ROUNDS[g11CurrentRoundIdx];
  const patient = round.patients[g11CurrentPatientIdx];
  g11PatientAnswered = false;

  const avatarEl = document.getElementById("g11-pawn-avatar");
  if (avatarEl) avatarEl.textContent = patient.avatar;

  const avatarPrev = document.getElementById("g11-pawn-avatar-preview");
  if (avatarPrev) avatarPrev.textContent = patient.avatar;

  const badgeEl = document.getElementById("g11-pawn-badge-name");
  if (badgeEl) badgeEl.textContent = patient.shortName || patient.name.split(" ")[1] || patient.name;

  const nameEl = document.getElementById("g11-patient-name-age");
  if (nameEl) nameEl.textContent = `${patient.name} · ${patient.age} años`;

  const arrEl = document.getElementById("g11-patient-arrival-mode");
  if (arrEl) arrEl.textContent = patient.arrival;

  const idxEl = document.getElementById("g11-patient-index-tag");
  if (idxEl) idxEl.textContent = `Ficha ${g11CurrentPatientIdx + 1} de ${round.patients.length}`;

  const setVital = (id, obj) => {
    const el = document.getElementById(id);
    if (el && obj) {
      el.textContent = obj.val;
      el.className = `g11-vital-val ${obj.status}`;
    }
  };

  setVital("g11-vital-bp", patient.vitals.bp);
  setVital("g11-vital-hr", patient.vitals.hr);
  setVital("g11-vital-rr", patient.vitals.rr);
  setVital("g11-vital-sat", patient.vitals.sat);
  setVital("g11-vital-temp", patient.vitals.temp);
  setVital("g11-vital-gcs", patient.vitals.gcs);

  const vigEl = document.getElementById("g11-patient-vignette-text");
  if (vigEl) vigEl.textContent = patient.vignette;

  const discEl = document.getElementById("g11-patient-discriminator-text");
  if (discEl) discEl.textContent = patient.discriminator;

  resetG11PalitroquePosition();
  hideG11RevelationPanel();
  enableG11CirclesInteraction(true);
}

function setupG11PalitroqueDrag() {
  const pawn = document.getElementById("g11-palitroque-pawn");
  if (!pawn) return;

  pawn.addEventListener("pointerdown", (e) => {
    if (g11PatientAnswered) return;
    g11IsDraggingPawn = true;
    g11DragStartX = e.clientX;
    g11DragStartY = e.clientY;
    pawn.classList.add("is-dragging");
    pawn.setPointerCapture(e.pointerId);
    playLabTone(440, 'triangle', 0.08, 0.06);
  });

  pawn.addEventListener("pointermove", (e) => {
    if (!g11IsDraggingPawn || g11PatientAnswered) return;
    g11PawnCurrentX = e.clientX - g11DragStartX;
    g11PawnCurrentY = e.clientY - g11DragStartY;

    pawn.style.transform = `translate(${g11PawnCurrentX}px, ${g11PawnCurrentY}px) scale(1.22) rotate(${g11PawnCurrentX * 0.05}deg)`;

    highlightG11HoveredCircle(e.clientX, e.clientY);
  });

  const handleRelease = (e) => {
    if (!g11IsDraggingPawn || g11PatientAnswered) return;
    g11IsDraggingPawn = false;
    pawn.classList.remove("is-dragging");
    pawn.releasePointerCapture(e.pointerId);

    document.querySelectorAll(".g11-triage-circle-pad").forEach(c => c.classList.remove("drag-hover"));

    const droppedCircle = getG11CircleUnderPoint(e.clientX, e.clientY);

    if (droppedCircle) {
      const circleId = droppedCircle.getAttribute("data-circle-id");
      animateG11PawnToCircle(droppedCircle, () => {
        handleG11CircleDrop(circleId);
      });
    } else {
      resetG11PalitroquePosition(true);
    }
  };

  pawn.addEventListener("pointerup", handleRelease);
  pawn.addEventListener("pointercancel", handleRelease);
}

function getG11CircleUnderPoint(x, y) {
  const pads = document.querySelectorAll(".g11-triage-circle-pad");
  for (const pad of pads) {
    const rect = pad.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;
    const dist = Math.hypot(x - centerX, y - centerY);
    if (dist <= radius + 15) {
      return pad;
    }
  }
  return null;
}

function highlightG11HoveredCircle(x, y) {
  const pads = document.querySelectorAll(".g11-triage-circle-pad");
  pads.forEach(pad => {
    const rect = pad.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;
    const dist = Math.hypot(x - centerX, y - centerY);
    if (dist <= radius + 25) {
      pad.classList.add("drag-hover");
    } else {
      pad.classList.remove("drag-hover");
    }
  });
}

function animateG11PawnToCircle(circleElement, callback) {
  const pawn = document.getElementById("g11-palitroque-pawn");
  if (!pawn || !circleElement) {
    if (callback) callback();
    return;
  }
  const pRect = pawn.getBoundingClientRect();
  const cRect = circleElement.getBoundingClientRect();

  const dx = (cRect.left + cRect.width / 2) - (pRect.left + pRect.width / 2) + g11PawnCurrentX;
  const dy = (cRect.top + cRect.height / 2) - (pRect.top + pRect.height / 2) + g11PawnCurrentY;

  pawn.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
  pawn.style.transform = `translate(${dx}px, ${dy}px) scale(0.95)`;

  setTimeout(() => {
    if (callback) callback();
  }, 350);
}

function resetG11PalitroquePosition(animate = false) {
  const pawn = document.getElementById("g11-palitroque-pawn");
  if (!pawn) return;
  g11PawnCurrentX = 0;
  g11PawnCurrentY = 0;
  if (animate) {
    pawn.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    pawn.style.transform = "translate(0, 0)";
    setTimeout(() => { pawn.style.transition = ""; }, 400);
  } else {
    pawn.style.transition = "";
    pawn.style.transform = "translate(0, 0)";
  }
}

function handleG11CircleDrop(selectedCircleId) {
  if (g11PatientAnswered) return;
  g11PatientAnswered = true;
  enableG11CirclesInteraction(false);

  const round = GAME11_ROUNDS[g11CurrentRoundIdx];
  const patient = round.patients[g11CurrentPatientIdx];
  const isCorrect = (selectedCircleId === patient.targetCircleId);

  g11RoundAnswers.push({ patient, selectedCircleId, isCorrect });

  const pawn = document.getElementById("g11-palitroque-pawn");
  if (isCorrect) {
    LabGamification.addXP(100, "¡Círculo Exacto! 🎯");
    LabGamification.incrementStreak();
    playLabSuccessSound();

    if (pawn) {
      pawn.animate([
        { transform: pawn.style.transform },
        { transform: `${pawn.style.transform} translateY(-14px) scale(1.1)` },
        { transform: pawn.style.transform }
      ], { duration: 400 });
    }
  } else {
    playLabErrorSound();
    LabGamification.resetStreak();

    if (pawn) {
      pawn.animate([
        { transform: `${pawn.style.transform} translateX(-8px)` },
        { transform: `${pawn.style.transform} translateX(8px)` },
        { transform: `${pawn.style.transform} translateX(-5px)` },
        { transform: pawn.style.transform }
      ], { duration: 350 });
    }
  }

  showG11RevelationPanel(isCorrect, patient, selectedCircleId);
  updateG11Metrics();
}

function showG11RevelationPanel(isCorrect, patient, selectedCircleId) {
  const panel = document.getElementById("g11-revelation-panel");
  if (!panel) return;
  panel.style.display = "flex";

  const verdictEl = document.getElementById("g11-rev-verdict");
  const xpBadge = document.getElementById("g11-rev-xp-badge");
  const rationaleEl = document.getElementById("g11-rev-rationale");
  const triageBox = document.getElementById("g11-rev-triage-box");
  const triageTitle = document.getElementById("g11-rev-triage-title");
  const triageDesc = document.getElementById("g11-rev-triage-desc");

  const round = GAME11_ROUNDS[g11CurrentRoundIdx];
  const targetCircle = round.circles.find(c => c.id === patient.targetCircleId);
  const chosenCircle = round.circles.find(c => c.id === selectedCircleId);

  if (isCorrect) {
    if (verdictEl) {
      verdictEl.className = "g11-rev-verdict correct";
      verdictEl.innerHTML = `<span>✓</span> ¡Palitroque Asignado Correctamente a <strong>${targetCircle.title}</strong>!`;
    }
    if (xpBadge) {
      xpBadge.style.display = "inline-block";
      xpBadge.textContent = `+100 XP ✨ Racha x${LabGamification.streak}`;
    }
    if (triageBox) triageBox.className = "g11-rev-triage-type-box optimal";
    if (triageTitle) triageTitle.textContent = "✓ Decisión Clínica Basada en Guías:";
    if (triageDesc) triageDesc.textContent = patient.triageImpact.optimal;
  } else {
    if (verdictEl) {
      verdictEl.className = "g11-rev-verdict incorrect";
      verdictEl.innerHTML = `<span>✗</span> Discrepancia: Moviste el palitroque a <em>${chosenCircle.title}</em>, pero correspondía a <strong>${targetCircle.title}</strong>`;
    }
    if (xpBadge) xpBadge.style.display = "none";

    const targetIdx = round.circles.findIndex(c => c.id === patient.targetCircleId);
    const chosenIdx = round.circles.findIndex(c => c.id === selectedCircleId);

    if (chosenIdx < targetIdx) {
      if (triageBox) triageBox.className = "g11-rev-triage-type-box over-triage";
      if (triageTitle) triageTitle.textContent = "⚠️ Riesgo de Sobre-Triage / Consumo Excesivo de Recursos:";
      if (triageDesc) triageDesc.textContent = patient.triageImpact.overTriage || "Asignar un nivel superior consume recursos asistenciales de pacientes más graves.";
    } else {
      if (triageBox) triageBox.className = "g11-rev-triage-type-box sub-triage";
      if (triageTitle) triageTitle.textContent = "🚨 PELIGRO DE SUB-TRIAGE (Subestimación del Riesgo):";
      if (triageDesc) triageDesc.textContent = patient.triageImpact.subTriage || "Subestimar la gravedad retrasa tratamientos críticos que salvan vidas.";
    }
  }

  if (rationaleEl) rationaleEl.textContent = patient.rationale;

  const nextBtn = document.getElementById("g11-btn-next-patient");
  if (nextBtn) {
    if (g11CurrentPatientIdx < round.patients.length - 1) {
      nextBtn.textContent = `Siguiente Paciente (${g11CurrentPatientIdx + 2}/${round.patients.length}) →`;
    } else {
      nextBtn.textContent = "Ver Resultados de la Ronda →";
    }
  }

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideG11RevelationPanel() {
  const panel = document.getElementById("g11-revelation-panel");
  if (panel) panel.style.display = "none";
}

function advanceG11NextPatient() {
  const round = GAME11_ROUNDS[g11CurrentRoundIdx];
  if (g11CurrentPatientIdx < round.patients.length - 1) {
    g11CurrentPatientIdx++;
    renderG11ActivePatient();
    updateG11Metrics();
  } else {
    handleG11RoundVictory();
  }
}

function enableG11CirclesInteraction(enabled) {
  document.querySelectorAll(".g11-triage-circle-pad").forEach(p => {
    p.style.pointerEvents = enabled ? "auto" : "none";
  });
}

function updateG11Metrics() {
  const round = GAME11_ROUNDS[g11CurrentRoundIdx];
  if (!round) return;
  const total = round.patients.length;
  const current = Math.min(total, g11CurrentPatientIdx + 1);

  const counterEl = document.getElementById("g11-stat-patient-counter");
  if (counterEl) counterEl.textContent = `Paciente ${current} / ${total}`;

  const streakEl = document.getElementById("g11-stat-streak-counter");
  if (streakEl) streakEl.textContent = `🔥 x${LabGamification.streak}`;

  const answeredCount = g11RoundAnswers.length;
  const correctCount = g11RoundAnswers.filter(a => a.isCorrect).length;
  const acc = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 100;

  const accEl = document.getElementById("g11-stat-accuracy-counter");
  if (accEl) accEl.textContent = `${acc}%`;

  const pct = Math.round((answeredCount / total) * 100);
  const fillEl = document.getElementById("g11-progress-bar-fill");
  if (fillEl) fillEl.style.width = `${pct}%`;

  const pctTxt = document.getElementById("g11-stat-progress-pct");
  if (pctTxt) pctTxt.textContent = `${pct}%`;
}

function setupG11KeyboardEvents() {
  if (g11KeyboardHandlerAttached) return;
  g11KeyboardHandlerAttached = true;

  window.addEventListener("keydown", (e) => {
    if (activeGameId !== "game-11") return;

    if (g11PatientAnswered) {
      if (e.key === "Enter" || e.code === "Space") {
        e.preventDefault();
        advanceG11NextPatient();
      }
      return;
    }

    const round = GAME11_ROUNDS[g11CurrentRoundIdx];
    if (!round) return;
    const num = parseInt(e.key);
    if (!isNaN(num) && num >= 1 && num <= round.circles.length) {
      e.preventDefault();
      const selected = round.circles[num - 1];
      const pad = document.querySelector(`[data-circle-id="${selected.id}"]`);
      if (pad) {
        animateG11PawnToCircle(pad, () => {
          handleG11CircleDrop(selected.id);
        });
      }
    }
  });
}

function handleG11RoundVictory() {
  LabGamification.triggerConfetti();
  LabGamification.unlockBadge("patient_cluster_master");
  LabGamification.addXP(250, "¡Estratificación Dominada!");
  playLabVictorySound();

  const modal = document.getElementById("g11-round-win-modal");
  const tbody = document.getElementById("g11-summary-tbody");
  if (!modal || !tbody) return;
  tbody.innerHTML = "";

  const round = GAME11_ROUNDS[g11CurrentRoundIdx];

  g11RoundAnswers.forEach(ans => {
    const row = document.createElement("tr");
    const targetCircle = round.circles.find(c => c.id === ans.patient.targetCircleId);
    const icon = ans.isCorrect ? "✅" : "❌";

    row.innerHTML = `
      <td><strong>${ans.patient.name} (${ans.patient.age}a)</strong><br><small style="color:#94a3b8;">${ans.patient.discriminator}</small></td>
      <td><span style="color:#38bdf8; font-weight:800;">${icon} ${targetCircle.title} (${targetCircle.subtitle})</span></td>
      <td>${ans.patient.rationale}</td>
    `;
    tbody.appendChild(row);
  });

  const nextBtn = document.getElementById("g11-btn-modal-next-round");
  if (nextBtn) {
    if (g11CurrentRoundIdx < GAME11_ROUNDS.length - 1) {
      nextBtn.textContent = `Siguiente Escenario (Ronda 0${g11CurrentRoundIdx + 2}) →`;
    } else {
      nextBtn.textContent = "Volver a Ronda 01 →";
    }
  }

  modal.style.display = "flex";
}

function restartG11CurrentRound() {
  const modal = document.getElementById("g11-round-win-modal");
  if (modal) modal.style.display = "none";
  loadG11Round(g11CurrentRoundIdx);
}

function goToG11NextRound() {
  const modal = document.getElementById("g11-round-win-modal");
  if (modal) modal.style.display = "none";
  if (g11CurrentRoundIdx < GAME11_ROUNDS.length - 1) {
    loadG11Round(g11CurrentRoundIdx + 1);
  } else {
    loadG11Round(0);
  }
}

/* ==========================================================================
   JUEGO 12: CLINICAL WORKFLOW SEQUENCER (Orden de Decisiones / Manejo Secuenciado)
   ========================================================================== */

const GAME12_SCENARIOS = [
  {
    id: "cad",
    title: "Cetoacidosis Diabética (CAD)",
    patientName: "Don Andrés",
    patientAge: 24,
    avatar: "👨‍🦱",
    setting: "Servicio de Urgencias · Paciente con DM1, respiración acidótica de Kussmaul y deshidratación severa.",
    vitals: [
      { label: "PA", val: "90/60", status: "warning" },
      { label: "FC", val: "124 lpm", status: "alert" },
      { label: "FR", val: "32 rpm", status: "alert" },
      { label: "SatO₂", val: "97%", status: "normal" },
      { label: "Temp", val: "37.4°C", status: "normal" },
      { label: "Glasgow", val: "13/15", status: "warning" }
    ],
    clue: "K⁺ sérico: 3.1 mEq/L (¡Hipopotasemia!) | Glucemia: 510 mg/dL | pH: 7.12 | Anion Gap: 24",
    hint: "¡Alerta con el potasio! Administrar insulina con K⁺ < 3.3 mEq/L desvía el potasio al intracelular provocando arritmias ventriculares letales.",
    guideline: "Guía ADA 2024 / ISPAD: En CAD, si K⁺ < 3.3 mEq/L, debe diferirse la insulina y reponer K⁺ hasta alcanzar ≥ 3.3 mEq/L. La hidratación isotónica vigorosa precede a toda terapia para restaurar perfusión renal y flujo tubular.",
    steps: [
      {
        id: "step-fluid",
        title: "Expansión Volémica Vigorosa (Cristaloides 1000 mL en 1ª hora)",
        details: "Restaurar perfusión tisular macrocirculatoria y depuración renal de cetoácidos.",
        category: "Hemodinamia",
        catClass: "cat-hemo",
        correctIndex: 0,
        rationale: "La expansión con solución salina al 0.9% es prioritaria para mitigar el shock hipovolémico osmótico.",
        inversionWarning: "Diferir fluidos empeora la insuficiencia prerrenal y reduce la entrega tisular de oxígeno."
      },
      {
        id: "step-potassium",
        title: "Reposición Intensa de Potasio IV (KCl 20-30 mEq/h en fluidos)",
        details: "Elevar K⁺ por encima de 3.3 mEq/L antes de cualquier exposición a insulina.",
        category: "Electrolitos",
        catClass: "cat-elec",
        correctIndex: 1,
        rationale: "El potasio sérico inicial es 3.1 mEq/L. Es un pre-requisito absoluto antes de encender la bomba de insulina.",
        inversionWarning: "⚠️ ¡PARO CARDÍACO POR HIPOPOTASEMIA! Si das insulina antes de reponer K⁺, la bomba Na⁺/K⁺-ATPasa depleta el K⁺ sérico extracelular despolarizando fatalmente el miocardio."
      },
      {
        id: "step-insulin",
        title: "Infusión Continua de Insulina Regular (0.1 UI/kg/h IV)",
        details: "Frenar la lipólisis y la cetogénesis hepática una vez garantizado el K⁺ seguro.",
        category: "Farmacoterapia",
        catClass: "cat-pharma",
        correctIndex: 2,
        rationale: "Frena la producción de acetoacetato y β-hidroxibutirato y promueve la captación periférica de glucosa.",
        inversionWarning: "Administrada antes de hidratación o reposición de potasio genera shock circulatorio y arritmias ventriculares."
      },
      {
        id: "step-dextrose",
        title: "Añadir Glucosa al 5% IV cuando Glucemia sea < 250 mg/dL",
        details: "Evitar hipoglucemia y edema cerebral mientras se completa el cierre del Anion Gap.",
        category: "Prevención",
        catClass: "cat-prevent",
        correctIndex: 3,
        rationale: "La cetoacidosis tarda más tiempo en cerrarse que la hiperglucemia en descender; se añade glucosa para no suspender la insulina.",
        inversionWarning: "Si administras dextrosa de inicio con 510 mg/dL, exacerbas la hiperosmolaridad plasmática."
      }
    ]
  },
  {
    id: "sepsis",
    title: "Shock Séptico (Bundle de 1 Hora)",
    patientName: "Doña Carmen",
    patientAge: 72,
    avatar: "👵",
    setting: "Urgencias Médicas · Código Sepsis por sospecha de Pielonefritis aguda grave.",
    vitals: [
      { label: "PA", val: "74/42", status: "alert" },
      { label: "FC", val: "128 lpm", status: "alert" },
      { label: "FR", val: "28 rpm", status: "alert" },
      { label: "SatO₂", val: "91%", status: "warning" },
      { label: "Temp", val: "39.2°C", status: "alert" },
      { label: "Glasgow", val: "13/15", status: "warning" }
    ],
    clue: "PAM: 52 mmHg (Shock) | Lactato: 4.6 mmol/L | Leucocitos: 21,500/mm³ (18% bandas)",
    hint: "Recuerda la regla de oro microbiológica: ¡nunca pases un antibiótico antes de cultivar la sangre!",
    guideline: "Surviving Sepsis Campaign 2021-2024: Bundle de 1 Hora. Medir lactato inmediato, obtener hemocultivos x2 previo a los antimicrobianos, administrar antibióticos empíricos de amplio espectro dentro de la primera hora, y fluidoterapia 30 ml/kg + vasopresores si persiste hipotensión.",
    steps: [
      {
        id: "step-lactate",
        title: "Medir Lactato Sérico Inicial y Gasometría Arterial",
        details: "Estratificar la hipoperfusión tisular y establecer baseline de aclaramiento metabólico.",
        category: "Diagnóstico",
        catClass: "cat-diag",
        correctIndex: 0,
        rationale: "El lactato basal marca la severidad del shock celular y sirve de guía para reevaluar a las 2-4 horas.",
        inversionWarning: "Iniciar maniobras sin lactato basal impide evaluar si la reanimación tisular está siendo eficaz."
      },
      {
        id: "step-blood-culture",
        title: "Obtener 2 Frascos de Hemocultivos (Venas Diferentes)",
        details: "Asegurar tipificación microbiológica y antibiograma previo a cualquier fármaco.",
        category: "Diagnóstico",
        catClass: "cat-diag",
        correctIndex: 1,
        rationale: "Los hemocultivos pierden más del 50% de sensibilidad si se toman minutos después del antibiótico.",
        inversionWarning: "⚠️ ¡PÉRDIDA DE RESCATE MICROBIOLÓGICO! Administrar antibióticos antes de los hemocultivos esteriliza la muestra impidiendo el desescalamiento dirigido."
      },
      {
        id: "step-antibiotic",
        title: "Iniciar Antimicrobiano Empírico de Amplio Espectro IV (Ceftriaxona + Amikacina)",
        details: "Administrar dentro de los primeros 60 minutos del reconocimiento del shock.",
        category: "Farmacoterapia",
        catClass: "cat-pharma",
        correctIndex: 2,
        rationale: "Cada hora de retraso en la terapia antimicrobiana en shock séptico aumenta la mortalidad en un 7.6%.",
        inversionWarning: "Diferir el antibiótico más de una hora incrementa exponencialmente la cascada de fallo multiorgánico."
      },
      {
        id: "step-fluids-pressors",
        title: "Reanimación con Cristaloides 30 mL/kg y Noradrenalina si PAM < 65",
        details: "Restaurar volumen intravascular y perfusión de órganos vitales.",
        category: "Hemodinamia",
        catClass: "cat-hemo",
        correctIndex: 3,
        rationale: "La meta hemodinámica es una PAM ≥ 65 mmHg con descenso progresivo del lactato.",
        inversionWarning: "Comenzar vasopresores a dosis altas sin reexpansión volémica produce isquemia mesentérica y periférica severa."
      }
    ]
  },
  {
    id: "acls",
    title: "Paro Cardíaco Extra-hospitalario (ACLS)",
    patientName: "Don Roberto",
    patientAge: 61,
    avatar: "👴",
    setting: "Urgencias Extrahospitalarias · Varón colapsa súbitamente en la calle; monitor muestra ritmo caótico.",
    vitals: [
      { label: "Pulso", val: "Ausente", status: "alert" },
      { label: "Ventilac.", val: "Apnea", status: "alert" },
      { label: "Monitor", val: "FV Gruesa", status: "alert" },
      { label: "Glasgow", val: "3/15", status: "alert" },
      { label: "Pupilas", val: "Midriáticas", status: "warning" },
      { label: "Tiempo", val: "4 min", status: "alert" }
    ],
    clue: "Fibrilación Ventricular (FV) en monitor | Ausencia total de pulso carotídeo | Ritmo DESFIBRILABLE",
    hint: "En una arritmia ventricular desfibrilable presenciada, el choque eléctrico supera en prioridad a cualquier fármaco.",
    guideline: "Guías AHA/ERC ACLS 2020-2024: En FV/TV sin pulso, el tratamiento indiscutible es la desfibrilación precoz. Tras la descarga se reanuda RCP de inmediato durante 2 minutos continuos SIN comprobar pulso. La adrenalina se administra tras el 2º choque y la amiodarona tras el 3º si es refractaria.",
    steps: [
      {
        id: "step-defib",
        title: "Desfibrilación Inmediata (Choque Eléctrico Bifásico 200J)",
        details: "Descarga sincrónica/asincrónica de alta energía para despolarizar el miocardio en masa.",
        category: "Eléctrica",
        catClass: "cat-elec",
        correctIndex: 0,
        rationale: "Por cada minuto de retraso en la desfibrilación de una FV, la probabilidad de supervivencia desciende un 7-10%.",
        inversionWarning: "Retrasar el choque para buscar accesos venosos reduce drásticamente el retorno a circulación espontánea (RCE)."
      },
      {
        id: "step-cpr-2min",
        title: "Reanudar RCP Inmediata de Alta Calidad por 2 Minutos (sin chequear pulso)",
        details: "100-120 cpm, 5-6 cm de profundidad y reexpansión torácica completa.",
        category: "Soporte",
        catClass: "cat-hemo",
        correctIndex: 1,
        rationale: "El miocardio post-choque sufre aturdimiento transitorio; requiere soporte hemodinámico inmediato para recuperar perfusión coronaria.",
        inversionWarning: "⚠️ Detenerse a palpar pulso inmediatamente post-descarga interrumpe el flujo sanguíneo cerebral de forma dañina e innecesaria."
      },
      {
        id: "step-adren-acls",
        title: "Administrar Adrenalina 1 mg IV tras el 2º Ciclo si persiste FV",
        details: "Efecto alfa-1 vasoconstrictor para aumentar la presión de perfusión aórtica y coronaria.",
        category: "Farmacoterapia",
        catClass: "cat-pharma",
        correctIndex: 2,
        rationale: "Se administra cada 3-5 minutos a partir del segundo ciclo si la desfibrilación inicial no restableció el ritmo.",
        inversionWarning: "Administrar adrenalina antes de la primera descarga es un error de algoritmo y no sustituye al choque."
      },
      {
        id: "step-amio-acls",
        title: "Administrar Amiodarona 300 mg IV en Bolo tras el 3º Choque Refractario",
        details: "Antiarrítmico de clase III para estabilizar los canales iónicos del miocito.",
        category: "Farmacoterapia",
        catClass: "cat-pharma",
        correctIndex: 3,
        rationale: "Indicada tras la tercera descarga en FV/TV sin pulso refractaria para prevenir la recurrencia inmediata.",
        inversionWarning: "Administrar antiarrítmicos en el 1º ciclo vulnera el protocolo ACLS y carece de evidencia."
      }
    ]
  },
  {
    id: "anaphylaxis",
    title: "Anafilaxia Sistémica Grave",
    patientName: "Lucía",
    patientAge: 29,
    avatar: "👩",
    setting: "Servicio de Urgencias · Picadura múltiple de avispa, colapso hemodinámico y estridor laríngeo.",
    vitals: [
      { label: "PA", val: "70/38", status: "alert" },
      { label: "FC", val: "136 lpm", status: "alert" },
      { label: "FR", val: "34 rpm", status: "alert" },
      { label: "SatO₂", val: "88%", status: "alert" },
      { label: "Temp", val: "36.8°C", status: "normal" },
      { label: "Vía Aérea", val: "Estridor", status: "alert" }
    ],
    clue: "Edema de lengua y glotis | Hipotensión severa 70/38 | Shock distributivo anafiláctico",
    hint: "¡Error clásico de examen! Los corticoides tardan horas; la única droga que salva la vida en el minuto 1 es la adrenalina intramuscular.",
    guideline: "World Allergy Organization (WAO) / Resuscitation Council UK 2021-2024: La Adrenalina IM en el muslo anterolateral es la intervención de PRIMERA LÍNEA obligada e inmediata. Mantener al paciente estrictamente acostado (síndrome de vena cava colapsada), oxígeno y fluidos. Los antihistamínicos y corticoides son coadyuvantes de segunda línea para prevenir síntomas tardíos.",
    steps: [
      {
        id: "step-epi-im",
        title: "Adrenalina Intramuscular Inmediata (0.5 mg 1:1000 en Muslo Anterolateral)",
        details: "El único fármaco que revierte el broncoespasmo, vasodilatación y edema mucoso en minutos.",
        category: "Emergencia",
        catClass: "cat-diag",
        correctIndex: 0,
        rationale: "El muslo anterolateral garantiza la absorción y niveles plasmáticos pico más rápidos que el deltoides.",
        inversionWarning: "⚠️ ¡IATROGENIA POR DEMORA! Retrasar la adrenalina para administrar corticoides o antihistamínicos es la causa #1 de muerte por anafilaxia."
      },
      {
        id: "step-supine-pos",
        title: "Posición en Decúbito Supino con Piernas Elevadas + Oxígeno al 100%",
        details: "Evitar el colapso hemodinámico por secuestro venoso postural (síndrome de ventrículo vacío).",
        category: "Soporte Físico",
        catClass: "cat-hemo",
        correctIndex: 1,
        rationale: "Sentar o poner de pie a un paciente en shock anafiláctico puede causar paro cardiorrespiratorio repentino por vaciado ventricular.",
        inversionWarning: "Permitir que el paciente se siente o camine desencadena asistolia por fallo de precarga aguda."
      },
      {
        id: "step-fluids-ana",
        title: "Expansión Rápida con Cristaloides IV Isotónicos (1000 a 2000 mL)",
        details: "Compensar la pérdida masiva de hasta un 35% del volumen intravascular por fuga capilar.",
        category: "Hemodinamia",
        catClass: "cat-hemo",
        correctIndex: 2,
        rationale: "La histamina y el PAF provocan una extravasación brutal que requiere reanimación hídrica agresiva.",
        inversionWarning: "Omitir la reanimación hídrica perpetúa la hipoperfusión renal y tisular a pesar de la adrenalina."
      },
      {
        id: "step-steroids-anti",
        title: "Corticoides y Antihistamínicos IV (Hidrocortisona 200mg + Dexclorfeniramina)",
        details: "Fármacos coadyuvantes de SEGUNDA LÍNEA para prevenir la fase anafiláctica bifásica tardía.",
        category: "Segunda Línea",
        catClass: "cat-prevent",
        correctIndex: 3,
        rationale: "Tardan entre 4 y 6 horas en ejercer acción transcripcional genómica; no resuelven la emergencia inmediata.",
        inversionWarning: "Colocarlos como primera línea creyendo erróneamente que frenan el shock conduce al colapso de vía aérea."
      }
    ]
  }
];

let g12CurrentScenarioIdx = 0;
let g12PlacedCards = [null, null, null, null];
let g12AvailableCards = [];
let g12DraggedCardId = null;

function renderGame12(stage) {
  stage.innerHTML = `
    <div class="g12-container">
      <!-- Selector de Escenarios -->
      <nav class="g12-scenario-nav" id="g12-scenario-nav">
        ${GAME12_SCENARIOS.map((sc, i) => `
          <button class="g12-scenario-tab ${i === 0 ? 'active' : ''}" data-idx="${i}">
            ${i === 0 ? '🩸' : i === 1 ? '⚡' : i === 2 ? '🫀' : '🐝'} ${i + 1}. ${sc.title}
          </button>
        `).join("")}
      </nav>

      <!-- Ficha Clínica EHR Compacta -->
      <section class="g12-ehr-strip">
        <div class="g12-patient-bio">
          <div class="g12-patient-avatar" id="g12-ehr-avatar">👨‍🦱</div>
          <div class="g12-patient-meta">
            <h2 id="g12-ehr-name-title">Don Andrés (24a) · Cetoacidosis Diabética</h2>
            <p id="g12-ehr-setting-desc">Servicio de Urgencias · Paciente con DM1, respiración acidótica de Kussmaul y deshidratación severa.</p>
          </div>
        </div>
        <div class="g12-vitals-strip" id="g12-vitals-container"></div>
        <div class="g12-clue-box" id="g12-clue-box">
          <span>⚠️</span>
          <div id="g12-clue-text">K⁺ sérico: 3.1 mEq/L (¡Hipopotasemia!) | Glucemia: 510 mg/dL | pH: 7.12</div>
        </div>
      </section>

      <!-- Zona del Secuenciador / Línea Temporal -->
      <section class="g12-sequencer-box">
        <div class="g12-box-header">
          <div class="g12-box-title">
            <span>⏱️</span> Línea de Tiempo de Manejo (Orden Cronológico Requerido)
          </div>
          <div class="g12-box-subtitle">
            Arrastra o haz clic en las cajitas inferiores para posicionar las acciones del 1º al 4º paso.
          </div>
        </div>
        <div class="g12-timeline-grid" id="g12-timeline-grid"></div>
      </section>

      <!-- Bandeja de Cajitas Disponibles (Pool) -->
      <section class="g12-pool-box">
        <div class="g12-box-header">
          <div class="g12-box-title" style="color: #94a3b8;">
            <span>📦</span> Cajitas de Decisiones Clínicas (Bandeja de Acciones)
          </div>
          <div class="g12-box-subtitle">
            Toca una acción para colocarla en el siguiente paso libre, o arrástrala al casillero deseado.
          </div>
        </div>
        <div class="g12-pool-grid" id="g12-pool-grid"></div>
      </section>

      <!-- Barra de Controles Inferior -->
      <footer class="g12-controls-bar">
        <div style="display: flex; gap: 8px;">
          <button class="g12-btn-sec" id="g12-btn-reset">
            <span>🔄</span> Vaciar Secuencia
          </button>
          <button class="g12-btn-sec" id="g12-btn-hint">
            <span>💡</span> Pista Fisiopatológica
          </button>
        </div>
        <button class="g12-btn-pri" id="g12-btn-validate" disabled>
          <span>⚡</span> Validar Secuencia Clínica
        </button>
      </footer>

      <!-- Pista Flotante Bubble -->
      <div class="g12-hint-bubble" id="g12-hint-bubble">
        <strong style="color: #f59e0b; display: block; margin-bottom: 4px;">💡 Pista Fisiopatológica:</strong>
        <span id="g12-hint-text">Revisa minuciosamente el nivel de potasio...</span>
      </div>

      <!-- Modal de Auditoría de Secuencia -->
      <div class="g12-modal-overlay" id="g12-audit-modal">
        <div class="g12-modal-card">
          <div class="g12-modal-header">
            <div class="g12-modal-title" id="g12-modal-title">
              <span>✅</span> Secuencia Protocolaria Correcta
            </div>
            <button class="g12-modal-close" id="g12-btn-modal-close">✕</button>
          </div>
          <div class="g12-audit-list" id="g12-audit-list"></div>
          <div class="g12-guideline-card" id="g12-guideline-card">
            <span>📖</span>
            <div id="g12-guideline-text"></div>
          </div>
          <div class="g12-modal-footer">
            <button class="g12-btn-sec" id="g12-btn-modal-retry">Reintentar Escenario</button>
            <button class="g12-btn-pri" id="g12-btn-modal-next">Siguiente Escenario →</button>
          </div>
        </div>
      </div>
    </div>
  `;

  setupG12EventListeners();
  initG12Scenario(0);
}

function initG12Scenario(idx) {
  g12CurrentScenarioIdx = idx;
  const scenario = GAME12_SCENARIOS[idx];

  // Actualizar Tabs
  document.querySelectorAll(".g12-scenario-tab").forEach(tab => {
    tab.classList.toggle("active", parseInt(tab.dataset.idx) === idx);
  });

  // EHR
  const avatarEl = document.getElementById("g12-ehr-avatar");
  const titleEl = document.getElementById("g12-ehr-name-title");
  const settingEl = document.getElementById("g12-ehr-setting-desc");
  const clueEl = document.getElementById("g12-clue-text");
  const hintEl = document.getElementById("g12-hint-text");

  if (avatarEl) avatarEl.textContent = scenario.avatar;
  if (titleEl) titleEl.textContent = `${scenario.patientName} (${scenario.patientAge}a) · ${scenario.title}`;
  if (settingEl) settingEl.textContent = scenario.setting;
  if (clueEl) clueEl.textContent = scenario.clue;
  if (hintEl) hintEl.textContent = scenario.hint;

  // Vitals
  const vitalsContainer = document.getElementById("g12-vitals-container");
  if (vitalsContainer) {
    vitalsContainer.innerHTML = "";
    scenario.vitals.forEach(v => {
      const pill = document.createElement("div");
      pill.className = `g12-vital-pill ${v.status}`;
      pill.innerHTML = `
        <span class="g12-vital-lbl">${v.label}</span>
        <span class="g12-vital-val">${v.val}</span>
      `;
      vitalsContainer.appendChild(pill);
    });
  }

  // Barajar cajitas
  g12PlacedCards = [null, null, null, null];
  g12AvailableCards = [...scenario.steps].sort(() => Math.random() - 0.5);

  renderG12Slots();
  renderG12Pool();
  updateG12ValidateButton();
}

function renderG12Slots() {
  const container = document.getElementById("g12-timeline-grid");
  if (!container) return;
  container.innerHTML = "";

  const slotLabels = [
    "Paso 1 · Prioridad Inmediata",
    "Paso 2 · Estabilización / Pre-requisito",
    "Paso 3 · Intervención Clave",
    "Paso 4 · Continuidad y Protección"
  ];

  for (let i = 0; i < 4; i++) {
    const slotEl = document.createElement("div");
    slotEl.className = `g12-slot ${g12PlacedCards[i] ? 'filled' : ''}`;
    slotEl.dataset.slotIdx = i;

    slotEl.innerHTML = `
      <span class="g12-slot-num">Paso 0${i + 1}</span>
      <span class="g12-slot-tag">${slotLabels[i]}</span>
    `;

    const cardId = g12PlacedCards[i];
    if (cardId) {
      const cardData = GAME12_SCENARIOS[g12CurrentScenarioIdx].steps.find(s => s.id === cardId);
      if (cardData) {
        const cardEl = createG12CardElement(cardData, true, i);
        slotEl.appendChild(cardEl);
      }
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "g12-slot-placeholder";
      placeholder.innerHTML = `
        <span>📥</span>
        <div>Casillero libre</div>
        <div style="font-size:10px; opacity:0.6;">Toca una acción abajo</div>
      `;
      slotEl.appendChild(placeholder);
    }

    slotEl.addEventListener("dragover", (e) => {
      e.preventDefault();
      slotEl.classList.add("drag-over");
    });

    slotEl.addEventListener("dragleave", () => {
      slotEl.classList.remove("drag-over");
    });

    slotEl.addEventListener("drop", (e) => {
      e.preventDefault();
      slotEl.classList.remove("drag-over");
      if (g12DraggedCardId) {
        placeG12CardInSlot(g12DraggedCardId, i);
      }
    });

    container.appendChild(slotEl);
  }
}

function renderG12Pool() {
  const poolGrid = document.getElementById("g12-pool-grid");
  if (!poolGrid) return;
  poolGrid.innerHTML = "";

  if (g12AvailableCards.length === 0) {
    poolGrid.innerHTML = `
      <div class="g12-pool-empty">
        <span>✨</span> ¡Todas las cajitas han sido ubicadas en la línea temporal! Pulsa <strong>Validar Secuencia</strong> para verificar.
      </div>
    `;
    return;
  }

  g12AvailableCards.forEach(cardData => {
    const cardEl = createG12CardElement(cardData, false, null);
    poolGrid.appendChild(cardEl);
  });
}

function createG12CardElement(cardData, isSlotted, slotIdx) {
  const card = document.createElement("div");
  card.className = "g12-card";
  card.draggable = true;
  card.dataset.cardId = cardData.id;

  card.innerHTML = `
    <div class="g12-card-head">
      <span class="g12-card-badge ${cardData.catClass}">${cardData.category}</span>
      ${isSlotted ? `<button class="g12-card-del" title="Devolver al banco" data-slot="${slotIdx}">✕</button>` : ''}
    </div>
    <div class="g12-card-title">${cardData.title}</div>
    <div class="g12-card-sub">${cardData.details}</div>
  `;

  card.addEventListener("dragstart", (e) => {
    g12DraggedCardId = cardData.id;
    card.classList.add("dragging");
    e.dataTransfer.setData("text/plain", cardData.id);
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    g12DraggedCardId = null;
  });

  if (!isSlotted) {
    card.addEventListener("click", () => {
      const firstFreeSlot = g12PlacedCards.findIndex(c => c === null);
      if (firstFreeSlot !== -1) {
        placeG12CardInSlot(cardData.id, firstFreeSlot);
      }
    });
  } else {
    const removeBtn = card.querySelector(".g12-card-del");
    if (removeBtn) {
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeG12CardFromSlot(slotIdx);
      });
    }
  }

  return card;
}

function placeG12CardInSlot(cardId, targetSlotIdx) {
  const existingInTarget = g12PlacedCards[targetSlotIdx];
  const previousSlotIdx = g12PlacedCards.indexOf(cardId);

  if (previousSlotIdx !== -1) {
    g12PlacedCards[previousSlotIdx] = existingInTarget;
  } else {
    g12AvailableCards = g12AvailableCards.filter(c => c.id !== cardId);
    if (existingInTarget) {
      const cardObj = GAME12_SCENARIOS[g12CurrentScenarioIdx].steps.find(s => s.id === existingInTarget);
      if (cardObj) g12AvailableCards.push(cardObj);
    }
  }

  g12PlacedCards[targetSlotIdx] = cardId;
  renderG12Slots();
  renderG12Pool();
  updateG12ValidateButton();
}

function removeG12CardFromSlot(slotIdx) {
  const cardId = g12PlacedCards[slotIdx];
  if (!cardId) return;

  g12PlacedCards[slotIdx] = null;
  const cardObj = GAME12_SCENARIOS[g12CurrentScenarioIdx].steps.find(s => s.id === cardId);
  if (cardObj) g12AvailableCards.push(cardObj);

  renderG12Slots();
  renderG12Pool();
  updateG12ValidateButton();
}

function updateG12ValidateButton() {
  const allFilled = g12PlacedCards.every(c => c !== null);
  const btn = document.getElementById("g12-btn-validate");
  if (btn) btn.disabled = !allFilled;
}

function resetG12Sequence() {
  const scenario = GAME12_SCENARIOS[g12CurrentScenarioIdx];
  g12PlacedCards = [null, null, null, null];
  g12AvailableCards = [...scenario.steps].sort(() => Math.random() - 0.5);
  renderG12Slots();
  renderG12Pool();
  updateG12ValidateButton();
}

function validateG12Sequence() {
  const scenario = GAME12_SCENARIOS[g12CurrentScenarioIdx];
  let isAllCorrect = true;
  let auditResults = [];

  g12PlacedCards.forEach((cardId, index) => {
    const cardObj = scenario.steps.find(s => s.id === cardId);
    const isStepCorrect = (cardObj.correctIndex === index);
    if (!isStepCorrect) isAllCorrect = false;

    auditResults.push({
      card: cardObj,
      userIndex: index,
      isCorrect: isStepCorrect
    });
  });

  const modal = document.getElementById("g12-audit-modal");
  const titleEl = document.getElementById("g12-modal-title");
  const auditList = document.getElementById("g12-audit-list");
  const guidelineEl = document.getElementById("g12-guideline-text");

  if (!modal || !titleEl || !auditList || !guidelineEl) return;
  auditList.innerHTML = "";

  if (isAllCorrect) {
    titleEl.className = "g12-modal-title success";
    titleEl.innerHTML = `<span>🎉</span> ¡Secuencia Protocolaria Impecable! (+250 XP)`;
    LabGamification.triggerConfetti();
    LabGamification.unlockBadge("protocol_sequencer_master");
    LabGamification.addXP(250, "¡Secuencia Crítica Perfecta!");
    playLabVictorySound();
  } else {
    titleEl.className = "g12-modal-title error";
    titleEl.innerHTML = `<span>⚠️</span> Desviación de Seguridad en la Secuencia`;
    LabGamification.resetStreak();
    playLabErrorSound();
  }

  auditResults.forEach(item => {
    const row = document.createElement("div");
    row.className = `g12-audit-item ${item.isCorrect ? 'correct' : 'inverted'}`;

    const icon = item.isCorrect ? "✅" : "❌";
    const positionLabel = `Paso 0${item.userIndex + 1}`;
    const shouldBeLabel = item.isCorrect ? "" : `(Debe ser Paso 0${item.card.correctIndex + 1})`;

    row.innerHTML = `
      <div class="g12-audit-num">${icon} ${positionLabel}</div>
      <div class="g12-audit-body">
        <div class="g12-audit-act">${item.card.title} <span style="font-size:10px; color:#f87171;">${shouldBeLabel}</span></div>
        <div class="g12-audit-rat">${item.card.rationale}</div>
        ${!item.isCorrect ? `<div class="g12-audit-warn">${item.card.inversionWarning}</div>` : ''}
      </div>
    `;
    auditList.appendChild(row);
  });

  guidelineEl.innerHTML = `<strong>Perla de Consenso:</strong> ${scenario.guideline}`;
  modal.style.display = "flex";
}

function setupG12EventListeners() {
  document.querySelectorAll(".g12-scenario-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const idx = parseInt(tab.dataset.idx);
      initG12Scenario(idx);
    });
  });

  const resetBtn = document.getElementById("g12-btn-reset");
  if (resetBtn) resetBtn.addEventListener("click", resetG12Sequence);

  const hintBtn = document.getElementById("g12-btn-hint");
  const hintBubble = document.getElementById("g12-hint-bubble");
  if (hintBtn && hintBubble) {
    hintBtn.addEventListener("click", () => {
      hintBubble.style.display = "block";
      setTimeout(() => {
        hintBubble.style.display = "none";
      }, 6000);
    });
  }

  const validateBtn = document.getElementById("g12-btn-validate");
  if (validateBtn) validateBtn.addEventListener("click", validateG12Sequence);

  const closeBtn = document.getElementById("g12-btn-modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("g12-audit-modal");
      if (modal) modal.style.display = "none";
    });
  }

  const retryBtn = document.getElementById("g12-btn-modal-retry");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      const modal = document.getElementById("g12-audit-modal");
      if (modal) modal.style.display = "none";
      resetG12Sequence();
    });
  }

  const nextBtn = document.getElementById("g12-btn-modal-next");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const modal = document.getElementById("g12-audit-modal");
      if (modal) modal.style.display = "none";
      const nextIdx = (g12CurrentScenarioIdx + 1) % GAME12_SCENARIOS.length;
      initG12Scenario(nextIdx);
    });
  }
}
