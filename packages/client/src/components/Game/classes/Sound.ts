// Класс звука
export class Sound {
  context: AudioContext
  buffer: AudioBuffer
  gainNode: GainNode
  source: AudioBufferSourceNode

  constructor(context: AudioContext, buffer: AudioBuffer) {
    this.context = context
    this.buffer = buffer
    this.gainNode = this.context.createGain()
    this.source = this.context.createBufferSource()
    this.connect()
  }

  connect(): void {
    this.gainNode = this.context.createGain()
    this.source = this.context.createBufferSource()
    this.source.buffer = this.buffer
    this.source.connect(this.gainNode)
    this.gainNode.connect(this.context.destination)
  }

  play(): void {
    this.connect()
    this.source.start(this.context.currentTime)
  }

  stop(): void {
    this.gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.context.currentTime + 0.5
    )
    this.source.stop(this.context.currentTime + 0.5)
    this.source.disconnect(this.gainNode)
    this.gainNode.disconnect(this.context.destination)
  }
}
