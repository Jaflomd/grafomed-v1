#!/usr/bin/env python3
"""Validate the first Grafo Med vertical slice and write an auditable report."""

from __future__ import annotations

from collections import defaultdict
from datetime import datetime
from hashlib import sha256
import json
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator
import yaml


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
PACKET_ID = "slice-genital-ulcer-syndrome-initial-management-v0"
PACKET_ROOT = PRODUCT_ROOT / "slice-packets" / PACKET_ID
SCHEMAS = PRODUCT_ROOT / "schemas"
REPORT_PATH = PACKET_ROOT / "reviews" / "validation-report.json"


def load(path: Path) -> Any:
    text = path.read_text(encoding="utf-8")
    return json.loads(text) if path.suffix == ".json" else yaml.safe_load(text)


def validate_schema(value: Any, schema_name: str, label: str, errors: list[str]) -> None:
    schema = load(SCHEMAS / schema_name)
    validator = Draft202012Validator(schema)
    for error in sorted(validator.iter_errors(value), key=lambda item: list(item.path)):
        location = ".".join(str(part) for part in error.path) or "root"
        errors.append(f"{label}:{location}: {error.message}")


def load_objects() -> tuple[dict[str, dict[str, Any]], dict[str, str]]:
    objects: dict[str, dict[str, Any]] = {}
    paths: dict[str, str] = {}
    for path in sorted((PACKET_ROOT / "candidates").rglob("*.yaml")):
        document = load(path)
        for item in document.get("nodes", []):
            objects[item["id"]] = item
            paths[item["id"]] = str(path.relative_to(PRODUCT_ROOT))
    return objects, paths


def current_snapshot_id() -> str:
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


def has_cycle(edges: list[tuple[str, str]]) -> bool:
    graph: dict[str, list[str]] = defaultdict(list)
    for source, target in edges:
        graph[source].append(target)
    visiting: set[str] = set()
    visited: set[str] = set()

    def visit(node: str) -> bool:
        if node in visiting:
            return True
        if node in visited:
            return False
        visiting.add(node)
        if any(visit(neighbor) for neighbor in graph[node]):
            return True
        visiting.remove(node)
        visited.add(node)
        return False

    return any(visit(node) for node in list(graph))


