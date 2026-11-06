import { useMemo, useState } from 'react'
import { Hero } from './components/Hero'
import { LangSwitch } from './components/LangSwitch'
import { Leaderboard } from './components/Leaderboard'
import { LegoDecor } from './components/LegoDecor'
import { QuizRound, type RoundStats } from './components/QuizRound'
import { Result } from './components/Result'
import { QUESTIONS, pickRound } from './data/questions'
import { useI18n } from './i18n/I18nProvider'
import { ROUND_SIZE } from './lib/scoring'
import './styles/app.css'

type Screen = 'home' | 'play' | 'result' | 'board'

const NAME_KEY = 'wui-mei-player-name'

export default function App() {
  const { t } = useI18n()
  const [screen, setScreen] = useState<Screen>('home')
  const [seed, setSeed] = useState(0)
  const [stats, setStats] = useState<RoundStats | null>(null)
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) ?? '')
  const [highlightId, setHighlightId] = useState<string | undefined>()

  const round = useMemo(() => pickRound(ROUND_SIZE), [seed])

  function start(nextName: string) {
    const trimmed = nextName.trim()
    setName(trimmed)
    localStorage.setItem(NAME_KEY, trimmed)
    setStats(null)
    setSeed((s) => s + 1)
    setScreen('play')
  }

  function finish(next: RoundStats) {
    setStats(next)
    setScreen('result')
  }

  return (
    <div className="app-shell">
      <LegoDecor />
      <LangSwitch />
      {screen === 'home' ? (
        <Hero
          onStart={start}
          onOpenBoard={() => {
            setHighlightId(undefined)
            setScreen('board')
          }}
          questionCount={QUESTIONS.length}
          savedName={name}
        />
      ) : null}
      {screen === 'play' ? (
        <QuizRound
          key={seed}
          questions={round}
          onFinish={finish}
          onHome={() => {
            setStats(null)
            setScreen('home')
          }}
          onRestart={() => start(name)}
        />
      ) : null}
      {screen === 'result' && stats ? (
        <Result
          name={name}
          stats={stats}
          total={round.length}
          onRetry={() => start(name)}
          onHome={() => setScreen('home')}
          onOpenBoard={(id) => {
            setHighlightId(id || undefined)
            setScreen('board')
          }}
        />
      ) : null}
      {screen === 'board' ? (
        <Leaderboard
          highlightId={highlightId}
          onBack={() => setScreen('home')}
          onPlay={() => setScreen('home')}
        />
      ) : null}
      <footer className="site-foot">
        <span>{t('foot1')}</span>
        <span>{t('foot2')}</span>
      </footer>
    </div>
  )
}
