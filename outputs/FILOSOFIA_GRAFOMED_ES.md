---
title: "GrafoMed: explicación para alguien que acaba de llegar a la Tierra"
date: 2026-09-18
language: es
status: explanatory_report
authority: synthesis_of_confirmed_design_not_new_spec
pillars:
  - amauta-education
  - ai-enhancement
pillar_role:
  primary: amauta-education
  secondary:
    - ai-enhancement
---

# GrafoMed: explicación para alguien que acaba de llegar a la Tierra

## 1. Antes de empezar: qué estamos intentando construir

Los humanos tenemos cuerpos que pueden enfermar. La medicina intenta comprender esos cuerpos y ayudar a las personas mediante decisiones: qué investigar, cómo interpretar lo encontrado, cuándo intervenir y cuándo no hacerlo.

Para aprender medicina no basta con almacenar frases. Una persona puede recordar una explicación y no saber utilizarla cuando cambia la situación. También puede acertar una pregunta por casualidad, reconocer una respuesta que ya vio o resolver un problema solamente porque alguien le dio una pista.

**GrafoMed es un sistema educativo que quiere enseñar conocimiento médico, entrenar su uso y conservar evidencia de lo que cada estudiante ha demostrado.**

Su idea no es: «terminaste de leer, entonces ya sabes». Es: «te enseñamos algo; ahora observamos qué puedes hacer con ello, bajo qué condiciones y qué conviene practicar después».

Este documento explica la filosofía acordada y su relación con el prototipo local existente. No es una nueva especificación técnica, una demostración de eficacia educativa ni una certificación de competencia clínica.

## 2. Una comparación extraterrestre

Imagina que debes aprender a mantener una nave espacial.

Primero necesitas comprender cómo circula la energía. Después aprendes reglas para interpretar sus indicadores y procedimientos para comprobar los sistemas. Con esas herramientas puedes decidir qué circuito investigar ante una caída de potencia. Finalmente debes resolver una avería completa, combinando varias decisiones.

Leer sobre energía no equivale a reparar la nave. Ordenar correctamente una lista de comprobaciones tampoco demuestra que sepas ejecutarlas físicamente. Y reparar una avería conocida no garantiza que puedas resolver cualquier avería futura.

GrafoMed intenta respetar esas diferencias. En lugar de guardar únicamente una nota final, guarda qué se enseñó, qué se pidió hacer, cómo respondió el estudiante y cuánta ayuda recibió.

## 3. Su filosofía en una frase

**Enseñar para decidir; evaluar para orientar el siguiente aprendizaje, sin confundir un acierto con dominio.**

De esta frase se desprenden cinco compromisos:

1. Enseñar es parte del producto, no una tarea que se deja fuera de la aplicación.
2. El conocimiento tiene valor tanto por lo que explica como por lo que permite hacer.
3. Una capacidad importante debe practicarse en situaciones distintas.
4. Las conclusiones sobre el alumno deben poder justificarse con evidencia.
5. El sistema debe reconocer lo que todavía no sabe, tanto del contenido como del estudiante.

La aspiración es un «Duolingo médico»: aprendizaje breve, práctica frecuente y una ruta que responde al desempeño. Es una analogía de experiencia, no una afirmación de equivalencia ni una promesa de eficacia. La prioridad propuesta es aprender, no maximizar rachas o tiempo de pantalla.

## 4. Las piezas del mundo GrafoMed

### Cluster: el territorio

Un *cluster* es un contexto amplio que reúne capacidades relacionadas. Por ejemplo: fisiología tiroidea, es decir, cómo funciona un sistema hormonal del cuerpo.

El cluster responde: «¿En qué territorio estamos aprendiendo?». No es una pregunta ni una sola habilidad.

### Mastery: la capacidad integrada

Un *mastery* es un objetivo de desempeño que requiere combinar varias decisiones. Por ejemplo, interpretar de manera integrada el funcionamiento de un sistema a partir de información presentada.

Aunque lo llamemos *mastery atom*, no es una partícula indivisible: es una capacidad suficientemente delimitada para enseñarla y evaluarla como conjunto.

Hay que distinguir tres cosas: el objetivo de mastery, una actividad que lo evalúa y el estado de un estudiante respecto a ese objetivo. El objetivo existe aunque nadie lo haya logrado todavía.

