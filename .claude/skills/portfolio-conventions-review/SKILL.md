---
name: portfolio-conventions-review
description: Review Vue/TypeScript/SCSS changes in this repo against the project-specific rules enforced in CLAUDE.md — no `any`, no redundant ref type annotations, self-closing tags, accessibility rules (alt-text, click-events-have-key-events, label-has-for, form-control-has-label), hero image loading/fetchpriority, lucide-vue-next-only icons, no manual `_mixins.scss` import, and <ClientOnly>-wrapped 3D/WebGL. Use this whenever the user asks to "review my changes", "check conventions", "does this follow CLAUDE.md", wants a pre-commit sanity pass, or right after generating/editing a .vue, .ts, or .scss file — even if they didn't explicitly ask for a review. Generic code-review skills do not know these project-specific rules, so this one should run in addition to (not instead of) them.
---

# Portfolio Conventions Review

CLAUDE.md encodes this repo's enforced conventions — a generic reviewer won't catch these because they're project-specific, not general best practice. Your job here is narrow: walk the diff and flag violations of these specific rules, nothing more. Leave general code quality to `/code-review` or `/simplify`, and leave SSR/WebGL boundary issues to `ssr-webgl-boundary-review`.

## Scope

Default to reviewing the working diff (uncommitted changes). If the user names specific files, review only those. Only look at `.vue`, `.ts` files under `app/`, and `.scss` files under `app/assets/styles/` — the rules below don't apply elsewhere.

## Checklist

Go through changed files against each item that applies to that file type. Cite `file:line` for every hit.

### TypeScript
- No `any` anywhere — flag and suggest a proper type, generic, or `unknown` with narrowing.
- `interface` used for object shapes added to `app/types/index.ts` (existing convention); `type` reserved for unions/aliases/utility types.
- A `ref(...)` call with an explicit type parameter where the initial value alone lets TypeScript infer it (e.g. `ref<string>('foo')`) — flag as unnecessary. A `ref<T | null>(null)` or similar where inference is impossible is correct and should not be flagged.

### Vue component conventions
- All void/normal/component tags self-close where empty (`vue/html-self-closing`) — flag `<img>`, `<input>`, or an empty custom component left unclosed.
- A component under `components/animations/` that renders `<TresCanvas>` or otherwise depends on `three`/`@tresjs/*` is wrapped in `<ClientOnly>` and lazy-loaded at its call site — if you see this, note it but defer the full check to `ssr-webgl-boundary-review` (don't duplicate that skill's detailed WebGL/GSAP checklist here).
- A component importing `gsap` directly outside `app/plugins/gsap.client.ts` in a path that isn't already behind `<ClientOnly>` — same deferral, flag once and point to `ssr-webgl-boundary-review`.

### Accessibility (ESLint-enforced, but check intent not just presence)
- Every click handler (`@click`) on a non-interactive element (`div`, `span`, etc.) has a matching keyboard handler (`@keydown`/`@keyup`) — `vuejs-accessibility/click-events-have-key-events`. Prefer a real `<button>`/`<a>` over a `div` + manual keyboard handler when the element is genuinely just a button.
- Every `<img>` has a meaningful, non-empty `alt` describing what the image conveys — not a filename, not `alt=""` used to silence the linter for a non-decorative image. A genuinely decorative image should use `alt=""` deliberately (or `aria-hidden`), not by omission.
- Form `<label>` elements are associated via nesting or a matching `id`/`for` pair (`vuejs-accessibility/label-has-for`), and every form control has an associated label (`vuejs-accessibility/form-control-has-label`) — flag a bare `<input>`/`<textarea>`/`<select>` with no `<label>`, `aria-label`, or `aria-labelledby`.

### Images
- Hero / above-the-fold images use `loading="eager"` and `fetchpriority="high"` — flag a hero image left at default lazy loading, and flag `loading="eager"` used on a below-the-fold image (defeats lazy-loading for no benefit).
- Icons come from `lucide-vue-next` — flag a new hand-rolled inline `<svg>` icon or a new icon font/sprite system introduced instead of importing from `lucide-vue-next`.

### SCSS
- No manual `@use '_mixins.scss'` (or similar) in a component's `<style lang="scss">` block — it's auto-injected via Vite's `additionalData`; a manual import is redundant and risks double-injection warnings.
- A hover-only interactive style (`&:hover { ... }`) with no keyboard-focus equivalent — suggest the `hover-focus` mixin (`&:hover, &:focus-within`) from `_mixins.scss` instead of a bare `:hover`.

### Naming & structure
- Components registered without a path prefix (`pathPrefix: false`) — flag a new component authored with a path-prefixed name assumption (e.g. a template using `<UiButton>` for something that auto-imports as `<AnimatedButton>`), and flag two components in different folders sharing the same base file name.
- Static content (technologies, tools) changes belong in `content/data.json`, not hardcoded into a component — flag a new hardcoded technology/tool list inside a `.vue` file that duplicates or should extend `content/data.json`.

## Output format

Report findings grouped by file, each line as:

`path/to/File.vue:42 — <rule broken> — <one-line fix>`

If a file has no violations, don't list it. End with a one-line summary count (e.g. "3 findings across 2 files"). For anything trivial and unambiguous (e.g. adding a missing `alt`, self-closing a tag, removing an unnecessary `ref<T>` annotation), offer to fix it directly with Edit rather than just describing it — but ask first if the fix requires judgment (e.g. picking alt text wording).
