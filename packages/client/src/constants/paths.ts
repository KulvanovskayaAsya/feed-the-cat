export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  GAME: '/game',
  PROFILE: '/profile',
  LEADERBOARD: '/leaderboard',
  FORUM: '/forum',
  TOPIC: (topicId: string | false) => `/forum/topic/${topicId || ':topicId'}`,
  TOPIC_CREATE: '/forum/topic/create',
  REST: '*',
}
