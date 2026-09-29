"""Structural acceptance checks for the SQL learner's daily-journey surface."""
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class LearnerVisionTests(unittest.TestCase):
    def setUp(self):
        self.js = (ROOT / "app/static/app.js").read_text(encoding="utf-8")
        self.css = (ROOT / "app/static/styles.css").read_text(encoding="utf-8")

    def test_daily_journey_has_focal_mission_and_frontier(self):
        for marker in ("TU RECORRIDO", "Cada círculo es una decisión", "CONCEPTO", "FACT / REGLA", "PROCEDURE", "duo-product-grid", "duo-decision-orb", "--node-count", "repeating-conic-gradient"):
            self.assertIn(marker, self.js + self.css)

    def test_learner_navigation_is_route_only(self):
        self.assertIn("const navItems = [ ['home', 'Mi recorrido', 'home'] ];", self.js)
        self.assertIn("The learner sees the route only", self.js)

    def test_rewards_are_explicitly_separate_from_learning_evidence(self):
        self.assertIn("puntos de práctica", self.js)
        self.assertIn("No son puntos de dominio", self.js)
        self.assertIn("La motivación no reemplaza la evidencia", self.js)

    def test_usamedic_tokens_are_present_in_the_new_surface(self):
        for token in ("#2a7de1", "#1dcad3", "#1bace4"):
            self.assertIn(token, self.css.lower())


if __name__ == "__main__":
    unittest.main()
