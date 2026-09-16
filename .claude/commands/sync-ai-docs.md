---
name: sync-ai-docs
description: Audit and update CLAUDE.md and .claude/ai-docs/*.md to reflect the current codebase state. Catches undocumented components, composables, pages, and conventions, and flags content that duplicates the single source of truth, so Claude always has accurate, non-redundant context. Keeps every doc under 400 lines by splitting oversized files into linked directories, then auto-runs a sync + verification pass on the result. Use when the user says "update docs", "sync AI docs", "update CLAUDE.md", "keep docs up to date", or after a significant batch of feature work.
---

# Sync AI Docs

Keep `CLAUDE.md` and the supporting `.claude/ai-docs/*.md` files accurate and complete so Claude has reliable context in every future conversation. The goal is to close the gap between what the code does and what the docs say — not to rewrite prose, but to add missing entries, remove stale ones, and update changed signatures or paths.

## Core principle: document patterns, not instances

`CLAUDE.md` loads into context on **every** Claude session, so it must stay lean as the codebase grows. It documents **enforced conventions and where things live** — not every component/page instance. Instance detail belongs downstream in `.claude/ai-docs/architecture.md` (directory-level reference) or `.claude/ai-docs/components/` (per-component reference).

- ✅ "`components/ui/` — Reusable UI primitives (buttons, progress, tag cloud)" → never grows
- ❌ Listing every UI component with per-component notes → grows forever, goes stale

**Where does it belong? (checklist before adding anything to `CLAUDE.md`)**
- An enforced convention or rule (naming, structure, gotcha) that applies project-wide? → `CLAUDE.md` ✅
- Per-component/-page/-composable detail, prop tables, or how-it-works internals? → `.claude/ai-docs/architecture.md` or `.claude/ai-docs/components/`
- Already documented elsewhere? → link, don't copy
- Does the name already say it? → skip it (self-documenting)

**Smell tests** (a `CLAUDE.md` bullet failing these belongs downstream):
- Any bullet longer than ~2 lines is probably carrying detail that belongs downstream
- Nested parentheticals `(… (…) …)` = a doc's job leaking into the rules file
- Watch word count — keep `CLAUDE.md` **flat as features grow, not climbing**. Adding the 10th animation demo or component should change it by ~zero lines.

**Caveat for this skill:** re-deriving from code (Step 2) surfaces instance detail — push that into `.claude/ai-docs/architecture.md` or `.claude/ai-docs/components/`; keep `CLAUDE.md` about enforced rules. Reducing an existing per-instance list in `CLAUDE.md` down to its pattern is a valid, encouraged edit.

## Doc-size rule: split any file over 400 lines

Every `.md` under `.claude/ai-docs/` must stay **≤ 400 lines** so a limited-context model can load a whole file at once. `.md` files up to 400 lines are fine to create/keep as-is; the moment your edits would push one **over** 400, split it — don't let it grow.

**Split pattern** (the reference example already in the repo is `.claude/ai-docs/components/`):

1. Create a directory named after the doc, minus `.md` — `components.md` → `components/`.
2. Break the doc into section files along its natural axis (component group, source directory, or feature): e.g. `components/animations.md`, `components/ui-cards-layout.md`. Each section file is self-contained: its own `#` H1, a one-line context + base facts, and a back-link to the index.
3. Make the folder the entry point via `<dir>/README.md`. The index holds the intro/legend plus a table linking to every section file.
4. Update `.claude/ai-docs/README.md` and any `CLAUDE.md` / cross-doc links so every reference points at the new structure — no dangling links.
5. Content moves **verbatim** — a split only re-homes and re-heads sections; it never rewrites or drops them.

Split recursively: if a section file itself exceeds 400 lines, split that one too. Prefer a few 150–350-line section files over many tiny ones. **`CLAUDE.md` is never split** — it loads every session as one file; keep it under the limit by trimming to patterns (Core principle), not by breaking it up.

**The one exception:** an *indivisible* block that genuinely can't be broken up (e.g. a single large captured data sample) is allowed to exceed the limit, but isolate it in its own leaf file so nothing else inherits the bloat, and note at the top of that file why it's oversized.

## Step 1 — Snapshot the current docs

Read all AI-context documents in parallel:

- `CLAUDE.md` (the single source of truth for enforced conventions)
- `.claude/ai-docs/README.md` (index/usage notes for the ai-docs folder)
- `.claude/ai-docs/architecture.md` (stack, directory layout, composables, GSAP/TresJS conventions, design tokens, SEO/build)
- `.claude/ai-docs/components/README.md` and its section files (per-component API reference)

## Step 2 — Scan the codebase for ground truth

Run these commands to collect the current state. Run them in parallel.

```bash
# Pages (routes)
find app/pages -name "*.vue" | sort

# Components — by directory (animations incl. bg-circuit/wave-cube, cards, layout, ui incl. buttons)
find app/components -name "*.vue" | sort

# Composables (incl. canvas/ subfolder)
find app/composables -name "*.ts" ! -name "*.test.ts" | sort

# Plugins
find app/plugins -name "*.ts" | sort

# Types
find app/types -name "*.ts" -o -name "*.d.ts" | sort

# Static content shape
find content -name "*.json" | sort

# SCSS entry points + mixins
find app/assets/styles -name "*.scss" | sort

# Tests
find tests -type f | sort
```

Then read any files that look new or changed relative to what is described in the current docs. Focus on:
- files in `app/components/` with no corresponding entry in `.claude/ai-docs/components/`
- pages in `app/pages/` with no mention in `.claude/ai-docs/architecture.md`
- composables, plugins, or types with no mention in `.claude/ai-docs/architecture.md`
- new mixins added to `app/assets/styles/_mixins.scss` since the docs were written
- code idioms in `CLAUDE.md` examples that reference renamed/removed helpers or config
- `nuxt.config.ts` changes (new modules, changed `app.head`, sitemap/robots options, build/deploy settings)

## Step 3 — Diff docs against code

Build a mental diff across five categories:

### 3a. Missing entries
Items present in code but absent from docs. These are the most important gaps — Claude has no context for them.

### 3b. Stale entries
Items documented but no longer present in code (deleted files, renamed exports, moved directories, dangling links). Remove or update them so Claude is not misled.

### 3c. Changed signatures / paths
Props, composable return shapes, or file paths that have changed since the docs were written. Update to match actual code.

### 3d. Coverage gaps
Documented items that lack enough detail for Claude to use them correctly — missing prop tables, missing gotchas. Add what is needed; do not pad with obvious prose.

### 3e. Source-of-truth duplication
Per `.claude/ai-docs/README.md`, `CLAUDE.md` is authoritative for enforced conventions; `.claude/ai-docs/*.md` are reference docs that must defer to it when the two disagree. Flag any place in `architecture.md` or `components/*.md` that restates a rule `CLAUDE.md` already states (e.g. re-explaining the `<ClientOnly>` requirement for 3D/WebGL, the accessibility rules, or naming conventions) instead of linking to it — and any generic engineering/framework advice the model already knows. Reduce each to a one-line reference to the owning file, or delete it.

## Step 4 — Apply updates

Edit the affected files directly. Follow these rules for each file:

### CLAUDE.md — patterns only (see Core principle)

Add here **only** when a change introduces a new *enforced convention* or a new top-level *location* (e.g. a new `app/components/<dir>/` category). Do **not** add a row per new component/page/composable — that instance detail goes to `.claude/ai-docs/`. Where you find an existing per-instance list, prefer reducing it toward its pattern over extending it.

- **Project Structure** — update only if a new top-level `app/` category appears (today: `components/{animations,cards,layout,ui}`, `composables/{canvas,}`, `pages/{,features,portfolio}`, `plugins`, `types`).
- **TypeScript Rules / Key Conventions / SEO / ESLint-Accessibility Rules** — update only if the actual enforced rule changes (e.g. a new required wrapper, a new banned pattern). Do not add narrower restatements of existing rules.
- Prop tables, per-component notes, per-route detail, and how-it-works internals → **not here** (downstream, `.claude/ai-docs/`).
- Keep formatting consistent with the surrounding content (tables, code fences, heading levels).

### .claude/ai-docs/architecture.md

The directory-and-conventions reference. Extend the **Directory layout** tree and matching prose sections when a new top-level directory or pattern appears under `app/`:
- **Composables** (`app/composables/`, `app/composables/canvas/`) — one line per composable: signature + purpose.
- **Plugins** (`app/plugins/`) — one line per plugin + its `.client`/`.server` suffix meaning.
- **Types** (`app/types/`) — one line per file naming what it exports.
- **Pages** — note new top-level route groups under `app/pages/` and whether they're sitemap-excluded.
- **Design tokens / SCSS mixins** — if a new mixin was added to `_mixins.scss`, append it to that list. Do not rewrite the existing mixin list wholesale.
- Do not restate anything `CLAUDE.md` already enforces (see 3e) — link to it instead.

### .claude/ai-docs/components/*.md

The per-component reference for `app/components/{animations,cards,layout,ui}/`. For each new or changed component, add or update an entry: what it renders/wraps, its props (a table for 3+ props), emits/slots/model, and any non-obvious behavior (e.g. `<ClientOnly>` requirement, GSAP `ScrollTrigger` cleanup, canvas resize handling). Remove entries for deleted components; update renamed props/defaults.

### .claude/ai-docs/README.md

Only touch this if the set of files under `.claude/ai-docs/` changes (a new doc added or one removed) — update the table row, or fix a dangling link. Do not rewrite its framing prose.

## Step 5 — Split any doc over 400 lines

After applying updates, measure every doc:

```bash
wc -l CLAUDE.md .claude/ai-docs/*.md .claude/ai-docs/**/*.md 2>/dev/null
```

For every file **under `.claude/ai-docs/`** above 400 lines, apply the split pattern from **Doc-size rule** above (directory + section files + linked index, content moved verbatim). Re-measure after splitting; if a new section file is still over 400 lines, split it again. `CLAUDE.md` over the limit is trimmed to patterns per the Core principle — never split.

## Step 6 — Auto-run sync & verification

Run this automatically at the end of every invocation — the user should not have to ask. It re-checks coverage (a second sync pass) and verifies structure:

```bash
# Size — flag anything over 400 lines (a pure directory index that only links out is exempt)
wc -l CLAUDE.md .claude/ai-docs/*.md .claude/ai-docs/**/*.md 2>/dev/null \
  | awk '$2!="total" && $1>400 {print "  OVER 400:", $2, "("$1")"}'

