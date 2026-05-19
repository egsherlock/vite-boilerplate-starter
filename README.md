# Vite Boilerplate Starter

A production-grade GitHub-template repo for studio and agency front-end work, by **BlazingOwl**. Every client project starts here — clone, install, and start building features.

```
Vite 6 · React 19 · TypeScript 5 · Tailwind v4 · TanStack Router/Query
shadcn/ui · Zustand · React Hook Form + Zod · GSAP + Lenis · Motion
```

---

## Quick start

```bash
# 1. Use this template on GitHub: "Use this template" → "Create a new repository"
# 2. Clone, install, run
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) — you'll see the boilerplate's developer-reference landing page.

> **First-run note:** TanStack Router auto-generates `src/routeTree.gen.ts` on the first dev/build. If your editor flags the import in `src/main.tsx` before that runs, just run `npm run dev` once (Ctrl+C is fine after the server starts).

---

## Per-client workflow

When starting a real client project, follow these steps in order:

1. **Use this template on GitHub** — click _Use this template_ → _Create a new repository_.
2. **Clone and install** — `git clone … && cd … && npm install`.
3. **Swap brand tokens** — open [src/styles/main.css](src/styles/main.css) and replace the `--ui-*` values inside `:root[data-theme="light"]` and `:root[data-theme="dark"]` with the client's palette. The shadcn token bridge below it picks up the new colours automatically.
4. **Swap fonts** — update the `<link>` in [index.html](index.html) and the `--font-*` values in `@theme {}`.
5. **Swap favicon + manifest** — replace the files in [public/](public/) and update [public/site.webmanifest](public/site.webmanifest).
6. **Replace the landing page** — delete [src/components/landing/](src/components/landing/) and rewrite [src/routes/index.tsx](src/routes/index.tsx) with the client's home page. Delete [src/styles/landing.css](src/styles/landing.css) and remove its `@import` from [src/styles/main.css](src/styles/main.css).
7. **Update `.env.example`** — add the project's `VITE_*` vars.
8. **Update this README** — replace the title and overview to describe the client project.

---

## Scripts

| Script                  | What it does                                       |
| ----------------------- | -------------------------------------------------- |
| `npm run dev`           | Start the Vite dev server on `:5173` with HMR.     |
| `npm run build`         | `tsc -b` then `vite build`. Outputs `dist/`.       |
| `npm run preview`       | Serve the `dist/` build locally for smoke-testing. |
| `npm run lint`          | ESLint with `--max-warnings 0`.                    |
| `npm run format`        | Prettier write across `src/`.                      |
| `npm run format:check`  | Prettier check without writing.                    |
| `npm run typecheck`     | `tsc -b --noEmit` over both project references.    |
| `npm run test`          | Vitest in watch mode.                              |
| `npm run test:run`      | Vitest single-pass (CI).                           |
| `npm run test:ui`       | Vitest UI dashboard.                               |
| `npm run test:coverage` | Vitest with v8 coverage.                           |

---

## Project structure

```
.
├── public/                 favicons + site.webmanifest
├── src/
│   ├── assets/             static assets (fonts, images, svgs)
│   ├── components/
│   │   ├── brand/          Wordmark + BrandLockup (BlazingOwl branding)
│   │   ├── landing/        boilerplate landing page (replace per client)
│   │   └── ui/             shadcn/ui components (you own these)
│   ├── hooks/              useTheme, usePrefersReducedMotion, useMediaQuery
│   ├── lib/
│   │   ├── utils.ts        cn() helper (clsx + tailwind-merge)
│   │   ├── lenis.ts        Lenis init wired to gsap.ticker
│   │   ├── query-client.ts TanStack Query client
│   │   └── highlighter.ts  Shiki singleton (used by the landing page)
│   ├── routes/
│   │   ├── __root.tsx      Providers, Lenis, devtools
│   │   └── index.tsx       Renders LandingPage (replace per client)
│   ├── store/
│   │   └── ui.store.ts     Zustand UI store (theme, modal flags)
│   ├── styles/
│   │   ├── main.css        @theme tokens + light/dark palettes
│   │   ├── base.css        resets, scrollbar, prefers-reduced-motion
│   │   └── landing.css     landing-only rules (delete per client)
│   ├── types/              shared type aliases
│   ├── test-setup.ts       Vitest + RTL setup
│   └── main.tsx            entry; mounts RouterProvider
├── components.json         shadcn/ui CLI config
├── eslint.config.js        flat ESLint config
├── index.html              app shell, favicons, no-flash theme script
├── vite.config.ts          TanStack Router + React + Tailwind plugins
├── vitest.config.ts        jsdom env, RTL setup
├── tsconfig.{,app,node}.json
└── package.json
```

---

## Design tokens

All tokens live in [src/styles/main.css](src/styles/main.css):

- **Tailwind v4 `@theme {}`** — anything declared here becomes a Tailwind utility (`text-hero`, `bg-card`, `text-muted-foreground`, etc.).
- **Light/dark palettes** — defined on `:root[data-theme='light']` and `:root[data-theme='dark']`. The current theme is set on `<html>` by the no-flash script in [index.html](index.html) before React mounts.
- **shadcn token bridge** — semantic shadcn names (`background`, `foreground`, `primary`, `card`, `muted`, etc.) are mapped to the `--ui-*` variables, so swapping the palette automatically restyles every shadcn component.

---

## Animation conventions

| Animation type           | Tool                    | Where                                         |
| ------------------------ | ----------------------- | --------------------------------------------- |
| Global smooth scroll     | Lenis                   | `src/lib/lenis.ts` (ticked via `gsap.ticker`) |
| Scroll-triggered reveals | GSAP + ScrollTrigger    | `StackGrid`, `Features`                       |
| Component enter/exit     | Motion (`motion/react`) | `Hero`, `CodeSamples` (tab transitions)       |
| Page-level timelines     | GSAP                    | _your client work goes here_                  |

**Never** call `requestAnimationFrame` manually alongside Lenis — `src/lib/lenis.ts` already drives Lenis off `gsap.ticker`. Duplicate frame loops cause animation drift.

All non-essential animations check `prefers-reduced-motion` via the `usePrefersReducedMotion` hook.

---

## Adding shadcn components

The CLI is pre-configured via [components.json](components.json). Add more anytime:

```bash
npx shadcn@latest add table tabs tooltip
```

Components are copied directly into `src/components/ui/` — you own them and can edit freely.

---

## Branding (BlazingOwl)

- Wordmark is inlined as a typed React component in [src/components/brand/Wordmark.tsx](src/components/brand/Wordmark.tsx) — no separate SVG file is imported at runtime. It uses `currentColor` + `var(--color-text-muted)` so it adapts to both themes while preserving the original two-tone treatment.
- [src/components/brand/BrandLockup.tsx](src/components/brand/BrandLockup.tsx) composes the wordmark with a "Vite Boilerplate" product label. Variants: `header` (compact) and `footer` (larger).
- Favicon set lives in [public/](public/) and is wired up in [index.html](index.html).

---

## Deployment

The boilerplate is hosting-agnostic. Common targets:

- **Vercel** — zero config; just import the repo.
- **Netlify** — add `netlify.toml`:
  ```toml
  [[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  ```
- **Cloudflare Pages** — add `public/_redirects`:
  ```
  /*  /index.html  200
  ```

---

## What's intentionally not included

To keep the template lean, add these per-project only when required:

- i18n (`react-i18next`)
- Auth (Clerk, Auth.js, Supabase)
- CMS (Sanity, Contentful, Payload)
- E-commerce (Stripe, Shopify Storefront)
- Maps (Mapbox GL, Google Maps)
- Rich text / WYSIWYG (TipTap)

---

## Notes

- **Tailwind v4 via `@tailwindcss/vite`** — the brief calls out `@tailwindcss/postcss`, but the official Tailwind recommendation for Vite is the dedicated Vite plugin (faster, no PostCSS layer). The plugin is wired up in [vite.config.ts](vite.config.ts).
- **`prettier-plugin-tailwindcss`** — the brief uses the shortened name `prettier-plugin-tailwind`; the actual published npm package is `prettier-plugin-tailwindcss`.

---

© BlazingOwl
