/** Public leaderboard row — never includes player tokens. */
export type PublicBoardEntry = {
  id: string
  name: string
  score: number
  correct: number
  total: number
  percent: number
  bestStreak: number
  rank: string
  at: number
}

export const PUBLIC_BOARD_SQL = `
  select s.id::text as id,
         p.name,
         s.score,
         s.correct,
         s.total,
         s.percent,
         s.best_streak,
         s.rank_label,
         s.created_at::text as created_at
  from scores s
  join players p on p.id = s.player_id
  order by s.score desc, s.percent desc, s.created_at asc
  limit 30
`

export type PublicBoardRow = {
  id: string
  name: string
  score: number
  correct: number
  total: number
  percent: number
  best_streak: number
  rank_label: string
  created_at: string
}

export function toPublicEntry(r: PublicBoardRow): PublicBoardEntry {
  return {
    id: r.id,
    name: r.name,
    score: r.score,
    correct: r.correct,
    total: r.total,
    percent: r.percent,
    bestStreak: r.best_streak,
    rank: r.rank_label,
    at: Date.parse(r.created_at) || Date.now(),
  }
}
