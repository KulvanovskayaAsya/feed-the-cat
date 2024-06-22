import { Sprite } from '../classes'
import { MOVE_KEYS } from '../data'

export interface HeroParameters {
  heroImage: HTMLImageElement | undefined
  heroVelocityX: number
  heroVelocityY: number
  isHeroCanvasBoundaryCollision: boolean
  indentFromBoundaryX: number
  indentFromBoundaryY: number
}

export const getHeroParameters = (
  pressedKey: string,
  hero: Sprite,
  canvas: HTMLCanvasElement
): HeroParameters => {
  let heroImage: HTMLImageElement | undefined = undefined
  let heroVelocityX = 0
  let heroVelocityY = 0
  let isHeroCanvasBoundaryCollision = false
  let indentFromBoundaryX = 0
  let indentFromBoundaryY = 0

  if (pressedKey === MOVE_KEYS.UP) {
    heroImage = hero.sprites?.up
    heroVelocityX = 0
    heroVelocityY = hero.velocity
    isHeroCanvasBoundaryCollision = hero.position.y < 9
    indentFromBoundaryX = 0
    indentFromBoundaryY = 3
  } else if (pressedKey === MOVE_KEYS.DOWN) {
    heroImage = hero.sprites?.down
    heroVelocityX = 0
    heroVelocityY = -hero.velocity
    isHeroCanvasBoundaryCollision =
      hero.position.y + hero.height > canvas.height - 9
    indentFromBoundaryX = 0
    indentFromBoundaryY = -3
  } else if (pressedKey === MOVE_KEYS.LEFT) {
    heroImage = hero.sprites?.left
    heroVelocityX = hero.velocity
    heroVelocityY = 0
    isHeroCanvasBoundaryCollision = hero.position.x < 9
    indentFromBoundaryX = 3
    indentFromBoundaryY = 0
  } else if (pressedKey === MOVE_KEYS.RIGHT) {
    heroImage = hero.sprites?.right
    heroVelocityX = -hero.velocity
    heroVelocityY = 0
    isHeroCanvasBoundaryCollision =
      hero.position.x + hero.width > canvas.width - 9
    indentFromBoundaryX = -3
    indentFromBoundaryY = 0
  }

  return {
    heroImage,
    heroVelocityX,
    heroVelocityY,
    isHeroCanvasBoundaryCollision,
    indentFromBoundaryX,
    indentFromBoundaryY,
  }
}
