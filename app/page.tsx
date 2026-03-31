// app/page.tsx
'use client'

import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Hackathon from '../components/Hackathon'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-28 sm:pb-0">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Hackathon />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}