### Decisión: una elección con propósito

Una decisión es un objetivo más específico: interpretar una situación y elegir una conclusión, una comprobación o una acción apropiada.

No es el enunciado de una pregunta. Una misma decisión puede aparecer en muchos escenarios. Si cada escenario se convierte en una habilidad totalmente nueva, el sistema pierde la posibilidad de reconocer lo que tienen en común.

Tampoco toda decisión debe ser una intervención física inmediata. Interpretar información puede cambiar lo que se investigará o hará después. En la app se responde a situaciones educativas; no se está modificando la realidad de un paciente.

### Concepto: una entrada para comprender

En el vocabulario educativo acordado, «concepto» designa una entrada de enseñanza: una lectura breve, un video, una explicación o un diagrama que aporta contexto y comprensión.

Conviene no confundirla con la entidad médica representada. Una explicación sobre una hormona es un recurso para aprender sobre esa hormona, no la hormona misma. Técnicamente, el prototipo distingue objetivos de contenido y unidades de enseñanza vinculadas a ellos.

Esta definición reemplaza la idea inicial de que concepto significaba «algo sin consenso». Un concepto puede estar muy bien establecido: aquí lo distingue su función de enseñanza.

### Hecho, regla o heurística: algo que se puede comprobar

Son conocimientos que el estudiante debe recuperar o aplicar y que pueden evaluarse directamente.

No son epistemológicamente idénticos. Un hecho es una afirmación; una regla expresa una relación o condición; una heurística es una orientación útil que puede tener excepciones. Agruparlos por su función educativa no los convierte en verdades universales.

Por eso requieren alcance, condiciones, fuentes y revisión. «Está guardado en la base» no significa «es verdadero en todos los casos».

### Procedimiento: una manera organizada de hacer algo

Un procedimiento reúne pasos, agrupaciones o comprobaciones. Puede practicarse ordenando elementos, identificando omisiones o agrupando acciones.

No siempre existe un único orden correcto: algunas tareas permiten pasos intercambiables. Además, conocer una secuencia no equivale a ejecutar una destreza física con seguridad. La evaluación debe declarar qué demuestra realmente.

## 5. Cómo se conectan

Una vista simplificada sería:

```text
Cluster: funcionamiento de una nave
├── Mastery A: localizar una falla de energía
│   ├── Decisión 1: interpretar los indicadores
│   └── Decisión 2: elegir la comprobación siguiente
└── Mastery B: comprobar la recuperación del sistema
    ├── Decisión 1: interpretar los indicadores [la misma]
    └── Decisión 3: determinar si hace falta otra comprobación

Conceptos, reglas y procedimientos → apoyan las decisiones.
Varias decisiones → se integran en un mastery.
```

El dibujo parece un árbol, pero el sistema real es un **grafo**: una red de elementos y relaciones. La decisión 1 puede participar en dos masteries. Una regla puede apoyar varias decisiones. Una explicación puede reutilizarse en distintos contextos.

Compartir no significa copiar. El elemento conserva su identidad y tiene varias conexiones. Así, una corrección del contenido no obliga a mantener numerosas copias independientes.

El conocimiento básico —fisiología, bioquímica, anatomía— no desaparece. Aporta explicaciones, relaciones y procedimientos que permiten razonar. No necesitamos disfrazar cada fragmento de ciencia como si fuera una decisión terapéutica.

## 6. Cómo vive esto un estudiante

Una secuencia educativa posible es:

1. Recibe una explicación breve.
2. Ve un ejemplo resuelto y la razón de sus pasos.
3. Practica con apoyo.
4. Resuelve una variante con menos ayuda.
5. Intenta una decisión de manera independiente.
6. Combina varias decisiones en un caso.
7. Regresa después para comprobar qué conserva y qué puede aplicar de nuevo.

Esta secuencia no debe convertirse en una escalera obligatoria idéntica para todos. Si existe evidencia suficiente, el alumno puede necesitar menos apoyo. Si se atasca, necesita enseñanza útil, no solamente otra pregunta igual.

