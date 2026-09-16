# Game Components

Full playable mini-games under `app/components/games/`, one component per game. Routed via `app/pages/games/<game-name>.vue`, listed on `app/pages/games/index.vue`. See [`architecture.md`](../architecture.md)'s "Games" section for how engine code (when a game has any) is split into `app/games/<game-name>/`.

## games/

### SpaceDefenderGame

Thin mount/unmount wrapper around the PixiJS engine at `app/games/space-defender/` (not a Nuxt-scanned directory — plain TS module tree: `classes/`, `common/`, `sprites/`, `game.ts`, `types.ts`). `onMounted` dynamically imports `@/games/space-defender/game` and calls `initGame(mountPoint)`; `onUnmounted` calls the returned `destroyGame`. Renders into a plain `<div ref="mountPoint">` — PixiJS owns the canvas inside it, not Vue.

No props/emits/slots.

**Gotcha:** the engine module (`app/games/space-defender/**`) is excluded from ESLint (`eslint.config.mjs`) as ported code kept close to its original source — don't expect it to follow this repo's naming/magic-number conventions.

### PlatformerChaseGame

Self-contained DOM-based (not canvas) chase/collectible mini-game: player/enemy `<div>`s positioned via reactive `positions`, randomly generated walls/coins, right-click context menu (pause/restart/teleport), WASD/arrow movement, win/lose screens. No separate `app/games/` engine folder — all state and logic live in the component.

No props/emits/slots.

**Gotcha:** adds `keydown`/`keyup`/`contextmenu` listeners directly on `document`/`document.body` in `onMounted` with no corresponding removal `onUnmounted` — listener leak on remount.
