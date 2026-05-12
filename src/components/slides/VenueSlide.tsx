import { motion } from 'framer-motion'
import { WEDDING } from '@/lib/constants'
import ChapterHeader from '../ChapterHeader'
import FolkFlower from '../FolkFlower'
import type { SlideProps } from '@/types'

export default function VenueSlide({ visible }: SlideProps) {
  return (
    <section
      data-slide-index="2"
      className="slide-base above-paper bg-cream"
    >
      <FolkFlower
        className="absolute -top-4 -left-4 w-24 sm:w-32 opacity-50"
        color="#b32015"
      />
      <FolkFlower
        className="absolute -bottom-4 -right-4 w-24 sm:w-32 opacity-50 rotate-180"
        color="#b32015"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-col"
      >
        <ChapterHeader
          chapter="Глава 2."
          title="Места действа"
          className="mb-10"
        />

        <div className="body-slav text-pretty mb-8">
          <span className="bukva-drop">У</span>
          садьба дивная, именуемая «{WEDDING.venue.name}», ожидает гостей
          званых. Стоит она средь полей и лесов воронежских, и нет места
          краше для торжества нашего.
        </div>

        {/* Большое название места — картуш */}
        <div className="cartouche px-6 py-8 sm:px-10 sm:py-10 text-center mb-8">
          <p className="chapter-mark mb-3">Усадьба дивная</p>
          <h3
            className="font-bukva text-rose leading-none"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 4rem)' }}
          >
            {WEDDING.venue.name}
          </h3>
          <p className="font-slav italic text-ink-muted mt-4 text-sm sm:text-base">
            {WEDDING.venue.address}
          </p>
        </div>

        {/* Картинки места */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
          {WEDDING.venue.images.slice(0, 4).map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                visible
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{
                delay: 0.2 + i * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-[4/3] overflow-hidden border border-rose/40"
              style={{
                boxShadow:
                  '0 0 0 3px var(--paper), 0 0 0 4px rgba(184,30,38,0.4), 0 10px 24px -14px rgba(154,24,32,0.4)',
              }}
            >
              <img
                src={src}
                alt={`${WEDDING.venue.name} — фото ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={WEDDING.venue.yandexMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-filled"
          >
            ✦  Открыть карту
          </a>
        </div>
      </motion.div>
    </section>
  )
}
