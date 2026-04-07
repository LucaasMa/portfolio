import { createRootRoute, HeadContent, Link, Scripts } from '@tanstack/react-router'
import { Home } from 'lucide-react'
import { lazy, Suspense } from 'react'

import '../i18n/config'
import appCss from '../styles.css?url'

const TanStackDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-devtools').then((mod) => ({
        default: mod.TanStackDevtools,
      }))
    )
  : () => null

const TanStackRouterDevtoolsPanel = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((mod) => ({
        default: mod.TanStackRouterDevtoolsPanel,
      }))
    )
  : () => null

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Lucas Mauricio | Front-end Developer',
      },
      {
        name: 'description',
        content:
          'Lucas Mauricio - Front-end Developer with 3+ years of experience specializing in React, Next.js, and TypeScript. Building pixel-perfect, accessible user interfaces.',
      },
      {
        property: 'og:title',
        content: 'Lucas Mauricio | Front-end Developer',
      },
      {
        property: 'og:description',
        content:
          'Front-end Developer with 3+ years of experience specializing in React, Next.js, and TypeScript. Building pixel-perfect, accessible user interfaces.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://lucasmauricio.com.br',
      },
      {
        property: 'og:image',
        content: 'https://lucasmauricio.com.br/og-image.png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Lucas Mauricio | Front-end Developer',
      },
      {
        name: 'twitter:description',
        content:
          'Front-end Developer with 3+ years of experience specializing in React, Next.js, and TypeScript.',
      },
      {
        name: 'twitter:image',
        content: 'https://lucasmauricio.com.br/og-image.png',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-black text-cyan-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-300"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
        {import.meta.env.DEV && (
          <Suspense fallback={null}>
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          </Suspense>
        )}
        <Scripts />
      </body>
    </html>
  )
}
