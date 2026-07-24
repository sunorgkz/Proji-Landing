import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animated SVG cover: Proji as a living system —
 * agents, knowledge, and tasks orbiting a calm center.
 */
export const HeroIllustration: React.FC = () => {
  const reduced = useReducedMotion();

  const orbit = reduced
    ? {}
    : {
        animate: { rotate: 360 },
        transition: { duration: 48, repeat: Infinity, ease: 'linear' as const },
      };

  const orbitRev = reduced
    ? {}
    : {
        animate: { rotate: -360 },
        transition: { duration: 36, repeat: Infinity, ease: 'linear' as const },
      };

  const pulse = reduced
    ? {}
    : {
        animate: { scale: [1, 1.06, 1], opacity: [0.55, 0.9, 0.55] },
        transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' as const },
      };

  const float = (delay = 0) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const, delay },
        };

  const dash = reduced
    ? {}
    : {
        animate: { strokeDashoffset: [0, -120] },
        transition: { duration: 8, repeat: Infinity, ease: 'linear' as const },
      };

  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square select-none" aria-hidden>
      {/* Soft glow behind the drawing */}
      <div className="absolute inset-[12%] rounded-full bg-brand-400/15 dark:bg-brand-500/20 blur-3xl pointer-events-none" />

      <svg
        viewBox="0 0 560 560"
        className="relative w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(14,165,233)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="rgb(56,189,248)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(14,165,233)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="hero-core" x1="20%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="rgb(56,189,248)" />
            <stop offset="100%" stopColor="rgb(14,116,144)" />
          </linearGradient>
          <linearGradient id="hero-node" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(224,242,254)" />
            <stop offset="100%" stopColor="rgb(125,211,252)" />
          </linearGradient>
          <filter id="hero-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer guide rings */}
        <circle cx="280" cy="280" r="230" stroke="url(#hero-ring)" strokeWidth="1.2" className="opacity-40 dark:opacity-60" />
        <circle cx="280" cy="280" r="175" stroke="currentColor" strokeWidth="1" className="text-slate-300/50 dark:text-white/10" strokeDasharray="4 10" />
        <circle cx="280" cy="280" r="118" stroke="currentColor" strokeWidth="1" className="text-brand-400/30 dark:text-brand-400/25" />

        {/* Animated dashed orbit paths */}
        <motion.g style={{ transformOrigin: '280px 280px' }} {...orbit}>
          <motion.circle
            cx="280"
            cy="280"
            r="205"
            stroke="rgb(14,165,233)"
            strokeWidth="1.5"
            strokeDasharray="14 18"
            strokeOpacity="0.45"
            {...dash}
          />
        </motion.g>

        <motion.g style={{ transformOrigin: '280px 280px' }} {...orbitRev}>
          <motion.circle
            cx="280"
            cy="280"
            r="148"
            stroke="rgb(56,189,248)"
            strokeWidth="1.2"
            strokeDasharray="8 14"
            strokeOpacity="0.35"
            {...dash}
          />
        </motion.g>

        {/* Connection beams into the core */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 280 + Math.cos(rad) * 200;
          const y2 = 280 + Math.sin(rad) * 200;
          return (
            <motion.line
              key={deg}
              x1="280"
              y1="280"
              x2={x2}
              y2={y2}
              stroke="rgb(14,165,233)"
              strokeWidth="1"
              strokeOpacity="0.22"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={reduced ? undefined : { pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.08 }}
            />
          );
        })}

        {/* Orbiting agent nodes */}
        <motion.g style={{ transformOrigin: '280px 280px' }} {...orbit}>
          {[
            { angle: 15, label: 'HR', r: 205 },
            { angle: 95, label: 'Sales', r: 205 },
            { angle: 175, label: 'Fin', r: 205 },
            { angle: 255, label: 'Legal', r: 205 },
            { angle: 320, label: 'Ops', r: 205 },
          ].map((n, i) => {
            const rad = (n.angle * Math.PI) / 180;
            const x = 280 + Math.cos(rad) * n.r;
            const y = 280 + Math.sin(rad) * n.r;
            return (
              <motion.g key={n.label} {...float(i * 0.35)}>
                <circle cx={x} cy={y} r="22" fill="url(#hero-node)" filter="url(#hero-soft)" className="dark:opacity-95" />
                <circle cx={x} cy={y} r="22" fill="none" stroke="rgb(14,165,233)" strokeWidth="1.5" strokeOpacity="0.5" />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  className="fill-slate-700 dark:fill-slate-800"
                  style={{ fontSize: 11, fontWeight: 700, fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {n.label}
                </text>
              </motion.g>
            );
          })}
        </motion.g>

        {/* Inner knowledge chips */}
        <motion.g style={{ transformOrigin: '280px 280px' }} {...orbitRev}>
          {[
            { angle: 40, r: 148 },
            { angle: 160, r: 148 },
            { angle: 280, r: 148 },
          ].map((n, i) => {
            const rad = (n.angle * Math.PI) / 180;
            const x = 280 + Math.cos(rad) * n.r;
            const y = 280 + Math.sin(rad) * n.r;
            return (
              <motion.g key={i} {...pulse}>
                <rect
                  x={x - 14}
                  y={y - 14}
                  width="28"
                  height="28"
                  rx="8"
                  fill="rgb(14,165,233)"
                  fillOpacity="0.18"
                  stroke="rgb(56,189,248)"
                  strokeWidth="1.2"
                />
                <circle cx={x} cy={y} r="4" fill="rgb(14,165,233)" />
              </motion.g>
            );
          })}
        </motion.g>

        {/* Traveling task dots along outer ring */}
        {!reduced &&
          [0, 1, 2].map(i => (
            <motion.circle
              key={`dot-${i}`}
              r="4.5"
              fill="rgb(14,165,233)"
              filter="url(#hero-soft)"
              animate={{
                cx: [
                  280 + 205 * Math.cos(((i * 120) * Math.PI) / 180),
                  280 + 205 * Math.cos((((i * 120) + 120) * Math.PI) / 180),
                  280 + 205 * Math.cos((((i * 120) + 240) * Math.PI) / 180),
                  280 + 205 * Math.cos((((i * 120) + 360) * Math.PI) / 180),
                ],
                cy: [
                  280 + 205 * Math.sin(((i * 120) * Math.PI) / 180),
                  280 + 205 * Math.sin((((i * 120) + 120) * Math.PI) / 180),
                  280 + 205 * Math.sin((((i * 120) + 240) * Math.PI) / 180),
                  280 + 205 * Math.sin((((i * 120) + 360) * Math.PI) / 180),
                ],
              }}
              transition={{ duration: 14 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.2 }}
            />
          ))}

        {/* Center core — Proji */}
        <motion.g {...pulse}>
          <circle cx="280" cy="280" r="58" fill="url(#hero-core)" filter="url(#hero-soft)" />
          <circle cx="280" cy="280" r="58" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="280" cy="280" r="42" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 6" />
        </motion.g>

        <text
          x="280"
          y="276"
          textAnchor="middle"
          fill="white"
          style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em', fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Proji
        </text>
        <text
          x="280"
          y="298"
          textAnchor="middle"
          fill="white"
          fillOpacity="0.75"
          style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          ОС БИЗНЕСА
        </text>

        {/* Subtle spark marks */}
        {!reduced &&
          [
            { x: 92, y: 120 },
            { x: 460, y: 150 },
            { x: 480, y: 400 },
            { x: 88, y: 420 },
          ].map((p, i) => (
            <motion.path
              key={`spark-${i}`}
              d={`M${p.x} ${p.y - 8} L${p.x} ${p.y + 8} M${p.x - 8} ${p.y} L${p.x + 8} ${p.y}`}
              stroke="rgb(56,189,248)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.55 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          ))}
      </svg>
    </div>
  );
};
