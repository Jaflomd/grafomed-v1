# Catálogo de Prototipos de Juegos · Assessment Units (GrafoMed)

Este documento registra los **~20 prototipos de juegos / unidades de evaluación interactiva** diseñados para el entrenamiento y la evaluación del razonamiento clínico y médico en GrafoMed.

Cada juego define:
1. **Mecánica interactiva**: Interacción del usuario (arrastre libre, conexión de flechas, baraja una por una, despacho en 1 clic, etc.).
2. **Propósito clínico-pedagógico**: Constructo de razonamiento médico que evalúa (fisiopatología mecanicista, discriminación de illness scripts, juicio terapéutico de urgencia, etc.).
3. **Métricas de evidencia**: Qué datos genera el intento (precisión dimensional, errores de confusión cruzada, rachas de coherencia, tiempo).
4. **Estructura de datos (Schema)**: Formato declarativo para reutilizar el juego con cualquier patología médica.

---

## Índice de Prototipos (11 / 20)

| # | Nombre del Juego | Propósito Clínico | Mecánica Principal | Estado |
|---|------------------|-------------------|--------------------|--------|
| **01** | **DAG Concept Map Builder** | Causalidad fisiopatológica mecanicista en grafo dirigido acíclico | Dos ventanas: Canvas Grande (movimiento libre) + Caja de herramientas (nodos aleatorios y flechas) + Pistas | **Aprobado** ✅ |
| **02** | **Pathway Target Spotter** | Dianas moleculares, cascadas de señalización y farmacodinámica | Diagrama interactivo de flujo biológico en árbol + Desafíos de fármacos 1-por-1 + Selección directa de diana | **Implementado** 🧪 |
| **03** | **Illness Script Matrix** (Pacientes Modelo 1-por-1) | Reconocimiento de patrones clínicos y contrastes diagnósticos diferenciales | Construcción de 3 pacientes modelo comparados simultáneamente + Baraja de fichas 1-por-1 con despacho directo en 1 solo clic | **Implementado** 🧪 |
| **04** | **Management Script Matrix** (Planes de Manejo 1-por-1) | Plan de investigación diagnóstica, tratamiento de urgencia y prevención de complicaciones | Construcción de 3 planes de manejo comparados simultáneamente a través de 5 dimensiones clínicas + Baraja de fichas 1-por-1 (1 solo clic) | **Implementado** 🧪 |
| **05** | **Script Concordance Test (SCT)** | Certeza diagnóstica, actualización bayesiana y toma de decisiones en incertidumbre | Vignette clínico + Slider continuo de -1.0 a +1.0 + Curva de concordancia con panel de 15 expertos | **Implementado** 🧪 |
| **06** | **Clinical Vignette MCQ** | Decisión diagnóstica y terapéutica con discriminación profunda de distractores | Ficha EHR con signos vitales dinámicos + 5 opciones 1-clic + Desglose fisiopatológico de distractores + Board Pearl | **Implementado** 🧪 |
| **07** | **Structure Spotter** | Identificación topográfica y espacial de estructuras anatómicas en figuras médicas | Figura anatómica interactiva vectorial (SVG) con zonas activas (hotspots) + retos clínicos 1-por-1 | **Implementado** 🧪 |
| **08** | **Therapeutic Space Shooter** | Selección de tratamiento farmacológico rápido y neutralización de patógenos | Arcade shooter interactivo: torreta fija central con auto-targeting y 4 balas/cañones farmacológicos teledirigidos | **Implementado** 🧪 |
| **09** | **Therapeutic Synapse Match** | Memoria de trabajo, asociación etiológica directa y correspondencia farmacodinámica | Dos columnas interactivas (Patógeno/Causa ↔ Tratamiento): Unión por cables táctiles SVG y drag & drop con feedback y racional | **Implementado** 🧪 |
| **10** | **Clinical MythBuster (Verdadero / Falso)** | Detección de dogmas médicos erróneos, contraindicaciones críticas y sesgos cognitivos | Baraja interactiva de tarjetas swipeables (izquierda Falso / derecha Verdadero) y botones 1-clic con desglose de mitos y trampas | **Implementado** 🧪 |
| **11** | **Patient Cluster Matrix** | Estratificación de severidad y clasificación de fenotipos/diagnósticos | Cockpit Zero-Scroll: Peón "Palitroque" en podio central + Vértices circulares de triángulo/cuadrado holográfico (arrastre libre o 1-clic) | **Implementado** 🧪 |
| **12** | **Clinical Workflow Sequencer** | Priorización y orden secuencial en urgencias sin inversiones iatrogénicas | Slots cronológicos horizontales (1º a 4º paso) + Cajitas de acciones ordenables por arrastre y 1-clic con feedback fisiopatológico de seguridad | **Implementado** 🧪 |
| 13 | *Por definir con el usuario* | | | Siguiente en cola ⏳ |
| ... | ... | | | Pendiente |
| 20 | *Por definir con el usuario* | | | Pendiente |

---

## Arquitectura Global de Gamificación y Experiencia del Jugador (Juicy Game Feel)

Todos los juegos del laboratorio comparten una capa unificada de gamificación diseñada para mantener la motivación intrínseca, reducir la fatiga cognitiva y reforzar el aprendizaje mediante feedback inmediato:

1. **Motor de XP y Niveles Clínicos**:
   - Puntos de experiencia (XP) acumulados en cada acierto y deducción en cualquiera de los 20 juegos.
   - Progresión por rangos clínicos reales:
     * *Nivel 1*: Estudiante Clínico (0 – 499 XP)
     * *Nivel 2*: Residente Junior (500 – 1,199 XP)
     * *Nivel 3*: Residente Senior (1,200 – 2,199 XP)
     * *Nivel 4*: Especialista Adjunto (2,200 – 3,499 XP)
     * *Nivel 5*: Jefe de Servicio Clínico (3,500+ XP)
2. **Chips Flotantes de XP Dinámicos (`+100 XP ✨`)**:
   - Cada acción correcta (trazar una flecha causal, ubicar una diana molecular, asignar una ficha diagnóstica, cuadrar un plan de manejo o acertar con la moda de expertos) proyecta un chip flotante que viaja hacia arriba y se desvanece con feedback sonoro armónico.
3. **Multiplicador de Racha Continua (`🔥 Streak Multiplier`)**:
   - Contador de aciertos consecutivos (`🔥 x1`, `🔥 x2`, `🔥 x3`, `⚡ x4 MEGA COMBO`). Los combos incrementan la puntuación y el XP otorgado por acción. Un error reinicia la racha a x1 sin penalizar el progreso ya adquirido.
4. **Sistema de Logros y Trofeos Clínicos (Sala de Trofeos Modal)**:
   - `🎯 Ojo Clínico`: Primer acierto al primer intento sin errores.
   - `🔥 Racha Imparable`: Alcanzar una racha de 3 o más aciertos continuos.
   - `🧬 Maestro de Vías`: Localizar todas las dianas moleculares de una cascada biológica.
   - `🫀 Cardiólogo Sagaz`: Completar la matriz de Illness Script en Cardio.
   - `⚡ Comandante de Urgencias`: Completar un plan de manejo de emergencia sin iatrogenias.
   - `⚖️ Consenso de Expertos`: Lograr concordancia perfecta con la moda del panel en SCT.
   - `🎓 Maestro del Board`: Resolver viñetas clínicas complejas de Board MCQ con análisis impecable de distractores.
   - `🗺️ Cartógrafo Anatómico`: Localizar estructuras anatómicas y dianas espaciales en figuras médicas y esquemas quirúrgicos.
   - `🚀 Tirador Terapéutico`: Neutralizar patologías con la munición farmacológica exacta sin incurrir en iatrogenias.
5. **Celebraciones y Partículas de Confetti (`Canvas Confetti Engine`)**:
   - Al completar cualquier matriz, árbol de flujo o caso clínico, una lluvia ligera de confeti vectorial celebra el hito clínico.
6. **Diseño Empático y Humanizado**:
   - Pacientes con nombres, edades y semiología real (*Don Carlos 64a*, *Doña Elena 32a*, *Santiago 51a*) en vez de códigos fríos.
   - Interacciones táctiles mobile-first con un solo toque y retroalimentación clara de "por qué" un hallazgo no encaja.

---

## Fichas Técnicas Detalladas

### Juego 01: DAG Concept Map Builder (Fisiopatología en Red con Movimiento Libre)

