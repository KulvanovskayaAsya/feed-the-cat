import { useState, useEffect } from 'react'
import { resetGameData, selectGameData } from '@/store/slices/gameSlice'
import { useDispatch, useSelector } from '@/store'

export const useGameLogic = () => {
  const [isGameStart, setIsGameStart] = useState(false)
  const [isGameFinish, setIsGameFinish] = useState(false)
  const [heroVariant, setHeroVariant] = useState(1)
  const gameData = useSelector(selectGameData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetGameData())
  }, [window.location.pathname, dispatch])

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
