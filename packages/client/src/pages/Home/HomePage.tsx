import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/constants'

export const HomePage: FC = () => {
  return (
    <>
      <h1>Home Page</h1>

      <nav style={{ background: 'white' }}>
        <ul>
          <li>
            <Link to={PATHS.LOGIN}>Login</Link>
          </li>
          <li>
            <Link to={PATHS.REGISTRATION}>Registration</Link>
          </li>
          <li>
            <Link to={PATHS.PROFILE}>Profile</Link>
          </li>
          <li>
            <Link to={PATHS.GAME}>Game</Link>
          </li>
          <li>
            <Link to={PATHS.LEADERBOARD}>Leaderboard</Link>
          </li>
          <li>
            <Link to={PATHS.FORUM}>Forum</Link>
          </li>
          <li>
            <Link to={PATHS.TOPIC('1')}>Forum Topic</Link>
          </li>
          <li>
            <Link to={PATHS.TOPIC_CREATE}>Forum Topic Create</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