- **Identificador**: `game-01-dag-concept-map-builder`
- **Inspiración / Referencia**: Mapas de razonamiento causal estilo *The Calgary Guide to Understanding Disease*.
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Modelado causal fisiopatológico como Grafo Dirigido Acíclico (DAG)*.
  - **Problema que resuelve**: La fisiopatología médica no es una lista estática, sino una red dirigida de eventos causales donde cada evento antecede temporal y lógicamente a sus consecuencias. Este juego entrena al estudiante a construir y organizar mentalmente y visualmente el DAG de una enfermedad sin caer en bucles ni inversiones causales.
- **Arquitectura de Interfaz (Dos Ventanas)**:
  1. **Ventana Superior (Lienzo DAG)**:
     - Área interactiva donde los nodos se posicionan y **se mueven libremente** mediante arrastre (drag-and-drop con puntero/touch).
     - Todas las flechas dirigidas conectadas al nodo se recalculan dinámicamente y en tiempo real mientras el nodo se desplaza.
  2. **Ventana Inferior (Caja de Herramientas: Nodos & Flechas)**:
     - **Sección de Nodos**: Banco de conceptos y mediadores disponibles con título, categoría y subtítulo. Al pulsar o arrastrar un nodo, sube a la ventana superior.
     - **Sección de Flechas**: Herramienta de trazado causal. Al activarla, el usuario selecciona el nodo Causa y luego el nodo Efecto para trazar la flecha dirigida.
- **Validación DAG y Feedback**:
  - **Validación canónica**: Si la relación causal $u \rightarrow v$ es correcta, la flecha se ilumina en **verde esmeralda** (`#10b981`) con resplandor y justificación fisiopatológica.
  - **Detección de Ciclos (DFS)**: Si el usuario intenta trazar una flecha que cerraría un bucle ($v \rightsquigarrow u \rightarrow v$), el sistema salta en **rojo** (`#ef4444`) advirtiendo: *"¡Violación DAG (Ciclo detectado)! Una causa no puede ser indirectamente su propio efecto"*.
  - **Causalidad Invertida**: Si el usuario conecta efecto $\rightarrow$ causa, salta en rojo con explicación de la precedencia temporal.
- **Evidencia generada para el modelo del estudiante**:
  - `dag_edges_correct`: Enlaces causales válidos trazados.
  - `dag_cycle_violations`: Intentos de crear bucles causales.
  - `dag_inverted_edges`: Inversiones de causalidad.
  - `unassisted_completion`: Construcción completa del DAG sin ayuda del modelo de referencia.

---

### Juego 02: Pathway Target Spotter (Dianas Farmacológicas & Vías de Señalización)

- **Identificador**: `game-02-pathway-target-spotter`
- **Inspiración / Referencia**: Farmacología translacional y vías de señalización fisiopatológica (SRAA, Ácido Araquidónico, Célula Parietal Gástrica, Eje Incretinas).
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Localización espacial y causal precisa del mecanismo de acción molecular (enzimas, receptores GPCR, transportadores iónicos) en cascadas biológicas complejas*.
  - **Problema que resuelve**: Los estudiantes memorizan fármacos como listas estáticas de nombres sin comprender su ubicación topológica en la vía biológica. Este juego elimina la memorización pasiva y entrena el "ojo clínico molecular": ante un fármaco y una viñeta fisiopatológica, el usuario debe identificar con 1 solo toque exactamente dónde actúa, visualizando de inmediato las consecuencias aguas arriba y aguas abajo.
- **Mecánica interactiva (100% clics · Mobile-First)**:
  1. **Diagrama Interactivo de Cascada Biológica**: Representación visual clara de los sustratos, enzimas catalíticas, receptores de membrana/nucleares y transportadores acoplados.
  2. **Baraja de Desafíos Farmacológicos (1-por-1)**: Ficha activa que presenta el principio activo, clase farmacológica y contexto clínico de aplicación (ej. *Enalapril*, *Losartán*, *Espironolactona*, *Sacubitril*, *Montelukast*, *Omeprazol*, *Metformina*).
  3. **Localización Directa con 1 Solo Toque (Target Spotting)**:
     - El usuario pulsa directamente el nodo o paso en la vía.
     - *Acierto*: El nodo se bloquea con aura esmeralda, audio de éxito (`playLabSuccessSound()`), medalla de diana identificada y despliegue del **Panel de Revelación Farmacodinámica** (Mecanismo molecular exacto, impacto hemodinámico/tisular y perla de examen USMLE / Residentado).
     - *Error*: Animación de vibración (`shake`), audio de advertencia (`playLabErrorSound()`) y despliegue inmediato de un **Toast Diferencial** que explica qué fármaco actúa realmente en el nodo tocado y cómo razonar la diana solicitada.
  4. **Vías Clínicas de Alta Rentabilidad**:
     - *Sistema Renina-Angiotensina-Aldosterona (SRAA) & Hemodinamia Renal* (Aliskiren, Enalapril, Losartán, Espironolactona, Sacubitril).
     - *Cascada del Ácido Araquidónico & Eicosanoides* (Corticoides, Aspirina, Celecoxib, Zileutón, Montelukast).
     - *Célula Parietal Gástrica & Secreción Ácida* (Omeprazol, Famotidina, Misoprostol, Pirenzepina).
     - *Eje Incretinas & Homeostasis Glucémica en DM2* (Sitagliptina, Liraglutida, Empagliflozina, Metformina).
- **Evidencia generada para el modelo del estudiante**:
  - `molecular_target_accuracy`: Precisión en la identificación del receptor, enzima o transportador específico.
  - `pathway_spatial_reasoning`: Comprensión topológica de pasos limitantes aguas arriba vs receptores distales.
  - `pharmacodynamic_differentiation`: Capacidad de no confundir inhibidores enzimáticos con bloqueadores de receptores de superficie (ej. ECA vs AT1).
  - `first_touch_spotting_rate`: Tasa de localización acertada al primer intento.

---

### Juego 03: Illness Script Matrix (Pacientes Modelo 1-por-1)

- **Identificador**: `game-03-illness-script-matrix`
- **Inspiración / Referencia**: Teoría de *Illness Scripts* (Schmidt & Rikers / Feltovich & Barrows) para el reconocimiento experto de patrones clínicos sin sesgos posicionales.
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Construcción de representaciones mentales de pacientes prototipo (Pacientes Modelo) a través del reconocimiento de patrones diagnósticos diferenciales*.
  - **Problema que resuelve**: Los estudiantes sufren sobrecarga cognitiva cuando se les presentan 12 hallazgos en un tablero saturado. Asimismo, ocultar patologías detrás de pestañas impide la comparación analítica simultánea. Este juego resuelve ambos problemas: mantiene las 3 patologías comparadas en pantalla al mismo tiempo, mientras entrega los hallazgos clínicos **uno por uno** (estilo baraja/dealer clínico) para que el estudiante tome decisiones instantáneas con **1 solo clic**.
- **Dimensiones de Illness Script**:
  1. `⚠️ Fx de Riesgo`: Antecedentes y factores predisponentes biológicos.
  2. `⏱️ Curso`: Dinámica temporal, velocidad de instauración y fluctuación.
  3. `🗣️ Síntomas`: Semiología y vivencia subjetiva cardinal del paciente.
  4. `🩺 Signos y Labs Marcados`: Examen físico dirigido y biomarcadores clave.
- **Mecánica Central: Single-Token Deck & Construcción de Pacientes Modelo**:
  1. **Tres Pacientes Modelo Comparados en Pantalla**: Las 3 entidades diagnósticas permanecen visibles simultáneamente (ej. *Infarto STEMI* vs *Pericarditis Aguda* vs *Tromboembolismo TEP*). No se oculta ninguna entidad.
  2. **Despachador de Fichas 1-por-1**: Se presenta una única ficha activa a la vez con tipografía legible, badge de dimensión y contador de baraja (`Ficha 4 de 12`).
  3. **Despacho con 1 Solo Clic**: Debajo del texto clínico, la ficha ofrece **3 botones de asignación directa** (`[ 🫀 STEMI ]`, `[ 🛡️ Pericarditis ]`, `[ 🫁 TEP ]`). El usuario también puede tocar directamente la celda correspondiente en el paciente.
  4. **Feedback Inmediato**:
     - *Acierto*: Destello verde, sonido de confirmación, la ficha viaja a la columna del paciente completando su perfil (ej. `2/4`), y se reparte la siguiente ficha de inmediato.
     - *Error*: Sacudida de la tarjeta (`shake`), sonido sutil de advertencia y despliegue inmediato de una **explicación pedagógica de discriminación diferencial** explicando por qué ese hallazgo no encaja con esa patología. El usuario puede reintentar con 1 clic sin bloqueo.
  5. **Victoria & Síntesis**: Al ubicar las 12 fichas, se despliega la tabla comparativa canónica completa con las perlas diagnósticas de alta rentabilidad.
