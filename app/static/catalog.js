'use strict';
(() => {
  const specialties = [
    ['Medicina interna','MI','blue',['Síndromes frecuentes','Razonamiento diagnóstico','Tratamiento y seguimiento']],
    ['Cardiología','CA','red',['Dolor torácico','Insuficiencia cardiaca','Arritmias']],
    ['Endocrinología','EN','violet',['Eje tiroideo','Metabolismo de la glucosa','Ejes suprarrenales']],
    ['Neurología','NE','purple',['Localización neurológica','Cefaleas','Síndromes convulsivos']],
    ['Psiquiatría','PS','teal',['Entrevista clínica','Síndromes afectivos','Riesgo y seguridad']],
    ['Pediatría','PE','orange',['Crecimiento y desarrollo','Fiebre en la infancia','Urgencias pediátricas']],
    ['Gineco-obstetricia','GO','pink',['Salud reproductiva','Embarazo','Urgencias obstétricas']],
    ['Cirugía general','CG','slate',['Evaluación preoperatoria','Abdomen agudo','Cuidado posoperatorio']],
    ['Neumología','NU','cyan',['Disnea','Obstrucción al flujo','Intercambio gaseoso']],
    ['Nefrología','NF','green',['Función renal','Trastornos hidroelectrolíticos','Síndromes urinarios']],
    ['Dermatología','DE','rose',['Lesiones elementales','Patrones inflamatorios','Infecciones cutáneas']],
    ['Emergencias','EM','amber',['Priorización','Estabilización inicial','Decisiones críticas']]
  ];
  const $ = s => document.querySelector(s);
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function routeFor(specialty, subtopic) {
    return ['Reconocer el patrón','Elegir el dato clave','Interpretar la relación','Aplicar la decisión'];
  }
  function renderSubject(index) {
    const item=specialties[index]; const title=item[0]; const subs=item[3];
    $('#subject-panel').innerHTML=`<div class="subject-head"><div><span class="eyebrow">RUTA SELECCIONADA</span><h2>${esc(title)}</h2><p>El usuario solo verá los círculos de esta ruta. Los nodos teórico, fact y procedure se enseñan al entrar en cada decisión.</p></div><span class="subject-code ${item[2]}">${item[1]}</span></div><div class="subtopic-tabs">${subs.map((sub,i)=>`<button class="subtopic ${i===0?'active':''}" data-sub="${i}">${String(i+1).padStart(2,'0')}<span>${esc(sub)}</span></button>`).join('')}</div><div class="route-card"><div class="route-card-head"><div><span class="eyebrow">SUBTEMA · ${esc(subs[0])}</span><h3>Recorrido de decisiones</h3></div><span class="route-count">4 decisiones</span></div><div class="catalog-route">${routeFor(title,subs[0]).map((label,i)=>`<button class="catalog-orb-row ${i===0?'next':''}" aria-label="Decisión ${i+1}: ${esc(label)}"><span class="catalog-orb"><b>${String(i+1).padStart(2,'0')}</b><strong>${i===0?'★':'·'}</strong></span><span><small>${i===0?'PRIMER NODO · TEÓRICO':i===1?'SIGUIENTE DECISIÓN':'DECISIÓN'}</small><strong>${esc(label)}</strong><em>${i===0?'Siempre se enseña primero':'Se desbloquea al avanzar'}</em></span></button>`).join('')}</div></div><p class="catalog-boundary">Vista conceptual de una base futura. Cada contenido requerirá revisión estructural, clínica, educativa y release independiente.</p>`;
    $('#subject-panel').querySelectorAll('.subtopic').forEach(button => button.addEventListener('click', () => { $('#subject-panel').querySelectorAll('.subtopic').forEach(b=>b.classList.remove('active')); button.classList.add('active'); }));
  }
  $('#specialties').innerHTML=specialties.map((item,index)=>`<button class="specialty ${index===0?'active':''}" data-index="${index}"><span class="specialty-icon ${item[2]}">${item[1]}</span><span><strong>${esc(item[0])}</strong><small>${item[3].length} subtemas · ruta disponible</small></span><b>›</b></button>`).join('');
  $('#specialties').querySelectorAll('.specialty').forEach(button => button.addEventListener('click', () => { $('#specialties').querySelectorAll('.specialty').forEach(b=>b.classList.remove('active')); button.classList.add('active'); renderSubject(Number(button.dataset.index)); }));
  renderSubject(0);
})();
