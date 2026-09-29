#!/usr/bin/env python3
"""Build a self-contained data fragment for a GrafoMed candidate cluster."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re

import yaml


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_TEMPLATE = PRODUCT_ROOT / "viewer" / "cluster-3d-fragment.template.html"


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def build_graph(cluster: dict) -> dict:
    knowledge = cluster["knowledge_entity_layer"]
    key_objectives = cluster["objective_hierarchy"]
    assemblies = cluster["integrating_assemblies"]
    atom_to_key: dict[str, str] = {}
    atoms: list[dict] = []
    for key_objective in key_objectives:
        for atom in key_objective["mastery_atoms"]:
            atoms.append(atom)
            atom_to_key[atom["id"]] = key_objective["id"]

    evidence_consumers: dict[str, list[str]] = {}
    for atom in atoms:
        for evidence_ref in atom["evidence_object_refs"]:
            evidence_consumers.setdefault(evidence_ref, []).append(atom["id"])

    nodes = [
        {
            "id": cluster["id"],
            "type": "cluster",
            "title": cluster["title"].split(":", 1)[0],
            "objective": cluster["cluster_contract"]["objective"],
            "description": cluster["cluster_contract"]["expected_performance"],
            "meta": (
                f"{len(key_objectives)} objetivos clave · {len(atoms)} unidades evaluables · "
                f"{len(assemblies)} actividades integradoras · "
                f"{len(knowledge['families']) + len(knowledge['entities'])} nodos anatómicos"
            ),
        }
    ]

    for key_objective in key_objectives:
        nodes.append(
            {
                "id": key_objective["id"],
                "type": "key",
                "title": key_objective["title"],
                "objective": key_objective["objective"],
                "description": (
                    f"Agrupa {len(key_objective['mastery_atoms'])} unidades evaluables "
                    f"derivadas de los resultados fuente {', '.join(map(str, key_objective['source_outcomes']))}."
                ),
                "meta": f"Objetivo clave · {len(key_objective['mastery_atoms'])} unidades evaluables",
            }
        )

    for atom in atoms:
        contract = atom["learning_contract"]
        nodes.append(
            {
                "id": atom["id"],
                "type": "atom",
                "title": atom["title"],
                "objective": contract["objective"],
                "description": contract["expected_performance"],
                "meta": "Evidencia: " + " · ".join(atom["evidence_levels"]),
            }
        )

    for assembly in assemblies:
        nodes.append(
            {
                "id": assembly["id"],
                "type": "assembly",
                "title": assembly["title"],
                "objective": f"Integra unidades de aprendizaje para {assembly['title'].lower()}.",
                "description": assembly["boundary"],
                "meta": f"Actividad integradora · {len(assembly['member_refs'])} unidades conectadas",
            }
        )

    for family in knowledge["families"]:
        child_count = sum(entity["parent_ref"] == family["id"] for entity in knowledge["entities"])
        consumers = evidence_consumers.get(family["id"], [])
        nodes.append(
            {
                "id": family["id"],
                "type": "anatomyFamily",
                "title": family["label"],
                "objective": f"Familia que organiza entidades de {family['label'].lower()}.",
                "description": (
                    f"Contiene {child_count} entidades y conecta directamente con "
                    f"{len(consumers)} unidades evaluables. No posee objetivo de aprendizaje propio."
                ),
                "meta": "Familia anatómica · sin objetivo propio",
            }
        )

    for entity in knowledge["entities"]:
        consumers = evidence_consumers.get(entity["id"], [])
        nodes.append(
            {
                "id": entity["id"],
                "type": "anatomy",
                "title": entity["label"],
                "objective": entity["definition"],
                "description": (
                    f"Habilita {len(consumers)} unidades evaluables mediante relaciones "
                    "enables_mastery_of. No posee objetivo de aprendizaje propio."
                ),
                "meta": "Entidad anatómica · sin objetivo propio",
            }
        )

    links = []
    links += [
        {"source": cluster["id"], "target": key_objective["id"], "kind": "hierarchy"}
        for key_objective in key_objectives
    ]
    links += [
        {"source": atom_to_key[atom["id"]], "target": atom["id"], "kind": "hierarchy"}
        for atom in atoms
    ]
    links += [
        {"source": cluster["id"], "target": assembly["id"], "kind": "hierarchy"}
        for assembly in assemblies
    ]
    links += [
        {"source": family["id"], "target": entity["id"], "kind": "knowledge-structure"}
        for family in knowledge["families"]
        for entity in knowledge["entities"]
        if entity["parent_ref"] == family["id"]
    ]
    links += [
        {"source": evidence_ref, "target": atom["id"], "kind": "knowledge-learning"}
        for atom in atoms
        for evidence_ref in atom["evidence_object_refs"]
    ]
    links += [
        {"source": assembly["id"], "target": member_ref, "kind": "integration"}
        for assembly in assemblies
        for member_ref in assembly["member_refs"]
    ]
    return {"nodes": nodes, "links": links}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("cluster", type=Path)
    parser.add_argument("fragment", type=Path)
    parser.add_argument("--template", type=Path, default=DEFAULT_TEMPLATE)
    args = parser.parse_args()

    cluster = yaml.safe_load(args.cluster.read_text(encoding="utf-8"))
    graph = build_graph(cluster)
    name = slug(cluster["title"].split(":", 1)[0])
    root_id = f"mia-{name}-graph"
    replacements = {
        "__ROOT_ID__": root_id,
        "__STAGE_ID__": f"{root_id}-stage",
        "__DETAIL_TYPE_ID__": f"{root_id}-detail-type",
        "__DETAIL_TITLE_ID__": f"{root_id}-detail-title",
        "__DETAIL_OBJECTIVE_LABEL_ID__": f"{root_id}-detail-objective-label",
        "__DETAIL_DESCRIPTION_LABEL_ID__": f"{root_id}-detail-description-label",
        "__DETAIL_OBJECTIVE_ID__": f"{root_id}-detail-objective",
        "__DETAIL_DESCRIPTION_ID__": f"{root_id}-detail-description",
        "__DETAIL_META_ID__": f"{root_id}-detail-meta",
        "__TITLE__": cluster["title"].split(":", 1)[0],
        "__NODE_COUNT__": str(len(graph["nodes"])),
        "__ARIA_LABEL__": (
            f"Grafo tridimensional de {cluster['title'].split(':', 1)[0]} con "
            f"{len(graph['nodes'])} nodos y {len(graph['links'])} relaciones."
        ),
        "__GRAPH_DATA__": json.dumps(graph, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c"),
    }
    fragment = args.template.read_text(encoding="utf-8")
    for marker, value in replacements.items():
        fragment = fragment.replace(marker, value)
    unresolved = re.findall(r"__[A-Z0-9_]+__", fragment)
    if unresolved:
        raise ValueError(f"Unresolved template markers: {sorted(set(unresolved))}")
    args.fragment.parent.mkdir(parents=True, exist_ok=True)
    args.fragment.write_text(fragment, encoding="utf-8")
    print(
        f"Built {len(graph['nodes'])} nodes and {len(graph['links'])} links "
        f"at {args.fragment}"
    )


if __name__ == "__main__":
    main()
