import { Boundary } from '../classes'
import { getCollisionsMap } from './collisions'
import { BOUNDARY, boundaryHeight, boundaryWidth } from './consts'

export async function getBoundaries(level: number): Promise<Boundary[]> {
  const collisionsMap: number[][] = await getCollisionsMap(level)

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

  return boundaries
}
