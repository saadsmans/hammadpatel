import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  CheckCircle2, 
  Briefcase, 
  MessageCircle, 
  Zap,
  Globe,
  ShoppingBag,
  ExternalLink,
  Cpu,
  Terminal,
  Activity
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  isDarkMode: boolean;
  onOpenCV: () => void;
  onOpenHireMe: () => void;
  onNavigate?: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCV,
  onOpenHireMe,
  onNavigate
}) => {
  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
      {/* Dynamic Cyberpunk Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[550px] max-w-full h-[320px] bg-[#00f0ff]/12 blur-[140px] rounded-full pointer-events-none -z-10 animate-neon-pulse" />
      <div className="absolute top-24 right-1/4 w-[450px] max-w-full h-[300px] bg-[#ff0055]/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-glow-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Responsive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Cyberpunk Gaming Typographic Identity */}
          <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
            
            {/* Cyber HUD Kicker */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/40 text-sky-700 dark:text-[#00f0ff] text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm dark:shadow-[0_0_12px_rgba(0,240,255,0.2)] max-w-full">
              <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-[#00f0ff] animate-ping" />
              <span>[// ELECTRONICS & COMMUNICATION · WORDPRESS & SHOPIFY · IIT BOMBAY]</span>
            </div>

            {/* Oversized Cyberpunk Headline in Orbitron Font with Exact Same Font & Color as Reference */}
            <h1 
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.04em' }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black font-display font-orbitron tracking-wide text-slate-900 dark:text-white leading-[1.08] mb-4 break-words w-full"
            >
              HAMMAD <br />
              <span 
                style={{ 
                  fontFamily: "'Orbitron', sans-serif", 
                  letterSpacing: '0.04em',
                  backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 52%, #00f0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                className="bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(0,240,255,0.35)]"
              >
                PATEL
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-cyber text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-6 font-medium">
              Final-year ECE student at <strong className="text-slate-900 dark:text-white">Government Engineering College, Bharuch</strong>, specializing in creating high-converting websites through <strong className="text-sky-600 dark:text-[#00f0ff]">WordPress</strong>, <strong className="text-emerald-600 dark:text-[#00ff66]">Shopify</strong>, custom themes, and visual website builders with high-contrast UI design.
            </p>

            {/* Academic Standout Box (Cyberpunk HUD styling) */}
            <div className="w-full p-4 sm:p-5 rounded-2xl cyber-card mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-[#00f0ff]/15 border border-sky-300 dark:border-[#00f0ff]/40 flex items-center justify-center text-sky-700 dark:text-[#00f0ff] shrink-0 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block truncate">
                    GEC BHARUCH · RUN 2023–2027
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-display text-slate-900 dark:text-white truncate block">
                    BE in Electronics & Communication Engineering
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono shrink-0 pl-1 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 dark:border-white/10 w-full sm:w-auto">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Overall Result (till Sem 6):</span>
                <span className="text-2xl font-black font-display text-emerald-600 dark:text-[#00ff66] drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]">
                  {PERSONAL_INFO.cgpaTillSem6} CGPA
                </span>
              </div>
            </div>

            {/* Direct Contact Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono mb-6">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-sky-600 dark:hover:text-[#00f0ff] transition-colors flex items-center gap-1.5 break-all">
                <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-[#00f0ff] shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span aria-hidden="true" className="hidden sm:inline text-slate-400 dark:text-slate-600">·</span>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-600 dark:hover:text-[#00ff66] transition-colors flex items-center gap-1.5 shrink-0">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66] shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <span aria-hidden="true" className="hidden sm:inline text-slate-400 dark:text-slate-600">·</span>
              <span className="flex items-center gap-1.5 shrink-0 text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-rose-500 dark:text-[#ff0055] shrink-0" />
                <span>Bharuch, Gujarat, India</span>
              </span>
            </div>

            {/* Action Buttons (High-contrast Cyberpunk CTAs) */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenHireMe}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold font-mono text-xs sm:text-sm text-white dark:text-black bg-sky-600 hover:bg-sky-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d0df] shadow-lg dark:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all hover:scale-102 active:scale-98"
              >
                <Zap className="w-4 h-4 fill-current stroke-none" />
                <span>ESTIMATE & HIRE ME</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCV}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white bg-white hover:bg-slate-100 dark:bg-black/70 dark:hover:bg-black/90 border border-slate-300 dark:border-[#00f0ff]/40 shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-sky-600 dark:text-[#00f0ff]" />
                <span>VIEW CV (PDF)</span>
              </button>

              <button
                onClick={() => onNavigate ? onNavigate('portfolio') : undefined}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3.5 text-xs font-mono font-bold text-amber-600 dark:text-[#fcee0a] hover:underline"
              >
                <Activity className="w-3.5 h-3.5 text-amber-600 dark:text-[#fcee0a]" />
                <span>[ LIVE SIGNAL LAB ↵ ]</span>
              </button>
            </div>

          </div>

          {/* Right Column: Cyberpunk HUD Identity & Specialization Matrix (NO HP LOGO BOX) */}
          <div className="lg:col-span-5 flex flex-col w-full">
            <div className="cyber-bracket p-6 sm:p-7 rounded-3xl cyber-card relative overflow-hidden">
              
              {/* Profile Card Header (Clean: No HP logo box!) */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#00f0ff]/20">
                <div>
                  <h3 
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                    className="text-xl sm:text-2xl font-black font-display font-orbitron text-slate-900 dark:text-white tracking-wide"
                  >
                    HAMMAD PATEL
                  </h3>
                  <span className="text-xs font-mono text-sky-600 dark:text-[#00f0ff] block font-semibold mt-0.5">
                    WordPress & Shopify Specialist · ECE Student
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 dark:bg-[#00ff66]/10 border border-emerald-300 dark:border-[#00ff66]/30 text-[10px] font-mono text-emerald-700 dark:text-[#00ff66] font-bold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#00ff66] animate-ping shrink-0" />
                  <span>ONLINE // ACTIVE</span>
                </div>
              </div>

              {/* Core Credentials HUD */}
              <div className="py-4 space-y-3 text-xs font-mono border-b border-slate-200 dark:border-[#00f0ff]/20">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">INSTITUTION:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-right">
                    GEC Bharuch (2023–2027)
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">ACADEMIC RESULT:</span>
                  <span className="font-black text-emerald-600 dark:text-[#00ff66] text-right">
                    {PERSONAL_INFO.cgpaTillSem6} CGPA (till Sem 6)
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">INTERNSHIP:</span>
                  <span className="font-bold text-sky-600 dark:text-[#00f0ff] text-right">
                    IIT Bombay Spoken Tutorial (CircuitJS & eSim)
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">LOCATION:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-right">
                    Bharuch, Gujarat, India
                  </span>
                </div>
              </div>

              {/* Key Technical Competencies */}
              <div className="pt-4 pb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-600 dark:text-[#00f0ff] block mb-2.5 font-bold">
                  CORE SPECIALIZATIONS & PLATFORMS:
                </span>
                
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-sky-50 dark:bg-[#00f0ff]/10 text-sky-700 dark:text-[#00f0ff] border border-sky-200 dark:border-[#00f0ff]/30">
                    WordPress Website Making
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-[#00ff66]/10 text-emerald-700 dark:text-[#00ff66] border border-emerald-200 dark:border-[#00ff66]/30">
                    Shopify Store Creation
                  </span>
                  <span className="px-2.5 py-1 rounded bg-rose-50 dark:bg-[#ff0055]/10 text-rose-700 dark:text-[#ff0055] border border-rose-200 dark:border-[#ff0055]/30">
                    Visual Web Builders (Wix, Framer)
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-black/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    WooCommerce Setup
                  </span>
                  <span className="px-2.5 py-1 rounded bg-amber-50 dark:bg-[#fcee0a]/10 text-amber-700 dark:text-[#fcee0a] border border-amber-200 dark:border-[#fcee0a]/30">
                    CircuitJS & eSim Simulation
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-black/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Technical SEO & Speed Tuning
                  </span>
                </div>
              </div>

              {/* Direct Quick WhatsApp / Commission Actions */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#00f0ff]/20 flex gap-2">
                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-[#00ff66] dark:hover:bg-[#00dd55] dark:text-black text-xs font-black font-mono flex items-center justify-center gap-2 transition-colors shadow-md dark:shadow-[0_0_12px_rgba(0,255,102,0.4)]"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WHATSAPP CHAT</span>
                </a>

                <button
                  onClick={onOpenHireMe}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black/80 dark:hover:bg-black text-sky-700 dark:text-[#00f0ff] border border-slate-300 dark:border-[#00f0ff]/50 text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-[#00f0ff]" />
                  <span>START ESTIMATE</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
