// Функция, возвращающая оставшееся время игры
export const getGameTime = (time: number): string => {
  const gameTime = new Date(time * 1000)

  return gameTime.toLocaleTimeString([], {
    minute: '2-digit',
    second: '2-digit',
  })
}
