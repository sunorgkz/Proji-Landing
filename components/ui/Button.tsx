import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  withArrow = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden";
  
  const variants = {
    // Primary: Brand Blue in Light mode, White in Dark mode
    primary: "bg-brand-600 text-white dark:bg-white dark:text-brand-900 hover:bg-brand-700 dark:hover:bg-gray-100 focus:ring-brand-500 dark:focus:ring-white shadow-lg shadow-brand-500/30 dark:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    
    // Secondary: Dark Blue in Light mode, Brand Blue in Dark mode
    secondary: "bg-slate-900 text-white dark:bg-brand-600 dark:text-white hover:bg-slate-800 dark:hover:bg-brand-500 focus:ring-slate-900 dark:focus:ring-brand-500 shadow-lg",
    
    // Outline: Dark border in Light mode, White border in Dark mode
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-white/30 dark:text-white dark:hover:bg-white/10 focus:ring-slate-900 dark:focus:ring-white backdrop-blur-sm",
    
    // Ghost
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Shimmer effect for primary buttons (only in dark mode usually looks best, but let's keep it subtle) */}
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"></span>
      )}
      <span className="relative z-20 flex items-center">
        {children}
        {withArrow && <ArrowRight className="ml-2 w-5 h-5" />}
      </span>
    </button>
  );
};