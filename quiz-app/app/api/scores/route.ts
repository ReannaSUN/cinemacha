import { normalizeNameKey, sql } from '../../../src/lib/db'
import { PUBLIC_BOARD_SQL, toPublicEntry, type PublicBoardRow } from '../../../src/lib/publicBoard'

export const dynamic = 'force-dynamic'

type ScoreBody = {
  name?: string
  playerToken?: string
  score?: number
  correct?: number
  total?: number
  percent?: number
  bestStreak?: number
  rank?: string
}

export async function POST(request: Request) {
  let body: ScoreBody
  try {
    body = (await request.json()) as ScoreBody
  } catch {
    return Response.json({ ok: false, reason: 'bad_json' }, { status: 400 })
  }

  const name = (body.name ?? '').trim().replace(/\s+/g, ' ')
  const playerToken = (body.playerToken ?? '').trim()
  const score = Number(body.score)
  const correct = Number(body.correct)
  const total = Number(body.total)
  const percent = Number(body.percent)
  const bestStreak = Number(body.bestStreak ?? 0)
  const rank = String(body.rank ?? '').slice(0, 80)

  if (!name || !playerToken) {
    return Response.json({ ok: false, reason: 'missing_fields' }, { status: 400 })
  }
  if (![score, correct, total, percent, bestStreak].every((n) => Number.isFinite(n))) {
    return Response.json({ ok: false, reason: 'bad_numbers' }, { status: 400 })
  }

  const key = normalizeNameKey(name)
  try {
    let players = await sql<{ id: string }>(
      'select id::text as id from players where name_key = $1 limit 1',
      [key],
    )
    if (players.length === 0) {
      await sql('insert into players (name, name_key, player_token) values ($1, $2, $3)', [
        name,
        key,
        playerToken,
      ])
      players = await sql<{ id: string }>(
        'select id::text as id from players where name_key = $1 limit 1',
        [key],
      )
    } else {
      const owner = await sql<{ player_token: string | null }>(
        'select player_token from players where id = $1::bigint',
        [players[0]!.id],
      )
      if (owner[0]?.player_token && owner[0].player_token !== playerToken) {
        return Response.json({ ok: false, reason: 'taken' }, { status: 409 })
      }
      if (!owner[0]?.player_token) {
        await sql('update players set player_token = $1 where id = $2::bigint', [
          playerToken,
          players[0]!.id,
        ])
      }
    }

    const dbPlayerId = players[0]!.id
    const inserted = await sql<{ id: string }>(
      `insert into scores (player_id, score, correct, total, percent, best_streak, rank_label)
       values ($1::bigint, $2, $3, $4, $5, $6, $7)
       returning id::text as id`,
      [dbPlayerId, score, correct, total, percent, bestStreak, rank],
    )

    const board = await sql<PublicBoardRow>(PUBLIC_BOARD_SQL)

    // Public board only — never echo player tokens (caller already has their own locally).
    return Response.json({
      ok: true,
      entryId: inserted[0]?.id,
      entries: board.map(toPublicEntry),
    })
  } catch (error) {
    console.error('scores POST failed', error instanceof Error ? error.message : 'error')
    return Response.json({ ok: false, error: 'score_failed' }, { status: 500 })
  }
}
