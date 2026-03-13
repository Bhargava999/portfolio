import { useRef } from 'react'
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../ThemeContext'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef(null)
  const { designStyle } = useTheme()

  useGSAP(() => {
    gsap.fromTo(
      '.contact-header > *',
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
      '.contact-desc',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-desc',
          start: 'top 90%',
          once: true,
        }
      }
    )

    gsap.fromTo(
      '.contact-link',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-links',
          start: 'top 90%',
          once: true,
        }
      }
    )
  }, { scope: containerRef })

  const isBrutalist = designStyle === 'brutalist'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
  const isBento = designStyle === 'bento-grid'

  const linkClass = isCard
    ? 'contact-link theme-card group flex items-center justify-between px-5 py-4 hover:border-theme-accent/50 transition-all duration-300 opacity-0'
    : isBrutalist
      ? 'contact-link group flex items-center justify-between border-[3px] border-theme-text px-5 py-4 hover:bg-theme-accent hover:border-theme-accent hover:text-theme-bg transition-all duration-300 opacity-0'
      : 'contact-link group flex items-center justify-between border border-theme-border px-5 py-4 hover:border-theme-accent/50 hover:bg-theme-accent/5 bg-theme-bg/50 transition-all duration-200 opacity-0'

  const contactLinks = (
    <div className={`contact-links ${isBento ? 'grid sm:grid-cols-2 gap-3' : 'space-y-4'}`}>
      <a href="mailto:bhargava.mm111@gmail.com" className={linkClass}>
        <div className="flex items-center gap-4">
          <Mail size={15} className="text-theme-accent" />
          <div>
            <p className={`font-mono text-xs text-theme-muted uppercase tracking-wide mb-0.5 ${isBrutalist ? 'font-bold' : ''}`}>Email</p>
            <p className="font-mono text-xs text-theme-text group-hover:text-theme-accent transition-colors">
              bhargava.mm111@gmail.com
            </p>
          </div>
        </div>
        <ArrowUpRight size={14} className="text-theme-muted group-hover:text-theme-accent transition-colors" />
      </a>

      <a
        href="https://www.linkedin.com/in/bhargavamanikantam"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <div className="flex items-center gap-4">
          <Linkedin size={15} className="text-theme-accent" />
          <div>
            <p className={`font-mono text-xs text-theme-muted uppercase tracking-wide mb-0.5 ${isBrutalist ? 'font-bold' : ''}`}>LinkedIn</p>
            <p className="font-mono text-xs text-theme-text group-hover:text-theme-accent transition-colors">
              /in/bhargavamanikantam
            </p>
          </div>
        </div>
        <ArrowUpRight size={14} className="text-theme-muted group-hover:text-theme-accent transition-colors" />
      </a>
    </div>
  )

  // Bento: full-width card approach
  if (isBento) {
    return (
      <section id="contact" ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
        <div className="theme-card p-8 sm:p-10">
          <div className="contact-header mb-8">
            <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0">06</p>
            <h2 className="font-mono text-2xl font-light text-theme-text opacity-0">Contact</h2>
          </div>
          <p className="contact-desc font-mono text-xs text-theme-muted leading-relaxed mb-6 opacity-0">
            Open to opportunities. I usually reply within a day.
          </p>
          {contactLinks}
        </div>
      </section>
    )
  }

  return (
    <section id="contact" ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div className="contact-header">
          {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
          <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0 ${isBrutalist ? 'font-bold' : ''}`}>06</p>
          <h2 className={`font-mono text-2xl text-theme-text opacity-0 ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>Contact</h2>
        </div>

        <div>
          <p className="contact-desc font-mono text-xs text-theme-muted leading-relaxed mb-8 opacity-0">
            Open to opportunities. I usually reply within a day.
          </p>
          {contactLinks}
        </div>
      </div>
    </section>
  )
}
