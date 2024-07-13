import React from 'react'
import ReactDOM from 'react-dom/server'
import './index.css'
import { LeaderboardPage } from './pages'

export const render = () => ReactDOM.renderToString(<LeaderboardPage />)
