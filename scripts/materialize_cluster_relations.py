#!/usr/bin/env python3
"""Materialize deterministic anatomical-to-learning relations from a cluster draft."""

from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

import yaml


def relation_id(relation_type: str, source: str, target: str) -> str:
    digest = hashlib.sha256(f"{relation_type}|{source}|{target}".encode()).hexdigest()[:12]
    return f"gm-rel-{relation_type.replace('_', '-')}-{digest}"


def build_relation(
    *,
    cluster: dict,
    relation_type: str,
    family: str,
    source: str,
    target: str,
    rationale: str,
    derived_from: str,
) -> dict:
    source_ref = cluster["source_lock"]["id"]
    return {
        "schema": "grafomed-relation.v1",
        "id": relation_id(relation_type, source, target),
        "source": source,
        "target": target,
        "relation_type": relation_type,
        "family": family,
        "lifecycle": "graph_drafted",
        "evidence_status": "source_locked_candidate",
        "validation_status": "structural_pass",
        "rationale": rationale,
        "context": {
            "derived_from": derived_from,
            "candidate_design": True,
            "promotion_allowed": False,
        },
        "source_refs": [source_ref],
        "claim_refs": [f"{cluster['id']}:{derived_from}"],
        "provenance": {
            "created_by": "mia",
            "created_at": cluster["created_at"],
            "packet_id": cluster["id"],
        },
    }


def materialize(cluster: dict) -> dict:
    knowledge = cluster["knowledge_entity_layer"]
    relations: list[dict] = []

    for entity in knowledge["entities"]:
        relations.append(
            build_relation(
                cluster=cluster,
                relation_type="part_of",
                family="structural",
                source=entity["id"],
                target=entity["parent_ref"],
                rationale=(
                    f"{entity['label']} pertenece a la familia anatómica indicada; "
                    "esta relación organiza conocimiento y no crea un objetivo de aprendizaje."
                ),
                derived_from="parent_ref",
            )
        )

    for key_objective in cluster["objective_hierarchy"]:
        for atom in key_objective["mastery_atoms"]:
            for evidence_ref in atom.get("evidence_object_refs", []):
                relations.append(
                    build_relation(
                        cluster=cluster,
                        relation_type="enables_mastery_of",
                        family="learning",
                        source=evidence_ref,
                        target=atom["id"],
                        rationale=(
                            "La entidad o familia anatómica aporta evidencia de conocimiento "
                            f"necesaria para dominar «{atom['title']}»."
                        ),
                        derived_from="evidence_object_refs",
                    )
                )

    ids = [relation["id"] for relation in relations]
    if len(ids) != len(set(ids)):
        raise ValueError("Generated relation IDs are not unique")

    return {
        "schema": "grafomed-derived-relations.v0",
        "id": f"{cluster['id']}-relations-v0",
        "status": "candidate_derived_view_not_promoted",
        "source_cluster_ref": cluster["id"],
        "generated_at": cluster["created_at"],
        "generation_contract": {
            "part_of_source": "knowledge_entity_layer.entities[].parent_ref",
            "enables_mastery_of_source": "objective_hierarchy[].mastery_atoms[].evidence_object_refs[]",
            "canonical_truth": False,
            "regenerate_instead_of_manual_edit": True,
        },
        "quality_counts": {
            "part_of": sum(r["relation_type"] == "part_of" for r in relations),
            "enables_mastery_of": sum(
                r["relation_type"] == "enables_mastery_of" for r in relations
            ),
            "total": len(relations),
        },
        "edges": relations,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("cluster", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    cluster = yaml.safe_load(args.cluster.read_text(encoding="utf-8"))
    payload = materialize(cluster)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        yaml.safe_dump(payload, allow_unicode=True, sort_keys=False, width=110),
        encoding="utf-8",
    )
    print(
        f"Materialized {payload['quality_counts']['total']} relations "
        f"to {args.output}"
    )


if __name__ == "__main__":
    main()
