import { motion } from 'motion/react'
import { ArrowRight, Play } from 'lucide-react'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

interface Stat {
	num: string
	label: string
}

const STATS: Stat[] = [
	{ num: '~3 min', label: 'From clone to coding' },
	{ num: '19.2', label: 'React (latest stable)' },
	{ num: 'TW v4', label: 'CSS-first Tailwind' },
	{ num: '100%', label: 'TypeScript strict mode' },
]

const easeOut = [0.16, 1, 0.3, 1] as const

export function Hero() {
	const prefersReduced = usePrefersReducedMotion()
	const enter = prefersReduced
		? { initial: false, animate: { opacity: 1, y: 0 } }
		: {
				initial: { opacity: 0, y: 16 },
				animate: { opacity: 1, y: 0 },
			}

	return (
		<section className="hero">
			<div className="landing-container">
				<motion.div
					{...enter}
					transition={{ duration: 0.55, ease: easeOut, delay: 0.08 }}
					className="hero-badge"
				>
					<span className="hero-badge-dot" aria-hidden="true" />
					v1.0 — Production ready
				</motion.div>

				<motion.h1
					{...enter}
					transition={{ duration: 0.6, ease: easeOut, delay: 0.18 }}
					className="hero-h1"
				>
					Ship client sites <em>faster.</em>
				</motion.h1>

				<motion.p
					{...enter}
					transition={{ duration: 0.6, ease: easeOut, delay: 0.28 }}
					className="hero-sub"
				>
					A production-grade React boilerplate for studio and agency work. Vite,
					TypeScript, Tailwind v4, TanStack Router, GSAP, Lenis — every project
					starts from a solid foundation.
				</motion.p>

				<motion.div
					{...enter}
					transition={{ duration: 0.6, ease: easeOut, delay: 0.36 }}
					className="hero-actions"
				>
					<a href="#quickstart" className="btn-primary">
						<Play width={13} height={13} aria-hidden="true" />
						Get started
					</a>
					<a href="#stack" className="btn-ghost">
						View the stack
						<ArrowRight width={13} height={13} aria-hidden="true" />
					</a>
				</motion.div>

				<div className="stats">
					{STATS.map((stat, i) => (
						<motion.div
							key={stat.label}
							{...enter}
							transition={{
								duration: 0.55,
								ease: easeOut,
								delay: 0.46 + i * 0.07,
							}}
						>
							<div className="stat-num">{stat.num}</div>
							<div className="stat-label">{stat.label}</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
