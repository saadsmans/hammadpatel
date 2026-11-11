import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink,
  GraduationCap,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wide uppercase mb-3 border border-indigo-200 dark:border-indigo-800">
            <Mail className="w-4 h-4" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect With Hammad
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Have a project, internship opportunity, or technical inquiry? Reach out directly via email, phone, or WhatsApp.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Email Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-indigo-500/60 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 border border-indigo-100 dark:border-indigo-900">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                Direct Email
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 break-all">
                {PERSONAL_INFO.email}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Fastest response for official inquiries, resume requests, and documentation.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-indigo-500 transition-colors"
              >
                <span>Compose Mail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Phone / WhatsApp Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-emerald-500/60 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 border border-emerald-100 dark:border-emerald-900">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                Call / WhatsApp
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {PERSONAL_INFO.phone}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Available for phone interviews, WhatsApp discussions, and quick project syncs.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Chat</span>
              </a>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-rose-500/60 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4 border border-rose-100 dark:border-rose-900">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                Location & Base
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {PERSONAL_INFO.location}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Based in Gujarat, India (IST Timezone). Available for on-site local & remote worldwide engagements.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Timezone: IST (UTC+5:30)</span>
              <span className="text-emerald-500 font-bold">Open for Remote</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
