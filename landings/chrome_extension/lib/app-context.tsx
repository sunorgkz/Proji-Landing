import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, isRTL, type Lang } from "./i18n";

type Theme = "light" | "dark";
const LANDING_ID = "chrome-extension";
const LANG_KEY = "chrome_extension_lang";
const THEME_KEY = "chrome_extension_theme";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (typeof dict)[Lang];
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const l = (localStorage.getItem(LANG_KEY) as Lang | null) ?? "ru";
    const t = (localStorage.getItem(THEME_KEY) as Theme | null) ?? "light";
    setLangState(l);
    setThemeState(t);
  }, []);

  useEffect(() => {
    if (document.documentElement.dataset.landing !== LANDING_ID) return;
    document.documentElement.dir = isRTL(lang) ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    if (document.documentElement.dataset.landing !== LANDING_ID) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <AppCtx.Provider
      value={{
        lang,
        setLang: setLangState,
        theme,
        setTheme: setThemeState,
        t: dict[lang],
      }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp outside provider");
  return c;
}
