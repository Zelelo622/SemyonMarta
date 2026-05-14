interface Props {
  className?: string
}

export default function KhokhlomaBorder({ className = '' }: Props) {
  const G = '#d4960a'
  const R = '#c8200a'
  const D = '#1c1205'
  const N = '#3a6b20'

  return (
    <svg
      viewBox="0 0 640 80"
      className={`w-full block relative z-[3] ${className}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Lacquered background */}
      <rect width="640" height="80" fill="#EFE3CE" />

      {/* Gold border strips */}
      <rect y="0" width="640" height="5" fill={G} />
      <rect y="75" width="640" height="5" fill={G} />

      {/* Inner dashed lines */}
      <line x1="0" y1="10.5" x2="640" y2="10.5" stroke={G} strokeWidth="0.8" strokeDasharray="4 5" opacity="0.55" />
      <line x1="0" y1="69.5" x2="640" y2="69.5" stroke={G} strokeWidth="0.8" strokeDasharray="4 5" opacity="0.55" />

      {/* Main vine — gentle wave */}
      <path
        d="M0,40 C30,33 50,47 80,40 C110,33 130,47 160,40 C190,33 210,47 240,40 C270,33 295,47 320,40 C345,33 370,47 400,40 C430,33 450,47 480,40 C510,33 530,47 560,40 C590,33 610,47 640,40"
        stroke={G} strokeWidth="1.5" fill="none"
      />

      {/* ── CENTER: 6-petal rosette ── */}
      <g transform="translate(320,40)">
        <ellipse cx="0" cy="-9" rx="4.5" ry="8.5" fill={R} />
        <ellipse cx="7.79" cy="-4.5" rx="4.5" ry="8.5" fill={G} transform="rotate(60,7.79,-4.5)" />
        <ellipse cx="7.79" cy="4.5" rx="4.5" ry="8.5" fill={R} transform="rotate(120,7.79,4.5)" />
        <ellipse cx="0" cy="9" rx="4.5" ry="8.5" fill={G} transform="rotate(180,0,9)" />
        <ellipse cx="-7.79" cy="4.5" rx="4.5" ry="8.5" fill={R} transform="rotate(240,-7.79,4.5)" />
        <ellipse cx="-7.79" cy="-4.5" rx="4.5" ry="8.5" fill={G} transform="rotate(300,-7.79,-4.5)" />
        <circle cx="0" cy="0" r="6.5" fill={G} />
        <circle cx="0" cy="0" r="4" fill={R} />
        <circle cx="0" cy="0" r="1.8" fill={D} />
      </g>

      {/* ── x=240: Berry cluster above vine ── */}
      <g transform="translate(240,40)">
        <line x1="0" y1="-2" x2="-8" y2="-15" stroke={G} strokeWidth="1" />
        <line x1="0" y1="-2" x2="0" y2="-17" stroke={G} strokeWidth="1" />
        <line x1="0" y1="-2" x2="8" y2="-15" stroke={G} strokeWidth="1" />
        <circle cx="-8" cy="-19" r="5" fill={R} />
        <circle cx="0" cy="-21" r="5" fill={R} />
        <circle cx="8" cy="-19" r="5" fill={R} />
        <circle cx="-7" cy="-20.5" r="1.6" fill="#f06060" opacity="0.45" />
        <circle cx="1" cy="-22.5" r="1.6" fill="#f06060" opacity="0.45" />
        <circle cx="9" cy="-20.5" r="1.6" fill="#f06060" opacity="0.45" />
        <circle cx="-8" cy="-19" r="1.5" fill={D} />
        <circle cx="0" cy="-21" r="1.5" fill={D} />
        <circle cx="8" cy="-19" r="1.5" fill={D} />
        <path d="M 0,-2 C 9,-4 16,-7 14,-12 C 8,-7 2,-4 0,-2 Z" fill={N} />
        <path d="M 0,-2 C -9,-4 -16,-7 -14,-12 C -8,-7 -2,-4 0,-2 Z" fill={N} />
      </g>

      {/* ── x=400: Berry cluster below vine ── */}
      <g transform="translate(400,40)">
        <line x1="0" y1="2" x2="-8" y2="15" stroke={G} strokeWidth="1" />
        <line x1="0" y1="2" x2="0" y2="17" stroke={G} strokeWidth="1" />
        <line x1="0" y1="2" x2="8" y2="15" stroke={G} strokeWidth="1" />
        <circle cx="-8" cy="19" r="5" fill={R} />
        <circle cx="0" cy="21" r="5" fill={R} />
        <circle cx="8" cy="19" r="5" fill={R} />
        <circle cx="-7" cy="18" r="1.6" fill="#f06060" opacity="0.45" />
        <circle cx="1" cy="20" r="1.6" fill="#f06060" opacity="0.45" />
        <circle cx="9" cy="18" r="1.6" fill="#f06060" opacity="0.45" />
        <circle cx="-8" cy="19" r="1.5" fill={D} />
        <circle cx="0" cy="21" r="1.5" fill={D} />
        <circle cx="8" cy="19" r="1.5" fill={D} />
        <path d="M 0,2 C 9,4 16,7 14,12 C 8,7 2,4 0,2 Z" fill={N} />
        <path d="M 0,2 C -9,4 -16,7 -14,12 C -8,7 -2,4 0,2 Z" fill={N} />
      </g>

      {/* ── x=160: Leaf pairs (above & below vine) ── */}
      <g transform="translate(160,40)">
        <path d="M 0,0 C -6,-7 -10,-15 -7,-22 C -2,-15 0,-7 0,0 Z" fill={G} />
        <line x1="0" y1="0" x2="-6" y2="-20" stroke={D} strokeWidth="0.8" />
        <path d="M 0,0 C 6,-7 10,-15 7,-22 C 2,-15 0,-7 0,0 Z" fill={R} />
        <line x1="0" y1="0" x2="6" y2="-20" stroke={D} strokeWidth="0.8" />
        <path d="M 0,0 C -6,7 -10,15 -7,22 C -2,15 0,7 0,0 Z" fill={R} />
        <line x1="0" y1="0" x2="-6" y2="20" stroke={D} strokeWidth="0.8" />
        <path d="M 0,0 C 6,7 10,15 7,22 C 2,15 0,7 0,0 Z" fill={G} />
        <line x1="0" y1="0" x2="6" y2="20" stroke={D} strokeWidth="0.8" />
      </g>

      {/* ── x=480: Leaf pairs (mirror of x=160) ── */}
      <g transform="translate(480,40)">
        <path d="M 0,0 C -6,-7 -10,-15 -7,-22 C -2,-15 0,-7 0,0 Z" fill={G} />
        <line x1="0" y1="0" x2="-6" y2="-20" stroke={D} strokeWidth="0.8" />
        <path d="M 0,0 C 6,-7 10,-15 7,-22 C 2,-15 0,-7 0,0 Z" fill={R} />
        <line x1="0" y1="0" x2="6" y2="-20" stroke={D} strokeWidth="0.8" />
        <path d="M 0,0 C -6,7 -10,15 -7,22 C -2,15 0,7 0,0 Z" fill={R} />
        <line x1="0" y1="0" x2="-6" y2="20" stroke={D} strokeWidth="0.8" />
        <path d="M 0,0 C 6,7 10,15 7,22 C 2,15 0,7 0,0 Z" fill={G} />
        <line x1="0" y1="0" x2="6" y2="20" stroke={D} strokeWidth="0.8" />
      </g>

      {/* ── x=80: Small 5-petal flower ── */}
      {/* Petal centers at dist=7.5 from (0,0), 72° apart starting up */}
      <g transform="translate(80,40)">
        <ellipse cx="0" cy="-7.5" rx="3" ry="5.5" fill={G} />
        <ellipse cx="7.13" cy="-2.32" rx="3" ry="5.5" fill={R} transform="rotate(72,7.13,-2.32)" />
        <ellipse cx="4.41" cy="6.07" rx="3" ry="5.5" fill={G} transform="rotate(144,4.41,6.07)" />
        <ellipse cx="-4.41" cy="6.07" rx="3" ry="5.5" fill={R} transform="rotate(216,-4.41,6.07)" />
        <ellipse cx="-7.13" cy="-2.32" rx="3" ry="5.5" fill={G} transform="rotate(288,-7.13,-2.32)" />
        <circle cx="0" cy="0" r="4" fill={G} />
        <circle cx="0" cy="0" r="2.5" fill={R} />
        <circle cx="0" cy="0" r="1.2" fill={D} />
      </g>

      {/* ── x=560: Small 5-petal flower (mirror) ── */}
      <g transform="translate(560,40)">
        <ellipse cx="0" cy="-7.5" rx="3" ry="5.5" fill={G} />
        <ellipse cx="7.13" cy="-2.32" rx="3" ry="5.5" fill={R} transform="rotate(72,7.13,-2.32)" />
        <ellipse cx="4.41" cy="6.07" rx="3" ry="5.5" fill={G} transform="rotate(144,4.41,6.07)" />
        <ellipse cx="-4.41" cy="6.07" rx="3" ry="5.5" fill={R} transform="rotate(216,-4.41,6.07)" />
        <ellipse cx="-7.13" cy="-2.32" rx="3" ry="5.5" fill={G} transform="rotate(288,-7.13,-2.32)" />
        <circle cx="0" cy="0" r="4" fill={G} />
        <circle cx="0" cy="0" r="2.5" fill={R} />
        <circle cx="0" cy="0" r="1.2" fill={D} />
      </g>

      {/* End diamonds */}
      <path d="M16,40 L24,33 L32,40 L24,47 Z" fill={G} />
      <path d="M608,40 L616,33 L624,40 L616,47 Z" fill={G} />
    </svg>
  )
}
