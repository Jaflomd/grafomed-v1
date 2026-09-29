---
name: medical-paper-to-graph
description: >-
  Extracts medical literature, clinical papers, and guidelines into structured,
  source-locked knowledge graphs comprising clinical decisions, operational rules,
  pathophysiological concepts, rich teaching units, interactive assessment units,
  and a 20-game assessment recommendation roadmap.
---

# Medical Paper-to-Graph & Assessment Game Mapping Skill

This skill defines the standardized protocol for ingesting medical literature (clinical trials, reviews, guidelines such as GINA, GOLD, KDIGO, NICE) and transforming it into a high-fidelity, source-locked knowledge graph with **100% pedagogical coverage paired with a 20-game assessment roadmap**.

---

## 1. Core Principles

1. **Separation of Layers:**
   * **Medical Truth:** Pathophysiological concepts (`concept`), physiological/diagnostic rules with numerical cutoffs (`rule`), procedures (`procedure`), and clinical decisions (`decision`).
   * **Educational Representation:**
     * **Teaching Unit (`teaching_unit`):** Delivers mechanics, clinical examples, boundaries, clinical pearls, pitfalls, and exact page/figure source-lock.
     * **Assessment Recommendations (`assessment_recommendations`):** Roadmap of game archetypes from the 20-game suite mapped to the node's specific cognitive demand.
     * **Assessment Unit (`assessment_unit`):** Validates cognitive or clinical mastery through a clinical vignette with options, correct answer key, distractor explanations, and immediate feedback.
   * **Topological Rigor:** Causal dependencies (`requires`) must form a strict Directed Acyclic Graph (DAG). Lateral associations (`differential`, `correlates`) must be symmetric and never overlap with causal ancestor-descendant paths.
2. **Universal Pedagogical Rule (CERO Nodos Mudos / No Naked Nodes):**
   * Every node (regardless of hierarchy: `decision`, `rule`, `concept`, `procedure`) MUST contain:
     1. Its `teaching_unit` (theory, case, boundaries, pearl, pitfall, source_lock).
     2. Its `assessment_recommendations` (2 to 3 games mapped from the 20-game catalog).
     3. Its `assessment_unit` (interactive clinical vignette question).

---

## 2. The GrafoMed 20-Game Assessment Suite

| ID | Game Name | Target Layer | Cognitive & Interactive Mechanism |
| :--- | :--- | :--- | :--- |
| **game-01** | **DAG Concept Map Builder** | `concept` / `patho` | Canvas grande + Drag & Drop de nodos + Trazado reactivo de flechas causales acíclicas con sistema de pistas. |
| **game-02** | **Metabolic & Pathway Fault-Detector**| `concept` / `rule` | Circuito de flujo; se induce un bloqueo o mutación y el alumno identifica acumulación aguas arriba, déficit distal o shunt. |
| **game-03** | **Illness Script Matrix** | `concept` / `cluster` | Matriz 3x4: arrastrar 12 fichas desordenadas de Factores de Riesgo, Curso, Síntomas y Signos/Labs hacia 3 entidades clínicas. |
| **game-04** | **Management Script Matrix** | `decision` / `cluster` | Matriz 3x5: arrastrar 15 fichas de conducta clínica (Labs, Imágenes, Criterio Dx, Tto 1ª Línea, Prevención de Crisis). |
| **game-05** | **Molecular Circuit Breaker** | `concept` / `decision` | Cascada molecular reactiva de citoquinas; soltar anticuerpos monoclonales sobre la diana exacta para apagar la inflamación. |
| **game-06** | **Biomarker Dial & Cutoff Slider** | `rule` | Dial/slider continuo para ajustar umbrales (ej. FeNO, eosinófilos) y observar el cambio en probabilidad diagnóstica y terapéutica. |
| **game-07** | **Loop Detective (Espirometría)** | `rule` / `procedure` | Gráfico de curva Flujo-Volumen; desplazar líneas de calibración para comprobar si se cumple la regla $\ge 12\%$ y $\ge 200\text{ mL}$. |
| **game-08** | **Pathology Hotspot Inspector** | `concept` | Micrografía histológica de alta resolución con lupa virtual y detección interactiva de 4 hotspots patológicos. |
| **game-09** | **Red Herring Hunter (Caza-Trampas)** | `decision` | Caso con 5 hallazgos; tachar 2 pistas falsas o distractores para revelar el diagnóstico verdadero. |
| **game-10** | **Patient Phenotype Sorter** | `decision` / `concept` | Mecánica swipe/buzón rápido; clasificar viñetas clínicas de pacientes hacia su fenotipo o endotipo molecular. |
| **game-11** | **Feature Contrast Duel** | `decision` | Duelo de dos columnas enfrentadas (ej. Asma vs EPOC); asignar 8 características clínicas a contrarreloj. |
| **game-12** | **Diagnostic Test Sequencer** | `procedure` / `decision` | Presupuesto simulado ($120); secuenciar pruebas diagnósticas en orden costo-efectivo sin saltarse pasos básicos. |
| **game-13** | **Stepwise GINA Ladder** | `decision` | Escalera de 5 peldaños; arrastrar la combinación óptima de inhaladores permitida según el nivel de control (ACT/ACQ). |
| **game-14** | **Inhaler Error Inspector** | `decision` / `procedure` | 5 viñetas secuenciales de uso de inhalador; identificar y corregir el fallo técnico crítico cometido por el paciente. |
| **game-15** | **Traffic Light Action Plan** | `decision` | Semáforos Verde (>80%), Amarillo (50-80%) y Rojo (<50%); asociar la conducta médica inmediata a cada zona. |
| **game-16** | **Rapid Crisis Triage (60s)** | `decision` | Shock room en tiempo real; secuenciar intervenciones terapéuticas urgentes en orden de prioridad vital sin activar errores críticos. |
| **game-17** | **Contraindication Minesweeper** | `decision` | Grilla de 8 opciones farmacológicas; desmarcar las "minas contraindicadas" para un paciente con comorbilidades. |
| **game-18** | **Longitudinal Serial Case** | `decision` | Caso ramificado en 3 consultas sucesivas donde las decisiones del debut condicionan las analíticas del seguimiento. |
| **game-19** | **Biologic Matchmaker** | `decision` | Ficha de paciente grave con 4 biomarcadores; emparejar con el anticuerpo monoclonal de máxima afinidad biológica. |
| **game-20** | **Clinical Calibration Slider** | Todos | Slider de certeza subjetiva (0% a 100%) antes de responder para calibrar metacognición y confianza clínica. |

---

## 3. Standard JSON Schema

```json
{
  "release": {
    "id": "slug-name.v2",
    "title": "Human Readable Title",
    "source": "Paper citation, authors, journal, year, DOI",
    "version": 2
  },
  "clusters": [...],
  "nodes": [
    {
      "id": "CON-XXX",
      "type": "concept | rule | decision | procedure",
      "cluster_id": "CLU-ID",
      "title": "Clear Node Title",
      "summary": "One-line operational summary",
      "decision_prompt": "Observable action statement",
      "assessment_recommendations": [
        {
          "game_id": "game-05",
          "game_name": "Molecular Circuit Breaker",
          "suitability": "alta",
          "clinical_mission": "Bloquear la cascada de alarminas epiteliales antes de la activación de ILC2s."
        }
      ]
    }
  ],
  "teaching_units": [...],
  "assessment_units": [...],
  "edges": [...]
}
```
