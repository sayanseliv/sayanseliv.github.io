# Animation & WebGL Components

Canvas/CSS/TresJS animation demos under `app/components/animations/`; most are self-contained (no props) and used as full-bleed demo pages under `app/pages/features/`.

## animations/

### AnimatedCircles

Fixed full-viewport `<div>` rendering 200 CSS radial-gradient circles; the per-particle position/size/timing/delay is generated entirely in SCSS via a `@for` loop with `math.random()`. No script logic beyond `defineOptions`.

No props/emits/slots.

**Gotcha:** `position: fixed; z-index: -1` over the whole viewport — designed as a background layer, not an in-flow element.

### AnimatedGrid

Interactive `<canvas>` dot/line grid driven by a manual `requestAnimationFrame` loop; dots react to mouse/touch proximity, with buttons to toggle animation and cycle grid size (40/60/80).

No props/emits/slots.

**Gotcha:** the resize listener is removed `onUnmounted`, but the `animate()` rAF loop itself is never cancelled — it keeps running after unmount.

### AnimatedSmokeCanvas

Full WebGL fluid-simulation background (Navier–Stokes-style GLSL: advection, curl, vorticity, pressure/divergence solve) rendered to a raw `<canvas>` — not TresJS. Driven by simulated "virtual pointers," no real user input required.

No props/emits/slots. Plain `<script setup>` (untyped, not `lang="ts"`).

**Gotcha:** cancels its rAF loop `onUnmounted` but never explicitly disposes WebGL textures/programs/framebuffers.

### AnimationBlueMellow

Canvas flow-field particle animation using a hand-rolled Simplex-noise class; particles trail via a low-alpha black overlay redraw each frame (motion-blur effect).

No props/emits/slots. Cleans up rAF and resize listener correctly in `onBeforeUnmount`.

### BgWaveSurface

Thin composition wrapper: `<TresCanvas>` with a perspective camera and a `<WaveMesh>` child.

No props/emits/slots.

**Gotcha:** like other Tres-root components here, requires a WebGL-capable client — callers must wrap it in `<ClientOnly>` (per project convention; not enforced inside the component itself).

### CanvasParticle

Interactive particle system on `<canvas>`: click/pointerdown/keyboard (arrows + Enter/Space) spawn particles that shrink over time and connect via distance-based lines; also draws on-canvas instructional text.

No props/emits/slots.

**Gotcha:** canvas carries `role="button"`, `tabindex="0"`, and a `keydown` handler specifically to satisfy the repo's `vuejs-accessibility/click-events-have-key-events` rule.

### EmojiSwitchingInterface

Self-contained "emoji morph" demo: grid of emoji buttons plus a large morph-area that transitions through a hardcoded `shapes` array (CSS transform/gradient); "Auto Mode" toggle runs a `setInterval` cycling through shapes.

No props/emits/slots.

**Gotcha:** the `setInterval` is cleared `onUnmounted`, but clicking a shape button while `autoMode` is active is a silent no-op (`morphTo` early-returns).

### FlowField3D

