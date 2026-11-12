import React, { useState } from 'react';
import { 
  Briefcase, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Check,
  Radio,
  Cpu,
  Activity,
  Code2,
  GraduationCap,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, HIRE_ME_SERVICES } from '../data/portfolioData';

interface HireMeSectionProps {
  onOpenCV?: () => void;
}

export const HireMeSection: React.FC<HireMeSectionProps> = ({ onOpenCV }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('Graduate ECE Engineer Role (2027 Batch)');
  
  // Selectable ECE & Engineering domains of interest
  const [selectedDomains, setSelectedDomains] = useState<string[]>([
    'RF, Satellite & Wireless Communication Systems',
    'Electronic Circuit Simulation (eSim, CircuitJS & SPICE)'
  ]);

  // Form State
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const eceDomainsList = [
    'RF, Satellite & Wireless Communication Systems',
    'Electronic Circuit Simulation (eSim, CircuitJS & SPICE)',
    'VLSI Design, CMOS Layout & Semiconductor Devices',
    'Embedded Systems (8051/ARM), IoT & Microcontrollers',
    'Digital Signal Processing (DSP) & Radar Systems',
    'Technical Web Dashboards & Engineering Software (Python/React)'
  ];

  const toggleDomain = (item: string) => {
    if (selectedDomains.includes(item)) {
      setSelectedDomains(selectedDomains.filter(a => a !== item));
    } else {
      setSelectedDomains([...selectedDomains, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage('');
  };

  const whatsappInquiryUrl = `https://wa.me/919974761355?text=${encodeURIComponent(
    `Hello Hammad Patel!\nI am reaching out regarding an ECE Engineering opportunity:\n\nOpportunity Type: ${selectedOpportunity}\nFocus Areas: ${selectedDomains.join(', ')}\nName: ${name || 'Recruiter / Engineer'}\nOrganization: ${organization || 'Not specified'}\nEmail: ${email || 'Not specified'}\n\nDetails:\n${message || 'Let us connect to discuss your ECE background and skills.'}`
  )}`;

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio':
        return <Radio className="w-5 h-5 text-sky-600 dark:text-[#00f0ff]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-600 dark:text-[#00ff66]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-amber-600 dark:text-[#fcee0a]" />;
      default:
        return <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <section id="hire-me" className="py-20 sm:py-24 relative bg-slate-50 dark:bg-[#04060c] border-t border-slate-200 dark:border-[#00f0ff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/30 text-xs font-mono font-bold tracking-wider text-sky-700 dark:text-[#00f0ff] uppercase mb-3 shadow-sm dark:shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Briefcase className="w-4 h-4 text-sky-600 dark:text-[#00f0ff]" />
            <span>[// ECE CAREER OPPORTUNITIES · R&amp;D INTERNSHIPS · TECHNICAL ROLES]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
            HIRE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-400 dark:from-[#00f0ff] dark:via-[#38bdf8] dark:to-[#00ff66] dark:neon-cyan-glow">
              HAMMAD PATEL
            </span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-3xl text-xs sm:text-sm font-cyber leading-relaxed">
            Final-year <strong className="text-slate-900 dark:text-white">Electronics &amp; Communication Engineering (BE ECE)</strong> student at <strong className="text-sky-600 dark:text-[#00f0ff]">GEC Bharuch (6.38 CGPA till Sem 6)</strong> and <strong className="text-emerald-600 dark:text-[#00ff66]">IIT Bombay Spoken Tutorial Project Intern</strong>, combining strong core ECE knowledge with modern programming and web development skills.
          </p>
        </div>

        {/* 4 Core ECE & Engineering Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {HIRE_ME_SERVICES.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedOpportunity(role.title)}
              className={`cyber-bracket rounded-3xl p-6 sm:p-7 cyber-card cursor-pointer transition-all flex flex-col justify-between ${
                selectedOpportunity === role.title
                  ? 'ring-2 ring-sky-500 dark:ring-[#00f0ff] shadow-xl'
                  : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-black/70 border border-slate-200 dark:border-[#00f0ff]/30 flex items-center justify-center shrink-0">
                    {getRoleIcon(role.iconName)}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-[#00ff66]/10 border border-emerald-300 dark:border-[#00ff66]/30 text-[10px] font-mono font-bold text-emerald-700 dark:text-[#00ff66]">
                      {role.availability}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/30 text-[10px] font-mono font-bold text-sky-700 dark:text-[#00f0ff]">
                      {role.locationType}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black font-display text-slate-900 dark:text-white mb-1.5">
                  {role.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 font-medium">
                  {role.tagline}
                </p>

                <ul className="space-y-2 mb-5">
                  {role.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00ff66] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">
                  Academic Standing: <strong className="text-slate-900 dark:text-white">6.38 CGPA</strong>
                </span>
                <span className="font-bold text-sky-600 dark:text-[#00f0ff]">
                  {selectedOpportunity === role.title ? '✓ Selected Role' : 'Select Role →'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Recruitment & Engineering Connection Form */}
        <div className="cyber-bracket rounded-3xl cyber-card p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Academic & Engineering Credentials + Direct Contact */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-sky-700 dark:text-[#00f0ff] tracking-wider block mb-1">
                  RECRUITMENT &amp; ACADEMIC COLLABORATION
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white mb-3">
                  Connect for ECE Roles &amp; Internships
                </h3>
                <p className="text-sm font-cyber text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Looking for a dedicated Electronics &amp; Communication Engineering student with hands-on experience in circuit simulation (eSim, CircuitJS), RF &amp; Satellite communication systems, and modern web development &amp; programming skills? Reach out directly below.
                </p>

                <div className="space-y-3 mb-6">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:text-sky-500 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-[#00f0ff] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block font-mono">Official Email</span>
                      <span className="text-xs sm:text-sm font-semibold">{PERSONAL_INFO.email}</span>
                    </div>
                  </a>

                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block font-mono">Direct Phone</span>
                      <span className="text-xs sm:text-sm font-semibold">{PERSONAL_INFO.phone}</span>
                    </div>
                  </a>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block font-mono font-medium">Direct Messaging</span>
                      <span className="text-xs sm:text-sm font-bold">Connect on WhatsApp (+91 99747 61355)</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                {onOpenCV && (
                  <button
                    onClick={onOpenCV}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-[#00f0ff]/15 dark:hover:bg-[#00f0ff]/25 text-white dark:text-[#00f0ff] border border-slate-700 dark:border-[#00f0ff]/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>VIEW &amp; DOWNLOAD OFFICIAL CV (PDF)</span>
                  </button>
                )}

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400 font-mono flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-sky-600 dark:text-[#00f0ff] shrink-0" />
                  <span>GEC Bharuch · BE ECE (2023–2027) · 6.38 CGPA (till Sem 6)</span>
                </div>
              </div>
            </div>

            {/* Right Column: ECE Opportunity & Recruitment Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                    Message Prepared!
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                    Thank you, <strong className="text-slate-900 dark:text-white">{name}</strong>. Hammad will review your inquiry regarding <strong className="text-sky-600 dark:text-[#00f0ff]">{selectedOpportunity}</strong> and respond via <strong className="text-indigo-400">{email}</strong>.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Send via WhatsApp Now
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Opportunity Role Selector */}
                  <div>
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                      Opportunity / Inquiry Type:
                    </label>
                    <select
                      value={selectedOpportunity}
                      onChange={(e) => setSelectedOpportunity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Graduate ECE Engineer Role (2027 Batch)">Graduate ECE Engineer Role (2027 Batch)</option>
                      <option value="Circuit Simulation, SPICE & Hardware R&D Internship">Circuit Simulation, SPICE &amp; Hardware R&amp;D Internship</option>
                      <option value="RF, Satellite & Telecommunication Engineering">RF, Satellite &amp; Telecommunication Engineering</option>
                      <option value="Embedded Systems, VLSI & IoT Collaboration">Embedded Systems, VLSI &amp; IoT Collaboration</option>
                      <option value="Technical Web Dashboard & Engineering Software">Technical Web Dashboard &amp; Engineering Software</option>
                    </select>
                  </div>

                  {/* Selectable ECE & Technical Domains */}
                  <div>
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                      Relevant Engineering Domains &amp; Skills:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {eceDomainsList.map((item) => {
                        const checked = selectedDomains.includes(item);
                        return (
                          <div
                            key={item}
                            onClick={() => toggleDomain(item)}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-colors flex items-center gap-2 ${
                              checked
                                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 dark:border-[#00f0ff] text-slate-900 dark:text-white'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              checked ? 'bg-sky-600 dark:bg-[#00f0ff] border-sky-600 dark:border-[#00f0ff] text-white dark:text-black' : 'border-slate-400'
                            }`}>
                              {checked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="font-medium leading-snug">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Rajesh Sharma / HR Team"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Company / Institution / Lab
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. Telecom R&D / Electronics Corp"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Role Description, Internship Scope, or Technical Query
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details about the ECE engineering role, R&D internship, circuit simulation project, or technical collaboration..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-white dark:text-black bg-sky-600 hover:bg-sky-500 dark:bg-[#00f0ff] dark:hover:bg-[#00d0df] shadow-lg dark:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit ECE Recruitment Inquiry</span>
                    </button>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-semibold text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-500/20 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
