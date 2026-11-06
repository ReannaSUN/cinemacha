import type { Locale } from '../i18n/types'

export const ROUND_SIZE = 15
export const SECONDS_PER_Q = 10
export const BASE_POINTS = 100
export const SPEED_BONUS_MAX = 50
export const STREAK_BONUS = 25

export function pointsForAnswer(correct: boolean, secondsLeft: number, streak: number): number {
  if (!correct) return 0
  const speed = Math.round((secondsLeft / SECONDS_PER_Q) * SPEED_BONUS_MAX)
  const streakPts = Math.max(0, streak - 1) * STREAK_BONUS
  return BASE_POINTS + speed + streakPts
}

export function rankLabel(score: number, maxPossible: number): string {
  const ratio = score / maxPossible
  if (ratio >= 0.85) return '殿堂輝迷 👑'
  if (ratio >= 0.65) return '鐵桿輝迷 💪'
  if (ratio >= 0.4) return '入場熱身中 🎀'
  return '回憶重溫緊 🥹'
}

/** Invite template for WhatsApp / Instagram / Facebook / Threads — always include challenge link. */
export function buildShareText(
  name: string,
  score: number,
  correct: number,
  total: number,
  bestStreak: number,
  rank: string,
  percent: number,
  locale: Locale = 'zh-Hant',
  challengeUrl = '',
): string {
  const link = challengeUrl.trim()
  if (locale === 'en') {
    return [
      '💕 Nick Cheung HK Classics Quiz | THE CHACHAFAI QUIZ',
      '',
      '【Challenge invite】',
      `${name} scored ${percent}% (${score} pts · ${correct}/${total})`,
      `Title: ${rank} · Best combo ×${bestStreak}`,
      '',
      'Come challenge me on 張家輝港產經典測驗 / THE CHACHAFAI QUIZ!',
      '15 classic questions — can you beat my score?',
      `👇 Play here:\n${link || 'https://cheungkafai-quiz.apps.grok.bot'}`,
      '',
      '#Chachafai #NickCheung',
    ].join('\n')
  }
  if (locale === 'ja') {
    return [
      '💕 张家輝ホンコン經典クイズ | THE CHACHAFAI QUIZ',
      '',
      '【挑戦招待】',
      `${name}：正解率 ${percent}%（${score}点 · ${correct}/${total}）`,
      `称号：${rank} · 最高コンボ ×${bestStreak}`,
      '',
      '張家輝港產經典測驗に挑戦して！15問、このスコア超えられる？',
      `👇 ここから挑戦：\n${link || 'https://cheungkafai-quiz.apps.grok.bot'}`,
      '',
      '#Chachafai #张家輝',
    ].join('\n')
  }
  if (locale === 'zh-Hans') {
    return [
      '💕 张家辉港产经典测验｜THE CHACHAFAI QUIZ',
      '',
      '【挑战邀请】',
      `${name}：答对了 ${percent}%（${score} 分 · ${correct}/${total}）`,
      `头衔：${rank} · 最高连击 ×${bestStreak}`,
      '',
      '来挑战《张家辉港产经典测验》吧！15 题，看你能不能超过我～',
      `👇 点开链接开打：\n${link || 'https://cheungkafai-quiz.apps.grok.bot'}`,
      '',
      '#张家辉港产经典测验 #Chachafai',
    ].join('\n')
  }
  return [
    '💕 張家輝港產經典測驗｜THE CHACHAFAI QUIZ',
    '',
    '【挑戰邀請】',
    `${name}：答對咗 ${percent}%（${score} 分 · ${correct}/${total}）`,
    `頭銜：${rank} · 最高連擊 ×${bestStreak}`,
    '',
    '嚟挑戰《張家輝港產經典測驗》啦！15 題港產經典，睇你可唔可以超過我～',
    `👇 撳連結即刻開波：\n${link || 'https://cheungkafai-quiz.apps.grok.bot'}`,
    '',
    '#張家輝港產經典測驗 #Chachafai #張家輝',
  ].join('\n')
}

export function maxScoreEstimate(total: number): number {
  let streak = 0
  let sum = 0
  for (let i = 0; i < total; i += 1) {
    streak += 1
    sum += BASE_POINTS + SPEED_BONUS_MAX + Math.max(0, streak - 1) * STREAK_BONUS
  }
  return sum
}
