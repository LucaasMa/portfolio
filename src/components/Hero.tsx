import { useTranslation } from 'react-i18next'
import { ArrowDown, FileDown } from 'lucide-react'

export default function Hero() {
  const { t } = useTranslation()

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-cyan-400 text-lg mb-4 font-medium" aria-label="Greeting">
          {t('hero.greeting')}
        </p>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 [letter-spacing:-0.02em]">
          {t('hero.name')}
        </h1>

        <h2 className="text-2xl md:text-4xl text-gray-300 mb-8 font-light">
          {t('hero.title')}
        </h2>

        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label={t('hero.cta')}
          >
            {t('hero.cta')}
          </button>

          <a
            href="/resume_Lucas_Mauricio.pdf"
            download
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-300 border border-slate-700 hover:border-cyan-500/50 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label={t('hero.viewResume')}
          >
            <FileDown className="w-5 h-5" />
            {t('hero.viewResume')}
          </a>
        </div>

        <div className="mt-16 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
