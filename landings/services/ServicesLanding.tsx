import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Catalog } from '../../components/Catalog';
import { HeroIllustration } from '../../components/HeroIllustration';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import {
  getTheme,
  setTheme as persistTheme,
  resolveTheme,
  syncPrefsFromStorage,
  type ProjiResolvedTheme,
} from '../../lib/projiPrefs';
import '../main/main.css';

/**
 * Product catalog hub — https://landing.proji.kz/services
 */
export default function ServicesLanding() {
  const [theme, setTheme] = useState<ProjiResolvedTheme>(() => resolveTheme(getTheme()));

  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = 'services';
    document.title = 'Proji — Сервисы и продукты';
    const { resolved } = syncPrefsFromStorage();
    setTheme(resolved);
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const next: ProjiResolvedTheme = theme === 'dark' ? 'light' : 'dark';
    persistTheme(next);
    setTheme(next);
  };

  return (
    <div
      className={`main-landing-root ${theme === 'dark' ? 'dark' : ''} min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white transition-colors duration-500`}
    >
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Proji
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors"
            >
              На главную
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="text-sm rounded-full px-3 py-1.5 border border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Переключить тему"
            >
              {theme === 'dark' ? 'Светлая' : 'Тёмная'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_75%_15%,rgba(14,165,233,0.14),transparent_55%)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                  Каталог продуктов
                </h1>
                <p className="text-lg text-slate-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0">
                  Все продуктовые лендинги в одном месте. Тема и язык, выбранные здесь или на любом
                  другом лендинге, сохраняются между страницами.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-sm mx-auto lg:max-w-none"
              >
                <HeroIllustration />
              </motion.div>
            </div>
          </div>
        </section>
        <Catalog mode="all" />
      </main>

      <footer className="border-t border-slate-200 dark:border-white/10 py-8 text-center text-sm text-slate-500">
        © Proji ·{' '}
        <Link to="/" className="hover:text-brand-500">
          Главная
        </Link>
      </footer>
    </div>
  );
}
