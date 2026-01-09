import { useTranslation } from 'react-i18next'
import { GitPullRequest, ExternalLink, Landmark } from 'lucide-react'

interface ProjectCardProps {
  href: string
  icon: React.ReactNode
  badge: string
  title: string
  description: string
  linkText: string
}

function ProjectCard({
  href,
  icon,
  badge,
  title,
  description,
  linkText,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
              {badge}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
            <span>{linkText}</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section
      id="projects"
      className="py-20 px-6 bg-slate-900"
      aria-labelledby="projects-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="projects-title"
          className="text-4xl md:text-5xl font-black text-white mb-12 text-center"
        >
          {t('projects.title')}
        </h2>

        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <ProjectCard
            href="https://github.com/destaquesgovbr/portal"
            icon={
              <Landmark className="w-6 h-6 text-cyan-400" aria-hidden="true" />
            }
            badge={t('projects.government')}
            title={t('projects.inspire.title')}
            description={t('projects.inspire.description')}
            linkText="destaquesgovbr/portal"
          />

          <ProjectCard
            href="https://github.com/kamranahmedse/developer-roadmap/issues/9420"
            icon={
              <GitPullRequest
                className="w-6 h-6 text-cyan-400"
                aria-hidden="true"
              />
            }
            badge={t('projects.contribution')}
            title={t('projects.roadmap.title')}
            description={t('projects.roadmap.description')}
            linkText="roadmap.sh"
          />
        </div>
      </div>
    </section>
  )
}