- **Escenarios**:
  - `Cardio`: STEMI vs Pericarditis Aguda vs Tromboembolismo Pulmonar (TEP).
  - `Pulmonar`: Asma Grave (Th2) vs EPOC Exacerbado vs ACOS (Overlap).
  - `Neuro`: Hemorragia Subaracnoidea vs Meningitis Bacteriana vs Migraña con Aura.
- **Evidencia generada para el modelo del estudiante**:
  - `illness_script_accuracy`: Tasa global de discriminación clínica.
  - `differential_confusion_matrix`: Pares de confusión específica entre patologías.
  - `first_pass_accuracy`: Precisión en la primera tirada sin reintentos.
  - `coherence_streak`: Racha máxima de aciertos continuos.

---

### Juego 04: Management Script Matrix (Planes de Manejo 1-por-1)

- **Identificador**: `game-04-management-script-matrix`
- **Inspiración / Referencia**: Formato de razonamiento *Management Scripts* (Cook, Bordage & van der Vleuten) enfocado en la toma de decisiones terapéuticas e investigación diagnóstica dirigida.
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Modelado secuencial de planes de manejo clínico: desde la confirmación de laboratorio e imágenes hasta el tratamiento emergente y la anticipación de complicaciones*.
  - **Problema que resuelve**: Los planes de manejo suelen memorizarse de forma desarticulada, llevando a errores frecuentes como indicar anticoagulación plena en pericarditis aguda (riesgo de taponamiento hemorrágico) o administrar betabloqueantes antes de alfa-bloqueantes en una crisis de feocromocitoma. Este juego contrasta la conducta frente a 3 patologías a través de 5 ejes clínicos críticos.
- **Dimensiones de Management Script (5 Ejes)**:
  1. `🔬 Labs Alteraciones`: Biomarcadores agudos y anomalías químicas cardinales.
  2. `🩻 Imágenes Alteraciones`: Hallazgos patognomónicos en ecocardiografía, TAC, radiografía o angiografía.
  3. `📋 Criterios Dx`: Scores de decisión clínica y definiciones de consenso (Wells, ESC, GINA, Anthonisen, Stanford).
  4. `💊 Tratamiento`: Terapia emergente de primera línea y abordaje definitivo.
  5. `⚠️ Complicaciones`: Eventos críticos a prevenir y detectar activamente.
- **Mecánica Central: Single-Token Deck (15 fichas) & Despacho en 1 Clic**:
  1. **Tres Planes de Manejo Modelo Comparados**: Visualización integral simultánea de las 3 entidades (ej. *Infarto STEMI* vs *Pericarditis Aguda* vs *Tromboembolismo TEP*).
  2. **Baraja de Fichas 1-por-1**: Se presenta una sola decisión/conducta a la vez con badge de color identificatorio según su eje.
  3. **Despacho Directo (1 Clic)**: 3 botones de asignación instantánea en la base de la ficha activa (`[ 🫀 Plan 1 ]`, `[ 🛡️ Plan 2 ]`, `[ 🫁 Plan 3 ]`).
  4. **Feedback de Racional Terapéutico**: Si el usuario asigna erróneamente un fármaco o criterio a la patología equivocada, se despliega una advertencia con el **racional terapéutico y la regla de oro clínica** infringida.
  5. **Victoria & Matriz de Manejo**: Cuadro comparativo final que contrasta los 3 planes de manejo de emergencia para repaso rápido.
- **Escenarios**:
  - `Cardio`: Dolor Torácico de Emergencia (STEMI vs Pericarditis vs TEP).
  - `Respiratorio`: Urgencias Respiratorias Graves (Crisis Asmática vs EPOC Exacerbado vs Anafilaxia).
  - `Vascular`: Emergencias Cardiovasculares Hipertensivas (Disección Aórtica Stanford A vs EAP Hipertensivo vs Feocromocitoma).
- **Evidencia generada para el modelo del estudiante**:
  - `therapeutic_precision`: Coherencia en la selección de esquemas farmacológicos y de intervención.
  - `critical_contraindication_errors`: Detección de conductas de alto riesgo de iatrogenia (ej. betabloqueo aislado en feocromocitoma).
  - `diagnostic_rule_application`: Comprensión de criterios de estratificación pre-test.

---

### Juego 05: Script Concordance Test (SCT) · Juicio Clínico en Incertidumbre

- **Identificador**: `game-05-script-concordance-test`
- **Inspiración / Referencia**: Teoría y metodología del *Script Concordance Test* (Charlin, Lubarsky, van der Vleuten et al., *Medical Education*).
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Actualización de hipótesis diagnósticas y decisiones terapéuticas bajo condiciones de incertidumbre clínica y ambigüedad*.
  - **Problema que resuelve**: La práctica médica real rara vez se presenta con certezas binarias (100% sí / 0% no); la mayoría de las decisiones ocurren en "zonas grises" donde un nuevo dato clínico (ej. un valor limítrofe de troponina o una sospecha social de CURB-65) modula la probabilidad previa de forma cuantitativa. El SCT evalúa la estructura de las redes de conocimiento clínico (scripts) midiendo si el estudiante ajusta su juicio en concordancia estadística con un panel de especialistas.
- **Mecánica Interactiva con Slider Continuo (-1.0 a +1.0)**:
  1. **Viñeta Clínica (Contexto Activo)**: Presentación realista de un paciente en urgencias o consulta.
  2. **Hipótesis de Trabajo Inicial**: Un diagnóstico de sospecha o una conducta diagnóstica/terapéutica propuesta.
  3. **Nuevo Hallazgo Clínico**: Un biomarcador, signo físico, hallazgo de imagen o dato anamnésico que altera el escenario.
  4. **Slider de Impacto (-1.0 a +1.0)**:
     - `-1.0`: 🔴 **Invalida / Descarta / Contraindica** (Impacto fuertemente negativo).
     - `-0.5`: 🟠 **Menos Probable / Desaconseja** (Impacto negativo moderado).
     - ` 0.0`: ⚪ **Neutro / Sin Impacto** (No modifica la probabilidad ni la conducta).
     - `+0.5`: 🟢 **Más Probable / Favorable** (Impacto positivo moderado).
     - `+1.0`: 🔵 **Confirma / Mandatorio** (Impacto fuertemente positivo).
     - *Interacción híbrida*: Arrastre táctil continuo del slider o pulsación rápida en los 5 botones de anclaje (*presets* táctiles para 1 solo clic en mobile).
  5. **Revelación Post-Confirmación (Panel de 15 Expertos)**:
     - **Histograma de Distribución de Expertos**: Gráfico animado de barras que muestra cómo votaron los 15 especialistas, destacando la moda y la posición del estudiante.
     - **Puntaje de Concordancia de Charlin**:
       $$\text{Concordance Score} = \frac{\text{Votos de expertos para la opción del alumno}}{\text{Moda del panel de expertos}} \times 100\%$$
     - **Racional Clínico del Consenso**: Análisis detallado de por qué el panel se distribuyó de esa manera, explicando la evidencia clínica que respalda la decisión y las razones de disenso entre especialistas.
- **Escenarios**:
  - `Cardio`: Troponina con delta en NSTEMI dudoso, Dímero-D negativo en Wells intermedio de TEP, y Troponina positiva en Pericarditis aguda.
  - `Sepsis`: Factores sociales e hipoxemia leve en CURB-65 bajo, antibioterapia urgente previa a TAC en sospecha de meningitis, e infección de catéter en neutropenia febril.
  - `Abdomen`: Prueba de embarazo positiva en sospecha de apendicitis, hiperlactatemia en obstrucción por bridas, y colédoco dilatado con colestasis en colecistitis.
- **Evidencia generada para el modelo del estudiante**:
  - `expert_concordance_score`: Grado de alineación con el consenso de la especialidad.
  - `uncertainty_tolerance`: Capacidad de modular hipótesis intermedias sin caer en extremos binarios injustificados.
  - `cognitive_overconfidence_index`: Tendencia a sobrestimar la certeza en zonas grises de la medicina.
  - `bayesian_update_accuracy`: Precisión en la dirección y magnitud del cambio de probabilidad.

---

### Juego 06: Clinical Vignette MCQ · Ficha EHR Interactiva & Análisis de Distractores

