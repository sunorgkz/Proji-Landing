import { ThemeIconButton } from "../../components/ThemeIconButton";
import { useEffect, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { resetDocumentShell } from "../../lib/resetDocumentShell";
import { applyLandingPageBg } from "../../lib/landingPageBg";
import { GlassSphereCanvas } from "./components/GlassSphereCanvas";
import { ContrastSplit } from "./components/ContrastSplit";
import { ProcessFlow } from "./components/ProcessFlow";
import { DashboardFocus } from "./components/DashboardFocus";
import { CtaSection } from "./components/CtaSection";
import "./styles.css";

const LANDING_ID = "antigravity";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&display=swap";

const ease = [0.22, 1, 0.36, 1] as const;

function useFonts() {
  useEffect(() => {
    const id = "antigravity-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
}

export default function AntigravityLanding() {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    resetDocumentShell();
    applyLandingPageBg(LANDING_ID);
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useFonts();

  const scrollToContrast = () => {
    document.getElementById("contrast")?.scrollIntoView({ behavior: "smooth" });
  };

  const hero = reduced
    ? {}
    : {
        initial: "hidden",
        animate: "show",
        variants: {
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
        },
      };

  const item = reduced
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
          show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.75, ease },
          },
        },
      };

  return (
    <div className="antigravity-root">
      <div className="ag-vignette" aria-hidden />

      <header className="ag-header">
        <a href="https://proji.kz" className="ag-brand">
          proji
        </a>
        <ThemeIconButton landing="antigravity" />
      </header>

      <motion.section className="ag-hero" {...hero}>
        <motion.div {...item}>
          <GlassSphereCanvas />
        </motion.div>

        <motion.h1 className="ag-hero__title" {...item}>
          Ваш бизнес.
          <br />
          Только без гравитации рутины.
        </motion.h1>

        <motion.p className="ag-hero__lead" {...item}>
          Мы проектируем автономные системы, которые забирают на себя хаос
          операционки. Вы управляете результатами, а не процессами.
        </motion.p>

        <motion.div {...item}>
          <button type="button" className="ag-btn ag-btn--primary" onClick={scrollToContrast}>
            Сбросить балласт
          </button>
        </motion.div>

        <motion.button
          type="button"
          className="ag-hero__scroll"
          onClick={scrollToContrast}
          aria-label="Прокрутить вниз"
          {...item}
        >
          <ChevronDown size={22} strokeWidth={1.25} />
        </motion.button>
      </motion.section>

      <section id="contrast" className="ag-section">
        <div className="ag-container">
          <ContrastSplit />
        </div>
      </section>

      <section className="ag-section ag-section--process">
        <div className="ag-container ag-container--narrow">
          <h2 className="ag-heading-lg">Магия без магии</h2>
          <p className="ag-section__intro">
            Снимаем страх перед «умными ботами» — показываем архитектурный подход к
            автоматизации.
          </p>
          <ProcessFlow />
        </div>
      </section>

      <section className="ag-section">
        <div className="ag-container">
          <DashboardFocus />
        </div>
      </section>

      <div className="ag-container">
        <CtaSection />
      </div>

      <footer className="ag-footer">
        <div className="ag-container">
          © {new Date().getFullYear()} proji — архитектурное ИТ-бюро
        </div>
      </footer>
    </div>
  );
}
