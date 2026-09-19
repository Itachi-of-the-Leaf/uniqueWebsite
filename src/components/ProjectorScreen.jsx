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
  Loader2,
} from 'lucide-react'
import DecryptedText from './DecryptedText'

export default function ProjectorScreen({ activeEraIndex, eraData }) {
  // All hooks must be called unconditionally (rules of hooks)
  const [tabs, setTabs] = useState(() => eraData.map((e) => e.visual.defaultTab))
  const contentRef = useRef(null)
  const prevEra = useRef(activeEraIndex)

  const setTab = useCallback(
    (tab) =>
      setTabs((prev) => {
        const next = [...prev]
        next[activeEraIndex] = tab
        return next
      }),
    [activeEraIndex]
  )

  // Projector-beam flicker crossfade on era change
  useEffect(() => {
    if (prevEra.current === activeEraIndex) return
    prevEra.current = activeEraIndex

    const el = contentRef.current
    if (!el) return

    const tl = gsap.timeline()
    tl.to(el, {
      opacity: 0.35,
      filter: 'blur(3px) brightness(1.6)',
      duration: 0.12,
      ease: 'power2.in',
    }).to(el, {
      opacity: 1,
      filter: 'blur(0px) brightness(1)',
      duration: 0.4,
      ease: 'power2.out',
    })

    return () => tl.kill()
  }, [activeEraIndex])

  const era = eraData[activeEraIndex]
  if (!era) return null

  const { timeline: td, visual } = era
  const ActiveIcon = visual.icon
  const currentTab = tabs[activeEraIndex] || visual.defaultTab

  return (
    <div className="cinema-light-leak rounded-2xl sm:rounded-3xl bg-white text-[#081438] p-5 sm:p-7 shadow-2xl border-4 sm:border-6 border-slate-800 ring-1 ring-slate-700/60 flex flex-col relative overflow-hidden h-full">
      {/* Cinema Overhead Projector Light Beam */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#80B0FF]/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl opacity-15 bg-[#103B9B] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-[#FFD200] pointer-events-none" />

      <div ref={contentRef} className="relative z-10 flex flex-col flex-1">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                currentTab === 'donor'
                  ? 'bg-[#103B9B] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              MLA Donor Boot Screen
            </button>

            <button
              type="button"
              onClick={() => setTab('salvi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                currentTab === 'salvi'
                  ? 'bg-[#C41230] text-white shadow-sm ring-2 ring-[#C41230]/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>HM Salvi Video</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('impact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                currentTab === 'impact'
                  ? 'bg-[#C41230] text-white shadow-sm ring-2 ring-[#C41230]/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Classroom Impact</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('specs')}
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

        {/* Dynamic Viewport Canvas */}
        <div className="my-4 flex-1 flex flex-col justify-center min-h-[280px]">
          {/* 1. MLA DONOR BOOT SCREEN */}
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
                  &quot;Dedicated for the digital empowerment of rural Zilla Parishad students across Mahad &amp; Khed constituencies.&quot;
                </p>
              </div>
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

          {/* 2. HEADMASTER SALVI VIDEO */}
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
                  onLoad={(e) =>
                    e.target.previousElementSibling &&
                    (e.target.previousElementSibling.style.display = 'none')
                  }
                />
              </div>
            </div>
          )}

          {/* 3. CLASSROOM IMPACT VIDEO */}
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
                  onLoad={(e) =>
                    e.target.previousElementSibling &&
                    (e.target.previousElementSibling.style.display = 'none')
                  }
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
                  <span>Hardware &amp; Deployment Profile</span>
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
            <span>Projection Hall Verified Stream</span>
          </div>
          <span className="font-mono font-bold text-[#103B9B]">Konkan Deployment</span>
        </div>
      </div>
    </div>
  )
}
