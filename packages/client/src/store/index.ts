import { createStore } from 'redux'
import reducer from './reducers'

export default function configureStore(
  preloadedState: Partial<{ user: never; count: never }> | undefined
) {
  // Заменяем первый аргумент в вызове на reducer
  const store = createStore(reducer, preloadedState)
  return store
}
