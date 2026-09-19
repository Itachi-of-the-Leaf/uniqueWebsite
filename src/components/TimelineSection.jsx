import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Monitor,
  HardDrive,
  Film,
  Award,
  Calendar,
  Zap,
  TrendingUp,
} from 'lucide-react'
import timelineData from '../data/timelineData.json'
import ProjectorScreen from './ProjectorScreen'

gsap.registerPlugin(ScrollTrigger)

/* ── Static visual metadata per era ── */
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
    specHighlight:
      'Custom Intel x86 Hardware • CRT Displays • Local Konkan Support',
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
    specHighlight:
      '₹25,000 Turnkey LED Kit • Offline Pen-Drive OS • No Smartboard Fees',
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
    specHighlight:
      'Zankar DVD Syllabus • Multi-District Ashrams • Scaled Konkan Trust',
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
    specHighlight:
      'Google EDLA Certification • Offline AI Tools • Zero Annual Fees',
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
    specHighlight:
      'Custom Firmware Splash • MLA Donor Recognition • Verifiable CSR Impact',
    defaultTab: 'donor',
  },
]

/* ── Merge timeline + visual data for the projector screen ── */
const mergedEraData = timelineData.map((td, i) => ({
  timeline: td,
  visual: eraVisualData[i],
}))

/* ══════════════════════════════════════════════════════
   TimelineSection — Scrollytelling Architecture
   Left: 100% Static Realism Blackboard Cards (#0F172A slate, chalk-rail, 100%/30% opacity).
   Right: Single Pinned ProjectorScreen with micro-tilt & video facade.
   ══════════════════════════════════════════════════════ */
