import { useApp } from "../lib/app-context";
import { LANGS, brandWord } from "../lib/i18n";
import { Wordmark } from "./brand";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { EXTENSION_ZIP_FILENAME, EXTENSION_ZIP_PATH } from "../lib/install";

const INSTALL_URL = EXTENSION_ZIP_PATH;

export function Header() {
  const { lang, setLang, theme, setTheme, t } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Wordmark word={brandWord(lang)} size="text-sm md:text-base" />
        </a>

        <div className="flex items-center gap-2">
          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-2 text-xs font-medium hover:bg-accent md:text-sm"
              aria-label={t.language}
            >
              <span>{LANGS.find((l) => l.code === lang)?.label}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {open && (
              <div className="absolute end-0 mt-2 w-40 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-start text-sm hover:bg-accent ${
                      l.code === lang ? "brand-text font-bold" : ""
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg border border-border bg-card p-2 hover:bg-accent"
            aria-label={t.theme}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={INSTALL_URL}
            download={EXTENSION_ZIP_FILENAME}
            className="brand-gradient hidden rounded-lg px-4 py-2 text-sm font-medium text-white soft-shadow transition-transform hover:scale-[1.02] md:inline-block"
          >
            {t.install}
          </a>
        </div>
      </div>
    </header>
  );
}
