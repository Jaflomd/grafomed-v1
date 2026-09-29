#!/usr/bin/env python3
"""Build the local and self-contained Grafo Med graph viewer snapshots."""

from __future__ import annotations

from argparse import ArgumentParser
from datetime import datetime
from hashlib import sha256
import json
from pathlib import Path
from typing import Any, Iterable

import yaml


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
VIEWER_ROOT = Path(__file__).resolve().parent
WORKSPACE_ROOT = PRODUCT_ROOT.parents[1]
DATA_JS = VIEWER_ROOT / "data" / "viewer-data.js"
SELF_CONTAINED_HTML = PRODUCT_ROOT / "exports" / "grafomed-viewer.html"
DEMO_FIXTURE = VIEWER_ROOT / "fixtures" / "architecture-demo.json"
SPANISH_LOCALE = VIEWER_ROOT / "locales" / "es.yaml"

NODE_DIRS = [
    PRODUCT_ROOT / "graph" / "nodes",
    PRODUCT_ROOT / "graph" / "assemblies",
]
RELATION_DIRS = [PRODUCT_ROOT / "graph" / "relations"]
ROUTE_DIRS = [PRODUCT_ROOT / "routes"]
SUPPORTED_SUFFIXES = {".json", ".yaml", ".yml"}

LEARNING_TYPES = {
    "mastery_atom",
    "learning_objective",
    "resource",
    "activity",
    "case",
    "assessment",
}
ASSEMBLY_TYPES = {
    "clinical_chain",
    "illness_script",
    "detcsp_pathway",
    "differential_set",
    "professional_activity",
}
MEDICAL_TYPES = {
    "anatomical_entity",
    "biological_process",
    "developmental_event",
    "condition",
    "clinical_finding",
    "mechanism",
    "test",
    "intervention",
    "risk",
    "context",
    "decision_atom",
    "decision_pattern",
}

RELATION_FAMILY = {
    "part_of": "structural_developmental",
    "derives_from": "structural_developmental",
    "develops_into": "structural_developmental",
    "developmental_basis_of": "structural_developmental",
    "mechanistic_basis_of": "mechanistic",
    "causes_or_contributes_to": "mechanistic",
    "modulates": "mechanistic",
    "requires": "learning",
    "enables_mastery_of": "learning",
    "assessed_by": "learning",
    "remediates": "learning",
    "supports_hypothesis": "clinical_reasoning",
    "discriminates_from": "clinical_reasoning",
    "feeds_decision": "clinical_reasoning",
    "changes_management_state": "clinical_reasoning",
    "supports_competency": "alignment_governance",
    "instantiates_professional_activity": "alignment_governance",
    "supersedes": "alignment_governance",
}

DETAIL_ALLOWLIST = {
    "definition",
    "boundaries",
    "trigger",
    "actor",
    "inputs",
    "alternatives",
    "discriminators",
    "output",
    "downstream_consequence",
    "error_costs",
    "rationale",
    "context",
    "confidence",
    "difficulty",
    "estimated_time",
}


def relative(path: Path) -> str:
    try:
        return str(path.relative_to(WORKSPACE_ROOT))
    except ValueError:
        return str(path)


def load_document(path: Path) -> Any:
    text = path.read_text(encoding="utf-8")
    if path.suffix == ".json":
        return json.loads(text)
    return yaml.safe_load(text)


def record_items(value: Any, plural_key: str | None = None) -> Iterable[dict[str, Any]]:
    if isinstance(value, list):
        for item in value:
            if isinstance(item, dict):
                yield item
        return
    if not isinstance(value, dict):
        return
    if plural_key and isinstance(value.get(plural_key), list):
        for item in value[plural_key]:
            if isinstance(item, dict):
                yield item
        return
    yield value


def files_under(directories: Iterable[Path]) -> list[Path]:
    files: list[Path] = []
    for directory in directories:
        if directory.exists():
            files.extend(
                path
                for path in directory.rglob("*")
                if path.is_file() and path.suffix.lower() in SUPPORTED_SUFFIXES
            )
    return sorted(set(files))


