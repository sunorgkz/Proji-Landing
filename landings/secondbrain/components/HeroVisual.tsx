export function HeroVisual() {
  const nodes = [
    { x: 20, y: 30, d: 0 },
    { x: 80, y: 20, d: 0.5 },
    { x: 85, y: 70, d: 1 },
    { x: 15, y: 80, d: 1.5 },
    { x: 50, y: 15, d: 0.8 },
    { x: 50, y: 85, d: 1.2 },
  ];
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      <div className="absolute inset-0 rounded-full bg-[var(--gradient-accent)] opacity-20 blur-3xl animate-pulse-glow" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke="url(#linkGrad)" strokeWidth="0.4"
            strokeDasharray="0.6 0.6"
            className="animate-pulse-glow"
            style={{ animationDelay: `${n.d}s` }}
          />
        ))}
        <defs>
          <linearGradient id="linkGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.22 255)" />
            <stop offset="100%" stopColor="oklch(0.55 0.25 295)" />
          </linearGradient>
        </defs>
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute h-3 w-3 rounded-full bg-[var(--electric)] shadow-[0_0_20px_oklch(0.62_0.22_255_/_0.8)] animate-float"
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", animationDelay: `${n.d}s` }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="logo-proji text-4xl px-6 py-3 rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-[var(--shadow-soft)]">
          proji
        </div>
      </div>
    </div>
  );
}
