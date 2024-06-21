import { Coords, GameObject, type GameObjectProps } from './GameObject'

export type Frames = { max: number; val: number; elapsed: number }

export type SpriteImages = {
  up: HTMLImageElement
  down: HTMLImageElement
  left: HTMLImageElement
  right: HTMLImageElement
}

export interface SpriteProps extends GameObjectProps {
  velocity: number
  velocityAnimation?: number
  image: HTMLImageElement
  frames?: Frames
  sprites?: SpriteImages
}

// Класс игрока и врага
export class Sprite extends GameObject {
  velocity: number
  velocityAnimation: number
  image: HTMLImageElement
  frames: Frames
  moving: boolean
  sprites?: SpriteImages

  constructor(props: SpriteProps) {
    super(props)

    const {
      velocity,
      velocityAnimation = 6, // 6 раз в секунду по умолчанию
      image,
      frames = { max: 1, val: 0, elapsed: 0 },
      sprites,
    } = props

    this.velocity = velocity
    this.velocityAnimation = velocityAnimation
    this.image = image
    this.frames = frames
    this.width = image.width / this.frames.max
    this.height = image.height
    this.moving = false
    this.sprites = sprites
  }

  draw(ctx: CanvasRenderingContext2D, FPS: number): void {
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

      const animationFramesPerSecond = Math.round(FPS / this.velocityAnimation)

      if (this.frames.elapsed % animationFramesPerSecond === 0) {
        if (this.frames.val < this.frames.max - 1) {
          this.frames.val++
        } else {
          this.frames.val = 0
        }
      }
    }
  }

  init(initCoords: Coords): void {
    if (this.sprites) {
      this.position.x = initCoords.x
      this.position.y = initCoords.y
      this.image = this.sprites.down
      this.frames.val = 0
    }
  }

  setImage(image: HTMLImageElement): void {
    this.image = image
  }

  go(): void {
    this.moving = true
  }

  stop(): void {
    this.moving = false
  }

  hitBorder(velocityX: number, velocityY: number): void {
    this.position.x -= velocityX
    this.position.y -= velocityY
  }

  move(leftXCoord: number, topYCoord: number, velocity: number): void {
    if (this.sprites) {
      if (leftXCoord > this.position.x && topYCoord === this.position.y) {
        this.image = this.sprites.right
        this.position.x += velocity
      } else if (topYCoord > this.position.y) {
        this.image = this.sprites.down
        this.position.y += velocity
      } else if (leftXCoord < this.position.x) {
        this.image = this.sprites.left
        this.position.x -= velocity
      } else if (topYCoord < this.position.y) {
        this.image = this.sprites.up
        this.position.y -= velocity
      }
    }
  }
}
