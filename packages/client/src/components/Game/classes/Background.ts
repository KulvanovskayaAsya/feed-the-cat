import { GameObject, GameObjectProps } from './GameObject'

export interface BackgroundProps extends GameObjectProps {
  image: HTMLImageElement
}

// Класс заднего и переднего изображений
export class Background extends GameObject {
  image: HTMLImageElement

  constructor(props: BackgroundProps) {
    super(props)

    const { image } = props

    this.image = image
    this.width = image.width
    this.height = image.height
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