def candidate_dirs(kind: str) -> list[Path]:
    root = PRODUCT_ROOT / "slice-packets"
    if not root.exists():
        return []
    return sorted(path for path in root.glob(f"*/candidates/{kind}") if path.is_dir())


def clean_list(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, str):
        return [value]
    if not isinstance(value, list):
        return [str(value)]
    result: list[str] = []
    for item in value:
        if isinstance(item, str):
            result.append(item)
        elif isinstance(item, dict):
            code = item.get("code") or item.get("id") or item.get("label")
            if code:
                result.append(str(code))
    return list(dict.fromkeys(result))


def infer_layer(object_type: str, record: dict[str, Any]) -> str:
    explicit = record.get("layer") or record.get("object_layer")
    if explicit:
        return str(explicit)
    if object_type in LEARNING_TYPES:
        return "learning_representation"
    if object_type in ASSEMBLY_TYPES:
        return "assemblies"
    if object_type in MEDICAL_TYPES:
        return "medical_truth"
    return "medical_truth"


def source_refs(record: dict[str, Any]) -> list[str]:
    refs = clean_list(record.get("source_refs") or record.get("sources"))
    provenance = record.get("provenance")
    if isinstance(provenance, dict):
        refs.extend(clean_list(provenance.get("source_refs")))
    return list(dict.fromkeys(refs))


def normalize_node(
    record: dict[str, Any], path: Path, candidate_from_path: bool
) -> dict[str, Any] | None:
    node_id = record.get("id") or record.get("node_id") or record.get("object_id")
    if not node_id:
        return None
    object_type = str(record.get("object_type") or record.get("type") or "unknown")
    lifecycle = str(record.get("lifecycle") or record.get("status") or "candidate")
    candidate = bool(
        candidate_from_path
        or record.get("candidate")
        or lifecycle in {"captured", "candidate", "graph_drafted", "unreviewed"}
    )
    details = {
        key: record[key]
        for key in DETAIL_ALLOWLIST
        if key in record and record[key] not in (None, "", [], {})
    }
    return {
        "id": str(node_id),
        "label": str(
            record.get("label")
            or record.get("title")
            or record.get("name")
            or node_id
        ),
        "type": object_type,
        "layer": infer_layer(object_type, record),
        "lifecycle": lifecycle,
        "evidence_status": str(record.get("evidence_status") or "unknown"),
        "validation_status": str(record.get("validation_status") or "unknown"),
        "review_status": str(record.get("review_status") or "unknown"),
        "summary": str(
            record.get("summary")
            or record.get("description")
            or record.get("definition")
            or ""
        ),
        "tags": clean_list(record.get("tags") or record.get("tag_assignments")),
        "competencies": clean_list(
            record.get("competencies") or record.get("competency_refs")
        ),
        "source_refs": source_refs(record),
        "aliases": clean_list(record.get("aliases")),
        "candidate": candidate,
        "record_path": relative(path),
        "details": details,
        "learning_contract": (
            record.get("learning_contract")
            if isinstance(record.get("learning_contract"), dict)
            else {}
        ),
    }


def relation_endpoint(record: dict[str, Any], names: tuple[str, ...]) -> str | None:
    for name in names:
        value = record.get(name)
        if isinstance(value, dict):
            value = value.get("id") or value.get("node_id")
        if value:
            return str(value)
    return None


