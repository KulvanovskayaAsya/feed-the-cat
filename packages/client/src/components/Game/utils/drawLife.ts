import { Sprite } from '../classes'

// Функция, отображающая жизни игрока
export const drawLife = (
  ctx: CanvasRenderingContext2D,
  life: number,
  lifeArray: Sprite[],
  FPS: number
): void => {
  for (let i = 0; i < life; i++) {
    lifeArray[i]?.draw(ctx, FPS)
  }
}
