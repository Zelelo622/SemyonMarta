import { useEffect, useRef, useState } from 'react'
import { Howl, Howler } from 'howler'

// iOS Safari cannot reliably play via Web Audio API: AudioContext starts suspended
// and cannot be preloaded before a user gesture. html5 mode uses <audio> which iOS handles correctly.
const isIOS =
  typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

interface Options {
  src: string
  initialVolume?: number
  loop?: boolean
  autoplay?: boolean
}

export function useBackgroundMusic({
  src,
  initialVolume = 0.3,
  loop = true,
  autoplay = false,
}: Options) {
  const howlRef = useRef<Howl | null>(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)

  useEffect(() => {
    const sound = new Howl({
      src: [src],
      loop,
      volume: initialVolume,
      // On iOS use html5 audio (<audio> element) — Web Audio API is blocked until
      // AudioContext is resumed, which is unreliable during preload on iOS Safari.
      html5: isIOS,
      preload: true,
      onload: () => setLoading(false),
      onplay: () => { setPlaying(true); setLoading(false) },
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
      onend: () => {
        if (!loop) setPlaying(false)
      },
      onloaderror: () => setLoading(false),
      onplayerror: () => {
        setPlaying(false)
        setLoading(false)
      },
    })
    howlRef.current = sound
    if (autoplay) { setLoading(true); sound.play() }

    return () => {
      sound.stop()
      sound.unload()
      howlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const toggle = async () => {
    const h = howlRef.current
    if (!h) return
    if (h.playing()) {
      h.pause()
    } else {
      setLoading(true)
      // For Web Audio API (non-iOS): AudioContext must be explicitly resumed inside
      // a user gesture handler, otherwise play() silently stalls in Safari/Chrome.
      if (!isIOS && Howler.ctx && Howler.ctx.state !== 'running') {
        try { await Howler.ctx.resume() } catch { /* ignore */ }
      }
      h.play()
    }
  }

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v))
    setVolumeState(clamped)
    howlRef.current?.volume(clamped)
  }

  return { playing, loading, volume, toggle, setVolume }
}
