# Свадьба Семёна и Марты · Приглашение

Пригласительный сайт-летопись в русско-народном стиле.
Vite + React 18 + TypeScript + TailwindCSS + Framer Motion + react-hook-form.

## Запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

## Сборка

```bash
npm run build
npm run preview
```

Итоговая сборка попадёт в `dist/`.

## Структура

```
src/
├── App.tsx                      # главный компонент, склейка слайдов
├── main.tsx                     # точка входа
├── styles/globals.css           # глобальные стили + текстура бумаги
├── lib/
│   ├── constants.ts             # все тексты, даты, контакты, ссылки
│   └── email.ts                 # отправка RSVP через formsubmit.co
├── hooks/
│   ├── useSlideTracking.ts      # IntersectionObserver для появлений
│   ├── useBackgroundMusic.ts    # Howler — музыка
│   └── useCountdown.ts          # обратный отсчёт до свадьбы
├── components/
│   ├── slides/
│   │   ├── CoverSlide.tsx       # 1. Жили-были
│   │   ├── DateSlide.tsx        # 2. Глава 1. Время
│   │   ├── VenueSlide.tsx       # 3. Глава 2. Места действа
│   │   ├── ProgramSlide.tsx     # 4. Глава 3. Как всё пройдёт
│   │   ├── DressCodeSlide.tsx   # 5. Глава 4. Одеяния
│   │   ├── DetailsSlide.tsx     # 6. Глава 5. Детали важные
│   │   ├── RSVPSlide.tsx        # 7. Глава 6. Анкета
│   │   └── ContactsSlide.tsx    # 8. Заключение
│   ├── ChapterHeader.tsx        # заголовок главы
│   ├── FolkDivider.tsx          # орнаментальный разделитель
│   ├── FolkFlower.tsx           # цветочный декор (углы)
│   ├── Rooster.tsx              # петух (декор)
│   ├── Balalaika.tsx            # балалайка SVG
│   └── MusicToggle.tsx          # фикс-кнопка музыки (наверху справа)
└── types/index.ts               # типы (форма RSVP и т.д.)
```

## Музыка

Положите файл `lish-do-utra.mp3` в `public/music/`.
Путь настраивается в `src/lib/constants.ts` → `WEDDING.musicUrl`.

## Куда отправляется RSVP

На почту `svd36@inbox.ru` через сервис [formsubmit.co](https://formsubmit.co/) (без бэкенда).

При **первой** отправке formsubmit.co пришлёт письмо со ссылкой-активацией —
её нужно подтвердить, и дальше всё работает автоматически.

## Шрифты

Подключены из Google Fonts в `index.html`:
- **IM Fell Double Pica SC** — стилизованный старопечатный, для заголовков
- **PT Serif** — основной текст
- **Marck Script** — рукописный, для имён
- **Cormorant Garamond** — декоративный
- **Lobster** — fallback для буквиц

## Логика RSVP (НЕ менялась)

Полностью сохранена авторская логика формы:
динамический список гостей (до 8), типы (взрослый/ребёнок),
условные поля при выборе «Не приду / Аллергии / Трансфер»,
взрослые видят напитки/проживание/трансфер, дети — нет.
Отправка через `formsubmit.co`.

## Изменение текстов

Все строки в одном файле — `src/lib/constants.ts`.
