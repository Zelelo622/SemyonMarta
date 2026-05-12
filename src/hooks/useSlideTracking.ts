import { useEffect, useState, type RefObject } from 'react'

export function useSlideTracking(
  containerRef: RefObject<HTMLElement>,
  totalSlides: number,
) {
  const [visible, setVisible] = useState<Set<number>>(new Set([0]))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-slide-index]'),
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev)
          let changed = false
          for (const entry of entries) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.slideIndex,
            )
            if (entry.isIntersecting && !next.has(idx)) {
              next.add(idx)
              changed = true
            }
          }
          return changed ? next : prev
        })
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [containerRef, totalSlides])

  return { visible }
}
