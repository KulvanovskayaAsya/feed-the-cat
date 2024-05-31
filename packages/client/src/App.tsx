import { useEffect, useState } from 'react'
import './App.css'
import { GameContext, type GameData, initialGameData } from './context'
import { GamePage } from './pages'

function App() {
  const [gameData, setGameData] = useState<GameData>(initialGameData)

  useEffect(() => {
    const abortController: AbortController = new AbortController()

    const fetchServerData = async (): Promise<void> => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url, { signal: abortController.signal })
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
      .then()
      .catch(error => {
        if (!abortController.signal.aborted) {
          console.log(error)
        }
      })

    return () => {
      abortController.abort()
    }
  }, [])
  return (
    <GameContext.Provider value={{ gameData, setGameData }}>
      <GamePage />
    </GameContext.Provider>
  )
}

export default App
