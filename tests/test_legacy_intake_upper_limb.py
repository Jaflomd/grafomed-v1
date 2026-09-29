#!/usr/bin/env python3
"""Structural checks for the first legacy-reference intake proposal."""

from __future__ import annotations

from pathlib import Path
import unittest

import yaml


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
PROPOSAL_PATH = PRODUCT_ROOT / "designs" / "intake-proposals" / "upper-limb-osteology-imaging-v0.yaml"
CLUSTER_PATH = PRODUCT_ROOT / "designs" / "objective-clusters" / "upper-limb-v0.yaml"


class UpperLimbLegacyIntakeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.proposal = yaml.safe_load(PROPOSAL_PATH.read_text(encoding="utf-8"))
        cls.cluster = yaml.safe_load(CLUSTER_PATH.read_text(encoding="utf-8"))
        cls.cluster_entity_ids = {
            entity["id"]
            for entity in cls.cluster["knowledge_entity_layer"]["entities"]
        }
        cls.cluster_mastery_ids = {
            atom["id"]
            for key_objective in cls.cluster["objective_hierarchy"]
            for atom in key_objective["mastery_atoms"]
        }

    def test_intake_is_a_proposal_not_a_migration(self) -> None:
        self.assertEqual(self.proposal["status"], "candidate_proposal_not_ingested")
        self.assertFalse(self.proposal["canonical_write_performed"])
        self.assertFalse(self.proposal["legacy_migration_performed"])
        self.assertFalse(self.proposal["legacy_reference"]["direct_import_allowed"])

    def test_fourteen_legacy_records_are_bounded_and_unique(self) -> None:
        refs = self.proposal["legacy_reference"]["records_reviewed"]
        self.assertEqual(len(refs), 14)
        self.assertEqual(len(set(refs)), 14)
        self.assertEqual(self.proposal["scope"]["primary_source_outcomes"], [50, 51, 70])

    def test_existing_reuse_references_are_real_current_objects(self) -> None:
        reused = self.proposal["existing_objects_to_reuse"]
        self.assertTrue(set(reused["anatomical_entities"]).issubset(self.cluster_entity_ids))
        self.assertTrue(set(reused["mastery_atoms"]).issubset(self.cluster_mastery_ids))

    def test_candidate_objects_are_bounded_and_have_unique_identity(self) -> None:
        anatomical = self.proposal["candidate_anatomical_entities_to_add"]
        clinical = self.proposal["candidate_clinical_context_entities_to_add"]
        self.assertEqual(len(anatomical), 24)
        self.assertEqual(len(clinical), 9)
        ids = [item["id"] for item in anatomical + clinical]
        self.assertEqual(len(ids), len(set(ids)))
        self.assertFalse(set(ids) & self.cluster_entity_ids)

    def test_no_broad_legacy_learning_node_is_silently_preserved(self) -> None:
        changes = self.proposal["mastery_atom_changes"]
        self.assertIn(
            "gm-ma-identify-upper-limb-long-flat-bones",
            changes["retire_as_atom_and_replace_with_cluster"],
        )
        replacement_ids = [item["id"] for item in changes["replace_with"]]
        self.assertEqual(
            replacement_ids,
            [
                "gm-ma-orient-clavicle",
                "gm-ma-orient-scapula",
                "gm-ma-orient-humerus",
                "gm-ma-distinguish-orient-radius-ulna",
            ],
        )
        for item in changes["replace_with"] + changes["add"]:
            self.assertIsInstance(item["objective"], str)
            self.assertTrue(item["objective"].strip())

    def test_semantic_relations_must_exist_before_ingest(self) -> None:
        requested = {
            item["type"]
            for item in self.proposal["relation_registry_extensions_required_before_ingest"]
        }
        self.assertEqual(
            requested,
            {
                "articulates_with",
                "affects_anatomical_entity",
                "places_at_risk",
                "surface_projection_of",
            },
        )
        gate = self.proposal["ingestion_gate"]
        self.assertTrue(gate["javier_approval_required"])
        self.assertTrue(gate["relation_registry_amendment_required"])
        self.assertTrue(gate["anatomy_review_required"])


if __name__ == "__main__":
    unittest.main()
