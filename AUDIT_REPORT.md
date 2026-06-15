# Audit Report — React + Vite Personal Portfolio

_Auditor: Senior Frontend Engineer_
_Date: 2026-06-04_
_Scope: Entire repository (first commit baseline)_

---

## 1. Executive Summary

**Overall health: 4.5 / 10**

This is an attractive, well-structured visual portfolio that is _not_ production-ready. The design system, animation work, and component organization are solid for a personal project — but the site fails on the basics that matter most for a portfolio: it is invisible to search engines and social previews, ships ~3 MB of unoptimized images, references fonts that never load, has zero error resilience, and contains placeholder content (`pedro@example.com`, `#` links everywhere) that would embarrass on first share.

The codebase is small enough (~12 JSX files, ~226 KB JS bundle / 70 KB gzipped) that everything below is tractable. The Quick Wins list alone would raise this to a ~7/10 in a single afternoon.

### Top 3 things to fix first

1. **SEO & social metadata in [index.html](index.html#L1-L13).** Portfolio's job is to be shared and indexed; the current head section delivers neither. Title is `dev-personal-portfolio`, no description, no Open Graph, no Twitter card, no real favicon. This is the highest ROI 30 minutes of work in the repo.
2. **Image weight (`public/projects/`).** [`project2.png` is 1.6 MB and `project4.png` is 784 KB](public/projects/). Total image payload ≈ **3.2 MB**, dwarfing the 70 KB JS gzip. Convert to WebP/AVIF and add `loading="lazy"` + `width`/`height` on `<img>` to fix layout shift and TTFI.
3. **Fonts referenced but never loaded.** [src/index.css:38](src/index.css#L38) declares `font-family: "Inter"` and [:42](src/index.css#L42) `"Playfair Display"`, but neither has an `@font-face` block and `index.html` has no `<link>` to Google Fonts. The page silently falls back to the OS sans-serif — the designed look you see in dev only happens if Inter is installed locally.

---

## 2. Scorecard

| # | Dimension | Score | Single biggest issue |
|---|---|---|---|
| 1 | Architecture & structure | 8 / 10 | Sections directly composed in `App.jsx`; no routing layer, but acceptable for a one-page site |
| 2 | Code quality | 6 / 10 | `Math.random()` in render ([Hero.jsx:48-61](src/sections/Hero.jsx#L48-L61)); placeholder content; missing keys |
| 3 | Performance | 3 / 10 | ~3.2 MB raw image payload; no lazy-loading; no code splitting |
| 4 | Accessibility | 5 / 10 | No `prefers-reduced-motion`; missing focus management on mobile menu; decorative SVG without `aria-hidden` |
| 5 | SEO | 1 / 10 | Boilerplate title, zero meta tags, no OG/Twitter, no sitemap/robots |
| 6 | Responsive design | 7 / 10 | Good Tailwind breakpoint usage; `App.jsx` hides overflow rather than fixing the cause |
| 7 | Type safety | 2 / 10 | Plain JSX, no PropTypes, no TypeScript |
| 8 | Security | 5 / 10 | 6 `npm audit` vulns (3 high) in dev deps; EmailJS keys public-by-design; no spam protection on contact form |
| 9 | Error handling | 2 / 10 | No error boundary anywhere; a render throw in any section unmounts the whole site |
| 10 | Vite configuration | 6 / 10 | Minimal but functional; no manual chunk splitting, no env validation, no build target tuning |
| 11 | Testing | 0 / 10 | No tests, no test framework installed |
| 12 | Tooling & DX | 4 / 10 | Lint runs but is weak; no Prettier, no CI, no `format`/`test`/`typecheck` scripts |
| 13 | Documentation | 1 / 10 | README is the unmodified Vite template |

---

## 3. Detailed Findings

> Severity legend: **Critical** = breaks user-visible behavior or exposes risk; **High** = ships but materially degrades quality; **Medium** = clear issue, not blocking; **Low** = polish.

### 3.1 Architecture & structure

**Finding A1 — Section composition is fine; routing absent by design.** _Low_

[src/App.jsx:10-25](src/App.jsx#L10-L25) composes the sections directly inside `<main>`. For a single-page portfolio that's the right call — no need to add React Router for hash-based navigation that the browser handles natively. Score reflects this is a deliberate, simple choice that works.

**Finding A2 — Co-located static data inside components.** _Low_

`projects` ([Projects.jsx:3-40](src/sections/Projects.jsx#L3-L40)), `experiences` ([Experience.jsx:1-38](src/sections/Experience.jsx#L1-L38)), `testimonials` ([Testimonials.jsx:4-37](src/sections/Testimonials.jsx#L4-L37)), and `skills` ([Hero.jsx:12-31](src/sections/Hero.jsx#L12-L31)) are hard-coded inside their components. Acceptable for a personal portfolio, but moving them to `src/data/*.js` would let you swap content without re-reading layout code and make a future CMS/MDX migration trivial.

### 3.2 Code quality

**Finding Q1 — `Math.random()` in render loop.** _High_

[Hero.jsx:48-61](src/sections/Hero.jsx#L48-L61) generates 30 floating dots with `Math.random()` for `left`, `top`, animation duration, and delay. These re-roll on every render of `<Hero>`, so any parent re-render (e.g. a future state change) reshuffles the dot field. It's also a hydration footgun if SSR is ever added.

```jsx
// Today (bug): positions change on every render
{[...Array(30)].map((_, i) => (
  <div style={{ left: `${Math.random() * 100}%`, ... }} />
))}

// Fix: compute once
const DOTS = useMemo(
  () => Array.from({ length: 30 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
  })),
  []
);
```

**Finding Q2 — Array-index keys throughout.** _Low_

Every `.map()` in the project uses `key={idx}`: [Hero.jsx:113-120](src/sections/Hero.jsx#L113-L120), [Projects.jsx:69-72](src/sections/Projects.jsx#L69-L72), [Experience.jsx:84-88](src/sections/Experience.jsx#L84-L88), [Testimonials.jsx:129-138](src/sections/Testimonials.jsx#L129-L138), [Navbar.jsx:43-51](src/layout/Navbar.jsx#L43-L51). All these lists are static and never re-ordered, so this is acceptable, but using stable IDs (e.g. `key={project.title}`) makes the intent clear and is reorder-safe.

**Finding Q3 — Placeholder content shipped throughout.** _Medium_

`pedro@example.com` and `+1 (555) 123-4567` ([Contact.jsx:17,23](src/sections/Contact.jsx#L17-L23)); social `href: "#"` ([Hero.jsx:109-111](src/sections/Hero.jsx#L109-L111), [Footer.jsx:3-7](src/layout/Footer.jsx#L3-L7), [Projects.jsx:11,12,19,20,28,29,37,38](src/sections/Projects.jsx#L11)); placeholder Unsplash avatars on testimonials ([Testimonials.jsx:10-11](src/sections/Testimonials.jsx#L10-L11) etc.). These are content tasks, but the `#` anchors also break keyboard nav (focus jumps to top of page) and cause router-less routing weirdness.

**Finding Q4 — Unused import.** _Low_

[AnimatedBorderButton.jsx:1](src/components/AnimatedBorderButton.jsx#L1) imports `Download` from `lucide-react` but never uses it. ESLint's `no-unused-vars` rule should catch this — verify if `lint` currently fails, otherwise the rule's `varsIgnorePattern: '^[A-Z_]'` ([eslint.config.js:22](eslint.config.js#L22)) is silencing PascalCase imports, which is wrong.

**Finding Q5 — Missing explicit button type.** _Low_

[Button.jsx:17](src/components/Button.jsx#L17) and [AnimatedBorderButton.jsx:5](src/components/AnimatedBorderButton.jsx#L5) render `<button>` with no `type` attribute. Inside a `<form>` this defaults to `type="submit"`. The contact form's submit button is the intended submit — but the `AnimatedBorderButton` "Download CV" inside the Hero, if ever wrapped in a form, would silently submit. Add `type="button"` as the default in both components and accept a `type` prop override.

**Finding Q6 — `App.jsx` hides horizontal overflow at the root.** _Medium_

[App.jsx:12](src/App.jsx#L12) sets `overflow-x-hidden` on the outermost wrapper. This is masking layout bugs (likely from `absolute` decorative elements in `Hero`, `Projects`, etc.) rather than fixing them. Track down the offending element(s) and constrain their positioning so the global clip isn't necessary; it disables horizontal scroll restoration and confuses scroll-snap if you ever add it.

### 3.3 Performance

**Finding P1 — Image payload is ~3.2 MB of unoptimized PNG/JPG.** _Critical_

```
public/projects/project1.png  ─ 401 KB
public/projects/project2.png  ─ 1.65 MB   ← worst offender
public/projects/project3.png  ─ 244 KB
public/projects/project4.png  ─ 785 KB
public/hero-bg.jpg            ─ 95 KB
public/profile-photo.jpg      ─ 20 KB
```

The JS bundle is 226 KB raw / 70 KB gzipped — image payload is ~14× larger than the entire app code. Fixes, in order:
- Convert PNGs to WebP (typically 60-80% smaller) and AVIF for newer browsers; serve via `<picture>`.
- Add explicit `width` and `height` to every `<img>` (e.g. [Projects.jsx:77-81](src/sections/Projects.jsx#L77-L81), [Hero.jsx:134-138](src/sections/Hero.jsx#L134-L138), [Testimonials.jsx:103-107](src/sections/Testimonials.jsx#L103-L107)) to prevent layout shift.
- Add `loading="lazy"` to project images and testimonial avatars (everything below the fold).
- Consider [`vite-imagetools`](https://github.com/JonasKruckenberg/imagetools) to generate responsive `srcset` at build time.

**Finding P2 — No code splitting.** _Medium_

The build emits a single `dist/assets/index-*.js` of 226 KB. 70 KB gzipped is fine for a portfolio, but `lucide-react` is fully tree-shakeable per-icon — verify only the icons used are in the bundle by running `vite build --mode=analyze` with [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer). Lazy-loading `Testimonials` and `Contact` (below fold) via `React.lazy` + `Suspense` would shrink the critical path further.

**Finding P3 — Scroll listener fires unthrottled.** _Low_

[Navbar.jsx:16-24](src/layout/Navbar.jsx#L16-L24) attaches a `scroll` listener that calls `setIsScrolled` on every event. Modern browsers coalesce these, and the React state setter no-ops when the value is unchanged, so the actual cost is tiny — but the listener should still be `{ passive: true }` to avoid blocking the main thread on Safari iOS:

```js
window.addEventListener("scroll", handleScroll, { passive: true });
```

**Finding P4 — Dot field re-renders.** _Medium_

See Finding Q1 — the same issue is also a perf bug because each re-render reconstructs 30 DOM nodes' style objects.

### 3.4 Accessibility (a11y)

**Finding A11Y1 — No `prefers-reduced-motion` honoured.** _High_

[src/index.css:78-184](src/index.css#L78-L184) defines half a dozen always-on animations (`fade-in`, `slow-drift`, `float`, `marquee`, `pulse`, `ping`, `animated-border`). Users with `prefers-reduced-motion: reduce` get none of the relief WCAG 2.1 SC 2.3.3 expects. Add at the end of `@layer utilities`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Finding A11Y2 — Mobile menu has no focus management.** _Medium_

[Navbar.jsx:61-89](src/layout/Navbar.jsx#L61-L89) toggles the mobile menu by changing state, but: (a) the toggle button has no `aria-expanded` or `aria-controls`; (b) opening the menu doesn't move focus into it; (c) pressing `Escape` doesn't close it; (d) the menu panel has no role or `aria-label`. Minimum fix:

```jsx
<button
  aria-expanded={isMobileMenuOpen}
  aria-controls="mobile-menu"
  aria-label="Toggle menu"
  className="md:hidden p-2 ..."
>
```

**Finding A11Y3 — Decorative SVG isn't hidden from AT.** _Low_

[AnimatedBorderButton.jsx:14-32](src/components/AnimatedBorderButton.jsx#L14-L32) renders a decorative animated border SVG. It should have `aria-hidden="true"` and `focusable="false"` so screen readers don't announce it.

**Finding A11Y4 — Icons inside buttons/links lack accessible names.** _Medium_

The pager arrows in [Testimonials.jsx:121-126,141-146](src/sections/Testimonials.jsx#L121-L146) render only a `<ChevronLeft />` / `<ChevronRight />` icon — no text, no `aria-label`. Same pattern for the project overlay links in [Projects.jsx:89-100](src/sections/Projects.jsx#L89-L100). Add `aria-label="Previous testimonial"` / `aria-label="Open project"` etc.

**Finding A11Y5 — Testimonial dot buttons miss accessible names + key.** _Medium_

[Testimonials.jsx:129-138](src/sections/Testimonials.jsx#L129-L138) renders dots with no `key`, no `aria-label`, and no `aria-current`. They look identical visually but a screen reader user has no idea which page they're on. (The missing `key` is also a React warning.)

**Finding A11Y6 — Email input had wrong attribute placement.** _Medium_ ✅ _already fixed in previous turn_

The `<label>` carried `type="email"` (a no-op on label) and the `<input>` was missing both `id="email"` and `type="email"` — this was fixed in the immediately prior commit-pending edits to [Contact.jsx](src/sections/Contact.jsx). Re-mentioning only because the report should match the current file state.

### 3.5 SEO

**Finding S1 — `index.html` head is empty for SEO purposes.** _Critical_

[index.html:1-13](index.html#L1-L13) ships:

```html
<title>dev-personal-portfolio</title>
```

…and nothing else for crawlers. For a portfolio the entire purpose is being found and shared. Minimum acceptable head:

```html
<title>Pedro Machado — Frontend Engineer (React / Next.js / TypeScript)</title>
<meta name="description" content="Portfolio of Pedro Machado, a frontend engineer specializing in React, Next.js, and TypeScript. Recent work includes [...]." />
<meta name="theme-color" content="#0f1418" />
<link rel="canonical" href="https://yourdomain.com/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Pedro Machado — Frontend Engineer" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://yourdomain.com/og-image.png" />
<meta property="og:url" content="https://yourdomain.com/" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Pedro Machado — Frontend Engineer" />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://yourdomain.com/og-image.png" />

<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

Generate a 1200×630 `og-image.png` to live in `public/`.

**Finding S2 — Favicon is the default Vite SVG.** _High_

[index.html:5](index.html#L5) points at `/vite.svg` ([public/vite.svg](public/vite.svg) — 1.5 KB, generic). Replace with a personal mark; this is the icon every recruiter sees in their tab bar.

**Finding S3 — No `robots.txt` or `sitemap.xml`.** _Medium_

`public/` has no `robots.txt`. For a one-page portfolio a 4-line robots + 8-line sitemap is enough; it explicitly tells Google what to index.

**Finding S4 — No structured data (JSON-LD).** _Low_

A `<script type="application/ld+json">` with `@type: "Person"` (name, job title, social links, sameAs) is a 30-second add that makes Google's knowledge panel correct.

### 3.6 Responsive design

**Finding R1 — Breakpoint usage is consistent.** _Positive note_

Sections use `md:` and `lg:` Tailwind prefixes correctly throughout. The `grid lg:grid-cols-2` pattern in `Hero`, `About`, and `Contact` flows from stacked-mobile to two-column desktop cleanly.

**Finding R2 — `Hero` background image lacks responsive sizing.** _Low_

[Hero.jsx:39](src/sections/Hero.jsx#L39) renders `/hero-bg.jpg` at full size for every viewport. Generate a smaller `hero-bg-mobile.jpg` and serve via `<picture>` `<source media="(max-width: 768px)">`. With image weight already the worst perf offender (P1), this matters.

**Finding R3 — The "5+ Years Exp." badge can overflow on very small screens.** _Low_

[Hero.jsx:150-155](src/sections/Hero.jsx#L150-L155) absolutely-positions a badge with `-top-4 -left-4` on an image that scales fluidly. On viewports < 320px the badge can land outside the rounded container. Not a real-world bug, but worth confirming in the iPhone SE viewport.

### 3.7 Type safety

**Finding T1 — Plain JSX, no PropTypes, no TypeScript.** _Medium_

[package.json:23](package.json#L23) includes `@types/react` (used by editor tooling) but no `.ts/.tsx` files exist. Both [Button.jsx](src/components/Button.jsx) and [AnimatedBorderButton.jsx](src/components/AnimatedBorderButton.jsx) take a `size` / `children` prop with no runtime or compile-time checking; passing `size="xl"` to `<Button>` silently produces `undefined` Tailwind classes (see Q-snippet below):

```jsx
// Button.jsx today
const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
// when size="xl" → sizeClasses["xl"] === undefined → "... undefined ..."
```

Recommendation: add Vitest + `@vitest/coverage-v8` (per Testing section) and migrate to TS in the same pass — the codebase is small enough to convert in an afternoon.

### 3.8 Security

**Finding SE1 — 6 npm audit vulnerabilities (3 high, 3 moderate).** _High (build-time)_

```
flatted           ≤3.4.1     HIGH   (DoS, prototype pollution)
minimatch         ≤3.1.3     HIGH   (3× ReDoS advisories)
picomatch         4.0.0–4.0.3 HIGH  (method injection, ReDoS)
ajv               <6.14.0    MOD    (ReDoS via $data)
brace-expansion   <1.1.13    MOD    (hang/memory exhaustion)
postcss           <8.5.10    MOD    (XSS via unescaped </style>)
```

All transitive build-tool dependencies — none ship to the browser bundle, so end-user risk is zero. They still matter because (a) CI runs them, (b) `postcss` processes your CSS at build time. Run `npm audit fix` and re-test the build; if any require breaking updates, evaluate per case.

**Finding SE2 — EmailJS credentials are public-key by design.** _Low_

[Contact.jsx:52-54](src/sections/Contact.jsx#L52-L54) reads `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` from env. Vite inlines `VITE_*` vars into the browser bundle — this is expected and correct for the EmailJS public key. **However:** without configuring an [allowlist of origins in the EmailJS dashboard](https://www.emailjs.com/docs/user-guide/adding-allow-list/), anyone who reads the bundle can spam your inbox via your template. Add your production domain to the allowlist before publishing.

**Finding SE3 — No `.env.example`.** _Medium_

[package.json](package.json) requires the three `VITE_EMAILJS_*` vars to send mail, but cloning the repo gives you no template — the next person to clone it gets a generic "EmailJS configuration is missing" error ([Contact.jsx:56-60](src/sections/Contact.jsx#L56-L60)). Add:

```
# .env.example
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Finding SE4 — Contact form has no spam protection.** _Medium_

[Contact.jsx:46-88](src/sections/Contact.jsx#L46-L88) does no email-format validation (now mitigated client-side by the recently-added `type="email"`), no length cap, no honeypot, no rate-limiting hook, no captcha. A scraper will find this form within a week. At minimum add:
- A hidden honeypot input (`<input name="website" tabIndex={-1} aria-hidden style={{position:'absolute',left:'-9999px'}} />`) and bail out in `handleSubmit` if it has a value.
- `maxLength` on name/message inputs (e.g. 80 / 5000).
- Cloudflare Turnstile or hCaptcha if traffic warrants.

**Finding SE5 — No `dangerouslySetInnerHTML` or XSS sinks.** _Positive note_

Verified across the codebase: every interpolation is via JSX text nodes, so the React framework's auto-escaping protects against XSS. Good.

### 3.9 Error handling

**Finding E1 — No error boundary.** _High_

No `componentDidCatch` / error-boundary component exists anywhere — `App.jsx` mounts every section directly. Any render-time exception (e.g. a malformed image URL, a future `fetch`) unmounts the entire portfolio and shows a white screen. Add an `<ErrorBoundary>` around `<main>`:

```jsx
// src/components/ErrorBoundary.jsx
import { Component } from "react";
export class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.error) {
      return <div className="p-8 text-center">Something went wrong. Please refresh.</div>;
    }
    return this.props.children;
  }
}
```

**Finding E2 — Contact form `catch` block bug.** _Critical_ ✅ _already fixed in previous turn_

[Contact.jsx:78-85](src/sections/Contact.jsx#L78-L85) — the catch parameter was bound as `err` but the body referenced `error`, producing a `ReferenceError` that swallowed the original failure. Fixed in the prior turn (`error` → `err`). Including here for the historical record because it was a real, latent crash.

**Finding E3 — No loading / empty states for images.** _Low_

If `/profile-photo.jpg`, `/hero-bg.jpg`, or testimonial Unsplash URLs fail, you get a broken-image icon. Consider an `onError` handler that substitutes a generic placeholder.

### 3.10 Vite configuration

**Finding V1 — `vite.config.js` is minimal.** _Low_

[vite.config.js:1-15](vite.config.js#L1-L15) sets up React + Tailwind + the `@` → `./src` alias. That's all that's required for current scope, and nothing here is wrong. As the project grows, consider:

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    target: "es2020",          // smaller bundle, drops legacy transforms
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
```

**Finding V2 — `rolldown-vite` is an alpha/preview.** _Medium_

[package.json:29,32](package.json#L29) overrides `vite` to `npm:rolldown-vite@7.2.5`. Rolldown is genuinely faster but is still pre-1.0 and may have rough edges with some plugins. Fine for a personal project; for a client project I'd pin to mainline `vite`.

### 3.11 Testing

**Finding TS1 — Zero tests, no test framework.** _High_

No `*.test.*`, no `vitest.config.*`, no `jest.config.*`. Even three tests would cover most of the existing risk:

1. `Contact` form renders, validates required fields, calls `emailjs.send` with the form values, shows success state.
2. `Navbar` toggles the mobile menu and closes it on link click.
3. `Testimonials` cycles through next/previous and updates the active dot.

Recommended stack: **Vitest + @testing-library/react + @testing-library/user-event + jsdom**. Add scripts:

```json
"test": "vitest",
"test:run": "vitest run",
"test:coverage": "vitest run --coverage"
```

### 3.12 Tooling & DX

**Finding TD1 — ESLint config is too permissive.** _Medium_

[eslint.config.js:21-23](eslint.config.js#L21-L23) only enables `js.configs.recommended` + react-hooks + react-refresh + a custom `no-unused-vars` pattern. Missing rules:

- [`eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) — would have flagged Findings A11Y2/A11Y3/A11Y4 automatically.
- `eslint-plugin-react` (core rules: `react/jsx-key`, `react/no-array-index-key`, etc.) — would have flagged Q2/A11Y5.
- The `varsIgnorePattern: '^[A-Z_]'` ([:22](eslint.config.js#L22)) silences unused PascalCase imports — that's why the dead `Download` import in `AnimatedBorderButton.jsx` doesn't trigger a lint error.

**Finding TD2 — No Prettier.** _Low_

No `.prettierrc*` in repo; formatting drift will appear within a month of any collaborator joining. Add:

```bash
npm i -D prettier eslint-config-prettier
```

…and a `format` script.

**Finding TD3 — No CI.** _Medium_

No `.github/workflows/`. A 20-line workflow (`install`, `lint`, `build`) on every PR prevents most regressions from landing on `main`.

**Finding TD4 — `package.json` scripts are bare.** _Low_

[package.json:6-11](package.json#L6-L11) has only `dev`, `build`, `lint`, `preview`. Add `format`, `format:check`, `test`, `test:run`, and (post-TS migration) `typecheck`.

### 3.13 Documentation

**Finding D1 — README is the unmodified Vite template.** _High_

[README.md:1-17](README.md#L1-L17) is the boilerplate Vite shipped. It tells a visitor nothing about what this repo _is_, how to run it, what env vars are needed (EmailJS!), how to deploy, or what stack is used. Replace with:

```markdown
# Pedro Machado — Personal Portfolio

A React + Vite + Tailwind 4 single-page portfolio.

## Stack
- React 19, Vite 7 (rolldown), Tailwind CSS 4
- EmailJS for the contact form
- lucide-react icons

## Local development
1. `npm install`
2. Copy `.env.example` → `.env.local` and fill in your EmailJS keys
3. `npm run dev`

## Build
- `npm run build` → static output in `dist/`
- `npm run preview` → preview the production build

## Deployment
Any static host (Vercel, Netlify, Cloudflare Pages). Project tested on …
```

---

## 4. Quick Wins (≤1 day total)

Ordered by impact-per-minute:

1. **[index.html](index.html) — full SEO head** (~30 min). Title, description, OG, Twitter, theme-color, canonical, real favicon. → fixes most of Score row 5.
2. **Replace `/vite.svg` favicon and add `/og-image.png`** (~20 min). → fixes S2.
3. **Load Inter & Playfair Display via Google Fonts `<link>` + `preconnect`** (~10 min):
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />
   ```
4. **Convert images to WebP + add `loading="lazy"`, `width`, `height`** (~60 min). → fixes P1.
5. **Add `prefers-reduced-motion` block at the bottom of [src/index.css](src/index.css)** (~5 min). → fixes A11Y1.
6. **Remove unused `Download` import in [AnimatedBorderButton.jsx:1](src/components/AnimatedBorderButton.jsx#L1)** (~30 sec).
7. **Add explicit `type="button"` defaults in both [Button.jsx](src/components/Button.jsx) and [AnimatedBorderButton.jsx](src/components/AnimatedBorderButton.jsx)** (~5 min).
8. **Hoist the 30-dot config out of `<Hero>` render with `useMemo`** ([Hero.jsx:48-61](src/sections/Hero.jsx#L48-L61)) (~5 min). → fixes Q1/P4.
9. **Add `.env.example`** (~2 min). → fixes SE3.
10. **Add `aria-expanded`, `aria-controls`, and `aria-label="Toggle menu"` to mobile menu button** ([Navbar.jsx:61-65](src/layout/Navbar.jsx#L61-L65)) (~5 min). → partial A11Y2.
11. **Add `aria-label` to icon-only buttons** in Testimonials (prev/next, dots) and Projects (overlay link/github) (~10 min). → A11Y4.
12. **Run `npm audit fix`** and re-build (~5 min, verify nothing broke). → SE1.
13. **Replace placeholder content** (`pedro@example.com`, `#` social links, real testimonial avatars) (~30 min). → Q3.
14. **Add `passive: true` to scroll listener** ([Navbar.jsx:21](src/layout/Navbar.jsx#L21)) (~30 sec). → P3.
15. **Rewrite [README.md](README.md)** (~15 min). → D1.

That's ~3 hours of work for an immediate jump from 4.5 → ~7.5.

---

## 5. Longer-Term Improvements

In rough priority order:

1. **Image pipeline.** Install `vite-imagetools` or write a one-time `sharp` script; emit AVIF + WebP + JPEG at 1x/2x for every image with auto-generated `srcset`. Eliminates the biggest perf issue permanently.
2. **Testing.** Vitest + Testing Library, baseline coverage on the three flows above. Wire into CI.
3. **TypeScript migration.** Repo is ~12 component files; convert in one PR. Add `tsconfig.json`, rename to `.tsx`, infer most prop types from usage. Catches the `size="xl"` class of bug.
4. **Error boundary** at the `App.jsx` level (Finding E1), plus per-section boundaries if Contact ever talks to a real backend.
5. **CI** via GitHub Actions: `install → lint → typecheck → test → build` on every PR; deploy preview on Vercel/Netlify per branch.
6. **ESLint plugins:** add `eslint-plugin-jsx-a11y` and `eslint-plugin-react` so future PRs catch the a11y issues this audit hand-found.
7. **Prettier** + `eslint-config-prettier` + a `lint-staged` pre-commit hook (via `husky` or `simple-git-hooks`).
8. **Mobile menu polish:** focus trap when open, Escape to close, return focus to toggle on close. Either build manually or pull in `@headlessui/react`'s `Dialog`/`Menu` primitives.
9. **Reduced-motion is the floor**: also consider a manual "reduce motion" toggle in the footer for users who want the option without changing OS settings.
10. **Deployment config.** Add `vercel.json` (or `netlify.toml`) so deploys are reproducible from any branch.
11. **Content separation.** Move `projects`, `experiences`, `testimonials`, and `skills` to JSON/MDX in `src/data/`. Pre-step toward a future CMS or auto-generated pages.
12. **Analytics + perf monitoring.** Plausible / Vercel Analytics + Web Vitals reporting so the next audit has real RUM data rather than a synthetic build.
13. **Sitemap + robots.txt** automated at build time via a tiny Vite plugin.
14. **Pin `vite` back to mainline** once `rolldown-vite` reaches stable, or earlier if any plugin issue surfaces.

---

## Appendix: Build metrics (this audit)

```
$ npm run build
rolldown-vite v7.2.5  •  ✓ 1706 modules transformed
dist/index.html                  0.48 kB │ gzip:  0.31 kB
dist/assets/index-CeNTHt32.css  36.75 kB │ gzip:  6.87 kB
dist/assets/index-DXnC00Zy.js  226.21 kB │ gzip: 70.00 kB
✓ built in 269ms
```

No build warnings, no chunk-size warnings. The build itself is clean — the issues are upstream of it.
