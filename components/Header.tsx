import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, LayoutGrid } from 'lucide-react';
import { Button } from './ui/Button';
import './shine.css';

const LOGIN_URL = 'https://proji.org/login';

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

  const handleCatalogNav = () => {
    setIsMobileMenuOpen(false);
    window.location.href = '/services';
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
            <span className="proji-logo text-3xl">proji</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNav('features')} className={navLinkClass('features')}>Возможности</button>
            <Link to="/tariffs" className={navLinkClass('tariffs')}>Тарифы</Link>
            <button onClick={handleCatalogNav} className={`${navLinkClass('catalog')} inline-flex items-center gap-1.5`}>
              <LayoutGrid className="w-4 h-4" />
              Продукты
            </button>
            <button onClick={() => handleNav('about')} className={navLinkClass('about')}>О нас</button>
            
            <a href={LOGIN_URL} className="ph-login text-slate-700 dark:text-white">Войти</a>

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
            <a href={LOGIN_URL} className="ph-login text-slate-700 dark:text-white">Войти</a>
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
           <Link to="/tariffs" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white py-2">Тарифы</Link>
           <button onClick={handleCatalogNav} className="text-left text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white py-2 inline-flex items-center gap-1.5">
             <LayoutGrid className="w-4 h-4" />
             Продукты
           </button>
           <button onClick={() => handleNav('about')} className="text-left text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white py-2">О нас</button>
           <a href={LOGIN_URL} className="text-left font-semibold text-slate-900 dark:text-white py-2">Войти</a>
        </div>
      )}
    </header>
  );
};