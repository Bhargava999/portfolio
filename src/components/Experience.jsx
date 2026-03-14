import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const items = [
  'Built and maintained 300+ REST API endpoints across workforce management, education, assessment, and API testing platforms.',
  'Automated payroll processing with PostgreSQL stored procedures that calculate payments from attendance and overtime data imported via Excel.',
  'Implemented KYC based worker onboarding that validates Aadhaar, PAN, and bank details to catch duplicates before payroll runs.',
  'Integrated Judge0 for live code execution in the assessment platform; locked down exams with IP whitelisting and time restricted links.',
  'Worked across the full stack, from PostgreSQL schema design and stored procedures to EF Core and React frontends.',
]

export default function Experience() {
  const containerRef = useRef(null)
  const { designStyle } = useTheme()

  useGSAP(() => {
    gsap.fromTo(
      '.exp-header > *',
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
      '.exp-content',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.exp-content',
          start: 'top 85%',
          once: true,
        }
      }
    )

    gsap.fromTo(
      '.exp-item',
      { opacity: 0, x: -15 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.exp-content',
          start: 'top 80%',
          once: true,
        }
      }
    )
  }, { scope: containerRef })

  const isBrutalist = designStyle === 'brutalist'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
  const isBento = designStyle === 'bento-grid'

  const headerContent = (
    <div className="exp-header">
      {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
      <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0 ${isBrutalist ? 'font-bold' : ''}`}>04</p>
      <h2 className={`font-mono text-2xl text-theme-text opacity-0 ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>Experience</h2>
    </div>
  )

  const timelineContent = (
    <div className={`exp-content opacity-0 ${isCard ? 'theme-card p-6 sm:p-8' : 'relative'}`}>
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
            <li key={i} className="exp-item flex items-start gap-3 text-xs font-mono text-theme-muted opacity-0">
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
      <section id="experience" ref={containerRef} className="py-12 md:py-16 lg:py-20 px-6 max-w-5xl mx-auto">
        <div className="theme-card p-8 sm:p-10">
          <div className="exp-header mb-8">
            <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0">04</p>
            <h2 className="font-mono text-2xl font-light text-theme-text opacity-0">Experience</h2>
          </div>
          {timelineContent}
        </div>
      </section>
    )
  }

  return (
    <section id="experience" ref={containerRef} className="py-12 md:py-16 lg:py-20 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        {headerContent}
        {timelineContent}
      </div>
    </section>
  )
}
