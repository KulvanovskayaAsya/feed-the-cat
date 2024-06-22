import type { Dispatch, SetStateAction } from 'react'
import { Boundary, Sprite } from '../classes'
import { getHeroParameters, rectangularCollision } from '../utils'

export const movementHero = (
  pressedKey: string,
  hero: Sprite,
  canvas: HTMLCanvasElement,
  boundaries: Boundary[],
  moving: boolean,
  setMoving: Dispatch<SetStateAction<boolean>>
): void => {
  if (canvas && hero && hero.sprites) {
    const {
      heroImage,
      heroVelocityX,
      heroVelocityY,
      isHeroCanvasBoundaryCollision,
      indentFromBoundaryX,
      indentFromBoundaryY,
    } = getHeroParameters(pressedKey, hero, canvas)

    hero.go()

    if (heroImage) {
      hero.setImage(heroImage)
    }

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]

      if (
        rectangularCollision(
          hero,
          new Boundary({
            position: {
              x: boundary.position.x + indentFromBoundaryX,
              y: boundary.position.y + indentFromBoundaryY,
            },
          })
        ) ||
        isHeroCanvasBoundaryCollision
      ) {
        setMoving(false)
        break
      } else {
        setMoving(true)
      }
    }

    if (moving) {
      hero.hitBorder(heroVelocityX, heroVelocityY)
    }
  }
}
