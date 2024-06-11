import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import {
  GameContext,
  type GameData,
  initialGameData,
  AuthContext,
  type AuthData,
  initialAuthData,
} from './context'
import AppRoutes from './router/routes'
import { ConfigProvider } from 'antd'
import theme from '@/styles/theme'

function App() {
  const [gameData, setGameData] = useState<GameData>(initialGameData)
  const [authData, setAuthData] = useState<AuthData>(initialAuthData)

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
    <AuthContext.Provider value={{ authData, setAuthData }}>
      <GameContext.Provider value={{ gameData, setGameData }}>
        <Router>
          <ConfigProvider
            theme={{
              token: {
                fontSize: 24,
                fontFamily: 'VT323',
                colorPrimary: '#fff',
                borderRadius: 0,
                colorBgContainer: '#fff',
                colorError: theme.color.error,
                colorLink: theme.color.link,
              },
            }}>
            <AppRoutes />
          </ConfigProvider>
        </Router>
      </GameContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
