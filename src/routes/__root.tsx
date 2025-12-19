import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'
import '../i18n/config'

export const Route = createRootRoute({
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

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
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
        <Scripts />
      </body>
    </html>
  )
}
