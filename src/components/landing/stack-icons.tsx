import type { LucideIcon } from 'lucide-react'
import { Boxes, MoveVertical } from 'lucide-react'
import type { SimpleIcon } from 'simple-icons'
import {
	siEslint,
	siFramer,
	siGsap,
	siReact,
	siReactquery,
	siReactrouter,
	siShadcnui,
	siTailwindcss,
	siTypescript,
	siVite,
	siVitest,
	siZod,
} from 'simple-icons'
import { cn } from '@/lib/utils'

export type StackIconId =
	| 'vite'
	| 'react'
	| 'typescript'
	| 'tailwindcss'
	| 'tanstack-router'
	| 'tanstack-query'
	| 'zustand'
	| 'zod'
	| 'shadcn'
	| 'gsap'
	| 'lenis'
	| 'motion'
	| 'vitest'
	| 'eslint'

type IconEntry =
	| { kind: 'simple'; icon: SimpleIcon; mono?: boolean }
	| { kind: 'lucide'; icon: LucideIcon }

const STACK_ICON_MAP: Record<StackIconId, IconEntry> = {
	vite: { kind: 'simple', icon: siVite },
	react: { kind: 'simple', icon: siReact },
	typescript: { kind: 'simple', icon: siTypescript },
	tailwindcss: { kind: 'simple', icon: siTailwindcss },
	'tanstack-router': { kind: 'simple', icon: siReactrouter },
	'tanstack-query': { kind: 'simple', icon: siReactquery },
	zustand: { kind: 'lucide', icon: Boxes },
	zod: { kind: 'simple', icon: siZod },
	shadcn: { kind: 'simple', icon: siShadcnui, mono: true },
	gsap: { kind: 'simple', icon: siGsap },
	lenis: { kind: 'lucide', icon: MoveVertical },
	motion: { kind: 'simple', icon: siFramer },
	vitest: { kind: 'simple', icon: siVitest },
	eslint: { kind: 'simple', icon: siEslint },
}

const BRAND_ICON_CLASS = cn('stack-card-icon', 'stack-card-icon--brand')

interface StackIconProps {
	id: StackIconId
	className?: string
}

function StackIconGlyph({ id, className }: StackIconProps) {
	const entry = STACK_ICON_MAP[id]

	if (entry.kind === 'lucide') {
		const Lucide = entry.icon
		return (
			<Lucide
				className={cn(BRAND_ICON_CLASS, className)}
				aria-hidden="true"
				strokeWidth={1.75}
			/>
		)
	}

	const isMono = entry.mono === true

	return (
		<svg
			role="img"
			aria-hidden="true"
			viewBox="0 0 24 24"
			className={cn(
				isMono ? 'stack-card-icon stack-card-icon--strong' : BRAND_ICON_CLASS,
				className,
			)}
			fill={isMono ? 'currentColor' : `#${entry.icon.hex}`}
		>
			<path d={entry.icon.path} />
		</svg>
	)
}

interface StackIconGroupProps {
	id: StackIconId
	className?: string
}

export function StackIconGroup({ id, className }: StackIconGroupProps) {
	return (
		<div className={cn('stack-card-icons', className)} aria-hidden="true">
			<StackIconGlyph id={id} />
		</div>
	)
}
