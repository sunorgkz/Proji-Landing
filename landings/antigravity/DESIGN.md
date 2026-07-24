# Антигравити — Design Context

## Register
Brand (landing). Reference: Vercel dark monochrome + Apple product reveal pacing.

## Voice
Orbital, mechanical, weightless, precise.

## Scene
Mission control at 3am — obsidian panels, cold starlight, one warm ignition at launch.

## Color strategy
Drenched dark surface + restrained pearl accents. No cyan, no purple gradients, no cream.

```css
--ag-bg: oklch(0.07 0.018 268);
--ag-surface: oklch(0.11 0.022 268);
--ag-ink: oklch(0.96 0.006 268);
--ag-muted: oklch(0.58 0.022 268);
--ag-accent: oklch(0.88 0.04 85);
--ag-glow: oklch(0.62 0.14 255);
```

## Typography
- Display: Bricolage Grotesque
- Body: Albert Sans
- No uppercase section eyebrows. No icon tiles above headings.

## Motion
- ONE hero choreography on load (framer-motion stagger).
- Scroll-linked dashboard zoom only in block 4.
- No fade-on-scroll on every section.

## Bans
Glass card grid, Syne/DM Sans, bounce easing, numbered eyebrows, generic cyan accent.
