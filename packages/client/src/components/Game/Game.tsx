import { useEffect, useRef, useState } from 'react'
import './Game.css'
import { getGameTime } from './utils'
import { useSelector, useDispatch } from 'react-redux'
import { updateGameData, selectGameData } from '@/store/slices/gameSlice'
import {
  useIsWin,
  usePressedAndLastKey,
  useRunGame,
  useSound,
  useTime,
  useUpdateGame,
  useUpdateLevel,
} from './hooks'
import { LEVEL_TIME, LEVELS } from './data'
import { useFullscreen } from '@/utils/hooks'
import { Sound } from './classes'

export interface GameProps {
  width?: number
  height?: number
  heroVariant?: number
  volume?: number
}

export const Game = (props: GameProps): JSX.Element => {
  const { width = 800, height = 600, heroVariant = 2, volume = 100 } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { pressedKey, lastKey } = usePressedAndLastKey()
  const { time, setTime } = useTime(LEVEL_TIME)
  const [scores, setScores] = useState<number>(0)
  const [life, setLife] = useState<number>(3)
  const [currentLevel, setCurrentLevel] = useState<number>(1)

  const { audioBuffer, audioContext } = useSound(currentLevel, volume)
  const dispatch = useDispatch()
  const gameData = useSelector(selectGameData)

  const {
    ctx,
    level,
    foreground,
    hero,
    heroInitCoords,
    foodArray,
    setFoodArray,
    extraFoodArray,
    enemy,
    lifeArray,
  } = useRunGame(
    canvasRef,
    life,
    currentLevel,
    heroVariant,
    audioBuffer,
    audioContext
  )

  const gameTime = useUpdateLevel(
    time,
    setTime,
    foodArray,
    scores,
    life,
    currentLevel,
    setCurrentLevel
  )

  const isWinGame = useIsWin(time, foodArray, scores, life, currentLevel)

  useUpdateGame(
    canvasRef,
    ctx,
    level,
    foreground,
    hero,
    setFoodArray,
    enemy,
    lifeArray,
    pressedKey,
    lastKey,
    foodArray,
    extraFoodArray,
    heroInitCoords,
    time,
    scores,
    setScores,
    life,
    setLife,
    currentLevel
  )

  useEffect(() => {
    if (isWinGame === true && currentLevel === LEVELS) {
      dispatch(
        updateGameData({
          scores,
          level: currentLevel,
          life,
          time: getGameTime(gameTime + LEVEL_TIME - time),
          isWin: true,
        })
      )
    } else if (isWinGame === false) {
      dispatch(
        updateGameData({
          scores,
          level: currentLevel,
          life,
          time: getGameTime(gameTime + LEVEL_TIME - time),
          isWin: false,
        })
      )
    }
  }, [isWinGame])

  useFullscreen(canvasRef)

  useEffect(() => {
    Sound.setVolume(volume)
  }, [volume])

  return (
    <canvas
      className="canvas"
      id="canvas"
      width={width}
      height={height}
      ref={canvasRef}
    />
  )
}
