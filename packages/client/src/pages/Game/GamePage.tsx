import { FC } from 'react'
import './GamePage.css'
import { Game } from '../../components'
import smallCat from '../../assets/smallCat.png'

export const GamePage: FC = () => {
  return (
    <>
      <header className="header">
        <h1 className="h1">
          FEED THE <img className="image" src={smallCat} alt="cat" /> CAT
        </h1>
      </header>

      <Game />

      <footer className="footer">
        <div className="footer-wrapper">
          <h2 className="h2">Rules of the game</h2>

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
