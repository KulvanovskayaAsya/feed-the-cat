import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  clearGame,
  drawGameTime,
  drawLife,
  getGameTime,
  rectangularCollision,
} from '../utils'
import { Background, Boundary, type Coords, Food, Sprite } from '../classes'
import { boundaries, boundaryHeight, boundaryWidth, enemies } from '../data'

// Хук для обновления игры с частотой около 60 кадров в секунду
export function useUpdateGame(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  ctx: CanvasRenderingContext2D | null,
  level: Background | null,
  foreground: Background | null,
  hero: Sprite | null,
  setFoodArray: Dispatch<SetStateAction<Food[]>>,
  enemy: Sprite | null,
  lifeArray: Sprite[],
  pressedKey: string,
  lastKey: string,
  foodArray: Food[],
  heroInitCoords: Coords | null,
  time: number,
  scores: number,
  setScores: Dispatch<SetStateAction<number>>,
  life: number,
  setLife: Dispatch<SetStateAction<number>>
) {
  const [FPS, setFPS] = useState<number>(1)
  const [moving, setMoving] = useState<boolean>(true)

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
}
