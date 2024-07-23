import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { authController } from '@/controllers/auth'
import { User } from '@/api/auth-api'
import { RootState } from '..'
import { SERVER_HOST } from '@/constants'

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
    display_name: 'Аноним',
    phone: '',
    login: '',
    avatar: '',
    email: '',
  },
  error: '',
  isAuth: false,
  loading: false,
}

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUserThunk',
  async (_: void) => {
    const url = `${SERVER_HOST}/api/user`
    return fetch(url).then(res => res.json())
  }
)

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
      .addCase(
        fetchUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload
          state.isAuth = true
          state.loading = false
          state.error = null
        }
      )
      .addCase(fetchUserThunk.pending, state => {
        state.loading = true
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
      })
  },
})

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
