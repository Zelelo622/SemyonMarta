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
  const [volume, setVolumeState] = useState(initialVolume)

  useEffect(() => {
    const sound = new Howl({
      src: [src],
      loop,
      volume: initialVolume,
      html5: true,
      preload: true,
      onplay: () => setPlaying(true),
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
      onend: () => {
        if (!loop) setPlaying(false)
      },
      onloaderror: () => {
        // silently fail — для разработки, когда файл ещё не положили
      },
      onplayerror: () => {
        setPlaying(false)
      },
    })
    howlRef.current = sound
    if (autoplay) sound.play()

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
    if (h.playing()) h.pause()
    else h.play()
  }

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v))
    setVolumeState(clamped)
    howlRef.current?.volume(clamped)
  }

  return { playing, volume, toggle, setVolume }
}
