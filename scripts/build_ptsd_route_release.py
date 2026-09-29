#!/usr/bin/env python3
"""Build the candidate PTSD route and merge it with the operational thyroid slice."""

from __future__ import annotations

import argparse
import copy
import json
from pathlib import Path


VA_URL = "https://healthquality.va.gov/HEALTHQUALITY/guidelines/mh/ptsd/"
NICE_URL = "https://www.nice.org.uk/guidance/ng116/chapter/recommendations"


def node(node_id, kind, title, description):
    return {"id": node_id, "type": kind, "title": title, "description": description}


def source(source_id, title, url, scope):
    return {"id": source_id, "title": title, "url": url, "accessed": "2026-09-22",
            "scope": scope, "rights": "Fuente enlazada; contenido candidato, sin reproducción de texto."}


def unit(unit_id, target_id, title, body, example, boundary, source_ids):
    return {"id": unit_id, "target_id": target_id, "title": title, "body": body,
            "example": example, "alternative": "Primero identifica el problema; después elige la acción y su límite.",
            "boundary": boundary, "source_ids": source_ids}


def activity(activity_id, target_id, title, prompt, options, answer, source_ids, phase="independent", format="choice", hint=None, feedback=None):
    return {"id": activity_id, "target_id": target_id, "title": title, "format": format,
            "phase": phase, "context": "Actividad educativa candidata sobre TEPT; no sustituye juicio clínico.",
            "prompt": prompt, "options": [{"id": k, "text": v} for k, v in options], "answer": answer,
            "hint": hint or "Busca la opción que conserva evaluación de riesgo, contexto y seguimiento.",
            "feedback": feedback or "La respuesta debe interpretarse junto con la evaluación clínica completa y la guía local.",
            "critical": False, "source_ids": source_ids}


