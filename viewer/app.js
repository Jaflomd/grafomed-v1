(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const rawData = window.GRAFOMED_VIEWER_DATA || {
    schema_version: "0.1",
    meta: {
      snapshot_id: "missing-data",
      snapshot_label: "Missing viewer data",
      generated_at: new Date().toISOString(),
      graph_version: "unknown",
      data_mode: "empty",
      demo: false,
      canonical: false,
      default_focus: null,
      notice: "viewer-data.js did not load.",
    },
    nodes: [],
    edges: [],
    routes: [],
    warnings: ["viewer-data.js did not load."],
  };

  const I18N = {
    en: {
      modeGraph: "Nodes",
      modeRoute: "Route",
      modeInspector: "Inspector",
      openSnapshot: "Open snapshot",
      search: "Search",
      scope: "Scope",
      reset: "Reset",
      layer: "Layer",
      objectType: "Object type",
      lifecycle: "Lifecycle",
      relationFamily: "Relation family",
      candidateOverlay: "Candidate overlay",
      candidateHint: "Dashed, never canonical",
      neighborhood: "Neighborhood",
      depth: "Depth",
      visibleBudget: "Visible budget",
      focusSelection: "Focus selection",
      globalMap: "All nodes",
      allNodes: "All nodes",
      focalNodes: "Focused nodes",
      visualGrammar: "Visual grammar",
      candidate: "Candidate",
      typedRelation: "Typed relation",
      focalView: "NODE MAP",
      exportSvg: "Export SVG",
      exportPng: "Export PNG",
      orbitHint: "Drag to rotate · scroll to zoom · click a node",
      emptyGraph: "No graph objects yet",
      emptyGraphHint: "Build or import a snapshot to begin exploring.",
      explainableRoute: "EXPLAINABLE ROUTE",
      routeTimeline: "Learning route timeline",
      evidenceView: "EVIDENCE VIEW",
      focusedInspector: "Focused inspector",
      selection: "SELECTION",
      prepareProposal: "Prepare proposal",
      copyId: "Copy ID",
      exportSnapshot: "Export snapshot",
      readOnly: "Dataset: read-only",
      candidateOnly: "CANDIDATE ONLY",
      proposalTitle: "Prepare graph proposal",
      proposalNote: "This creates a downloadable proposal. It cannot modify or promote canonical graph data.",
      proposalAction: "Action",
      targetObject: "Target object",
      requestedChange: "Requested change",
      evidenceRefs: "Evidence or source references",
      cancel: "Cancel",
      copyJson: "Copy JSON",
      downloadProposal: "Download proposal",
      allLayers: "All layers",
      allTypes: "All types",
      allStates: "All states",
      allFamilies: "All families",
      nodes: "nodes",
      relations: "relations",
      routes: "routes",
      noFocus: "No focus",
      noSelection: "Select an object",
      noSelectionHint: "Click a node or route step to inspect its identity, evidence, tags, reviews, and relations.",
      snapshot: "Snapshot",
      demo: "DEMO",
      imported: "IMPORTED",
      canonical: "CANONICAL",
      candidateProjection: "CANDIDATE PROJECTION",
      objectIdentity: "Object identity",
      evidenceReview: "Evidence and review",
      learningContract: "Learning contract",
      objective: "Objective",
      expectedPerformance: "Expected performance",
      masteryEvidence: "Mastery evidence",
      evidence: "Evidence",
      validation: "Validation",
      review: "Review",
      record: "Record",
      tags: "Tags",
      competencies: "Competencies",
      sources: "Sources",
      connectedRelations: "Connected relations",
      details: "Details",
      warnings: "Warnings",
      noRoutes: "No routes are available in this snapshot.",
      noDetails: "No additional details recorded.",
      noSources: "No source references recorded.",
      noRelations: "No visible relations for this object.",
      snapshotLoaded: "Snapshot loaded in this browser session only.",
      invalidSnapshot: "The selected file is not a valid Grafo Med viewer snapshot.",
      copied: "Copied to clipboard.",
      downloadReady: "Candidate proposal downloaded. Canonical data was not changed.",
      graphExported: "Visible 3D graph exported as PNG.",
      focused: "Focused neighborhood updated.",
      overviewActive: "All individual nodes in this snapshot are visible.",
      graphReady: "Local read-only projection ready",
      resultLimit: "Showing the first matching objects",
    },
    es: {
      modeGraph: "Nodos",
      modeRoute: "Ruta",
      modeInspector: "Inspector",
      openSnapshot: "Abrir snapshot",
      search: "Buscar",
      scope: "Alcance",
      reset: "Reiniciar",
      layer: "Capa",
      objectType: "Tipo de objeto",
      lifecycle: "Ciclo de vida",
      relationFamily: "Familia de relación",
      candidateOverlay: "Capa de candidatos",
      candidateHint: "Punteados, nunca canónicos",
      neighborhood: "Vecindario",
      depth: "Profundidad",
      visibleBudget: "Límite visible",
      focusSelection: "Enfocar selección",
      globalMap: "Todos los nodos",
      allNodes: "Todos los nodos",
      focalNodes: "Nodos enfocados",
      visualGrammar: "Gramática visual",
      candidate: "Candidato",
      typedRelation: "Relación tipada",
      focalView: "MAPA DE NODOS",
      exportSvg: "Exportar SVG",
      exportPng: "Exportar PNG",
      orbitHint: "Arrastra para rotar · usa la rueda para acercar · haz clic en un nodo",
      emptyGraph: "Aún no existen objetos",
      emptyGraphHint: "Construye o importa un snapshot para comenzar.",
      explainableRoute: "RUTA EXPLICABLE",
      routeTimeline: "Secuencia de aprendizaje",
      evidenceView: "VISTA DE EVIDENCIA",
      focusedInspector: "Inspector enfocado",
      selection: "SELECCIÓN",
      prepareProposal: "Preparar propuesta",
      copyId: "Copiar ID",
      exportSnapshot: "Exportar snapshot",
      readOnly: "Dataset: solo lectura",
      candidateOnly: "SOLO CANDIDATO",
      proposalTitle: "Preparar propuesta para el grafo",
      proposalNote: "Esto crea una propuesta descargable. No puede modificar ni promover datos canónicos.",
      proposalAction: "Acción",
      targetObject: "Objeto objetivo",
      requestedChange: "Cambio solicitado",
      evidenceRefs: "Evidencia o fuentes",
      cancel: "Cancelar",
      copyJson: "Copiar JSON",
      downloadProposal: "Descargar propuesta",
      allLayers: "Todas las capas",
      allTypes: "Todos los tipos",
      allStates: "Todos los estados",
      allFamilies: "Todas las familias",
      nodes: "nodos",
      relations: "relaciones",
      routes: "rutas",
      noFocus: "Sin foco",
      noSelection: "Selecciona un objeto",
      noSelectionHint: "Haz clic en un nodo o paso para inspeccionar identidad, evidencia, tags, revisiones y relaciones.",
      snapshot: "Snapshot",
      demo: "DEMO",
      imported: "IMPORTADO",
      canonical: "CANÓNICO",
      candidateProjection: "PROYECCIÓN CANDIDATA",
      objectIdentity: "Identidad del objeto",
      evidenceReview: "Evidencia y revisión",
      learningContract: "Contrato de aprendizaje",
      objective: "Objetivo",
      expectedPerformance: "Desempeño esperado",
      masteryEvidence: "Evidencia de dominio",
      evidence: "Evidencia",
      validation: "Validación",
      review: "Revisión",
      record: "Registro",
      tags: "Tags",
      competencies: "Competencias",
      sources: "Fuentes",
      connectedRelations: "Relaciones conectadas",
      details: "Detalles",
      warnings: "Advertencias",
      noRoutes: "Este snapshot no contiene rutas.",
      noDetails: "No se registraron detalles adicionales.",
      noSources: "No se registraron fuentes.",
      noRelations: "No existen relaciones visibles para este objeto.",
      snapshotLoaded: "Snapshot cargado solo en esta sesión del navegador.",
      invalidSnapshot: "El archivo no es un snapshot válido del visor de Grafo Med.",
      copied: "Copiado al portapapeles.",
      downloadReady: "Propuesta candidata descargada. Los datos canónicos no cambiaron.",
      graphExported: "Grafo 3D visible exportado como PNG.",
      focused: "Vecindario focal actualizado.",
      overviewActive: "Todos los nodos individuales de este snapshot están visibles.",
      graphReady: "Proyección local de solo lectura lista",
      resultLimit: "Mostrando los primeros objetos coincidentes",
    },
  };

  const LAYER_META = {
    medical_truth: { color: "#56c8e8", en: "Medical truth", es: "Verdad médica" },
    learning_representation: { color: "#a98cff", en: "Learning", es: "Aprendizaje" },
    assemblies: { color: "#f0b65a", en: "Assemblies", es: "Ensamblajes" },
    learner_state: { color: "#70d990", en: "Learner state", es: "Estado del aprendiz" },
    derived_projections: { color: "#ed79bb", en: "Derived", es: "Derivados" },
  };

  const TERM_I18N = {
    es: {
      medical_truth: "Conocimiento médico",
      learning_representation: "Representación del aprendizaje",
      assemblies: "Ensamblajes",
      learner_state: "Estado del aprendiz",
      derived_projections: "Proyecciones derivadas",
      clinical_finding: "Hallazgo clínico",
      condition: "Condición",
      test: "Prueba",
      decision_atom: "Átomo de decisión",
      detcsp_pathway: "Ruta DETcSp",
      differential_set: "Conjunto diferencial",
      illness_script: "Guion de enfermedad",
      mastery_atom: "Átomo de dominio",
      assessment: "Evaluación",
      graph_drafted: "Borrador del grafo",
      source_locked_candidate: "Candidato con fuentes fijadas",
      structural_pass: "Validación estructural aprobada",
      pending: "Pendiente",
      candidate: "Candidato",
      candidate_projection: "Proyección candidata",
      canonical_with_candidates: "Canónico con candidatos",
      canonical: "Canónico",
      clinical_reasoning: "Razonamiento clínico",
      assembly_composition: "Composición de ensamblajes",
      learning: "Aprendizaje",
      supports_hypothesis: "Apoya la hipótesis",
      discriminates_from: "Discrimina de",
      feeds_decision: "Alimenta la decisión",
      changes_management_state: "Cambia el estado de manejo",
      enables_mastery_of: "Habilita el dominio de",
      requires: "Requiere",
      assessed_by: "Evaluado por",
      assembled_into: "Integrado en",
      orient: "Orientar",
      learn: "Aprender",
      apply: "Aplicar",
      retrieve: "Recuperar",
      decide: "Decidir",
      assess: "Evaluar",
      definition: "Definición",
      boundaries: "Límites",
      trigger: "Desencadenante",
      actor: "Actor",
      inputs: "Entradas",
      alternatives: "Alternativas",
      discriminators: "Discriminadores",
      output: "Salida",
      downstream_consequence: "Consecuencia posterior",
      error_costs: "Costos del error",
      rationale: "Justificación",
      context: "Contexto",
      confidence: "Confianza",
      difficulty: "Dificultad",
      estimated_time: "Tiempo estimado",
    },
  };

  const state = {
    data: normalizeData(rawData),
    mode: "graph",
    language: preferredLanguage(),
    selectedNodeId: null,
    focusNodeId: null,
    routeId: null,
    depth: 1,
    nodeBudget: 80,
    showCandidates: true,
    overview: true,
    filters: { layer: "all", type: "all", status: "all", family: "all" },
    transform: { x: 0, y: 0, k: 1 },
    positions: new Map(),
    currentProjection: { nodes: [], edges: [] },
    currentPositions: new Map(),
    worldPositions: new Map(),
    screenNodes: [],
    hoverNodeId: null,
    orbit: null,
    camera: { rotX: -0.28, rotY: 0.48, zoom: 1.08, distance: 720 },
    autoRotate: true,
    animationFrame: null,
    lastFrameTime: 0,
    drag: null,
    pan: null,
    toastTimer: null,
  };

  const els = {};

  function preferredLanguage() {
    try {
      const stored = localStorage.getItem("grafomed-viewer-language-v2");
      if (stored === "en" || stored === "es") return stored;
    } catch (_error) {
      // File viewers may restrict storage. Language preference is optional.
    }
    return "es";
  }

  function t(key) {
    return I18N[state.language][key] || I18N.en[key] || key;
  }

  function normalizeData(value) {
    const data = value && typeof value === "object" ? value : {};
    const nodes = Array.isArray(data.nodes) ? data.nodes.filter((node) => node && node.id) : [];
    const nodeIds = new Set(nodes.map((node) => String(node.id)));
    const warnings = Array.isArray(data.warnings) ? [...data.warnings] : [];
    const edges = (Array.isArray(data.edges) ? data.edges : []).filter((edge) => {
      const valid = edge && edge.id && nodeIds.has(String(edge.source)) && nodeIds.has(String(edge.target));
      if (!valid && edge && edge.id) warnings.push(`Broken relation omitted in browser: ${edge.id}`);
      return valid;
    });
    return {
      schema_version: String(data.schema_version || "0.1"),
      meta: {
        snapshot_id: String(data.meta?.snapshot_id || "unnamed-snapshot"),
        snapshot_label: String(data.meta?.snapshot_label || "Grafo Med snapshot"),
        generated_at: String(data.meta?.generated_at || new Date().toISOString()),
        graph_version: String(data.meta?.graph_version || "unknown"),
        data_mode: String(data.meta?.data_mode || "imported"),
        demo: Boolean(data.meta?.demo),
        canonical: Boolean(data.meta?.canonical),
        default_focus: data.meta?.default_focus ? String(data.meta.default_focus) : null,
        source_refs: Array.isArray(data.meta?.source_refs) ? data.meta.source_refs : [],
        notice: String(data.meta?.notice || ""),
        localizations: data.meta?.localizations && typeof data.meta.localizations === "object" ? data.meta.localizations : {},
      },
      nodes: nodes.map((node) => ({
        ...node,
        id: String(node.id),
        label: String(node.label || node.title || node.id),
        type: String(node.type || "unknown"),
        layer: String(node.layer || "medical_truth"),
        lifecycle: String(node.lifecycle || "unknown"),
        evidence_status: String(node.evidence_status || "unknown"),
        validation_status: String(node.validation_status || "unknown"),
        review_status: String(node.review_status || "unknown"),
        summary: String(node.summary || ""),
        tags: Array.isArray(node.tags) ? node.tags.map(String) : [],
        competencies: Array.isArray(node.competencies) ? node.competencies.map(String) : [],
        source_refs: Array.isArray(node.source_refs) ? node.source_refs.map(String) : [],
        aliases: Array.isArray(node.aliases) ? node.aliases.map(String) : [],
        localizations: node.localizations && typeof node.localizations === "object" ? node.localizations : {},
        learning_contract: node.learning_contract && typeof node.learning_contract === "object" ? node.learning_contract : {},
        candidate: Boolean(node.candidate),
        details: node.details && typeof node.details === "object" ? node.details : {},
      })),
      edges: edges.map((edge) => ({
        ...edge,
        id: String(edge.id),
        source: String(edge.source),
        target: String(edge.target),
        type: String(edge.type || "related_to"),
        family: String(edge.family || "other"),
        status: String(edge.status || "unknown"),
        candidate: Boolean(edge.candidate),
        rationale: String(edge.rationale || ""),
        localizations: edge.localizations && typeof edge.localizations === "object" ? edge.localizations : {},
        source_refs: Array.isArray(edge.source_refs) ? edge.source_refs.map(String) : [],
      })),
      routes: (Array.isArray(data.routes) ? data.routes : []).map((route, routeIndex) => ({
        ...route,
        id: String(route.id || route.route_id || `route-${routeIndex + 1}`),
        label: String(route.label || route.title || route.id || `Route ${routeIndex + 1}`),
        goal: String(route.goal || route.target || ""),
        status: String(route.status || "candidate"),
        localizations: route.localizations && typeof route.localizations === "object" ? route.localizations : {},
        steps: (Array.isArray(route.steps) ? route.steps : []).map((step, stepIndex) => (
          typeof step === "string"
            ? { order: stepIndex + 1, node_id: step, kind: "learn", reason: "" }
            : {
                ...step,
                order: Number(step.order || stepIndex + 1),
                node_id: String(step.node_id || step.object_id || step.target_id || ""),
                kind: String(step.kind || step.activity || "learn"),
                reason: String(step.reason || step.explanation || ""),
                localizations: step.localizations && typeof step.localizations === "object" ? step.localizations : {},
              }
        )).filter((step) => step.node_id && nodeIds.has(step.node_id)),
      })),
      warnings,
    };
  }

  function cacheElements() {
    const ids = [
      "snapshot-chip", "snapshot-short", "notice-bar", "notice-label", "notice-text", "notice-dismiss",
      "language-toggle", "import-button", "snapshot-file", "graph-search", "search-results", "clear-filters",
      "layer-filter", "type-filter", "status-filter", "family-filter", "candidate-toggle", "depth-range",
      "depth-value", "node-budget", "budget-value", "focus-button", "overview-button", "layer-legend",
      "graph-stage", "route-stage", "inspector-stage", "graph-title", "graph-canvas", "graph-tooltip", "graph-node-a11y", "graph-svg", "viewport-layer", "edge-layer",
      "edge-label-layer", "node-layer", "graph-empty", "canvas-hud", "visible-count", "edge-count", "focus-id",
      "zoom-out", "zoom-reset", "zoom-in", "export-svg", "route-select", "route-content", "focused-inspector",
      "inspector-content", "inspector-actions", "close-selection", "prepare-proposal", "copy-object-id",
      "status-light", "status-message", "total-stats", "export-json", "proposal-dialog", "proposal-form",
      "proposal-action", "proposal-target", "proposal-summary", "proposal-evidence", "proposal-close", "proposal-cancel", "copy-proposal",
      "toast",
    ];
    ids.forEach((id) => { els[camel(id)] = document.getElementById(id); });
    els.modeButtons = [...document.querySelectorAll(".mode-button")];
    els.stagePanels = [...document.querySelectorAll(".stage-panel")];
  }

  function camel(value) {
    return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  function initialize() {
    cacheElements();
    state.focusNodeId = chooseInitialFocus();
    state.selectedNodeId = null;
    state.routeId = state.data.routes[0]?.id || null;
    bindEvents();
    applyLanguage();
    populateFilters();
    populateRouteSelect();
    renderAll(true);
  }

  function chooseInitialFocus() {
    const preferred = state.data.meta.default_focus;
    if (preferred && state.data.nodes.some((node) => node.id === preferred)) return preferred;
    const mastery = state.data.nodes.find((node) => node.type === "mastery_atom");
    return mastery?.id || state.data.nodes[0]?.id || null;
  }

  function bindEvents() {
    els.modeButtons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
    els.languageToggle.addEventListener("click", toggleLanguage);
    els.importButton.addEventListener("click", () => els.snapshotFile.click());
    els.snapshotFile.addEventListener("change", importSnapshot);
    els.noticeDismiss.addEventListener("click", () => { els.noticeBar.hidden = true; });
    els.graphSearch.addEventListener("input", renderSearchResults);
    els.graphSearch.addEventListener("keydown", handleSearchKeydown);
    els.clearFilters.addEventListener("click", clearFilters);
    [els.layerFilter, els.typeFilter, els.statusFilter, els.familyFilter].forEach((select) => {
      select.addEventListener("change", updateFilters);
    });
    els.candidateToggle.addEventListener("change", () => {
      state.showCandidates = els.candidateToggle.checked;
      ensureValidFocus();
      renderAll();
    });
    els.depthRange.addEventListener("input", () => {
      state.depth = Number(els.depthRange.value);
      updateRangeLabels();
      state.overview = false;
      renderGraph();
    });
    els.nodeBudget.addEventListener("input", () => {
      state.nodeBudget = Number(els.nodeBudget.value);
      updateRangeLabels();
      renderGraph();
    });
    els.focusButton.addEventListener("click", focusSelection);
    els.overviewButton.addEventListener("click", toggleOverview);
    els.zoomIn.addEventListener("click", () => zoomBy(1.2));
    els.zoomOut.addEventListener("click", () => zoomBy(0.84));
    els.zoomReset.addEventListener("click", resetTransform);
    els.exportSvg.addEventListener("click", exportVisiblePng);
    els.routeSelect.addEventListener("change", () => {
      state.routeId = els.routeSelect.value;
      renderRoute();
    });
    els.closeSelection.addEventListener("click", clearSelection);
    els.prepareProposal.addEventListener("click", openProposal);
    els.copyObjectId.addEventListener("click", copySelectedId);
    els.exportJson.addEventListener("click", exportSnapshot);
    els.proposalClose.addEventListener("click", () => els.proposalDialog.close());
    els.proposalCancel.addEventListener("click", () => els.proposalDialog.close());
    els.copyProposal.addEventListener("click", copyProposal);
    els.proposalForm.addEventListener("submit", downloadProposal);
    window.addEventListener("resize", debounce(() => renderGraph(), 120));
    document.addEventListener("keydown", handleGlobalKeydown);
    bindCanvasNavigation();
    startGraphAnimation();
  }

  function applyLanguage() {
    document.documentElement.lang = state.language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    els.languageToggle.textContent = state.language === "es" ? "EN" : "ES";
    els.graphSearch.placeholder = state.language === "es"
      ? "ID, título, tag, competencia…"
      : "ID, label, tag, competency…";
    els.proposalSummary.placeholder = state.language === "es"
      ? "Describe el cambio propuesto y por qué es necesario."
      : "Describe the proposed change and why it is needed.";
    els.proposalEvidence.placeholder = state.language === "es"
      ? "DOI, PMID, source-lock ID o referencia local"
      : "DOI, PMID, source-lock ID, or local source reference";
    populateFilters(true);
    renderLegend();
    renderAll();
  }

  function toggleLanguage() {
    state.language = state.language === "es" ? "en" : "es";
    try { localStorage.setItem("grafomed-viewer-language-v2", state.language); } catch (_error) { /* optional */ }
    applyLanguage();
  }

  function setMode(mode) {
    if (!['graph', 'route', 'inspector'].includes(mode)) return;
    state.mode = mode;
    els.modeButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.mode === mode));
    els.stagePanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.stage === mode));
    if (mode === "graph") requestAnimationFrame(() => renderGraph());
    if (mode === "route") renderRoute();
    if (mode === "inspector") renderFocusedInspector();
  }

  function populateFilters(preserve = false) {
    const previous = preserve ? { ...state.filters } : null;
    fillSelect(els.layerFilter, unique(state.data.nodes.map((node) => node.layer)), t("allLayers"));
    fillSelect(els.typeFilter, unique(state.data.nodes.map((node) => node.type)), t("allTypes"));
    fillSelect(els.statusFilter, unique(state.data.nodes.map((node) => node.lifecycle)), t("allStates"));
    fillSelect(els.familyFilter, unique(state.data.edges.map((edge) => edge.family)), t("allFamilies"));
    if (previous) {
      Object.entries(previous).forEach(([key, value]) => {
        const element = els[`${key}Filter`];
        if (element && [...element.options].some((option) => option.value === value)) element.value = value;
      });
    }
    renderLegend();
  }

  function fillSelect(select, values, allLabel) {
    select.textContent = "";
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = allLabel;
    select.append(all);
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = humanize(value);
      select.append(option);
    });
  }

  function renderLegend() {
    els.layerLegend.textContent = "";
    Object.entries(LAYER_META).forEach(([layer, meta]) => {
      const item = document.createElement("div");
      item.className = "legend-item";
      const shape = document.createElement("span");
      shape.className = `legend-shape ${layer}`;
      shape.setAttribute("aria-hidden", "true");
      const label = document.createElement("span");
      label.textContent = meta[state.language];
      item.append(shape, label);
      els.layerLegend.append(item);
    });
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function updateFilters() {
    state.filters = {
      layer: els.layerFilter.value,
      type: els.typeFilter.value,
      status: els.statusFilter.value,
      family: els.familyFilter.value,
    };
    state.overview = true;
    ensureValidFocus();
    renderAll();
  }

  function clearFilters() {
    state.filters = { layer: "all", type: "all", status: "all", family: "all" };
    [els.layerFilter, els.typeFilter, els.statusFilter, els.familyFilter].forEach((select) => { select.value = "all"; });
    els.candidateToggle.checked = true;
    state.showCandidates = true;
    state.depth = 1;
    state.nodeBudget = 80;
    els.depthRange.value = "1";
    els.nodeBudget.value = "80";
    state.overview = false;
    ensureValidFocus();
    updateRangeLabels();
    renderAll();
  }

  function ensureValidFocus() {
    const allowed = baseFilteredNodes();
    if (!allowed.some((node) => node.id === state.focusNodeId)) {
      state.focusNodeId = allowed[0]?.id || null;
    }
    if (state.selectedNodeId && !state.data.nodes.some((node) => node.id === state.selectedNodeId)) {
      state.selectedNodeId = state.focusNodeId;
    }
  }

  function baseFilteredNodes() {
    return state.data.nodes.filter((node) => {
      if (!state.showCandidates && node.candidate) return false;
      if (state.filters.layer !== "all" && node.layer !== state.filters.layer) return false;
      if (state.filters.type !== "all" && node.type !== state.filters.type) return false;
      if (state.filters.status !== "all" && node.lifecycle !== state.filters.status) return false;
      return true;
    });
  }

  function baseFilteredEdges(nodeIds) {
    return state.data.edges.filter((edge) => {
      if (!state.showCandidates && edge.candidate) return false;
      if (state.filters.family !== "all" && edge.family !== state.filters.family) return false;
      return nodeIds.has(edge.source) && nodeIds.has(edge.target);
    });
  }

  function focalProjection() {
    const allowedNodes = baseFilteredNodes();
    const allowedIds = new Set(allowedNodes.map((node) => node.id));
    const allowedEdges = baseFilteredEdges(allowedIds);
    if (!allowedNodes.length) return { nodes: [], edges: [] };
    if (state.overview) {
      if (allowedNodes.length <= state.nodeBudget) {
        return { nodes: allowedNodes, edges: allowedEdges };
      }
      return aggregateProjection(allowedNodes, allowedEdges);
    }

    let focusId = state.focusNodeId;
    if (!allowedIds.has(focusId)) focusId = allowedNodes[0].id;
    state.focusNodeId = focusId;
    const adjacency = new Map(allowedNodes.map((node) => [node.id, []]));
    allowedEdges.forEach((edge) => {
      adjacency.get(edge.source)?.push(edge.target);
      adjacency.get(edge.target)?.push(edge.source);
    });

    const visible = new Set([focusId]);
    let frontier = [focusId];
    for (let level = 0; level < state.depth; level += 1) {
      const next = [];
      for (const nodeId of frontier) {
        for (const neighbor of adjacency.get(nodeId) || []) {
          if (visible.size >= state.nodeBudget) break;
          if (!visible.has(neighbor)) {
            visible.add(neighbor);
            next.push(neighbor);
          }
        }
      }
      frontier = next;
      if (!frontier.length || visible.size >= state.nodeBudget) break;
    }

    if (state.depth > 0 && visible.size < Math.min(4, allowedNodes.length)) {
      allowedNodes.slice(0, Math.min(state.nodeBudget, 4)).forEach((node) => visible.add(node.id));
    }
    return {
      nodes: allowedNodes.filter((node) => visible.has(node.id)).slice(0, state.nodeBudget),
      edges: allowedEdges.filter((edge) => visible.has(edge.source) && visible.has(edge.target)),
    };
  }

  function aggregateProjection(nodes, edges) {
    const grouped = new Map();
    nodes.forEach((node) => {
      if (!grouped.has(node.layer)) grouped.set(node.layer, []);
      grouped.get(node.layer).push(node);
    });
    const aggregateNodes = [...grouped.entries()].map(([layer, members]) => ({
      id: `cluster::${layer}`,
      label: LAYER_META[layer]?.[state.language] || humanize(layer),
      type: "layer_cluster",
      layer,
      lifecycle: "aggregate",
      evidence_status: "derived",
      validation_status: "derived",
      review_status: "derived",
      summary: `${members.length} ${t("nodes")}`,
      tags: [], competencies: [], source_refs: [], aliases: [], candidate: false,
      aggregate: true,
      count: members.length,
      memberIds: members.map((node) => node.id),
    }));
    const edgeCounts = new Map();
    const nodeLayer = new Map(nodes.map((node) => [node.id, node.layer]));
    edges.forEach((edge) => {
      const sourceLayer = nodeLayer.get(edge.source);
      const targetLayer = nodeLayer.get(edge.target);
      if (!sourceLayer || !targetLayer || sourceLayer === targetLayer) return;
      const key = `${sourceLayer}|${targetLayer}`;
      edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
    });
    const aggregateEdges = [...edgeCounts.entries()].map(([key, count], index) => {
      const [sourceLayer, targetLayer] = key.split("|");
      return {
        id: `cluster-edge-${index}`,
        source: `cluster::${sourceLayer}`,
        target: `cluster::${targetLayer}`,
        type: `${count} relations`,
        family: "aggregate",
        status: "derived",
        candidate: false,
        rationale: "Aggregate layer relation count.",
        source_refs: [],
      };
    });
    return { nodes: aggregateNodes, edges: aggregateEdges };
  }

  function renderAll(resetView = false) {
    if (resetView) resetTransform(false);
    renderSnapshotHeader();
    updateRangeLabels();
    renderGraph();
    renderRoute();
    renderInspector();
    renderFocusedInspector();
    renderStatus();
  }

  function renderSnapshotHeader() {
    const meta = state.data.meta;
    els.snapshotShort.textContent = meta.snapshot_id;
    els.snapshotChip.title = `${localized(meta, "snapshot_label")}\n${meta.generated_at}\n${localized(meta, "notice")}`;
    els.noticeBar.hidden = false;
    els.noticeBar.classList.toggle("is-canonical", meta.canonical && !meta.demo);
    els.noticeLabel.textContent = meta.demo
      ? t("demo")
      : (meta.data_mode === "imported"
        ? t("imported")
        : (meta.canonical ? t("canonical") : t("candidateProjection")));
    els.noticeText.textContent = localized(meta, "notice") || localized(meta, "snapshot_label");
    const dot = els.snapshotChip.querySelector(".snapshot-dot");
    dot.style.background = (meta.demo || !meta.canonical) ? "var(--amber)" : "var(--accent)";
  }

  function updateRangeLabels() {
    const unit = state.language === "es"
      ? (state.depth === 1 ? "salto" : "saltos")
      : (state.depth === 1 ? "hop" : "hops");
    els.depthValue.textContent = `${state.depth} ${unit}`;
    els.budgetValue.textContent = String(state.nodeBudget);
  }

  function renderGraph() {
    const projection = focalProjection();
    state.currentProjection = projection;
    const rect = els.graphCanvas.getBoundingClientRect();
    const width = Math.max(320, rect.width || 900);
    const height = Math.max(360, rect.height || 680);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.round(width * pixelRatio);
    const targetHeight = Math.round(height * pixelRatio);
    if (els.graphCanvas.width !== targetWidth || els.graphCanvas.height !== targetHeight) {
      els.graphCanvas.width = targetWidth;
      els.graphCanvas.height = targetHeight;
    }
    els.graphCanvas.dataset.cssWidth = String(width);
    els.graphCanvas.dataset.cssHeight = String(height);
    els.graphEmpty.hidden = projection.nodes.length > 0;
    els.canvasHud.hidden = projection.nodes.length === 0;
    if (!projection.nodes.length) {
      const context = els.graphCanvas.getContext("2d");
      context?.clearRect(0, 0, els.graphCanvas.width, els.graphCanvas.height);
      updateGraphHud(projection);
      return;
    }

    state.worldPositions = layoutGraph3D(projection.nodes);
    drawGraph3D();
    renderAccessibleNodes(projection.nodes);
    updateGraphHud(projection);
    els.overviewButton.textContent = state.overview ? t("focalNodes") : t("allNodes");
    els.overviewButton.setAttribute("aria-pressed", String(state.overview));
    const aggregateOverview = state.overview && projection.nodes.some((node) => node.aggregate);
    els.graphTitle.textContent = state.overview
      ? (aggregateOverview
        ? (state.language === "es" ? "Mapa agregado por capas" : "Layer aggregate map")
        : (state.language === "es" ? "Todos los nodos" : "All nodes"))
      : nodeLabel(state.focusNodeId) || (state.language === "es" ? "Vecindario del grafo" : "Graph neighborhood");
  }

  function layoutGraph3D(nodes) {
    const positions = new Map();
    const layerConfig = {
      medical_truth: { y: 90, radius: 245, twist: 0.25 },
      assemblies: { y: -35, radius: 155, twist: 1.2 },
      learning_representation: { y: -155, radius: 105, twist: 2.1 },
      learner_state: { y: -220, radius: 70, twist: 2.8 },
      derived_projections: { y: -245, radius: 50, twist: 3.4 },
    };
    const layers = Object.keys(layerConfig);
    layers.forEach((layer) => {
      const members = nodes.filter((node) => node.layer === layer);
      const config = layerConfig[layer];
      members.forEach((node, index) => {
        const angle = (index / Math.max(1, members.length)) * Math.PI * 2 + config.twist;
        const wave = members.length > 4 ? ((index % 3) - 1) * 34 : 0;
        positions.set(node.id, {
          x: Math.cos(angle) * config.radius,
          y: config.y + wave,
          z: Math.sin(angle) * config.radius,
        });
      });
    });
    const extras = nodes.filter((node) => !layerConfig[node.layer]);
    extras.forEach((node, index) => {
      const angle = (index / Math.max(1, extras.length)) * Math.PI * 2;
      positions.set(node.id, { x: Math.cos(angle) * 180, y: 0, z: Math.sin(angle) * 180 });
    });
    return positions;
  }

  function project3D(point, width, height) {
    const cosY = Math.cos(state.camera.rotY);
    const sinY = Math.sin(state.camera.rotY);
    const cosX = Math.cos(state.camera.rotX);
    const sinX = Math.sin(state.camera.rotX);
    const x1 = point.x * cosY - point.z * sinY;
    const z1 = point.x * sinY + point.z * cosY;
    const y1 = point.y * cosX - z1 * sinX;
    const z2 = point.y * sinX + z1 * cosX;
    const perspective = state.camera.distance / Math.max(240, state.camera.distance - z2);
    return {
      x: width / 2 + x1 * perspective * state.camera.zoom,
      y: height / 2 + y1 * perspective * state.camera.zoom,
      depth: z2,
      perspective,
    };
  }

  function drawGraph3D() {
    const canvas = els.graphCanvas;
    const context = canvas.getContext("2d");
    if (!context) return;
    const width = Number(canvas.dataset.cssWidth || canvas.clientWidth || 900);
    const height = Number(canvas.dataset.cssHeight || canvas.clientHeight || 680);
    const pixelRatio = canvas.width / width;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#02080c";
    context.fillRect(0, 0, width, height);

    const atmosphere = context.createRadialGradient(width / 2, height * 0.48, 20, width / 2, height * 0.48, Math.max(width, height) * 0.68);
    atmosphere.addColorStop(0, "rgba(19, 61, 75, 0.25)");
    atmosphere.addColorStop(0.55, "rgba(7, 24, 32, 0.08)");
    atmosphere.addColorStop(1, "rgba(2, 8, 12, 0)");
    context.fillStyle = atmosphere;
    context.fillRect(0, 0, width, height);

    const projected = new Map();
    state.currentProjection.nodes.forEach((node) => {
      const point = state.worldPositions.get(node.id);
      if (point) projected.set(node.id, project3D(point, width, height));
    });

    const selectedId = state.selectedNodeId;
    const relatedEdge = (edge) => selectedId && (edge.source === selectedId || edge.target === selectedId);
    [...state.currentProjection.edges]
      .sort((a, b) => {
        const aDepth = ((projected.get(a.source)?.depth || 0) + (projected.get(a.target)?.depth || 0)) / 2;
        const bDepth = ((projected.get(b.source)?.depth || 0) + (projected.get(b.target)?.depth || 0)) / 2;
        return aDepth - bDepth;
      })
      .forEach((edge) => {
        const source = projected.get(edge.source);
        const target = projected.get(edge.target);
        if (!source || !target) return;
        const highlighted = relatedEdge(edge);
        context.beginPath();
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
        context.lineWidth = highlighted ? 1.8 : 0.72;
        context.strokeStyle = highlighted ? "rgba(112, 225, 194, 0.88)" : "rgba(245, 185, 83, 0.20)";
        context.setLineDash(edge.candidate && !highlighted ? [4, 5] : []);
        context.stroke();
      });
    context.setLineDash([]);

    const screenNodes = state.currentProjection.nodes
      .map((node) => ({ node, projected: projected.get(node.id) }))
      .filter((item) => item.projected)
      .sort((a, b) => a.projected.depth - b.projected.depth)
      .map(({ node, projected: point }) => {
        const hubSize = 5.2 + Math.sqrt(Math.max(1, degree(node.id))) * 2.35;
        const radius = clamp(hubSize * point.perspective, 4.6, 18);
        const selected = node.id === selectedId;
        const hovered = node.id === state.hoverNodeId;
        const color = LAYER_META[node.layer]?.color || "#8fa7aa";
        context.save();
        context.shadowColor = color;
        context.shadowBlur = selected || hovered ? 24 : 11;
        const gradient = context.createRadialGradient(
          point.x - radius * 0.36,
          point.y - radius * 0.42,
          radius * 0.08,
          point.x,
          point.y,
          radius * 1.25,
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.96)");
        gradient.addColorStop(0.16, color);
        gradient.addColorStop(0.72, hexToRgba(color, 0.72));
        gradient.addColorStop(1, hexToRgba(color, 0.08));
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
        context.lineWidth = selected ? 2.4 : 1.1;
        context.strokeStyle = selected ? "#e9f2f2" : hexToRgba(color, 0.74);
        if (node.candidate) context.setLineDash([3, 3]);
        context.stroke();
        context.setLineDash([]);
        if (selected) drawNodeLabel3D(context, node, point, radius, width, height);
        context.restore();
        return { node, x: point.x, y: point.y, radius: Math.max(10, radius + 5), depth: point.depth };
      });
    state.screenNodes = screenNodes;
    updateGraphTooltip();
  }

  function drawNodeLabel3D(context, node, point, radius, width, height) {
    const label = displayNodeLabel(node);
    context.font = "700 12px ui-sans-serif, system-ui, sans-serif";
    const textWidth = Math.min(300, context.measureText(label).width);
    const boxWidth = textWidth + 20;
    const boxHeight = 32;
    let x = point.x + radius + 10;
    let y = point.y - boxHeight / 2;
    if (x + boxWidth > width - 10) x = point.x - radius - boxWidth - 10;
    y = clamp(y, 10, height - boxHeight - 10);
    context.fillStyle = "rgba(3, 12, 17, 0.90)";
    context.strokeStyle = "rgba(112, 225, 194, 0.45)";
    context.lineWidth = 1;
    roundRect(context, x, y, boxWidth, boxHeight, 8);
    context.fill();
    context.stroke();
    context.fillStyle = "#e9f2f2";
    context.fillText(truncate(label, 42), x + 10, y + 20, boxWidth - 20);
  }

  function renderAccessibleNodes(nodes) {
    els.graphNodeA11y.textContent = "";
    nodes.forEach((node) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${displayNodeLabel(node)} · ${humanize(node.type)}`;
      button.addEventListener("click", () => selectNode(node.id));
      els.graphNodeA11y.append(button);
    });
  }

  function updateGraphTooltip() {
    const item = state.screenNodes.find((candidate) => candidate.node.id === state.hoverNodeId);
    if (!item) {
      els.graphTooltip.hidden = true;
      return;
    }
    els.graphTooltip.innerHTML = `<strong>${escapeHTML(displayNodeLabel(item.node))}</strong><span>${escapeHTML(humanize(item.node.type))}</span>`;
    els.graphTooltip.style.left = `${item.x}px`;
    els.graphTooltip.style.top = `${item.y}px`;
    els.graphTooltip.hidden = false;
  }

  function hexToRgba(hex, alpha) {
    const value = String(hex).replace("#", "");
    const normalized = value.length === 3 ? value.split("").map((char) => char + char).join("") : value;
    const number = Number.parseInt(normalized, 16);
    return `rgba(${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}, ${alpha})`;
  }

  function roundRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
  }

  function clearSvgLayer(layer) {
    while (layer.firstChild) layer.removeChild(layer.firstChild);
  }

  function layoutGraph(nodes, edges, width, height) {
    if (state.overview && nodes.every((node) => !node.aggregate)) {
      return layoutNodeOverview(nodes, width, height);
    }
    const positions = new Map();
    const velocities = new Map();
    const nodeIndex = new Map(nodes.map((node, index) => [node.id, index]));
    const count = nodes.length;
    nodes.forEach((node, index) => {
      const cached = state.positions.get(node.id);
      const angle = (index / Math.max(1, count)) * Math.PI * 2 + seeded(node.id) * 0.35;
      const radius = Math.min(width, height) * (count <= 5 ? 0.22 : 0.34);
      positions.set(node.id, cached ? { ...cached } : {
        x: width / 2 + Math.cos(angle) * radius * (0.5 + seeded(`${node.id}x`) * 0.5),
        y: height / 2 + Math.sin(angle) * radius * (0.5 + seeded(`${node.id}y`) * 0.5),
      });
      velocities.set(node.id, { x: 0, y: 0 });
    });

    const iterations = count > 100 ? 42 : count > 45 ? 62 : 86;
    const repulsion = count <= 8 ? 5600 : 3200;
    const aggregateOverview = state.overview && nodes.every((node) => node.aggregate);
    const ideal = aggregateOverview ? 230 : (count <= 8 ? 160 : 115);
    const layers = Object.keys(LAYER_META);

    for (let tick = 0; tick < iterations; tick += 1) {
      const cooling = 1 - tick / iterations;
      for (let i = 0; i < count; i += 1) {
        const a = positions.get(nodes[i].id);
        const av = velocities.get(nodes[i].id);
        for (let j = i + 1; j < count; j += 1) {
          const b = positions.get(nodes[j].id);
          const bv = velocities.get(nodes[j].id);
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let distance2 = dx * dx + dy * dy;
          if (distance2 < 25) {
            dx += (seeded(`${nodes[i].id}${nodes[j].id}`) - 0.5) * 8;
            dy += (seeded(`${nodes[j].id}${nodes[i].id}`) - 0.5) * 8;
            distance2 = dx * dx + dy * dy;
          }
          const distance = Math.sqrt(distance2);
          const force = (repulsion / distance2) * cooling;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          av.x += fx; av.y += fy;
          bv.x -= fx; bv.y -= fy;
        }
      }

      edges.forEach((edge) => {
        if (!nodeIndex.has(edge.source) || !nodeIndex.has(edge.target)) return;
        const source = positions.get(edge.source);
        const target = positions.get(edge.target);
        const sv = velocities.get(edge.source);
        const tv = velocities.get(edge.target);
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        const force = (distance - ideal) * 0.012 * cooling;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        sv.x += fx; sv.y += fy;
        tv.x -= fx; tv.y -= fy;
      });

      nodes.forEach((node) => {
        const point = positions.get(node.id);
        const velocity = velocities.get(node.id);
        const layerIndex = Math.max(0, layers.indexOf(node.layer));
        const layerAngle = (layerIndex / layers.length) * Math.PI * 2 - Math.PI / 2;
        const layerRadius = state.overview ? Math.min(width, height) * 0.25 : Math.min(width, height) * 0.11;
        const targetX = width / 2 + Math.cos(layerAngle) * layerRadius;
        const targetY = height / 2 + Math.sin(layerAngle) * layerRadius;
        velocity.x += (targetX - point.x) * 0.0018 * cooling;
        velocity.y += (targetY - point.y) * 0.0018 * cooling;
        velocity.x += (width / 2 - point.x) * 0.0007;
        velocity.y += (height / 2 - point.y) * 0.0007;
        velocity.x *= 0.77;
        velocity.y *= 0.77;
        point.x = clamp(point.x + velocity.x, 72, width - 72);
        point.y = clamp(point.y + velocity.y, 58, height - 58);
      });
    }
    positions.forEach((point, id) => state.positions.set(id, { ...point }));
    return positions;
  }

  function layoutNodeOverview(nodes, width, height) {
    const positions = new Map();
    const layerOrder = ["medical_truth", "assemblies", "learning_representation", "learner_state", "derived_projections"];
    const layerRank = new Map(layerOrder.map((layer, index) => [layer, index]));
    const ordered = [...nodes].sort((a, b) => {
      const layerDelta = (layerRank.get(a.layer) ?? 99) - (layerRank.get(b.layer) ?? 99);
      return layerDelta;
    });
    const columns = Math.max(2, Math.min(6, Math.floor((width - 150) / 145)));
    const rows = [];
    layerOrder.forEach((layer) => {
      const members = ordered.filter((node) => node.layer === layer);
      for (let index = 0; index < members.length; index += columns) {
        rows.push(members.slice(index, index + columns));
      }
    });
    const unplaced = ordered.filter((node) => !layerRank.has(node.layer));
    for (let index = 0; index < unplaced.length; index += columns) {
      rows.push(unplaced.slice(index, index + columns));
    }
    const top = 64;
    const bottom = 118;
    const rowGap = rows.length > 1 ? (height - top - bottom) / (rows.length - 1) : 0;
    rows.forEach((row, rowIndex) => {
      const side = Math.max(88, Math.min(126, width * 0.12));
      const xGap = row.length > 1 ? (width - side * 2) / (row.length - 1) : 0;
      row.forEach((node, columnIndex) => {
        const point = {
          x: row.length === 1 ? width / 2 : side + columnIndex * xGap,
          y: top + rowIndex * rowGap,
        };
        positions.set(node.id, point);
        state.positions.set(node.id, { ...point });
      });
    });
    return positions;
  }

  function drawEdge(edge, positions) {
    const source = positions.get(edge.source);
    const target = positions.get(edge.target);
    if (!source || !target) return;
    const path = svg("path");
    path.setAttribute("class", `graph-edge${edge.candidate ? " is-candidate" : ""}${isRelated(edge) ? " is-related" : ""}`);
    path.dataset.edgeId = edge.id;
    path.setAttribute("d", edgePath(source, target));
    path.setAttribute("marker-end", "url(#arrow-default)");
    const title = svg("title");
    const rationale = localized(edge, "rationale", state.language !== "es");
    title.textContent = `${humanize(edge.type)}: ${nodeLabel(edge.source)} → ${nodeLabel(edge.target)}${rationale ? `\n${rationale}` : ""}`;
    path.append(title);
    els.edgeLayer.append(path);

    if (isRelated(edge)) {
      const label = svg("text");
      label.setAttribute("class", "edge-label");
      label.setAttribute("x", String((source.x + target.x) / 2));
      label.setAttribute("y", String((source.y + target.y) / 2 - 4));
      label.setAttribute("text-anchor", "middle");
      label.textContent = truncate(edge.type, 25);
      els.edgeLabelLayer.append(label);
    }
  }

  function edgePath(source, target) {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    const sourcePadding = 26;
    const targetPadding = 30;
    const x1 = source.x + (dx / distance) * sourcePadding;
    const y1 = source.y + (dy / distance) * sourcePadding;
    const x2 = target.x - (dx / distance) * targetPadding;
    const y2 = target.y - (dy / distance) * targetPadding;
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  function drawNode(node, positions) {
    const point = positions.get(node.id);
    const group = svg("g");
    group.setAttribute("class", `graph-node${node.candidate ? " is-candidate" : ""}${state.selectedNodeId === node.id ? " is-selected" : ""}`);
    group.setAttribute("transform", `translate(${point.x} ${point.y})`);
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `${displayNodeLabel(node)}, ${humanize(node.type)}, ${humanize(node.lifecycle)}`);
    group.dataset.nodeId = node.id;

    const size = node.aggregate ? 48 + Math.min(22, node.count * 2) : 23 + Math.min(7, degree(node.id));
    const shape = svg("path");
    shape.setAttribute("class", "node-shape");
    shape.setAttribute("d", shapePath(node.layer, size));
    const color = LAYER_META[node.layer]?.color || "#8fa7aa";
    shape.setAttribute("fill", `${color}24`);
    shape.setAttribute("stroke", color);
    group.append(shape);

    if (node.aggregate) {
      const count = svg("text");
      count.setAttribute("class", "cluster-count");
      count.setAttribute("y", "6");
      count.textContent = String(node.count);
      group.append(count);
    }

    const label = svg("text");
    label.setAttribute("class", "node-label");
    const centeredOverview = state.overview && !node.aggregate;
    label.setAttribute("x", centeredOverview ? "0" : String(size + 8));
    label.setAttribute("y", centeredOverview ? String(size + 17) : (node.aggregate ? "-3" : "-2"));
    if (centeredOverview) label.setAttribute("text-anchor", "middle");
    label.textContent = truncate(displayNodeLabel(node), centeredOverview ? 24 : 30);
    group.append(label);

    const sublabel = svg("text");
    sublabel.setAttribute("class", "node-sublabel");
    sublabel.setAttribute("x", centeredOverview ? "0" : String(size + 8));
    sublabel.setAttribute("y", centeredOverview ? String(size + 29) : "12");
    if (centeredOverview) sublabel.setAttribute("text-anchor", "middle");
    sublabel.textContent = node.aggregate ? `${node.count} ${t("nodes")}` : humanize(node.type);
    group.append(sublabel);

    const title = svg("title");
    title.textContent = `${displayNodeLabel(node)}\n${node.id}\n${humanize(node.layer)} · ${humanize(node.lifecycle)}${displayNodeSummary(node) ? `\n${displayNodeSummary(node)}` : ""}`;
    group.append(title);

    group.addEventListener("click", (event) => {
      event.stopPropagation();
      if (node.aggregate) {
        state.filters.layer = node.layer;
        els.layerFilter.value = node.layer;
        state.overview = false;
        ensureValidFocus();
        renderAll(true);
        return;
      }
      selectNode(node.id);
    });
    group.addEventListener("dblclick", (event) => {
      event.stopPropagation();
      if (!node.aggregate) {
        state.selectedNodeId = node.id;
        state.focusNodeId = node.id;
        state.overview = false;
        resetTransform(false);
        renderAll();
        toast(t("focused"));
      }
    });
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectNode(node.id);
      }
    });
    group.addEventListener("pointerdown", (event) => startNodeDrag(event, node.id));
    els.nodeLayer.append(group);
  }

  function shapePath(layer, radius) {
    if (layer === "learning_representation") {
      const width = radius * 1.62;
      const height = radius * 1.16;
      const r = 7;
      return `M ${-width + r} ${-height} H ${width - r} Q ${width} ${-height} ${width} ${-height + r} V ${height - r} Q ${width} ${height} ${width - r} ${height} H ${-width + r} Q ${-width} ${height} ${-width} ${height - r} V ${-height + r} Q ${-width} ${-height} ${-width + r} ${-height} Z`;
    }
    if (layer === "assemblies") {
      const points = Array.from({ length: 6 }, (_, index) => {
        const angle = -Math.PI / 2 + index * Math.PI / 3;
        return `${Math.cos(angle) * radius * 1.18},${Math.sin(angle) * radius * 1.18}`;
      });
      return `M ${points.join(" L ")} Z`;
    }
    if (layer === "learner_state") {
      return `M 0 ${-radius * 1.26} L ${radius * 1.26} 0 L 0 ${radius * 1.26} L ${-radius * 1.26} 0 Z`;
    }
    if (layer === "derived_projections") {
      const width = radius * 1.55;
      const height = radius * 0.92;
      return `M ${-width + height} ${-height} H ${width - height} A ${height} ${height} 0 0 1 ${width - height} ${height} H ${-width + height} A ${height} ${height} 0 0 1 ${-width + height} ${-height} Z`;
    }
    return `M ${radius} 0 A ${radius} ${radius} 0 1 1 ${-radius} 0 A ${radius} ${radius} 0 1 1 ${radius} 0 Z`;
  }

  function degree(nodeId) {
    return state.currentProjection.edges.reduce((sum, edge) => sum + Number(edge.source === nodeId || edge.target === nodeId), 0);
  }

  function isRelated(edge) {
    return Boolean(state.selectedNodeId && (edge.source === state.selectedNodeId || edge.target === state.selectedNodeId));
  }

  function updateGraphHud(projection) {
    els.visibleCount.textContent = `${projection.nodes.length} ${t("nodes")}`;
    els.edgeCount.textContent = `${projection.edges.length} ${t("relations")}`;
    els.focusId.textContent = state.overview
      ? (state.language === "es" ? "vista global" : "overview")
      : (state.focusNodeId || t("noFocus"));
  }

  function bindCanvasNavigation() {
    const canvas = els.graphCanvas;
    canvas.addEventListener("pointerdown", (event) => {
      state.autoRotate = false;
      canvas.setPointerCapture(event.pointerId);
      state.orbit = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        rotX: state.camera.rotX,
        rotY: state.camera.rotY,
        moved: false,
      };
      canvas.classList.add("is-orbiting");
    });
    canvas.addEventListener("pointermove", (event) => {
      if (state.orbit?.pointerId === event.pointerId) {
        const dx = event.clientX - state.orbit.startX;
        const dy = event.clientY - state.orbit.startY;
        if (Math.abs(dx) + Math.abs(dy) > 3) state.orbit.moved = true;
        state.camera.rotY = state.orbit.rotY + dx * 0.008;
        state.camera.rotX = clamp(state.orbit.rotX + dy * 0.006, -1.25, 1.25);
        drawGraph3D();
        return;
      }
      const hit = findCanvasNode(event);
      const nodeId = hit?.node.id || null;
      if (nodeId !== state.hoverNodeId) {
        state.hoverNodeId = nodeId;
        canvas.style.cursor = nodeId ? "pointer" : "grab";
        drawGraph3D();
      }
    });
    const endOrbit = (event) => {
      if (state.orbit?.pointerId !== event.pointerId) return;
      const orbit = state.orbit;
      state.orbit = null;
      canvas.classList.remove("is-orbiting");
      if (!orbit.moved) {
        const hit = findCanvasNode(event);
        if (hit) selectNode(hit.node.id);
        else clearSelection();
      }
    };
    canvas.addEventListener("pointerup", endOrbit);
    canvas.addEventListener("pointercancel", endOrbit);
    canvas.addEventListener("pointerleave", () => {
      if (state.orbit) return;
      state.hoverNodeId = null;
      canvas.style.cursor = "grab";
      drawGraph3D();
    });
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      state.autoRotate = false;
      state.camera.zoom = clamp(state.camera.zoom * (event.deltaY < 0 ? 1.1 : 0.9), 0.55, 2.8);
      drawGraph3D();
    }, { passive: false });
    canvas.addEventListener("dblclick", (event) => {
      const hit = findCanvasNode(event);
      if (!hit) return;
      state.selectedNodeId = hit.node.id;
      state.focusNodeId = hit.node.id;
      state.overview = false;
      resetTransform(false);
      renderAll();
      toast(t("focused"));
    });
    canvas.addEventListener("keydown", (event) => {
      if (event.key === "+" || event.key === "=") zoomBy(1.16);
      if (event.key === "-") zoomBy(0.86);
      if (event.key === "0" || event.key === "Home") resetTransform();
    });
  }

  function findCanvasNode(event) {
    const rect = els.graphCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [...state.screenNodes]
      .sort((a, b) => b.depth - a.depth)
      .find((item) => Math.hypot(item.x - x, item.y - y) <= item.radius) || null;
  }

  function startGraphAnimation() {
    if (state.animationFrame !== null) return;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const tick = (timestamp) => {
      const elapsed = state.lastFrameTime ? Math.min(40, timestamp - state.lastFrameTime) : 16;
      state.lastFrameTime = timestamp;
      if (state.autoRotate && !reducedMotion && state.mode === "graph" && state.currentProjection.nodes.length) {
        state.camera.rotY += elapsed * 0.000055;
        drawGraph3D();
      }
      state.animationFrame = window.requestAnimationFrame(tick);
    };
    state.animationFrame = window.requestAnimationFrame(tick);
  }

  function bindSvgNavigation() {
    els.graphSvg.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".graph-node")) return;
      els.graphSvg.setPointerCapture(event.pointerId);
      state.pan = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: state.transform.x, y: state.transform.y };
      els.graphSvg.classList.add("is-panning");
    });
    els.graphSvg.addEventListener("pointermove", (event) => {
      if (state.drag?.pointerId === event.pointerId) moveNodeDrag(event);
      if (state.pan?.pointerId === event.pointerId) {
        state.transform.x = state.pan.x + event.clientX - state.pan.startX;
        state.transform.y = state.pan.y + event.clientY - state.pan.startY;
        applyTransform();
      }
    });
    els.graphSvg.addEventListener("pointerup", endPointerInteraction);
    els.graphSvg.addEventListener("pointercancel", endPointerInteraction);
    els.graphSvg.addEventListener("wheel", (event) => {
      event.preventDefault();
      const rect = els.graphSvg.getBoundingClientRect();
      const pointX = event.clientX - rect.left;
      const pointY = event.clientY - rect.top;
      const factor = event.deltaY < 0 ? 1.11 : 0.9;
      const next = clamp(state.transform.k * factor, 0.35, 3.4);
      const ratio = next / state.transform.k;
      state.transform.x = pointX - (pointX - state.transform.x) * ratio;
      state.transform.y = pointY - (pointY - state.transform.y) * ratio;
      state.transform.k = next;
      applyTransform();
    }, { passive: false });
    els.graphSvg.addEventListener("click", (event) => {
      if (!event.target.closest(".graph-node") && !state.drag) clearSelection();
    });
  }

  function startNodeDrag(event, nodeId) {
    if (state.overview) return;
    event.stopPropagation();
    els.graphSvg.setPointerCapture(event.pointerId);
    state.drag = { pointerId: event.pointerId, nodeId, moved: false };
    els.graphSvg.classList.add("is-dragging");
  }

  function moveNodeDrag(event) {
    const rect = els.graphSvg.getBoundingClientRect();
    const svgX = (event.clientX - rect.left - state.transform.x) / state.transform.k;
    const svgY = (event.clientY - rect.top - state.transform.y) / state.transform.k;
    const point = { x: svgX, y: svgY };
    state.currentPositions.set(state.drag.nodeId, point);
    state.positions.set(state.drag.nodeId, point);
    state.drag.moved = true;
    updateSvgPositions();
  }

  function updateSvgPositions() {
    els.nodeLayer.querySelectorAll(".graph-node").forEach((group) => {
      const point = state.currentPositions.get(group.dataset.nodeId);
      if (point) group.setAttribute("transform", `translate(${point.x} ${point.y})`);
    });
    els.edgeLayer.querySelectorAll(".graph-edge").forEach((path) => {
      const edge = state.currentProjection.edges.find((item) => item.id === path.dataset.edgeId);
      if (!edge) return;
      const source = state.currentPositions.get(edge.source);
      const target = state.currentPositions.get(edge.target);
      if (source && target) path.setAttribute("d", edgePath(source, target));
    });
    renderSelectedEdgeLabels();
  }

  function renderSelectedEdgeLabels() {
    clearSvgLayer(els.edgeLabelLayer);
    state.currentProjection.edges.forEach((edge) => {
      if (!isRelated(edge)) return;
      const source = state.currentPositions.get(edge.source);
      const target = state.currentPositions.get(edge.target);
      if (!source || !target) return;
      const label = svg("text");
      label.setAttribute("class", "edge-label");
      label.setAttribute("x", String((source.x + target.x) / 2));
      label.setAttribute("y", String((source.y + target.y) / 2 - 4));
      label.setAttribute("text-anchor", "middle");
      label.textContent = truncate(edge.type, 25);
      els.edgeLabelLayer.append(label);
    });
  }

  function endPointerInteraction(event) {
    if (state.pan?.pointerId === event.pointerId) state.pan = null;
    if (state.drag?.pointerId === event.pointerId) {
      const drag = state.drag;
      state.drag = null;
      if (drag.moved) selectNode(drag.nodeId);
    }
    els.graphSvg.classList.remove("is-panning", "is-dragging");
  }

  function applyTransform() {
    els.viewportLayer.setAttribute("transform", `translate(${state.transform.x} ${state.transform.y}) scale(${state.transform.k})`);
  }

  function zoomBy(factor) {
    state.autoRotate = false;
    state.camera.zoom = clamp(state.camera.zoom * factor, 0.55, 2.8);
    drawGraph3D();
  }

  function resetTransform(render = true) {
    state.transform = { x: 0, y: 0, k: 1 };
    state.camera = { rotX: -0.28, rotY: 0.48, zoom: 1.08, distance: 720 };
    state.autoRotate = false;
    if (render) drawGraph3D();
  }

  function focusSelection() {
    if (state.selectedNodeId) state.focusNodeId = state.selectedNodeId;
    state.overview = false;
    setMode("graph");
    resetTransform(false);
    renderGraph();
    toast(t("focused"));
  }

  function toggleOverview() {
    state.overview = !state.overview;
    resetTransform(false);
    setMode("graph");
    renderGraph();
    toast(state.overview ? t("overviewActive") : t("focused"));
  }

  function selectNode(nodeId) {
    if (!state.data.nodes.some((node) => node.id === nodeId)) return;
    state.selectedNodeId = nodeId;
    renderInspector();
    renderGraph();
    renderFocusedInspector();
    renderRoute();
  }

  function clearSelection() {
    state.selectedNodeId = null;
    renderInspector();
    renderGraph();
    renderFocusedInspector();
    renderRoute();
  }

  function populateRouteSelect() {
    els.routeSelect.textContent = "";
    state.data.routes.forEach((route) => {
      const option = document.createElement("option");
      option.value = route.id;
      option.textContent = localized(route, "label") || route.id;
      els.routeSelect.append(option);
    });
    els.routeSelect.disabled = state.data.routes.length === 0;
    if (state.routeId) els.routeSelect.value = state.routeId;
  }

  function renderRoute() {
    els.routeContent.textContent = "";
    const route = state.data.routes.find((item) => item.id === state.routeId) || state.data.routes[0];
    if (!route) {
      els.routeContent.innerHTML = emptyMarkup(t("noRoutes"));
      return;
    }
    state.routeId = route.id;
    els.routeSelect.value = route.id;
    const hero = document.createElement("div");
    hero.className = "route-hero";
    hero.innerHTML = `<div class="pill-row"><span class="pill">${escapeHTML(humanize(route.status || "unknown"))}</span><span class="pill">${escapeHTML(route.id)}</span></div><h3>${escapeHTML(localized(route, "label") || route.id)}</h3><p>${escapeHTML(localized(route, "goal"))}</p>`;
    els.routeContent.append(hero);

    const timeline = document.createElement("div");
    timeline.className = "route-timeline";
    (route.steps || []).forEach((step, index) => {
      const node = getNode(step.node_id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `route-step${state.selectedNodeId === step.node_id ? " is-selected" : ""}`;
      button.innerHTML = `
        <span class="route-step-index">${escapeHTML(String(step.order || index + 1))}</span>
        <span class="route-step-copy">
          <strong>${escapeHTML(node ? displayNodeLabel(node) : step.node_id)}</strong>
          <small>${escapeHTML(localized(step, "reason"))}</small>
        </span>
        <span class="route-kind">${escapeHTML(humanize(step.kind || "learn"))}</span>`;
      button.addEventListener("click", () => selectNode(step.node_id));
      timeline.append(button);
    });
    els.routeContent.append(timeline);
  }

  function renderInspector() {
    const node = getNode(state.selectedNodeId);
    document.body.classList.toggle("has-node-selection", Boolean(node));
    if (!node) {
      els.inspectorContent.innerHTML = selectionEmptyMarkup();
      els.inspectorActions.hidden = true;
      return;
    }
    els.inspectorContent.innerHTML = objectMarkup(node, false);
    els.inspectorActions.hidden = false;
    bindRelationButtons(els.inspectorContent);
  }

  function renderFocusedInspector() {
    const node = getNode(state.selectedNodeId);
    if (!node) {
      els.focusedInspector.innerHTML = `<div class="focused-card">${selectionEmptyMarkup()}</div>`;
      return;
    }
    els.focusedInspector.innerHTML = `<article class="focused-card">${objectMarkup(node, true)}</article>`;
    bindRelationButtons(els.focusedInspector);
  }

  function selectionEmptyMarkup() {
    const warningItems = state.data.warnings.length
      ? `<div class="detail-section"><h4>${escapeHTML(t("warnings"))}</h4><ul class="warning-list">${state.data.warnings.slice(0, 8).map((warning) => `<li class="warning-item">${escapeHTML(warning)}</li>`).join("")}</ul></div>`
      : "";
    return `
      <div class="selection-empty">
        <div class="empty-symbol" aria-hidden="true">⌁</div>
        <div><h3>${escapeHTML(t("noSelection"))}</h3><p>${escapeHTML(t("noSelectionHint"))}</p></div>
        <div class="snapshot-summary">
          <div class="metric-card"><strong>${state.data.nodes.length}</strong><span>${escapeHTML(t("nodes"))}</span></div>
          <div class="metric-card"><strong>${state.data.edges.length}</strong><span>${escapeHTML(t("relations"))}</span></div>
          <div class="metric-card"><strong>${state.data.routes.length}</strong><span>${escapeHTML(t("routes"))}</span></div>
          <div class="metric-card"><strong>${state.data.nodes.filter((node) => node.candidate).length}</strong><span>${escapeHTML(t("candidate"))}</span></div>
        </div>
        ${warningItems}
      </div>`;
  }

  function objectMarkup(node, expanded) {
    const connected = state.data.edges.filter((edge) => edge.source === node.id || edge.target === node.id);
    const relationMarkup = connected.length
      ? connected.map((edge) => {
          const outgoing = edge.source === node.id;
          const otherId = outgoing ? edge.target : edge.source;
          const arrow = outgoing ? "→" : "←";
          return `<li><button class="relation-button" type="button" data-node-id="${escapeAttribute(otherId)}">${arrow} ${escapeHTML(humanize(edge.type))} · ${escapeHTML(nodeLabel(otherId) || otherId)}${edge.candidate ? ` · ${escapeHTML(t("candidate").toUpperCase())}` : ""}</button></li>`;
        }).join("")
      : `<li class="source-item">${escapeHTML(t("noRelations"))}</li>`;
    const sources = node.source_refs.length
      ? node.source_refs.map((ref) => `<li class="source-item">${escapeHTML(ref)}</li>`).join("")
      : `<li class="source-item">${escapeHTML(t("noSources"))}</li>`;
    const localizedDetails = node.localizations?.[state.language]?.details;
    const visibleDetails = state.language === "es"
      ? (localizedDetails && typeof localizedDetails === "object" ? localizedDetails : {})
      : (node.details || {});
    const detailEntries = Object.entries(visibleDetails);
    const details = detailEntries.length
      ? `<dl class="detail-grid">${detailEntries.map(([key, value]) => `<dt>${escapeHTML(humanize(key))}</dt><dd>${escapeHTML(formatValue(value))}</dd>`).join("")}</dl>`
      : `<p class="object-summary">${escapeHTML(t("noDetails"))}</p>`;
    const canonicalContract = node.learning_contract && typeof node.learning_contract === "object"
      ? node.learning_contract
      : {};
    const translatedContract = node.localizations?.[state.language]?.learning_contract;
    const learningContract = state.language === "es"
      ? (translatedContract && typeof translatedContract === "object" ? translatedContract : {})
      : canonicalContract;
    const contractMarkup = learningContract.objective
      ? `<section class="detail-section learning-contract">
          <h4>${escapeHTML(t("learningContract"))}</h4>
          <div class="learning-contract-item"><span>${escapeHTML(t("objective"))}</span><p>${escapeHTML(learningContract.objective)}</p></div>
          <div class="learning-contract-item"><span>${escapeHTML(t("expectedPerformance"))}</span><p>${escapeHTML(learningContract.expected_performance || "—")}</p></div>
          <div class="learning-contract-item"><span>${escapeHTML(t("masteryEvidence"))}</span><p>${escapeHTML(learningContract.mastery_evidence || "—")}</p></div>
        </section>`
      : "";
    return `
      <div class="object-title-row">
        <span class="object-glyph ${escapeAttribute(node.layer)}" aria-hidden="true"></span>
        <div><h3>${escapeHTML(displayNodeLabel(node))}</h3><div class="mono-id">${escapeHTML(node.id)}</div></div>
      </div>
      <div class="pill-row">
        <span class="pill">${escapeHTML(humanize(node.layer))}</span>
        <span class="pill">${escapeHTML(humanize(node.type))}</span>
        <span class="pill${node.candidate ? " is-candidate" : ""}">${escapeHTML(humanize(node.lifecycle))}</span>
      </div>
      <p class="object-summary">${escapeHTML(displayNodeSummary(node) || "—")}</p>
      ${contractMarkup}
      <section class="detail-section">
        <h4>${escapeHTML(t("evidenceReview"))}</h4>
        <dl class="detail-grid">
          <dt>${escapeHTML(t("evidence"))}</dt><dd>${escapeHTML(humanize(node.evidence_status))}</dd>
          <dt>${escapeHTML(t("validation"))}</dt><dd>${escapeHTML(humanize(node.validation_status))}</dd>
          <dt>${escapeHTML(t("review"))}</dt><dd>${escapeHTML(humanize(node.review_status))}</dd>
          ${node.record_path ? `<dt>${escapeHTML(t("record"))}</dt><dd>${escapeHTML(node.record_path)}</dd>` : ""}
        </dl>
      </section>
      <section class="detail-section"><h4>${escapeHTML(t("tags"))}</h4>${pillMarkup(node.tags)}</section>
      <section class="detail-section"><h4>${escapeHTML(t("competencies"))}</h4>${pillMarkup(node.competencies)}</section>
      ${expanded ? `<section class="detail-section"><h4>${escapeHTML(t("details"))}</h4>${details}</section>` : ""}
      <section class="detail-section"><h4>${escapeHTML(t("sources"))}</h4><ul class="source-list">${sources}</ul></section>
      <section class="detail-section"><h4>${escapeHTML(t("connectedRelations"))}</h4><ul class="relation-list">${relationMarkup}</ul></section>`;
  }

  function pillMarkup(values) {
    return values?.length
      ? `<div class="pill-row">${values.map((value) => `<span class="pill">${escapeHTML(value)}</span>`).join("")}</div>`
      : `<span class="pill">—</span>`;
  }

  function bindRelationButtons(container) {
    container.querySelectorAll(".relation-button").forEach((button) => {
      button.addEventListener("click", () => selectNode(button.dataset.nodeId));
    });
  }

  function renderStatus() {
    const meta = state.data.meta;
    els.statusMessage.textContent = `${t("graphReady")} · ${humanize(meta.data_mode)}`;
    els.totalStats.textContent = `${state.data.nodes.length} ${t("nodes")} · ${state.data.edges.length} ${t("relations")} · ${state.data.routes.length} ${t("routes")}`;
    els.statusLight.style.background = meta.demo ? "var(--amber)" : "var(--accent)";
  }

  function renderSearchResults() {
    const query = els.graphSearch.value.trim().toLowerCase();
    els.searchResults.textContent = "";
    if (!query) {
      els.searchResults.classList.remove("is-open");
      return;
    }
    const results = state.data.nodes.filter((node) => searchText(node).includes(query)).slice(0, 8);
    results.forEach((node) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.setAttribute("role", "option");
      button.innerHTML = `<strong>${escapeHTML(displayNodeLabel(node))}</strong><small>${escapeHTML(node.id)} · ${escapeHTML(humanize(node.type))}</small>`;
      button.addEventListener("click", () => chooseSearchResult(node.id));
      els.searchResults.append(button);
    });
    if (!results.length) {
      const empty = document.createElement("div");
      empty.className = "search-result";
      empty.textContent = state.language === "es" ? "Sin resultados" : "No results";
      els.searchResults.append(empty);
    }
    els.searchResults.classList.add("is-open");
  }

  function searchText(node) {
    return [node.id, node.label, displayNodeLabel(node), node.type, node.layer, node.lifecycle, node.summary, displayNodeSummary(node), ...node.tags, ...node.competencies, ...node.aliases].join(" ").toLowerCase();
  }

  function handleSearchKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const query = els.graphSearch.value.trim().toLowerCase();
      const first = state.data.nodes.find((node) => searchText(node).includes(query));
      if (first) chooseSearchResult(first.id);
    }
    if (event.key === "Escape") {
      els.searchResults.classList.remove("is-open");
      els.graphSearch.blur();
    }
  }

  function chooseSearchResult(nodeId) {
    state.selectedNodeId = nodeId;
    state.focusNodeId = nodeId;
    state.overview = false;
    els.searchResults.classList.remove("is-open");
    resetTransform(false);
    setMode("graph");
    renderAll();
  }

  function handleGlobalKeydown(event) {
    const editing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
    if (event.key === "/" && !editing) {
      event.preventDefault();
      els.graphSearch.focus();
    }
    if (!editing && ["1", "2", "3"].includes(event.key)) {
      setMode({ "1": "graph", "2": "route", "3": "inspector" }[event.key]);
    }
    if (event.key === "Escape" && !els.proposalDialog.open) clearSelection();
  }

  async function importSnapshot(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed.meta || !Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) throw new Error("invalid shape");
      state.data = normalizeData(parsed);
      state.data.meta.data_mode = "imported";
      state.data.meta.canonical = false;
      state.data.meta.notice = state.data.meta.notice || t("snapshotLoaded");
      state.focusNodeId = chooseInitialFocus();
      state.selectedNodeId = state.focusNodeId;
      state.routeId = state.data.routes[0]?.id || null;
      state.positions.clear();
      state.overview = false;
      resetTransform(false);
      populateFilters();
      populateRouteSelect();
      renderAll();
      toast(t("snapshotLoaded"));
    } catch (_error) {
      toast(t("invalidSnapshot"));
    } finally {
      event.target.value = "";
    }
  }

  function openProposal() {
    const node = getNode(state.selectedNodeId);
    els.proposalTarget.value = node?.id || "new-object";
    els.proposalSummary.value = "";
    els.proposalEvidence.value = node?.source_refs?.join("\n") || "";
    els.proposalDialog.showModal();
    requestAnimationFrame(() => els.proposalSummary.focus());
  }

  function proposalPayload() {
    const evidence = els.proposalEvidence.value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
    const stamp = new Date();
    return {
      id: `proposal-${stamp.toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}`,
      type: "graph_change_proposal",
      product_id: "grafomed-v1",
      status: "candidate",
      action: els.proposalAction.value,
      target_id: els.proposalTarget.value || null,
      requested_change: els.proposalSummary.value.trim(),
      evidence_refs: evidence,
      created_by: "javier",
      created_at: stamp.toISOString(),
      viewer_snapshot_id: state.data.meta.snapshot_id,
      direct_canonical_write: false,
      required_lifecycle: "candidate_review_and_promotion",
    };
  }

  function downloadProposal(event) {
    event.preventDefault();
    if (!els.proposalSummary.value.trim()) {
      els.proposalSummary.focus();
      return;
    }
    const proposal = proposalPayload();
    downloadBlob(JSON.stringify(proposal, null, 2), `${proposal.id}.json`, "application/json");
    els.proposalDialog.close();
    toast(t("downloadReady"));
  }

  async function copyProposal() {
    if (!els.proposalSummary.value.trim()) {
      els.proposalSummary.focus();
      return;
    }
    await copyText(JSON.stringify(proposalPayload(), null, 2));
    toast(t("copied"));
  }

  async function copySelectedId() {
    if (!state.selectedNodeId) return;
    await copyText(state.selectedNodeId);
    toast(t("copied"));
  }

  function exportSnapshot() {
    const filename = `${safeFilename(state.data.meta.snapshot_id)}.json`;
    downloadBlob(JSON.stringify(state.data, null, 2), filename, "application/json");
  }

  function exportVisiblePng() {
    drawGraph3D();
    els.graphCanvas.toBlob((blob) => {
      if (!blob) return;
      downloadBlob(blob, `grafomed-${safeFilename(state.data.meta.snapshot_id)}-3d.png`, "image/png");
      toast(t("graphExported"));
    }, "image/png");
  }

  function exportVisibleSvg() {
    const clone = els.graphSvg.cloneNode(true);
    clone.setAttribute("xmlns", SVG_NS);
    const style = document.createElementNS(SVG_NS, "style");
    style.textContent = `
      .graph-edge{fill:none;stroke:#607b84;stroke-width:1.2}.graph-edge.is-candidate{stroke:#f5b953;stroke-dasharray:5 4}
      .graph-edge.is-related{stroke:#70e1c2;stroke-width:2}.node-label{fill:#e9f2f2;stroke:#061015;stroke-width:5;paint-order:stroke;font:700 10px sans-serif}
      .node-sublabel{fill:#8fa7aa;stroke:#061015;stroke-width:4;paint-order:stroke;font:7px monospace}.edge-label{fill:#9bb2b5;stroke:#061015;stroke-width:4;paint-order:stroke;font:8px monospace}
      .cluster-count{fill:#e9f2f2;font:800 17px sans-serif;text-anchor:middle}`;
    clone.insertBefore(style, clone.firstChild);
    const serializer = new XMLSerializer();
    downloadBlob(serializer.serializeToString(clone), `grafomed-${safeFilename(state.data.meta.snapshot_id)}-view.svg`, "image/svg+xml");
    toast(t("graphExported"));
  }

  function getNode(nodeId) {
    return state.data.nodes.find((node) => node.id === nodeId) || null;
  }

  function nodeLabel(nodeId) {
    const node = getNode(nodeId);
    return node ? displayNodeLabel(node) : null;
  }

  function localized(record, key, allowCanonicalFallback = true) {
    const value = record?.localizations?.[state.language]?.[key];
    if (value !== undefined && value !== null && value !== "") return value;
    return allowCanonicalFallback ? (record?.[key] ?? "") : "";
  }

  function displayNodeLabel(node) {
    return String(localized(node, "label") || node.id);
  }

  function displayNodeSummary(node) {
    return String(localized(node, "summary") || "");
  }

  function humanize(value) {
    const key = String(value || "unknown");
    const translated = TERM_I18N[state.language]?.[key];
    if (translated) return translated;
    return key.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function formatValue(value) {
    if (Array.isArray(value)) return value.map((item) => typeof item === "object" ? JSON.stringify(item) : String(item)).join(" · ");
    if (value && typeof value === "object") return JSON.stringify(value);
    return String(value);
  }

  function truncate(value, max) {
    const text = String(value || "");
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function seeded(value) {
    let hash = 2166136261;
    for (const character of String(value)) {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0) / 4294967295;
  }

  function svg(tag) {
    return document.createElementNS(SVG_NS, tag);
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[character]);
  }

  function escapeAttribute(value) {
    return escapeHTML(value).replace(/`/g, "&#96;");
  }

  function emptyMarkup(message) {
    return `<div class="selection-empty route-empty"><div class="empty-symbol" aria-hidden="true">○</div><h3>${escapeHTML(message)}</h3></div>`;
  }

  function safeFilename(value) {
    return String(value || "grafomed-snapshot").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function downloadBlob(content, filename, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2600);
  }

  function debounce(callback, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
