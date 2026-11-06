import type { Metadata, Viewport } from 'next'
import '../src/styles/global.css'
import '../src/styles/app.css'

export const metadata: Metadata = {
  title: '張家輝港產經典測驗｜THE CHACHAFAI QUIZ',
  description:
    '張家輝港產經典測驗——電影劇集真題急速 Quiz，排行榜、分享徽章，一齊為 Chachafai 造勢。',
}

export const viewport: Viewport = {
  themeColor: '#fff3f8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <body>{children}</body>
    </html>
  )
}
