import type { BundledLanguage } from 'shiki/bundle/web'

export interface CodeSnippet {
	id: string
	filename: string
	language: BundledLanguage
	code: string
}

export const CODE_SNIPPETS: CodeSnippet[] = [
	{
		id: 'vite',
		filename: 'vite.config.ts',
		language: 'typescript',
		code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`,
	},
	{
		id: 'css',
		filename: 'src/styles/main.css',
		language: 'css',
		code: `/* Tailwind v4 — CSS-first, no tailwind.config.js */
@import "tailwindcss";

@theme {
  /* Fluid type scale */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-hero: clamp(3rem, 0.5rem + 7vw, 8rem);

  /* 4px spacing system */
  --spacing: 0.25rem;

  /* Brand colours — swap per client */
  --color-primary: #01696f;
  --radius-md: 0.5rem;
}

:root[data-theme="dark"] {
  --ui-bg: #111110;
  --ui-text: #e8e6e1;
  --ui-primary: #3fa8af;
}
`,
	},
	{
		id: 'root',
		filename: 'src/routes/__root.tsx',
		language: 'tsx',
		code: `import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { useEffect } from 'react'
import { initLenis } from '@/lib/lenis'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useEffect(() => {
    const lenis = initLenis()
    return () => lenis.destroy()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}
`,
	},
	{
		id: 'lenis',
		filename: 'src/lib/lenis.ts',
		language: 'typescript',
		code: `import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  // Keep GSAP ScrollTrigger in sync with Lenis
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenis
}
`,
	},
]
