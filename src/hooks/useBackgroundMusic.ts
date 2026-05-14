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
  const volumeRef = useRef(initialVolume)

  const makeHowl = (vol: number) =>
    new Howl({
      src: [src],
      loop,
      volume: vol,
      preload: true,
      onload: () => setLoading(false),
      onplay: () => { setPlaying(true); setLoading(false) },
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
      onend: () => { if (!loop) setPlaying(false) },
      onloaderror: () => setLoading(false),
      onplayerror: () => { setPlaying(false); setLoading(false) },
    })

  useEffect(() => {
    // Web Audio API (default): preload fetches via XHR and decodes into a buffer —
    // XHR is not blocked by iOS before user gesture, so the file is ready by first tap.
    // Volume is controlled via GainNode, which works on iOS (unlike <audio>.volume).
    const sound = makeHowl(volumeRef.current)
    howlRef.current = sound
    if (autoplay) { setLoading(true); sound.play() }

    return () => {
      sound.stop()
      sound.unload()
      howlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const toggle = () => {
    const h = howlRef.current
    if (!h) return

    if (h.playing()) {
      h.pause()
      return
    }

    setLoading(true)

    // iOS Safari and some desktop browsers start AudioContext in "suspended" state.
    // Do NOT await resume() — iOS revokes the "trusted user gesture" context after
    // the first await, which would cause the subsequent play() call to be silently
    // rejected. Call resume() fire-and-forget; the AudioContext clock is frozen while
    // suspended so the scheduled audio still plays correctly once it resumes.
    if (Howler.ctx && Howler.ctx.state !== 'running') {
      Howler.ctx.resume().catch(() => {})
    }

    // After a headphone disconnect the browser may mark the Howl's audio nodes as
    // dead (state === 'unloaded'). Re-create the instance so new nodes are allocated.
    if (h.state() === 'unloaded') {
      h.unload()
      const fresh = makeHowl(volumeRef.current)
      howlRef.current = fresh
      fresh.play()
      return
    }

    h.play()
  }

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v))
    setVolumeState(clamped)
    volumeRef.current = clamped
    howlRef.current?.volume(clamped)
  }

  return { playing, loading, volume, toggle, setVolume }
}
