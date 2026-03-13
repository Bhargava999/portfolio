import { useTheme } from '../ThemeContext'

export default function Logo() {
  const { designStyle } = useTheme()

  const isBrutalist = designStyle === 'brutalist'

  return (
    <div className="flex flex-col pt-1 pb-1 group cursor-pointer selection:bg-transparent">
      <div 
        className={`font-signature text-3xl sm:text-[2.2rem] leading-none text-theme-text transition-colors duration-300 group-hover:text-theme-accent pl-1 font-[200] font-custom-variations`}
        style={{ transform: 'none' }}
      >
        Bhargava
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className={`h-px w-5 bg-theme-accent transition-all duration-500 group-hover:w-8 ${isBrutalist ? 'h-[2px]' : ''}`}></span>
        <span className={`font-mono text-[9px] sm:text-[10px] whitespace-nowrap leading-none text-theme-muted uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-theme-text ${isBrutalist ? 'font-bold tracking-[0.2em]' : ''}`}>
          Full Stack .NET Developer
        </span>
      </div>
    </div>
  )
}
