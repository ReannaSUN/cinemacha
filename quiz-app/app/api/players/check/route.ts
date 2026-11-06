import { normalizeNameKey, sql } from '../../../../src/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const raw = url.searchParams.get('name') ?? ''
  const playerToken = url.searchParams.get('playerToken') ?? ''
  const name = raw.trim().replace(/\s+/g, ' ')
  if (!name) return Response.json({ ok: false, reason: 'empty' })
  if ([...name].length > 12) return Response.json({ ok: false, reason: 'too_long' })

  const key = normalizeNameKey(name)
  try {
    const rows = await sql<{ player_token: string | null }>(
      'select player_token from players where name_key = $1 limit 1',
      [key],
    )
    if (rows.length === 0) return Response.json({ ok: true, name, available: true })
    const owner = rows[0]?.player_token
    if (owner && playerToken && owner === playerToken) {
      return Response.json({ ok: true, name, available: true, own: true })
    }
    return Response.json({ ok: false, reason: 'taken', available: false })
  } catch (error) {
    console.error('players/check failed', error instanceof Error ? error.message : 'error')
    return Response.json({ ok: false, error: 'check_failed' }, { status: 500 })
  }
}
