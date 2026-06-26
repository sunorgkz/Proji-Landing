import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { Features } from '../../components/Features';
import { HowItWorks } from '../../components/HowItWorks';
import { Testimonials } from '../../components/Testimonials';
import { CTA } from '../../components/CTA';
import { Footer } from '../../components/Footer';
import { About } from '../../components/About';
import { FounderNote } from '../../components/FounderNote';
import { resetDocumentShell } from '../../lib/resetDocumentShell';
import './main.css';

const THEME_KEY = 'main-landing-theme';
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';

export default function MainLanding() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState('home');

  useLayoutEffect(() => {
    resetDocumentShell();
    document.documentElement.dataset.landing = 'main';
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
    const savedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = document.querySelector('.main-landing-root');
    root?.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
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
        return (
          <>
            <Hero />
            <Features />
            <HowItWorks />
            <FounderNote />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div
      className={`main-landing-root ${theme === 'dark' ? 'dark' : ''} bg-slate-50 dark:bg-[#0f172a] min-h-screen text-slate-900 dark:text-white font-sans selection:bg-brand-500/30 transition-colors duration-500 flex flex-col`}
    >
      <div className="bg-noise" aria-hidden />
      <Header
        toggleTheme={toggleTheme}
        isDark={theme === 'dark'}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className="flex-grow">
        {renderContent()}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
