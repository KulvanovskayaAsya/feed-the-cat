import { Coords, Sprite } from '../classes'

// Функция для установки начальных координат героя
export const setHeroInitCoords = (
  hero: Sprite,
  heroInitCoords: Coords
): void => {
  if (hero.sprites) {
    hero.position.x = heroInitCoords.x
    hero.position.y = heroInitCoords.y
    hero.image = hero.sprites.down
    hero.frames.val = 0
  }
}