TresJS scene: orthographic camera + a single `TresLineSegments` mesh whose buffer geometry (5000 particles' worth of segments) is mutated every frame by a hand-rolled Simplex-noise flow field, driven by a plain `requestAnimationFrame` loop (not `useLoop`).

No props/emits/slots.

**Gotcha:** uses a `ResizeObserver` on the container and a one-time `watch(linesGeometry, ..., { once: true })` to defer starting `animate()` until the Tres geometry ref resolves.

### GeometricFigures

Canvas demo with a mode switcher (`basic | complex | patterns | animated`); actual drawing is delegated to the `useCanvas` / `useCanvasShapes` / `useCanvasPatterns` / `useCanvasAnimations` composables.

No props/emits/slots.

**Gotcha:** only the `animated` mode runs a continuous rAF loop; `setMode()` and `onUnmounted` both call `stopAnimation()` to cancel it.

### ModelThreeD

Loads a GLTF/GLB model via `@tresjs/cientos`'s `useGLTF` (Draco on by default) and auto-rotates it each frame via `useLoop`'s `onBeforeRender`.

| Prop | Type | Default |
| --- | --- | --- |
| `modelPath` | `string` | required |
| `draco` | `boolean` | `true` |

Emits: none. Exposes `startRotation()` / `stopRotation()` via `defineExpose` for parent template-ref control.

**Gotcha:** does a top-level `await useGLTF(...)`, making this an async component — must be used inside `<Suspense>` (see `ThreeDCar.vue`).

### ParticleCanvas

Wraps the global `window.ParticleNetwork` library (loaded externally, not imported) into a plain `<div id="particle-canvas">` with hardcoded options (slow speed, high density, non-interactive).

No props/emits/slots.

**Gotcha:** guards with `typeof window !== 'undefined'` for SSR safety but silently no-ops if `ParticleNetwork` isn't loaded on `window`; not wrapped in `<ClientOnly>` itself.

### PureCssMorphing

Purely decorative shape-morph + floating-particle animation done entirely in CSS `@keyframes`. No script logic besides `defineOptions`.

No props/emits/slots.

### ThreeDCar

Full TresJS scene: perspective camera, ambient + directional lights, `OrbitControls`, a floor mesh, and a `<Suspense>`-wrapped `<ModelThreeD>` loading `/models/retro-futuristic-car.glb`. Shows a loading overlay driven by `useProgress()` and Start/Stop buttons that call the child's exposed rotation methods.

No props/emits/slots.

**Gotcha:** `start`/`stop` guard on `isModelReady` (set by the `<Suspense>`'s `@resolve`) before calling `modelRef.value.startRotation()` — calling before resolve is a silent no-op.

### WaveMesh

Renders a `THREE.Points` field (120×60 grid) with a custom `ShaderMaterial`: vertex shader computes a multi-sine wave-height `z` per vertex, fragment shader colors by height; animated via `useLoop`'s `delta`.

No props/emits/slots.

**Gotcha:** geometry/material/uniforms are created once at module-eval time, not inside `onMounted` — the only SSR guard is a `typeof window` check for `pixelRatio`; relies on being used only within a `<ClientOnly>`-wrapped Tres ancestor.

## animations/bg-circuit/

### BgCircuitWebGL

Root circuit background: measures its wrapper via a debounced (100ms) `ResizeObserver` and renders a `<TresCanvas>` (orthographic camera) containing `<CircuitScene>` plus a `<Suspense>`-wrapped `<CircuitBloom>` post-processing pass. Wrapper gets a unique per-instance class via `useId()`.

| Prop | Type | Default |
| --- | --- | --- |
| `lines` | `number` | `25` |
| `colors` | `string[]` | `['#48abed','#fa2a6f','#2684ff']` |
| `duration` | `number` | `10` |
| `minSegments` | `number` | `4` |
| `maxSegments` | `number` | `12` |

Emits/slots: none.

**Gotcha:** `<TresCanvas>` only mounts once `isMounted && width > 0 && height > 0` — avoids initializing WebGL against a zero-size canvas before the first `ResizeObserver` callback.

### CircuitBloom

No template — a composable-style component that builds a Three.js `EffectComposer` (`RenderPass` + `UnrealBloomPass`) from `useTresContext()` and renders it every frame via `useLoop`'s `onBeforeRender`, replacing Tres's default render.

No props/emits/slots.

**Gotcha:** must be mounted under a `<TresCanvas>` (uses `useTresContext`) with `disable-render` set on the parent canvas (see `BgCircuitWebGL`), since it takes over rendering itself; disposes the composer `onUnmounted`.

### CircuitScene

Generates N randomized vertical/horizontal circuit-trace paths (one `TresLine` per line) plus glowing node markers (`TresInstancedMesh`) and small pulsing "signal" dots that travel along each path's segments over `duration` seconds via `useLoop`.

| Prop | Type | Default |
| --- | --- | --- |
| `width` | `number` | required |
| `height` | `number` | required |
| `lines` | `number` | `20` |
| `colors` | `string[]` | `['#48abed']` |
| `duration` | `number` | `8` |
| `minSegments` | `number` | `3` |
| `maxSegments` | `number` | `5` |

Emits/slots: none.

**Gotcha:** regenerates every circuit path (`watch` on `[width, height]`, `immediate: true`) on any dimension change — rebuilds all line geometry and instanced-node matrices, so frequent resize events are expensive.

## animations/wave-cube/

### BgWaveCube

Composition wrapper: `<TresCanvas>` (alpha, high-performance, sRGB output color space) with a perspective camera and a `<WaveScene>` child.

No props/emits/slots.

### WaveScene

Renders an 8×8×8 grid of small spheres (`TresMesh`), each perturbed every frame (`useLoop`'s `onBeforeRender`) by a 3D sine-wave displacement based on the mesh's own `userData.basePosition`.

No props/emits/slots.

**Gotcha:** reads/writes `mesh.userData.basePosition` directly instead of tracking positions in a separate reactive array — couples animation state to Three.js object internals.
