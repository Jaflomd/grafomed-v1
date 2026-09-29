#!/usr/bin/env python3
"""Acceptance checks for the local GrafoMed learner-app prototype."""

from __future__ import annotations

import json
from pathlib import Path
import subprocess
import tempfile
import unittest


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
PROTOTYPE_ROOT = PRODUCT_ROOT / "prototypes" / "learner-app-v0"
HTML_PATH = PROTOTYPE_ROOT / "index.html"
CSS_PATH = PROTOTYPE_ROOT / "styles.css"
APP_PATH = PROTOTYPE_ROOT / "app.js"
DATA_PATH = PROTOTYPE_ROOT / "data.js"
CONTRACT_ROOT = PROTOTYPE_ROOT / "contracts"
NODE_PACK_SOURCE = PROTOTYPE_ROOT / "content-packs" / "upper-limb-bones.v0.json"
NODE_PACK_JS = PROTOTYPE_ROOT / "node-pack.js"
NODE_PACK_SCHEMA = CONTRACT_ROOT / "node-learning-pack.v0.schema.json"
NODE_PACK_BUILDER = PRODUCT_ROOT / "scripts" / "build_node_learning_pack.py"
BRAND_ASSETS = [
    PROTOTYPE_ROOT / "assets" / "usamedic-isotipo.png",
    PROTOTYPE_ROOT / "assets" / "usamedic-logo-horizontal.png",
]


class LearningPrototypeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.html = HTML_PATH.read_text(encoding="utf-8")
        cls.css = CSS_PATH.read_text(encoding="utf-8")
        cls.app = APP_PATH.read_text(encoding="utf-8")
        data_text = DATA_PATH.read_text(encoding="utf-8").strip()
        prefix = "window.GRAFOMED_UPPER_LIMB = "
        if not data_text.startswith(prefix) or not data_text.endswith(";"):
            raise AssertionError("Prototype data is not a deterministic browser assignment")
        cls.data = json.loads(data_text[len(prefix):-1])
        cls.node_pack = json.loads(NODE_PACK_SOURCE.read_text(encoding="utf-8"))

    def test_candidate_cluster_is_complete_in_prototype_data(self) -> None:
        self.assertEqual(self.data["status"], "candidate_demo_not_promoted")
        self.assertEqual(len(self.data["objectives"]), 10)
        self.assertEqual(len(self.data["atoms"]), 33)
        self.assertEqual(len({atom["id"] for atom in self.data["atoms"]}), 33)
        self.assertEqual([item["code"] for item in self.data["assessmentLevels"]], ["A1", "A2", "A3", "A4"])

    def test_primary_surfaces_and_lesson_player_exist(self) -> None:
        for screen in ["today", "journey", "map", "profile"]:
            self.assertIn(f'data-screen="{screen}"', self.html)
            self.assertIn(f'data-nav="{screen}"', self.html)
        self.assertIn('id="lesson-overlay"', self.html)
        self.assertIn('id="lesson-content"', self.html)
        self.assertIn('id="mission-evidence"', self.html)

    def test_mastery_is_not_reduced_to_completion_or_xp(self) -> None:
        self.assertIn("Completar ≠ dominar", self.html)
        self.assertIn("A1–A4", self.html)
        self.assertIn("XP no es dominio", self.html)
        self.assertIn("Ninguna respuesta perfecta produce", self.app)
        self.assertIn("lessonXP", self.app)
        self.assertIn("game: { xp:", self.app)
        self.assertIn("mastery,", self.app)
        self.assertNotIn("item.state = learner.game", self.app)

    def test_demo_state_is_browser_local_and_noncanonical(self) -> None:
        self.assertIn("localStorage", self.app)
        self.assertIn("grafomed.learning.prototype.upper-limb.v1.2", self.app)
        self.assertNotIn("fetch(", self.app)
        self.assertNotIn("XMLHttpRequest", self.app)
        self.assertIn("No modifica el learner state canónico", self.html)

    def test_route_is_explainable_contextual_and_contestable(self) -> None:
        for visible_control in [
            'id="context-time"',
            'id="context-fatigue"',
            'id="context-modality"',
            'id="reason-factors"',
            'id="frontier-list"',
            'id="change-mission"',
        ]:
            self.assertIn(visible_control, self.html)
        self.assertIn("explainable-frontier-v0.1", self.app)
        self.assertIn("updateRouteDecision", self.app)
        self.assertIn("overrideCount", self.app)
        self.assertIn("Pesos sintéticos", self.app)

    def test_three_frontier_missions_have_real_lesson_content(self) -> None:
        for atom_id in [
            "gm-ma-identify-upper-limb-long-flat-bones",
            "gm-ma-locate-upper-limb-pulses",
            "gm-ma-reconstruct-brachial-plexus",
        ]:
            self.assertIn(f'"{atom_id}": {{', self.app)
        self.assertGreaterEqual(self.app.count('phase: "diagnostic"'), 3)
        self.assertGreaterEqual(self.app.count('phase: "near_transfer"'), 3)

    def test_assistance_confidence_and_productive_error_are_recorded(self) -> None:
        self.assertIn("Usar una pista", self.html)
        self.assertIn("Esta respuesta aportará evidencia asistida", self.app)
        self.assertIn("data-confidence", self.html)
        self.assertIn("calibrated", self.app)
        self.assertIn("Error productivo", self.app)
        self.assertIn("errorPattern", self.app)
        self.assertIn("assistanceWeight", self.app)
        for weight in ["none: 1", "hint: 0.65", "retry: 0.45", "tutored: 0.25"]:
            self.assertIn(weight, self.app)

    def test_acquisition_retention_and_transfer_are_separate(self) -> None:
        self.assertIn("delayed_retention", self.app)
        self.assertIn("near_transfer", self.app)
        self.assertIn("scheduledChecks", self.app)
        self.assertIn("Mañana", self.app)
        self.assertIn("En 7 días", self.app)
        self.assertIn("Una sola imagen es una muestra de transferencia", self.app)

    def test_missingness_is_not_treated_as_failure(self) -> None:
        for missingness in [
            "not_attempted",
            "not_observed",
            "insufficient_sample",
            "declined",
            "unavailable",
            "invalidated",
            "failed",
        ]:
            self.assertIn(missingness, self.app)
        self.assertIn("No intentado ≠ fallado", self.app)
        self.assertIn("La inactividad, una omisión", self.html)

    def test_open_learner_model_and_contest_flow_exist(self) -> None:
        self.assertIn('id="open-model"', self.html)
        self.assertIn('id="contest-inference"', self.html)
        self.assertIn("Qué lo cambiaría", self.app)
        self.assertIn("student_requested_context_review", self.app)
        self.assertIn("Inferencia contestada", self.app)

    def test_evidence_events_pin_versions_and_assessment_use(self) -> None:
        for field in [
            "assessmentUseRef",
            "attemptNumber",
            "latencyMs",
            "context:",
            "scorer:",
            "versions:",
            "RUBRIC_VERSION",
            "ALGORITHM_VERSION",
        ]:
            self.assertIn(field, self.app)
        self.assertIn("formative_low_stakes", self.app)
        self.assertIn("No autoriza certificación", self.app)

    def test_candidate_contracts_cover_validity_mechanisms_and_governance(self) -> None:
        evidence_path = CONTRACT_ROOT / "evidence-event.v0.schema.json"
        assessment_path = CONTRACT_ROOT / "assessment-use.v0.json"
        mechanisms_path = CONTRACT_ROOT / "pedagogical-mechanisms.v0.yaml"
        governance_path = CONTRACT_ROOT / "governance.v0.yaml"
        for path in [evidence_path, assessment_path, mechanisms_path, governance_path]:
            self.assertTrue(path.exists(), path)
        evidence_schema = json.loads(evidence_path.read_text(encoding="utf-8"))
        assessment = json.loads(assessment_path.read_text(encoding="utf-8"))
        self.assertIn("assistance", evidence_schema["required"])
        self.assertIn("versions", evidence_schema["required"])
        self.assertIn("certify competence", assessment["prohibited_decisions"])
        self.assertIn("not_empirically_set", json.dumps(assessment))
        mechanisms = mechanisms_path.read_text(encoding="utf-8")
        governance = governance_path.read_text(encoding="utf-8")
        self.assertIn("falsification_or_retirement", mechanisms)
        self.assertIn("retroactive_rewrite: prohibited", governance)
        self.assertIn("competence_leaderboards", governance)

    def test_privacy_accessibility_and_learning_metrics_are_visible(self) -> None:
        self.assertIn('id="export-evidence"', self.html)
        self.assertIn('id="toggle-low-bandwidth"', self.html)
        self.assertIn("Equidad y acceso", self.app)
        self.assertIn("sin auditar", self.app)
        self.assertIn("Aprendizaje, no clics", self.html)

    def test_javascript_parses(self) -> None:
        for path in [APP_PATH, DATA_PATH, NODE_PACK_JS]:
            result = subprocess.run(
                ["node", "--check", str(path)],
                check=False,
                capture_output=True,
                text=True,
            )
            self.assertEqual(result.returncode, 0, result.stderr)

    def test_mobile_navigation_and_responsive_rules_exist(self) -> None:
        self.assertIn("bottom-nav", self.html)
        self.assertIn("@media (max-width: 820px)", self.css)
        self.assertIn("@media (max-width: 560px)", self.css)

    def test_question_confidence_is_persistent_in_the_lesson_footer(self) -> None:
        footer_start = self.html.index('<footer class="lesson-footer">')
        footer_end = self.html.index("</footer>", footer_start)
        lesson_footer = self.html[footer_start:footer_end]
        self.assertIn('id="lesson-response-panel"', lesson_footer)
        self.assertIn('id="use-hint"', lesson_footer)
        self.assertIn('data-confidence="low"', lesson_footer)
        self.assertIn('id="lesson-continue"', lesson_footer)
        self.assertNotIn("question-controls", self.app)
        self.assertIn('document.getElementById("lesson-response-panel").hidden = true', self.app)

    def test_one_node_has_a_versioned_deep_learning_pack(self) -> None:
        self.assertTrue(NODE_PACK_SCHEMA.exists())
        self.assertEqual(self.node_pack["schemaVersion"], "0.1.0")
        self.assertEqual(self.node_pack["status"], "candidate_demo_not_promoted")
        self.assertEqual(self.node_pack["nodeRef"], "gm-ma-identify-upper-limb-long-flat-bones")
        self.assertEqual(len(self.node_pack["lessons"]), 7)
        activities = [activity for lesson in self.node_pack["lessons"] for activity in lesson["activities"]]
        self.assertEqual(len(activities), 33)
        self.assertEqual(sum(activity["type"] != "teach" for activity in activities), 29)
        self.assertEqual(sum(activity["type"] == "teach" for activity in activities), 4)
        self.assertEqual(
            {activity["type"] for activity in activities},
            {"teach", "single_choice", "multiple_select", "sequence", "short_answer"},
        )
        self.assertEqual(
            {activity["evidenceLevel"] for activity in activities if activity["type"] != "teach"},
            {"A1", "A2", "A3", "A4"},
        )
        activity_ids = [activity["id"] for activity in activities]
        self.assertEqual(len(activity_ids), len(set(activity_ids)))

    def test_deep_pack_compiler_is_deterministic(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            destination = Path(temporary_directory) / "node-pack.js"
            result = subprocess.run(
                ["python3", str(NODE_PACK_BUILDER), str(NODE_PACK_SOURCE), str(destination)],
                check=False,
                capture_output=True,
                text=True,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(destination.read_text(encoding="utf-8"), NODE_PACK_JS.read_text(encoding="utf-8"))

    def test_deep_pack_ui_and_activity_engine_are_present(self) -> None:
        for marker in [
            'id="deep-node-panel"',
            'id="deep-lesson-path"',
            'id="deep-review-timeline"',
            '<script src="node-pack.js"></script>',
        ]:
            self.assertIn(marker, self.html)
        for marker in [
            'activityType === "multiple_select"',
            'activityType === "sequence"',
            'activityType === "short_answer"',
            "normalizeAnswer",
            "reviewQueue",
            "post_deep_lesson_update",
        ]:
            self.assertIn(marker, self.app)
        self.assertIn("deep-node-panel", self.css)
        self.assertIn("short-answer-shell", self.css)
        self.assertIn("sequence-status", self.css)

    def test_deep_pack_review_plan_separates_retention_and_transfer(self) -> None:
        self.assertEqual([review["delayDays"] for review in self.node_pack["reviewPlan"]], [1, 3, 7, 21])
        purposes = " ".join(review["purpose"] for review in self.node_pack["reviewPlan"])
        self.assertIn("retención", purposes)
        self.assertIn("transferencia", purposes)
        self.assertIn("does not establish competence or transfer", self.node_pack["design"]["masteryBoundary"])

    def test_usamedic_brand_layer_uses_canonical_assets_and_tokens(self) -> None:
        for path in BRAND_ASSETS:
            self.assertTrue(path.exists(), path)
            self.assertEqual(path.read_bytes()[:8], b"\x89PNG\r\n\x1a\n")
        for marker in [
            "USAMEDIC · GrafoMed Quest",
            "assets/usamedic-isotipo.png",
            "assets/usamedic-logo-horizontal.png",
            "USAMEDIC Learning Lab",
            "Médicos de Excelencia",
            "institutional-footer",
        ]:
            self.assertIn(marker, self.html)
        for marker in [
            "--brand-primary: #2A7DE1",
            "--brand-secondary: #1DCAD3",
            "--brand-accent: #1BACE4",
            "--brand-gradient",
            "Montserrat",
            "Poppins",
        ]:
            self.assertIn(marker, self.css)
        legacy_palette = ["#15a36d", "#3e73e8", "#7658d7", "#d95e79", "#ec9f2e"]
        branded_sources = f"{self.css}\n{self.app}".lower()
        for legacy_color in legacy_palette:
            self.assertNotIn(legacy_color, branded_sources)


if __name__ == "__main__":
    unittest.main()
