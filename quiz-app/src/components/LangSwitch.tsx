import { useI18n } from '../i18n/I18nProvider'
import { LOCALES } from '../i18n/types'

export function LangSwitch() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div className="lang-switch" role="group" aria-label={t('lang')}>
      {LOCALES.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`lang-btn ${locale === item.id ? 'is-active' : ''}`}
          onClick={() => setLocale(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
