import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

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
      switch (event.key) {
        case 'ArrowUp': {
          setPressedKey('ArrowUp')
          setLastKey('ArrowUp')
          break
        }
        case 'ArrowDown': {
          setPressedKey('ArrowDown')
          setLastKey('ArrowDown')
          break
        }
        case 'ArrowLeft': {
          setPressedKey('ArrowLeft')
          setLastKey('ArrowLeft')
          break
        }
        case 'ArrowRight': {
          setPressedKey('ArrowRight')
          setLastKey('ArrowRight')
          break
        }
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
      switch (event.key) {
        case 'ArrowUp': {
          setPressedKey('')
          break
        }
        case 'ArrowDown': {
          setPressedKey('')
          break
        }
        case 'ArrowLeft': {
          setPressedKey('')
          break
        }
        case 'ArrowRight': {
          setPressedKey('')
          break
        }
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