export default function TimelineSection() {
  const [activeEraIndex, setActiveEraIndex] = useState(0)
  const containerRef = useRef(null)
  const boardRefs = useRef([])

  /* ── GSAP ScrollTrigger wiring for era synchronization ── */
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        boardRefs.current.forEach((boardEl, index) => {
          if (!boardEl) return

          ScrollTrigger.create({
            trigger: boardEl,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveEraIndex(index),
            onEnterBack: () => setActiveEraIndex(index),
          })
        })
      }, containerRef)

      return () => ctx.revert()
    })

    // Mobile viewport triggers
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        boardRefs.current.forEach((boardEl, index) => {
          if (!boardEl) return

          ScrollTrigger.create({
            trigger: boardEl,
            start: 'top 70%',
            end: 'bottom 30%',
            onEnter: () => setActiveEraIndex(index),
            onEnterBack: () => setActiveEraIndex(index),
          })
        })
      }, containerRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-20 lg:py-28 text-white overflow-x-clip border-t border-slate-800"
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
            Scroll through the five transformative eras that turned a local Khed
            computer shop into the most trusted rural educational hardware
            partner across Konkan.
          </p>
        </div>

        {/* ═══ SCROLLYTELLING: Two-Column Layout (lg+) / Stacked (mobile) ═══ */}
        <div className="relative flex flex-col lg:flex-row lg:gap-10 items-start">
          {/* ── Vertical Canary Gold Milestone Spine (visible on sm+) ── */}
          <div className="absolute left-4 sm:left-6 top-6 bottom-12 w-1 bg-gradient-to-b from-[#FFD200] via-[#FFD200]/60 to-[#FFD200]/20 pointer-events-none hidden sm:block lg:hidden opacity-80 shadow-[0_0_12px_rgba(255,210,0,0.45)]" />

          {/* ═══ LEFT COLUMN: Scrolling Static Blackboard Cards ═══ */}
          <div className="relative w-full lg:w-[45%] space-y-[25vh] lg:space-y-[40vh]">
            {/* Spine visible on lg+ only, inside the left col */}
            <div className="absolute left-4 sm:left-6 top-6 bottom-12 w-1 bg-gradient-to-b from-[#FFD200] via-[#FFD200]/60 to-[#FFD200]/20 pointer-events-none hidden lg:block opacity-80 shadow-[0_0_12px_rgba(255,210,0,0.45)]" />

            {timelineData.map((era, index) => {
              const visual = eraVisualData[index]
              const isActive = activeEraIndex === index

              return (
                <div key={era.id} className="relative sm:pl-16">
                  {/* Indicator Node on Timeline Spine */}
                  <div className="hidden sm:flex absolute left-0 top-10 items-center justify-center w-12 h-12 -translate-x-1/2 z-20 pointer-events-none">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FFD200] ring-4 ring-[#103B9B] scale-125 shadow-[0_0_22px_#FFD200]'
                          : 'bg-[#103B9B] ring-2 ring-[#FFD200]/40 scale-100'
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isActive
                            ? 'bg-[#061033] animate-ping'
                            : 'bg-white/80'
                        }`}
                      />
                    </div>
                  </div>

                  {/* ── Blackboard Card (100% Static Realism: Matte Slate #0F172A with Chalk Rail) ── */}
                  <div
                    ref={(el) => (boardRefs.current[index] = el)}
                    className={`blackboard-panel flex flex-col rounded-2xl sm:rounded-3xl border border-[#1E293B] bg-[#0F172A] shadow-xl relative overflow-hidden transition-opacity duration-300 ease-out select-text ${
                      isActive
                        ? 'opacity-100 ring-2 ring-[#FEF08A]/30'
                        : 'opacity-30'
                    }`}
                  >
                    {/* Content Container */}
                    <div className="p-5 sm:p-7 flex-1 flex flex-col space-y-4">
                      {/* 1. Era pill bar & badge */}
                      <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                        <div className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#FEF08A] shrink-0" />
                          <span className="font-chalk text-xl sm:text-2xl font-bold text-[#FEF08A] tracking-wider">
                            {era.year}
                          </span>
                        </div>
                        <span className="font-chalk text-sm sm:text-base font-bold text-[#FEF08A] border border-dashed border-[#FEF08A]/60 px-2.5 py-0.5 rounded-md bg-[#FEF08A]/10">
                          ★ Era 0{era.id}
                        </span>
                      </div>

                      {/* 2. Main title */}
                      <h3 className="font-chalk text-2xl sm:text-3xl lg:text-4xl text-[#F8FAFC] font-bold tracking-wide leading-tight">
                        {era.title}
                      </h3>

                      {/* 3. Subtitle */}
                      <p className="font-chalk text-base sm:text-lg text-[#FEF08A]/90">
                        ~ {visual.tagline} ~
                      </p>

                      {/* 4. Narrative description */}
                      <p className="font-chalk text-base sm:text-lg text-[#F8FAFC] leading-relaxed">
                        {era.description}
                      </p>

                      {/* 5. Directives checklist */}
                      <div className="pt-3 border-t border-[#1E293B] space-y-2.5">
                        <div className="text-[11px] font-mono uppercase tracking-widest text-[#FEF08A] font-bold">
                          Classroom Directives:
                        </div>
                        {visual.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-2.5 text-sm sm:text-base font-chalk text-[#F8FAFC]"
                          >
                            <span className="text-[#FEF08A] font-bold text-lg shrink-0 leading-none select-none">
                              ✓
                            </span>
                            <span className="leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Faint Bottom Wooden / Slate Chalk Rail */}
                    <div className="h-2.5 w-full bg-[#1E293B] border-t border-[#334155] shadow-inner flex items-center px-4 shrink-0">
                      <div className="w-5 h-1 bg-[#F8FAFC]/80 rounded-xs shadow-xs" />
                    </div>
                  </div>

                  {/* ── Mobile-only inline projector card ── */}
                  <div className="lg:hidden mt-8">
                    <ProjectorScreen
                      activeEraIndex={index}
                      eraData={mergedEraData}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* ═══ RIGHT COLUMN: Single Pinned Projector Screen (lg+ only) ═══ */}
          <div className="hidden lg:block lg:w-[55%] sticky top-24 self-start">
            <div className="h-[calc(100vh-8rem)]">
              <ProjectorScreen
                activeEraIndex={activeEraIndex}
                eraData={mergedEraData}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
