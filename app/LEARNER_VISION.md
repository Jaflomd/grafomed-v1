# Grafo Med Learner — visión tipo Duolingo

## Promesa

Cada visita debe responder una pregunta sencilla: **¿cuál es el siguiente paso pequeño que mejora mi capacidad de decidir?** La pantalla inicial no muestra todo el sistema; muestra una misión focal, una ruta comprensible y opciones de continuación.

## Lo que toma de una app de aprendizaje diario

- misión breve y accionable;
- ritmo semanal visible, sin castigo por romper una racha;
- progreso por niveles y decisiones, no por una barra única de “dominio”;
- frontier de tres opciones para preservar agencia;
- feedback y remediación después de cada intento;
- recompensas de retorno/esfuerzo separadas de la evidencia educativa;
- acceso gradual al grafo completo cuando el aprendiz lo solicita.

## Lo que Grafo Med no copia

- No convierte XP, rachas ni completar una lección en mastery.
- No usa corazones, vidas perdidas o vergüenza como presión.
- No oculta incertidumbre, ayuda, errores ni respuestas por revisar.
- No presenta contenido candidato como validado clínicamente.
- No usa un porcentaje global como sustituto de retención, transferencia o desempeño integrado.

## Arquitectura de la experiencia

`Mi día → misión focal → respuesta → feedback/remediación → siguiente decisión → caso integrado → evidencia`.

El home learner usa el release tiroideo candidato actual. Builder/Viewer permanece disponible como modo separado para explorar snapshots, rutas y gates sin exponer evidencia personal.

El roadmap visual sigue la gramática de un camino de learning units: cada círculo es una decisión compuesta; al abrirlo, una teaching unit prepara la idea y varias assessment units permiten comprobarla con V/F, MCQ o selección múltiple. El nodo sigue siendo el objeto de conocimiento del grafo, no una pantalla única. Un nodo ausente se muestra bloqueado hasta que exista contenido source-grounded, no se rellena con copy inventado.

## Estado de implementación

La primera iteración está implementada en `app/static/app.js` y `app/static/styles.css`: home con roadmap vertical de decisiones, misión, ritmo, puntos de práctica, frontier y boundary de evidencia. Los puntos se derivan de actividad actual; todavía no son una economía persistente ni una métrica de aprendizaje.
