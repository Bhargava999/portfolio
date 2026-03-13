import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    index: '01',
    title: 'Enterprise Workforce Management ERP',
    description: 'Backend system supporting workforce operations for 100,000+ workers across 80 factory locations. Built with ASP.NET Core and PostgreSQL.',
    tags: ['ASP.NET Core', 'PostgreSQL', 'C#', 'REST API'],
  },
  {
    index: '02',
    title: 'Online Assessment Platform',
    description: 'Online testing platform for MCQ exams and coding assessments. Supports multiple concurrent test sessions.',
    tags: ['ASP.NET Core', 'React', 'MSSQL', 'EF Core'],
  },
  {
    index: '03',
    title: 'Education ERP',
    description: 'Manages student admissions, attendance, and academic reports for multiple institutions.',
    tags: ['ASP.NET Core', 'PostgreSQL', 'React', 'C#'],
  },
  {
    index: '04',
    title: 'API Testing Platform',
    description: 'Reads OpenAPI specs and auto-generates test suites for every endpoint. Cuts down on writing tests by hand.',
    tags: ['C#', 'OpenAPI', 'ASP.NET Core', 'Automation'],
  },
]

function ProjectCard({ project, designStyle, idx }) {
  const isBrutalist = designStyle === 'brutalist'
  const isBento = designStyle === 'bento-grid'
  const isCard = ['liquid-glass', 'dark-modern', 'bento-grid'].includes(designStyle)

  // Bento grid: first project spans full width
  const bentoSpan = isBento && idx === 0 ? 'sm:col-span-2' : ''

  const cardClasses = isCard
    ? 'theme-card'
    : isBrutalist
      ? 'border-[3px] border-theme-text'
      : 'border border-theme-border bg-theme-bg/40 backdrop-blur-sm'

  return (
    <div className={`project-card glass-panel opacity-0 group p-6 hover:border-theme-accent/50 transition-all duration-300 hover:bg-theme-accent/5 ${cardClasses} ${bentoSpan}`}>
      <span className={`font-mono text-xs text-theme-muted mb-4 block ${isBrutalist ? 'font-bold' : ''}`}>{project.index}</span>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className={`font-mono text-sm text-theme-text leading-snug group-hover:text-theme-accent transition-colors duration-200 ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>
          {project.title}
        </h3>
        <ArrowUpRight size={16} className="text-theme-muted group-hover:text-theme-accent flex-shrink-0 mt-0.5 transition-colors duration-200" />
      </div>
      <p className="text-xs text-theme-muted leading-relaxed mb-5 font-mono">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className={`font-mono text-xs text-theme-muted border border-theme-border px-2 py-0.5 bg-theme-bg/50 ${isBrutalist ? 'border-[2px] border-theme-text font-bold' : isCard ? 'rounded-md' : ''}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const containerRef = useRef(null)
  const { designStyle } = useTheme()

  useGSAP(() => {
    gsap.fromTo(
      '.projects-header > *',
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
      '.project-card',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          once: true,
        }
      }
    )
  }, { scope: containerRef })

  const isBrutalist = designStyle === 'brutalist'
  const isBento = designStyle === 'bento-grid'

  // Bento Grid: full-width section with cards in a bento layout
  if (isBento) {
    return (
      <section id="projects" ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
        <div className="projects-header mb-8">
          <p className="font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0">03</p>
          <h2 className="font-mono text-2xl font-light text-theme-text opacity-0">Projects</h2>
        </div>
        <div className="projects-grid grid sm:grid-cols-2 gap-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} project={p} designStyle={designStyle} idx={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="projects" ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div className="projects-header">
          {isBrutalist && <div className="w-10 h-1.5 bg-theme-accent mb-3" />}
          <p className={`font-mono text-xs text-theme-accent tracking-widest uppercase mb-2 opacity-0 ${isBrutalist ? 'font-bold' : ''}`}>03</p>
          <h2 className={`font-mono text-2xl text-theme-text opacity-0 ${isBrutalist ? 'font-bold uppercase' : 'font-light'}`}>Projects</h2>
        </div>
        <div className="projects-grid grid sm:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} project={p} designStyle={designStyle} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
