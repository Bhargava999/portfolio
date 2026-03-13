import { useTheme } from '../ThemeContext'

const achievements = [
  { metric: '300+', label: 'REST APIs developed', detail: 'Across multiple enterprise-grade production platforms' },
  { metric: '100K+', label: 'Workers supported', detail: 'Workforce management system spanning 80 factory locations' },
  { metric: '4', label: 'Enterprise platforms delivered', detail: 'From workforce ERP to education systems and API tooling' },
]

export default function Achievements() {
  const { designStyle } = useTheme()

  const isBrutalist = designStyle === 'brutalist'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
  const isBento = designStyle === 'bento-grid'

  // Bento: achievements as individual tiles
  if (isBento) {
    return (
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2">05</p>
          <h2 className="font-mono text-2xl font-light text-theme-text">Achievements</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div key={a.metric} className="theme-card p-6 flex flex-col items-center text-center">
              <p className="font-mono text-4xl text-theme-accent font-light mb-2">{a.metric}</p>
              <p className="font-mono text-sm text-theme-text font-medium mb-1">{a.label}</p>
              <p className="font-mono text-xs text-theme-muted leading-relaxed">{a.detail}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
          <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 ${isBrutalist ? 'font-bold' : ''}`}>05</p>
          <h2 className={`font-mono text-2xl text-theme-text ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>Achievements</h2>
        </div>

        {isCard ? (
          <div className="grid sm:grid-cols-3 gap-3">
            {achievements.map((a) => (
              <div key={a.metric} className="theme-card p-5">
                <p className={`font-mono text-3xl text-theme-text mb-2 font-light`}>{a.metric}</p>
                <p className="font-mono text-sm text-theme-text font-medium mb-1">{a.label}</p>
                <p className="font-mono text-xs text-theme-muted leading-relaxed">{a.detail}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={`divide-y ${isBrutalist ? 'divide-theme-text divide-y-[3px]' : 'divide-theme-border'}`}>
            {achievements.map((a) => (
              <div key={a.metric} className="py-6 flex flex-wrap items-start gap-8 first:pt-0 last:pb-0">
                <div className="w-24 flex-shrink-0">
                  <p className={`font-mono text-3xl text-theme-text ${isBrutalist ? 'font-extrabold' : 'font-light'}`}>{a.metric}</p>
                </div>
                <div>
                  <p className={`font-mono text-sm text-theme-text mb-1 ${isBrutalist ? 'font-bold uppercase' : 'font-medium'}`}>{a.label}</p>
                  <p className="font-mono text-xs text-theme-muted leading-relaxed">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
