import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CourseworkExplorer } from './components/CourseworkExplorer';
import { AcademicMilestones } from './components/AcademicMilestones';
import { IITBombayExperience } from './components/IITBombayExperience';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { HireMeSection } from './components/HireMeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { CyberSectionReveal } from './components/CyberSectionReveal';
import { PERSONAL_INFO } from './data/portfolioData';
import { 
  Home, 
  User, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Zap, 
  Mail, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Globe, 
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hammad_theme');
      if (stored) return stored === 'dark';
      return true; // Default to dark obsidian aesthetic
    }
    return true;
  });

  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const valid = ['home', 'about', 'portfolio', 'coursework', 'skills', 'hire-me', 'contact'];
      if (valid.includes(hash)) return hash;
    }
    return 'home';
  });

  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('hammad_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('hammad_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const valid = ['home', 'about', 'portfolio', 'coursework', 'skills', 'hire-me', 'contact'];
      if (valid.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleOpenCV = () => {
    setIsCVModalOpen(true);
  };

  const handleCloseCV = () => {
    setIsCVModalOpen(false);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHireMe = () => {
    handleNavigate('hire-me');
  };

  const pagesList = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'coursework', label: 'Coursework', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'hire-me', label: 'Hire Me', icon: Zap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f9] dark:bg-[#05070e] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-[#00f0ff] selection:text-black overflow-x-hidden">
      {/* Futuristic Cyberpunk Matrix Grid */}
      <div className="fixed inset-0 tech-grid pointer-events-none opacity-40 dark:opacity-45 z-0" />

      {/* Sticky morphing pill header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenCV={handleOpenCV}
        onOpenHireMe={handleOpenHireMe}
      />

      {/* Multi-Page Sub-Navigation Breadcrumb / Page Bar (rendered on all pages) */}
      <div className="relative z-20 pt-20 sm:pt-24 pb-2 px-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 py-2 px-3 sm:px-4 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-slate-200 dark:border-[#00f0ff]/30 shadow-sm overflow-x-auto text-xs font-mono scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sky-600 dark:text-[#00f0ff] font-bold">[// SYSTEM]</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 dark:text-white font-bold uppercase tracking-wider">
              {currentPage}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {pagesList.map((p) => {
              const Icon = p.icon;
              const isActive = currentPage === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleNavigate(p.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-600 text-white dark:bg-[#00f0ff] dark:text-black font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Multi-Page Content Views */}
      <main className="flex-1 relative z-10">
        
        {/* =========================================================================
            PAGE 1: HOME
            ========================================================================= */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* 1. Hero with Orbitron typography & full-width profile card */}
            <CyberSectionReveal threshold={0}>
              <HeroSection
                isDarkMode={isDarkMode}
                onOpenCV={handleOpenCV}
                onOpenHireMe={handleOpenHireMe}
                onNavigate={handleNavigate}
              />
            </CyberSectionReveal>

            {/* 2. Featured Project Spotlight: hammadpatel.vercel.app (Personal Portfolio Website Made by Hammad Patel) */}
            <CyberSectionReveal>
              <section className="py-12 sm:py-16 relative bg-white/60 dark:bg-black/40 border-y border-slate-200 dark:border-[#00f0ff]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/40 text-xs font-mono font-bold text-sky-700 dark:text-[#00f0ff] uppercase mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-[#00f0ff]" />
                        <span>FEATURED RECENT WORK · MADE BY HAMMAD PATEL</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-black font-display text-slate-900 dark:text-white uppercase tracking-tight">
                        hammadpatel.vercel.app
                      </h2>
                    </div>

                    <button
                      onClick={() => handleNavigate('portfolio')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black/60 dark:hover:bg-[#00f0ff]/20 text-slate-800 dark:text-[#00f0ff] font-mono text-xs font-bold border border-slate-300 dark:border-[#00f0ff]/40 transition-all"
                    >
                      <span>EXPLORE ALL RECENT WORKS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Spotlight Card */}
                  <div className="cyber-bracket rounded-3xl overflow-hidden border-2 border-sky-400/50 dark:border-[#00f0ff]/60 bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-xl shadow-xl dark:shadow-[0_0_35px_rgba(0,240,255,0.2)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      
                      <div className="lg:col-span-5 relative bg-gradient-to-br from-[#0a0e1a] via-[#0d1326] to-[#05070e] p-5 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#00f0ff]/20 overflow-hidden">
                        
                        {/* Simulated Browser Address Bar & Window Chrome (Zero AI Images) */}
                        <div className="rounded-2xl border border-sky-500/30 dark:border-[#00f0ff]/40 bg-black/85 backdrop-blur-md overflow-hidden shadow-2xl p-4 sm:p-5 flex flex-col justify-between h-full min-h-[290px]">
                          
                          {/* Browser Window Controls */}
                          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                            </div>
                            <div className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-sky-300 text-[11px] font-mono flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
                              <span>https://hammadpatel.vercel.app</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold">200 OK</span>
                          </div>

                          {/* Live Terminal / System Telemetry Screen */}
                          <div className="py-3 space-y-2 font-mono text-xs">
                            <div className="flex items-center gap-2 text-sky-400">
                              <span className="text-[#00ff66] font-bold">$</span>
                              <span className="text-white font-bold">curl -I</span>
                              <span className="text-[#00f0ff]">hammadpatel.vercel.app</span>
                            </div>
                            
                            <div className="p-2.5 rounded-xl bg-slate-950/90 border border-white/10 space-y-1.5 text-[11px]">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">ARCHITECT:</span>
                                <span className="text-white font-bold">Hammad Patel</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">DEPLOYMENT:</span>
                                <span className="text-[#00ff66] font-bold">Vercel Edge</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">AESTHETIC:</span>
                                <span className="text-[#00f0ff]">Cyberpunk HUD</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">ACADEMICS:</span>
                                <span className="text-emerald-400 font-bold">6.38 CGPA (Sem 1–6)</span>
                              </div>
                            </div>

                            {/* Simulated Live CRT Waveform Oscilloscope Trace */}
                            <div className="rounded-lg bg-black/95 p-2 border border-[#00f0ff]/30 relative overflow-hidden">
                              <div className="flex items-center justify-between text-[10px] text-[#00f0ff] mb-1">
                                <span>OSCILLOSCOPE TELEMETRY</span>
                                <span className="text-[#00ff66]">60 FPS CRT</span>
                              </div>
                              <div className="h-7 w-full flex items-center justify-center relative">
                                <svg className="w-full h-full text-[#00f0ff] stroke-current" viewBox="0 0 300 35" fill="none">
                                  <path
                                    d="M0 17.5 Q 37.5 2, 75 17.5 T 150 17.5 T 225 17.5 T 300 17.5"
                                    strokeWidth="2"
                                    className="drop-shadow-[0_0_6px_#00f0ff]"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Launch Direct Link */}
                          <a
                            href="https://hammadpatel.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 dark:from-[#00f0ff]/20 dark:to-[#0088ff]/20 border border-sky-400/40 dark:border-[#00f0ff]/50 text-white dark:text-[#00f0ff] font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md group/btn"
                          >
                            <span>LAUNCH LIVE SITE</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                        </div>

                      </div>

                      <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-mono font-bold text-sky-600 dark:text-[#00f0ff] uppercase tracking-wider mb-1">
                            PRODUCTION WEB ARCHITECTURE · DEPLOYED ON VERCEL
                          </div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-slate-900 dark:text-white uppercase mb-2">
                            Hammad Patel Cyberpunk Portfolio & Engineering Workspace
                          </h3>
                          <div className="inline-block mb-3 px-2.5 py-0.5 rounded bg-sky-100 dark:bg-[#00f0ff]/15 border border-sky-300 dark:border-[#00f0ff]/40 text-xs font-mono font-bold text-sky-800 dark:text-[#00f0ff]">
                            Personal Portfolio Website · Made by Hammad Patel
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-cyber leading-relaxed mb-4">
                            Official personal portfolio and technical workspace deployed live at <strong className="text-sky-600 dark:text-[#00f0ff]">hammadpatel.vercel.app</strong>. Engineered by Hammad Patel with high-contrast cyberpunk gaming aesthetics, interactive circuit and waveform simulation laboratory, interactive project price & hour estimator tailored for Indian markets, and full ECE academic coursework explorer.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mb-5">
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
                              <span>Live at hammadpatel.vercel.app</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
                              <span>&lt;1s Fast Load</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
                              <span>100% Mobile Responsive</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66]" />
                              <span>Indian Market ₹499/hr Estimator</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {['React 19', 'Tailwind CSS', 'TypeScript', 'Three.js', 'Web Audio API', 'Vercel'].map(t => (
                              <span key={t} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-black/60 border border-slate-300 dark:border-[#00f0ff]/30 text-xs font-mono font-bold text-slate-800 dark:text-[#00f0ff]">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-3">
                          <a
                            href="https://hammadpatel.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d0df] text-white dark:text-black font-mono text-xs font-bold uppercase transition-all shadow-md"
                          >
                            <span>Visit hammadpatel.vercel.app</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleNavigate('portfolio')}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black/60 text-slate-800 dark:text-white font-mono text-xs font-bold border border-slate-300 dark:border-white/20 transition-colors"
                          >
                            <span>View in Portfolio</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section>
            </CyberSectionReveal>

            {/* 3. Navigation Hub Grid: Interactive Pages Portal */}
            <CyberSectionReveal>
              <section className="py-16 sm:py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/30 text-sky-700 dark:text-[#00f0ff] font-mono text-xs font-bold uppercase mb-2">
                      <Layers className="w-3.5 h-3.5" />
                      <span>EXPLORE HAMMAD PATEL'S MULTI-PAGE PLATFORM</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white uppercase">
                      SYSTEM PAGES &amp; DIRECTORIES
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-cyber max-w-2xl mx-auto mt-2">
                      Navigate directly to any section to review academic coursework, live interactive circuit simulator, commercial web services, and pricing calculator.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Tile 1: About */}
                    <div
                      onClick={() => handleNavigate('about')}
                      className="cursor-pointer cyber-bracket rounded-2xl p-6 bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md hover:border-sky-500 dark:hover:border-[#00f0ff] transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-sky-100 dark:bg-[#00f0ff]/15 text-sky-700 dark:text-[#00f0ff]">
                          <User className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-[#00f0ff]">
                          PAGE // 01
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-[#00f0ff] transition-colors">
                        About Hammad Patel
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                        Electronics &amp; Communication Engineering profile, GEC Bharuch background, and IIT Bombay Spoken Tutorial internship in CircuitJS &amp; eSim.
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-600 dark:text-[#00f0ff]">
                        <span>Open About Page</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Tile 2: Portfolio */}
                    <div
                      onClick={() => handleNavigate('portfolio')}
                      className="cursor-pointer cyber-bracket rounded-2xl p-6 bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md hover:border-sky-500 dark:hover:border-[#00f0ff] transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          PAGE // 02
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Portfolio &amp; Recent Works
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                        Showcase of hammadpatel.vercel.app, Shopify storefronts, WordPress bespoke portals, and the Virtual Circuit &amp; Waveform Studio.
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        <span>Open Portfolio Page</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Tile 3: Coursework */}
                    <div
                      onClick={() => handleNavigate('coursework')}
                      className="cursor-pointer cyber-bracket rounded-2xl p-6 bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md hover:border-sky-500 dark:hover:border-[#00f0ff] transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          PAGE // 03
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        GTU Coursework Syllabus
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                        Comprehensive curriculum explorer across Semester 1 to Semester 7 (Winter 2026), lab practicals, VLSI, DSP, and 6.38 CGPA standing.
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        <span>Open Coursework Page</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Tile 4: Skills */}
                    <div
                      onClick={() => handleNavigate('skills')}
                      className="cursor-pointer cyber-bracket rounded-2xl p-6 bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md hover:border-sky-500 dark:hover:border-[#00f0ff] transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400">
                          PAGE // 04
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        Technical Skills
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                        WordPress, Shopify, Java, Python, C, RF Communication, Satellite Link calculations, CircuitJS, and modern frontend stacks.
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                        <span>Open Skills Page</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Tile 5: Hire Me */}
                    <div
                      onClick={() => handleNavigate('hire-me')}
                      className="cursor-pointer cyber-bracket rounded-2xl p-6 bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md hover:border-sky-500 dark:hover:border-[#00f0ff] transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                          <Zap className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          PAGE // 05 · ₹499/HR
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Hire Me &amp; Price Estimator
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                        Interactive Indian market scope calculator. Toggle features, review timelines, calculate instant ₹ INR quotes, and dispatch to WhatsApp.
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                        <span>Open Estimator Page</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Tile 6: Contact */}
                    <div
                      onClick={() => handleNavigate('contact')}
                      className="cursor-pointer cyber-bracket rounded-2xl p-6 bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md hover:border-sky-500 dark:hover:border-[#00f0ff] transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400">
                          <Mail className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">
                          PAGE // 06
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                        Contact &amp; Location
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                        Direct communication channels: Bharuch Gujarat office, official email, phone, and direct WhatsApp messaging pipeline.
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                        <span>Open Contact Page</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </CyberSectionReveal>

            {/* Quick Academic Standing Highlight Banner */}
            <CyberSectionReveal>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border border-sky-300 dark:border-[#00f0ff]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-sky-700 dark:text-[#00f0ff] uppercase block mb-1">
                      ACADEMIC CREDENTIALS // GEC BHARUCH
                    </span>
                    <h4 className="text-lg sm:text-xl font-black font-display text-slate-900 dark:text-white">
                      6.38 CGPA (Till Semester 6) · Entering Semester 7 (Winter 2026)
                    </h4>
                  </div>
                  <button
                    onClick={() => handleNavigate('coursework')}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d0df] text-white dark:text-black font-mono text-xs font-bold shrink-0 transition-colors"
                  >
                    View Full 7-Semester Syllabus →
                  </button>
                </div>
              </div>
            </CyberSectionReveal>
          </div>
        )}

        {/* =========================================================================
            PAGE 2: ABOUT
            ========================================================================= */}
        {currentPage === 'about' && (
          <div className="animate-in fade-in duration-300">
            <CyberSectionReveal threshold={0}>
              <AboutSection
                onOpenCV={handleOpenCV}
                onOpenHireMe={handleOpenHireMe}
              />
            </CyberSectionReveal>

            <CyberSectionReveal>
              <AcademicMilestones />
            </CyberSectionReveal>

            <CyberSectionReveal>
              <IITBombayExperience />
            </CyberSectionReveal>
          </div>
        )}

        {/* =========================================================================
            PAGE 3: PORTFOLIO & RECENT WORKS
            (Featuring hammadpatel.vercel.app + WordPress & Shopify + Virtual Signal Lab)
            ========================================================================= */}
        {currentPage === 'portfolio' && (
          <div className="animate-in fade-in duration-300">
            <CyberSectionReveal threshold={0}>
              <ProjectsSection onOpenHireMe={handleOpenHireMe} />
            </CyberSectionReveal>
          </div>
        )}

        {/* =========================================================================
            PAGE 4: COURSEWORK
            ========================================================================= */}
        {currentPage === 'coursework' && (
          <div className="animate-in fade-in duration-300">
            <CyberSectionReveal threshold={0}>
              <CourseworkExplorer />
            </CyberSectionReveal>

            <CyberSectionReveal>
              <AcademicMilestones />
            </CyberSectionReveal>
          </div>
        )}

        {/* =========================================================================
            PAGE 5: SKILLS
            ========================================================================= */}
        {currentPage === 'skills' && (
          <div className="animate-in fade-in duration-300">
            <CyberSectionReveal threshold={0}>
              <SkillsSection />
            </CyberSectionReveal>
          </div>
        )}

        {/* =========================================================================
            PAGE 6: HIRE ME & ESTIMATOR
            ========================================================================= */}
        {currentPage === 'hire-me' && (
          <div className="animate-in fade-in duration-300">
            <CyberSectionReveal threshold={0}>
              <HireMeSection />
            </CyberSectionReveal>
          </div>
        )}

        {/* =========================================================================
            PAGE 7: CONTACT
            ========================================================================= */}
        {currentPage === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <CyberSectionReveal threshold={0}>
              <ContactSection />
            </CyberSectionReveal>
          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer
        onOpenCV={handleOpenCV}
        onOpenHireMe={handleOpenHireMe}
        onNavigate={handleNavigate}
      />

      {/* CV Modal (PDF viewer & download) */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={handleCloseCV}
      />
    </div>
  );
}

export default App;
