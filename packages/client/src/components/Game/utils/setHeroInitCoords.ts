import { Coords, Sprite } from '../classes'

export const setHeroInitCoords = (
  hero: Sprite,
  heroInitCoords: Coords
): void => {
  hero.init(heroInitCoords)
}
