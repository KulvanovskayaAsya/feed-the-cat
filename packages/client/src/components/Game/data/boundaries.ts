import { Boundary } from '../classes'
import { collisionsMap } from './collisions'
import { boundaryHeight, boundaryWidth } from './consts'

const boundaries: Boundary[] = []

collisionsMap.forEach((row: number[], i: number) => {
  row.forEach((symbol: number, j: number) => {
    if (symbol === 1034) {
      boundaries.push(
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

export { boundaries }
