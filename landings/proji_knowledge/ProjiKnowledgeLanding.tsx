import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { resetDocumentShell } from "../../lib/resetDocumentShell";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Ubuntu:wght@700&display=swap";

function useLandingFonts() {
  useEffect(() => {
    const id = "proji-knowledge-fonts";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
}

const C = {
  bg: "#05070E",
  bgSoft: "#0A0F1F",
  panel: "#0E1424",
  panel2: "#131B30",
  border: "rgba(120,160,255,.12)",
  borderStrong: "rgba(120,160,255,.22)",
  ink: "#E8EEFB",
  inkSoft: "#A8B4D0",
  muted: "#6E7A99",
  slate: "#4A5475",
  blue: "#3B82F6",
  blueBright: "#60A5FA",
  cyan: "#22D3EE",
  violet: "#8B5CF6",
  pink: "#EC4899",
  emerald: "#34D399",
  amber: "#FBBF24",
  rose: "#FB7185",
};

const tooltipPool = [
  "Назгуль К. — пилотные проекты",
  "Регламент R-245",
  "Проект CRM-2023",
  "Аян М. — запуски в регионах",
  "Регламент R-118 — бюджеты",
  "Проект Retail-2022",
  "Динара С. — комплаенс",
  "Регламент R-301 — закупки",
  "Проект HR-Tech-2024",
];

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function useMouse() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

function CountUp({ to, suffix = "", duration = 1600, start }: { to: number; suffix?: string; duration?: number; start: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return (
    <>
      {val}
      {suffix}
    </>
  );
}

function Wordmark({ size = 18, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <span
      style={{
        fontFamily: "Ubuntu, Inter, sans-serif",
        fontWeight: 700,
        fontSize: size,
        background: `linear-gradient(120deg, #fff 0%, ${C.blueBright} 60%, ${C.cyan} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "-0.015em",
        lineHeight: 1,
        textShadow: glow ? `0 0 40px ${C.blue}66` : "none",
      }}
    >
      proji studio
    </span>
  );
}

export default function ProjiKnowledgeLanding() {
  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = 'proji_knowledge';
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useLandingFonts();
  const [submitted, setSubmitted] = useState(false);
  const scrollY = useScrollY();
  const scrolled = scrollY > 12;
  const docH = typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 1;
  const progress = Math.min(1, scrollY / Math.max(1, docH));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="proji-knowledge-root" style={{ fontFamily: "Inter, system-ui, sans-serif", color: C.ink, background: C.bg, position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <style>{`
        .proji-knowledge-root { scroll-behavior: smooth; }
        .proji-knowledge-root ::selection { background: ${C.blue}; color: white; }
        .pj-container { max-width: 1240px; margin: 0 auto; padding: 0 32px; position: relative; }
        .pj-eyebrow { font-family: Inter, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${C.blueBright}; }
        .pj-h1 { font-family: Inter, sans-serif; font-weight: 600; font-size: clamp(44px, 6.4vw, 88px); line-height: 1.02; letter-spacing: -0.04em; margin: 0; }
        .pj-h2 { font-family: Inter, sans-serif; font-weight: 600; font-size: clamp(32px, 4.4vw, 56px); line-height: 1.08; letter-spacing: -0.03em; margin: 0; }
        .pj-h3 { font-family: Inter, sans-serif; font-size: 17px; font-weight: 600; margin: 0; letter-spacing: -0.005em; }
        .pj-body { font-size: 17px; line-height: 1.65; color: ${C.inkSoft}; font-weight: 400; }
        .pj-grad-text { background: linear-gradient(120deg, #fff 0%, ${C.blueBright} 50%, ${C.cyan} 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .pj-grad-text-2 { background: linear-gradient(120deg, ${C.violet} 0%, ${C.blue} 50%, ${C.cyan} 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .pj-btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 26px; border-radius: 999px; font-weight: 500; font-size: 15px; cursor: pointer; border: 1px solid transparent; transition: all .3s cubic-bezier(.2,.8,.2,1); text-decoration: none; font-family: Inter, sans-serif; position: relative; overflow: hidden; }
        .pj-btn-primary { background: linear-gradient(120deg, ${C.blue}, ${C.cyan}); color: white; box-shadow: 0 10px 40px -10px ${C.blue}99, inset 0 1px 0 rgba(255,255,255,.25); }
        .pj-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 60px -10px ${C.blue}cc, inset 0 1px 0 rgba(255,255,255,.35); }
        .pj-btn-ghost { background: rgba(255,255,255,.04); color: ${C.ink}; border-color: ${C.borderStrong}; backdrop-filter: blur(10px); }
        .pj-btn-ghost:hover { background: rgba(120,160,255,.1); border-color: ${C.blueBright}; }
        .pj-fade { opacity: 0; transform: translateY(28px); transition: opacity 1s cubic-bezier(.2,.8,.2,1), transform 1s cubic-bezier(.2,.8,.2,1); }
        .pj-fade.in { opacity: 1; transform: none; }
        .pj-section { padding: 140px 0; position: relative; }
        .pj-glass { background: linear-gradient(160deg, rgba(120,160,255,.06) 0%, rgba(120,160,255,.02) 100%); border: 1px solid ${C.border}; border-radius: 20px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .pj-card-glow { position: relative; }
        .pj-card-glow::before { content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, ${C.blueBright}55, transparent 40%, transparent 60%, ${C.violet}33); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; opacity: 0; transition: opacity .4s; }
        .pj-card-glow:hover::before { opacity: 1; }
        .pj-input { width: 100%; padding: 18px 0; border: 0; border-bottom: 1px solid ${C.border}; background: transparent; color: ${C.ink}; font-size: 17px; font-family: inherit; outline: none; transition: border-color .3s; }
        .pj-input::placeholder { color: ${C.muted}; }
        .pj-input:focus { border-color: ${C.blueBright}; }
        .pj-num { font-family: Inter, sans-serif; font-weight: 200; font-variant-numeric: tabular-nums; letter-spacing: -0.05em; }
        .pj-noise { position: absolute; inset: 0; opacity: .04; pointer-events: none; mix-blend-mode: overlay; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"); }
        .pj-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pj-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .pj-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; will-change: transform; }
        @media (max-width: 900px) {
          .pj-section { padding: 88px 0; }
          .pj-grid-3, .pj-grid-4 { grid-template-columns: 1fr; }
          .pj-hide-mobile { display: none !important; }
          .pj-container { padding: 0 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pj-fade { opacity: 1; transform: none; transition: none; }
          .proji-knowledge-root { scroll-behavior: auto; }
          .pj-orb { animation: none !important; }
        }
        @keyframes pjFloat { 0%,100% { transform: translate(0,0) } 50% { transform: translate(40px,-30px) } }
        @keyframes pjFloat2 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-50px,40px) } }
        @keyframes pjPulse { 0%,100% { transform: scale(1); opacity: .4 } 50% { transform: scale(1.4); opacity: 1 } }
        @keyframes pjShine { from { background-position: 200% 0 } to { background-position: -200% 0 } }
        @keyframes pjDash { to { stroke-dashoffset: -200 } }
      `}</style>

      {/* SCROLL PROGRESS */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 100, pointerEvents: "none" }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.blue}, ${C.cyan})`, boxShadow: `0 0 16px ${C.cyan}` }} />
      </div>

      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgba(5,7,14,.7)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
          transition: "all .4s ease",
        }}
      >
        <div className="pj-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
          <a href="#top" style={{ textDecoration: "none" }}>
            <Wordmark glow />
          </a>
          <div className="pj-hide-mobile" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {[
              ["Проблема", "#problem"],
              ["Решение", "#solution"],
              ["Результаты", "#results"],
              ["Контакт", "#cta"],
            ].map(([label, href]) => (
              <a key={href} href={href} style={{ color: C.inkSoft, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.blueBright)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.inkSoft)}
              >
                {label}
              </a>
            ))}
            <a href="#cta" className="pj-btn pj-btn-primary" style={{ padding: "11px 22px", fontSize: 14 }}>
              Записаться на демо
            </a>
          </div>
        </div>
      </nav>

      <HeroSection scrollY={scrollY} />
      <ProblemSection />
      <ScaleSection scrollY={scrollY} />
      <SolutionSection />
      <ArchitectureSection />
      <ResultsSection />

      {/* CTA */}
      <section id="cta" className="pj-section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="pj-orb" style={{ width: 700, height: 700, background: C.blue, opacity: 0.22, top: -200, left: -200, animation: "pjFloat 14s ease-in-out infinite" }} />
        <div className="pj-orb" style={{ width: 500, height: 500, background: C.violet, opacity: 0.18, bottom: -150, right: -100, animation: "pjFloat2 18s ease-in-out infinite" }} />
        <div className="pj-container" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "start", position: "relative" }}>
          <div>
            <div className="pj-eyebrow">04 · Пилот</div>
            <h2 className="pj-h2" style={{ marginTop: 18 }}>
              Подключим знания <span className="pj-grad-text">вашей компании</span> к&nbsp;AI
            </h2>
            <p className="pj-body" style={{ marginTop: 24, maxWidth: 480 }}>
              Пилотный запуск — 2&nbsp;недели. Без изменения рабочего процесса сотрудника.
            </p>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 40, display: "grid", gap: 18 }}>
              {[
                "Подключение к приоритетным источникам данных",
                "Настройка под формат вашей акселерации",
                "Аналитика по итогам пилота",
              ].map((t, i) => (
                <li key={t} style={{ display: "flex", alignItems: "baseline", gap: 18, color: C.ink, fontSize: 16 }}>
                  <span style={{ color: C.blueBright, fontSize: 13, minWidth: 22, fontWeight: 600 }}>0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="pj-glass" style={{ padding: 40 }}>
            {submitted ? (
              <div style={{ padding: "40px 0" }}>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.03em" }} className="pj-grad-text">Спасибо.</div>
                <div className="pj-body" style={{ marginTop: 14 }}>Свяжемся в течение рабочего дня.</div>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <input required className="pj-input" placeholder="Ваше имя и должность" />
                <input required className="pj-input" placeholder="Email или Telegram" style={{ marginTop: 8 }} />
                <button type="submit" className="pj-btn pj-btn-primary" style={{ marginTop: 36, padding: "18px 32px", fontSize: 16, width: "100%", justifyContent: "center" }}>
                  Записаться на демо →
                </button>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 24, lineHeight: 1.7 }}>
                  Или напрямую:{" "}
                  <a href="mailto:serik@sunnet.kz" style={{ color: C.blueBright }}>serik@sunnet.kz</a>
                  {" · "}
                  <a href="https://proji.kz" style={{ color: C.blueBright }}>proji.kz</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.bg, color: C.muted, padding: "60px 0 40px", borderTop: `1px solid ${C.border}` }}>
        <div className="pj-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <Wordmark size={22} />
            <div style={{ display: "flex", gap: 28, fontSize: 13 }}>
              <a href="#problem" style={{ color: C.muted, textDecoration: "none" }}>Проблема</a>
              <a href="#solution" style={{ color: C.muted, textDecoration: "none" }}>Решение</a>
              <a href="#results" style={{ color: C.muted, textDecoration: "none" }}>Результаты</a>
              <a href="#cta" style={{ color: C.muted, textDecoration: "none" }}>Контакт</a>
            </div>
          </div>
          <hr style={{ height: 1, background: C.border, border: 0, margin: "32px 0 16px" }} />
          <div style={{ fontSize: 12 }}>© 2026 · proji.kz</div>
        </div>
      </footer>
    </div>
  );
}

