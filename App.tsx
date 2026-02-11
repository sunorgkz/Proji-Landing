import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { FounderNote } from './components/FounderNote';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
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
    <div className="bg-slate-50 dark:bg-[#0f172a] min-h-screen text-slate-900 dark:text-white font-sans selection:bg-brand-500/30 transition-colors duration-500 flex flex-col">
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

export default App;