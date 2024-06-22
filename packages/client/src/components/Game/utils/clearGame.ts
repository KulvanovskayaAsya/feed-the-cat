export const clearGame = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null
): void => {
  if (ctx) {
    ctx && ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}
