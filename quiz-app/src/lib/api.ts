import type { LeaderboardEntry } from './leaderboard'
import type { NameCheck } from './nameDb'
import { getPlayerId } from './nameDb'

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(input, {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(init?.headers ?? {}),
      },
    })
    if (!res.ok && res.status !== 409) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function apiCheckNickname(raw: string): Promise<NameCheck | null> {
  const name = raw.trim().replace(/\s+/g, ' ')
  if (!name) return { ok: false, reason: 'empty' }
  if ([...name].length > 12) return { ok: false, reason: 'too_long' }
  const token = encodeURIComponent(getPlayerId())
  const q = encodeURIComponent(name)
  const data = await fetchJson<{
    ok: boolean
    reason?: string
    name?: string
    available?: boolean
  }>(`/api/players/check?name=${q}&playerToken=${token}`)
  if (!data) return null
  if (data.ok) return { ok: true, name: data.name ?? name }
  if (data.reason === 'taken' || data.reason === 'too_long' || data.reason === 'empty') {
    return { ok: false, reason: data.reason }
  }
  return null
}

export async function apiClaimNickname(raw: string): Promise<NameCheck | null> {
  const name = raw.trim().replace(/\s+/g, ' ')
  const data = await fetchJson<{ ok: boolean; reason?: string; name?: string }>(
    '/api/players/claim',
    {
      method: 'POST',
      body: JSON.stringify({ name, playerToken: getPlayerId() }),
    },
  )
  if (!data) return null
  if (data.ok) return { ok: true, name: data.name ?? name }
  if (data.reason === 'taken' || data.reason === 'too_long' || data.reason === 'empty') {
    return { ok: false, reason: data.reason }
  }
  return null
}

export async function apiFetchLeaderboard(): Promise<LeaderboardEntry[] | null> {
  const data = await fetchJson<{ ok: boolean; entries?: LeaderboardEntry[] }>('/api/leaderboard')
  if (!data?.ok || !Array.isArray(data.entries)) return null
  return data.entries
}

export async function apiSubmitScore(
  entry: Omit<LeaderboardEntry, 'id' | 'at'>,
): Promise<{ entries: LeaderboardEntry[]; entryId?: string } | null> {
  const data = await fetchJson<{
    ok: boolean
    entries?: LeaderboardEntry[]
    entryId?: string
    reason?: string
  }>('/api/scores', {
    method: 'POST',
    body: JSON.stringify({
      name: entry.name,
      playerToken: getPlayerId(),
      score: entry.score,
      correct: entry.correct,
      total: entry.total,
      percent: entry.percent,
      bestStreak: entry.bestStreak,
      rank: entry.rank,
    }),
  })
  if (!data?.ok || !Array.isArray(data.entries)) return null
  return { entries: data.entries, entryId: data.entryId }
}
