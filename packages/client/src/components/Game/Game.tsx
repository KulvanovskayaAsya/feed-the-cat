import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import './Game.css'
import {
  clearGame,
  drawGameTime,
  drawLife,
  getGameTime,
  loadTexture,
  rectangularCollision,
} from './utils'
import {
  heroMap,
  foodMap,
  enemyMap,
  boundaryWidth,
  boundaryHeight,
  boundaries,
  enemies,
} from './data'
import { type Coords, Boundary, Food, Sprite, Background } from './classes'
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

  const [level, setLevel] = useState<Background | null>(null)
  const [foreground, setForeground] = useState<Background | null>(null)
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

  // Функция для начальной инициализации игры
  const run = useCallback(
    async (canvas: HTMLCanvasElement): Promise<void> => {
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

      const levelBackground = new Background({
        position: { x: 0, y: 0 },
        image: levelImg,
      })
      setLevel(levelBackground)

      const foreground = new Background({
        position: { x: 0, y: 0 },
        image: foregroundImg,
      })
      setForeground(foreground)

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
    },
    [
      setLevel,
      setForeground,
      setHero,
      setHeroInitCoords,
      setFoodArray,
      setEnemy,
      setLifeArray,
    ]
  )

  // Функция для обновления игры с частотой около 60 кадров в секунду
  const update = useCallback(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current

    if (canvas && ctx) {
      clearGame(canvas, ctx)

      if (level) {
        level.draw(ctx)
      }

      foodArray.forEach((foodPiece: Food) => {
        foodPiece.draw(ctx)
      })

      const keyPressHandler = (pressedKey: string): void => {
        const canvas: HTMLCanvasElement | null = canvasRef.current

        if (canvas && hero && hero.sprites) {
          let heroImage: HTMLImageElement | undefined = undefined
          let heroVelocityX = 0
          let heroVelocityY = 0
          let isHeroCanvasBoundaryCollision = false
          let indentFromBoundaryX = 0
          let indentFromBoundaryY = 0

          if (pressedKey === 'ArrowUp') {
            heroImage = hero.sprites.up
            heroVelocityX = 0
            heroVelocityY = hero.velocity
            isHeroCanvasBoundaryCollision = hero.position.y < 9
            indentFromBoundaryX = 0
            indentFromBoundaryY = 3
          } else if (pressedKey === 'ArrowDown') {
            heroImage = hero.sprites.down
            heroVelocityX = 0
            heroVelocityY = -hero.velocity
            isHeroCanvasBoundaryCollision =
              hero.position.y + hero.height > canvas.height - 9
            indentFromBoundaryX = 0
            indentFromBoundaryY = -3
          } else if (pressedKey === 'ArrowLeft') {
            heroImage = hero.sprites.left
            heroVelocityX = hero.velocity
            heroVelocityY = 0
            isHeroCanvasBoundaryCollision = hero.position.x < 9
            indentFromBoundaryX = 3
            indentFromBoundaryY = 0
          } else if (pressedKey === 'ArrowRight') {
            heroImage = hero.sprites.right
            heroVelocityX = -hero.velocity
            heroVelocityY = 0
            isHeroCanvasBoundaryCollision =
              hero.position.x + hero.width > canvas.width - 9
            indentFromBoundaryX = -3
            indentFromBoundaryY = 0
          }

          hero.moving = true
          if (hero.sprites && heroImage) {
            hero.image = heroImage
          }

          for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]

            if (
              rectangularCollision(
                hero,
                new Boundary({
                  position: {
                    x: boundary.position.x + indentFromBoundaryX,
                    y: boundary.position.y + indentFromBoundaryY,
                  },
                })
              ) ||
              isHeroCanvasBoundaryCollision
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
            hero.position.x -= heroVelocityX
            hero.position.y -= heroVelocityY
          }
        }
      }

      if (hero) {
        hero.moving = false

        if (pressedKey === 'ArrowUp' && lastKey === 'ArrowUp') {
          keyPressHandler('ArrowUp')
        } else if (pressedKey === 'ArrowDown' && lastKey === 'ArrowDown') {
          keyPressHandler('ArrowDown')
        } else if (pressedKey === 'ArrowLeft' && lastKey === 'ArrowLeft') {
          keyPressHandler('ArrowLeft')
        } else if (pressedKey === 'ArrowRight' && lastKey === 'ArrowRight') {
          keyPressHandler('ArrowRight')
        }

        hero.draw(ctx, FPS)
      }

      if (foreground) {
        foreground.draw(ctx)
      }

      boundaries.forEach((boundary: Boundary) => {
        boundary.draw(ctx)
      })

      if (enemy) {
        enemy.moving = true

        const enemyVelocity = enemy.velocity

        for (let i = 0; i < enemies.length; i++) {
          const tileLeftXCoord = enemies[i].position.x
          const tileRightXCoord = enemies[i].position.x + boundaryWidth
          const tileUpYCoord = enemies[i].position.y
          const tileDownYCoord = enemies[i].position.y + boundaryWidth

          if (
            tileLeftXCoord <= enemy.position.x &&
            enemy.position.x <= tileRightXCoord &&
            tileUpYCoord <= enemy.position.y &&
            enemy.position.y <= tileDownYCoord &&
            enemy.sprites
          ) {
            let nextIndex = i + 1

            if (nextIndex === enemies.length) {
              nextIndex = 0
            }

            const newEnemyLeftXCoord =
              enemies[nextIndex].position.x +
              (boundaryWidth - enemy.image.width / 4) / 2
            const newEnemyTopYCoord =
              enemies[nextIndex].position.y +
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
      drawLife(ctx, life, lifeArray, FPS)
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
    lifeArray,
    FPS,
    heroInitCoords,
    time,
  ])

  // Функция-обработчик нажатия клавиш
  const onKeyDown = useCallback(
    (
      event: KeyboardEvent,
      setPressedKey: Dispatch<SetStateAction<string>>,
      setLastKey: Dispatch<SetStateAction<string>>
    ): void => {
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
    },
    [setPressedKey, setLastKey]
  )

  // Функция-обработчик отпускания клавиш
  const onKeyUp = useCallback(
    (
      event: KeyboardEvent,
      setPressedKey: Dispatch<SetStateAction<string>>
    ): void => {
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
    },
    [setPressedKey, setLastKey]
  )

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

      update()

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
