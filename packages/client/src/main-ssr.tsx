import ReactDOM from 'react-dom/client'
import './index.css'
import { LeaderboardPage } from './pages'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <LeaderboardPage />
)
