import { type FC, useEffect, useRef, useState } from 'react'
import './Game.css'
import { clearGame, loadTexture } from './utils'

const run = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null
): Promise<void> => {
  const levelImg = await loadTexture('level.png')
  const heroImg = await loadTexture('heroDown.png')

  if (ctx) {
    ctx.drawImage(levelImg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      heroImg,
      0,
      0,
      heroImg.width / 4,
      heroImg.height,
      heroImg.width / 2,
      canvas.height / 2 + heroImg.height * 2,
      heroImg.width / 4,
      heroImg.height
    )
  }
}

export interface GameProps {
  width?: number
  height?: number
}

export const Game: FC<GameProps> = (props: GameProps) => {
  const { width = 800, height = 600 } = props

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  const [FPS, setFPS] = useState<number>(1)

  useEffect(() => {
    if (ctx) {
      let animationFrameId = 0
      let lastFrame = performance.now()
      const alpha = 0.1

      const render = (timestamp: number) => {
        animationFrameId = window.requestAnimationFrame(render)

        if (timestamp < lastFrame + 1000 / 60) {
          return
        }

        const dt = (timestamp - lastFrame) / 1000
        lastFrame = timestamp
        const newFPS = FPS + (1 - alpha) * (1 / dt - FPS)

        setFPS(newFPS)
      }

      render(0)

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current

    if (canvas) {
      setCtx(canvas && canvas.getContext('2d'))
      clearGame(canvas, ctx)
      run(canvas, ctx).then()
    }
  }, [ctx])

  return (
    <>
      <canvas
        className="canvas"
        id="canvas"
        width={width}
        height={height}
        ref={canvasRef}></canvas>
      <p>{FPS}</p>
    </>
  )
}
