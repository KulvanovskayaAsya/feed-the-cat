import { Boundary } from '../classes'
import { enemyMap } from './enemy'
import { boundaryHeight, boundaryWidth } from './consts'

const enemiesArray: Boundary[] = []

enemyMap.forEach((row: number[], i: number) => {
  row.forEach((symbol: number, j: number) => {
    if (symbol === 1039) {
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

// Преобразование координат врага в траекторию его движения
enemies[0] = enemiesArray[0]
enemies[1] = enemiesArray[1]
enemies[2] = enemiesArray[2]
enemies[3] = enemiesArray[3]
enemies[4] = enemiesArray[4]
enemies[5] = enemiesArray[5]
enemies[6] = enemiesArray[7]
enemies[7] = enemiesArray[9]
enemies[8] = enemiesArray[11]
enemies[9] = enemiesArray[13]
enemies[10] = enemiesArray[15]
enemies[11] = enemiesArray[21]
enemies[12] = enemiesArray[20]
enemies[13] = enemiesArray[19]
enemies[14] = enemiesArray[18]
enemies[15] = enemiesArray[17]
enemies[16] = enemiesArray[16]
enemies[17] = enemiesArray[14]
enemies[18] = enemiesArray[12]
enemies[19] = enemiesArray[10]
enemies[20] = enemiesArray[8]
enemies[21] = enemiesArray[6]

export { enemies }
