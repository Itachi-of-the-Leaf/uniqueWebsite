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
import WarliClassroomIllustration from './WarliClassroomIllustration'
import WarliBorder from './WarliBorder'

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

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#5C2418] text-[#FAF9F6]">
      {/* Subtle Earthen Texture & Ambient Halos */}
      <div className="absolute inset-0 bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-600/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Region Badge with Warli Dots */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D170F]/90 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold shadow-inner">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Khed • Chiplun • Mahad • Dapoli • Guhagar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Hero Title & Narrative Subhead */}
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#FAF9F6] leading-[1.14]">
            Empowering Rural Schools With{' '}
            <span className="text-amber-400 underline decoration-amber-400/60 decoration-wavy decoration-2 underline-offset-8">
              Affordable Digital Learning
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#F8F4EB]/90 font-normal leading-relaxed max-w-3xl mx-auto">
            From 1998 roots in Khed to <strong className="font-bold text-white">120+ Zilla Parishad schools</strong> digitalized across Raigad & Ratnagiri with rugged, offline eLearning systems starting at just <strong className="font-extrabold text-amber-300">₹25,000</strong>.
          </p>

          {/* Quick Value Props Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A1D13] text-[#FAF9F6] text-xs font-semibold border border-amber-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> State Board Marathi & Semi-English
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A1D13] text-[#FAF9F6] text-xs font-semibold border border-amber-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> No Smartboard Screen Maintenance
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#4A1D13] text-[#FAF9F6] text-xs font-semibold border border-amber-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> MLA & CSR Donor Branding Support
            </span>
          </div>

          {/* Golden Amber CTA Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#2B1810] font-black text-base shadow-xl shadow-amber-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              <span>Explore ₹25K ZP Classroom Rig</span>
              <ChevronRight className="w-5 h-5 text-[#2B1810]" />
            </a>
            <a
              href="#journey"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#451B12] hover:bg-[#522016] text-[#FAF9F6] font-bold text-sm border border-amber-500/30 transition-colors shadow-sm"
            >
              <span>View 25-Year Timeline</span>
            </a>
          </div>
        </div>

        {/* Authentic Warli Art Classroom Vector Illustration */}
        <div className="mt-12 mb-14 max-w-4xl mx-auto px-2">
          <div className="p-4 sm:p-6 rounded-3xl bg-[#421A11]/80 border-2 border-amber-500/30 shadow-2xl backdrop-blur-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-bold text-amber-300">
              <span className="uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Warli Folk Art Chronicle • Konkan Classrooms
              </span>
              <span className="text-[#FAF9F6]/70 hidden sm:inline">
                Traditional Maharashtrian Geometric Motif
              </span>
            </div>

            <WarliClassroomIllustration className="pt-3" />
          </div>
        </div>

        {/* Impact Stat Counter Spotlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <SpotlightCard
                key={i}
                spotlightColor="rgba(217, 119, 6, 0.25)"
                borderColor="rgba(245, 158, 11, 0.5)"
                className="group p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-[#4A1D13] border border-amber-500/30 text-[#FAF9F6]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 group-hover:bg-amber-500 text-amber-400 group-hover:text-[#2B1810] flex items-center justify-center transition-colors duration-200 shadow-inner border border-amber-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#3B1812] text-amber-300 border border-amber-500/20">
                    Step 0{i + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-[#FAF9F6] tracking-tight font-mono">
                    <DecryptedText
                      text={stat.value}
                      animateOn="hover"
                      speed={25}
                      className="text-[#FAF9F6]"
                    />
                  </div>
                  <div className="text-base font-bold text-amber-300">
                    {stat.label}
                  </div>
                </div>

                <p className="mt-3 text-xs text-[#FAF9F6]/80 font-normal leading-relaxed">
                  {stat.detail}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{stat.highlight}</span>
                </div>
              </SpotlightCard>
            )
          })}
        </div>

        {/* Scroll To Explore Indicator */}
        <div className="mt-14 flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-200/80">
            Scroll To Explore The 25-Year Journey
          </span>
          <a
            href="#journey"
            className="w-10 h-10 rounded-full border border-amber-400/40 bg-[#4A1D13] shadow-md flex items-center justify-center text-amber-300 hover:text-white hover:border-amber-300 hover:scale-110 transition-all animate-bounce"
            aria-label="Scroll to interactive timeline"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Decorative Bottom Warli Border Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <WarliBorder
          color="#FAF9F6"
          accentColor="#D97706"
          height={26}
          variant="zigzag"
          opacity={0.85}
        />
      </div>
    </section>
  )
}
