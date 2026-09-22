import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useLazyBackdrop } from '../hooks/useLazyBackdrop'

gsap.registerPlugin(ScrollTrigger)

const FALLBACK_ERAS = [
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
    // Mobile-condensed body — targets 53w / 361c INCLUDING the
    // phase label, title, and lead so the entire card fits
    // inside a phone viewport without overflow. Drops the third
    // (least essential) spec and trims each remaining spec body
    // to a single short clause.
    mobileBody: [
      {
        label: 'The Foundation',
        text: 'First commercial IT assembly and service hub in Khed, est. 1998.',
      },
      {
        label: 'On-site Support',
        text: 'Motherboard repair and custom desktops, served locally.',
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
    mobileBody: [
      {
        label: 'Rural Catalyst',
        text: 'Triggered by a ZP school teacher priced out of ₹1,00,000+ quotes.',
      },
      {
        label: 'Engineering',
        text: 'USB pen-drive decoding into display — no expensive storage.',
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
    mobileBody: [
      {
        label: 'Curriculum Fit',
        text: 'Maharashtra-State-Board multimedia, pre-loaded via pen drives.',
      },
      {
        label: 'Regional Reach',
        text: 'Expanded across Konkan talukas — humid coast, erratic power.',
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
    mobileBody: [
      {
        label: 'Interactive Panels',
        text: '4K touch + integrated chalkboard software, fully offline.',
      },
      {
        label: 'Acoustic Upgrades',
        text: '2.1 low-distortion sound tuned for high-ceiling rural halls.',
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
    mobileBody: [
      {
        label: 'Firmware Attribution',
        text: 'BIOS boot-screens display donor credentials at every power cycle.',
      },
      {
        label: 'Local Service',
        text: '24-hour on-site maintenance from Khed — no offshore call centers.',
      },
    ],
  },
]

function renderFormattedText(text) {
  if (typeof text !== 'string' || !text.includes('**')) return text
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

// Flip-card content — extracted so the second milestone
// (Era 2, index 1) can render as a 3D flip card while the
// outer <article> still participates in the GSAP opacity
// crossfade. The flip state lives in the parent component.
// `era` carries the canonical era data; `isFlipped` and
// `setFlipped` are the controlled flip pair.
//
// ARCHITECTURE (per css-3d-flip-card skill rule #1):
//   Outer 3D wrapper has explicit height (h-[600px] sm:h-[560px]
//   max-h-[85vh]). Both faces use `absolute inset-0` to fill
//   that real box. Inside each face, the scrollable content
//   area has its own `overflow-y-auto` track so long Marathi
//   prose scrolls inside the card instead of being clipped by
//   `overflow: hidden`. The flip indicator at the front face
//   bottom (and the return cue at the back face top + bottom)
//   is pinned via `shrink-0` so it's always visible.
//
// Front face: header (year eyebrow + title), lead paragraph,
// 3 highlight blocks, then pinned flip-cue strip.
//
// Back face: top bar (eyebrow + return cue), scrollable
// narrative with 2 highlight callouts, then pinned bottom
// return trigger.
function renderFlipCardContent(era, isFlipped, setFlipped) {
  return (
    <div
      // Explicit height gives the absolute-positioned faces a
      // real box to fill. Without an explicit height here, the
      // faces collapse to 0px (css-3d-flip-card skill rule #1).
      // sm:h-[560px] calibrates for tablet+ where the desktop
      // spacer pushes the card to the right column; max-h-[85vh]
      // caps the card so it never exceeds the viewport on
      // shorter phones, which would otherwise clip content at
      // the top/bottom of the visible area.
      className="relative h-[600px] sm:h-[560px] max-h-[85vh] w-full [perspective:1400px] cursor-pointer"
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? 'मूळ पानावर जा' : 'सविस्तर भूमिका वाचा'}
      aria-pressed={isFlipped}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((prev) => !prev)
        }
      }}
    >
      {/* Inner 3D motion shell — the actual flip surface. */}
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ─── FRONT FACE ───
            Self-contained scrollable surface. Outer parent
            provides explicit height (h-[600px] sm:h-[560px]
            max-h-[85vh]) so the absolute face has a real
            box. `flex flex-col h-full` + `flex-1 min-h-0` on
            the scrollable content area is the critical fix:
            without `min-h-0`, a flex child with `overflow-y-auto`
            refuses to shrink below its content size and instead
            overflows the parent (causing the "front face clips
            the third bullet" symptom). With it, the scroll
            area claims exactly the leftover vertical space and
            scrolls inside the card. The flip indicator at the
            bottom is pinned via shrink-0 so it stays visible. */}
        <div className="absolute inset-0 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/20 p-5 sm:p-7 flex flex-col h-full text-left shadow-2xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)]">
          {/* Scrollable content body — header + lead + 3 highlight
              blocks. pr-1 keeps text from kissing the scrollbar
              gutter. flex-1 min-h-0 is the magic combo that makes
              the inner overflow-y-auto actually work inside a
              flex parent — without min-h-0, the flex child's
              intrinsic content height overrides its parent. */}
          <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] pr-1 space-y-3 [-webkit-overflow-scrolling:touch]">
            {/* Milestone header — year eyebrow + Marathi title.
                Year eyebrow uses brand gold; title uses white
                with tight tracking so it stays visually weighted
                against the lead paragraph below. */}
            <div>
              <span className="text-xs font-bold text-[#FFD200] tracking-wider uppercase">
                २०१४ – २०१६
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mt-1">
                गरजेतून जन्मलेली डिजिटल क्रांति
              </h3>
            </div>

            {/* Lead paragraph — Marathi, relaxed leading so
                मात्रे / वेलांटी don't collide across line breaks. */}
            <p className="text-xs sm:text-sm text-slate-200 leading-[1.7] font-normal">
              तत्कालिन महागड्या डिजिटल तंत्रज्ञानाला पर्याय देत ग्रामीण भागातील लोकवर्गणीची मर्यादा सांभाळून, तेवढ्याच बजेटमध्ये स्वतः असेंबल केलेल्या एल.ई.डी. प्रोजेक्टरच्या माध्यमातून स्वस्त पण दर्जेदार डिजिटल क्लासरूम ची निर्मिती.
            </p>

            {/* 3 highlight blocks — tightened vertical spacing
                (space-y-2) so all three fit comfortably in the
                visible scroll area without forcing the user to
                scroll on a 600px-tall mobile viewport. Each block
                is a translucent panel with a gold-bold label and
                slate-300 body. */}
            <div className="space-y-2 pt-1 text-xs sm:text-[13px] leading-[1.7]">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="font-bold text-[#FFD200]">ग्रामीण विभागांतील प्रमुख अडचण: </span>
                <span className="text-slate-300">
                  जि. प. शाळांसाठी पारंपरिक डिजिटल क्लासरूमची किंमत सुमारे ₹१,३५,०००/- होती. कमी पटसंख्या व मर्यादित लोकवर्गणीमुळे एवढी मोठी रक्कम उभी करणे ग्रामीण शाळांना शक्य नव्हते.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="font-bold text-[#FFD200]">तांत्रिक संशोधन: </span>
                <span className="text-slate-300">
                  ₹३५,००० च्या मर्यादित बजेटमध्ये पर्याय शोधताना संगणकाची गरज वगळून स्वतः असेंबल केलेला स्मार्ट LED प्रोजेक्टर आणि शिक्षकांच्या मदतीने संकलित शैक्षणिक व्हिडिओ पेनड्राइव्हद्वारे उपलब्ध केले.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="font-bold text-[#FFD200]">परिणाम: </span>
                <span className="text-slate-300">
                  महागड्या डिजिटल अभ्यासक्रमाला पर्याय देत अत्यल्प खर्चात दर्जेदार डिजिटल क्लासरूम साकारली. लोकवर्गणीच्या मर्यादित बजेटमध्येही ग्रामीण विद्यार्थ्यांना आधुनिक डिजिटल शिक्षण उपलब्ध करून देण्याचा नवा मार्ग निर्माण झाला.
                </span>
              </div>
            </div>
          </div>

          {/* Pinned bottom flip indicator — always visible at the
              bottom of the front face. The gold pulse pill on
              the left + "टॅप करा व उलटा" hint on the right
              invite the user to tap. shrink-0 prevents the
              indicator from being squashed by flex layout, and
              mt-3 keeps it clear of the scroll area above. */}
          <div className="border-t border-white/15 pt-3 mt-3 flex items-center justify-between shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD200]/15 border border-[#FFD200]/50 text-[#FFD200] text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" aria-hidden="true" />
              <span>सविस्तर भूमिका वाचा</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setFlipped(true)
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="टॅप करा व उलटा"
            >
              <span>टॅप करा व उलटा ↻</span>
            </button>
          </div>
        </div>

        {/* ─── BACK FACE ───
            Rich narrative copy. The gradient + 2px gold border
            differentiates it from the front face. flex flex-col
            h-full + flex-1 min-h-0 on the narrative body is the
            critical fix for the "60% of back face missing" symptom:
            without min-h-0, a flex child with overflow-y-auto
            refuses to shrink and pushes the pinned top + bottom
            elements off the card boundary. With it, the scroll
            area claims exactly the leftover vertical space and
            the full story scrolls cleanly inside the card. Two
            return cues (top bar + bottom pinned trigger) stay
            visible at all scroll positions. */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#071330] via-[#091b45] to-[#040b1f] border-2 border-[#FFD200]/40 p-5 sm:p-7 flex flex-col h-full text-left shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          {/* Pinned top bar — eyebrow + return cue. shrink-0 so
              it stays at the top regardless of scroll position
              in the content area below. pt-1 prevents the eyebrow
              text from kissing the rounded top edge of the card
              (p-5 sm:p-7 is the outer padding; this pt-1 adds a
              small inner cushion before the text starts). */}
          <div className="flex items-center justify-between border-b border-white/10 pt-1 pb-3 mb-3 shrink-0">
            <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-[#FFD200]">
              UNIQUE SYSTEMS · आमचा दृष्टीकोन
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setFlipped(false)
              }}
              className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 cursor-pointer"
              aria-label="मूळ पानावर जा"
            >
              <span>मूळ पानावर जा ↺</span>
            </button>
          </div>

          {/* Scrollable narrative body — the rich story. flex-1
              min-h-0 + overflow-y-auto + hidden scrollbar means
              tall Marathi paragraphs scroll inside the card on
              mobile without ever escaping the rounded boundary.
              pr-1 keeps text from kissing the scrollbar gutter.
              [-webkit-overflow-scrolling:touch] gives iOS momentum. */}
          <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] pr-1 space-y-3 text-xs sm:text-[13px] text-slate-200 leading-[1.7] [-webkit-overflow-scrolling:touch]">
            <p>
              ग्रामीण भागातील विद्यार्थ्यांना आधुनिक डिजिटल शिक्षणाची संधी मिळावी, या उद्देशाने सुरू झालेल्या एका महत्त्वपूर्ण उपक्रमात{' '}
              <strong className="text-white font-semibold">UNIQUE SYSTEMS</strong> ला सहभागी होण्याची संधी मिळाली.
            </p>

            <p>
              या संधीचे रूपांतर केवळ व्यवसायात न करता, शिक्षणाच्या डिजिटल परिवर्तनात योगदान देण्याच्या जबाबदारीत आम्ही केले. Projector आणि आधुनिक डिजिटल साधनांच्या माध्यमातून शाळांमध्ये स्मार्ट शिक्षणाची नवी सुरुवात करण्यासाठी{' '}
              <strong className="text-white font-semibold">UNIQUE SYSTEMS</strong> ने आपली भूमिका यशस्वीपणे पार पाडली.
            </p>

            <p className="text-slate-300">
              या प्रवासात गुणवत्ता, तांत्रिक कौशल्य, वेळेचे नियोजन आणि विश्वासार्ह सेवा या चार गोष्टी आमच्या सोबत राहिल्या.
            </p>

            <p className="text-slate-300">आज मागे वळून पाहताना अभिमान वाटतो की—</p>

            {/* Double Asterisk Highlight Callout — the most
                quotable line. Pulled out into a gold-bordered
                callout so it lands with weight. */}
            <div className="p-3.5 rounded-xl bg-[#FFD200]/10 border-l-4 border-[#FFD200] my-2">
              <p className="text-sm sm:text-base font-black text-white leading-snug">
                ही फक्त एक ऑर्डर नव्हती…
                <br />
                <span className="text-[#FFD200]">ही आमच्या प्रवासातील एक महत्त्वाची पायरी होती.</span>
              </p>
            </div>

            <div className="py-1 text-center">
              <span className="text-[11px] font-extrabold tracking-wider text-slate-400 block uppercase">
                UNIQUE SYSTEMS
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-100 italic mt-0.5">
                “संधीचे रूपांतर विश्वासात… आणि विश्वासाचे रूपांतर यशात!”
              </p>
            </div>

            <p>
              ही संधी होती शिक्षणाला तंत्रज्ञानाची जोड देण्याची! आणि{' '}
              <strong className="text-white font-semibold">UNIQUE SYSTEMS</strong> या उपक्रमातून केवळ उपकरणे उपलब्ध करून देणे हा उद्देश न ठेवता शिक्षकांसाठी अध्यापन अधिक प्रभावी आणि विद्यार्थ्यांसाठी शिक्षण अधिक सोपे, आनंददायी व आकर्षक बनवणे हे ध्येय ठेवले.
            </p>

            {/* Single Asterisk Highlight — closing italic banner. */}
            <div className="mt-3 p-3 rounded-xl bg-slate-800/90 border border-white/15 text-center">
              <p className="text-xs sm:text-sm font-bold text-[#FFD200] italic leading-snug">
                “एका गरजेपासून सुरू झालेला प्रवास… डिजिटल शिक्षणाच्या नव्या पर्वाची सुरुवात ठरला!”
              </p>
            </div>
          </div>

          {/* Fixed bottom flip return trigger — second way out
              for users who scrolled past the top bar. Same
              action as the top-bar button, but visually lighter
              (just text, no pill) so it doesn't compete with
              the main narrative. shrink-0 keeps it pinned at the
              bottom regardless of scroll position in the body. */}
          <div className="border-t border-white/10 pt-2.5 mt-2 flex justify-center shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setFlipped(false)
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors py-1 cursor-pointer"
              aria-label="टॅप करून परत जा"
            >
              <span>टॅप करून परत जा ↻</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Era card content — extracted so the same eyebrow / title /
// lead / specs markup can be rendered for both the desktop
// (3-spec) and mobile (2-condensed-spec) variants without
// duplication. The `variant` prop selects which body list to
// render: 'desktop' (full specs[]) or 'mobile' (condensed
// mobileBody[]). Padding/sizing differences live in the
// outer wrappers; the inner markup is identical.
function renderEraCardBody(era, variant = 'desktop') {
  const bodyList = variant === 'mobile' && era.mobileBody
    ? era.mobileBody
    : era.specs
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

      {/* Specs list — desktop uses the full specs[] (3 entries);
          mobile uses era.mobileBody (2 condensed entries) so the
          entire card fits inside a phone viewport without
          overflow. Both lists use the same inline-paragraph
          markup so visual hierarchy stays consistent.
          Leading 1.7 + reduced gap-2.5 spacing gives Marathi
          prose (which has taller ascenders/descenders than
          Latin) enough vertical room that no glyph clips
          against the next line. */}
      <div className="pt-5 border-t border-white/15 flex flex-col gap-2.5 sm:gap-3">
        {bodyList.map((spec, j) => (
          <p
            key={j}
            className="text-[15px] lg:text-[16px] text-slate-200 leading-[1.7] m-0"
          >
            <strong className="text-brand-gold font-semibold mr-2">
              {spec.label}:
            </strong>
            {renderFormattedText(spec.text)}
          </p>
        ))}
      </div>
    </>
  )
}

export default function TimelineSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const backdropRefs = useRef([])
  const cardRefs = useRef([])
  // Single thin progress bar (no more 5 pagination dashes —
  // those read as "swipe left/right" controls and were
  // misleading the user into thinking the journey was a
  // horizontal carousel). Replaces `dotRefs`.
  const progressBarRef = useRef(null)
  const scrollHintRef = useRef(null)
  const progressRef = useRef(0)

  // Flip state for the second milestone card (Era 2 — "The
  // ₹25,000 Breakthrough", index 1). Toggling this reveals the
  // rich narrative back face for that one card only — the other
  // 4 eras continue to crossfade through their normal GSAP
  // scroll choreography. Kept scoped to this single card so
  // the rest of the timeline architecture stays untouched.
  const [isSecondCardFlipped, setIsSecondCardFlipped] = useState(false)

  // Resolve localized era data. The translations file owns the
  // canonical 5-era story panels for both English and Marathi
  // (`translations.<lang>.timelineEras`); we fall back to the
  // local English FALLBACK_ERAS constant when the active
  // language has no entry yet (e.g. mid-development) so the
  // section never goes blank.
  const eras = useMemo(
    () => t('timelineEras') ?? FALLBACK_ERAS,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language, t]
  )

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
              const progressBar = progressBarRef.current
              const scrollHint = scrollHintRef.current
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

              // Initial state for the new "scroll to explore" hint +
              // thin progress bar. The hint label sits at full
              // opacity at start of section; the bar is at
              // scaleX(0). Both are driven by the onUpdate
              // callback below.
              if (progressBar) {
                gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left center' })
              }
              if (scrollHint) {
                gsap.set(scrollHint, { opacity: 1, y: 0 })
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
                  // own height — it's a fixed `(eras.length + 0.8)`
                  // viewport-height scroll distance, so the timeline
                  // has explicit "trailing buffer" room for the final
                  // era to dwell without starvation. The trailing
                  // 0.8vh beyond the 5-era scroll mirrors the
                  // `h-[600vh]` (5 eras + 1 buffer era) wrapper.
                  start: 'top top',
                  end: () => '+=' + window.innerHeight * (eras.length + 0.8),
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
                    // Drive the thin progress bar and the "scroll to explore"
//                    hint label. The bar's scaleX is the
//                    section's scroll progress (0 → 1 across the
//                    full vertical scroll distance). The hint
//                    label fades from full opacity to 0 over the
//                    first 5% of progress, then stays gone for
//                    the rest of the section — once the user has
//                    scrolled at all, they know what to do, and
//                    a persistent "scroll down" callout would
//                    be visual noise.
                    const p = self.progress
                    if (progressBar) {
                      gsap.set(progressBar, { scaleX: p })
                    }
                    if (scrollHint) {
                      // 0..0.05 → opacity 1→0. Smoothstep so the
                      // fade feels intentional rather than
                      // popping.
                      const hintOpacity =
                        p < 0.05 ? 1 - p / 0.05 : 0
                      gsap.set(scrollHint, { opacity: Math.max(0, hintOpacity) })
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

              for (let i = 0; i < eras.length; i++) {
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

            // Run on every viewport (mobile + desktop). Mobile uses
            // the same pin+scrub scene as desktop now — same
            // glassmorphic cards, same crossfade, same progress bar.
            // The previous mobile-only natural-flow block was
            // removed; mobile relies entirely on this scene.
            mm.add(
              '(prefers-reduced-motion: no-preference)',
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
      className="relative w-full h-[600vh] bg-brand-canvas"
      data-timeline-image
      aria-label="Our Journey"
    >
      <div ref={stageRef} className="relative w-full sticky top-0 h-screen overflow-hidden">
        {/* ─── Backdrop layer ───
            Stacked absolute siblings for the GSAP crossfade.
            Used on every viewport — mobile now runs the same
            pin+scrub scene as desktop, so it needs the same
            backdrop crossfade layer. */}
        <div className="absolute inset-0">
          {eras.map((era, i) => (
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

        {/* ─── Narrative layer ───
            Always rendered. On mobile, GSAP pins this stage and
            crossfades the cards inside it — same architecture as
            Testimonials. z-30 ensures the cards float cleanly
            above the backdrop layer (no explicit z-index, so
            default z=auto which loses to any explicit value). */}
        <div className="relative z-30 h-full flex items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-5 sm:gap-8 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            {/* Desktop-only left spacer — keeps the narrative card on
                the right half of the screen on lg+. Hidden on mobile
                so the card fills the viewport. */}
            <div className="hidden lg:block lg:col-span-7" aria-hidden="true" />
            <div className="lg:col-span-5">
              {/* Card container — gives the absolutely-
                  positioned cards a real box to live in. On
                  mobile the cards fill the visible stage
                  (h-screen - top/bottom chrome), on desktop
                  the spacer pushes the card to the right
                  column. min-h on mobile ensures the card has
                  a real height since absolute children don't
                  contribute to parent sizing.
                  pb-10 cushion + leading-[1.7] on the inner
                  body keep Marathi prose from clipping at the
                  bottom rounded edge. */}
              <div className="relative h-full min-h-[78vh] md:min-h-[34rem]">
                {eras.map((era, i) => (
                  <article
                    key={`card-${era.id}`}
                    ref={(el) => setCardRef(el, i)}
                    // Glassmorphic surface — mirrors Testimonials
                    // (bg-white/10 backdrop-blur-md border-white/15
                    // + soft outer shadow + rounded-2xl).
                    //
                    // Padding: p-6 sm:p-7 lg:p-8 with explicit
                    // pb-10/12 so the final bullet never collides
                    // with the card's rounded bottom edge —
                    // critical for Marathi (which expands ~30%
                    // over English due to Devanagari glyph
                    // metrics). overflow-hidden is the GSAP
                    // crossfade requirement (matches Testimonials
                    // exactly); Marathi safety lives in the
                    // line-height + padding inside, not in a
                    // scrollable nested container.
                    //
                    // position: absolute + inset:0 + opacity:0 +
                    // y:24px initial state is what allows the GSAP
                    // crossfade to work: all 5 cards overlap at the
                    // same location and GSAP flips opacity/transform
                    // as scroll progresses.
                    //
                    // SECOND CARD (i === 1) — gets a special flip
                    // treatment. The outer <article> keeps doing the
                    // GSAP opacity crossfade, but the inner content
                    // is wrapped in a flip-card 3D shell so the user
                    // can tap to reveal the rich narrative back
                    // face. All other eras render the standard
                    // renderEraCardBody().
                    className="timeline-card absolute inset-0 will-change-transform overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 pb-10 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-7 sm:pb-10 lg:p-8 lg:pb-12"
                    style={{
                      opacity: 0,
                      transform: 'translate3d(0,24px,0)',
                    }}
                    aria-hidden={i !== 0}
                  >
                    {i === 1 ? (
                      renderFlipCardContent(
                        era,
                        isSecondCardFlipped,
                        setIsSecondCardFlipped,
                      )
                    ) : (
                      renderEraCardBody(era)
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Section Heading (always visible) ─── */}
        <div className="pointer-events-none absolute left-6 top-6 z-20 lg:left-10 lg:top-10">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/85">
            Our Journey
          </p>
        </div>

        {/* ─── Scroll-hint + thin progress bar (bottom-center) ───
            Replaces the 5 gold pagination dashes that used to
            live here. The dashes read as horizontal-pagination
            controls (swipe left/right), which is wrong for this
            section — the journey is vertical-scroll driven.
            The new UI:
              • A small chevron + label "Scroll down to explore
                the journey" sits at bottom-center on first
                entry. GSAP fades it from opacity 1 → 0 across
                the first 5% of scroll progress, after which
                it's hidden. The label is in the user's locale
                (English / Marathi) via the translations hook.
              • A 160 px × 2 px gold progress bar sits just
                below the label. Its `scaleX` tracks the
                section's scroll progress (0 → 1 across the
                full vertical scroll distance). Reads as a
                "you are here" indicator for the journey, not
                as a horizontal carousel control.
            Both elements are pointer-events:none so they
            never block taps/clicks underneath. */}

        {/* Aesthetic scroll indicator (vertical scroller cue).
            Replaces the previous chip + chevron + label —
            those read as instruction labels rather than a
            directional cue. This is a tall thin vertical line
            with a gold dot that continuously rides down it,
            editorial style (awwwards / readout-typography
            pattern). No text label — the animation IS the
            indicator. Fades out via GSAP over the first 5% of
            scroll progress so it's gone once the user has
            started moving. */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute inset-x-0 bottom-10 z-30 flex justify-center lg:bottom-12"
          aria-hidden="true"
        >
          <div className="relative flex h-[44px] w-[18px] items-start justify-center">
            {/* Faint top cap — a tiny gold dot that hints at the
                indicator's start, then loops back. */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#FFD200]/55"
            />
            {/* Vertical track */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[6px] h-[34px] w-px -translate-x-1/2 overflow-hidden bg-white/15"
            >
              {/* Filled sub-track that pulses subtly to give the
                  cue a "live" feel even before the dot arrives. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[#FFD200]/45 to-transparent motion-safe:animate-[rl-track-drain_2.4s_ease-in-out_infinite]"
                style={{ transform: 'scaleY(0.4)' }}
              />
            </span>
            {/* The traveling scroller dot. CSS keyframe drives it
                from just below the top cap down to the bottom of
                the track, then loops. opacity fades at the loop
                endpoints so the "reset" isn't visible. */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[6px] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-[#FFD200] shadow-[0_0_8px_rgba(255,210,0,0.55)] motion-safe:animate-[rl-scroller-travel_1.8s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* Thin gold progress bar — fills left-to-right as the
            user scrolls the section. transform-origin: left
            center so scaleX grows from the left edge. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center lg:bottom-8"
          aria-hidden="true"
        >
          <div
            className="relative h-[2px] w-[160px] overflow-hidden rounded-full bg-white/15"
          >
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 w-full origin-left bg-[#FFD200] will-change-transform"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
