import { useTheme } from '../ThemeContext'

export default function Divider() {
  const { designStyle } = useTheme()
  const isBrutalist = designStyle === 'brutalist'
  const isBento = designStyle === 'bento-grid'

  // Bento Grid: more space, no visible divider
  if (isBento) {
    return <div className="max-w-5xl mx-auto px-6"><div className="h-2" /></div>
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className={isBrutalist ? 'h-[3px] bg-theme-text' : 'h-px bg-theme-border/60'} />
    </div>
  )
}
