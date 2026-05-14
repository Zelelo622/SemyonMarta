import { useRef } from 'react'
import { WEDDING } from '@/lib/constants'
import { useSlideTracking } from '@/hooks/useSlideTracking'
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic'

import MusicToggle from '@/components/MusicToggle'
import KhokhlomaBorder from '@/components/KhokhlomaBorder'

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

  const { playing, loading, volume, toggle, setVolume } = useBackgroundMusic({
    src: WEDDING.musicUrl,
    initialVolume: 0.3,
    loop: true,
  })

  return (
    <>
      {/* <MusicToggle
        playing={playing}
        volume={volume}
        onToggle={toggle}
        onVolumeChange={setVolume}
      /> */}

      <main ref={containerRef} className="relative">
        <CoverSlide playing={playing} loading={loading} volume={volume} onMusicToggle={toggle} onVolumeChange={setVolume} />
        <KhokhlomaBorder />
        <DateSlide visible={visible.has(1)} />
        <KhokhlomaBorder />
        <VenueSlide visible={visible.has(2)} />
        <KhokhlomaBorder />
        <ProgramSlide visible={visible.has(3)} />
        <KhokhlomaBorder />
        <DressCodeSlide visible={visible.has(4)} />
        <KhokhlomaBorder />
        <DetailsSlide visible={visible.has(5)} />
        <KhokhlomaBorder />
        <RSVPSlide visible={visible.has(6)} />
        <KhokhlomaBorder />
        <ContactsSlide visible={visible.has(7)} />
      </main>
    </>
  )
}
