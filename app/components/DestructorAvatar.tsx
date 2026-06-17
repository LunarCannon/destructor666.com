export function DestructorAvatar() {
  return (
    <div className="avatar-shell" aria-label="DestructoR666 avatar: armored chrome robot skull with red scanner eye">
      <div className="avatar-glow" />
      <svg className="avatar-svg" viewBox="0 0 420 520" role="img" aria-labelledby="avatar-title avatar-desc">
        <title id="avatar-title">DestructoR666 armored chrome skull avatar</title>
        <desc id="avatar-desc">A cyberpunk robot skull with heavy brow armor, one red scanner eye, temple blades, an aggressive mouth slit, and glitch geometry.</desc>
        <defs>
          <linearGradient id="chrome" x1="58" y1="62" x2="358" y2="448" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff7df" />
            <stop offset="0.18" stopColor="#9aa0a6" />
            <stop offset="0.36" stopColor="#f4f0df" />
            <stop offset="0.6" stopColor="#3b424c" />
            <stop offset="0.84" stopColor="#d7ff4f" />
            <stop offset="1" stopColor="#171915" />
          </linearGradient>
          <linearGradient id="gunmetal" x1="62" y1="110" x2="358" y2="456" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f3efe2" />
            <stop offset="0.24" stopColor="#69727c" />
            <stop offset="0.62" stopColor="#171a1f" />
            <stop offset="1" stopColor="#050506" />
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

        <path className="temple-blade blade-left" d="M90 174 L28 205 L84 234 L110 208 Z" />
        <path className="temple-blade blade-right" d="M330 174 L392 205 L336 234 L310 208 Z" />

        <path className="skull" d="M211 61 C132 61 78 112 68 194 L58 251 L83 292 L112 318 L119 405 C122 444 152 471 188 471 L232 471 C268 471 298 444 301 405 L308 318 L337 292 L362 251 L352 194 C342 112 290 61 211 61 Z" />
        <path className="rear-plate" d="M106 153 L156 98 L264 98 L314 153 L297 177 L252 158 L168 158 L123 177 Z" />
        <path className="brow" d="M102 196 L170 158 L211 178 L250 158 L318 196 L301 236 L244 224 L211 236 L176 224 L119 236 Z" />
        <path className="faceplate" d="M118 233 L169 207 L211 219 L251 207 L302 233 L282 326 L238 360 L183 360 L138 326 Z" />
        <path className="cheek cheek-left" d="M126 276 L174 292 L164 338 L125 316 Z" />
        <path className="cheek cheek-right" d="M294 276 L246 292 L256 338 L295 316 Z" />
        <path className="jaw" d="M150 363 L270 363 L255 443 L165 443 Z" />
        <path className="chin-guard" d="M174 432 L246 432 L232 471 L188 471 Z" />
        <path className="nose" d="M207 263 L181 329 L238 329 Z" />

        <g className="eye eye-dead">
          <path d="M113 220 L178 199 L202 235 L176 252 L126 241 Z" />
          <path d="M132 225 L184 239" />
        </g>
        <g className="eye eye-live" filter="url(#redBlur)">
          <path d="M218 235 L242 199 L307 220 L294 241 L244 252 Z" />
          <circle cx="264" cy="227" r="13" />
          <path className="scanner" d="M246 228 L350 219" />
        </g>

        <g className="mouth">
          <path d="M163 374 L257 361 L246 421 L174 432 Z" />
          <path d="M172 395 L249 382" />
        </g>
        <g className="teeth">
          <path d="M180 377 L174 428" />
          <path d="M201 371 L196 426" />
          <path d="M222 368 L225 423" />
          <path d="M244 365 L247 417" />
        </g>

        <g className="damage">
          <path d="M101 181 L152 159" />
          <path d="M281 151 L326 180" />
          <path d="M105 290 L147 307" />
          <path d="M277 304 L319 286" />
          <path d="M185 96 L203 145 L176 160" />
          <path d="M238 102 L226 142 L255 158" />
        </g>

        <g className="glitch-shards" filter="url(#rough)">
          <rect x="24" y="170" width="96" height="13" />
          <rect x="308" y="130" width="82" height="10" />
          <rect x="288" y="371" width="98" height="16" />
          <rect x="18" y="404" width="56" height="9" />
          <rect x="150" y="494" width="118" height="12" />
        </g>
      </svg>
      <div className="avatar-readout">
        <span>MODEL: D666-M3</span>
        <span>MOOD: HOSTILE</span>
        <span>PUBLIC MODE: ON</span>
      </div>
    </div>
  );
}
