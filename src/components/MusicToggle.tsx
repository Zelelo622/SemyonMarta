import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  playing: boolean
  volume: number
  onToggle: () => void
  onVolumeChange: (v: number) => void
}

export default function MusicToggle({
  playing,
  volume,
  onToggle,
  onVolumeChange,
}: Props) {
  const [showVolume, setShowVolume] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50 above-paper flex items-center gap-2">
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-ivory border border-rose/40 px-3 py-2 flex items-center"
            style={{
              boxShadow:
                '0 0 0 3px var(--paper), 0 0 0 4px var(--red), 0 6px 16px -8px rgba(154,24,32,0.5)',
            }}
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="w-24 accent-rose"
              aria-label="Громкость"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        aria-label={playing ? 'Пауза' : 'Песнопения'}
        className="relative w-12 h-12 bg-ivory border border-rose
                   flex items-center justify-center transition-all duration-300
                   hover:bg-rose hover:text-ivory group"
        style={{
          boxShadow:
            '0 0 0 3px var(--paper), 0 0 0 4px var(--red), 0 6px 16px -8px rgba(154,24,32,0.55)',
        }}
      >
        {playing ? (
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 stroke-current"
            fill="none"
            strokeWidth="1.6"
          >
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  )
}
