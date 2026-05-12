interface Props {
  className?: string
  color?: string
  flip?: boolean
}

export default function Rooster({
  className = '',
  color = '#B81E26',
  flip = false,
}: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1.2" fill={color}>
        <path d="M28 50 C24 42 28 32 38 30 C46 28 54 32 56 40 C58 48 54 56 46 58 L36 58 C30 58 26 54 28 50 Z" />
        <path
          fill="none"
          strokeLinecap="round"
          d="M56 42 C66 38 70 30 68 22 M58 44 C68 44 74 38 74 30 M58 46 C68 48 74 46 76 40"
        />
        <path d="M38 30 C36 26 38 22 42 22 C40 18 44 16 46 20 C48 16 52 18 50 22 C54 22 56 26 54 30 Z" />
        <path d="M54 36 L60 36 L56 40 Z" />
        <circle cx="50" cy="34" r="1" fill="#F5EBDC" stroke="none" />
        <path
          fill="none"
          strokeLinecap="round"
          d="M38 58 L36 66 M36 66 L32 70 M36 66 L40 70 M36 66 L36 70 M46 58 L48 66 M48 66 L44 70 M48 66 L52 70 M48 66 L48 70"
        />
        <circle cx="40" cy="42" r="1.2" fill="#F5EBDC" stroke="none" />
        <circle cx="46" cy="46" r="1" fill="#F5EBDC" stroke="none" />
        <circle cx="42" cy="50" r="0.8" fill="#F5EBDC" stroke="none" />
      </g>
    </svg>
  )
}
