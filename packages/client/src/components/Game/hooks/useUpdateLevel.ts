import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Food } from '../classes'
import { LEVEL_TIME, LEVELS } from '@/components/Game/data'

// Хук для запуска следующего уровня после прохождения текущего уровня,
// для обновления общего времени игры и для восстановления времени на новом уровне
export function useUpdateLevel(
  time: number,
  setTime: Dispatch<SetStateAction<number>>,
  foodArray: Food[],
  scores: number,
  life: number,
  currentLevel: number,
  setCurrentLevel: Dispatch<SetStateAction<number>>
) {
  // Время прохождения игры в секундах (изначально 0 секунд)
  const [gameTime, setGameTime] = useState<number>(0)

  // Эффект для запуска следующего уровня после прохождения текущего уровня,
  // для обновления общего времени игры и для восстановления времени на новом уровне
  useEffect(() => {
    if (
      time > 0 &&
      foodArray.length === 0 &&
      scores > 0 &&
      life > 0 &&
      currentLevel < LEVELS
    ) {
      setCurrentLevel(prevLevel => prevLevel + 1)
      setGameTime(prevGameTime => prevGameTime + LEVEL_TIME - time)
      setTime(LEVEL_TIME)
    }
  }, [foodArray])

  return gameTime
}
