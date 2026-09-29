#!/usr/bin/env python3
"""Structural acceptance checks for the vertebral-column candidate design."""

from __future__ import annotations

from pathlib import Path
import unittest

import yaml


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
CLUSTER_PATH = PRODUCT_ROOT / "designs" / "objective-clusters" / "vertebral-column-v0.yaml"
REGISTRY_PATH = PRODUCT_ROOT / "config" / "relation-registry.yaml"


class VertebralClusterTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.cluster = yaml.safe_load(CLUSTER_PATH.read_text(encoding="utf-8"))
        cls.registry = yaml.safe_load(REGISTRY_PATH.read_text(encoding="utf-8"))
        cls.knowledge = cls.cluster["knowledge_entity_layer"]
        cls.entities = cls.knowledge["entities"]
        cls.entity_ids = {entity["id"] for entity in cls.entities}
        cls.atoms = [
            atom
            for key_objective in cls.cluster["objective_hierarchy"]
            for atom in key_objective["mastery_atoms"]
        ]
        cls.atom_ids = {atom["id"] for atom in cls.atoms}

    def test_design_remains_candidate_and_unpromoted(self) -> None:
        self.assertEqual(self.cluster["status"], "candidate_design_not_promoted")
        self.assertFalse(self.cluster["design_status"]["promotion_allowed"])
        self.assertEqual(self.knowledge["status"], "source_locked_candidate_not_promoted")

    def test_knowledge_layer_has_one_archetype_and_ten_morphotypes(self) -> None:
        self.assertEqual(len(self.entities), 11)
        self.assertEqual(len(self.entity_ids), 11)
        self.assertIn("gm-anatomy-vertebra-general", self.entity_ids)
        self.assertEqual(self.cluster["quality_counts"]["knowledge_entities"], 11)
        self.assertEqual(self.cluster["quality_counts"]["vertebral_morphotypes"], 10)
        for entity in self.entities:
            self.assertNotIn("learning_contract", entity)
            self.assertTrue(entity["definition"])
            self.assertTrue(entity["discriminating_features"])
            self.assertTrue(entity["source_refs"])

    def test_every_mastery_atom_keeps_one_scalar_objective(self) -> None:
        self.assertEqual(len(self.atoms), 18)
        self.assertEqual(len(self.atom_ids), 18)
        for atom in self.atoms:
            contract = atom["learning_contract"]
            self.assertEqual(set(contract), {"objective", "expected_performance", "mastery_evidence"})
            self.assertIsInstance(contract["objective"], str)
            self.assertNotIsInstance(contract["objective"], list)

    def test_entity_relations_are_closed_and_registry_backed(self) -> None:
        relations = self.knowledge["relations"]
        registry_types = set(self.registry["rules"])
        valid_endpoints = self.entity_ids | self.atom_ids
        self.assertEqual(len(relations), 25)
        self.assertEqual(len({relation["id"] for relation in relations}), 25)
        for relation in relations:
            self.assertIn(relation["source"], valid_endpoints)
            self.assertIn(relation["target"], valid_endpoints)
            self.assertIn(relation["relation_type"], registry_types)
            self.assertTrue(relation["source_refs"])

    def test_all_morphotypes_feed_regional_classification(self) -> None:
        expected = self.entity_ids - {"gm-anatomy-vertebra-general"}
        actual = {
            relation["source"]
            for relation in self.knowledge["relations"]
            if relation["relation_type"] == "enables_mastery_of"
            and relation["target"] == "gm-ma-clasificar-vertebra-por-region"
        }
        self.assertEqual(actual, expected)
        atom = next(atom for atom in self.atoms if atom["id"] == "gm-ma-clasificar-vertebra-por-region")
        self.assertEqual(set(atom["evidence_object_refs"]), expected)

    def test_atypical_recognition_has_bounded_entity_set(self) -> None:
        expected = {
            "gm-anatomy-atlas-c1",
            "gm-anatomy-axis-c2",
            "gm-anatomy-cervical-c7",
            "gm-anatomy-thoracic-atypical",
            "gm-anatomy-lumbar-l5",
        }
        actual = {
            relation["source"]
            for relation in self.knowledge["relations"]
            if relation["relation_type"] == "enables_mastery_of"
            and relation["target"] == "gm-ma-reconocer-vertebras-atipicas"
        }
        self.assertEqual(actual, expected)
        atom = next(atom for atom in self.atoms if atom["id"] == "gm-ma-reconocer-vertebras-atipicas")
        self.assertEqual(set(atom["evidence_object_refs"]), expected)

    def test_registry_allows_anatomy_to_enable_mastery(self) -> None:
        enables = self.registry["rules"]["enables_mastery_of"]
        subtype = self.registry["rules"]["anatomical_subtype_of"]
        self.assertIn("anatomical_entity", enables["domain"])
        self.assertEqual(enables["range"], ["mastery_atom"])
        self.assertEqual(subtype["domain"], ["anatomical_entity"])
        self.assertEqual(subtype["range"], ["anatomical_entity"])


if __name__ == "__main__":
    unittest.main()
