import { FC, useEffect, useState } from 'react'
import cls from './GamePage.module.css'
import {
  Game,
  PixelHeader,
  PixelSelect,
  PixelButton,
  PixelLink,
} from '@/components'
import smallCat from '@/assets/smallCat.png'
import { initialGameData, useGameContext } from '@/context'
import { Space } from 'antd'
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
interface RulesProps {
  isFullWidth?: boolean
}
const RulesComponent: FC<RulesProps> = ({ isFullWidth }: RulesProps) => {
  return (
    <div className={`${cls.rulesWrapper} ${isFullWidth ? cls.fullWidth : ''}`}>
      <h2 className={cls.h2}>Rules of the game</h2>
      <ul>
        <li>1 Control the cat using the arrow buttons on your keyboard.</li>
        <li>2 Find all the goodies during the game.</li>
        <li>3 Avoid meeting enemies.</li>
        <li>4 Good game!</li>
      </ul>
    </div>
  )
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
            <RulesComponent isFullWidth />

            <div className={cls.buttons}>
              <PixelSelect
                defaultValue={String(heroVariant)}
                onChange={(value: string) => setHeroVariant(Number(value))}
                options={getOptions()}
              />

              <PixelButton onClick={() => setIsGameStart(true)}>
                START GAME
              </PixelButton>
              <PixelLink to="/">MAIN MENU</PixelLink>
            </div>
          </>
        )}

        {isGameStart && <Game heroVariant={heroVariant} />}

        {isGameFinish && (
          <>
            {gameData.isWin && (
              <h1 className={cls.h1}>CONGRATULATIONS ON YOUR VICTORY!</h1>
            )}
            {!gameData.isWin && (
              <h1 className={cls.h1}>LOSE THE GAME, DON'T BE UPSET!</h1>
            )}

            <div className={cls.space}>
              <h2 className={cls.h2}>Game results</h2>

              <Space
                direction="vertical"
                size="small"
                align={'start'}
                className={cls.spaceScore}>
                <p>Scores: {gameData.scores}</p>
                <p>Level: {gameData.level}</p>
                <p>Time: {gameData.time}</p>
                <p>Lives: {gameData.life}</p>
              </Space>

              <div className={cls.buttons}>
                <PixelButton
                  onClick={() => {
                    setIsGameStart(false)
                    setIsGameFinish(false)
                  }}>
                  PLAY AGAIN
                </PixelButton>

                <PixelLink to="/">MAIN MENU</PixelLink>
              </div>
            </div>
          </>
        )}
      </main>

      {isGameStart && (
        <footer className={cls.footer}>
          <RulesComponent />
        </footer>
      )}
    </>
  )
}