function HeroSection({ scrollY }: { scrollY: number }) {
  const s = useInView<HTMLElement>(0.05);
  const mouse = useMouse();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax for orbs
  const parY = scrollY * 0.25;

  return (
    <section ref={s.ref} id="top" style={{ position: "relative", paddingTop: 60, paddingBottom: 140, overflow: "hidden" }}>
      {/* Background grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Animated orbs */}
      <div
        className="pj-orb"
        style={{
          width: 600,
          height: 600,
          background: C.blue,
          opacity: 0.35,
          top: -100 + parY,
          left: `calc(${mouse.x * 10}% - 100px)`,
          animation: "pjFloat 12s ease-in-out infinite",
          transition: "left .8s ease-out",
        }}
      />
      <div
        className="pj-orb"
        style={{
          width: 500,
          height: 500,
          background: C.violet,
          opacity: 0.28,
          top: 100 - parY * 0.5,
          right: `calc(${(1 - mouse.x) * 10}% - 50px)`,
          animation: "pjFloat2 16s ease-in-out infinite",
          transition: "right .8s ease-out",
        }}
      />
      <div
        className="pj-orb"
        style={{
          width: 400,
          height: 400,
          background: C.cyan,
          opacity: 0.18,
          bottom: -100,
          left: "40%",
          animation: "pjFloat 20s ease-in-out infinite",
        }}
      />
      <div className="pj-noise" />

      <div className="pj-container" ref={heroRef} style={{ position: "relative", zIndex: 1 }}>
        <div className={`pj-fade ${s.inView ? "in" : ""}`} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56, marginTop: 40 }}>
          <span style={{ width: 8, height: 8, borderRadius: 8, background: C.emerald, boxShadow: `0 0 16px ${C.emerald}`, animation: "pjPulse 2s ease-in-out infinite" }} />
          <span className="pj-eyebrow" style={{ color: C.inkSoft }}>AI-рекомендатель корпоративных знаний</span>
        </div>

        <h1 className={`pj-h1 pj-fade ${s.inView ? "in" : ""}`} style={{ maxWidth: 1100, transitionDelay: ".1s" }}>
          Знания вашей компании —<br />
          <span className="pj-grad-text">доступны каждому</span> сотруднику.
        </h1>

        <div
          className={`pj-fade ${s.inView ? "in" : ""}`}
          style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, marginTop: 64, transitionDelay: ".25s", alignItems: "center" }}
        >
          <div>
            <p className="pj-body" style={{ fontSize: 19, maxWidth: 540 }}>
              Нужный контакт. Актуальный регламент. Опыт прошлых проектов. В&nbsp;момент, когда они нужны — без поиска через знакомых.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
              <a href="#cta" className="pj-btn pj-btn-primary">Записаться на демо →</a>
              <a href="#solution" className="pj-btn pj-btn-ghost">Смотреть как работает</a>
            </div>
          </div>

          <HeroVisualization mouse={mouse} />
        </div>
      </div>
    </section>
  );
}

