import React, { useState } from 'react';
import { 
  Award, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  Radio, 
  Activity, 
  Zap, 
  Terminal,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { IIT_BOMBAY_INTERNSHIP } from '../data/portfolioData';

export const IITBombayExperience: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'esim' | 'circuitjs' | 'waveforms'>('esim');

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 text-xs font-bold tracking-wide uppercase mb-3 border border-cyan-200 dark:border-cyan-800">
            <Award className="w-4 h-4" />
            Verified Internship & Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            IIT Bombay Spoken Tutorial Project
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Academic Internship specializing in Electronic Circuit Simulation using eSim and CircuitJS.
          </p>
        </div>

        {/* Main IIT Bombay Experience Card */}
        <div className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/30 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle watermark / glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white">
                  <Cpu className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {IIT_BOMBAY_INTERNSHIP.type}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Spoken Tutorial National Mission on Education through ICT (MHRD/MoE)
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {IIT_BOMBAY_INTERNSHIP.role}
                </h3>
                <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                  {IIT_BOMBAY_INTERNSHIP.organization} • {IIT_BOMBAY_INTERNSHIP.domain}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                Analog & Digital Circuits
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-500" />
                Waveform Analysis
              </span>
            </div>
          </div>

          {/* Summary & Key Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-7">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Internship Objectives & Key Activities:
              </h4>

              <div className="space-y-3">
                {IIT_BOMBAY_INTERNSHIP.keyActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 text-xs font-mono font-bold">
                      0{index + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Simulation Breakdown */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  Simulation Tools & Methodologies:
                </h4>

                {/* Workflow Selector Tabs */}
                <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-200/70 dark:bg-slate-800/80 mb-4 text-xs font-medium">
                  <button
                    onClick={() => setActiveWorkflow('esim')}
                    className={`flex-1 py-1.5 px-2 rounded-xl transition-all ${
                      activeWorkflow === 'esim'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    eSim EDA
                  </button>
                  <button
                    onClick={() => setActiveWorkflow('circuitjs')}
                    className={`flex-1 py-1.5 px-2 rounded-xl transition-all ${
                      activeWorkflow === 'circuitjs'
                        ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    CircuitJS
                  </button>
                  <button
                    onClick={() => setActiveWorkflow('waveforms')}
                    className={`flex-1 py-1.5 px-2 rounded-xl transition-all ${
                      activeWorkflow === 'waveforms'
                        ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Waveforms
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 shadow-inner">
                  {activeWorkflow === 'esim' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-indigo-400 font-bold border-b border-slate-800 pb-2">
                        <span># eSim Circuit Synthesis</span>
                        <span className="text-[10px] text-slate-500">Ngspice Engine</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Captured electronic schematics using KiCad integration inside eSim.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Executed transient (.tran) and AC analysis (.ac) netlists.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Verified non-linear transistor Biasing and operational amplifier gain margins.
                      </p>
                      <div className="p-2 rounded-lg bg-black/50 text-[10px] text-emerald-400 mt-2">
                        $ run_ngspice --transient 10ms --step 1us --plot v(out) v(in)
                      </div>
                    </div>
                  )}

                  {activeWorkflow === 'circuitjs' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
                        <span># CircuitJS Real-Time Visualizer</span>
                        <span className="text-[10px] text-slate-500">Browser Dynamic</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Animated electron current flow across reactive RLC components.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Studied diode clipping, clamping, and full-wave bridge rectifier circuits.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Visualized digital logic gates (NAND, NOR, XOR) propagation delays.
                      </p>
                      <div className="p-2 rounded-lg bg-black/50 text-[10px] text-cyan-400 mt-2">
                        ✓ CircuitJS: Dynamic impedance match Z0 = 50 Ohm [Locked]
                      </div>
                    </div>
                  )}

                  {activeWorkflow === 'waveforms' && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
                        <span># Signal & Waveform Analysis</span>
                        <span className="text-[10px] text-slate-500">Oscilloscope</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Analyzed Peak-to-Peak (Vpp), RMS voltages, and Crest Factor across loads.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Studied ADC sampling rates, Nyquist criterion, and quantization noise.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • Observed Fourier frequency harmonics and total harmonic distortion (THD).
                      </p>
                      <div className="p-2 rounded-lg bg-black/50 text-[10px] text-amber-400 mt-2">
                        Waveform telemetry: Vpp = 5.00V | f = 1.00kHz | THD &lt; 0.8%
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tools Chips */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2 font-medium">
                  Tools & Simulation Packages:
                </span>
                <div className="flex flex-wrap gap-2">
                  {IIT_BOMBAY_INTERNSHIP.toolsUsed.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
