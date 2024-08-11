import { Boundary } from '../classes'
import { getEnemyMap } from './enemy'
import { boundaryHeight, boundaryWidth, ENEMY } from './consts'

export async function getEnemies(level: number): Promise<Boundary[]> {
  const enemyMap: number[][] = await getEnemyMap(level)

  const enemiesArray: Boundary[] = []

  enemyMap.forEach((row: number[], i: number) => {
    row.forEach((symbol: number, j: number) => {
      if (symbol === ENEMY) {
        enemiesArray.push(
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

  const enemies: Boundary[] = []

  const length = enemiesArray.length

  const width = 6 // Ширина прямоугольника траектории врага
  const height = 7 // Высота прямоугольника траектории врага

  // Преобразование координат врага в траекторию его движения
  for (let i = 0; i < length; i++) {
    if (i <= width - 1) {
      enemies[i] = enemiesArray[i]
    } else if (i >= width && i <= width + height - 3) {
      enemies[i] = enemiesArray[2 * i - (width - 1)]
    } else if (i >= width + height - 2 && i <= 2 * width + height - 3) {
      enemies[i] = enemiesArray[length + (width + height - 3) - i]
    } else {
      enemies[i] = enemiesArray[2 * (length + 2) - 2 * i]
    }
  }

  return enemies
}
