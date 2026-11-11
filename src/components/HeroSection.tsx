import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  Code2, 
  CheckCircle2, 
  Activity,
  Briefcase,
  Layers,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { PERSONAL_INFO, IIT_BOMBAY_INTERNSHIP } from '../data/portfolioData';

interface HeroSectionProps {
  isDarkMode: boolean;
  onOpenCV: () => void;
  onOpenHireMe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCV,
  onOpenHireMe
}) => {
  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Decorative subtle ambient backdrop glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/12 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Clean Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Hierarchy & Introduction */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Clean Metadata Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider uppercase mb-3">
              <span>Electronics & Communication</span>
              <span aria-hidden="true">·</span>
              <span>WordPress & Shopify Specialist</span>
              <span aria-hidden="true">·</span>
              <span>IIT Bombay Intern</span>
            </div>

            {/* Oversized Expressive Headline in Syne Font */}
            <h1 className="text-5xl sm:text-7xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-4">
              HAMMAD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400">
                PATEL
              </span>
            </h1>

            {/* Clear, Direct Subtitle */}
            <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed mb-6">
              Final-year ECE student at Government Engineering College, Bharuch, specializing in creating responsive, high-converting websites through WordPress and Shopify, custom themes, and visual website builders.
            </p>

            {/* Academic Standout Box */}
            <div className="w-full p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                    Government Engineering College, Bharuch (2023–2027)
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    BE in Electronics & Communication Engineering
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono shrink-0 pl-1 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-white/5 w-full sm:w-auto">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Overall Score (till Sem 6):</span>
                <span className="text-xl font-black text-emerald-500 dark:text-emerald-400">
                  {PERSONAL_INFO.cgpaTillSem6} CGPA
                </span>
              </div>
            </div>

            {/* Direct Contact Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono mb-8">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span aria-hidden="true">·</span>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenHireMe}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 transition-all hover:scale-102"
              >
                <span>Hire Hammad Patel</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCV}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-white/10 shadow-md transition-all"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>View & Download CV</span>
              </button>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Virtual Circuit Studio</span>
              </a>
            </div>

          </div>

          {/* Right Column: Clean, Modern Engineering Identity & Tech Stack Card */}
          <div className="lg:col-span-5 flex flex-col w-full">
            <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Profile Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-extrabold font-display text-lg flex items-center justify-center shadow-md shadow-indigo-500/20">
                    HP
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold font-display text-slate-900 dark:text-white">
                      Hammad Patel
                    </h3>
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 block font-semibold">
                      ECE Student · WordPress & Shopify Specialist
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span>Available</span>
                </div>
              </div>

              {/* Core Credentials List */}
              <div className="py-5 space-y-3.5 text-xs font-mono border-b border-slate-100 dark:border-white/5">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 shrink-0">Institution:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
                    GEC Bharuch (2023–2027)
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 shrink-0">Academic Result:</span>
                  <span className="font-bold text-emerald-500 text-right">
                    {PERSONAL_INFO.cgpaTillSem6} CGPA (Cumulative till Sem 6)
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 shrink-0">Internship:</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-right">
                    IIT Bombay Spoken Tutorial (eSim & CircuitJS)
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 shrink-0">Location:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
                    Bharuch, Gujarat, India
                  </span>
                </div>
              </div>

              {/* Key Technical Competencies */}
              <div className="pt-5 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
                  Core Technical Competencies:
                </span>
                
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">
                    WordPress Website Making
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                    Shopify Store Making
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    WooCommerce Setup
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Elementor & Gutenberg
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Web Builders (Framer, Wix)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40">
                    CircuitJS & eSim
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Technical SEO
                  </span>
                </div>
              </div>

              {/* Direct Quick WhatsApp / Contact Action */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex gap-2">
                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>

                <button
                  onClick={onOpenHireMe}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-white/5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Commission Project</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width Key Metric Strip Below Split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-200/80 dark:border-white/10">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
            <span className="text-3xl font-black font-display text-indigo-600 dark:text-indigo-400">6.38</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono mt-0.5">
              Cumulative CGPA (Sem 1–6)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
            <span className="text-3xl font-black font-display text-cyan-600 dark:text-cyan-400">IIT Bombay</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono mt-0.5">
              Spoken Tutorial Project Intern
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
            <span className="text-3xl font-black font-display text-emerald-600 dark:text-emerald-400">React 19</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono mt-0.5">
              TypeScript & Tailwind Architecture
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
            <span className="text-3xl font-black font-display text-amber-500 dark:text-amber-400">3 Langs</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono mt-0.5">
              English, Hindi, Native Gujarati
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
