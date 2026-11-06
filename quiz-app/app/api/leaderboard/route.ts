import { sql } from '../../../src/lib/db'
import { PUBLIC_BOARD_SQL, toPublicEntry, type PublicBoardRow } from '../../../src/lib/publicBoard'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const rows = await sql<PublicBoardRow>(PUBLIC_BOARD_SQL)
    return Response.json(
      {
        ok: true,
        source: 'cloud',
        entries: rows.map(toPublicEntry),
      },
      { headers: { 'cache-control': 'no-store' } },
    )
  } catch (error) {
    console.error('leaderboard GET failed', error instanceof Error ? error.message : 'error')
    return Response.json({ ok: false, error: 'leaderboard_failed' }, { status: 500 })
  }
}