def normalize_edge(
    record: dict[str, Any], path: Path, candidate_from_path: bool
) -> dict[str, Any] | None:
    source = relation_endpoint(record, ("source", "source_id", "from", "subject"))
    target = relation_endpoint(record, ("target", "target_id", "to", "object"))
    relation_type = str(
        record.get("relation_type") or record.get("type") or record.get("predicate") or "related_to"
    )
    if not source or not target:
        return None
    edge_id = record.get("id") or record.get("relation_id")
    if not edge_id:
        seed = f"{source}|{relation_type}|{target}|{relative(path)}"
        edge_id = f"rel-{sha256(seed.encode()).hexdigest()[:12]}"
    lifecycle = str(record.get("lifecycle") or record.get("status") or "candidate")
    candidate = bool(
        candidate_from_path
        or record.get("candidate")
        or lifecycle in {"captured", "candidate", "graph_drafted", "unreviewed"}
    )
    return {
        "id": str(edge_id),
        "source": source,
        "target": target,
        "type": relation_type,
        "family": str(
            record.get("family")
            or record.get("relation_family")
            or RELATION_FAMILY.get(relation_type, "other")
        ),
        "status": lifecycle,
        "candidate": candidate,
        "rationale": str(record.get("rationale") or record.get("reason") or ""),
        "context": record.get("context"),
        "source_refs": source_refs(record),
        "record_path": relative(path),
    }


def normalize_route(record: dict[str, Any], path: Path) -> dict[str, Any] | None:
    route_id = record.get("id") or record.get("route_id")
    if not route_id:
        return None
    steps = []
    for index, step in enumerate(record.get("steps") or []):
        if isinstance(step, str):
            steps.append(
                {"order": index + 1, "node_id": step, "kind": "learn", "reason": ""}
            )
        elif isinstance(step, dict):
            node_id = step.get("node_id") or step.get("object_id") or step.get("target_id")
            if node_id:
                steps.append(
                    {
                        "order": int(step.get("order") or index + 1),
                        "node_id": str(node_id),
                        "kind": str(step.get("kind") or step.get("activity") or "learn"),
                        "reason": str(step.get("reason") or step.get("explanation") or ""),
                    }
                )
    return {
        "id": str(route_id),
        "label": str(record.get("label") or record.get("title") or route_id),
        "goal": str(record.get("goal") or record.get("target") or ""),
        "status": str(record.get("status") or "candidate"),
        "snapshot_id": str(record.get("snapshot_id") or ""),
        "steps": sorted(steps, key=lambda item: item["order"]),
        "record_path": relative(path),
    }


def load_spanish_locale() -> dict[str, Any]:
    if not SPANISH_LOCALE.exists():
        return {}
    value = load_document(SPANISH_LOCALE)
    return value if isinstance(value, dict) else {}


def apply_spanish_localization(
    nodes: list[dict[str, Any]],
    routes: list[dict[str, Any]],
    locale: dict[str, Any],
) -> None:
    node_entries = locale.get("nodes") if isinstance(locale.get("nodes"), dict) else {}
    for node in nodes:
        entry = node_entries.get(node["id"])
        if not isinstance(entry, dict):
            continue
        node["localizations"] = {
            "es": {
                "label": str(entry.get("label") or node["label"]),
                "summary": str(entry.get("summary") or node["summary"]),
                "details": entry.get("details") if isinstance(entry.get("details"), dict) else {},
                "learning_contract": (
                    entry.get("learning_contract")
                    if isinstance(entry.get("learning_contract"), dict)
                    else {}
                ),
            }
        }

    route_entries = locale.get("routes") if isinstance(locale.get("routes"), dict) else {}
    for route in routes:
        entry = route_entries.get(route["id"])
        if not isinstance(entry, dict):
            continue
        localized_steps = entry.get("step_reasons") if isinstance(entry.get("step_reasons"), dict) else {}
        route["localizations"] = {
            "es": {
                "label": str(entry.get("label") or route["label"]),
                "goal": str(entry.get("goal") or route["goal"]),
            }
        }
        for step in route["steps"]:
            reason = localized_steps.get(step["node_id"])
            if reason:
                step["localizations"] = {"es": {"reason": str(reason)}}


