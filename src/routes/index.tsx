import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '@/components/landing/LandingPage'

/**
 * Boilerplate developer-reference landing page.
 *
 * When starting a real client project, replace the contents of this file
 * (and delete `src/components/landing/`) with the actual home page for
 * that client.
 */
export const Route = createFileRoute('/')({
	component: LandingPage,
})
