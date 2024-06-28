import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { leaderboardController } from '@/controllers/leaderboard'
import { LeaderboardResponse } from '@/api/leaderboard-api'

export const add = createAsyncThunk(
  'leaderboard/add',
  leaderboardController.addNewLeaderToLeaderboard
)
export const get = createAsyncThunk(
  'leaderboard/get',
  leaderboardController.getTeamLeaderboard
)

interface LeaderboardState {
  leaderboard: LeaderboardResponse[]
  error: string | null
  loading: boolean
}

const initialState: LeaderboardState = {
  leaderboard: [],
  error: '',
  loading: false,
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(add.fulfilled, state => {
        state.loading = false
        state.error = ''
      })
      .addCase(add.pending, state => {
        state.loading = true
      })
      .addCase(add.rejected, (state, action) => {
        state.loading = false
        const { error } = action

        if (typeof error.message !== 'string') {
          return
        }

        state.error = error.message
      })
      .addCase(
        get.fulfilled,
        (state, action: PayloadAction<LeaderboardResponse[]>) => {
          state.leaderboard = action.payload
          state.loading = false
          state.error = ''
        }
      )
      .addCase(get.pending, state => {
        state.loading = true
      })
      .addCase(get.rejected, (state, action) => {
        state.loading = false
        const { error } = action

        if (typeof error.message !== 'string') {
          return
        }

        state.error = error.message
      })
  },
})

export default leaderboardSlice.reducer
