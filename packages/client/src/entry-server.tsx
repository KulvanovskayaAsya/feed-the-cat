import ReactDOM from 'react-dom/server'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { fetchUserThunk } from '@/store/slices/userSlice'
import { reducer } from './store'
import App from './App'

export const render = async () => {
  const store = configureStore({
    reducer,
  })

  await store.dispatch(fetchUserThunk())

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
