import { lazy, Suspense, useEffect } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { initLenis } from '@/lib/lenis'

// Dev-only devtools — lazy + tree-shaken from production via DEV flag.
const TanStackRouterDevtools = import.meta.env.DEV
	? lazy(() =>
			import('@tanstack/router-devtools').then((m) => ({
				default: m.TanStackRouterDevtools,
			})),
		)
	: () => null

const ReactQueryDevtools = import.meta.env.DEV
	? lazy(() =>
			import('@tanstack/react-query-devtools').then((m) => ({
				default: m.ReactQueryDevtools,
			})),
		)
	: () => null

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	useEffect(() => {
		const lenis = initLenis()
		return () => lenis.destroy()
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			<Outlet />
			{import.meta.env.DEV && (
				<Suspense fallback={null}>
					<TanStackRouterDevtools />
					<ReactQueryDevtools initialIsOpen={false} />
				</Suspense>
			)}
		</QueryClientProvider>
	)
}
