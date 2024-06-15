import { MutableRefObject, useEffect } from 'react'

export const useFullscreen = (
  ref: MutableRefObject<Element>,
  fullscreenKey = 'Enter'
) => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen().catch(err => console.log(err))
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const keyDownEventHandler = (event: KeyboardEvent) => {
      if (event.key === fullscreenKey) {
        toggleFullScreen()
      }
    }

    document.addEventListener('keydown', keyDownEventHandler, false)

    return () => {
      document.removeEventListener('keydown', keyDownEventHandler, false)
    }
  }, [])

  return toggleFullScreen
}
