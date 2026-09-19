import ScrollyTellingWrapper from './components/ScrollyTellingWrapper'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TimelineSection from './components/TimelineSection'
import MLADonorShowcase from './components/MLADonorShowcase'
import SpotlightCard from './components/SpotlightCard'
import DecryptedText from './components/DecryptedText'
import BrandSwoosh from './components/BrandSwoosh'
import BrandLogo from './components/BrandLogo'
import CustomCursor from './components/CustomCursor'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import {
  PhoneCall,
  MapPin,
  CheckCircle2,
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

        {/* Turnkey Solutions & Quote Callout with Spotlight Cards */}
        <section id="solutions" className="py-20 lg:py-28 bg-[#FFFFFF] border-t border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#103B9B] bg-[#103B9B]/10 px-4 py-1.5 rounded-full border border-[#103B9B]/25 shadow-xs">
                {t('solutions.badge')}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#081438] tracking-tight">
                {t('solutions.heading')}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-700">
                {t('solutions.subheading')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
              
              {/* Plan 1: ₹25K ZP Rig */}
              <SpotlightCard
                spotlightColor="rgba(255, 210, 0, 0.2)"
                borderColor="rgba(16, 59, 155, 0.45)"
                className="p-8 sm:p-10 shadow-xl border-2 border-slate-200 hover:border-[#103B9B] flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103B9B]/10 text-[#103B9B] text-xs font-black mb-4 border border-[#103B9B]/20">
                    {t('solutions.plan1.badge')}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#081438]">
                    {t('solutions.plan1.title')}
                  </h3>
                  <div className="mt-2 text-3xl font-black text-[#C41230] font-mono">
                    <DecryptedText text={t('solutions.plan1.price')} animateOn="hover" />
                    <span className="text-sm font-semibold text-slate-500 font-sans">{t('solutions.plan1.unit')}</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                    {t('solutions.plan1.desc')}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-800">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0" /> {t('solutions.plan1.f1')}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0" /> {t('solutions.plan1.f2')}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0" /> {t('solutions.plan1.f3')}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0" /> {t('solutions.plan1.f4')}
                    </li>
                  </ul>
                </div>
                <div className="pt-8">
                  <a
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, '#contact')}
                    className="block text-center w-full py-3.5 px-4 rounded-xl bg-[#C41230] hover:bg-[#A00E26] text-white font-extrabold text-sm transition-all shadow-md shadow-[#C41230]/30 border border-[#FFD200]/70"
                  >
                    {t('solutions.plan1.cta')}
                  </a>
                </div>
              </SpotlightCard>

              {/* Plan 2: Google EDLA Interactive Panel */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1E5C] text-white border-2 border-[#103B9B] shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#103B9B]/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#103B9B] to-[#C41230] text-white text-xs font-black mb-4 shadow-xs border border-[#FFD200]/30">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD200]" /> {t('solutions.plan2.badge')}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                    {t('solutions.plan2.title')}
                  </h3>
                  <div className="mt-2 text-3xl font-black text-[#FFD200] font-mono">
                    <DecryptedText text={t('solutions.plan2.price')} animateOn="mount" />
                    <span className="text-sm font-semibold text-slate-300 font-sans">{t('solutions.plan2.unit')}</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-200 leading-relaxed">
                    {t('solutions.plan2.desc')}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-100">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] shrink-0" /> {t('solutions.plan2.f1')}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] shrink-0" /> {t('solutions.plan2.f2')}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] shrink-0" /> {t('solutions.plan2.f3')}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] shrink-0" /> {t('solutions.plan2.f4')}
                    </li>
                  </ul>
                </div>
                <div className="pt-8 relative z-10">
                  <a
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, '#contact')}
                    className="block text-center w-full py-3.5 px-4 rounded-xl bg-[#C41230] hover:bg-[#A00E26] text-white font-extrabold text-sm transition-all shadow-md shadow-[#C41230]/40 border border-[#FFD200]/80"
                  >
                    {t('solutions.plan2.cta')}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

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
                      href="#solutions"
                      onClick={(e) => handleSmoothScroll(e, '#solutions')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      {t('footer.linkRig')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#solutions"
                      onClick={(e) => handleSmoothScroll(e, '#solutions')}
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

