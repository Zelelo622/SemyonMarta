import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WEDDING } from '@/lib/constants'
import FolkDivider from '../FolkDivider'
import Balalaika from '../Balalaika'
import FolkFlower from '../FolkFlower'

interface Props {
  playing: boolean
  loading: boolean
  volume: number
  onMusicToggle: () => void
  onVolumeChange: (v: number) => void
}

function SpeakerIcon({ volume, onClick }: { volume: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={volume === 0 ? 'Включить звук' : 'Выключить звук'}
      className="text-rose/70 hover:text-rose transition-colors duration-200 flex-shrink-0"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
        {volume === 0 ? (
          <>
            <path d="M16.5 12 A4.5 4.5 0 0 1 12 16.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : volume < 0.45 ? (
          <>
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M19 5a9 9 0 0 1 0 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  )
}

export default function CoverSlide({ playing, loading, volume, onMusicToggle, onVolumeChange }: Props) {
  const prevVolumeRef = useRef(0.3)
  return (
    <section
      data-slide-index="0"
      className="slide-base above-paper bg-ivory"
    >
      {/* угловые орнаменты */}
      <FolkFlower
        className="absolute top-6 left-6 w-16 sm:w-24 opacity-70"
        color="#b32015"
      />
      <FolkFlower
        className="absolute top-6 right-6 w-16 sm:w-24 opacity-70"
        color="#b32015"
      />
      <FolkFlower
        className="absolute bottom-6 left-6 w-16 sm:w-24 opacity-70 rotate-180"
        color="#b32015"
      />
      <FolkFlower
        className="absolute bottom-6 right-6 w-16 sm:w-24 opacity-70 rotate-180"
        color="#b32015"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-col text-center relative"
      >
        {/* мини-печать сверху */}
        <p className="chapter-mark mb-6">Приглашение</p>

        {/* Жили-были */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.1 }}
          className="font-bukva text-rose leading-[0.95] text-balance"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 7rem)' }}
        >
          Жили-<br className="sm:hidden" />были
        </motion.h1>

        <FolkDivider className="max-w-[300px] w-full mx-auto my-6 sm:my-7" />

        {/* Имена */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.1 }}
          className="font-marck text-ink leading-[0.95]"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}
        >
          <div>{WEDDING.groomName}</div>
          <div className="text-rose -my-2 text-[0.7em]">да</div>
          <div>{WEDDING.brideName}</div>
        </motion.div>

        <FolkDivider className="max-w-[300px] w-full mx-auto my-6 sm:my-7" />

        {/* Текст-присказка */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="body-slav max-w-md mx-auto italic"
        >
          Долго ль, коротко ль, да свёл их путь сердечный
          и решили они сердца да руку друг другу вручить.
        </motion.p>

        {/* Дата */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="mt-7 flex items-center justify-center gap-4 sm:gap-6"
        >
          <span className="h-px w-12 bg-rose/60" />
          <span className="font-bukva uppercase text-rose tracking-widest3 text-sm sm:text-base">
            {WEDDING.dateText}
          </span>
          <span className="h-px w-12 bg-rose/60" />
        </motion.div>

        {/* Кнопка музыки */}
        <motion.button
          type="button"
          onClick={onMusicToggle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-filled mt-10"
        >
          {loading ? '◌  Загрузка…' : playing ? '❚❚  Остановить песнопения' : 'Включить песнопения'}
        </motion.button>

        {/* Регулятор громкости */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mt-4 flex items-center justify-center gap-3"
            >
              <SpeakerIcon
                volume={volume}
                onClick={() => {
                  if (volume > 0) {
                    prevVolumeRef.current = volume
                    onVolumeChange(0)
                  } else {
                    onVolumeChange(prevVolumeRef.current)
                  }
                }}
              />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="w-28 sm:w-36 accent-rose cursor-pointer"
                aria-label="Громкость"
              />
              <span className="font-bukva uppercase text-[16px] tracking-widest text-rose/60 w-7 text-right tabular-nums">
                {Math.round(volume * 100)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Балалайка снизу */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 flex justify-center"
        >
          <Balalaika className="w-20 sm:w-24 animate-sway origin-top" />
        </motion.div>

        {/* стрелка-приглашение скроллить */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <span className="font-bukva uppercase text-[16px] tracking-widest3 text-ink-muted">
            Листайте далее
          </span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-rose"
          >
            <path d="M12 16L4 8h16z" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
