import ScrollyTellingWrapper from './components/ScrollyTellingWrapper'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TimelineSection from './components/TimelineSection'
import MLADonorShowcase from './components/MLADonorShowcase'
import ProductGallery from './components/ProductGallery'
import SpotlightCard from './components/SpotlightCard'
import DecryptedText from './components/DecryptedText'
import BrandSwoosh from './components/BrandSwoosh'
import BrandLogo from './components/BrandLogo'
import CustomCursor from './components/CustomCursor'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import {
  PhoneCall,
  MapPin,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'

function AppContent() {
  const { t } = useLanguage()

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <ScrollyTellingWrapper>
      {/* Modern Lenis-style Interactive Smooth Trailing Cursor */}
      <CustomCursor />

      <div className="min-h-screen bg-[#F8FAFC] text-[#081438] font-sans selection:bg-[#FFD200] selection:text-[#081438] flex flex-col justify-between">
        {/* Navigation with Upper Right Language Switcher */}
        <Navbar />

        {/* Hero Section with Interactive Spotlight Stat Counters */}
        <HeroSection />

        {/* Interactive Scrollytelling Timeline (5 Eras with Sticky Pinned Media & Videos) */}
        <TimelineSection />

        {/* Bespoke MLA & CSR Donor Showcase Section with Live Firmware Boot Simulator */}
        <MLADonorShowcase />

        {/* Phase 2: Hardware & Solutions Matrix (Product Gallery + Exploded View + Firmware Callout) */}
        <ProductGallery />

        {/* Dynamic Curved Swoosh Divider into Footer */}
        <div className="bg-[#FFFFFF]">
          <BrandSwoosh
            topColor="#FFFFFF"
            bottomColor="#0A1E5C"
            crimson="#C41230"
            gold="#FFD200"
            height={56}
          />
        </div>

        {/* Footer & Contact */}
        <footer id="contact" className="bg-[#0A1E5C] text-white pt-14 pb-16 border-t border-[#103B9B] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              
              {/* Column 1: Brand Info */}
              <div className="space-y-4 md:col-span-2">
                <BrandLogo variant="dark" />
                <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                  {t('footer.about')}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD200]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{t('footer.approval')}</span>
                </div>
              </div>

              {/* Column 2: Regional Hub & Google Maps */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-[#FFD200] mb-4">
                  {t('footer.hubTitle')}
                </h4>
                <div className="space-y-3 text-sm text-slate-200">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#FFD200] shrink-0 mt-1" />
                    <a
                      href="https://maps.app.goo.gl/wmjpm8W1p9Zxd1YR9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-400 transition-colors"
                    >
                      {t('footer.address')}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[#FFD200] shrink-0" />
                    <span>
                      {t('footer.directPhone')}{' '}
                      <a
                        href="tel:+919422433394"
                        className="hover:text-yellow-400 transition-colors"
                      >
                        +91 94224 33394
                      </a>
                    </span>
                  </p>
                  <a
                    href="https://maps.app.goo.gl/wmjpm8W1p9Zxd1YR9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD200] hover:underline pt-1"
                  >
                    <span>{t('footer.mapsLink')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Column 3: Quick Navigation */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-[#FFD200] mb-4">
                  {t('footer.quickLinks')}
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li>
                    <a
                      href="#journey"
                      onClick={(e) => handleSmoothScroll(e, '#journey')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      {t('footer.linkTimeline')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#gallery"
                      onClick={(e) => handleSmoothScroll(e, '#gallery')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      {t('footer.linkRig')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#gallery"
                      onClick={(e) => handleSmoothScroll(e, '#gallery')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      {t('footer.linkEdla')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#donors"
                      onClick={(e) => handleSmoothScroll(e, '#donors')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      {t('footer.linkDonors')}
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <p>{t('footer.copyright')}</p>
              <p>{t('footer.tagline')}</p>
            </div>
          </div>
        </footer>
      </div>
    </ScrollyTellingWrapper>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

