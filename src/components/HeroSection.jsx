import {
  School,
  Zap,
  WifiOff,
  Award,
  ArrowDown,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import SpotlightCard from './SpotlightCard'
import DecryptedText from './DecryptedText'
import BrandSwoosh from './BrandSwoosh'

export default function HeroSection() {
  const stats = [
    {
      icon: School,
      value: '120+',
      label: 'Schools Digitized',
      detail: 'Across Raigad & Ratnagiri districts',
      highlight: 'Zilla Parishad & Rural Ashrams',
    },
    {
      icon: Zap,
      value: '₹25,000',
      label: 'Budget Breakthrough',
      detail: 'Engineered for ZP ₹30K limits',
      highlight: 'LED rig + Pen-drive deployment',
    },
    {
      icon: WifiOff,
      value: '100%',
      label: 'Offline Capable',
      detail: 'Zero internet dependency',
      highlight: 'Plug & teach digital curriculum',
    },
    {
      icon: Award,
      value: 'Google EDLA',
      label: 'Certified Next-Gen',
      detail: 'Interactive smart panels',
      highlight: 'Zero monthly subscription traps',
    },
  ]

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative pt-12 pb-24 md:pt-18 md:pb-32 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] text-[#081438]">
      {/* Dynamic Ambient Halos for Warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#103B9B]/10 via-[#FFD200]/10 to-transparent pointer-events-none -z-0 blur-3xl" />
      <div className="absolute top-36 -right-20 w-80 h-80 bg-[#C41230]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-48 -left-20 w-80 h-80 bg-[#FFD200]/12 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Region Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#103B9B]/25 text-[#103B9B] text-xs sm:text-sm font-bold shadow-sm">
            <MapPin className="w-4 h-4 text-[#FFD200]" />
            <span className="text-[#081438] font-semibold">Konkan Operational Belt:</span>
            <span className="text-[#103B9B] font-bold">Khed • Chiplun • Mahad • Dapoli • Guhagar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200] animate-pulse" />
          </div>
        </div>

        {/* Hero Title & Narrative Subhead */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#103B9B] leading-[1.15]">
            Empowering Rural Schools With{' '}
            <span className="text-[#081438] underline decoration-[#C41230] decoration-wavy decoration-2 underline-offset-8">
              Affordable Digital Learning
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-3xl mx-auto">
            Pioneering rugged, offline eLearning setups across{' '}
            <strong className="font-extrabold text-[#103B9B] underline decoration-[#FFD200]">
              120+ Zilla Parishad schools
            </strong>{' '}
            in Raigad & Ratnagiri since 2014—starting at just{' '}
            <strong className="font-black text-[#C41230]">₹25,000</strong>.
          </p>

          {/* Quick Value Props Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#081438] text-xs font-semibold border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#103B9B]" /> State Board Marathi & Semi-English
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#081438] text-xs font-semibold border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#103B9B]" /> No Smartboard Screen Maintenance
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#081438] text-xs font-semibold border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#103B9B]" /> MLA & CSR Donor Branding Support
            </span>
          </div>

          {/* Dual Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#solutions"
              onClick={(e) => handleSmoothScroll(e, '#solutions')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#C41230] hover:bg-[#A00E26] text-white font-extrabold text-base shadow-xl shadow-[#C41230]/30 border border-[#FFD200]/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Explore ₹25K ZP Rig</span>
              <ChevronRight className="w-5 h-5 text-[#FFD200]" />
            </a>
            <a
              href="#journey"
              onClick={(e) => handleSmoothScroll(e, '#journey')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#103B9B] hover:bg-[#0B1B4F] text-white font-bold text-sm border border-[#103B9B]/30 transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <span>View 25-Year Journey</span>
            </a>
          </div>
        </div>

        {/* Impact Stat Counter Milestone Buttons */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            const targetHref = i % 2 === 0 ? '#journey' : '#solutions'
            return (
              <a
                key={i}
                href={targetHref}
                onClick={(e) => handleSmoothScroll(e, targetHref)}
                className="block text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD200] rounded-3xl"
              >
                <SpotlightCard
                  spotlightColor="rgba(16, 59, 155, 0.12)"
                  borderColor="rgba(255, 210, 0, 0.6)"
                  className="p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-white border border-slate-200 hover:border-[#FFD200] hover:shadow-[0_12px_30px_rgba(16,59,155,0.12)] text-[#081438] h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon and Milestone Badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#103B9B] group-hover:bg-[#C41230] text-[#FFD200] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md border border-[#FFD200]/40 group-hover:scale-105">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0F172A] text-[#FFD200] border border-[#FFD200]/40 shadow-xs">
                        Milestone 0{i + 1}
                      </span>
                    </div>

                    {/* Stat Value & Label */}
                    <div className="space-y-1.5">
                      <div className="text-3xl sm:text-4xl font-black text-[#081438] tracking-tight font-mono">
                        <DecryptedText
                          text={stat.value}
                          animateOn="hover"
                          speed={25}
                          className="text-[#081438]"
                        />
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-[#103B9B] tracking-wide">
                        {stat.label}
                      </div>
                    </div>

                    {/* Stat Detail Description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {stat.detail}
                    </p>
                  </div>

                  {/* Bottom Highlight Feature & Action */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFD200] shrink-0" />
                      <span className="text-slate-700">{stat.highlight}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#103B9B] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </SpotlightCard>
              </a>
            )
          })}
        </div>

        {/* Scroll To Explore Indicator */}
        <div className="mt-14 flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#103B9B]">
            Scroll To Experience The Grassroots Journey
          </span>
          <a
            href="#journey"
            onClick={(e) => handleSmoothScroll(e, '#journey')}
            className="w-10 h-10 rounded-full border border-[#FFD200]/60 bg-[#103B9B] shadow-lg flex items-center justify-center text-[#FFD200] hover:text-white hover:bg-[#C41230] hover:border-white hover:scale-110 transition-all animate-bounce"
            aria-label="Scroll to interactive timeline"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Dynamic Curved Red & Yellow Swoosh Transition into Dimmed Presentation Room (#061033) */}
      <div className="absolute bottom-0 left-0 right-0">
        <BrandSwoosh
          topColor="#F8FAFC"
          bottomColor="#061033"
          crimson="#C41230"
          gold="#FFD200"
          height={72}
        />
      </div>
    </section>
  )
}

