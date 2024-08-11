import { RootState } from '..'

export const all = (state: RootState) => state.user

export const user = (state: RootState) => all(state).user
export const isAuth = (state: RootState) => all(state).isAuth
export const error = (state: RootState) => all(state).error
export const isLoading = (state: RootState) => all(state).loading