def build(base_path: Path, destination: Path):
    content = json.loads(base_path.read_text(encoding="utf-8"))
    content = copy.deepcopy(content)
    content["release"] = {"id": "mvp.specialties.mvp.v4",
                           "title": "GrafoMed MVP · especialidades y temas · TEPT desarrollado",
                           "status": "candidate", "version": 10}
    for base_node in content["nodes"]:
        if base_node["id"] == "thyroid":
            base_node["type"] = "cluster-min"
            base_node["description"] = "Cluster menor: tema de eje tiroideo dentro de Endocrinología."

    va = "src-ptsd-va-2023"
    nice = "src-ptsd-nice-ng116"
    content["sources"] += [
        source(va, "VA/DoD · Management of PTSD and Acute Stress Disorder CPG 2023", VA_URL,
               "Algoritmos de reacción/estrés agudo, evaluación diagnóstica y manejo del TEPT."),
        source(nice, "NICE NG116 · Post-traumatic stress disorder", NICE_URL,
               "Reconocimiento, evaluación, seguridad, tratamiento focalizado en trauma y seguimiento."),
    ]

    psychiatry_topics = [
        ("psychiatric-assessment", "Evaluación y entrevista psiquiátrica", "Tema base para entrevista, examen mental, formulación y evaluación inicial."),
        ("depression-suicide", "Depresión y riesgo suicida", "Tema candidato para reconocer depresión, priorizar seguridad y organizar seguimiento."),
        ("bipolar-disorder", "Trastorno bipolar", "Tema candidato para distinguir episodios afectivos y decisiones de seguridad y tratamiento."),
        ("anxiety-ocd", "Ansiedad, pánico y TOC", "Tema candidato para formular ansiedad, pánico, obsesiones, compulsiones y deterioro."),
        ("psychosis-first-episode", "Psicosis y primer episodio psicótico", "Tema candidato para reconocer psicosis, descartar urgencias y coordinar atención."),
        ("substance-use", "Trastornos por consumo de sustancias", "Tema candidato para evaluar consumo, riesgo, abstinencia, intoxicación y tratamiento."),
        ("psychiatric-emergencies", "Urgencias psiquiátricas", "Tema candidato para estabilización, seguridad, contención y derivación."),
        ("neurocognition-delirium", "Neurocognición y delirium", "Tema candidato para diferenciar delirium, trastornos neurocognitivos y causas médicas."),
        ("neurodevelopment", "Neurodesarrollo: TDAH y autismo", "Tema candidato para evaluación del neurodesarrollo y coordinación longitudinal."),
        ("personality-crisis", "Trastornos de personalidad y crisis", "Tema candidato para patrones persistentes, crisis, límites terapéuticos y seguridad."),
    ]
    nodes = [
        node("psychiatry", "cluster-maj", "Psiquiatría", "Cluster mayor: especialidad clínica que contiene temas y rutas de razonamiento psiquiátrico."),
        node("ptsd", "cluster-min", "TEPT", "Cluster menor: tema candidato para formular, asegurar, tratar y monitorizar el trastorno de estrés postraumático."),
    ] + [node(topic_id, "cluster-min", title, description) for topic_id, title, description in psychiatry_topics] + [
        node("m-ptsd-formulate", "mastery", "Reconocer y formular TEPT", "Distinguir TEPT de otras respuestas postraumáticas usando síntomas, tiempo, deterioro y contexto."),
        node("m-ptsd-safety", "mastery", "Evaluar seguridad y gravedad", "Priorizar riesgo, comorbilidad, nivel de atención y plan de seguridad."),
        node("m-ptsd-treatment", "mastery", "Elegir tratamiento inicial", "Seleccionar una intervención proporcional al diagnóstico, fase, gravedad, evidencia y preferencias."),
        node("m-ptsd-monitor", "mastery", "Monitorizar y ajustar", "Valorar respuesta, funcionamiento, seguridad, tolerabilidad y necesidad de escalar o coordinar."),
    ]

    decisions = [
        ("d-ptsd-exposure", "¿Existe una exposición traumática relevante?", "m-ptsd-formulate"),
        ("d-ptsd-domains", "¿Qué dominios sintomáticos están presentes?", "m-ptsd-formulate"),
        ("d-ptsd-impairment", "¿Hay duración, deterioro funcional y contexto suficientes?", "m-ptsd-formulate"),
        ("d-ptsd-differential", "¿Qué diagnóstico o respuesta explica mejor el cuadro?", "m-ptsd-formulate"),
        ("d-ptsd-immediate-risk", "¿Hay riesgo inmediato que cambie la prioridad?", "m-ptsd-safety"),
        ("d-ptsd-safety-plan", "¿Cuándo debe activarse un plan de seguridad?", "m-ptsd-safety"),
        ("d-ptsd-level-care", "¿Qué nivel de atención y coordinación requiere?", "m-ptsd-safety"),
        ("d-ptsd-comorbidity", "¿Qué comorbilidades modifican la evaluación?", "m-ptsd-safety"),
        ("d-ptsd-phase", "¿Es reacción reciente, cuadro subumbral o TEPT establecido?", "m-ptsd-treatment"),
        ("d-ptsd-first-line", "¿Qué intervención inicial debe ofrecerse?", "m-ptsd-treatment"),
        ("d-ptsd-preferences", "¿Cómo incorporar preferencias y disponibilidad?", "m-ptsd-treatment"),
        ("d-ptsd-medication", "¿Qué lugar ocupa la farmacoterapia en este plan?", "m-ptsd-treatment"),
        ("d-ptsd-response", "¿Cómo se reconoce una respuesta clínicamente útil?", "m-ptsd-monitor"),
        ("d-ptsd-persistent", "¿Qué revisar si persisten los síntomas?", "m-ptsd-monitor"),
        ("d-ptsd-followup", "¿Cómo planificar seguimiento y prevención de recaídas?", "m-ptsd-monitor"),
    ]
    nodes += [node(i, "decision", title, "Decisión candidata de la ruta TEPT; requiere revisión clínica y educativa antes de promoción.")
              for i, title, _ in decisions]

    supports = {
        "m-ptsd-formulate": [
            ("c-ptsd-trauma", "concept", "Evento traumático", "Exposición traumática y contexto de amenaza, pérdida o daño."),
            ("c-ptsd-intrusion", "concept", "Intrusión y reexperimentación", "Recuerdos, sueños o reacciones intrusivas vinculadas al trauma."),
            ("c-ptsd-avoidance", "concept", "Evitación", "Evitación de recuerdos, emociones, personas, lugares o señales relacionadas."),
            ("c-ptsd-arousal", "concept", "Activación y reactividad", "Alteraciones de sueño, vigilancia, irritabilidad, concentración o respuesta de sobresalto."),
            ("r-ptsd-screening", "rule", "Cribado no equivale a diagnóstico", "Las escalas apoyan la detección y el seguimiento; no sustituyen la evaluación clínica."),
            ("p-ptsd-interview", "procedure", "Entrevista diagnóstica y funcional", "Explorar trauma, dominios, duración, deterioro, contexto y diagnósticos alternativos."),
        ],
        "m-ptsd-safety": [
            ("c-ptsd-suicide", "concept", "Riesgo suicida y autolesión", "El riesgo puede cambiar la urgencia y el nivel de protección requerido."),
            ("c-ptsd-dissociation", "concept", "Disociación y desorganización", "La disociación intensa o la desorganización pueden limitar una intervención ambulatoria simple."),
            ("c-ptsd-comorbidity", "concept", "Comorbilidad física y psiquiátrica", "Depresión, sustancias, TCE, dolor y otros problemas pueden modificar prioridades."),
            ("r-ptsd-safety", "rule", "La seguridad se evalúa desde el inicio", "La evaluación inicial debe incluir riesgo y necesidades físicas, psicológicas y sociales."),
            ("p-ptsd-safety-plan", "procedure", "Plan de seguridad y derivación", "Documentar señales de alarma, apoyos, recursos y responsable del seguimiento."),
        ],
        "m-ptsd-treatment": [
            ("c-ptsd-acute", "concept", "Reacción aguda, subumbral y TEPT", "El tiempo desde el trauma y la persistencia de síntomas cambian la ruta."),
            ("c-ptsd-trauma-focused", "concept", "Psicoterapia focalizada en trauma", "Intervenciones estructuradas que procesan recuerdos y significados relacionados con el trauma."),
            ("r-ptsd-first-line", "rule", "Ofrecer tratamiento focalizado en trauma", "En adultos con TEPT, las guías recomiendan considerar psicoterapia individual focalizada en trauma."),
            ("r-ptsd-shared", "rule", "Decisión compartida", "La elección debe integrar evidencia, preferencias, recursos, seguridad y disponibilidad."),
            ("p-ptsd-treatment-plan", "procedure", "Plan terapéutico inicial", "Acordar objetivos, intervención, apoyos, medición y fecha de revisión."),
        ],
        "m-ptsd-monitor": [
            ("c-ptsd-response", "concept", "Respuesta y funcionamiento", "La evolución incluye síntomas, seguridad, funcionamiento y participación en la vida diaria."),
            ("c-ptsd-barriers", "concept", "Barreras y adherencia", "Acceso, alianza, evitación, efectos adversos y contexto pueden limitar la respuesta."),
            ("r-ptsd-adjust", "rule", "Persistencia exige reevaluación", "Antes de escalar, revisar diagnóstico, comorbilidad, seguridad, adherencia y tratamiento recibido."),
            ("p-ptsd-followup", "procedure", "Seguimiento y prevención de recaídas", "Definir medidas, contactos, señales de alarma, refuerzos y coordinación."),
        ],
    }
    for mastery_id, items in supports.items():
        nodes += [node(i, kind, title, description) for i, kind, title, description in items]

    mvp_catalog = {
        "medicine": ("Medicina interna", "Patrones y decisiones generales", [
            ("internal-syndromes", "Síndromes frecuentes"), ("diagnostic-reasoning", "Razonamiento diagnóstico"), ("treatment-followup", "Tratamiento y seguimiento")]),
        "cardiology": ("Cardiología", "Ritmo, bomba y perfusión", [
            ("chest-pain", "Dolor torácico"), ("heart-failure", "Insuficiencia cardiaca"), ("arrhythmias", "Arritmias")]),
        "endocrine": ("Endocrinología", "Ejes y regulación hormonal", [
            ("thyroid", "Eje tiroideo"), ("glucose-metabolism", "Metabolismo de la glucosa"), ("adrenal-axes", "Ejes suprarrenales")]),
        "neurology": ("Neurología", "Localización y síndromes", [
            ("neurologic-localization", "Localización neurológica"), ("headache", "Cefaleas"), ("seizures", "Síndromes convulsivos")]),
        "pediatrics": ("Pediatría", "Desarrollo y urgencias", [
            ("growth-development", "Crecimiento y desarrollo"), ("pediatric-fever", "Fiebre en la infancia"), ("pediatric-emergencies", "Urgencias pediátricas")]),
        "obgyn": ("Gineco-obstetricia", "Reproducción y embarazo", [
            ("reproductive-health", "Salud reproductiva"), ("pregnancy", "Embarazo"), ("obstetric-emergencies", "Urgencias obstétricas")]),
        "surgery": ("Cirugía general", "Evaluación y abdomen agudo", [
            ("preoperative", "Evaluación preoperatoria"), ("acute-abdomen", "Abdomen agudo"), ("postoperative", "Cuidado posoperatorio")]),
        "pulmonology": ("Neumología", "Disnea e intercambio gaseoso", [
            ("dyspnea", "Disnea"), ("airflow-obstruction", "Obstrucción al flujo"), ("gas-exchange", "Intercambio gaseoso")]),
        "nephrology": ("Nefrología", "Función renal y electrolitos", [
            ("renal-function", "Función renal"), ("electrolytes", "Trastornos hidroelectrolíticos"), ("urinary-syndromes", "Síndromes urinarios")]),
        "dermatology": ("Dermatología", "Patrones y lesiones", [
            ("elementary-lesions", "Lesiones elementales"), ("inflammatory-patterns", "Patrones inflamatorios"), ("skin-infections", "Infecciones cutáneas")]),
        "emergency": ("Emergencias", "Priorizar y estabilizar", [
            ("prioritization", "Priorización"), ("initial-stabilization", "Estabilización inicial"), ("critical-decisions", "Decisiones críticas")]),
    }
    existing_nodes = {n["id"]: n for n in content["nodes"] + nodes}
    catalog_edges = []
    for major_id, (major_title, major_description, topics) in mvp_catalog.items():
        if major_id not in existing_nodes:
            created = node(major_id, "cluster-maj", major_title, f"Cluster mayor: {major_description}.")
            nodes.append(created); existing_nodes[major_id] = created
        elif major_id == "psychiatry":
            existing_nodes[major_id]["type"] = "cluster-maj"
        for topic_id, topic_title in topics:
            if topic_id not in existing_nodes:
                created = node(topic_id, "cluster-min", topic_title, f"Cluster menor: {topic_title} dentro de {major_title}; contenido MVP por construir.")
                nodes.append(created); existing_nodes[topic_id] = created
            else:
                existing_nodes[topic_id]["type"] = "cluster-min"
            catalog_edges.append({"source": major_id, "target": topic_id, "kind": "contains"})

    edges = [{"source": "psychiatry", "target": topic_id, "kind": "contains"} for topic_id, _, _ in [("ptsd", "TEPT", "")] + psychiatry_topics]
    edges += catalog_edges
    edges += [{"source": "ptsd", "target": mastery_id, "kind": "contains"} for mastery_id in supports]
    for decision_id, _, mastery_id in decisions:
        edges.append({"source": mastery_id, "target": decision_id, "kind": "integrates"})
    decision_support = {
        "d-ptsd-exposure": ["c-ptsd-trauma", "p-ptsd-interview"],
        "d-ptsd-domains": ["c-ptsd-intrusion", "c-ptsd-avoidance", "c-ptsd-arousal"],
        "d-ptsd-impairment": ["r-ptsd-screening", "p-ptsd-interview"],
        "d-ptsd-differential": ["p-ptsd-interview", "c-ptsd-comorbidity"],
        "d-ptsd-immediate-risk": ["c-ptsd-suicide", "r-ptsd-safety"],
        "d-ptsd-safety-plan": ["r-ptsd-safety", "p-ptsd-safety-plan"],
        "d-ptsd-level-care": ["c-ptsd-dissociation", "p-ptsd-safety-plan"],
        "d-ptsd-comorbidity": ["c-ptsd-comorbidity", "p-ptsd-interview"],
        "d-ptsd-phase": ["c-ptsd-acute", "p-ptsd-interview"],
        "d-ptsd-first-line": ["c-ptsd-trauma-focused", "r-ptsd-first-line"],
        "d-ptsd-preferences": ["r-ptsd-shared", "p-ptsd-treatment-plan"],
        "d-ptsd-medication": ["r-ptsd-shared", "p-ptsd-treatment-plan"],
        "d-ptsd-response": ["c-ptsd-response", "p-ptsd-followup"],
        "d-ptsd-persistent": ["c-ptsd-barriers", "r-ptsd-adjust"],
        "d-ptsd-followup": ["p-ptsd-followup", "c-ptsd-response"],
    }
    for decision_id, support_ids in decision_support.items():
        edges += [{"source": support_id, "target": decision_id, "kind": "supports"} for support_id in support_ids]

    content["nodes"] += nodes
    content["edges"] += edges
    for mastery_id, items in supports.items():
        for support_id, _, title, _ in items:
            content["units"].append(unit(
                "u-" + support_id, support_id, title,
                "Material educativo candidato para la ruta TEPT. Debe leerse junto con la fuente y el contexto clínico.",
                "Ejemplo de uso: conecta esta idea con una decisión concreta de la ruta, sin convertirla por sí sola en un diagnóstico.",
                "No es una instrucción para atención de pacientes ni reemplaza una guía local, supervisión o evaluación clínica.",
                [va, nice]))

    # Micro-ruta learner-first para la primera decisión de TEPT. La unidad
    # introduce el concepto en formato breve; el caso convierte esa idea en
    # cinco discriminaciones V/F y un cierre MCQ más exigente.
    content["units"].append({
        "id": "u-ptsd-exposure-video",
        "target_id": "d-ptsd-exposure",
        "title": "Nodo 1 · ¿Qué cuenta como exposición traumática?",
        "body": "Microvideo de 45 segundos: una exposición traumática relevante no es cualquier experiencia difícil. Primero confirma la naturaleza del evento y si encaja con una amenaza de muerte, lesión grave o violencia sexual; después explora síntomas, tiempo, deterioro y contexto. El evento por sí solo no formula TEPT.",
        "example": "Guion visual: 0–10 s, la pregunta clínica; 10–25 s, cuatro vías de exposición; 25–38 s, lo que no basta por sí solo; 38–45 s, la regla de oro: evento ≠ diagnóstico.",
        "alternative": "Piensa en esta unidad como el tráiler del nodo: te da el mapa, pero todavía tendrás que discriminar ejemplos y resolver un caso final.",
        "boundary": "No uses una exposición aislada ni un puntaje de cribado como sustituto de una evaluación clínica completa.",
        "source_ids": [va, nice],
        "media": {"kind": "microvideo", "label": "TIKTOK CLÍNICO · 00:45", "caption": "Exposición traumática relevante en 3 ideas", "status": "storyboard-mvp"}
    })

    prompts = {
        "d-ptsd-exposure": ("Después de revisar los ejemplos, ¿cuál es la formulación más segura?", [("integrated", "Confirmar una exposición traumática calificable y luego valorar síntomas, tiempo, deterioro y contexto; el evento por sí solo no basta"), ("event", "Concluir TEPT siempre que exista un evento muy intenso, aunque no haya síntomas persistentes"), ("screen", "Usar un puntaje aislado de cribado como diagnóstico definitivo"), ("avoid", "Descartar TEPT si la persona no relata el evento con mucho detalle en la primera entrevista")], "integrated"),
        "d-ptsd-domains": ("¿Qué enfoque describe mejor la evaluación sintomática?", [("domains", "Explorar intrusión, evitación, cognición/ánimo y activación/reactividad"), ("sleep", "Preguntar únicamente por sueño"), ("event", "Preguntar solo por el evento")], "domains"),
        "d-ptsd-impairment": ("¿Qué completa la valoración además de identificar síntomas?", [("function", "Duración, deterioro funcional y contexto"), ("label", "Una etiqueta sin entrevista"), ("scan", "Una imagen como requisito universal")], "function"),
        "d-ptsd-differential": ("Ante síntomas postraumáticos, ¿qué acción es más segura?", [("interview", "Contrastar TEPT con estrés agudo, depresión, sustancias, TCE y otras condiciones"), ("assume", "Asumir TEPT por el antecedente traumático"), ("ignore", "Ignorar comorbilidades")], "interview"),
        "d-ptsd-immediate-risk": ("¿Qué hallazgo cambia primero la prioridad?", [("risk", "Riesgo inmediato de suicidio, violencia o incapacidad para mantenerse seguro"), ("mild", "Síntomas leves sin deterioro"), ("preference", "Preferencia por una escala")], "risk"),
        "d-ptsd-safety-plan": ("Si se identifica riesgo significativo, ¿qué debe incorporarse al plan?", [("plan", "Un plan de seguridad y manejo del riesgo"), ("wait", "Esperar sin contacto"), ("screen", "Repetir solo el cribado")], "plan"),
        "d-ptsd-level-care": ("¿Qué orienta el nivel de atención?", [("level", "Riesgo, estabilidad, necesidades y apoyos disponibles"), ("score", "Solo el puntaje de síntomas"), ("age", "Solo la edad")], "level"),
        "d-ptsd-comorbidity": ("¿Por qué evaluar comorbilidades?", [("modify", "Pueden modificar seguridad, diagnóstico, prioridad y tratamiento"), ("exclude", "Porque excluyen automáticamente TEPT"), ("none", "Porque no tienen relación con el plan")], "modify"),
        "d-ptsd-phase": ("¿Qué variable ayuda a separar reacción reciente de TEPT establecido?", [("time", "Tiempo desde el trauma y persistencia de síntomas clínicamente importantes"), ("score", "Un puntaje sin fecha"), ("cause", "La causa por sí sola")], "time"),
        "d-ptsd-first-line": ("En un adulto con TEPT, ¿qué intervención debe considerarse como eje inicial?", [("tfcbt", "Psicoterapia individual focalizada en trauma"), ("avoid", "Evitar hablar del trauma indefinidamente"), ("routine", "Una intervención no específica para todos")], "tfcbt"),
        "d-ptsd-preferences": ("¿Qué debe integrar la elección de tratamiento?", [("shared", "Evidencia, preferencias, disponibilidad, seguridad y contexto"), ("single", "Una única opción para todas las personas"), ("speed", "Solo la opción más rápida")], "shared"),
        "d-ptsd-medication": ("¿Cómo debe plantearse la farmacoterapia en el plan?", [("context", "Como una decisión contextual y compartida, no como sustituto automático de la psicoterapia indicada"), ("always", "Como requisito para todo TEPT"), ("never", "Como prohibida en cualquier contexto")], "context"),
        "d-ptsd-response": ("¿Qué indica mejor una respuesta útil?", [("function", "Mejoría sintomática junto con seguridad y funcionamiento"), ("score", "Solo bajar un puntaje"), ("session", "Asistir a una sesión sin evaluar cambios")], "function"),
        "d-ptsd-persistent": ("Si persisten síntomas, ¿qué debe hacerse primero?", [("reassess", "Revisar diagnóstico, comorbilidades, seguridad, barreras y tratamiento recibido"), ("repeat", "Repetir lo mismo sin revisar nada"), ("stop", "Suspender todo automáticamente")], "reassess"),
        "d-ptsd-followup": ("¿Qué debe contener el seguimiento?", [("follow", "Medidas, objetivos, señales de alarma, apoyos y fecha de revisión"), ("none", "Ningún plan posterior"), ("score", "Solo una escala sin conversación")], "follow"),
    }
    for decision_id, title, _ in decisions:
        prompt, options, answer = prompts[decision_id]
        content["activities"].append(activity("a-" + decision_id, decision_id, title, prompt, options, answer, [va, nice]))

    exposure_checks = [
        ("01", "Una persona estuvo expuesta directamente a una amenaza de muerte o lesión grave.", "true", "Verdadero: la exposición directa a amenaza de muerte o lesión grave pertenece a la vía que debe explorarse. Esto todavía no diagnostica TEPT; faltan síntomas, tiempo, deterioro y contexto."),
        ("02", "Ver una noticia aislada sobre un desastre, sin exposición directa ni relación profesional, califica por sí solo como exposición traumática.", "false", "Falso: una noticia aislada no equivale por sí sola a exposición calificable. Hay que distinguir información general de exposición directa, vicaria cercana o repetida por trabajo."),
        ("03", "Enterarse de la muerte violenta o accidental de un familiar o amigo cercano puede ser una vía relevante de exposición.", "true", "Verdadero: enterarse de una muerte violenta o accidental de alguien cercano puede ser una vía relevante. Después se debe valorar la respuesta clínica, no asumir el diagnóstico."),
        ("04", "La exposición repetida a detalles aversivos de trauma como parte del trabajo puede ser clínicamente relevante.", "true", "Verdadero: la exposición repetida y profesional a detalles aversivos puede ser relevante. La clave es el patrón de exposición, no cualquier contacto ocasional con una noticia."),
        ("05", "Una ruptura de pareja o una pérdida económica, aunque sean muy dolorosas, cumplen por sí solas el criterio de exposición traumática.", "false", "Falso: una experiencia muy dolorosa no cumple automáticamente el tipo de exposición traumática que se está evaluando. El sufrimiento merece atención, pero no permite saltar la formulación."),
    ]
    for number, statement, answer, feedback in exposure_checks:
        content["activities"].append(activity(
            f"a-ptsd-exposure-vf-{number}", "d-ptsd-exposure",
            f"Nodo 2 · Ejemplo {number} · ¿Verdadero o falso?",
            statement, [("true", "Verdadero"), ("false", "Falso")], answer, [va, nice], phase="guided", feedback=feedback,
            hint="Pregunta qué tipo de exposición describe el ejemplo y separa evento, síntomas y diagnóstico."))
    content["activities"].append(activity(
        "a-ptsd-exposure-select-all", "d-ptsd-exposure",
        "Nodo 2 · Selecciona todo lo que sí cuenta para la exploración",
        "¿Qué elementos deben explorarse para decidir si la exposición es clínicamente relevante?",
        [("direct", "Exposición directa a amenaza de muerte, lesión grave o violencia sexual"),
         ("close", "Muerte violenta o accidental de una persona cercana"),
         ("work", "Exposición repetida a detalles aversivos como parte del trabajo"),
         ("score", "Un puntaje de cribado aislado, sin entrevista ni contexto")],
        ["direct", "close", "work"], [va, nice], phase="guided", format="multi",
        hint="Selecciona vías de exposición; no selecciones instrumentos de cribado como si fueran eventos.",
        feedback="Las tres primeras opciones describen vías de exposición que merecen exploración. Un puntaje aislado puede apoyar el cribado, pero no define la naturaleza del evento ni sustituye la entrevista."))

    case_groups = {
        "m-ptsd-formulate": ["d-ptsd-exposure", "d-ptsd-domains", "d-ptsd-differential"],
        "m-ptsd-safety": ["d-ptsd-immediate-risk", "d-ptsd-safety-plan", "d-ptsd-level-care"],
        "m-ptsd-treatment": ["d-ptsd-phase", "d-ptsd-first-line", "d-ptsd-preferences"],
        "m-ptsd-monitor": ["d-ptsd-response", "d-ptsd-persistent", "d-ptsd-followup"],
    }
    content["cases"].append({
        "id": "case-ptsd-exposure-micro",
        "title": "TEPT · micro-ruta de exposición traumática",
        "mastery_id": "m-ptsd-formulate", "mode": "practice",
        "description": "Micro-ruta: revisa el video, discrimina cinco ejemplos y cierra con una formulación clínica compleja.",
        "route_decision_id": "d-ptsd-exposure",
        "steps": [
            {"activity_id": f"a-ptsd-exposure-vf-{number}", "context": "Ejemplo breve para clasificar la vía de exposición; responde Verdadero o Falso.", "supplied": False}
            for number, _, _, _ in exposure_checks
        ] + [
            {"activity_id": "a-ptsd-exposure-select-all", "context": "Selecciona todas las vías que requieren exploración clínica; el cribado aislado no sustituye la entrevista.", "supplied": False},
            {"activity_id": "a-d-ptsd-exposure", "context": "Cierre: integra exposición, síntomas, tiempo, deterioro y contexto sin convertir el evento aislado en diagnóstico.", "supplied": False}
        ],
    })
    for mastery_id, decision_ids in case_groups.items():
        content["cases"].append({
            "id": "case-ptsd-" + mastery_id.removeprefix("m-ptsd-"),
            "title": "TEPT · taller de " + next(n["title"] for n in nodes if n["id"] == mastery_id),
            "mastery_id": mastery_id, "mode": "practice",
            "description": "Caso educativo candidato: integra tres decisiones sin representar a un paciente real.",
            "steps": [{"activity_id": "a-" + d, "context": "Escenario educativo de TEPT; la información es deliberadamente acotada.", "supplied": False} for d in decision_ids],
        })

    destination.write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"release": content["release"], "nodes": len(content["nodes"]), "edges": len(content["edges"]), "units": len(content["units"]), "activities": len(content["activities"]), "cases": len(content["cases"])}, ensure_ascii=False, indent=2))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", type=Path, default=Path("app/content/thyroid.v1.json"))
    parser.add_argument("--destination", type=Path, required=True)
    args = parser.parse_args()
    build(args.base.resolve(), args.destination.resolve())


if __name__ == "__main__":
    main()
