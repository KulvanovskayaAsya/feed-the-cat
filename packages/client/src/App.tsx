import { useEffect, useState } from 'react'
import './App.css'
import { GameContext, type GameData, initialGameData } from './context'
import { GamePage } from './pages'

function App() {
  const [gameData, setGameData] = useState<GameData>(initialGameData)

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData().then()
  }, [])
  return (
    <GameContext.Provider value={{ gameData, setGameData }}>
      <GamePage />
    </GameContext.Provider>
  )
}

export default App
