# Claude Code — Rules for This Boilerplate

## Stack

Vite · React 19 · TypeScript · Tailwind v4 (CSS-first) · TanStack Router · shadcn/ui · `cn()` · `cva`

---

## Translating HTML/CSS design references — CRITICAL

When given a plain HTML/CSS design file to implement, follow these rules without exception:

### Never do this

```css
/* ❌ Do NOT port raw CSS classes from the design file into a .css file */
.hero { padding: 8rem 5rem; display: grid; ... }
.hero-title { font-family: var(--display); font-size: clamp(...); }
```

### Always do this instead

1. **Map design tokens first** — copy colours, fonts, and spacing values from the design into `src/styles/main.css` as CSS variables inside `:root[data-theme='dark']` (or light). The `@theme` block maps those to Tailwind utilities automatically.
2. **Write Tailwind utilities inline in JSX** — no separate CSS files for layout, spacing, colour, or typography.
3. **Keep CSS only for** keyframe animations, `::before`/`::after` pseudo-elements, and JS-driven animation trigger classes (e.g. scroll reveal).

```tsx
// ✅ Correct — Tailwind utilities inline, cn() for conditionals
<section className="py-40 px-[clamp(1.5rem,5vw,8rem)] grid grid-cols-2 gap-20">
  <h1 className={cn('font-display text-[clamp(3rem,7vw,7rem)]', isVisible && 'opacity-100')}>
```

---

## Class name conditionals — ALWAYS use cn()

`prettier-plugin-tailwindcss` is active. It strips leading spaces inside template literal expressions, permanently breaking conditional class names.

```tsx
// ✅ Safe — formatter-proof
cn('nav', isScrolled && 'scrolled')
isScrolled
	? 'nav scrolled'
	: 'nav'
		// ❌ Breaks silently on save — formatter removes the space before 'scrolled'
		`nav${isScrolled ? ' scrolled' : ''}`
```

Import `cn` from `@/lib/utils` in every component that uses conditional classes.

---

## Tailwind token → utility reference

| Design value        | CSS variable      | Tailwind utility                             |
| ------------------- | ----------------- | -------------------------------------------- |
| Gold / brand colour | `--ui-primary`    | `text-primary` `bg-primary` `border-primary` |
| Page background     | `--ui-bg`         | `bg-bg`                                      |
| Card surface        | `--ui-surface`    | `bg-surface`                                 |
| Body text           | `--ui-text`       | `text-text`                                  |
| Muted text          | `--ui-text-muted` | `text-text-muted`                            |
| Faint text          | `--ui-text-faint` | `text-text-faint`                            |
| Display font        | `--font-display`  | `font-display`                               |
| Serif font          | `--font-serif`    | `font-serif`                                 |
| Expo easing         | `--ease-expo`     | `ease-expo`                                  |

---

## Component patterns

```tsx
// Multi-variant component → use cva()
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('inline-flex items-center gap-2 transition-colors', {
	variants: {
		variant: {
			primary: 'bg-primary text-bg hover:bg-primary-hover',
			outline:
				'border border-primary text-primary hover:bg-primary hover:text-bg',
		},
	},
	defaultVariants: { variant: 'primary' },
})
```

---

## What goes where

| Belongs in JSX (Tailwind)      | Belongs in CSS                         |
| ------------------------------ | -------------------------------------- |
| Layout, spacing, flex/grid     | `@keyframes` definitions               |
| Colours, typography            | `::before` / `::after` pseudo-elements |
| Hover/focus/active states      | JS-driven animation trigger classes    |
| Responsive breakpoints         | Complex `:nth-child` selectors         |
| Transitions on single elements |                                        |

---

## Client setup (start of every new project)

1. Edit `:root[data-theme='dark']` in `src/styles/main.css` — swap in client brand colours
2. Update `--font-display`, `--font-serif`, `--font-sans` in `@theme {}` and the `<link>` in `index.html`
3. Delete `src/components/landing/` and `src/styles/landing.css`
4. Rewrite `src/routes/index.tsx` with the new page components
5. Never touch `vite.config.ts`, `tailwind.config.*`, or PostCSS — Tailwind v4 needs none of these
