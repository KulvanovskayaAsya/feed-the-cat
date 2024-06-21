import { getContextTextSettings } from './getContextTextSettings'

// Функция, отображающая набранные очки
export const drawScores = (
  ctx: CanvasRenderingContext2D,
  scores: number,
  x: number,
  y: number
): void => {
  getContextTextSettings(ctx)

  const text = `SCORES: ${scores}`

  ctx.strokeText(text, x, y)
  ctx.fillText(text, x, y)
}