# Dangling links — every relative ](./x.md) / ](../x.md) target must resolve to a real file
# Stale strings — grep for any filename / path / identifier removed this run
```

Verify each of:
- **Coverage (re-sync):** re-run the Step 2 scan; every source item still maps to a doc entry, a split dropped nothing, and anything new found on the rescan is added.
- **Size:** no `.md` over 400 lines — except a pure directory index that only links out, or a leaf file holding one indivisible oversized block (see the Doc-size rule exception).
- **Links:** every relative link resolves to a real file — no dangling references.
- **Split integrity:** for each split, the combined section-file body ≥ the original (no content lost); every section file is linked from its index and every index link resolves.
- **No stale strings:** removed filenames, paths, and identifiers appear nowhere.

If any check fails, fix it and re-run this step — loop until all pass. Only then write the report.

## Step 7 — Report the changes

After all edits, splits, and verification are complete, write a concise summary in the conversation:

```
## AI docs sync complete

### Added
- [list each new entry, one per line, with the file it was added to]

### Removed / corrected
- [list each stale or corrected entry]

### Restructured / split
- [any doc split into a directory over the 400-line limit, with the new section files + index]

### Verification
- [size / links / coverage checks — all passing, or what was fixed to make them pass]

### No changes needed
- [list files that were already accurate]
```

If no changes were needed anywhere, say so directly. Do not manufacture findings to look busy.

## Guardrails

- **`CLAUDE.md` = enforced conventions, not instances** (see Core principle). Never grow it by a row per new component/page/composable; adding the Nth similar item should change it by ~zero lines. Instance detail → `.claude/ai-docs/`.
- **Every `ai-docs` doc stays ≤ 400 lines** — split at the threshold into a linked directory (see Doc-size rule) rather than letting a file grow past it. Keep `CLAUDE.md` under the limit by trimming to patterns, never by splitting it.
- **Only edit AI-context files** — `CLAUDE.md`, `.claude/ai-docs/README.md`, and any `.md` files or subdirectories under `.claude/ai-docs/` (splitting a doc creates new section files there). Never touch source files (`app/`, `server/`, `content/`) or `.claude/commands/` (including this file).
- **Respect the source-of-truth map** — never resolve a duplication by copying `CLAUDE.md`'s content into `.claude/ai-docs/`; always reduce the duplicate to a reference pointing at `CLAUDE.md`.
- **Never delete content that describes real behavior** — only remove entries for things that no longer exist in the codebase.
- **Minimal prose** — add facts, not explanations. The job is coverage, not polish.
- **Do not touch memory files** (`.claude/memory/`, `~/.claude/projects/*/memory/`) — those are managed separately and reflect conversation/session history, not codebase state.
- **Match the existing style exactly** — table column order, heading levels, code-fence languages, and list indentation must be consistent with the surrounding content in each file.
