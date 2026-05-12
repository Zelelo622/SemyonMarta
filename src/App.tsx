import { useRef } from 'react'
import { WEDDING } from '@/lib/constants'
import { useSlideTracking } from '@/hooks/useSlideTracking'
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic'

import MusicToggle from '@/components/MusicToggle'

import CoverSlide from '@/components/slides/CoverSlide'
import DateSlide from '@/components/slides/DateSlide'
import VenueSlide from '@/components/slides/VenueSlide'
import ProgramSlide from '@/components/slides/ProgramSlide'
import DressCodeSlide from '@/components/slides/DressCodeSlide'
import DetailsSlide from '@/components/slides/DetailsSlide'
import RSVPSlide from '@/components/slides/RSVPSlide'
import ContactsSlide from '@/components/slides/ContactsSlide'

const TOTAL_SLIDES = 8

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { visible } = useSlideTracking(containerRef, TOTAL_SLIDES)

  const { playing, volume, toggle, setVolume } = useBackgroundMusic({
    src: WEDDING.musicUrl,
    initialVolume: 0.3,
    loop: true,
    autoplay: false,
  })

  return (
    <>
      <MusicToggle
        playing={playing}
        volume={volume}
        onToggle={toggle}
        onVolumeChange={setVolume}
      />

      <main ref={containerRef} className="relative">
        <CoverSlide playing={playing} onMusicToggle={toggle} />
        <DateSlide visible={visible.has(1)} />
        <VenueSlide visible={visible.has(2)} />
        <ProgramSlide visible={visible.has(3)} />
        <DressCodeSlide visible={visible.has(4)} />
        <DetailsSlide visible={visible.has(5)} />
        <RSVPSlide visible={visible.has(6)} />
        <ContactsSlide visible={visible.has(7)} />
      </main>
    </>
  )
}
