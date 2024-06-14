import { Boundary, Sprite } from '../classes'
import { boundaryHeight, boundaryWidth } from '../data'

// Функция для движения врага по определённой траектории с определённой скоростью
export const movementEnemy = (enemy: Sprite, enemies: Boundary[]): void => {
  const enemyVelocity = enemy.velocity

  for (let i = 0; i < enemies.length; i++) {
    const tileLeftXCoord = enemies[i].position.x
    const tileRightXCoord = enemies[i].position.x + boundaryWidth
    const tileUpYCoord = enemies[i].position.y
    const tileDownYCoord = enemies[i].position.y + boundaryWidth

    if (
      tileLeftXCoord <= enemy.position.x &&
      enemy.position.x <= tileRightXCoord &&
      tileUpYCoord <= enemy.position.y &&
      enemy.position.y <= tileDownYCoord &&
      enemy.sprites
    ) {
      let nextIndex = i + 1

      if (nextIndex === enemies.length) {
        nextIndex = 0
      }

      const newEnemyLeftXCoord =
        enemies[nextIndex].position.x +
        (boundaryWidth - enemy.image.width / 4) / 2
      const newEnemyTopYCoord =
        enemies[nextIndex].position.y +
        (boundaryHeight - enemy.image.height) / 2

      if (
        newEnemyLeftXCoord > enemy.position.x &&
        newEnemyTopYCoord === enemy.position.y
      ) {
        enemy.image = enemy.sprites.right
        enemy.position.x += enemyVelocity
      } else if (newEnemyTopYCoord > enemy.position.y) {
        enemy.image = enemy.sprites.down
        enemy.position.y += enemyVelocity
      } else if (newEnemyLeftXCoord < enemy.position.x) {
        enemy.image = enemy.sprites.left
        enemy.position.x -= enemyVelocity
      } else if (newEnemyTopYCoord < enemy.position.y) {
        enemy.image = enemy.sprites.up
        enemy.position.y -= enemyVelocity
      }

      break
    }
  }
}
