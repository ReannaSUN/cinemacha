import { useEffect, useState, type FormEvent } from 'react'
import showPoster from '../assets/photos/show-poster-full.png'
import { useI18n } from '../i18n/I18nProvider'
import { checkNickname, claimNickname } from '../lib/nameDb'

interface HeroProps {
  onStart: (name: string) => void
  onOpenBoard: () => void
  questionCount: number
  savedName?: string
}

export function Hero({ onStart, onOpenBoard, questionCount, savedName = '' }: HeroProps) {
  const { t } = useI18n()
  const [name, setName] = useState(savedName)
  const [hint, setHint] = useState('')
  const [taken, setTaken] = useState(false)

  const marquee = `${t('marquee')}　★　${t('marquee')}　★　`

  function validate(raw: string, opts?: { allowEmpty?: boolean }) {
    const result = checkNickname(raw)
    if (!result.ok) {
      if (result.reason === 'empty') {
        setTaken(false)
        if (!opts?.allowEmpty) setHint(t('nameEmpty'))
        else setHint('')
        return result
      }
      if (result.reason === 'too_long') {
        setTaken(false)
        setHint(t('nameTooLong'))
        return result
      }
      setTaken(true)
      setHint(t('nameTaken'))
      return result
    }
    setTaken(false)
    setHint('')
    return result
  }

  useEffect(() => {
    if (!name.trim()) {
      setTaken(false)
      setHint('')
      return
    }
    const id = window.setTimeout(() => {
      validate(name, { allowEmpty: true })
    }, 220)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, t])

  function submit(e: FormEvent) {
    e.preventDefault()
    const checked = validate(name)
    if (!checked.ok) return
    const claimed = claimNickname(checked.name)
    if (!claimed.ok) {
      setTaken(true)
      setHint(t('nameTaken'))
      return
    }
    setHint('')
    setTaken(false)
    onStart(claimed.name)
  }

  return (
    <section className="hero anim-rise" aria-labelledby="brand">
      <div className="hero-visual" aria-hidden="true">
        <img className="hero-poster" src={showPoster} alt="" />
      </div>

      <div className="marquee" aria-label={t('marquee')}>
        <div className="marquee-track">
          <span>{marquee}</span>
          <span aria-hidden="true">{marquee}</span>
        </div>
      </div>

      <p className="hero-kicker">{t('kicker')}</p>
      <h1 id="brand" className="hero-brand">
        {t('brand')}
      </h1>
      <p className="hero-headline">{t('headline')}</p>
      <p className="hero-sub">{t('sub', questionCount)}</p>

      <form className="name-form" onSubmit={submit} noValidate>
        <label className="name-label" htmlFor="player-name">
          {t('nameLabel')}
        </label>
        <input
          id="player-name"
          className={`name-input ${taken ? 'is-error' : ''}`}
          type="text"
          maxLength={12}
          placeholder={t('namePlaceholder')}
          value={name}
          autoComplete="nickname"
          aria-invalid={taken}
          aria-describedby={hint ? 'name-hint' : undefined}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            if (name.trim()) validate(name)
          }}
        />
        {hint ? (
          <p id="name-hint" className={`name-hint ${taken ? 'is-taken' : ''}`} role="alert">
            {hint}
          </p>
        ) : null}
        <div className="hero-cta hero-cta-row">
          <button type="submit" className="btn-primary" disabled={taken}>
            {t('start')}
          </button>
          <button type="button" className="btn-ghost" onClick={onOpenBoard}>
            {t('board')}
          </button>
        </div>
        <p className="hero-meta">{t('meta')}</p>
      </form>
    </section>
  )
}
