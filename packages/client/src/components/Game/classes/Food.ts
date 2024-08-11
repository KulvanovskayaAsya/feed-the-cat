import { GameObject, GameObjectProps } from './GameObject'
import { CustomAudioBuffer } from '@/components/Game/classes/CustomAudioBuffer'
import { Sound } from '@/components/Game/classes/Sound'

export interface FoodProps extends GameObjectProps {
  image: HTMLImageElement
  score: number
  audioBuffer: CustomAudioBuffer | null
  audioContext: AudioContext | null
  soundId: number
}

// Класс еды
export class Food extends GameObject {
  image: HTMLImageElement
  score: number
  sound?: Sound

  constructor(props: FoodProps) {
    super(props)

    const { image, score, audioBuffer, audioContext, soundId } = props

    this.image = image
    this.width = image.width
    this.height = image.height
    this.score = score

    if (audioBuffer && audioContext) {
      this.sound = new Sound(audioContext, audioBuffer.getSoundByIndex(soundId))
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}
