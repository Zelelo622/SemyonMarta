interface Props {
  className?: string
  color?: string
}

export default function Balalaika({
  className = '',
  color = '#B81E26',
}: Props) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1.5" fill={color}>
        <path d="M100 180 L30 270 L170 270 Z" fillOpacity="0.92" />
        <g fill="#F5EBDC" stroke="none">
          <circle cx="100" cy="240" r="14" />
        </g>
        <g stroke="#F5EBDC" strokeWidth="1" fill="none">
          <circle cx="100" cy="240" r="10" />
          <circle cx="100" cy="240" r="5" />
        </g>
        <g fill="#F5EBDC" stroke="none">
          <circle cx="70" cy="252" r="2.5" />
          <circle cx="130" cy="252" r="2.5" />
          <circle cx="62" cy="262" r="1.8" />
          <circle cx="138" cy="262" r="1.8" />
          <circle cx="84" cy="262" r="1.5" />
          <circle cx="116" cy="262" r="1.5" />
          <path d="M100 218 L98 222 L102 222 Z" />
        </g>

        <rect x="96" y="60" width="8" height="120" fill={color} />

        <path
          d="M88 30 L88 60 L112 60 L112 30 C112 24 108 20 100 20 C92 20 88 24 88 30 Z"
          fill={color}
        />

        <g fill="#F5EBDC" stroke="none">
          <circle cx="93" cy="35" r="1.8" />
          <circle cx="107" cy="35" r="1.8" />
          <circle cx="100" cy="45" r="1.8" />
        </g>

        <g stroke="#F5EBDC" strokeWidth="0.7" fill="none">
          <line x1="97" y1="50" x2="93" y2="240" />
          <line x1="100" y1="50" x2="100" y2="240" />
          <line x1="103" y1="50" x2="107" y2="240" />
        </g>

        <g stroke="#F5EBDC" strokeWidth="0.5" fill="none">
          {[80, 100, 120, 140, 160].map((y) => (
            <line key={y} x1="96" y1={y} x2="104" y2={y} />
          ))}
        </g>

        <rect
          x="92"
          y="222"
          width="16"
          height="3"
          fill="#F5EBDC"
          stroke="none"
        />
      </g>
    </svg>
  )
}
