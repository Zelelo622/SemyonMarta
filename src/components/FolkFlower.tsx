interface Props {
  className?: string
  color?: string
}

export default function FolkFlower({
  className = '',
  color = '#B81E26',
}: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1" fill={color}>
        <circle cx="50" cy="50" r="6" />
        <g fill={color}>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="36"
              rx="5"
              ry="10"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
        </g>
        <circle cx="50" cy="50" r="2.5" fill="#F5EBDC" />

        <g fill={color} stroke="none">
          <path d="M50 22 C46 12 40 10 36 14 C40 18 46 22 50 22 Z" />
          <path d="M50 22 C54 12 60 10 64 14 C60 18 54 22 50 22 Z" />
          <path d="M50 78 C46 88 40 90 36 86 C40 82 46 78 50 78 Z" />
          <path d="M50 78 C54 88 60 90 64 86 C60 82 54 78 50 78 Z" />
          <path d="M22 50 C12 46 10 40 14 36 C18 40 22 46 22 50 Z" />
          <path d="M22 50 C12 54 10 60 14 64 C18 60 22 54 22 50 Z" />
          <path d="M78 50 C88 46 90 40 86 36 C82 40 78 46 78 50 Z" />
          <path d="M78 50 C88 54 90 60 86 64 C82 60 78 54 78 50 Z" />
        </g>

        <g fill={color}>
          <circle cx="20" cy="20" r="1.6" />
          <circle cx="80" cy="20" r="1.6" />
          <circle cx="20" cy="80" r="1.6" />
          <circle cx="80" cy="80" r="1.6" />
        </g>
      </g>
    </svg>
  )
}
