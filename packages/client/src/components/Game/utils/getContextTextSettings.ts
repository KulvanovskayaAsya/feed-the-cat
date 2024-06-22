export const getContextTextSettings = (ctx: CanvasRenderingContext2D): void => {
  ctx.font = '36px VT323'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 3
  ctx.lineJoin = 'round'
  ctx.miterLimit = 2
  ctx.textAlign = 'left'
  ctx.fillStyle = 'white'
}
