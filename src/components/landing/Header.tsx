import { Github, Moon, Sun, Terminal } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { BrandLockup } from '@/components/brand/BrandLockup'

export function Header() {
	const { isDark, toggleTheme } = useTheme()

	return (
		<header className="landing-header">
			<BrandLockup href="#" variant="header" />
			<div className="landing-header-actions">
				<a href="#quickstart" className="btn-outline">
					<Terminal width={13} height={13} aria-hidden="true" />
					<span>Quick Start</span>
				</a>
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					className="btn-outline"
				>
					<Github width={13} height={13} aria-hidden="true" />
					<span>GitHub</span>
				</a>
				<button
					type="button"
					className="theme-toggle"
					onClick={toggleTheme}
					aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
				>
					{isDark ? (
						<Sun width={15} height={15} aria-hidden="true" />
					) : (
						<Moon width={15} height={15} aria-hidden="true" />
					)}
				</button>
			</div>
		</header>
	)
}
