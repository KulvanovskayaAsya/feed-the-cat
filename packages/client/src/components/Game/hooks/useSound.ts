import { useEffect, useState } from 'react'
import { CustomAudioBuffer } from '../classes'

export const useSound = (currentLevel: number) => {
  const [audioBuffer, setAudioBuffer] = useState<CustomAudioBuffer | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    const getAudioData = async (): Promise<{
      buffer: CustomAudioBuffer
      context: AudioContext
    } | void> => {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)()
        const sounds = [
          `src/assets/enemy.mp3`,
          `src/assets/levels/${currentLevel}/level.mp3`,
          `src/assets/levels/${currentLevel}/food/food.mp3`,
          `src/assets/levels/${currentLevel}/food/extra_food.mp3`,
        ]
        const buffer = new CustomAudioBuffer(context, sounds)
        await buffer.loadAll()

        return { buffer, context }
      } catch (error) {
        console.log(error)
      }
    }

    getAudioData().then(data => {
      if (data) {
        const { buffer, context } = data
        setAudioBuffer(buffer)
        setAudioContext(context)
      }
    })
  }, [currentLevel])

  return { audioBuffer, audioContext }
}
