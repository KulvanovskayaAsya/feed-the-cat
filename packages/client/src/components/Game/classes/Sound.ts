export class Sound {
  context: AudioContext
  buffer: AudioBuffer
  gainNode: GainNode
  source: AudioBufferSourceNode
  isSoundPlaying: boolean

  static volume = 1

  constructor(context: AudioContext, buffer: AudioBuffer) {
    this.context = context
    this.buffer = buffer
    this.gainNode = this.context.createGain()
    this.source = this.context.createBufferSource()
    this.connect()
    this.isSoundPlaying = false
  }

  connect(): void {
    this.gainNode = this.context.createGain()
    this.source = this.context.createBufferSource()
    this.source.buffer = this.buffer
    this.source.connect(this.gainNode)
    this.gainNode.gain.value = Sound.volume
    this.gainNode.connect(this.context.destination)
  }

  play(): void {
    this.connect()
    this.source.start(this.context.currentTime)
    this.isSoundPlaying = true
    this.source.onended = () => {
      this.isSoundPlaying = false
    }
  }

  stop(): void {
    this.gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.context.currentTime + 0.5
    )
    this.source.stop(this.context.currentTime + 0.5)
  }

  setGain(): void {
    this.gainNode.gain.value = Sound.volume
  }

  static setVolume(volume: number): void {
    Sound.volume = volume / 100
  }
}
