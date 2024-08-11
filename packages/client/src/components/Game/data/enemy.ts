import { mapWidth } from './consts'

export async function getEnemyMap(level: number): Promise<number[][]> {
  type enemyType = { enemy: number[] }
  const levelEnemy: enemyType = await import(`./levels/${level}/enemy.ts`)

  const enemyMap: number[][] = []

  for (let i = 0; i < levelEnemy.enemy.length; i += mapWidth) {
    enemyMap.push(levelEnemy.enemy.slice(i, mapWidth + i))
  }

  return enemyMap
}
