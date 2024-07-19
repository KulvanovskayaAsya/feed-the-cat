import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export interface GameData {
  scores: number
  level: number
  life: number
  time: string
  isWin: boolean | null
}

const initialState: GameData = {
  scores: 0,
  level: 1,
  life: 3,
  time: '02:00',
  isWin: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setGameData: (state, action: PayloadAction<GameData>) => {
      state.scores = action.payload.scores
      state.level = action.payload.level
      state.life = action.payload.life
      state.time = action.payload.time
      state.isWin = action.payload.isWin
    },
    updateScores: (state, action: PayloadAction<number>) => {
      state.scores += action.payload
    },
    updateLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload
    },
    updateLife: (state, action: PayloadAction<number>) => {
      state.life = action.payload
    },
    updateTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload
    },
    updateIsWin: (state, action: PayloadAction<boolean | null>) => {
      state.isWin = action.payload
    },
  },
})

export const {
  setGameData,
  updateScores,
  updateLevel,
  updateLife,
  updateTime,
  updateIsWin,
} = gameSlice.actions

export const selectGameData = (state: RootState) => state.game

export default gameSlice.reducer
