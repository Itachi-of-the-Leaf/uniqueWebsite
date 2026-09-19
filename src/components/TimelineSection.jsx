import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Monitor,
  CheckCircle,
  HardDrive,
  Film,
  Award,
  Sliders,
  Calendar,
  Zap,
  TrendingUp,
} from 'lucide-react'
import timelineData from '../data/timelineData.json'
import DecryptedText from './DecryptedText'
import WarliBorder from './WarliBorder'

gsap.registerPlugin(ScrollTrigger)

/**
 * WarliDancingFigure - Authentic Maharashtrian Tarpa tribal dancer stick figure
 * Opposing triangles with dynamic dancing arms & legs.
 */
function WarliDancingFigure({ isActive = false, className = '' }) {
  const fillColor = isActive ? '#D97706' : '#9E8074'
  const strokeColor = isActive ? '#F59E0B' : '#7D5E52'
  const haloFill = isActive ? 'rgba(217, 119, 6, 0.2)' : 'transparent'

  return (
    <div
      className={`relative flex items-center justify-center transition-all duration-500 ${
        isActive ? 'scale-110 drop-shadow-md' : 'scale-95 opacity-70'
      } ${className}`}
    >
      <svg
        width="44"
        height="56"
        viewBox="0 0 44 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Active Radiance Halo */}
        {isActive && (
          <circle cx="22" cy="28" r="21" fill={haloFill} stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
        )}

        {/* Head & Traditional Topknot */}
        <circle cx="22" cy="11" r="5" fill={fillColor} />
        <circle cx="28" cy="8" r="2.5" fill={fillColor} />

        {/* Neck */}
        <line x1="22" y1="16" x2="22" y2="19" stroke={strokeColor} strokeWidth="2" />

        {/* Torso: Opposing Triangles */}
        {/* Upper Triangle (Chest) */}
        <polygon points="12,19 32,19 22,31" fill={fillColor} />
        {/* Lower Triangle (Pelvis) */}
        <polygon points="22,31 14,43 30,43" fill={fillColor} />

        {/* Dynamic Dancing Arms (Tarpa Festival Pose) */}
        <path
          d="M 14 22 L 5 18 L 8 8"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 30 22 L 39 26 L 36 36"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Rhythm Dancing Bent Legs */}
        <path
          d="M 16 43 L 11 48 L 19 53"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 28 43 L 33 48 L 25 53"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

export default function TimelineSection() {
  const [activeEraIndex, setActiveEraIndex] = useState(0)
  const containerRef = useRef(null)
  const stepRefs = useRef([])

  const eraVisualData = [
    {
      badge: 'Pioneering Ground Zero',
      tagline: 'Laying IT Foundations in Konkan',
      highlightColor: 'from-amber-600 to-orange-500',
      accentBorder: 'border-amber-400',
      icon: Monitor,
      stats: [
        { label: 'Location', val: 'Khed Bazaar' },
        { label: 'Turnaround', val: '24-hr Local Repair' },
        { label: 'Standard', val: 'CRT & Custom Rigs' },
      ],
      deliverables: [
        'First dedicated computer retail & assembly center in Khed region',
        'Eliminated 150km repair travel to Mumbai / Pune for local businesses',
        'Conducted first digital literacy workshops for rural educators',
      ],
      specHighlight: 'Custom Intel x86 Hardware • CRT Displays • Local Konkan Service',
    },
    {
      badge: 'The ₹25K Breakthrough',
      tagline: 'Engineering Within ZP ₹30,000 Grant Limits',
      highlightColor: 'from-orange-600 to-amber-600',
      accentBorder: 'border-orange-500',
      icon: HardDrive,
      stats: [
        { label: 'ZP Grant Limit', val: '₹30,000' },
        { label: 'Rig Cost', val: '₹25,000 Only' },
        { label: 'Surplus Left', val: '₹5,000 for School' },
      ],
      deliverables: [
        'High-lumen LED projector + 32GB offline USB pen-drive bundle',
        'Zero screen damage risk: Projected directly onto whitewashed classroom walls',
        '100% immune to rural power cuts & internet blackout zones',
      ],
      specHighlight: '₹25,000 Turnkey LED Kit • Offline Pen-Drive OS • No Smartboard Fees',
    },
    {
      badge: 'Institutional Scale',
      tagline: '100+ Schools with Zankar & Pride India',
      highlightColor: 'from-amber-700 to-orange-600',
      accentBorder: 'border-amber-600',
      icon: Film,
      stats: [
        { label: 'Schools', val: '100+ Connected' },
        { label: 'Curriculum', val: 'Maharashtra State Board' },
        { label: 'Key Lead', val: 'Mr. Apte (MMACETP)' },
      ],
      deliverables: [
        'Complete Maharashtra State Board Marathi & Semi-English syllabus via Zankar DVDs',
        'Strategic partnership with MMACETP (Mr. Apte) & Pride India CSR',
        'Teacher onboarding bootcamp: 0 to confident digital instructors in 2 hours',
      ],
      specHighlight: 'Zankar DVD Syllabus • Multi-District Ashrams • Scaled Konkan Trust',
    },
    {
      badge: 'The Technical Edge',
      tagline: 'Google EDLA 4K Panels & Smart AI Projection',
      highlightColor: 'from-orange-600 to-red-600',
      accentBorder: 'border-orange-600',
      icon: Zap,
      stats: [
        { label: 'Resolution', val: '1080p & 4K UHD' },
        { label: 'Certification', val: 'Google EDLA' },
        { label: 'Annual SaaS', val: '₹0 / No Renewal' },
      ],
      deliverables: [
        '1080p Smart Android wireless classroom projectors with built-in stereo audio',
        'Google EDLA certified 65"/75" interactive multi-touch AI panels',
        'Anti-SaaS policy: Lifetime offline functionality with zero recurring fees',
      ],
      specHighlight: 'Google EDLA Certification • Offline AI Tools • Zero Annual Fees',
    },
    {
      badge: 'Sovereign Visibility',
      tagline: 'Custom Boot Screens for MLA & CSR Donors',
      highlightColor: 'from-amber-600 to-orange-700',
      accentBorder: 'border-amber-500',
      icon: Award,
      stats: [
        { label: 'Branding', val: 'Firmware-Level' },
        { label: 'Boot Logo', val: 'Constituency / CSR' },
        { label: 'Longevity', val: 'Permanent Display' },
      ],
      deliverables: [
        'Custom BIOS & Android boot logos acknowledging local MLA / CSR leadership',
        'High-durability anodized donor plaques and tamper-proof branding',
        'Guaranteed transparency that inspires recurring constituency funding',
      ],
      specHighlight: 'Custom Firmware Splash • MLA Donor Recognition • Verifiable CSR Impact',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return

        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveEraIndex(index),
          onEnterBack: () => setActiveEraIndex(index),
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const currentVisual = eraVisualData[activeEraIndex] || eraVisualData[0]
  const currentTimelineItem = timelineData[activeEraIndex] || timelineData[0]
  const ActiveIcon = currentVisual.icon

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative bg-[#F8F4EB] py-20 lg:py-28 border-t border-[#E8DFD1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-[#5C2418] text-xs font-black uppercase tracking-wider mb-3 border border-amber-300/60 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Tribal Folk Art Chronicle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B1810] tracking-tight">
            25 Years of Grassroots Innovation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C2418]/80 font-normal leading-relaxed">
            Scroll through the five transformative eras that turned a local Khed computer shop into the most trusted rural educational hardware partner across Konkan.
          </p>
        </div>

        {/* Dual-Column Scrollytelling Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Warli Dotted Track & Narrative Text Steps (~5 cols on lg) */}
          <div className="lg:col-span-5 relative pb-20">
            
            {/* Warli Dotted Progress Line running vertically */}
            <div className="absolute left-6 top-8 bottom-16 w-0.5 border-l-2 border-dashed border-[#D97706]/40 pointer-events-none hidden sm:block" />

            <div className="space-y-20 lg:space-y-28">
              {timelineData.map((era, index) => {
                const isActive = activeEraIndex === index
                const visual = eraVisualData[index]

                return (
                  <div
                    key={era.id}
                    ref={(el) => (stepRefs.current[index] = el)}
                    className="relative sm:pl-16 transition-all duration-500"
                  >
                    {/* Warli Dancing-Figure Milestone Marker on Dotted Track */}
                    <div className="hidden sm:flex absolute left-0 top-6 items-center justify-center w-12 h-14 -translate-x-1/2 z-10">
                      <WarliDancingFigure isActive={isActive} />
                    </div>

                    {/* Narrative Card */}
                    <div
                      className={`transition-all duration-500 rounded-3xl p-6 sm:p-8 bg-[#FFFDF9] ${
                        isActive
                          ? 'opacity-100 shadow-xl shadow-[#5C2418]/12 border-2 border-[#D97706] scale-[1.02] ring-2 ring-[#D97706]/20'
                          : 'opacity-40 border border-[#E8DFD1] hover:opacity-75 scale-100'
                      }`}
                    >
                      {/* Mobile Dancing Figure & Era Badge */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="sm:hidden">
                            <WarliDancingFigure isActive={isActive} />
                          </div>
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full ${
                              isActive
                                ? 'bg-[#D97706] text-[#FAF9F6] shadow-sm'
                                : 'bg-[#E8DFD1] text-[#2B1810]'
                            }`}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            {era.year}
                          </span>
                        </div>

                        <span className="text-xs font-black uppercase tracking-widest text-[#5C2418]/70">
                          Era 0{era.id}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2B1810] tracking-tight">
                        {era.title}
                      </h3>

                      {/* Narrative Body */}
                      <p className="mt-4 text-[#3B2317] text-base leading-relaxed font-normal">
                        {era.description}
                      </p>

                      {/* Key Highlights Checklist */}
                      <div className="mt-6 pt-5 border-t border-[#E8DFD1] space-y-3">
                        {visual.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B1810]">
                            <CheckCircle
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isActive ? 'text-[#D97706]' : 'text-[#8C6D62]'
                              }`}
                            />
                            <span className="font-medium leading-normal">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Active Indicator with Warli Motifs */}
                      {isActive && (
                        <div className="mt-6 inline-flex items-center gap-2 text-xs font-black text-[#5C2418] bg-amber-100/80 px-3.5 py-1.5 rounded-xl border border-amber-300">
                          <span className="w-2 h-2 rounded-full bg-[#D97706] animate-ping" />
                          <span>Active Warli Milestone</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Pinned Tribal Canvas Plaque Card (~7 cols on lg) */}
          <div className="lg:col-span-7 sticky top-28 h-[calc(100vh-8rem)] min-h-[580px] max-h-[740px] flex flex-col justify-between">
            <div className="h-full rounded-3xl bg-[#421A11] text-[#FAF9F6] p-6 sm:p-8 lg:p-9 shadow-2xl border-4 border-[#5C2418] ring-1 ring-amber-500/40 flex flex-col justify-between relative overflow-hidden">
              
              {/* Traditional Inlaid Warli Geometric Border on Plaque Header */}
              <div className="absolute top-0 left-0 right-0 z-20">
                <WarliBorder color="#FAF9F6" accentColor="#D97706" height={16} variant="trim" opacity={0.8} />
              </div>

              {/* Background Glow Layer */}
              <div
                className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${currentVisual.highlightColor} transition-all duration-700 pointer-events-none`}
              />
              <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full blur-3xl opacity-15 bg-amber-500 transition-all duration-700 pointer-events-none" />

              {/* Card Header & Era Badge */}
              <div className="relative z-10 pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A100B]/90 border border-amber-500/40 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-inner">
                    <ActiveIcon className="w-4 h-4 text-amber-400" />
                    <span>{currentVisual.badge}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                      <DecryptedText
                        text={currentTimelineItem.year}
                        animateOn="mount"
                        speed={20}
                        className="text-amber-400 font-mono"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-amber-200/70 uppercase tracking-widest">
                      Tribal Canvas Milestone
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#FAF9F6] tracking-tight">
                    {currentTimelineItem.title}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-amber-200/90">
                    {currentVisual.tagline}
                  </p>
                </div>
              </div>

              {/* Card Middle: Key Impact Metrics & Tech Spec Grid */}
              <div className="relative z-10 my-6 space-y-5">
                
                {/* Metric Strip Styled as Terracotta Plaques */}
                <div className="grid grid-cols-3 gap-3">
                  {currentVisual.stats.map((st, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl bg-[#2D120B]/80 border border-amber-500/25 shadow-inner"
                    >
                      <div className="text-[11px] font-semibold text-amber-300/80 uppercase tracking-wider">
                        {st.label}
                      </div>
                      <div className="mt-1 text-sm sm:text-base font-extrabold text-[#FAF9F6] truncate font-mono">
                        {st.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Architecture Badge */}
                <div className="p-4 rounded-2xl bg-[#32140D] border-2 border-amber-500/30 backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hardware & Deployment Profile</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#FAF9F6]">
                    {currentVisual.specHighlight}
                  </p>
                </div>

              </div>

              {/* Card Footer: Era Progress Tabs & Warli Border Inlay */}
              <div className="relative z-10 pt-4 border-t border-amber-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-200/80">
                    Chronicle Era ({activeEraIndex + 1} of {timelineData.length})
                  </span>
                  <span className="text-xs font-semibold text-amber-400">
                    Scroll down for next era
                  </span>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-5 gap-2">
                  {timelineData.map((era, i) => (
                    <button
                      key={era.id}
                      onClick={() => {
                        const target = stepRefs.current[i]
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === activeEraIndex
                          ? 'bg-amber-400 shadow-sm shadow-amber-500/60 scale-y-125'
                          : i < activeEraIndex
                          ? 'bg-amber-600/80'
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                      title={`Jump to ${era.year}: ${era.title}`}
                      aria-label={`Jump to era ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Inlaid Warli Border */}
              <div className="absolute bottom-0 left-0 right-0 z-20">
                <WarliBorder color="#FAF9F6" accentColor="#D97706" height={16} variant="trim" flip opacity={0.8} />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

