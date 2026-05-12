interface Props {
  className?: string
  color?: string
}

export default function FolkDivider({
  className = '',
  color = '#B81E26',
}: Props) {
  return (
    <svg
      viewBox="0 0 320 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1" fill={color}>
        <circle cx="160" cy="12" r="3.5" />
      </g>
      <g stroke={color} strokeWidth="1" fill="none" strokeLinecap="round">
        <circle cx="160" cy="12" r="7" />
        <path d="M153 12 L167 12 M160 5 L160 19" />

        <path d="M148 12 C140 12 138 7 132 8 C126 9 124 12 118 12" />
        <path d="M148 12 C140 12 138 17 132 16 C126 15 124 12 118 12" />
        <circle cx="118" cy="12" r="2" fill={color} />
        <path d="M114 12 C108 12 104 12 96 12" />
        <path d="M96 12 C90 12 84 8 78 9" />
        <path d="M96 12 C90 12 84 16 78 15" />
        <circle cx="78" cy="12" r="1.6" fill={color} />
        <path d="M74 12 L52 12" />
        <path d="M52 12 C46 12 40 8 32 9" />
        <path d="M52 12 C46 12 40 16 32 15" />
        <circle cx="32" cy="12" r="1.4" fill={color} />
        <path d="M28 12 L4 12" />

        <path d="M172 12 C180 12 182 7 188 8 C194 9 196 12 202 12" />
        <path d="M172 12 C180 12 182 17 188 16 C194 15 196 12 202 12" />
        <circle cx="202" cy="12" r="2" fill={color} />
        <path d="M206 12 C212 12 216 12 224 12" />
        <path d="M224 12 C230 12 236 8 242 9" />
        <path d="M224 12 C230 12 236 16 242 15" />
        <circle cx="242" cy="12" r="1.6" fill={color} />
        <path d="M246 12 L268 12" />
        <path d="M268 12 C274 12 280 8 288 9" />
        <path d="M268 12 C274 12 280 16 288 15" />
        <circle cx="288" cy="12" r="1.4" fill={color} />
        <path d="M292 12 L316 12" />
      </g>
    </svg>
  )
}
