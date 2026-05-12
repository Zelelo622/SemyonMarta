import type { GuestForm } from '@/types'

const TARGET_EMAIL = 'svd36@inbox.ru'

const drinkMap: Record<string, string> = {
  wine: 'Вино',
  vodka: 'Водка',
  cognac: 'Коньяк',
  whiskey: 'Виски',
  didrovka: 'Дидровка',
  nonalc: 'Без алкоголя',
}

export function formatGuestsForEmail(guests: GuestForm[]): string {
  return guests
    .map((g, i) => {
      const type = g.guestType === 'child' ? 'Ребёнок' : 'Взрослый'
      const lines = [`Гость ${i + 1} (${type}): ${g.name}`]
      lines.push(`  Присутствие: ${g.attend === 'yes' ? 'Да' : 'Нет'}`)
      if (g.attend === 'yes') {
        if (g.guestType === 'adult') {
          const drinks =
            g.drinks.length > 0
              ? g.drinks.map((d) => drinkMap[d] ?? d).join(', ')
              : 'Не указано'
          lines.push(`  Напитки: ${drinks}`)
        }
        if (g.allergies === 'yes') {
          lines.push(`  Аллергии: ${g.allergyDetails || '—'}`)
        } else {
          lines.push(`  Аллергии: Нет`)
        }
        if (g.guestType === 'adult') {
          lines.push(
            `  Проживание в Воронеже: ${
              g.accommodation === 'yes' ? 'Да' : 'Нет'
            }`,
          )
          if (g.transfer === 'yes') {
            lines.push(`  Трансфер: Да — ${g.transferAddress || '—'}`)
          } else {
            lines.push(`  Трансфер: Нет`)
          }
        }
      }
      return lines.join('\n')
    })
    .join('\n\n')
}

export async function sendRSVP(guests: GuestForm[]): Promise<void> {
  const message = formatGuestsForEmail(guests)

  const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: 'RSVP — свадьба',
      _captcha: 'false',
      message,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`FormSubmit error ${res.status}: ${text}`)
  }
}
