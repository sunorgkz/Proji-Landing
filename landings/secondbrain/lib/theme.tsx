import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getTheme, setTheme as persistTheme, resolveTheme, type ProjiTheme } from "../../../lib/projiPrefs";

export type Theme = ProjiTheme;
type Ctx = { theme: Theme; resolved: "light" | "dark"; setTheme: (t: Theme) => void };
const ThemeContext = createContext<Ctx | null>(null);

function applyTheme(theme: Theme): "light" | "dark" {
  const html = document.documentElement;
  if (html.dataset.landing !== "secondbrain") return "light";

  const resolved = resolveTheme(theme);
  html.classList.toggle("dark", resolved === "dark");
  return resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getTheme());
  const [resolved, setResolved] = useState<"light" | "dark">(() => resolveTheme(getTheme()));

  useEffect(() => {
    const saved = getTheme();
    setThemeState(saved);
    setResolved(applyTheme(saved));
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setResolved(applyTheme("system"));
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    persistTheme(t);
    setResolved(applyTheme(t));
  };

  return <ThemeContext.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
