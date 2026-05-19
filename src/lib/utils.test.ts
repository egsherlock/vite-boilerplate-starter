import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
	it('joins truthy class names', () => {
		expect(cn('a', 'b', 'c')).toBe('a b c')
	})

	it('drops falsy values', () => {
		const flag = false as boolean
		expect(cn('a', flag && 'b', null, undefined, 'c')).toBe('a c')
	})

	it('resolves conflicting Tailwind utilities (twMerge)', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
	})

	it('accepts conditional objects via clsx', () => {
		expect(cn({ 'text-red-500': true, hidden: false })).toBe('text-red-500')
	})
})
