import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface GameData {
  scores: number
  life: number
  time: string
}

export const initialGameData: GameData = {
  scores: 0,
  life: 0,
  time: '00:00',
}

export interface GameContextType {
  gameData: GameData
  setGameData: Dispatch<SetStateAction<GameData>>
}

export const GameContext = createContext<GameContextType>(
  null as unknown as GameContextType
)
export const useGameContext = () => useContext(GameContext)
