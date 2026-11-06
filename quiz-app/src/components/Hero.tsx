import { useEffect, useState, type FormEvent } from 'react'
import showPoster from '../assets/photos/show-poster-full.png'
import { useI18n } from '../i18n/I18nProvider'
import { assetUrl } from '../lib/assetUrl'
import { checkNicknameAsync, claimNicknameAsync, checkNicknameLocal } from '../lib/nameDb'

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
  const [busy, setBusy] = useState(false)

  const marquee = `${t('marquee')}　★　${t('marquee')}　★　`

  function applyResult(
    result: Awaited<ReturnType<typeof checkNicknameAsync>>,
    opts?: { allowEmpty?: boolean },
  ) {
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
      void (async () => {
        const local = checkNicknameLocal(name)
        applyResult(local, { allowEmpty: true })
        const remote = await checkNicknameAsync(name)
        applyResult(remote, { allowEmpty: true })
      })()
    }, 220)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, t])

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    try {
      const checked = await checkNicknameAsync(name)
      applyResult(checked)
      if (!checked.ok) return
      const claimed = await claimNicknameAsync(checked.name)
      applyResult(claimed)
      if (!claimed.ok) return
      onStart(claimed.name)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="hero anim-rise" aria-labelledby="brand">
      <div className="hero-visual" aria-hidden="true">
        <img className="hero-poster" src={assetUrl(showPoster)} alt="" />
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

      <form className="name-form" onSubmit={(e) => void submit(e)} noValidate>
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
            if (name.trim()) void checkNicknameAsync(name).then((r) => applyResult(r))
          }}
        />
        {hint ? (
          <p id="name-hint" className={`name-hint ${taken ? 'is-taken' : ''}`} role="alert">
            {hint}
          </p>
        ) : null}
        <div className="hero-cta hero-cta-row">
          <button type="submit" className="btn-primary" disabled={taken || busy}>
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