function HeroVisualization({ mouse }: { mouse: { x: number; y: number } }) {
  // Rotate the panel slightly with mouse for 3D feel
  const rx = (mouse.y - 0.5) * -8;
  const ry = (mouse.x - 0.5) * 8;

  const cards = [
    { tag: "Контакт", title: "Назгуль К.", sub: "Отдел развития · доб. 4521", c: C.blueBright, dy: 0, dx: 0 },
    { tag: "Регламент", title: "R-245", sub: "Бюджеты 1–10 млн ₸", c: C.violet, dy: 70, dx: 40 },
    { tag: "Опыт", title: "CRM-2023", sub: "Итоги, ошибки, рекомендации", c: C.cyan, dy: 140, dx: 80 },
  ];

  return (
    <div className="pj-hide-mobile" style={{ position: "relative", minHeight: 360, perspective: 1200 }}>
      <div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
          transition: "transform .3s ease-out",
          minHeight: 360,
        }}
      >
        {/* connecting svg lines */}
        <svg
          aria-hidden
          width="100%"
          height="360"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0" x2="1">
              <stop offset="0%" stopColor={C.blue} stopOpacity="0" />
              <stop offset="50%" stopColor={C.cyan} stopOpacity="1" />
              <stop offset="100%" stopColor={C.violet} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 20 40 Q 200 100 380 200" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 6" style={{ animation: "pjDash 6s linear infinite" }} />
          <path d="M 60 110 Q 200 180 400 270" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 6" style={{ animation: "pjDash 8s linear infinite" }} />
        </svg>

        {cards.map((c, i) => (
          <div
            key={i}
            className="pj-glass pj-card-glow"
            style={{
              position: "absolute",
              top: c.dy,
              left: c.dx,
              width: 300,
              padding: "20px 22px",
              borderRadius: 16,
              transform: `translateZ(${(2 - i) * 40}px)`,
              animation: `pjFloat ${10 + i * 2}s ease-in-out infinite`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: c.c, boxShadow: `0 0 14px ${c.c}` }} />
              <span className="pj-eyebrow" style={{ color: c.c, fontSize: 10 }}>{c.tag}</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 600, color: C.ink, letterSpacing: "-0.01em" }}>{c.title}</div>
            <div style={{ color: C.inkSoft, fontSize: 13, marginTop: 6 }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemSection() {
  const s = useInView<HTMLElement>(0.12);
  const cards = [
    {
      num: "01",
      tag: "Люди",
      c: C.blueBright,
      title: "Не знают нужных людей",
      items: ["Кто уже решал такую задачу", "Кто эксперт в этой теме", "К кому идти за согласованием"],
    },
    {
      num: "02",
      tag: "Правила",
      c: C.amber,
      title: "Не знают актуальных регламентов",
      items: ["Какие правила здесь применимы", "Что обязательно согласовать", "Где найти нужную инструкцию"],
    },
    {
      num: "03",
      tag: "Опыт",
      c: C.rose,
      title: "Не знают опыт компании",
      items: ["Какие проекты уже были", "Что сработало в прошлом", "Какие ошибки уже совершены"],
    },
  ];
  return (
    <section ref={s.ref} id="problem" className="pj-section">
      <div className="pj-container">
        <div className={`pj-fade ${s.inView ? "in" : ""}`} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 80, alignItems: "start", marginBottom: 80 }}>
          <div className="pj-eyebrow">01 · Проблема</div>
          <h2 className="pj-h2" style={{ maxWidth: 900 }}>
            Знания в компании уже есть.<br />
            <span className="pj-grad-text-2">Сотрудники просто не знают о них.</span>
          </h2>
        </div>

        <div className={`pj-grid-3 pj-fade ${s.inView ? "in" : ""}`}>
          {cards.map((c) => (
            <InteractiveCard key={c.num} accent={c.c}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32 }}>
                <span className="pj-num" style={{ fontSize: 56, color: c.c, lineHeight: 1, textShadow: `0 0 30px ${c.c}55` }}>{c.num}</span>
                <span className="pj-eyebrow" style={{ color: c.c }}>{c.tag}</span>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 600, color: C.ink, marginBottom: 24, lineHeight: 1.2, letterSpacing: "-0.015em" }}>{c.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
                {c.items.map((it) => (
                  <li key={it} style={{ color: C.inkSoft, fontSize: 15, lineHeight: 1.5, paddingLeft: 20, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, top: 9, width: 10, height: 1, background: c.c, boxShadow: `0 0 8px ${c.c}` }} />
                    {it}
                  </li>
                ))}
              </ul>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractiveCard({ children, accent }: { children: ReactNode; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: -200, y: -200, active: false });
  return (
    <div
      ref={ref}
      className="pj-glass pj-card-glow"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setM({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
      }}
      onMouseLeave={() => setM((p) => ({ ...p, active: false }))}
      style={{
        position: "relative",
        padding: 32,
        overflow: "hidden",
        transition: "transform .4s cubic-bezier(.2,.8,.2,1)",
        transform: m.active ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}28 0%, transparent 70%)`,
          left: m.x - 160,
          top: m.y - 160,
          opacity: m.active ? 1 : 0,
          transition: "opacity .3s",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

function ScaleSection({ scrollY }: { scrollY: number }) {
  const s = useInView<HTMLElement>(0.2);
  const kpi = useInView<HTMLDivElement>(0.3);

  const COLS = 16;
  const ROWS = 6;
  const TOTAL = COLS * ROWS;

  // Section-scroll-driven lit count
  const sectionRef = useRef<HTMLElement | null>(null);
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLitCount(TOTAL);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + scrollY;
    const h = rect.height;
    const vh = window.innerHeight;
    const start = top - vh * 0.7;
    const end = top + h * 0.5 - vh;
    const p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, end - start)));
    setLitCount(Math.floor(p * TOTAL));
  }, [scrollY, TOTAL]);

  // assign each node a tier (color) so the constellation feels real
  const nodeColors = [C.blueBright, C.cyan, C.violet];

  return (
    <section
      ref={(el) => {
        s.ref.current = el;
        sectionRef.current = el;
      }}
      className="pj-section"
      style={{ position: "relative", background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgSoft} 50%, ${C.bg} 100%)`, overflow: "hidden" }}
    >
      <div className="pj-orb" style={{ width: 800, height: 800, background: C.blue, opacity: 0.12, top: "10%", left: "-10%", animation: "pjFloat 20s ease-in-out infinite" }} />
      <div className="pj-container">
        <div className={`pj-fade ${s.inView ? "in" : ""}`} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 80, alignItems: "start", marginBottom: 72 }}>
          <div className="pj-eyebrow">02 · Масштаб</div>
          <div style={{ maxWidth: 900 }}>
            <h2 className="pj-h2">
              Чем больше компания —<br />
              <span className="pj-grad-text">тем больше теряется.</span>
            </h2>
            <p className="pj-body" style={{ marginTop: 20, fontSize: 16 }}>
              Доля знаний, которую использует средний сотрудник. Скрольте — и&nbsp;скрытое оживает.
            </p>
          </div>
        </div>

        {/* Node grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap: 12,
            maxWidth: 980,
            margin: "0 auto",
            padding: "20px 0",
          }}
        >
          {Array.from({ length: TOTAL }).map((_, i) => {
            const lit = i < litCount;
            const color = nodeColors[i % nodeColors.length];
            const tip = tooltipPool[i % tooltipPool.length];
            return (
              <div key={i} style={{ position: "relative", aspectRatio: "1 / 1" }} className="pj-node">
                <div
                  title={tip}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: lit ? color : "rgba(120,160,255,.07)",
                    boxShadow: lit ? `0 0 16px ${color}99, inset 0 0 4px rgba(255,255,255,.4)` : "none",
                    transition: "background .5s ease, box-shadow .5s ease, transform .25s ease",
                    cursor: "pointer",
                  }}
                />
              </div>
            );
          })}
        </div>
        <style>{`.pj-node:hover > div { transform: scale(1.6); }`}</style>

        <div ref={kpi.ref} style={{ marginTop: 96, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: `1px solid ${C.border}` }}>
          {[
            { size: "50 чел.", pct: 85, c: C.emerald },
            { size: "500 чел.", pct: 35, c: C.blueBright },
            { size: "5 000 чел.", pct: 12, c: C.violet },
            { size: "50 000 чел.", pct: 4, c: C.rose },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                padding: "40px 24px",
                borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                position: "relative",
              }}
            >
              <div className="pj-eyebrow" style={{ color: C.muted }}>{row.size}</div>
              <div className="pj-num" style={{ fontSize: 72, marginTop: 14, lineHeight: 1, color: row.c, textShadow: `0 0 40px ${row.c}55` }}>
                <CountUp to={row.pct} suffix="%" start={kpi.inView} />
              </div>
              <div style={{ color: C.inkSoft, fontSize: 13, marginTop: 10 }}>используется</div>
              {/* tiny bar */}
              <div style={{ marginTop: 18, height: 3, background: "rgba(120,160,255,.08)", borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: kpi.inView ? `${row.pct}%` : "0%",
                    background: `linear-gradient(90deg, ${row.c}, ${C.cyan})`,
                    transition: `width 1.6s cubic-bezier(.2,.8,.2,1) ${i * 0.15}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const s = useInView<HTMLElement>(0.08);
  const cards = [
    {
      c: C.blueBright,
      tag: "Контакт",
      user: "Запускаю пилотный проект в Актобе для розничной сети",
      rec: "Назгуль К. — Отдел развития, доб. 4521",
      sub: "Провела похожий пилот в 2024 г.",
    },
    {
      c: C.amber,
      tag: "Регламент",
      user: "Бюджет проекта 5 млн ₸ из направления инноваций",
      rec: "Регламент R-245 — «Утверждение бюджетов 1–10 млн ₸»",
      sub: "Обязателен. 12 стр.",
    },
    {
      c: C.cyan,
      tag: "Опыт",
      user: "Внедряем CRM-систему в отдел продаж розницы",
      rec: "Проект CRM-2023 — отчёт с итогами и ошибками",
      sub: "8 стр.",
    },
  ];
  return (
    <section ref={s.ref} id="solution" className="pj-section">
      <div className="pj-container">
        <div className={`pj-fade ${s.inView ? "in" : ""}`} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 80, alignItems: "start", marginBottom: 72 }}>
          <div className="pj-eyebrow">03 · Решение</div>
          <div style={{ maxWidth: 920 }}>
            <h2 className="pj-h2">
              <span style={{ fontFamily: "Ubuntu", fontWeight: 700 }} className="pj-grad-text">proji studio</span> — <span className="pj-grad-text-2">AI-рекомендатель.</span>
            </h2>
            <p className="pj-body" style={{ marginTop: 20, maxWidth: 640 }}>
              В&nbsp;момент работы над задачей платформа подсказывает три типа знаний компании автоматически.
            </p>
          </div>
        </div>

        <div className={`pj-grid-3 pj-fade ${s.inView ? "in" : ""}`}>
          {cards.map((c, i) => (
            <InteractiveCard key={i} accent={c.c}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                <span style={{ width: 32, height: 2, background: `linear-gradient(90deg, ${c.c}, transparent)` }} />
                <span className="pj-eyebrow" style={{ color: c.c }}>{c.tag}</span>
              </div>

              <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>Сотрудник пишет</div>
              <div style={{ fontSize: 18, color: C.ink, lineHeight: 1.4, fontWeight: 400 }}>
                «{c.user}»
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 20px", color: c.c, fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" }}>
                <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${c.c}55, transparent)` }} />
                AI ↓
                <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${c.c}55, transparent)` }} />
              </div>

              <div style={{ background: "rgba(0,0,0,.3)", border: `1px solid ${c.c}33`, padding: 20, borderRadius: 12, boxShadow: `inset 0 0 30px ${c.c}11` }}>
                <div className="pj-eyebrow" style={{ color: c.c, fontSize: 10, marginBottom: 10 }}>proji рекомендует</div>
                <div style={{ fontWeight: 500, fontSize: 15, lineHeight: 1.45, color: C.ink }}>{c.rec}</div>
                <div style={{ color: C.inkSoft, fontSize: 13, marginTop: 10 }}>{c.sub}</div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const s = useInView<HTMLElement>(0.1);
  const sources = ["HR-система", "СЭД", "Архив проектов", "Базы знаний", "Корп. чаты"];
  const outputs = ["Рекомендация эксперта", "Применимый регламент", "Прошлый проект + выводы", "Готовый шаблон", "Контекст для документа"];
  return (
    <section ref={s.ref} className="pj-section" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgSoft} 100%)`, position: "relative", overflow: "hidden" }}>
      <div className="pj-orb" style={{ width: 700, height: 700, background: C.violet, opacity: 0.12, top: "30%", right: "-15%", animation: "pjFloat2 18s ease-in-out infinite" }} />
      <div className="pj-container">
        <div className={`pj-fade ${s.inView ? "in" : ""}`} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 80, alignItems: "start", marginBottom: 64 }}>
          <div className="pj-eyebrow">Архитектура</div>
          <h2 className="pj-h2" style={{ maxWidth: 900 }}>
            Подключаем <span className="pj-grad-text">все источники</span> знаний компании.
          </h2>
        </div>

        <div className={`pj-fade ${s.inView ? "in" : ""}`}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {sources.map((src, i) => (
              <div
                key={src}
                className="pj-glass"
                style={{
                  padding: "20px 18px",
                  fontSize: 14,
                  color: C.ink,
                  fontWeight: 500,
                  textAlign: "center",
                  borderRadius: 12,
                  animation: `pjFloat ${10 + i}s ease-in-out infinite`,
                }}
              >
                {src}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", margin: "24px 0", gap: 100, color: C.blueBright }} className="pj-hide-mobile">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ animation: `pjFloat 1.8s ${i * 0.15}s infinite ease-in-out`, fontSize: 20, opacity: 0.7 }}>↓</span>
            ))}
          </div>

          <div
            style={{
              background: `linear-gradient(120deg, ${C.blue} 0%, ${C.violet} 50%, ${C.cyan} 100%)`,
              backgroundSize: "200% 100%",
              animation: "pjShine 6s linear infinite",
              borderRadius: 16,
              padding: "40px 44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
              flexWrap: "wrap",
              margin: "24px 0",
              boxShadow: `0 30px 80px -20px ${C.blue}77, inset 0 1px 0 rgba(255,255,255,.2)`,
            }}
          >
            <div>
              <div className="pj-eyebrow" style={{ color: "rgba(255,255,255,.85)", marginBottom: 10 }}>proji AI engine</div>
              <div style={{ fontSize: 30, color: "white", fontWeight: 600, letterSpacing: "-0.02em" }}>Семантический контекст компании</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 10, height: 10, borderRadius: 10, background: "white", animation: `pjPulse 1.5s ${i * 0.2}s infinite ease-in-out` }} />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", margin: "24px 0", gap: 100, color: C.cyan }} className="pj-hide-mobile">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ animation: `pjFloat 1.8s ${i * 0.15}s infinite ease-in-out`, fontSize: 20, opacity: 0.7 }}>↓</span>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {outputs.map((o, i) => (
              <div
                key={o}
                className="pj-glass"
                style={{
                  padding: "20px 18px",
                  fontSize: 14,
                  color: C.cyan,
                  fontWeight: 500,
                  textAlign: "center",
                  borderRadius: 12,
                  borderColor: `${C.cyan}33`,
                  animation: `pjFloat ${11 + i}s ease-in-out infinite reverse`,
                }}
              >
                {o}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const s = useInView<HTMLDivElement>(0.25);
  const kpis = [
    { num: 40, prefix: "−", suffix: "%", label: "Адаптация", desc: "Ускорение выхода нового сотрудника на продуктивность", c: C.blueBright },
    { num: 3, prefix: "", suffix: "×", label: "Скорость", desc: "Запуск проекта без поиска через знакомых", c: C.cyan },
    { num: 25, prefix: "−", suffix: "%", label: "Ошибки", desc: "Меньше повторных ошибок — доступ к опыту", c: C.violet },
    { num: 100, prefix: "", suffix: "%", label: "Покрытие", desc: "Знаний компании в каждом новом проекте", c: C.emerald },
  ];
  return (
    <section id="results" className="pj-section" style={{ position: "relative", overflow: "hidden" }}>
      <div className="pj-container">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 80, alignItems: "start", marginBottom: 80 }}>
          <div className="pj-eyebrow">Результаты</div>
          <h2 className="pj-h2" style={{ maxWidth: 900 }}>
            Эффект <span className="pj-grad-text">растёт</span> вместе с&nbsp;компанией.
          </h2>
        </div>

        <div ref={s.ref} className="pj-glass" style={{ padding: 0, overflow: "hidden", borderRadius: 24 }}>
          <div className="pj-grid-4" style={{ gap: 0 }}>
            {kpis.map((k, i) => (
              <div
                key={k.label}
                style={{
                  padding: "44px 32px",
                  borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                  position: "relative",
                }}
              >
                <div className="pj-num" style={{ fontSize: 80, lineHeight: 1, color: k.c, textShadow: `0 0 50px ${k.c}55` }}>
                  {k.prefix}
                  <CountUp to={k.num} suffix={k.suffix} start={s.inView} />
                </div>
                <div className="pj-eyebrow" style={{ color: C.ink, marginTop: 20 }}>{k.label}</div>
                <div style={{ color: C.inkSoft, fontSize: 14, marginTop: 10, lineHeight: 1.55 }}>{k.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <blockquote
          style={{
            margin: "80px 0 0 auto",
            maxWidth: 860,
            padding: "0 0 0 32px",
            borderLeft: `2px solid transparent`,
            borderImage: `linear-gradient(180deg, ${C.blueBright}, ${C.violet}) 1`,
            fontSize: 28,
            lineHeight: 1.35,
            color: C.ink,
            fontWeight: 400,
            letterSpacing: "-0.015em",
          }}
        >
          «Чем крупнее компания и&nbsp;сложнее регламентная база — тем выше отдача от&nbsp;<span style={{ fontFamily: "Ubuntu", fontWeight: 700 }} className="pj-grad-text">proji studio</span>.»
        </blockquote>
      </div>
    </section>
  );
}
