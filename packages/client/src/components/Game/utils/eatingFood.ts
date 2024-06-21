import type { Dispatch, SetStateAction } from 'react'
import { Food, Sprite } from '../classes'
import { rectangularCollision } from '../utils'
import { EXTRA_FOOD_SCORES } from '../data'

// Функция для начисления очков и обновления массива еды при её поедании игроком
export const eatingFood = (
  hero: Sprite,
  canvas: HTMLCanvasElement,
  foodArray: Food[],
  setFoodArray: Dispatch<SetStateAction<Food[]>>,
  extraFoodArray: Food[],
  setScores: Dispatch<SetStateAction<number>>,
  currentLevel: number
): void => {
  if (canvas && hero && hero.sprites) {
    for (const foodPiece of foodArray) {
      if (rectangularCollision(hero, foodPiece)) {
        setScores(prevScores => prevScores + foodPiece.score)

        setFoodArray(prevFoodArray => {
          const newFoodArray = prevFoodArray.filter(prevFoodPiece => {
            return prevFoodPiece !== foodPiece
          })

          if (
            newFoodArray.length === 0 &&
            foodPiece.score !== EXTRA_FOOD_SCORES * currentLevel
          ) {
            return extraFoodArray
          }

          return newFoodArray
        })

        break
      }
    }
  }
}
