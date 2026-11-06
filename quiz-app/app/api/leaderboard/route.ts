import { sql } from '../../../src/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const rows = await sql<{
      id: string
      name: string
      score: number
      correct: number
      total: number
      percent: number
      best_streak: number
      rank_label: string
      created_at: string
    }>(
      `select s.id::text as id,
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
       limit 30`,
    )
    return Response.json(
      {
        ok: true,
        source: 'cloud',
        entries: rows.map((r) => ({
          id: r.id,
          name: r.name,
          score: r.score,
          correct: r.correct,
          total: r.total,
          percent: r.percent,
          bestStreak: r.best_streak,
          rank: r.rank_label,
          at: Date.parse(r.created_at) || Date.now(),
        })),
      },
      { headers: { 'cache-control': 'no-store' } },
    )
  } catch (error) {
    console.error('leaderboard GET failed', error instanceof Error ? error.message : 'error')
    return Response.json({ ok: false, error: 'leaderboard_failed' }, { status: 500 })
  }
}
