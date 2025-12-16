import { createFileRoute } from '@tanstack/react-router'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export const Route = createFileRoute('/')({ component: Portfolio })

function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
