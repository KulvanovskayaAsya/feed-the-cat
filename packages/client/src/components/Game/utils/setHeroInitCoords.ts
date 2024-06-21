import { Coords, Sprite } from '../classes'

// Функция для установки начальных координат героя
export const setHeroInitCoords = (
  hero: Sprite,
  heroInitCoords: Coords
): void => {
  hero.init(heroInitCoords)
}
