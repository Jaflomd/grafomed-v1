#!/usr/bin/env python3
"""Acceptance tests for the first real Grafo Med vertical slice."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path
import subprocess
import unittest


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = PRODUCT_ROOT / "scripts" / "validate_slice.py"
PACKET_ROOT = PRODUCT_ROOT / "slice-packets" / "slice-genital-ulcer-syndrome-initial-management-v0"


def load_validator():
    spec = importlib.util.spec_from_file_location("grafomed_slice_validator", VALIDATOR)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class GrafoMedSliceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        subprocess.run(["python3", str(PRODUCT_ROOT / "scripts" / "generate_route.py")], check=True, capture_output=True, text=True)
        subprocess.run(["python3", str(VALIDATOR)], check=True, capture_output=True, text=True)
        cls.report = json.loads((PACKET_ROOT / "reviews" / "validation-report.json").read_text(encoding="utf-8"))

    def test_structural_validation_passes_without_promotion_claim(self) -> None:
        self.assertEqual(self.report["status"], "structural_pass_promotion_blocked")
        self.assertEqual(self.report["errors"], [])
        self.assertFalse(self.report["promotion_eligible"])

    def test_scope_counts_are_exact(self) -> None:
        self.assertEqual(self.report["counts"]["medical_truth_and_assemblies"], 15)
        self.assertEqual(self.report["counts"]["learning_support"], 3)
        self.assertEqual(self.report["counts"]["relations"], 29)
        self.assertEqual(self.report["counts"]["mcqs"], 5)

    def test_all_five_review_domains_remain_honestly_pending(self) -> None:
        review_check = next(check for check in self.report["checks"] if check["name"] == "review_separation_and_promotion_guard")
        self.assertEqual(set(review_check["pending_reviews"]), {"semantic", "clinical", "educational", "systems", "independent_audit"})

    def test_generated_route_matches_gold_order(self) -> None:
        gold = json.loads((PRODUCT_ROOT / "routes" / "route-gud-gold-v0.json").read_text(encoding="utf-8"))
        generated = json.loads((PRODUCT_ROOT / "routes" / "route-gud-generated-v0.json").read_text(encoding="utf-8"))
        self.assertEqual([step["node_id"] for step in generated["steps"]], [step["node_id"] for step in gold["steps"]])
        self.assertEqual(generated["snapshot_id"], gold["snapshot_id"])

    def test_assessment_is_original_and_experimental(self) -> None:
        import yaml

        learning = yaml.safe_load((PACKET_ROOT / "candidates" / "learning" / "learning.yaml").read_text(encoding="utf-8"))["nodes"]
        assessment = next(item for item in learning if item["object_type"] == "assessment")
        self.assertFalse(assessment["copied_external_items"])
        self.assertEqual(assessment["psychometric_status"], "experimental_unvalidated")
        self.assertEqual(len(assessment["items"]), 5)
        self.assertTrue(assessment["transfer_case"]["synthetic"])

    def test_every_current_syphilis_node_has_one_learning_contract(self) -> None:
        import yaml

        nodes = yaml.safe_load((PACKET_ROOT / "candidates" / "nodes" / "nodes.yaml").read_text(encoding="utf-8"))["nodes"]
        syphilis_nodes = [node for node in nodes if "syphilis" in f'{node["id"]} {node["label"]}'.lower()]
        self.assertEqual(
            {node["id"] for node in syphilis_nodes},
            {"gm-condition-primary-syphilis", "gm-test-syphilis-evaluation-in-gud"},
        )
        for node in syphilis_nodes:
            contract = node["learning_contract"]
            self.assertEqual(set(contract), {"objective", "expected_performance", "mastery_evidence"})
            self.assertIsInstance(contract["objective"], str)
            self.assertNotIsInstance(contract["objective"], list)
            self.assertGreater(len(contract["objective"]), 40)
            self.assertGreater(len(contract["expected_performance"]), 80)
            self.assertGreater(len(contract["mastery_evidence"]), 60)


if __name__ == "__main__":
    unittest.main()
