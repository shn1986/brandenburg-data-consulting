import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brandenburg Data Consulting - Expert Data Solutions',
  description: 'Professional data consultancy services including data modeling, data transformation, Agentic AI solutions, and comprehensive data-related services.',
  keywords: 'data consulting, data modeling, data transformation, AI solutions, business intelligence, analytics',
  authors: [{ name: 'Brandenburg Data Consulting' }],
  openGraph: {
    title: 'Brandenburg Data Consulting - Expert Data Solutions',
    description: 'Professional data consultancy services including data modeling, data transformation, Agentic AI solutions, and comprehensive data-related services.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandenburg Data Consulting - Expert Data Solutions',
    description: 'Professional data consultancy services including data modeling, data transformation, Agentic AI solutions, and comprehensive data-related services.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo-icon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}