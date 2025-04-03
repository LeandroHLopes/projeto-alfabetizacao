export interface Level {
  id: number
  name: string
  completed: boolean
}

export interface GameState {
  score: number
  currentLevel: number
  letters: string[]
  sounds: Record<string, string>
}

export interface GameProps {
  level: string
} 