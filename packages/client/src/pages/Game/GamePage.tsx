import { FC } from 'react'
import cls from './GamePage.module.css'
import { Game, PixelHeader } from '@/components'
import smallCat from '@/assets/smallCat.png'
import { withAuth } from '@/utils/HOCs/withAuth'

export const GamePage: FC = () => {
  return (
    <>
      <header className={cls.header}>
        <PixelHeader>
          FEED THE <img className={cls.image} src={smallCat} alt="cat" /> CAT
        </PixelHeader>
      </header>

      <main>
        <Game />
      </main>

      <footer className={cls.footer}>
        <div className={cls.footerWrapper}>
          <h2 className={cls.h2}>Rules of the game</h2>

          <ul>
            <li>1 Control the cat using the arrow buttons on your keyboard.</li>
            <li>2 Find all the goodies during the game.</li>
            <li>3 Avoid meeting enemies.</li>
            <li>4 Good game!</li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export const GamePageWithAuth = withAuth(GamePage)
