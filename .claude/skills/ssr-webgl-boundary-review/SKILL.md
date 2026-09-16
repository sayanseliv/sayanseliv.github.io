---
name: ssr-webgl-boundary-review
description: Review changes for violations of this project's SSR/client boundary rules from CLAUDE.md and .claude/ai-docs/architecture.md — 3D/WebGL (TresJS) components must be wrapped in <ClientOnly> and lazy-loaded, and GSAP must not be imported directly in SSR-sensitive paths (use the app/plugins/gsap.client.ts-provided $gsap/$ScrollTrigger instead). Use this whenever the user asks to "review my changes" or "check the architecture", or when a diff touches app/components/animations/**, any file importing "three"/"@tresjs/*"/"gsap", or app/plugins/gsap.client.ts — even if not explicitly asked to run a review. This is narrower than a general code-review: it targets one class of bug (SSR/prerender crash from a browser-only API) that a linter can't catch.
---

# SSR / WebGL Boundary Review

This site is statically generated (`yarn generate`, Nitro prerender crawling from `/`) and also runs with SSR enabled in dev/preview. Any component that touches `three`/`@tresjs/*` WebGL context, `window`/`document`, or an ungated `gsap` import will crash the prerender or throw a hydration mismatch — and that failure mode only surfaces at build/deploy time, not as a type error. Your job is to catch these before they land, not to review general code quality (leave that to `/code-review` or `/simplify`).

## Scope

Look at changed files under `app/components/animations/` (including `bg-circuit/`, `wave-cube/`), any file importing `three`, `@tresjs/nuxt`, `@tresjs/cientos`, `@tresjs/post-processing`, or `gsap`, and `app/plugins/gsap.client.ts`. Files elsewhere are out of scope for this skill.

## Checklist

### 1. WebGL/TresJS components are never rendered during SSR

Every component that renders a `<TresCanvas>` or otherwise depends on WebGL/`three` internals must only ever mount client-side.

Flag:
- A new `animations/` component using `<TresCanvas>`, `three`, or `@tresjs/*` that is referenced from a page or parent component **without** `<ClientOnly>` around it.
- A `<ClientOnly>` usage with no `#fallback` on a component that visibly occupies layout space (causes layout shift on hydration) — not a hard blocker, but worth a note.
- The component being imported eagerly at the top of a page/parent instead of lazily (`defineAsyncComponent`, or Nuxt's auto-generated `<LazyX>` component) — eager import still pulls `three`/`@tresjs` into the initial bundle even behind `<ClientOnly>`.
- Direct use of `window`, `document`, `ResizeObserver`, or WebGL context APIs at the top level of `<script setup>` (module/setup scope) instead of inside `onMounted`/a `ClientOnly`-gated child — this runs during SSR and throws.

### 2. GSAP stays behind the client plugin

`app/plugins/gsap.client.ts` registers `ScrollTrigger` once and provides `$gsap`/`$ScrollTrigger`. This exists so `ScrollTrigger` is registered exactly once and never touched during SSR.

Flag:
- A component `import { gsap } from 'gsap'`-ing directly instead of using `const { $gsap } = useNuxtApp()`, unless that component is itself already fully behind `<ClientOnly>` (in which case a direct import still works but loses the guarantee that `ScrollTrigger` is registered — prefer the injected instance anyway).
- A new file calling `gsap.registerPlugin(...)` outside `gsap.client.ts` — plugin registration should stay centralized.
- A GSAP timeline/ScrollTrigger created in `onMounted` without a matching `kill()`/cleanup in `onUnmounted` — a leaked `ScrollTrigger` instance keeps firing after the component (or in this SPA-ish site, after a client-side route change) unmounts.

### 3. Canvas 2D components guard resize/animation-frame lifecycles

`app/composables/canvas/*` (`useCanvas`, `useCanvasAnimations`, `useCanvasShapes`, `useCanvasPatterns`) back the Canvas-2D demos. A `requestAnimationFrame` loop or resize listener started in `onMounted` without a corresponding `cancelAnimationFrame`/listener removal in `onUnmounted` leaks across client-side navigations between `/features/*` demo pages.

Flag:
- A new animation loop with no visible cleanup path.
- Canvas context acquisition (`getContext('2d')`) at module/setup scope instead of inside `onMounted`/`useCanvas()`.

## Output format

Report findings grouped by file:

`path/to/file.vue:LINE — <which invariant broken> — <why it matters> — <fix>`

If nothing in scope changed, say so briefly instead of running the checklist. Don't flag speculative/hypothetical violations — only flag code that's actually in the diff you're reviewing.
