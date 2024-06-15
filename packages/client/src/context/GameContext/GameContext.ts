import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface GameData {
  scores: number // набранные очки
  level: number // последний уровень
  life: number // оставшиеся жизни
  time: string // время игры на всех уровнях
  isWin: boolean | null // игрок победил в игре: true - победил, false - проиграл, null - неизвестно
}

export const initialGameData: GameData = {
  scores: 0,
  level: 1,
  life: 3,
  time: '02:00',
  isWin: null,
}

export interface GameContextType {
  gameData: GameData
  setGameData: Dispatch<SetStateAction<GameData>>
}

export const GameContext = createContext<GameContextType>(
  null as unknown as GameContextType
)
export const useGameContext = () => useContext(GameContext)
