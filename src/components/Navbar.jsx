import { useEffect, useState } from 'react'
import { Menu, X, ChevronRight, Phone, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  // ─── Hide-on-pinned-section listener ──────────────────────────────────
  // While the user is inside a scroll-driven story section
  // (#journey or #testimonials), ScrollTrigger fires a
  // `pinned-section` CustomEvent with detail.pinned = true.
  // We use a counter so multiple pinned sections can stack cleanly
  // and the nav only reappears once every pinned section releases.
  // The header slides up via the .nav-shell[data-hidden="true"]
  // CSS rule in index.css.
  useEffect(() => {
    let pinnedCount = 0
    const onPinned = (e) => {
      const shell = document.querySelector('.nav-shell')
      if (!shell) return
      if (e.detail?.pinned) pinnedCount++
      else pinnedCount = Math.max(0, pinnedCount - 1)
      shell.dataset.hidden = pinnedCount > 0 ? 'true' : 'false'
    }
    window.addEventListener('pinned-section', onPinned)
    return () => window.removeEventListener('pinned-section', onPinned)
  }, [])

  const navLinks = [
    { label: t('nav.journey'), href: '#journey' },
    { label: t('nav.solutions'), href: '#gallery' },
    { label: t('nav.testimonials'), href: '#testimonials' },
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
    <header className="nav-shell sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1B4F]/92 border-b border-[#FFD200]/25 shadow-lg shadow-[#061033]/30 transition-transform duration-300 ease-out" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
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
                <span className="font-heading font-extrabold text-xl tracking-tight text-[#FFFFFF] block">
                  {t('nav.brandName')}
                </span>
                <p className="text-[0.7rem] sm:text-xs font-semibold tracking-wide text-[#FFD200] mt-0.5">
                  {t('nav.gst')}
                </p>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links — evenly distributed across
              the available horizontal space between the brand logo
              (left) and the right-side controls. `flex-1` plus
              `justify-evenly` gives each link equal breathing room
              regardless of how many items exist. */}
          <nav className="hidden lg:flex flex-1 items-center justify-evenly gap-6 px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="relative text-sm font-semibold text-white/90 hover:text-[#FFD200] transition-colors duration-200 py-1 hover:-translate-y-0.5 after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-[#FFD200] after:transition-all after:duration-200 hover:after:w-3/4"
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

            {/* Theme toggle — System / Light / Dark. Sits next to the
                language pill so the right-side control cluster reads
                as a single composed unit. */}
            <ThemeToggle variant="navy" />

            {/* Primary desktop CTA — scrolls smoothly to the
                #contact section. Canary Gold background + Deep
                Midnight Navy text so it harmonizes with the
                brand palette instead of competing with the
                language pill's gold accent. Pill shape with a
                soft gold-tinted shadow + a beefier chevron
                stroke for visual weight. */}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#FFD200] hover:bg-[#ffe033] active:scale-95 text-[#071330] font-extrabold text-sm tracking-wide shadow-md shadow-[#FFD200]/20 hover:shadow-[#FFD200]/35 transition-all"
              aria-label={t('nav.contactUsAria')}
            >
              <span>{t('nav.contactUs')}</span>
              <ChevronRight className="w-4 h-4 text-[#071330] stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Right Controls: Call Us + Theme + Language + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile "Call Us" pill — primary mobile CTA,
                hidden on desktop (where the gold Contact
                Us pill takes that role). Tapping opens
                the device's native dialer with
                +91 94224 33394 pre-filled. Canary Gold
                style so it matches the desktop Contact
                CTA and the language-pill accent. */}
            <a
              href="tel:+919422433394"
              className="flex md:hidden items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFD200] hover:bg-[#ffe033] active:scale-95 text-[#071330] font-extrabold text-xs shadow-md shadow-[#FFD200]/20 hover:shadow-[#FFD200]/35 transition-all"
              aria-label="Call Unique Systems at +91 94224 33394"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
              <span>{t('nav.callUs')}</span>
            </a>

            {/* Mobile theme toggle — compact icon-only (no labels)
                since horizontal space is tight. */}
            <ThemeToggle variant="navy" />

            {/* Mobile Top-Right Language Switcher */}
            <div
              className="inline-flex items-center bg-[#07143D] border border-[#FFD200]/40 p-0.5 rounded-full shadow-inner"
              role="group"
              aria-label={t('nav.switchAria')}
            >
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                aria-label="मराठी"
                className={`min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center justify-center ${
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
                aria-label="English"
                className={`min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center justify-center ${
                  language === 'en'
                    ? 'bg-[#FFD200] text-[#081438]'
                    : 'text-white/80'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Toggle Button — bumped p-2 → p-3 (40px
                → 48px) so the tap target meets Apple/Material 48dp
                guidelines without changing the icon size. */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] p-3 rounded-lg text-white hover:bg-white/10 focus:outline-none flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
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
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="min-h-[48px] flex items-center px-4 py-3 rounded-lg text-base font-bold text-white hover:bg-white/10 hover:text-[#FFD200] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
            {/* Mobile menu "Call Us" affordance — tel-link
                so a tap inside the open menu also opens
                the native dialer. Visually quieter than
                the primary red Contact CTA so the eye
                still lands on Contact first. */}
            <a
              href="tel:+919422433394"
              className="min-h-[48px] flex items-center gap-2 px-4 py-3 text-sm font-bold text-white/90 rounded-lg hover:bg-white/5 hover:text-[#FFD200] transition-colors"
              aria-label="Call Unique Systems at +91 94224 33394"
            >
              <Phone className="w-4 h-4 text-[#FFD200]" />
              <span>{t('nav.callUs')} (+91 94224 33394)</span>
            </a>

            {/* Mobile menu Contact CTA — Canary Gold pill
                to match the desktop CTA exactly so the
                two surfaces read as the same affordance
                at different sizes. The mobile-menu
                "Call Us" tel-link above is still the
                primary mobile route to a live call, but
                this CTA is the canonical "go to the
                contact form" action. */}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FFD200] hover:bg-[#ffe033] active:scale-95 text-[#071330] font-extrabold shadow-md shadow-[#FFD200]/20 hover:shadow-[#FFD200]/35 text-sm transition-all"
              aria-label={t('nav.contactUsAria')}
            >
              <span>{t('nav.contactUs')}</span>
              <ChevronRight className="w-4 h-4 text-[#071330] stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}



