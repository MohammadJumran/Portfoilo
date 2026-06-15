# Mohammad Jumran — Personal Portfolio

A bilingual (English / Arabic) single-page portfolio for a System Administrator &
Data Security Specialist. Built with React, Vite, and Tailwind CSS, with rich
motion and 3D background effects.

🔗 **Live site:** _coming soon_

## Tech stack

- **React 19** + **React Router** (`/` home, `/projects` all-projects page)
- **Vite 7** (rolldown build) with `@` → `src` path alias
- **Tailwind CSS 4**
- **framer-motion / motion** + **GSAP** for animation
- **three.js** + **@react-three/fiber / drei** for the 3D/network backgrounds
- **Lenis** smooth scrolling, **lucide-react** icons
- **i18n** — custom context (`src/i18n/`) with English + Arabic (RTL) support
- **Contact form** — [FormSubmit.co](https://formsubmit.co) (no backend / no API keys)

## Project structure

```
src/
  components/   Reusable UI (buttons, cards, backgrounds, ErrorBoundary…)
  sections/     Page sections (Hero, About, Skills, Experience, Projects, Stats, Contact)
  pages/        Routed pages (AllProjects)
  layout/       Navbar, Footer
  data/         Structured, language-independent content (projects, skills, experience…)
  i18n/         Language context + translations (en / ar)
  assets/       CV PDF, profile image
public/         Static assets (favicon, project images, og-image)
```

## Local development

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
```

No environment variables are required.

## Build & preview

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Deployment

Deployed as a static site on **Vercel** (auto-detected Vite preset). Every push to
`main` triggers an automatic rebuild and redeploy. Any static host works
(Netlify, Cloudflare Pages, GitHub Pages).

---

© Mohammad Jumran. Originally bootstrapped from a Vite + React template, heavily
customized.
