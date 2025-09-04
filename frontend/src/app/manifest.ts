import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Brandenburg Data Consulting',
    short_name: 'Brandenburg Data Consulting',
    description: 'Expert data consulting services including data modeling, AI solutions, and business intelligence.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/logo-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}