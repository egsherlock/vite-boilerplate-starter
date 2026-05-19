import {
	Layers,
	Route as RouteIcon,
	Zap,
	ShieldCheck,
	Component,
	GitBranch,
	type LucideIcon,
} from 'lucide-react'

export interface FeatureItem {
	icon: LucideIcon
	title: string
	description: string
}

export const FEATURE_ITEMS: FeatureItem[] = [
	{
		icon: Layers,
		title: 'Design token system',
		description:
			'Fluid type scale, 4px spacing system, OKLCH colour palette with full light/dark mode — all in `@theme`. Swap per client in minutes.',
	},
	{
		icon: RouteIcon,
		title: 'Type-safe routing',
		description:
			'TanStack Router with file-based routes. Every path, param, and search string is typed — broken links fail at compile time, not in production.',
	},
	{
		icon: Zap,
		title: 'Animation ready',
		description:
			'Lenis, GSAP, and Motion are pre-configured with the correct integration setup. ScrollTrigger stays in sync with Lenis scroll position out of the box.',
	},
	{
		icon: ShieldCheck,
		title: 'Quality gates baked in',
		description:
			"Husky pre-commit hooks, lint-staged, ESLint with TypeScript rules, and Prettier with Tailwind class sorting. Bad code can't reach the repo.",
	},
	{
		icon: Component,
		title: 'shadcn/ui baseline',
		description:
			'Core shadcn components pre-installed: Button, Input, Card, Dialog, Sheet, Toast, Form, Navigation Menu. You own the code — style freely.',
	},
	{
		icon: GitBranch,
		title: 'GitHub Template Repo',
		description:
			'"Use this template" on GitHub, clone, `npm install`. No CLI tool to maintain. Three minutes from start to writing features.',
	},
]
