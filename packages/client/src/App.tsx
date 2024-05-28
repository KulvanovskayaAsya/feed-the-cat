import { useEffect } from 'react'
import './App.css'
import { GamePage } from './pages'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData().then()
  }, [])
  return <GamePage />
}

export default App
