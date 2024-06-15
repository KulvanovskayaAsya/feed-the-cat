import type { Dispatch, SetStateAction } from 'react'
import { Boundary, Sprite } from '../classes'
import { getHeroParameters, rectangularCollision } from '../utils'

// Функция для движения героя и обнаружения столкновений с границами
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

    hero.moving = true

    if (hero.sprites && heroImage) {
      hero.image = heroImage
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
      hero.position.x -= heroVelocityX
      hero.position.y -= heroVelocityY
    }
  }
}
