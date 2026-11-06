/** Normalize user / official answers for short-answer matching. */
export function normalizeAnswer(raw: string): string {
  return raw
    .trim()
    .toLocaleLowerCase()
    .replace(/[（）()【】\[\]「」『』《》<>]/g, '')
    .replace(/[，,。.!！？?、·・\s\-_/／\\:：;；'"`]/g, '')
}

/**
 * True if typed answer matches any accepted key.
 * Also accepts when all “must” tokens appear in the typed text.
 */
export function matchShortAnswer(typed: string, accepted: string[]): boolean {
  const user = normalizeAnswer(typed)
  if (!user) return false

  for (const a of accepted) {
    const key = normalizeAnswer(a)
    if (!key) continue
    if (user === key || user.includes(key) || key.includes(user)) return true
  }
  return false
}
