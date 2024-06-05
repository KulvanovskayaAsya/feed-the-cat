import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { GameContext, type GameData, initialGameData } from './context'
import AppRoutes from './router/routes'
import { ConfigProvider } from 'antd'

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
      <Router>
        <ConfigProvider
          theme={{
            token: {
              fontSize: 24,
              marginLG: 40,
              fontFamily: 'VT323',
              colorPrimary: '#fff',
              borderRadius: 0,
              colorBgContainer: '#fff',
              colorError: '#FF5B5B',
              colorLink: '#141414',
            },
          }}>
          <AppRoutes />
        </ConfigProvider>
      </Router>
    </GameContext.Provider>
  )
}

export default App
