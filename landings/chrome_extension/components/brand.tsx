export function Logo({ size = 40 }: { size?: number }) {
  return (
    <div
      className="shimmer-bg relative grid place-items-center rounded-xl text-white soft-shadow"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.55}
        height={size * 0.55}
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.5l4 4 10-10" />
      </svg>
    </div>
  );
}

export function Wordmark({ word, size = "text-base" }: { word: string; size?: string }) {
  return (
    <div className={`flex items-baseline gap-2 ${size}`}>
      <span className="font-bold tracking-tight lowercase">proji</span>
      <span className="font-light text-muted-foreground lowercase">chrome extension</span>
    </div>
  );
}
