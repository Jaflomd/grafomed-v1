#!/usr/bin/env python3
"""Compile USAMEDIC notes into a GrafoMed concept-library release.

The importer deliberately creates concept nodes, not mastery nodes. A raw
clinical note is source-backed learning material; it is not yet a bounded,
assessable competence until it has been editorially decomposed.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from datetime import date
from pathlib import Path


DEFAULT_NOTES = Path("/Users/jaflomd/Library/Mobile Documents/com~apple~CloudDocs/Jaflo Lab/3-usamedic-alexei/reference/temario-maestro")

SPECIALTY_NAMES = {
    "ANA": "Anatomía", "BIO": "Bioquímica y bioética", "EMB": "Embriología",
    "FAR": "Farmacología", "FIS": "Fisiología", "GEN": "Genética",
    "HEM": "Hematología", "HIS": "Histología", "MIC": "Microbiología",
    "NEU": "Neumología", "PAR": "Parasitología", "PSF": "Psicofarmacología",
    "ANE": "Anestesiología", "CCV": "Cirugía cardiovascular", "CGE": "Cirugía general",
    "CPD": "Cirugía pediátrica", "NCG": "Neurocirugía", "OFT": "Oftalmología",
    "ORL": "Otorrinolaringología", "TRA": "Traumatología", "URO": "Urología",
    "GIN": "Ginecología", "GOM": "Ginecología oncológica y mama", "OBS": "Obstetricia",
    "CAR": "Cardiología", "DER": "Dermatología", "END": "Endocrinología",
    "GAS": "Gastroenterología", "INF": "Infectología", "NEF": "Nefrología",
    "NRL": "Neurología", "PSI": "Psiquiatría", "REU": "Reumatología",
    "CRE": "Crecimiento y desarrollo", "NEO": "Neonatología", "PED": "Pediatría",
    "EPI": "Epidemiología", "EST": "Estadística", "GES": "Gestión sanitaria",
    "MED": "Medicina legal", "SPU": "Salud pública", "RMX": "Residentado: miscelánea",
}


def scalar(value: str):
    value = value.strip()
    if value.startswith(("\"", "'")) and value.endswith(value[0]):
        return value[1:-1]
    return value


def frontmatter(text: str) -> dict:
    if not text.startswith("---"):
        return {}
    result, key = {}, None
    for line in text.splitlines()[1:]:
        if line.strip() == "---":
            break
        match = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", line)
        if match:
            key, value = match.groups()
            result[key] = scalar(value) if value.strip() else []
            continue
        match = re.match(r"^\s*-\s*(.*)$", line)
        if match and key:
            if not isinstance(result[key], list):
                result[key] = []
            result[key].append(scalar(match.group(1)))
    return result


def code(folder: Path, meta: dict) -> str:
    for value in (meta.get("topic_id"), meta.get("note_id"), meta.get("code"), folder.name):
        if value:
            match = re.search(r"\b([A-Z]{2,4}(?:-[A-Z]{2,4})?-\d{1,3})\b", str(value))
            if match:
                return match.group(1)
    return "UNMAPPED-" + hashlib.sha1(folder.name.encode()).hexdigest()[:8]


def title(folder: Path, meta: dict, text: str) -> str:
    if meta.get("title"):
        return str(meta["title"])
    for line in text.splitlines():
        match = re.match(r"^#\s+(.+?)\s*$", line)
        if match and match.group(1).strip().lower() not in {"nota", "note"}:
            return match.group(1).strip()
    return folder.name


def specialty(topic_code: str, meta: dict) -> str:
    if meta.get("specialty"):
        return str(meta["specialty"])
    bits = topic_code.split("-")
    return SPECIALTY_NAMES.get(bits[1] if len(bits) > 1 else bits[0], "Sin clasificar")


def slug(value: str) -> str:
    value = value.lower().replace("ñ", "n")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "item"


def body_without_frontmatter(text: str) -> str:
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) == 3:
            return parts[2].strip()
    return text.strip()


def first_content(text: str, limit: int = 600) -> str:
    text = body_without_frontmatter(text)
    text = re.sub(r"^#+\s+.*$", "", text, flags=re.M)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:limit]


def clinical_files(folder: Path) -> list[str]:
    allowed = {"note.md", "cognitive-model.md", "source-map.md", "manifest.md", "qa.md"}
    paths = []
    for path in sorted(folder.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(folder)
        if rel.name in allowed or rel.parts[0] in {"micronotes", "qbank"}:
            paths.append(str(rel))
    return paths


def build(notes_root: Path, destination: Path):
    folders = sorted(path.parent for path in notes_root.glob("*/note.md"))
    records = []
    for folder in folders:
        note_path = folder / "note.md"
        raw = note_path.read_text(encoding="utf-8", errors="replace")
        meta = frontmatter(raw)
        topic_code = code(folder, meta)
        topic_title = title(folder, meta, raw)
        area = specialty(topic_code, meta)
        topic_slug = slug(folder.name)
        records.append({
            "folder": folder,
            "raw": raw,
            "meta": meta,
            "topic_code": topic_code,
            "topic_title": topic_title,
            "specialty": area,
            "topic_slug": topic_slug,
            "files": clinical_files(folder),
        })

    specialty_names = sorted({record["specialty"] for record in records})
    specialty_ids = {name: "gm-specialty-" + slug(name) for name in specialty_names}
    nodes = []
    edges = []
    units = []
    sources = []
    for name in specialty_names:
        sid = specialty_ids[name]
        nodes.append({"id": sid, "type": "cluster", "title": name, "description": f"Especialidad candidata con temas USAMEDIC. Contenido pendiente de revisión editorial y clínica."})

    for record in records:
        node_id = "gm-usamedic-" + record["topic_slug"]
        source_id = "src-usamedic-" + record["topic_slug"]
        unit_id = "unit-usamedic-" + record["topic_slug"]
        body = body_without_frontmatter(record["raw"])
        source_scope = "; ".join(record["files"])
        digest = hashlib.sha256(record["raw"].encode("utf-8")).hexdigest()
        sources.append({
            "id": source_id,
            "title": f"USAMEDIC · {record['topic_code']} · {record['topic_title']}",
            "url": f"local://reference/temario-maestro/{record['topic_slug']}/note.md",
            "accessed": date.today().isoformat(),
            "scope": f"Nota canónica y materiales clínicos asociados: {source_scope}. SHA-256 note.md: {digest}.",
            "rights": "Contenido local candidato; requiere revisión antes de publicación.",
        })
        nodes.append({
            "id": node_id,
            "type": "concept",
            "title": record["topic_title"],
            "description": f"{record['topic_code']} · {record['specialty']}. Concepto importado desde una nota maestra; aún requiere curación en decisiones, reglas y procedimientos.",
        })
        edges.append({"source": specialty_ids[record["specialty"]], "target": node_id, "kind": "contains"})
        units.append({
            "id": unit_id,
            "title": record["topic_title"],
            "target_id": node_id,
            "body": body,
            "example": first_content(record["raw"]) or f"Explora el tema {record['topic_title']}.",
            "alternative": "Usa las micronotas, el modelo cognitivo y el banco de preguntas de la carpeta como material complementario.",
            "boundary": "Unidad candidata importada para el MVP. Requiere revisión estructural, clínica, educativa y de fuentes antes de publicarse como enseñanza validada.",
            "source_ids": [source_id],
        })

    content = {
        "release": {"id": "usamedic.notes.v2", "title": "USAMEDIC · biblioteca de conceptos por especialidad · MVP", "status": "candidate", "version": 2},
        "sources": sources,
        "nodes": nodes,
        "edges": edges,
        "units": units,
        "activities": [],
        "cases": [],
    }
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"release": content["release"], "notes": len(records), "specialties": len(specialty_names), "nodes": len(nodes), "units": len(units), "sources": len(sources), "edges": len(edges), "destination": str(destination)}, ensure_ascii=False, indent=2))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--notes-root", type=Path, default=DEFAULT_NOTES)
    parser.add_argument("--destination", type=Path, required=True)
    args = parser.parse_args()
    build(args.notes_root.expanduser().resolve(), args.destination.expanduser().resolve())


if __name__ == "__main__":
    main()
