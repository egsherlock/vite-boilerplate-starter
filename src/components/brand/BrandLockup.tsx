import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Wordmark } from './Wordmark'

interface BrandLockupProps extends HTMLAttributes<HTMLAnchorElement> {
	href?: string
	label?: string
	variant?: 'header' | 'footer'
}

/**
 * BlazingOwl wordmark + product label ("Vite Boilerplate" by default).
 *
 * Variants:
 *  - `header` — compact, sized to fit a 64px sticky header
 *  - `footer` — slightly larger, used in the page footer
 */
export function BrandLockup({
	href = '/',
	label = 'Vite Boilerplate',
	variant = 'header',
	className,
	...props
}: BrandLockupProps) {
	return (
		<a
			href={href}
			data-variant={variant}
			className={cn('brand-lockup', className)}
			aria-label={`${label} — BlazingOwl`}
			{...props}
		>
			<Wordmark aria-hidden="true" />
			<span className="brand-lockup-label">{label}</span>
		</a>
	)
}
