import { useState } from 'react'
import { Menu, X, ChevronRight, PhoneCall } from 'lucide-react'
import BrandLogo from './BrandLogo'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Our Journey', href: '#journey' },
    { label: 'Teacher Voices', href: '#testimonials' },
    { label: '₹25K ZP Rig', href: '#solutions' },
    { label: 'MLA & CSR Donors', href: '#donors' },
    { label: 'Contact', href: '#contact' },
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#103B9B]/92 border-b border-[#FFD200]/25 shadow-lg shadow-[#07194A]/25 transition-all duration-300">
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
            <BrandLogo variant="dark" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm font-semibold text-white/90 hover:text-[#FFD200] transition-colors duration-200 relative py-1 hover:-translate-y-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary CTA & Quick Contact */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD200] hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Khed Hub</span>
            </a>

            <a
              href="#quote"
              onClick={(e) => handleSmoothScroll(e, '#solutions')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E63956] hover:bg-[#C72440] text-white text-sm font-extrabold shadow-md shadow-[#E63956]/40 border border-[#FFD200]/70 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Get a Quote</span>
              <ChevronRight className="w-4 h-4 text-[#FFD200]" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
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
      <div className="h-[2px] w-full bg-gradient-to-r from-[#E63956] via-[#FFD200] to-[#103B9B]" />

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#FFD200]/30 bg-[#0A1E5C] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-base font-bold text-white hover:bg-white/10 hover:text-[#FFD200] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#solutions"
              onClick={(e) => handleSmoothScroll(e, '#solutions')}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#E63956] text-white font-extrabold shadow-md border border-[#FFD200]/80 text-sm"
            >
              <span>Get a Quote</span>
              <ChevronRight className="w-4 h-4 text-[#FFD200]" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}