- **Identificador**: `game-06-clinical-vignette-mcq`
- **Inspiración / Referencia**: Formato de viñetas clínicas de alta fidelidad tipo USMLE Step 2 CK, MIR y exámenes de certificación de especialidad, integrados con la metodología de razonamiento dual (Kahneman Sistema 1 vs Sistema 2) y análisis post-hoc de sesgos cognitivos.
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Toma de decisiones diagnósticas y terapéuticas complejas mediante discriminación rigurosa de distractores verosímiles y trampas de razonamiento clínico*.
  - **Problema que resuelve**: Los exámenes de opción múltiple convencionales suelen reducirse a adivinación o memorización de palabras clave ("buzzwords"), sin que el estudiante entienda por qué una conducta plausible está contraindicada o es prematura en una etapa específica. Este juego presenta el caso clínico en una **Ficha Médica Electrónica (EHR)** viva con monitor de constantes vitales, semiología estratificada y estudios paraclínicos interactivos. Al seleccionar una opción con 1 solo clic, el sistema revela no solo la justificación del estándar de oro, sino una disección fisiopatológica de cada distractor ("por qué NO"), la perla de examen de alto rendimiento y la actualización bayesiana.
- **Mecánica Interactiva (Mobile-First · 100% Clics)**:
  1. **Ficha Clínica EHR (Electronic Health Record)**:
     - **Cabecera de Especialidad & Gravedad**: ETIQUETA de departamento (`Cardiología Crítica`, `Infectología`, `Nefrología / UCI`) y código de severidad (`🔴 Código Rojo`, `🟠 Riesgo Neurológico`, `🟡 Riesgo Séptico`).
     - **Tira de Signos Vitales Dinámicos**: Presión arterial, frecuencia cardíaca, frecuencia respiratoria, saturación de $O_2$ y temperatura con código cromático de alerta fisiológica.
     - **Narrativa Clínica Semiológica**: Descripción precisa del motivo de consulta, curso evolutivo y hallazgos cardinales del examen físico.
     - **Tabs Rápidos de Paraclínicos**: Pestañas conmutables para explorar `🧪 Laboratorio`, `🩻 Imágenes & ECG` y `🩺 Examen Físico Clave` sin saturar la pantalla.
  2. **Pregunta Focal de Decisión**:
     - Pregunta clínica de alta discriminación orientada a la conducta inmediata más determinante para la sobrevida o el estándar diagnóstico de oro.
  3. **Baraja de 5 Opciones Interactivas (A, B, C, D, E)**:
     - Selección directa con 1 solo toque/clic.
     - *Acierto en primer intento*: Resalte esmeralda con aura, insignia `✓ Estándar de Oro`, sonido de victoria armónico, otorgamiento de `+120 XP ✨`, incremento del combo de racha (`🔥 x2`) y desbloqueo del logro `🎓 Maestro del Board`.
     - *Distractor seleccionado*: Resalte carmesí con animación de temblor (`shake`), insignia `✗ Distractor de Riesgo`, sonido de advertencia y reinicio de racha a `x1` sin frustración punitiva.
  4. **Panel Pedagógico de Desglose Clínico**:
     - **Veredicto Clínico**: Resumen del acierto o la trampa cognitiva implicada.
     - **Estándar de Oro**: Justificación mecanicista y basada en guías clínicas (AHA/ACC, IDSA, KDIGO, Berlin ARDS, ESO/AHA-ASA).
     - **Desglose Exhaustivo de Distractores**: Análisis individual de cada una de las opciones incorrectas, explicando por qué son letales, ineficaces o prematuras en ese contexto.
     - **Perla de Examen (USMLE Board Pearl)**: Cuadro dorado con regla mnemotécnica o concepto de alto rendimiento ("high-yield").
- **Casos Clínicos Incluidos**:
  1. *Cardiología de Urgencias*: Don Hernando, 66 años · Ruptura de músculo papilar posteromedial post-IAM inferior vs CIV (Ecocardiograma urgente + Balón de contrapulsación intraaórtico BCIAo + Cirugía de emergencia).
  2. *Nefrología & Cuidados Críticos*: Doña Teresa, 68 años · Hiponatremia severa sintomática con convulsiones por SIADH paraneoplásico (Bolo de solución salina al 3% con límite de seguridad $\le 8\text{ mEq/L}$ en 24h para prevenir mielinolisis pontina central).
  3. *Medicina Crítica & UCI*: Don Gustavo, 52 años · SDRA severo secundario a choque séptico por peritonitis (Ventilación protectora con $V_t$ 6 mL/kg PBW, presión meseta $\le 30\text{ cmH}_2O$ y driving pressure $<15\text{ cmH}_2O$).
  4. *Infectología & Medicina Interna*: Don Camilo, 34 años · Endocarditis infecciosa aguda tricuspídea en usuario de drogas parenterales (3 series de hemocultivos seriados de sitios periféricos antes de antibióticos empíricos según Criterios de Duke).
  5. *Neurología Vascular & Neurointervención*: Doña Marina, 72 años · ACV isquémico agudo con oclusión de gran vaso en segmento M1 dentro de ventana de 90 minutos (Trombólisis intravenosa inmediata + activación simultánea de trombectomía mecánica endovascular "bridging therapy").
- **Evidencia generada para el modelo del estudiante**:
  - `first_pass_mcq_accuracy`: Tasa de resolución correcta al primer intento sin descarte previo.
  - `distractor_vulnerability_index`: Tipo de trampa cognitiva en la que cae con mayor frecuencia (ej. iatrogenia por sobredosificación rápida vs retraso por estudios innecesarios).
  - `guideline_adherence_score`: Grado de fidelidad a las guías clínicas de práctica médica contemporáneas.
  - `clinical_prioritization_accuracy`: Habilidad para jerarquizar el orden cronológico de intervenciones en emergencias vitales.

---

### Juego 07: Anatomical Structure Spotter · Detección Espacial en Figuras Médicas (Hotspot Pinpoint)

- **Identificador**: `game-07-anatomical-structure-spotter`
- **Inspiración / Referencia**: Estaciones de anatomía práctica (OSCE / ECOE), atlas radiológicos de alta resolución (Netter, Rohen, Radiopaedia) y preguntas de identificación visual tipo USMLE Step 1 / Step 2 CK.
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Reconocimiento visual topográfico, relaciones espaciales anatómicas y correlación clínico-quirúrgica inmediata*.
  - **Problema que resuelve**: Con frecuencia los estudiantes estudian anatomía de forma verbalizada y aislada ("la arteria basilar se bifurca en las cerebrales posteriores"), pero fracasan al enfrentarse a una angiografía, un corte transversal o un campo quirúrgico real. Este juego entrena la identificación visual directa: el sistema presenta un esquema o diagrama médico vectorial de alta fidelidad con zonas activas (hotspots) y reta al alumno a localizar estructuras anatómicas con 1 solo toque, brindando correlaciones funcionales y perlas de examen.
- **Mecánica Interactiva (Mobile-First · 100% Clics / Taps)**:
  1. **Lienzo de Figura Médica Vectorial (SVG)**:
     - Ilustraciones anatómicas limpias y optimizadas para visualización médica oscura (Dark Blueprint).
     - Zonas interactivas activas (`.g07-hotspot`) que responden al cursor o al tacto con halo de selección y tooltip identificativo.
  2. **Banner de Misión Anatómica**:
     - Nombre de la estructura a localizar (ej. *Arteria Comunicante Anterior*, *Válvula Mitral*, *Ampolla de Vater*).
     - Objetivo semiológico o patológico que orienta la búsqueda.
     - Botón `💡 Ver Pista Espacial` que despliega relaciones topográficas inmediatas si el usuario duda.
  3. **Interacción y Feedback Instantáneo**:
     - *Toque correcto*: Bloqueo visual en verde esmeralda (`#10b981`), sonido armónico de éxito, `+100 XP ✨` flotante, incremento de combo de racha (`🔥 x3`) y despliegue del panel pedagógico.
     - *Toque incorrecto*: Resplandor rojo temporal con animación de temblor (`shake`), audio de advertencia y aviso contextual: *"Has tocado: [Estructura X]. Busca: [Estructura Objetivo]"*. Reinicio de racha a `x1` sin pérdida de XP.
  4. **Panel de Revelación Anatómico-Clínica**:
     - **Nombre Oficial**: Terminología Anatómica Internacional (Latín / Español).
     - **Relaciones Clave**: Vasos, nervios o fascias adyacentes de alta relevancia operatoria.
     - **Correlación Clínica**: Síndromes de compresión, áreas de infarto, sitios de aneurismas o abordajes percutáneos.
     - **Perla de Examen (USMLE Board Pearl)**: Puntos mnemotécnicos de alto rendimiento para exámenes de residencia.
