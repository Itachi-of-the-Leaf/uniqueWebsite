/**
 * WhatsApp click-to-chat utilities
 * ──────────────────────────────────────────────────────────────────────
 * Routing strategy:
 *   - Mobile (Android / iOS): try the `whatsapp://` custom URL scheme
 *     first. If the OS hands focus to the WhatsApp app within 1.2s,
 *     the page goes to the background and the setTimeout fires
 *     harmlessly. Otherwise we fall through to
 *     `https://api.whatsapp.com/send?phone=…` which opens the mobile
 *     WhatsApp Web client in the same tab.
 *   - Desktop: open `https://web.whatsapp.com/send?phone=…` in a new
 *     tab via window.open. The user can hit Send immediately.
 *
 * Universal fallback URL (`https://wa.me/<phone>`) is set as the
 * anchor's static `href` so non-JS clients and right-click "open in
 * new tab" still work — the JS routing only kicks in on direct
 * left-click.
 *
 * The phone number uses the standard WhatsApp click-to-chat format:
 * country code + national number, no leading 0, no `+`, no spaces.
 */

// Verified WhatsApp business number. Country code 91 + 10-digit mobile.
export const WHATSAPP_PHONE = '919422433394'

// Narrow UA regex matching phones and tablets. We intentionally keep
// the pattern conservative — desktop browsers, laptops, and TVs
// fall through to web.whatsapp.com which gives the cleanest UX.
const MOBILE_UA_REGEX = /Android|iPhone|iPad|iPod/i
const isMobileDevice = () =>
  typeof navigator !== 'undefined' &&
  MOBILE_UA_REGEX.test(navigator.userAgent || '')

/**
 * Opens a blank WhatsApp chat with `WHATSAPP_PHONE` (no pre-filled
 * message). Mobile gets the native app via `whatsapp://`; desktop
 * opens web.whatsapp.com in a new tab.
 */
export function openWhatsappBlankChat(event) {
  if (event) {
    // Prevent default anchor navigation so our routing logic wins.
    event.preventDefault()
  }
  const phone = WHATSAPP_PHONE
  const webUrl = `https://wa.me/${phone}` // universal fallback

  if (isMobileDevice()) {
    const nativeAppUrl = `whatsapp://send?phone=${phone}`
    const mobileWebFallback = `https://api.whatsapp.com/send?phone=${phone}`

    // Attempt the native scheme first. If the OS hands focus to the
    // WhatsApp app within 1.2s, the page goes to the background and
    // the setTimeout callback fires harmlessly. Otherwise we land on
    // the mobile web client.
    window.location.href = nativeAppUrl
    setTimeout(() => {
      // `document.hidden` is a hint, not a guard — the OS doesn't
      // always flip it instantly when an external app takes focus,
      // so we let the timeout fire unconditionally and accept that
      // the worst case is a no-op navigation (the user is already
      // in WhatsApp by then).
      if (!document.hidden) {
        window.location.href = mobileWebFallback
      }
    }, 1200)
    return
  }

  // Desktop: WhatsApp Web in a new tab.
  window.open(webUrl, '_blank', 'noopener,noreferrer')
}
