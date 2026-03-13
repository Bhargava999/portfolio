import { Mail, Linkedin, ArrowUpRight } from 'lucide-react'
import { useTheme } from '../ThemeContext'

export default function Contact() {
  const { designStyle } = useTheme()

  const isBrutalist = designStyle === 'brutalist'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
  const isBento = designStyle === 'bento-grid'

  const linkClass = isCard
    ? 'theme-card group flex items-center justify-between px-5 py-4 hover:border-theme-accent/50 transition-all duration-300'
    : isBrutalist
      ? 'group flex items-center justify-between border-[3px] border-theme-text px-5 py-4 hover:bg-theme-accent hover:border-theme-accent hover:text-theme-bg transition-all duration-300'
      : 'group flex items-center justify-between border border-theme-border px-5 py-4 hover:border-theme-accent/50 hover:bg-theme-accent/5 bg-theme-bg/50 transition-all duration-200'

  const contactLinks = (
    <div className={isBento ? 'grid sm:grid-cols-2 gap-3' : 'space-y-4'}>
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
      <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="theme-card p-8 sm:p-10">
          <div className="mb-8">
            <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2">06</p>
            <h2 className="font-mono text-2xl font-light text-theme-text">Contact</h2>
          </div>
          <p className="font-mono text-xs text-theme-muted leading-relaxed mb-6">
            Open to new opportunities. Feel free to reach out directly — I respond within a day.
          </p>
          {contactLinks}
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
          <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 ${isBrutalist ? 'font-bold' : ''}`}>06</p>
          <h2 className={`font-mono text-2xl text-theme-text ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>Contact</h2>
        </div>

        <div>
          <p className="font-mono text-xs text-theme-muted leading-relaxed mb-8">
            Open to new opportunities. Feel free to reach out directly — I respond within a day.
          </p>
          {contactLinks}
        </div>
      </div>
    </section>
  )
}
