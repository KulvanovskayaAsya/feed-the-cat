import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userSlice from './slices/userSlice'
import leaderboardSlice from './slices/leaderboardSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    leaderboard: leaderboardSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
