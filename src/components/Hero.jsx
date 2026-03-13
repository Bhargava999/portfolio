import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useTheme } from '../ThemeContext'

export default function Hero() {
  const containerRef = useRef(null)
  const { designStyle } = useTheme()

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(
      '.hero-intro',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      '.hero-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
      '-=0.4'
    )
    .fromTo(
      '.hero-subtitle-container',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.6'
    )
    .fromTo(
      '.hero-desc',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(
      '.hero-buttons > a',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.4'
    )
  }, { scope: containerRef })

  // Style-aware wrapper & card classes
  const isCard = ['liquid-glass', 'bento-grid', 'dark-modern'].includes(designStyle)
  const isBrutalist = designStyle === 'brutalist'

  const cardClass = isCard
    ? 'theme-card p-8 sm:p-12'
    : isBrutalist
      ? 'border-l-[6px] border-theme-accent pl-8'
      : ''

  const titleWeight = isBrutalist
    ? 'font-extrabold uppercase'
    : designStyle === 'minimalist'
      ? 'font-extralight'
      : 'font-light'

  const btnPrimary = `opacity-0 inline-flex items-center gap-2 px-6 py-3 bg-theme-accent text-theme-bg font-mono text-sm transition-all duration-300 hover:opacity-90`
    + (isBrutalist ? ' border-2 border-theme-text font-bold uppercase' : '')
    + (isCard ? ' rounded-btn' : '')

  const btnSecondary = `opacity-0 inline-flex items-center gap-2 px-6 py-3 border border-theme-border text-theme-muted font-mono text-sm hover:border-theme-text hover:text-theme-text transition-all duration-300`
    + (isBrutalist ? ' border-2 font-bold uppercase' : '')
    + (isCard ? ' rounded-btn' : '')

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto"
    >
      <div className={`pt-20 ${cardClass}`}>
        {/* Brutalist decorative accent */}
        {isBrutalist && (
          <div className="hero-intro w-16 h-2 bg-theme-accent mb-6" />
        )}

        <p className={`hero-intro font-mono text-xs text-theme-accent tracking-widest uppercase mb-6 opacity-0 ${isBrutalist ? 'font-bold text-sm' : ''}`}>
          Available for opportunities
        </p>

        <h1 className={`hero-title font-mono text-4xl sm:text-6xl lg:text-7xl ${titleWeight} text-theme-text leading-tight tracking-tight mb-4 opacity-0`}>
          Bhargava
          <br />
          <span className="text-theme-muted">Manikanta</span>
          <br />
          Mamidisetti
        </h1>

        <div className="hero-subtitle-container flex items-center gap-3 mb-6 opacity-0">
          <span className={`bg-theme-accent ${isBrutalist ? 'w-12 h-1' : 'w-8 h-px'}`} />
          <p className={`font-mono text-sm text-theme-muted tracking-wide ${isBrutalist ? 'font-bold uppercase' : ''}`}>
            Full Stack .NET Developer
          </p>
        </div>

        <p className="hero-desc text-base text-theme-muted max-w-xl leading-relaxed mb-12 opacity-0">
          Full Stack .NET Developer focused on scalable backend systems and enterprise platforms.
        </p>

        <div className="hero-buttons flex flex-wrap gap-4">
          <a href="#projects" className={btnPrimary}>
            View Work
          </a>
          <a href="#contact" className={btnSecondary}>
            Contact
          </a>
        </div>
      </div>

    </section>
  )
}
