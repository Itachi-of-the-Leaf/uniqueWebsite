import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'
import { useLazyBackdrop } from '../hooks/useLazyBackdrop'

gsap.registerPlugin(ScrollTrigger)

const ERAS = [
  {
    id: 1,
    yearStart: 1998,
    yearEnd: 2013,
    eraLabel: 'Phase 01',
    title: 'Ground Zero in Khed',
    backdrop: '/InsideShop.png', // Era 01: Khed shop interior / institutional tech storefront.
    summary:
      "Founded Khed's first dedicated computer assembly and service center — eliminating the 150 km repair corridor to Mumbai and Pune for rural institutions.",
    phases: [
      {
        label: 'The Foundation',
        body: "Established Unique Systems in 1998 — Khed's first dedicated commercial IT assembly, peripheral sales, and hardware servicing hub.",
      },
      {
        label: 'Infrastructure Independence',
        body: 'Eliminated the 150 km repair corridor to Mumbai and Pune — providing on-site motherboard servicing, custom desktop assemblies, and local technical support to public schools, village offices, and small enterprises.',
      },
      {
        label: 'Digital Literacy Footprint',
        body: 'Conducted early computing literacy sessions in-shop — operating as a grassroots training and coaching center for essential digital skills.',
      },
    ],
  },
  {
    id: 2,
    yearStart: 2014,
    yearEnd: 2016,
    eraLabel: 'Phase 02',
    title: 'The ₹25,000 Breakthrough',
    backdrop: '/Projector_in_action.jpeg',
    summary:
      'Challenged ₹1 Lakh+ smart-classroom vendor quotes by engineering an offline, ruggedized LED ceiling-projection rig built within ZP grant caps.',
    phases: [
      {
        label: 'The Rural Catalyst',
        body: 'A Zilla Parishad school teacher requested an affordable digital classroom setup after being quoted ₹1,00,000+ by major smart-board vendors — far exceeding rural school budgets.',
      },
      {
        label: 'The Hardware Innovation',
        body: 'Designed a ruggedized, ceiling-mounted LED projection rig capped at ₹25,000 — engineering high-speed USB pen-drive decoding directly into the display to bypass expensive onboard storage.',
      },
      {
        label: 'Institutional Grant Fit',
        body: "Fitted the rig's total cost within standard ZP annual discretionary funding caps — proving rural digitization did not need expensive corporate vendor contracts.",
      },
    ],
  },
  {
    id: 3,
    yearStart: 2017,
    yearEnd: 2024,
    eraLabel: 'Phase 03',
    title: 'Institutional Deployments & Regional Scale',
    backdrop: '/HappyKids1.jpeg',
    summary:
      'Scaled deployments across 100+ schools in partnership with regional CSR foundations, institutional training under Mahad MMACETP (Mahad MIDC), and State-Board-aligned educational curriculum curators.',
    phases: [
      {
        label: 'Strategic Curriculum Alignment',
        body: 'Partnered with Maharashtra-State-Board-aligned curators to deliver pre-loaded, syllabus-mapped multimedia via high-speed pen drives — zero-latency playback on diskless projectors.',
      },
      {
        label: 'Civic & CSR Coalitions',
        body: 'Partnered with NGO Pride India and Mahad MMACETP (Mahad MIDC) initiatives to equip entire clusters of rural taluka schools.',
      },
      {
        label: '100+ School Milestone',
        body: 'Expanded from Khed to Mahad, Poladpur, Mangaon, Roha, Tala, and Shrivardhan — proving reliability in coastal, high-humidity areas with erratic power.',
      },
    ],
  },
  {
    id: 4,
    yearStart: 2025,
    yearEnd: 2026,
    eraLabel: 'Phase 04',
    title: 'Zero-Bandwidth 4K Ecosystems',
    backdrop: '/HappyFaculty3.jpeg',
    summary:
      'Deployed 4K interactive anti-glare touch panels with zero-latency digital blackboard software and high-lumen FHD projection designed for zero-connectivity classrooms.',
    phases: [
      {
        label: 'Interactive Panel Adoption',
        body: 'Transitioned classrooms from white-wall projection to 65" and 75" 4K anti-glare interactive touch panels with integrated digital chalkboard software.',
      },
      {
        label: 'Zero-Bandwidth Architecture',
        body: 'Maintained offline-ready operation — full interactivity, USB ingestion, and local multimedia playback without internet or recurring cloud subscriptions.',
      },
      {
        label: 'Acoustic Upgrades',
        body: 'Integrated 2.1 low-distortion sound systems for clear vocal audibility in large, high-ceiling village school halls.',
      },
    ],
  },
  {
    id: 5,
    yearStart: null,
    yearEnd: null,
    eraLabel: 'Phase 05',
    title: 'The Konkan Benchmark & Hardware Attribution',
    backdrop: '/KidsCelebrating.jpeg',
    summary:
      'Reached over 150 verified school and college deployments across Raigad and Ratnagiri districts — establishing Unique Systems as the regional benchmark for institutional technology.',
    phases: [
      {
        label: '150+ Rural Institutions',
        body: 'Reached 150+ verified school and college deployments across Raigad and Ratnagiri districts — establishing Unique Systems as the regional institutional technology benchmark.',
      },
      {
        label: 'Firmware-Level Asset Attribution',
        body: 'Engineered custom BIOS boot-screen flashing into firmware — permanently displaying donor and institutional patron credentials on every power cycle.',
      },
      {
        label: 'Local Service Guarantee',
        body: 'Sustained a 24-hour on-site maintenance guarantee from the central Khed facility — outperforming multinational brands that lack rural service infrastructure.',
      },
    ],
  },
]