def validate() -> dict[str, Any]:
    errors: list[str] = []
    warnings: list[str] = []
    checks: list[dict[str, Any]] = []
    packet = load(PACKET_ROOT / "packet.yaml")
    source_lock = load(PACKET_ROOT / "source_lock" / "sources.yaml")
    objects, object_paths = load_objects()
    relations = load(PACKET_ROOT / "candidates" / "relations" / "relations.yaml")["edges"]
    registry = load(PRODUCT_ROOT / "config" / "relation-registry.yaml")["rules"]
    routes = [
        load(PRODUCT_ROOT / "routes" / "route-gud-gold-v0.json"),
        load(PRODUCT_ROOT / "routes" / "route-gud-generated-v0.json"),
    ]
    learner_state = load(PRODUCT_ROOT / "learner-state" / "fixture-gud-v0.json")

    validate_schema(packet, "packet.schema.json", "packet", errors)
    for object_id, item in objects.items():
        validate_schema(item, "object.schema.json", object_paths[object_id], errors)
    for relation in relations:
        validate_schema(relation, "relation.schema.json", relation["id"], errors)
    for route in routes:
        validate_schema(route, "route.schema.json", route["id"], errors)
    validate_schema(learner_state, "learner-state.schema.json", "learner_state", errors)
    checks.append({"name": "json_schema_conformance", "status": "pass" if not errors else "fail"})

    medical_and_assembly_ids = {
        object_id
        for object_id, item in objects.items()
        if item["layer"] in {"medical_truth", "assemblies"}
    }
    learning_ids = {object_id for object_id, item in objects.items() if item["layer"] == "learning_representation"}
    if medical_and_assembly_ids != set(packet["object_refs"]):
        errors.append("packet object_refs do not exactly match medical-truth and assembly candidate IDs")
    if learning_ids != set(packet["learning_refs"]):
        errors.append("packet learning_refs do not exactly match learning candidate IDs")
    if not 8 <= len(medical_and_assembly_ids) <= 15:
        errors.append(f"medical-truth plus assembly candidate count out of range: {len(medical_and_assembly_ids)}")
    mastery_count = sum(item["object_type"] == "mastery_atom" for item in objects.values())
    assessment_count = sum(item["object_type"] == "assessment" for item in objects.values())
    if mastery_count > 2 or assessment_count > 1:
        errors.append(f"learning-support cap exceeded: {mastery_count} mastery atoms, {assessment_count} assessments")
    checks.append({"name": "bounded_object_counts", "status": "pass" if not errors else "check_errors", "medical_and_assemblies": len(medical_and_assembly_ids), "mastery_atoms": mastery_count, "assessments": assessment_count})

    relation_ids = {edge["id"] for edge in relations}
    if len(relation_ids) != len(relations):
        errors.append("duplicate relation ID")
    if relation_ids != set(packet["relation_refs"]):
        errors.append("packet relation_refs do not exactly match relation records")
    if not 15 <= len(relations) <= 30:
        errors.append(f"relation count out of range: {len(relations)}")
    for edge in relations:
        if edge["source"] not in objects or edge["target"] not in objects:
            errors.append(f"broken endpoints: {edge['id']}")
            continue
        rule = registry.get(edge["relation_type"])
        if not rule:
            errors.append(f"unregistered relation type: {edge['relation_type']}")
            continue
        if edge["family"] != rule["family"]:
            errors.append(f"relation family mismatch: {edge['id']}")
        source_type = objects[edge["source"]]["object_type"]
        target_type = objects[edge["target"]]["object_type"]
        if source_type not in rule["domain"] or target_type not in rule["range"]:
            errors.append(f"domain/range violation: {edge['id']} ({source_type} -> {target_type})")
    requires_edges = [(edge["source"], edge["target"]) for edge in relations if edge["relation_type"] == "requires"]
    if has_cycle(requires_edges):
        errors.append("cycle found in requires relations")
    checks.append({"name": "relation_registry_endpoint_and_cycle_checks", "status": "pass" if not any("relation" in error or "endpoint" in error or "cycle" in error for error in errors) else "fail", "relations": len(relations)})

    source_ids = {source["id"] for source in source_lock["sources"]}
    claim_ids = {claim["id"] for claim in source_lock["claim_coverage"]}
    for object_id, item in objects.items():
        unknown_sources = set(item["source_refs"]) - source_ids
        unknown_claims = set(item["claim_refs"]) - claim_ids
        if unknown_sources:
            errors.append(f"{object_id} has unknown source refs: {sorted(unknown_sources)}")
        if unknown_claims:
            errors.append(f"{object_id} has unknown claim refs: {sorted(unknown_claims)}")
    for edge in relations:
        if set(edge["source_refs"]) - source_ids:
            errors.append(f"{edge['id']} has unknown source refs")
        if set(edge["claim_refs"]) - claim_ids:
            errors.append(f"{edge['id']} has unknown claim refs")
    checks.append({"name": "source_and_claim_closure", "status": "pass" if not any("unknown source" in error or "unknown claim" in error for error in errors) else "fail", "sources": len(source_ids), "claims": len(claim_ids)})

    snapshot = current_snapshot_id()
    if packet["canonical_snapshot"]["snapshot_id"] != snapshot:
        errors.append(f"packet snapshot mismatch: expected {snapshot}")
    for route in routes:
        if route["snapshot_id"] != snapshot:
            errors.append(f"route snapshot mismatch: {route['id']}")
        for step in route["steps"]:
            if step["node_id"] not in objects:
                errors.append(f"unknown route step {step['node_id']} in {route['id']}")
    if learner_state["graph_snapshot_id"] != snapshot:
        errors.append("learner-state snapshot mismatch")
    gold_ids = [step["node_id"] for step in routes[0]["steps"]]
    generated_ids = [step["node_id"] for step in routes[1]["steps"]]
    if gold_ids != generated_ids:
        errors.append("generated route does not match the complete ordered gold milestones")
    checks.append({"name": "snapshot_and_route_gold_comparison", "status": "pass" if not any("snapshot" in error or "route" in error for error in errors) else "fail", "snapshot_id": snapshot, "steps": len(generated_ids)})

    assessment = objects["gm-assessment-gud-v0"]
    items = assessment["items"]
    if not 3 <= len(items) <= 5:
        errors.append(f"MCQ count out of range: {len(items)}")
    item_ids = {item["id"] for item in items}
    if len(item_ids) != len(items):
        errors.append("duplicate MCQ ID")
    if assessment.get("copied_external_items") is not False:
        errors.append("assessment does not affirm original item creation")
    for item in items:
        if item["correct_answer"] not in item["options"]:
            errors.append(f"invalid correct answer key: {item['id']}")
        if not set(item["source_map"]).issubset(claim_ids):
            errors.append(f"unknown assessment source map: {item['id']}")
    if not assessment.get("remediation_branch") or not assessment.get("transfer_case"):
        errors.append("assessment lacks remediation or transfer artifact")
    checks.append({"name": "assessment_originality_and_mapping", "status": "pass" if not any("MCQ" in error or "assessment" in error for error in errors) else "fail", "mcqs": len(items), "transfer_case": True, "remediation_branch": True})

    before_action = learner_state["states"]["before"]["next_action"]
    success_action = learner_state["states"]["after_success"]["next_action"]
    failure_action = learner_state["states"]["after_failure"]["next_action"]
    if len({before_action, success_action, failure_action}) != 3:
        errors.append("learner-state fixture does not change next action across outcomes")
    if learner_state["privacy"]["contains_phi"] or learner_state["privacy"]["export_by_default"]:
        errors.append("learner-state privacy boundary violated")
    checks.append({"name": "learner_state_behavior_and_privacy", "status": "pass" if not any("learner-state" in error for error in errors) else "fail"})

    review_files = [PACKET_ROOT / review_ref for review_ref in packet["review_refs"]]
    for review_path in review_files:
        if not review_path.exists():
            errors.append(f"missing review artifact: {review_path.name}")
    pending_reviews = [load(path)["domain"] for path in review_files if load(path)["status"] != "pass"]
    if pending_reviews:
        warnings.append(f"Promotion remains blocked pending separate reviews: {', '.join(pending_reviews)}")
    if packet["promotion"]["eligible"]:
        errors.append("packet cannot be promotion-eligible while independent reviews are pending")
    checks.append({"name": "review_separation_and_promotion_guard", "status": "pass", "pending_reviews": pending_reviews, "promotion_eligible": False})

    return {
        "schema": "grafomed-validation-report.v1",
        "packet_id": PACKET_ID,
        "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "status": "structural_pass_promotion_blocked" if not errors else "fail",
        "errors": errors,
        "warnings": warnings,
        "checks": checks,
        "counts": {
            "medical_truth_and_assemblies": len(medical_and_assembly_ids),
            "learning_support": len(learning_ids),
            "relations": len(relations),
            "routes": len(routes),
            "mcqs": len(items),
            "sources": len(source_ids),
            "claims": len(claim_ids),
        },
        "snapshot_id": snapshot,
        "promotion_eligible": False,
    }


def main() -> None:
    report = validate()
    REPORT_PATH.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"status": report["status"], "errors": len(report["errors"]), "warnings": len(report["warnings"]), "counts": report["counts"]}, indent=2))
    raise SystemExit(1 if report["errors"] else 0)


if __name__ == "__main__":
    main()

