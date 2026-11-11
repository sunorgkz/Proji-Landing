import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Header } from '../../components/Header';
import { Features } from '../../components/Features';
import { HowItWorks } from '../../components/HowItWorks';
import { CTA } from '../../components/CTA';
import { MainFooter } from '../../components/MainFooter';
import { CookieNotice } from '../../components/CookieNotice';
import { About } from '../../components/About';
import { ProjiHome } from './ProjiHome';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import {
  getTheme,
  setTheme as persistTheme,
  resolveTheme,
  syncPrefsFromStorage,
  THEME_KEY,
  LANG_KEY,
  type ProjiResolvedTheme,
} from '../../lib/projiPrefs';
import './main.css';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';

export default function MainLanding() {
  const [theme, setTheme] = useState<ProjiResolvedTheme>(() => resolveTheme(getTheme()));
  const [currentPage, setCurrentPage] = useState('home');

  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = 'main';
    const { resolved } = syncPrefsFromStorage();
    setTheme(resolved);
    return () => {
      delete document.documentElement.dataset.landing;
    };
  }, []);

  useEffect(() => {
    const id = 'main-landing-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = FONTS_URL;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const root = document.querySelector('.main-landing-root');
    root?.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_KEY && e.key !== LANG_KEY && e.key !== null) return;
      setTheme(resolveTheme(getTheme()));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = () => {
    const next: ProjiResolvedTheme = theme === 'dark' ? 'light' : 'dark';
    persistTheme(next);
    setTheme(next);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'features':
        return (
          <>
            <div className="pt-24">
              <Features />
            </div>
            <HowItWorks />
          </>
        );
      case 'about':
        return <About />;
      case 'home':
      default:
        return <ProjiHome />;
    }
  };

  return (
    <div
      className={`main-landing-root ${theme === 'dark' ? 'dark' : ''} bg-slate-50 dark:bg-[#0f172a] min-h-screen text-slate-900 dark:text-white font-sans selection:bg-brand-500/30 transition-colors duration-500 flex flex-col`}
    >
      <a className="ph-skip" href="#main-content">Перейти к содержимому</a>
      <Header
        toggleTheme={toggleTheme}
        isDark={theme === 'dark'}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className="flex-grow">
        {renderContent()}
        {currentPage !== 'home' && <CTA />}
      </main>
      <MainFooter />
      <CookieNotice />
    </div>
  );
}
