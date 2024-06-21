import { mapWidth } from './consts'

export async function getCollisionsMap(level: number): Promise<number[][]> {
  type collisionsType = { collisions: number[] }
  const levelCollisions: collisionsType = await import(
    `./levels/${level}/collisions.ts`
  )

  const collisionsMap: number[][] = []

  for (let i = 0; i < levelCollisions.collisions.length; i += mapWidth) {
    collisionsMap.push(levelCollisions.collisions.slice(i, mapWidth + i))
  }

  return collisionsMap
}
