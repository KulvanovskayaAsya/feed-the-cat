import { combineReducers } from 'redux'
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  TypedUseSelectorHook,
  useStore as useStoreBase,
} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import gameReducer from './slices/gameSlice'
import ssrReducer from './slices/ssrSlice'
import serviceReducer from './slices/serviceSlice'
import leaderboardReducer from './slices/leaderboardSlice'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const reducer = combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
  game: gameReducer,
  ssr: ssrReducer,
  service: serviceReducer,
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useDispatchBase
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase
export const useStore: () => typeof store = useStoreBase

export const useAppDispatch = useDispatchBase.withTypes<AppDispatch>()
