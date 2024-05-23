import { Boundary, Sprite } from '../classes'

export function rectangularCollision(
  rectangle1: Sprite | Boundary,
  rectangle2: Sprite | Boundary
): boolean {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}
