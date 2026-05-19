import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrandLockup } from './BrandLockup'

describe('BrandLockup', () => {
	it('renders with the default label', () => {
		render(<BrandLockup />)
		expect(screen.getByText('Vite Boilerplate')).toBeInTheDocument()
	})

	it('honours a custom label', () => {
		render(<BrandLockup label="Acme Co." />)
		expect(screen.getByText('Acme Co.')).toBeInTheDocument()
	})

	it('exposes an accessible name combining label and brand', () => {
		render(<BrandLockup label="Vite Boilerplate" />)
		expect(
			screen.getByRole('link', { name: /Vite Boilerplate.*BlazingOwl/ }),
		).toBeInTheDocument()
	})

	it('reflects the footer variant via the data-variant attribute', () => {
		render(<BrandLockup variant="footer" />)
		expect(screen.getByRole('link')).toHaveAttribute('data-variant', 'footer')
	})
})
