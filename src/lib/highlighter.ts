import {
	createHighlighter,
	type BundledLanguage,
	type BundledTheme,
	type HighlighterGeneric,
} from 'shiki/bundle/web'

type WebHighlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const LANGS: BundledLanguage[] = ['typescript', 'tsx', 'css', 'json', 'bash']
const THEMES: BundledTheme[] = ['github-dark-dimmed', 'github-light']

let highlighterPromise: Promise<WebHighlighter> | null = null

/**
 * Lazily build a shared Shiki highlighter restricted to the slim web
 * bundle (~12 web-focused languages instead of the full ~190). We
 * initialise once per page and memoise the promise so React StrictMode
 * double-mounts don't redundantly spin up grammars.
 */
export function getHighlighter(): Promise<WebHighlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: THEMES,
			langs: LANGS,
		})
	}
	return highlighterPromise
}

export function themeForMode(mode: 'light' | 'dark'): BundledTheme {
	return mode === 'dark' ? 'github-dark-dimmed' : 'github-light'
}
