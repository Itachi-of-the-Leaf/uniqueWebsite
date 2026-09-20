import { useEffect, useState } from 'react'
import { Drawer } from 'vaul'
import { MessageCircle, X, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import {
  openWhatsappBlankChat,
  WHATSAPP_PHONE,
} from '../utils/whatsapp'

/**
 * Mobile-only floating CTA + Vaul bottom-sheet quick-enquiry.
 *
 * Two-tier pattern on phones:
 *
 *   1. A fixed bottom-of-screen pill button, visible from the moment
 *      the user scrolls past the hero. Tapping it opens the bottom
 *      sheet. We hide it during the scroll-pinned Timeline + Testimonials
 *      sections (mirrors the existing nav-shell hidden behaviour).
 *
 *   2. A Vaul drawer with two paths: pre-canned quick WhatsApp
 *      messages (classroom deployment, hardware spec, partnership),
 *      or "blank chat" with the team. Each path uses the existing
 *      openWhatsappComposer / openWhatsappBlankChat utilities so the
 *      routing (mobile vs desktop, native scheme vs web fallback)
 *      stays consistent.
 *
 * `md:hidden` everywhere — on desktop the inline form in
 * ContactSection.jsx is the canonical entry point.
 */
export default function MobileLeadSheet() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Mirror the nav-shell hide-on-pinned-section behaviour: while
  // the user is inside TimelineSection or TestimonialsSection,
  // the pin-ScrollTrigger dispatches a `pinned-section` CustomEvent.
  // We hide the CTA alongside the nav so the story sections get
  // the full viewport without distractions.
  useEffect(() => {
    let count = 0
    const onPinned = (e) => {
      if (e.detail?.pinned) count++
      else count = Math.max(0, count - 1)
      setHidden(count > 0)
    }
    window.addEventListener('pinned-section', onPinned)
    return () => window.removeEventListener('pinned-section', onPinned)
  }, [])

  // Hide once user reaches the contact section — they don't need
  // a "Contact us" CTA if the form is already in front of them.
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact')
      if (!contact) return
      const r = contact.getBoundingClientRect()
      const isOnScreen = r.top < window.innerHeight && r.bottom > 0
      if (isOnScreen) setHidden(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const lang = t('contactSection') || {}
  const badge = lang.badge ?? 'Get In Touch'
  const quickHeading = lang.mobileSheet?.heading ?? 'Reach us on WhatsApp'
  const quickSubheading =
    lang.mobileSheet?.subheading ??
    'Tap a topic to start a chat with our Khed team. Replies usually within one working day.'
  const quickTopics =
    lang.mobileSheet?.topics ?? [
      { key: 'classroom', label: 'Classroom Deployment', message: 'Hi! I would like to discuss a classroom deployment for our school.' },
      { key: 'hardware', label: 'Hardware Specification', message: 'Hi! I have a question about hardware specifications.' },
      { key: 'partner', label: 'Partnership / CSR', message: 'Hi! I would like to explore a partnership opportunity.' },
      { key: 'blank', label: 'Blank Chat', message: '' },
    ]

  // Build the WhatsApp link for a given message. Uses wa.me so it
  // works in both mobile and desktop contexts. The JS click handler
  // uses the same routing logic as the contact form.
  const handleQuick = (msg) => (e) => {
    e.preventDefault()
    if (!msg) {
      openWhatsappBlankChat()
    } else {
      const encoded = encodeURIComponent(msg)
      const web = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`
      // Reuse the same mobile routing pattern from the form:
      // mobile → whatsapp:// scheme → api.whatsapp.com fallback,
      // desktop → web.whatsapp.com in new tab.
      if (typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '')) {
        const native = `whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encoded}`
        window.location.href = native
        setTimeout(() => {
          if (!document.hidden) window.location.href = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`
        }, 1200)
      } else {
        window.open(web, '_blank', 'noopener,noreferrer')
      }
    }
    setOpen(false)
  }

  return (
    <>
      {/* Floating CTA — only on phones, hidden inside pinned
          sections and once the user reaches the contact section. */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out ${
          hidden ? 'translate-y-full' : 'translate-y-0'
        }`}
        aria-hidden={hidden}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group w-full min-h-[52px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1DAE53] active:bg-[#1DAE53] text-white font-extrabold text-base shadow-lg shadow-[#25D366]/40 border border-[#FFD200]/50 transition-all duration-150 ease-out active:scale-[0.98]"
          aria-label={quickHeading}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{t('nav.contactUs') ?? 'Contact Us'}</span>
        </button>
      </div>

      {/* Vaul bottom sheet — mobile only. `direction="bottom"` is
          the default but explicit for clarity. `handleOnly` keeps
          accidental scroll-to-dismiss from closing the sheet while
          users tap topics. `shouldScaleBackground` produces the
          iOS-style "page behind" zoom-out so it's clear the user
          is still on the site. */}
      <Drawer.Root
        open={open}
        onOpenChange={setOpen}
        direction="bottom"
        dismissible
        handleOnly={false}
        modal
        shouldScaleBackground
        repositionInputs
        preventScrollRestoration
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/55 z-50" />
          <Drawer.Content
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white shadow-2xl outline-none flex flex-col max-h-[88vh] pb-[env(safe-area-inset-bottom)]"
            aria-describedby="mobile-sheet-desc"
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[#E3E7F0]" />
            <div className="px-6 pt-5 pb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#0A1E5C]/70">
                  {badge}
                </p>
                <Drawer.Title className="mt-1 text-xl font-extrabold text-[#0A1E5C] leading-tight">
                  {quickHeading}
                </Drawer.Title>
                <Drawer.Description
                  id="mobile-sheet-desc"
                  className="mt-1.5 text-sm text-[#3A4565] leading-relaxed"
                >
                  {quickSubheading}
                </Drawer.Description>
              </div>
              <Drawer.Close
                aria-label="Close"
                className="min-h-[44px] min-w-[44px] -mr-2 -mt-1 p-2 rounded-full text-[#5A6781] hover:bg-[#F4F6FC] active:bg-[#E3E7F0] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </Drawer.Close>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-3 space-y-2.5">
              {quickTopics.map((topic) => (
                <a
                  key={topic.key}
                  href={
                    topic.message
                      ? `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(topic.message)}`
                      : `https://wa.me/${WHATSAPP_PHONE}`
                  }
                  onClick={handleQuick(topic.message)}
                  className="group min-h-[56px] flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-[#E3E7F0] bg-gradient-to-br from-white to-[#F4F6FC] hover:border-[#25D366]/50 hover:shadow-md active:scale-[0.99] transition-all duration-150"
                >
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-[#25D366]/12 flex items-center justify-center text-[#1DAE53]">
                    <Send className="w-4 h-4" />
                  </span>
                  <span className="flex-1 text-base font-bold text-[#0A1E5C] leading-tight">
                    {topic.label}
                  </span>
                </a>
              ))}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
