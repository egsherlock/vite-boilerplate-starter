import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Subscribes to the user's reduced-motion preference. Use to gate
 * non-essential animations (GSAP timelines, Motion transitions).
 */
export function usePrefersReducedMotion(): boolean {
	const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false
		return window.matchMedia(QUERY).matches
	})

	useEffect(() => {
		if (typeof window === 'undefined') return
		const mql = window.matchMedia(QUERY)
		const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
		mql.addEventListener('change', handler)
		return () => mql.removeEventListener('change', handler)
	}, [])

	return prefersReduced
}
