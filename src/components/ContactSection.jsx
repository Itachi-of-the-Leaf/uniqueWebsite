import { useState } from 'react'
import {
  MessageCircle,
  Send,
  User,
  Mail,
  ListChecks,
  CheckCircle2,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import AnimatedSelect from './AnimatedSelect'
import {
  openWhatsappBlankChat,
  WHATSAPP_PHONE,
} from '../utils/whatsapp'

// Destination phone — drop the leading `+`, keep country code.
// Pulled from App.jsx: +91 94224 33394 -> 919422433394
// (Now imported from ../utils/whatsapp — see the import above.)

// ─── Mobile detection ───────────────────────────────────────────────────
// Narrow UA regex matching phones and tablets. We intentionally keep
// the pattern conservative — desktop browsers, laptops, and most
// kiosk / wall-mounted browsers won't match, so they take the
// desktop branch below. iPads are listed because some older iPad
// UAs still report iPad in the user-agent string.
const MOBILE_UA_REGEX = /Android|iPhone|iPad|iPod/i
const isMobileDevice = () =>
  typeof navigator !== 'undefined' &&
  MOBILE_UA_REGEX.test(navigator.userAgent || '')

// ─── Locale-aware message templates ────────────────────────────────────
// Build the prefilled WhatsApp message. The first line is a locale-
// specific greeting that introduces the sender and the topic; the
// second line is the user's typed message verbatim.
//
//   EN: "Hello! Myself <First> <Last>, reaching out to you regarding
//        *<Contact Regarding>*."
//   MR: "नमस्कार! मी *<First> <Last>*! मला तुमच्यासोबत *<Contact Regarding>*
//        या विषयाबद्दल चर्चा करायची आहे."
//
// `subjectLabel` is the human-readable, locale-specific option text
// (e.g. "Classroom Deployment" / "वर्ग तैनाती"). Both templates wrap
// the sender's name and the subject in `*...*` so WhatsApp renders
// them bold.
//
// `language` is the active locale ('en' | 'mr') so we can pick the
// right template at submit time.
function buildWhatsappText({ firstName, lastName, subjectLabel, message, language }) {
  const fullName = `${firstName} ${lastName}`.trim()
  const greeting =
    language === 'mr'
      ? `नमस्कार! मी *${fullName}*! मला तुमच्यासोबत *${subjectLabel}* या विषयाबद्दल चर्चा करायची आहे.`
      : `Hello! Myself ${fullName}, reaching out to you regarding *${subjectLabel}*.`
  // Single blank line between greeting and body so WhatsApp renders
  // them as two paragraphs.
  return `${greeting}\n\n${message}`
}

// ─── Platform-aware WhatsApp composer launcher ──────────────────────────
// Three routing paths, picked at submit time:
//
//   1. Mobile + native scheme `whatsapp://send?phone=…&text=…`
//      Triggers the OS-level app handler. Android Chrome resolves
//      the intent to the WhatsApp app if installed; iOS Safari
//      routes via universal-link handling. If the app isn't
//      installed, the navigation does nothing visible.
//
//   2. Mobile + web fallback `https://api.whatsapp.com/send?phone=…&text=…`
//      Hosted WhatsApp API endpoint — works without the app
//      installed, opens the WhatsApp Web mobile client in the
//      same tab. Used as the fallback after a 1.2s timeout when
//      the native scheme didn't take focus.
//
//   3. Desktop `https://web.whatsapp.com/send?phone=…&text=…`
//      Direct WhatsApp Web URL in a new tab. The user keeps the
//      site open and just clicks into the new tab to hit Send.
//
// The 1.2-second timeout for the mobile native-scheme attempt is
// the standard heuristic for "did the OS hand focus to the app?".
// We deliberately do NOT try to detect focus — `document.hidden`
// is unreliable across iOS PWAs and Android Chrome custom tabs —
// we just always fire the fallback if we're still on the page
// after the timeout. If the app already opened, the second
// navigation attempt is a no-op (the page is backgrounded and
// the OS won't deliver the redirect).
function openWhatsappComposer(text) {
  const phone = WHATSAPP_PHONE
  const encoded = encodeURIComponent(text)

  if (isMobileDevice()) {
    const nativeAppUrl = `whatsapp://send?phone=${phone}&text=${encoded}`
    const webFallbackUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`

    // Attempt the native scheme first. If the OS hands focus to the
    // WhatsApp app within 1.2s, the page goes to the background and
    // the setTimeout callback fires harmlessly. Otherwise we land on
    // the mobile web client.
    window.location.href = nativeAppUrl
    setTimeout(() => {
      // `document.hidden` is checked to avoid double-navigation when
      // the native scheme DID succeed — but as noted above it's not
      // perfectly reliable, so we leave it as a hint, not a guard.
      if (!document.hidden) {
        window.location.href = webFallbackUrl
      }
    }, 1200)
    return
  }

  // Desktop: WhatsApp Web in a new tab.
  const desktopUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`
  window.open(desktopUrl, '_blank', 'noopener,noreferrer')
}

// Subject options for the "Contact Regarding" dropdown. Keys are the
// i18n keys; values are English fallbacks so the form degrades
// gracefully if a translation is missing.
const SUBJECT_OPTIONS = [
  { key: 'enquiry.general', fallback: 'General Enquiry' },
  { key: 'enquiry.deployment', fallback: 'Classroom Deployment' },
  { key: 'enquiry.hardware', fallback: 'Hardware Specification' },
  { key: 'enquiry.firmware', fallback: 'Firmware / Asset Attribution' },
  { key: 'enquiry.partner', fallback: 'Partnership / CSR' },
]

export default function ContactSection() {
  const { t, language } = useLanguage()

  // Resolve localized copy. The translation file provides a
  // contactSection block; we fall back to English defaults.
  const lang = t('contactSection') || {}
  const badge = lang.badge ?? 'Get In Touch'
  const heading = lang.heading ?? 'Contact Us'
  const subheading =
    lang.subheading ??
    'Reach out for classroom deployments, hardware specifications, firmware customisation, or partnership enquiries. We respond within one working day.'
  const fields = lang.fields ?? {}
  const labels = {
    firstName: fields.firstName ?? 'First Name',
    lastName: fields.lastName ?? 'Last Name',
    subject: fields.subject ?? 'Contact Regarding',
    message: fields.message ?? 'Your Message',
    subjectPlaceholder:
      fields.subjectPlaceholder ?? 'Choose a topic…',
  }
  const placeholders = {
    firstName: fields.firstNamePh ?? 'e.g. Ramesh',
    lastName: fields.lastNamePh ?? 'e.g. Patil',
    message: fields.messagePh ?? 'Tell us about your institution, class size, or the hardware you have in mind…',
  }
  const submit = lang.submit ?? 'Send via WhatsApp'
  const helperText =
    lang.helperText ??
    'Submitting opens WhatsApp with your message pre-filled — just hit Send.'
  const successHint =
    lang.successHint ??
    'You will see your message in the WhatsApp composer. Press Enter or click Send.'

  // Form state — controlled inputs. We don't need react-hook-form;
  // a single useState object is enough for 4 fields.
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = true
    if (!form.lastName.trim()) next.lastName = true
    if (!form.subject) next.subject = true
    if (!form.message.trim()) next.message = true
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // Subject option labels resolve from translation file using the
  // FALLBACK by default. We look up `enquiry.<key>` in the
  // translation file; if missing, use the fallback English label.
  const subjectOptions = SUBJECT_OPTIONS.map((opt) => ({
    value: opt.key,
    label: t(`contactSection.subjects.${opt.key}`) || opt.fallback,
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Resolve the selected subject's localized label so the WhatsApp
    // composer shows clean human text, not the internal `enquiry.*`
    // key. We re-derive here from `subjectOptions` rather than
    // carrying the label through form state, so the displayed select
    // stays in sync if the locale changes mid-form.
    const selectedOption = subjectOptions.find(
      (opt) => opt.value === form.subject
    )
    const subjectLabel = selectedOption?.label ?? form.subject
    const text = buildWhatsappText({ ...form, subjectLabel, language })
    openWhatsappComposer(text)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-b from-canvas to-canvas-deep dark:bg-[#070C24] py-20 sm:py-24 lg:py-28 px-5 sm:px-8 transition-colors duration-300"
    >
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-12 lg:mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-amber-400/30 bg-amber-400/10 text-amber-300 mb-3">
            <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[0.7rem] sm:text-xs font-bold tracking-[0.18em] uppercase text-amber-300">
              {badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B4F] dark:text-white tracking-tight mb-3">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8">
            {subheading}
          </p>
        </div>

        {/* FORM CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left column: form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 w-full bg-white dark:bg-[#0B1B4F]/40 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10"
          >
            {/* First + Last Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field
                id="firstName"
                label={labels.firstName}
                error={errors.firstName}
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={update('firstName')}
                    placeholder={placeholders.firstName}
                    className={inputClass(errors.firstName)}
                  />
                </div>
              </Field>
              <Field
                id="lastName"
                label={labels.lastName}
                error={errors.lastName}
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={update('lastName')}
                    placeholder={placeholders.lastName}
                    className={inputClass(errors.lastName)}
                  />
                </div>
              </Field>
            </div>

            {/* Subject — custom AnimatedSelect replaces the
                native <select> so the option list matches
                the brand palette instead of inheriting the
                OS's default dropdown chrome. */}
            <div className="mb-4">
              <Field
                id="subject"
                label={labels.subject}
                error={errors.subject}
              >
                <AnimatedSelect
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, subject: v }))
                  }
                  options={subjectOptions.map((opt) => ({
                    value: opt.value,
                    label: opt.label,
                  }))}
                  placeholder={labels.subjectPlaceholder}
                  error={Boolean(errors.subject)}
                  icon={ListChecks}
                />
              </Field>
            </div>

            {/* Message */}
            <div className="mb-6">
              <Field
                id="message"
                label={labels.message}
                error={errors.message}
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder={placeholders.message}
                    className={`${inputClass(errors.message)} pl-10 pt-3 leading-relaxed resize-y min-h-[7rem]`}
                  />
                </div>
              </Field>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1DAE53] text-white font-extrabold text-sm sm:text-base shadow-md shadow-[#25D366]/30 border border-[#FFD200]/40 transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span>{submit}</span>
            </button>

            {/* Helper / success copy */}
            <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {helperText}
            </p>
            {submitted && (
              <div className="mt-4 inline-flex items-start gap-2 px-3 py-2.5 rounded-lg bg-[#25D366]/10 dark:bg-[#25D366]/15 border border-[#25D366]/30 dark:border-[#25D366]/40 text-xs sm:text-sm text-[#0A1E5C] dark:text-white">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span>{successHint}</span>
              </div>
            )}
          </form>

          {/* Right column: contact info card */}
          <aside data-dark-bg className="lg:col-span-5 rounded-2xl border border-[#0A1E5C]/15 bg-gradient-to-br from-[#0A1E5C] to-[#103B9B] p-7 sm:p-9 text-white shadow-md flex flex-col">
            <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#FFD200] mb-3">
              {lang.directCard?.eyebrow ?? 'Reach Us Directly'}
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-tight mb-7">
              {lang.directCard?.heading ??
                'Konkan Regional Deployment Hub'}
            </h3>

            {/* Items stack — increased space-y + gap + icon size
                so each entry reads with comfortable breathing room
                against the navy gradient. Icons grow from 8×8 →
                10×10 to anchor each row visually. */}
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-[#FFD200]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92V21a1 1 0 0 1-1.09 1A19 19 0 0 1 2 3.09 1 1 0 0 1 3 2h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.27 1L7.21 9.21a16 16 0 0 0 7.58 7.58l1.46-1.6a1 1 0 0 1 1-.27l4 1a1 1 0 0 1 .75 1z" />
                  </svg>
                </span>
                <div className="pt-1">
                  <p className="text-[#FFD200] text-[0.7rem] font-bold tracking-widest uppercase mb-1">
                    {lang.directCard?.phoneLabel ?? 'Direct Phone'}
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_PHONE}`}
                    onClick={openWhatsappBlankChat}
                    className="font-bold hover:underline"
                  >
                    +91 94224 33394
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-[#FFD200]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div className="pt-1">
                  <p className="text-[#FFD200] text-[0.7rem] font-bold tracking-widest uppercase mb-1">
                    {lang.directCard?.addressLabel ?? 'Hub Address'}
                  </p>
                  <p className="leading-snug">
                    {lang.directCard?.address ??
                      'Bilvadal-1, Samartha Nagar, near MSEB Office, next to Govt. Godowns, Khed, Maharashtra 415709'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-[#FFD200]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div className="pt-1">
                  <p className="text-[#FFD200] text-[0.7rem] font-bold tracking-widest uppercase mb-1">
                    {lang.directCard?.hoursLabel ?? 'Response Window'}
                  </p>
                  <p className="leading-snug">
                    {lang.directCard?.hours ?? 'Mon–Sat · 09:00–18:00 IST'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-7 border-t border-white/10 text-[0.78rem] text-white/75 leading-relaxed">
              {lang.directCard?.note ??
                'Contact us to get your local rural school digitalized — we are here to help bring modern, rugged, offline-ready learning to your students.'}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────

// Standard input/select/textarea class — Tailwind utilities only.
// The error state shifts the ring color and adds a red border.
function inputClass(hasError) {
  const base =
    // Always `text-base` (16px) — never smaller. iOS Safari zooms
    // any input whose computed font-size is below 16px on focus,
    // which is jarring on mobile. `sm:text-base` would drop to
    // text-sm (14px) below the sm breakpoint.
    'w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold pl-10 pr-3 min-h-[48px] transition-colors duration-150'
  const ring = hasError
    ? 'border-[#C41230] focus:border-[#C41230] focus:ring-[#C41230]/30'
    : 'focus:border-[#0A1E5C]/40 dark:focus:border-[#FFD200]/50'
  return `${base} ${ring}`
}

// Label + icon + child slot. Renders an error message below the
// control when `error` is truthy.
function Field({ id, label, error, children }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-[#C41230]">
          This field is required.
        </span>
      )}
    </label>
  )
}
