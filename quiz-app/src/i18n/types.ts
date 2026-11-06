export type Locale = 'zh-Hant' | 'zh-Hans' | 'en' | 'ja'

export const LOCALES: { id: Locale; label: string }[] = [
  { id: 'zh-Hant', label: '繁中' },
  { id: 'zh-Hans', label: '简中' },
  { id: 'en', label: 'EN' },
  { id: 'ja', label: '日本語' },
]

export const LOCALE_KEY = 'zjh-quiz-locale'
