// app/page.tsx
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      {/* Uncomment when available */}
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
