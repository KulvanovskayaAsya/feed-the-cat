import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import './Game.css'
import { clearGame, loadTexture } from './utils'
import { Sprite } from './classes'

// Функция-обработчика нажатия клавиш
const onKeyDown = (
  event: KeyboardEvent,
  setPressedKey: Dispatch<SetStateAction<string>>,
  setLastKey: Dispatch<SetStateAction<string>>
) => {
  switch (event.key) {
    case 'ArrowUp': {
      setPressedKey('ArrowUp')
      setLastKey('ArrowUp')
      break
    }
    case 'ArrowDown': {
      setPressedKey('ArrowDown')
      setLastKey('ArrowDown')
      break
    }
    case 'ArrowLeft': {
      setPressedKey('ArrowLeft')
      setLastKey('ArrowLeft')
      break
    }
    case 'ArrowRight': {
      setPressedKey('ArrowRight')
      setLastKey('ArrowRight')
      break
    }
  }
}

// Функция-обработчика отпускания клавиш
const onKeyUp = (
  event: KeyboardEvent,
  setPressedKey: Dispatch<SetStateAction<string>>
) => {
  switch (event.key) {
    case 'ArrowUp': {
      setPressedKey('')
      break
    }
    case 'ArrowDown': {
      setPressedKey('')
      break
    }
    case 'ArrowLeft': {
      setPressedKey('')
      break
    }
    case 'ArrowRight': {
      setPressedKey('')
      break
    }
  }
}

// Функция для отрисовки изображений при загрузке игры
const run = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  setLevel: Dispatch<SetStateAction<Sprite | null>>,
  setHero: Dispatch<SetStateAction<Sprite | null>>
): Promise<void> => {
  const levelImg = await loadTexture('level.png')
  const heroImg = await loadTexture('heroDown.png')

  const level = new Sprite({
    position: { x: 0, y: 0 },
    velocity: 0,
    image: levelImg,
  })
  setLevel(level)

  const hero = new Sprite({
    position: { x: 0, y: 0 },
    velocity: 0,
    image: heroImg,
  })
  setHero(hero)

  if (ctx) {
    // ctx.drawImage(levelImg, 0, 0, canvas.width, canvas.height)
    // ctx.drawImage(
    //   heroImg,
    //   0,
    //   0,
    //   heroImg.width / 4,
    //   heroImg.height,
    //   heroImg.width / 8,
    //   canvas.height / 2 + heroImg.height * 2,
    //   heroImg.width / 4,
    //   heroImg.height
    // )

    level.draw(ctx)
    hero.draw(ctx)
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
  const [pressedKey, setPressedKey] = useState('')
  const [lastKey, setLastKey] = useState('')

  const [level, setLevel] = useState<Sprite | null>(null)
  const [hero, setHero] = useState<Sprite | null>(null)

  // Эффект для обновления игры с частотой около 60 кадров в секунду
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

        const canvas: HTMLCanvasElement | null = canvasRef.current

        if (canvas) {
          clearGame(canvas, ctx)
        }

        if (level) {
          level.draw(ctx)
        }

        if (hero) {
          hero.draw(ctx)
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
  }, [hero])

  // Эффект для начальной инициализации игры
  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current

    if (canvas) {
      setCtx(canvas && canvas.getContext('2d'))
      clearGame(canvas, ctx)
      run(canvas, ctx, setLevel, setHero).then()
    }
  }, [ctx])

  // Эффект для добавления слушателей событий нажатия и отпускания клавиш
  useEffect(() => {
    const keyDownEventHandler = (event: KeyboardEvent) => {
      onKeyDown(event, setPressedKey, setLastKey)
    }

    const keyUpEventHandler = (event: KeyboardEvent) => {
      onKeyUp(event, setPressedKey)
    }

    window.addEventListener('keydown', keyDownEventHandler)
    window.addEventListener('keyup', keyUpEventHandler)

    return () => {
      window.removeEventListener('keydown', keyDownEventHandler)
      window.removeEventListener('keyup', keyUpEventHandler)
    }
  }, [])

  // Эффект для обработки нажатий клавиш
  useEffect(() => {
    if (hero) {
      if (pressedKey === 'ArrowUp' && lastKey === 'ArrowUp') {
        hero.position.y -= 3
      } else if (pressedKey === 'ArrowDown' && lastKey === 'ArrowDown') {
        hero.position.y += 3
      } else if (pressedKey === 'ArrowLeft' && lastKey === 'ArrowLeft') {
        hero.position.x -= 3
      } else if (pressedKey === 'ArrowRight' && lastKey === 'ArrowRight') {
        hero.position.x += 3
      }
    }
  }, [hero, pressedKey, lastKey])

  return (
    <>
      <canvas
        className="canvas"
        id="canvas"
        width={width}
        height={height}
        ref={canvasRef}></canvas>
      <p>{FPS}</p>
      <p>{JSON.stringify(pressedKey, null, 2)}</p>
      <p>{JSON.stringify(lastKey, null, 2)}</p>
    </>
  )
}
