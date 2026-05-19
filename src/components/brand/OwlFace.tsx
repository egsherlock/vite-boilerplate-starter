import type { ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import owlFace from '@/assets/logo-new-face.svg'

/**
 * Geometric BlazingOwl mark (teal palette SVG).
 * Decorative — pair with aria-hidden on the wrapper when used as ornament.
 */
export function OwlFace({
	className,
	alt = '',
	...props
}: ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<img
			src={owlFace}
			alt={alt}
			width={500}
			height={500}
			decoding="async"
			className={cn('owl-face', className)}
			{...props}
		/>
	)
}
