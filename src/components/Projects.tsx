import { useTranslation } from 'react-i18next'
import { Wrench, ArrowRight } from 'lucide-react'

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

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <Wrench className="w-10 h-10 text-cyan-400" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('projects.comingSoon')}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t('projects.description')}
            </p>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-medium">
              <span>Stay tuned</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
