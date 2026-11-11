import React, { useRef, useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { PERSONAL_INFO, IIT_BOMBAY_INTERNSHIP, ACADEMIC_SEMESTERS, SKILL_CATEGORIES, LANGUAGES, PROJECTS } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ${PERSONAL_INFO.name}
**${PERSONAL_INFO.tagline}**
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | Location: ${PERSONAL_INFO.location}

## Professional Summary
${PERSONAL_INFO.summary}

## Education & Academic Milestones
**${PERSONAL_INFO.degree}**
${PERSONAL_INFO.college}, ${PERSONAL_INFO.location}
Academic Duration: ${PERSONAL_INFO.academicDuration}
Cumulative Result (till Sem 6): **${PERSONAL_INFO.cgpaTillSem6} CGPA** (Entering Final Year - Sem 7 Winter 2026)

### Complete Semester Coursework:
${ACADEMIC_SEMESTERS.map(s => `#### Semester ${s.semester} (${s.term}) - ${s.semester <= 6 ? 'Academic Curriculum Complete' : 'Active Final Year'}\n` + s.courses.map(c => `- ${c.name}`).join('\n')).join('\n\n')}

## Experience & Internships
**${IIT_BOMBAY_INTERNSHIP.role}**
${IIT_BOMBAY_INTERNSHIP.organization} (${IIT_BOMBAY_INTERNSHIP.type})
${IIT_BOMBAY_INTERNSHIP.summary}

## Technical Skills & Competencies
- Website Platforms & CMS: WordPress Website Making, Shopify Store Creation, WooCommerce, Elementor, Gutenberg, Theme Customization, Web Builders (Framer, Webflow, Wix), HTML & CSS Customization
- Digital Tools & SEO: Technical SEO, Google Search Console, Site Speed Optimization, Microsoft Office Suite, AI Productivity Tools
- Academic Engineering & Computing: Circuit Simulation (eSim, CircuitJS), Satellite Communication, Wireless Systems, Digital Electronics, Java (OOP), Python, C Programming
- Languages: English (Professional), Hindi (Fluent), Gujarati (Native)
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    const textContent = `
================================================================================
                                HAMMAD PATEL
   Electronics & Communication Engineering Student | WordPress & Shopify Specialist
  Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | Location: ${PERSONAL_INFO.location}
================================================================================

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

--------------------------------------------------------------------------------
EDUCATION & ACADEMIC STANDING
--------------------------------------------------------------------------------
${PERSONAL_INFO.degree}
${PERSONAL_INFO.college}, ${PERSONAL_INFO.location}
Duration: ${PERSONAL_INFO.academicDuration}
Cumulative CGPA (till Semester 6): ${PERSONAL_INFO.cgpaTillSem6} / 10.0
Current Status: ${PERSONAL_INFO.currentSem}

COMPLETE ACADEMIC COURSEWORK SYLLABUS:
${ACADEMIC_SEMESTERS.map(s => `
[Semester ${s.semester} - ${s.term}] ${s.semester <= 6 ? '(Academic Curriculum Complete)' : '(Active Final Year)'}
${s.courses.map(c => `  • ${c.name} (${c.domain})`).join('\n')}`).join('\n')}

--------------------------------------------------------------------------------
EXPERIENCE & INTERNSHIPS
--------------------------------------------------------------------------------
${IIT_BOMBAY_INTERNSHIP.role}
${IIT_BOMBAY_INTERNSHIP.organization} (${IIT_BOMBAY_INTERNSHIP.type})
Domain: ${IIT_BOMBAY_INTERNSHIP.domain}
${IIT_BOMBAY_INTERNSHIP.summary}

Key Activities:
${IIT_BOMBAY_INTERNSHIP.keyActivities.map(a => `• ${a}`).join('\n')}

Simulation Tools & EDA:
${IIT_BOMBAY_INTERNSHIP.toolsUsed.join(', ')}

--------------------------------------------------------------------------------
TECHNICAL SKILLS & COMPETENCIES
--------------------------------------------------------------------------------
• Website Platforms & CMS: WordPress Website Making, Shopify Store Creation, WooCommerce, Elementor, Theme Customization, Web Builders (Framer, Webflow, Wix), HTML & CSS Customization
• Digital Tools & SEO: Technical SEO, Google Search Console, Speed Optimization, Microsoft Office Suite
• Academic Engineering & Computing: Circuit Simulation (CircuitJS, eSim), Satellite Communication, Wireless Systems, Digital Electronics, Java (OOP), Python, C
• Languages: English (Professional), Hindi (Fluent), Gujarati (Native)

--------------------------------------------------------------------------------
FEATURED PROJECTS & SYSTEMS
--------------------------------------------------------------------------------
${PROJECTS.map(p => `• ${p.title} (${p.subtitle})
  Tech: ${p.technologies.join(', ')}
  Description: ${p.description}`).join('\n\n')}

================================================================================
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Hammad_Patel_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
                Curriculum Vitae · Hammad Patel
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                ECE Student @ GEC Bharuch (6.38 CGPA till Sem 6) · WordPress & Shopify Specialist
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-500 transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadText}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-white/10"
              title="Download TXT format"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TXT</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-white/10"
              title="Copy Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'MD'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100 dark:bg-slate-950/40">
          <div 
            ref={printAreaRef}
            className="max-w-3xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-md border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0"
          >
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-5 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h1 className="text-3xl font-black font-display tracking-tight text-slate-900">
                  {PERSONAL_INFO.name}
                </h1>
                <span className="text-xs font-mono font-bold text-indigo-700">
                  Sem 6 Result: {PERSONAL_INFO.cgpaTillSem6} CGPA (Entering Sem 7)
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
                Education & Academic Milestones
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
                  <div className="font-bold text-indigo-700">
                    Result till Sem 6: {PERSONAL_INFO.cgpaTillSem6} CGPA
                  </div>
                </div>
              </div>

              {/* Complete Coursework Breakdown by Semester */}
              <div className="mt-3 space-y-2 text-xs">
                {ACADEMIC_SEMESTERS.map(s => (
                  <div key={s.semester} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                    <div className="flex justify-between font-mono font-bold text-[11px] mb-1">
                      <span>Semester {s.semester} ({s.term})</span>
                      <span className="text-indigo-700">{s.semester <= 6 ? `${s.courses.length} Subjects` : 'Active Final Year'}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-relaxed">
                      {s.courses.map(c => c.name).join(' · ')}
                    </p>
                  </div>
                ))}
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
                <strong>Tools:</strong> {IIT_BOMBAY_INTERNSHIP.toolsUsed.join(', ')}
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
                  <strong>Programming & Computing:</strong> Java (OOP, Data Structures), Python (NumPy, SciPy, AI), C Programming, Computer Networks.
                </div>
                <div>
                  <strong>Electronics & Communication:</strong> Satellite Communication, Radar & Navigation Aids (RNA), CircuitJS, eSim, Antennas & Propagation, Fiber Optics, VLSI, DSP.
                </div>
                <div>
                  <strong>Languages:</strong> English (Professional), Hindi (Fluent), Gujarati (Native).
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                Key Projects & Systems
              </h2>
              <div className="space-y-2">
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

            <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] font-mono text-slate-400">
              Hammad Patel · GEC Bharuch · {PERSONAL_INFO.email} · {PERSONAL_INFO.phone}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 shrink-0">
          <span>Complete Sem 1 to Sem 7 Coursework Verified</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
