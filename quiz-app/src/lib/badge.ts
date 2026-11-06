import memeFaceUrl from '../assets/photos/meme-face.png'

export interface BadgeInput {
  name: string
  percent: number
  score: number
  correct: number
  total: number
  rank: string
  locale?: string
  brand?: string
  youLine?: string
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image load failed'))
    img.src = src
  })
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

/** Generate a cute share badge PNG blob. */
export async function generateBadgeBlob(input: BadgeInput): Promise<Blob> {
  const W = 1080
  const H = 1350
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas unsupported')

  // soft pink background
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#fff3f8')
  bg.addColorStop(0.5, '#ffe0ef')
  bg.addColorStop(1, '#ffd0e8')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // polka dots
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  for (let y = 40; y < H; y += 70) {
    for (let x = 40; x < W; x += 70) {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // white card
  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#ffb3d4'
  ctx.lineWidth = 8
  roundRect(ctx, 70, 90, W - 140, H - 180, 48)
  ctx.fill()
  ctx.stroke()

  // title
  ctx.fillStyle = '#e91e7a'
  ctx.textAlign = 'center'
  const brand = input.brand || '張家輝港產經典測驗'
  ctx.font = brand.length > 10 ? '700 34px Fredoka, "Noto Sans TC", sans-serif' : '700 40px Fredoka, "Noto Sans TC", sans-serif'
  ctx.fillText(brand, W / 2, 200)

  ctx.fillStyle = '#8a6a7a'
  ctx.font = '600 32px "Noto Sans TC", sans-serif'
  ctx.fillText('THE CHACHAFAI QUIZ', W / 2, 255)

  // meme face — keep original aspect ratio (no stretch)
  try {
    const face = await loadImage(memeFaceUrl)
    const maxW = 560
    const maxH = 320
    const scale = Math.min(maxW / face.naturalWidth, maxH / face.naturalHeight)
    const dw = Math.round(face.naturalWidth * scale)
    const dh = Math.round(face.naturalHeight * scale)
    const fx = Math.round(W / 2 - dw / 2)
    const fy = 300
    ctx.save()
    roundRect(ctx, fx, fy, dw, dh, 28)
    ctx.clip()
    ctx.drawImage(face, 0, 0, face.naturalWidth, face.naturalHeight, fx, fy, dw, dh)
    ctx.restore()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 10
    roundRect(ctx, fx, fy, dw, dh, 28)
    ctx.stroke()
  } catch {
    // ignore image failure
  }

  const name = input.name.trim() || '輝迷'
  ctx.fillStyle = '#3b2340'
  ctx.font = '700 48px "Noto Sans TC", sans-serif'
  ctx.fillText(name, W / 2, 660)

  const line = input.youLine || `我答對咗 ${input.percent}%`
  ctx.fillStyle = '#e91e7a'
  ctx.font = line.length > 16 ? '700 54px Fredoka, "Noto Sans TC", sans-serif' : '700 72px Fredoka, "Noto Sans TC", sans-serif'
  ctx.fillText(line, W / 2, 800)

  ctx.fillStyle = '#3b2340'
  ctx.font = '700 48px Fredoka, "Noto Sans TC", sans-serif'
  ctx.fillText('★', W / 2, 880)

  ctx.fillStyle = '#8a6a7a'
  ctx.font = '600 34px "Noto Sans TC", sans-serif'
  ctx.fillText(
    `${input.score} 分 · ${input.correct}/${input.total} 題 · ${input.rank.replace(/[^\u4e00-\u9fff殿堂鐵桿入場回憶重溫中迷]/g, '') || input.rank}`,
    W / 2,
    980,
  )

  ctx.fillStyle = '#ff4d9a'
  ctx.font = '700 30px Fredoka, "Noto Sans TC", sans-serif'
  ctx.fillText('#港產經典測驗  #Chachafai', W / 2, 1080)

  ctx.fillStyle = '#b08a9a'
  ctx.font = '500 26px "Noto Sans TC", sans-serif'
  ctx.fillText('非官方粉絲向 · 一齊嚟挑戰啦', W / 2, 1145)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('badge export failed'))
    }, 'image/png')
  })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