Por ejemplo, ante un error, la app puede ofrecer otra explicación, mostrar un contraste o comprobar una regla concreta. Pero no debe concluir automáticamente «no comprende el concepto X». Una misma respuesta incorrecta puede tener causas diferentes.

La adaptación comienza con una pregunta prudente: «¿Qué pequeña comprobación nos permitiría entender mejor este error?».

## 7. Qué significa conocer al alumno

GrafoMed no lee la mente. «Conocer al alumno» significa conservar un historial interpretable de sus interacciones y usarlo para formular conclusiones limitadas.

Importa distinguir:

- Haber visto una explicación.
- Haber resuelto con ayuda.
- Haber resuelto sin ayuda registrada.
- Haberlo conseguido en situaciones diferentes.
- Haber integrado varias decisiones.
- Haberlo repetido después de un intervalo.

Estas dimensiones no deberían desaparecer detrás de un único porcentaje.

«Resuelto con ayuda» es una descripción más precisa que «dominado con ayuda». La ayuda es valiosa para aprender, pero cambia lo que podemos concluir del resultado. Incluso «sin ayuda» significa, en el prototipo local, sin ayuda registrada por la app: no podemos observar apoyos externos.

Una comunicación honesta del logro sería, como ejemplo de diseño:

> “Resolviste esta decisión sin pistas registradas en dos situaciones. Todavía falta comprobarla después de unos días y dentro de un problema integrado.”

El número de situaciones de ese ejemplo no es un umbral validado. El mensaje muestra el principio: informar evidencia y límites, no proclamar competencia general.

Un fallo posterior tampoco borra un éxito anterior. Cambia nuestra estimación del estado actual. Y no entrar a la app durante varios días no demuestra, por sí solo, que alguien haya olvidado.

## 8. Evaluar no es elegir un solo formato

Las preguntas de opción múltiple pueden ser útiles, pero no definen un mastery. Tampoco las respuestas cortas definen una decisión.

El objetivo determina qué evidencia se necesita; el formato es una herramienta para obtenerla. Pueden utilizarse selección de respuestas, respuestas breves, ordenamiento, agrupación o casos seriados.

Un caso seriado presenta información por etapas. Permite observar varias decisiones conectadas, pero exige cuidado: si el sistema explica el primer paso, esa explicación puede ayudar en el segundo. Esos resultados no son pruebas totalmente independientes.

Tampoco sería justo penalizar repetidamente una misma equivocación inicial ni atribuir todo el mérito a cada conocimiento relacionado. Resolver un caso no demuestra automáticamente que se haya comprobado cada regla de su grafo.

En el prototipo, práctica y evaluación distinguen cuándo muestran la retroalimentación. Esto permite interpretar mejor la ayuda recibida; no afirma que exista un momento de feedback universalmente superior.

Un error crítico requiere una regla contextual y revisión apropiada. No es cualquier respuesta incorrecta. El módulo tiroideo candidato no tiene activadas banderas de errores clínicos críticos.

## 9. Por qué el grafo necesita algunas flechas sin ciclos

Una relación puede decir «A es requisito para B». Si también exigimos B antes de A, el estudiante no puede comenzar.

Por eso las relaciones de requisitos deben formar un **grafo dirigido acíclico**, o DAG: flechas con dirección que no permiten regresar al punto inicial siguiendo requisitos.

Esto no significa que toda la medicina carezca de ciclos. Los sistemas biológicos tienen retroalimentaciones. Tampoco significa que el alumno no pueda volver a estudiar algo. Repetir una actividad en el tiempo no crea una contradicción entre requisitos.

La regla es específica: evitar dependencias circulares donde impedirían una ruta coherente. Las relaciones tienen tipos y restricciones; no son flechas intercambiables.

## 10. Cómo cabe todo esto en SQL

SQL permite organizar y consultar información en tablas relacionadas. Un grafo describe cómo se conecta el conocimiento; SQL describe una forma de almacenarlo. No son alternativas incompatibles.

La separación fundamental es entre **lo que se enseña** y **lo que una persona ha hecho con ello**. El mismo objetivo sirve a muchos estudiantes, pero cada estudiante tiene su propio historial.

Además, hay que guardar versiones. Si cambia una pregunta o su criterio de corrección, necesitamos saber qué versión respondió una persona. De lo contrario compararíamos experiencias diferentes como si fueran iguales.

