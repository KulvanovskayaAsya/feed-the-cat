import { FC, useEffect, useState } from 'react'
import cls from './GamePage.module.css'
import { Game, PixelHeader } from '@/components'
import smallCat from '@/assets/smallCat.png'
import { initialGameData, useGameContext } from '@/context'
import { Button, Card, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HEROES } from '@/components/Game/data'

// Тип опции для компонента Select
type OptionsType = { value: string; label: string }

// Функция для генерирования массива опций для компонента Select, определяющих внешний вид героя
const getOptions: () => OptionsType[] = () => {
  const optionsArray: OptionsType[] = []

  for (let i = 1; i <= HEROES; i++) {
    optionsArray.push({ value: String(i), label: `${i} variant` })
  }

  return optionsArray
}

export const GamePage: FC = () => {
  // Выбор внешнего вида героя (1-ый вариант)
  const [heroVariant, setHeroVariant] = useState<number>(1)
  // Начало игры (false)
  const [isGameStart, setIsGameStart] = useState<boolean>(false)
  // Завершение игры (false)
  const [isGameFinish, setIsGameFinish] = useState<boolean>(false)

  // Игровой контекст и функция для установки игровых данных в игровой контекст
  const { gameData, setGameData } = useGameContext()
  // Программная навигация
  const navigate = useNavigate()

  // Начальная инициализация страницы с игрой
  useEffect(() => {
    setGameData(initialGameData)
  }, [window.location.pathname])

  // Эффект для завершения игры
  useEffect(() => {
    if (gameData.isWin === true || gameData.isWin === false) {
      setIsGameFinish(true)
      setIsGameStart(false)
    }
  }, [gameData])

  return (
    <>
      <header className={cls.header}>
        <PixelHeader>
          FEED THE <img className={cls.image} src={smallCat} alt="cat" /> CAT
        </PixelHeader>
      </header>

      <main>
        {!isGameStart && !isGameFinish && (
          <>
            <Select
              defaultValue="1"
              style={{ width: 120 }}
              onChange={(value: string) => setHeroVariant(Number(value))}
              options={getOptions()}
            />

            <Button onClick={() => setIsGameStart(true)}>Start game</Button>
          </>
        )}

        {isGameStart && <Game heroVariant={heroVariant} />}

        {isGameFinish && (
          <>
            {gameData.isWin && (
              <h2 style={{ fontSize: '100px' }}>
                Congratulations on your victory!
              </h2>
            )}
            {!gameData.isWin && (
              <p style={{ fontSize: '100px' }}>
                Lose the game, don't be upset!
              </p>
            )}

            <Card style={{ background: 'white' }}>
              <h3 style={{ fontSize: '36px' }}>Game results</h3>
              <p>Scores: {gameData.scores}</p>
              <p>Level: {gameData.level}</p>
              <p>Time: {gameData.time}</p>
              <p>Lives: {gameData.life}</p>
            </Card>

            <Button
              onClick={() => {
                setIsGameStart(false)
                setIsGameFinish(false)
              }}>
              Play again
            </Button>

            <Button onClick={() => navigate('/')}>Main menu</Button>
          </>
        )}
      </main>

      {isGameStart && (
        <footer className={cls.footer}>
          <div className={cls.footerWrapper}>
            <h2 className={cls.h2}>Rules of the game</h2>

            <ul>
              <li>
                1 Control the cat using the arrow buttons on your keyboard.
              </li>
              <li>2 Find all the goodies during the game.</li>
              <li>3 Avoid meeting enemies.</li>
              <li>4 Good game!</li>
            </ul>
          </div>
        </footer>
      )}
    </>
  )
}
