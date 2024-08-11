import { mapWidth } from './consts'

export async function getFoodMap(level: number): Promise<number[][]> {
  type foodType = { food: number[] }
  const levelFood: foodType = await import(`./levels/${level}/food.ts`)

  const foodMap: number[][] = []

  for (let i = 0; i < levelFood.food.length; i += mapWidth) {
    foodMap.push(levelFood.food.slice(i, mapWidth + i))
  }

  return foodMap
}
