import { useUIStore, type Theme } from '@/store/ui.store'

interface UseThemeReturn {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
	isDark: boolean
}

/**
 * Read or mutate the current light/dark theme. Backed by the global UI
 * store; persists to `localStorage` under `vbs.theme` and pre-applied by
 * the inline boot script in `index.html` to prevent flash-of-wrong-theme.
 */
export function useTheme(): UseThemeReturn {
	const theme = useUIStore((s) => s.theme)
	const setTheme = useUIStore((s) => s.setTheme)
	const toggleTheme = useUIStore((s) => s.toggleTheme)
	return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}
