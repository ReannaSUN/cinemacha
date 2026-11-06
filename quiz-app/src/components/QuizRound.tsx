import { useEffect, useRef, useState } from 'react'
import memeFace from '../assets/photos/meme-face.png'
import type { Question } from '../data/questions'
import { useI18n } from '../i18n/I18nProvider'
import { localizeQuestion } from '../i18n/questionLocale'
import { assetUrl } from '../lib/assetUrl'
import { SECONDS_PER_Q, pointsForAnswer } from '../lib/scoring'

export interface RoundStats {
  score: number
  correct: number
  bestStreak: number
  answers: boolean[]
}

interface QuizRoundProps {
  questions: Question[]
  onFinish: (stats: RoundStats) => void
  onHome: () => void
  onRestart: () => void
}

export function QuizRound({ questions, onFinish, onHome, onRestart }: QuizRoundProps) {
  const { t, locale } = useI18n()
  const [index, setIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_Q)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'ok' | 'bad' | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [gainFlash, setGainFlash] = useState<number | null>(null)
  const answersRef = useRef<boolean[]>([])
  const lockingRef = useRef(false)

  const q = questions[index]
  const loc = localizeQuestion(q, locale)
  const progress = ((index + 1) / questions.length) * 100

  useEffect(() => {
    if (selected !== null) return undefined
    if (secondsLeft <= 0) {
      resolveAnswer(null)
      return undefined
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, selected, index])

  function resolveAnswer(choice: number | null) {
    if (lockingRef.current) return
    lockingRef.current = true

    const ok = choice !== null && choice === q.answerIndex
    const nextStreak = ok ? streak + 1 : 0
    const gained = pointsForAnswer(ok, Math.max(secondsLeft, 0), nextStreak)
    const nextScore = score + gained
    const nextCorrect = correctCount + (ok ? 1 : 0)
    const nextBest = Math.max(bestStreak, nextStreak)

    answersRef.current = [...answersRef.current, ok]
    setSelected(choice ?? -1)
    setFeedback(ok ? 'ok' : 'bad')
    setScore(nextScore)
    setStreak(nextStreak)
    setBestStreak(nextBest)
    setCorrectCount(nextCorrect)
    setGainFlash(ok ? gained : null)

    window.setTimeout(() => {
      lockingRef.current = false
      setGainFlash(null)
      if (index + 1 >= questions.length) {
        onFinish({
          score: nextScore,
          correct: nextCorrect,
          bestStreak: nextBest,
          answers: answersRef.current,
        })
        return
      }
      setIndex((i) => i + 1)
      setSecondsLeft(SECONDS_PER_Q)
      setSelected(null)
      setFeedback(null)
    }, 900)
  }

  return (
    <section
      className={`quiz anim-rise ${feedback === 'bad' ? 'is-shake' : ''} ${feedback === 'ok' ? 'is-ok' : ''}`}
      aria-live="polite"
    >
      <header className="quiz-top">
        <div className="quiz-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-stats">
          <span>
            {index + 1}/{questions.length}
          </span>
          <span className="quiz-score">
            {t('score')} {score}
          </span>
          <span className={`quiz-timer ${secondsLeft <= 3 ? 'is-urgent' : ''}`}>{secondsLeft}s</span>
        </div>
        <div className="quiz-tags">
          <span>{loc.levelLabel}</span>
          <span>{loc.themeLabel}</span>
          {streak > 1 ? (
            <span className="streak">
              {t('streak')} ×{streak}
            </span>
          ) : null}
        </div>
      </header>

      {feedback === 'ok' ? <img className="quiz-react" src={assetUrl(memeFace)} alt="" /> : null}
      {feedback === 'ok' && gainFlash != null ? (
        <div className="quiz-burst">+{gainFlash}</div>
      ) : null}
      {feedback === 'bad' ? <div className="quiz-burst is-bad">{t('wrongBurst')}</div> : null}

      <h2 className="quiz-prompt">{loc.prompt}</h2>

      <div className="quiz-options" role="list">
        {loc.options.map((opt, i) => {
          let state = ''
          if (selected !== null) {
            if (i === q.answerIndex) state = 'is-correct'
            else if (i === selected) state = 'is-wrong'
          }
          return (
            <button
              key={`${q.id}-${i}`}
              type="button"
              className={`opt ${state}`}
              disabled={selected !== null}
              onClick={() => resolveAnswer(i)}
            >
              <span className="opt-key">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {feedback && loc.explain ? (
        <p className={`quiz-explain ${feedback === 'ok' ? 'is-ok' : 'is-bad'}`}>
          {feedback === 'ok' ? t('correctBurst') : t('wrongBurst')} {loc.explain}
        </p>
      ) : null}

      <div className="quiz-nav">
        <button type="button" className="btn-ghost quiz-nav-btn" onClick={onHome}>
          {t('backHome')}
        </button>
        <button type="button" className="btn-ghost quiz-nav-btn" onClick={onRestart}>
          {t('restart')}
        </button>
      </div>
    </section>
  )
}
