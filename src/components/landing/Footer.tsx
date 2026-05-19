import { BrandLockup } from '@/components/brand/BrandLockup'
import { SITE } from '@/config/site'

export function Footer() {
	return (
		<footer className="landing-footer">
			<div className="footer-left">
				<BrandLockup href={SITE.blazingOwl} variant="footer" />
				<div className="footer-meta">
					<span className="footer-text">v1.0.0 — May 2026</span>
					<p className="footer-studio">
						Need a team to ship it?{' '}
						<a href={SITE.blazingOwl}>Work with BlazingOwl</a>
					</p>
				</div>
			</div>
			<nav className="footer-links" aria-label="Footer">
				<a href="#stack">Stack</a>
				<a href="#features">Features</a>
				<a href="#quickstart">Quick Start</a>
				<a href={SITE.githubRepo} target="_blank" rel="noopener noreferrer">
					GitHub
				</a>
				<a href={SITE.blazingOwl}>Studio</a>
			</nav>
		</footer>
	)
}
