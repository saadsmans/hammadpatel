import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO, IIT_BOMBAY_INTERNSHIP, PROJECTS } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Control Bar (Clean: Only Viewable Title, PDF Download Button & Close) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold font-display text-slate-900 dark:text-white">
                Curriculum Vitae · Hammad Patel
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Overall Result: <strong className="text-emerald-600 dark:text-emerald-400">6.38 CGPA (till Sem 6)</strong> · GEC Bharuch · ECE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Prominent PDF Download / Print Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
              title="Download PDF / Print Resume"
            >
              <Printer className="w-4 h-4" />
              <span>Download PDF / Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950/40">
          <div 
            ref={printAreaRef}
            className="max-w-3xl mx-auto bg-white text-slate-900 p-6 sm:p-12 rounded-2xl shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0"
          >
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-5 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900">
                  {PERSONAL_INFO.name}
                </h1>
                <span className="text-xs font-mono font-bold text-indigo-700">
                  Overall Result: {PERSONAL_INFO.cgpaTillSem6} CGPA (till Sem 6)
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">
                {PERSONAL_INFO.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
                <span>{PERSONAL_INFO.email}</span>
                <span>·</span>
                <span>{PERSONAL_INFO.phone}</span>
                <span>·</span>
                <span>{PERSONAL_INFO.location}</span>
                <span>·</span>
                <span className="text-indigo-600 font-bold">hammadpatel.vercel.app</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-5">
              <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Education & Academic Result */}
            <div className="mb-5">
              <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                Education & Academic Standing
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {PERSONAL_INFO.degree}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700">
                    {PERSONAL_INFO.college}, {PERSONAL_INFO.location}
                  </p>
                </div>
                <div className="text-left sm:text-right font-mono text-xs mt-1 sm:mt-0">
                  <span className="text-slate-600">{PERSONAL_INFO.academicDuration}</span>
                  <div className="font-bold text-indigo-700 text-sm">
                    Overall Result: {PERSONAL_INFO.cgpaTillSem6} CGPA
                  </div>
                </div>
              </div>

              {/* Note that comprehensive semester modules are interactive on the website */}
              <div className="mt-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
                Current Status: Entering Final Year (Semester 7) · Complete academic coursework syllabus covering all 7 Semesters is detailed interactively on portfolio website at <strong>hammadpatel.vercel.app</strong>.
              </div>
            </div>

            {/* Experience & Internship */}
            <div className="mb-5">
              <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                Experience & Internships
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {IIT_BOMBAY_INTERNSHIP.role}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-700">
                    {IIT_BOMBAY_INTERNSHIP.organization} ({IIT_BOMBAY_INTERNSHIP.type})
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Domain: {IIT_BOMBAY_INTERNSHIP.domain}
                </span>
              </div>
              <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                {IIT_BOMBAY_INTERNSHIP.keyActivities.map((act, idx) => (
                  <li key={idx} className="leading-snug">{act}</li>
                ))}
              </ul>
              <div className="mt-2 text-xs font-mono text-slate-600">
                <strong>Simulation Tools:</strong> {IIT_BOMBAY_INTERNSHIP.toolsUsed.join(', ')}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-5">
              <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                Technical Skills & Competencies
              </h2>
              <div className="space-y-1.5 text-xs text-slate-800">
                <div>
                  <strong>Website Platforms & CMS:</strong> WordPress Website Making, Shopify Store Creation, WooCommerce, Elementor, Theme Customization, Web Builders (Framer, Webflow, Wix), HTML & CSS Customization.
                </div>
                <div>
                  <strong>Programming & Computing:</strong> Java (OOP, Data Structures), Python Programming, C, Computer Networks, AI Algorithms.
                </div>
                <div>
                  <strong>Electronics & Communication:</strong> CircuitJS & eSim Simulation, Satellite Communication, Radar & Navigation Aids (RNA), Antennas & Wave Propagation, Fiber Optics, VLSI, DSP.
                </div>
                <div>
                  <strong>Languages:</strong> English (Professional), Hindi (Fluent), Gujarati (Native).
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                Key Projects & Deployments
              </h2>
              <div className="space-y-2.5">
                {PROJECTS.slice(0, 3).map((p) => (
                  <div key={p.id}>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-bold text-slate-900">{p.title}</span>
                      <span className="text-[10px] font-mono text-indigo-700">{p.technologies.slice(0, 3).join(', ')}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-200 text-center text-[10px] font-mono text-slate-400">
              Hammad Patel · GEC Bharuch · {PERSONAL_INFO.email} · {PERSONAL_INFO.phone} · hammadpatel.vercel.app
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
          <span>Click &apos;Download PDF / Print&apos; to save a copy directly to your device</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
