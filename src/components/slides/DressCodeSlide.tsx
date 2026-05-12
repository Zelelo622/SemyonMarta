import { motion } from 'framer-motion'
import { WEDDING } from '@/lib/constants'
import ChapterHeader from '../ChapterHeader'
import FolkFlower from '../FolkFlower'
import type { SlideProps } from '@/types'

// Кокошник + лапти — стилизованные иконки
function Kokoshnik({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#b32015" strokeWidth="1.2" fill="none">
        {/* лицо */}
        <circle cx="60" cy="80" r="22" fill="#fff8f0" />
        {/* косы */}
        <path d="M40 90 C32 100 30 112 36 116" />
        <path d="M80 90 C88 100 90 112 84 116" />
        {/* волосы и платок */}
        <path
          d="M38 70 C38 58 48 50 60 50 C72 50 82 58 82 70"
          fill="#b32015"
        />
        {/* большой кокошник */}
        <path
          d="M28 60 C28 38 42 22 60 22 C78 22 92 38 92 60 L88 60 C88 42 76 30 60 30 C44 30 32 42 32 60 Z"
          fill="#b32015"
        />
        {/* узоры на кокошнике */}
        <g fill="#fff8f0" stroke="none">
          <circle cx="60" cy="32" r="2" />
          <circle cx="50" cy="36" r="1.4" />
          <circle cx="70" cy="36" r="1.4" />
          <circle cx="42" cy="44" r="1.4" />
          <circle cx="78" cy="44" r="1.4" />
          <circle cx="36" cy="54" r="1.2" />
          <circle cx="84" cy="54" r="1.2" />
        </g>
        {/* подвески */}
        <g stroke="#fff8f0" strokeWidth="0.8" fill="none">
          <path d="M40 62 L40 70" />
          <path d="M50 64 L50 72" />
          <path d="M60 64 L60 72" />
          <path d="M70 64 L70 72" />
          <path d="M80 62 L80 70" />
        </g>
        <g fill="#fff8f0" stroke="none">
          <circle cx="40" cy="71" r="1.2" />
          <circle cx="50" cy="73" r="1.2" />
          <circle cx="60" cy="73" r="1.2" />
          <circle cx="70" cy="73" r="1.2" />
          <circle cx="80" cy="71" r="1.2" />
        </g>
        {/* черты лица */}
        <g stroke="#b32015" fill="none" strokeLinecap="round">
          <circle cx="53" cy="78" r="0.8" fill="#b32015" />
          <circle cx="67" cy="78" r="0.8" fill="#b32015" />
          <path d="M55 88 C58 90 62 90 65 88" />
        </g>
      </g>
    </svg>
  )
}

function Lapti({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#b32015" strokeWidth="1.1" fill="none">
        {/* левый лапоть */}
        <g transform="translate(8 30) rotate(-12)">
          <path
            d="M0 30 C0 18 12 10 28 10 L48 10 C52 10 56 14 56 18 L56 28 C56 36 48 42 38 42 L10 42 C4 42 0 38 0 30 Z"
            fill="#fff8f0"
          />
          {/* плетение */}
          <g stroke="#b32015" strokeWidth="0.8">
            <path d="M4 18 L52 18" />
            <path d="M4 26 L52 26" />
            <path d="M4 34 L52 34" />
            <path d="M12 12 L12 40" />
            <path d="M22 12 L22 40" />
            <path d="M32 12 L32 40" />
            <path d="M42 12 L42 40" />
          </g>
          {/* носок */}
          <path d="M48 8 L56 4 L56 14" fill="#b32015" />
          {/* шнурки */}
          <path
            d="M14 10 C12 4 16 0 22 2 M40 10 C42 4 38 0 32 2"
            strokeLinecap="round"
          />
        </g>

        {/* правый лапоть */}
        <g transform="translate(56 70) rotate(8)">
          <path
            d="M0 30 C0 18 12 10 28 10 L48 10 C52 10 56 14 56 18 L56 28 C56 36 48 42 38 42 L10 42 C4 42 0 38 0 30 Z"
            fill="#fff8f0"
          />
          <g stroke="#b32015" strokeWidth="0.8">
            <path d="M4 18 L52 18" />
            <path d="M4 26 L52 26" />
            <path d="M4 34 L52 34" />
            <path d="M12 12 L12 40" />
            <path d="M22 12 L22 40" />
            <path d="M32 12 L32 40" />
            <path d="M42 12 L42 40" />
          </g>
          <path d="M48 8 L56 4 L56 14" fill="#b32015" />
          <path
            d="M14 10 C12 4 16 0 22 2 M40 10 C42 4 38 0 32 2"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  )
}

export default function DressCodeSlide({ visible }: SlideProps) {
  return (
    <section data-slide-index="4" className="slide-base above-paper bg-cream">
      <FolkFlower
        className="absolute top-8 right-8 w-20 sm:w-28 opacity-40"
        color="#b32015"
      />
      <FolkFlower
        className="absolute bottom-8 left-8 w-20 sm:w-28 opacity-40 rotate-180"
        color="#b32015"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-col"
      >
        <ChapterHeader
          chapter="Глава 4."
          title="Одеяния"
          className="mb-12"
        />

        <div className="body-slav text-pretty mb-10 max-w-lg mx-auto">
          <span className="bukva-drop">М</span>
          {WEDDING.dressCode.description.slice(1)}
        </div>

        {/* Иллюстрация: кокошник + лапти */}
        <div className="grid grid-cols-2 gap-6 sm:gap-10 max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Kokoshnik className="w-28 sm:w-36" />
            <p className="font-marck text-rose mt-3 text-2xl">
              Кокошник
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Lapti className="w-28 sm:w-36" />
            <p className="font-marck text-rose mt-3 text-2xl">Лапти</p>
          </motion.div>
        </div>

        <p className="text-center font-marck text-ink-muted text-xl mt-10 mb-6">
          ...а если приглянутся — то и обернуться!
        </p>
      </motion.div>
    </section>
  )
}
