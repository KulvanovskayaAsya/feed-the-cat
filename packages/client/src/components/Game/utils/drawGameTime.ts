import { getContextTextSettings } from './getContextTextSettings'

// Функция, отображающая оставшееся время игры
export const drawGameTime = (
  ctx: CanvasRenderingContext2D,
  time: string,
  x: number,
  y: number
): void => {
  getContextTextSettings(ctx)
  ctx.strokeText(time, x, y)
  ctx.fillText(time, x, y)
}
