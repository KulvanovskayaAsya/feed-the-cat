import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'
import { Space } from 'antd'
import { PixelHeader } from '@/components'
import smallCat from '@/assets/smallCat.png'
import { PixelLink } from '@/components'

export const HomePage: FC = () => {
  return (
    <>
      <section className={styles.homeWrapper}>
        <header className={styles.homeHeader}>
          <PixelHeader className={styles.homeH1}>
            FEED THE <img className={styles.image} src={smallCat} alt="cat" />{' '}
            CAT
          </PixelHeader>

          <p className={styles.homeSubtitle}>
            This game is about a cat that you have to feed. You find yourself in
            a room of a house where food is scattered. You need to collect all
            the food within a certain time. But be careful! The robot vacuum
            cleaner does not sleep. Better not meet him. Good luck in the
            game!!!
          </p>
        </header>
        <nav className={styles.homeNav}>
          <ul>
            <li>
              <PixelLink to="/game">Game</PixelLink>
            </li>
            <li>
              <PixelLink to="/profile">Profile</PixelLink>
            </li>
            <li>
              <PixelLink to="/forum">Forum</PixelLink>
            </li>
            <li>
              <PixelLink to="/leaderboard">Leaderboard</PixelLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}
