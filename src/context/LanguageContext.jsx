import { createContext, useContext, useState, useEffect } from 'react'
import translations from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('uniquesystems_lang')
      if (saved === 'en' || saved === 'mr') return saved
    }
    // Default to Marathi for grassroots regional context, or English
    return 'mr'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('uniquesystems_lang', language)
      document.documentElement.lang = language === 'mr' ? 'mr' : 'en'
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'))
  }

  const t = (path) => {
    const keys = path.split('.')
    let current = translations[language]
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to English if missing in Marathi
        let fallback = translations['en']
        for (const fKey of keys) {
          if (!fallback || fallback[fKey] === undefined) return path
          fallback = fallback[fKey]
        }
        return fallback
      }
      current = current[key]
    }
    return current
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
