import { useState } from 'react'
import {
  GraduationCap,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  ChevronRight,
  ShieldCheck
} from 'lucide-react'
import WarliBorder from './WarliBorder'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Our Journey', href: '#journey' },
    { label: 'The Impact', href: '#impact' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F8F4EB]/90 border-b border-[#E8DFD1] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Subtitle */}
          <a href="#" className="group flex items-center gap-3.5 text-left focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7C2D12] to-[#D97706] flex items-center justify-center shadow-md shadow-[#5C2418]/25 group-hover:scale-105 transition-transform border border-amber-400/30">
              <GraduationCap className="w-6 h-6 text-[#FAF9F6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#2B1810] font-sans">
                  Unique Systems
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-amber-100 text-[#5C2418] border border-amber-300/60">
                  Est. 1998
                </span>
              </div>
              <p className="text-xs font-semibold text-[#5C2418]/80 tracking-wide">
                Rural eLearning Pioneers
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-bold text-[#2B1810]/80 hover:text-[#D97706] transition-colors duration-150 relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#2B1810] text-sm font-black shadow-md shadow-amber-900/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              <span>Get a Quote</span>
              <ChevronRight className="w-4 h-4 text-[#2B1810]" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2B1810] hover:bg-[#E8DFD1]/50 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Warli Geometric Trim on the Bottom Border */}
      <WarliBorder
        color="#5C2418"
        accentColor="#D97706"
        height={10}
        variant="trim"
        opacity={0.4}
        className="-mb-[1px]"
      />

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DFD1] bg-[#F8F4EB] px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-bold text-[#2B1810] hover:bg-amber-100 hover:text-[#D97706] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-[#2B1810] font-black shadow-md text-sm"
            >
              <span>Get a Quote</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

