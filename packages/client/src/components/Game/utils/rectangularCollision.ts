import { GameObject } from '../classes'

// Функция для определения пересечения двух прямоугольников
export function rectangularCollision(
  rectangle1: GameObject,
  rectangle2: GameObject
): boolean {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}
