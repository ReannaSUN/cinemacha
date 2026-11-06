export type SocialTarget = 'threads' | 'instagram' | 'facebook' | 'whatsapp'

/** Live public Cursor hosting URL — always use this in invite templates. */
export const LIVE_QUIZ_URL = 'https://cheungkafai-quiz.apps.grok.bot'

/**
 * Challenge link for invites.
 * Prefer VITE_PUBLIC_SHARE_URL override, else the live hosted URL.
 */
export function quizShareUrl(): string {
  const fromEnv = (import.meta.env.VITE_PUBLIC_SHARE_URL as string | undefined)?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  return LIVE_QUIZ_URL
}

/** Full caption already includes the link — use as-is for WhatsApp / Threads / clipboard. */
export function invitePayload(text: string, url: string): string {
  const body = text.trim()
  const link = (url || LIVE_QUIZ_URL).trim()
  if (!link) return body
  if (body.includes(link)) return body
  return `${body}\n${link}`
}

export function openWhatsApp(text: string) {
  // api.whatsapp.com reliably pre-fills text+link on mobile & desktop
  const href = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  window.open(href, '_blank', 'noopener,noreferrer')
}

export function openThreads(text: string) {
  window.open(
    `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export function openFacebook(url: string, quote: string) {
  // FB often strips `quote`; still pass it, and callers must clipboard the full caption.
  const href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` +
    `&quote=${encodeURIComponent(quote)}`
  window.open(href, '_blank', 'noopener,noreferrer')
}

export function openInstagram() {
  window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

/**
 * Per-platform share. Do NOT use the generic Web Share sheet first —
 * it often delivers only the badge image and drops invite text/link
 * (WhatsApp / Instagram / Facebook). Threads intent already embeds text.
 */
export async function shareViaPlatform(opts: {
  target: SocialTarget
  title: string
  text: string
  url: string
  file: File
  download: (blob: Blob, filename: string) => void
}): Promise<'opened'> {
  const shareUrl = opts.url || LIVE_QUIZ_URL
  const caption = invitePayload(opts.text, shareUrl)

  // Always put template + live link on the clipboard first (user gesture).
  await copyText(caption)

  // Badge for platforms that need manual attach (IG / FB / desktop WA).
  opts.download(opts.file, opts.file.name)

  if (opts.target === 'whatsapp') {
    openWhatsApp(caption)
    return 'opened'
  }
  if (opts.target === 'threads') {
    openThreads(caption)
    return 'opened'
  }
  if (opts.target === 'facebook') {
    openFacebook(shareUrl, caption)
    return 'opened'
  }
  // Instagram has no web compose with caption — paste from clipboard + attach badge.
  openInstagram()
  return 'opened'
}
