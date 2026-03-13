import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTheme } from '../ThemeContext'

const STYLE_NAMES = {
  'minimalist':  'Minimalist',
  'liquid-glass':'Liquid Glass',
  'brutalist':   'Brutalist',
  'dark-modern': 'Dark Modern',
  'bento-grid':  'Bento Grid',
}

// Hard-coded colors matching each style — bg + text + font
const STYLE_COLORS = {
  'minimalist':  { text: '#171717', bg: '#fcfcfc', font: "'Inter', sans-serif" },
  'liquid-glass':{ text: '#ebebfa', bg: '#14121e', font: "'Syne', sans-serif" },
  'brutalist':   { text: '#ff1e1e', bg: '#ffffff', font: "'Space Mono', monospace" },
  'dark-modern': { text: '#00dcb4', bg: '#08080c', font: "'Inter', sans-serif" },
  'bento-grid':  { text: '#ffb432', bg: '#0f0f12', font: "'Syne', sans-serif" },
}

export default function TerminalLoader({ onComplete }) {
  const { designStyle } = useTheme()
  const containerRef = useRef(null)

  const c = STYLE_COLORS[designStyle] ?? STYLE_COLORS['minimalist']

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const container = containerRef.current
    if (!container) return

    const textEl = container.querySelector('[data-loader-text]')

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      }
    })

    tl.fromTo(textEl,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .to({}, { duration: 0.4 })
    .to(textEl, { autoAlpha: 0, y: -20, duration: 0.4, ease: 'power3.in' })
    .to(container, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })

    return () => { document.body.style.overflow = '' }
  }, [onComplete])

  // Completely inline — zero Tailwind classes that could be overridden
  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: c.bg,
        transition: 'none',
      }}
    >
      <div
        data-loader-text
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          visibility: 'hidden',
          opacity: 0,
          transition: 'none',
        }}
      >
        {/* Icon */}
        <div style={{
          width: 48,
          height: 48,
          border: `2px solid ${c.text}`,
          borderRadius: 'var(--card-radius, 0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'none',
        }}>
          <div style={{
            width: 16,
            height: 16,
            backgroundColor: c.text,
            borderRadius: 'var(--btn-radius, 0)',
            transition: 'none',
          }} />
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center', transition: 'none' }}>
          <p style={{
            fontFamily: c.font,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: c.text,
            opacity: 0.6,
            marginBottom: 6,
            transition: 'none',
          }}>
            LOADING DESIGN
          </p>
          <p style={{
            fontFamily: c.font,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: c.text,
            transition: 'none',
          }}>
            {STYLE_NAMES[designStyle]}
          </p>
        </div>
      </div>
    </div>
  )
}
