import type { Locale } from './types'

type Converter = (text: string) => string
let hansConverter: Converter | null = null
let hansLoading: Promise<Converter> | null = null

async function getHansConverter(): Promise<Converter> {
  if (hansConverter) return hansConverter
  if (!hansLoading) {
    hansLoading = import('opencc-js').then((OpenCC) => {
      hansConverter = OpenCC.Converter({ from: 'hk', to: 'cn' })
      return hansConverter
    })
  }
  return hansLoading
}

/** Sync path: if converter ready use it; else return traditional until loaded. */
export function localizeQuizText(text: string, locale: Locale): string {
  if (locale !== 'zh-Hans') return text
  if (hansConverter) return hansConverter(text)
  void getHansConverter()
  return text
}

export function localizeQuizOptions(options: string[], locale: Locale): string[] {
  return options.map((o) => localizeQuizText(o, locale))
}

/** Prefetch OpenCC when user switches to简体. */
export function prefetchHans() {
  void getHansConverter()
}
