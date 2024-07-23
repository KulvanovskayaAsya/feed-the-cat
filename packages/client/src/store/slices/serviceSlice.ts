import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { oAuthController } from '@/controllers/oauth'
import { ServiceIDGetResponse } from '@/api/o-auth-api'

export const getServiceID = createAsyncThunk(
  'service/getServiceID',
  oAuthController.getServiceID
)

export const postCode = createAsyncThunk(
  'service/postCode',
  oAuthController.postCode
)

interface State {
  service_id: string | null
  code: string | null
  error: string | null
  loading: boolean
}

const initialState: State = {
  service_id: null,
  code: null,
  error: '',
  loading: false,
}

export const userSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getServiceID.fulfilled,
        (state, action: PayloadAction<ServiceIDGetResponse>) => {
          state.service_id = action.payload.service_id
          state.loading = false
          state.error = ''
        }
      )
      .addCase(getServiceID.pending, state => {
        state.loading = true
      })
      .addCase(getServiceID.rejected, state => {
        state.loading = false
      })
      .addCase(postCode.fulfilled, state => {
        state.loading = false
        state.error = ''
      })
      .addCase(postCode.pending, state => {
        state.loading = true
      })
      .addCase(postCode.rejected, (state, action) => {
        state.loading = false
        const { error } = action

        state.error = error.message || null
      })
  },
})

export default userSlice.reducer
