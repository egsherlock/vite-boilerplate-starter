import { BrandLockup } from '@/components/brand/BrandLockup'

export function Footer() {
	return (
		<footer className="landing-footer">
			<div className="footer-left">
				<BrandLockup href="#" variant="footer" />
				<span className="footer-text">v1.0.0 — May 2026</span>
			</div>
			<nav className="footer-links" aria-label="Footer">
				<a href="#stack">Stack</a>
				<a href="#features">Features</a>
				<a href="#quickstart">Quick Start</a>
				<a href="https://github.com" target="_blank" rel="noopener noreferrer">
					GitHub
				</a>
			</nav>
		</footer>
	)
}
