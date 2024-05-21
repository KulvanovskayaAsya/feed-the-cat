import { useEffect } from 'react'
import { Game } from './components/Game'
import './App.css'

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
  return <Game />
}

export default App
