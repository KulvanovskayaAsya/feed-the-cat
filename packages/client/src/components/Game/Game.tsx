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
import { collisions, hero, food } from './data'
import { Boundary, Food, Sprite } from './classes'

const collisionsMap: number[][] = []
const heroMap: number[][] = []
const foodMap: number[][] = []

// Размер карты 20*15 тайлов, 1 тайл 40*40 пикселей
for (let i = 0; i < collisions.length; i += 20) {
  collisionsMap.push(collisions.slice(i, 20 + i))
}

for (let i = 0; i < collisions.length; i += 20) {
  heroMap.push(hero.slice(i, 20 + i))
}

for (let i = 0; i < collisions.length; i += 20) {
  foodMap.push(food.slice(i, 20 + i))
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
  const [foreground, setForeground] = useState<Sprite | null>(null)
  const [hero, setHero] = useState<Sprite | null>(null)
  const [foodArray, setFoodArray] = useState<Array<Food>>([])

  const [moving, setMoving] = useState<boolean>(true)
  const [scores, setScores] = useState<number>(0)
  const [time, setTime] = useState<number>(2 * 60)
  const [isWin, setIsWin] = useState<boolean>(false)

  // Функция, возвращающая оставшееся время игры
  const getGameTime = (time: number): string => {
    const gameTime = new Date(time * 1000)

    const gameTimeString = gameTime.toLocaleTimeString([], {
      minute: '2-digit',
      second: '2-digit',
    })

    return gameTimeString
  }

  // Эффект для обновления оставшегося времени игры
  useEffect(() => {
    const timerID = setInterval(() => setTime(prevTime => prevTime - 1), 1000)

    return () => {
      clearInterval(timerID)
    }
  }, [time, setTime])

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

      if (canvas && ctx) {
        if (level) {
          level.draw(ctx)
        }

        foodArray.forEach((foodPiece: Food) => {
          foodPiece.draw(ctx)
        })

        if (hero) {
          hero.moving = false

          if (pressedKey === 'ArrowUp' && lastKey === 'ArrowUp') {
            hero.moving = true
            if (hero.sprites) {
              hero.image = hero.sprites.up
            }

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
                ) ||
                hero.position.y < 9
              ) {
                console.log('colliding')
                setMoving(false)
                break
              } else {
                setMoving(true)
              }
            }

            for (const foodPiece of foodArray) {
              if (rectangularCollision(hero, foodPiece)) {
                setScores((prevScores: number) => prevScores + foodPiece.score)

                setFoodArray((prevFoodArray: Food[]) =>
                  prevFoodArray.filter(prevFoodPiece => {
                    return prevFoodPiece !== foodPiece
                  })
                )

                break
              }
            }

            if (moving) {
              hero.position.y -= hero.velocity
            }
          } else if (pressedKey === 'ArrowDown' && lastKey === 'ArrowDown') {
            hero.moving = true
            if (hero.sprites) {
              hero.image = hero.sprites.down
            }

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
                ) ||
                hero.position.y + hero.height > canvas.height - 9
              ) {
                console.log('colliding')
                setMoving(false)
                break
              } else {
                setMoving(true)
              }
            }

            for (const foodPiece of foodArray) {
              if (rectangularCollision(hero, foodPiece)) {
                setScores((prevScores: number) => prevScores + foodPiece.score)

                setFoodArray((prevFoodArray: Food[]) =>
                  prevFoodArray.filter(prevFoodPiece => {
                    return prevFoodPiece !== foodPiece
                  })
                )

                break
              }
            }

            if (moving) {
              hero.position.y += hero.velocity
            }
          } else if (pressedKey === 'ArrowLeft' && lastKey === 'ArrowLeft') {
            hero.moving = true
            if (hero.sprites) {
              hero.image = hero.sprites.left
            }

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
                hero.position.x < 9
              ) {
                console.log('colliding')
                setMoving(false)
                break
              } else {
                setMoving(true)
              }
            }

            for (const foodPiece of foodArray) {
              if (rectangularCollision(hero, foodPiece)) {
                setScores((prevScores: number) => prevScores + foodPiece.score)

                setFoodArray((prevFoodArray: Food[]) =>
                  prevFoodArray.filter(prevFoodPiece => {
                    return prevFoodPiece !== foodPiece
                  })
                )

                break
              }
            }

            if (moving) {
              hero.position.x -= hero.velocity
            }
          } else if (pressedKey === 'ArrowRight' && lastKey === 'ArrowRight') {
            hero.moving = true
            if (hero.sprites) {
              hero.image = hero.sprites.right
            }

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
                ) ||
                hero.position.x + hero.width > canvas.width - 9
              ) {
                console.log('colliding')
                setMoving(false)
                break
              } else {
                setMoving(true)
              }
            }

            for (const foodPiece of foodArray) {
              if (rectangularCollision(hero, foodPiece)) {
                setScores((prevScores: number) => prevScores + foodPiece.score)

                setFoodArray((prevFoodArray: Food[]) =>
                  prevFoodArray.filter(prevFoodPiece => {
                    return prevFoodPiece !== foodPiece
                  })
                )

                break
              }
            }

            if (moving) {
              hero.position.x += hero.velocity
            }
          }

          hero.draw(ctx)
        }

        if (foreground) {
          foreground.draw(ctx)
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
  }, [
    hero,
    pressedKey,
    lastKey,
    moving,
    setMoving,
    foodArray,
    foreground,
    boundaries,
    scores,
  ])

  // Эффект для начальной инициализации игры
  useEffect(() => {
    const run = async (): Promise<void> => {
      const levelImg = await loadTexture('level.png')
      const foregroundImg = await loadTexture('foregroundObjects.png')
      const heroUpImg = await loadTexture('heroUp.png')
      const heroDownImg = await loadTexture('heroDown.png')
      const heroLeftImg = await loadTexture('heroLeft.png')
      const heroRightImg = await loadTexture('heroRight.png')
      const chickenImg = await loadTexture('chicken.png')
      const hotdogImg = await loadTexture('hotdog.png')
      const pizzaImg = await loadTexture('pizza.png')

      const levelSprite = new Sprite({
        position: { x: 0, y: 0 },
        velocity: 0,
        image: levelImg,
      })
      setLevel(levelSprite)

      const foregroundSprite = new Sprite({
        position: { x: 0, y: 0 },
        velocity: 0,
        image: foregroundImg,
      })
      setForeground(foregroundSprite)

      const heroArray: Sprite[] = []

      heroMap.forEach((row: number[], i: number) => {
        row.forEach((symbol: number, j: number) => {
          if (symbol === 1035) {
            heroArray.push(
              new Sprite({
                position: {
                  x:
                    j * boundaryWidth +
                    (boundaryWidth - heroDownImg.width / 4) / 2,
                  y:
                    i * boundaryHeight +
                    (boundaryHeight - heroDownImg.height) / 2,
                },
                velocity: 1,
                image: heroDownImg,
                frames: { max: 4, val: 0, elapsed: 0 },
                sprites: {
                  up: heroUpImg,
                  down: heroDownImg,
                  left: heroLeftImg,
                  right: heroRightImg,
                },
              })
            )
          }
        })
      })

      const heroSprite = heroArray[0]
      setHero(heroSprite)

      const foodArr: Food[] = []

      foodMap.forEach((row: number[], i: number) => {
        row.forEach((symbol: number, j: number) => {
          if (symbol === 1036) {
            const chicken = new Food({
              position: {
                x: j * boundaryWidth + (boundaryWidth - chickenImg.width) / 2,
                y:
                  i * boundaryHeight + (boundaryHeight - chickenImg.height) / 2,
              },
              image: chickenImg,
              score: 100,
            })

            foodArr.push(chicken)
          } else if (symbol === 1037) {
            const hotdog = new Food({
              position: {
                x: j * boundaryWidth + (boundaryWidth - hotdogImg.width) / 2,
                y: i * boundaryHeight + (boundaryHeight - hotdogImg.height) / 2,
              },
              image: hotdogImg,
              score: 200,
            })

            foodArr.push(hotdog)
          } else if (symbol === 1038) {
            const pizza = new Food({
              position: {
                x: j * boundaryWidth + (boundaryWidth - pizzaImg.width) / 2,
                y: i * boundaryHeight + (boundaryHeight - pizzaImg.height) / 2,
              },
              image: pizzaImg,
              score: 300,
            })

            foodArr.push(pizza)
          }
        })
      })

      setFoodArray(foodArr)
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

  // Эффект для определения победы в игре
  useEffect(() => {
    if (time > 0 && foodArray.length === 0 && scores > 0) {
      setIsWin(true)
    } else {
      setIsWin(false)
    }
  }, [time, setIsWin, foodArray, scores])

  return (
    <>
      <canvas
        className="canvas"
        id="canvas"
        width={width}
        height={height}
        ref={canvasRef}></canvas>
      <p>FPS: {FPS}</p>
      <p>Time: {getGameTime(time)}</p>
      <p>Scores: {scores}</p>
      <p>Is win: {isWin ? 'Yes' : 'No'}</p>
    </>
  )
}
