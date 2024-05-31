import { useEffect, useRef, useState } from 'react'
import './Game.css'
import { getGameTime } from './utils'
import { type GameData, useGameContext } from '../../context'
import {
  useIsWin,
  usePressedAndLastKey,
  useRunGame,
  useTime,
  useUpdateGame,
} from './hooks'

export interface GameProps {
  width?: number
  height?: number
}

export const Game = (props: GameProps): JSX.Element => {
  // Размеры холста: ширина (800 пикселей) и высота (600 пикселей)
  const { width = 800, height = 600 } = props

  // Ссылка на холст
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Нажатая и последняя нажатая клавишы
  const { pressedKey, lastKey } = usePressedAndLastKey()
  // Игровое время в секундах (изначально 120 секунд или 2 минуты)
  const time = useTime(2 * 60)

  // Набранные очки (изначально 0 очков)
  const [scores, setScores] = useState<number>(0)
  // Жизни игрока (изначально 3 жизни)
  const [life, setLife] = useState<number>(3)

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
  } = useRunGame(canvasRef, life)

  // Флаг победил игрок - true, или програл - false (изначально null)
  const isWin = useIsWin(time, foodArray, scores, life)

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
    setLife
  )

  // Функция для установки игровых данных в игровой контекст
  const { setGameData } = useGameContext()

  // Эффект для обновления игрового контекста при победе или поражении в игре
  useEffect(() => {
    if (isWin === true) {
      setGameData((prevGameData: GameData) => {
        return { ...prevGameData, scores, life, time: getGameTime(time) }
      })

      // TODO добавить редирект на страницу завершения игры с сообщением о победе
    } else if (isWin === false) {
      setGameData((prevGameData: GameData) => {
        return { ...prevGameData, scores, life, time: getGameTime(time) }
      })

      // TODO добавить редирект на страницу завершения игры с сообщением о поражении
    }
  }, [isWin])

  return (
    <canvas
      className="canvas"
      id="canvas"
      width={width}
      height={height}
      ref={canvasRef}></canvas>
  )
}
