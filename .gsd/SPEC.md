# SPEC.md — Hero & Timeline Re-engineering

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision

Replace Unique Systems' experimental blackboard/chalk "Our Journey" interaction with a high-performance, photo-driven scrollytelling presentation. The site should read as an **institutional technology portfolio** — established, authoritative, regionally rooted — rather than a creative experiment. Two sections are in scope: `HeroSection` (above the fold) and `TimelineSection` ("Our Journey" era scroller). All animations must run on the compositor only (`transform` + `opacity`) to hold 60 fps on integrated graphics.

## Goals

1. **Institutional positioning** — Position Unique Systems as a 2014-established (Est. 1998) ed-tech operator deploying rugged, offline-capable digital learning setups across 150+ Zilla Parishad schools in Raigad & Ratnagiri districts.
2. **Hero rewrite** — Authoritative headline, trust-metric strip, and one signature image (`Projector_in_action.jpeg`) framed as a Konkan deployment proof point.
3. **Timeline re-architecture** — Replace the blackboard/chalk experimental canvas with a pinned, photo-driven scrollytelling stage. Five sanitized eras, each with one high-resolution classroom image and one narrative card. Subtle crossfade + scale-drift (1.04 → 1.0) on the backdrop as the user scrubs.
4. **Hardware attribution feature** — Surface the "Custom BIOS & Firmware Attribution" capability inside the timeline so the firmware-as-product angle reads explicitly.
5. **Global desktop scale** — 125% rem scaling on desktop (≥1024px) to give the UI substance without breaking GSAP layout math.
6. **Compositor-only motion** — Every scroll-driven property must be `transform` (`translate3d(...)`) or `opacity`. No `top`, `left`, `width`, `height`, `margin`, `padding`, `filter: blur()`, or `box-shadow` changes during scroll.
7. **Clean build** — `npm run build` returns zero errors. No new package installs.

## Non-Goals (Out of Scope)

- No new packages. Existing stack only: Vite, React 18, Tailwind CSS 4, GSAP 3.15, `@studio-freight/react-lenis`, `lucide-react`.
- No new components (no new files). Re-engineer existing `HeroSection.jsx` and `TimelineSection.jsx` in place.
- No new image assets. Use only what's already in `public/`: `Projector_in_action.jpeg`, `HappyKids1.jpg`, `HappyFaculty3.jpg`, `KidsCelebrating.jpg`.
- No changes to `App.jsx`, `main.jsx`, `Navbar`, `MLADonorShowcase`, `ScrollyTellingWrapper`, `BrandSwoosh`, `DecryptedText`, `SpotlightCard`, `CustomCursor`, `BrandLogo`, `WarliClassroomIllustration`, `WarliBorder`, `ProjectorVideoPlayer`, `ProjectorScreen`, `LanguageContext`, `translations.js`, `timelineData.json`. Out of scope unless incidental cleanup is required.
- No browser-based verification (no Chrome, Puppeteer, Playwright). Verification is `npm run build` output only.
- No new dependencies, no version bumps, no `package-lock.json` rewrites.
- No changes to Git workflow conventions from `PROJECT_RULES.md` (one task = one commit; commit format `type(scope): description`).

## Constraints

### Operational (from user, 2026-09-20)

- **Do not** launch Google Chrome, Puppeteer, or any automated DOM/browser inspection tools.
- **Do not** install unnecessary packages. Use the existing stack.
- **Maintain compositor-only animations** (`transform: translate3d(...)` + `opacity`) during scroll.
- **`npm run build` must succeed with zero errors.**

### Project (from `PROJECT_RULES.md`)

- **SPEC → PLAN → EXECUTE → VERIFY → COMMIT** discipline. This document is the SPEC.
- **No implementation code before FINALIZED** — this status gate is now passed.
- **One task = one commit**. Commit message format: `type(scope): description`.
- **Shell discipline**: one command per invocation. No `&&` chaining.
- **Search-first**: grep before reading files whole.
- **Empirical proof**: `npm run build` output is the verification artifact for this work.

### Technical

