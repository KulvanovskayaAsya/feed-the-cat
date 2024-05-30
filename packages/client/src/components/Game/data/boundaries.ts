import { Boundary } from '../classes'
import { collisionsMap } from './collisions'
import { BOUNDARY, boundaryHeight, boundaryWidth } from './consts'

const boundaries: Boundary[] = []

collisionsMap.forEach((row: number[], i: number) => {
  row.forEach((symbol: number, j: number) => {
    if (symbol === BOUNDARY) {
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
