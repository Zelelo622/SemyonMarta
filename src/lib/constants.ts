import type { SlideName } from '@/types'

export const WEDDING = {
  groomName: 'Семён',
  brideName: 'Марта',
  date: new Date('2026-07-26T14:30:00+03:00'),
  dateText: '26 июля 2026',
  dayOfWeek: 'Воскресенье',
  startTime: '14:30',
  hashtag: '#СемёнИМарта2026',
  rsvpDeadline: '01 июня 2026',

  venue: {
    name: 'Усадьба 12.24',
    address: 'Новоусманский район, Воронежская область',
    yandexMapsUrl:
      'https://yandex.ru/maps/org/usadba_12_24/34756992807?si=ny4mzx6mt3j0w4wzrecfhc5tzr',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipPxUVzVmimQIw_tD17vr2qCiSbPlpvMc1w_gebL=s680-w680-h510-rw',
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHg78QF0iNh3VLKJAhWq1VMOukE_rH7npWVc443b_DxPJ5aWF8qbEVu_Mc4JLBDv26A68994dL_ZoFiRy4-sCy8XQ_Ewe_VWUOAIOK3OyKkgbL7U0K7aFyuufflvrN_ZJUVslNixmK3dYEy=s680-w680-h510-rw',
      'https://lh3.googleusercontent.com/p/AF1QipMZ4XKd2Gwe_6Au5SBJcO_ZTs-TEdKGBWu3BnIP=s680-w680-h510-rw',
      'https://lh3.googleusercontent.com/p/AF1QipO1Qk7DtWVUfRa1pc4356k1c_3hW_OUoUTzg3RV=s680-w680-h510-rw',
      'https://lh3.googleusercontent.com/p/AF1QipNQmT-rFUZ2_M1xpdFKz3M2EqyUrauvbwSTyDvo=s680-w680-h510-rw',
    ],
  } as const,

  contacts: {
    groom: {
      name: 'Семён',
      phone: '+7 920 434-75-35',
      phoneHref: 'tel:+79204347535',
    },
    bride: {
      name: 'Марта',
      phone: '+7 920 454-75-35',
      phoneHref: 'tel:+79204547535',
    },
  } as const,

  timeline: [
    {
      time: '14:30',
      title: 'Сбор честного народа',
      desc: 'Начало гуляний!',
    },
    {
      time: '15:00',
      title: 'Регистрация',
      desc: 'Соединение сердец на веки вечные',
    },
    {
      time: '16:00',
      title: 'Пир на весь мир',
      desc: 'Время кушаний, тостов душевных да забав весёлых',
    },
    {
      time: '22:00',
      title: 'Завершение гуляний',
      desc: 'Пора и честь знать',
    },
  ] as const,

  dressCode: {
    title: 'Глава 4. Одеяния',
    description:
      'Молодцы прекрасные да девицы-красавицы, не будем стращать вас одеяниями специальными. Выбирайте наряд по душе угодный, но если кокошник да лапти вам приглянутся, то советуем в них скорей обернуться.',
  } as const,

  details: {
    flowers: {
      tgUrl: 'https://t.me/florist4lovers',
      maxUrl:
        'https://max.ru/u/f9LHodD0cOLQy8H-jG7UksUj5TRmk8yGd4V__22bfWI-ZiIsNntCIU2Cczw',
      cliche: 'Добрый день! Хотим пополнить цветочный банк Семёна и Марты',
    },
    chat: {
      tgUrl: 'https://t.me/+2d10dhgFWs5jZTVi',
      maxUrl:
        'https://max.ru/join/6wgViT6iOIEe9gIO_XvBA2iS6VCLBOXZRaTzgGjOeSQ',
    },
  } as const,

  musicUrl: '/music/lish-do-utra.mp3',
} as const

export const SLIDES: { id: SlideName; label: string }[] = [
  { id: 'cover', label: 'Жили-были' },
  { id: 'date', label: 'Глава 1. Время' },
  { id: 'venue', label: 'Глава 2. Места действа' },
  { id: 'program', label: 'Глава 3. Как всё пройдёт' },
  { id: 'dress', label: 'Глава 4. Одеяния' },
  { id: 'details', label: 'Глава 5. Детали важные' },
  { id: 'rsvp', label: 'Глава 6. Анкета' },
  { id: 'contacts', label: 'Заключение' },
]
