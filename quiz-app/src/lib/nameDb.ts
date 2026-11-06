/**
 * Nickname registry — unique nicknames bound to playerId.
 * Prefers cloud API when available; falls back to localStorage.
 */

import { apiCheckNickname, apiClaimNickname } from './api'
import { getLeaderboard } from './leaderboard'

const PLAYERS_KEY = 'zjh-players-db'
const PLAYER_ID_KEY = 'zjh-player-id'

export interface PlayerRow {
  name: string
  nameKey: string
  playerId: string
  createdAt: number
}

function normalize(name: string): string {
  return name.trim().replace(/\s+/g, ' ').toLocaleLowerCase()
}

function readPlayers(): PlayerRow[] {
  try {
    const raw = localStorage.getItem(PLAYERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as PlayerRow[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writePlayers(rows: PlayerRow[]) {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(rows))
}

export function getPlayerId(): string {
  let id = localStorage.getItem(PLAYER_ID_KEY)
  if (!id) {
    id = `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
    localStorage.setItem(PLAYER_ID_KEY, id)
  }
  return id
}

export type NameCheck =
  | { ok: true; name: string }
  | { ok: false; reason: 'empty' | 'too_long' | 'taken' }

function takenKeysByOthers(me: string): Set<string> {
  const taken = new Set<string>()
  for (const p of readPlayers()) {
    if (p.playerId !== me) taken.add(p.nameKey)
  }
  for (const row of getLeaderboard()) {
    const key = normalize(row.name)
    if (!key) continue
    const owner = row.playerId
    if (owner && owner !== me) taken.add(key)
  }
  return taken
}

export function checkNicknameLocal(raw: string): NameCheck {
  const name = raw.trim().replace(/\s+/g, ' ')
  if (!name) return { ok: false, reason: 'empty' }
  if ([...name].length > 12) return { ok: false, reason: 'too_long' }

  const key = normalize(name)
  const me = getPlayerId()
  if (takenKeysByOthers(me).has(key)) return { ok: false, reason: 'taken' }

  const hit = readPlayers().find((p) => p.nameKey === key)
  if (hit && hit.playerId !== me) return { ok: false, reason: 'taken' }

  return { ok: true, name }
}

/** Live / submit check. Cloud first, then local. */
export function checkNickname(raw: string): NameCheck {
  return checkNicknameLocal(raw)
}

export async function checkNicknameAsync(raw: string): Promise<NameCheck> {
  const local = checkNicknameLocal(raw)
  if (!local.ok && local.reason !== 'taken') return local
  const remote = await apiCheckNickname(raw)
  if (remote) return remote
  return local
}

export function claimNicknameLocal(raw: string): NameCheck {
  const checked = checkNicknameLocal(raw)
  if (!checked.ok) return checked

  const me = getPlayerId()
  const key = normalize(checked.name)
  const rows = readPlayers().filter((p) => p.playerId !== me && p.nameKey !== key)
  if (rows.some((p) => p.nameKey === key)) return { ok: false, reason: 'taken' }

  rows.push({
    name: checked.name,
    nameKey: key,
    playerId: me,
    createdAt: Date.now(),
  })
  writePlayers(rows)
  return checked
}

export function claimNickname(raw: string): NameCheck {
  return claimNicknameLocal(raw)
}

export async function claimNicknameAsync(raw: string): Promise<NameCheck> {
  const remote = await apiClaimNickname(raw)
  if (remote) {
    if (remote.ok) claimNicknameLocal(remote.name)
    return remote
  }
  return claimNicknameLocal(raw)
}

export function listClaimedNames(): string[] {
  return readPlayers().map((p) => p.name)
}
