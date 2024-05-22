type Coords = { x: number; y: number }

export interface SpriteProps {
  position: Coords
  velocity: number
  image: HTMLImageElement
}

export class Sprite {
  position: Coords
  velocity: number
  image: HTMLImageElement

  constructor(props: SpriteProps) {
    const { position, velocity, image } = props

    this.position = position
    this.velocity = velocity
    this.image = image
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.image.width,
        this.image.height
      )
    }
  }
}
