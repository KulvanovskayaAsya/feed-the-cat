import { Coords } from './Sprite'

export interface BoundaryProps {
  position: Coords
  width?: number
  height?: number
}

export class Boundary {
  width: number
  height: number
  position: Coords

  constructor(props: BoundaryProps) {
    const { position, width = 40, height = 40 } = props

    this.position = position
    this.width = width
    this.height = height
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
