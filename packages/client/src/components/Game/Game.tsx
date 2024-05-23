import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import './Game.css'
import { clearGame, loadTexture, rectangularCollision } from './utils'
import { collisions } from './data'
import { hero } from './data'
import { Boundary, Sprite } from './classes'

const collisionsMap: number[][] = []
const heroMap: number[][] = []

// Размер карты 20*15 тайлов, 1 тайл 40*40 пикселей
for (let i = 0; i < collisions.length; i += 20) {
  collisionsMap.push(collisions.slice(i, 20 + i))
}

for (let i = 0; i < collisions.length; i += 20) {
  heroMap.push(hero.slice(i, 20 + i))
}

const boundaries: Boundary[] = []
const boundaryWidth = 40
const boundaryHeight = 40

collisionsMap.forEach((row: number[], i: number) => {
  row.forEach((symbol: number, j: number) => {
    if (symbol === 1034) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * boundaryWidth,
            y: i * boundaryHeight,
          },
        })
      )
    }
  })
})

// Функция-обработчик нажатия клавиш
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

// Функция-обработчик отпускания клавиш
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

  const [moving, setMoving] = useState<boolean>(true)

  // Эффект для обновления игры с частотой около 60 кадров в секунду
  useEffect(() => {
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

      if (ctx) {
        if (level) {
          level.draw(ctx)
        }

        if (hero) {
          if (pressedKey === 'ArrowUp' && lastKey === 'ArrowUp') {
            for (let i = 0; i < boundaries.length; i++) {
              const boundary = boundaries[i]

              if (
                rectangularCollision(
                  hero,
                  new Boundary({
                    position: {
                      x: boundary.position.x,
                      y: boundary.position.y + 3,
                    },
                  })
                )
              ) {
                console.log('colliding')
                setMoving(false)
                break
              } else {
                setMoving(true)
              }
            }

            if (moving) {
              hero.position.y -= hero.velocity
            }
          } else if (pressedKey === 'ArrowDown' && lastKey === 'ArrowDown') {
            for (let i = 0; i < boundaries.length; i++) {
              const boundary = boundaries[i]

              if (
                rectangularCollision(
                  hero,
                  new Boundary({
                    position: {
                      x: boundary.position.x,
                      y: boundary.position.y - 3,
                    },
                  })
                )
              ) {
                console.log('colliding')
                setMoving(false)
                break
              } else {
                setMoving(true)
              }
            }

            if (moving) {
              hero.position.y += hero.velocity
            }
          } else if (pressedKey === 'ArrowLeft' && lastKey === 'ArrowLeft') {
            for (let i = 0; i < boundaries.length; i++) {
              const boundary = boundaries[i]

              if (
                rectangularCollision(
                  hero,
                  new Boundary({
                    position: {
                      x: boundary.position.x + 3,
                      y: boundary.position.y,
                    },
                  })
                ) ||
                hero.position.x < 3
              ) {
                console.log('colliding')
                setMoving(false)
                break
              } else {
                setMoving(true)
              }
            }

            if (moving) {
              hero.position.x -= hero.velocity
            }
          } else if (pressedKey === 'ArrowRight' && lastKey === 'ArrowRight') {
            for (let i = 0; i < boundaries.length; i++) {
              const boundary = boundaries[i]

              if (
                rectangularCollision(
                  hero,
                  new Boundary({
                    position: {
                      x: boundary.position.x - 3,
                      y: boundary.position.y,
                    },
                  })
                )
              ) {
                console.log('colliding')
                setMoving(false)
                break
              } else {
                setMoving(true)
              }
            }

            if (moving) {
              hero.position.x += hero.velocity
            }
          }

          hero.draw(ctx)
        }

        boundaries.forEach((boundary: Boundary) => {
          boundary.draw(ctx)
        })
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
  }, [hero, pressedKey, lastKey, moving, setMoving])

  // Эффект для начальной инициализации игры
  useEffect(() => {
    const run = async (): Promise<void> => {
      const levelImg = await loadTexture('level.png')
      const heroImg = await loadTexture('heroDown.png')

      const level = new Sprite({
        position: { x: 0, y: 0 },
        velocity: 0,
        image: levelImg,
      })
      setLevel(level)

      const heroArray: Sprite[] = []

      heroMap.forEach((row: number[], i: number) => {
        row.forEach((symbol: number, j: number) => {
          if (symbol === 1035) {
            heroArray.push(
              new Sprite({
                position: {
                  x:
                    j * boundaryWidth + (boundaryWidth - heroImg.width / 4) / 2,
                  y: i * boundaryHeight + (boundaryHeight - heroImg.height) / 2,
                },
                velocity: 1,
                image: heroImg,
                frames: { max: 4 },
              })
            )
          }
        })
      })

      const heroSprite = heroArray[0]
      setHero(heroSprite)
    }

    const canvas: HTMLCanvasElement | null = canvasRef.current

    if (canvas) {
      setCtx(canvas.getContext('2d'))
      clearGame(canvas, ctx)
      run().then()
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
