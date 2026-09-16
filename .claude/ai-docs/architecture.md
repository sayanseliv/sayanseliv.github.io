# Architecture & Conventions

Supplements [`CLAUDE.md`](../../CLAUDE.md) — that file is the enforced source of truth; this one adds the mental model and the concrete directory/composable/token map.

## Stack

- **Nuxt 4** (`app/` source directory), SSR enabled (`ssr: true`) but deployed as a static site via `yarn generate` → `.output/public` (Nitro preset `github_pages`).
- **Vue 3**, Composition API, `<script setup lang="ts">`. **TypeScript** throughout, `strict: true`, `typeCheck: true`.
- **3D/WebGL:** `@tresjs/nuxt`, `@tresjs/cientos`, `@tresjs/post-processing` (Three.js wrapper for Vue). `tres.glsl: true` enables `.glsl` imports.
- **Animation:** GSAP + `ScrollTrigger`, registered once in `app/plugins/gsap.client.ts` (client-only plugin, note the `.client.ts` suffix). Injected as `$gsap`/`$ScrollTrigger` via `useNuxtApp()`, or import `gsap` directly inside components that are themselves already client-only (see SSR notes below).
- **Icons:** `lucide-vue-next` only — no custom icon system, no inline SVG icon components.
- **Styling:** SCSS with `sass`. `app/assets/styles/_mixins.scss` is auto-injected into every SCSS block by Vite (`additionalData` in `nuxt.config.ts`) — never `@use` it manually in a component's `<style lang="scss">`.
- **Modules:** `@nuxt/eslint`, `@tresjs/nuxt`, `@nuxtjs/sitemap`, `@nuxt/test-utils/module`, `nuxt-github-pages`, `@nuxtjs/robots`.
- **No i18n, no Pinia, no auth, no server API layer.** `server/` exists only for Nitro's static-generation needs; there is no `server/api/` business logic. Static content (technologies, tools) is read from `content/data.json` at build time — not fetched.
- **Real-time demo:** `useWebSocket(url)` (`app/composables/useWebSocket.ts`) is a standalone connect/send/disconnect wrapper used by the `/features/websocket` demo page — it is not part of the app's data layer.

## Directory layout

```
app/
  components/
    animations/            # Canvas 2D, WebGL, Three.js, GSAP animation demos (flat + two subfolders)
      bg-circuit/           # BgCircuitWebGL, CircuitBloom, CircuitScene — TresJS circuit-board scene
      wave-cube/             # BgWaveCube, WaveScene — TresJS wave/cube scene
    cards/                  # CardFeature, CardPortfolio, CardTechnology, CardTools
    games/                  # Full playable mini-games (score/lives/levels), one component per game — SpaceDefenderGame, PlatformerChaseGame
    layout/                 # AppHeader, AppModal
    ui/                     # Reusable UI primitives: ProgressBar, TagCloud, CircleProgress, AnimatedBlock
      buttons/               # AnimatedButton, AnimatedMatrix, AnimatedWaveButton, AnimatedWaveClipButton, MaskButton
  composables/
    canvas/                 # useCanvas, useCanvasAnimations, useCanvasShapes, useCanvasPatterns
    useWebSocket.ts          # standalone WebSocket wrapper for the /features/websocket demo
  games/                    # Non-component game engine code, one subfolder per game
    space-defender/          # PixiJS engine backing SpaceDefenderGame.vue — classes/, common/, sprites/, types.ts, game.ts (init/destroy)
  pages/
    index.vue                # landing page
    features/                 # one page per animation/canvas/3D demo, index.vue lists them
    games/                    # one page per mini-game, index.vue lists them
    portfolio/                 # portfolio listing, reads content/data.json
  plugins/
    gsap.client.ts            # registers GSAP + ScrollTrigger, provides $gsap/$ScrollTrigger
  types/
    index.ts                  # shared domain types: Content, Tool, CategoryData
    canvas.ts                 # shape/pattern param interfaces consumed by composables/canvas/*
    particle-network.d.ts      # ambient types for the legacy public/js/ParticleNetwork.js script
content/
  data.json                  # { technology: Content[], tools: ... } — static, read at build time
assets/styles/
  reset.scss
  global.scss
  _mixins.scss               # auto-injected into every SCSS block via Vite preprocessorOptions
public/
  js/ParticleNetwork.js       # loaded via app.head.script (defer) — not a Nuxt-managed asset
```

## Games

Each mini-game gets its own subfolder under `app/games/<game-name>/` for non-component engine code (classes, state, draw logic), paired with a component of the same concern under `app/components/games/` and a route under `app/pages/games/<game-name>.vue`. `SpaceDefenderGame.vue` mounts the PixiJS engine at `app/games/space-defender/` via a dynamic `import('@/games/space-defender/game')` in `onMounted`, calling `initGame`/`destroyGame`. `eslint.config.mjs` excludes `app/games/space-defender/**` from lint rules (ported engine code, kept close to its original source) — a new game's engine folder only needs the same exclusion if it's similarly ported rather than written fresh against this repo's conventions. Simpler games (e.g. `PlatformerChaseGame.vue`) can stay fully self-contained in the component instead of taking an `app/games/` subfolder, if they have no engine code worth separating.

