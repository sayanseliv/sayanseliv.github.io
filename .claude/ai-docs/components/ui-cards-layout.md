# UI, Card & Layout Components

Reusable primitives and content cards under `app/components/{cards,layout,ui}/`.

## cards/

### CardFeature

`NuxtLink` styled as a card (title, description, tag list) — used for feature/demo listing links.

| Prop | Type | Default |
| --- | --- | --- |
| `title` | `string` | required |
| `description` | `string` | required |
| `tags` | `readonly string[]` | required |
| `link` | `string` | required |

Emits/slots: none.

**Gotcha:** builds an `aria-label` from `title` + `description` on the link itself; the shimmer `::before` animation is disabled under `prefers-reduced-motion`.

### CardPortfolio

Portfolio project card: logo image, title, description, tech-stack line, and an external "Visit Project" `NuxtLink`.

Props: single `content` object (locally typed `{id, title, description, logo, technology, link}` — a local interface, distinct from the shared `Content` type in `~/types`).

Emits/slots: none.

**Gotcha:** `content` is destructured once at setup (`const { content } = props`) — loses reactivity if the parent ever replaces the object after mount.

### CardTechnology

Technology showcase card with a mouse-tracked conic-gradient glow border (cursor angle relative to card center written to CSS var `--start`) and a category badge.

Props: `content: Content` (shared type from `~/types`: `{id, title, description, link, category}`).

Emits/slots: none.

**Gotcha:** the category badge color comes from a fixed SCSS modifier list keyed off a slugified `category` string (`--frontend-frameworks`, `--mobile-development`, etc. — matches `content/data.json` categories); a new category needs a matching SCSS class or renders unstyled.

### CardTools

Renders one tools category (icon, name, count) and its list of external tool links.

Props: `categoryData: CategoryData` (`{name, tools: Tool[], count}` from `~/types`).

Emits/slots: none.

**Gotcha:** maps `categoryData.name` to a `lucide-vue-next` icon via a hardcoded string-keyed map; unmatched names fall back to `DevelopmentIcon` (`Code`) rather than erroring — reads its data from `content/data.json` at build time via the parent page.

## layout/

### AppHeader

Site header/nav: hamburger menu (mobile breakpoint), nav links (Home/Portfolio/Features), mailto contact link. Highlights the Features link via `route.path.startsWith('/features')`.

No props/emits/slots.

**Gotcha:** closes the mobile menu automatically on route change (`watch(() => route.path)`) and on Escape (`document` keydown listener added/removed in `onMounted`/`onUnmounted`).

### AppModal

Generic modal built on native `<dialog>`, teleported to `<body>`, wrapped in `<ClientOnly>`, with a `<transition>` for enter/leave.

| Prop | Type | Default |
| --- | --- | --- |
| `modelValue` | `boolean` | required |
| `animation` | `string?` | `'slide'` |
| `animationSlideDirection` | `string?` | `'right'` |

Emits: `update:modelValue(boolean)` (v-model). Slot: default, scoped with `{ onClose }`.

**Gotcha:** locks body scroll by toggling a `scroll-lock` class in a `watch` on `modelValue` — that class must exist in global CSS; never renders during SSR by design (`<ClientOnly>`, since it needs `document`/`<dialog>`).

## ui/

### AnimatedBlock

Wraps slot content in a `<div>` and animates it in with GSAP (`$gsap.from`) gated by a ScrollTrigger (`start: 'top 100%'`, plays once).

| Prop | Type | Default |
| --- | --- | --- |
| `wrapperClass` | `string?` | `''` |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| `delay` | `number?` | `0` |
| `duration` | `number?` | `0.8` |

Slot: default. Emits: none.

**Gotcha:** pulls `$gsap` from `useNuxtApp()`, so it depends on `app/plugins/gsap.client.ts` being registered; the ScrollTrigger is never explicitly killed `onUnmounted` (relies on `once: true`).

### CircleProgress

