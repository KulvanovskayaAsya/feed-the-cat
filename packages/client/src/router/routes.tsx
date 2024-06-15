import { useRoutes } from 'react-router-dom'
import * as Pages from '../pages'
import { BaseLayout } from '../layouts/BaseLayout'
import { WithAuth } from '@/utils/HOCs'
import { PATHS } from '@/constants'

const routes = [
  {
    path: PATHS.HOME,
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Pages.HomePage />,
      },
      {
        path: PATHS.LOGIN,
        element: <WithAuth Element={Pages.LoginPage} />,
      },
      {
        path: PATHS.REGISTRATION,
        element: <WithAuth Element={Pages.RegistrationPage} />,
      },
      { path: PATHS.GAME, element: <WithAuth Element={Pages.GamePage} /> },
      {
        path: PATHS.PROFILE,
        element: <WithAuth Element={Pages.ProfilePage} />,
      },
      {
        path: PATHS.LEADERBOARD,
        element: <WithAuth Element={Pages.LeaderboardPage} />,
      },
      {
        path: PATHS.FORUM,
        element: <WithAuth Element={Pages.ForumPage} />,
      },
      {
        path: PATHS.TOPIC(false),
        element: <WithAuth Element={Pages.ForumTopicPage} />,
      },
      {
        path: PATHS.TOPIC_CREATE,
        element: <WithAuth Element={Pages.ForumTopicCreationPage} />,
      },
      {
        path: PATHS.REST,
        element: <Pages.Error404Page />,
      },
    ],
  },
]

const AppRoutes: React.FC = () => useRoutes(routes)

export default AppRoutes