- **Tailwind 4** (`@import "tailwindcss"` + `@theme` block). No `@layer base` syntax from Tailwind 3 — place root font-size rules at top-level after `@import`.
- **GSAP 3.15** + `ScrollTrigger` plugin. Use the established pattern from `src/components/TimelineSection.jsx` (already imports both).
- **Lenis** via `@studio-freight/react-lenis` (legacy wrapper — current API is `useLenis()` hook from this older package, NOT the `<ReactLenis>` provider from `react-lenis`).
- **React 18** — `StrictMode` is on. Effects run twice in dev; account for that in any ScrollTrigger setup / cleanup.
- **i18n intact** — `useLanguage()` hook is already wired into both components. Translations should continue to work; only English strings are specified in this spec, but the existing translation plumbing must not break.

## Success Criteria

- [ ] `src/index.css` declares desktop root font-size of `20px` (125% of 16px) at `@media (min-width: 1024px)`.
- [ ] `src/index.css` removes the `.blackboard-panel`, `.cinema-light-leak`, and chalk-font sections (the "experimental blackboard" relics).
- [ ] `src/components/HeroSection.jsx` renders: institutional headline ("Empowering Rural Schools With" / "Affordable Digital Learning"), subtitle, 4-card trust-metric strip, and `Projector_in_action.jpeg` in an institutional glass frame.
- [ ] `src/components/TimelineSection.jsx` is a pinned scrollytelling stage with 5 eras, each backed by a real classroom image and a narrative milestone card.
- [ ] Timeline uses **crossfade + scale-drift** (scale 1.04 → 1.0) on backdrops, implemented via GSAP ScrollTrigger scrub — not CSS transitions, not React state.
- [ ] Timeline includes the "Custom BIOS & Firmware Attribution" callout.
- [ ] All scroll-driven animations use **only `transform` and `opacity`** (grep `src/components/HeroSection.jsx src/components/TimelineSection.jsx src/index.css` for any forbidden properties — `top|left|width|height|margin|padding|filter\s*:\s*blur` inside GSAP tweens or scroll handlers).
- [ ] No new files. No new packages. `package.json` is unchanged.
- [ ] `npm run build` returns exit code 0 with no errors.

## User Stories

### As a CSR foundation officer browsing the site

- I want the headline to read as institutional, not creative.
- So that I take the organization seriously as a deployable partner.

### As a school principal scrolling the site

- I want to see actual classroom deployments while reading era milestones.
- So that I trust the technology will work in my school's environment.

### As a user on integrated-graphics hardware

- I want scrolling to hold 60 fps.
- So that the experience doesn't stutter on my laptop.

### As a donor or government stakeholder

- I want to see the firmware-attribution feature surfaced.
- So that I understand the institutional-grade packaging, not just hardware resale.

## Technical Requirements

