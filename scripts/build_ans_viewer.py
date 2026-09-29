#!/usr/bin/env python3
"""Build self-contained, offline-first interactive HTML viewer for the Costanzo ANS Graph with 100% Teaching + Assessment Units & 20-Game Blueprints."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GRAPH_JSON_PATH = ROOT / "graph" / "ans_costanzo_graph.json"
VIEWER_HTML_PATH = ROOT / "viewer" / "ans_graph_viewer.html"
EXPORT_HTML_PATH = ROOT / "exports" / "ans_graph_viewer.html"

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GrafoMed — Sistema Nervioso Autónomo (Costanzo Fisiología Cap. 2)</title>
  <style>
    :root {
      --bg-dark: #090d16;
      --panel-bg: rgba(15, 23, 42, 0.92);
      --card-bg: rgba(30, 41, 59, 0.7);
      --border: rgba(255, 255, 255, 0.1);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent-blue: #38bdf8;
      --accent-green: #34d399;
      --accent-purple: #a78bfa;
      --accent-amber: #fbbf24;
      --accent-red: #f87171;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg-dark);
      color: var(--text);
      overflow: hidden;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    /* Header */
    header {
      background: rgba(15, 23, 42, 0.98);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10;
    }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .logo-badge {
      background: linear-gradient(135deg, #8b5cf6, #0ea5e9);
      color: white;
      font-weight: 700;
      font-size: 13px;
      padding: 4px 10px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }
    h1 { font-size: 15px; font-weight: 600; color: #fff; }
    .header-sub { font-size: 11px; color: var(--text-muted); }
    .header-metrics {
      display: flex;
      gap: 12px;
      font-size: 11px;
      color: var(--text-muted);
    }
    .metric-badge {
      background: rgba(255, 255, 255, 0.05);
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid var(--border);
    }
    .metric-badge b { color: var(--accent-blue); }

    /* Main Container */
    #workspace {
      display: flex;
      flex: 1;
      position: relative;
      overflow: hidden;
    }

    /* Left Controls Sidebar */
    #sidebar-left {
      width: 280px;
      background: var(--panel-bg);
      backdrop-filter: blur(10px);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      padding: 14px;
      gap: 14px;
      z-index: 5;
      overflow-y: auto;
    }
    .search-box input {
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 12px;
      color: white;
      font-size: 12px;
      outline: none;
    }
    .search-box input:focus { border-color: var(--accent-blue); }
    .filter-group h3 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    .filter-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 6px;
      padding: 6px 10px;
      color: #cbd5e1;
      font-size: 12px;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 4px;
    }
    .filter-btn:hover { background: rgba(255, 255, 255, 0.05); }
    .filter-btn.active {
      background: rgba(56, 189, 248, 0.15);
      border-color: rgba(56, 189, 248, 0.3);
      color: #fff;
      font-weight: 500;
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }

    /* Center Canvas */
    #viewport {
      flex: 1;
      position: relative;
      background: radial-gradient(circle at 50% 50%, #111827 0%, #030712 100%);
      overflow: hidden;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
    }
    canvas:active { cursor: grabbing; }

    .viewport-tools {
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      gap: 8px;
      z-index: 5;
    }
    .tool-btn {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid var(--border);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      backdrop-filter: blur(8px);
      transition: background 0.15s;
    }
    .tool-btn:hover { background: rgba(30, 41, 59, 0.95); }

    /* Right Sidebar: Deep Inspector */
    #sidebar-right {
      width: 460px;
      background: var(--panel-bg);
      backdrop-filter: blur(14px);
      border-left: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      z-index: 5;
      overflow-y: auto;
      padding: 16px;
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--text-muted);
      text-align: center;
      gap: 12px;
      padding: 24px;
    }
    .empty-state svg { opacity: 0.4; }

    /* Node Header */
    .node-header {
      display: flex;
      flex-direction: column;
      gap: 6px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    .badge-row { display: flex; align-items: center; gap: 8px; }
    .badge {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .badge-decision { background: rgba(52, 211, 153, 0.2); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.4); }
    .badge-rule { background: rgba(251, 191, 36, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.4); }
    .badge-concept { background: rgba(167, 139, 250, 0.2); color: #a78bfa; border: 1px solid rgba(167, 139, 250, 0.4); }
    .badge-procedure { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
    .node-id { font-family: ui-monospace, monospace; font-size: 11px; color: var(--text-muted); }
    .node-title { font-size: 16px; font-weight: 700; color: #fff; line-height: 1.3; }

    /* Tabs */
    .tab-nav {
      display: flex;
      gap: 4px;
      background: rgba(0, 0, 0, 0.35);
      padding: 4px;
      border-radius: 8px;
      margin-bottom: 14px;
      border: 1px solid var(--border);
    }
    .tab-btn {
      flex: 1;
      padding: 8px 12px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .tab-btn:hover { color: #fff; }
    .tab-btn.active {
      background: rgba(255, 255, 255, 0.1);
      color: var(--accent-blue);
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }

    .tab-pane { display: none; flex-direction: column; gap: 12px; }
    .tab-pane.active { display: flex; }

    /* Card Panels */
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .card-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      font-weight: 700;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .card-decision {
      border-left: 3px solid var(--accent-green);
      background: rgba(16, 185, 129, 0.08);
    }
    .decision-text { font-size: 13px; font-weight: 500; color: #6ee7b7; line-height: 1.4; }
    .criteria-text { font-size: 12px; color: #fde68a; line-height: 1.4; }

    /* Teaching Unit Layout */
    .teaching-box { display: flex; flex-direction: column; gap: 10px; }
    .teaching-sec {
      background: rgba(0,0,0,0.25);
      border-radius: 6px;
      padding: 10px;
      font-size: 12px;
      line-height: 1.45;
      color: #e2e8f0;
    }
    .teaching-sec-label {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--accent-blue);
      margin-bottom: 4px;
      display: block;
    }
    .alert-pearl {
      background: rgba(56, 189, 248, 0.1);
      border-left: 3px solid var(--accent-blue);
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 12px;
      color: #bae6fd;
    }
    .alert-pitfall {
      background: rgba(248, 113, 113, 0.1);
      border-left: 3px solid var(--accent-red);
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 12px;
      color: #fecaca;
    }

    /* Quiz Layout */
    .quiz-prompt {
      font-size: 13px;
      line-height: 1.5;
      color: #f1f5f9;
      font-weight: 500;
    }
    .quiz-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .quiz-opt-btn {
      padding: 10px 12px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--border);
      border-radius: 6px;
      color: #e2e8f0;
      font-size: 12px;
      text-align: left;
      cursor: pointer;
      display: flex;
      gap: 8px;
      transition: all 0.2s;
      line-height: 1.4;
    }
    .quiz-opt-btn:hover { background: rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.4); }
    .quiz-opt-btn.correct {
      background: rgba(52, 211, 153, 0.2) !important;
      border-color: #34d399 !important;
      color: #6ee7b7 !important;
      font-weight: 600;
    }
    .quiz-opt-btn.incorrect {
      background: rgba(248, 113, 113, 0.2) !important;
      border-color: #f87171 !important;
      color: #fca5a5 !important;
    }
    .quiz-feedback {
      border-radius: 6px;
      padding: 12px;
      font-size: 12px;
      line-height: 1.45;
      display: none;
      flex-direction: column;
      gap: 6px;
    }
    .quiz-feedback.show-correct {
      display: flex;
      background: rgba(52, 211, 153, 0.1);
      border: 1px solid rgba(52, 211, 153, 0.4);
      color: #a7f3d0;
    }
    .quiz-feedback.show-incorrect {
      display: flex;
      background: rgba(248, 113, 113, 0.1);
      border: 1px solid rgba(248, 113, 113, 0.4);
      color: #fecaca;
    }
    .quiz-reset-btn {
      margin-top: 6px;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border);
      border-radius: 4px;
      color: white;
      font-size: 11px;
      cursor: pointer;
      align-self: flex-start;
    }
    .quiz-reset-btn:hover { background: rgba(255, 255, 255, 0.15); }

    .rel-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .rel-tag {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      color: #cbd5e1;
      cursor: pointer;
      transition: background 0.2s;
    }
    .rel-tag:hover { background: rgba(56, 189, 248, 0.2); border-color: var(--accent-blue); color: #fff; }
    .source-lock-tag {
      font-size: 11px;
      color: #94a3b8;
      font-family: ui-monospace, monospace;
      background: rgba(0,0,0,0.4);
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.05);
    }
  </style>
</head>
<body>
  <header>
    <div class="header-left">
      <div class="logo-badge">GRAFOMED STUDIO</div>
      <div>
        <h1 id="header-title">Sistema Nervioso Autónomo: Organización, Receptores e Integración</h1>
        <div class="header-sub">Costanzo Physiology, 6th Edition, Chapter 2 (Linda S. Costanzo, PhD)</div>
      </div>
    </div>
    <div class="header-metrics">
      <div class="metric-badge">Clusters: <b id="m-clusters">5</b></div>
      <div class="metric-badge">Nodos: <b id="m-nodes">18</b></div>
      <div class="metric-badge">Teachings: <b style="color:var(--accent-green)">18 (100%)</b></div>
      <div class="metric-badge">Assessments: <b style="color:var(--accent-amber)">18 (100%)</b></div>
      <div class="metric-badge">Aristas: <b id="m-edges">23</b></div>
    </div>
  </header>

  <div id="workspace">
    <!-- Left Sidebar: Filters -->
    <div id="sidebar-left">
      <div class="search-box">
        <input type="text" id="search-input" placeholder="Buscar receptor, ganglio, fármaco...">
      </div>

      <div class="filter-group">
        <h3>Tipo de Nodo</h3>
        <button class="filter-btn active" data-type="all">
          <span class="dot" style="background:#cbd5e1"></span> Todos (18)
        </button>
        <button class="filter-btn" data-type="concept">
          <span class="dot" style="background:var(--accent-purple)"></span> Conceptos y Vías (11)
        </button>
        <button class="filter-btn" data-type="decision">
          <span class="dot" style="background:var(--accent-green)"></span> Decisiones Clínicas (6)
        </button>
        <button class="filter-btn" data-type="rule">
          <span class="dot" style="background:var(--accent-amber)"></span> Reglas Farmacológicas (1)
        </button>
      </div>

      <div class="filter-group" id="cluster-filter-group">
        <h3>Clusters Fisiológicos</h3>
        <!-- Dynamic clusters populated from JSON -->
      </div>
    </div>

    <!-- Center Canvas -->
    <div id="viewport">
      <canvas id="graph-canvas"></canvas>
      <div class="viewport-tools">
        <button class="tool-btn" id="btn-zoom-in">＋</button>
        <button class="tool-btn" id="btn-zoom-out">－</button>
        <button class="tool-btn" id="btn-reset">Reset Vista</button>
      </div>
    </div>

    <!-- Right Sidebar: Deep Inspector -->
    <div id="sidebar-right">
      <div id="empty-inspector" class="empty-state">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke-width="1.5" stroke-dasharray="3 3"/>
          <path d="M12 8v4m0 4h.01" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p><b>100% Cobertura Pedagógica Activa</b></p>
        <p>Selecciona cualquier nodo para auditar su <b>Teaching Unit</b> y resolver su <b>Assessment Unit</b> interactiva con blueprint de juegos.</p>
      </div>

      <div id="active-inspector" style="display:none; flex-direction:column; gap:12px;">
        <div class="node-header">
          <div class="badge-row">
            <span id="insp-badge" class="badge">CONCEPTO</span>
            <span id="insp-id" class="node-id">CON-ANS-01</span>
          </div>
          <div id="insp-title" class="node-title">Título del Nodo</div>
          <div id="insp-cluster" style="font-size:11px; color:var(--text-muted);">Cluster</div>
        </div>

        <!-- Tab Navigation -->
        <div class="tab-nav">
          <button class="tab-btn active" id="tab-btn-teach">
            <span>🧠</span> Lección / Teaching Unit
          </button>
          <button class="tab-btn" id="tab-btn-quiz">
            <span>📝</span> Evaluación Interactiva
          </button>
        </div>

        <!-- TAB 1: TEACHING PANE -->
        <div id="pane-teach" class="tab-pane active">
          <!-- Decision Box -->
          <div id="box-decision" class="card card-decision">
            <div class="card-title">🎯 Decisión Clínica Observable</div>
            <div id="insp-decision" class="decision-text">Acción clínica a ejecutar...</div>
          </div>

          <!-- Rule Criteria Box -->
          <div id="box-criteria" class="card" style="display:none;">
            <div class="card-title">📏 Criterio Operativo / Umbral Farmacológico</div>
            <div id="insp-criteria" class="criteria-text">Criterios...</div>
          </div>

          <!-- Teaching Unit Content -->
          <div id="box-teaching" class="card">
            <div class="card-title">📖 Fundamento Fisiológico y Caso</div>
            <div class="teaching-box">
              <div class="teaching-sec">
                <span class="teaching-sec-label">Mecanismo Fisiopatológico</span>
                <p id="insp-teach-body">Cuerpo teórico...</p>
              </div>
              <div class="teaching-sec">
                <span class="teaching-sec-label">Caso Clínico Ilustrativo</span>
                <p id="insp-teach-example">Caso...</p>
              </div>
              <div class="teaching-sec">
                <span class="teaching-sec-label">Boundary (Límites y Cuándo Falla)</span>
                <p id="insp-teach-boundary">Límites...</p>
              </div>
              <div id="insp-alert-pearl" class="alert-pearl">
                <b>💎 Perla Clínica:</b> <span id="insp-teach-pearl"></span>
              </div>
              <div id="insp-alert-pitfall" class="alert-pitfall">
                <b>🛑 Trampa Frecuente:</b> <span id="insp-teach-pitfall"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: ASSESSMENT PANE -->
        <div id="pane-quiz" class="tab-pane">
          <!-- BLUEPRINT DE JUEGOS RECOMENDADOS -->
          <div class="card" style="border-color: rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.05);">
            <div class="card-title" style="color:var(--accent-blue);">
              <span>🎮</span> Blueprint de Juegos de Evaluación Recomendados
            </div>
            <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px;">
              Juegos seleccionados de la suite de 20 para evaluar este nodo en <code>games-lab</code>:
            </div>
            <div id="quiz-games-container" style="display:flex; flex-direction:column; gap:8px;">
              <!-- Dynamic Games List -->
            </div>
          </div>

          <!-- VIÑETA CLÍNICA DE PRUEBA -->
          <div class="card" style="border-color: rgba(251, 191, 36, 0.4); background: rgba(251, 191, 36, 0.04);">
            <div class="card-title" style="color:var(--accent-amber);">
              <span>🎯</span> Viñeta de Evaluación Clínica Rápida
              <span id="quiz-difficulty" style="margin-left:auto; font-size:10px; padding:2px 6px; border-radius:4px; background:rgba(255,255,255,0.1);">INTERMEDIO</span>
            </div>
            <div id="quiz-prompt" class="quiz-prompt">Cargando caso...</div>
          </div>

          <div class="quiz-options" id="quiz-options-container">
            <!-- Dynamic Options -->
          </div>

          <div id="quiz-feedback-box" class="quiz-feedback">
            <div id="quiz-feedback-title" style="font-weight:700; font-size:13px;"></div>
            <div id="quiz-feedback-body" style="font-size:12px;"></div>
            <button class="quiz-reset-btn" id="quiz-reset-btn">🔄 Reiniciar Pregunta</button>
          </div>
        </div>

        <!-- Shared Relations Box -->
        <div class="card">
          <div class="card-title">🔗 Conexiones Topológicas</div>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px;">Prerrequisitos Entrantes (Requires / Supports):</div>
          <div id="insp-incoming" class="rel-list">Ninguno</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:8px; margin-bottom:4px;">Desbloquea (Unlocks):</div>
          <div id="insp-outgoing" class="rel-list">Ninguno</div>
        </div>

        <!-- Source Lock Box -->
        <div class="card">
          <div class="card-title">🔒 Source-Lock Provenance</div>
          <div id="insp-source-lock" class="source-lock-tag">Costanzo Physiology, 6th Ed., Chapter 2</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const GRAPH_DATA = __GRAPH_JSON_PLACEHOLDER__;

    // Fast lookups
    const nodeMap = new Map(GRAPH_DATA.nodes.map(n => [n.id, n]));
    const teachMap = new Map(GRAPH_DATA.teaching_units.map(u => [u.target_id, u]));
    const quizMap = new Map(GRAPH_DATA.assessment_units.map(q => [q.target_id, q]));
    const clusterMap = new Map(GRAPH_DATA.clusters.map(c => [c.id, c]));

    // Header metrics setup
    document.getElementById("m-clusters").textContent = GRAPH_DATA.clusters.length;
    document.getElementById("m-nodes").textContent = GRAPH_DATA.nodes.length;
    document.getElementById("m-edges").textContent = GRAPH_DATA.edges.length;

    // Populate Cluster Filter Buttons
    const clusterContainer = document.getElementById("cluster-filter-group");
    GRAPH_DATA.clusters.forEach(c => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.dataset.cluster = c.id;
      btn.innerHTML = `<span class="dot" style="background:${c.color || '#38bdf8'}"></span> ${c.title}`;
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-cluster]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCluster = c.id;
        render();
      });
      clusterContainer.appendChild(btn);
    });

    // Color definitions
    const TYPE_COLORS = {
      decision: "#34d399",
      rule: "#fbbf24",
      concept: "#a78bfa",
      procedure: "#38bdf8"
    };

    // Canvas setup
    const canvas = document.getElementById("graph-canvas");
    const ctx = canvas.getContext("2d");
    let width, height;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }
    window.addEventListener("resize", () => { resize(); render(); });
    resize();

    // Simulation nodes & edges
    const simNodes = GRAPH_DATA.nodes.map((n, i) => {
      const angle = (i / GRAPH_DATA.nodes.length) * 2 * Math.PI;
      const radius = 230 + (i % 3) * 60;
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        radius: n.type === 'decision' ? 14 : 10
      };
    });
    const simNodeMap = new Map(simNodes.map(n => [n.id, n]));

    const simEdges = GRAPH_DATA.edges.map(e => ({
      source: simNodeMap.get(e.source),
      target: simNodeMap.get(e.target),
      kind: e.kind
    })).filter(e => e.source && e.target);

    // Camera transform
    let camera = { x: 0, y: 0, zoom: 0.85 };
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let draggedNode = null;
    let selectedNode = null;
    let hoveredNode = null;

    let selectedType = "all";
    let selectedCluster = "all";
    let searchQuery = "";

    // Force simulation step
    function stepSimulation() {
      const k = 0.05;
      const repulse = 1300;

      for (let i = 0; i < simNodes.length; i++) {
        for (let j = i + 1; j < simNodes.length; j++) {
          const a = simNodes[i];
          const b = simNodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 360) {
            const force = repulse / (dist * dist);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            a.vx -= fx;
            a.vy -= fy;
            b.vx += fx;
            b.vy += fy;
          }
        }
      }

      simEdges.forEach(e => {
        const dx = e.target.x - e.source.x;
        const dy = e.target.y - e.source.y;
        const dist = Math.hypot(dx, dy) || 1;
        const targetDist = 140;
        const force = (dist - targetDist) * 0.04;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        e.source.vx += fx;
        e.source.vy += fy;
        e.target.vx -= fx;
        e.target.vy -= fy;
      });

      const cx = width / 2;
      const cy = height / 2;
      simNodes.forEach(n => {
        if (n === draggedNode) return;
        n.vx += (cx - n.x) * 0.003;
        n.vy += (cy - n.y) * 0.003;

        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
      });
    }

    let animCount = 0;
    function render() {
      if (animCount < 180) {
        stepSimulation();
        animCount++;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // Camera transformation
      ctx.translate(width / 2 + camera.x, height / 2 + camera.y);
      ctx.scale(camera.zoom, camera.zoom);
      ctx.translate(-width / 2, -height / 2);

      // Draw Edges
      simEdges.forEach(e => {
        const isConnected = selectedNode && (selectedNode.id === e.source.id || selectedNode.id === e.target.id);
        const matchesFilter = passesFilter(e.source) && passesFilter(e.target);

        ctx.beginPath();
        ctx.moveTo(e.source.x, e.source.y);
        ctx.lineTo(e.target.x, e.target.y);

        if (isConnected) {
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = 1.0;
        } else if (matchesFilter) {
          ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = 0.6;
        } else {
          ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 0.2;
        }
        ctx.stroke();

        // Draw directional arrow
        if (matchesFilter || isConnected) {
          const angle = Math.atan2(e.target.y - e.source.y, e.target.x - e.source.x);
          const headlen = isConnected ? 8 : 6;
          const arrowX = e.target.x - Math.cos(angle) * (e.target.radius + 6);
          const arrowY = e.target.y - Math.sin(angle) * (e.target.radius + 6);

          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(arrowX - headlen * Math.cos(angle - Math.PI / 6), arrowY - headlen * Math.sin(angle - Math.PI / 6));
          ctx.lineTo(arrowX - headlen * Math.cos(angle + Math.PI / 6), arrowY - headlen * Math.sin(angle + Math.PI / 6));
          ctx.closePath();
          ctx.fillStyle = isConnected ? "#38bdf8" : "rgba(148, 163, 184, 0.5)";
          ctx.fill();
        }
      });

      // Draw Nodes
      simNodes.forEach(n => {
        const isSelected = selectedNode && selectedNode.id === n.id;
        const isHovered = hoveredNode && hoveredNode.id === n.id;
        const visible = passesFilter(n);

        ctx.globalAlpha = visible ? 1.0 : 0.18;

        // Cluster outer aura
        const cluster = clusterMap.get(n.cluster_id);
        const clusterColor = (cluster && cluster.color) || "#38bdf8";

        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? "rgba(56, 189, 248, 0.25)" : "rgba(255, 255, 255, 0.15)";
          ctx.fill();
        }

        // Main Node Body
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = TYPE_COLORS[n.type] || "#94a3b8";
        ctx.fill();

        // Border
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.strokeStyle = isSelected ? "#ffffff" : clusterColor;
        ctx.stroke();

        // Label
        if (visible && (isSelected || isHovered || camera.zoom > 0.75)) {
          ctx.font = `${isSelected ? 'bold 11px' : '10px'} -apple-system, sans-serif`;
          ctx.fillStyle = isSelected ? "#ffffff" : "#cbd5e1";
          ctx.textAlign = "center";
          ctx.fillText(n.title.length > 24 ? n.title.slice(0, 22) + "…" : n.title, n.x, n.y + n.radius + 14);
        }
      });

      ctx.restore();
      if (animCount < 180) requestAnimationFrame(render);
    }

    function passesFilter(n) {
      if (selectedType !== "all" && n.type !== selectedType) return false;
      if (selectedCluster !== "all" && n.cluster_id !== selectedCluster) return false;
      if (searchQuery) {
        const haystack = `${n.id} ${n.title} ${n.summary} ${n.decision_prompt || ''}`.toLowerCase();
        if (!haystack.includes(searchQuery)) return false;
      }
      return true;
    }

    // Interaction handling
    function screenToWorld(sx, sy) {
      const rect = canvas.getBoundingClientRect();
      const x = (sx - rect.left - width / 2 - camera.x) / camera.zoom + width / 2;
      const y = (sy - rect.top - height / 2 - camera.y) / camera.zoom + height / 2;
      return { x, y };
    }

    function findNodeAt(sx, sy) {
      const pos = screenToWorld(sx, sy);
      return simNodes.slice().reverse().find(n => {
        if (!passesFilter(n)) return false;
        return Math.hypot(n.x - pos.x, n.y - pos.y) <= n.radius + 4;
      });
    }

    canvas.addEventListener("mousedown", e => {
      const hit = findNodeAt(e.clientX, e.clientY);
      if (hit) {
        draggedNode = hit;
        selectNode(hit);
      } else {
        isDragging = true;
        dragStart = { x: e.clientX - camera.x, y: e.clientY - camera.y };
      }
    });

    window.addEventListener("mousemove", e => {
      if (draggedNode) {
        const pos = screenToWorld(e.clientX, e.clientY);
        draggedNode.x = pos.x;
        draggedNode.y = pos.y;
        draggedNode.vx = 0;
        draggedNode.vy = 0;
        render();
      } else if (isDragging) {
        camera.x = e.clientX - dragStart.x;
        camera.y = e.clientY - dragStart.y;
        render();
      } else {
        const hit = findNodeAt(e.clientX, e.clientY);
        if (hit !== hoveredNode) {
          hoveredNode = hit;
          render();
        }
      }
    });

    window.addEventListener("mouseup", () => {
      draggedNode = null;
      isDragging = false;
    });

    canvas.addEventListener("wheel", e => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      camera.zoom = Math.max(0.2, Math.min(3.0, camera.zoom * factor));
      render();
    });

    // Tab Navigation logic
    const tabBtnTeach = document.getElementById("tab-btn-teach");
    const tabBtnQuiz = document.getElementById("tab-btn-quiz");
    const paneTeach = document.getElementById("pane-teach");
    const paneQuiz = document.getElementById("pane-quiz");

    tabBtnTeach.addEventListener("click", () => {
      tabBtnTeach.classList.add("active");
      tabBtnQuiz.classList.remove("active");
      paneTeach.classList.add("active");
      paneQuiz.classList.remove("active");
    });

    tabBtnQuiz.addEventListener("click", () => {
      tabBtnQuiz.classList.add("active");
      tabBtnTeach.classList.remove("active");
      paneQuiz.classList.add("active");
      paneTeach.classList.remove("active");
    });

    // Inspector Selection
    function selectNode(n) {
      selectedNode = n;
      const emptyInsp = document.getElementById("empty-inspector");
      const activeInsp = document.getElementById("active-inspector");

      if (!n) {
        emptyInsp.style.display = "flex";
        activeInsp.style.display = "none";
        render();
        return;
      }

      emptyInsp.style.display = "none";
      activeInsp.style.display = "flex";

      // Header
      const badge = document.getElementById("insp-badge");
      badge.textContent = n.type.toUpperCase();
      badge.className = `badge badge-${n.type}`;
      document.getElementById("insp-id").textContent = n.id;
      document.getElementById("insp-title").textContent = n.title;

      const cluster = clusterMap.get(n.cluster_id);
      document.getElementById("insp-cluster").textContent = cluster ? `Cluster: ${cluster.title}` : "";

      // Decision Box
      const boxDec = document.getElementById("box-decision");
      if (n.decision_prompt) {
        boxDec.style.display = "flex";
        document.getElementById("insp-decision").textContent = n.decision_prompt;
      } else {
        boxDec.style.display = "none";
      }

      // Rule Criteria Box
      const boxCrit = document.getElementById("box-criteria");
      if (n.criteria) {
        boxCrit.style.display = "flex";
        document.getElementById("insp-criteria").textContent = n.criteria;
      } else {
        boxCrit.style.display = "none";
      }

      // Teaching Unit Box
      const unit = teachMap.get(n.id);
      if (unit) {
        document.getElementById("insp-teach-body").textContent = unit.body || "Sin teoría registrada.";
        document.getElementById("insp-teach-example").textContent = unit.example || "Sin caso registrado.";
        document.getElementById("insp-teach-boundary").textContent = unit.boundary || "Sin límites registrados.";
        document.getElementById("insp-teach-pearl").textContent = unit.pearl || "";
        document.getElementById("insp-teach-pitfall").textContent = unit.pitfall || "";
        document.getElementById("insp-source-lock").textContent = unit.source_lock || "Costanzo Physiology, Chapter 2";
      }

      // Setup Assessment Quiz Unit
      setupQuiz(n.id);

      // Incoming & Outgoing Relations
      const incoming = GRAPH_DATA.edges.filter(e => e.target === n.id);
      const outgoing = GRAPH_DATA.edges.filter(e => e.source === n.id);

      const inContainer = document.getElementById("insp-incoming");
      inContainer.innerHTML = incoming.length ? "" : "<span style='color:#64748b'>Ninguno</span>";
      incoming.forEach(e => {
        const btn = document.createElement("button");
        btn.className = "rel-tag";
        btn.textContent = `← ${e.source} (${e.kind})`;
        btn.addEventListener("click", () => {
          const targetNode = simNodeMap.get(e.source);
          if (targetNode) selectNode(targetNode);
        });
        inContainer.appendChild(btn);
      });

      const outContainer = document.getElementById("insp-outgoing");
      outContainer.innerHTML = outgoing.length ? "" : "<span style='color:#64748b'>Ninguno</span>";
      outgoing.forEach(e => {
        const btn = document.createElement("button");
        btn.className = "rel-tag";
        btn.textContent = `→ ${e.target} (${e.kind})`;
        btn.addEventListener("click", () => {
          const targetNode = simNodeMap.get(e.target);
          if (targetNode) selectNode(targetNode);
        });
        outContainer.appendChild(btn);
      });

      render();
    }

    function setupQuiz(nodeId) {
      const nodeObj = nodeMap.get(nodeId);
      const q = quizMap.get(nodeId);
      const promptEl = document.getElementById("quiz-prompt");
      const diffEl = document.getElementById("quiz-difficulty");
      const optionsContainer = document.getElementById("quiz-options-container");
      const feedbackBox = document.getElementById("quiz-feedback-box");
      const feedbackTitle = document.getElementById("quiz-feedback-title");
      const feedbackBody = document.getElementById("quiz-feedback-body");

      // 1. Populate Recommended Games Roadmap
      const gamesContainer = document.getElementById("quiz-games-container");
      gamesContainer.innerHTML = "";
      const recs = (nodeObj && nodeObj.assessment_recommendations) || [];
      if (recs.length === 0) {
        gamesContainer.innerHTML = "<span style='font-size:11px; color:#64748b;'>No hay juegos especificados para este nodo.</span>";
      } else {
        recs.forEach(g => {
          const gameCard = document.createElement("div");
          gameCard.style.cssText = "background:rgba(15,23,42,0.7); border:1px solid var(--border); border-radius:6px; padding:10px; display:flex; flex-direction:column; gap:4px;";
          const isAlta = g.suitability === "alta";
          gameCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:12px; color:#38bdf8;">${g.game_id ? g.game_id.toUpperCase() + ' · ' : ''}${g.game_name}</span>
              <span style="font-size:9px; text-transform:uppercase; font-weight:700; padding:2px 6px; border-radius:4px; ${isAlta ? 'background:rgba(52,211,153,0.2); color:#34d399; border:1px solid rgba(52,211,153,0.4);' : 'background:rgba(56,189,248,0.2); color:#38bdf8; border:1px solid rgba(56,189,248,0.4);'}">${isAlta ? 'Prioridad Alta' : 'Prioridad Media'}</span>
            </div>
            <div style="font-size:11px; color:#cbd5e1; line-height:1.4;">
              <b style="color:#94a3b8;">Misión del Juego:</b> ${g.clinical_mission}
            </div>
          `;
          gamesContainer.appendChild(gameCard);
        });
      }

      // 2. Populate Interactive Quick Quiz
      if (!q) {
        promptEl.textContent = "No hay viñeta de evaluación configurada para este nodo.";
        diffEl.textContent = "N/A";
        optionsContainer.innerHTML = "";
        feedbackBox.style.display = "none";
        return;
      }

      promptEl.textContent = q.prompt;
      diffEl.textContent = (q.difficulty || "INTERMEDIO").toUpperCase();
      optionsContainer.innerHTML = "";
      feedbackBox.className = "quiz-feedback";
      feedbackBox.style.display = "none";

      q.options.forEach(opt => {
        const optBtn = document.createElement("button");
        optBtn.className = "quiz-opt-btn";
        optBtn.innerHTML = `<span style="font-weight:700; color:var(--accent-blue);">${opt.id})</span> <span>${opt.text}</span>`;
        
        optBtn.addEventListener("click", () => {
          // Disable options
          optionsContainer.querySelectorAll(".quiz-opt-btn").forEach(btn => {
            btn.style.pointerEvents = "none";
            if (btn.dataset.optId === q.correct_option) {
              btn.classList.add("correct");
            } else if (btn === optBtn && opt.id !== q.correct_option) {
              btn.classList.add("incorrect");
            }
          });

          // Show feedback
          feedbackBox.style.display = "flex";
          if (opt.id === q.correct_option) {
            feedbackBox.className = "quiz-feedback show-correct";
            feedbackTitle.textContent = "✓ ¡CORRECTO!";
            feedbackBody.textContent = q.explanation;
          } else {
            feedbackBox.className = "quiz-feedback show-incorrect";
            feedbackTitle.textContent = "RESPUESTA INCORRECTA";
            feedbackBody.textContent = q.explanation;
          }
        });

        optBtn.dataset.optId = opt.id;
        optionsContainer.appendChild(optBtn);
      });

      document.getElementById("quiz-reset-btn").onclick = () => setupQuiz(nodeId);
    }

    // Tools
    document.getElementById("btn-zoom-in").addEventListener("click", () => { camera.zoom *= 1.2; render(); });
    document.getElementById("btn-zoom-out").addEventListener("click", () => { camera.zoom *= 0.8; render(); });
    document.getElementById("btn-reset").addEventListener("click", () => {
      camera = { x: 0, y: 0, zoom: 0.85 };
      animCount = 0;
      render();
    });

    // Filters
    document.querySelectorAll("[data-type]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-type]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedType = btn.dataset.type;
        render();
      });
    });

    document.getElementById("search-input").addEventListener("input", e => {
      searchQuery = e.target.value.toLowerCase().trim();
      render();
    });

    // Initial render
    render();
  </script>
</body>
</html>
"""


def main():
    graph_data = json.loads(GRAPH_JSON_PATH.read_text(encoding="utf-8"))
    
    html_content = HTML_TEMPLATE.replace("__GRAPH_JSON_PLACEHOLDER__", json.dumps(graph_data, ensure_ascii=False))
    
    VIEWER_HTML_PATH.parent.mkdir(parents=True, exist_ok=True)
    VIEWER_HTML_PATH.write_text(html_content, encoding="utf-8")
    
    EXPORT_HTML_PATH.parent.mkdir(parents=True, exist_ok=True)
    EXPORT_HTML_PATH.write_text(html_content, encoding="utf-8")
    
    print(f"✓ Viewer successfully generated at:\n  - {VIEWER_HTML_PATH}\n  - {EXPORT_HTML_PATH}")


if __name__ == "__main__":
    main()
