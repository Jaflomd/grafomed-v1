#!/usr/bin/env python3
"""Build canonical graph with 100% pedagogical coverage AND assessment game recommendations."""

from __future__ import annotations

import json
from pathlib import Path
from collections import deque

GRAPH_FILE = Path(__file__).resolve().parents[1] / "graph" / "asthma_primer_graph.json"

CLUSTERS = [
    {
        "id": "CLU-ASMA-PATHO",
        "title": "Fisiopatología, Inmunología y Remodelado de la Vía Aérea",
        "description": "Mecanismos de sensibilización, alarminas epiteliales, cascada Th2, respuesta dual EAR/LAR, unidad trófica epitelio-mesenquimal y deficiencia de interferones antivirales.",
        "color": "#8b5cf6"
    },
    {
        "id": "CLU-ASMA-DX",
        "title": "Diagnóstico Clínico y Confirmación Espirométrica",
        "description": "Sospecha sintomática, prueba de reversibilidad broncodilatadora con SABA, pruebas de provocación bronquial y exclusión de diagnósticos diferenciales.",
        "color": "#10b981"
    },
    {
        "id": "CLU-ASMA-BIOMARK",
        "title": "Fenotipos, Endotipos y Biomarcadores T2 vs No-T2",
        "description": "Estratificación molecular de asma alérgica, eosinofílica de inicio tardío, neutrofílica Th17 y paucigranulocítica mediante FeNO, eosinófilos y periostina.",
        "color": "#f59e0b"
    },
    {
        "id": "CLU-ASMA-TX-STEP",
        "title": "Manejo Farmacológico Escalonado GINA (Steps 1–5)",
        "description": "Estrategia por pasos de GINA: ICS-formoterol a demanda, terapia de mantenimiento y rescate (MART), LAMA tiotropio y auditoría de factores modificables.",
        "color": "#0ea5e9"
    },
    {
        "id": "CLU-ASMA-SEVERE",
        "title": "Asma Grave, Terapias Biológicas y Planes de Acción",
        "description": "Selección de anticuerpos monoclonales dirigidos (anti-IgE, anti-IL-5, anti-IL-4Rα), termoplastia bronquial y planes de automanejo escrito con PROMs.",
        "color": "#ef4444"
    }
]

