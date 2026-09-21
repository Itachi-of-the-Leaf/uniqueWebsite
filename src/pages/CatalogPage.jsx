import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { ArrowLeft, Package } from 'lucide-react'

const KNOWN = new Set([
  'interactive-panels',
  'projectors',
  'desktops',
  'laptops',
  'printers',
  'ups-systems',
  'accessories',
])

function pretty(id) {
  return (id || '')
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

export default function CatalogPage() {
  const { categoryId = '' } = useParams()
  const { t } = useLanguage()
  const title = pretty(categoryId)
  const known = KNOWN.has(categoryId)

  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy dark:text-[#FFD200] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('catalog.back') ?? '← Back to Portfolio'}
        </Link>

        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B4F] dark:text-white tracking-tight">
          {title || 'Catalog'}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          {known
            ? t('catalog.soon') ?? 'Product cards for this category are coming soon.'
            : t('catalog.unknown') ?? 'Unknown category — showing a placeholder layout.'}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-[#0B1B4F]/40 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-navy/5 dark:bg-white/10 text-brand-navy dark:text-[#FFD200] flex items-center justify-center mb-4">
                <Package className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B4F] dark:text-white mb-2">
                {title} {i + 1}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Placeholder card — replace with real product data.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
