import { Code, Palette, TestTube, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Skills() {
  const { t } = useTranslation()

  const skillCategories = [
    {
      icon: <Code className="w-8 h-8" aria-hidden="true" />,
      title: t('skills.categories.frontend'),
      skills: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'TanStack Query',
        'TanStack Router',
        'React Router',
        'Redux',
        'i18next',
        'WebSockets',
      ],
      color: 'cyan',
    },
    {
      icon: <Palette className="w-8 h-8" aria-hidden="true" />,
      title: t('skills.categories.styling'),
      skills: [
        'Tailwind CSS',
        'SCSS/SASS',
        'Styled Components',
        'CSS-in-JS',
        'MUI (Material UI)',
        'Responsive Design',
        'Mobile-First',
      ],
      color: 'purple',
    },
    {
      icon: <TestTube className="w-8 h-8" aria-hidden="true" />,
      title: t('skills.categories.testing'),
      skills: [
        'Jest',
        'Vitest',
        'React Testing Library',
        'PlayWright',
        'Unit Testing',
        'Integration Testing',
      ],
      color: 'green',
    },
    {
      icon: <Wrench className="w-8 h-8" aria-hidden="true" />,
      title: t('skills.categories.tools'),
      skills: [
        'Git',
        'GitHub',
        'MirageJS',
        'Jenkins',
        'Vite',
        'Figma',
        'RESTful APIs',
        'Firebase',
        'ApexCharts',
        'CI/CD',
      ],
      color: 'orange',
    },
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { icon: string; badge: string; border: string }> = {
      cyan: {
        icon: 'text-cyan-400',
        badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
        border: 'border-cyan-500/30',
      },
      purple: {
        icon: 'text-purple-400',
        badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
        border: 'border-purple-500/30',
      },
      green: {
        icon: 'text-green-400',
        badge: 'bg-green-500/10 text-green-300 border-green-500/20',
        border: 'border-green-500/30',
      },
      orange: {
        icon: 'text-orange-400',
        badge: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
        border: 'border-orange-500/30',
      },
    }
    return colors[color]
  }

  return (
    <section
      id="skills"
      className="py-20 px-6 bg-slate-800"
      aria-labelledby="skills-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="skills-title"
          className="text-4xl md:text-5xl font-black text-white mb-12 text-center"
        >
          {t('skills.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const colors = getColorClasses(category.color)
            return (
              <article
                key={index}
                className={`bg-slate-900/50 backdrop-blur-sm border ${colors.border} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={colors.icon}>{category.icon}</div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2" role="list">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${colors.badge} transition-all duration-200 hover:scale-105`}
                      role="listitem"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
