import { useCallback, useEffect, useRef, useState } from 'react'
import { Howl, Howler } from 'howler'

interface Options {
  src: string
  initialVolume?: number
  loop?: boolean
}

export function useBackgroundMusic({ src, initialVolume = 0.3, loop = true }: Options) {
  const howlRef = useRef<Howl | null>(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)
  const volumeRef = useRef(initialVolume)
  const mediaActionRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Howler auto-suspends the AudioContext after 30s of silence by default.
    // On iOS this means the next play() silently fails — disable it.
    Howler.autoSuspend = false

    const buildHowl = (html5: boolean): Howl => {
      const h = new Howl({
        src: [src],
        loop,
        volume: volumeRef.current,
        preload: true,
        html5,
        onplay: () => {
          setPlaying(true)
          setLoading(false)
          if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing'
        },
        onpause: () => {
          setPlaying(false)
          if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused'
        },
        onstop: () => setPlaying(false),
        onend: () => { if (!loop) setPlaying(false) },
        onloaderror: (_id, err) => {
          console.warn('[music] load error:', err)
          setLoading(false)
          setPlaying(false)
          if (!html5) {
            // Web Audio XHR-decode failed (e.g. restrictive CSP or codec issue).
            // Fall back to a plain <audio> element — lower fidelity but universal.
            h.unload()
            howlRef.current = buildHowl(true)
          }
        },
        onplayerror: (_id, err) => {
          console.warn('[music] play error:', err)
          setPlaying(false)
          setLoading(false)
          // AudioContext may still be locked despite the resume() call in toggle().
          // Howler fires 'unlock' once the context is unblocked — retry at that point.
          howlRef.current?.once('unlock', () => howlRef.current?.play())
        },
      })
      return h
    }

    howlRef.current = buildHowl(false)

    // OS-level media controls: lock screen, notification shade (Android / iOS)
    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Лишь до утра',
          artist: 'Семён & Марта',
        })
        const handler = () => mediaActionRef.current?.()
        navigator.mediaSession.setActionHandler('play', handler)
        navigator.mediaSession.setActionHandler('pause', handler)
      } catch {
        // Partial MediaSession support — ignore silently
      }
    }

    // When the tab is brought back from background the AudioContext may be suspended.
    const onVisibilityChange = () => {
      if (!document.hidden) {
        const ctx = Howler.ctx
        if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      howlRef.current?.stop()
      howlRef.current?.unload()
      howlRef.current = null
      if ('mediaSession' in navigator) {
        try { navigator.mediaSession.setActionHandler('play', null) } catch { /* ok */ }
        try { navigator.mediaSession.setActionHandler('pause', null) } catch { /* ok */ }
        navigator.mediaSession.playbackState = 'none'
      }
    }
  }, [src, loop])

  const toggle = useCallback(() => {
    const h = howlRef.current
    if (!h) return

    if (h.playing()) {
      h.pause()
    } else {
      setLoading(true)
      // iOS requires AudioContext.resume() to be called synchronously inside the
      // user-gesture handler. Do NOT await — yielding the microtask queue causes
      // iOS to revoke the gesture privilege and the call silently fails.
      const ctx = Howler.ctx
      if (ctx && ctx.state !== 'running') ctx.resume().catch(() => {})
      h.play()
    }
  }, [])

  // Keep ref in sync so MediaSession handlers always call the current toggle
  useEffect(() => { mediaActionRef.current = toggle }, [toggle])

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v))
    setVolumeState(clamped)
    volumeRef.current = clamped
    // Howler uses a Web Audio GainNode for volume — this works on iOS
    // (unlike HTMLAudioElement.volume which is read-only on iOS)
    howlRef.current?.volume(clamped)
  }, [])

  return { playing, loading, volume, toggle, setVolume }
}
