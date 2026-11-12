import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  Radio, 
  Terminal,
  Zap,
  Sliders,
  ExternalLink,
  CheckCircle2,
  Globe,
  ShoppingBag,
  Layers,
  ArrowRight,
  Code2,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { InteractiveSignalLab } from './InteractiveSignalLab';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectsSectionProps {
  onOpenHireMe?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenHireMe }) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const featuredTechs = [
    'React 19',
    'Tailwind CSS',
    'TypeScript',
    'Three.js',
    'Web Audio API',
    'Vercel'
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-24 relative bg-slate-100/70 dark:bg-[#04060c] border-t border-slate-200 dark:border-[#00f0ff]/30 overflow-hidden transition-colors">
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-400/10 dark:bg-[#00f0ff]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-400/10 dark:bg-[#ff0055]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/40 text-xs font-mono font-bold tracking-widest text-sky-700 dark:text-[#00f0ff] uppercase mb-4 shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.25)] animate-cyber-border">
            <Globe className="w-4 h-4 text-sky-600 dark:text-[#00f0ff]" />
            <span>[// HAMMADPATEL.VERCEL.APP · OFFICIAL DEPLOYMENT]</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
            RECENT WORKS &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-rose-600 dark:from-[#00f0ff] dark:via-[#38bdf8] dark:to-[#ff0055] dark:neon-cyan-glow">
              PORTFOLIO DEPLOYMENT
            </span>
          </h2>
          
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-3xl text-sm sm:text-base font-cyber leading-relaxed">
            Official technical workspace and personal portfolio engineered by <strong className="text-sky-600 dark:text-[#00f0ff]">Hammad Patel</strong>, featuring live high-contrast cyberpunk styling, interactive CRT circuit simulation, and transparent Indian market estimator.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-slate-200 dark:border-[#00f0ff]/30 text-sky-700 dark:text-[#00f0ff] shadow-sm">
              Live at: hammadpatel.vercel.app
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-slate-200 dark:border-[#00ff66]/30 text-emerald-700 dark:text-[#00ff66] shadow-sm">
              Zero AI Images · Pure Code
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-slate-200 dark:border-[#fcee0a]/30 text-amber-700 dark:text-[#fcee0a] shadow-sm">
              IIT Bombay Circuit Simulator
            </span>
          </div>
        </div>

        {/* =========================================================================
            FEATURED PROJECT SPOTLIGHT: hammadpatel.vercel.app
            (Official Personal Portfolio Website Made by Hammad Patel)
            ========================================================================= */}
        <div className="mb-14">
          <div className="cyber-bracket rounded-3xl overflow-hidden border-2 border-sky-400/50 dark:border-[#00f0ff]/60 bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-xl shadow-2xl dark:shadow-[0_0_40px_rgba(0,240,255,0.25)] transition-all">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Column: Authentic Cyberpunk Browser & Live Developer Terminal (Zero AI generated images) */}
              <div className="lg:col-span-5 relative bg-gradient-to-br from-[#0a0e1a] via-[#0d1326] to-[#05070e] p-5 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#00f0ff]/20 overflow-hidden">
                
                {/* Simulated Browser Address Bar & Window Chrome */}
                <div className="rounded-2xl border border-sky-500/30 dark:border-[#00f0ff]/40 bg-black/85 backdrop-blur-md overflow-hidden shadow-2xl p-4 sm:p-5 flex flex-col justify-between h-full min-h-[300px]">
                  
                  {/* Browser Window Controls */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <div className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-sky-300 text-[11px] font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
                      <span>https://hammadpatel.vercel.app</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">200 OK</span>
                  </div>

                  {/* Live Terminal / System Telemetry Screen */}
                  <div className="py-3.5 space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-sky-400">
                      <span className="text-[#00ff66] font-bold">$</span>
                      <span className="text-white font-bold">curl -I</span>
                      <span className="text-[#00f0ff]">hammadpatel.vercel.app</span>
                    </div>
                    
                    <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">ARCHITECT:</span>
                        <span className="text-white font-bold">Hammad Patel</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">DEPLOYMENT:</span>
                        <span className="text-[#00ff66] font-bold">Vercel Production Edge</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">AESTHETIC:</span>
                        <span className="text-[#00f0ff]">Cyberpunk Neon HUD</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">GTU RESULT:</span>
                        <span className="text-emerald-400 font-bold">6.38 CGPA (Sem 1–6)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">INDIAN ESTIMATOR:</span>
                        <span className="text-amber-400 font-bold">₹499/hr Active</span>
                      </div>
                    </div>

                    {/* Simulated Live CRT Waveform Oscilloscope Trace */}
                    <div className="rounded-lg bg-black/95 p-2.5 border border-[#00f0ff]/30 relative overflow-hidden">
                      <div className="flex items-center justify-between text-[10px] text-[#00f0ff] mb-1">
                        <span>LIVE SPICE TELEMETRY</span>
                        <span className="text-[#00ff66]">60 FPS CRT</span>
                      </div>
                      <div className="h-8 w-full flex items-center justify-center relative">
                        <svg className="w-full h-full text-[#00f0ff] stroke-current" viewBox="0 0 300 40" fill="none">
                          <path
                            d="M0 20 Q 37.5 2, 75 20 T 150 20 T 225 20 T 300 20"
                            strokeWidth="2"
                            className="drop-shadow-[0_0_6px_#00f0ff]"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Launch Direct Link */}
                  <a
                    href="https://hammadpatel.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 dark:from-[#00f0ff]/20 dark:to-[#0088ff]/20 dark:hover:from-[#00f0ff]/30 dark:hover:to-[#0088ff]/30 border border-sky-400/40 dark:border-[#00f0ff]/50 text-white dark:text-[#00f0ff] font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md group/btn"
                  >
                    <span>LAUNCH HAMMADPATEL.VERCEL.APP</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>

                </div>

              </div>

              {/* Right Column: Project Details & Spec */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  
                  {/* Category Kicker */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-[#00f0ff]">
                      PRODUCTION WEB ARCHITECTURE · DEPLOYED ON VERCEL
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-slate-900 dark:text-white uppercase tracking-tight leading-tight mb-2">
                    Hammad Patel Cyberpunk Portfolio & Engineering Workspace
                  </h3>

                  {/* Subtitle / Creator Credit */}
                  <div className="inline-block mb-4 px-3 py-1 rounded-md bg-sky-100 dark:bg-[#00f0ff]/15 border border-sky-300 dark:border-[#00f0ff]/40 text-xs font-mono font-bold text-sky-800 dark:text-[#00f0ff]">
                    Personal Portfolio Website · Made by Hammad Patel
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-cyber">
                    Official personal portfolio and technical workspace deployed live at <strong className="text-sky-600 dark:text-[#00f0ff]">hammadpatel.vercel.app</strong>. Engineered by Hammad Patel with high-contrast cyberpunk gaming aesthetics, interactive circuit and waveform simulation laboratory, interactive project price & hour estimator tailored for Indian markets, and full ECE academic coursework explorer.
                  </p>

                  {/* Bullet Highlights with Green Checkmarks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs sm:text-sm font-mono">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00ff66] shrink-0" />
                      <span>Live at hammadpatel.vercel.app</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00ff66] shrink-0" />
                      <span>&lt;1s Fast Load on Vercel</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00ff66] shrink-0" />
                      <span>100% Mobile &amp; Touch Responsive</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00ff66] shrink-0" />
                      <span>Indian Market ₹499/hr Estimator</span>
                    </div>
                  </div>

                  {/* Interactive Technology Stack Badges */}
                  <div className="mb-6">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-[#00f0ff]" />
                      <span>TECHNOLOGY STACK USED:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredTechs.map((tech) => (
                        <span
                          key={tech}
                          onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                          className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                            selectedTech === tech
                              ? 'bg-sky-600 text-white border-sky-500 dark:bg-[#00f0ff] dark:text-black dark:border-[#00f0ff] shadow-md'
                              : 'bg-slate-100 dark:bg-black/60 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-[#00f0ff]/30 hover:border-sky-500 dark:hover:border-[#00f0ff]'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="pt-5 border-t border-slate-200 dark:border-[#00f0ff]/20 flex flex-wrap items-center gap-3">
                  <a
                    href="https://hammadpatel.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm font-black text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-gradient-to-r dark:from-[#00f0ff] dark:to-[#0088ff] dark:hover:from-[#00d0df] dark:hover:to-[#0070df] dark:text-black shadow-lg dark:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all uppercase tracking-wide group"
                  >
                    <span>Visit hammadpatel.vercel.app</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {onOpenHireMe && (
                    <button
                      onClick={onOpenHireMe}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-black/70 dark:hover:bg-slate-900 border border-slate-300 dark:border-white/20 transition-colors"
                    >
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>Commission a Similar Website</span>
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>


        {/* =========================================================================
            IIT BOMBAY SPOKEN TUTORIAL CENTERPIECE: VIRTUAL CIRCUIT & WAVEFORM STUDIO
            ========================================================================= */}
        <div className="pt-8 border-t border-slate-200 dark:border-[#00f0ff]/20">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/30 text-sky-700 dark:text-[#00f0ff] font-mono text-xs font-bold uppercase mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>IIT BOMBAY SPOKEN TUTORIAL · HARDWARE &amp; SPICE SIMULATION</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-display text-slate-900 dark:text-white uppercase">
              Virtual Circuit &amp; Waveform Studio
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-2 font-cyber">
              Real-time interactive electronic circuit simulation laboratory modeled on IIT Bombay eSim and CircuitJS workflows. Adjust frequencies, filters, and explore oscilloscope waveforms with audio synthesis.
            </p>
          </div>

          <div className="cyber-bracket rounded-3xl overflow-hidden border border-slate-300 dark:border-[#00f0ff]/50 shadow-2xl dark:shadow-[0_0_40px_rgba(0,240,255,0.25)]">
            <InteractiveSignalLab />
          </div>
        </div>

      </div>
    </section>
  );
};
