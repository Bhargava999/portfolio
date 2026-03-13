import { useTheme } from '../ThemeContext'

export default function Footer() {
  const { designStyle } = useTheme()
  const isBrutalist = designStyle === 'brutalist'

  return (
    <footer className={`py-8 px-6 max-w-5xl mx-auto ${isBrutalist ? 'border-t-[3px] border-theme-text' : 'border-t border-theme-border/50'}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className={`font-mono text-xs text-theme-muted flex items-center gap-2 ${isBrutalist ? 'font-bold uppercase' : ''}`}>
          <span className="text-theme-accent">{'>'}</span>
          <span className="font-signature text-xl normal-case font-[200] font-custom-variations text-theme-text">Bhargava Mamidisetti</span>
          <span>© {new Date().getFullYear()}</span>
        </p>
        <p className={`font-mono text-xs text-theme-muted ${isBrutalist ? 'font-bold uppercase' : ''}`}>
          Full Stack .NET Developer
        </p>
      </div>
    </footer>
  )
}
