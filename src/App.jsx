import { ThemeProvider, useTheme } from './ThemeContext'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Divider from './components/Divider'
import TerminalLoader from './components/TerminalLoader'

function AppContent() {
  const { designStyle } = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // When designStyle changes, show loader again and hide content
    setLoading(true)
  }, [designStyle])

  return (
    <div className="relative text-theme-text bg-theme-bg transition-colors duration-500 min-h-screen overflow-hidden">
      {/* Ambient Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen transition-opacity duration-500 hidden sm:block">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-theme-accent blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-theme-muted blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[70%] h-[60%] rounded-full bg-theme-border blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {loading && <TerminalLoader key={`loader-${designStyle}`} onComplete={() => setLoading(false)} />}

      <div className={`relative z-10 transition-opacity duration-700 delay-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        {/* Key on main ensures components remount and GSAP replays on theme switch */}
        <main key={`main-${designStyle}`}>
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Skills />
          <Divider />
          <Projects />
          <Divider />
          <Experience />
          <Divider />
          <Achievements />
          <Divider />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
