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
import ProjectorScreen from './ProjectorScreen'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const eraIcons = [Monitor, HardDrive, Film, Zap, Award]

export default function TimelineSection() {
  const [activeEraIndex, setActiveEraIndex] = useState(0)
  const containerRef = useRef(null)
  const boardRefs = useRef([])
  const { t } = useLanguage()

  const rawEras = t('timeline.eras') || []
  const mergedEraData = rawEras.map((era, i) => ({
    timeline: {
      id: era.id,
      year: era.year,
      title: era.title,
      description: era.description,
    },
    visual: {
      badge: era.badge,
      tagline: era.tagline,
      icon: eraIcons[i] || Monitor,
      stats: era.stats || [],
      deliverables: era.deliverables || [],
      specHighlight: era.specHighlight || '',
      defaultTab: era.defaultTab || 'specs',
    },
  }))

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
            <span>{t('timeline.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#FFFFFF] tracking-tight drop-shadow-sm">
            {t('timeline.heading')}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {t('timeline.subheading')}
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

            {mergedEraData.map((eraObj, index) => {
              const { timeline: era, visual } = eraObj
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

                  {/* ── Blackboard Card (Authentic Classroom Green Slate #121C17 with Wooden Frame) ── */}
                  <div
                    ref={(el) => (boardRefs.current[index] = el)}
                    className={`blackboard-panel flex flex-col rounded-2xl sm:rounded-3xl border-[6px] sm:border-[8px] border-[#3E2314] ring-1 ring-[#5C3A21] bg-[#121C17] shadow-[inset_0_0_28px_rgba(0,0,0,0.85),0_18px_40px_rgba(0,0,0,0.6)] relative overflow-hidden transition-opacity duration-300 ease-out select-text ${
                      isActive
                        ? 'opacity-100 ring-2 ring-[#FEF08A]/40'
                        : 'opacity-30'
                    }`}
                  >
                    {/* Faint slate chalk haze textures */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05)_0%,transparent_65%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.015)_40%,transparent_60%)] pointer-events-none" />

                    {/* Content Container */}
                    <div className="p-5 sm:p-7 flex-1 flex flex-col space-y-4 relative z-10">
                      {/* 1. Era pill bar & badge */}
                      <div className="flex items-center justify-between border-b border-white/15 pb-3">
                        <div className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#FEF08A] shrink-0" />
                          <span className="font-chalk text-xl sm:text-2xl font-bold text-[#FEF08A] tracking-wider">
                            {era.year}
                          </span>
                        </div>
                        <span className="font-chalk text-sm sm:text-base font-bold text-[#FEF08A] border border-dashed border-[#FEF08A]/60 px-2.5 py-0.5 rounded-md bg-[#FEF08A]/10">
                          ★ {t('timeline.eraPill')}{era.id}
                        </span>
                      </div>

                      {/* 2. Main title (Silverish / Grey chalk on green slate) */}
                      <h3 className="font-chalk text-2xl sm:text-3xl lg:text-4xl text-[#CBD5E1] font-bold tracking-wide leading-tight">
                        {era.title}
                      </h3>

                      {/* 3. Subtitle (Warm chalk yellow) */}
                      <p className="font-chalk text-base sm:text-lg text-[#FEF08A]/90">
                        ~ {visual.tagline} ~
                      </p>

                      {/* 4. Narrative description (Silverish chalk text) */}
                      <p className="font-chalk text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                        {era.description}
                      </p>

                      {/* 5. Directives checklist */}
                      <div className="pt-3 border-t border-white/15 space-y-2.5">
                        <div className="text-[11px] font-mono uppercase tracking-widest text-[#FEF08A] font-bold">
                          {t('timeline.directivesHeader')}
                        </div>
                        {visual.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-2.5 text-sm sm:text-base font-chalk text-[#CBD5E1]"
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

                    {/* Authentic Wooden Bottom Chalk Rail / Trough */}
                    <div className="h-3.5 w-full bg-[#2A180D] border-t-2 border-[#4A2C18] shadow-inner flex items-center justify-between px-4 shrink-0 z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-1 bg-[#CBD5E1]/90 rounded-xs shadow-xs" />
                        <div className="w-3 h-1 bg-[#FEF08A]/90 rounded-xs shadow-xs" />
                      </div>
                      <div className="w-8 h-1.5 bg-[#5C3A21] rounded-xs border border-[#3E2314]" />
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

          {/* ═══ RIGHT COLUMN: Single Pinned Projector Screen (lg+ only, GPU Isolated) ═══ */}
          <div
            className="hidden lg:block lg:w-[55%] sticky top-24 self-start will-change-transform"
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
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

