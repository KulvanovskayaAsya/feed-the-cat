import App from './App'
import { render, screen } from '@testing-library/react'

const appContent = 'FEED THE'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<App />)
  expect(screen.findByText(appContent)).toBeDefined()
})
