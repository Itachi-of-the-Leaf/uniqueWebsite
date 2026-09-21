// AnimatedSelect — custom, themed, accessible replacement for the
// native <select> element. Renders a trigger button styled in the
// Unique Systems brand palette (Canary Gold accent + Midnight Navy
// dark / white light) plus a floating animated menu.
//
// Why a custom select?
//   The native <select> draws OS-level UI that we cannot theme:
//   dropdown items render in the OS's chrome, the option list is
//   not a child of our document, and the styling inheritance from
//   our Tailwind classes does not flow through. The custom select
//   here keeps full theme parity, animates smoothly, and stays
//   keyboard-accessible.
//
// Form binding:
//   • `value` + `onChange` mirror the React state contract of a
//     native <select>, so callers can plug this in without
//     reshaping their form state.
//   • A hidden <input type="hidden" name={name}> mirrors the
//     chosen value so existing form-submission handlers (which
//     read formData.get('subject')) continue to work unchanged.
//
// Props:
//   id          — DOM id for label association (required)
//   name        — hidden-input name (defaults to id)
//   value       — currently selected option value
//   onChange    — (value: string) => void
//   options     — [{ value, label }] (label shown in menu + trigger)
//   placeholder — text shown when no option is selected
//   error       — boolean; when true, the trigger gets a red ring
//   icon        — optional lucide icon component for the trigger's
//                 left slot; defaults to ListFilter
//   className   — extra classes for the outer wrapper
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check, ListFilter } from 'lucide-react'

export default function AnimatedSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error = false,
  icon: Icon = ListFilter,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Derive the displayed label directly during render instead of
  // mirroring it into state from a useEffect. This is a pure
  // projection of (value, options), so there's no reason to round-
  // trip it through state — and skipping the effect also silences
  // the react(set-state-in-effect) oxlint warning.
  const matchedOption = options.find((o) => o.value === value)
  const resolvedLabel = matchedOption ? matchedOption.label : ''

  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  // Close on outside click. `mousedown` (not click) so a click on
  // the trigger's own button doesn't immediately reopen after we
  // close — the trigger's own onClick handles that case.
  useEffect(() => {
    if (!isOpen) return
    const handleMouseDown = (event) => {
      const target = event.target
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return
      }
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isOpen])

  // Keyboard support: Escape closes; Enter / Space toggles when
  // the trigger itself is focused.
  const handleTriggerKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen((prev) => !prev)
    }
  }

  const handleMenuKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      triggerRef.current?.focus()
    }
  }

  const handleSelect = (optionValue) => {
    onChange?.(optionValue)
    setIsOpen(false)
    // Return focus to the trigger so subsequent keyboard nav
    // (e.g. Tab) continues from a sensible place.
    triggerRef.current?.focus()
  }

  const hasSelection = value !== '' && value != null

  // Trigger button styling. The gold ring + gold border show even
  // when the field is unfocused — that matches the brand language
  // (the language switcher pill in the navbar uses the same gold
  // accent). On error, the ring + border flip to brand red.
  const triggerBase =
    'group relative w-full min-h-[48px] inline-flex items-center gap-2.5 pl-10 pr-10 py-3 rounded-xl text-left text-base font-bold tracking-wide transition-all duration-200 focus:outline-none cursor-pointer select-none'
  const triggerTheme = error
    ? 'border-2 border-[#C41230] ring-2 ring-[#C41230]/20 bg-white dark:bg-[#071330] text-slate-900 dark:text-white'
    : 'border-2 border-[#FFD200] ring-2 ring-[#FFD200]/20 bg-white dark:bg-[#071330] text-slate-900 dark:text-white hover:ring-[#FFD200]/40 focus:ring-[#FFD200]/50 shadow-sm'
  const triggerText = hasSelection
    ? 'text-slate-900 dark:text-white'
    : 'text-slate-400 dark:text-slate-500'

  return (
    <div className={`relative ${className}`}>
      {/* Hidden input so the form-submission path keeps reading
          formData.get('subject') (or whatever `name` is set to). */}
      <input type="hidden" name={name || id} value={value ?? ''} />

      {/* Trigger button. type="button" is critical — without it,
          a click would submit the form. */}
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-menu`}
        aria-label={placeholder}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        className={`${triggerBase} ${triggerTheme}`}
      >
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFD200] pointer-events-none"
          aria-hidden="true"
        />
        <span className={`flex-1 truncate ${triggerText}`}>
          {hasSelection ? resolvedLabel : placeholder}
        </span>
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFD200] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Floating menu. Animated via Tailwind transition classes
          — opacity + translate. We always mount the element once
          `isOpen` has been true at least once, otherwise the
          entrance animation won't replay on reopens. */}
      {isOpen && (
        <ul
          ref={menuRef}
          id={`${id}-menu`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={id}
          onKeyDown={handleMenuKeyDown}
          className="absolute left-0 right-0 top-full mt-2 z-50 max-h-72 overflow-y-auto p-2 rounded-2xl border bg-white border-slate-200 shadow-xl dark:bg-[#0B1B4F] dark:border-white/15 dark:shadow-2xl backdrop-blur-xl animate-[fadeUp_180ms_ease-out]"
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-3 rounded-xl cursor-pointer text-sm font-semibold transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#FFD200]/15 text-[#103B9B] dark:text-[#FFD200]'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#103B9B] dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-[#FFD200]'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check
                    className="w-4 h-4 text-[#FFD200] shrink-0 ml-2"
                    aria-hidden="true"
                  />
                )}
              </li>
            )
          })}
        </ul>
      )}

      {/* Keyframes for the menu's entrance. Defined inline via
          <style> so we don't have to touch src/index.css for
          a single animation. Tailwind's `animate-[...]` arbitrary
          value references this name. */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(0.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
