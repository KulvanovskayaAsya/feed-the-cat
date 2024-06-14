import { mapWidth } from './consts'

export async function getHeroMap(level: number): Promise<number[][]> {
  type heroType = { hero: number[] }
  const levelHero: heroType = await import(`./levels/${level}/hero.ts`)

  const heroMap: number[][] = []

  for (let i = 0; i < levelHero.hero.length; i += mapWidth) {
    heroMap.push(levelHero.hero.slice(i, mapWidth + i))
  }

  return heroMap
}
