import { Boundary } from '../classes'
import { enemyMap } from './enemy'
import { boundaryHeight, boundaryWidth, ENEMY } from './consts'

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

// Преобразование координат врага в траекторию его движения
for (let i = 0; i < length; i++) {
  if (i <= 5) {
    enemies[i] = enemiesArray[i]
  } else if (i >= 6 && i <= 10) {
    enemies[i] = enemiesArray[2 * i - 5]
  } else if (i >= 11 && i <= 16) {
    enemies[i] = enemiesArray[length + 10 - i]
  } else {
    enemies[i] = enemiesArray[48 - 2 * i]
  }
}

export { enemies }