| Requirement | Priority | Notes |
|---|---|---|
| Root font-size 20px on ≥1024px viewports | Must-have | Tailwind 4 top-level CSS, not `@layer base` |
| Hero institutional headline (two-line, no awkward break) | Must-have | Use `<br>` or `whitespace` controls; verify with browser-side string measure (manual code review) |
| Hero trust-metric strip — 4 cards, locked bottom-aligned baselines | Must-have | `flex flex-col justify-between h-full` on each card |
| Hero image — `Projector_in_action.jpeg` in glass frame | Must-have | Path: `/Projector_in_action.jpeg` (in `public/`) |
| Timeline pinned stage (`sticky top-0 h-screen`) | Must-have | Outer container provides scroll length; inner sticky element stays pinned |
| Timeline GSAP ScrollTrigger scrub across 5 eras | Must-have | Use existing `gsap` + `ScrollTrigger` import; one timeline, 5 scrubbed segments |
| Timeline backdrop crossfade + scale-drift (1.04 → 1.0) on each era | Must-have | All 5 backdrops stacked; per-era `opacity` tween + `scale` on the active one |
| Timeline narrative card — year, title, body | Must-have | Floating translucent card on the right side; readability is non-negotiable |
| Era 01 (1998 – 2013) "Ground Zero in Khed" | Must-have | Backdrop: generic institutional tech background or shop origin visual (use `Hero.png` from `src/assets/hero.png` if no other option, otherwise a CSS gradient) |
| Era 02 (2014 – 2016) "The ₹25,000 Breakthrough" | Must-have | Backdrop: `/Projector_in_action.jpeg` |
| Era 03 (2017 – 2024) "Institutional Deployments & Reach" | Must-have | Backdrop: `/HappyKids1.jpeg` |
| Era 04 (2025 – 2026) "Zero-Bandwidth High-Definition Ecosystems" | Must-have | Backdrop: `/HappyFaculty3.jpeg` |
| Era 05 (Present) "The Regional Benchmark (150+ Schools)" | Must-have | Backdrop: `/KidsCelebrating.jpeg` |
| Hardware attribution callout inside timeline | Must-have | Text: "Custom BIOS & Firmware Attribution — hardware firmware pre-flashed to display institutional patron crests, CSR foundations, or public donor attribution screens upon startup." |
| Compositor-only animation (no `top`/`left`/`width`/`height`/`filter:blur` during scroll) | Must-have | Verified by grep before commit |
| `npm run build` exits 0 | Must-have | Sole verification artifact (no browser tools) |
| i18n continues to work via `useLanguage()` | Should-have | Translation plumbing unchanged; new English strings may pass through existing `t()` calls if present, or render literal English if not |

## Era Narrative Copy (locked)

**Era 01 (1998 – 2013) — "Ground Zero in Khed"**
> Founded Khed's first dedicated computer assembly and service center, eliminating the 150km repair bottleneck to Mumbai and Pune for rural institutions.

**Era 02 (2014 – 2016) — "The ₹25,000 Breakthrough"**
> Challenged ₹1 Lakh+ smart-classroom vendor quotes by engineering an offline, ruggedized LED ceiling-projection rig built within ZP grant caps.

**Era 03 (2017 – 2024) — "Institutional Deployments & Reach"**
> Scaled deployments across 100+ schools in partnership with regional CSR foundations, institutional training under Mahad MMACETP (Mahad MIDC), and State-Board-aligned educational curriculum curators.

**Era 04 (2025 – 2026) — "Zero-Bandwidth High-Definition Ecosystems"**
> Deployed 4K interactive anti-glare touch panels with zero-latency digital blackboard software and high-lumen FHD projection designed for zero-connectivity classrooms.

**Era 05 (Present) — "The Regional Benchmark (150+ Schools)"**
> Outcompeting generic multinational equipment with ruggedized hardware, zero mandatory subscriptions, and guaranteed 24-hour local on-site support across Konkan.

## Hero Copy (locked)

**Headline:**
- Line 1: "Empowering Rural Schools With"
- Line 2: "Affordable Digital Learning"

**Subtitle:** "Pioneering rugged, offline eLearning setups across 150+ Zilla Parishad schools in Raigad & Ratnagiri since 2014—engineered to operate within standard grant limits."

**Trust-metric strip (4 cards, bottom-aligned baselines):**
- "150+ Schools Digitized" / "Across Raigad & Ratnagiri districts"
- "₹25,000 Benchmark" / "Engineered for ZP grant limits"
- "100% Offline Capable" / "Zero internet dependency"
- "Next-Gen 4K Ecosystems" / "Interactive anti-glare flat panels"

## Files To Be Modified

- `src/index.css` — add desktop root font-size rule; remove blackboard/chalk relics
- `src/components/HeroSection.jsx` — full rewrite per Hero copy + structure
- `src/components/TimelineSection.jsx` — full rewrite as pinned scrollytelling stage

## Verification

**Primary:** `npm run build` — must exit 0 with no errors. Output captured as proof.

**Secondary (static):** grep `src/components/HeroSection.jsx src/components/TimelineSection.jsx` for forbidden animation properties (`top|left|width|height|margin|padding|filter\s*:\s*blur`) inside GSAP tween calls or scroll handlers. Must return zero matches.

---

*Last updated: 2026-09-20*
