import { FC } from 'react'
import styles from './HomePage.module.css'
import { PixelHeader } from '@/components'
import smallCat from '@/assets/smallCat.png'
import { PixelLink } from '@/components'
import { PATHS } from '@/constants'

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
              <PixelLink to={PATHS.GAME}>Game</PixelLink>
            </li>
            <li>
              <PixelLink to={PATHS.PROFILE}>Profile</PixelLink>
            </li>
            <li>
              <PixelLink to={PATHS.FORUM}>Forum</PixelLink>
            </li>
            <li>
              <PixelLink to={PATHS.LEADERBOARD}>Leaderboard</PixelLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}
