import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  passed: boolean
}

export function useCountdown(target: Date): Countdown {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = target.getTime() - now
  const passed = diff <= 0
  const abs = Math.max(0, diff)

  const days = Math.floor(abs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((abs / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((abs / (1000 * 60)) % 60)
  const seconds = Math.floor((abs / 1000) % 60)

  return { days, hours, minutes, seconds, passed }
}
