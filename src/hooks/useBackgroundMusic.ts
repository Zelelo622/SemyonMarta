import { useEffect, useRef, useState } from 'react'
import { Howl, Howler } from 'howler'

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
    // Web Audio API (default): preload fetches via XHR and decodes into a buffer —
    // XHR is not blocked by iOS before user gesture, so the file is ready by first tap.
    // Volume is controlled via GainNode, which works on iOS (unlike <audio>.volume).
    const sound = new Howl({
      src: [src],
      loop,
      volume: initialVolume,
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
      // iOS Safari and some desktop browsers start AudioContext in "suspended" state.
      // Must call resume() synchronously inside a user gesture handler before play().
      if (Howler.ctx && Howler.ctx.state !== 'running') {
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
