import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, isRTL, type Lang } from "./i18n";
import { getLang, getTheme, setLang as persistLang, setTheme as persistTheme, resolveTheme } from "../../../lib/projiPrefs";

type Theme = "light" | "dark";
const LANDING_ID = "chrome-extension";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (typeof dict)[Lang];
};

const AppCtx = createContext<Ctx | null>(null);

function asLang(value: string): Lang {
  return value === "en" || value === "kk" || value === "ar" || value === "ru" ? value : "ru";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => asLang(getLang("ru")));
  const [theme, setThemeState] = useState<Theme>(() => resolveTheme(getTheme()));

  useEffect(() => {
    setLangState(asLang(getLang("ru")));
    setThemeState(resolveTheme(getTheme()));
  }, []);

  useEffect(() => {
    if (document.documentElement.dataset.landing !== LANDING_ID) return;
    document.documentElement.dir = isRTL(lang) ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    persistLang(lang);
  }, [lang]);

  useEffect(() => {
    if (document.documentElement.dataset.landing !== LANDING_ID) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    persistTheme(theme);
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
