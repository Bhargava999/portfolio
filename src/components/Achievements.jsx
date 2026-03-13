import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  { metric: '300+', label: 'REST APIs developed', detail: 'Across multiple enterprise-grade production platforms' },
  { metric: '100K+', label: 'Workers supported', detail: 'Workforce management system spanning 80 factory locations' },
  { metric: '4', label: 'Enterprise platforms delivered', detail: 'From workforce ERP to education systems and API tooling' },
]

export default function Achievements() {
  const containerRef = useRef(null)
  const { designStyle } = useTheme()

  useGSAP(() => {
    gsap.fromTo(
      '.ach-header > *',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        }
      }
    )

    gsap.fromTo(
      '.ach-item',
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.ach-grid',
          start: 'top 85%',
          once: true,
        }
      }
    )
  }, { scope: containerRef })

  const isBrutalist = designStyle === 'brutalist'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
  const isBento = designStyle === 'bento-grid'

  // Bento: achievements as individual tiles
  if (isBento) {
    return (
      <section ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
        <div className="ach-header mb-8">
          <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0">05</p>
          <h2 className="font-mono text-2xl font-light text-theme-text opacity-0">Achievements</h2>
        </div>
        <div className="ach-grid grid sm:grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div key={a.metric} className="ach-item theme-card p-6 flex flex-col items-center text-center opacity-0">
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
    <section ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div className="ach-header">
          {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
          <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0 ${isBrutalist ? 'font-bold' : ''}`}>05</p>
          <h2 className={`font-mono text-2xl text-theme-text opacity-0 ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>Achievements</h2>
        </div>

        {isCard ? (
          <div className="ach-grid grid sm:grid-cols-3 gap-3">
            {achievements.map((a) => (
              <div key={a.metric} className="ach-item theme-card p-5 opacity-0">
                <p className={`font-mono text-3xl text-theme-text mb-2 font-light`}>{a.metric}</p>
                <p className="font-mono text-sm text-theme-text font-medium mb-1">{a.label}</p>
                <p className="font-mono text-xs text-theme-muted leading-relaxed">{a.detail}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={`ach-grid divide-y ${isBrutalist ? 'divide-theme-text divide-y-[3px]' : 'divide-theme-border'}`}>
            {achievements.map((a) => (
              <div key={a.metric} className="ach-item py-6 flex flex-wrap items-start gap-8 first:pt-0 last:pb-0 opacity-0">
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
