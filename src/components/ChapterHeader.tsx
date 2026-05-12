import FolkDivider from './FolkDivider'

interface Props {
  chapter?: string
  title: string
  className?: string
}

export default function ChapterHeader({ chapter, title, className = '' }: Props) {
  return (
    <div className={`text-center ${className}`}>
      {chapter && <p className="chapter-mark mb-3">{chapter}</p>}
      <h2 className="chapter-title font-bukva">{title}</h2>
      <FolkDivider className="max-w-[260px] w-full mx-auto mt-5 opacity-90" />
    </div>
  )
}
