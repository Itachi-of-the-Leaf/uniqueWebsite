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
    phase: 'Phase 01 · 1998 – 2013',
    title: 'Ground Zero in Khed',
    backdrop: '/InsideShop.png', // Era 01: Khed shop interior / institutional tech storefront.
    lead:
      "Founded Khed's first dedicated computer assembly and service center — eliminating the 150 km repair corridor to Mumbai and Pune for rural institutions.",
    specs: [
      {
        label: 'The Foundation',
        text: "Established Unique Systems in 1998 — Khed's first dedicated commercial IT assembly, peripheral sales, and hardware servicing hub.",
      },
      {
        label: 'Infrastructure Independence',
        text: 'Eliminated the 150 km repair corridor to Mumbai and Pune — providing on-site motherboard servicing, custom desktop assemblies, and local technical support to public schools, village offices, and small enterprises.',
      },
      {
        label: 'Digital Literacy Footprint',
        text: 'Conducted early computing literacy sessions in-shop — operating as a grassroots training and coaching center for essential digital skills.',
      },
    ],
  },
  {
    id: 2,
    yearStart: 2014,
    yearEnd: 2016,
    phase: 'Phase 02 · 2014 – 2016',
    title: 'The ₹25,000 Breakthrough',
    backdrop: '/Projector_in_action.jpeg',
    lead:
      'Challenged ₹1 Lakh+ smart-classroom vendor quotes by engineering an offline, ruggedized LED ceiling-projection rig, built to fit standard ZP grant caps.',
    specs: [
      {
        label: 'The Rural Catalyst',
        text: 'A Zilla Parishad school teacher requested an affordable digital classroom setup after being quoted ₹1,00,000+ by major smart-board vendors — far exceeding rural school budgets.',
      },
      {
        label: 'The Hardware Innovation',
        text: 'Designed and built a ruggedized, ceiling-mounted LED projection rig capped at ₹25,000 — engineered high-speed USB pen-drive decoding directly into the display, skipping expensive onboard storage.',
      },
      {
        label: 'Institutional Grant Fit',
        text: "Fitted the rig's total cost within standard ZP annual discretionary funding caps — proving rural digitization does not need expensive corporate vendor contracts.",
      },
    ],
  },
  {
    id: 3,
    yearStart: 2017,
    yearEnd: 2024,
    phase: 'Phase 03 · 2017 – 2024',
    title: 'Institutional Deployments & Regional Scale',
    backdrop: '/HappyKids1.jpeg',
    lead:
      'Scaled deployments across 100+ schools in partnership with regional CSR foundations, Mahad MMACETP (Mahad MIDC) institutional training, and State-Board-aligned curriculum curators.',
    specs: [
      {
        label: 'Strategic Curriculum Alignment',
        text: 'Partnered with Maharashtra-State-Board-aligned curators to deliver pre-loaded, syllabus-mapped multimedia via high-speed pen drives — zero-latency playback on diskless projectors.',
      },
      {
        label: 'Civic & CSR Coalitions',
        text: 'Partnered with NGO Pride India and Mahad MMACETP (Mahad MIDC) initiatives to equip entire clusters of rural taluka schools.',
      },
      {
        label: '100+ School Milestone',
        text: 'Expanded from Khed to Mahad, Poladpur, Mangaon, Roha, Tala, and Shrivardhan — proven in high-humidity coastal areas.',
      },
    ],
  },
  {
    id: 4,
    yearStart: 2025,
    yearEnd: 2026,
    phase: 'Phase 04 · 2025 – 2026',
    title: 'Zero-Bandwidth 4K Ecosystems',
    backdrop: '/HappyFaculty3.jpeg',
    lead:
      'Deployed 4K interactive anti-glare touch panels with zero-latency digital blackboard software and high-lumen FHD projection designed for zero-connectivity classrooms.',
    specs: [
      {
        label: 'Interactive Panel Adoption',
        text: 'Migrated classrooms from wall projection to 65"–75" 4K anti-glare interactive touch panels with integrated digital chalkboard software.',
      },
      {
        label: 'Zero-Bandwidth Architecture',
        text: 'Full interactivity, USB ingestion, and local multimedia playback — no internet, no cloud subscriptions, no recurring fees.',
      },
      {
        label: 'Acoustic Upgrades',
        text: 'Integrated 2.1 low-distortion sound systems tuned for clear vocal projection in high-ceiling rural halls.',
      },
    ],
  },
  {
    id: 5,
    yearStart: null,
    yearEnd: null,
    phase: 'Phase 05 · Present',
    title: 'The Konkan Benchmark & Hardware Attribution',
    backdrop: '/KidsCelebrating.jpeg',
    lead:
      'Reached over 150 verified school and college deployments across Raigad and Ratnagiri districts — establishing Unique Systems as the regional benchmark for institutional technology and donor-acknowledged hardware.',
    specs: [
      {
        label: '150+ Rural Institutions',
        text: 'Verified school and college deployments across both districts — the regional reference point for institutional technology sourcing.',
      },
      {
        label: 'Firmware-Level Asset Attribution',
        text: 'Custom BIOS boot-screens display donor credentials and institutional patron credits at the firmware layer — visible on every power cycle, surviving OS reinstalls and format.',
      },
      {
        label: 'Local Service Guarantee',
        text: '24-hour on-site maintenance turnaround from the central Khed facility — no remote tickets, no offshore call centers, no multi-week vendor SLAs.',
      },
    ],
  },
]

