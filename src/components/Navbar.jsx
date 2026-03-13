import { Palette, Check, ChevronDown } from 'lucide-react'
import { useTheme, DESIGN_STYLES } from '../ThemeContext'
import Logo from './Logo'
import { useState, useRef, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const STYLE_META = {
  'minimalist':    { label: 'Minimalist',    swatch: '#e5e5e5', dot: '#171717' },
  'liquid-glass':  { label: 'Liquid Glass',  swatch: '#14121e', dot: '#a078ff' },
  'brutalist':     { label: 'Brutalist',     swatch: '#ffffff', dot: '#ff1e1e' },
  'dark-modern':   { label: 'Dark Modern',   swatch: '#08080c', dot: '#00dcb4' },
  'bento-grid':    { label: 'Bento Grid',    swatch: '#0f0f12', dot: '#ffb432' },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [styleMenuOpen, setStyleMenuOpen] = useState(false)

  const styleMenuRef = useRef(null)

  const { designStyle, setDesignStyle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (styleMenuRef.current && !styleMenuRef.current.contains(event.target)) {
        setStyleMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)

    const targetId = href.replace('#', '')
    const elem = document.getElementById(targetId)
    if (elem) {
      const top = elem.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    }
  }

  const handleStyleChange = (s) => {
    // Temporarily disable smooth scroll to instantly snap to top
    // eslint-disable-next-line react-hooks/immutability
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    
    // Restore smooth scroll after a tiny delay
    setTimeout(() => {
      // eslint-disable-next-line react-hooks/immutability
      document.documentElement.style.scrollBehavior = ''
    }, 50)

    setDesignStyle(s)
    setStyleMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-theme-bg/90 backdrop-blur border-b border-theme-border/50 shadow-sm'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, '#hero')}
          className="transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Logo />
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => handleSmoothScroll(e, l.href)}
                  className="font-mono text-xs text-theme-muted hover:text-theme-text tracking-wider uppercase transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Premium Design Style Picker */}
            <div className="relative flex items-center" ref={styleMenuRef}>
              <button
                onClick={() => setStyleMenuOpen(!styleMenuOpen)}
                aria-label="Select design style"
                className={`font-mono text-xs px-3 py-1.5 border flex items-center gap-2 transition-all duration-300 ${
                  styleMenuOpen
                    ? 'border-theme-accent text-theme-accent bg-theme-accent/10'
                    : 'border-theme-border text-theme-text bg-theme-bg/50 hover:border-theme-accent/50 hover:text-theme-accent hover:bg-theme-accent/5'
                }`}
                style={{ borderRadius: 'var(--btn-radius)' }}
              >
                <Palette size={14} />
                <span className="hidden sm:inline">{STYLE_META[designStyle]?.label || 'Style'}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${styleMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {styleMenuOpen && (
                <div
                  className="absolute top-full right-0 mt-3 w-56 border border-theme-border shadow-2xl overflow-hidden py-1.5 z-50 animate-fade-in !transition-none"
                  style={{
                    background: 'var(--color-bg-val)',
                    borderRadius: 'var(--card-radius)',
                  }}
                >
                  <div className="px-4 py-2 text-[10px] font-mono text-theme-muted uppercase tracking-widest border-b border-theme-border/50 mb-1 opacity-70">
                    Choose your Design
                  </div>
                  {DESIGN_STYLES.map((s) => {
                    const meta = STYLE_META[s]
                    const isActive = designStyle === s
                    return (
                      <button
                        key={s}
                        onClick={() => handleStyleChange(s)}
                        className={`w-full text-left px-4 py-2.5 text-xs font-mono flex items-center justify-between transition-colors ${
                          isActive
                            ? 'text-theme-text bg-theme-accent/10'
                            : 'text-theme-muted hover:bg-theme-accent/5 hover:text-theme-text'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Clean Radio Button UI */}
                          <div 
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                              isActive ? 'border-theme-accent' : 'border-theme-muted'
                            }`}
                          >
                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-theme-accent" />}
                          </div>
                          
                          <span className={isActive ? 'font-bold' : ''}>{meta.label}</span>
                        </div>
                        
                        {/* Mini dual-color swatch preview */}
                        <div 
                          className="flex h-3 w-6 rounded-sm overflow-hidden border border-theme-border opacity-70" 
                          title="Theme Preview"
                        >
                          <div className="flex-1" style={{ background: meta.swatch }} />
                          <div className="flex-1" style={{ background: meta.dot }} />
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-theme-muted hover:text-theme-text transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-px bg-current transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-current transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-theme-bg border-b border-theme-border px-6 pb-4 shadow-xl">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => handleSmoothScroll(e, l.href)}
                  className="font-mono text-xs text-theme-muted hover:text-theme-text tracking-wider uppercase transition-colors block py-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
