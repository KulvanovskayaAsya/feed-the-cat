import { getContextTextSettings } from './getContextTextSettings'

// Функция, отображающая текущий уровень
export const drawLevel = (
  ctx: CanvasRenderingContext2D,
  level: number,
  x: number,
  y: number
): void => {
  getContextTextSettings(ctx)

  const text = `LEVEL: ${level}`

  ctx.strokeText(text, x, y)
  ctx.fillText(text, x, y)
}
