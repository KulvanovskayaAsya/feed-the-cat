import { RootState } from '..'

export const all = (state: RootState) => state.leaderboard

export const leaderboard = (state: RootState) => all(state).leaderboard
export const error = (state: RootState) => all(state).error
export const isLoading = (state: RootState) => all(state).loading
