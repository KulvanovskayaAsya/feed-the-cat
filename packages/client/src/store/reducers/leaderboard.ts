import { LeaderboardData } from '@/api/leaderboard-api'

type LoadStatus = 'success' | 'pending' | 'failed' | 'error'
type Nullable<T> = T | null

type LeaderboardState = {
  item: Nullable<[{ data: LeaderboardData }]>
  status: LoadStatus
}

const actions = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  SET_STATUS: 'SET_STATUS',
}

const defaultState: LeaderboardState = {
  status: 'error',
  item: null,
}

interface ItemActionType {
  type: keyof typeof actions
  status: LoadStatus
}

export function leaderboardReducer(
  state: LeaderboardState = defaultState,
  { type, status }: ItemActionType
) {
  switch (type) {
    case actions.SET_STATUS:
      return {
        ...state,
        status,
      }
    default:
      return state
  }
}

export function setLoadingStatus(status: LoadStatus) {
  return { type: actions.SET_STATUS, status }
}
