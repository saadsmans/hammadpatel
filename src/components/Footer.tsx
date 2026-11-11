import React from 'react';
import { 
  ArrowUp, 
  Sparkles, 
  Mail, 
  Phone, 
  GraduationCap, 
  Cpu, 
  Radio, 
  Code2,
  BookOpen
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCV: () => void;
  onOpenHireMe: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCV, onOpenHireMe }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#04060a] border-t border-slate-200 dark:border-white/10 py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100 dark:border-white/5">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-extrabold text-lg font-display tracking-tight text-slate-900 dark:text-white">
                HAMMAD PATEL
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md leading-relaxed mb-4">
              Electronics & Communication Engineering student at Government Engineering College, Bharuch (2023–2027) with 6.38 CGPA (till Sem 6) entering Sem 7 (Winter 2026), IIT Bombay Spoken Tutorial Intern, and specialist in WordPress website making, Shopify store creation, and modern CMS platforms.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for Web Projects & Engineering Roles</span>
            </div>
          </div>

          {/* Col 2: Coursework & Labs */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-3">
              Coursework & Simulators
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li><a href="#about" className="hover:text-indigo-400">About Hammad Patel</a></li>
              <li><a href="#portfolio" className="hover:text-indigo-400">Virtual Circuit & Waveform Studio</a></li>
              <li><a href="#portfolio" className="hover:text-indigo-400">Web, Shopify & WordPress Platforms</a></li>
              <li><a href="#coursework" className="hover:text-indigo-400">Complete Syllabus (Sem 1–7)</a></li>
              <li><a href="#academics" className="hover:text-indigo-400">Academic Standing (6.38 CGPA till Sem 6)</a></li>
              <li><a href="#skills" className="hover:text-indigo-400">Technical Skills & Competencies</a></li>
              <li><a href="#hire-me" className="hover:text-indigo-400">Hire Me / Commission Work</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Actions */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-3">
                Quick Actions
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={onOpenCV}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-left transition-colors flex items-center justify-between"
                >
                  <span>Inspect Official CV</span>
                  <span className="text-[10px] font-mono text-indigo-400">PDF / TXT</span>
                </button>
                <button
                  onClick={onOpenHireMe}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 text-left transition-colors flex items-center justify-between"
                >
                  <span>Hire Hammad Patel</span>
                  <span className="text-[10px] font-mono">Commission</span>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 text-[11px] font-mono text-slate-500 space-y-0.5">
              <div>{PERSONAL_INFO.email}</div>
              <div>{PERSONAL_INFO.phone}</div>
              <div>{PERSONAL_INFO.location}</div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1 font-mono">
            <span>© {new Date().getFullYear()} Hammad Patel · GEC Bharuch (ECE 2023–2027). All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-slate-400">
              React 19 · TypeScript · Three.js · Tailwind CSS
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-600 dark:text-slate-400 transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
