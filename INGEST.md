# Ingesting content into the Infantaverse wiki

This is the repeatable loop for turning new source material — handwritten prose, session
transcripts, letters, handouts, anything — into sourced wiki pages. It exists so any session can
pick up where the last left off and keep the **strict-sourcing rule** intact: every lore page
cites a real source, or is flagged `needsSource: true`. Nothing is invented.

## Where source material lives

| Kind | Location | Cite in `sources:` as |
|------|----------|----------------------|
| **Fed prose** (handwritten transcribed, pasted, new writing) | `sources/handwritten/` | `sources/handwritten/<file>.md` |
| **Session transcripts / audio notes** | `sources/transcripts/` | `sources/transcripts/<file>.md` |
| **Letters, handouts, misc docs** | `sources/documents/` | `sources/documents/<file>.md` |
| **Working text conversions** (pandoc output of docx/pdf) | `sources/_converted/` | cite the *original*, not the conversion |
| **External campaign canon** (the original `.docx`/`.pdf`) | `C:\Users\djett\Desktop\D&D\` | `Desktop/D&D/<path>` |

`sources/` is **not published** — Astro/Starlight only builds `src/content/docs/`. The inbox is
raw material, kept in the repo so citations are portable and self-contained.

## The loop

1. **Add the source.**
   - If Dave hands over a file: drop it in the right `sources/` subfolder.
   - If Dave pastes prose into chat: **save it to a file in `sources/`** first (so the page can
     cite a real path), then proceed. Name it descriptively, e.g.
     `sources/handwritten/calix-origin.md`.
   - For `.docx`/`.pdf`: convert to text for reading with
     `"$HOME/AppData/Local/Pandoc/pandoc" "file.docx" -t plain -o sources/_converted/<name>.txt`
     — but cite the original document, not the conversion.

2. **Log it** in `sources/MANIFEST.md` — one row: the source, what it covers, and which page(s)
   it feeds. Mark status (`ingested` / `partial` / `todo`).

3. **Map it to pages.** Decide whether the content is an **arc/event** (`src/content/docs/events/`)
   or an **entity** (`characters/ factions/ locations/ items/ creatures/ concepts/`). Start from
   the matching skeleton in `templates/`.

4. **Write the page** following the conventions below. Put the source path(s) in frontmatter
   `sources:`. Use real quoted passages where the prose is good.

5. **Cross-link.** Replace bolded entity names with links to their pages as those pages come into
   existence. Update any relevant index/hub pages.

6. **Verify.** `npx astro build` (or `npm run dev` and eyeball). New pages must satisfy the
   content schema. Then move working conversions out of the way if they're noise.

## Conventions (the house style)

- **Strict sourcing.** Every page lists real `sources:`. Thin/unknown areas get
  `needsSource: true` and a short note — never plausible guesswork.
- **No method/process artifacts in content.** No "how this was sourced" notes, no TODO boxes, no
  wiki self-reference. `sources:` lives in frontmatter only.
- **Expansive, not over-summarized.** Include full quotes and text blocks where the source prose
  is strong (read-aloud, dialogue, journals, songs, letters).
- **Oblivia** (`<Oblivia label="...">`) wraps genuinely in-world *erased/secret* lore — used
  sparingly for the biggest reveals.
- **Components:** `Infobox` (right-rail card), `Oblivia` (sealed reveal), `Gallery` (image grid).
  Import from `@components/...`. See `templates/` for per-type usage.
- **One entity = one page**, typed via `entityType`. Reuse the existing schema fields
  (`aka, entityType, setting, era, status, affiliations, location, firstAppearance, image,
  gallery, oblivia, sources, needsSource`). Infobox rows carry the per-type detail.

## Templates

Copy the matching skeleton from `templates/` into the right `src/content/docs/<category>/` folder,
rename to a slug, fill it in, and cite the source:

- `templates/character.mdx` · `faction.mdx` · `location.mdx` · `item.mdx` · `creature.mdx`
  · `concept.mdx` · `event.mdx` (and arc pages follow the existing `events/*.mdx`).

## Scaling note

As volume grows we may add (only if/when useful): a `tags` field + a build-time backlinks panel
for richer cross-referencing, and `git init` for versioned ingestion history. Not required to
start — the loop above works today.
