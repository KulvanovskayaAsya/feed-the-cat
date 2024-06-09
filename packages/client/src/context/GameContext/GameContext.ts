import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface GameData {
  scores: number // набранные очки
  level: number // последний уровень
  life: number // оставшиеся жизни
  time: string // время игры на всех уровнях
  isWin: boolean // игрок победил в игре: true - да, false - пока нет
}

export const initialGameData: GameData = {
  scores: 0,
  level: 1,
  life: 3,
  time: '02:00',
  isWin: false,
}

export interface GameContextType {
  gameData: GameData
  setGameData: Dispatch<SetStateAction<GameData>>
}

export const GameContext = createContext<GameContextType>(
  null as unknown as GameContextType
)
export const useGameContext = () => useContext(GameContext)
