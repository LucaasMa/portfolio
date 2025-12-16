import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
      aria-label={`Switch language to ${i18n.language === 'en' ? 'Portuguese' : 'English'}`}
    >
      <Globe className="w-5 h-5 text-cyan-400" />
      <span className="text-white font-medium uppercase">
        {i18n.language === 'en' ? 'PT' : 'EN'}
      </span>
    </button>
  )
}
