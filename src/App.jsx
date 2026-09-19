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
import {
  PhoneCall,
  MapPin,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'

export default function App() {
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
        {/* Navigation */}
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
                Turnkey Rural Deployments
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#081438] tracking-tight">
                Equip Your Classroom or ZP School
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-700">
                Choose between our rugged ₹25K offline projector rig or our flagship Google EDLA interactive AI smart panels.
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
                    Most Popular For ZP Schools
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#081438]">
                    ₹25K Offline LED Rig
                  </h3>
                  <div className="mt-2 text-3xl font-black text-[#C41230] font-mono">
                    <DecryptedText text="₹25,000" animateOn="hover" />
                    <span className="text-sm font-semibold text-slate-500 font-sans"> / classroom</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                    Engineered specifically for government grant limits. Fully functional on whitewashed walls with offline pen-drive curriculum.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-800">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0" /> High-lumen LED classroom projector
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0" /> 32GB Offline State Board Syllabus
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0" /> Rugged ceiling mount & reinforced cables
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0" /> 1-Year comprehensive on-site Konkan warranty
                    </li>
                  </ul>
                </div>
                <div className="pt-8">
                  <a
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, '#contact')}
                    className="block text-center w-full py-3.5 px-4 rounded-xl bg-[#C41230] hover:bg-[#A00E26] text-white font-extrabold text-sm transition-all shadow-md shadow-[#C41230]/30 border border-[#FFD200]/70"
                  >
                    Request ZP Specification Sheet
                  </a>
                </div>
              </SpotlightCard>

              {/* Plan 2: Google EDLA Interactive Panel */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1E5C] text-white border-2 border-[#103B9B] shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#103B9B]/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#103B9B] to-[#C41230] text-white text-xs font-black mb-4 shadow-xs border border-[#FFD200]/30">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD200]" /> Next-Gen AI Classroom
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                    Google EDLA 4K Panel
                  </h3>
                  <div className="mt-2 text-3xl font-black text-[#FFD200] font-mono">
                    <DecryptedText text="Turnkey AI" animateOn="mount" />
                    <span className="text-sm font-semibold text-slate-300 font-sans"> / lifetime license</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-200 leading-relaxed">
                    Ultra HD interactive touch display with built-in Android, Google Play for Education, and zero recurring SaaS subscriptions.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-100">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] shrink-0" /> 65" / 75" 4K Multi-touch toughened glass
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] shrink-0" /> Google EDLA certification with Play Store
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] shrink-0" /> Custom MLA / CSR donor boot screen logo
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD200] shrink-0" /> 3-Year comprehensive hardware support
                    </li>
                  </ul>
                </div>
                <div className="pt-8 relative z-10">
                  <a
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, '#contact')}
                    className="block text-center w-full py-3.5 px-4 rounded-xl bg-[#C41230] hover:bg-[#A00E26] text-white font-extrabold text-sm transition-all shadow-md shadow-[#C41230]/40 border border-[#FFD200]/80"
                  >
                    Request CSR / MLA Quotation
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
                  Serving Zilla Parishad schools, rural ashram shalas, and educational institutions across Khed, Chiplun, Mahad, Dapoli, and the entire Konkan belt since 1998.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD200]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Maharashtra State Board Approved eLearning Hardware Partner</span>
                </div>
              </div>

              {/* Column 2: Regional Hub & Google Maps */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-[#FFD200] mb-4">
                  Konkan Regional Hub
                </h4>
                <div className="space-y-3 text-sm text-slate-200">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#FFD200] shrink-0 mt-1" />
                    <span>Main Road, Khed, Dist. Ratnagiri - 415709, Maharashtra</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[#FFD200] shrink-0" />
                    <span>Direct: +91 98XXX XXXXX</span>
                  </p>
                  <a
                    href="https://maps.google.com/?q=Khed+Ratnagiri"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD200] hover:underline pt-1"
                  >
                    <span>View Location on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Column 3: Quick Navigation */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-[#FFD200] mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li>
                    <a
                      href="#journey"
                      onClick={(e) => handleSmoothScroll(e, '#journey')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      25-Year Innovation Timeline
                    </a>
                  </li>
                  <li>
                    <a
                      href="#solutions"
                      onClick={(e) => handleSmoothScroll(e, '#solutions')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      ₹25K ZP Rig Specifications
                    </a>
                  </li>
                  <li>
                    <a
                      href="#solutions"
                      onClick={(e) => handleSmoothScroll(e, '#solutions')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      Google EDLA 4K AI Panels
                    </a>
                  </li>
                  <li>
                    <a
                      href="#donors"
                      onClick={(e) => handleSmoothScroll(e, '#donors')}
                      className="hover:text-[#FFD200] transition-colors"
                    >
                      MLA & CSR Donor Visibility
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <p>© 1998 - 2026 Unique Systems (युनिक सिस्टीम्स). All rights reserved.</p>
              <p>Pioneering Accessible Classroom Tech Across Rural Maharashtra.</p>
            </div>
          </div>
        </footer>
      </div>
    </ScrollyTellingWrapper>
  )
}
