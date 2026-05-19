import { create } from 'zustand'

export type Theme = 'light' | 'dark'

interface UIState {
	theme: Theme
	modalOpen: boolean
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
	toggleModal: () => void
	setModalOpen: (open: boolean) => void
}

const THEME_STORAGE_KEY = 'vbs.theme'

function readInitialTheme(): Theme {
	if (typeof document === 'undefined') return 'dark'
	const attr = document.documentElement.getAttribute('data-theme')
	if (attr === 'light' || attr === 'dark') return attr
	try {
		const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
		if (stored === 'light' || stored === 'dark') return stored
	} catch {
		// localStorage may be unavailable in private mode; fall through.
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

function applyTheme(theme: Theme): void {
	if (typeof document === 'undefined') return
	document.documentElement.setAttribute('data-theme', theme)
	document.documentElement.style.colorScheme = theme
	try {
		window.localStorage.setItem(THEME_STORAGE_KEY, theme)
	} catch {
		// Ignore quota / privacy errors.
	}
}

export const useUIStore = create<UIState>()((set, get) => ({
	theme: readInitialTheme(),
	modalOpen: false,
	setTheme: (theme) => {
		applyTheme(theme)
		set({ theme })
	},
	toggleTheme: () => {
		const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
		applyTheme(next)
		set({ theme: next })
	},
	toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
	setModalOpen: (modalOpen) => set({ modalOpen }),
}))