- **Figuras Anatómicas Incluidas**:
  1. **Polígono de Willis & Angio-Anatomía Cerebral**: Arteria Comunicante Anterior (ACoA), Arteria Comunicante Posterior (ACoP), Arteria Basilar, Arteria Cerebral Media (ACM), Arteria Cerebelosa Posteroinferior (PICA), Vertebrales y Carótida Interna.
  2. **Anatomía Interna del Corazón (Corte Frontal 4 Cámaras)**: Válvula Mitral (Bicúspide), Válvula Aórtica, Tabique Interventricular Membranoso (CIV), Aurícula Izquierda y Válvula Tricúspide.
  3. **Vía Biliar Extrahepática & Complejo Duodenal**: Conducto Colédoco, Ampolla de Vater / Esfínter de Oddi (CPRE), Conducto Cístico (Triángulo de Calot), Vesícula Biliar y Cabeza del Páncreas (Whipple).
- **Evidencia generada para el modelo del estudiante**:
  - `spatial_recognition_latency`: Tiempo de reacción hasta localizar el blanco anatómico.
  - `topographic_confusion_errors`: Confusión entre estructuras contralaterales, homólogas o adyacentes (ej. ACoA vs ACoP).
  - `unassisted_hotspot_accuracy`: Aciertos directos sin solicitar la pista espacial.
  - `radiological_spatial_competence`: Destreza en la interpretación de diagramas y proyecciones espaciales.

---

### Juego 08: Therapeutic Space Shooter · Selección de Tratamiento en 4 Balas

- **Identificador**: `game-08-therapeutic-space-shooter`
- **Inspiración / Referencia**: Videojuegos arcade clásicos de naves espaciales (*Space Invaders / Galaga*), fusionados con el entrenamiento de reflejos terapéuticos y correspondencia farmacodinámica inmediata.
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Prescripción farmacológica rápida de precisión bajo estrés temporal y evitación activa de iatrogenias*.
  - **Problema que resuelve**: En situaciones agudas o de guardia médica (urgencias, shock séptico, crisis gotosa, sobredosis toxicológica), la selección del tratamiento no permite demoras deliberativas prolongadas; el médico debe emparejar instantáneamente la condición patológica con su fármaco de primera línea evitando fármacos ineficaces o contraindicados. Este juego gamifica ese reflejo: oleadas de patologías descienden hacia la línea de emergencia y el jugador pilota una nave defensora que debe conmutar velozmente entre 4 tipos de balas farmacológicas especializadas para destruirlas.
- **Mecánica Interactiva (Arcade Clínico · Cañón Central Fijo · 100% Clics & Auto-Targeting)**:
  1. **Torreta Defensora Fija Central (Zero Desplazamiento Lateral)**:
     - El usuario **no tiene que mover la nave de un lado a otro**. La batería de defensa permanece fija en la base inferior central (`canvas.width / 2`), con un búnker acorazado y cañones gemelos giratorios.
     - **Sistema de Rastreo Automático (Auto-Lock)**: El cañón detecta y bloquea automáticamente la amenaza clínica más prioritaria (la que ha descendido más cerca de la línea de emergencia), desplegando una retícula HUD con corchetes animados `[ 🎯 LOCK-ON ]` y un haz láser guía.
     - **Fijación Manual Táctil**: El usuario también puede tocar directamente cualquier invasor en pantalla para seleccionarlo y dispararle de inmediato.
  2. **Arsenal de 4 Balas / Cañones Farmacológicos**:
     - Barra de 4 botones táctiles grandes en la base de la pantalla:
       * **Bala 1 (Azul 🔵)**: Antimicrobiano / Antídoto de primera línea (ej. *Dicloxacilina* / *Vancomicina* / *N-Acetilcisteína*).
       * **Bala 2 (Verde 🟢)**: Antiinflamatorio / Antagonista específico (ej. *Colchicina* / *Meropenem* / *Naloxona*).
       * **Bala 3 (Púrpura 🟣)**: Inmunomodulador / Tópico luminal (ej. *Metotrexato* / *Fidaxomicina* / *Flumazenil*).
       * **Bala 4 (Dorado 🟡)**: Procedimiento descompresivo / Inótropo de rescate (ej. *Artrocentesis* / *Amoxicilina-Clavulanato* / *Glucagón*).
     - *Doble control*: Pulsar cualquier botón de tratamiento o presionar las teclas numéricas `1`, `2`, `3` o `4` orienta la torreta y dispara instantáneamente un proyectil de plasma teledirigido de alta velocidad hacia el objetivo bloqueado.
  3. **Física de Impacto & Detección de Iatrogenia**:
     - *Impacto con la bala correcta (Gold Standard)*: Explosión de partículas vectoriales, sonido de impacto potente, otorgamiento de `+150 XP` multiplicado por el combo de racha (`🔥 x2`, `🔥 x3`, `⚡ x4 MEGA COMBO`) y eliminación instantánea del invasor.
     - *Impacto con bala incorrecta (Iatrogenia / Ineficacia)*: El invasor despliega un escudo deflector hexagonal con sonido de rebote metálico, aviso flotante `¡RESISTENTE / IATROGENIA!` y reinicio del multiplicador de racha.
     - *Brecha en la línea de defensa*: Si una patología no es neutralizada y toca la línea inferior, se pierde 1 corazón de integridad de escudo (❤️ ❤️ ❤️).
  4. **Oleadas Temáticas Incluidas**:
     - **Oleada 1: Artropatías Agudas & Reumatología**: Artritis Séptica (*Dicloxacilina*), Ataque de Gota (*Colchicina*), Artritis Reumatoide (*Metotrexato*) y Derrame a Tensión (*Artrocentesis*).
     - **Oleada 2: Infectología & Bacterias**: MRSA (*Vancomicina*), Pseudomonas (*Meropenem/Pip-Tazo*), C. difficile (*Fidaxomicina*) y Neumococo (*Amoxicilina-Clavulanato*).
     - **Oleada 3: Toxicología & Antídotos de Rescate**: Sobredosis de Paracetamol (*N-Acetilcisteína*), Opioides (*Naloxona*), Benzodiacepinas (*Flumazenil*) y Betabloqueantes (*Glucagón*).
- **Evidencia generada para el modelo del estudiante**:
  - `therapeutic_reaction_time`: Milisegundos transcurridos desde la aparición de la patología hasta el disparo certero.
  - `iatrogenic_mismatch_rate`: Proporción de disparos con fármacos contraindicados o ineficaces para esa condición.
  - `pharmacological_switching_accuracy`: Destreza cognitiva para conmutar entre familias de medicamentos sin titubeos.
  - `sustained_therapeutic_streak`: Longitud máxima de la racha continua de tratamientos sin errores.

---

### Juego 09: Therapeutic Synapse Match · Conector Etiología ↔ Tratamiento (Dos Columnas)

- **Identificador**: `game-09-therapeutic-synapse-match`
- **Inspiración / Referencia**: Conectores neuro-sinápticos de emparejamiento conceptual, cuadros de antibiogramas de primera línea tipo Sanford Guide to Antimicrobial Therapy y preguntas de correspondencia directa tipo USMLE Step 1 / Step 2 CK y MIR.
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Asociación directa, memoria de trabajo de esquemas terapéuticos de primera línea y correspondencia microbiológico-farmacológica*.
  - **Problema que resuelve**: En la práctica clínica y exámenes de alto rendimiento, los médicos deben emparejar con absoluta precisión el patógeno causal con el antibiótico o antídoto específico sin dudar (ej. *Listeria* $\rightarrow$ *Ampicilina*; *MRSA* $\rightarrow$ *Vancomicina*; *Paracetamol* $\rightarrow$ *N-Acetilcisteína*). El error o titubeo conduce a fallas terapéuticas por resistencias intrínsecas o retrasos críticos. Este juego presenta dos columnas vivas y un lienzo central de cables sinápticos elásticos SVG que permite conectar cada etiología con su terapia estándar de oro tanto por pulsación directa (1 solo toque por lado) como por arrastre elástico (*drag-and-drop*).
