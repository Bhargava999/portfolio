import { useTheme } from '../ThemeContext'

const items = [
  'Built and maintained 300+ REST API endpoints supporting multiple enterprise platforms.',
  'Designed scalable backend systems in ASP.NET Core serving large-scale industrial operations.',
  'Worked across the full stack — from PostgreSQL schema design to React interfaces.',
  'Delivered four production enterprise platforms from development to deployment.',
]

export default function Experience() {
  const { designStyle } = useTheme()

  const isBrutalist = designStyle === 'brutalist'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
  const isBento = designStyle === 'bento-grid'

  const headerContent = (
    <div>
      {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
      <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 ${isBrutalist ? 'font-bold' : ''}`}>04</p>
      <h2 className={`font-mono text-2xl text-theme-text ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>Experience</h2>
    </div>
  )

  const timelineContent = (
    <div className={isCard ? 'theme-card p-6 sm:p-8' : 'relative'}>
      {/* Timeline line — hide for card styles since the card provides visual structure */}
      {!isCard && <div className="absolute left-0 top-0 bottom-0 w-px bg-theme-border hidden sm:block" />}

      <div className={`${isCard ? '' : 'sm:pl-8'} relative`}>
        {/* Timeline dot */}
        {!isCard && (
          <div className={`hidden sm:block absolute left-0 top-1.5 w-2 h-2 rounded-full bg-theme-accent -translate-x-[5px]`} />
        )}
        {isCard && (
          <div className="w-2 h-2 rounded-full bg-theme-accent mb-4" />
        )}

        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
          <div>
            <h3 className={`font-mono text-sm text-theme-text ${isBrutalist ? 'font-bold uppercase' : 'font-medium'}`}>Software Developer</h3>
            <p className="font-mono text-sm text-theme-accent mt-0.5">SoilSoft Technologies</p>
          </div>
          <span className={`font-mono text-xs text-theme-muted border border-theme-border px-3 py-1 whitespace-nowrap ${isCard ? 'rounded-md' : ''} ${isBrutalist ? 'border-[2px] border-theme-text font-bold' : ''}`}>
            Feb 2024 – Present
          </span>
        </div>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-xs font-mono text-theme-muted">
              <span className={`text-theme-accent mt-0.5 flex-shrink-0 ${isBrutalist ? 'font-bold' : ''}`}>
                {isBrutalist ? '▸' : '—'}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  // Bento: full-width card approach
  if (isBento) {
    return (
      <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="theme-card p-8 sm:p-10">
          <div className="mb-8">
            <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2">04</p>
            <h2 className="font-mono text-2xl font-light text-theme-text">Experience</h2>
          </div>
          {timelineContent}
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        {headerContent}
        {timelineContent}
      </div>
    </section>
  )
}
