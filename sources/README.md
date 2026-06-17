# Sources inbox

Raw source material for the wiki. **Not published** — Astro only builds `src/content/docs/`.
This folder exists so every wiki page can cite a real, portable file (the strict-sourcing rule),
including handwritten prose and other material fed in over time.

See **[`../INGEST.md`](../INGEST.md)** for the full ingestion workflow.

## Folders

- `handwritten/` — transcribed handwritten work, pasted prose, new writing.
- `transcripts/` — session transcripts, audio notes.
- `documents/` — letters, handouts, miscellaneous source docs.
- `_converted/` — working text conversions of `.docx`/`.pdf` (cite the original, not these).

## Adding a source

1. Drop the file in the right folder (or, if it was pasted in chat, save it here first).
2. Name it descriptively and slug-like: `calix-origin.md`, `session-2026-06-07.md`.
3. Add a row to `MANIFEST.md`.
4. Cite it in a page's frontmatter `sources:` as `sources/<folder>/<file>`.

External campaign canon (the original `.docx`/`.pdf`) stays at `C:\Users\djett\Desktop\D&D\` and
is cited as `Desktop/D&D/<path>`.
