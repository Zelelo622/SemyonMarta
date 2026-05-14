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
  const ctxCleanupRef = useRef<(() => void) | null>(null)

  // Attach statechange listener to AudioContext so we detect audio interruptions
  // (headphone removal, phone call, background tab, etc.) and sync state.
  const attachCtxListener = (ctx: AudioContext) => {
    const handle = () => {
      if (ctx.state !== 'running') {
        const h = howlRef.current
        if (h?.playing()) {
          // Sync Howler's internal paused state so the next play() works correctly
          h.pause()
        } else {
          setPlaying(false)
        }
      }
    }
    ctx.addEventListener('statechange', handle)
    return () => ctx.removeEventListener('statechange', handle)
  }

  const makeHowl = (vol: number): Howl => {
    const sound = new Howl({
      src: [src],
      loop,
      volume: vol,
      // Web Audio API (default): preload via XHR, decoded into buffer — not blocked
      // by iOS before user gesture. GainNode volume works on iOS (<audio>.volume does not).
      preload: true,
      onload: () => setLoading(false),
      onplay: () => { setPlaying(true); setLoading(false) },
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
      onend: () => { if (!loop) setPlaying(false) },
      onloaderror: () => setLoading(false),
      onplayerror: () => {
        setPlaying(false)
        setLoading(false)
        // AudioContext is broken (common after audio device change on mobile).
        // Destroy it fully so the next user-gesture play() creates a fresh one.
        ctxCleanupRef.current?.()
        ctxCleanupRef.current = null
        Howler.unload()
        const fresh = makeHowl(volumeRef.current)
        howlRef.current = fresh
        // Attach listener to the new context (created by makeHowl → new Howl)
        if (Howler.ctx) {
          ctxCleanupRef.current = attachCtxListener(Howler.ctx)
        }
      },
    })
    return sound
  }

  useEffect(() => {
    const sound = makeHowl(volumeRef.current)
    howlRef.current = sound

    // Howler.ctx is created synchronously by new Howl({preload:true})
    if (Howler.ctx) {
      ctxCleanupRef.current = attachCtxListener(Howler.ctx)
    }

    if (autoplay) { setLoading(true); sound.play() }

    return () => {
      ctxCleanupRef.current?.()
      ctxCleanupRef.current = null
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

    // Do NOT await resume() — iOS Safari revokes the "trusted user gesture" window
    // after the first await, which would cause play() to be silently rejected.
    if (Howler.ctx && Howler.ctx.state !== 'running') {
      Howler.ctx.resume().catch(() => {})
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
