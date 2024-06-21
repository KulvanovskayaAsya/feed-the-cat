import { useEffect, useState } from 'react'

// Хук для обновления оставшегося времени игры
export function useTime(initialTime: number) {
  const [time, setTime] = useState<number>(initialTime)

  useEffect(() => {
    const timerID = setInterval(() => setTime(prevTime => prevTime - 1), 1000)

    return () => {
      clearInterval(timerID)
    }
  }, [setTime])

  return { time, setTime }
}
