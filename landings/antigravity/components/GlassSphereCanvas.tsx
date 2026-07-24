import { useEffect, useRef } from "react";

export function GlassSphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.4 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const size = canvas.clientWidth;
      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.38;
      const { x: mx, y: my } = mouseRef.current;

      ctx.clearRect(0, 0, size, size);

      const floatY = Math.sin(time * 0.0008) * 6;
      const highlightX = cx + (mx - 0.5) * r * 0.55;
      const highlightY = cy + (my - 0.5) * r * 0.55 + floatY;

      const glow = ctx.createRadialGradient(cx, cy + floatY, r * 0.2, cx, cy + floatY, r * 1.4);
      glow.addColorStop(0, "oklch(0.55 0.12 255 / 0.18)");
      glow.addColorStop(1, "oklch(0.55 0.12 255 / 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      const body = ctx.createRadialGradient(
        highlightX - r * 0.25,
        highlightY - r * 0.3,
        r * 0.05,
        cx,
        cy + floatY,
        r,
      );
      body.addColorStop(0, "oklch(0.92 0.02 268 / 0.55)");
      body.addColorStop(0.35, "oklch(0.45 0.06 268 / 0.25)");
      body.addColorStop(0.72, "oklch(0.18 0.04 268 / 0.35)");
      body.addColorStop(1, "oklch(0.10 0.03 268 / 0.15)");

      ctx.beginPath();
      ctx.arc(cx, cy + floatY, r, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();

      const rim = ctx.createRadialGradient(cx, cy + floatY, r * 0.85, cx, cy + floatY, r);
      rim.addColorStop(0, "oklch(0.95 0.01 268 / 0)");
      rim.addColorStop(1, "oklch(0.95 0.02 268 / 0.35)");
      ctx.beginPath();
      ctx.arc(cx, cy + floatY, r, 0, Math.PI * 2);
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const spec = ctx.createRadialGradient(highlightX, highlightY, 0, highlightX, highlightY, r * 0.35);
      spec.addColorStop(0, "oklch(1 0 0 / 0.85)");
      spec.addColorStop(0.4, "oklch(0.95 0.01 268 / 0.2)");
      spec.addColorStop(1, "oklch(0.95 0.01 268 / 0)");
      ctx.beginPath();
      ctx.arc(highlightX, highlightY, r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="ag-sphere" aria-hidden>
      <canvas ref={canvasRef} className="ag-sphere__canvas" />
    </div>
  );
}