El prototipo ya tiene una base SQLite funcional con 17 tablas:

| Grupo | Tablas existentes | Qué conservan |
|---|---|---|
| Estructura y publicaciones | `schema_migrations`, `releases` | Cambios de estructura y versiones del contenido. |
| Grafo | `nodes`, `node_versions`, `edges` | Identidades, contenido versionado y conexiones. |
| Enseñanza y actividades | `units`, `activities`, `activity_targets` | Explicaciones, ejercicios y objetivos asociados. |
| Casos | `cases`, `case_steps` | Experiencias integradas y sus etapas. |
| Personas y acceso | `learners`, `sessions` | Perfiles locales y sesiones. |
| Ejecución | `case_runs`, `runs` | La realización concreta de un caso o una actividad. |
| Evidencia | `attempts`, `events` | Respuestas, resultados, ayuda y sucesos registrados. |
| Control de envíos | `submissions` | Evita duplicar un envío cuando se reintenta. |

Parte del contenido estructurado está dentro de campos JSON. No existe todavía una tabla independiente para cada fuente, rúbrica o proceso de revisión humana.

El estado del estudiante se calcula actualmente mediante Python a partir de los registros. No hay una tabla `learner_target_state` implementada. Los intentos y eventos tienen protecciones contra modificación y borrado ordinarios: la intención es actualizar la interpretación sin reescribir la historia, no prometer una base imposible de manipular.

### Entonces, ¿cuál es la unidad mínima?

Depende de la pregunta. Para representar el grafo, un nodo es una identidad conectable. Para enseñar, una unidad breve ofrece una experiencia de explicación. Para observar desempeño, un intento aporta evidencia. Para organizar una capacidad, la decisión es un objetivo reutilizable.

No conviene obligar a esas cuatro funciones a ser una sola cosa. **Nodo, lección, pregunta e intento no son sinónimos.**

## 11. Una arquitectura que evita confusiones

La especificación distingue cinco capas:

1. **Conocimiento médico:** afirmaciones, relaciones y procedencia.
2. **Representación educativa:** qué se enseñará y qué se espera aprender.
3. **Experiencias ensambladas:** unidades, ejercicios y casos.
4. **Estado del estudiante:** evidencia individual e interpretación actual.
5. **Vistas derivadas:** mapas, rutas, paneles y mensajes de progreso.

Una pantalla atractiva pertenece a la última capa. No reemplaza la evidencia de las anteriores. Una adaptación de la ruta tampoco debe modificar silenciosamente la verdad médica.

La base SQL del prototipo es una proyección educativa interna autorizada; no sustituye sin más la estructura canónica del conocimiento del proyecto.

## 12. Qué existe y qué todavía debemos demostrar

El prototipo funcional local de esta etapa está en `app/`. Incluye un módulo candidato de fisiología tiroidea con 15 nodos: un cluster, dos masteries, cuatro decisiones, cuatro conceptos, tres reglas y un procedimiento. Tiene cuatro unidades de enseñanza, 26 actividades y cuatro casos seriados —dos de práctica y dos de evaluación—.

Estos números describen inventario, no calidad clínica ni aprendizaje demostrado.

| Situación | Alcance |
|---|---|
| Implementado | Enseñanza breve, varios formatos de actividad, casos seriados, registro de ayuda, historial SQL, progreso y recomendaciones mediante reglas transparentes. |
| Limitado | Corrección de texto breve mediante respuestas admitidas; las respuestas no reconocidas pueden quedar indeterminadas, no necesariamente incorrectas. |
| Experimental | Inferencias de progreso y programación de repaso; el intervalo de un día del prototipo no es una optimización validada. |
| Pendiente | Revisión clínica humana del contenido candidato y evaluación educativa con estudiantes. |
| No entregado como tal | Simulador clínico completo, certificación profesional, sistema público de producción o diagnóstico cognitivo formal validado. |

La verificación técnica documentada el 17 de septiembre de 2026 incluye pruebas automatizadas y revisión de recorridos de interfaz. Este reporte no implica haberlas vuelto a ejecutar ni convierte esos resultados en validación educativa.

