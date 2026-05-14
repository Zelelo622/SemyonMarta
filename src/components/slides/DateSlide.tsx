import { motion } from 'framer-motion'
import { WEDDING } from '@/lib/constants'
import { useCountdown } from '@/hooks/useCountdown'
import ChapterHeader from '../ChapterHeader'
import FolkDivider from '../FolkDivider'
import type { SlideProps } from '@/types'

// Календарь июля 2026 — статичный
// July 2026: 1 июля — среда; 26 июля — воскресенье
const JULY_2026 = {
  monthName: 'Июль 2026',
  firstDayOffset: 2, // Пн=0..Вс=6, среда = 2
  daysInMonth: 31,
  weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  highlight: 26,
}

function Calendar() {
  const cells: (number | null)[] = []
  for (let i = 0; i < JULY_2026.firstDayOffset; i++) cells.push(null)
  for (let d = 1; d <= JULY_2026.daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="folk-card p-5 sm:p-7 max-w-[340px] mx-auto">
      <div className="text-center mb-4">
        <p className="font-bukva uppercase text-rose tracking-widest3 text-sm">
          {JULY_2026.monthName}
        </p>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {JULY_2026.weekDays.map((d, i) => (
          <div
            key={d}
            className={`text-center font-bukva text-[16px] tracking-widest3 ${
              i >= 5 ? 'text-rose' : 'text-ink-muted'
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          const isWeekend = i % 7 === 5 || i % 7 === 6
          const isHighlight = d === JULY_2026.highlight
          return (
            <div
              key={i}
              className={`relative aspect-square flex items-center justify-center font-slav text-[14px]
                ${d === null ? 'text-transparent' : ''}
                ${isWeekend && !isHighlight ? 'text-rose/70' : ''}
                ${!isWeekend && !isHighlight && d !== null ? 'text-ink' : ''}
              `}
            >
              {isHighlight && (
                <span className="absolute inset-0 bg-rose rounded-full" />
              )}
              <span
                className={`relative z-10 ${
                  isHighlight ? 'text-ivory font-bold' : ''
                }`}
              >
                {d ?? '·'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CountdownBlock() {
  const { days, hours, minutes, seconds, passed } = useCountdown(WEDDING.date)
  if (passed) {
    return (
      <p className="text-center font-bukva uppercase text-rose tracking-widest3">
        Праздник свершился!
      </p>
    )
  }
  const items = [
    { v: days, l: 'дней' },
    { v: hours, l: 'часов' },
    { v: minutes, l: 'минут' },
    { v: seconds, l: 'секунд' },
  ]
  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {items.map((item) => (
        <div key={item.l} className="flex flex-col items-center">
          <span
            className="font-bukva text-rose leading-none tabular-nums"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 4rem)' }}
          >
            {String(item.v).padStart(2, '0')}
          </span>
          <span className="mt-1 font-bukva uppercase text-[20px] sm:text-[18px] tracking-widest3 text-ink-muted">
            {item.l}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function DateSlide({ visible }: SlideProps) {
  const _rawName = new URLSearchParams(window.location.search).get('name')
  const guestName = _rawName
    ? (() => { try { return decodeURIComponent(_rawName) } catch { return _rawName } })()
    : null

  return (
    <section data-slide-index="1" className="slide-base above-paper bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-col"
      >
        {/* Интро */}
        <div className="text-center mb-10">
          <p className="body-slav italic max-w-md mx-auto">
            Велено было созвать гостей знатных,
            <br />
            да пир во весь мир устроить!
          </p>
        </div>

        <div className="mb-10 sm:mb-12">
          <p className="font-marck text-rose text-center mb-4"
             style={{ fontSize: 'clamp(2rem, 7vw, 3rem)' }}>
            Дорог{guestName ?? 'ие наши гости'}!
          </p>
          <p className="body-slav text-center max-w-lg mx-auto">
            Приглашаем вас на пир,
            угощенья испробовать да вина испить.
            В&nbsp;честь нашей свадьбы быть песням,
            танцам весёлым, да гуляньям широким!
          </p>
        </div>

        <FolkDivider className="max-w-[280px] w-full mx-auto mb-10" />

        <ChapterHeader chapter="Глава 1" title="Время" className="mb-8" />

        {/* Большая буквица + цитата */}
        <div className="mb-10 body-slav text-pretty">
          <span className="bukva-drop">Д</span>
          олго ль, коротко ль, да назначен день — двадцать шестой июля
          месяца года двадцать шестого двадцать первого столетия , в день воскресный, в час пополудни два с половиной.
          Усадьба дивная нас примет, гости званые соберутся, и быть тогда
          торжеству великому.
        </div>

        {/* Начало гуляний */}
        <div className="text-center mb-10">
          <p className="chapter-mark mb-2">Начало гуляний</p>
          <p className="font-bukva text-rose leading-none"
             style={{ fontSize: 'clamp(3rem, 12vw, 5rem)' }}>
            {WEDDING.startTime}
          </p>
        </div>

        {/* Календарь */}
        <Calendar />

        {/* Обратный отсчёт */}
        <div className="mt-10 sm:mt-12">
          <p className="chapter-mark text-center mb-5">До торжества осталось</p>
          <CountdownBlock />
        </div>
      </motion.div>
    </section>
  )
}
