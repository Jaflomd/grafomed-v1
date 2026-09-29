#!/usr/bin/env python3
"""Build browser-ready candidate data for the upper-limb learning prototype."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import yaml


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("cluster", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    cluster = yaml.safe_load(args.cluster.read_text(encoding="utf-8"))
    objectives = []
    all_atoms = []
    for objective_index, objective in enumerate(cluster["objective_hierarchy"]):
        atoms = []
        for atom_index, atom in enumerate(objective["mastery_atoms"]):
            item = {
                "id": atom["id"],
                "title": atom["title"],
                "objective": atom["learning_contract"]["objective"],
                "expectedPerformance": atom["learning_contract"]["expected_performance"],
                "masteryEvidence": atom["learning_contract"]["mastery_evidence"],
                "evidenceLevels": atom["evidence_levels"],
                "knowledgeRefs": atom["evidence_object_refs"],
                "objectiveId": objective["id"],
                "objectiveIndex": objective_index,
                "atomIndex": atom_index,
                "sequence": len(all_atoms),
            }
            atoms.append(item)
            all_atoms.append(item)
        objectives.append(
            {
                "id": objective["id"],
                "title": objective["title"],
                "objective": objective["objective"],
                "sourceOutcomes": objective["source_outcomes"],
                "atoms": atoms,
            }
        )

    payload = {
        "schema": "grafomed-learning-prototype-data.v0",
        "status": "candidate_demo_not_promoted",
        "generatedFrom": cluster["id"],
        "cluster": {
            "id": cluster["id"],
            "title": cluster["title"],
            "objective": cluster["cluster_contract"]["objective"],
            "expectedPerformance": cluster["cluster_contract"]["expected_performance"],
            "masteryEvidence": cluster["cluster_contract"]["mastery_evidence"],
            "thresholdStatus": cluster["cluster_contract"]["threshold_status"],
        },
        "assessmentLevels": [
            {"code": item["code"], "label": item["label"], "meaning": item["meaning"]}
            for item in cluster["assessment_model"]["levels"]
        ],
        "objectives": objectives,
        "atoms": all_atoms,
        "routes": cluster["route_templates"],
        "assemblies": cluster["integrating_assemblies"],
        "source": {
            "citation": cluster["source_lock"]["citation"],
            "locator": cluster["source_lock"]["stable_locator"],
            "status": cluster["source_lock"]["evidence_status"],
        },
    }
    serialized = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        "window.GRAFOMED_UPPER_LIMB = " + serialized + ";\n",
        encoding="utf-8",
    )
    print(
        f"Built prototype data with {len(objectives)} objectives and "
        f"{len(all_atoms)} mastery atoms at {args.output}"
    )


if __name__ == "__main__":
    main()
