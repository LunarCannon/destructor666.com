export function DestructorAvatar() {
  return (
    <div className="avatar-shell" aria-label="DestructoR666 avatar: Terminator portrait rendered as cyberpunk dot matrix">
      <div className="avatar-glow" />
      <div className="avatar-image-frame">
        <img
          className="avatar-image"
          src="/assets/destructor666-avatar-dotmatrix.webp"
          alt="DestructoR666 Terminator avatar rendered in a cyberpunk dot-matrix style"
        />
        <div className="avatar-targeting" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="avatar-readout">
        <span>MODEL: D666-T800</span>
        <span>STYLE: DOT MATRIX</span>
        <span>PUBLIC MODE: ON</span>
      </div>
    </div>
  );
}
