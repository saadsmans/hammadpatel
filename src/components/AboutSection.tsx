import React from 'react';
import { 
  User, 
  Sparkles, 
  Radio, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Award,
  Layers,
  Globe,
  Zap,
  Terminal
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenCV: () => void;
  onOpenHireMe: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCV, onOpenHireMe }) => {
  return (
    <section id="about" className="py-20 sm:py-24 relative bg-white dark:bg-[#05070e] border-t border-slate-200 dark:border-[#00f0ff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/30 text-xs font-mono font-bold tracking-wider text-sky-700 dark:text-[#00f0ff] uppercase mb-3 shadow-sm dark:shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <User className="w-4 h-4 text-sky-600 dark:text-[#00f0ff]" />
            <span>[// ENGINEERING DOSSIER · HAMMAD PATEL]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 dark:text-white uppercase">
            DUAL DISCIPLINE:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-rose-600 dark:from-[#00f0ff] dark:via-[#38bdf8] dark:to-[#ff0055] dark:neon-cyan-glow">
              HARDWARE & WEB ARCHITECTURE
            </span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl text-xs sm:text-sm font-cyber leading-relaxed">
            Driven by curiosity in wireless signals, electronic circuit simulation, and high-conversion WordPress & Shopify websites.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-4 text-slate-600 dark:text-slate-300 font-cyber text-sm sm:text-base leading-relaxed">
            <p>
              I am an <strong className="text-slate-900 dark:text-white font-bold">Electronics & Communication Engineering student</strong> at <strong className="text-slate-900 dark:text-white font-bold">Government Engineering College, Bharuch</strong> (2023–2027), entering Semester 7 (Winter 2026) with a verified cumulative score of <strong className="text-emerald-600 dark:text-[#00ff66] font-mono font-bold">6.38 CGPA</strong> through Semester 6.
            </p>
            <p>
              Across 7 rigorous semesters, I have studied communication systems with dedication—including <strong className="text-sky-600 dark:text-[#00f0ff]">Satellite Communication, Radar & Navigation Aids (RNA), Antennas & Propagation, Fiber Optic Communication, VLSI Design, Digital Signal Processing (DSP), Microwave Theory (MTT), and Wireless Sensor Networks (WSN)</strong>.
            </p>
            <p>
              Complementing my hardware background, I specialize in commercial website creation: <strong className="text-rose-600 dark:text-[#ff0055]">WordPress Website Making, Shopify Online Store Creation, WooCommerce setups, and visual website builders like Framer and Webflow</strong>, supported by foundational computing skills in Java (OOP) and Python.
            </p>

            {/* Core Values / Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="p-4 rounded-2xl cyber-card flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00ff66] shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="font-bold text-slate-900 dark:text-white block">Analytical & Empirical</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">eSim & CircuitJS SPICE circuit validation</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl cyber-card flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-[#00f0ff] shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="font-bold text-slate-900 dark:text-white block">High-Conversion Web</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">WordPress & Shopify setups ready for launch</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl cyber-card flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-[#ff0055] shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="font-bold text-slate-900 dark:text-white block">Academic Dedication</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">6.38 CGPA overall result till Sem 6 @ GEC</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl cyber-card flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-[#fcee0a] shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="font-bold text-slate-900 dark:text-white block">Technical Communication</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">Fluent in English, Hindi, and Native Gujarati</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenCV}
                className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-black/60 dark:hover:bg-black border border-slate-300 dark:border-[#00f0ff]/40 shadow-sm transition-colors flex items-center gap-2"
              >
                <span>VIEW CV (PDF)</span>
              </button>
              <button
                onClick={onOpenHireMe}
                className="px-5 py-2.5 rounded-xl font-mono text-xs font-black text-white dark:text-black bg-sky-600 hover:bg-sky-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d0df] shadow-md dark:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all"
              >
                <span>COMMISSION WORK</span>
              </button>
            </div>
          </div>

          {/* Right: Interactive KPI Matrix Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="cyber-bracket p-6 rounded-3xl cyber-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#00f0ff]/20 mb-4">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-[#00f0ff] uppercase tracking-wider">
                  SYSTEM CORE METRICS
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-[#00ff66] font-bold">
                  STATUS: OPTIMAL
                </span>
              </div>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Current Semester:</span>
                  <span className="font-bold text-slate-900 dark:text-white">Semester 7 (Final Year · Winter 2026)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Cumulative Academic Score:</span>
                  <span className="font-black text-emerald-600 dark:text-[#00ff66] text-sm">{PERSONAL_INFO.cgpaTillSem6} CGPA (Sem 1–6)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Academic Institution:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">GEC Bharuch, Gujarat, India</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Completed Internship:</span>
                  <span className="font-bold text-sky-600 dark:text-[#00f0ff]">IIT Bombay Spoken Tutorial</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Simulation Specialization:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">CircuitJS, eSim, Ngspice</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Web Specializations:</span>
                  <span className="font-bold text-rose-600 dark:text-[#ff0055]">WordPress, Shopify, Visual CMS</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-4 rounded-2xl cyber-card flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-600 dark:text-[#00f0ff]" />
                <span className="text-slate-700 dark:text-slate-300">Bharuch, Gujarat, India</span>
              </div>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 dark:text-[#00ff66] font-bold hover:underline"
              >
                +91 99747 61355 ↗
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
