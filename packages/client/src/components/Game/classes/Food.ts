import { GameObject, GameObjectProps } from './GameObject'

export interface FoodProps extends GameObjectProps {
  image: HTMLImageElement
  score: number
}

// Класс еды
export class Food extends GameObject {
  image: HTMLImageElement
  score: number

  constructor(props: FoodProps) {
    super(props)

    const { image, score } = props

    this.image = image
    this.width = image.width
    this.height = image.height
    this.score = score
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
