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
            if (!entry.isIntersecting) continue
            const idx = Number(
              (entry.target as HTMLElement).dataset.slideIndex,
            )
            // Mark all slides up to this index as visible — handles fast-scroll
            // where intermediate slides are never observed at threshold
            for (let i = 0; i <= idx; i++) {
              if (!next.has(i)) {
                next.add(i)
                changed = true
              }
            }
          }
          return changed ? next : prev
        })
      },
      {
        // Fire as soon as any pixel of the slide is in the extended viewport.
        // Positive bottom margin pre-triggers the animation before the slide
        // fully enters view, so fast-fling users see content already rendered.
        rootMargin: '0px 0px 150px 0px',
        threshold: 0,
      },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [containerRef, totalSlides])

  return { visible }
}
