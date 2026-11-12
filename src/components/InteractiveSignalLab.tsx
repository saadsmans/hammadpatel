import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Cpu, 
  Sliders, 
  Download, 
  Sparkles,
  Camera,
  Layers,
  Settings2,
  Maximize2,
  Radio,
  Zap,
  HelpCircle
} from 'lucide-react';

type CircuitTopology = 
  | 'rc-lowpass' 
  | 'rc-highpass' 
  | 'rectifier' 
  | 'op-amp' 
  | '555-timer' 
  | 'am-mod';

type WaveformType = 'sine' | 'square' | 'triangle' | 'sawtooth';
type ScopeColorTheme = 'cyan' | 'green' | 'amber';
type DisplayMode = 'dual' | 'ch1' | 'ch2' | 'xy-lissajous' | 'math-diff';

export const InteractiveSignalLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Core Simulation Parameters
  const [topology, setTopology] = useState<CircuitTopology>('rc-lowpass');
  const [waveType, setWaveType] = useState<WaveformType>('sine');
  const [frequency, setFrequency] = useState<number>(440); // Hz (20 to 10000)
  const [amplitude, setAmplitude] = useState<number>(3.3); // Volts (0.5 to 5.0)
  
  // Circuit Component Values
  const [resistorKohm, setResistorKohm] = useState<number>(10); // 1k to 100k
  const [capacitorUf, setCapacitorUf] = useState<number>(0.1); // 0.001 to 10 uF
  const [resistorB555, setResistorB555] = useState<number>(10); // Ra and Rb for 555
  const [opAmpGain, setOpAmpGain] = useState<number>(2.5); // Rf / Rin (1 to 10)
  const [isOpAmpInverting, setIsOpAmpInverting] = useState<boolean>(true);
  const [modIndex, setModIndex] = useState<number>(0.75); // AM modulation index (0.1 to 1.5)
  const [noiseLevel, setNoiseLevel] = useState<number>(0); // 0 to 100%
  
  // Oscilloscope Display Settings
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [timebaseMs, setTimebaseMs] = useState<number>(1.0); // ms per division (0.2, 0.5, 1.0, 2.0, 5.0)
  const [voltsPerDiv, setVoltsPerDiv] = useState<number>(1.0); // V per division
  const [ch1Enabled, setCh1Enabled] = useState<boolean>(true);
  const [ch2Enabled, setCh2Enabled] = useState<boolean>(true);
  const [invertCh2, setInvertCh2] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('dual');
  const [colorTheme, setColorTheme] = useState<ScopeColorTheme>('cyan');
  const [showFft, setShowFft] = useState<boolean>(true);
  const [showSchematic, setShowSchematic] = useState<boolean>(true);

  // Audio Engine State
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [audioVolume, setAudioVolume] = useState<number>(0.15);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Animation References
  const animRef = useRef<number | null>(null);
  const timeOffsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

  // Mathematical Calculations
  const calculations = useMemo(() => {
    const R = resistorKohm * 1000; // Ohms
    const C = capacitorUf * 1e-6; // Farads
    const fc = 1 / (2 * Math.PI * R * C); // Cutoff freq in Hz
    const periodMs = 1000 / frequency; // Period in ms
    const vpp = amplitude * 2;
    const vrms = amplitude / Math.SQRT2;

    // Filter calculations
    const ratio = frequency / (fc || 1);
    let filterGain = 1;
    let phaseShiftDeg = 0;

    if (topology === 'rc-lowpass') {
      filterGain = 1 / Math.sqrt(1 + ratio * ratio);
      phaseShiftDeg = -Math.atan(ratio) * (180 / Math.PI);
    } else if (topology === 'rc-highpass') {
      filterGain = ratio / Math.sqrt(1 + ratio * ratio);
      phaseShiftDeg = 90 - Math.atan(ratio) * (180 / Math.PI);
    }

    const attenuationDb = 20 * Math.log10(Math.max(filterGain, 0.0001));

    // 555 Timer calculations: f = 1.44 / ((Ra + 2*Rb) * C)
    const Ra = resistorKohm * 1000;
    const Rb = resistorB555 * 1000;
    const f555 = 1.44 / ((Ra + 2 * Rb) * C);
    const dutyCycle555 = ((Ra + Rb) / (Ra + 2 * Rb)) * 100;

    // Rectifier ripple calculation: Vr = Idc / (2 * f * C)
    const rippleV = (amplitude * 0.8) / (2 * Math.max(frequency, 10) * R * C || 1);
    const rippleFactor = (rippleV / (amplitude * 0.9)) * 100;

    return {
      R,
      C,
      fc,
      periodMs,
      vpp,
      vrms,
      filterGain,
      phaseShiftDeg,
      attenuationDb,
      f555,
      dutyCycle555,
      rippleV,
      rippleFactor
    };
  }, [frequency, amplitude, resistorKohm, capacitorUf, resistorB555, topology]);

  // Audio Synthesizer Controls
  const toggleAudio = () => {
    if (isAudioMuted) {
      try {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtxClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = waveType === 'square' || topology === '555-timer' ? 'square' : waveType === 'triangle' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        gain.gain.setValueAtTime(audioVolume * 0.3, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscNodeRef.current = osc;
        gainNodeRef.current = gain;
        setIsAudioMuted(false);
      } catch {
        setIsAudioMuted(true);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
        oscNodeRef.current = null;
        gainNodeRef.current = null;
      }
      setIsAudioMuted(true);
    }
  };

  // Synchronize Audio Frequency and Volume
  useEffect(() => {
    if (oscNodeRef.current && audioCtxRef.current && !isAudioMuted) {
      const targetFreq = Math.min(Math.max(frequency, 20), 4000); // comfortable listening range
      oscNodeRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.05);
      oscNodeRef.current.type = waveType === 'square' || topology === '555-timer' ? 'square' : waveType === 'triangle' ? 'triangle' : 'sine';
    }
    if (gainNodeRef.current && audioCtxRef.current && !isAudioMuted) {
      gainNodeRef.current.gain.setTargetAtTime(audioVolume * 0.3, audioCtxRef.current.currentTime, 0.05);
    }
  }, [frequency, waveType, topology, audioVolume, isAudioMuted]);

  // Cleanup Audio on Unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Preset Configurations based on IIT Bombay Spoken Tutorial & GTU ECE Coursework
  const applyPreset = (presetKey: string) => {
    switch (presetKey) {
      case 'rc-lowpass-audio':
        setTopology('rc-lowpass');
        setWaveType('sine');
        setFrequency(1000);
        setAmplitude(3.0);
        setResistorKohm(10);
        setCapacitorUf(0.0159); // fc approx 1000 Hz
        setTimebaseMs(1.0);
        break;
      case 'rectifier-50hz':
        setTopology('rectifier');
        setWaveType('sine');
        setFrequency(50);
        setAmplitude(4.5);
        setResistorKohm(5);
        setCapacitorUf(1.0);
        setTimebaseMs(5.0);
        break;
      case '555-pwm':
        setTopology('555-timer');
        setWaveType('square');
        setFrequency(500);
        setAmplitude(3.3);
        setResistorKohm(10);
        setResistorB555(10);
        setCapacitorUf(0.1);
        setTimebaseMs(1.0);
        break;
      case 'opamp-saturation':
        setTopology('op-amp');
        setWaveType('sine');
        setFrequency(200);
        setAmplitude(2.5);
        setOpAmpGain(4.0); // 2.5 * 4 = 10V -> saturated at +/- 4.5V rails
        setIsOpAmpInverting(true);
        setTimebaseMs(2.0);
        break;
      case 'am-radio':
        setTopology('am-mod');
        setWaveType('sine');
        setFrequency(200);
        setAmplitude(3.0);
        setModIndex(0.85);
        setTimebaseMs(1.0);
        break;
    }
  };

  // High-Precision Canvas CRT Oscilloscope Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localRunning = isRunning;

    const render = (time: number) => {
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (localRunning) {
        // Advance offset proportional to frequency and timebase
        timeOffsetRef.current += dt * (frequency * (Math.PI * 2));
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // 1. Phosphor CRT Background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Phosphor theme palettes
      const phosphorTheme = {
        cyan: {
          ch1: '#38bdf8', // Sky Blue
          ch2: '#34d399', // Emerald
          ch2Invert: '#fbbf24', // Amber
          grid: 'rgba(30, 58, 100, 0.35)',
          gridBold: 'rgba(56, 189, 248, 0.45)',
          glow: '#38bdf8',
        },
        green: {
          ch1: '#22c55e', // Classic P31 Green
          ch2: '#eab308', // Amber
          ch2Invert: '#38bdf8',
          grid: 'rgba(20, 60, 30, 0.4)',
          gridBold: 'rgba(34, 197, 94, 0.45)',
          glow: '#22c55e',
        },
        amber: {
          ch1: '#f59e0b', // Amber Phosphor
          ch2: '#38bdf8', // Cyan
          ch2Invert: '#22c55e',
          grid: 'rgba(70, 45, 15, 0.4)',
          gridBold: 'rgba(245, 158, 11, 0.45)',
          glow: '#f59e0b',
        }
      }[colorTheme];

      // 2. Oscilloscope Graticule (10 horizontal x 8 vertical divisions)
      const numDivX = 10;
      const numDivY = 8;
      const divWidth = width / numDivX;
      const divHeight = height / numDivY;

      // Secondary Grid Lines
      ctx.strokeStyle = phosphorTheme.grid;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += divWidth) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += divHeight) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center Major Crosshairs
      ctx.strokeStyle = phosphorTheme.gridBold;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Graticule Sub-division Tick Marks along Center Axes (5 ticks per div)
      const tickStepX = divWidth / 5;
      const tickStepY = divHeight / 5;

      ctx.strokeStyle = phosphorTheme.gridBold;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += tickStepX) {
        const isMajor = Math.abs(x % divWidth) < 1;
        const tickH = isMajor ? 5 : 2.5;
        ctx.beginPath();
        ctx.moveTo(x, centerY - tickH);
        ctx.lineTo(x, centerY + tickH);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += tickStepY) {
        const isMajor = Math.abs(y % divHeight) < 1;
        const tickW = isMajor ? 5 : 2.5;
        ctx.beginPath();
        ctx.moveTo(width / 2 - tickW, y);
        ctx.lineTo(width / 2 + tickW, y);
        ctx.stroke();
      }

      // Total time span across screen = 10 divisions * timebaseMs in ms
      const totalTimeMs = 10 * timebaseMs;
      const timeOffset = timeOffsetRef.current;
      const pixelsPerVolt = divHeight / voltsPerDiv;

      // Mathematical function to compute raw input waveform at time t (seconds)
      const getInputWaveform = (tSec: number) => {
        const angle = (2 * Math.PI * frequency * tSec) + timeOffset;
        let val = 0;

        if (waveType === 'sine') {
          val = Math.sin(angle);
        } else if (waveType === 'square') {
          val = Math.sin(angle) >= 0 ? 1 : -1;
        } else if (waveType === 'triangle') {
          val = (2 / Math.PI) * Math.asin(Math.sin(angle));
        } else if (waveType === 'sawtooth') {
          val = 2 * ((angle / (2 * Math.PI)) - Math.floor(0.5 + (angle / (2 * Math.PI))));
        }

        // Noise injection
        if (noiseLevel > 0) {
          val += (Math.random() - 0.5) * (noiseLevel / 50);
        }

        return val * amplitude;
      };

      // Mathematical function to compute output waveform after circuit transformation
      const getOutputWaveform = (tSec: number, inputV: number) => {
        const angle = (2 * Math.PI * frequency * tSec) + timeOffset;

        if (topology === 'rc-lowpass') {
          // Low-pass filter: attenuation and lag phase shift
          const ratio = frequency / (calculations.fc || 1);
          const atten = 1 / Math.sqrt(1 + ratio * ratio);
          const phase = -Math.atan(ratio);
          return Math.sin(angle + phase) * amplitude * atten;
        } 
        
        if (topology === 'rc-highpass') {
          // High-pass filter: attenuation of low frequencies and lead phase shift
          const ratio = frequency / (calculations.fc || 1);
          const atten = ratio / Math.sqrt(1 + ratio * ratio);
          const phase = (Math.PI / 2) - Math.atan(ratio);
          return Math.sin(angle + phase) * amplitude * atten;
        }

        if (topology === 'rectifier') {
          // Full-wave bridge rectifier with diode threshold (1.4V drop) and ripple filter
          const rawRectified = Math.max(0, Math.abs(inputV) - 1.4);
          // Exponential decay RC discharge approximation
          const periodSec = 1 / frequency;
          const phaseInCycle = (tSec % (periodSec / 2)) / (periodSec / 2);
          const decay = Math.exp(-phaseInCycle * (1 / (resistorKohm * capacitorUf * 0.05 + 0.1)));
          const filtered = Math.max(rawRectified, (amplitude - 1.4) * decay);
          return filtered;
        }

        if (topology === 'op-amp') {
          // Op-Amp Amplifier: inverting or non-inverting with saturation at +/- 4.5V rails
          let outV = isOpAmpInverting ? -inputV * opAmpGain : inputV * (1 + opAmpGain);
          // Rail saturation
          const vSat = 4.5;
          if (outV > vSat) outV = vSat;
          if (outV < -vSat) outV = -vSat;
          return outV;
        }

        if (topology === '555-timer') {
          // 555 Astable: capacitor voltage exponential ramp & square pulse train
          const f = calculations.f555;
          const period = 1 / f;
          const modTime = (tSec % period) / period;
          const duty = calculations.dutyCycle555 / 100;
          
          if (modTime < duty) {
            // Charging towards 2/3 Vcc (3.3V)
            return (1 - Math.exp(-modTime * 5)) * amplitude;
          } else {
            // Discharging towards 1/3 Vcc
            return (Math.exp(-(modTime - duty) * 6)) * amplitude;
          }
        }

        if (topology === 'am-mod') {
          // AM Modulated wave: s(t) = [Ac + Am*cos(2*pi*fm*t)] * cos(2*pi*fc*t)
          const messageFreq = frequency * 0.1;
          const carrierFreq = frequency * 2.5;
          const message = Math.cos(2 * Math.PI * messageFreq * tSec + timeOffset * 0.1);
          const carrier = Math.cos(2 * Math.PI * carrierFreq * tSec + timeOffset * 2.5);
          return (1 + modIndex * message) * carrier * (amplitude * 0.6);
        }

        return inputV;
      };

      // 3. Render Channel Traces
      if (displayMode === 'xy-lissajous') {
        // --- X-Y Lissajous Phase Plot ---
        ctx.shadowBlur = 12;
        ctx.shadowColor = phosphorTheme.glow;
        ctx.strokeStyle = phosphorTheme.ch1;
        ctx.lineWidth = 2.2;
        ctx.beginPath();

        const samples = 600;
        for (let i = 0; i < samples; i++) {
          const tSec = (i / samples) * (1 / frequency);
          const xVal = getInputWaveform(tSec);
          const yVal = getOutputWaveform(tSec, xVal);

          const canvasX = (width / 2) + (xVal * pixelsPerVolt);
          const canvasY = centerY - (yVal * pixelsPerVolt);

          if (i === 0) ctx.moveTo(canvasX, canvasY);
          else ctx.lineTo(canvasX, canvasY);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

      } else {
        // --- Time-Domain Voltage Traces ---

        // Render Channel 1: Input Waveform
        if (ch1Enabled && (displayMode === 'dual' || displayMode === 'ch1' || displayMode === 'math-diff')) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = phosphorTheme.ch1;
          ctx.strokeStyle = phosphorTheme.ch1;
          ctx.lineWidth = 2.4;
          ctx.beginPath();

          for (let x = 0; x < width; x++) {
            const tSec = ((x / width) * totalTimeMs) / 1000;
            const vin = getInputWaveform(tSec);
            const y = centerY - (vin * pixelsPerVolt);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Render Channel 2: Output Waveform
        if (ch2Enabled && (displayMode === 'dual' || displayMode === 'ch2' || displayMode === 'math-diff')) {
          const ch2Color = invertCh2 ? phosphorTheme.ch2Invert : phosphorTheme.ch2;
          ctx.shadowBlur = 10;
          ctx.shadowColor = ch2Color;
          ctx.strokeStyle = ch2Color;
          ctx.lineWidth = 2.4;
          ctx.beginPath();

          for (let x = 0; x < width; x++) {
            const tSec = ((x / width) * totalTimeMs) / 1000;
            const vin = getInputWaveform(tSec);
            let vout = getOutputWaveform(tSec, vin);

            if (invertCh2) vout = -vout;

            if (displayMode === 'math-diff') {
              // Mathematical difference (CH2 - CH1)
              vout = vout - vin;
            }

            const y = centerY - (vout * pixelsPerVolt);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // 4. On-Canvas Telemetry HUD (Top-Left and Top-Right)
      ctx.font = '10px "JetBrains Mono", monospace';
      
      // Channel 1 Status Tag
      ctx.fillStyle = phosphorTheme.ch1;
      ctx.fillText(`CH1 (IN): ${(amplitude * 2).toFixed(2)} Vpp | ${frequency} Hz | ${waveType.toUpperCase()}`, 16, 22);

      // Channel 2 Status Tag
      if (ch2Enabled) {
        ctx.fillStyle = invertCh2 ? phosphorTheme.ch2Invert : phosphorTheme.ch2;
        ctx.fillText(`CH2 (OUT): ${topology.toUpperCase()} | ATTEN: ${calculations.attenuationDb.toFixed(1)} dB`, 16, 38);
      }

      // Scope Timebase & Scale Info
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`TIMEBASE: ${timebaseMs} ms/DIV | SCALE: ${voltsPerDiv} V/DIV`, 16, 54);
      
      if (displayMode === 'xy-lissajous') {
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`MODE: X-Y LISSAJOUS (CH1 vs CH2)`, 16, 70);
      }

      // Watermark
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.textAlign = 'right';
      ctx.fillText('HAMMAD PATEL · ECE VIRTUAL STUDIO', width - 16, 22);
      ctx.fillText('IIT BOMBAY ESIM & CIRCUITJS LAB', width - 16, 38);
      ctx.textAlign = 'left';

      // 5. Embedded Mini FFT Spectrum Analyzer (Bottom Right)
      if (showFft && displayMode !== 'xy-lissajous') {
        const fftBoxW = 180;
        const fftBoxH = 75;
        const fftBoxX = width - fftBoxW - 14;
        const fftBoxY = height - fftBoxH - 14;

        ctx.fillStyle = 'rgba(7, 12, 24, 0.88)';
        ctx.fillRect(fftBoxX, fftBoxY, fftBoxW, fftBoxH);
        ctx.strokeStyle = phosphorTheme.gridBold;
        ctx.lineWidth = 1;
        ctx.strokeRect(fftBoxX, fftBoxY, fftBoxW, fftBoxH);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillText('FFT HARMONIC SPECTRUM (f0 - 8f0)', fftBoxX + 8, fftBoxY + 12);

        // Bar spectrum
        const numBars = 10;
        const barW = 10;
        for (let b = 0; b < numBars; b++) {
          let barHeight = 0;
          if (b === 1) {
            barHeight = 50 * (amplitude / 3.3); // fundamental peak
          } else if (b === 3 && (waveType === 'square' || topology === '555-timer')) {
            barHeight = 22 * (amplitude / 3.3); // 3rd harmonic
          } else if (b === 5 && (waveType === 'square' || topology === '555-timer')) {
            barHeight = 12 * (amplitude / 3.3); // 5th harmonic
          } else if (topology === 'rectifier' && (b === 0 || b === 2)) {
            barHeight = 32;
          } else if (topology === 'am-mod' && (b === 0 || b === 2)) {
            barHeight = 20 * modIndex;
          } else {
            barHeight = 3 + (noiseLevel > 0 ? (noiseLevel / 100) * 8 : 0);
          }

          ctx.fillStyle = b === 1 ? phosphorTheme.ch1 : phosphorTheme.ch2;
          ctx.fillRect(fftBoxX + 10 + b * 16, fftBoxY + fftBoxH - barHeight - 4, barW, barHeight);
        }
      }

      if (isRunning) {
        animRef.current = requestAnimationFrame(render);
      }
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [
    topology,
    waveType,
    frequency,
    amplitude,
    resistorKohm,
    capacitorUf,
    resistorB555,
    opAmpGain,
    isOpAmpInverting,
    modIndex,
    noiseLevel,
    timebaseMs,
    voltsPerDiv,
    ch1Enabled,
    ch2Enabled,
    invertCh2,
    displayMode,
    colorTheme,
    showFft,
    isRunning,
    calculations
  ]);

  // Capture High-Res PNG Oscilloscope Snapshot
  const handleCaptureSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `HammadPatel_Scope_${topology}_${frequency}Hz.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 text-slate-900 dark:text-slate-100">
      
      {/* Studio Header & Lab Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-700 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
            <span>Virtual Circuit & Dual-Trace Waveform Studio</span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span className="text-emerald-700 dark:text-emerald-400">eSim & CircuitJS Inspired</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
            Interactive Signal Laboratory & Oscilloscope
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Hands-on hardware simulation engine. Tune analog filter parameters, simulate bridge rectification, analyze op-amp saturation, inspect 555 astable clocks, and listen with the real Web Audio tone engine.
          </p>
        </div>

        {/* Quick Lab Presets (IIT Bombay & CircuitJS) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">Lab Presets:</span>
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            <button
              onClick={() => applyPreset('rc-lowpass-audio')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors"
              title="RC Low-Pass Filter at 1kHz Cutoff"
            >
              RC Low-Pass
            </button>
            <button
              onClick={() => applyPreset('rectifier-50hz')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors"
              title="Full-wave bridge rectifier at 50Hz AC mains"
            >
              50Hz Rectifier
            </button>
            <button
              onClick={() => applyPreset('555-pwm')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors"
              title="555 Timer Astable Multivibrator PWM clock"
            >
              555 Astable
            </button>
            <button
              onClick={() => applyPreset('opamp-saturation')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors"
              title="Op-Amp Inverting Saturation at Rails"
            >
              Op-Amp Saturation
            </button>
            <button
              onClick={() => applyPreset('am-radio')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors"
              title="AM Radio Waveform & Sideband Generation"
            >
              AM Modulator
            </button>
          </div>
        </div>
      </div>

      {/* Circuit Topology Selector Tabs */}
      <div className="my-6">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5 font-semibold">
          Select Active Circuit Topology:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'rc-lowpass', label: '1. RC Low-Pass Filter', sub: 'Attenuates High Frequencies' },
            { id: 'rc-highpass', label: '2. RC High-Pass Filter', sub: 'Blocks DC / Low Freq' },
            { id: 'rectifier', label: '3. Diode Bridge Rectifier', sub: 'AC to DC + Filter Ripple' },
            { id: 'op-amp', label: '4. Op-Amp Amplifier', sub: 'Gain & Rail Clipping' },
            { id: '555-timer', label: '5. 555 Astable PWM', sub: 'Capacitor Charge & Clock' },
            { id: 'am-mod', label: '6. AM Modulator', sub: 'RF Carrier & Modulation' }
          ].map((tab) => {
            const isSelected = topology === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTopology(tab.id as CircuitTopology)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5'
                }`}
              >
                <span className="text-xs font-bold font-display block leading-tight">
                  {tab.label}
                </span>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Oscilloscope Centerpiece & Real-Time Canvas Screen */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
        
        {/* Top Control Bar of the Scope */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-1.5 px-3 rounded-xl flex items-center gap-1.5 font-bold transition-colors ${
                isRunning 
                  ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/40' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'FREEZE' : 'RUN'}</span>
            </button>

            {/* Display Mode Selector (Responsive scroll on mobile) */}
            <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-white/10 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-none">
              <span className="text-slate-400 text-[10px] shrink-0">MODE:</span>
              {(['dual', 'ch1', 'ch2', 'xy-lissajous', 'math-diff'] as DisplayMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setDisplayMode(m)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-colors shrink-0 ${
                    displayMode === m ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Phosphor Theme Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[10px]">PHOSPHOR:</span>
              <button
                onClick={() => setColorTheme('cyan')}
                className={`w-4 h-4 rounded-full border ${colorTheme === 'cyan' ? 'ring-2 ring-cyan-400 border-white' : 'border-transparent'} bg-cyan-400`}
                title="Cyan Phosphor"
              />
              <button
                onClick={() => setColorTheme('green')}
                className={`w-4 h-4 rounded-full border ${colorTheme === 'green' ? 'ring-2 ring-green-400 border-white' : 'border-transparent'} bg-emerald-500`}
                title="Classic Green P31 Phosphor"
              />
              <button
                onClick={() => setColorTheme('amber')}
                className={`w-4 h-4 rounded-full border ${colorTheme === 'amber' ? 'ring-2 ring-amber-400 border-white' : 'border-transparent'} bg-amber-400`}
                title="Amber Phosphor"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Real Web Audio Tone Toggle */}
            <button
              onClick={toggleAudio}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold transition-all border ${
                !isAudioMuted
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-white/10'
              }`}
              title="Real Web Audio Tone Synthesizer"
            >
              {!isAudioMuted ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              <span>{!isAudioMuted ? 'AUDIO LIVE' : 'SYNTH SOUND'}</span>
            </button>

            {/* FFT Overlay Toggle */}
            <button
              onClick={() => setShowFft(!showFft)}
              className={`px-2.5 py-1.5 rounded-xl border transition-colors ${
                showFft ? 'bg-indigo-900/60 text-indigo-300 border-indigo-500' : 'bg-slate-800 text-slate-400 border-white/10'
              }`}
              title="Toggle FFT Spectrum Analyzer"
            >
              FFT
            </button>

            {/* Snapshot PNG Export */}
            <button
              onClick={handleCaptureSnapshot}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 border border-white/10 transition-colors"
              title="Capture Oscilloscope PNG"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">CAPTURE</span>
            </button>
          </div>
        </div>

        {/* Live Canvas Element */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[500px]">
          <canvas
            ref={canvasRef}
            width={1280}
            height={600}
            className="w-full h-full block cursor-crosshair"
          />
        </div>

        {/* Scope Bottom Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 p-3 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-white/10 text-xs font-mono">
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">Vpp Amplitude:</span>
            <span className="font-bold text-cyan-400">{calculations.vpp.toFixed(2)} V</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">RMS Voltage:</span>
            <span className="font-bold text-cyan-300">{calculations.vrms.toFixed(2)} Vrms</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">Signal Frequency:</span>
            <span className="font-bold text-emerald-400">{frequency} Hz</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">Period (T = 1/f):</span>
            <span className="font-bold text-slate-200">{calculations.periodMs.toFixed(2)} ms</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">
              {topology === '555-timer' ? '555 Duty Cycle:' : topology === 'rectifier' ? 'Ripple Factor:' : 'Cutoff Freq (fc):'}
            </span>
            <span className="font-bold text-indigo-400">
              {topology === '555-timer' 
                ? `${calculations.dutyCycle555.toFixed(1)}%` 
                : topology === 'rectifier' 
                ? `${calculations.rippleFactor.toFixed(1)}%` 
                : `${calculations.fc.toFixed(1)} Hz`}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">Phase Angle (Δϕ):</span>
            <span className="font-bold text-amber-400">{calculations.phaseShiftDeg.toFixed(1)}°</span>
          </div>
        </div>
      </div>

      {/* Hardware Control Dashboard & Schematic Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        
        {/* Left: Interactive Analog Circuit Controls */}
        <div className="lg:col-span-7 space-y-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <h4 className="text-sm font-bold font-mono text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              Analog Signal Generator & Circuit Controls
            </h4>
            <span className="text-[11px] font-mono text-sky-600 dark:text-cyan-400">GTU / IIT Bombay eSim Netlist</span>
          </div>

          {/* Row 1: Frequency & Amplitude Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-600 dark:text-slate-400">Frequency (Hz):</span>
                <span className="font-bold text-sky-600 dark:text-cyan-400">{frequency} Hz</span>
              </div>
              <input
                type="range"
                min="20"
                max="5000"
                step="10"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                <span>20 Hz</span>
                <span>1 kHz</span>
                <span>5 kHz</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-600 dark:text-slate-400">Input Amplitude (Vpeak):</span>
                <span className="font-bold text-sky-600 dark:text-cyan-400">{amplitude.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                <span>0.5 V</span>
                <span>3.3 V</span>
                <span>5.0 V</span>
              </div>
            </div>
          </div>

          {/* Row 2: Waveform Type Selector */}
          <div>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-2 font-semibold">Input Function Generator Waveform:</span>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
              {(['sine', 'square', 'triangle', 'sawtooth'] as WaveformType[]).map((w) => (
                <button
                  key={w}
                  onClick={() => setWaveType(w)}
                  className={`py-2 px-3 rounded-xl uppercase font-bold text-center transition-all border ${
                    waveType === w
                      ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border-sky-400 dark:border-cyan-400 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/5'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Topology-Specific Dynamic Parameters */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            
            {/* If RC Filter: Show R and C */}
            {(topology === 'rc-lowpass' || topology === 'rc-highpass') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Resistor R (kΩ):</span>
                    <span className="font-bold text-emerald-400">{resistorKohm} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={resistorKohm}
                    onChange={(e) => setResistorKohm(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500">Standard 1/4W Metal Film Resistor</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Capacitor C (μF):</span>
                    <span className="font-bold text-emerald-400">{capacitorUf} μF</span>
                  </div>
                  <input
                    type="range"
                    min="0.005"
                    max="1.0"
                    step="0.005"
                    value={capacitorUf}
                    onChange={(e) => setCapacitorUf(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500">Ceramic / Mylar Decoupling Capacitor</span>
                </div>
              </div>
            )}

            {/* If Rectifier: Show Filter Capacitor & Load Resistor */}
            {topology === 'rectifier' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Smoothing Capacitor C (μF):</span>
                    <span className="font-bold text-amber-400">{capacitorUf} μF</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10.0"
                    step="0.1"
                    value={capacitorUf}
                    onChange={(e) => setCapacitorUf(Number(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500">Higher capacitance reduces output voltage ripple</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Load Resistor R_L (kΩ):</span>
                    <span className="font-bold text-amber-400">{resistorKohm} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={resistorKohm}
                    onChange={(e) => setResistorKohm(Number(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500">Simulates DC current draw by the load</span>
                </div>
              </div>
            )}

            {/* If Op-Amp: Gain and Inverting Switch */}
            {topology === 'op-amp' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Op-Amp Gain (Rf / Rin):</span>
                    <span className="font-bold text-purple-400">{opAmpGain.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="6.0"
                    step="0.2"
                    value={opAmpGain}
                    onChange={(e) => setOpAmpGain(Number(e.target.value))}
                    className="w-full accent-purple-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500">Values &gt; 3.0 cause clipping at ±4.5V supply rails</span>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="text-xs font-mono text-slate-400 mb-2">Configuration:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpAmpInverting(true)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-colors border ${
                        isOpAmpInverting ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-900 text-slate-400 border-white/5'
                      }`}
                    >
                      Inverting (180°)
                    </button>
                    <button
                      onClick={() => setIsOpAmpInverting(false)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-colors border ${
                        !isOpAmpInverting ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-900 text-slate-400 border-white/5'
                      }`}
                    >
                      Non-Inverting
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* If 555 Timer: Ra and Rb Timing Resistors */}
            {topology === '555-timer' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Timing Resistor Ra (kΩ):</span>
                    <span className="font-bold text-cyan-400">{resistorKohm} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={resistorKohm}
                    onChange={(e) => setResistorKohm(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500">Controls capacitor charging duration</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">Discharge Resistor Rb (kΩ):</span>
                    <span className="font-bold text-cyan-400">{resistorB555} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={resistorB555}
                    onChange={(e) => setResistorB555(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500">Determines discharge time to pin 7</span>
                </div>
              </div>
            )}

            {/* If AM Modulator: Modulation Index */}
            {topology === 'am-mod' && (
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Modulation Index (m = Am / Ac):</span>
                  <span className={`font-bold ${modIndex > 1 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {(modIndex * 100).toFixed(0)}% {modIndex > 1 ? '(OVER-MODULATION!)' : '(NORMAL)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={modIndex}
                  onChange={(e) => setModIndex(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-slate-500">
                  Standard AM broadcast standard requires m &le; 100% to avoid envelope distortion.
                </span>
              </div>
            )}

            {/* Oscilloscope Timebase & Voltage Division */}
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block mb-1.5">Timebase (ms/DIV):</span>
                <div className="flex gap-1">
                  {[0.2, 0.5, 1.0, 2.0, 5.0].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimebaseMs(t)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold border ${
                        timebaseMs === t ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-white/5'
                      }`}
                    >
                      {t}ms
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1.5">Volts/Div (CH1 & CH2):</span>
                <div className="flex gap-1">
                  {[0.5, 1.0, 2.0, 5.0].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVoltsPerDiv(v)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold border ${
                        voltsPerDiv === v ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-white/5'
                      }`}
                    >
                      {v}V
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Live Circuit Schematic & Mathematical Principles */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Schematic Box */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
              <span className="text-xs font-mono font-bold text-sky-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                Live Circuit Schematic
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">Node Simulation</span>
            </div>

            {/* Visual SVG Schematic Diagram */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-center min-h-[170px]">
              {topology === 'rc-lowpass' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  {/* Input Signal Line */}
                  <line x1="20" y1="40" x2="70" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="20" cy="40" r="4" fill="#38bdf8" />
                  <text x="12" y="25" fill="#38bdf8" fontSize="10" fontFamily="monospace">Vin</text>

                  {/* Resistor R */}
                  <rect x="70" y="32" width="50" height="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="82" y="44" fill="#38bdf8" fontSize="10" fontFamily="monospace">R={resistorKohm}k</text>

                  {/* Node junction */}
                  <line x1="120" y1="40" x2="190" y2="40" stroke="#34d399" strokeWidth="2.5" />
                  <circle cx="160" cy="40" r="4" fill="#34d399" />
                  <text x="195" y="44" fill="#34d399" fontSize="10" fontFamily="monospace">Vout</text>
                  <circle cx="230" cy="40" r="4" fill="#34d399" />

                  {/* Capacitor C to Ground */}
                  <line x1="160" y1="40" x2="160" y2="65" stroke="#34d399" strokeWidth="2" />
                  <line x1="145" y1="65" x2="175" y2="65" stroke="#34d399" strokeWidth="2" />
                  <line x1="145" y1="72" x2="175" y2="72" stroke="#34d399" strokeWidth="2" />
                  <line x1="160" y1="72" x2="160" y2="95" stroke="#94a3b8" strokeWidth="2" />
                  <text x="180" y="72" fill="#34d399" fontSize="10" fontFamily="monospace">C={capacitorUf}μF</text>

                  {/* Ground symbol */}
                  <line x1="150" y1="95" x2="170" y2="95" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="154" y1="100" x2="166" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="158" y1="105" x2="162" y2="105" stroke="#94a3b8" strokeWidth="1" />
                </svg>
              )}

              {topology === 'rc-highpass' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  {/* Input Signal Line */}
                  <line x1="20" y1="40" x2="70" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="20" cy="40" r="4" fill="#38bdf8" />
                  <text x="12" y="25" fill="#38bdf8" fontSize="10" fontFamily="monospace">Vin</text>

                  {/* Capacitor C */}
                  <line x1="70" y1="28" x2="70" y2="52" stroke="#38bdf8" strokeWidth="2.5" />
                  <line x1="77" y1="28" x2="77" y2="52" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="65" y="20" fill="#38bdf8" fontSize="10" fontFamily="monospace">C={capacitorUf}μF</text>

                  {/* Node junction */}
                  <line x1="77" y1="40" x2="160" y2="40" stroke="#34d399" strokeWidth="2.5" />
                  <circle cx="160" cy="40" r="4" fill="#34d399" />
                  <line x1="160" y1="40" x2="230" y2="40" stroke="#34d399" strokeWidth="2.5" />
                  <text x="235" y="44" fill="#34d399" fontSize="10" fontFamily="monospace">Vout</text>
                  <circle cx="230" cy="40" r="4" fill="#34d399" />

                  {/* Resistor R to Ground */}
                  <line x1="160" y1="40" x2="160" y2="58" stroke="#34d399" strokeWidth="2" />
                  <rect x="152" y="58" width="16" height="35" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                  <text x="175" y="78" fill="#34d399" fontSize="10" fontFamily="monospace">R={resistorKohm}k</text>
                  <line x1="160" y1="93" x2="160" y2="102" stroke="#94a3b8" strokeWidth="2" />

                  {/* Ground symbol */}
                  <line x1="150" y1="102" x2="170" y2="102" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="154" y1="107" x2="166" y2="107" stroke="#94a3b8" strokeWidth="1.5" />
                </svg>
              )}

              {topology === 'rectifier' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  {/* Diode Bridge Diamond */}
                  <polygon points="100,60 130,30 160,60 130,90" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                  <text x="115" y="64" fill="#fbbf24" fontSize="10" fontFamily="monospace">4x Diodes</text>
                  
                  {/* Input AC lines */}
                  <line x1="20" y1="45" x2="100" y2="60" stroke="#38bdf8" strokeWidth="2" />
                  <text x="15" y="40" fill="#38bdf8" fontSize="10" fontFamily="monospace">AC IN</text>
                  
                  {/* Output DC lines with smoothing capacitor */}
                  <line x1="160" y1="60" x2="230" y2="60" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="235" y="64" fill="#fbbf24" fontSize="10" fontFamily="monospace">+DC</text>
                  
                  {/* Capacitor */}
                  <line x1="195" y1="60" x2="195" y2="78" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="185" y1="78" x2="205" y2="78" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="185" y1="84" x2="205" y2="84" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="195" y1="84" x2="195" y2="100" stroke="#94a3b8" strokeWidth="2" />
                  <text x="180" y="112" fill="#94a3b8" fontSize="8" fontFamily="monospace">C={capacitorUf}μF</text>
                </svg>
              )}

              {topology === 'op-amp' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  {/* Triangle Op-Amp */}
                  <polygon points="110,25 110,95 190,60" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                  <text x="120" y="45" fill="#a855f7" fontSize="12" fontFamily="monospace">-</text>
                  <text x="120" y="80" fill="#a855f7" fontSize="12" fontFamily="monospace">+</text>
                  <text x="135" y="64" fill="#a855f7" fontSize="9" fontFamily="monospace">Av={opAmpGain}x</text>

                  {/* Inputs and Output */}
                  <line x1="30" y1="40" x2="110" y2="40" stroke="#38bdf8" strokeWidth="2" />
                  <text x="20" y="35" fill="#38bdf8" fontSize="10" fontFamily="monospace">Vin</text>
                  <line x1="190" y1="60" x2="250" y2="60" stroke="#a855f7" strokeWidth="2.5" />
                  <text x="240" y="50" fill="#a855f7" fontSize="10" fontFamily="monospace">Vout</text>

                  {/* Feedback line */}
                  <line x1="150" y1="18" x2="150" y2="18" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="135" y="15" fill="#a855f7" fontSize="8" fontFamily="monospace">Rf={opAmpGain * 10}k</text>
                </svg>
              )}

              {topology === '555-timer' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  {/* 555 IC Box */}
                  <rect x="90" y="25" width="100" height="70" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                  <circle cx="102" cy="35" r="3" fill="#06b6d4" />
                  <text x="110" y="62" fill="#06b6d4" fontSize="11" fontFamily="monospace" fontWeight="bold">NE555</text>
                  <text x="105" y="78" fill="#94a3b8" fontSize="8" fontFamily="monospace">Astable PWM</text>

                  {/* Pins */}
                  <line x1="40" y1="45" x2="90" y2="45" stroke="#38bdf8" strokeWidth="2" />
                  <text x="35" y="40" fill="#38bdf8" fontSize="9" fontFamily="monospace">Vcc</text>
                  <line x1="190" y1="60" x2="250" y2="60" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="210" y="52" fill="#06b6d4" fontSize="9" fontFamily="monospace">Pin 3 OUT</text>
                </svg>
              )}

              {topology === 'am-mod' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  {/* Modulator Circle Multiplier */}
                  <circle cx="140" cy="60" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="126" y1="46" x2="154" y2="74" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="126" y1="74" x2="154" y2="46" stroke="#38bdf8" strokeWidth="2" />
                  
                  {/* Inputs */}
                  <line x1="30" y1="40" x2="114" y2="52" stroke="#34d399" strokeWidth="2" />
                  <text x="25" y="32" fill="#34d399" fontSize="9" fontFamily="monospace">m(t) Baseband</text>

                  <line x1="30" y1="80" x2="114" y2="68" stroke="#38bdf8" strokeWidth="2" />
                  <text x="25" y="94" fill="#38bdf8" fontSize="9" fontFamily="monospace">c(t) RF Carrier</text>

                  {/* Modulated Output */}
                  <line x1="168" y1="60" x2="250" y2="60" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="200" y="52" fill="#fbbf24" fontSize="9" fontFamily="monospace">s(t) AM Wave</text>
                </svg>
              )}
            </div>

            {/* Circuit Equations Description */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1.5">
              {topology === 'rc-lowpass' && (
                <>
                  <div className="text-sky-700 dark:text-cyan-400 font-bold">Transfer Function: H(s) = 1 / (1 + sRC)</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Cutoff: fc = 1 / (2πRC) = <strong className="text-slate-900 dark:text-white">{calculations.fc.toFixed(1)} Hz</strong>. Phase lag approaches -90° at high frequencies.
                  </div>
                </>
              )}
              {topology === 'rc-highpass' && (
                <>
                  <div className="text-sky-700 dark:text-cyan-400 font-bold">Transfer Function: H(s) = sRC / (1 + sRC)</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Passes signals where f &gt; fc. Phase lead of +90° at DC decaying to 0° in passband.
                  </div>
                </>
              )}
              {topology === 'rectifier' && (
                <>
                  <div className="text-amber-700 dark:text-amber-400 font-bold">Graetz Full-Wave Bridge + Capacitor Filter</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Peak DC output = Vm - 2*Vd (1.4V drop). Ripple factor r = 1 / (4√3 * f * RL * C).
                  </div>
                </>
              )}
              {topology === 'op-amp' && (
                <>
                  <div className="text-purple-700 dark:text-purple-400 font-bold">Closed-Loop Gain: Av = -Rf / Rin</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Inverts signal by 180° with virtual ground at inverting node. Clips symmetrically at ±4.5V supply rails.
                  </div>
                </>
              )}
              {topology === '555-timer' && (
                <>
                  <div className="text-sky-700 dark:text-cyan-400 font-bold">Frequency: f = 1.44 / [(Ra + 2Rb) * C]</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Duty cycle: D = (Ra + Rb) / (Ra + 2Rb). Cap charges between 1/3 Vcc and 2/3 Vcc threshold.
                  </div>
                </>
              )}
              {topology === 'am-mod' && (
                <>
                  <div className="text-sky-700 dark:text-cyan-400 font-bold">AM Equation: s(t) = [1 + m*m(t)] * c(t)</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Creates upper (fc + fm) and lower (fc - fm) sidebands. Modulation depth controlled by index m.
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Academic & Practical Relevance Card */}
          <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-gradient-to-br dark:from-indigo-950/60 dark:via-slate-900 dark:to-black border border-indigo-200 dark:border-indigo-500/20 text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold uppercase text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IIT Bombay Spoken Tutorial Methodology</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              This digital lab directly translates my academic internship with IIT Bombay on <strong className="text-slate-900 dark:text-white">eSim and CircuitJS</strong>. By modeling differential equations, Kirchhoff laws, and Fourier spectral harmonics, it bridges theoretical communication engineering with high-performance WebGL & Canvas browser graphics.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
