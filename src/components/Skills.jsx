import { useRef } from 'react'
import {
  Server,
  Sparkles,
  Bot,
  MousePointerClick,
  Database,
  DatabaseZap,
  ServerCog,
  Globe,
  GitBranch,
  Github,
  Monitor,
  Cpu,
  Layers,
  FileCode,
  Palette,
  Atom,
  Workflow,
  TableProperties,
  Hash
} from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const skillIcons = {
  'ASP.NET Core': <Server size={18} />,
  'C#': <Hash size={18} />,
  'REST APIs': <Globe size={18} />,
  'Entity Framework Core': <Workflow size={18} />,
  'PostgreSQL': <DatabaseZap size={18} />,
  'MSSQL': <ServerCog size={18} />,
  'Stored Procedures': <TableProperties size={18} />,
  'React': <Atom size={18} />,
  'HTML': <FileCode size={18} />,
  'Tailwind CSS': <Palette size={18} />,
  'Git': <GitBranch size={18} />,
  'GitHub': <Github size={18} />,
  'Visual Studio': <Monitor size={18} />,
  'Antigravity': <Sparkles size={18} />,
  'Claude Code': <Bot size={18} />,
  'Cursor': <MousePointerClick size={18} />,
}

const skillGroups = [
  { category: 'Backend', skills: ['ASP.NET Core', 'C#', 'REST APIs', 'Entity Framework Core'] },
  { category: 'Database', skills: ['PostgreSQL', 'MSSQL', 'Stored Procedures'] },
  { category: 'Frontend', skills: ['React', 'HTML', 'Tailwind CSS'] },
  { category: 'Tools', skills: ['Git', 'GitHub', 'Visual Studio', 'Antigravity', 'Claude Code', 'Cursor'] },
]

export default function Skills() {
  const containerRef = useRef(null)
  const { designStyle } = useTheme()

  useGSAP(() => {
    gsap.fromTo(
      '.skill-item',
      { opacity: 0, x: -20, rotateY: 90 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )
  }, { scope: containerRef })

  const isBrutalist = designStyle === 'brutalist'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)
  const isBento = designStyle === 'bento-grid'

  // Bento: full-width card with internal grid of category tiles
  if (isBento) {
    return (
      <section id="skills" ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
        <div className="theme-card p-8 sm:p-10">
          <div className="mb-8">
            <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2">02</p>
            <h2 className="font-mono text-2xl font-light text-theme-text">Skills</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {skillGroups.map((group) => (
              <div key={group.category} className="theme-card p-5">
                <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-5 flex items-center gap-2">
                  <Layers size={14} /> {group.category}
                </p>
                <ul className="space-y-3">
                  {group.skills.map((skill) => (
                    <li key={skill} className="skill-item flex items-center gap-4 text-theme-muted text-sm group cursor-default">
                      <div className="text-theme-muted group-hover:text-theme-accent transition-colors duration-300 transform group-hover:-translate-y-1 group-hover:scale-110">
                        {skillIcons[skill] || <Settings size={18} />}
                      </div>
                      <span className="group-hover:text-theme-text transition-colors duration-200 font-mono relative overflow-hidden">
                        {skill}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-theme-accent group-hover:w-full transition-all duration-300" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
          <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 ${isBrutalist ? 'font-bold' : ''}`}>02</p>
          <h2 className={`font-mono text-2xl text-theme-text ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>Skills</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
          {skillGroups.map((group) => (
            <div key={group.category} className={isCard ? 'theme-card p-5' : isBrutalist ? 'border-l-[3px] border-theme-text pl-4' : ''}>
              <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-6 flex items-center gap-2 ${isBrutalist ? 'font-bold' : ''}`}>
                <Layers size={14} /> {group.category}
              </p>
              <ul className="space-y-4">
                {group.skills.map((skill) => (
                  <li key={skill} className="skill-item flex items-center gap-4 text-theme-muted text-sm group cursor-default">
                    <div className="text-theme-muted group-hover:text-theme-accent transition-colors duration-300 transform group-hover:-translate-y-1 group-hover:scale-110">
                      {skillIcons[skill] || <Settings size={18} />}
                    </div>
                    <span className="group-hover:text-theme-text transition-colors duration-200 font-mono relative overflow-hidden">
                      {skill}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-theme-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
