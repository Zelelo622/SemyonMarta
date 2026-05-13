import { motion } from 'framer-motion'
import { WEDDING } from '@/lib/constants'
import ChapterHeader from '../ChapterHeader'
import Rooster from '../Rooster'
import type { SlideProps } from '@/types'

export default function ProgramSlide({ visible }: SlideProps) {
  return (
    <section data-slide-index="3" className="slide-base above-paper bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-col"
      >
        <ChapterHeader
          chapter="Глава 3"
          title="Как всё пройдёт"
          className="mb-12"
        />

        {/* Таймлайн — время слева, текст справа */}
        <div className="relative">
          {/* центральная вертикальная линия */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            <div className="w-px flex-1 bg-rose/40 border-l border-dashed border-rose/50" />
          </div>

          <ul className="relative space-y-12 sm:space-y-14">
            {WEDDING.timeline.map((item, i) => (
              <motion.li
                key={item.time}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  delay: 0.2 + i * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid grid-cols-2 gap-4 sm:gap-6 items-center"
              >
                {/* красная точка по центру */}
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                             w-3.5 h-3.5 bg-rose rounded-full"
                  style={{ boxShadow: '0 0 0 4px var(--paper), 0 0 0 5px var(--red)' }}
                />

                {/* левая колонка — время */}
                <div className="pr-4 sm:pr-6 text-right">
                  <p
                    className="font-bukva text-rose leading-none"
                    style={{ fontSize: 'clamp(1.5rem, 6vw, 2.3rem)' }}
                  >
                    {item.time}
                  </p>
                </div>

                {/* правая колонка — название и описание */}
                <div className="pl-4 sm:pl-6">
                  <p className="font-bukva text-rose uppercase tracking-widest3 text-2xl sm:text-3xl">
                    {item.title}
                  </p>
                  <p className="body-slav text-ink-muted text-xl mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* декоративный петух внизу */}
        <div className="flex justify-center mt-14">
          <Rooster className="w-16 sm:w-20 opacity-80" />
        </div>
      </motion.div>
    </section>
  )
}
