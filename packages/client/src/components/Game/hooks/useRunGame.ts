import { type MutableRefObject, useCallback, useEffect, useState } from 'react'
import { clearGame, loadTexture } from '../utils'
import {
  getHeroMap,
  getFoodMap,
  getEnemyMap,
  boundaryWidth,
  boundaryHeight,
  HERO,
  CHICKEN,
  HOTDOG,
  PIZZA,
  ENEMY,
  FOOD,
} from '../data'
import { type Coords, Food, Sprite, Background } from '../classes'
import enemyUpImage from '@/assets/enemyUp.png'
import enemyDownImage from '@/assets/enemyDown.png'
import enemyLeftImage from '@/assets/enemyLeft.png'
import enemyRightImage from '@/assets/enemyRight.png'
import lifeImage from '@/assets/life.png'

// Хук для начальной инициализации игры
export function useRunGame(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  life: number,
  currentLevel: number,
  heroVariant: number
) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  const [level, setLevel] = useState<Background | null>(null)
  const [foreground, setForeground] = useState<Background | null>(null)
  const [hero, setHero] = useState<Sprite | null>(null)
  const [heroInitCoords, setHeroInitCoords] = useState<Coords | null>(null)
  const [foodArray, setFoodArray] = useState<Array<Food>>([])
  const [enemy, setEnemy] = useState<Sprite | null>(null)
  const [lifeArray, setLifeArray] = useState<Array<Sprite>>([])

  // Функция для начальной инициализации игры
  const run = useCallback(
    async (canvas: HTMLCanvasElement): Promise<void> => {
      const foodImgArray: HTMLImageElement[] = []

      const levelImg = await loadTexture(
        `src/assets/levels/${currentLevel}/level.png`
      )
      const levelBackground = new Background({
        position: { x: 0, y: 0 },
        image: levelImg,
      })
      setLevel(levelBackground)

      const foregroundImg = await loadTexture(
        `src/assets/levels/${currentLevel}/foregroundObjects.png`
      )
      const foreground = new Background({
        position: { x: 0, y: 0 },
        image: foregroundImg,
      })
      setForeground(foreground)

      const heroUpImg = await loadTexture(
        `./src/assets/heroes/${heroVariant}/heroUp.png`
      )
      const heroDownImg = await loadTexture(
        `./src/assets/heroes/${heroVariant}/heroDown.png`
      )
      const heroLeftImg = await loadTexture(
        `./src/assets/heroes/${heroVariant}/heroLeft.png`
      )
      const heroRightImg = await loadTexture(
        `./src/assets/heroes/${heroVariant}/heroRight.png`
      )

      for (let i = 1; i <= FOOD; i++) {
        const foodImg = await loadTexture(
          `src/assets/levels/${currentLevel}/food/${i}.png`
        )
        foodImgArray.push(foodImg)
      }

      const enemyUpImg = await loadTexture(enemyUpImage)
      const enemyDownImg = await loadTexture(enemyDownImage)
      const enemyLeftImg = await loadTexture(enemyLeftImage)
      const enemyRightImg = await loadTexture(enemyRightImage)
      const lifeImg = await loadTexture(lifeImage)

      const heroMap: number[][] = await getHeroMap(currentLevel)
      const heroArray: Sprite[] = []

      heroMap.forEach((row: number[], i: number) => {
        row.forEach((symbol: number, j: number) => {
          if (symbol === HERO) {
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

      const foodMap: number[][] = await getFoodMap(currentLevel)
      const foodArr: Food[] = []

      foodMap.forEach((row: number[], i: number) => {
        row.forEach((symbol: number, j: number) => {
          if (symbol === CHICKEN) {
            const image = foodImgArray[0]

            const chicken = new Food({
              position: {
                x: j * boundaryWidth + (boundaryWidth - image.width) / 2,
                y: i * boundaryHeight + (boundaryHeight - image.height) / 2,
              },
              image,
              score: 100 * currentLevel,
            })

            foodArr.push(chicken)
          } else if (symbol === HOTDOG) {
            const image = foodImgArray[1]

            const hotdog = new Food({
              position: {
                x: j * boundaryWidth + (boundaryWidth - image.width) / 2,
                y: i * boundaryHeight + (boundaryHeight - image.height) / 2,
              },
              image,
              score: 200 * currentLevel,
            })

            foodArr.push(hotdog)
          } else if (symbol === PIZZA) {
            const image = foodImgArray[2]

            const pizza = new Food({
              position: {
                x: j * boundaryWidth + (boundaryWidth - image.width) / 2,
                y: i * boundaryHeight + (boundaryHeight - image.height) / 2,
              },
              image,
              score: 300 * currentLevel,
            })

            foodArr.push(pizza)
          }
        })
      })

      setFoodArray(foodArr)

      const enemyMap: number[][] = await getEnemyMap(currentLevel)
      const enemyArray: Sprite[] = []

      enemyMap.forEach((row: number[], i: number) => {
        row.forEach((symbol: number, j: number) => {
          if (symbol === ENEMY) {
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
      currentLevel,
      heroVariant,
    ]
  )

  // Эффект для начальной инициализации игры
  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current

    if (canvas) {
      setCtx(canvas.getContext('2d'))
      clearGame(canvas, ctx)
      run(canvas).then()
    }
  }, [canvasRef, ctx, currentLevel])

  return {
    ctx,
    level,
    foreground,
    hero,
    heroInitCoords,
    foodArray,
    setFoodArray,
    enemy,
    lifeArray,
  }
}