La existencia de un prototipo funcional tampoco significa que ya haya cuentas de producción, recuperación completa de perfiles, gestión de privacidad terminada o sincronización de aplicación en la nube.

## 13. La inteligencia artificial y sus límites

La IA puede ayudar a proponer explicaciones, variantes y conexiones. Eso no la convierte en fuente clínica ni en juez infalible de respuestas.

Cada contenido necesita procedencia y revisión acordes con su riesgo. Un resultado indeterminado debe poder reconocerse como tal. Las fuentes citadas tampoco equivalen automáticamente a una revisión clínica completada.

En cuanto al alumno, modelos estadísticos más complejos podrían utilizarse en el futuro para estimar conocimientos latentes. Pero añadir *cognitive diagnostic modelling* —modelos que infieren habilidades a partir de respuestas— no demuestra por sí mismo que la estimación sea correcta o útil.

La apuesta inicial es más modesta: reglas comprensibles, evidencia rastreable y conclusiones revisables. La complejidad debe ganarse su lugar mediante mejoras demostradas.

La privacidad forma parte de ese compromiso. Un historial educativo puede ser sensible. No deben incorporarse datos identificables de pacientes; los casos del prototipo son sintéticos. Antes de un despliegue real deben resolverse acceso, conservación y eliminación de datos, sin confundir almacenamiento local con ausencia de riesgos.

## 14. Cómo sabremos si la filosofía funciona

Primero hay que comprobar que la aplicación registra y calcula lo que dice. Después, que el contenido y las evaluaciones representan adecuadamente los objetivos. Finalmente, que las personas aprenden algo que conservan y pueden utilizar más allá de las preguntas ya vistas.

Son comprobaciones diferentes. Ninguna reemplaza a las demás.

Una evaluación futura debería examinar retención, desempeño en situaciones nuevas, calidad de las explicaciones y carga para el alumno. También debería comparar si la adaptación aporta algo respecto a una ruta fija razonable, en vez de atribuirle cualquier mejora observada.

La competencia con pacientes requeriría evidencia adicional fuera del prototipo. La app puede contribuir al aprendizaje; no debe adjudicarse toda la formación de un médico.

## 15. Lo que debería recordar nuestro visitante

GrafoMed no es solamente una biblioteca: pide utilizar lo aprendido. No es solamente un banco de preguntas: también enseña. No es solamente un mapa: registra experiencias de personas. Y no es un detector infalible de dominio: formula conclusiones limitadas a partir de evidencia.

Su promesa de diseño es esta:

> “Te explicaré lo que necesitas comprender. Te daré oportunidades de practicar. Distinguiré lo que logras con apoyo de lo que demuestras por tu cuenta. Te mostraré por qué recomiendo tu siguiente paso. Y no afirmaré que dominas algo cuando todavía no tengo evidencia suficiente.”

Ese es el centro de GrafoMed: **conocimiento conectado, enseñanza explícita y progreso que puede explicarse**.

## Fuentes internas y criterio de lectura

Este reporte sintetiza acuerdos de diseño de la conversación y documentos del proyecto. Cuando una propuesta histórica difiere de la implementación, prevalecen la especificación vigente y los artefactos actuales para describir qué existe. Las recomendaciones futuras no se presentan como funcionalidades entregadas.

- [Especificación del producto, v0.4.2](../PRODUCT_SPEC.md): arquitectura y límites del producto.
- [Contrato del prototipo local](../app/mini-PRD.md): alcance de construcción.
- [Documentación de la aplicación](../app/README.md): funcionamiento y limitaciones.
- [Esquema SQL existente](../app/migrations/001_initial.sql): tablas y restricciones.
- [Verificación técnica documentada](../app/VERIFICATION.md): comprobaciones y pendientes de la etapa.
- [Fuentes y estado editorial del módulo tiroideo](../app/content/SOURCES.md): procedencia y condición de candidato.
- [Propuesta de diseño educativo](../research/learning-design-2026-09-17/outputs/REVISED_PROPOSAL.md): antecedentes de la revisión; no sustituye el estado posterior del prototipo.

Las distinciones anteriores son compromisos de diseño y descripciones del proyecto. No constituyen una revisión sistemática ni una prueba de superioridad frente a otros métodos de enseñanza.
