import { useRoutes } from 'react-router-dom'
import * as Pages from '../pages'

const routes = [
  { path: '/', element: <Pages.HomePage /> },
  { path: '/login', element: <Pages.LoginPage /> },
  { path: '/registration', element: <Pages.RegistrationPage /> },
  { path: '/game', element: <Pages.GamePage /> },
  { path: '/profile', element: <Pages.ProfilePage /> },
  { path: '/leaderboard', element: <Pages.LeaderboardPage /> },
  { path: '/forum', element: <Pages.ForumPage /> },
  { path: '/forum/topic/:topicId', element: <Pages.ForumTopicPage /> },
  { path: '*', element: <Pages.Error404Page /> },
]

const AppRoutes: React.FC = () => useRoutes(routes)

export default AppRoutes
