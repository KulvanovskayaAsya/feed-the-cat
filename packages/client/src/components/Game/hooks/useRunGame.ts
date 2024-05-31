import { type MutableRefObject, useCallback, useEffect, useState } from 'react'
import { clearGame, loadTexture } from '../utils'
import {
  heroMap,
  foodMap,
  enemyMap,
  boundaryWidth,
  boundaryHeight,
  HERO,
  CHICKEN,
  HOTDOG,
  PIZZA,
  ENEMY,
} from '../data'
import { type Coords, Food, Sprite, Background } from '../classes'
import levelImage from '../../../assets/level.png'
import foregroundImage from '../../../assets/foregroundObjects.png'
import heroUpImage from '../../../assets/heroUp.png'
import heroDownImage from '../../../assets/heroDown.png'
import heroLeftImage from '../../../assets/heroLeft.png'
import heroRightImage from '../../../assets/heroRight.png'
import chickenImage from '../../../assets/chicken.png'
import hotdogImage from '../../../assets/hotdog.png'
import pizzaImage from '../../../assets/pizza.png'
import enemyUpImage from '../../../assets/enemyUp.png'
import enemyDownImage from '../../../assets/enemyDown.png'
import enemyLeftImage from '../../../assets/enemyLeft.png'
import enemyRightImage from '../../../assets/enemyRight.png'
import lifeImage from '../../../assets/life.png'

// Хук для начальной инициализации игры
export function useRunGame(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  life: number
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

      const foodArr: Food[] = []

      foodMap.forEach((row: number[], i: number) => {
        row.forEach((symbol: number, j: number) => {
          if (symbol === CHICKEN) {
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
          } else if (symbol === HOTDOG) {
            const hotdog = new Food({
              position: {
                x: j * boundaryWidth + (boundaryWidth - hotdogImg.width) / 2,
                y: i * boundaryHeight + (boundaryHeight - hotdogImg.height) / 2,
              },
              image: hotdogImg,
              score: 200,
            })

            foodArr.push(hotdog)
          } else if (symbol === PIZZA) {
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
  }, [canvasRef, ctx])

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
