// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Pushkar Shinde - Full Stack Developer & Software Engineer',
    template: '%s | Pushkar Shinde'
  },
  description: 'Pushkar Shinde - Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my portfolio, projects, and get in touch for collaboration.',
  keywords: [
    'Pushkar Shinde',
    'Pushkar Amar Shinde',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Software Engineer',
    'Web Developer',
    'Portfolio',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Frontend Developer',
    'Backend Developer'
  ],
  authors: [{ name: 'Pushkar Shinde' }],
  creator: 'Pushkar Shinde',
  publisher: 'Pushkar Shinde',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pushkarshinde.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pushkarshinde.in',
    title: 'Pushkar Shinde - Full Stack Developer & Software Engineer',
    description: 'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my portfolio and projects.',
    siteName: 'Pushkar Shinde Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pushkar Shinde - Full Stack Developer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
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
        {/* Additional favicon links for better browser support */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Additional SEO meta tags */}
        <link rel="canonical" href="https://pushkarshinde.in" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        
        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Pushkar Shinde",
              "alternateName": "Pushkar Amar Shinde",
              "jobTitle": "Full Stack Developer",
              "description": "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
              "url": "https://pushkarshinde.in",
              "sameAs": [
                "https://www.linkedin.com/in/pushkarshinde6/",
                "https://github.com/Pushkar3232/"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "Full Stack Development",
                "Web Development",
                "Software Engineering"
              ]
            })
          }}
        />
        
        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Pushkar Shinde Portfolio",
              "alternateName": "Pushkar Shinde Portfolio",
              "url": "https://pushkarshinde.in",
              "description": "Portfolio website of Pushkar Shinde - Full Stack Developer",
              "author": {
                "@type": "Person",
                "name": "Pushkar Shinde"
              }
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}