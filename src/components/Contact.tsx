import { useTranslation } from 'react-i18next'
import { Mail, Phone, Github, Linkedin, ExternalLink } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" aria-hidden="true" />,
      label: t('contact.email'),
      value: 'lucasmauricio27@gmail.com',
      href: 'mailto:lucasmauricio27@gmail.com',
      ariaLabel: 'Send email to Lucas Mauricio',
    },
    {
      icon: <Phone className="w-6 h-6" aria-hidden="true" />,
      label: t('contact.phone'),
      value: '+55 (19) 99884-6691',
      href: 'tel:+5519998846691',
      ariaLabel: 'Call Lucas Mauricio',
    },
  ]

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" aria-hidden="true" />,
      label: 'GitHub',
      href: 'https://github.com/lucasmauricio',
      ariaLabel: 'Visit Lucas Mauricio GitHub profile',
    },
    {
      icon: <Linkedin className="w-6 h-6" aria-hidden="true" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/lucasmauricio27',
      ariaLabel: 'Visit Lucas Mauricio LinkedIn profile',
    },
  ]

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-slate-800"
      aria-labelledby="contact-title"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="contact-title"
          className="text-4xl md:text-5xl font-black text-white mb-6 text-center"
        >
          {t('contact.title')}
        </h2>

        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('contact.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 group"
              aria-label={method.ariaLabel}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                    {method.label}
                  </h3>
                  <p className="text-white font-medium">{method.value}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            {t('contact.social')}
          </h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-4 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 group"
                aria-label={social.ariaLabel}
              >
                <div className="text-cyan-400 group-hover:scale-110 transition-transform">
                  {social.icon}
                </div>
                <span className="text-white font-medium">{social.label}</span>
                <ExternalLink
                  className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
