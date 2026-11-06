import { apiFetchLeaderboard, apiSubmitScore } from './api'

export interface LeaderboardEntry {
  id: string
  name: string
  /** Local-only ownership hint; never sourced from public cloud APIs. */
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

function writeRaw(list: LeaderboardEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)))
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
  writeRaw(list)
  return list
}

export async function fetchLeaderboardAsync(): Promise<LeaderboardEntry[]> {
  const remote = await apiFetchLeaderboard()
  if (remote) {
    writeRaw(remote)
    return remote
  }
  return getLeaderboard()
}

export async function submitScoreAsync(
  entry: Omit<LeaderboardEntry, 'id' | 'at'>,
): Promise<{ list: LeaderboardEntry[]; entryId: string | null }> {
  const remote = await apiSubmitScore(entry)
  if (remote) {
    writeRaw(remote.entries)
    return { list: remote.entries, entryId: remote.entryId ?? null }
  }
  const list = submitScore(entry)
  return { list, entryId: list[0]?.id ?? null }
}
