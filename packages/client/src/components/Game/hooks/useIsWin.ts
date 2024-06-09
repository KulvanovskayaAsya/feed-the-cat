import { useEffect, useState } from 'react'
import { Food } from '../classes'
import { LEVELS } from '@/components/Game/data'

// Хук для определения победы в игре
export function useIsWin(
  time: number,
  foodArray: Food[],
  scores: number,
  life: number,
  currentLevel: number
) {
  const [isWin, setIsWin] = useState<boolean | null>(null)

  // Эффект для определения победы в игре
  useEffect(() => {
    if (
      time > 0 &&
      time < 2 * 60 &&
      foodArray.length === 0 &&
      scores > 0 &&
      life > 0 &&
      currentLevel === LEVELS
    ) {
      setIsWin(true)
    } else if (life === 0 || time === 0) {
      setIsWin(false)
    }
  }, [time, setIsWin, foodArray, scores, life, currentLevel])

  return isWin
}
