#!/usr/bin/env python3
"""Acceptance checks for the local Grafo Med HTML viewer."""

from __future__ import annotations

from html.parser import HTMLParser
import importlib.util
import json
from pathlib import Path
import subprocess
import unittest

import yaml


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
VIEWER_ROOT = PRODUCT_ROOT / "viewer"
EXPORT = PRODUCT_ROOT / "exports" / "grafomed-viewer.html"


class ViewerHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.mode_values: set[str] = set()
        self.external_scripts: list[str] = []
        self.stylesheets: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(str(values["id"]))
        if values.get("data-mode"):
            self.mode_values.add(str(values["data-mode"]))
        if tag == "script" and values.get("src"):
            self.external_scripts.append(str(values["src"]))
        if tag == "link" and values.get("rel") == "stylesheet" and values.get("href"):
            self.stylesheets.append(str(values["href"]))


def load_builder_module():
    spec = importlib.util.spec_from_file_location("grafomed_viewer_builder", VIEWER_ROOT / "build_viewer.py")
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class GrafoMedViewerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        subprocess.run(
            ["python3", str(VIEWER_ROOT / "build_viewer.py")],
            cwd=PRODUCT_ROOT.parents[1],
            check=True,
            capture_output=True,
            text=True,
        )

    def test_source_javascript_parses(self) -> None:
        result = subprocess.run(
            ["node", "--check", str(VIEWER_ROOT / "app.js")],
            check=False,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_local_entrypoint_has_three_synchronized_modes(self) -> None:
        parser = ViewerHTMLParser()
        parser.feed((VIEWER_ROOT / "index.html").read_text(encoding="utf-8"))
        self.assertEqual(parser.mode_values, {"graph", "route", "inspector"})
        required_ids = {
            "graph-canvas",
            "graph-svg",
            "route-content",
            "inspector-content",
            "proposal-dialog",
            "snapshot-file",
            "graph-search",
        }
        self.assertTrue(required_ids.issubset(parser.ids))
        self.assertEqual(parser.external_scripts, ["data/viewer-data.js", "app.js"])
        self.assertEqual(parser.stylesheets, ["styles.css"])

    def test_viewer_is_node_first(self) -> None:
        app = (VIEWER_ROOT / "app.js").read_text(encoding="utf-8")
        html = (VIEWER_ROOT / "index.html").read_text(encoding="utf-8")
        spec = (VIEWER_ROOT / "VIEWER_SPEC.md").read_text(encoding="utf-8")
        self.assertIn('modeGraph: "Nodes"', app)
        self.assertIn('modeGraph: "Nodos"', app)
        self.assertIn('overview: true', app)
        self.assertIn('state.selectedNodeId = null', app)
        self.assertIn("layoutNodeOverview", app)
        self.assertNotIn("isRelated(edge) || state.overview", app)
        self.assertIn('aria-label="Node map"', html)
        self.assertIn("primary surface is a node map", spec)

    def test_primary_graph_is_interactive_three_dimensional_canvas(self) -> None:
        app = (VIEWER_ROOT / "app.js").read_text(encoding="utf-8")
        html = (VIEWER_ROOT / "index.html").read_text(encoding="utf-8")
        spec = (VIEWER_ROOT / "VIEWER_SPEC.md").read_text(encoding="utf-8")
        self.assertIn('<canvas id="graph-canvas"', html)
        self.assertIn("layoutGraph3D", app)
        self.assertIn("project3D", app)
        self.assertIn("bindCanvasNavigation", app)
        self.assertIn("startGraphAnimation", app)
        self.assertIn("findCanvasNode", app)
        self.assertIn("curriculum cone", spec)
        self.assertIn("no legacy node, relation, state", spec)

    def test_spanish_is_default_and_covers_generated_objects(self) -> None:
        app = (VIEWER_ROOT / "app.js").read_text(encoding="utf-8")
        locale = yaml.safe_load((VIEWER_ROOT / "locales" / "es.yaml").read_text(encoding="utf-8"))
        source = (VIEWER_ROOT / "data" / "viewer-data.js").read_text(encoding="utf-8").strip()
        prefix = "window.GRAFOMED_VIEWER_DATA = "
        data = json.loads(source[len(prefix):-1])
        self.assertIn('return "es";', app)
        self.assertIn("grafomed-viewer-language-v2", app)
        self.assertEqual(set(locale["nodes"]), {node["id"] for node in data["nodes"]})
        self.assertEqual(set(locale["routes"]), {route["id"] for route in data["routes"]})
        for node in data["nodes"]:
            self.assertTrue(node["localizations"]["es"]["label"])
            self.assertTrue(node["localizations"]["es"]["summary"])
        for route in data["routes"]:
            self.assertTrue(route["localizations"]["es"]["label"])
            self.assertTrue(route["localizations"]["es"]["goal"])
            for step in route["steps"]:
                self.assertTrue(step["localizations"]["es"]["reason"])

    def test_syphilis_learning_contracts_render_in_spanish(self) -> None:
        app = (VIEWER_ROOT / "app.js").read_text(encoding="utf-8")
        source = (VIEWER_ROOT / "data" / "viewer-data.js").read_text(encoding="utf-8").strip()
        prefix = "window.GRAFOMED_VIEWER_DATA = "
        data = json.loads(source[len(prefix):-1])
        syphilis_nodes = [node for node in data["nodes"] if "syphilis" in f'{node["id"]} {node["label"]}'.lower()]
        self.assertEqual(len(syphilis_nodes), 2)
        for node in syphilis_nodes:
            self.assertTrue(node["learning_contract"]["objective"])
            spanish = node["localizations"]["es"]["learning_contract"]
            self.assertTrue(spanish["objective"])
            self.assertTrue(spanish["expected_performance"])
            self.assertTrue(spanish["mastery_evidence"])
        self.assertIn('learningContract: "Contrato de aprendizaje"', app)
        self.assertIn('class="detail-section learning-contract"', app)

    def test_demo_fixture_is_explicit_and_relationally_closed(self) -> None:
        data = json.loads((VIEWER_ROOT / "fixtures" / "architecture-demo.json").read_text(encoding="utf-8"))
        self.assertTrue(data["meta"]["demo"])
        self.assertFalse(data["meta"]["canonical"])
        self.assertEqual(data["meta"]["data_mode"], "architecture_demo")
        node_ids = {node["id"] for node in data["nodes"]}
        self.assertGreaterEqual(len(node_ids), 10)
        for edge in data["edges"]:
            self.assertIn(edge["source"], node_ids)
            self.assertIn(edge["target"], node_ids)

    def test_generated_data_is_an_honest_candidate_projection(self) -> None:
        source = (VIEWER_ROOT / "data" / "viewer-data.js").read_text(encoding="utf-8").strip()
        prefix = "window.GRAFOMED_VIEWER_DATA = "
        self.assertTrue(source.startswith(prefix))
        self.assertTrue(source.endswith(";"))
        data = json.loads(source[len(prefix):-1])
        self.assertEqual(data["meta"]["data_mode"], "candidate_projection")
        self.assertFalse(data["meta"]["demo"])
        self.assertFalse(data["meta"]["canonical"])
        self.assertGreaterEqual(len(data["nodes"]), 18)
        self.assertEqual(len(data["edges"]), 29)
        self.assertEqual(len(data["routes"]), 2)

    def test_honest_empty_state_is_available(self) -> None:
        builder = load_builder_module()
        data = builder.build_data(use_demo_if_empty=False)
        self.assertEqual(data["meta"]["data_mode"], "candidate_projection")
        self.assertFalse(data["meta"]["canonical"])
        self.assertGreaterEqual(len(data["nodes"]), 18)

    def test_self_contained_export_has_no_runtime_file_dependencies(self) -> None:
        html = EXPORT.read_text(encoding="utf-8")
        parser = ViewerHTMLParser()
        parser.feed(html)
        self.assertEqual(parser.external_scripts, [])
        self.assertEqual(parser.stylesheets, [])
        self.assertIn("window.GRAFOMED_VIEWER_DATA", html)
        self.assertIn("Grafo Med", html)

    def test_viewer_has_no_canonical_write_authority(self) -> None:
        spec = (VIEWER_ROOT / "VIEWER_SPEC.md").read_text(encoding="utf-8")
        config = (PRODUCT_ROOT / "config" / "product.yaml").read_text(encoding="utf-8")
        app = (VIEWER_ROOT / "app.js").read_text(encoding="utf-8")
        self.assertIn("canonical_write_access: false", config)
        self.assertIn("direct_canonical_write: false", app)
        self.assertIn("must never", spec)
        self.assertNotIn("fetch(", app)

    def test_learner_state_is_not_read_by_builder(self) -> None:
        builder = (VIEWER_ROOT / "build_viewer.py").read_text(encoding="utf-8")
        self.assertNotIn('PRODUCT_ROOT / "learner-state"', builder)


if __name__ == "__main__":
    unittest.main()
