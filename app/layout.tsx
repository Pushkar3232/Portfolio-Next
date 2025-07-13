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
        url: '/og-image.jpg', // This should be your main profile/portfolio image
        width: 1200,
        height: 630,
        alt: 'Pushkar Shinde - Full Stack Developer Portfolio',
      },
      {
        url: '/og-image-square.jpg', // Optional: square version for some platforms
        width: 1200,
        height: 1200,
        alt: 'Pushkar Shinde - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pushkar Shinde - Full Stack Developer & Software Engineer',
    description: 'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    images: ['/og-image.jpg'],
    creator: '@your_twitter_handle', // Replace with your Twitter handle
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
    google: 'nL7ExTHwkt8e6J4GDZAMXJQmXUhn_VCort89FNljb3U', // Add your actual Google verification code
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
        {/* Primary favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
              "image": "https://pushkarshinde.in/og-image.jpg",
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

        {/* Professional Profile Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "dateCreated": new Date().toISOString(),
              "dateModified": new Date().toISOString(),
              "mainEntity": {
                "@type": "Person",
                "name": "Pushkar Shinde",
                "alternateName": "Pushkar Amar Shinde",
                "description": "Full Stack Developer & Software Engineer",
                "image": "https://pushkarshinde.in/og-image.jpg",
                "url": "https://pushkarshinde.in"
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