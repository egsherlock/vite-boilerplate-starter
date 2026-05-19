import { QueryClient } from '@tanstack/react-query'

/**
 * Shared `QueryClient` instance for the app. Defaults bias toward fewer
 * background fetches — override per-query when stale-while-revalidate
 * behaviour matters.
 */
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
})
