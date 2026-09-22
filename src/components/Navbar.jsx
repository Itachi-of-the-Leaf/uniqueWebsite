import { useEffect, useState } from 'react'
import { Menu, X, ChevronRight, Phone, Globe, Sun, Moon, Monitor } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

/**
 * ThemeToggleMobile
 * ─────────────────
 * Compact single-icon button for the mobile navbar that cycles
 * through `system → light → dark` on each tap. Replaces the full
 * 3-segment ThemeToggle on phones because the segmented control
 * consumed ~100px of header width and forced the brand + GST
 * typography into a vertical collision. Mobile users who want the
 * full segmented control can reach it inside the hamburger drawer.
 */
function ThemeToggleMobile() {
  const { theme, setTheme } = useTheme()
  const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'
  const Icon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon
  const title =
    theme === 'system'
      ? 'Theme: System — tap for Light'
      : theme === 'light'
      ? 'Theme: Light — tap for Dark'
      : 'Theme: Dark — tap for System'
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label="Cycle theme mode"
      title={title}
      className="md:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-[#07143D] border border-[#FFD200]/45 text-[#FFD200] hover:bg-[#0A1E5C] active:scale-95 transition-all shadow-inner"
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

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

  // Navigation links surfaced in BOTH the desktop nav bar and the
  // mobile drawer. Each entry maps to a section anchor via
  // `handleSmoothScroll`, except `portfolio` which is a future PDF
  // download (TODO: when /assets/Unique-Systems-Portfolio.pdf lands,
  // swap the href to the real path and add the `download` attribute).
  const navLinks = [
    { label: t('nav.journey'), href: '#journey' },
    { label: t('nav.solutions'), href: '#gallery' },
    { label: t('nav.testimonials'), href: '#testimonials' },
    { label: t('nav.portfolio'), href: '#', kind: 'portfolio' },
  ]

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Portfolio click handler — placeholder for the institutional
  // PDF download. Kept as its own function so the future wiring
  // (real href + `download` attribute + analytics) lands in one
  // obvious place. The directive is: do NOT cause a `#` URL hash
  // jump or page scroll. `preventDefault` on the anchor and an
  // empty handler body both achieve that.
  const handlePortfolioClick = (e) => {
    e.preventDefault()
    // TODO: Replace with real PDF URL when the asset is published.
    //   1) Set href to '/assets/Unique-Systems-Portfolio.pdf'
    //   2) Add `download="Unique-Systems-Portfolio.pdf"`
    //   3) Swap this onClick for window.open(url, '_blank') if the
    //      preview-in-browser UX is preferred over forced download.
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
            className="group flex items-center focus:outline-none min-w-0"
            aria-label="Unique Systems Home"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 select-none">
              <img
                src="/logo.jpeg"
                alt="Unique Systems"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0 rounded-lg border border-white/20 shadow-md"
              />
              <div className="flex flex-col justify-center">
                {/* Brand name — proportional sizing across
                    breakpoints. font-black + tracking-tight +
                    leading-none keeps both "Unique Systems" and
                    the Marathi "युनिक सिस्टीम्स" at the same
                    visual weight across the two languages. */}
                <span className="text-sm sm:text-base font-black text-white tracking-tight leading-none">
                  {t('nav.brandName')}
                </span>
                {/* GST — full 15-character ID must always
                    render. whitespace-nowrap + tightened leading
                    keep the full string on one line at the
                    smallest mobile widths. The slightly smaller
                    mobile font (8.5px vs 10px) gives the 15-char
                    string enough room to fit without truncation
                    or wrap. */}
                <span className="text-[8.5px] sm:text-[10px] font-bold text-[#FFD200] tracking-tight sm:tracking-wider leading-tight mt-0.5 whitespace-nowrap">
                  {t('nav.gst')}
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links — evenly distributed across
              the available horizontal space between the brand logo
              (left) and the right-side controls. `flex-1` plus
              `justify-evenly` gives each link equal breathing room
              regardless of how many items exist. */}
          <nav className="hidden lg:flex flex-1 items-center justify-evenly gap-6 px-6">
            {navLinks.map((link) =>
              link.kind === 'portfolio' ? (
                // Portfolio PDF Download Link (Placeholder) — same
                // visual treatment as the surrounding section links
                // (white/90 → Canary Gold hover + gold underline
                // wipe) so it doesn't look like a foreign affordance.
                // TODO: swap `href="#"` for the real PDF asset path
                // and add the `download` attribute when the PDF lands.
                <a
                  key={link.href}
                  href="#"
                  onClick={handlePortfolioClick}
                  title="Download Institutional Portfolio (PDF)"
                  className="relative text-sm font-semibold text-white/90 hover:text-[#FFD200] transition-colors duration-200 py-1 hover:-translate-y-0.5 cursor-pointer after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-[#FFD200] after:transition-all after:duration-200 hover:after:w-3/4"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="relative text-sm font-semibold text-white/90 hover:text-[#FFD200] transition-colors duration-200 py-1 hover:-translate-y-0.5 after:absolute after:left-1/2 after:-bottom-0.5 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-[#FFD200] after:transition-all after:duration-200 hover:after:w-3/4"
                >
                  {link.label}
                </a>
              )
            )}
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

          {/* Mobile Right Controls: Call Us + Theme (compact icon) + Language + Hamburger */}
          <div className="flex md:hidden items-center gap-2 min-w-0">
            {/* Mobile "Call Us" pill — primary mobile CTA,
                hidden on desktop (where the gold Contact
                Us pill takes that role). Tapping opens
                the device's native dialer with
                +91 94224 33394 pre-filled. Canary Gold
                style so it matches the desktop Contact
                CTA and the language-pill accent.
                Icon-only on the smallest mobile widths
                so the GST number on the brand block
                never has to truncate — the phone glyph
                is universally readable, and the
                accessible name lives in aria-label. */}
            <a
              href="tel:+919****3394"
              className="flex md:hidden items-center justify-center min-w-[44px] h-10 px-3 sm:px-3.5 rounded-full bg-[#FFD200] hover:bg-[#ffe033] active:scale-95 text-[#071330] shadow-md shadow-[#FFD200]/20 hover:shadow-[#FFD200]/35 transition-all"
              aria-label="Call Unique Systems at +91 94224 33394"
            >
              <Phone className="w-4 h-4 shrink-0 stroke-[2.5]" />
            </a>

            {/* Mobile theme toggle — compact single-icon button
                cycling light → dark → system. The full 3-segment
                toggle is hidden on mobile (it consumed ~100px of
                header space and crushed the brand + GST typography
                into a vertical collision). Mobile users can still
                reach the full segmented control inside the
                hamburger drawer below. */}
            <ThemeToggleMobile />

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
            {navLinks.map((link) =>
              link.kind === 'portfolio' ? (
                // Portfolio PDF Download Link (mobile drawer variant).
                // Same 48px min-height + flex alignment as the other
                // mobile menu items so the row heights stay uniform.
                // TODO: when the real PDF lands, swap the href + add
                // the `download` attribute.
                <a
                  key={link.href}
                  href="#"
                  onClick={handlePortfolioClick}
                  title="Download Institutional Portfolio (PDF)"
                  className="min-h-[48px] flex items-center px-4 py-3 rounded-lg text-base font-bold text-white hover:bg-white/10 hover:text-[#FFD200] transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="min-h-[48px] flex items-center px-4 py-3 rounded-lg text-base font-bold text-white hover:bg-white/10 hover:text-[#FFD200] transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
            {/* Mobile menu "Call Us" affordance — tel-link
                so a tap inside the open menu also opens
                the native dialer. Visually quieter than
                the primary red Contact CTA so the eye
                still lands on Contact first. */}
            <a
              href="tel:+919****3394"
              className="min-h-[48px] flex items-center gap-2 px-4 py-3 text-sm font-bold text-white/90 rounded-lg hover:bg-white/5 hover:text-[#FFD200] transition-colors"
              aria-label="Call Unique Systems at +91 94224 33394"
            >
              <Phone className="w-4 h-4 text-[#FFD200]" />
              <span>{t('nav.callUs')} (+91 94224 33394)</span>
            </a>

            {/* Mobile menu Theme controls — the full 3-segment
                ThemeToggle that was previously pinned to the
                navbar. Lives here in the drawer now so the
                mobile header has room for the brand + GST
                typography. Mirrors the desktop right-cluster
                so the two surfaces read as the same control
                system at different breakpoints. */}
            <div className="min-h-[48px] flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-[#07143D]/40 border border-white/10">
              <span className="text-xs font-bold text-white/85 uppercase tracking-wider">
                {t('nav.theme') || 'Theme'}
              </span>
              <ThemeToggle variant="navy" />
            </div>

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



