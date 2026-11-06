export interface LeaderboardEntry {
  id: string
  name: string
  playerId?: string
  score: number
  correct: number
  total: number
  percent: number
  bestStreak: number
  rank: string
  at: number
}

const KEY = 'wui-mei-suk-man-leaderboard'
const MAX = 30

function readRaw(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as LeaderboardEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getLeaderboard(): LeaderboardEntry[] {
  return readRaw().sort((a, b) => b.score - a.score || b.percent - a.percent || a.at - b.at)
}

export function submitScore(entry: Omit<LeaderboardEntry, 'id' | 'at'>): LeaderboardEntry[] {
  const next: LeaderboardEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: Date.now(),
  }
  const list = [...readRaw(), next]
    .sort((a, b) => b.score - a.score || b.percent - a.percent || a.at - b.at)
    .slice(0, MAX)
  localStorage.setItem(KEY, JSON.stringify(list))
  return list
}
