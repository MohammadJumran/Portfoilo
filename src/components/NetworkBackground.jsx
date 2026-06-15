/**
 * Subtle, performance-friendly background: an animated network grid plus a few
 * soft glow blooms and travelling "data flow" pulses. Pure CSS — no canvas,
 * no JS loop — so it stays cheap and keeps Lighthouse happy.
 *
 * `variant` tweaks the glow palette/placement per section.
 */
export const NetworkBackground = ({ variant = "default", flows = true }) => {
  const glows = {
    default: (
      <>
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-highlight/5 blur-3xl" />
      </>
    ),
    hero: (
      <>
        <div className="absolute top-10 left-1/4 w-[32rem] h-[32rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </>
    ),
    muted: (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-primary/5 blur-3xl" />
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid (drifts subtly with the mouse) */}
      <div className="absolute inset-0 parallax-soft">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40 animate-grid-pan" />
      </div>

      {/* Glow blooms (drift further for a parallax depth effect) */}
      <div className="absolute inset-0 parallax-strong">
        {glows[variant] ?? glows.default}
      </div>

      {/* Vertical data-flow pulses */}
      {flows && (
        <>
          {[15, 38, 62, 85].map((left, i) => (
            <div
              key={left}
              className="absolute top-0 h-24 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent animate-data-flow"
              style={{
                left: `${left}%`,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};
