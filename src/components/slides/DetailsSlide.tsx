import { motion } from 'framer-motion'
import { WEDDING } from '@/lib/constants'
import ChapterHeader from '../ChapterHeader'
import type { SlideProps } from '@/types'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mt-12 mb-6">
      <h3 className="font-bukva text-ink"
          style={{ fontSize: 'clamp(1.7rem, 6vw, 2.3rem)' }}>
        {children}
      </h3>
    </div>
  )
}

// Сундучок — иконка для "Дары желанные"
function Chest({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="#b32015" strokeWidth="1.2" fill="#b32015">
        {/* верхняя крышка */}
        <path d="M10 40 C10 28 18 18 30 18 L90 18 C102 18 110 28 110 40 L110 50 L10 50 Z" />
        {/* основание */}
        <rect x="10" y="50" width="100" height="40" />
        {/* металлические полосы */}
        <g stroke="#fff8f0" strokeWidth="2" fill="none">
          <path d="M10 50 L110 50" />
          <path d="M60 18 L60 90" />
          <path d="M30 18 L30 90" />
          <path d="M90 18 L90 90" />
        </g>
        {/* замочек */}
        <rect x="54" y="48" width="12" height="14" fill="#fff8f0" stroke="#b32015" />
        <circle cx="60" cy="54" r="1.6" fill="#b32015" stroke="none" />
        {/* монеты, выглядывающие */}
        <g fill="#fff8f0" stroke="none">
          <circle cx="40" cy="32" r="3" />
          <circle cx="48" cy="36" r="2.4" />
          <circle cx="76" cy="34" r="2.8" />
          <circle cx="84" cy="38" r="2.2" />
        </g>
        <g stroke="#b32015" strokeWidth="0.8" fill="none">
          <circle cx="40" cy="32" r="3" />
          <circle cx="48" cy="36" r="2.4" />
          <circle cx="76" cy="34" r="2.8" />
          <circle cx="84" cy="38" r="2.2" />
        </g>
      </g>
    </svg>
  )
}

// Цветочек аленький — простой
function LittleFlower({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="#b32015" stroke="#b32015" strokeWidth="1">
        {/* стебель */}
        <path d="M40 78 L40 50" stroke="#b32015" strokeWidth="1.5" fill="none" />
        {/* листок */}
        <path d="M40 62 C32 60 28 54 30 50 C36 50 42 56 40 62 Z" />
        {/* цветок — 5 лепестков */}
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="40"
            cy="28"
            rx="5"
            ry="9"
            transform={`rotate(${deg} 40 36)`}
          />
        ))}
        {/* центр */}
        <circle cx="40" cy="36" r="3.5" fill="#fff8f0" stroke="#b32015" />
      </g>
    </svg>
  )
}

// Чат-облачко
function ChatBubble({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 90" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="#b32015" strokeWidth="1.2" fill="#b32015">
        <path d="M10 20 C10 12 16 6 24 6 L76 6 C84 6 90 12 90 20 L90 50 C90 58 84 64 76 64 L40 64 L24 78 L24 64 C16 64 10 58 10 50 Z" />
        <g fill="#fff8f0" stroke="none">
          <circle cx="32" cy="34" r="3" />
          <circle cx="50" cy="34" r="3" />
          <circle cx="68" cy="34" r="3" />
        </g>
      </g>
    </svg>
  )
}

export default function DetailsSlide({ visible }: SlideProps) {
  const { flowers, chat } = WEDDING.details
  // Telegram c text-параметром поддерживает текст в ссылке share
  const tgClicheUrl = `${flowers.tgUrl}?text=${encodeURIComponent(flowers.cliche)}`

  return (
    <section data-slide-index="5" className="slide-base above-paper bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-col"
      >
        <ChapterHeader
          chapter="Глава 5"
          title="Детали важные"
          className="mb-10"
        />

        {/* === Дары желанные === */}
        <SectionTitle>Дары желанные</SectionTitle>

        <div className="flex justify-center mb-5">
          <Chest className="w-28 sm:w-32" />
        </div>

        <p className="body-slav text-center text-pretty max-w-lg mx-auto">
          Гости сердечные, не удручайте себя мыслями
          тягостными о дарах заморских.
          <br />
          Сердце да глаз порадуйте звоном
          <span className="text-rose"> золотых монет</span>.
        </p>

        {/* === Цветочки аленькие === */}
        <SectionTitle>Цветочки аленькие</SectionTitle>

        <div className="flex justify-center mb-5">
          <LittleFlower className="w-20 sm:w-24" />
        </div>

        <p className="body-slav text-center text-pretty max-w-lg mx-auto mb-3">
          Цветок красивый в духоте не мучайте,
          а доверьтесь нашим мастерам дел цветочных.
          Они будут радовать нас охапками долго-предолго.
        </p>
        <p className="body-slav text-center italic text-ink-muted text-sm max-w-md mx-auto mb-6">
          Пишите им: «{flowers.cliche}»
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-sm mx-auto w-full">
          <a
            href={tgClicheUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-filled flex-1 text-center"
          >
            ✦  Написать в ТГ
          </a>
          <a
            href={flowers.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex-1 text-center"
          >
            ✦  Написать в МАКС
          </a>
        </div>

        {/* === Группа для дорогих гостей === */}
        <SectionTitle>Группа для дорогих гостей</SectionTitle>

        <div className="flex justify-center mb-5">
          <ChatBubble className="w-24 sm:w-28" />
        </div>

        <p className="body-slav text-center text-pretty max-w-lg mx-auto mb-6">
          Для тёплого общения и ярких кадров — присоединяйтесь к&nbsp;нашей беседе.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-sm mx-auto w-full">
          <a
            href={chat.tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-filled flex-1 text-center"
          >
            ✦  Вступить в ТГ
          </a>
          <a
            href={chat.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex-1 text-center"
          >
            ✦  Вступить в МАКС
          </a>
        </div>
      </motion.div>
    </section>
  )
}
