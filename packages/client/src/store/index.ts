import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userSlice from './slices/userSlice'
import leaderboardSlice from './slices/leaderboardSlice'
import serviceSlice from './slices/serviceSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    leaderboard: leaderboardSlice,
    service: serviceSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
