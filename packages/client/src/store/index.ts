import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import { useDispatch } from 'react-redux'
import serviceSlice from './slices/serviceSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    service: serviceSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
