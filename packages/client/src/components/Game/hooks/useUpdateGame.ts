import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  clearGame,
  drawGameTime,
  drawLife,
  drawScores,
  drawLevel,
  getGameTime,
  rectangularCollision,
  setHeroInitCoords,
  movementEnemy,
  movementHero,
  eatingFood,
} from '../utils'
import { type Coords, Background, Boundary, Food, Sprite } from '../classes'
import { getEnemies, getBoundaries, MOVE_KEYS } from '../data'

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
  extraFoodArray: Food[],
  heroInitCoords: Coords | null,
  time: number,
  scores: number,
  setScores: Dispatch<SetStateAction<number>>,
  life: number,
  setLife: Dispatch<SetStateAction<number>>,
  currentLevel: number
) {
  const [FPS, setFPS] = useState(1)
  const [moving, setMoving] = useState(true)
  const boundariesRef = useRef<Boundary[]>([])
  const enemiesRef = useRef<Boundary[]>([])

  useEffect(() => {
    const updateBoundariesAndEnemies = async () => {
      boundariesRef.current = await getBoundaries(currentLevel)
      enemiesRef.current = await getEnemies(currentLevel)
    }

    updateBoundariesAndEnemies().then()
  }, [currentLevel])

  const update = useCallback(async (): Promise<void> => {
    const canvas: HTMLCanvasElement | null = canvasRef.current
    const boundaries = boundariesRef.current
    const enemies = enemiesRef.current

    if (canvas && ctx) {
      clearGame(canvas, ctx)

      if (level) {
        level.draw(ctx)
      }

      foodArray.forEach((foodPiece: Food) => {
        foodPiece.draw(ctx)
      })

      if (hero) {
        hero.stop()

        if (
          pressedKey === lastKey &&
          Object.values(MOVE_KEYS).includes(pressedKey)
        ) {
          movementHero(pressedKey, hero, canvas, boundaries, moving, setMoving)
          eatingFood(
            hero,
            canvas,
            foodArray,
            setFoodArray,
            extraFoodArray,
            setScores,
            currentLevel
          )
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
        enemy.go()

        movementEnemy(enemy, enemies)

        enemy.draw(ctx, FPS)

        if (hero && enemy && heroInitCoords && hero.sprites) {
          if (rectangularCollision(hero, enemy)) {
            setMoving(false)
            setLife(prevLife => prevLife - 1)
            setHeroInitCoords(hero, heroInitCoords)
            hero.draw(ctx, FPS)
          }
        }
      }

      drawGameTime(ctx, getGameTime(time), 27, 50)
      drawScores(ctx, scores, 210, 50)
      drawLevel(ctx, currentLevel, 470, 50)
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
    getBoundaries,
    scores,
    life,
    setLife,
    lifeArray,
    FPS,
    heroInitCoords,
    time,
    currentLevel,
  ])

  useEffect(() => {
    let animationFrameId = 0
    let lastFrame = performance.now()
    const alpha = 0.1

    const render = async (timestamp: number) => {
      animationFrameId = window.requestAnimationFrame(render)

      if (timestamp < lastFrame + 1000 / 60) {
        return
      }

      await update()

      const dt = (timestamp - lastFrame) / 1000
      lastFrame = timestamp
      const newFPS = FPS + (1 - alpha) * (1 / dt - FPS)

      setFPS(newFPS)
    }

    render(0).then()

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
    getBoundaries,
    getEnemies,
    scores,
    life,
    setLife,
    heroInitCoords,
    time,
    currentLevel,
  ])
}