- **Mecánica Interactiva (Mobile-First · Híbrido Tap-to-Connect & Drag-and-Drop)**:
  1. **Estructura de Dos Columnas**:
     - **Columna Izquierda (Etiología / Patógeno)**: Fichas clínicas con icono semiológico, etiqueta microbiológica (`Gram+ Resistente`, `Gram- Oportunista`, `Hongo Atípico`, `Toxicología`), nombre del patógeno y clave patogénica (ej. *Gen mecA / PBP2a*, *Toxinas A y B post-antibióticos*, *Metabolito NAPQI*). Pin de conexión derecho (`.socket-pin`).
     - **Columna Derecha (Tratamiento de Elección)**: Fichas barajadas aleatoriamente con icono del fármaco, nombre del principio activo, vía de administración (`Infusión IV`, `Oral Tópica`, `Intramuscular`) y mecanismo de acción farmacodinámico. Pin de recepción izquierdo.
  2. **Doble Modalidad de Interacción**:
     - *Modo 1 · Tap-to-Connect (100% Clics / Táctil)*: Toca una tarjeta en la izquierda (se ilumina con aura cian y pulso en el pin) y luego toca su tratamiento correspondiente en la derecha.
     - *Modo 2 · Arrastre Elástico SVG (Drag & Drop)*: Arrastra el cursor o el dedo desde el pin de la izquierda hacia la tarjeta derecha; un cable elástico animado sigue la trayectoria en tiempo real.
  3. **Validación Dinámica & Feedback Fisiopatológico**:
     - *Enlace Correcto (Gold Standard)*: El cable se vuelve verde esmeralda brillante (`#10b981`), las dos fichas quedan bloqueadas en estado acoplado con insignia `✓ CONECTADO`, se reproduce un acorde musical armónico, se dispara un chip flotante `+100 XP ✨`, se incrementa la racha (`🔥 x2`, `🔥 x3`) y se despliega un panel inferior con la justificación farmacodinámica y la perla de examen.
     - *Enlace Incorrecto (Discrepancia / Resistencia)*: El cable parpadea en rojo carmesí (`#f43f5e`), ambas fichas vibran (`shake`), el cable se desvanece, se reproduce un audio de advertencia y se reinicia la racha a `x1` explicando por qué ese esquema no cubre esa etiología.
  4. **Categorías Temáticas Incluidas**:
     - **Set 1: Bacteriología & Resistencia Antibiótica**: *S. aureus MRSA* $\leftrightarrow$ *Vancomicina*, *P. aeruginosa* $\leftrightarrow$ *Meropenem/Pip-Tazo*, *C. difficile* $\leftrightarrow$ *Fidaxomicina*, *Listeria monocytogenes* $\leftrightarrow$ *Ampicilina*, *S. pneumoniae* $\leftrightarrow$ *Amoxicilina/Ceftriaxona*, *Treponema pallidum* $\leftrightarrow$ *Penicilina G Benzatínica*.
     - **Set 2: Atípicos, Hongos & Oportunistas**: *Pneumocystis jirovecii* $\leftrightarrow$ *TMP-SMX*, *Legionella pneumophila* $\leftrightarrow$ *Levofloxacino/Azitromicina*, *Aspergillus fumigatus* $\leftrightarrow$ *Voriconazol*, *Cryptococcus neoformans* $\leftrightarrow$ *Anfotericina B Liposomal + Flucitosina*, *Toxoplasma gondii* $\leftrightarrow$ *Sulfadiazina + Pirimetamina*, *Mycobacterium tuberculosis* $\leftrightarrow$ *Esquema RIPE*.
     - **Set 3: Urgencias Clínicas & Antídotos Específicos**: *Intoxicación Paracetamol* $\leftrightarrow$ *N-Acetilcisteína*, *Sobredosis Opioides* $\leftrightarrow$ *Naloxona*, *Hiperpotasemia con ECG patológico* $\leftrightarrow$ *Gluconato de Calcio*, *Cetoacidosis Diabética* $\leftrightarrow$ *Insulina Cristalina IV*, *Shock Anafiláctico* $\leftrightarrow$ *Adrenalina IM*, *SCACEST <12h* $\leftrightarrow$ *Angioplastia Primaria (ICP)*.
  5. **Victoria de Set & Matriz Resumen**:
     - Al completar los 6 pares del set, se activa una celebración con confeti vectorial, bonificación de `+250 XP` y un modal de revisión con la tabla exhaustiva de todas las correspondencias terapéuticas y sus perlas clínicas.
- **Evidencia generada para el modelo del estudiante**:
  - `pairing_accuracy_rate`: Proporción de pares acertados al primer intento sin enlaces erróneos.
  - `etiology_confusion_matrix`: Matriz de confusión que mapea con qué patógenos o clases de antibióticos tropieza el estudiante.
  - `first_line_guideline_fidelity`: Nivel de adherencia a esquemas de primera elección recomendados por guías internacionales (IDSA, ATS, AHA, CDC).
  - `connection_speed_latency`: Tiempo de asociación mental entre el reconocimiento etiológico y la selección del fármaco.

---

### Juego 10: Clinical MythBuster (Verdadero / Falso Clínico · Swipe de Juicio Crítico)

- **Identificador**: `game-10-clinical-mythbuster`
- **Inspiración / Referencia**: Formato de tarjetas rápidas con deslizamiento táctil (swipe style tipo Tinder) combinado con *Medical MythBusting* de guías internacionales (AHA, IDSA, KDIGO, Surviving Sepsis) y trampas clásicas de exámenes de residencia (USMLE Pearls & Pitfalls, MIR, ENARM).
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Detección ágil de dogmas médicos erróneos, contraindicaciones farmacológicas absolutas y superación de sesgos de representatividad*.
  - **Problema que resuelve**: Los médicos memorizan con frecuencia "dogmas obsoletos" o atajos heurísticos que en escenarios reales causan iatrogenia (ej. administrar flumazenil de rutina en comas por benzodiacepinas en pacientes crónicos provocando estatus epiléptico; prescribir nitrofurantoína en pielonefritis cuando no alcanza tejido renal; hiperventilar agresivamente en TEC provocando isquemia cerebral secundaria). Este juego entrena al clínico a tomar decisiones binarias instantáneas y seguras bajo presión, reforzando de inmediato el sustento fisiopatológico del por qué una afirmación es falsa o verdadera y advirtiendo sobre la trampa de examen más frecuente.
