import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  FileText, 
  Briefcase, 
  Menu, 
  X,
  MessageCircle,
  Home,
  User,
  GraduationCap,
  Cpu,
  Zap,
  Mail,
  ArrowRight,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenCV: () => void;
  onOpenHireMe: () => void;
}

interface NavItem {
  id: string;
  label: string;
  badge?: string;
  desc: string;
  icon: React.ElementType;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage = 'home',
  onNavigate,
  isDarkMode,
  onToggleTheme,
  onOpenCV,
  onOpenHireMe
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      desc: 'Overview & Personal Spotlight',
      icon: Home
    },
    {
      id: 'about',
      label: 'About',
      desc: 'ECE Profile & IIT Bombay Internship',
      icon: User
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      badge: 'hammadpatel.vercel.app',
      desc: 'Recent Works & Virtual Signal Lab',
      icon: Briefcase
    },
    {
      id: 'coursework',
      label: 'Coursework',
      badge: 'Sem 1–7',
      desc: 'Complete GTU Syllabus & Labs',
      icon: GraduationCap
    },
    {
      id: 'skills',
      label: 'Skills',
      desc: 'WordPress, Shopify, Java & ECE',
      icon: Cpu
    },
    {
      id: 'hire-me',
      label: 'Hire Me',
      badge: '₹499/hr',
      desc: 'Indian Market Price Estimator',
      icon: Zap
    },
    {
      id: 'contact',
      label: 'Contact',
      desc: 'Email, WhatsApp & Location',
      icon: Mail
    }
  ];

  const handleItemSelect = (pageId: string) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
    if (pageId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (pageId === 'hire-me') {
      onOpenHireMe();
      return;
    }
    const target = document.getElementById(pageId) || document.querySelector(`#${pageId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300">
      {/* Morphing Header: Merges seamlessly with top when scroll up, becomes sticky round pill when scrolled down */}
      <div
        ref={dropdownRef}
        className={`pointer-events-auto relative transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'w-[92%] sm:w-full max-w-2xl sm:max-w-3xl mt-2.5 sm:mt-3 py-2 px-5 sm:px-6 rounded-full bg-white/95 dark:bg-[#05070e]/95 backdrop-blur-xl border border-slate-300/80 dark:border-[#00f0ff]/50 shadow-[0_10px_30px_rgba(0,180,216,0.15)] dark:shadow-[0_0_25px_rgba(0,240,255,0.25)] text-slate-900 dark:text-white'
            : 'w-full max-w-full py-3.5 px-4 sm:px-8 rounded-none bg-white/90 dark:bg-[#05070e]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#00f0ff]/20 text-slate-900 dark:text-white'
        }`}
      >
        {/* Left: Brand Name Wordmark (Cyberpunk Orbitron Typography) */}
        <button
          onClick={() => handleItemSelect('home')}
          style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.04em' }}
          className="text-sm sm:text-lg font-black font-display font-orbitron tracking-wide text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-[#00f0ff] transition-colors uppercase whitespace-nowrap shrink-0 group flex items-center gap-2"
        >
          <span className="text-sky-600 dark:text-[#00f0ff] font-mono text-xs dark:group-hover:neon-cyan-glow transition-all">[//]</span>
          <span style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.04em' }} className="dark:group-hover:neon-cyan-glow transition-all">HAMMAD PATEL</span>
        </button>

        {/* Center: Current active page badge (visible on tablet/desktop) */}
        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-300">
          <span className="text-slate-400 dark:text-slate-600">PAGE:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/30 text-sky-700 dark:text-[#00f0ff] font-bold uppercase tracking-wider">
            {currentPage}
          </span>
        </div>

        {/* Right: Normal Menu Icon Button (No extra text next to it) */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 sm:p-2.5 rounded-full text-slate-800 dark:text-[#00f0ff] hover:text-sky-600 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-black/60 dark:hover:bg-[#00f0ff]/20 border border-slate-300 dark:border-[#00f0ff]/40 shadow-sm dark:shadow-[0_0_12px_rgba(0,240,255,0.2)] transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-[#00f0ff]/50"
          >
            {menuOpen ? (
              <X className="w-5 h-5 stroke-[2.4]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.4]" />
            )}
          </button>

          {/* Clean Cyberpunk Navigation Dropdown Box */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-3 w-[88vw] sm:w-[380px] max-w-[380px] bg-white/98 dark:bg-[#070b16]/98 backdrop-blur-2xl rounded-2xl border-2 border-slate-300 dark:border-[#00f0ff]/60 shadow-2xl dark:shadow-[0_0_35px_rgba(0,240,255,0.25)] p-4 sm:p-5 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-white">
              
              {/* Dropdown Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-[#00f0ff]/20">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-600 dark:text-[#00f0ff]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-[#00f0ff]">
                    NAVIGATION SYSTEM
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-[#00ff66] bg-emerald-50 dark:bg-[#00ff66]/10 px-2 py-0.5 rounded border border-emerald-300 dark:border-[#00ff66]/30">
                  6.38 CGPA (SEM 1–6)
                </span>
              </div>

              {/* Theme Toggle Button (Cyber Dark / Light Switch) */}
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-black/70 border border-slate-200 dark:border-[#00f0ff]/30 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="w-4 h-4 text-[#00f0ff]" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                  )}
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block leading-tight">
                      {isDarkMode ? 'CYBER OBSIDIAN' : 'HIGH-TECH LIGHT'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      Theme Mode
                    </span>
                  </div>
                </div>

                <button
                  onClick={onToggleTheme}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                    isDarkMode
                      ? 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/50 hover:bg-[#00f0ff] hover:text-black shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'bg-amber-500/15 text-amber-700 border-amber-400 hover:bg-amber-500 hover:text-white shadow-sm'
                  }`}
                >
                  {isDarkMode ? 'SWITCH LIGHT' : 'SWITCH DARK'}
                </button>
              </div>

              {/* Clean Multi-Page Navigation List */}
              <div className="space-y-1 mb-3 max-h-[320px] overflow-y-auto pr-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemSelect(item.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-sky-50 dark:bg-[#00f0ff]/15 border-sky-400 dark:border-[#00f0ff] shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          : 'border-transparent hover:bg-slate-100 dark:hover:bg-[#00f0ff]/10 hover:border-slate-300 dark:hover:border-[#00f0ff]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${
                          isActive
                            ? 'bg-sky-600 text-white dark:bg-[#00f0ff] dark:text-black'
                            : 'bg-slate-200 text-slate-700 dark:bg-black/60 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-[#00f0ff]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-mono font-bold ${
                              isActive
                                ? 'text-sky-700 dark:text-[#00f0ff]'
                                : 'text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-[#00f0ff]'
                            }`}>
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-100 dark:bg-[#00f0ff]/20 text-sky-800 dark:text-[#00f0ff] border border-sky-300 dark:border-[#00f0ff]/30">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">
                            {item.desc}
                          </span>
                        </div>
                      </div>

                      {isActive ? (
                        <span className="text-[10px] font-mono font-bold text-sky-700 dark:text-[#00f0ff] bg-sky-100 dark:bg-[#00f0ff]/20 px-2 py-0.5 rounded">
                          [ACTIVE]
                        </span>
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-sky-600 dark:text-[#00f0ff] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions (CV & Hire Me) */}
              <div className="pt-3 border-t border-slate-200 dark:border-[#00f0ff]/20 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenCV();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black/60 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-300 dark:border-slate-700"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-[#00f0ff]" />
                  <span>VIEW CV (PDF)</span>
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenHireMe();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d0df] text-white dark:text-black font-mono text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  <Briefcase className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>HIRE HAMMAD</span>
                </button>
              </div>

              {/* WhatsApp Direct Line */}
              <div className="mt-3 pt-2 text-center border-t border-slate-200 dark:border-[#00f0ff]/10">
                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-700 dark:text-[#00ff66] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: +91 99747 61355</span>
                </a>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};
