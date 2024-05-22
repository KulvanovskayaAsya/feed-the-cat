export type GameObjectType = 'Hero' | 'Enemy' | 'Eat' | ''

export interface RectObject {
  top: number
  left: number
  bottom: number
  right: number
}

export interface GameObjectProps {
  x: number
  y: number
}

export class GameObject {
  x: number
  y: number
  type: GameObjectType = ''
  dead = false
  width = 0
  height = 0
  img: HTMLImageElement | undefined = undefined

  constructor(props: GameObjectProps) {
    const { x, y } = props

    this.x = x
    this.y = y
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }

  rectFromGameObject(): RectObject {
    return {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width,
    }
  }
}
