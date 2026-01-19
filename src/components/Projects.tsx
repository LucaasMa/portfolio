import { useTranslation } from 'react-i18next'
import { GitPullRequest, ExternalLink, Landmark, Globe, Github } from 'lucide-react'

interface ProjectLink {
  href: string
  text: string
  icon?: React.ReactNode
}

interface ProjectCardProps {
  icon: React.ReactNode
  badge: string
  title: string
  description: string
  links: ProjectLink[]
}

function ProjectCard({
  icon,
  badge,
  title,
  description,
  links,
}: ProjectCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition-colors group">
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
          <div className="flex flex-wrap items-center gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
              >
                {link.icon}
                <span>{link.text}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
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
            icon={
              <Landmark className="w-6 h-6 text-cyan-400" aria-hidden="true" />
            }
            badge={t('projects.government')}
            title={t('projects.inspire.title')}
            description={t('projects.inspire.description')}
            links={[
              {
                href: 'https://github.com/destaquesgovbr/portal',
                text: 'GitHub',
                icon: <Github className="w-4 h-4" aria-hidden="true" />,
              },
              {
                href: 'https://destaquesgovbr-portal-klvx64dufq-rj.a.run.app/',
                text: 'Portal',
                icon: <Globe className="w-4 h-4" aria-hidden="true" />,
              },
            ]}
          />

          <ProjectCard
            icon={
              <GitPullRequest
                className="w-6 h-6 text-cyan-400"
                aria-hidden="true"
              />
            }
            badge={t('projects.contribution')}
            title={t('projects.roadmap.title')}
            description={t('projects.roadmap.description')}
            links={[
              {
                href: 'https://github.com/kamranahmedse/developer-roadmap/issues/9420',
                text: 'roadmap.sh',
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
