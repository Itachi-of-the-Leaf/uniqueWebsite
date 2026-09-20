import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'
import {
  Projector,
  Tv2,
  Cpu,
  Volume2,
  Keyboard,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import SpotlightCard from './SpotlightCard'

gsap.registerPlugin(ScrollTrigger)

// ─── Static product matrix ──────────────────────────────────────────────
// Hand-tuned institutional product lines. No external brand names —
// described generically per spec. `img` is optional; cells without one
// fall back to an icon-block rendered by the card itself.
const PRODUCT_LINES = [
  {
    id: 'projection-rigs',
    icon: Projector,
    img: '/Projector_in_action.jpeg',
    fallbackGlyph: 'PR',
  },
  {
    id: 'interactive-panels',
    icon: Tv2,
    img: '/Smart_screen.jpeg',
    fallbackGlyph: 'IP',
  },
  {
    id: 'modular-towers',
    icon: Cpu,
    img: null, // No matching asset — render an icon-only card.
    fallbackGlyph: 'DT',
  },
  {
    id: 'classroom-acoustics',
    icon: Volume2,
    img: '/BT_Speakers.jpeg',
    fallbackGlyph: 'CA',
  },
  {
    id: 'peripherals',
    icon: Keyboard,
    img: null, // No matching asset — render an icon-only card.
    fallbackGlyph: 'PE',
  },
]

// ─── Exploded view layers ───────────────────────────────────────────────
// 5 z-axis separated layers. Each layer's exploded transform is a
// translate3d(...) that GSAP scrubs from assembled -> exploded.
// Compositor-only: GSAP tweens `translate3d` and `opacity` per frame.
// `null` in `img` means the layer is a CSS/SVG illustration, not a photo.
const EXPLODED_LAYERS = [
  {
    id: 'bezel',
    label: 'Outer Bezel',
    sublabel: 'Ruggedized ABS housing',
    accent: '#FFD200',
    img: null,
  },
  {
    id: 'glass',
    label: 'Protective Glass',
    sublabel: 'Anti-glare tempered layer',
    accent: '#103B9B',
    img: null,
  },
  {
    id: 'matrix',
    label: 'Display Matrix',
    sublabel: '4K multi-touch LCD panel',
    accent: '#C41230',
    img: '/Smart_screen.jpeg',
  },
  {
    id: 'motherboard',
    label: 'Motherboard & Shielding',
    sublabel: 'EMI-shielded SoC board',
    accent: '#103B9B',
    img: null,
  },
  {
    id: 'mount',
    label: 'Mount Bracket',
    sublabel: 'VESA-conformant steel mount',
    accent: '#FFD200',
    img: null,
  },
]

export default function ProductGallery() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const layersRef = useRef([])
  const indicatorsRef = useRef([])

  // Reset ref arrays so StrictMode dev re-runs don't double-bind.
  layersRef.current = []
  indicatorsRef.current = []

  // ─── Exploded view scrub timeline ─────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = layersRef.current.filter(Boolean)
      const indicators = indicatorsRef.current.filter(Boolean)
      if (layers.length === 0) return

      // Initialize layers in their assembled state. Each layer starts
      // exactly at translate3d(0, 0, 0) with full opacity and full scale.
      gsap.set(layers, { y: 0, scale: 1, opacity: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // Pin only when the viewport approaches the exploded-view stage.
          // We deliberately do NOT pin the entire section — the product
          // cards above and the firmware callout below need to flow past.
          start: 'top 70%',
          end: '+=120%',
          scrub: true,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Layer explosion — staggered along Z-axis (which we map to ±Y screen
      // pixel offset for compositor friendliness) and alternating ±X for
      // a diagonal cascade. Outer layers (top + bottom) get a small scale
      // shrink so the centre plate reads as the focal plane.
      EXPLODED_LAYERS.forEach((layer, i) => {
        const isOuter = i === 0 || i === EXPLODED_LAYERS.length - 1
        const direction = i % 2 === 0 ? -1 : 1 // alternating zigzag
        const targetY = (i - 2) * 70 // -140, -70, 0, 70, 140
        const targetX = direction * (Math.abs(i - 2) * 8) // 16, 8, 0, 8, 16
        const targetScale = isOuter ? 0.86 : 1
        const targetOpacity = isOuter ? 0.85 : 1

        tl.to(
          layers[i],
          {
            y: targetY,
            x: targetX,
            scale: targetScale,
            opacity: targetOpacity,
            ease: 'none',
            duration: 1,
          },
          0
        )

        // Layer-name indicator track — fade in as that layer is fully
        // exploded (the timeline runs 0..1, layer i fully revealed at
        // i*0.2 of the scrub timeline).
        if (indicators[i]) {
          tl.fromTo(
            indicators[i],
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            i * 0.18
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const products = t('gallery.products') || []
  const explodedLayers = t('gallery.exploded.layers') || []
  const firmwareCallout = t('gallery.firmwareCallout') || {}

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-slate-200 relative overflow-hidden"
    >
      {/* Background Subtle Halos */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#103B9B]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 -right-32 w-96 h-96 bg-[#FFD200]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#103B9B]/10 border border-[#103B9B]/30 text-[#103B9B] text-xs font-black uppercase tracking-widest shadow-xs">
            <Sparkles className="w-4 h-4 text-[#C41230]" />
            <span>{t('gallery.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#081438] tracking-tight leading-tight">
            {t('gallery.heading')}
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
            {t('gallery.subheading')}
          </p>
        </div>

        {/* ─── Product Classifications (5 cards) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-20 lg:mb-28">
          {PRODUCT_LINES.map((line, i) => {
            const Icon = line.icon
            const product = products[i] || {}
            return (
              <SpotlightCard
                key={line.id}
                spotlightColor="rgba(255, 210, 0, 0.2)"
                borderColor="rgba(16, 59, 155, 0.45)"
                className="p-5 shadow-xl border-2 border-slate-200 hover:border-[#103B9B] bg-white flex flex-col h-full"
              >
                {/* Visual block: image if available, else icon block */}
                {line.img ? (
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-4">
                    <img
                      src={line.img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081438]/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-md bg-[#103B9B]/95 border border-[#FFD200]/40 flex items-center justify-center shadow-md">
                      <Icon className="w-3.5 h-3.5 text-[#FFD200]" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br from-[#0A1E5C] via-[#103B9B] to-[#103B9B]/70 mb-4 flex items-center justify-center">
                    <div className="absolute inset-0 bg-radial from-[#FFD200]/15 via-transparent to-transparent pointer-events-none" />
                    <Icon className="w-12 h-12 text-[#FFD200] relative z-10" />
                    <div className="absolute bottom-2 right-2 text-[10px] font-mono font-black uppercase tracking-widest text-white/60 bg-black/30 px-2 py-0.5 rounded">
                      {line.fallbackGlyph}
                    </div>
                  </div>
                )}

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#103B9B]">
                  {`0${i + 1}`} · {product.cat || line.id}
                </p>
                <h3 className="mt-1 text-lg font-heading font-extrabold text-[#081438] leading-tight">
                  {product.title || line.id}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed flex-1">
                  {product.desc || ''}
                </p>

                {product.specs && (
                  <ul className="mt-3 space-y-1.5">
                    {product.specs.map((s, si) => (
                      <li
                        key={si}
                        className="flex items-start gap-1.5 text-[11px] text-slate-700"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#FFD200] shrink-0 mt-0.5 fill-[#FFD200]/10" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </SpotlightCard>
            )
          })}
        </div>

        {/* ─── Layered Exploded View Stage ─── */}
        <div className="mb-20 lg:mb-28">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#103B9B]">
              {t('gallery.exploded.eyebrow')}
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#081438] tracking-tight leading-tight">
              {t('gallery.exploded.heading')}
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {t('gallery.exploded.subheading')}
            </p>
          </div>

          <div
            ref={stageRef}
            className="relative w-full max-w-4xl mx-auto h-[28rem] sm:h-[32rem] lg:h-[36rem] rounded-3xl bg-gradient-to-br from-[#081438] via-[#0A1E5C] to-[#103B9B] border-2 border-[#103B9B] shadow-2xl overflow-hidden"
          >
            {/* Stage background grid */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,210,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,210,0,0.06) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
              aria-hidden="true"
            />

            {/* Radial spotlight — keeps focus on the centre plane */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#081438]/60 pointer-events-none" />

            {/* Layer stack — exploded via scroll scrub */}
            <div className="absolute inset-0 flex items-center justify-center">
              {EXPLODED_LAYERS.map((layer, i) => {
                const layerLabel = explodedLayers[i] || layer
                return (
                  <div
                    key={layer.id}
                    ref={(el) => (layersRef.current[i] = el)}
                    className="absolute w-64 sm:w-72 lg:w-80 will-change-transform"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className="relative w-full aspect-[16/10] rounded-2xl border-2 bg-gradient-to-br shadow-2xl overflow-hidden"
                      style={{
                        borderColor: layer.accent,
                        boxShadow: `0 20px 60px -20px ${layer.accent}80, inset 0 0 0 1px rgba(255,255,255,0.05)`,
                      }}
                    >
                      {layer.img ? (
                        <>
                          <img
                            src={layer.img}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#081438]/80 via-[#081438]/20 to-transparent pointer-events-none" />
                        </>
                      ) : (
                        <>
                          {/* Stylized layer illustration for non-photo layers.
                              Compiled of CSS gradients + SVG since these
                              don't have photography assets. */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, ${layer.accent}22, transparent 60%), linear-gradient(135deg, ${layer.accent}11, ${layer.accent}33)`,
                            }}
                          />
                          <svg
                            viewBox="0 0 320 200"
                            className="absolute inset-0 w-full h-full"
                            aria-hidden="true"
                          >
                            {/* Geometric pattern per layer identity */}
                            {layer.id === 'bezel' && (
                              <>
                                <rect
                                  x="20"
                                  y="20"
                                  width="280"
                                  height="160"
                                  rx="14"
                                  fill="none"
                                  stroke="#FFD200"
                                  strokeWidth="2"
                                  opacity="0.5"
                                />
                                <rect
                                  x="30"
                                  y="30"
                                  width="260"
                                  height="140"
                                  rx="10"
                                  fill="none"
                                  stroke="#FFD200"
                                  strokeWidth="1"
                                  opacity="0.3"
                                />
                                <circle cx="40" cy="40" r="3" fill="#FFD200" />
                                <circle cx="280" cy="40" r="3" fill="#FFD200" />
                                <circle cx="40" cy="160" r="3" fill="#FFD200" />
                                <circle cx="280" cy="160" r="3" fill="#FFD200" />
                              </>
                            )}
                            {layer.id === 'glass' && (
                              <>
                                <rect
                                  x="34"
                                  y="34"
                                  width="252"
                                  height="132"
                                  rx="6"
                                  fill="#103B9B22"
                                  stroke="#103B9B"
                                  strokeWidth="1.5"
                                />
                                <line
                                  x1="60"
                                  y1="40"
                                  x2="200"
                                  y2="100"
                                  stroke="#103B9B"
                                  strokeWidth="1"
                                  opacity="0.4"
                                />
                                <line
                                  x1="100"
                                  y1="40"
                                  x2="260"
                                  y2="120"
                                  stroke="#103B9B"
                                  strokeWidth="1"
                                  opacity="0.4"
                                />
                                <line
                                  x1="40"
                                  y1="80"
                                  x2="280"
                                  y2="160"
                                  stroke="#103B9B"
                                  strokeWidth="1"
                                  opacity="0.4"
                                />
                              </>
                            )}
                            {layer.id === 'motherboard' && (
                              <>
                                {/* Stylised PCB trace lines */}
                                <g
                                  stroke="#103B9B"
                                  strokeWidth="1.2"
                                  fill="none"
                                  opacity="0.7"
                                >
                                  <path d="M30,30 L120,30 L120,80 L220,80" />
                                  <path d="M30,100 L80,100 L80,170" />
                                  <path d="M180,40 L180,140 L260,140" />
                                  <path d="M40,170 L200,170" />
                                  <path d="M260,30 L260,80 L300,80" />
                                </g>
                                <g fill="#103B9B">
                                  <circle cx="120" cy="80" r="4" />
                                  <circle cx="180" cy="140" r="4" />
                                  <circle cx="80" cy="100" r="4" />
                                </g>
                                <rect
                                  x="100"
                                  y="100"
                                  width="60"
                                  height="40"
                                  rx="3"
                                  fill="none"
                                  stroke="#103B9B"
                                  strokeWidth="1.5"
                                  opacity="0.6"
                                />
                                <rect
                                  x="200"
                                  y="40"
                                  width="40"
                                  height="28"
                                  rx="2"
                                  fill="#103B9B"
                                  opacity="0.3"
                                />
                              </>
                            )}
                            {layer.id === 'mount' && (
                              <>
                                {/* VESA mount bracket */}
                                <g
                                  stroke="#FFD200"
                                  strokeWidth="2"
                                  fill="none"
                                >
                                  <rect
                                    x="60"
                                    y="60"
                                    width="200"
                                    height="80"
                                    rx="4"
                                  />
                                  <circle cx="80" cy="100" r="6" />
                                  <circle cx="240" cy="100" r="6" />
                                </g>
                                <line
                                  x1="160"
                                  y1="20"
                                  x2="160"
                                  y2="60"
                                  stroke="#FFD200"
                                  strokeWidth="2"
                                />
                                <line
                                  x1="140"
                                  y1="180"
                                  x2="180"
                                  y2="180"
                                  stroke="#FFD200"
                                  strokeWidth="2"
                                />
                                <line
                                  x1="160"
                                  y1="140"
                                  x2="160"
                                  y2="180"
                                  stroke="#FFD200"
                                  strokeWidth="2"
                                  opacity="0.6"
                                />
                              </>
                            )}
                          </svg>
                        </>
                      )}

                      {/* Layer metadata overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between">
                        <div>
                          <p
                            className="text-[10px] font-black uppercase tracking-[0.2em]"
                            style={{ color: layer.accent }}
                          >
                            Layer 0{i + 1}
                          </p>
                          <p className="text-white text-sm font-heading font-extrabold leading-tight">
                            {layerLabel.label || layer.label}
                          </p>
                          <p className="text-[10px] text-white/60 leading-tight">
                            {layerLabel.sublabel || layer.sublabel}
                          </p>
                        </div>
                        <div
                          className="w-7 h-7 rounded-md border flex items-center justify-center text-[10px] font-black"
                          style={{
                            borderColor: layer.accent + '66',
                            color: layer.accent,
                            backgroundColor: layer.accent + '15',
                          }}
                        >
                          0{i + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Layer-name indicators — fade in as scrub progresses */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-10">
              {EXPLODED_LAYERS.map((layer, i) => (
                <div
                  key={`ind-${layer.id}`}
                  ref={(el) => (indicatorsRef.current[i] = el)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 will-change-transform"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: layer.accent }}
                    aria-hidden="true"
                  />
                  <span>{`L0${i + 1}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exploded view caption */}
          <p className="max-w-2xl mx-auto text-center text-xs text-slate-500 mt-6 italic">
            {t('gallery.exploded.caption')}
          </p>
        </div>

        {/* ─── Firmware Customization Callout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(196, 18, 48, 0.18)"
              borderColor="rgba(196, 18, 48, 0.4)"
              className="p-8 sm:p-10 shadow-xl border-2 border-[#C41230]/30 bg-white"
            >
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C41230] mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('gallery.firmwareCallout.eyebrow')}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#081438] tracking-tight">
                {t('gallery.firmwareCallout.title')}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                {t('gallery.firmwareCallout.desc')}
              </p>

              <ul className="mt-5 space-y-2 text-xs sm:text-sm text-slate-800">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C41230] shrink-0 mt-0.5" />
                  <span>
                    <strong>
                      {t('gallery.firmwareCallout.feature1Bold')}
                    </strong>{' '}
                    {t('gallery.firmwareCallout.feature1Text')}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C41230] shrink-0 mt-0.5" />
                  <span>
                    <strong>
                      {t('gallery.firmwareCallout.feature2Bold')}
                    </strong>{' '}
                    {t('gallery.firmwareCallout.feature2Text')}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C41230] shrink-0 mt-0.5" />
                  <span>
                    <strong>
                      {t('gallery.firmwareCallout.feature3Bold')}
                    </strong>{' '}
                    {t('gallery.firmwareCallout.feature3Text')}
                  </span>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#donors"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C41230] hover:bg-[#A00E26] text-white font-extrabold text-sm shadow-md shadow-[#C41230]/30 border border-[#FFD200]/70 transition-all"
                >
                  <span>{t('gallery.firmwareCallout.ctaPrimary')}</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-slate-200 hover:border-[#103B9B] text-[#081438] font-extrabold text-sm transition-all"
                >
                  <span>{t('gallery.firmwareCallout.ctaSecondary')}</span>
                </a>
              </div>
            </SpotlightCard>
          </div>

          {/* Right column: mock institutional boot-splash */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#0A1E5C] p-6 sm:p-8 border-2 border-[#103B9B] shadow-2xl relative overflow-hidden text-white">
              {/* Header pill */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-[#FFD200]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-white font-bold tracking-wide uppercase">
                    {firmwareCallout.bootKernel || 'Firmware Boot Kernel v4.2'}
                  </span>
                </div>
                <span className="hidden sm:inline text-[#FFD200] font-bold uppercase tracking-wider">
                  {firmwareCallout.bootBadge || 'Custom Attribution'}
                </span>
              </div>

              {/* Splash canvas */}
              <div className="my-6 py-10 px-6 rounded-2xl bg-[#07194A] border border-[#103B9B] text-center flex flex-col items-center justify-center space-y-5 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-radial from-[#103B9B]/20 via-transparent to-transparent pointer-events-none" />

                {/* Status pill */}
                <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FFD200] bg-white/5 px-3 py-1 rounded-full border border-[#FFD200]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200] shadow-[0_0_6px_#FFD200]" />
                  {firmwareCallout.bootStatus || 'Firmware Verified'}
                </div>

                {/* Crest / placeholder */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#103B9B] to-[#C41230] flex items-center justify-center shadow-lg ring-4 ring-[#FFD200]/40">
                  <ShieldCheck className="w-7 h-7 text-[#FFD200]" />
                </div>

                {/* Attribution text */}
                <div className="space-y-1 max-w-md">
                  <div className="text-[11px] font-mono tracking-widest text-[#FFD200] uppercase font-black">
                    {firmwareCallout.bootLine1 ||
                      'Institutional Patron Emblem'}
                  </div>
                  <p className="text-base font-heading font-extrabold text-white">
                    {firmwareCallout.bootLine2 ||
                      'Digitally Equipped Under Patronage'}
                  </p>
                  <p className="text-[11px] text-slate-300 font-mono">
                    {firmwareCallout.bootLine3 ||
                      'Unique Systems Deployment Division'}
                  </p>
                </div>

                {/* Diagnostic footer */}
                <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#FFD200] bg-black/40 px-3 py-1.5 rounded-md border border-[#FFD200]/20 tracking-wider">
                  {firmwareCallout.bootDiagnostic ||
                    'SECURE BOOT: ACTIVE | WRITE-PROTECT: LOCKED'}
                </div>
              </div>

              {/* Spec strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="text-center">
                  <div className="text-[10px] uppercase text-[#FFD200] font-bold">
                    {firmwareCallout.statA || 'Persistence'}
                  </div>
                  <div className="font-extrabold text-white mt-0.5 text-[11px]">
                    {firmwareCallout.statAVal || 'Every Boot'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase text-[#FFD200] font-bold">
                    {firmwareCallout.statB || 'Storage'}
                  </div>
                  <div className="font-extrabold text-white mt-0.5 text-[11px]">
                    {firmwareCallout.statBVal || 'Write-Protected ROM'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase text-[#FFD200] font-bold">
                    {firmwareCallout.statC || 'Reset Survival'}
                  </div>
                  <div className="font-extrabold text-[#FFD200] mt-0.5 text-[11px]">
                    {firmwareCallout.statCVal || 'Yes'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
