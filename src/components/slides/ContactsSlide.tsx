import { motion } from 'framer-motion'
import { WEDDING } from '@/lib/constants'
import FolkDivider from '../FolkDivider'
import FolkFlower from '../FolkFlower'
import Balalaika from '../Balalaika'
import type { SlideProps } from '@/types'

export default function ContactsSlide({ visible }: SlideProps) {
  return (
    <section data-slide-index="7" className="slide-base above-paper bg-cream">
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
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-col text-center"
      >

        {/* Большая буквица + фраза */}
        <h2
          className="font-bukva text-rose leading-[0.95] mb-4"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 4.5rem)' }}
        >
          Стали они <br />
          жить-поживать <br />
          да добра наживать
        </h2>

        <FolkDivider className="max-w-[280px] w-full mx-auto my-7" />

        <p className="body-slav italic max-w-md mx-auto mb-3">
          Долго ль, коротко ль, да всё впереди.
        </p>
        <p className="body-slav max-w-md mx-auto">
          Коли остались вопросы безответные —
          не стесняйтесь, задавайте.
        </p>

        {/* Контакты — двумя «печатями» */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
          <motion.a
            href={WEDDING.contacts.groom.phoneHref}
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ y: -2 }}
            className="folk-card p-5 block text-center group"
          >
            <p className="chapter-mark mb-2">Жених</p>
            <p
              className="font-slav text-rose mb-2"
              style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)' }}
            >
              {WEDDING.contacts.groom.name}
            </p>
            <p className="font-slav text-ink text-[18px] tracking-wider group-hover:text-rose transition-colors">
              {WEDDING.contacts.groom.phone}
            </p>
          </motion.a>

          <motion.a
            href={WEDDING.contacts.bride.phoneHref}
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ y: -2 }}
            className="folk-card p-5 block text-center group"
          >
            <p className="chapter-mark mb-2">Невеста</p>
            <p
              className="font-slav text-rose mb-2"
              style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)' }}
            >
              {WEDDING.contacts.bride.name}
            </p>
            <p className="font-slav text-ink text-[18px] tracking-wider group-hover:text-rose transition-colors">
              {WEDDING.contacts.bride.phone}
            </p>
          </motion.a>
        </div>

        {/* Балалайка снизу */}
        <div className="mt-12 flex justify-center">
          <Balalaika className="w-16 sm:w-20 animate-sway origin-top opacity-90" />
        </div>

        <FolkDivider className="max-w-[280px] w-full mx-auto mt-8 mb-5" />

        <p
          className="font-slav text-rose"
          style={{ fontSize: 'clamp(1.8rem, 6vw, 2.6rem)' }}
        >
          С любовью,
          <br />
          {WEDDING.groomName} и {WEDDING.brideName}
        </p>

        <p className="chapter-mark-2 mt-8 mb-6 opacity-70">
          {WEDDING.dateText} · {WEDDING.dayOfWeek}
        </p>
      </motion.div>
    </section>
  )
}
