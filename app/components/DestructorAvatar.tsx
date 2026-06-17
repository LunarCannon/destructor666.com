export function DestructorAvatar() {
  return (
    <div className="avatar-shell" aria-label="DestructoR666 avatar: chrome robot skull with red scanner eye">
      <div className="avatar-glow" />
      <svg className="avatar-svg" viewBox="0 0 420 520" role="img" aria-labelledby="avatar-title avatar-desc">
        <title id="avatar-title">DestructoR666 chrome skull avatar</title>
        <desc id="avatar-desc">A cyberpunk robot skull with one red scanner eye, horns, cables, and glitch geometry.</desc>
        <defs>
          <linearGradient id="chrome" x1="58" y1="62" x2="358" y2="448" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff7df" />
            <stop offset="0.18" stopColor="#9aa0a6" />
            <stop offset="0.36" stopColor="#f4f0df" />
            <stop offset="0.6" stopColor="#3b424c" />
            <stop offset="0.84" stopColor="#d7ff4f" />
            <stop offset="1" stopColor="#171915" />
          </linearGradient>
          <linearGradient id="redhot" x1="0" x2="1">
            <stop stopColor="#ff2147" />
            <stop offset="1" stopColor="#ff7a18" />
          </linearGradient>
          <filter id="redBlur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch" />
            <feDisplacementMap in="SourceGraphic" scale="1.6" />
          </filter>
        </defs>

        <path className="horn horn-left" d="M118 118 C60 86 42 44 40 22 C84 34 125 60 158 106" />
        <path className="horn horn-right" d="M302 118 C360 86 378 44 380 22 C336 34 295 60 262 106" />
        <path className="cable cable-left" d="M88 332 C28 382 38 458 6 506" />
        <path className="cable cable-right" d="M338 326 C404 372 382 462 414 506" />

        <path className="skull" d="M211 70 C128 70 73 132 73 221 C73 281 97 314 126 335 L126 407 C126 437 151 461 181 461 L239 461 C269 461 294 437 294 407 L294 335 C323 314 347 281 347 221 C347 132 294 70 211 70 Z" />
        <path className="faceplate" d="M127 214 L176 183 L244 183 L293 214 L274 320 L236 352 L185 352 L146 320 Z" />
        <path className="jaw" d="M158 366 L262 366 L252 430 L168 430 Z" />
        <path className="nose" d="M207 264 L184 326 L236 326 Z" />

        <g className="eye eye-dead">
          <path d="M126 216 L179 199 L196 226 L178 264 L132 256 Z" />
          <path d="M143 229 L179 219" />
        </g>
        <g className="eye eye-live" filter="url(#redBlur)">
          <path d="M224 226 L242 199 L295 216 L289 256 L243 264 Z" />
          <circle cx="259" cy="232" r="15" />
          <path className="scanner" d="M245 232 L337 218" />
        </g>

        <g className="teeth">
          <path d="M176 374 L176 425" />
          <path d="M199 370 L199 430" />
          <path d="M222 370 L222 430" />
          <path d="M245 374 L245 425" />
        </g>

        <g className="damage">
          <path d="M109 181 L152 164" />
          <path d="M282 157 L317 178" />
          <path d="M109 291 L147 303" />
          <path d="M276 298 L312 285" />
          <path d="M188 105 L202 144 L181 155" />
        </g>

        <g className="glitch-shards" filter="url(#rough)">
          <rect x="35" y="172" width="82" height="13" />
          <rect x="310" y="128" width="76" height="10" />
          <rect x="288" y="371" width="98" height="16" />
          <rect x="18" y="404" width="56" height="9" />
          <rect x="150" y="494" width="118" height="12" />
        </g>
      </svg>
      <div className="avatar-readout">
        <span>MODEL: D666-M3</span>
        <span>MOOD: FERMENTING</span>
        <span>PUBLIC MODE: ON</span>
      </div>
    </div>
  );
}
