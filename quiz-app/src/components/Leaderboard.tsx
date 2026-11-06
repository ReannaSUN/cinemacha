import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { fetchLeaderboardAsync, type LeaderboardEntry } from '../lib/leaderboard'

interface LeaderboardProps {
  highlightId?: string
  onBack: () => void
  onPlay: () => void
}

export function Leaderboard({ highlightId, onBack, onPlay }: LeaderboardProps) {
  const { t } = useI18n()
  const [rows, setRows] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    void fetchLeaderboardAsync().then((list) => {
      if (!alive) return
      setRows(list)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [highlightId])

  return (
    <section className="board anim-rise" aria-labelledby="board-title">
      <p className="board-kicker">{t('boardKicker')}</p>
      <h2 id="board-title" className="board-title">
        {t('boardTitle')}
      </h2>
      <p className="board-sub">{t('boardSub')}</p>

      {loading ? (
        <p className="board-empty">{t('boardLoading')}</p>
      ) : rows.length === 0 ? (
        <p className="board-empty">{t('boardEmpty')}</p>
      ) : (
        <ol className="board-list">
          {rows.map((row, i) => (
            <li
              key={row.id}
              className={`board-row ${row.id === highlightId ? 'is-me' : ''} ${i < 3 ? 'is-top' : ''}`}
            >
              <span className="board-rank">#{i + 1}</span>
              <span className="board-name">{row.name}</span>
              <span className="board-score">
                {row.score}
                {t('points')} · {row.percent}%
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="result-actions">
        <button type="button" className="btn-primary" onClick={onPlay}>
          {t('challengeMe')}
        </button>
        <button type="button" className="btn-ghost" onClick={onBack}>
          {t('home')}
        </button>
      </div>
    </section>
  )
}
