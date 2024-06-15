import { useState, useEffect } from 'react'
import { initialGameData, useGameContext } from '@/context'

export const useGameLogic = () => {
  const [isGameStart, setIsGameStart] = useState(false)
  const [isGameFinish, setIsGameFinish] = useState(false)
  const [heroVariant, setHeroVariant] = useState(1)
  const { gameData, setGameData } = useGameContext()

  useEffect(() => {
    setGameData(initialGameData)
  }, [window.location.pathname])

  useEffect(() => {
    if (gameData.isWin === true || gameData.isWin === false) {
      setIsGameFinish(true)
      setIsGameStart(false)
    }
  }, [gameData])

  const startGame = () => {
    setIsGameStart(true)
  }

  const playAgain = () => {
    setIsGameStart(false)
    setIsGameFinish(false)
  }

  const handleCarouselChange = (currentSlide: number) => {
    setHeroVariant(currentSlide + 1)
  }

  return {
    isGameStart,
    isGameFinish,
    heroVariant,
    gameData,
    startGame,
    playAgain,
    handleCarouselChange,
  }
}
