import { Button } from "@sb/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@sb/components/ui/dropdown-menu";
import { Moon, Sun, Monitor, Globe, Check } from "lucide-react";
import { useTheme, type Theme } from "@sb/lib/theme";
import { useI18n, LANGUAGES } from "@sb/lib/i18n";

export function SiteHeader() {
  const { theme, resolved, setTheme } = useTheme();
  const { lang, setLang, t } = useI18n();
  const currentLang = LANGUAGES.find((l) => l.code === lang);

  const themeOptions: { value: Theme; icon: typeof Sun; label: string }[] = [
    { value: "light", icon: Sun, label: t("theme.light") },
    { value: "dark", icon: Moon, label: t("theme.dark") },
    { value: "system", icon: Monitor, label: t("theme.system") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-xl bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#" className="logo-proji text-2xl">proji</a>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLang?.native}</span>
                <span className="sm:hidden uppercase">{lang}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-44">
              <DropdownMenuLabel>{t("lang.label")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGUAGES.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLang(l.code)} className="flex justify-between">
                  <span>{l.native}</span>
                  {lang === l.code && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("theme.label")}>
                {resolved === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuLabel>{t("theme.label")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <DropdownMenuItem key={opt.value} onClick={() => setTheme(opt.value)} className="flex justify-between gap-3">
                    <span className="flex items-center gap-2"><Icon className="h-4 w-4" />{opt.label}</span>
                    {theme === opt.value && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="hidden sm:inline-flex bg-gradient-to-r from-[var(--electric)] to-[var(--violet)] text-white border-0 hover:opacity-90">
            {t("nav.try")}
          </Button>
        </div>
      </div>
    </header>
  );
}
