import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '2+', label: 'Years experience' },
  { value: '300+', label: 'REST APIs built' },
  { value: '4', label: 'Enterprise platforms' },
]

export default function About() {
  const containerRef = useRef(null)
  const { designStyle } = useTheme()

  useGSAP(() => {
    gsap.fromTo(
      '.about-header > *',
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
      '.about-content > p',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 85%',
          once: true,
        }
      }
    )

    gsap.fromTo(
      '.about-stat',
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.about-stats-container',
          start: 'top 90%',
          once: true,
        }
      }
    )
  }, { scope: containerRef })

  const isBrutalist = designStyle === 'brutalist'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
  const isBento = designStyle === 'bento-grid'

  return (
    <section id="about" ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
      {/* Bento Grid: wrap entire section in a card */}
      {isBento ? (
        <div className="theme-card p-8 sm:p-10">
          <div className="about-header mb-8">
            <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0">01</p>
            <h2 className="font-mono text-2xl font-light text-theme-text opacity-0">About</h2>
          </div>

          <div className="about-content space-y-5">
            <AboutParagraphs />
          </div>

          <div className="about-stats-container grid grid-cols-3 gap-3 pt-8 mt-8 border-t border-theme-border/30">
            {stats.map((s) => (
              <div key={s.label} className="about-stat theme-card p-4 text-center opacity-0">
                <p className="font-mono text-2xl text-theme-text font-light mb-1">{s.value}</p>
                <p className="font-mono text-xs text-theme-muted tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div className="about-header">
            {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
            <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0 ${isBrutalist ? 'font-bold' : ''}`}>01</p>
            <h2 className={`font-mono text-2xl text-theme-text opacity-0 ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>About</h2>
          </div>

          <div className={isCard ? 'theme-card p-6 sm:p-8' : ''}>
            <div className="about-content space-y-5">
              <AboutParagraphs />
            </div>

            <div className={`about-stats-container grid grid-cols-3 gap-6 pt-6 border-t ${isBrutalist ? 'border-t-[3px] border-theme-text' : 'border-theme-border'}`}>
              {stats.map((s) => (
                <div key={s.label} className={`about-stat opacity-0 ${isCard ? 'theme-card p-3 text-center' : ''}`}>
                  <p className={`font-mono text-2xl text-theme-text mb-1 ${isBrutalist ? 'font-extrabold' : 'font-light'}`}>{s.value}</p>
                  <p className="font-mono text-xs text-theme-muted tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function AboutParagraphs() {
  return (
    <>
      <p className="text-theme-muted leading-relaxed text-sm opacity-0">
        I'm a Full Stack .NET Developer with{' '}
        <strong className="text-theme-text font-medium">2+ years</strong> of professional
        experience building enterprise-grade systems. My work centers on designing robust backend architectures
        using <strong className="text-theme-text font-medium">ASP.NET Core</strong> and{' '}
        <strong className="text-theme-text font-medium">C#</strong>, paired with{' '}
        <strong className="text-theme-text font-medium">PostgreSQL</strong> and{' '}
        <strong className="text-theme-text font-medium">MSSQL</strong> for reliable data persistence.
      </p>
      <p className="text-theme-muted leading-relaxed text-sm opacity-0">
        I've shipped four production enterprise platforms — spanning workforce management, education ERP,
        online assessment, and API testing tooling — serving operations at scale. On the frontend, I work
        with <strong className="text-theme-text font-medium">React</strong> and{' '}
        <strong className="text-theme-text font-medium">Tailwind CSS</strong> to build clean,
        functional interfaces that pair tightly with the APIs I build.
      </p>
      <p className="text-theme-muted leading-relaxed text-sm opacity-0">
        I care about clean architecture, maintainable codebases, and systems that hold up under real-world load.
      </p>
    </>
  )
}
