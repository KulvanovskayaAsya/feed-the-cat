declare const __EXTERNAL_SERVER_URL__: string
declare const __INTERNAL_SERVER_URL__: string
declare const __SERVER_PORT__: number

interface Window {
  AudioContext: typeof AudioContext
  webkitAudioContext: typeof AudioContext
}
