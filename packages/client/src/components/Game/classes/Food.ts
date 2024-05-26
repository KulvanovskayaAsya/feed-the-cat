import { Coords } from './Sprite'

export interface FoodProps {
  position: Coords
  image: HTMLImageElement
  score: number
}

export class Food {
  width: number
  height: number
  position: Coords
  image: HTMLImageElement
  score: number

  constructor(props: FoodProps) {
    const { position, image, score } = props

    this.position = position
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
