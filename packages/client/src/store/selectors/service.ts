import { RootState } from '..'

export const all = (state: RootState) => state.service

export const service_id = (state: RootState) => all(state).service_id
export const error = (state: RootState) => all(state).error
export const isLoading = (state: RootState) => all(state).loading
