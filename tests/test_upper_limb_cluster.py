#!/usr/bin/env python3
"""Structural acceptance checks for the upper-limb candidate cluster."""

from __future__ import annotations

from collections import Counter
from pathlib import Path
import unittest

from jsonschema import Draft202012Validator
import yaml


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
CLUSTER_PATH = PRODUCT_ROOT / "designs" / "objective-clusters" / "upper-limb-v0.yaml"
RELATIONS_PATH = PRODUCT_ROOT / "designs" / "objective-clusters" / "upper-limb-v0-relations.yaml"
REGISTRY_PATH = PRODUCT_ROOT / "config" / "relation-registry.yaml"
RELATION_SCHEMA_PATH = PRODUCT_ROOT / "schemas" / "relation.schema.json"


class UpperLimbClusterTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.cluster = yaml.safe_load(CLUSTER_PATH.read_text(encoding="utf-8"))
        cls.relations = yaml.safe_load(RELATIONS_PATH.read_text(encoding="utf-8"))
        cls.registry = yaml.safe_load(REGISTRY_PATH.read_text(encoding="utf-8"))
        cls.relation_schema = yaml.safe_load(RELATION_SCHEMA_PATH.read_text(encoding="utf-8"))
        cls.knowledge = cls.cluster["knowledge_entity_layer"]
        cls.families = cls.knowledge["families"]
        cls.entities = cls.knowledge["entities"]
        cls.key_objectives = cls.cluster["objective_hierarchy"]
        cls.atoms = [
            atom
            for key_objective in cls.key_objectives
            for atom in key_objective["mastery_atoms"]
        ]
        cls.assemblies = cls.cluster["integrating_assemblies"]
        cls.routes = cls.cluster["route_templates"]

    def test_design_remains_candidate_and_unpromoted(self) -> None:
        self.assertEqual(self.cluster["status"], "candidate_design_not_promoted")
        self.assertFalse(self.cluster["design_status"]["promotion_allowed"])
        self.assertEqual(
            self.knowledge["status"], "source_locked_candidate_not_promoted"
        )
        self.assertEqual(
            self.relations["status"], "candidate_derived_view_not_promoted"
        )

    def test_expected_object_counts_and_unique_ids(self) -> None:
        self.assertEqual(len(self.key_objectives), 10)
        self.assertEqual(len(self.atoms), 33)
        self.assertEqual(len(self.assemblies), 5)
        self.assertEqual(len(self.routes), 4)
        self.assertEqual(len(self.families), 5)
        self.assertEqual(len(self.entities), 54)
        ids = [self.cluster["id"]]
        ids += [item["id"] for item in self.key_objectives]
        ids += [item["id"] for item in self.atoms]
        ids += [item["id"] for item in self.assemblies]
        ids += [item["id"] for item in self.routes]
        ids += [item["id"] for item in self.families]
        ids += [item["id"] for item in self.entities]
        self.assertFalse([item for item, count in Counter(ids).items() if count > 1])

    def test_all_twenty_one_source_outcomes_are_covered(self) -> None:
        covered = {
            outcome
            for key_objective in self.key_objectives
            for outcome in key_objective["source_outcomes"]
        }
        self.assertEqual(covered, set(range(50, 71)))

    def test_every_mastery_atom_has_exactly_one_scalar_objective(self) -> None:
        for atom in self.atoms:
            contract = atom["learning_contract"]
            self.assertEqual(
                set(contract), {"objective", "expected_performance", "mastery_evidence"}
            )
            for value in contract.values():
                self.assertIsInstance(value, str)
                self.assertTrue(value.strip())

    def test_knowledge_entities_have_no_fictitious_learning_objectives(self) -> None:
        family_ids = {family["id"] for family in self.families}
        for entity in self.entities:
            self.assertNotIn("learning_contract", entity)
            self.assertTrue(entity["definition"])
            self.assertIn(entity["parent_ref"], family_ids)

    def test_references_are_closed(self) -> None:
        knowledge_ids = {
            item["id"] for item in self.families + self.entities
        }
        atom_ids = {atom["id"] for atom in self.atoms}
        assembly_ids = {assembly["id"] for assembly in self.assemblies}
        for atom in self.atoms:
            self.assertTrue(atom["evidence_object_refs"])
            self.assertTrue(set(atom["evidence_object_refs"]).issubset(knowledge_ids))
        for assembly in self.assemblies:
            self.assertTrue(set(assembly["member_refs"]).issubset(atom_ids))
        valid_route_targets = {self.cluster["id"]} | assembly_ids
        for route in self.routes:
            self.assertIn(route["target"], valid_route_targets)
            self.assertTrue(set(route["suggested_sequence"]).issubset(atom_ids))

    def test_relations_are_materialized_and_schema_valid(self) -> None:
        edges = self.relations["edges"]
        counts = self.relations["quality_counts"]
        self.assertEqual(counts, {"part_of": 54, "enables_mastery_of": 167, "total": 221})
        self.assertEqual(len(edges), 221)
        self.assertEqual(len({edge["id"] for edge in edges}), 221)
        validator = Draft202012Validator(self.relation_schema)
        for edge in edges:
            self.assertFalse(list(validator.iter_errors(edge)))
            self.assertIn(edge["relation_type"], self.registry["rules"])

    def test_part_of_and_learning_relations_match_source_fields(self) -> None:
        expected_part_of = {
            (entity["id"], entity["parent_ref"]) for entity in self.entities
        }
        actual_part_of = {
            (edge["source"], edge["target"])
            for edge in self.relations["edges"]
            if edge["relation_type"] == "part_of"
        }
        expected_learning = {
            (evidence_ref, atom["id"])
            for atom in self.atoms
            for evidence_ref in atom["evidence_object_refs"]
        }
        actual_learning = {
            (edge["source"], edge["target"])
            for edge in self.relations["edges"]
            if edge["relation_type"] == "enables_mastery_of"
        }
        self.assertEqual(actual_part_of, expected_part_of)
        self.assertEqual(actual_learning, expected_learning)


if __name__ == "__main__":
    unittest.main()
