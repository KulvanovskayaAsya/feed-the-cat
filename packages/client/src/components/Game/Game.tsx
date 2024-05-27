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
import { type Coords, Boundary, Food, Sprite } from './classes'
import levelImage from '../../assets/level.png'
import foregroundImage from '../../assets/foregroundObjects.png'
import heroUpImage from '../../assets/heroUp.png'
import heroDownImage from '../../assets/heroDown.png'
import heroLeftImage from '../../assets/heroLeft.png'
import heroRightImage from '../../assets/heroRight.png'
import chickenImage from '../../assets/chicken.png'
import hotdogImage from '../../assets/hotdog.png'
import pizzaImage from '../../assets/pizza.png'
import enemyUpImage from '../../assets/enemyUp.png'
import enemyDownImage from '../../assets/enemyDown.png'
import enemyLeftImage from '../../assets/enemyLeft.png'
import enemyRightImage from '../../assets/enemyRight.png'
import lifeImage from '../../assets/life.png'

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
  const [heroInitCoords, setHeroInitCoords] = useState<Coords | null>(null)
  const [foodArray, setFoodArray] = useState<Array<Food>>([])
  const [enemy, setEnemy] = useState<Sprite | null>(null)
  const [lifeArray, setLifeArray] = useState<Array<Sprite>>([])

  const [moving, setMoving] = useState<boolean>(true)
  const [scores, setScores] = useState<number>(0)
  const [time, setTime] = useState<number>(2 * 60)
  const [life, setLife] = useState<number>(3)
  const [isWin, setIsWin] = useState<boolean>(false)

  // Функция, возвращающая оставшееся время игры
  const getGameTime = (time: number): string => {
    const gameTime = new Date(time * 1000)

    return gameTime.toLocaleTimeString([], {
      minute: '2-digit',
      second: '2-digit',
    })
  }

  // Функция, отображающая оставшееся время игры
  function drawGameTime(
    ctx: CanvasRenderingContext2D,
    time: string,
    x: number,
    y: number
  ): void {
    ctx.font = '36px VT323'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'left'

    ctx.fillText(time, x, y)
  }

  // Функция, отображающая жизни игрока
  function drawLife(ctx: CanvasRenderingContext2D, life: number): void {
    for (let i = 0; i < life; i++) {
      lifeArray[i].draw(ctx, FPS)
    }
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

      if (canvas && ctx) {
        clearGame(canvas, ctx)

        if (level) {
          level.draw(ctx, FPS)
        }

        foodArray.forEach((foodPiece: Food) => {
          foodPiece.draw(ctx)
        })

        if (hero) {
          hero.moving = false

          const heroVelocity = hero.velocity

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
              hero.position.y -= heroVelocity
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
              hero.position.y += heroVelocity
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
              hero.position.x -= heroVelocity
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
              hero.position.x += heroVelocity
            }
          }

          hero.draw(ctx, FPS)
        }

        if (foreground) {
          foreground.draw(ctx, FPS)
        }

        boundaries.forEach((boundary: Boundary) => {
          boundary.draw(ctx)
        })

        if (enemy) {
          enemy.moving = true

          const enemyVelocity = enemy.velocity

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
                enemy.position.x += enemyVelocity
              } else if (newEnemyTopYCoord > enemy.position.y) {
                enemy.image = enemy.sprites.down
                enemy.position.y += enemyVelocity
              } else if (newEnemyLeftXCoord < enemy.position.x) {
                enemy.image = enemy.sprites.left
                enemy.position.x -= enemyVelocity
              } else if (newEnemyTopYCoord < enemy.position.y) {
                enemy.image = enemy.sprites.up
                enemy.position.y -= enemyVelocity
              }

              break
            }
          }

          enemy.draw(ctx, FPS)

          if (hero && enemy && heroInitCoords && hero.sprites) {
            if (rectangularCollision(hero, enemy)) {
              setMoving(false)
              setLife(prevLife => prevLife - 1)
              hero.position.x = heroInitCoords.x
              hero.position.y = heroInitCoords.y
              hero.image = hero.sprites.down
              hero.frames.val = 0
              hero.draw(ctx, FPS)
            }
          }
        }

        drawGameTime(ctx, getGameTime(time), 27, 50)
        drawLife(ctx, life)
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
    life,
    setLife,
    heroInitCoords,
    time,
  ])

  // Эффект для начальной инициализации игры
  useEffect(() => {
    const run = async (canvas: HTMLCanvasElement): Promise<void> => {
      const levelImg = await loadTexture(levelImage)
      const foregroundImg = await loadTexture(foregroundImage)
      const heroUpImg = await loadTexture(heroUpImage)
      const heroDownImg = await loadTexture(heroDownImage)
      const heroLeftImg = await loadTexture(heroLeftImage)
      const heroRightImg = await loadTexture(heroRightImage)
      const chickenImg = await loadTexture(chickenImage)
      const hotdogImg = await loadTexture(hotdogImage)
      const pizzaImg = await loadTexture(pizzaImage)
      const enemyUpImg = await loadTexture(enemyUpImage)
      const enemyDownImg = await loadTexture(enemyDownImage)
      const enemyLeftImg = await loadTexture(enemyLeftImage)
      const enemyRightImg = await loadTexture(enemyRightImage)
      const lifeImg = await loadTexture(lifeImage)

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
      setHeroInitCoords({
        x: heroArray[0].position.x,
        y: heroArray[0].position.y,
      })

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

      const lifeArr: Sprite[] = []

      for (let i = 0; i < life; i++) {
        const lifeSprite = new Sprite({
          position: {
            x: canvas.width - 97 + i * lifeImg.width,
            y: 25,
          },
          velocity: 0,
          image: lifeImg,
          frames: { max: 1, val: 0, elapsed: 0 },
        })

        lifeArr.push(lifeSprite)
      }

      setLifeArray(lifeArr)
    }

    const canvas: HTMLCanvasElement | null = canvasRef.current

    if (canvas) {
      setCtx(canvas.getContext('2d'))
      clearGame(canvas, ctx)
      run(canvas).then()
    }
  }, [canvasRef, ctx])

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
    if (time > 0 && foodArray.length === 0 && scores > 0 && life > 0) {
      setIsWin(true)
    } else {
      setIsWin(false)
    }
  }, [time, setIsWin, foodArray, scores, life])

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
      <p>Life: {life}</p>
      <p>Is win: {isWin ? 'Yes' : 'No'}</p>
    </>
  )
}
