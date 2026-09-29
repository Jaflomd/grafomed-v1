"""Acceptance tests for the unified Builder/Learner integration boundary."""
import json
import unittest

from integration import SNAPSHOT_VERSION, build_snapshot, validate_snapshot


class IntegrationSnapshotTests(unittest.TestCase):
    def test_snapshot_is_deterministic_and_candidate_scoped(self):
        first = build_snapshot()
        second = build_snapshot()
        self.assertEqual(first, second)
        self.assertEqual(first["schema"], SNAPSHOT_VERSION)
        self.assertEqual(first["release_status"], "internal_only")
        self.assertEqual(validate_snapshot(first), [])
        self.assertEqual(first["snapshot_hash"], second["snapshot_hash"])

    def test_snapshot_joins_builder_routes_and_candidate_packet(self):
        snapshot = build_snapshot()
        self.assertGreaterEqual(len(snapshot["builder"]["nodes"]), 1)
        self.assertEqual(len(snapshot["builder"]["routes"]), 2)
        packet = snapshot["packets"][0]
        self.assertEqual(packet["id"], "slice-genital-ulcer-syndrome-initial-management-v0")
        self.assertEqual(packet["release_status"], "internal_only")
        self.assertTrue(all(value == "pending_separate_review" for value in packet["required_gates"].values()))

    def test_snapshot_never_contains_learner_state_or_write_authority(self):
        snapshot = build_snapshot()
        serialized = json.dumps(snapshot, ensure_ascii=False)
        self.assertNotIn('"states"', serialized)
        self.assertFalse(snapshot["learner"]["state_included"])
        self.assertFalse(snapshot["governance"]["canonical_write"])

    def test_validator_rejects_leaked_state_and_write_authority(self):
        snapshot = build_snapshot()
        snapshot["learner"]["state_included"] = True
        snapshot["governance"]["canonical_write"] = True
        self.assertEqual(set(validate_snapshot(snapshot)), {"canonical_write", "learner_state_leak"})


if __name__ == "__main__":
    unittest.main()
