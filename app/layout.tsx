// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Pushkar Shinde - Full Stack Developer | ML Engineer | GenAI Engineer',
    template: '%s | Pushkar Shinde'
  },
  description: 'Pushkar Shinde - Full Stack Developer & ML Engineer specializing in Python, React, TypeScript, AI/ML, GenAI, and LangChain. Building intelligent solutions that simplify the world through software.',
  keywords: [
    'Pushkar Shinde',
    'Pushkar Amar Shinde',
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
    'Artificial Intelligence'
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
    title: 'Pushkar Shinde - Full Stack Developer | ML Engineer | GenAI Engineer',
    description: 'Full Stack Developer & ML Engineer specializing in Python, React, AI/ML, GenAI, and LangChain. Building intelligent solutions that simplify the world through software.',
    siteName: 'Pushkar Shinde Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pushkar Shinde - Full Stack Developer & ML Engineer Portfolio',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Pushkar Shinde - Full Stack Developer & ML Engineer',
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
    google: 'nL7ExTHwkt8e6J4GDZAMXJQmXUhn_VCort89FNljb3U',
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
              "jobTitle": ["Full Stack Developer", "ML Engineer", "GenAI Engineer"],
              "description": "Full Stack Developer & ML Engineer specializing in Python, React, AI/ML, GenAI, and LangChain. Building intelligent solutions that simplify the world through software.",
              "url": "https://pushkarshinde.in",
              "mainEntityOfPage": "https://pushkarshinde.in",
              "image": "https://pushkarshinde.in/og-image.jpg",
              "sameAs": [
                "https://github.com/Pushkar3232/"
              ],
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
                "estimatedSalary": {
                  "@type": "MonetaryAmount",
                  "currency": "INR",
                  "value": {
                    "@type": "QuantitativeValue",
                    "minValue": 500000,
                    "maxValue": 1500000,
                    "unitText": "YEAR"
                  }
                },
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
              "name": "Pushkar Shinde Portfolio",
              "alternateName": "Pushkar Shinde - AI Developer Portfolio",
              "url": "https://pushkarshinde.in",
              "description": "Portfolio website of Pushkar Shinde - Full Stack Developer, ML Engineer & GenAI Engineer",
              "author": {
                "@type": "Person",
                "name": "Pushkar Shinde"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://pushkarshinde.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
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
                "description": "Full Stack Developer, ML Engineer & GenAI Engineer - Building intelligent solutions",
                "image": "https://pushkarshinde.in/og-image.jpg",
                "url": "https://pushkarshinde.in",
                "worksFor": {
                  "@type": "Organization",
                  "name": "V2V EdTech LLP",
                  "description": "First job as Mentor"
                }
              }
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