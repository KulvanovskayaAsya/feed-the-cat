export type Coords = { x: number; y: number }

export interface GameObjectProps {
  position: Coords
  width?: number
  height?: number
}

// Класс базового игрового объекта
export class GameObject {
  width: number
  height: number
  position: Coords

  constructor(props: GameObjectProps) {
    const { position, width = 40, height = 40 } = props

    this.position = position
    this.width = width
    this.height = height
  }
}