def collect_records() -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]], list[str], list[Path]]:
    nodes: list[dict[str, Any]] = []
    edges: list[dict[str, Any]] = []
    routes: list[dict[str, Any]] = []
    warnings: list[str] = []
    inputs: list[Path] = []

    node_sources = [(directory, False) for directory in NODE_DIRS]
    node_sources.extend((directory, True) for kind in ("nodes", "assemblies", "learning") for directory in candidate_dirs(kind))
    for directory, is_candidate in node_sources:
        for path in files_under([directory]):
            inputs.append(path)
            try:
                document = load_document(path)
                for record in record_items(document, "nodes"):
                    node = normalize_node(record, path, is_candidate)
                    if node:
                        nodes.append(node)
                    else:
                        warnings.append(f"Node record without ID omitted: {relative(path)}")
            except Exception as error:  # noqa: BLE001 - report and continue projection build
                warnings.append(f"Could not read node file {relative(path)}: {error}")

    relation_sources = [(directory, False) for directory in RELATION_DIRS]
    relation_sources.extend((directory, True) for directory in candidate_dirs("relations"))
    for directory, is_candidate in relation_sources:
        for path in files_under([directory]):
            inputs.append(path)
            try:
                document = load_document(path)
                for record in record_items(document, "edges"):
                    edge = normalize_edge(record, path, is_candidate)
                    if edge:
                        edges.append(edge)
                    else:
                        warnings.append(f"Relation without endpoints omitted: {relative(path)}")
            except Exception as error:  # noqa: BLE001
                warnings.append(f"Could not read relation file {relative(path)}: {error}")

    for path in files_under(ROUTE_DIRS):
        inputs.append(path)
        try:
            document = load_document(path)
            for record in record_items(document, "routes"):
                route = normalize_route(record, path)
                if route:
                    routes.append(route)
        except Exception as error:  # noqa: BLE001
            warnings.append(f"Could not read route file {relative(path)}: {error}")

    seen: set[str] = set()
    unique_nodes: list[dict[str, Any]] = []
    for node in sorted(nodes, key=lambda item: (item["candidate"], item["id"])):
        if node["id"] in seen:
            warnings.append(f"Duplicate node ID omitted from projection: {node['id']}")
            continue
        seen.add(node["id"])
        unique_nodes.append(node)

    node_ids = {node["id"] for node in unique_nodes}
    valid_edges: list[dict[str, Any]] = []
    edge_ids: set[str] = set()
    for edge in edges:
        if edge["id"] in edge_ids:
            warnings.append(f"Duplicate relation ID omitted from projection: {edge['id']}")
            continue
        if edge["source"] not in node_ids or edge["target"] not in node_ids:
            warnings.append(
                f"Broken relation endpoint omitted: {edge['id']} "
                f"({edge['source']} -> {edge['target']})"
            )
            continue
        edge_ids.add(edge["id"])
        valid_edges.append(edge)

    valid_routes = []
    for route in routes:
        filtered_steps = [step for step in route["steps"] if step["node_id"] in node_ids]
        if len(filtered_steps) != len(route["steps"]):
            warnings.append(f"Unknown route step omitted from projection: {route['id']}")
        route["steps"] = filtered_steps
        valid_routes.append(route)

    return unique_nodes, valid_edges, valid_routes, warnings, sorted(set(inputs))


def content_hash(paths: Iterable[Path]) -> str:
    digest = sha256()
    for path in paths:
        digest.update(relative(path).encode("utf-8"))
        digest.update(path.read_bytes())
    return digest.hexdigest()


def empty_data(warnings: list[str]) -> dict[str, Any]:
    generated_at = datetime.now().astimezone().isoformat(timespec="seconds")
    return {
        "schema_version": "0.1",
        "meta": {
            "snapshot_id": "grafomed-empty",
            "snapshot_label": "Grafo Med empty canonical graph",
            "generated_at": generated_at,
            "graph_version": "empty",
            "data_mode": "empty",
            "demo": False,
            "canonical": True,
            "default_focus": None,
            "source_refs": [],
            "notice": "No canonical Grafo Med objects exist yet.",
        },
        "nodes": [],
        "edges": [],
        "routes": [],
        "warnings": warnings,
    }


