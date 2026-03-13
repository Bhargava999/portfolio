/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const DESIGN_STYLES = [
  'minimalist',
  'liquid-glass',
  'brutalist',
  'dark-modern',
  'bento-grid',
]

// Hard-coded colors matching each style for favicon SVG generation
const STYLE_COLORS = {
  'minimalist':  { text: '#171717', bg: '#fcfcfc', accent: '#262626' },
  'liquid-glass':{ text: '#ebebfa', bg: '#14121e', accent: '#a078ff' },
  'brutalist':   { text: '#ff1e1e', bg: '#ffffff', accent: '#ff1e1e' },
  'dark-modern': { text: '#00dcb4', bg: '#08080c', accent: '#00dcb4' },
  'bento-grid':  { text: '#ffb432', bg: '#0f0f12', accent: '#ffb432' },
}

export function ThemeProvider({ children }) {
  const [designStyle, setDesignStyle] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('design-style')
      if (saved && DESIGN_STYLES.includes(saved)) {
        // Apply class before React hydrates to prevent flash
        const root = document.documentElement
        DESIGN_STYLES.forEach(s => root.classList.remove(`style-${s}`))
        root.classList.add(`style-${saved}`)
        return saved
      }
    }
    return 'minimalist'
  })

  useEffect(() => {
    const root = document.documentElement

    // Clean up all style classes
    DESIGN_STYLES.forEach(s => root.classList.remove(`style-${s}`))

    // Apply active style class
    root.classList.add(`style-${designStyle}`)

    // Persist
    localStorage.setItem('design-style', designStyle)

    // Dynamic Favicon Generation
    const c = STYLE_COLORS[designStyle] || STYLE_COLORS['minimalist']
    const isBrutalist = designStyle === 'brutalist'
    const isRounded = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
    
    const rx = isBrutalist ? '0' : isRounded ? '24' : '8'
    const fontWeight = isBrutalist ? '900' : '700'
    const strokeWidth = isBrutalist ? '8' : '0'
    const bgFill = isBrutalist ? c.bg : c.accent
    const textFill = isBrutalist ? c.text : c.bg
    const strokeAttr = isBrutalist ? `stroke="${c.text}" stroke-width="${strokeWidth}"` : ''

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="90" height="90" x="5" y="5" rx="${rx}" fill="${bgFill}" ${strokeAttr} />
        <text x="50" y="52" 
              font-family="monospace, sans-serif" 
              font-size="55" 
              font-weight="${fontWeight}" 
              fill="${textFill}" 
              text-anchor="middle" 
              dominant-baseline="central">B</text>
      </svg>
    `.trim()

    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    // Update favicon
    let link = document.querySelector("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = url

    return () => URL.revokeObjectURL(url)
  }, [designStyle])

  return (
    <ThemeContext.Provider value={{ designStyle, setDesignStyle, DESIGN_STYLES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
