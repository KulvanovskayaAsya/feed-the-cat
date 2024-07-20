import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export interface GameData {
  scores: number // набранные очки
  level: number // последний уровень
  life: number // оставшиеся жизни
  time: string // время игры на всех уровнях
  isWin: boolean | null // игрок победил в игре: true - победил, false - проиграл, null - неизвестно
}

export const initialState: GameData = {
  scores: 0,
  level: 1,
  life: 3,
  time: '02:00',
  isWin: null,
}

export const fetchGameDataThunk = createAsyncThunk(
  'game/fetchGameDataThunk',
  async () => {
    return initialState
  }
)

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameData(state, action: PayloadAction<GameData>) {
      return action.payload
    },
    updateGameData(state, action: PayloadAction<Partial<GameData>>) {
      return { ...state, ...action.payload }
    },
    resetGameData(state) {
      return initialState
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGameDataThunk.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const { setGameData, updateGameData, resetGameData } = gameSlice.actions

export const selectGameData = (state: RootState) => state.game

export default gameSlice.reducer
