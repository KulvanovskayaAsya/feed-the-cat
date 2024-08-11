import { GameObject, GameObjectProps } from './GameObject'

// Класс границы в игре
export class Boundary extends GameObject {
  constructor(props: GameObjectProps) {
    super(props)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
