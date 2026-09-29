'use strict';
(() => {
  const main = document.querySelector('#main');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const chip = (text, amber = false) => `<span class="chip${amber ? ' amber' : ''}">${esc(text)}</span>`;
  const packetRow = packet => `<div class="row"><div><strong>${esc(packet.title)}</strong><small>${esc(packet.id)} · ${esc(packet.version)}<br>Lifecycle: ${esc(packet.lifecycle)} · release: ${esc(packet.release_status)}</small></div><span class="pill pending">candidate · gates pending</span></div>`;
  const routeRow = route => `<div class="row"><div><strong>${esc(route.localizations?.es?.label || route.label || route.id)}</strong><small>${esc(route.localizations?.es?.goal || route.goal || '')}<br>${(route.steps || []).length} pasos · snapshot ${esc(route.snapshot_id)}</small></div><span class="pill">${esc(route.status || 'candidate')}</span></div>`;
  async function load() {
    try {
      const response = await fetch('/api/integration', {headers:{Accept:'application/json'}});
      const snapshot = await response.json();
      if (!response.ok) throw new Error(snapshot.error || 'No se pudo cargar el snapshot.');
      const nodes = snapshot.builder.nodes || [];
      const routes = snapshot.builder.routes || [];
      const gates = Object.entries(snapshot.packets[0]?.required_gates || {}).map(([key,value]) => chip(`${key}: ${value}`, true)).join('');
      main.innerHTML = `<section class="hero"><div><span class="eyebrow">GRAFO MED · ALPHA INTERNA</span><h1>Builder / Viewer</h1><p>Explora la proyección del grafo, las rutas y los gates del packet. Esta superficie es de solo lectura: no promueve contenido ni incluye evidencia personal del learner.</p><div class="chips">${chip('internal_only')}${chip('read-only')}${chip(snapshot.data_mode)}</div></div><div class="hash"><strong>Snapshot</strong><br>${esc(snapshot.snapshot_id)}<br><br><strong>SHA-256</strong><br>${esc(snapshot.snapshot_hash)}</div></section><section class="grid"><article class="card"><div class="metric">${nodes.length}</div><div class="muted">objetos en la proyección Builder</div></article><article class="card"><div class="metric">${routes.length}</div><div class="muted">rutas disponibles</div></article><article class="card"><div class="metric">${esc(snapshot.learner.release.id)}</div><div class="muted">release learner · ${esc(snapshot.learner.release.status)}</div></article></section><section class="section"><h2>Gobernanza</h2><div class="notice"><strong>Candidate ≠ validado.</strong> Clinical: ${esc(snapshot.governance.clinical_validation)} · Educational: ${esc(snapshot.governance.educational_validation)} · Efficacy: ${esc(snapshot.governance.learning_efficacy)} · Public release: ${esc(snapshot.governance.public_release)}.</div></section><section class="section"><h2>Slice packet</h2><div class="list">${(snapshot.packets || []).map(packetRow).join('')}</div><div class="chips" style="margin-top:12px">${gates}</div></section><section class="section"><h2>Rutas del snapshot</h2><div class="list">${routes.map(routeRow).join('')}</div><a class="button" href="/viewer/index.html">Abrir Viewer completo →</a></section><section class="section"><h2>Boundaries</h2><div class="card"><p class="muted">Tiroides es el flujo learner operativo. GUD permanece candidate-only hasta sus gates. Miembro superior permanece como demo Builder. Learner state incluido en snapshot: <strong>${esc(String(snapshot.learner.state_included))}</strong>. Canonical write: <strong>${esc(String(snapshot.governance.canonical_write))}</strong>.</p></div></section>`;
    } catch (error) { main.innerHTML = `<div class="error"><strong>Snapshot no disponible</strong><p>${esc(error.message)}</p><a class="button" href="/builder.html">Reintentar</a></div>`; }
  }
  load();
})();
