import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const appContent = 'FEED THE'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

const initialState = { text: 'Hello World' }
const mockStore = configureStore()
let store

test('Example test', async () => {
  store = mockStore(initialState)
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.findByText(appContent)).toBeDefined()
})
