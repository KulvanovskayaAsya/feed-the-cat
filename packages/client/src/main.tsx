import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <App />
  </Provider>
)
