# Grafo Med viewer

Open `index.html` for the maintainable local viewer or
`../exports/grafomed-viewer.html` for the self-contained export.

The viewer is a rebuildable projection. It has no canonical write authority.
When no Grafo Med graph objects exist, the build script loads
`fixtures/architecture-demo.json`, which is a non-clinical interface fixture
and is labeled `DEMO` in the viewer.

## Rebuild

```bash
python3 products/grafomed-v1/viewer/build_viewer.py
```

Use `--no-demo` to produce an honest empty-state viewer when the graph is empty.
Learner state is never included by this v0 builder.

## Data contract

The viewer accepts a JSON object with:

```text
meta
nodes[]
edges[]
routes[]
warnings[]
```

Canonical schemas remain authoritative. The viewer builder normalizes their
records into this disposable display contract.
