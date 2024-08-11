import { useEffect, useState } from 'react'
import { CustomAudioBuffer, Sound } from '../classes'
import enemySound from '@/assets/enemy.mp3'

export const useSound = (currentLevel: number, volume: number) => {
  const [audioBuffer, setAudioBuffer] = useState<CustomAudioBuffer | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [levelSound, setLevelSound] = useState<Sound | null>(null)

  useEffect(() => {
    const getAudioData = async (): Promise<{
      buffer: CustomAudioBuffer
      context: AudioContext
      levelSound: Sound | null
    } | void> => {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)()
        const sounds = [
          enemySound,
          new URL(
            `/src/assets/levels/${currentLevel}/level.mp3`,
            import.meta.url
          ).href,
          new URL(
            `/src/assets/levels/${currentLevel}/food/food.mp3`,
            import.meta.url
          ).href,
          new URL(
            `/src/assets/levels/${currentLevel}/food/extra_food.mp3`,
            import.meta.url
          ).href,
        ]
        const buffer = new CustomAudioBuffer(context, sounds)
        await buffer.loadAll()

        if (buffer && context) {
          if (levelSound && levelSound.isSoundPlaying) {
            levelSound.stop()
          }

          setLevelSound(new Sound(context, buffer.getSoundByIndex(1)))
        }

        return { buffer, context, levelSound }
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

  useEffect(() => {
    if (currentLevel && levelSound && !levelSound.isSoundPlaying) {
      levelSound.play()
    }

    return () => {
      if (levelSound && levelSound.isSoundPlaying) {
        levelSound.stop()
      }
    }
  }, [currentLevel, levelSound])

  useEffect(() => {
    levelSound?.setGain()
  }, [volume])

  return { audioBuffer, audioContext }
}
