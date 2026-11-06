import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ui, type UiKey } from './ui'
import { LOCALE_KEY, type Locale } from './types'

type TFn = {
  (key: Exclude<UiKey, 'sub' | 'percentLine'>): string
  (key: 'sub', n: number): string
  (key: 'percentLine', p: number): string
}

interface I18nValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: TFn
}

const I18nContext = createContext<I18nValue | null>(null)

function readLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-Hant'
  const saved = localStorage.getItem(LOCALE_KEY)
  if (saved === 'zh-Hant' || saved === 'zh-Hans' || saved === 'en' || saved === 'ja') return saved
  return 'zh-Hant'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-Hant')

  useEffect(() => {
    setLocaleState(readLocale())
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem(LOCALE_KEY, l)
    document.documentElement.lang = l === 'zh-Hans' ? 'zh-CN' : l === 'zh-Hant' ? 'zh-HK' : l
  }

  const value = useMemo<I18nValue>(() => {
    const pack = ui(locale)
    const t = ((key: UiKey, arg?: number) => {
      const v = pack[key]
      if (typeof v === 'function') return (v as (n: number) => string)(arg ?? 0)
      return v
    }) as TFn
    return { locale, setLocale, t }
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n outside provider')
  return ctx
}
