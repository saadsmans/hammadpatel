import React, { useState } from 'react';
import { 
  Briefcase, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Check,
  Sliders,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, HIRE_ME_SERVICES } from '../data/portfolioData';

export const HireMeSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('wordpress-website');
  const [timeline, setTimeline] = useState<string>('normal');
  const [projectType, setProjectType] = useState<string>('commercial');
  
  // Custom scope feature checklist
  const [addons, setAddons] = useState<string[]>([
    'WordPress Website Making & Setup',
    'Mobile Responsiveness & SEO Optimization'
  ]);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleAddon = (item: string) => {
    if (addons.includes(item)) {
      setAddons(addons.filter(a => a !== item));
    } else {
      setAddons([...addons, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      confetti({
        particleCount: 110,
        spread: 75,
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

  // Generate WhatsApp inquiry text
  const whatsappInquiryUrl = `https://wa.me/919974761355?text=${encodeURIComponent(
    `Hello Hammad Patel!\nI would like to hire you for a project:\n\nService: ${selectedService}\nType: ${projectType}\nTimeline: ${timeline}\nSelected Features: ${addons.join(', ')}\nClient Name: ${name || 'Prospective Client'}\nEmail: ${email || 'Not specified'}\n\nProject Scope:\n${message || 'Let us discuss details.'}`
  )}`;

  return (
    <section id="hire-me" className="py-24 relative bg-slate-900/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-indigo-400 uppercase mb-3">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            Website Creation & Client Engagements
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Hire Hammad Patel
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Professional WordPress website making, high-converting Shopify e-commerce store setups, visual website builders, and search engine optimization.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {HIRE_ME_SERVICES.map((service) => {
            const isSelected = selectedService === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-2xl ring-2 ring-indigo-500/20'
                    : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                      {service.turnaround}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-1">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    {service.tagline}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 font-mono">{service.startingPrice}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">Select Service →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Scope & Instant Proposal Builder */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Direct Contacts */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-indigo-500 dark:text-indigo-400 tracking-wider">
                  Direct Line & Verification
                </span>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 mb-3">
                  Let&apos;s Build Something Extraordinary
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Whether you need a complete WordPress website, a high-converting Shopify online store, or visual website design on Framer or Wix, I deliver polished design, clean layouts, and reliable turnaround.
                </p>

                <div className="space-y-3 mb-8">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:text-indigo-400 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block font-mono">Email Address</span>
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
                      <span className="text-[11px] text-slate-500 block font-mono">Mobile / Direct Call</span>
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
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block font-mono font-medium">Instant Chat</span>
                      <span className="text-xs sm:text-sm font-bold">Chat on WhatsApp (+91 99747 61355)</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                GEC Bharuch · ECE Batch of 2023–2027 · Sem 6 Result: 6.38 CGPA
              </div>
            </div>

            {/* Right Column: Interactive Proposal Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
                    Inquiry Received!
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                    Thank you, <strong className="text-slate-900 dark:text-white">{name}</strong>. Hammad will review your specifications and respond via <strong className="text-indigo-400">{email}</strong> within 24 hours.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Forward to WhatsApp Now
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Selectable Deliverable Add-ons */}
                  <div>
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                      Select Project Deliverables:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        'WordPress Website Making & Customization',
                        'Shopify Online Store Creation & Setup',
                        'Website Builder Design (Webflow, Framer, Wix)',
                        'SEO Setup, Speed Optimization & Maintenance'
                      ].map((item) => {
                        const checked = addons.includes(item);
                        return (
                          <div
                            key={item}
                            onClick={() => toggleAddon(item)}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-colors flex items-center gap-2 ${
                              checked
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-slate-900 dark:text-white'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              checked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-400'
                            }`}>
                              {checked && <Check className="w-3 h-3" />}
                            </div>
                            <span className="font-medium">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. client@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Project Requirements & Timeline
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your website goals, required pages, product catalog details, or visual style preferences..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Proposal Request</span>
                    </button>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-semibold text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 hover:bg-emerald-950/70 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
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
