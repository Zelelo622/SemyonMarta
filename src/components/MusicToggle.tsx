import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  playing: boolean
  volume: number
  onToggle: () => void
  onVolumeChange: (v: number) => void
}

export default function MusicToggle({ playing, volume, onToggle, onVolumeChange }: Props) {
  const [showVolume, setShowVolume] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50 above-paper flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        {/* Volume button — toggles slider on click/tap (works on mobile unlike hover) */}
        <button
          type="button"
          onClick={() => setShowVolume(v => !v)}
          aria-label={showVolume ? 'Скрыть громкость' : 'Громкость'}
          className="w-10 h-10 bg-ivory border border-rose/40 flex items-center justify-center
                     text-rose/70 hover:text-rose transition-colors duration-200"
          style={{ boxShadow: '0 0 0 2px var(--paper), 0 0 0 3px var(--red)' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
            {volume === 0 ? (
              <>
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {volume >= 0.45 && (
                  <path d="M19 5a9 9 0 0 1 0 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                )}
              </>
            )}
          </svg>
        </button>

        {/* Play / pause button */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? 'Пауза' : 'Воспроизвести'}
          className="w-12 h-12 bg-ivory border border-rose flex items-center justify-center
                     hover:bg-rose hover:text-ivory transition-all duration-300"
          style={{ boxShadow: '0 0 0 3px var(--paper), 0 0 0 4px var(--red), 0 6px 16px -8px rgba(154,24,32,0.55)' }}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current" fill="none" strokeWidth="1.6">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Volume slider — shown on tap/click of volume button */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="bg-ivory border border-rose/40 px-3 py-2 flex items-center gap-2"
            style={{ boxShadow: '0 0 0 2px var(--paper), 0 0 0 3px var(--red)' }}
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              onInput={(e) => onVolumeChange(Number((e.target as HTMLInputElement).value))}
              className="w-28 accent-rose cursor-pointer"
              aria-label="Громкость"
            />
            <span className="text-rose/60 text-xs tabular-nums w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
