// Функция для загрузки текстур
export function loadTexture(path: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img: HTMLImageElement = new Image()
    img.src = path
    img.onload = () => {
      resolve(img)
    }
  })
}
