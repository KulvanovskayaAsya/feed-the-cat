export type Coords = { x: number; y: number }
export type Frames = { max: number; val: number; elapsed: number }
export type SpriteImages = {
  up: HTMLImageElement
  down: HTMLImageElement
  left: HTMLImageElement
  right: HTMLImageElement
}

export interface SpriteProps {
  position: Coords
  velocity: number
  image: HTMLImageElement
  frames?: Frames
  sprites?: SpriteImages
}

export class Sprite {
  position: Coords
  velocity: number
  image: HTMLImageElement
  frames: Frames
  width: number
  height: number
  moving: boolean
  sprites?: SpriteImages

  constructor(props: SpriteProps) {
    const {
      position,
      velocity,
      image,
      frames = { max: 1, val: 0, elapsed: 0 },
      sprites,
    } = props

    this.position = position
    this.velocity = velocity
    this.image = image
    this.frames = frames
    this.width = image.width / this.frames.max
    this.height = image.height
    this.moving = false
    this.sprites = sprites
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.frames.val * this.width,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      )

      if (!this.moving) {
        return
      }

      if (this.frames.max > 1) {
        this.frames.elapsed++
      }

      if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) {
          this.frames.val++
        } else {
          this.frames.val = 0
        }
      }
    }
  }
}