- **Mecánica Interactiva (Swipe Táctil + Botones de Decisión a 1-Clic)**:
  1. **Arena Central de Deslizamiento (Swipe Deck Arena)**:
     - Tarjeta física activa flotando en perspectiva 3D con cartas "fantasma" en el fondo para dar sensación de profundidad y baraja real.
     - **Gestos Táctiles y de Ratón**:
       * *Deslizar a la Derecha*: Inclinación elástica con rotación positiva, borde verde esmeralda y estampilla emergente `VERDADERO`.
       * *Deslizar a la Izquierda*: Inclinación elástica con rotación negativa, borde rojo carmesí y estampilla emergente `FALSO`.
     - **Controles de Decisión a 1-Clic**: Botones gigantes ergonómicos (`✗ FALSO [F / ◀]` y `✓ VERDADERO [V / ▶]`) accesibles en pantalla táctil o con atajos de teclado instantáneos.
  2. **Panel de Revelación & Desglose Fisiopatológico (MythBuster Breakdown)**:
     - Al tomar la decisión, la carta ejecuta la animación de deslizamiento y se despliega de inmediato:
       * **Veredicto Clínico**: Acierto o discrepancia con el veredicto oficial.
       * **Racional Fisiopatológico**: Explicación mecanicista basada en farmacocinética, hemodinámica o evidencia clínica.
       * **Trampa Frecuente de Examen (Exam Trap / Clinical Pitfall)**: Advertencia explícita sobre la falacia mental típica que hace caer a los estudiantes en pruebas tipo Board.
       * Botón de avance fluido (`Siguiente Ficha →` o teclado `Enter` / `Barra espaciadora`).
  3. **Categorías Temáticas y Rondas Incluidas**:
     - **Ronda 01: Farmacología & Contraindicaciones Críticas**:
       * *Nitrofurantoína en pielonefritis* (Falso: solo cistitis baja, concentración tisular renal nula).
       * *Flumazenil rutinario en coma por benzos en usuario crónico* (Falso: precipita estatus epiléptico fatal).
       * *Betabloqueo previo a vasodilatadores en disección aórtica tipo A* (Verdadero: control de dP/dt para prevenir rotura).
       * *AINEs en cirrosis descompensada con ascitis* (Falso: inhiben PGE2/PGI2 renales y causan síndrome hepatorrenal).
       * *Insulina en CAD con potasio < 3.3 mEq/L* (Verdadero: posponer insulina hasta reponer K+ para evitar paro).
       * *Vancomicina oral en bacteriemia por MRSA* (Falso: biodisponibilidad sistémica <5%, solo para *C. difficile*).
     - **Ronda 02: Urgencias Clínicas & Reanimación ACLS**:
       * *Atropina en asistolia / AESP en ACLS* (Falso: retirada formalmente por guías AHA en 2010 por falta de beneficio).
       * *Descompresión inmediata en neumotórax a tensión antes de Rx* (Verdadero: emergencia 100% clínica).
       * *Pausas 30:2 durante RCP en paciente intubado* (Falso: compresiones continuas 100-120 cpm sin pausas).
       * *Descarga sincronizada en FV sin pulso* (Falso: la FV no tiene onda R; debe ser desfibrilación asincrónica).
       * *Bolo inicial de 30 mL/kg en shock séptico en primeras 3 horas* (Verdadero: recomendación Surviving Sepsis).
       * *Hiperventilación agresiva profiláctica en TEC severo* (Falso: vasoconstricción cerebral e isquemia secundaria).
     - **Ronda 03: Diagnóstico Clínico & Paraclínicos**:
       * *Dímero-D normal con Wells bajo descarta TEP sin angioTAC* (Verdadero: VPN >98%).
       * *Ausencia de fiebre en anciano descarta neumonía o sepsis* (Falso: 30-40% debutan con delirio o hipotermia).
       * *Relación glucosa LCR/sérica < 0.4 en meningitis bacteriana* (Verdadero: consumo por PMNs y bacterias).
       * *Troponina elevada confirma unívocamente IAM tipo 1 por rotura de placa* (Falso: inespecífica de causa, sube en TEP, sepsis, etc.).
       * *Gram negativo en líquido sinovial descarta artritis séptica* (Falso: sensibilidad de Gram es de apenas 50-60%).
       * *Síndrome de lisis tumoral cursa con hipocalcemia secundaria* (Verdadero: precipitación con fosfato liberado).
  4. **Resumen de Ronda & Desglose Global**:
     - Modal de victoria con lluvia de confeti vectorial, bonificación de `+250 XP`, logro desbloqueable `⚡ Cazador de Dogmas` y tabla consolidada de las 6 aseveraciones evaluadas con sus veredictos, justificaciones y advertencias de examen.
- **Evidencia generada para el modelo del estudiante**:
  - `cognitive_bias_susceptibility`: Tendencia a aceptar dogmas médicos superados frente a medicina basada en evidencia.
  - `contraindication_alertness`: Capacidad de identificar fármacos con riesgo iatrogénico inminente (AINEs en cirrosis, flumazenil en benzos crónicas).
  - `decision_latency_binary`: Tiempo de respuesta ante juicios clínicos urgentes.
  - `clinical_myth_resolution_index`: Proporción de mitos correctamente detectados y fundamentados.

---

### Juego 11: Patient Cluster Matrix (Clasificación por Diagnósticos & Estratificación de Severidad)

- **Identificador**: `game-11-patient-cluster-matrix`
- **Inspiración / Referencia**: Sistemas de estratificación de severidad y toma de decisiones pronósticas (CURB-65 / Criterios ATS-IDSA para NAC, Clasificación de Atlanta revisada para Pancreatitis, Criterios de ingreso a UCI/Sepsis-3, y algoritmos de abordaje sindromático del Dolor Torácico de la ESC y AHA).
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Estratificación pronóstica de severidad, asignación de nivel de intensidad asistencial y clustering diagnóstico diferencial bajo criterios de guías de práctica clínica*.
  - **Problema que resuelve**: Uno de los déficits más marcados en la transición de estudiante a médico de guardia es la incapacidad de clasificar adecuadamente la gravedad del paciente y elegir el nivel de cuidados o familia diagnóstica pertinente. Los dos errores cardinales son:
    1. **Sub-triage (Subestimación del riesgo)**: Enviar a domicilio o a sala común a un paciente con shock séptico incipiente, neumonía con CURB-65 alto o pancreatitis con fallo orgánico persistente (causando parada cardíaca o deterioro no monitorizado).
    2. **Sobre-triage (Consumo ineficiente de recursos)**: Ingresar en UCI a un paciente de bajo riesgo que cumple criterios de manejo ambulatorio o sala general, saturando camas críticas y exponiéndolo a infecciones nosocomiales.
- **Mecánica Interactiva (Arquitectura Cockpit en 2 Columnas · Palitroque & Vértices de Triángulo Holográfico Zero-Scroll)**:
  1. **Disposición Cockpit Zero-Scroll (Todo Visible en Pantalla sin Slider)**:
     - **Columna Izquierda (Dossier Clínico Compacto)**: Ficha EHR con avatar de paciente, constantes vitales en monitor continuo (PA, FC, FR, SatO₂, Temp, Glasgow), viñeta clínica estructurada, clave discriminadora resaltada y panel docked de revelación inmediata post-triage.
     - **Columna Derecha (Arena de Constelación de Vértices)**:
       * **Podio Central con Peón "Palitroque"**: Un avatar estilizado de cuerpo entero (*el Palitroque*) que representa al paciente en el centro de la arena holográfica.
       * **Clusters en los Vértices de un Triángulo Imaginario (o Cuadrado)**: En lugar de apilarse verticalmente (lo que provocaba scroll vertical), las 3 bahías circulares se sitúan en los vértices de un triángulo equilátero/isósceles: Vértice 0 (Cúspide superior), Vértice 1 (Inferior izquierdo), Vértice 2 (Inferior derecho). En rondas de 4 clusters se disponen en los 4 cuadrantes de un cuadrado.
       * **Constelación Holográfica SVG**: Vértices interconectados por líneas poligonales luminosas, radios dirigidos al centro y anillos concéntricos tipo radar médico.
  2. **Interacción del Peón / Palitroque y Detección Holográfica**:
     - **Drag & Drop Libre**: El estudiante arrastra al Palitroque desde el podio central y lo suelta directamente sobre el círculo/vértice elegido. El radar detecta la proximidad radial en tiempo real iluminando la zona con retroalimentación háptica y visual.
     - **Selección Rápida a 1-Clic o Teclado (`[1]`, `[2]`, `[3]`, `[4]`)**: Tocar cualquier círculo o pulsar `1`, `2`, `3` en el teclado hace que el Palitroque se desplace fluidamente en animación CSS hacia el vértice correspondiente.
     - **3 a 4 Bahías Circulares Codificadas por Severidad/Categoría**:
       * 🔴 **Cluster Crítico / Nivel UCI**: Fallo multiorgánico, soporte vasopresor/VMI, SCA o disección aórtica.
       * 🟡 **Cluster Urgente / Cuidados Intermedios**: Fallo transitorio $<48$h, riesgo moderado (CURB-65 = 2).
       * 🔵 **Cluster General / Sala de Planta**: Tratamiento parenteral supervisado sin inestabilidad.
       * 🟢 **Cluster Leve / Ambulatorio**: Bajo riesgo, resolución espontánea, manejo en domicilio con signos de alarma.
  3. **Panel de Revelación & Análisis de Triage**:
     - Al asignar al paciente, se despliega el veredicto con:
       * **Racional Clínico**: Explicación de la guía internacional de referencia (ATS, Atlanta, ESC).
       * **Alerta Específica de Sub-Triage vs Sobre-Triage**: Si el usuario yerra, el sistema le informa si su error fue de *subestimación de riesgo vital* o de *saturación de recursos críticos*.
  4. **Escenarios Clínicos y Rondas Incluidas**:
     - **Ronda 01: Estratificación de Severidad en Neumonía (CURB-65 / ATS-IDSA)**:
       * *Don Carlos (68a)*: Shock séptico con noradrenalina y $PaO_2/FiO_2=180$ $\rightarrow$ **NAC Severa · Ingreso a UCI** (Criterio mayor ATS).
       * *Lucas (26a)*: Joven sin comorbilidades con CURB-65 de 0 $\rightarrow$ **NAC Leve · Ambulatorio**.
       * *Doña Teresa (74a)*: Anciana con CURB-65 de 2 (edad + taquipnea) $\rightarrow$ **NAC Moderada · Sala General**.
       * *Martín (54a)*: Influenza con fallo ventilatorio inminente para VMI $\rightarrow$ **NAC Severa · Ingreso a UCI**.
       * *Sofía (38a)*: Neumonía atípica estable sin hipoxemia $\rightarrow$ **NAC Leve · Ambulatorio**.
       * *Don Alberto (79a)*: Delirio agudo + Urea 62 (CURB-65 = 3 sin shock) $\rightarrow$ **NAC Moderada · Sala General Monitorizada**.
     - **Ronda 02: Clusters Diagnósticos ante Dolor Torácico Agudo**:
       * *Don Fernando (62a)*: Supradesnivel ST anterior V1-V4 $\rightarrow$ **SCA / Oclusión Coronaria**.
       * *Héctor (56a)*: Dolor desgarrador interescapular + asimetría de pulsos $\rightarrow$ **Emergencia Aórtica / Pericardio** (Disección tipo A).
       * *Valeria (32a)*: Anticonceptivos + vuelo largo + dolor pleurítico y TVP $\rightarrow$ **Vascular Pulmonar / Pleural** (TEP).
       * *Andrés (28a)*: Dolor reproducible a la palpación condrocostal $\rightarrow$ **Digestivo / Osteomuscular** (Costocondritis).
     - **Ronda 03: Estratificación de Pancreatitis Aguda (Atlanta Revisado)**:
       * *Don Jorge (52a)*: Fallo multiorgánico persistente $>48$h (renal, respiratorio, shock) $\rightarrow$ **Pancreatitis Severa Crítica**.
       * *Gabriela (34a)*: Sin fallo de órgano ni colecciones peripancreáticas $\rightarrow$ **Pancreatitis Leve**.
       * *Don Manuel (61a)*: Fallo orgánico transitorio resuelto antes de 48h con colección estéril $\rightarrow$ **Pancreatitis Moderadamente Severa**.
