import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  FileText, 
  Briefcase, 
  Menu, 
  X
} from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenCV: () => void;
  onOpenHireMe: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleTheme,
  onOpenCV,
  onOpenHireMe
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Coursework', href: '#coursework' },
    { name: 'Skills', href: '#skills' },
    { name: 'Hire Me', href: '#hire-me' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#hire-me') {
      onOpenHireMe();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto transition-all duration-300 flex items-center justify-between gap-6 ${
          isScrolled
            ? 'w-full max-w-5xl py-2 px-5 sm:px-6 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-xl'
            : 'w-full max-w-7xl py-3 px-6 sm:px-8 rounded-2xl bg-white/40 dark:bg-[#07090e]/40 backdrop-blur-md border border-slate-200/40 dark:border-white/5'
        }`}
      >
        {/* Zone 1: Brand Wordmark (Single text element in Syne Display font) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-base sm:text-lg font-extrabold font-display tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-indigo-400 transition-colors"
        >
          HAMMAD PATEL
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions (Theme Toggle, CV, Hire Me) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/60 dark:border-white/10"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform -rotate-12 hover:rotate-0 duration-300" />
            )}
          </button>

          {/* View CV Button */}
          <button
            onClick={onOpenCV}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300/60 dark:border-white/10 transition-colors whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>CV</span>
          </button>

          {/* Hire Me CTA Button */}
          <button
            onClick={onOpenHireMe}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all whitespace-nowrap shrink-0"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden fixed top-16 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-6 flex flex-col gap-3 z-50 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
            <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wider">
              HAMMAD PATEL · PORTFOLIO
            </span>
            <span className="text-xs font-mono text-emerald-500">
              6.38 CGPA (Sem 1–6)
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm font-semibold py-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="w-full px-4 py-2.5 rounded-xl text-left text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <span className="text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCV();
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Inspect CV</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHireMe();
              }}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Briefcase className="w-4 h-4" />
              <span>Hire Me</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
