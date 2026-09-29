#!/usr/bin/env python3
"""Compile one candidate node learning pack into a deterministic browser assignment."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


SUPPORTED_TYPES = {"teach", "single_choice", "multiple_select", "sequence", "short_answer"}


def validate(pack: dict) -> None:
    required = {"schemaVersion", "id", "status", "nodeRef", "language", "title", "objective", "lessons", "reviewPlan"}
    missing = sorted(required - pack.keys())
    if missing:
        raise ValueError(f"Missing pack fields: {', '.join(missing)}")
    if pack["schemaVersion"] != "0.1.0":
        raise ValueError("Unsupported node learning pack schema version")
    if pack["status"] != "candidate_demo_not_promoted":
        raise ValueError("Only unpromoted candidate packs may be compiled by this prototype builder")
    lesson_ids: set[str] = set()
    activity_ids: set[str] = set()
    for lesson in pack["lessons"]:
        if lesson["id"] in lesson_ids:
            raise ValueError(f"Duplicate lesson id: {lesson['id']}")
        lesson_ids.add(lesson["id"])
        if not lesson.get("activities"):
            raise ValueError(f"Lesson has no activities: {lesson['id']}")
        for activity in lesson["activities"]:
            if activity["id"] in activity_ids:
                raise ValueError(f"Duplicate activity id: {activity['id']}")
            activity_ids.add(activity["id"])
            if activity["type"] not in SUPPORTED_TYPES:
                raise ValueError(f"Unsupported activity type: {activity['type']}")
            if activity["type"] != "teach":
                for field in ["phase", "evidenceLevel", "instruction", "hint", "explanation", "errorPattern"]:
                    if not activity.get(field):
                        raise ValueError(f"{activity['id']} lacks {field}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    pack = json.loads(args.source.read_text(encoding="utf-8"))
    validate(pack)
    args.destination.parent.mkdir(parents=True, exist_ok=True)
    compiled = json.dumps(pack, ensure_ascii=False, separators=(",", ":"))
    args.destination.write_text(f"window.GRAFOMED_NODE_PACK = {compiled};\n", encoding="utf-8")


if __name__ == "__main__":
    main()
