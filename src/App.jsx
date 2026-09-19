import ScrollyTellingWrapper from './components/ScrollyTellingWrapper'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TimelineSection from './components/TimelineSection'
import MLADonorShowcase from './components/MLADonorShowcase'
import SpotlightCard from './components/SpotlightCard'
import DecryptedText from './components/DecryptedText'
import WarliBorder from './components/WarliBorder'
import {
  PhoneCall,
  MapPin,
  CheckCircle2,
  Sparkles,
  GraduationCap
} from 'lucide-react'

export default function App() {
  return (
    <ScrollyTellingWrapper>
      <div className="min-h-screen bg-[#F8F4EB] text-[#2B1810] font-sans selection:bg-amber-200 selection:text-[#5C2418] flex flex-col justify-between">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section with Interactive Spotlight Stat Counters & Warli Classroom Vector Art */}
        <HeroSection />

        {/* Interactive Scrollytelling Timeline (5 Eras with Warli Dotted Track & Dancing Figure Markers) */}
        <TimelineSection />

        {/* Bespoke MLA & CSR Donor Showcase Section with Live Firmware Boot Simulator */}
        <MLADonorShowcase />

        {/* Turnkey Solutions & Quote Callout with Spotlight Cards */}
        <section id="solutions" className="py-20 lg:py-28 bg-[#F2ECE0] border-t border-[#E8DFD1] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#5C2418] bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300 shadow-xs">
                Turnkey Rural Deployments
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B1810] tracking-tight">
                Equip Your Classroom or ZP School
              </h2>
              <p className="mt-3 text-base sm:text-lg text-[#5C2418]/80">
                Choose between our rugged ₹25K offline projector rig or our flagship Google EDLA interactive AI smart panels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
              
              {/* Plan 1: ₹25K ZP Rig */}
              <SpotlightCard
                spotlightColor="rgba(217, 119, 6, 0.2)"
                borderColor="rgba(217, 119, 6, 0.45)"
                className="p-8 sm:p-10 shadow-lg border-2 border-[#E8DFD1] hover:border-[#D97706] flex flex-col justify-between bg-[#FFFDF9]"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#5C2418] text-xs font-black mb-4 border border-amber-300/60">
                    Most Popular For ZP Schools
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#2B1810]">
                    ₹25K Offline LED Rig
                  </h3>
                  <div className="mt-2 text-3xl font-black text-[#D97706] font-mono">
                    <DecryptedText text="₹25,000" animateOn="hover" speed={20} />
                    <span className="text-sm font-semibold text-[#5C2418]/70 font-sans"> / classroom</span>
                  </div>
                  <p className="mt-4 text-sm text-[#3B2317] leading-relaxed">
                    Engineered specifically for government grant limits. Fully functional on whitewashed walls with offline pen-drive curriculum.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-[#2B1810]">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" /> High-lumen LED classroom projector
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" /> 32GB Offline State Board Syllabus
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" /> Rugged ceiling mount & reinforced cables
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" /> 1-Year comprehensive on-site Konkan warranty
                    </li>
                  </ul>
                </div>
                <div className="pt-8">
                  <a
                    href="#quote"
                    className="block text-center w-full py-3.5 px-4 rounded-xl bg-[#5C2418] hover:bg-[#7C2D12] text-[#FAF9F6] font-extrabold text-sm transition-colors shadow-sm"
                  >
                    Request ZP Specification Sheet
                  </a>
                </div>
              </SpotlightCard>

              {/* Plan 2: Google EDLA Interactive Panel */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#3B1812] text-[#FAF9F6] border-2 border-amber-500/50 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-[#D97706] text-[#FAF9F6] text-xs font-black mb-4 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Next-Gen AI Classroom
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#FAF9F6]">
                    Google EDLA 4K Panel
                  </h3>
                  <div className="mt-2 text-3xl font-black text-amber-400 font-mono">
                    <DecryptedText text="Turnkey AI" animateOn="mount" speed={25} />
                    <span className="text-sm font-semibold text-amber-200/70 font-sans"> / lifetime license</span>
                  </div>
                  <p className="mt-4 text-sm text-amber-100/90 leading-relaxed">
                    Ultra HD interactive touch display with built-in Android, Google Play for Education, and zero recurring SaaS subscriptions.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-[#FAF9F6]">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> 65" / 75" 4K Multi-touch toughened glass
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Google EDLA certification with Play Store
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Custom MLA / CSR donor boot screen logo
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> 3-Year comprehensive hardware support
                    </li>
                  </ul>
                </div>
                <div className="pt-8 relative z-10">
                  <a
                    href="#quote"
                    className="block text-center w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#2B1810] font-black text-sm transition-all shadow-md shadow-amber-950/40"
                  >
                    Request CSR / MLA Quotation
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer & Contact */}
        <footer id="contact" className="bg-[#2B1810] text-[#FAF9F6] pt-12 pb-16 border-t-2 border-amber-600/30 relative">
          {/* Top Inlaid Warli Border */}
          <div className="absolute -top-3.5 left-0 right-0">
            <WarliBorder color="#FAF9F6" accentColor="#D97706" height={16} variant="trim" opacity={0.6} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="space-y-4 md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C2D12] to-[#D97706] flex items-center justify-center border border-amber-400/30 shadow-md">
                    <GraduationCap className="w-6 h-6 text-[#FAF9F6]" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xl text-[#FAF9F6]">Unique Systems</span>
                    <p className="text-xs text-amber-200/80">Rural eLearning Hardware & Infrastructure</p>
                  </div>
                </div>
                <p className="text-sm text-[#FAF9F6]/75 max-w-md leading-relaxed">
                  Serving Zilla Parishad schools, rural ashram shalas, and educational institutions across Khed, Chiplun, Mahad, Dapoli, and the Konkan belt since 1998.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-4">
                  Konkan Regional Hub
                </h4>
                <div className="space-y-2 text-sm text-[#FAF9F6]/85">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Main Road, Khed, Dist. Ratnagiri - 415709</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Direct: +91 98XXX XXXXX</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2 text-sm text-[#FAF9F6]/75">
                  <li><a href="#journey" className="hover:text-amber-400 transition-colors">25-Year Timeline</a></li>
                  <li><a href="#solutions" className="hover:text-amber-400 transition-colors">₹25K ZP Rig Specifications</a></li>
                  <li><a href="#solutions" className="hover:text-amber-400 transition-colors">Google EDLA AI Panels</a></li>
                  <li><a href="#contact" className="hover:text-amber-400 transition-colors">Donor Branding Support</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF9F6]/60">
              <p>© 1998 - 2026 Unique Systems Khed. All rights reserved.</p>
              <p>Pioneering Accessible Classroom Tech Across Rural Maharashtra with Authentic Warli Folk Heritage.</p>
            </div>
          </div>
        </footer>
      </div>
    </ScrollyTellingWrapper>
  )
}
