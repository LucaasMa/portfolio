import { useTranslation } from 'react-i18next'
import { Heart } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-gray-400 mb-2">
            © {currentYear} Lucas Mauricio. {t('footer.rights')}
          </p>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            {t('footer.built')}{' '}
            <Heart className="w-4 h-4 text-red-500 fill-current" aria-hidden="true" />{' '}
            using React, TanStack Start & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
