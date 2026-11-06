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

export function buildShareText(
  name: string,
  score: number,
  correct: number,
  total: number,
  bestStreak: number,
  rank: string,
  percent: number,
  locale: Locale = 'zh-Hant',
): string {
  if (locale === 'en') {
    return [
      '💕 Nick Cheung HK Classics Quiz | THE CHACHAFAI QUIZ',
      `${name}: I got ${percent}% right — your turn?`,
      `Score ${score} (${correct}/${total}) | Combo ×${bestStreak} | ${rank}`,
      'Come challenge me — 15 questions, can you beat my score?',
      '#Chachafai #NickCheung',
    ].join('\n')
  }
  if (locale === 'ja') {
    return [
      '💕 张家輝ホンコン經典クイズ | THE CHACHAFAI QUIZ',
      `${name}：正解率 ${percent}% だよ、君は？`,
      `スコア ${score}（${correct}/${total}）｜コンボ ×${bestStreak}｜${rank}`,
      '僕に挑戦して！15問、このスコア超えられる？',
      '#Chachafai #张家輝',
    ].join('\n')
  }
  if (locale === 'zh-Hans') {
    return [
      '💕 张家辉港产经典测验｜THE CHACHAFAI QUIZ',
      `${name}：我答对了 ${percent}%，你呢？`,
      `分数 ${score}（${correct}/${total}）｜连击 ×${bestStreak}｜${rank}`,
      '来挑战我吧！15题，看你能不能超过我的分数！',
      '#张家辉港产经典测验 #Chachafai',
    ].join('\n')
  }
  return [
    '💕 張家輝港產經典測驗｜THE CHACHAFAI QUIZ',
    `${name}：我答對咗 ${percent}%，你呢？`,
    `分數 ${score}（${correct}/${total}）｜連擊 ×${bestStreak}｜${rank}`,
    '嚟挑戰我啦！15題，睇你可唔可以超過我嘅分數！',
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
