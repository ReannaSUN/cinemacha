export type SocialTarget = 'threads' | 'instagram' | 'facebook' | 'whatsapp'

export function quizShareUrl(): string {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}${window.location.pathname}${window.location.search}`
}

export function openWhatsApp(text: string) {
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
}

export function openThreads(text: string) {
  window.open(
    `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export function openFacebook(url: string, quote: string) {
  const href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`
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
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

export async function tryNativeFileShare(opts: {
  title: string
  text: string
  url: string
  file: File
}): Promise<'shared' | 'cancelled' | 'unavailable'> {
  if (!navigator.share || !navigator.canShare) return 'unavailable'
  const payloadWithFile = { title: opts.title, text: opts.text, url: opts.url, files: [opts.file] }
  try {
    if (navigator.canShare(payloadWithFile)) {
      await navigator.share(payloadWithFile)
      return 'shared'
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled'
  }

  const payloadText = { title: opts.title, text: `${opts.text}\n${opts.url}` }
  try {
    if (navigator.canShare?.(payloadText) ?? true) {
      await navigator.share(payloadText)
      return 'shared'
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled'
  }
  return 'unavailable'
}

/** Platform intents when Web Share API cannot attach the badge image. */
export async function shareViaPlatform(opts: {
  target: SocialTarget
  title: string
  text: string
  url: string
  file: File
  download: (blob: Blob, filename: string) => void
}): Promise<'shared' | 'opened' | 'cancelled'> {
  const native = await tryNativeFileShare({
    title: opts.title,
    text: opts.text,
    url: opts.url,
    file: opts.file,
  })
  if (native === 'shared' || native === 'cancelled') return native

  opts.download(opts.file, opts.file.name)
  await copyText(`${opts.text}\n${opts.url}`)

  if (opts.target === 'whatsapp') {
    openWhatsApp(`${opts.text}\n${opts.url}`)
    return 'opened'
  }
  if (opts.target === 'threads') {
    openThreads(`${opts.text}\n${opts.url}`)
    return 'opened'
  }
  if (opts.target === 'facebook') {
    openFacebook(opts.url || window.location.href, opts.text)
    return 'opened'
  }
  // Instagram has no web compose intent — open app/site with caption copied + image downloaded.
  openInstagram()
  return 'opened'
}
