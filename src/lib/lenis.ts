import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initialise a single global Lenis instance and tick it via `gsap.ticker`.
 *
 * Important: never call `requestAnimationFrame` manually alongside Lenis +
 * GSAP. Driving both off the same ticker prevents duplicate frame loops
 * and keeps `ScrollTrigger` in lock-step with the smooth scroll position.
 */
export function initLenis(): Lenis {
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
	})

	lenis.on('scroll', ScrollTrigger.update)

	const tick = (time: number) => lenis.raf(time * 1000)
	gsap.ticker.add(tick)
	gsap.ticker.lagSmoothing(0)

	const originalDestroy = lenis.destroy.bind(lenis)
	lenis.destroy = () => {
		gsap.ticker.remove(tick)
		originalDestroy()
	}

	return lenis
}
