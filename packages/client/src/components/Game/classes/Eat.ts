import { Coords } from './Sprite'

export interface EatProps {
  position: Coords
  image: HTMLImageElement
}

export class Eat {
  width: number
  height: number
  position: Coords
  image: HTMLImageElement

  constructor(props: EatProps) {
    const { position, image } = props

    this.position = position
    this.image = image
    this.width = image.width
    this.height = image.height
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
