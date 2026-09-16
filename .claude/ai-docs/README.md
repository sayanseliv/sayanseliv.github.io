# AI Docs

Context for AI coding agents (and humans) working in this repo. These are **reference docs**, not rules — the authoritative, enforced conventions live in [`CLAUDE.md`](../../CLAUDE.md). When the two disagree, `CLAUDE.md` wins.

| Doc | What it covers |
| --- | --- |
| [`architecture.md`](./architecture.md) | Stack, directory layout, composables, GSAP/TresJS conventions, SCSS mixins, SEO/meta, build & deploy. |
| [`components/`](./components/) | Per-component reference (props, emits/slots, gotchas) for `animations/`, `cards/`, `layout/`, and `ui/`. Split into section files; start at its [`README.md`](./components/README.md) index. |

## How to use these

- Read `architecture.md` first for a mental model of where things live and which conventions are non-negotiable.
- Use `components/` as an API reference before reusing an existing component — start at its `README.md` index, then open the section file holding that component; it records exact prop names, defaults, and known gotchas (e.g. `<ClientOnly>` requirements for WebGL components) so you don't re-derive them from source.

## Keeping them current

When you add or change a component's public surface (props, emits, slots), update the matching section file under `components/` in the same change (splitting or rebalancing if it would push a file over 400 lines). When you add a composable, design token/mixin, or directory-level convention, update `architecture.md`. The [`/sync-ai-docs`](../commands/sync-ai-docs.md) command automates this audit.
