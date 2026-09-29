#!/usr/bin/env python3
"""Generate the deterministic v0 route for the first Grafo Med slice."""

from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path
from typing import Any

import yaml


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
PACKET_ID = "slice-genital-ulcer-syndrome-initial-management-v0"
PACKET_ROOT = PRODUCT_ROOT / "slice-packets" / PACKET_ID
TARGET = "gm-mastery-gud-initial-management"
STATE_PATH = PRODUCT_ROOT / "learner-state" / "fixture-gud-v0.json"
OUTPUT = PRODUCT_ROOT / "routes" / "route-gud-generated-v0.json"


def load_yaml(path: Path) -> dict[str, Any]:
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def candidate_objects() -> dict[str, dict[str, Any]]:
    result: dict[str, dict[str, Any]] = {}
    for path in sorted((PACKET_ROOT / "candidates").rglob("*.yaml")):
        document = load_yaml(path)
        for item in document.get("nodes", []):
            result[item["id"]] = item
    return result


def relations() -> list[dict[str, Any]]:
    document = load_yaml(PACKET_ROOT / "candidates" / "relations" / "relations.yaml")
    return document["edges"]


def snapshot_id() -> str:
    files = sorted(
        path
        for section in ("source_lock", "evidence_bundle", "candidates")
        for path in (PACKET_ROOT / section).rglob("*")
        if path.is_file()
    )
    digest = sha256()
    for path in files:
        digest.update(str(path.relative_to(PRODUCT_ROOT)).encode())
        digest.update(path.read_bytes())
    return f"gm-snap-{digest.hexdigest()[:16]}"


def prerequisite_order(target: str, edges: list[dict[str, Any]]) -> list[str]:
    requirements: dict[str, list[str]] = {}
    for edge in edges:
        if edge["relation_type"] == "requires":
            requirements.setdefault(edge["source"], []).append(edge["target"])
    ordered: list[str] = []
    visiting: set[str] = set()
    visited: set[str] = set()

    def visit(node: str) -> None:
        if node in visiting:
            raise ValueError(f"Cycle in requires relations at {node}")
        if node in visited:
            return
        visiting.add(node)
        for requirement in requirements.get(node, []):
            visit(requirement)
        visiting.remove(node)
        visited.add(node)
        ordered.append(node)

    visit(target)
    return ordered


def kind_for(item: dict[str, Any]) -> str:
    object_type = item["object_type"]
    return {
        "clinical_finding": "orient",
        "condition": "learn",
        "illness_script": "apply",
        "differential_set": "apply",
        "test": "retrieve",
        "decision_atom": "decide",
        "detcsp_pathway": "apply",
        "assessment": "assess",
    }.get(object_type, "learn")


def main() -> None:
    objects = candidate_objects()
    edges = relations()
    state = json.loads(STATE_PATH.read_text(encoding="utf-8"))
    before = state["states"]["before"]["mastery"]
    mastery_order = prerequisite_order(TARGET, edges)
    steps: list[dict[str, Any]] = []
    seen: set[str] = set()
    for mastery_id in mastery_order:
        estimate = float(before.get(mastery_id, {}).get("estimate", 0.0))
        review_due = bool(before.get(mastery_id, {}).get("review_due", False))
        if estimate >= 0.75 and not review_due:
            continue
        mastery = objects[mastery_id]
        for object_id in mastery["evidence_object_refs"]:
            if object_id in seen:
                continue
            seen.add(object_id)
            item = objects[object_id]
            steps.append(
                {
                    "order": len(steps) + 1,
                    "node_id": object_id,
                    "kind": kind_for(item),
                    "reason": f"Required evidence for {mastery['label']}; current fixture estimate is {estimate:.2f}.",
                    "mastery_ref": mastery_id,
                }
            )
    assessment_id = "gm-assessment-gud-v0"
    steps.append(
        {
            "order": len(steps) + 1,
            "node_id": assessment_id,
            "kind": "assess",
            "reason": "Collect observable evidence across both mastery atoms and select success, remediation, or transfer next action.",
            "mastery_ref": TARGET,
        }
    )
    route = {
        "schema": "grafomed-route.v1",
        "id": "gm-route-gud-generated-v0",
        "label": "Generated route - anogenital ulcer initial management",
        "goal": "Evaluate an anogenital ulcer and commit to an evidence-backed first management state in context.",
        "route_kind": "generated",
        "status": "candidate",
        "snapshot_id": snapshot_id(),
        "target_refs": mastery_order,
        "steps": steps,
        "constraints": {
            "hard_prerequisites_enforced": True,
            "mastered_threshold_fixture_only": 0.75,
            "learner_state_ref": "products/grafomed-v1/learner-state/fixture-gud-v0.json#states.before",
            "resource_selection_deferred": True,
        },
        "provenance": {
            "created_by": "mia",
            "created_at": "2026-08-26T16:29:00-05:00",
            "packet_id": PACKET_ID,
            "algorithm": "deterministic_requires_then_declared_evidence_order_v0",
        },
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(route, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(PRODUCT_ROOT.parent.parent)} with {len(steps)} steps and snapshot {route['snapshot_id']}")


if __name__ == "__main__":
    main()

