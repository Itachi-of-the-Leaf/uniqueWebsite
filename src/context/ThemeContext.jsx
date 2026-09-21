import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

/**
 * ThemeContext
 * ────────────
 * Owns the user's theme preference for the Unique Systems site.
 *
 * Public API:
 *   theme       — the user's *stated* preference: 'system' | 'light' | 'dark'
 *   effective   — the *resolved* value used to drive the DOM:
 *                 'light' or 'dark'. When theme === 'system' this
 *                 tracks the OS preference via prefers-color-scheme
 *                 and updates live when the OS setting flips.
 *   setTheme(t) — set the preference ('light' | 'dark' | 'system').
 *                 Persists to localStorage and updates <html>.
 *
 * Why a separate "theme" vs "effective":
 *   The UI control needs to remember "I picked dark even though my
 *   OS is light" so the toggle reflects intent, not just the current
 *   resolved value. Without the split, an OS-flip on a user who
 *   explicitly chose dark would silently flip them back.
 *
 * Persistence key: 'uniquewebsite:theme' (kept short, namespaced,
 * survives reloads). Mirrors the inline bootstrap in index.html
 * that runs *before* React mounts so we never flash the wrong
 * canvas colour.
 */

const STORAGE_KEY = 'uniquewebsite:theme'
const VALID = new Set(['system', 'light', 'dark'])

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return VALID.has(v) ? v : 'system'
  } catch {
    return 'system' // localStorage blocked (privacy mode, sandbox)
  }
}

function systemPrefersDark() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyClass(resolved) {
  // Toggle the .dark class on <html> so the :root.dark CSS variable
  // overrides kick in. We touch the element directly rather than
  // driving it through React because the inline bootstrap already
  // did the same thing on first paint — keeping both paths here
  // means there's exactly one source of truth for the visual.
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Lazy-init: read storage synchronously on the first render so the
  // very first React render already has the correct effective value.
  const [theme, setThemeState] = useState(() => readStored())
  const [systemDark, setSystemDark] = useState(() => systemPrefersDark())

  // Keep the .dark class on <html> in sync with the resolved value
  // whenever either theme or the OS preference changes.
  const effective = useMemo(
    () => (theme === 'system' ? (systemDark ? 'dark' : 'light') : theme),
    [theme, systemDark],
  )

  useEffect(() => {
    applyClass(effective)
  }, [effective])

  // Live-track OS preference while theme === 'system'. Using the
  // addEventListener('change') API (vs. the deprecated
  // media.addListener) — supported by every browser shipped since
  // 2015 and by all evergreen WebViews.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setSystemDark(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Cross-tab sync: if the user has two tabs open and toggles in
  // one, the other reflects it immediately. Cheap to wire up and
  // prevents the "why did my preference reset" support ticket.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return
      if (VALID.has(e.newValue)) setThemeState(e.newValue)
      else if (e.newValue === null) setThemeState('system')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setTheme = useCallback((next) => {
    if (!VALID.has(next)) return
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore — preference won't survive reload but session works */
    }
  }, [])

  const value = useMemo(
    () => ({ theme, effective, setTheme }),
    [theme, effective, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>')
  }
  return ctx
}
