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
import { collisions, hero, food, enemy } from './data'
import { Boundary, Food, Sprite } from './classes'

const collisionsMap: number[][] = []
const heroMap: number[][] = []
const foodMap: number[][] = []
const enemyMap: number[][] = []

// Размер карты 20*15 тайлов, 1 тайл 40*40 пикселей
for (let i = 0; i < collisions.length; i += 20) {
  collisionsMap.push(collisions.slice(i, 20 + i))
}

for (let i = 0; i < hero.length; i += 20) {
  heroMap.push(hero.slice(i, 20 + i))
}

for (let i = 0; i < food.length; i += 20) {
  foodMap.push(food.slice(i, 20 + i))
}

for (let i = 0; i < enemy.length; i += 20) {
  enemyMap.push(enemy.slice(i, 20 + i))
}

const boundaries: Boundary[] = []
const enemies: Boundary[] = []
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

enemyMap.forEach((row: number[], i: number) => {
  row.forEach((symbol: number, j: number) => {
    if (symbol === 1039) {
      enemies.push(
        new Boundary({
          position: {
            x: j * boundaryWidth,
            y: i * boundaryWidth,
          },
        })
      )
    }
  })
})

// Преобразование координат врага в траекторию его движения
const newEnemies: Boundary[] = []
newEnemies[0] = enemies[0]
newEnemies[1] = enemies[1]
newEnemies[2] = enemies[2]
newEnemies[3] = enemies[3]
newEnemies[4] = enemies[4]
newEnemies[5] = enemies[5]
newEnemies[6] = enemies[7]
newEnemies[7] = enemies[9]
newEnemies[8] = enemies[11]
newEnemies[9] = enemies[13]
newEnemies[10] = enemies[15]
newEnemies[11] = enemies[21]
newEnemies[12] = enemies[20]
newEnemies[13] = enemies[19]
newEnemies[14] = enemies[18]
newEnemies[15] = enemies[17]
newEnemies[16] = enemies[16]
newEnemies[17] = enemies[14]
newEnemies[18] = enemies[12]
newEnemies[19] = enemies[10]
newEnemies[20] = enemies[8]
newEnemies[21] = enemies[6]

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
  const [enemy, setEnemy] = useState<Sprite | null>(null)

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

        if (enemy) {
          enemy.moving = true

          for (let i = 0; i < newEnemies.length; i++) {
            const tileLeftXCoord = newEnemies[i].position.x
            const tileRightXCoord = newEnemies[i].position.x + boundaryWidth
            const tileUpYCoord = newEnemies[i].position.y
            const tileDownYCoord = newEnemies[i].position.y + boundaryWidth

            if (
              tileLeftXCoord <= enemy.position.x &&
              enemy.position.x <= tileRightXCoord &&
              tileUpYCoord <= enemy.position.y &&
              enemy.position.y <= tileDownYCoord &&
              enemy.sprites
            ) {
              let nextIndex = i + 1

              if (nextIndex === newEnemies.length) {
                nextIndex = 0
              }

              const newEnemyLeftXCoord =
                newEnemies[nextIndex].position.x +
                (boundaryWidth - enemy.image.width / 4) / 2
              const newEnemyTopYCoord =
                newEnemies[nextIndex].position.y +
                (boundaryHeight - enemy.image.height) / 2

              if (
                newEnemyLeftXCoord > enemy.position.x &&
                newEnemyTopYCoord === enemy.position.y
              ) {
                enemy.image = enemy.sprites.right
                enemy.position.x += enemy.velocity
              } else if (newEnemyTopYCoord > enemy.position.y) {
                enemy.image = enemy.sprites.down
                enemy.position.y += enemy.velocity
              } else if (newEnemyLeftXCoord < enemy.position.x) {
                enemy.image = enemy.sprites.left
                enemy.position.x -= enemy.velocity
              } else if (newEnemyTopYCoord < enemy.position.y) {
                enemy.image = enemy.sprites.up
                enemy.position.y -= enemy.velocity
              }

              break
            }
          }

          enemy.draw(ctx)
        }
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
      const enemyUpImg = await loadTexture('enemyUp.png')
      const enemyDownImg = await loadTexture('enemyDown.png')
      const enemyLeftImg = await loadTexture('enemyLeft.png')
      const enemyRightImg = await loadTexture('enemyRight.png')

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

      const enemyArray: Sprite[] = []

      enemyMap.forEach((row: number[], i: number) => {
        row.forEach((symbol: number, j: number) => {
          if (symbol === 1039) {
            enemyArray.push(
              new Sprite({
                position: {
                  x:
                    j * boundaryWidth +
                    (boundaryWidth - enemyDownImg.width / 4) / 2,
                  y:
                    i * boundaryHeight +
                    (boundaryHeight - enemyDownImg.height) / 2,
                },
                velocity: 2,
                image: enemyRightImg,
                frames: { max: 4, val: 0, elapsed: 0 },
                sprites: {
                  up: enemyUpImg,
                  down: enemyDownImg,
                  left: enemyLeftImg,
                  right: enemyRightImg,
                },
              })
            )
          }
        })
      })

      const enemySprite = enemyArray[0]
      setEnemy(enemySprite)
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