## Component auto-import

`nuxt.config.ts` registers `~/components` with `pathPrefix: false`, so components auto-import by **base file name regardless of folder** — `<CardPortfolio>`, `<AnimatedButton>`, `<BgCircuitWebGL>`, `<AppHeader>`. Do not write path-prefixed names. Two components in different folders must not share a base name.

## Composables (`app/composables/`)

- **`useCanvas()`** — canvas element/context setup (ref + 2D context acquisition, resize handling) shared by the Canvas-2D animation components.
- **`useCanvasShapes()`** — draw functions for primitive shapes (rectangle, circle, triangle, star, arrow, heart, bezier/quadratic curves, …) — params typed in `app/types/canvas.ts`.
- **`useCanvasPatterns()`** — draw functions for composite/animated patterns (grid-with-circles, zigzag, checkered, concentric circles, sine wave, pulsating circle, rotating shape, color-cycling shape, …) — params typed in `app/types/canvas.ts`.
- **`useCanvasAnimations()`** — animation-loop helpers (requestAnimationFrame drivers) that drive the shape/pattern draw functions over time.
- **`useWebSocket(url: string)`** — `{ connect, sendMessage, disconnect, messages, isConnected, error }`; opens a native `WebSocket`, auto-disconnects `onUnmounted`. Used only by the `/features/websocket` demo page — not a general data-fetching pattern.

`app/types/canvas.ts` is the single source of truth for every shape/pattern parameter shape (`Rectangle`, `Circle`, `Star`, `SineWave`, `ColorCyclingShape`, etc.) consumed by the `composables/canvas/*` draw functions — check there before adding a new shape type rather than inlining an ad hoc param object.

## Pages & routing

File-based routing under `app/pages/`. `app/pages/features/index.vue` is a directory/index page linking to each individual demo; `sitemap.exclude: ['/features/*']` keeps the demo pages out of the sitemap (they're not meant to rank individually). `app/pages/portfolio/index.vue` reads `content/data.json` for the technology/tools grid.

## GSAP usage

`app/plugins/gsap.client.ts` registers `ScrollTrigger` once, client-side only (guarded by `import.meta.client`, and the `.client.ts` suffix already keeps the whole file out of the server bundle). Access it via `const { $gsap, $ScrollTrigger } = useNuxtApp()` from a component's `<script setup>`. Do not `import { gsap } from 'gsap'` directly in a component that can render during SSR — only inside a component already behind `<ClientOnly>` (see SSR notes below), and even then prefer the injected instance so `ScrollTrigger` is guaranteed registered.

## TresJS / WebGL components

Every component under `components/animations/` that renders a `<TresCanvas>` or reads `three`/`@tresjs/*` (`bg-circuit/`, `wave-cube/`, `ModelThreeD.vue`, `ThreeDCar.vue`, `FlowField3D.vue`, `WaveMesh.vue`, …) must be consumed through `<ClientOnly>` with a lazy import at the call site (`defineAsyncComponent` or Nuxt's auto lazy `<LazyX>` prefix) — these depend on WebGL context and `three` internals that don't exist during SSR/prerender. See `CLAUDE.md`'s 3D/WebGL rule; this file just names which components that rule applies to.

## Design tokens & SCSS

- No CSS-in-JS, no Tailwind. Global resets/tokens live in `assets/styles/reset.scss` and `assets/styles/global.scss` (loaded via `nuxt.config.ts`'s top-level `css` array).
- `_mixins.scss` mixins available in every component `<style lang="scss">` without importing: `media($widthValue, $width: max-width)` (media-query helper), `colorButton($color, $background)`, `move-icons($transition, $transform, $transform2)` (hover transform pair), `rotate` (a preset `move-icons` for icon rotation), `hover-focus` (`&:hover, &:focus-within` content block — use this instead of a bare `:hover` for interactive elements, since it also covers keyboard focus).
- `vite.build.cssCodeSplit: true` and `features.inlineStyles: false` — per-component styles ship as separate chunks rather than inlined; don't rely on style ordering across components.

## SEO / meta

- Global `<head>` (title, meta, OG/Twitter tags, canonical, icons) is set in `nuxt.config.ts`'s `app.head` — see `CLAUDE.md`. Page-level overrides go through `useHead()`/`useSeoMeta()`.
- `@nuxtjs/sitemap`: `autoLastmod: true`, `/features/*` excluded, default `changefreq: monthly` / `priority: 0.8`.
- `@nuxtjs/robots`: allow-all, no AI-bot blocking, no separate `robots.txt` merge.
- `esbuild.options.drop: ['console', 'debugger']` strips `console.*`/`debugger` from production builds — don't rely on `console.log` surviving into the deployed site (fine for dev-only debugging).

## Build/deploy specifics

- `nitro.prerender.routes: ['/', '/sitemap.xml']` + `crawlLinks: true` — the crawler discovers the rest of the static routes by following links from `/`, so a page unreachable by link from `/` (or another crawled page) won't be prerendered. Verify new top-level pages are actually linked somewhere reachable.
- `githubPages` module handles `.output/public` → GitHub Pages publishing (`trailingSlash: false`, `canonicalUrls: true`).
- `experimental.payloadExtraction: false` — no separate `_payload.json` per route.
