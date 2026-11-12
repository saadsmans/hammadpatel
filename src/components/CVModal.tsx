import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Eye,
  CheckCircle2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, IIT_BOMBAY_INTERNSHIP, PROJECTS } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'formatted' | 'pdf-preview'>('formatted');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Build a clean, professional A4 vector PDF using jsPDF
  const buildResumePDF = (): jsPDF => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 16;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(15, 23, 42);
    doc.text(PERSONAL_INFO.name, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(2, 132, 199);
    doc.text(
      `Overall Result: ${PERSONAL_INFO.cgpaTillSem6} CGPA (till Sem 6)`,
      pageWidth - margin,
      y,
      { align: 'right' }
    );

    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(51, 65, 85);
    doc.text(PERSONAL_INFO.tagline, margin, y);

    y += 5.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(
      `${PERSONAL_INFO.email}  |  ${PERSONAL_INFO.phone}  |  ${PERSONAL_INFO.location}  |  hammadpatel.vercel.app`,
      margin,
      y
    );

    y += 4;
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);

    // Section Helper
    const addSectionHeader = (title: string) => {
      y += 7;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text(title.toUpperCase(), margin, y);
      y += 2;
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 4.5;
    };

    // 1. Professional Summary
    addSectionHeader('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    const summaryLines = doc.splitTextToSize(PERSONAL_INFO.summary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 4.5;

    // 2. Education & Academic Standing
    addSectionHeader('Education & Academic Standing');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(PERSONAL_INFO.degree, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(2, 132, 199);
    doc.text(`${PERSONAL_INFO.academicDuration}`, pageWidth - margin, y, { align: 'right' });

    y += 4.8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`${PERSONAL_INFO.college}, ${PERSONAL_INFO.location}`, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(`Cumulative Score: ${PERSONAL_INFO.cgpaTillSem6} CGPA (Sem 1–6)`, pageWidth - margin, y, { align: 'right' });

    y += 5.5;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.8);
    doc.setTextColor(71, 85, 105);
    const eduNote = doc.splitTextToSize(
      'Status: Entering Final Year (Semester 7 · Winter 2026). Complete 7-semester GTU Electronics & Communication coursework syllabus is available interactively at hammadpatel.vercel.app.',
      contentWidth
    );
    doc.text(eduNote, margin, y);
    y += eduNote.length * 4.2;

    // 3. Experience & Internships
    addSectionHeader('Academic Internship & Practical Training');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${IIT_BOMBAY_INTERNSHIP.role}`, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(2, 132, 199);
    doc.text(`${IIT_BOMBAY_INTERNSHIP.organization} (${IIT_BOMBAY_INTERNSHIP.type})`, pageWidth - margin, y, { align: 'right' });

    y += 4.8;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`Domain: ${IIT_BOMBAY_INTERNSHIP.domain}`, margin, y);
    y += 4.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.2);
    doc.setTextColor(51, 65, 85);
    IIT_BOMBAY_INTERNSHIP.keyActivities.forEach((act) => {
      const bulletLines = doc.splitTextToSize(`•  ${act}`, contentWidth - 2);
      doc.text(bulletLines, margin + 2, y);
      y += bulletLines.length * 4.3;
    });

    y += 1.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`Simulation & Lab Tools: `, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(IIT_BOMBAY_INTERNSHIP.toolsUsed.join(', '), margin + 39, y);
    y += 3;

    // 4. Technical Skills & Engineering Competencies
    addSectionHeader('Technical Skills & Engineering Competencies');
    const skillRows = [
      {
        label: 'Core ECE & RF Systems:',
        val: 'Satellite Communication, Radar & Navigation Aids (RNA), Antennas & Wave Propagation, Digital Signal Processing (DSP), Wireless Sensor Networks (WSN), Microwave Engineering.'
      },
      {
        label: 'VLSI, Hardware & Simulation:',
        val: 'CircuitJS, eSim, Ngspice SPICE Simulation, CMOS VLSI Design, 8051 & ARM Microcontrollers, Analog & Digital Electronics, Fiber Optic Communication.'
      },
      {
        label: 'Programming & Computing:',
        val: 'Python (NumPy, SciPy, Signal Scripts), Java (Core & OOP), C / Embedded C, Computer Networks (TCP/IP, OSI), Artificial Intelligence (AI).'
      },
      {
        label: 'Web Development Skills:',
        val: 'HTML5, CSS3, JavaScript, TypeScript, React, Tailwind CSS, Interactive Engineering Dashboards, WordPress & Shopify Platform Configuration.'
      },
      {
        label: 'Languages Spoken:',
        val: 'English (Professional), Hindi (Fluent), Gujarati (Native).'
      }
    ];

    skillRows.forEach((row) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.2);
      doc.setTextColor(15, 23, 42);
      doc.text(row.label, margin, y);
      y += 4.2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const valLines = doc.splitTextToSize(row.val, contentWidth);
      doc.text(valLines, margin, y);
      y += valLines.length * 4.2 + 1.5;
    });

    // 5. Key Engineering & Web Projects
    addSectionHeader('Key Engineering & Technical Projects');
    PROJECTS.forEach((proj) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.8);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.title, margin, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(2, 132, 199);
      doc.text(proj.technologies.slice(0, 4).join(' · '), pageWidth - margin, y, { align: 'right' });

      y += 4.4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const descLines = doc.splitTextToSize(proj.description, contentWidth);
      doc.text(descLines, margin, y);
      y += descLines.length * 4.2 + 2.5;
    });

    // Footer
    doc.setDrawColor(203, 213, 225);
    doc.line(margin, 282, pageWidth - margin, 282);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Hammad Patel · BE Electronics & Communication Engineering (GEC Bharuch) · ${PERSONAL_INFO.email} · hammadpatel.vercel.app`,
      pageWidth / 2,
      287,
      { align: 'center' }
    );

    return doc;
  };

  useEffect(() => {
    if (isOpen) {
      try {
        const doc = buildResumePDF();
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch {
        setPdfBlobUrl(null);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDirectPDFDownload = () => {
    setIsDownloading(true);
    try {
      const doc = buildResumePDF();
      doc.save('Hammad_Patel_ECE_CV.pdf');
    } finally {
      setTimeout(() => setIsDownloading(false), 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-[#00f0ff]/40 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Control Bar: Viewable Mode Switch + Direct PDF Download (No Print Option) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-600 dark:bg-[#00f0ff] text-white dark:text-black flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold font-display text-slate-900 dark:text-white">
                Curriculum Vitae · Hammad Patel
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                BE ECE · <strong className="text-emerald-600 dark:text-[#00ff66]">6.38 CGPA (till Sem 6)</strong> · GEC Bharuch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Formatted CV vs Embedded PDF Viewer */}
            {pdfBlobUrl && (
              <div className="hidden sm:flex items-center bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl text-xs font-mono">
                <button
                  onClick={() => setViewMode('formatted')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'formatted'
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-[#00f0ff] shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>CV Viewer</span>
                </button>
                <button
                  onClick={() => setViewMode('pdf-preview')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'pdf-preview'
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-[#00f0ff] shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF Document</span>
                </button>
              </div>
            )}

            {/* Direct PDF File Download Button (NO Print Dialog) */}
            <button
              onClick={handleDirectPDFDownload}
              disabled={isDownloading}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d0df] text-white dark:text-black text-xs font-mono font-black flex items-center gap-2 transition-all shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.4)] active:scale-95 cursor-pointer"
              title="Download Hammad_Patel_ECE_CV.pdf directly"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
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

        {/* Viewable CV Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950/60">
          {viewMode === 'pdf-preview' && pdfBlobUrl ? (
            <div className="max-w-3xl mx-auto h-[70vh] rounded-2xl overflow-hidden border border-slate-300 dark:border-white/10 shadow-inner bg-white">
              <iframe
                src={pdfBlobUrl}
                title="Hammad Patel CV PDF Preview"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto bg-white text-slate-900 p-6 sm:p-12 rounded-2xl shadow-md border border-slate-200">
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-5 mb-5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900">
                    {PERSONAL_INFO.name}
                  </h1>
                  <span className="text-xs font-mono font-bold text-sky-700">
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
                  <span className="text-sky-700 font-bold">hammadpatel.vercel.app</span>
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
                    <div className="font-bold text-emerald-700 text-sm">
                      Overall Result: {PERSONAL_INFO.cgpaTillSem6} CGPA (Sem 1–6)
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
                  Current Status: Entering Final Year (Semester 7 · Winter 2026) · Complete academic coursework syllabus covering all 7 Semesters is detailed interactively on portfolio website at <strong>hammadpatel.vercel.app</strong>.
                </div>
              </div>

              {/* Experience & Internship */}
              <div className="mb-5">
                <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                  Academic Internship & Practical Training
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {IIT_BOMBAY_INTERNSHIP.role}
                    </h3>
                    <p className="text-xs font-semibold text-sky-700">
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
                  Technical Skills & Engineering Competencies
                </h2>
                <div className="space-y-1.5 text-xs text-slate-800">
                  <div>
                    <strong>Core ECE &amp; RF Systems:</strong> Satellite Communication, Radar &amp; Navigation Aids (RNA), Antennas &amp; Wave Propagation, Digital Signal Processing (DSP), Wireless Sensor Networks (WSN), Microwave Theory &amp; Techniques (MTT).
                  </div>
                  <div>
                    <strong>VLSI, Hardware &amp; Simulation:</strong> CircuitJS &amp; eSim SPICE Simulation, Ngspice, CMOS VLSI Design, 8051 &amp; ARM Microcontrollers, Analog &amp; Digital Electronics, Fiber Optic Communication.
                  </div>
                  <div>
                    <strong>Programming &amp; Computing:</strong> Python Programming (NumPy, SciPy, Signal Scripts), Java (OOP, Data Structures), C &amp; Embedded C, Computer Networks, AI Algorithms.
                  </div>
                  <div>
                    <strong>Web Development Skills:</strong> HTML5, CSS3, JavaScript, TypeScript, React, Tailwind CSS, Interactive Engineering Dashboards, WordPress &amp; Shopify Platforms.
                  </div>
                  <div>
                    <strong>Languages:</strong> English (Professional), Hindi (Fluent), Gujarati (Native).
                  </div>
                </div>
              </div>

              {/* Featured Projects */}
              <div>
                <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                  Key Engineering &amp; Technical Projects
                </h2>
                <div className="space-y-2.5">
                  {PROJECTS.map((p) => (
                    <div key={p.id}>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-bold text-slate-900">{p.title}</span>
                        <span className="text-[10px] font-mono text-sky-700">{p.technologies.slice(0, 4).join(', ')}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200 text-center text-[10px] font-mono text-slate-400">
                Hammad Patel · GEC Bharuch (BE ECE) · {PERSONAL_INFO.email} · {PERSONAL_INFO.phone} · hammadpatel.vercel.app
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Viewable CV &amp; Direct PDF File Download (`Hammad_Patel_ECE_CV.pdf`)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDirectPDFDownload}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d0df] text-white dark:text-black font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
