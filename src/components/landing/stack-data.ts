import type { StackIconId } from './stack-icons'

export interface StackItem {
	name: string
	version: string
	description: string
	tag: string
	icon: StackIconId
}

export const STACK_ITEMS: StackItem[] = [
	{
		name: 'Vite',
		version: '^6.x',
		description:
			'Lightning-fast HMR, ESM-native bundler. Sub-second dev starts.',
		tag: 'Build',
		icon: 'vite',
	},
	{
		name: 'React 19.2',
		version: '19.2.6',
		description:
			'Latest stable. Compiler-based auto-memoisation, the `use()` hook, improved Server Components.',
		tag: 'Framework',
		icon: 'react',
	},
	{
		name: 'TypeScript',
		version: '^5.x',
		description:
			'Strict mode enabled. Catches bugs at compile time, not in a client demo.',
		tag: 'Language',
		icon: 'typescript',
	},
	{
		name: 'Tailwind CSS v4',
		version: '^4.x',
		description:
			'CSS-first config via `@theme`. No more tailwind.config.js. Lightning CSS engine — up to 5× faster builds.',
		tag: 'Styling',
		icon: 'tailwindcss',
	},
	{
		name: 'TanStack Router',
		version: '^1.x',
		description:
			'File-based routing with full type-safety on params, paths, and search. Auto code-splitting via Vite plugin.',
		tag: 'Routing',
		icon: 'tanstack-router',
	},
	{
		name: 'TanStack Query',
		version: '^5.x',
		description:
			'Server state management. Caching, background refetch, loading and error states out of the box.',
		tag: 'Data',
		icon: 'tanstack-query',
	},
	{
		name: 'Zustand',
		version: '^5.x',
		description:
			'Zero-boilerplate client state. Hook-based, tiny bundle, no provider wrapping needed.',
		tag: 'State',
		icon: 'zustand',
	},
	{
		name: 'React Hook Form + Zod',
		version: '^7.x + ^3.x',
		description:
			'Performance-first forms with type-safe Zod schemas. Schemas are reusable FE and BE.',
		tag: 'Forms',
		icon: 'zod',
	},
	{
		name: 'shadcn/ui',
		version: 'latest',
		description:
			'Accessible Radix primitives, styled with Tailwind, copied into your repo. You own every component.',
		tag: 'UI',
		icon: 'shadcn',
	},
	{
		name: 'GSAP + ScrollTrigger',
		version: '^3.x',
		description:
			'Industry-standard for complex scroll-driven animation and sequenced timelines. Synced with Lenis.',
		tag: 'Animation',
		icon: 'gsap',
	},
	{
		name: 'Lenis',
		version: '^1.x',
		description:
			'Buttery-smooth scroll inertia. Lightweight, framework-agnostic, ticks via GSAP ticker for perfect sync.',
		tag: 'Scroll',
		icon: 'lenis',
	},
	{
		name: 'Motion',
		version: '^12.x',
		description:
			'Framer Motion v12 — declarative React animations, layout transitions, exit animations with AnimatePresence.',
		tag: 'Animation',
		icon: 'motion',
	},
	{
		name: 'Vitest',
		version: 'latest',
		description:
			'Vite-native test runner. Near-instant runs, Jest-compatible API. No config required.',
		tag: 'Testing',
		icon: 'vitest',
	},
	{
		name: 'ESLint + Prettier + Husky',
		version: 'latest',
		description:
			'Pre-commit hooks via Husky, staged-file linting, auto Tailwind class sorting with prettier-plugin-tailwindcss.',
		tag: 'DX',
		icon: 'eslint',
	},
]
