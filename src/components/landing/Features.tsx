import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FEATURE_ITEMS } from './features-data'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

gsap.registerPlugin(ScrollTrigger)

export function Features() {
	const gridRef = useRef<HTMLDivElement>(null)
	const prefersReduced = usePrefersReducedMotion()

	useEffect(() => {
		if (prefersReduced) return
		const grid = gridRef.current
		if (!grid) return

		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>('.feature-card', grid)
			gsap.set(cards, { opacity: 0, y: 12 })
			ScrollTrigger.batch(cards, {
				start: 'top 85%',
				onEnter: (batch) =>
					gsap.to(batch, {
						opacity: 1,
						y: 0,
						duration: 0.55,
						ease: 'power3.out',
						stagger: 0.07,
						overwrite: true,
					}),
			})
		}, grid)

		return () => ctx.revert()
	}, [prefersReduced])

	return (
		<section id="features" className="landing-section">
			<div className="landing-container">
				<div className="section-label">What's included</div>
				<h2 className="section-title">Built for studio work</h2>
				<p className="section-desc">
					The boring setup is already done. Every new client project starts here
					— brand tokens, providers, hooks, and quality gates all pre-wired.
				</p>

				<div ref={gridRef} className="features-grid">
					{FEATURE_ITEMS.map((feature) => {
						const Icon = feature.icon
						return (
							<div key={feature.title} className="feature-card">
								<div className="feature-icon">
									<Icon width={16} height={16} aria-hidden="true" />
								</div>
								<div className="feature-title">{feature.title}</div>
								<FeatureDescription description={feature.description} />
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

/**
 * Renders the feature description, converting inline backticks to <code>.
 * Cheap parser — descriptions are static strings with no nesting.
 */
function FeatureDescription({ description }: { description: string }) {
	const parts = description.split(/(`[^`]+`)/g)
	return (
		<div className="feature-desc">
			{parts.map((part, i) => {
				if (part.startsWith('`') && part.endsWith('`')) {
					return (
						<code key={i} className="inline-code">
							{part.slice(1, -1)}
						</code>
					)
				}
				return <span key={i}>{part}</span>
			})}
		</div>
	)
}
