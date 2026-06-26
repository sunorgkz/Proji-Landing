import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  toggleTheme: () => void;
  isDark: boolean;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDark, onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = (page: string) => `
    text-sm font-medium transition-colors cursor-pointer
    ${currentPage === page 
      ? 'text-brand-600 dark:text-brand-400' 
      : 'text-slate-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white'
    }
  `;

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/10 py-4 shadow-sm dark:shadow-none' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Proji</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNav('features')} className={navLinkClass('features')}>Возможности</button>
            <button onClick={() => handleNav('about')} className={navLinkClass('about')}>О нас</button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-gray-300"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              className="text-slate-900 dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-white/10 md:hidden p-4 flex flex-col gap-4 shadow-xl">
           <button onClick={() => handleNav('features')} className="text-left text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white py-2">Возможности</button>
           <button onClick={() => handleNav('about')} className="text-left text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white py-2">О нас</button>
        </div>
      )}
    </header>
  );
};