import type { Question } from '../data/questions'
import { LEVEL_LABEL, THEME_LABEL } from '../data/questions'
import { Q_I18N } from '../data/qI18n'
import { Q_HANS } from '../data/qHans'
import type { Locale } from './types'

const LEVEL_I18N: Record<Locale, Record<string, string>> = {
  'zh-Hant': LEVEL_LABEL,
  'zh-Hans': { easy: '初级', medium: '中级', hard: '高级' },
  en: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
  ja: { easy: '初級', medium: '中級', hard: '上級' },
}

const THEME_I18N: Record<Locale, Record<string, string>> = {
  'zh-Hant': THEME_LABEL,
  'zh-Hans': {
    film: '电影',
    tv: '剧集',
    quote: '金句',
    show: '综艺',
    meme: '梗图',
    song: '氛围',
  },
  en: {
    film: 'Film',
    tv: 'TV',
    quote: 'Quote',
    show: 'Show',
    meme: 'Meme',
    song: 'Song',
  },
  ja: {
    film: '映画',
    tv: 'ドラマ',
    quote: '名台詞',
    show: 'ショー',
    meme: 'ネタ',
    song: '雰囲気',
  },
}

export interface LocalizedQuestion {
  prompt: string
  options: string[]
  explain?: string
  levelLabel: string
  themeLabel: string
}

export function localizeQuestion(q: Question, locale: Locale): LocalizedQuestion {
  const levelLabel = LEVEL_I18N[locale][q.level] ?? q.level
  const themeLabel = THEME_I18N[locale][q.theme] ?? q.theme

  if (locale === 'zh-Hant') {
    return {
      prompt: q.prompt,
      options: q.options,
      explain: q.explain,
      levelLabel,
      themeLabel,
    }
  }

  if (locale === 'zh-Hans') {
    const pack = Q_HANS[q.id]
    if (pack) {
      return {
        prompt: pack.prompt,
        options: pack.options.length === q.options.length ? pack.options : q.options,
        explain: pack.explain ?? q.explain,
        levelLabel,
        themeLabel,
      }
    }
  }

  const pack = Q_I18N[q.id]?.[locale as 'en' | 'ja']
  if (pack) {
    return {
      prompt: pack.prompt,
      options: pack.options.length === q.options.length ? pack.options : q.options,
      explain: pack.explain ?? q.explain,
      levelLabel,
      themeLabel,
    }
  }

  // Fallback: keep Chinese content if translation missing
  return {
    prompt: q.prompt,
    options: q.options,
    explain: q.explain,
    levelLabel,
    themeLabel,
  }
}
