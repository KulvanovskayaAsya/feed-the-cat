import { combineReducers } from 'redux'
import { userReducer } from './user'
import { leaderboardReducer } from './leaderboard'

// В этом файле будем объединять все редьюсеры в один
export default combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
})
