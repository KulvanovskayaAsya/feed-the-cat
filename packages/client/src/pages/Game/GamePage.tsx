import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { classNames } from '@/utils'

import { GameStart } from '@/components/Game/GameStart'
import { GameEnd } from '@/components/Game/GameEnd'
import { Game, PixelHeader, PixelModal } from '@/components'
import { useGameLogic } from '@/components/Game/hooks/useGameLogic'

import smallCat from '@/assets/smallCat.png'
import cls from './GamePage.module.css'

interface RulesProps {
  isFullWidth?: boolean
}
const RulesComponent: FC<RulesProps> = ({ isFullWidth }: RulesProps) => {
  return (
    <div
      className={classNames(
        cls.rulesWrapper,
        { [cls.fullWidth]: isFullWidth },
        [cls.withBackgroundColor]
      )}>
      <h2 className={cls.h2}>Rules of the game</h2>
      <ul>
        <li>
          1 Control the cat using the arrow buttons on your keyboard. To
          activate or deactivate fullscreen mode press "Enter"
        </li>
        <li>2 Find all the goodies during the game.</li>
        <li>3 Avoid meeting enemies.</li>
        <li>4 Good game!</li>
      </ul>
    </div>
  )
}

export const GamePage: FC = () => {
  const {
    isGameStart,
    isGameFinish,
    heroVariant,
    gameData,
    startGame,
    playAgain,
    handleCarouselChange,
  } = useGameLogic()

  const navigate = useNavigate()

  const mainMenu = () => {
    navigate('/')
  }

  return (
    <>
      <header className={cls.header}>
        <PixelHeader className={cls.withBackgroundColor}>
          FEED THE <img className={cls.image} src={smallCat} alt="cat" /> CAT
        </PixelHeader>
      </header>

      <main>
        {!isGameStart && !isGameFinish && (
          <PixelModal open={true}>
            <GameStart
              onStartGame={startGame}
              onCarouselChange={handleCarouselChange}
            />
          </PixelModal>
        )}

        {isGameStart && <Game heroVariant={heroVariant} />}

        {isGameFinish && (
          <PixelModal open={true}>
            <GameEnd
              gameData={gameData}
              onPlayAgain={playAgain}
              onMainMenu={mainMenu}
            />
          </PixelModal>
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
