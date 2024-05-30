import { useEffect, useState } from 'react'
import { Food } from '../classes'

// Хук для определения победы в игре
export function useIsWin(
  time: number,
  foodArray: Food[],
  scores: number,
  life: number
) {
  const [isWin, setIsWin] = useState<boolean | null>(null)

  // Эффект для определения победы в игре
  useEffect(() => {
    if (time > 0 && foodArray.length === 0 && scores > 0 && life > 0) {
      setIsWin(true)
    } else {
      setIsWin(false)
    }
  }, [time, setIsWin, foodArray, scores, life])

  return isWin
}
