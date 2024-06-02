import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Page } from '../Page'

export const HomePage: FC = () => {
  return (
    <Page>
      <h1>Home Page</h1>

      <nav style={{ background: 'white' }}>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/forum">Forum</Link>
          </li>
          <li>
            <Link to="/forum/topic/1">Forum Topic</Link>
          </li>
        </ul>
      </nav>
    </Page>
  )
}
