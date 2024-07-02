export class CustomAudioBuffer {
  context: AudioContext
  urls: string[]
  buffer: AudioBuffer[]

  constructor(context: AudioContext, urls: string[]) {
    this.context = context
    this.urls = urls
    this.buffer = []
  }

  async loadSound(url: string, index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer'

      const { buffer, context } = this

      xhr.onload = async () => {
        try {
          buffer[index] = await context.decodeAudioData(xhr.response)
          resolve(xhr.response)
        } catch {
          reject(new Error('Error with decoding audio data'))
        }
      }

      xhr.send()
    })
  }

  async loadAll(): Promise<void> {
    for (const url of this.urls) {
      const index = this.urls.indexOf(url)
      await this.loadSound(url, index)
    }
  }

  getSoundByIndex(index: number): AudioBuffer {
    return this.buffer[index]
  }
}
