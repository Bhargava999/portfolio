import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const DESIGN_STYLES = [
  'minimalist',
  'liquid-glass',
  'brutalist',
  'dark-modern',
  'bento-grid',
]

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
  }, [designStyle])

  return (
    <ThemeContext.Provider value={{ designStyle, setDesignStyle, DESIGN_STYLES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