SVG circular progress ring; fill animates via `stroke-dashoffset` incremented in a `setInterval` (not rAF/GSAP), and only starts once the element enters the viewport (`IntersectionObserver`, threshold 0.1).

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `number?` | `180` |
| `borderWidth` | `number?` | `15` |
| `percent` | `number?` | `50` |
| `showPercent` | `boolean?` | `false` |
| `fillColor` | `string?` | `'#288feb'` |

(also: `borderBgWidth`, `contentColor`, `emptyColor`, `linecap`, `transition`, `class`.)

Slot: `content` (scoped, `{ percent }`) overrides the default percent text. Emits: none.

**Gotcha:** adapted from `w2xi/vue3-circular-progress` (credited in-code); `onMounted` uses `document.querySelector('.circle-progress')` instead of its own template ref — with multiple instances on one page, each instance's observer attaches to the *first* `.circle-progress` element in the DOM, not necessarily its own.

### ProgressBar

Linear progress bar that animates from 0 to `targetProgress` on mount via a recursive `setTimeout` (not a CSS transition).

| Prop | Type | Default |
| --- | --- | --- |
| `targetProgress` | `number` | required |
| `label` | `string \| null?` | — |

Emits/slots: none.

**Gotcha:** the fill-in animation runs once on mount only — there's no `watch` on `targetProgress`, so updating the prop later does not restart or update the bar.

### TagCloud

Single tech tag rendered as an external `NuxtLink`, with a subtle mouse-tracked tilt/translate effect (disabled below 768px viewport width).

Props: `content: Content` (shared type; only `title`/`link` are used).

Emits/slots: none.

**Gotcha:** `content` is destructured at setup like `CardPortfolio` (non-reactive if the prop object is ever replaced); checks `window.innerWidth` on every `mousemove` rather than caching it.

## ui/buttons/

### AnimatedButton

Hover-swap text button: a CSS `::after` (populated via `data-text`) slides the label vertically on hover.

Props: `text: string` (required).

Emits/slots: none.

**Gotcha:** uses the Options-style `defineProps({...})` form instead of the `defineProps<T>()` generic form used elsewhere in the codebase — no TS type-checking on `text`.

### AnimatedMatrix

"Matrix code rain" hover button — a gradient rain overlay animates in on hover.

| Prop | Type | Default |
| --- | --- | --- |
| `text` | `string` | required |
| `variant` | `string` | required |

Emits/slots: none.

**Gotcha:** `variant` is typed as a raw `string`, not a `'blue' \| 'red'` union — an unrecognized value silently produces no `.matrix--*` modifier (no visual variant applied, no error).

### AnimatedWaveButton

Per-letter wave hover effect — splits `text` into `<span>`s, each with a `--i` CSS custom property driving a staggered transition delay.

Props: `text: string` (required).

Emits/slots: none.

### AnimatedWaveClipButton

Same per-letter wave concept as `AnimatedWaveButton`, styled with utility classes and a `clip-path` polygon "ticket" shape instead of scoped SCSS.

Props: `text: string` (required).

Emits/slots: none.

**Gotcha:** uses Tailwind-style inline utility classes (`[clip-path:polygon(...)]`, `delay-[calc(var(--i)*30ms)]`) — inconsistent with the rest of the codebase's SCSS-first convention (project has no Tailwind/UnoCSS listed in the stack); confirm a utility-class engine is actually configured before reusing this pattern.

### MaskButton

Sprite-sheet mask-animation button (three visual variants) using CSS `mask`/`-webkit-mask` with `steps()` animations.

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `string` | `'mask1'` |
| `label` | `string` | `'BUTTON'` |
| `color` | `string` | `'#000'` |
| `textColor` | `string` | `'#fff'` |

Emits/slots: none. Local `hover` ref (mouseenter/mouseleave) toggles animation direction.

**Gotcha:** the three mask variants point at hardcoded external sprite image URLs on `raw.githubusercontent.com` — a live third-party runtime dependency, not a bundled asset; breaks if those files move or the repo is deleted.
