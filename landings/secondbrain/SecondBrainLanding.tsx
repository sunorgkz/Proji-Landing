import { useEffect, useLayoutEffect } from "react";
import { Button } from "@sb/components/ui/button";
import { Card } from "@sb/components/ui/card";
import { ArrowRight, Inbox, Network, ListChecks, HeartPulse, Users, PenLine, AlertTriangle, Repeat } from "lucide-react";
import { SiteHeader } from "@sb/components/SiteHeader";
import { HeroVisual } from "@sb/components/HeroVisual";
import { useI18n, I18nProvider } from "@sb/lib/i18n";
import { ThemeProvider } from "@sb/lib/theme";
import { resetDocumentShell } from "../../lib/resetDocumentShell";
import "./styles.css";

const LANDING_ID = "secondbrain";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Ubuntu:wght@700&display=swap";

function useSecondBrainFonts() {
  useEffect(() => {
    const id = "secondbrain-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
}

function useSecondBrainShell() {
  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = LANDING_ID;

    return () => {
      document.documentElement.classList.remove("dark");
      delete document.documentElement.dataset.landing;
      document.documentElement.lang = "ru";
      document.documentElement.dir = "ltr";
    };
  }, []);
}

export default function SecondBrainLanding() {
  useSecondBrainShell();
  useSecondBrainFonts();

  return (
    <ThemeProvider>
      <I18nProvider>
        <SecondBrainPage />
      </I18nProvider>
    </ThemeProvider>
  );
}

function SecondBrainPage() {
  const { t } = useI18n();

  const cards = [
    { icon: Inbox, title: t("card1.title"), text: t("card1.text") },
    { icon: Network, title: t("card2.title"), text: t("card2.text") },
    { icon: ListChecks, title: t("card3.title"), text: t("card3.text") },
    { icon: HeartPulse, title: t("card4.title"), text: t("card4.text") },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                {t("hero.sub")}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-[var(--electric)] to-[var(--violet)] text-white border-0 hover:opacity-90 shadow-[var(--glow-electric)]">
                  {t("hero.cta")} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">{t("problem.title")}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 border-border/60 bg-card/60 backdrop-blur">
            <Repeat className="h-8 w-8 text-[var(--electric)] mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("problem.left.title")}</h3>
            <p className="text-muted-foreground">{t("problem.left.text")}</p>
          </Card>
          <Card className="p-8 border-border/60 bg-card/60 backdrop-blur">
            <AlertTriangle className="h-8 w-8 text-[var(--violet)] mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("problem.right.title")}</h3>
            <p className="text-muted-foreground">{t("problem.right.text")}</p>
          </Card>
        </div>
      </section>

      {/* Solution */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("solution.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("solution.sub")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Card
                key={i}
                className="group p-6 border-border/60 bg-card/60 backdrop-blur relative overflow-hidden transition-all hover:border-[var(--electric)] hover:shadow-[var(--glow-electric)]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--gradient-accent)] mix-blend-overlay" style={{ opacity: 0.04 }} />
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--electric)] to-[var(--violet)] flex items-center justify-center mb-4 shadow-[var(--glow-electric)]">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Use cases */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">{t("use.title")}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Users, title: t("use.client.title"), text: t("use.client.text"), prompt: t("use.client.prompt") },
            { icon: PenLine, title: t("use.content.title"), text: t("use.content.text"), prompt: t("use.content.prompt") },
          ].map((u, i) => {
            const Icon = u.icon;
            return (
              <Card key={i} className="p-8 border-border/60 bg-card/60 backdrop-blur">
                <Icon className="h-7 w-7 text-[var(--electric)] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{u.title}</h3>
                <p className="text-muted-foreground mb-5">{u.text}</p>
                <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-sm italic text-foreground/80">
                  {u.prompt}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-[var(--violet)] opacity-30 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">{t("final.title")}</h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-[var(--electric)] to-[var(--violet)] text-white border-0 hover:opacity-90 shadow-[var(--glow-violet)]">
                {t("final.cta")} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{t("final.note")}</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <span className="logo-proji text-lg">proji</span>
          <span>© {new Date().getFullYear()} proji</span>
        </div>
      </footer>
    </div>
  );
}
