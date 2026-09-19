import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Monitor,
  HardDrive,
  Film,
  Award,
  Sliders,
  Calendar,
  Zap,
  Play,
  TrendingUp,
  Volume2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Loader2,
} from 'lucide-react'
import timelineData from '../data/timelineData.json'
import DecryptedText from './DecryptedText'

/* Per-character chalk glow helper */
function ChalkText({ text, className = '' }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span key={i} className="chalk-letter">{char}</span>
        )
      )}
    </span>
  )
}

gsap.registerPlugin(ScrollTrigger)

const eraVisualData = [
  {
    badge: 'Pioneering Ground Zero',
    tagline: 'Laying IT Foundations in Konkan',
    icon: Monitor,
    stats: [
      { label: 'Founding Base', val: 'Khed Bazaar' },
      { label: 'Service Hub', val: '24-hr Local Repair' },
      { label: 'Hardware', val: 'CRT & Custom Rigs' },
    ],
    deliverables: [
      'First dedicated computer retail & assembly center in Khed taluka',
      'Eliminated 150km repair travel to Mumbai / Pune for local institutions',
      'Conducted earliest digital literacy bootcamps for rural teachers',
    ],
    specHighlight: 'Custom Intel x86 Hardware • CRT Displays • Local Konkan Support',
    defaultTab: 'specs',
  },
  {
    badge: 'The ₹25K Breakthrough',
    tagline: 'Engineered for ZP ₹30,000 Grant Limits',
    icon: HardDrive,
    stats: [
      { label: 'ZP Grant Limit', val: '₹30,000' },
      { label: 'Rig Cost', val: '₹25,000 Only' },
      { label: 'School Surplus', val: '₹5,000 Left' },
    ],
    deliverables: [
      'High-lumen LED projector + 32GB offline USB pen-drive bundle',
      'Zero screen damage risk: Projected directly onto whitewashed classroom walls',
      '100% immune to rural power cuts & internet blackout zones',
    ],
    specHighlight: '₹25,000 Turnkey LED Kit • Offline Pen-Drive OS • No Smartboard Fees',
    defaultTab: 'salvi',
  },
  {
    badge: 'Institutional Trust & Scale',
    tagline: '100+ Schools with Zankar & Pride India',
    icon: Film,
    stats: [
      { label: 'Institutions', val: '100+ Connected' },
      { label: 'Curriculum', val: 'State Board Marathi' },
      { label: 'Strategic Partner', val: 'MMACETP (Mr. Apte)' },
    ],
    deliverables: [
      'Complete Maharashtra State Board Marathi & Semi-English syllabus via Zankar DVDs',
      'Strategic partnership with MMACETP (Mr. Apte) & Pride India CSR Foundation',
      'Teacher onboarding bootcamp: from 0 to confident digital instructor in 2 hours',
    ],
    specHighlight: 'Zankar DVD Syllabus • Multi-District Ashrams • Scaled Konkan Trust',
    defaultTab: 'impact',
  },
  {
    badge: 'The Technical Edge',
    tagline: 'Google EDLA 4K Panels & Smart AI Projection',
    icon: Zap,
    stats: [
      { label: 'Resolution', val: '1080p & 4K UHD' },
      { label: 'Certification', val: 'Google EDLA' },
      { label: 'Annual SaaS', val: '₹0 / No Renewal' },
    ],
    deliverables: [
      '1080p Smart Android wireless classroom projectors with built-in stereo audio',
      'Google EDLA-certified 65" and 75" interactive multi-touch AI panels',
      'Anti-SaaS policy: Lifetime offline functionality with zero recurring fees',
    ],
    specHighlight: 'Google EDLA Certification • Offline AI Tools • Zero Annual Fees',
    defaultTab: 'specs',
  },
  {
    badge: 'Sovereign Donor Visibility',
    tagline: 'Custom Boot Screens for MLA & CSR Benefactors',
    icon: Award,
    stats: [
      { label: 'Branding', val: 'Firmware-Level' },
      { label: 'Key Benefactor', val: 'MLA Bharat Gogavale' },
      { label: 'Longevity', val: 'Permanent Display' },
    ],
    deliverables: [
      'Custom BIOS & Android boot logos acknowledging local MLA / CSR leadership',
      'Featured: Hon. MLA Bharat Gogavale (Mahad & Khed Vidhayak Nidhi)',
      'Anodized laser-engraved plaques & verifiable photo audit dossiers for grants',
    ],
    specHighlight: 'Custom Firmware Splash • MLA Donor Recognition • Verifiable CSR Impact',
    defaultTab: 'donor',
  },
]

