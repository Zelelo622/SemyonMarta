import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

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
    // Web Audio API (default, no html5: true) uses a GainNode for volume —
    // the only way to control volume programmatically on iOS Safari.
    // html5: true forces <audio> whose .volume property is read-only on iOS.
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
      onloaderror: () => {
        setLoading(false)
      },
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

  const toggle = () => {
    const h = howlRef.current
    if (!h) return
    if (h.playing()) {
      h.pause()
    } else {
      // If still buffering, show loading state
      if (h.state() !== 'loaded') setLoading(true)
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
