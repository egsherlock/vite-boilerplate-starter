import { Header } from './Header'
import { Hero } from './Hero'
import { StackGrid } from './StackGrid'
import { Features } from './Features'
import { CodeSamples } from './CodeSamples'
import { QuickStart } from './QuickStart'
import { Footer } from './Footer'

/**
 * Developer-reference landing page for the boilerplate.
 *
 * Replace this entire `src/components/landing/` directory (and update
 * `src/routes/index.tsx`) when starting a real client project.
 */
export function LandingPage() {
	return (
		<div className="landing-shell">
			<Header />
			<main className="landing-main">
				<Hero />
				<StackGrid />
				<hr className="landing-divider" />
				<Features />
				<hr className="landing-divider" />
				<CodeSamples />
				<hr className="landing-divider" />
				<QuickStart />
			</main>
			<Footer />
		</div>
	)
}
