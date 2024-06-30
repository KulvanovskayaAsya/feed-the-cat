import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { authController } from '@/controllers/auth'
import { User } from '@/api/auth-api'

export const get = createAsyncThunk('user/get', authController.getUser)
export const create = createAsyncThunk('user/create', authController.createUser)
export const signin = createAsyncThunk('user/signin', authController.signinUser)

interface State {
  user: User
  error: string | null
  isAuth: boolean
  loading: boolean
}

const initialState: State = {
  user: {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
    login: '',
    avatar: '',
    email: '',
  },
  error: '',
  isAuth: false,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(get.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.isAuth = true
        state.loading = false
        state.error = ''
      })
      .addCase(get.pending, state => {
        state.loading = true
      })
      .addCase(get.rejected, state => {
        state.loading = false
        state.isAuth = false
      })
      .addCase(create.fulfilled, state => {
        state.isAuth = true
        state.loading = false
        state.error = ''
      })
      .addCase(create.pending, state => {
        state.loading = true
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false
        const { error } = action

        if (typeof error.message !== 'string') {
          state.isAuth = false
          return
        }

        if (error.message === 'User already in system') {
          state.isAuth = true
          return
        }

        state.error = error.message
      })
      .addCase(signin.fulfilled, state => {
        state.isAuth = true
        state.loading = false
        state.error = ''
      })
      .addCase(signin.pending, state => {
        state.loading = true
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false
        const { error } = action

        if (typeof error.message !== 'string') {
          state.isAuth = false
          return
        }

        if (error.message === 'User already in system') {
          state.isAuth = true
          return
        }

        state.error = error.message
      })
  },
})

export default userSlice.reducer
