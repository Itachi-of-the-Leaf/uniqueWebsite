import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import {
  Award,
  Sliders,
  Play,
  Volume2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import DecryptedText from './DecryptedText'
import ProjectorVideoPlayer from './ProjectorVideoPlayer'
import { useLanguage } from '../context/LanguageContext'

export default function ProjectorScreen({ activeEraIndex, eraData }) {
  const { t } = useLanguage()
  // All hooks must be called unconditionally (rules of hooks)
  const [tabs, setTabs] = useState(() => eraData.map((e) => e.visual.defaultTab))
  const [displayedEra, setDisplayedEra] = useState(activeEraIndex)
  const slideRef = useRef(null)
  const containerRef = useRef(null)
  const shadowRef = useRef(null)
  const rafIdRef = useRef(null)
  const pendingEraRef = useRef(activeEraIndex)

  const setTab = useCallback(
    (tab) =>
      setTabs((prev) => {
        const next = [...prev]
        next[displayedEra] = tab
        return next
      }),
    [displayedEra]
  )

  // ── Smooth, Seamless Projector Screen Transitions (Animated Crossfade) ──
  useEffect(() => {
    pendingEraRef.current = activeEraIndex
    if (activeEraIndex === displayedEra) return

    const el = slideRef.current
    if (!el) {
      setDisplayedEra(activeEraIndex)
      return
    }

    gsap.killTweensOf(el)
    gsap.to(el, {
      opacity: 0,
      y: -6,
      duration: 0.15,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => {
        setDisplayedEra(pendingEraRef.current)
      },
    })
  }, [activeEraIndex])

  // When displayedEra updates, smoothly animate the new slide in
  useEffect(() => {
    const el = slideRef.current
    if (!el) return

    gsap.killTweensOf(el)
    gsap.fromTo(
      el,
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    )
  }, [displayedEra])

  // Failsafe watchdog: guarantee slide content is never stuck invisible
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = slideRef.current
      if (el && parseFloat(getComputedStyle(el).opacity) < 0.25) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.15, overwrite: 'auto' })
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [activeEraIndex, displayedEra])

  // Clean up any pending RAF on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  /* ── Combined 3D Perspective Micro-Tilt (±1.5deg) & Optical Shadow (RAF Throttled) ── */
  const handleMouseMove = (e) => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return
    if (!containerRef.current) return

    const clientX = e.clientX
    const clientY = e.clientY

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafIdRef.current = null
          return
        }

        const rect = containerRef.current.getBoundingClientRect()

        // 1. Subtle 3D perspective tilt (bounded strictly between -1.5deg and 1.5deg)
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const offsetX = clientX - centerX
        const offsetY = clientY - centerY

        const rotY = Math.max(-1.5, Math.min(1.5, (offsetX / (rect.width / 2)) * 1.5))
        const rotX = Math.max(-1.5, Math.min(1.5, (-offsetY / (rect.height / 2)) * 1.5))

        containerRef.current.style.setProperty('--rotate-x', `${rotX.toFixed(2)}deg`)
        containerRef.current.style.setProperty('--rotate-y', `${rotY.toFixed(2)}deg`)

        // 2. Optical cursor shadow position
        if (shadowRef.current) {
          const x = clientX - rect.left - 110
          const y = clientY - rect.top - 110
          shadowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.15)`
        }

        rafIdRef.current = null
      })
    }
  }

  const handleMouseEnter = () => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return
    if (shadowRef.current) {
      shadowRef.current.style.opacity = '1'
      shadowRef.current.style.willChange = 'transform'
    }
  }

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    if (containerRef.current) {
      containerRef.current.style.setProperty('--rotate-x', '0deg')
      containerRef.current.style.setProperty('--rotate-y', '0deg')
    }
    if (shadowRef.current) {
      shadowRef.current.style.opacity = '0'
      shadowRef.current.style.willChange = 'auto'
    }
  }

  const era = eraData[displayedEra] || eraData[activeEraIndex]
  if (!era) return null

  const { timeline: td, visual } = era
  const ActiveIcon = visual.icon
  const currentTab = tabs[displayedEra] || visual.defaultTab

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-projector-screen="true"
      className="cinema-light-leak rounded-2xl sm:rounded-3xl bg-white text-[#081438] p-5 sm:p-7 border-4 sm:border-6 border-slate-800 ring-1 ring-slate-700/60 flex flex-col relative overflow-hidden h-full will-change-transform"
      style={{
        transform:
          'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow:
          '0 0 50px rgba(16, 59, 155, 0.25), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Cinema Overhead Projector Light Beam (Strictly pointer-events: none) */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#80B0FF]/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl opacity-15 bg-[#103B9B] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-[#80B0FF] pointer-events-none" />

      {/* Optical Projector Light Cone & Beam Dust pseudo-overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-bl from-white/10 via-transparent to-black/5"
        style={{
          background:
            'radial-gradient(circle at 90% 10%, rgba(140, 190, 255, 0.14) 0%, rgba(16, 59, 155, 0.04) 50%, transparent 80%)',
        }}
      />

      {/* ── Optical Beam Cursor Shadow Layer (Pre-blurred GPU silhouette with optical penumbra) ── */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden mix-blend-multiply">
        <div
          ref={shadowRef}
          className="absolute top-0 left-0 w-[220px] h-[220px] pointer-events-none opacity-0 transition-opacity duration-150 ease-out"
          style={{
            transform: 'translate3d(-500px, -500px, 0) scale(1.15)',
          }}
        >
          <svg
            viewBox="0 0 220 220"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient
                id="opticalPenumbra"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="rgba(10, 15, 30, 0.65)" />
                <stop offset="40%" stopColor="rgba(10, 15, 30, 0.52)" />
                <stop offset="70%" stopColor="rgba(10, 15, 30, 0.22)" />
                <stop offset="100%" stopColor="rgba(10, 15, 30, 0)" />
              </radialGradient>
              <radialGradient
                id="handSilhouetteCore"
                cx="42%"
                cy="42%"
                r="45%"
              >
                <stop offset="0%" stopColor="rgba(8, 12, 24, 0.70)" />
                <stop offset="60%" stopColor="rgba(8, 12, 24, 0.40)" />
                <stop offset="100%" stopColor="rgba(8, 12, 24, 0)" />
              </radialGradient>
            </defs>
            <ellipse cx="110" cy="110" rx="105" ry="90" fill="url(#opticalPenumbra)" />
            <path
              d="M110 50 C125 50 145 75 140 105 C136 130 155 145 160 165 C165 185 140 195 110 195 C80 195 55 185 60 165 C65 145 84 130 80 105 C75 75 95 50 110 50 Z"
              fill="url(#handSilhouetteCore)"
            />
          </svg>
        </div>
      </div>

      {/* ── Slide Crossfade Container: Smoothly animates out & in without tears ── */}
      <div
        ref={slideRef}
        style={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        className="relative z-10 flex flex-col flex-1 pointer-events-auto"
      >
        {/* Screen Header & Era Badge */}
        <div className="space-y-3 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#103B9B] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <ActiveIcon className="w-4 h-4 text-[#FFD200]" />
              <span>{visual.badge}</span>
            </div>
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-black text-[#103B9B] font-mono">
                <DecryptedText
                  text={td.year}
                  animateOn="mount"
                  className="text-[#103B9B] font-mono font-bold"
                />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {t('projector.screenSub')}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#081438] tracking-tight">
              {td.title}
            </h4>
            <p className="mt-1 text-sm font-semibold text-[#103B9B]">
              {visual.tagline}
            </p>
          </div>

          {/* Interactive Media Tab Selectors */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('donor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                currentTab === 'donor'
                  ? 'bg-[#103B9B] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('projector.tabDonor')}
            </button>

            <button
              type="button"
              onClick={() => setTab('salvi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'salvi'
                  ? 'bg-[#C41230] text-white shadow-sm ring-2 ring-[#C41230]/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{t('projector.tabSalvi')}</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('impact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'impact'
                  ? 'bg-[#C41230] text-white shadow-sm ring-2 ring-[#C41230]/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{t('projector.tabImpact')}</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('specs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                currentTab === 'specs'
                  ? 'bg-[#081438] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('projector.tabSpecs')}
            </button>
          </div>
        </div>

        {/* Dynamic Viewport Canvas */}
        <div className="my-4 flex-1 flex flex-col justify-center min-h-[280px]">
          {/* 1. MLA DONOR BOOT SCREEN */}
          {currentTab === 'donor' && (
            <div className="rounded-2xl bg-[#081438] p-5 sm:p-6 border-2 border-[#103B9B] text-white text-center flex flex-col items-center justify-center space-y-4 shadow-xl">
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/10 pb-2">
                <span className="text-[#FFD200] font-bold">{t('projector.bootTitle')}</span>
                <span>{t('projector.bootRes')}</span>
              </div>
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#103B9B] to-[#C41230] flex items-center justify-center shadow-lg border border-[#FFD200]/50 animate-pulse">
                <Award className="w-7 h-7 text-[#FFD200]" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD200] font-black">
                  {t('projector.bootGov')}
                </span>
                <h5 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                  {t('projector.bootDonor')}
                </h5>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  {t('projector.bootQuote')}
                </p>
              </div>
              <div className="w-full max-w-xs space-y-1.5 pt-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>{t('projector.bootStatus')}</span>
                  <span className="text-emerald-400 font-bold">{t('projector.bootReady')}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-[#C41230] via-[#FFD200] to-emerald-400 rounded-full" />
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-[#FFD200] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('projector.bootSecure')}</span>
              </div>
            </div>
          )}

          {/* 2. HEADMASTER SALVI VIDEO (Click-to-Play Facade) */}
          {currentTab === 'salvi' && (
            <div className="rounded-2xl overflow-hidden border-2 border-[#103B9B] shadow-xl bg-slate-950 flex flex-col h-full min-h-[280px]">
              <div className="bg-[#103B9B] px-4 py-2 flex items-center justify-between text-xs text-white font-bold shrink-0">
                <span className="flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-[#FFD200]" />
                  {t('projector.salviSchool')}
                </span>
                <a
                  href="https://www.youtube.com/watch?v=J3EQ6acI7oU"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#FFD200] hover:underline"
                >
                  <span>{t('projector.openYoutube')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative flex-1 w-full min-h-[240px]">
                <ProjectorVideoPlayer
                  videoId="J3EQ6acI7oU"
                  title={t('projector.salviSchool')}
                  activeEraIndex={displayedEra}
                />
              </div>
            </div>
          )}

          {/* 3. CLASSROOM IMPACT VIDEO (Click-to-Play Facade) */}
          {currentTab === 'impact' && (
            <div className="rounded-2xl overflow-hidden border-2 border-[#103B9B] shadow-xl bg-slate-950 flex flex-col h-full min-h-[280px]">
              <div className="bg-[#103B9B] px-4 py-2 flex items-center justify-between text-xs text-white font-bold shrink-0">
                <span className="flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-[#FFD200]" />
                  {t('projector.impactSchool')}
                </span>
                <a
                  href="https://www.youtube.com/watch?v=3xy5Ti_cFRU"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#FFD200] hover:underline"
                >
                  <span>{t('projector.openYoutube')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative flex-1 w-full min-h-[240px]">
                <ProjectorVideoPlayer
                  videoId="3xy5Ti_cFRU"
                  title={t('projector.impactSchool')}
                  activeEraIndex={displayedEra}
                />
              </div>
            </div>
          )}

          {/* 4. HARDWARE SPECS */}
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
                  <span>{t('projector.specsHeader')}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white/95 leading-relaxed">
                  {visual.specHighlight}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD200] shrink-0" />
            <span>{t('projector.footerVerified')}</span>
          </div>
          <span className="font-mono font-bold text-[#103B9B]">{t('projector.footerDeployment')}</span>
        </div>
      </div>
    </div>
  )
}

