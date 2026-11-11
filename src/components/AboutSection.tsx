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
  Globe
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenCV: () => void;
  onOpenHireMe: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCV, onOpenHireMe }) => {
  return (
    <section id="about" className="py-24 relative bg-white dark:bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-3">
            <User className="w-4 h-4 text-indigo-500" />
            Engineering Profile · Hammad Patel
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Dual Discipline: Hardware Systems & Advanced Web Engineering
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Driven by curiosity in wireless signals, satellite link physics, electronic simulation, and high-conversion e-commerce web platforms.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am an <strong className="text-slate-900 dark:text-white font-semibold">Electronics & Communication Engineering student</strong> at <strong className="text-slate-900 dark:text-white font-semibold">Government Engineering College, Bharuch</strong> (2023–2027), currently entering Semester 7 (Winter 2026) with a verified cumulative score of <strong className="text-indigo-600 dark:text-indigo-400 font-bold">6.38 CGPA</strong> through Semester 6.
            </p>
            <p>
              Across 7 rigorous semesters, I have mastered essential communication subjects with full potential and genuine technical passion—including <strong className="text-slate-900 dark:text-white font-semibold">Satellite Communication, Radar & Navigation Aids (RNA), Antennas & Propagation, Fiber Optic Communication, VLSI Design, Digital Signal Processing (DSP), Microwave Theory (MTT), and Wireless Sensor Networks (WSN)</strong>.
            </p>
            <p>
              Complementing my hardware background, I specialize in professional website creation and e-commerce setups: <strong className="text-slate-900 dark:text-white font-semibold">WordPress Website Making, Shopify Online Store Creation, WooCommerce, and visual website builders like Framer and Webflow</strong>, supported by foundational engineering coursework in Java (OOP) and Python. This enables me to deliver client-ready websites with modern visual precision, responsive layouts, and reliable performance.
            </p>

            {/* Core Values / Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Shopify & WordPress Master</span>
                  <span className="text-slate-500 dark:text-slate-400">Custom theme architecture, Liquid templating, custom PHP hooks, and WooCommerce setups.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Java & Python Algorithms</span>
                  <span className="text-slate-500 dark:text-slate-400">Core OOP data structures in Java paired with numerical signal processing in Python.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Radar & Satellite Systems</span>
                  <span className="text-slate-500 dark:text-slate-400">ITU-R path loss models, PPI azimuth target tracking, and antenna radiation patterns.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">IIT Bombay Certified EDA</span>
                  <span className="text-slate-500 dark:text-slate-400">Academic internship alum in electronic circuit simulation using eSim and CircuitJS.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={onOpenCV}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
              >
                Inspect Official CV
              </button>
              <button
                onClick={onOpenHireMe}
                className="px-5 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
              >
                Start a Conversation
              </button>
            </div>
          </div>

          {/* Right: Key Facts Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl space-y-6">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Profile Snapshot & Standing
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-500">Name</span>
                  <span className="font-bold text-slate-900 dark:text-white font-sans">{PERSONAL_INFO.name}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-500">Academic Standing</span>
                  <span className="font-bold text-emerald-500">6.38 CGPA (Till Sem 6)</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500">Current Semester</span>
                  <span className="font-bold text-indigo-400">Sem 7 Winter 2026 (Final Year)</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-5">
                  <span className="text-slate-500">College</span>
                  <span className="font-bold text-slate-900 dark:text-white font-sans text-right">GEC Bharuch (2023–2027)</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-500">Web Specialization</span>
                  <span className="font-bold text-cyan-400 text-right">Shopify, WordPress, React 19, Java</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-500">Location</span>
                  <span className="font-bold text-slate-900 dark:text-white font-sans">Bharuch, Gujarat, India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Languages</span>
                  <span className="font-bold text-slate-900 dark:text-white font-sans">English, Hindi, Gujarati</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
