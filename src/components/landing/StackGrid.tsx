import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STACK_ITEMS } from './stack-data'
import { StackIconGroup } from './stack-icons'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

gsap.registerPlugin(ScrollTrigger)

export function StackGrid() {
	const gridRef = useRef<HTMLDivElement>(null)
	const prefersReduced = usePrefersReducedMotion()

	useEffect(() => {
		if (prefersReduced) return
		const grid = gridRef.current
		if (!grid) return

		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>('.stack-card', grid)
			gsap.set(cards, { opacity: 0, y: 12 })
			ScrollTrigger.batch(cards, {
				start: 'top 85%',
				onEnter: (batch) =>
					gsap.to(batch, {
						opacity: 1,
						y: 0,
						duration: 0.55,
						ease: 'power3.out',
						stagger: 0.06,
						overwrite: true,
					}),
			})
		}, grid)

		return () => ctx.revert()
	}, [prefersReduced])

	return (
		<section id="stack" className="landing-section">
			<div className="landing-container">
				<div className="section-label">Tech stack</div>
				<h2 className="section-title">
					Everything you need, nothing you don't
				</h2>
				<p className="section-desc">
					Hand-picked packages with long-term maintenance records. Opinionated
					enough to get you moving, flexible enough for any client brief.
				</p>

				<div ref={gridRef} className="stack-grid">
					{STACK_ITEMS.map((item) => (
						<div key={item.name} className="stack-card">
							<div className="stack-card-header">
								<span className="stack-card-name">{item.name}</span>
								<span className="stack-version">{item.version}</span>
							</div>
							<span className="stack-card-desc">{item.description}</span>
							<div className="stack-card-footer">
								<span className="stack-tag">{item.tag}</span>
								<StackIconGroup id={item.icon} />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
