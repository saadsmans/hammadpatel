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
  Sparkles,
  Layers,
  ArrowRight,
  Calculator,
  Compass,
  FileText
} from 'lucide-react';
import { InteractiveSignalLab } from './InteractiveSignalLab';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface ProjectsSectionProps {
  onOpenHireMe?: () => void;
  onNavigate?: (page: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenHireMe, onNavigate }) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const featuredTechs = [
    'Ngspice Netlist',
    'CircuitJS Core',
    'Bode Frequency Response',
    'Web Audio API',
    'HTML5 Canvas CRT Engine',
    'Dual-Channel Scope',
    'FFT Spectral Harmonics',
    'React 19 & TypeScript'
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-24 relative bg-slate-100/70 dark:bg-[#04060c] border-t border-slate-200 dark:border-[#00f0ff]/30 overflow-hidden transition-colors">
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-400/10 dark:bg-[#00f0ff]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-[#6366f1]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/40 text-xs font-mono font-bold tracking-widest text-sky-700 dark:text-[#00f0ff] uppercase mb-4 shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.25)] animate-cyber-border">
            <Cpu className="w-4 h-4 text-sky-600 dark:text-[#00f0ff]" />
            <span>[// ECE ENGINEERING &amp; HARDWARE SIMULATION WORKS]</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
            VIRTUAL CIRCUIT &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-500 dark:from-[#00f0ff] dark:via-[#38bdf8] dark:to-[#00ff66] dark:neon-cyan-glow">
              WAVEFORM STUDIO
            </span>
          </h2>
          
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-3xl text-sm sm:text-base font-cyber leading-relaxed">
            Advanced real-time electronic circuit simulation laboratory inspired by <strong className="text-sky-600 dark:text-[#00f0ff]">IIT Bombay Spoken Tutorial</strong> research. Complete with 8 analog circuit topologies, interactive precision measurement cursors (ΔV, Δt), Bode magnitude &amp; phase frequency analysis, real-time audio tone synthesis, and harmonic FFT spectrum telemetry.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-slate-200 dark:border-[#00f0ff]/30 text-sky-700 dark:text-[#00f0ff] shadow-sm">
              8 Circuit Topologies Active
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-slate-200 dark:border-[#00ff66]/30 text-emerald-700 dark:text-[#00ff66] shadow-sm">
              Bode Frequency Response &amp; Phase
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-slate-200 dark:border-[#fcee0a]/30 text-amber-700 dark:text-[#fcee0a] shadow-sm">
              Precision Scope Cursors (ΔV &amp; Δt)
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-slate-200 dark:border-indigo-400/30 text-indigo-700 dark:text-indigo-400 shadow-sm">
              60 FPS Phosphor CRT Engine
            </span>
          </div>
        </div>

        {/* =========================================================================
            FEATURED CENTERPIECE: VIRTUAL CIRCUIT & WAVEFORM STUDIO
            ========================================================================= */}
        <div className="mb-14">
          <div className="cyber-bracket rounded-3xl overflow-hidden border-2 border-sky-400/50 dark:border-[#00f0ff]/60 shadow-2xl dark:shadow-[0_0_40px_rgba(0,240,255,0.25)]">
            <InteractiveSignalLab />
          </div>
        </div>

        {/* =========================================================================
            SECONDARY ECE ENGINEERING WORK: SATELLITE & RADAR LINK ANALYZER
            ========================================================================= */}
        <div className="pt-8 border-t border-slate-200 dark:border-[#00f0ff]/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-50 dark:bg-[#00f0ff]/10 border border-sky-300 dark:border-[#00f0ff]/30 text-sky-700 dark:text-[#00f0ff] font-mono text-xs font-bold uppercase mb-2">
                <Radio className="w-3.5 h-3.5" />
                <span>GTU SEMESTER 6 &amp; 7 ECE · RF COMPUTING ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white uppercase">
                Satellite Communication &amp; Radar Range Analyzer
              </h3>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('coursework')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-black/60 dark:hover:bg-[#00f0ff]/20 text-slate-800 dark:text-[#00f0ff] font-mono text-xs font-bold border border-slate-300 dark:border-[#00f0ff]/40 transition-all shrink-0"
              >
                <span>EXPLORE COURSEWORK LABS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Satellite Link Budget */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-[#00f0ff]/15 flex items-center justify-center text-sky-700 dark:text-[#00f0ff] mb-4 font-mono font-bold">
                01
              </div>
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                Orbital Link Budget &amp; C/N0
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                Computes uplink (14 GHz Ku-band) and downlink (11 GHz) carrier-to-noise ratio, transponder EIRP, atmospheric water vapor attenuation, and earth station G/T figure of merit.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-black/60 font-mono text-[10px] sm:text-[11px] text-sky-700 dark:text-[#00f0ff] border border-slate-200 dark:border-white/10 overflow-x-auto scrollbar-none">
                Equation: C/N = EIRP - L_fs - L_atm + G/T - k - B
              </div>
            </div>

            {/* Card 2: Radar Range Equation */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-[#00ff66]/15 flex items-center justify-center text-emerald-700 dark:text-[#00ff66] mb-4 font-mono font-bold">
                02
              </div>
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                Radar Range &amp; Target RCS
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                Formulates pulsed radar maximum detection range (R_max) as a function of peak transmitter power (Pt), antenna gain (G), target radar cross section (σ), and receiver minimum detectable signal (S_min).
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-black/60 font-mono text-[10px] sm:text-[11px] text-emerald-700 dark:text-[#00ff66] border border-slate-200 dark:border-white/10 overflow-x-auto scrollbar-none">
                Equation: R_max⁴ = (Pt · G² · λ² · σ) / [(4π)³ · S_min]
              </div>
            </div>

            {/* Card 3: Doppler Radial Velocity */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#070b16] border border-slate-200 dark:border-[#00f0ff]/30 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#fcee0a]/15 flex items-center justify-center text-amber-700 dark:text-[#fcee0a] mb-4 font-mono font-bold">
                03
              </div>
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                Doppler Velocity Telemetry
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-cyber leading-relaxed mb-4">
                Calculates target radial velocity (Vr) via Doppler frequency shift (fd) for Continuous Wave (CW) and Moving Target Indication (MTI) pulsed Doppler radar tracking systems.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-black/60 font-mono text-[10px] sm:text-[11px] text-amber-700 dark:text-[#fcee0a] border border-slate-200 dark:border-white/10 overflow-x-auto scrollbar-none">
                Equation: fd = (2 · Vr · fo) / c = (2 · Vr) / λ
              </div>
            </div>

          </div>

          {/* Quick Actions Footer for Recruitment */}
          {onOpenHireMe && (
            <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-sky-700 dark:text-[#00f0ff] uppercase block mb-1">
                  CORE ECE COLLABORATION &amp; PLACEMENT
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Interested in hardware R&amp;D, circuit simulation, or graduate ECE engineering roles?
                </h4>
              </div>

              <button
                onClick={onOpenHireMe}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold shrink-0 transition-colors shadow-md flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Connect for ECE Roles</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
