import { useRoutes } from 'react-router-dom'
import * as Pages from '../pages'
import { BaseLayout } from '../layouts/BaseLayout'
import { WithAuth } from '@/utils/HOCs'

const routes = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Pages.HomePage />,
      },
      {
        path: '/login',
        element: <WithAuth Element={Pages.LoginPage} />,
      },
      {
        path: '/registration',
        element: <WithAuth Element={Pages.RegistrationPage} />,
      },
      { path: '/game', element: <WithAuth Element={Pages.GamePage} /> },
      { path: '/profile', element: <WithAuth Element={Pages.ProfilePage} /> },
      {
        path: '/leaderboard',
        element: <WithAuth Element={Pages.LeaderboardPage} />,
      },
      {
        path: '/forum',
        element: <WithAuth Element={Pages.ForumPage} />,
      },
      {
        path: '/forum/topic/:topicId',
        element: <WithAuth Element={Pages.ForumTopicPage} />,
      },
      {
        path: '/forum/topic/create',
        element: <WithAuth Element={Pages.ForumTopicCreationPage} />,
      },
      {
        path: '*',
        element: <Pages.Error404Page />,
      },
    ],
  },
]

const AppRoutes: React.FC = () => useRoutes(routes)

export default AppRoutes
