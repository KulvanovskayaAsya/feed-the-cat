import { useRoutes } from 'react-router-dom'
import * as Pages from '../pages'
import { BaseLayout } from '../layouts/BaseLayout'

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
        element: <Pages.LoginPageWithAuth />,
      },
      {
        path: '/registration',
        element: <Pages.RegistrationPageWithAuth />,
      },
      { path: '/game', element: <Pages.GamePageWithAuth /> },
      { path: '/profile', element: <Pages.ProfilePageWithAuth /> },
      {
        path: '/leaderboard',
        element: <Pages.LeaderboardPageWithAuth />,
      },
      {
        path: '/forum',
        element: <Pages.ForumPageWithAuth />,
      },
      {
        path: '/forum/topic/:topicId',
        element: <Pages.ForumTopicPageWithAuth />,
      },
      {
        path: '/forum/topic/create',
        element: <Pages.ForumTopicCreationPageWithAuth />,
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