- **Evidencia generada para el modelo del estudiante**:
  - `sub_triage_error_frequency`: Proporción de decisiones que subestiman la gravedad del paciente (indicador de seguridad asistencial).
  - `over_triage_error_frequency`: Proporción de decisiones que sobredimensionan el nivel de cuidados (indicador de eficiencia en gestión de camas).
  - `guideline_adherence_index`: Concordancia con escalas validadas internacionales (CURB-65, PSI, Atlanta, ATS-IDSA).
  - `diagnostic_clustering_accuracy`: Precisión al discriminar familias patológicas frente a un mismo síntoma guía (dolor torácico, abdomen agudo).

---

### Juego 12: Clinical Workflow Sequencer (Orden de Decisiones / Manejo Secuenciado)

- **Identificador**: `game-12-clinical-workflow-sequencer`
- **Inspiración / Referencia**: Algoritmos de soporte vital y bundles de reanimación crítica (Surviving Sepsis Campaign 1-Hour Bundle, ADA Standards of Care in Diabetes para Cetoacidosis, Guías AHA/ERC ACLS 2020 para Fibrilación Ventricular, Guías WAO/Resuscitation Council UK para Anafilaxia).
- **Propósito pedagógico / clínico**:
  - **Constructo**: *Priorización secuencial, precedencia temporal y prevención de inversiones iatrogénicas en el manejo agudo de emergencias médicas*.
  - **Problema que resuelve**: En medicina de urgencias, **hacer lo correcto en el orden equivocado resulta letal**. Los estudiantes frecuentemente conocen los fármacos necesarios de forma aislada, pero fallan en respetar los prerrequisitos fisiológicos y la línea temporal de prioridades:
    1. *Administrar insulina antes de corregir el potasio ($K^+ < 3.3$ mEq/L) en cetoacidosis diabética*: la bomba $Na^+/K^+$-ATPasa desplaza el potasio extracelular al interior del miocito, precipitando una fibrilación ventricular o parada cardíaca irreversible por hipopotasemia severa.
    2. *Administrar antibióticos antes de tomar los frascos de hemocultivos en shock séptico*: esteriliza la muestra de sangre en cuestión de minutos y destruye el rendimiento microbiológico para desescalar la terapia antibiótica.
    3. *Suspender la desfibrilación o retrasar la descarga en FV para intentar canalizar una vía periférica o administrar fármacos*: cada minuto sin choque en una FV presenciada reduce la supervivencia entre un 7% y 10%.
    4. *Administrar corticoides orales/IV creyendo que resolverán el shock o estridor anafiláctico agudo*: los corticoides tienen latencia genómica de 4 a 6 horas; la única intervención que salva la vida en el minuto 1 es la adrenalina intramuscular precoz en el muslo anterolateral.
- **Mecánica Interactiva (Línea de Tiempo de 4 Pasos + Banco de Cajitas Interactivas)**:
  1. **Dossier Clínico EHR Compacto**:
     - Nombre, edad, avatar semiológico, constantes vitales monitorizadas (PA, FC, FR, SatO₂, Temp, Glasgow) con alertas por colores (verde, ámbar, rojo).
     - **Hallazgo Pivote / Trampa Fisiopatológica**: Clave analítica explícita que determina la precedencia (ej. *$K^+ = 3.1$ mEq/L*, *PAM = 52 mmHg con lactato de 4.6*, *FV en monitor sin pulso*, *Estridor laríngeo y TA 70/38*).
  2. **Línea Temporal (Slots Cronológicos 1º a 4º)**:
     - 4 casilleros numerados (`Paso 01 · Prioridad Inmediata`, `Paso 02 · Estabilización / Pre-requisito`, `Paso 03 · Intervención Clave`, `Paso 04 · Continuidad y Protección`).
     - Cada casillero tiene borde pulsante receptor y admite **Drag & Drop** libre o **Auto-colocación con 1-clic** (al tocar una cajita en la bandeja, ocupa el primer paso libre).
     - Intercambio directo (*swap*) entre casilleros si se arrastra una acción sobre otra ya posicionada.
  3. **Bandeja de Cajitas Clínicas Disponibles (Action Pool)**:
     - Tarjetas barajadas al azar con insignia de categoría (*Hemodinamia*, *Electrolitos*, *Farmacoterapia*, *Diagnóstico*, *Soporte*, *Prevención*).
     - Botón de remoción instantánea `[✕]` para devolver cualquier tarjeta al banco.
  4. **Auditoría de Protocolo & Feedback Fisiopatológico de Seguridad**:
     - Al validar la secuencia, el sistema evalúa paso a paso:
       * **Veredicto por Paso**: Señalización de acierto (`✅`) o inversión (`❌`).
       * **Alerta Iatrogénica Específica**: Desglose del peligro vital exacto provocado por la inversión (ej. *⚠️ ¡PARO CARDÍACO POR HIPOPOTASEMIA!* o *⚠️ ¡PÉRDIDA DE RESCATE MICROBIOLÓGICO!*).
       * **Perla de Consenso Internacional**: Cita formal de la guía médica de referencia (ADA, Surviving Sepsis, AHA, WAO).
  5. **Escenarios Clínicos Incluidos**:
     - `Escenario 01`: Cetoacidosis Diabética (CAD) Severa ($K^+ < 3.3$, expansión salina $\rightarrow$ reposición $K^+$ $\rightarrow$ insulina $\rightarrow$ dextrosa tardía).
     - `Escenario 02`: Shock Séptico (Bundle 1h: lactato basal $\rightarrow$ hemocultivos x2 $\rightarrow$ antibiótico de amplio espectro $\rightarrow$ fluidos 30 ml/kg y noradrenalina).
     - `Escenario 03`: Paro Cardíaco ACLS en FV (desfibrilación inmediata 200J $\rightarrow$ RCP 2 min continuos sin chequear pulso $\rightarrow$ adrenalina 1 mg tras 2º ciclo $\rightarrow$ amiodarona 300 mg tras 3ª descarga).
     - `Escenario 04`: Anafilaxia Sistémica Grave (adrenalina IM muslo anterolateral $\rightarrow$ decúbito supino con elevación de piernas + $O_2$ 100% $\rightarrow$ fluidoterapia rápida $\rightarrow$ corticoides y antihistamínicos de 2ª línea).
- **Evidencia generada para el modelo del estudiante**:
  - `iatrogenic_inversion_rate`: Frecuencia de errores de inversión crítica que ponen en riesgo la vida del paciente.
  - `prerequisite_awareness_index`: Comprensión de prerrequisitos fisiológicos previos a la farmacoterapia (ej. volemia antes de vasopresores, electrolitos antes de hormonas).
  - `resuscitation_guideline_adherence`: Nivel de fidelidad a protocolos de reanimación internacionalmente validados (ACLS, Surviving Sepsis, ADA).
  - `decision_sequencing_latency`: Tiempo empleado para estructurar mentalmente y ejecutar la secuencia temporal completa.







