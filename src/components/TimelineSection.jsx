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

/* ── Per-character chalk glow helper ── */
function ChalkText({ text, className = '' }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span key={i} className="chalk-letter">
            {char}
          </span>
        )
      )}
    </span>
  )
}

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

/* ── Chalk dust particle burst helper (Only plays on scroll-away) ── */
function spawnDustParticles(boardEl) {
  const container = boardEl.querySelector('.dust-container')
  if (!container) return

  // Clear any leftover particles and make container visible
  container.innerHTML = ''
  container.style.opacity = '1'

  const count = 22
  const frag = document.createDocumentFragment()

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div')
    p.className = 'chalk-dust-particle'
    p.style.left = `${Math.random() * 88 + 6}%`
    p.style.top = `${Math.random() * 25 + 5}%` // Originate along the upper wipe threshold
    const size = 2 + Math.random() * 2.5
    p.style.width = `${size}px`
    p.style.height = `${size}px`
    p.style.opacity = '0.8'
    p.style.backgroundColor =
      Math.random() > 0.45
        ? 'rgba(255,255,255,0.85)'
        : 'rgba(254,240,138,0.8)'
    frag.appendChild(p)
  }

  container.appendChild(frag)

  // Downward drifting chalk flecks (opacity: 0.8 -> 0, y: "+=40px")
  gsap.to(container.children, {
    y: '+=40',
    x: 'random(-14, 14)',
    opacity: 0,
    duration: 0.75,
    stagger: 0.015,
    ease: 'power2.out',
    onComplete: () => {
      container.innerHTML = ''
      container.style.opacity = '0'
    },
  })
}

/* ══════════════════════════════════════════════════════
   TimelineSection — Scrollytelling Architecture
   Left: Scrolling blackboard cards with full-board chalk smudge physics,
         bounded scrub-off zone (height L), and zero stuck dust particles.
   Right: Single pinned ProjectorScreen with optical beam shadow.
   ══════════════════════════════════════════════════════ */
