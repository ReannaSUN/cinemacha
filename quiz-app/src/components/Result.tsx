import { useEffect, useMemo, useRef, useState } from 'react'
import bokTau from '../assets/photos/bok-tau.png'
import memeFace from '../assets/photos/meme-face.png'
import { useI18n } from '../i18n/I18nProvider'
import { downloadBlob, generateBadgeBlob } from '../lib/badge'
import { submitScore } from '../lib/leaderboard'
import { getPlayerId } from '../lib/nameDb'
import {
  buildShareText,
  maxScoreEstimate,
  rankLabel,
} from '../lib/scoring'
import {
  copyText,
  quizShareUrl,
  shareViaPlatform,
  type SocialTarget,
} from '../lib/shareSocial'
import type { RoundStats } from './QuizRound'

interface ResultProps {
  name: string
  stats: RoundStats
  total: number
  onRetry: () => void
  onHome: () => void
  onOpenBoard: (entryId: string) => void
}

export function Result({ name, stats, total, onRetry, onHome, onOpenBoard }: ResultProps) {
  const { t, locale } = useI18n()
  const [copied, setCopied] = useState(false)
  const [badgeUrl, setBadgeUrl] = useState<string | null>(null)
  const [badgeBusy, setBadgeBusy] = useState(false)
  const [badgeError, setBadgeError] = useState('')
  const [shareNote, setShareNote] = useState('')
  const [entryId, setEntryId] = useState<string | null>(null)
  const badgeBlobRef = useRef<Blob | null>(null)

  const percent = Math.round((stats.correct / total) * 100)
  const rank = useMemo(
    () => rankLabel(stats.score, maxScoreEstimate(total)),
    [stats.score, total],
  )
  const shareText = useMemo(
    () =>
      buildShareText(name, stats.score, stats.correct, total, stats.bestStreak, rank, percent, locale),
    [name, stats, total, rank, percent, locale],
  )
  const happy = stats.correct >= total / 2

  useEffect(() => {
    const list = submitScore({
      name,
      playerId: getPlayerId(),
      score: stats.score,
      correct: stats.correct,
      total,
      percent,
      bestStreak: stats.bestStreak,
      rank,
    })
    const mine = list.find(
      (e) =>
        e.name === name &&
        e.score === stats.score &&
        e.correct === stats.correct &&
        e.percent === percent,
    )
    setEntryId(mine?.id ?? null)
  }, [name, stats, total, percent, rank])

  useEffect(() => {
    return () => {
      if (badgeUrl) URL.revokeObjectURL(badgeUrl)
    }
  }, [badgeUrl])

  function flashNote(msg: string) {
    setShareNote(msg)
    window.setTimeout(() => setShareNote(''), 3500)
  }

  async function ensureBadgeBlob(): Promise<Blob> {
    if (badgeBlobRef.current) return badgeBlobRef.current
    const blob = await generateBadgeBlob({
      name,
      percent,
      score: stats.score,
      correct: stats.correct,
      total,
      rank,
      locale,
      brand: t('brand'),
      youLine: t('percentLine', percent),
    })
    badgeBlobRef.current = blob
    if (badgeUrl) URL.revokeObjectURL(badgeUrl)
    setBadgeUrl(URL.createObjectURL(blob))
    return blob
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: t('brand'), text: shareText, url: quizShareUrl() })
        return
      }
    } catch {
      // clipboard
    }
    const ok = await copyText(shareText)
    if (ok) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  async function makeBadge() {
    setBadgeBusy(true)
    setBadgeError('')
    try {
      const blob = await ensureBadgeBlob()
      downloadBlob(blob, `quiz-${name}-${percent}.png`)
    } catch {
      setBadgeError(t('badgeFail'))
    } finally {
      setBadgeBusy(false)
    }
  }

  async function shareTo(target: SocialTarget) {
    setBadgeBusy(true)
    setBadgeError('')
    setShareNote('')
    try {
      const blob = await ensureBadgeBlob()
      const file = new File([blob], `chachafai-badge-${percent}.png`, { type: 'image/png' })
      const result = await shareViaPlatform({
        target,
        title: t('brand'),
        text: shareText,
        url: quizShareUrl(),
        file,
        download: downloadBlob,
      })
      if (result === 'opened') {
        flashNote(target === 'instagram' ? t('shareIgHint') : t('shareOpened'))
      }
    } catch {
      setBadgeError(t('badgeFail'))
    } finally {
      setBadgeBusy(false)
    }
  }

  const socials: { id: SocialTarget; label: string; className: string }[] = [
    { id: 'threads', label: t('shareThreads'), className: 'share-soc-threads' },
    { id: 'instagram', label: t('shareInstagram'), className: 'share-soc-ig' },
    { id: 'facebook', label: t('shareFacebook'), className: 'share-soc-fb' },
    { id: 'whatsapp', label: t('shareWhatsApp'), className: 'share-soc-wa' },
  ]

  return (
    <section className="result anim-rise" aria-labelledby="result-title">
      <img className="result-photo" src={happy ? memeFace : bokTau} alt="" />
      <p className="result-kicker">
        {name} · {happy ? t('resultHappy') : t('resultRetryMood')}
      </p>
      <h2 id="result-title" className="result-title">
        {rank}
      </h2>
      <p className="result-score">
        <span className="result-num">{stats.score}</span>
        <span className="result-unit">{t('points')}</span>
      </p>
      <p className="result-percent-line">{t('percentLine', percent)}</p>
      <ul className="result-grid">
        <li>
          <strong>
            {stats.correct}/{total}
          </strong>
          <span>{t('answered')}</span>
        </li>
        <li>
          <strong>×{stats.bestStreak}</strong>
          <span>{t('bestStreak')}</span>
        </li>
        <li>
          <strong>{percent}%</strong>
          <span>{t('accuracy')}</span>
        </li>
      </ul>

      <pre className="share-preview">{shareText}</pre>

      {badgeUrl ? (
        <img className="badge-preview" src={badgeUrl} alt={t('percentLine', percent)} />
      ) : null}
      {badgeError ? <p className="name-hint">{badgeError}</p> : null}

      <div className="share-social" aria-label={t('shareBadgeTitle')}>
        <p className="share-social-title">{t('shareBadgeTitle')}</p>
        <p className="share-social-hint">{t('shareBadgeHint')}</p>
        <div className="share-social-grid">
          {socials.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`share-soc-btn ${s.className}`}
              disabled={badgeBusy}
              onClick={() => void shareTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        {shareNote ? <p className="share-social-note">{shareNote}</p> : null}
      </div>

      <div className="result-actions">
        <button type="button" className="btn-primary" onClick={makeBadge} disabled={badgeBusy}>
          {badgeBusy ? t('makingBadge') : t('makeBadge')}
        </button>
        <button type="button" className="btn-ghost" onClick={share}>
          {copied ? t('copied') : t('shareText')}
        </button>
        <button type="button" className="btn-ghost" onClick={() => onOpenBoard(entryId ?? '')}>
          {t('viewBoard')}
        </button>
        <button type="button" className="btn-ghost" onClick={onRetry}>
          {t('playAgain')}
        </button>
        <button type="button" className="btn-ghost" onClick={onHome}>
          {t('home')}
        </button>
      </div>
    </section>
  )
}