GAME_RECOMMENDATIONS = {
    "CON-ASMA-ALARM": [
        {"game_id": "game-01", "game_name": "DAG Concept Map Builder", "suitability": "alta", "clinical_mission": "Ensamblar la red de señalización epitelio-alarmina-ILC2."},
        {"game_id": "game-05", "game_name": "Molecular Circuit Breaker", "suitability": "alta", "clinical_mission": "Neutralizar TSLP/IL-33 antes de activar la síntesis de IL-5/IL-13 por ILC2s."},
        {"game_id": "quick-mcq", "game_name": "Opción Múltiple / V-F", "suitability": "media", "clinical_mission": "Identificar el trío de alarminas T2 canónicas frente a interferones."}
    ],
    "CON-ASMA-TH2-CASCADE": [
        {"game_id": "game-01", "game_name": "DAG Concept Map Builder", "suitability": "alta", "clinical_mission": "Modelar la presentación de alérgenos por DCs a CD4+ y diferenciación Th2."},
        {"game_id": "game-02", "game_name": "Metabolic & Pathway Fault-Detector", "suitability": "alta", "clinical_mission": "Evaluar la falla en el switch isotípico de IgE al bloquear IL-4 o CD40L."},
        {"game_id": "game-05", "game_name": "Molecular Circuit Breaker", "suitability": "media", "clinical_mission": "Bloqueo selectivo de citoquinas Th2 efectoras."}
    ],
    "CON-ASMA-EAR-LAR": [
        {"game_id": "game-11", "game_name": "Feature Contrast Duel", "suitability": "alta", "clinical_mission": "Duelo temporal y celular: EAR (5-90 min, mastocitos/histamina) vs LAR (3-12 h, eosinófilos/remodelado)."},
        {"game_id": "game-01", "game_name": "DAG Concept Map Builder", "suitability": "media", "clinical_mission": "Trazar la secuencia bifásica del broncoespasmo alérgeno-inducido."}
    ],
    "CON-ASMA-EMTU": [
        {"game_id": "game-08", "game_name": "Pathology Hotspot Inspector", "suitability": "alta", "clinical_mission": "Inspeccionar biopsia: lámina reticular, pericitos, miofibroblastos y músculo liso hiperplásico."},
        {"game_id": "game-01", "game_name": "DAG Concept Map Builder", "suitability": "alta", "clinical_mission": "Conectar citoquinas profibróticas (TGF-β, periostina) con el remodelado irreversible."}
    ],
    "RUL-ASMA-DEFECTIVE-IFN": [
        {"game_id": "game-02", "game_name": "Metabolic & Pathway Fault-Detector", "suitability": "alta", "clinical_mission": "Simular el bloqueo antiviral por déficit de IFN-β/λ frente a Rinovirus."},
        {"game_id": "quick-mcq", "game_name": "Opción Múltiple / V-F", "suitability": "alta", "clinical_mission": "Diferenciar infección bacteriana de exacerbación viral por defecto epitelial."}
    ],
    "DEC-ASMA-ASSESS-REMODEL-RISK": [
        {"game_id": "game-18", "game_name": "Longitudinal Serial Case", "suitability": "alta", "clinical_mission": "Seguimiento a 5 años: evaluar progresión de asma tardía hacia obstrucción fija."},
        {"game_id": "game-03", "game_name": "Illness Script Matrix", "suitability": "alta", "clinical_mission": "Estratificar factores de riesgo: inicio adulto, tabaquismo y omisión de ICS."}
    ],
    "CON-ASMA-SYMPTOM-PATTERN": [
        {"game_id": "game-09", "game_name": "Red Herring Hunter", "suitability": "alta", "clinical_mission": "Filtrar causas espurias de sibilancias y tos nocturna (ERGE, goteo postnasal)."},
        {"game_id": "game-03", "game_name": "Illness Script Matrix", "suitability": "alta", "clinical_mission": "Reconocer el patrón temporal de variabilidad y gatillos del asma."}
    ],
    "RUL-ASMA-SPIRO-REVERSIBILITY": [
        {"game_id": "game-07", "game_name": "Loop Detective (Espirometría)", "suitability": "alta", "clinical_mission": "Ajustar cursores para validar el doble criterio: incremento ≥ 12% Y ≥ 200 mL post-SABA."},
        {"game_id": "game-06", "game_name": "Biomarker Dial & Cutoff Slider", "suitability": "alta", "clinical_mission": "Desplazar FEV1 basal y post-BD para resolver casos límite."}
    ],
    "DEC-ASMA-CONFIRM-DIAGNOSIS": [
        {"game_id": "game-12", "game_name": "Diagnostic Test Sequencer", "suitability": "alta", "clinical_mission": "Secuenciar algoritmo diagnóstico: clínica → espirometría con BD → PEF seriado."},
        {"game_id": "game-09", "game_name": "Red Herring Hunter", "suitability": "alta", "clinical_mission": "Evitar el sobrediagnóstico por juicio clínico puro sin prueba funcional."}
    ],
    "PRC-ASMA-BRONCHIAL-PROVOCATION": [
        {"game_id": "game-07", "game_name": "Loop Detective (Espirometría)", "suitability": "alta", "clinical_mission": "Interpretar curva dosis-respuesta con concentraciones crecientes de metacolina."},
        {"game_id": "game-17", "game_name": "Contraindication Minesweeper", "suitability": "alta", "clinical_mission": "Desactivar la prueba si el FEV1 basal es < 60% o hay evento cardiovascular reciente."}
    ],
    "RUL-ASMA-METHACHOLINE-FALL": [
        {"game_id": "game-06", "game_name": "Biomarker Dial & Cutoff Slider", "suitability": "alta", "clinical_mission": "Localizar el punto de caída del 20% (PC20) e indexar severidad de hiperreactividad."},
        {"game_id": "game-07", "game_name": "Loop Detective (Espirometría)", "suitability": "media", "clinical_mission": "Comparar curva basal post-salina con caída post-metacolina."}
    ],
    "DEC-ASMA-DIFFERENTIAL-DIAGNOSIS": [
        {"game_id": "game-11", "game_name": "Feature Contrast Duel", "suitability": "alta", "clinical_mission": "Duelo clínico directo: Asma vs EPOC vs Disfunción de Cuerdas Vocales vs ACOS."},
        {"game_id": "game-09", "game_name": "Red Herring Hunter", "suitability": "alta", "clinical_mission": "Detectar estridor inspiratorio y aplanamiento en bucle flujo-volumen."}
    ],
    "CON-ASMA-ENDOTYPES-T2-VS-NONT2": [
        {"game_id": "game-10", "game_name": "Patient Phenotype Sorter", "suitability": "alta", "clinical_mission": "Clasificar viñetas de pacientes en buzones moleculares: T2-High vs No-T2."},
        {"game_id": "game-03", "game_name": "Illness Script Matrix", "suitability": "alta", "clinical_mission": "Matriz de contraste: asma alérgica, eosinofílica tardía, neutrofílica y paucigranulocítica."}
    ],
    "RUL-ASMA-FENO-BIOMARKER": [
        {"game_id": "game-06", "game_name": "Biomarker Dial & Cutoff Slider", "suitability": "alta", "clinical_mission": "Ajustar dial de FeNO (> 25-50 ppb) y calibrar respuesta predicha a esteroides inhalados."},
        {"game_id": "game-19", "game_name": "Biologic Matchmaker", "suitability": "media", "clinical_mission": "Integrar FeNO con eosinofilia periférica para selección de Dupilumab."}
    ],
    "RUL-ASMA-BLOOD-EOSINOPHILS": [
        {"game_id": "game-06", "game_name": "Biomarker Dial & Cutoff Slider", "suitability": "alta", "clinical_mission": "Mover umbral de eosinófilos (150 vs 300 cél/µL) y evaluar indicación de anti-IL-5."},
        {"game_id": "game-19", "game_name": "Biologic Matchmaker", "suitability": "alta", "clinical_mission": "Filtrar candidatos a Mepolizumab según eosinofilia persistente."}
    ],
    "CON-ASMA-PERIOSTIN": [
        {"game_id": "game-06", "game_name": "Biomarker Dial & Cutoff Slider", "suitability": "alta", "clinical_mission": "Correlacionar niveles séricos de periostina con actividad de IL-13 y remodelado."},
        {"game_id": "game-08", "game_name": "Pathology Hotspot Inspector", "suitability": "media", "clinical_mission": "Identificar la secreción basolateral de periostina hacia la circulación."}
    ],
    "DEC-ASMA-PHENOTYPE-CLASSIFICATION": [
        {"game_id": "game-10", "game_name": "Patient Phenotype Sorter", "suitability": "alta", "clinical_mission": "Asignar en swipe rápido a 5 pacientes a sus endotipos terapéuticos definitivos."},
        {"game_id": "game-19", "game_name": "Biologic Matchmaker", "suitability": "alta", "clinical_mission": "Conectar fenotipo clínico complejo (ej. EREA/Samter) con su perfil inflamatorio."}
    ],
    "DEC-ASMA-STEP1-2-MANAGEMENT": [
        {"game_id": "game-13", "game_name": "Stepwise GINA Ladder", "suitability": "alta", "clinical_mission": "Armar Step 1-2 con ICS-formoterol a demanda o ICS diario, erradicando SABA solo."},
        {"game_id": "game-04", "game_name": "Management Script Matrix", "suitability": "alta", "clinical_mission": "Prescribir el esquema controlador inicial según frecuencia sintomática."}
    ],
    "DEC-ASMA-STEP3-ESCALATION": [
        {"game_id": "game-13", "game_name": "Stepwise GINA Ladder", "suitability": "alta", "clinical_mission": "Configurar terapia MART con ICS-formoterol a dosis bajas para mantenimiento y rescate."},
        {"game_id": "game-18", "game_name": "Longitudinal Serial Case", "suitability": "alta", "clinical_mission": "Evaluar respuesta clínica a los 3 meses y ajustar dosis de rescate consumidas."}
    ],
    "DEC-ASMA-STEP4-ESCALATION": [
        {"game_id": "game-13", "game_name": "Stepwise GINA Ladder", "suitability": "alta", "clinical_mission": "Intensificar a dosis media/alta de ICS/LABA y añadir Tiotropio Respimat (LAMA)."},
        {"game_id": "game-17", "game_name": "Contraindication Minesweeper", "suitability": "media", "clinical_mission": "Verificar que el paciente no suspenda el corticoide al iniciar el antimuscarínico."}
    ],
    "DEC-ASMA-AUDIT-MODIFIABLE-FACTORS": [
        {"game_id": "game-14", "game_name": "Inhaler Error Inspector", "suitability": "alta", "clinical_mission": "Auditar 5 pasos de uso de MDI/Turbuhaler y corregir el fallo técnico crítico."},
        {"game_id": "game-09", "game_name": "Red Herring Hunter", "suitability": "alta", "clinical_mission": "Detectar mala adherencia y tabaquismo antes de clasificar como asma refractaria."}
    ],
    "DEC-ASMA-BIOLOGIC-OMALIZUMAB": [
        {"game_id": "game-05", "game_name": "Molecular Circuit Breaker", "suitability": "alta", "clinical_mission": "Acoplar Omalizumab a la IgE libre impidiendo su unión al receptor FcεRI."},
        {"game_id": "game-19", "game_name": "Biologic Matchmaker", "suitability": "alta", "clinical_mission": "Calcular dosis según tabla cruzada de peso corporal e IgE sérica basal."}
    ],
    "DEC-ASMA-BIOLOGIC-MEPOLIZUMAB": [
        {"game_id": "game-05", "game_name": "Molecular Circuit Breaker", "suitability": "alta", "clinical_mission": "Neutralizar IL-5 libre y detener el reclutamiento y supervivencia eosinofílica."},
        {"game_id": "game-19", "game_name": "Biologic Matchmaker", "suitability": "alta", "clinical_mission": "Seleccionar Mepolizumab en paciente corticodependiente con eosinófilos ≥ 300/µL."}
    ],
    "DEC-ASMA-BIOLOGIC-DUPILUMAB": [
        {"game_id": "game-05", "game_name": "Molecular Circuit Breaker", "suitability": "alta", "clinical_mission": "Bloquear la subunidad IL-4Rα y apagar la señal dual de IL-4 e IL-13."},
        {"game_id": "game-19", "game_name": "Biologic Matchmaker", "suitability": "alta", "clinical_mission": "Emparejar en asma severa con FeNO elevado y poliposis nasal concurrente."}
    ],
    "DEC-ASMA-BRONCHIAL-THERMOPLASTY": [
        {"game_id": "game-04", "game_name": "Management Script Matrix", "suitability": "alta", "clinical_mission": "Definir protocolo en 3 sesiones broncoscópicas de radiofrecuencia a 65 °C."},
        {"game_id": "game-17", "game_name": "Contraindication Minesweeper", "suitability": "alta", "clinical_mission": "Suspender el procedimiento si hay crisis reciente o FEV1 basal post-BD < 50%."}
    ],
    "DEC-ASMA-WRITTEN-ACTION-PLAN": [
        {"game_id": "game-15", "game_name": "Traffic Light Action Plan", "suitability": "alta", "clinical_mission": "Construir las 3 zonas (Verde/Amarilla/Roja) y definir dosis de rescate y esteroide oral."},
        {"game_id": "game-16", "game_name": "Rapid Crisis Triage (60s)", "suitability": "alta", "clinical_mission": "Simular la toma de decisiones del paciente cuando el PEF cae por debajo del 50%."}
    ]
}

