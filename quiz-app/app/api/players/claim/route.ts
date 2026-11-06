import { normalizeNameKey, sql } from '../../../../src/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: { name?: string; playerToken?: string }
  try {
    body = (await request.json()) as { name?: string; playerToken?: string }
  } catch {
    return Response.json({ ok: false, reason: 'bad_json' }, { status: 400 })
  }

  const name = (body.name ?? '').trim().replace(/\s+/g, ' ')
  const playerToken = (body.playerToken ?? '').trim()
  if (!name) return Response.json({ ok: false, reason: 'empty' }, { status: 400 })
  if ([...name].length > 12) return Response.json({ ok: false, reason: 'too_long' }, { status: 400 })
  if (!playerToken || playerToken.length > 80) {
    return Response.json({ ok: false, reason: 'bad_token' }, { status: 400 })
  }

  const key = normalizeNameKey(name)
  try {
    const existing = await sql<{ id: string; player_token: string | null; name: string }>(
      'select id::text as id, player_token, name from players where name_key = $1 limit 1',
      [key],
    )
    if (existing.length > 0) {
      const row = existing[0]!
      if (row.player_token && row.player_token !== playerToken) {
        return Response.json({ ok: false, reason: 'taken' }, { status: 409 })
      }
      if (!row.player_token) {
        await sql('update players set player_token = $1 where id = $2::bigint', [
          playerToken,
          row.id,
        ])
      }
      // Token stays client-local; do not echo it back.
      return Response.json({ ok: true, name: row.name })
    }

    // Free name — also clear this token's previous name if renaming
    await sql('delete from players where player_token = $1 and name_key <> $2', [playerToken, key])
    await sql('insert into players (name, name_key, player_token) values ($1, $2, $3)', [
      name,
      key,
      playerToken,
    ])
    return Response.json({ ok: true, name })
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return Response.json({ ok: false, reason: 'taken' }, { status: 409 })
    }
    console.error('players/claim failed', msg || 'error')
    return Response.json({ ok: false, error: 'claim_failed' }, { status: 500 })
  }
}