// Era card content — extracted so the same eyebrow / title /
// lead / specs markup can be rendered inside both the desktop
// (absolute-positioned GSAP crossfade) and mobile (natural-flow
// stacked blocks) layouts without duplication. Padding, sizing,
// and className differences between the two paths live in their
// own wrappers; the inner content stays identical.
function renderEraCardBody(era) {
  return (
    <>
      {/* Phase eyebrow */}
      <div className="text-[13px] lg:text-[14px] font-bold tracking-[0.18em] text-brand-gold uppercase mb-3">
        {era.phase}
      </div>

      {/* Era title — drop-shadow glow gives a futuristic luminance
          bloom on the white title against the dark glass surface. */}
      <h3 className="text-[30px] lg:text-[36px] font-bold text-white tracking-[-0.02em] leading-[1.08] mb-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.06)]">
        {era.title}
      </h3>

      {/* Lead paragraph */}
      <p className="text-[16px] lg:text-[17px] text-slate-100 leading-[1.7] mb-6">
        {era.lead}
      </p>

      {/* Specs list */}
      <div className="pt-5 border-t border-white/15 flex flex-col gap-4">
        {era.specs.map((spec, j) => (
          <p
            key={j}
            className="text-[15px] lg:text-[16px] text-slate-200 leading-[1.65] m-0"
          >
            <strong className="text-brand-gold font-semibold mr-2">
              {spec.label}:
            </strong>
            {spec.text}
          </p>
        ))}
      </div>
    </>
  )
}

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

            // Mobile fallback: ensure all cards and backdrops render
            // visible on viewports where the GSAP scene never runs
            // (< md, or reduced-motion). Without this, cards 1..N
            // stay invisible on mobile because the desktop scene's
            // initial state (gsap.set(cards[1..N], { opacity: 0 }))
            // would otherwise be applied at module load regardless.
            // Setting opacity: 1 here is harmless on desktop because
            // buildScene() overrides it back to 0 inside its own
            // gsap.set block when the scene activates.
            const allCardsMobile = cardRefs.current.filter(Boolean)
            gsap.set(allCardsMobile, {
              opacity: 1,
              y: 0,
              pointerEvents: 'auto',
            })
            const allBackdropsMobile = backdropRefs.current.filter(Boolean)
            if (allBackdropsMobile.length) {
              gsap.set(allBackdropsMobile, { opacity: 1, scale: 1.04 })
            }

            // Desktop + reduced-motion gate: only desktop (≥ md)
            // uses the pin-and-scrub architecture. On mobile the JSX
            // renders cards in natural document flow (one section per
            // era with its own backdrop + card stacked), so the scene's
            // pin, scrub, and crossfade are not needed.
            mm.add(
              '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
              buildScene,
            )
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
      className="relative w-full h-auto md:h-[600vh] bg-brand-canvas"
      data-timeline-image
      aria-label="Our Journey"
    >
      {/* ─── Section wrapper ───
          h-auto on mobile: the section grows naturally as 5
          independent era blocks stack vertically. md:h-[600vh] on
          desktop: the section is a tall pinned scroll-stage with 5
          eras worth of scroll distance plus a 0.8-era trailing buffer.
          The pinned stage only activates at ≥ md (see the gsap
          matchMedia gate inside the useEffect above). */}
      <div ref={stageRef} className="relative w-full md:sticky md:top-0 md:h-screen md:overflow-hidden">
        {/* ─── DESKTOP backdrop layer ───
            Stacked absolute siblings for the GSAP crossfade. Hidden
            on mobile because each era's backdrop is rendered inline
            above its card in natural document flow there. */}
        <div className="absolute inset-0 hidden md:block">
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

        {/* ─── DESKTOP narrative layer ───
            Pinned-stage grid: 5 absolutely-positioned cards stacked
            on top of each other for the GSAP crossfade. Hidden on
            mobile because each era renders as its own natural-flow
            block in the mobile narrative layer below. */}
        <div className="relative z-10 hidden h-full md:flex md:items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-5 sm:gap-8 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            {/* Desktop-only left spacer — keeps the narrative card on
                the right half of the screen on lg+. Hidden on mobile
                so the card fills the viewport. */}
            <div className="hidden lg:block lg:col-span-7" aria-hidden="true" />
            <div className="lg:col-span-5">
              <div className="relative h-auto min-h-[28rem] sm:min-h-[34rem]">
                {ERAS.map((era, i) => (
                  <article
                    key={`card-${era.id}`}
                    ref={(el) => setCardRef(el, i)}
                    // Glassmorphic card surface with high translucency.
                    // The directive calls for `bg-[#0B1B4F]/35` but
                    // Tailwind 4's minifier collapses arbitrary hex +
                    // opacity-modifier classes to solid hex without
                    // alpha. As a fallback, we apply the translucent
                    // color directly via the style prop using rgba()
                    // — the 35% opacity matches the directive's
                    // intended high-translucency frosted-glass look.
                    //
                    // Sizing: h-auto + w-full max-w-xl lets the card
                    // naturally hug its content (was artificially
                    // stretching before). The directive explicitly
                    // removes any h-full or height-stretching flex
                    // properties so the card's height is driven
                    // purely by its inner content.
                    //
                    // Shadow: shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                    // gives a strong ambient drop shadow that
                    // enhances the glass-floating-on-image effect.
                    //
                    // Padding bumped to p-[32px] lg:p-[40px] for a
                    // premium feel — gives the content significant
                    // breathing room inside the card.
                    //
                    // The position:absolute + inset:0 + opacity:0 +
                    // y:24px initial state is what allows the GSAP
                    // crossfade to work on desktop: all 5 cards
                    // overlap at the same location and GSAP flips
                    // opacity/transform as scroll progresses.
                    className="timeline-card w-full max-w-xl h-auto rounded-3xl backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-[32px] lg:px-[40px] pt-[32px] lg:pt-[40px] pb-[36px] lg:pb-[44px] pointer-events-auto select-text text-left will-change-transform"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      transform: 'translate3d(0,24px,0)',
                      backgroundColor: 'rgba(11, 27, 79, 0.35)',
                    }}
                    aria-hidden={i !== 0}
                  >{renderEraCardBody(era)}</article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── MOBILE narrative layer ───
            Each era is rendered as its own natural-flow block.
            The backdrop image fills the ENTIRE era block (banner
            + card behind it), not just the top banner. This way
            the glassmorphic card sits on top of the same dark
            photo and the backdrop-blur-2xl has something to
            refract — without this, the blur picks up the
            light-gray section background instead of a photo and
            the card reads as a disconnected floating panel.

            Era 1 backdrop stays eager (LCP candidate on mobile).
            Other eras defer through vanilla-lazyload. The card
            itself is in natural document flow (not absolute),
            so the user just scrolls past 5 self-contained era
            blocks. Hidden on desktop where the GSAP pinned-stage
            crossfade runs. */}
        <div className="md:hidden">
          {ERAS.map((era, i) => (
            <div
              key={`mobile-era-${era.id}`}
              className="relative w-full overflow-hidden"
            >
              {/* Full-bleed backdrop layer — covers the entire
                  era block including the card area behind it.
                  This is what the card's backdrop-blur refracts
                  for the frosted-glass effect. */}
              <div
                className="absolute inset-0 pointer-events-none will-change-transform"
                aria-hidden="true"
              >
                {era.backdrop ? (
                  <img
                    src={i === 0 ? era.backdrop : undefined}
                    {...(i !== 0 ? { 'data-src': era.backdrop } : {})}
                    alt=""
                    className="absolute inset-0 size-full object-cover lazy-bg"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-midnight to-brand-cobalt" />
                )}
                {/* Veil — darker than desktop's because the card
                    sits over the same image. Without this the
                    backdrop is too bright behind the glass. */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-midnight/85 via-brand-midnight/75 to-brand-midnight/85" />
              </div>

              {/* Top label band — gives the era its visible identity
                  at the top of the block before the card. */}
              <div className="relative z-10 pt-10 pb-6 px-5 sm:px-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">
                  Era {era.id} of {ERAS.length}
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                  Our Journey
                </p>
              </div>

              {/* Card — natural document flow, not absolute. Sits
                  directly on top of the full-bleed backdrop so
                  the glassmorphic surface has the era photo
                  to refract through. Mobile-tuned padding (smaller
                  than desktop's lg:p-[40px]) since the card width
                  is constrained by the phone viewport. */}
              <div className="relative z-10 px-4 pb-12 sm:px-6 sm:pb-16">
                <article
                  className="timeline-card relative w-full max-w-xl mx-auto rounded-3xl backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-6 pt-7 pb-8 sm:px-7 sm:pt-8 sm:pb-9 pointer-events-auto select-text text-left"
                  style={{
                    backgroundColor: 'rgba(11, 27, 79, 0.45)',
                  }}
                >
                  {renderEraCardBody(era)}
                </article>
              </div>
            </div>
          ))}
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
