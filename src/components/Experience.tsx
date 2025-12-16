import { useTranslation } from 'react-i18next'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

export default function Experience() {
  const { t } = useTranslation()

  const experiences = [
    {
      key: 'cpqd',
      technologies:
        'React, Next.js, TypeScript, TanStack Query, TanStack Router, SCSS, React Hook Form, Jest, Vitest, React Testing Library, MirageJS, i18next, WebSockets, Git, Jenkins',
    },
    {
      key: 'mmarketplaces',
      technologies:
        'React, TypeScript, Redux, React Router, Styled Components, Vite, Firebase, GitHub, Mercado Livre API, Bling API',
    },
    {
      key: 'hiit',
      technologies: 'React, JavaScript, CSS, MUI (Material UI)',
    },
  ]

  return (
    <section
      id="experience"
      className="py-20 px-6 bg-slate-900"
      aria-labelledby="experience-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="experience-title"
          className="text-4xl md:text-5xl font-black text-white mb-12 text-center"
        >
          {t('experience.title')}
        </h2>

        <div className="space-y-12">
          {experiences.map((exp) => (
            <article
              key={exp.key}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t(`experience.${exp.key}.position`)}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                      <span>{t(`experience.${exp.key}.company`)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                      <span>
                        {t(`experience.${exp.key}.location`)} (
                        {t(`experience.${exp.key}.type`)})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 whitespace-nowrap">
                  <Calendar className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span className="text-sm">{t(`experience.${exp.key}.period`)}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6" role="list">
                {(t(`experience.${exp.key}.description`, {
                  returnObjects: true,
                }) as string[]).map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-300 leading-relaxed flex gap-3"
                  >
                    <span className="text-cyan-400 mt-2 flex-shrink-0" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div>
                <h4 className="text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
                  Technologies
                </h4>
                <p className="text-gray-400 text-sm">{exp.technologies}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
