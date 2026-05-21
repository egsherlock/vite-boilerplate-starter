# Translating HTML/CSS Design References

This guide is for both humans and AI agents. When a client or designer provides a plain HTML/CSS file as the visual reference, this is how to translate it into the boilerplate's Tailwind v4 architecture correctly.

---

## The wrong way (what went wrong before)

It's tempting to copy the CSS from the design file directly:

```css
/* design-reference.css → copied into home.css ❌ */
.hero {
	padding: 8rem 5rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
}
.hero-title {
	font-family: var(--display);
	font-size: clamp(3.5rem, 7vw, 7rem);
}
.service-card {
	background: var(--black-light);
	padding: 3rem 2rem;
}
```

This bypasses Tailwind entirely. The result: 1,600 lines of custom CSS, `prettier-plugin-tailwindcss` silently broken, design tokens disconnected from the component layer, and a codebase that's hard to maintain.

---

## The right way — three steps

### Step 1: Map tokens into `main.css` first

Before writing a single component, identify the design's visual tokens and place them in `src/styles/main.css`.

**Colours** go into `:root[data-theme='dark']` (or light):

```css
:root[data-theme='dark'] {
	--ui-primary: #c8a97e; /* gold from design */
	--ui-primary-hover: #d4bc96;
	--ui-bg: #0a0a0a;
	--ui-surface: #141414;
	--ui-text: #fafaf9;
}
```

**Fonts** go into `@theme {}` and the `<link>` in `index.html`:

```css
@theme {
	--font-display: 'Bebas Neue', Impact, sans-serif;
	--font-serif: 'Playfair Display', Georgia, serif;
	--font-sans: 'Inter', -apple-system, sans-serif;
}
```

**Easing curves** go into `@theme {}` so they generate utilities:

```css
@theme {
	--ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
	--ease-quart: cubic-bezier(0.25, 1, 0.5, 1);
}
```

**Keyframe animations** go into `@theme {}` + a `@keyframes` block:

```css
@theme {
	--animate-fade-up: fadeUp 0.8s var(--ease-expo) forwards;
}
@keyframes fadeUp {
	from {
		opacity: 0;
		transform: translateY(40px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
```

Once tokens are in place, Tailwind generates utilities automatically:
`bg-primary`, `text-primary`, `font-display`, `ease-expo`, `animate-fade-up`, etc.

---

### Step 2: Write components with Tailwind utilities inline

Look at each element in the design reference and translate its CSS properties directly to Tailwind classes in JSX. **Do not create a CSS class for it.**

```tsx
/* Design reference had:
   .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
   .hero-content { padding: 8rem 5rem 5rem; display: flex; flex-direction: column; } */

// ✅ Correct translation
<section className="grid grid-cols-2 min-h-screen">
  <div className="flex flex-col pt-32 pb-20 px-20">
```

```tsx
/* Design reference had:
   .section-tag { font-size: 0.65rem; letter-spacing: 0.35em; color: var(--gold); } */

// ✅ Correct translation (use token utilities, not raw hex)
<span className="text-[0.65rem] tracking-[0.35em] uppercase text-primary">
```

**Token utility cheat sheet:**

| Design CSS                             | Tailwind utility           |
| -------------------------------------- | -------------------------- |
| `color: var(--gold)`                   | `text-primary`             |
| `background: var(--black)`             | `bg-bg`                    |
| `background: var(--black-light)`       | `bg-surface`               |
| `color: var(--white)`                  | `text-text`                |
| `color: var(--gray)`                   | `text-text-faint`          |
| `font-family: var(--display)`          | `font-display`             |
| `font-family: var(--serif)`            | `font-serif`               |
| `transition: ... var(--ease-out-expo)` | `ease-expo`                |
| `border: 1px solid rgba(gold, 0.1)`    | `border border-primary/10` |

---

### Step 3: CSS-only for things Tailwind genuinely can't do

Keep a minimal CSS file (aim for under 80 lines) for:

```css
/* ✅ Keyframes — needed for custom animations */
@keyframes fadeUp { ... }

/* ✅ JS-driven reveal classes — added by IntersectionObserver */
.reveal { opacity: 0; transform: translateY(40px); transition: ... }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ✅ ::before/::after wipe effects — translateX slide that can't be done inline */
.btn-primary-wipe::before {
  content: ''; position: absolute; inset: 0;
  transform: translateX(-101%); transition: transform 0.4s;
}
.btn-primary-wipe:hover::before { transform: translateX(0); }
```

Everything else — layout, spacing, colour, typography, responsive breakpoints, hover states — belongs inline in JSX via Tailwind.

---

## Conditional class names — always use `cn()`

```tsx
import { cn } from '@/lib/utils'

// ✅ Correct — formatter-proof
className={cn('nav', isScrolled && 'scrolled')}
className={isScrolled ? 'nav scrolled' : 'nav'}

// ❌ Never do this — prettier-plugin-tailwindcss strips the space
className={`nav${isScrolled ? ' scrolled' : ''}`}
```

---

## Responsive design

Use Tailwind breakpoint prefixes instead of `@media` blocks:

```tsx
/* Design had @media (max-width: 768px) { .hero { grid-template-columns: 1fr } } */

// ✅
<section className="grid grid-cols-1 lg:grid-cols-2">
```

For values that need to scale fluidly, use `clamp()` via arbitrary values:

```tsx
className = 'text-[clamp(2.5rem,4vw,4rem)]'
className = 'px-[clamp(1.5rem,5vw,8rem)]'
```

---

## Common mistakes

| Mistake                                                           | Fix                                                                                                            |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Creating a `.css` file and porting classes from design            | Write Tailwind utilities inline in JSX                                                                         |
| Using hex colours directly (`text-[#C8A97E]`)                     | Map to token first, use `text-primary`                                                                         |
| Template literal conditional classes                              | Use `cn()` or full-string ternary                                                                              |
| Using `text-base` / `text-lg` without checking the `@theme` clamp | Check `main.css @theme` — fluid sizes may be larger than expected, use `text-[1rem]` for fixed sizes           |
| Forgetting `mt-0` on headings                                     | Browser default `h1`/`h2` margins add unintended spacing — always set `mt-0` explicitly in Tailwind components |
