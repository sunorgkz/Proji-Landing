import { useApp } from "../lib/app-context";
import { brandWord } from "../lib/i18n";
import { Wordmark, Logo } from "./brand";
import { EXTENSION_ZIP_FILENAME, EXTENSION_ZIP_PATH } from "../lib/install";
import {
  MoveRight, Sparkles, MessageSquare, Search, Newspaper, Bot, MousePointerClick,
  ShieldCheck, ThumbsUp, MenuSquare, Palette, Lock, Layers, Rocket, Brain, Workflow,
} from "lucide-react";

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

function ChromeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M21.17 8H12M3.95 6.06L8.54 14M10.88 21.94L15.46 14" />
    </svg>
  );
}

function InstallButton({ label, large = false }: { label: string; large?: boolean }) {
  return (
    <a
      href={EXTENSION_ZIP_PATH}
      download={EXTENSION_ZIP_FILENAME}
      className={`brand-gradient inline-flex items-center gap-2 rounded-xl text-white soft-shadow transition-transform hover:scale-[1.02] ${
        large ? "px-7 py-4 text-base md:text-lg" : "px-5 py-3 text-sm"
      }`}
    >
      <ChromeIcon className={large ? "h-5 w-5" : "h-4 w-4"} />
      <span className="font-medium">{label}</span>
      <MoveRight className={`rtl-flip ${large ? "h-5 w-5" : "h-4 w-4"}`} />
    </a>
  );
}

function Hero() {
  const { lang, t } = useApp();
  return (
    <Section id="top" className="pt-12 md:pt-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6 fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Chrome · Edge · Brave · Arc
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="brand-text lowercase">proji</span>
            <span className="ms-3 text-2xl font-light text-muted-foreground lowercase md:text-3xl">
              chrome extension
            </span>
            <br />
            <span className="text-foreground">{t.heroTitle}</span>
          </h1>
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">{t.heroSub}</p>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <InstallButton label={t.installFree} large />
          </div>
          <p className="text-xs text-muted-foreground">{t.freeNote}</p>
        </div>
        <BrowserMock />
      </div>
    </Section>
  );
}

function BrowserMock() {
  const { t } = useApp();
  return (
    <div className="fade-up relative" style={{ animationDelay: "0.15s" }}>
      <div className="overflow-hidden rounded-2xl border border-border bg-card soft-shadow">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <div className="ms-3 flex-1 rounded-md bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            chat.openai.com / your-tab
          </div>
        </div>
        <div className="relative h-72 p-5 md:h-96">
          <div className="space-y-2">
            <div className="h-3 w-3/4 rounded bg-muted" />
            <div className="h-3 w-5/6 rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
            <div className="mt-4 h-3 w-4/5 rounded bg-muted" />
            <div className="h-3 w-3/5 rounded bg-muted" />
          </div>
          {/* floating widget */}
          <div className="absolute bottom-5 end-5 w-64 rounded-2xl border border-border bg-card p-3 shadow-2xl">
            <div className="flex items-center gap-2">
              <Logo size={28} />
              <div className="text-xs">
                <div className="font-bold lowercase">proji</div>
                <div className="text-[10px] font-light text-muted-foreground">chrome extension</div>
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-2 text-xs">
              <div className="font-medium">{t.features[1].title}</div>
              <div className="mt-1 line-clamp-2 text-muted-foreground">{t.features[1].desc}</div>
            </div>
            <button className="brand-gradient mt-2.5 w-full rounded-lg py-1.5 text-xs font-medium text-white">
              + Proji
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const featureIcons = [
  Layers, Brain, Bot, Search, Newspaper, MessageSquare,
  MousePointerClick, ShieldCheck, ThumbsUp, MenuSquare, Palette, Lock,
];

function Features() {
  const { t } = useApp();
  return (
    <Section id="features">
      <h2 className="text-3xl font-bold md:text-5xl">{t.featuresTitle}</h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.map((f, i) => {
          const Icon = featureIcons[i] ?? Sparkles;
          return (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:soft-shadow"
            >
              <div className="brand-gradient mb-4 grid h-11 w-11 place-items-center rounded-xl text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function HowItWorks() {
  const { t } = useApp();
  return (
    <Section id="how" className="border-y border-border bg-muted/30">
      <h2 className="text-3xl font-bold md:text-5xl">{t.howTitle}</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-4">
        {t.steps.map((s, i) => (
          <div key={i} className="relative rounded-2xl border border-border bg-card p-6">
            <div className="brand-text text-5xl font-bold leading-none">{(i + 1).toString().padStart(2, "0")}</div>
            <p className="mt-4 text-sm font-medium">{s}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const whyIcons = [Rocket, Workflow, Brain, Sparkles];

function WhyProji() {
  const { t } = useApp();
  return (
    <Section id="why">
      <h2 className="text-3xl font-bold md:text-5xl">{t.whyTitle}</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.why.map((w, i) => {
          const Icon = whyIcons[i] ?? Sparkles;
          return (
            <div key={i} className="rounded-2xl p-6">
              <div className="brand-text mb-3"><Icon className="h-7 w-7" /></div>
              <h3 className="text-lg font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function MidCTA() {
  const { t } = useApp();
  return (
    <Section className="text-center">
      <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-5xl">{t.midCtaTitle}</h2>
      <div className="mt-8 flex justify-center">
        <InstallButton label={t.midCtaBtn} large />
      </div>
    </Section>
  );
}

const WORKS = [
  "ChatGPT", "Gemini", "Claude", "DeepSeek", "Grok", "Copilot",
  "Google", "Яндекс", "Bing", "DuckDuckGo", "Medium", "Habr",
];

function WorksOn() {
  const { t } = useApp();
  return (
    <Section id="works" className="border-y border-border bg-muted/30">
      <h2 className="text-3xl font-bold md:text-5xl">{t.worksTitle}</h2>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {WORKS.map((w) => (
          <div
            key={w}
            className="flex items-center justify-center rounded-xl border border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {w}
          </div>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA() {
  const { t } = useApp();
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="brand-gradient mx-auto max-w-7xl rounded-3xl px-6 py-16 text-center text-white soft-shadow md:px-12 md:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{t.finalTitle}</h2>
        <div className="mt-8 flex justify-center">
          <a
            href={EXTENSION_ZIP_PATH}
            download={EXTENSION_ZIP_FILENAME}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-medium text-slate-900 transition-transform hover:scale-[1.02]"
          >
            <ChromeIcon className="h-5 w-5" />
            {t.installFree}
            <MoveRight className="rtl-flip h-5 w-5" />
          </a>
        </div>
        <p className="mt-4 text-sm text-white/80">{t.finalNote}</p>
      </div>
    </section>
  );
}

function Footer() {
  const { lang, t } = useApp();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <Wordmark word={brandWord(lang)} size="text-sm" />
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {t.footerLinks.map((l) => (
            <a key={l} href="#" className="hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">{t.copyright}</div>
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <WhyProji />
      <MidCTA />
      <WorksOn />
      <FinalCTA />
      <Footer />
    </main>
  );
}
