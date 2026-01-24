// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Pushkar Shinde - Full Stack Developer | ML Engineer | GenAI Engineer',
    template: '%s | Pushkar Shinde'
  },
  description: 'Hi, I am Pushkar Shinde - Full Stack Developer & ML Engineer from India. I specialize in Python, React, TypeScript, AI/ML, GenAI, and LangChain. Building intelligent solutions that simplify the world through software.',
  keywords: [
    'Pushkar',
    'Pushkar Shinde',
    'Pushkar Amar Shinde',
    'pushkar shinde',
    'pushkar developer',
    'pushkar portfolio',
    'pushkar ml engineer',
    'pushkar ai developer',
    'Full Stack Developer',
    'ML Engineer',
    'GenAI Engineer',
    'Machine Learning Engineer',
    'AI Developer',
    'Python Developer',
    'React Developer',
    'TypeScript Developer',
    'FastAPI Developer',
    'LangChain Developer',
    'Vector Database',
    'MongoDB',
    'Firebase',
    'Deep Learning',
    'GenAI Applications',
    'AI Chatbot',
    'Portfolio',
    'Software Engineer',
    'Web Developer',
    'Artificial Intelligence',
    'India Developer',
    'Indian Software Engineer'
  ],
  authors: [{ name: 'Pushkar Shinde', url: 'https://pushkarshinde.in' }],
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
    title: 'Pushkar Shinde - Full Stack Developer | ML Engineer | GenAI Engineer',
    description: 'Hi, I am Pushkar Shinde! Full Stack Developer & ML Engineer specializing in Python, React, AI/ML, GenAI, and LangChain. Building intelligent solutions that simplify the world through software.',
    siteName: 'Pushkar Shinde Portfolio',
    images: [
      {
        url: 'https://pushkarshinde.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pushkar Shinde - Full Stack Developer & ML Engineer',
        type: 'image/jpeg',
      },
      {
        url: 'https://pushkarshinde.in/photo.png',
        width: 400,
        height: 400,
        alt: 'Pushkar Shinde Profile Photo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pushkar Shinde - Full Stack Developer | ML Engineer | GenAI Engineer',
    description: 'Hi, I am Pushkar Shinde! Full Stack Developer & ML Engineer specializing in Python, React, AI/ML, GenAI, and LangChain.',
    images: ['https://pushkarshinde.in/og-image.jpg'],
    creator: '@pushkarshinde',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'nL7ExTHwkt8e6J4GDZAMXJQmXUhn_VCort89FNljb3U',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
      },
    ],
  },
  category: 'technology',
  classification: 'Portfolio Website',
  referrer: 'origin-when-cross-origin',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Pushkar Shinde',
    'application-name': 'Pushkar Shinde Portfolio',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
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
        
        {/* WhatsApp & Social Media Preview */}
        <meta property="og:image:secure_url" content="https://pushkarshinde.in/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_IN" />
        
        {/* Additional Social Tags */}
        <meta name="author" content="Pushkar Shinde" />
        <meta name="copyright" content="Pushkar Shinde" />
        <meta name="subject" content="Portfolio of Pushkar Shinde - Full Stack Developer & ML Engineer" />
        <meta name="url" content="https://pushkarshinde.in" />
        <meta name="identifier-URL" content="https://pushkarshinde.in" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="20.5937, 78.9629" />
        
        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://pushkarshinde.in/#person",
              "name": "Pushkar Shinde",
              "givenName": "Pushkar",
              "familyName": "Shinde",
              "alternateName": ["Pushkar Amar Shinde", "Pushkar", "pushkar shinde"],
              "jobTitle": ["Full Stack Developer", "ML Engineer", "GenAI Engineer"],
              "description": "Full Stack Developer & ML Engineer specializing in Python, React, AI/ML, GenAI, and LangChain. Building intelligent solutions that simplify the world through software.",
              "url": "https://pushkarshinde.in",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://pushkarshinde.in"
              },
              "image": {
                "@type": "ImageObject",
                "url": "https://pushkarshinde.in/og-image.jpg",
                "width": 1200,
                "height": 630,
                "caption": "Pushkar Shinde - Full Stack Developer & ML Engineer"
              },
              "sameAs": [
                "https://github.com/Pushkar3232/",
                "https://www.linkedin.com/in/pushkarshinde/"
              ],
              "nationality": {
                "@type": "Country",
                "name": "India"
              },
              "knowsAbout": [
                "Python",
                "React",
                "TypeScript",
                "Firebase",
                "FastAPI",
                "MongoDB",
                "Machine Learning",
                "Deep Learning",
                "LangChain",
                "Vector Databases",
                "GenAI Applications",
                "AI Chatbot Development",
                "Web Development",
                "Full Stack Development",
                "Artificial Intelligence"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Full Stack Developer & ML Engineer",
                "description": "Developing full-stack applications and machine learning solutions using Python, React, and AI technologies",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "India"
                },
                "skills": [
                  "Python", "React", "TypeScript", "Firebase", "FastAPI", 
                  "MongoDB", "Machine Learning", "Deep Learning", "LangChain", 
                  "Vector Databases", "GenAI Applications"
                ]
              }
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
              "@id": "https://pushkarshinde.in/#website",
              "name": "Pushkar Shinde Portfolio",
              "alternateName": ["Pushkar Shinde", "Pushkar Portfolio", "Pushkar Developer Portfolio"],
              "url": "https://pushkarshinde.in",
              "description": "Portfolio website of Pushkar Shinde - Full Stack Developer, ML Engineer & GenAI Engineer",
              "inLanguage": "en-US",
              "author": {
                "@type": "Person",
                "@id": "https://pushkarshinde.in/#person"
              },
              "publisher": {
                "@type": "Person",
                "@id": "https://pushkarshinde.in/#person"
              },
              "copyrightHolder": {
                "@type": "Person",
                "name": "Pushkar Shinde"
              },
              "copyrightYear": 2024
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
              "@id": "https://pushkarshinde.in/#profilepage",
              "dateCreated": "2024-01-01T00:00:00Z",
              "dateModified": "2026-01-24T00:00:00Z",
              "mainEntity": {
                "@type": "Person",
                "@id": "https://pushkarshinde.in/#person"
              }
            })
          }}
        />

        {/* BreadcrumbList for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://pushkarshinde.in"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About Pushkar Shinde",
                  "item": "https://pushkarshinde.in/#about"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Projects",
                  "item": "https://pushkarshinde.in/#projects"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Contact",
                  "item": "https://pushkarshinde.in/#contact"
                }
              ]
            })
          }}
        />

        {/* Software Application Structured Data for Projects */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Private AI",
              "description": "Offline AI chatbot for corporate use. Fine-tuned for domain-specific answers.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "author": {
                "@type": "Person",
                "name": "Pushkar Shinde"
              },
              "programmingLanguage": ["Python", "React", "TypeScript"],
              "runtimePlatform": "FastAPI",
              "codeRepository": "https://github.com/Pushkar3232/Private-AI/"
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