export default function TimelineSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const backdropRefs = useRef([])
  const cardRefs = useRef([])
  const progressRef = useRef(0)

  // Mount the lazy-load observer for era backdrops 2-5. Era 01 is
  // already eager-loaded by the spread above. The deps list
  // re-initializes only when the era count actually changes (never
  // in practice) — the selector alone is enough to find the new
  // `.lazy-bg` elements on mount.
  useLazyBackdrop('.lazy-bg')

  // Reset ref arrays so StrictMode dev re-runs don't double-bind.
  backdropRefs.current = []
  cardRefs.current = []

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      const buildScene = () => {
              const backdrops = backdropRefs.current.filter(Boolean)
              const cards = cardRefs.current.filter(Boolean)
              if (backdrops.length === 0 || cards.length === 0) return

              // ─── Spec-driven lifecycle ────────────────────────────────────────────
              // Each era has explicit, non-overlapping "active" windows with strict
              // opacity clamping. Era N's backdrop becomes fully visible at
              // 0.20*(N-1) + 0.05, holds there for 0.15 of progress, then fades to
              // opacity 0 over the next 0.05. Era 1 has no fade-in (it's the entry
              // to the section). Era 5 has no fade-out (it's the exit — we want a
              // stable final frame for the user to read). This eliminates the
              // "double-exposure ghosting" and the white bottom-bar bleed-through
              // that the previous crossfade approach produced with pinSpacing:false.
              //
              //   Backdrop 1 active:  0.00 .. 0.20   fade-out: 0.20 .. 0.25
              //   Backdrop 2 active:  0.25 .. 0.40   fade-out: 0.40 .. 0.45
              //   Backdrop 3 active:  0.45 .. 0.60   fade-out: 0.60 .. 0.65
              //   Backdrop 4 active:  0.65 .. 0.80   fade-out: 0.80 .. 0.85
              //   Backdrop 5 active:  0.85 .. 1.00   (no fade-out)
              //
              // All backdrops start with pointerEvents:'none' so they never
              // intercept clicks — only the narrative card layer is interactive
              // (and even then, only the active card, see gsap.set below).
              gsap.set(backdrops[0], { opacity: 1, scale: 1.04, pointerEvents: 'none' })
              for (let i = 1; i < backdrops.length; i++) {
                gsap.set(backdrops[i], { opacity: 0, scale: 1.04, pointerEvents: 'none' })
              }

              // Cards: only the first one is interactive initially. Tweening flips
              // pointer-events in lockstep with the opacity phases so inactive
              // cards never capture clicks even when they happen to be opaque
              // during the brief crossfade window.
              gsap.set(cards[0], { opacity: 1, y: 0, pointerEvents: 'auto' })
              for (let i = 1; i < cards.length; i++) {
                gsap.set(cards[i], { opacity: 0, y: 24, pointerEvents: 'none' })
              }

              // Single timeline, scrubbed evenly across 5 eras. ScrollTrigger pins
              // the INNER sticky stage with pinSpacing:true so the next section
              // starts naturally below the pinned stage once the section's bottom
              // edge scrolls fully past the viewport — no white bleed-through.
              //
              // scrub:true (no numeric value) ties the timeline directly to the
              // scroll position with no smoothing delay — pointer-to-pixel.
              // scrub:0.8 was making the page feel like it had inertia even when
              // it shouldn't; the lag manifested as the timeline "catching up"
              // after a release, which read as something moving the scroll.
              //
              // Snap is intentionally DISABLED. GSAP's snap tweens the SCROLL
              // POSITION on release, which the user experienced as the page
              // being yanked between eras. Pure scrub means the timeline only
              // ever reads scroll position — it never writes it back. Lenis
              // owns all scroll-position animation 100%.
              const ENABLE_SNAP = false

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: sectionRef.current,
                  // Start when the section's top edge reaches the
                  // viewport top. End is decoupled from the section's
                  // own height — it's a fixed `(ERAS.length + 0.8)`
                  // viewport-height scroll distance, so the timeline
                  // has explicit "trailing buffer" room for the final
                  // era to dwell without starvation. The trailing
                  // 0.8vh beyond the 5-era scroll mirrors the
                  // `h-[600vh]` (5 eras + 1 buffer era) wrapper.
                  start: 'top top',
                  end: () => '+=' + window.innerHeight * (ERAS.length + 0.8),
                  scrub: true,
                  pin: stageRef.current,
                  pinSpacing: true,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  // Navbar slides up while we're pinned so the story
                  // takes the full viewport. We dispatch a counter-
                  // friendly CustomEvent; the listener in Navbar
                  // increments on enter and decrements on leave so
                  // multiple pinned sections can stack cleanly.
                  onToggle: (self) => {
                    window.dispatchEvent(
                      new CustomEvent('pinned-section', {
                        detail: { pinned: self.isActive },
                      }),
                    )
                  },
                  onUpdate: (self) => {
                    // Stream live progress to window.__timelineProgress for ad-hoc
                    // dev inspection. Production cost is negligible (one assignment
                    // per ScrollTrigger tick).
                    progressRef.current = self.progress
                    if (typeof window !== 'undefined') {
                      window.__timelineProgress = self.progress
                    }
                  },
                },
              })

              // ─── Explicit phase tweens (backdrops + cards) ────────────────────
              // Per spec: all active crossfade transitions between
              // Eras 1→5 conclude by progress ~0.76 so Era 05 has
              // 24% of the timeline (and roughly 24% of the
              // scroll-driven distance) to dwell in full view. The
              // empty hold tween at the end (`tl.to({}, …)`) keeps
              // the GSAP tween machinery ticking through the final
              // scroll stroke so the timeline never reports "done"
              // prematurely.
              const FADE = 0.04
              const PHASES = [
                // Era 1: visible at entry, fades out at 0.14..0.18
                { fadeInStart: 0.00, fadeInEnd: 0.00, fadeOutStart: 0.14, fadeOutEnd: 0.18 },
                // Era 2: fades in 0.18..0.22, fades out 0.32..0.36
                { fadeInStart: 0.18, fadeInEnd: 0.22, fadeOutStart: 0.32, fadeOutEnd: 0.36 },
                // Era 3: fades in 0.36..0.40, fades out 0.50..0.54
                { fadeInStart: 0.36, fadeInEnd: 0.40, fadeOutStart: 0.50, fadeOutEnd: 0.54 },
                // Era 4: fades in 0.54..0.58, fades out 0.68..0.72
                { fadeInStart: 0.54, fadeInEnd: 0.58, fadeOutStart: 0.68, fadeOutEnd: 0.72 },
                // Era 5: fades in 0.72..0.76, no fade-out — holds to
                // timeline end (24% of scroll-driven distance).
                { fadeInStart: 0.72, fadeInEnd: 0.76, fadeOutStart: null, fadeOutEnd: null },
              ]

              for (let i = 0; i < ERAS.length; i++) {
                const phase = PHASES[i]
                const backdrop = backdrops[i]
                const card = cards[i]

                // Scale tweens — both fade-in and fade-out use the same scale drift.
                // Skip on Era 1 (no fade-in) and Era 5 (no fade-out).
                if (i > 0) {
                  tl.to(
                    backdrop,
                    { opacity: 1, scale: 1, ease: 'none', duration: FADE },
                    phase.fadeInStart
                  )
                  // Card matches: fade in during the same window with a subtle lift.
                  tl.to(
                    card,
                    { opacity: 1, y: 0, ease: 'none', duration: FADE },
                    phase.fadeInStart
                  )
                  tl.set(card, { pointerEvents: 'auto' }, phase.fadeInEnd)
                }
                if (phase.fadeOutStart !== null) {
                  tl.to(
                    backdrop,
                    { opacity: 0, scale: 1, ease: 'none', duration: FADE },
                    phase.fadeOutStart
                  )
                  tl.to(
                    card,
                    { opacity: 0, y: -24, ease: 'none', duration: FADE },
                    phase.fadeOutStart
                  )
                  tl.set(card, { pointerEvents: 'none' }, phase.fadeOutEnd)
                }
              }

              // ─── Final hold tween ───────────────────────────────────────
              // Empty tween that occupies the LAST 0.24 of timeline-
              // time. Era 5 is already fully opaque from progress 0.76
              // onward — this tween adds explicit "still ticking"
              // pressure on the GSAP scrubber so the pin never
              // releases before the user's final scroll stroke
              // completes. Result: timeline duration = 1.00, Era 5
              // dwells cleanly across progress 0.76..1.00.
              tl.to({}, { duration: 0.24 }, 0.76)
            }

      mm.add('(prefers-reduced-motion: no-preference)', buildScene)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const setBackdropRef = (el, index) => {
    backdropRefs.current[index] = el
  }
  const setCardRef = (el, index) => {
    cardRefs.current[index] = el
  }

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative w-full h-[600vh] bg-brand-canvas"
      data-timeline-image
      aria-label="Our Journey"
    >
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ─── Backdrop Layer (stacked, crossfaded) ─── */}
        <div className="absolute inset-0">
          {ERAS.map((era, i) => (
            <div
              key={`backdrop-${era.id}`}
              ref={(el) => setBackdropRef(el, i)}
              className="absolute inset-0 will-change-transform pointer-events-none"
              style={{
                opacity: i === 0 ? 1 : 0,
                transform: 'translate3d(0,0,0) scale(1.04)',
              }}
              aria-hidden="true"
            >
              {era.backdrop ? (
                <img
                  // Era 01 stays eager (it's the LCP candidate on the
                  // timeline's first paint). Other eras defer through
                  // vanilla-lazyload — see useLazyBackdrop() — so the
                  // browser only fetches them as the GSAP pin-scroll
                  // carries the user into their scroll range.
                  data-src={era.backdrop}
                  alt=""
                  className="absolute inset-0 size-full object-cover lazy-bg"
                  {...(i === 0
                    ? { src: era.backdrop, loading: 'eager' }
                    : {})}
                  decoding="async"
                />
              ) : (
                // Era 01 fallback: institutional atmospheric gradient
                <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-midnight to-brand-cobalt" />
              )}
              {/* Veil for text legibility — opacity only, no blur. */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/85 via-brand-midnight/40 to-brand-midnight/30" />
            </div>
          ))}
        </div>

        {/* ─── Narrative Layer ─── */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-5 sm:gap-8 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            {/* Desktop-only left spacer — keeps the narrative card on
                the right half of the screen on lg+. Hidden on mobile
                so the card fills the viewport. */}
            <div className="hidden lg:block lg:col-span-7" aria-hidden="true" />
            <div className="lg:col-span-5">
              <div className="relative h-auto min-h-[36rem] sm:min-h-[40rem]">
                {ERAS.map((era, i) => (
                  <article
                    key={`card-${era.id}`}
                    ref={(el) => setCardRef(el, i)}
                    className="timeline-card absolute inset-0 will-change-transform overflow-y-auto rounded-2xl border border-white/15 bg-white/10 p-7 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md lg:p-8"
                    style={{ opacity: 0, transform: 'translate3d(0,24px,0)' }}
                    aria-hidden={i !== 0}
                  >
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brand-gold">
                      {era.eraLabel} ·{' '}
                      {era.yearStart === null
                        ? 'Present'
                        : `${era.yearStart} – ${era.yearEnd}`}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl leading-tight sm:text-3xl lg:text-4xl">
                      {era.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/85 lg:text-base">
                      {era.summary}
                    </p>

                    {/* Phase detail list — three bullets per era,
                        rendered as a labeled sub-list with bold phase
                        name and body copy. Same indentation rhythm as
                        the rest of the card. */}
                    <ul className="mt-5 space-y-3 border-t border-white/15 pt-4">
                      {era.phases.map((phase, j) => (
                        <li key={j} className="text-sm leading-relaxed text-white/90 lg:text-[0.95rem]">
                          <span className="font-bold text-white">
                            {phase.label}:
                          </span>{' '}
                          {phase.body}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Section Heading (always visible) ─── */}
        <div className="pointer-events-none absolute left-6 top-6 z-20 lg:left-10 lg:top-10">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/70">
            Our Journey
          </p>
        </div>
      </div>
    </section>
  )
}
