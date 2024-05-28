// Функция, отображающая оставшееся время игры
export const drawGameTime = (
  ctx: CanvasRenderingContext2D,
  time: string,
  x: number,
  y: number
): void => {
  ctx.font = '36px VT323'
  ctx.fillStyle = 'white'
  ctx.textAlign = 'left'

  ctx.fillText(time, x, y)
}