def build_data(use_demo_if_empty: bool) -> dict[str, Any]:
    nodes, edges, routes, warnings, inputs = collect_records()
    if not nodes:
        if not use_demo_if_empty:
            return empty_data(warnings)
        data = json.loads(DEMO_FIXTURE.read_text(encoding="utf-8"))
        data["meta"]["generated_at"] = datetime.now().astimezone().isoformat(timespec="seconds")
        data["warnings"] = list(data.get("warnings") or []) + warnings
        return data

    locale = load_spanish_locale()
    apply_spanish_localization(nodes, routes, locale)
    if SPANISH_LOCALE.exists():
        inputs.append(SPANISH_LOCALE)
    digest = content_hash(inputs)
    promoted_count = sum(not node["candidate"] for node in nodes)
    candidate_count = len(nodes) - promoted_count
    if promoted_count and candidate_count:
        data_mode = "canonical_with_candidates"
    elif promoted_count:
        data_mode = "canonical"
    else:
        data_mode = "candidate_projection"
    default_focus = next(
        (node["id"] for node in nodes if node["type"] == "mastery_atom"),
        nodes[0]["id"],
    )
    locale_meta = locale.get("meta") if isinstance(locale.get("meta"), dict) else {}
    localized_snapshot_label = (
        locale_meta.get("candidate_snapshot_label")
        if not promoted_count
        else locale_meta.get("canonical_snapshot_label")
    )
    localized_notice_template = str(locale_meta.get("candidate_notice_template") or "")
    localized_notice = localized_notice_template.format(
        promoted_count=promoted_count,
        candidate_count=candidate_count,
    ) if localized_notice_template else ""
    return {
        "schema_version": "0.1",
        "meta": {
            "snapshot_id": f"grafomed-{digest[:12]}",
            "snapshot_label": (
                "Grafo Med candidate projection"
                if not promoted_count
                else "Grafo Med canonical projection"
            ),
            "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
            "graph_version": digest[:16],
            "data_mode": data_mode,
            "demo": False,
            "canonical": bool(promoted_count),
            "default_focus": default_focus,
            "source_refs": [relative(path) for path in inputs],
            "notice": (
                f"Projection of {promoted_count} reviewed/promoted and "
                f"{candidate_count} candidate object(s)."
            ),
            "localizations": {
                "es": {
                    "snapshot_label": str(localized_snapshot_label or "Grafo Med"),
                    "notice": localized_notice,
                }
            },
        },
        "nodes": nodes,
        "edges": edges,
        "routes": routes,
        "warnings": warnings,
    }


def write_outputs(data: dict[str, Any]) -> None:
    DATA_JS.parent.mkdir(parents=True, exist_ok=True)
    SELF_CONTAINED_HTML.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    DATA_JS.write_text(
        "window.GRAFOMED_VIEWER_DATA = " + payload + ";\n", encoding="utf-8"
    )

    index = (VIEWER_ROOT / "index.html").read_text(encoding="utf-8")
    styles = (VIEWER_ROOT / "styles.css").read_text(encoding="utf-8")
    app = (VIEWER_ROOT / "app.js").read_text(encoding="utf-8")
    export = index.replace(
        '<link rel="stylesheet" href="styles.css">', f"<style>\n{styles}\n</style>"
    )
    export = export.replace(
        '<script src="data/viewer-data.js"></script>',
        f"<script>window.GRAFOMED_VIEWER_DATA = {payload};</script>",
    )
    export = export.replace('<script src="app.js"></script>', f"<script>\n{app}\n</script>")
    SELF_CONTAINED_HTML.write_text(export, encoding="utf-8")


def main() -> None:
    parser = ArgumentParser(description=__doc__)
    parser.add_argument(
        "--no-demo",
        action="store_true",
        help="Show an honest empty state instead of the architecture demo when no graph objects exist.",
    )
    args = parser.parse_args()
    data = build_data(use_demo_if_empty=not args.no_demo)
    write_outputs(data)
    print(
        f"Built viewer: {len(data['nodes'])} node(s), {len(data['edges'])} edge(s), "
        f"{len(data['routes'])} route(s), mode={data['meta']['data_mode']}"
    )
    print(f"Local: {relative(VIEWER_ROOT / 'index.html')}")
    print(f"Portable: {relative(SELF_CONTAINED_HTML)}")


if __name__ == "__main__":
    main()
