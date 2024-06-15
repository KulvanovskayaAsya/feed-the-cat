import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { MOVE_KEYS } from '@/components/Game/data'

// Хук для добавления слушателей событий нажатия и отпускания клавиш
export function usePressedAndLastKey() {
  const [pressedKey, setPressedKey] = useState('')
  const [lastKey, setLastKey] = useState('')

  // Функция-обработчик нажатия клавиш
  const onKeyDown = useCallback(
    (
      event: KeyboardEvent,
      setPressedKey: Dispatch<SetStateAction<string>>,
      setLastKey: Dispatch<SetStateAction<string>>
    ): void => {
      if (Object.values(MOVE_KEYS).includes(event.key)) {
        setPressedKey(event.key)
        setLastKey(event.key)
      }
    },
    [setPressedKey, setLastKey]
  )

  // Функция-обработчик отпускания клавиш
  const onKeyUp = useCallback(
    (
      event: KeyboardEvent,
      setPressedKey: Dispatch<SetStateAction<string>>
    ): void => {
      if (Object.values(MOVE_KEYS).includes(event.key)) {
        setPressedKey('')
      }
    },
    [setPressedKey]
  )

  // Эффект для добавления слушателей событий нажатия и отпускания клавиш
  useEffect(() => {
    const keyDownEventHandler = (event: KeyboardEvent) => {
      onKeyDown(event, setPressedKey, setLastKey)
    }

    const keyUpEventHandler = (event: KeyboardEvent) => {
      onKeyUp(event, setPressedKey)
    }

    window.addEventListener('keydown', keyDownEventHandler)
    window.addEventListener('keyup', keyUpEventHandler)

    return () => {
      window.removeEventListener('keydown', keyDownEventHandler)
      window.removeEventListener('keyup', keyUpEventHandler)
    }
  }, [])

  return { pressedKey, lastKey }
}
