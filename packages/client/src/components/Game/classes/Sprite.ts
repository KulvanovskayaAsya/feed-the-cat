export type Coords = { x: number; y: number }
export type Frames = { max: number }

export interface SpriteProps {
  position: Coords
  velocity: number
  image: HTMLImageElement
  frames?: Frames
}

export class Sprite {
  position: Coords
  velocity: number
  image: HTMLImageElement
  frames: Frames
  width: number
  height: number

  constructor(props: SpriteProps) {
    const { position, velocity, image, frames = { max: 1 } } = props

    this.position = position
    this.velocity = velocity
    this.image = image
    this.frames = frames
    this.width = image.width / this.frames.max
    this.height = image.height
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      ctx.drawImage(
        this.image,
        0,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      )
    }
  }
}