export default function TimelineSection() {
  const [activeEraIndex, setActiveEraIndex] = useState(0)
  const containerRef = useRef(null)
  const boardRefs = useRef([])

  // Full-Board Chalk Smudge Spring Physics State (Ref-driven, bypasses React re-renders)
  const smudgeStateRef = useRef(new Map())
  const rafIdRef = useRef(null)
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 })

  /* ── Full-Board Chalk Smudge Mouse Movement ── */
  const handleBoardMouseMove = (e, index) => {
    // Only compute physics for currently ACTIVE blackboard
    if (activeEraIndex !== index) return

    // Mobile/touch safeguard
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches
    )
      return

    const boardEl = boardRefs.current[index]
    if (!boardEl) return

    const rect = boardEl.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const now = e.timeStamp || 0
    const dt = Math.max((now - lastMouseRef.current.time) / 1000, 0.001)

    // Calculate cursor velocity vector
    const vx = (mouseX - lastMouseRef.current.x) / dt
    const vy = (mouseY - lastMouseRef.current.y) / dt

    lastMouseRef.current = { x: mouseX, y: mouseY, time: now }

    const speed = Math.sqrt(vx * vx + vy * vy)
    const normVx = speed > 0 ? vx / speed : 0
    const normVy = speed > 0 ? vy / speed : 0

    // Find all smudgable text lines across the entire card
    const items = boardEl.querySelectorAll('.chalk-smudge-item')
    let impacted = false

    items.forEach((item, itemIdx) => {
      const lineCenterY = item.offsetTop + item.offsetHeight / 2
      const distY = Math.abs(mouseY - lineCenterY)

      // Active interaction radius (~48px)
      if (distY < 48) {
        const force = (1 - distY / 48) * Math.min(speed * 0.045, 8)
        const skewAngle = Math.max(Math.min(vx * 0.015, 3.5), -3.5)

        const stateKey = `${index}-${itemIdx}`
        const current = smudgeStateRef.current.get(stateKey) || {
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          skew: 0,
          el: item,
        }

        current.vx += normVx * force
        current.vy += normVy * force * 0.4
        current.skew = skewAngle
        current.el = item

        smudgeStateRef.current.set(stateKey, current)
        impacted = true
      }
    })

    if (impacted && !rafIdRef.current) {
      startSmudgePhysicsLoop()
    }
  }

  // Damped Harmonic Oscillator Loop (~350ms snap-back)
  const startSmudgePhysicsLoop = () => {
    const k = 0.22 // Spring stiffness
    const damping = 0.76 // Damping coefficient

    const tick = () => {
      let totalDisplacement = 0
      let totalSpeed = 0

      smudgeStateRef.current.forEach((state) => {
        // Hooke's Law: ax = -k * x - damping * vx
        const ax = -k * state.x - damping * state.vx
        const ay = -k * state.y - damping * state.vy

        state.vx += ax
        state.vy += ay

        state.x += state.vx
        state.y += state.vy
        state.skew *= 0.8

        // Bound displacement to max 5px offset as specified
        state.x = Math.max(Math.min(state.x, 5), -5)
        state.y = Math.max(Math.min(state.y, 4), -4)

        totalDisplacement += Math.abs(state.x) + Math.abs(state.y)
        totalSpeed += Math.abs(state.vx) + Math.abs(state.vy)

        if (state.el) {
          state.el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) skewX(${state.skew.toFixed(2)}deg)`
        }
      })

      // When all text nodes have settled close to original crisp letterforms
      if (totalDisplacement < 0.15 && totalSpeed < 0.15) {
        smudgeStateRef.current.forEach((state) => {
          if (state.el) {
            state.el.style.transform = ''
          }
        })
        smudgeStateRef.current.clear()
        rafIdRef.current = null
      } else {
        rafIdRef.current = requestAnimationFrame(tick)
      }
    }

    rafIdRef.current = requestAnimationFrame(tick)
  }

  const handleBoardMouseLeave = (index) => {
    if (activeEraIndex !== index) return
    // Allow any ongoing spring oscillations to gracefully settle to 0
  }

  /* ── GSAP ScrollTrigger wiring ── */
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        boardRefs.current.forEach((boardEl, index) => {
          if (!boardEl) return

          const chalkLines = boardEl.querySelectorAll('.chalk-line')

          // 1. Era Focus & Chalk Writing In-View Trigger
          ScrollTrigger.create({
            trigger: boardEl,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
              setActiveEraIndex(index)
              gsap.fromTo(
                chalkLines,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                {
                  clipPath: 'inset(0 0% 0 0)',
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.07,
                  ease: 'power2.out',
                  overwrite: true,
                }
              )
            },
            onEnterBack: () => {
              setActiveEraIndex(index)
              gsap.fromTo(
                chalkLines,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                {
                  clipPath: 'inset(0 0% 0 0)',
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.07,
                  ease: 'power2.out',
                  overwrite: true,
                }
              )
            },
          })

          // 2. Bounded Upper-Edge Scrub-Off Zone (Height L)
          // As the board travels up past the top boundary (~110px from viewport top),
          // only text within distance L of the top dissolves into falling dust as it reaches that threshold.
          // Bottom half remains legible until reaching that exact zone.
          ScrollTrigger.create({
            trigger: boardEl,
            start: 'top 110px',
            end: 'bottom 140px',
            scrub: 0.1,
            onUpdate: (self) => {
              const scrubContainer = boardEl.querySelector(
                '.board-scrub-container'
              )
              if (!scrubContainer) return

              const totalH = scrubContainer.offsetHeight || 380
              const L = 52 // Height of top era pill/bar boundary

              if (self.progress <= 0.02) {
                scrubContainer.style.maskImage = 'none'
                scrubContainer.style.webkitMaskImage = 'none'
              } else {
                const s = (self.progress - 0.02) * (totalH + L)
                const maskVal = `linear-gradient(to bottom, transparent 0px, transparent ${s.toFixed(1)}px, rgba(0,0,0,0.35) ${(s + L * 0.35).toFixed(1)}px, black ${(s + L).toFixed(1)}px, black 100%)`
                scrubContainer.style.maskImage = maskVal
                scrubContainer.style.webkitMaskImage = maskVal
              }
            },
            onLeave: () => {
              // Only spawn and animate downward drifting chalk flecks on scroll-away
              spawnDustParticles(boardEl)
            },
            onLeaveBack: () => {
              const scrubContainer = boardEl.querySelector(
                '.board-scrub-container'
              )
              if (scrubContainer) {
                scrubContainer.style.maskImage = 'none'
                scrubContainer.style.webkitMaskImage = 'none'
              }
              spawnDustParticles(boardEl)
            },
          })
        })
      }, containerRef)

      return () => ctx.revert()
    })

    // Mobile fallback — simpler intersection triggers
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        boardRefs.current.forEach((boardEl, index) => {
          if (!boardEl) return

          const chalkLines = boardEl.querySelectorAll('.chalk-line')

          ScrollTrigger.create({
            trigger: boardEl,
            start: 'top 75%',
            end: 'bottom 25%',
            onEnter: () => {
              setActiveEraIndex(index)
              gsap.fromTo(
                chalkLines,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                {
                  clipPath: 'inset(0 0% 0 0)',
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.06,
                  ease: 'power2.out',
                  overwrite: true,
                }
              )
            },
            onEnterBack: () => {
              setActiveEraIndex(index)
              gsap.fromTo(
                chalkLines,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                {
                  clipPath: 'inset(0 0% 0 0)',
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.06,
                  ease: 'power2.out',
                  overwrite: true,
                }
              )
            },
          })
        })
      }, containerRef)

      return () => ctx.revert()
    })

    return () => {
      mm.revert()
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
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

          {/* ═══ LEFT COLUMN: Scrolling Blackboard Cards ═══ */}
          <div className="relative w-full lg:w-[45%] space-y-[25vh] lg:space-y-[40vh]">
            {/* Spine visible on lg+ only, inside the left col */}
            <div className="absolute left-4 sm:left-6 top-6 bottom-12 w-1 bg-gradient-to-b from-[#FFD200] via-[#FFD200]/60 to-[#FFD200]/20 pointer-events-none hidden lg:block opacity-80 shadow-[0_0_12px_rgba(255,210,0,0.45)]" />

            {timelineData.map((era, index) => {
              const visual = eraVisualData[index]
              const isActive = activeEraIndex === index
              const isPast = index < activeEraIndex

              return (
                <div key={era.id} className="relative sm:pl-16">
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
                          isActive
                            ? 'bg-[#061033] animate-ping'
                            : 'bg-white/80'
                        }`}
                      />
                    </div>
                  </div>

                  {/* ── Blackboard Card (Full-Board Smudge Interaction on Active Card) ── */}
                  <div
                    ref={(el) => (boardRefs.current[index] = el)}
                    onMouseMove={(e) => handleBoardMouseMove(e, index)}
                    onMouseLeave={() => handleBoardMouseLeave(index)}
                    className={`blackboard-panel flex flex-col rounded-2xl sm:rounded-3xl border-[8px] sm:border-[10px] border-[#3E2314] ring-1 ring-[#5C3A21] bg-[#121C17] shadow-[inset_0_0_25px_rgba(0,0,0,0.9),0_18px_40px_rgba(0,0,0,0.6)] relative overflow-hidden ${
                      isActive
                        ? 'ring-4 ring-[#FFD200]/50 shadow-[0_0_30px_rgba(255,210,0,0.20)]'
                        : isPast
                        ? 'opacity-25'
                        : 'opacity-40'
                    }`}
                  >
                    {/* Slate surface texture */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06)_0%,transparent_65%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.02)_40%,transparent_60%)] pointer-events-none" />

                    {/* Faint duster smear lines on past boards */}
                    {isPast && (
                      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(255,255,255,0.04)_30px,transparent_34px)]" />
                    )}

                    {/* Dust particle container (opacity: 0 by default, NO stuck dots, plays only on scroll-away) */}
                    <div className="dust-container absolute inset-0 pointer-events-none z-30 opacity-0 overflow-hidden" />

                    {/* ── Top Era Pill Bar (Height L ≈ 52px boundary) ── */}
                    <div className="relative z-20 p-5 pb-0 sm:p-7 sm:pb-0">
                      <div className="chalk-line chalk-smudge-item flex items-center justify-between border-b border-white/10 pb-3">
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
                    </div>

                    {/* ── Bounded Scrub-Off Container (Height L Mask Scrub Zone) ── */}
                    <div className="board-scrub-container relative z-10 p-5 pt-3 sm:p-7 sm:pt-4 flex-1 flex flex-col space-y-4">
                      {/* Title */}
                      <h3 className="chalk-line chalk-smudge-item font-chalk text-2xl sm:text-3xl lg:text-4xl text-[#FFFFFF] font-bold tracking-wide leading-tight cursor-default chalk-text-glow">
                        <ChalkText text={era.title} />
                      </h3>

                      {/* Tagline */}
                      <p className="chalk-line chalk-smudge-item font-chalk text-base sm:text-lg text-[#FEF08A]/90 cursor-default">
                        <ChalkText text={`~ ${visual.tagline} ~`} />
                      </p>

                      {/* Description Narrative */}
                      <p className="chalk-line chalk-smudge-item font-chalk text-base sm:text-xl text-[#F1F5F9] leading-relaxed cursor-default chalk-text-glow">
                        <ChalkText text={era.description} />
                      </p>

                      {/* Directives Checklist */}
                      <div className="pt-3 border-t border-white/10 space-y-2.5">
                        <div className="chalk-line chalk-smudge-item text-[11px] font-mono uppercase tracking-widest text-[#FEF08A]/80 font-bold">
                          Classroom Directives:
                        </div>
                        {visual.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="chalk-line chalk-smudge-item flex items-start gap-2 text-sm sm:text-base font-chalk text-[#CBD5E1] cursor-default"
                          >
                            <span className="text-[#FEF08A] font-bold text-lg shrink-0 leading-none select-none">
                              ✓
                            </span>
                            <ChalkText
                              text={item}
                              className="leading-snug"
                            />
                          </div>
                        ))}
                      </div>
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
