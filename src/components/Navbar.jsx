import { useState } from 'react'
import { Menu, X, ChevronRight, PhoneCall, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navLinks = [
    { label: t('nav.journey'), href: '#journey' },
    { label: t('nav.solutions'), href: '#gallery' },
    { label: t('nav.donors'), href: '#donors' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1B4F]/92 border-b border-[#FFD200]/25 shadow-lg shadow-[#061033]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="group flex items-center focus:outline-none"
            aria-label="Unique Systems Home"
          >
            <div className="flex items-center gap-3 select-none">
              <img
                src="/logo.jpeg"
                alt="Unique Systems"
                className="h-10 w-10 rounded-lg object-contain border border-white/20 shadow-md flex-shrink-0"
              />
              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-[#FFFFFF]">
                    {language === 'mr' ? 'युनिक सिस्टीम्स' : 'Unique Systems'}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFD200] text-[#081438] shadow-xs">
                    {t('nav.established')}
                  </span>
                </div>
                <p className="text-xs font-semibold tracking-wide text-[#FFD200]">
                  {language === 'mr' ? 'Unique Systems' : 'युनिक सिस्टीम्स'}{' '}
                  <span className="text-white/60">| {t('nav.tagline')}</span>
                </p>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm font-semibold text-white/90 hover:text-[#FFD200] transition-colors duration-200 relative py-1 hover:-translate-y-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Upper Right Corner Controls: Language Switcher, Phone Hub & CTA */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Language Switcher Pill Button (Marathi / English) */}
            <div
              className="inline-flex items-center bg-[#07143D] border border-[#FFD200]/45 p-1 rounded-full shadow-inner"
              role="group"
              aria-label={t('nav.switchAria')}
            >
              <Globe className="w-3.5 h-3.5 text-[#FFD200] ml-1.5 mr-1 shrink-0" />
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 rounded-full text-xs font-black transition-all duration-200 cursor-pointer ${
                  language === 'mr'
                    ? 'bg-[#FFD200] text-[#081438] shadow-sm scale-100'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-pressed={language === 'mr'}
                title="मराठी मध्ये वाचा"
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-black transition-all duration-200 cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#FFD200] text-[#081438] shadow-sm scale-100'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-pressed={language === 'en'}
                title="Read in English"
              >
                EN
              </button>
            </div>

            {/* Quick Contact Link */}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD200] hover:text-white transition-colors px-2 py-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t('nav.khedHub')}</span>
            </a>

            {/* Primary Action Button */}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C41230] hover:bg-[#A00E26] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#C41230]/40 border border-[#FFD200]/70 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>{t('nav.getQuote')}</span>
              <ChevronRight className="w-4 h-4 text-[#FFD200]" />
            </a>
          </div>

          {/* Mobile Right Controls: Language Switcher + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Top-Right Language Switcher */}
            <div
              className="inline-flex items-center bg-[#07143D] border border-[#FFD200]/40 p-0.5 rounded-full shadow-inner"
              role="group"
              aria-label={t('nav.switchAria')}
            >
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-black transition-all ${
                  language === 'mr'
                    ? 'bg-[#FFD200] text-[#081438]'
                    : 'text-white/80'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-black transition-all ${
                  language === 'en'
                    ? 'bg-[#FFD200] text-[#081438]'
                    : 'text-white/80'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#FFD200]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Dynamic Gold Accent Trim Along Bottom */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#C41230] via-[#FFD200] to-[#103B9B]" />

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#FFD200]/30 bg-[#0B1B4F] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-base font-bold text-white hover:bg-white/10 hover:text-[#FFD200] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-[#FFD200]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('nav.khedHub')} (+91 94224 33394)</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#C41230] text-white font-extrabold shadow-md border border-[#FFD200]/80 text-sm"
            >
              <span>{t('nav.getQuote')}</span>
              <ChevronRight className="w-4 h-4 text-[#FFD200]" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}



