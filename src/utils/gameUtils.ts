import { Howl } from 'howler'

export const playSound = (text: string) => {
  const sound = new Howl({
    src: [`/sounds/${text.toLowerCase()}.mp3`],
    volume: 0.5
  })
  sound.play()
}

export const calculateScore = (correctAnswers: number, totalQuestions: number): number => {
  return Math.round((correctAnswers / totalQuestions) * 100)
}

export const getRandomPosition = (max: number): number => {
  return Math.random() * max
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
} 