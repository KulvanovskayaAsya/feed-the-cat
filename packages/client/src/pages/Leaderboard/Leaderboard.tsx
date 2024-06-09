import { FC } from 'react'
import { withAuth } from '@/utils/HOCs/withAuth'

export const LeaderboardPage: FC = () => {
  return <h1>Leaderboard Page</h1>
}

export const LeaderboardPageWithAuth = withAuth(LeaderboardPage)
