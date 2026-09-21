import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

/**
 * ThemeToggle
 * ───────────
 * Three-state segmented control: System / Light / Dark. Visually a
 * peer of the existing language pill in Navbar so it feels native
 * to the design system rather than a bolted-on widget.
 *
 * The `variant` prop switches between two surfaces:
 *   - 'navy' (default): matches the always-dark navbar pill. Used
 *     in the desktop nav. Active segment stays gold-on-navy.
 *   - 'plain': a lighter ring suited for mobile / utility bars.
 *
 * Each button is a 36-tap-target square (mobile: 40×40). Icons are
 * 14px so the segmented control stays compact even at desktop.
 */
export default function ThemeToggle({ variant = 'navy', className = '' }) {
  const { theme, setTheme } = useTheme()

  const options = [
    { value: 'system', label: 'System', Icon: Monitor, title: 'Match device theme' },
    { value: 'light',  label: 'Light',  Icon: Sun,     title: 'Light mode' },
    { value: 'dark',   label: 'Dark',   Icon: Moon,    title: 'Dark mode' },
  ]

  const shell =
    variant === 'navy'
      ? 'bg-[#07143D] border border-[#FFD200]/45 shadow-inner'
      : 'bg-white/90 dark:bg-slate-800/80 border border-slate-200 dark:border-white/15 shadow-inner'

  const idleBtn =
    variant === 'navy'
      ? 'text-white/80 hover:text-white hover:bg-white/10'
      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'

  const activeBtn =
    variant === 'navy'
      ? 'bg-[#FFD200] text-[#081438] shadow-sm'
      : 'bg-[#081438] dark:bg-[#FFD200] text-white dark:text-[#081438] shadow-sm'

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full ${shell} ${className}`}
      role="group"
      aria-label="Theme mode"
    >
      {options.map(({ value, label, Icon, title }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={`min-w-[36px] sm:min-w-[40px] min-h-[36px] sm:min-h-[40px] px-2 sm:px-2.5 rounded-full inline-flex items-center justify-center gap-1 text-[11px] font-bold transition-all duration-200 cursor-pointer ${
              active ? activeBtn : idleBtn
            }`}
            aria-pressed={active}
            aria-label={label}
            title={title}
          >
            <Icon className="w-3.5 h-3.5" />
            {/* Compact text label is hidden on very narrow viewports
                where the icon alone is enough to convey state. */}
            <span className="hidden lg:inline uppercase tracking-wider">{value === 'system' ? 'Auto' : value}</span>
          </button>
        )
      })}
    </div>
  )
}
