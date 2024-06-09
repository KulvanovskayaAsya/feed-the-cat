import { useEffect, useRef, useState } from 'react'
import './Game.css'
import { getGameTime } from './utils'
import { type GameData, useGameContext } from '@/context'
import {
  useIsWin,
  usePressedAndLastKey,
  useRunGame,
  useTime,
  useUpdateGame,
  useUpdateLevel,
} from './hooks'
import { LEVEL_TIME, LEVELS } from '@/components/Game/data'

export interface GameProps {
  width?: number
  height?: number
  heroVariant?: number
}

export const Game = (props: GameProps): JSX.Element => {
  // Размеры холста: ширина (800 пикселей) и высота (600 пикселей), внешний вид героя (1 вариант)
  const { width = 800, height = 600, heroVariant = 2 } = props

  // Ссылка на холст
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Нажатая и последняя нажатая клавишы
  const { pressedKey, lastKey } = usePressedAndLastKey()
  // Игровое время в секундах (изначально 120 секунд или 2 минуты)
  const { time, setTime } = useTime(LEVEL_TIME)

  // Набранные очки (изначально 0 очков)
  const [scores, setScores] = useState<number>(0)
  // Жизни игрока (изначально 3 жизни)
  const [life, setLife] = useState<number>(3)
  // Текущий уровень (изначально 1-й уровень)
  const [currentLevel, setCurrentLevel] = useState<number>(1)

  // Хук для начальной загрузки игры
  const {
    ctx,
    level,
    foreground,
    hero,
    heroInitCoords,
    foodArray,
    setFoodArray,
    enemy,
    lifeArray,
  } = useRunGame(canvasRef, life, currentLevel, heroVariant)

  // Общее время игры
  const gameTime = useUpdateLevel(
    time,
    setTime,
    foodArray,
    scores,
    life,
    currentLevel,
    setCurrentLevel
  )

  // Флаг победил игрок в игре - true, или програл - false (изначально null)
  const isWinGame = useIsWin(time, foodArray, scores, life, currentLevel)

  // Хук, запускающий обновление игры с частотой около 60 кадров в секунду
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
    heroInitCoords,
    time,
    scores,
    setScores,
    life,
    setLife,
    currentLevel
  )

  // Функция для установки игровых данных в игровой контекст
  const { setGameData } = useGameContext()

  // Эффект для обновления игрового контекста при победе или поражении в игре
  useEffect(() => {
    if (isWinGame === true && currentLevel === LEVELS) {
      setGameData((prevGameData: GameData) => {
        return {
          ...prevGameData,
          scores,
          level: currentLevel,
          life,
          time: getGameTime(gameTime + LEVEL_TIME - time),
          isWin: true,
        }
      })
    } else if (isWinGame === false) {
      setGameData((prevGameData: GameData) => {
        return {
          ...prevGameData,
          scores,
          level: currentLevel,
          life,
          time: getGameTime(gameTime + LEVEL_TIME - time),
          isWin: false,
        }
      })
    }
  }, [isWinGame])

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