export default function TimelineSection() {
  const [activeEraIndex, setActiveEraIndex] = useState(0)
  // Individual media tab states for each era so users can toggle per card
  const [eraTabs, setEraTabs] = useState(() =>
    eraVisualData.map((v) => v.defaultTab)
  )
  const containerRef = useRef(null)
  const stepRefs = useRef([])

  const setTabForEra = (eraIdx, tabName) => {
    setEraTabs((prev) => {
      const next = [...prev]
      next[eraIdx] = tabName
      return next
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return

        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveEraIndex(index),
          onEnterBack: () => setActiveEraIndex(index),
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-20 lg:py-28 text-white overflow-hidden border-t border-slate-800"
      style={{
        background:
          'radial-gradient(circle at 15% 25%, rgba(16, 59, 155, 0.22) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(16, 59, 155, 0.18) 0%, transparent 50%), #061033',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD200]/15 text-[#FFD200] text-xs font-black uppercase tracking-wider mb-3 border border-[#FFD200]/40 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-[#FFD200]" />
            <span>Interactive Chronicle (1998 — Present)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#FFFFFF] tracking-tight drop-shadow-sm">
            25 Years of Grassroots Innovation
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Scroll through the five transformative eras that turned a local Khed computer shop into the most trusted rural educational hardware partner across Konkan.
          </p>
        </div>

        {/* Vertical Timeline Rail with Paired Scrolling Columns */}
        <div className="relative space-y-16 lg:space-y-24">
          
          {/* Continuous Vertical Canary Gold Milestone Progress Spine */}
          <div className="absolute left-4 sm:left-6 top-6 bottom-12 w-1 bg-gradient-to-b from-[#FFD200] via-[#FFD200]/60 to-[#FFD200]/20 pointer-events-none hidden sm:block opacity-80 shadow-[0_0_12px_rgba(255,210,0,0.45)]" />

          {timelineData.map((era, index) => {
            const visual = eraVisualData[index]
            const isActive = activeEraIndex === index
            const isPast = index < activeEraIndex
            const ActiveIcon = visual.icon
            const currentTab = eraTabs[index] || visual.defaultTab

            return (
              <div
                key={era.id}
                ref={(el) => (stepRefs.current[index] = el)}
                className="era-row relative sm:pl-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
              >
                {/* Glowing Node on Timeline Spine */}
                <div className="hidden sm:flex absolute left-0 top-10 items-center justify-center w-12 h-12 -translate-x-1/2 z-20">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FFD200] ring-4 ring-[#103B9B] scale-125 shadow-[0_0_22px_#FFD200]'
                        : isPast
                        ? 'bg-[#103B9B] ring-2 ring-[#FFD200]/40 scale-100'
                        : 'bg-slate-700 ring-2 ring-slate-800 scale-90'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        isActive ? 'bg-[#061033] animate-ping' : 'bg-white/80'
                      }`}
                    />
                  </div>
                </div>

                {/* LEFT COLUMN: Traditional Classroom Chalkboard */}
                <div className="lg:col-span-5 flex flex-col">
                  <div
                    className={`blackboard-panel h-full flex flex-col rounded-2xl sm:rounded-3xl border-[8px] sm:border-[10px] border-[#3E2314] ring-1 ring-[#5C3A21] bg-[#121C17] shadow-[inset_0_0_25px_rgba(0,0,0,0.9),0_18px_40px_rgba(0,0,0,0.6)] relative overflow-hidden ${
                      isActive
                        ? 'ring-4 ring-[#FFD200]/50 shadow-[0_0_30px_rgba(255,210,0,0.20)]'
                        : isPast
                        ? 'chalk-duster-erased'
                        : 'opacity-40'
                    }`}
                  >
                    {/* Blackboard Slate Surface Texture & Smudges */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06)_0%,transparent_65%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.02)_40%,transparent_60%)] pointer-events-none" />

                    {/* Faint Duster Eraser Smear Lines across the board */}
                    {isPast && (
                      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(255,255,255,0.04)_30px,transparent_34px)]" />
                    )}

                    {/* Chalk Content Area */}
                    <div className="relative z-10 p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">

                      {/* Top Row: Chalk Era & Year Badge */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#FEF08A] shrink-0" />
                          <ChalkText
                            text={era.year}
                            className="font-chalk text-xl sm:text-2xl font-bold text-[#FEF08A] tracking-wider cursor-default"
                          />
                        </div>
                        <ChalkText
                          text={`★ Era 0${era.id}`}
                          className="font-chalk text-sm sm:text-base font-bold text-[#FEF08A] border-2 border-dashed border-[#FEF08A]/70 px-2.5 py-0.5 rounded-md bg-[#FEF08A]/10 cursor-default"
                        />
                      </div>

                      {/* Chalkboard Headline */}
                      <div className="space-y-1">
                        <h3
                          className={`font-chalk text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] font-bold tracking-wide leading-tight cursor-default ${
                            isActive ? 'animate-chalk-write' : ''
                          }`}
                        >
                          <ChalkText text={era.title} />
                        </h3>
                        <p className="font-chalk text-base sm:text-lg text-[#FEF08A]/90 cursor-default">
                          <ChalkText text={`~ ${visual.tagline} ~`} />
                        </p>
                      </div>

                      {/* Chalkboard Narrative Body */}
                      <p
                        className={`font-chalk text-base sm:text-xl text-[#F1F5F9] leading-relaxed cursor-default ${
                          isActive ? 'animate-chalk-write' : ''
                        }`}
                        style={{ animationDelay: '0.12s' }}
                      >
                        {era.description}
                      </p>

                      {/* Chalk Deliverables Checklist */}
                      <div className="pt-3 border-t border-white/10 space-y-2.5">
                        <div className="text-[11px] font-mono uppercase tracking-widest text-[#FEF08A]/80 font-bold">
                          Classroom Directives:
                        </div>
                        {visual.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className={`flex items-start gap-2 text-sm sm:text-base font-chalk text-[#CBD5E1] cursor-default ${
                              isActive ? 'animate-chalk-write' : ''
                            }`}
                            style={{ animationDelay: `${0.18 + dIdx * 0.08}s` }}
                          >
                            <span className="text-[#FEF08A] font-bold text-lg shrink-0 leading-none select-none">
                              ✓
                            </span>
                            <ChalkText text={item} className="leading-snug" />
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Luminous Cinema Projector Screen (~55% -> 7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div
                    className={`cinema-light-leak rounded-2xl sm:rounded-3xl bg-white text-[#081438] p-5 sm:p-7 shadow-2xl border-4 sm:border-6 border-slate-800 ring-1 ring-slate-700/60 flex flex-col justify-between relative overflow-hidden transition-[opacity,box-shadow] duration-400 ${
                      isActive
                        ? 'shadow-[0_0_45px_rgba(70,140,255,0.35),0_20px_40px_rgba(0,0,0,0.6)]'
                        : 'opacity-90 hover:opacity-100 shadow-[0_0_25px_rgba(16,59,155,0.2)]'
                    }`}
                  >
                    {/* Cinema Overhead Projector Light Beam Simulation */}
                    <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#80B0FF]/15 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl opacity-15 bg-[#103B9B] pointer-events-none" />
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-[#FFD200] pointer-events-none" />

                    {/* Screen Header & Era Badge */}
                    <div className="relative z-10 space-y-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#103B9B] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                          <ActiveIcon className="w-4 h-4 text-[#FFD200]" />
                          <span>{visual.badge}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl sm:text-2xl font-black text-[#103B9B] font-mono">
                            <DecryptedText
                              text={era.year}
                              animateOn="mount"
                              speed={20}
                              className="text-[#103B9B] font-mono font-bold"
                            />
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Cinema Projection Screen
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#081438] tracking-tight">
                          {era.title}
                        </h4>
                        <p className="mt-1 text-sm font-semibold text-[#103B9B]">
                          {visual.tagline}
                        </p>
                      </div>

                      {/* Interactive Media Tab Selectors */}
                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        {/* Tab: MLA Donor */}
                        <button
                          type="button"
                          onClick={() => setTabForEra(index, 'donor')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                            currentTab === 'donor'
                              ? 'bg-[#103B9B] text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          MLA Donor Boot Screen
                        </button>

                        {/* Tab: HM Salvi Video */}
                        <button
                          type="button"
                          onClick={() => setTabForEra(index, 'salvi')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                            currentTab === 'salvi'
                              ? 'bg-[#C41230] text-white shadow-sm ring-2 ring-[#C41230]/30'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>HM Salvi Video</span>
                        </button>

                        {/* Tab: Classroom Impact Video */}
                        <button
                          type="button"
                          onClick={() => setTabForEra(index, 'impact')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                            currentTab === 'impact'
                              ? 'bg-[#C41230] text-white shadow-sm ring-2 ring-[#C41230]/30'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Classroom Impact</span>
                        </button>

                        {/* Tab: Hardware Specs */}
                        <button
                          type="button"
                          onClick={() => setTabForEra(index, 'specs')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                            currentTab === 'specs'
                              ? 'bg-[#081438] text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          Hardware Specs
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Viewport Canvas Inside Screen */}
                    <div className="relative z-10 my-4 flex-1 flex flex-col justify-center min-h-[280px]">
                      
                      {/* 1. MLA BHARAT GOGAVALE DONOR PREVIEW */}
                      {currentTab === 'donor' && (
                        <div className="rounded-2xl bg-[#081438] p-5 sm:p-6 border-2 border-[#103B9B] text-white text-center flex flex-col items-center justify-center space-y-4 shadow-xl">
                          <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/10 pb-2">
                            <span className="text-[#FFD200] font-bold">PROJECTOR KERNEL BOOT SCREEN</span>
                            <span>RESOLUTION: 1080P UHD</span>
                          </div>

                          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#103B9B] to-[#C41230] flex items-center justify-center shadow-lg border border-[#FFD200]/50 animate-pulse">
                            <Award className="w-7 h-7 text-[#FFD200]" />
                          </div>

                          <div className="space-y-1">
                            <span className="text-xs font-mono uppercase tracking-widest text-[#FFD200] font-black">
                              MAHARASHTRA VIDHAN SABHA • VIDHAYAK NIDHI
                            </span>
                            <h5 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                              Donated by MLA Bharat Gogavale
                            </h5>
                            <p className="text-xs text-slate-300 max-w-sm mx-auto">
                              "Dedicated for the digital empowerment of rural Zilla Parishad students across Mahad & Khed constituencies."
                            </p>
                          </div>

                          {/* Startup Progress Bar */}
                          <div className="w-full max-w-xs space-y-1.5 pt-1">
                            <div className="flex justify-between text-[10px] font-mono text-slate-400">
                              <span>OFFLINE STATE BOARD SYLLABUS</span>
                              <span className="text-emerald-400 font-bold">READY</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="w-full h-full bg-gradient-to-r from-[#C41230] via-[#FFD200] to-emerald-400 rounded-full" />
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#FFD200] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/10">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Tamper-Proof BIOS ROM • Zero Recurring Cloud Costs</span>
                          </div>
                        </div>
                      )}

                      {/* 2. HEADMASTER SALVI VIDEO EMBED */}
                      {currentTab === 'salvi' && (
                        <div className="rounded-2xl overflow-hidden border-2 border-[#103B9B] shadow-xl bg-slate-950 flex flex-col h-full min-h-[280px]">
                          <div className="bg-[#103B9B] px-4 py-2 flex items-center justify-between text-xs text-white font-bold shrink-0">
                            <span className="flex items-center gap-2">
                              <Volume2 className="w-3.5 h-3.5 text-[#FFD200]" />
                              Headmaster Salvi • Walan English School
                            </span>
                            <a
                              href="https://www.youtube.com/watch?v=J3EQ6acI7oU"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-[#FFD200] hover:underline"
                            >
                              <span>YouTube</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <div className="relative flex-1 w-full min-h-[240px]">
                            {/* Skeleton shimmer loader visible until iframe paints */}
                            <div className="video-skeleton absolute inset-0 flex flex-col items-center justify-center gap-3">
                              <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
                              <span className="text-xs text-slate-500 font-mono">Loading video…</span>
                            </div>
                            <iframe
                              src="https://www.youtube-nocookie.com/embed/J3EQ6acI7oU"
                              title="Headmaster Salvi Interview - Walan English School"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                              className="absolute inset-0 w-full h-full z-10"
                              onLoad={(e) => e.target.previousElementSibling && (e.target.previousElementSibling.style.display = 'none')}
                            />
                          </div>
                        </div>
                      )}

                      {/* 3. CLASSROOM IMPACT VIDEO EMBED */}
                      {currentTab === 'impact' && (
                        <div className="rounded-2xl overflow-hidden border-2 border-[#103B9B] shadow-xl bg-slate-950 flex flex-col h-full min-h-[280px]">
                          <div className="bg-[#103B9B] px-4 py-2 flex items-center justify-between text-xs text-white font-bold shrink-0">
                            <span className="flex items-center gap-2">
                              <Volume2 className="w-3.5 h-3.5 text-[#FFD200]" />
                              Classroom Tech in Action • ZP Rural Konkan
                            </span>
                            <a
                              href="https://www.youtube.com/watch?v=3xy5Ti_cFRU"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-[#FFD200] hover:underline"
                            >
                              <span>YouTube</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <div className="relative flex-1 w-full min-h-[240px]">
                            {/* Skeleton shimmer loader visible until iframe paints */}
                            <div className="video-skeleton absolute inset-0 flex flex-col items-center justify-center gap-3">
                              <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
                              <span className="text-xs text-slate-500 font-mono">Loading video…</span>
                            </div>
                            <iframe
                              src="https://www.youtube-nocookie.com/embed/3xy5Ti_cFRU"
                              title="Classroom Tech in Action - Rural Konkan"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                              className="absolute inset-0 w-full h-full z-10"
                              onLoad={(e) => e.target.previousElementSibling && (e.target.previousElementSibling.style.display = 'none')}
                            />
                          </div>
                        </div>
                      )}

                      {/* 4. HARDWARE SPECS VIEW */}
                      {currentTab === 'specs' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-3">
                            {visual.stats.map((st, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left shadow-xs"
                              >
                                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                  {st.label}
                                </div>
                                <div className="mt-1 text-sm sm:text-base font-extrabold text-[#103B9B] truncate font-mono">
                                  {st.val}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 rounded-2xl bg-[#0A1E5C] text-white border border-[#FFD200]/30 shadow-md">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#FFD200] uppercase tracking-wider mb-1">
                              <Sliders className="w-3.5 h-3.5 text-[#FFD200]" />
                              <span>Hardware & Deployment Profile</span>
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-white/95 leading-relaxed">
                              {visual.specHighlight}
                            </p>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Card Footer */}
                    <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD200] shrink-0" />
                        <span>Projection Hall Verified Stream</span>
                      </div>
                      <span className="font-mono font-bold text-[#103B9B]">
                        Konkan Deployment
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
