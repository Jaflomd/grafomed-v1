"""Build the read-only cross-surface snapshot used by Grafo Med alpha.

This module is deliberately dependency-free. It joins already-derived viewer
data, the reviewed slice manifest and the learner release metadata without
copying learner evidence into the builder surface.
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

PRODUCT_ROOT = Path(__file__).resolve().parent
SNAPSHOT_VERSION = "grafomed-integration-snapshot.v1"


def _read_viewer_data() -> Dict[str, Any]:
    source = (PRODUCT_ROOT / "viewer/data/viewer-data.js").read_text(encoding="utf-8").strip()
    prefix = "window.GRAFOMED_VIEWER_DATA = "
    if not source.startswith(prefix) or not source.endswith(";"):
        raise ValueError("viewer-data.js no contiene un snapshot válido")
    return json.loads(source[len(prefix):-1])


def _packet_metadata() -> Dict[str, Any]:
    text = (PRODUCT_ROOT / "slice-packets/slice-genital-ulcer-syndrome-initial-management-v0/packet.yaml").read_text(encoding="utf-8")

    def scalar(name: str, default: str = "") -> str:
        match = re.search(rf"^{re.escape(name)}:\s*([^\n#]+)", text, re.MULTILINE)
        return match.group(1).strip().strip("'\"") if match else default

    gates = {}
    in_gates = False
    for line in text.splitlines():
        if line == "required_gates:":
            in_gates = True
            continue
        if in_gates and line and not line.startswith("  "):
            break
        if in_gates:
            match = re.match(r"\s{2}([a-z_]+):\s*(.+)", line)
            if match:
                gates[match.group(1)] = match.group(2).strip()
    return {
        "id": scalar("id"),
        "version": scalar("version"),
        "title": scalar("title"),
        "lifecycle": scalar("lifecycle"),
        "release_status": scalar("release_status"),
        "authority": scalar("authority"),
        "required_gates": gates,
    }


def _digest(payload: Dict[str, Any]) -> str:
    canonical = json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def build_snapshot(learner_release: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    viewer = _read_viewer_data()
    packet = _packet_metadata()
    learner_release = learner_release or {"id": "thyroid.v1.1", "version": 2, "status": "candidate", "title": "Thyroid physiology candidate"}
    nodes = viewer.get("nodes", [])
    routes = viewer.get("routes", [])
    for node in nodes:
        if not node.get("id"):
            raise ValueError("Snapshot node without id")
    for route in routes:
        if not route.get("id") or not route.get("snapshot_id"):
            raise ValueError("Snapshot route without identity")
    payload = {
        "schema": SNAPSHOT_VERSION,
        "snapshot_id": viewer.get("meta", {}).get("snapshot_id", "grafomed-alpha"),
        "product_id": "grafomed-v1",
        "data_mode": "candidate_projection",
        "release_status": "internal_only",
        "layers": ["medical_truth", "learning_representation", "assemblies", "learner_state", "derived_projections"],
        "sources": {
            "viewer": {"path": "viewer/data/viewer-data.js", "authority": "derived_read_only_projection"},
            "packet": {"path": "slice-packets/slice-genital-ulcer-syndrome-initial-management-v0/packet.yaml", "authority": "candidate_packet"},
            "learner": {"path": "app/content/thyroid.v1.json", "authority": "private_sql_learner_release"},
        },
        "builder": {
            "nodes": nodes,
            "edges": viewer.get("edges", []),
            "routes": routes,
            "warnings": viewer.get("warnings", []),
        },
        "learner": {
            "release": {k: learner_release.get(k) for k in ("id", "version", "status", "title") if k in learner_release},
            "state_included": False,
            "content_scope": "thyroid_primary; gud_candidate_only; upper_limb_builder_demo",
        },
        "packets": [packet],
        "governance": {
            "clinical_validation": "pending",
            "educational_validation": "pending",
            "learning_efficacy": "not_established",
            "public_release": "not_authorized",
            "canonical_write": False,
            "learner_state_exported_to_builder": False,
        },
    }
    payload["snapshot_hash"] = _digest(payload)
    return payload


def validate_snapshot(snapshot: Dict[str, Any]) -> List[str]:
    errors = []
    if snapshot.get("schema") != SNAPSHOT_VERSION:
        errors.append("schema")
    if snapshot.get("release_status") != "internal_only":
        errors.append("release_status")
    if snapshot.get("governance", {}).get("canonical_write") is not False:
        errors.append("canonical_write")
    ids = [node.get("id") for node in snapshot.get("builder", {}).get("nodes", [])]
    if len(ids) != len(set(ids)):
        errors.append("duplicate_node_ids")
    if snapshot.get("learner", {}).get("state_included"):
        errors.append("learner_state_leak")
    return errors
