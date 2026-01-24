// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pushkar Shinde - Full Stack Developer & ML Engineer',
    short_name: 'Pushkar Shinde',
    description: 'Portfolio website of Pushkar Shinde - Full Stack Developer, ML Engineer & GenAI Engineer specializing in Python, React, AI/ML, and LangChain.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#1e3a8a',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['portfolio', 'developer', 'technology', 'education'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/photo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/photo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/og-image.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
    screenshots: [
      {
        src: '/og-image.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
  }
}