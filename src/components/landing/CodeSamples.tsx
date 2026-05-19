import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy } from 'lucide-react'
import { CODE_SNIPPETS, type CodeSnippet } from './code-snippets'
import { getHighlighter, themeForMode } from '@/lib/highlighter'
import { useTheme } from '@/hooks/use-theme'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

export function CodeSamples() {
	const [activeId, setActiveId] = useState<string>(CODE_SNIPPETS[0].id)
	const active = useMemo(
		() => CODE_SNIPPETS.find((s) => s.id === activeId) ?? CODE_SNIPPETS[0],
		[activeId],
	)

	return (
		<section id="code" className="landing-section">
			<div className="landing-container">
				<div className="section-label">Code samples</div>
				<h2 className="section-title">What the setup looks like</h2>
				<p className="section-desc">
					Key configuration files from the boilerplate — sensible defaults that
					cover 90% of client projects.
				</p>

				<div className="code-section">
					<div role="tablist" aria-label="Code samples" className="code-tabs">
						{CODE_SNIPPETS.map((snippet) => (
							<button
								key={snippet.id}
								type="button"
								role="tab"
								aria-selected={snippet.id === activeId}
								data-active={snippet.id === activeId}
								className="code-tab"
								onClick={() => setActiveId(snippet.id)}
							>
								{snippet.filename}
							</button>
						))}
					</div>

					<CodePanel snippet={active} />
				</div>
			</div>
		</section>
	)
}

function CodePanel({ snippet }: { snippet: CodeSnippet }) {
	const { theme } = useTheme()
	const prefersReduced = usePrefersReducedMotion()
	const [html, setHtml] = useState<string>('')
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		let cancelled = false
		getHighlighter().then((highlighter) => {
			if (cancelled) return
			const rendered = highlighter.codeToHtml(snippet.code, {
				lang: snippet.language,
				theme: themeForMode(theme),
			})
			setHtml(rendered)
		})
		return () => {
			cancelled = true
		}
	}, [snippet, theme])

	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(snippet.code)
			setCopied(true)
			setTimeout(() => setCopied(false), 1800)
		} catch {
			// Clipboard rejected (e.g. insecure context); fail silently.
		}
	}

	const transition = prefersReduced
		? { duration: 0 }
		: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const }

	return (
		<div>
			<div className="code-header">
				<span className="code-filename">{snippet.filename}</span>
				<button type="button" className="copy-btn" onClick={onCopy}>
					{copied ? (
						<>
							<Check width={11} height={11} aria-hidden="true" />
							Copied
						</>
					) : (
						<>
							<Copy width={11} height={11} aria-hidden="true" />
							Copy
						</>
					)}
				</button>
			</div>
			<AnimatePresence mode="wait">
				<motion.div
					key={snippet.id + theme}
					initial={prefersReduced ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={prefersReduced ? undefined : { opacity: 0 }}
					transition={transition}
					className="code-block"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</AnimatePresence>
		</div>
	)
}
