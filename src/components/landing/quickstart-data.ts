export interface QuickStartStep {
	title: string
	description: string
}

export const QUICK_START_STEPS: QuickStartStep[] = [
	{
		title: 'Use the template on GitHub',
		description:
			'Hit "Use this template" → "Create a new repository". Name it after the client. Clone it locally.',
	},
	{
		title: 'Install dependencies',
		description:
			'`npm install` — then run `npm run dev` to confirm everything starts cleanly.',
	},
	{
		title: 'Initialise shadcn/ui',
		description:
			'The components.json is already configured. Add more components anytime with `npx shadcn@latest add <component>`.',
	},
	{
		title: 'Configure brand tokens',
		description:
			"Open `src/styles/main.css` and update `@theme` with the client's colours and fonts. Update `index.html` with the correct font imports.",
	},
	{
		title: 'Build',
		description:
			'Replace `src/routes/index.tsx`, delete `src/components/landing/`, scaffold your pages, and start building features. Everything else is already wired.',
	},
]