# Load base data from previous compilation
prev_data = json.loads(GRAPH_FILE.read_text(encoding="utf-8"))
BASE_NODES = prev_data["nodes"]
TEACHING_UNITS = prev_data["teaching_units"]
ASSESSMENT_UNITS = prev_data["assessment_units"]
EDGES = prev_data["edges"]

NODES_WITH_GAMES = []
for n in BASE_NODES:
    node_copy = dict(n)
    node_copy["assessment_recommendations"] = GAME_RECOMMENDATIONS.get(n["id"], [
        {"game_id": "quick-mcq", "game_name": "Opción Múltiple / Caso Rápido", "suitability": "alta", "clinical_mission": "Evaluación cognitiva estándar."}
    ])
    NODES_WITH_GAMES.append(node_copy)


def main():
    data = {
        "release": {
            "id": "asthma-primer-holgate-2015.v2",
            "title": "Asma: Fisiopatología, Diagnóstico y Manejo Estratificado",
            "source": "Nature Reviews Disease Primers (2015) 1:15025. Holgate ST, Wenzel S, Postma DS, Weiss ST, Renz H, Sly PD. DOI: 10.1038/nrdp.2015.25",
            "version": 2,
            "universal_coverage": True,
            "game_catalog_integrated": True,
            "total_games_in_suite": 20
        },
        "clusters": CLUSTERS,
        "nodes": NODES_WITH_GAMES,
        "teaching_units": TEACHING_UNITS,
        "assessment_units": ASSESSMENT_UNITS,
        "edges": EDGES
    }

    GRAPH_FILE.parent.mkdir(parents=True, exist_ok=True)
    GRAPH_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✓ Graph JSON updated with 20-Game assessment roadmap at: {GRAPH_FILE}")
    print(f"  Nodes updated: {len(NODES_WITH_GAMES)} (100% with game recommendations)")


if __name__ == "__main__":
    main()
