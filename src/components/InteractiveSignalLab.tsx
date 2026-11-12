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
  HelpCircle,
  TrendingUp,
  Crosshair,
  BarChart2,
  FileCode,
  CheckCircle2
} from 'lucide-react';

export type CircuitTopology = 
  | 'rc-lowpass' 
  | 'rc-highpass' 
  | 'rlc-resonance'
  | 'rectifier' 
  | 'op-amp' 
  | 'wien-bridge'
  | '555-timer' 
  | 'am-mod';

export type WaveformType = 'sine' | 'square' | 'triangle' | 'sawtooth';
export type ScopeColorTheme = 'cyan' | 'green' | 'amber';
export type DisplayMode = 'dual' | 'ch1' | 'ch2' | 'xy-lissajous' | 'math-diff';
export type AnalysisView = 'oscilloscope' | 'bode' | 'fft' | 'schematic-spice';

export const InteractiveSignalLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bodeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Core Simulation Parameters
  const [topology, setTopology] = useState<CircuitTopology>('rc-lowpass');
  const [waveType, setWaveType] = useState<WaveformType>('sine');
  const [frequency, setFrequency] = useState<number>(440); // Hz (20 to 10000)
  const [amplitude, setAmplitude] = useState<number>(3.3); // Volts (0.5 to 5.0)
  
  // Circuit Component Values
  const [resistorKohm, setResistorKohm] = useState<number>(10); // 1k to 100k
  const [capacitorUf, setCapacitorUf] = useState<number>(0.1); // 0.001 to 10 uF
  const [inductorMh, setInductorMh] = useState<number>(10); // 1mH to 100mH (for RLC)
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
  const [activeView, setActiveView] = useState<AnalysisView>('oscilloscope');

  // Interactive Measurement Cursors
  const [cursorActive, setCursorActive] = useState<boolean>(false);
  const [cursorT1, setCursorT1] = useState<number>(25); // percentage of screen 0-100%
  const [cursorT2, setCursorT2] = useState<number>(65);
  const [cursorV1, setCursorV1] = useState<number>(35); // percentage of screen 0-100%
  const [cursorV2, setCursorV2] = useState<number>(75);

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
    const L = inductorMh * 1e-3; // Henrys
    const periodMs = 1000 / (frequency || 1); // Period in ms
    const vpp = amplitude * 2;
    const vrms = amplitude / Math.SQRT2;

    // Cutoff frequency for 1st order RC
    const fc = 1 / (2 * Math.PI * R * C);

    // RLC Resonance frequency & Quality Factor Q
    const f0Rlc = 1 / (2 * Math.PI * Math.sqrt(L * C || 1e-12));
    const z0Rlc = Math.sqrt(L / (C || 1e-12));
    const qFactorRlc = z0Rlc / (R || 1);
    const bandwidthRlc = f0Rlc / (qFactorRlc || 1);

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
    } else if (topology === 'rlc-resonance') {
      // Band-pass transfer function magnitude
      const w = 2 * Math.PI * frequency;
      const w0 = 2 * Math.PI * f0Rlc;
      const rlcDenom = Math.sqrt(Math.pow(1 - Math.pow(w / w0, 2), 2) + Math.pow(w / (qFactorRlc * w0), 2));
      filterGain = (w / (qFactorRlc * w0)) / (rlcDenom || 1);
      phaseShiftDeg = Math.atan2(1 - Math.pow(w / w0, 2), w / (qFactorRlc * w0)) * (180 / Math.PI);
    } else if (topology === 'op-amp') {
      filterGain = isOpAmpInverting ? opAmpGain : 1 + opAmpGain;
      phaseShiftDeg = isOpAmpInverting ? 180 : 0;
    } else if (topology === 'wien-bridge') {
      filterGain = 1.0;
      phaseShiftDeg = 0;
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

    // Cursor Readouts in physical units
    const totalTimeMs = 10 * timebaseMs;
    const t1Ms = (cursorT1 / 100) * totalTimeMs;
    const t2Ms = (cursorT2 / 100) * totalTimeMs;
    const deltaTMs = Math.abs(t2Ms - t1Ms);
    const cursorFreqHz = deltaTMs > 0 ? (1000 / deltaTMs) : 0;

    const totalSpanVolts = 8 * voltsPerDiv;
    const v1Volts = ((50 - cursorV1) / 100) * totalSpanVolts;
    const v2Volts = ((50 - cursorV2) / 100) * totalSpanVolts;
    const deltaV = Math.abs(v2Volts - v1Volts);

    return {
      R,
      C,
      L,
      fc,
      f0Rlc,
      qFactorRlc,
      bandwidthRlc,
      periodMs,
      vpp,
      vrms,
      filterGain,
      phaseShiftDeg,
      attenuationDb,
      f555,
      dutyCycle555,
      rippleV,
      rippleFactor,
      deltaTMs,
      deltaV,
      cursorFreqHz,
      v1Volts,
      v2Volts
    };
  }, [frequency, amplitude, resistorKohm, capacitorUf, inductorMh, resistorB555, opAmpGain, isOpAmpInverting, topology, timebaseMs, voltsPerDiv, cursorT1, cursorT2, cursorV1, cursorV2]);

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
      const targetFreq = Math.min(Math.max(frequency, 20), 4000);
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
        setCapacitorUf(0.0159);
        setTimebaseMs(1.0);
        break;
      case 'rlc-bandpass-1khz':
        setTopology('rlc-resonance');
        setWaveType('sine');
        setFrequency(1590);
        setAmplitude(3.5);
        setResistorKohm(1);
        setCapacitorUf(0.1);
        setInductorMh(10);
        setTimebaseMs(0.5);
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
      case 'wien-bridge-sine':
        setTopology('wien-bridge');
        setWaveType('sine');
        setFrequency(1000);
        setAmplitude(3.0);
        setResistorKohm(15.9);
        setCapacitorUf(0.01);
        setTimebaseMs(1.0);
        break;
      case 'opamp-saturation':
        setTopology('op-amp');
        setWaveType('sine');
        setFrequency(200);
        setAmplitude(2.5);
        setOpAmpGain(4.0);
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
          ch1: '#38bdf8',
          ch2: '#34d399',
          ch2Invert: '#fbbf24',
          grid: 'rgba(30, 58, 100, 0.35)',
          gridBold: 'rgba(56, 189, 248, 0.45)',
          glow: '#38bdf8',
          cursor: '#f43f5e'
        },
        green: {
          ch1: '#22c55e',
          ch2: '#eab308',
          ch2Invert: '#38bdf8',
          grid: 'rgba(20, 60, 30, 0.4)',
          gridBold: 'rgba(34, 197, 94, 0.45)',
          glow: '#22c55e',
          cursor: '#00f0ff'
        },
        amber: {
          ch1: '#f59e0b',
          ch2: '#38bdf8',
          ch2Invert: '#22c55e',
          grid: 'rgba(70, 45, 15, 0.4)',
          gridBold: 'rgba(245, 158, 11, 0.45)',
          glow: '#f59e0b',
          cursor: '#38bdf8'
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

      // Tick Marks
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

      const totalTimeMs = 10 * timebaseMs;
      const timeOffset = timeOffsetRef.current;
      const pixelsPerVolt = divHeight / voltsPerDiv;

      // Compute raw input waveform
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

        if (noiseLevel > 0) {
          val += (Math.random() - 0.5) * (noiseLevel / 50);
        }

        return val * amplitude;
      };

      // Compute output waveform
      const getOutputWaveform = (tSec: number, inputV: number) => {
        const angle = (2 * Math.PI * frequency * tSec) + timeOffset;

        if (topology === 'rc-lowpass') {
          const ratio = frequency / (calculations.fc || 1);
          const atten = 1 / Math.sqrt(1 + ratio * ratio);
          const phase = -Math.atan(ratio);
          return Math.sin(angle + phase) * amplitude * atten;
        } 
        
        if (topology === 'rc-highpass') {
          const ratio = frequency / (calculations.fc || 1);
          const atten = ratio / Math.sqrt(1 + ratio * ratio);
          const phase = (Math.PI / 2) - Math.atan(ratio);
          return Math.sin(angle + phase) * amplitude * atten;
        }

        if (topology === 'rlc-resonance') {
          const w = 2 * Math.PI * frequency;
          const w0 = 2 * Math.PI * calculations.f0Rlc;
          const Q = calculations.qFactorRlc || 1;
          const rlcDenom = Math.sqrt(Math.pow(1 - Math.pow(w / w0, 2), 2) + Math.pow(w / (Q * w0), 2));
          const rlcGain = (w / (Q * w0)) / (rlcDenom || 1);
          const rlcPhase = Math.atan2(1 - Math.pow(w / w0, 2), w / (Q * w0));
          return Math.sin(angle + rlcPhase) * amplitude * rlcGain;
        }

        if (topology === 'wien-bridge') {
          return Math.sin(angle) * (amplitude * 0.95);
        }

        if (topology === 'rectifier') {
          const rawRectified = Math.max(0, Math.abs(inputV) - 1.4);
          const periodSec = 1 / frequency;
          const phaseInCycle = (tSec % (periodSec / 2)) / (periodSec / 2);
          const decay = Math.exp(-phaseInCycle * (1 / (resistorKohm * capacitorUf * 0.05 + 0.1)));
          const filtered = Math.max(rawRectified, (amplitude - 1.4) * decay);
          return filtered;
        }

        if (topology === 'op-amp') {
          let outV = isOpAmpInverting ? -inputV * opAmpGain : inputV * (1 + opAmpGain);
          const vSat = 4.5;
          if (outV > vSat) outV = vSat;
          if (outV < -vSat) outV = -vSat;
          return outV;
        }

        if (topology === '555-timer') {
          const f = calculations.f555;
          const period = 1 / (f || 1);
          const modTime = (tSec % period) / period;
          const duty = calculations.dutyCycle555 / 100;
          
          if (modTime < duty) {
            return (1 - Math.exp(-modTime * 5)) * amplitude;
          } else {
            return (Math.exp(-(modTime - duty) * 6)) * amplitude;
          }
        }

        if (topology === 'am-mod') {
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
        ctx.shadowBlur = 12;
        ctx.shadowColor = phosphorTheme.glow;
        ctx.strokeStyle = phosphorTheme.ch1;
        ctx.lineWidth = 2.2;
        ctx.beginPath();

        const samples = 600;
        for (let i = 0; i < samples; i++) {
          const tSec = (i / samples) * (1 / (frequency || 1));
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
        // Channel 1: Input
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

        // Channel 2: Output
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

      // 4. Interactive Measurement Cursors
      if (cursorActive && displayMode !== 'xy-lissajous') {
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = phosphorTheme.cursor;

        const xCursor1 = (cursorT1 / 100) * width;
        const xCursor2 = (cursorT2 / 100) * width;

        ctx.beginPath();
        ctx.moveTo(xCursor1, 0);
        ctx.lineTo(xCursor1, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xCursor2, 0);
        ctx.lineTo(xCursor2, height);
        ctx.stroke();

        const yCursor1 = (cursorV1 / 100) * height;
        const yCursor2 = (cursorV2 / 100) * height;

        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(0, yCursor1);
        ctx.lineTo(width, yCursor1);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, yCursor2);
        ctx.lineTo(width, yCursor2);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = phosphorTheme.cursor;
        ctx.fillText(`T1`, Math.min(xCursor1 + 4, width - 24), 85);
        ctx.fillText(`T2`, Math.min(xCursor2 + 4, width - 24), 85);

        ctx.fillStyle = '#fbbf24';
        ctx.fillText(`V1: ${calculations.v1Volts.toFixed(2)}V`, 14, Math.max(yCursor1 - 4, 14));
        ctx.fillText(`V2: ${calculations.v2Volts.toFixed(2)}V`, 14, Math.max(yCursor2 - 4, 14));

        ctx.restore();
      }

      // 5. On-Canvas Telemetry HUD (Mobile responsive font and layout)
      ctx.font = '11px "JetBrains Mono", monospace';
      
      // Top Left Channel 1 Tag
      ctx.fillStyle = phosphorTheme.ch1;
      ctx.fillText(`CH1: ${(amplitude * 2).toFixed(2)} Vpp | ${frequency} Hz | ${waveType.toUpperCase()}`, 14, 20);

      // Top Left Channel 2 Tag
      if (ch2Enabled) {
        ctx.fillStyle = invertCh2 ? phosphorTheme.ch2Invert : phosphorTheme.ch2;
        ctx.fillText(`CH2: ${topology.toUpperCase()} | ATTEN: ${calculations.attenuationDb.toFixed(1)} dB`, 14, 36);
      }

      // Timebase & Scale
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`TB: ${timebaseMs}ms/DIV | SC: ${voltsPerDiv}V/DIV`, 14, 52);
      
      if (displayMode === 'xy-lissajous') {
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`MODE: X-Y LISSAJOUS`, 14, 68);
      }

      // Watermark in top right
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.textAlign = 'right';
      ctx.fillText('ECE VIRTUAL STUDIO', width - 14, 20);
      ctx.fillText('IIT BOMBAY ESIM & CIRCUITJS', width - 14, 36);
      ctx.textAlign = 'left';

      // 6. Mini FFT Spectrum Analyzer (Bottom Right)
      if (showFft && displayMode !== 'xy-lissajous') {
        const fftBoxW = 160;
        const fftBoxH = 65;
        const fftBoxX = width - fftBoxW - 12;
        const fftBoxY = height - fftBoxH - 12;

        ctx.fillStyle = 'rgba(7, 12, 24, 0.88)';
        ctx.fillRect(fftBoxX, fftBoxY, fftBoxW, fftBoxH);
        ctx.strokeStyle = phosphorTheme.gridBold;
        ctx.lineWidth = 1;
        ctx.strokeRect(fftBoxX, fftBoxY, fftBoxW, fftBoxH);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillText('FFT SPECTRUM (f0 - 8f0)', fftBoxX + 6, fftBoxY + 11);

        const numBars = 10;
        const barW = 8;
        for (let b = 0; b < numBars; b++) {
          let barHeight = 0;
          if (b === 1) {
            barHeight = 44 * (amplitude / 3.3);
          } else if (b === 3 && (waveType === 'square' || topology === '555-timer')) {
            barHeight = 20 * (amplitude / 3.3);
          } else if (b === 5 && (waveType === 'square' || topology === '555-timer')) {
            barHeight = 10 * (amplitude / 3.3);
          } else if (topology === 'rectifier' && (b === 0 || b === 2)) {
            barHeight = 26;
          } else if (topology === 'am-mod' && (b === 0 || b === 2)) {
            barHeight = 18 * modIndex;
          } else if (topology === 'rlc-resonance') {
            const dist = Math.abs(b - 2);
            barHeight = Math.max(3, 40 - dist * 14);
          } else {
            barHeight = 2 + (noiseLevel > 0 ? (noiseLevel / 100) * 6 : 0);
          }

          ctx.fillStyle = b === 1 ? phosphorTheme.ch1 : phosphorTheme.ch2;
          ctx.fillRect(fftBoxX + 8 + b * 14, fftBoxY + fftBoxH - barHeight - 4, barW, barHeight);
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
    inductorMh,
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
    cursorActive,
    cursorT1,
    cursorT2,
    cursorV1,
    cursorV2,
    isRunning,
    calculations
  ]);

  // Bode Plot Frequency Response Canvas Render
  useEffect(() => {
    if (activeView !== 'bode') return;
    const canvas = bodeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const x = (i / 4) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let i = 1; i <= 6; i++) {
      const y = (i / 6) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const R = resistorKohm * 1000;
    const C = capacitorUf * 1e-6;
    const fc = 1 / (2 * Math.PI * R * C);

    for (let x = 0; x < width; x++) {
      const logF = 1 + (x / width) * 4;
      const f = Math.pow(10, logF);
      const ratio = f / (fc || 1);
      let magDb = 0;

      if (topology === 'rc-lowpass') {
        const g = 1 / Math.sqrt(1 + ratio * ratio);
        magDb = 20 * Math.log10(g);
      } else if (topology === 'rc-highpass') {
        const g = ratio / Math.sqrt(1 + ratio * ratio);
        magDb = 20 * Math.log10(g);
      } else if (topology === 'rlc-resonance') {
        const f0 = calculations.f0Rlc;
        const Q = calculations.qFactorRlc;
        const wRatio = f / (f0 || 1);
        const denom = Math.sqrt(Math.pow(1 - wRatio * wRatio, 2) + Math.pow(wRatio / Q, 2));
        const g = (wRatio / Q) / (denom || 1);
        magDb = 20 * Math.log10(Math.max(g, 0.001));
      } else {
        magDb = -3 * (x / width);
      }

      const yMag = 50 - (magDb * 3.5);
      if (x === 0) ctx.moveTo(x, yMag);
      else ctx.lineTo(x, yMag);
    }
    ctx.stroke();

    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 2]);
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const logF = 1 + (x / width) * 4;
      const f = Math.pow(10, logF);
      const ratio = f / (fc || 1);
      let phaseDeg = 0;

      if (topology === 'rc-lowpass') {
        phaseDeg = -Math.atan(ratio) * (180 / Math.PI);
      } else if (topology === 'rc-highpass') {
        phaseDeg = 90 - Math.atan(ratio) * (180 / Math.PI);
      } else if (topology === 'rlc-resonance') {
        const f0 = calculations.f0Rlc;
        const Q = calculations.qFactorRlc;
        phaseDeg = Math.atan2(1 - Math.pow(f / f0, 2), f / (Q * f0)) * (180 / Math.PI);
      }

      const yPhase = height / 2 + 70 - (phaseDeg * 0.9);
      if (x === 0) ctx.moveTo(x, yPhase);
      else ctx.lineTo(x, yPhase);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#00f0ff';
    ctx.fillText('MAGNITUDE (dB) [CYAN] · 0dB to -40dB', 16, 24);
    ctx.fillStyle = '#34d399';
    ctx.fillText('PHASE (DEGREES) [EMERALD DASHED] · +90° to -90°', 16, 40);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('10Hz', 10, height - 10);
    ctx.fillText('100Hz', width * 0.25 - 15, height - 10);
    ctx.fillText('1kHz', width * 0.5 - 10, height - 10);
    ctx.fillText('10kHz', width * 0.75 - 15, height - 10);
    ctx.fillText('100kHz', width - 45, height - 10);

  }, [activeView, topology, resistorKohm, capacitorUf, inductorMh, calculations]);

  // Capture High-Res PNG Oscilloscope Snapshot
  const handleCaptureSnapshot = () => {
    const canvas = activeView === 'bode' ? bodeCanvasRef.current : canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `HammadPatel_${activeView}_${topology}_${frequency}Hz.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-8 text-slate-900 dark:text-slate-100 max-w-full">
      
      {/* Studio Header & Lab Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-sky-700 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
            <span>Virtual Circuit &amp; Dual-Trace Waveform Studio</span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500">·</span>
            <span className="text-emerald-700 dark:text-emerald-400">eSim &amp; CircuitJS Inspired</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
            Advanced Signal Laboratory &amp; SPICE Oscilloscope
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Hands-on hardware simulation engine. Tune analog filter parameters, simulate bridge rectification, analyze op-amp saturation, inspect 555 astable clocks, measure with precision delta cursors, inspect Bode frequency response, and listen with the Web Audio tone engine.
          </p>
        </div>

        {/* Quick Lab Presets with mobile horizontal scroll support */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">Lab Presets:</span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
            <button
              onClick={() => applyPreset('rc-lowpass-audio')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors whitespace-nowrap text-xs font-mono shrink-0"
              title="RC Low-Pass Filter at 1kHz Cutoff"
            >
              RC Low-Pass
            </button>
            <button
              onClick={() => applyPreset('rlc-bandpass-1khz')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors whitespace-nowrap text-xs font-mono shrink-0"
              title="RLC Series Resonance Bandpass Filter"
            >
              RLC Resonance
            </button>
            <button
              onClick={() => applyPreset('rectifier-50hz')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors whitespace-nowrap text-xs font-mono shrink-0"
              title="Full-wave bridge rectifier at 50Hz AC mains"
            >
              50Hz Rectifier
            </button>
            <button
              onClick={() => applyPreset('555-pwm')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors whitespace-nowrap text-xs font-mono shrink-0"
              title="555 Timer Astable Multivibrator PWM clock"
            >
              555 Astable
            </button>
            <button
              onClick={() => applyPreset('wien-bridge-sine')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors whitespace-nowrap text-xs font-mono shrink-0"
              title="Wien Bridge Audio Sine Oscillator"
            >
              Wien Bridge
            </button>
            <button
              onClick={() => applyPreset('opamp-saturation')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors whitespace-nowrap text-xs font-mono shrink-0"
              title="Op-Amp Inverting Saturation at Rails"
            >
              Op-Amp
            </button>
            <button
              onClick={() => applyPreset('am-radio')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/5 transition-colors whitespace-nowrap text-xs font-mono shrink-0"
              title="AM Radio Waveform & Sideband Generation"
            >
              AM Mod
            </button>
          </div>
        </div>
      </div>

      {/* Circuit Topology Selector Tabs (Smooth horizontal scroll on mobile, zero truncation) */}
      <div className="my-5 sm:my-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
            Select Active Circuit Topology:
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-sky-600 dark:text-[#00f0ff] whitespace-nowrap">
            8 Topologies Active
          </span>
        </div>

        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {[
            { id: 'rc-lowpass', label: '1. RC Low-Pass', sub: 'Attenuates Highs' },
            { id: 'rc-highpass', label: '2. RC High-Pass', sub: 'Blocks DC / Lows' },
            { id: 'rlc-resonance', label: '3. RLC Resonance', sub: 'Tuned Bandpass' },
            { id: 'rectifier', label: '4. Bridge Rectifier', sub: 'AC-to-DC Ripple' },
            { id: 'op-amp', label: '5. Op-Amp Gain', sub: 'Rail Saturation' },
            { id: 'wien-bridge', label: '6. Wien Bridge', sub: 'Sine Oscillator' },
            { id: '555-timer', label: '7. 555 Astable', sub: 'PWM Clock Train' },
            { id: 'am-mod', label: '8. AM Modulator', sub: 'RF Carrier & SSB' }
          ].map((tab) => {
            const isSelected = topology === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTopology(tab.id as CircuitTopology)}
                className={`min-w-[145px] sm:min-w-0 p-2.5 rounded-2xl text-left transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5'
                }`}
              >
                <span className="text-xs font-bold font-display block leading-tight whitespace-nowrap sm:whitespace-normal">
                  {tab.label}
                </span>
                <span className={`text-[9px] block mt-0.5 whitespace-nowrap sm:whitespace-normal ${isSelected ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Analysis View Mode Toggle (Oscilloscope vs Bode Plot vs Cursor) */}
      <div className="flex flex-wrap items-center gap-2 mb-4 p-1.5 rounded-2xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 w-full sm:w-fit text-xs font-mono">
        <button
          onClick={() => setActiveView('oscilloscope')}
          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeView === 'oscilloscope'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5 shrink-0" />
          <span>CRT Scope</span>
        </button>

        <button
          onClick={() => setActiveView('bode')}
          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeView === 'bode'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Bode Plot</span>
        </button>

        <button
          onClick={() => setCursorActive(!cursorActive)}
          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all border ${
            cursorActive
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
          title="Toggle Precision Measurement Cursors"
        >
          <Crosshair className="w-3.5 h-3.5 shrink-0" />
          <span>Cursors {cursorActive ? '[ON]' : '[OFF]'}</span>
        </button>
      </div>

      {/* Oscilloscope Centerpiece & Real-Time Canvas Screen */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
        
        {/* Top Control Bar of the Scope (Fully Responsive Flex-Wrap Layout) */}
        <div className="p-2.5 sm:px-4 sm:py-3 bg-slate-950/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs font-mono">
          
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-1.5 px-2.5 sm:px-3 rounded-xl flex items-center gap-1.5 font-bold transition-colors text-xs ${
                isRunning 
                  ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/40' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'FREEZE' : 'RUN'}</span>
            </button>

            {/* Display Mode Selector */}
            {activeView === 'oscilloscope' && (
              <div className="flex items-center gap-1 bg-slate-900 px-1.5 py-1 rounded-xl border border-white/10 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-none">
                <span className="text-slate-400 text-[10px] shrink-0">MODE:</span>
                {(['dual', 'ch1', 'ch2', 'xy-lissajous', 'math-diff'] as DisplayMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setDisplayMode(m)}
                    className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-semibold transition-colors shrink-0 ${
                      displayMode === m ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* Phosphor Theme Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-white/10">
              <span className="text-slate-400 text-[10px] hidden sm:inline">PHOSPHOR:</span>
              <button
                onClick={() => setColorTheme('cyan')}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border ${colorTheme === 'cyan' ? 'ring-2 ring-cyan-400 border-white' : 'border-transparent'} bg-cyan-400`}
                title="Cyan Phosphor"
              />
              <button
                onClick={() => setColorTheme('green')}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border ${colorTheme === 'green' ? 'ring-2 ring-green-400 border-white' : 'border-transparent'} bg-emerald-500`}
                title="Classic Green P31 Phosphor"
              />
              <button
                onClick={() => setColorTheme('amber')}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border ${colorTheme === 'amber' ? 'ring-2 ring-amber-400 border-white' : 'border-transparent'} bg-amber-400`}
                title="Amber Phosphor"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Real Web Audio Tone Toggle */}
            <button
              onClick={toggleAudio}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold transition-all border text-xs ${
                !isAudioMuted
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-white/10'
              }`}
              title="Real Web Audio Tone Synthesizer"
            >
              {!isAudioMuted ? <Volume2 className="w-3.5 h-3.5 text-white shrink-0" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              <span className="text-[10px] sm:text-xs">{!isAudioMuted ? 'AUDIO ON' : 'SYNTH'}</span>
            </button>

            {/* FFT Overlay Toggle */}
            {activeView === 'oscilloscope' && (
              <button
                onClick={() => setShowFft(!showFft)}
                className={`px-2 sm:px-2.5 py-1.5 rounded-xl border transition-colors text-[10px] sm:text-xs font-bold ${
                  showFft ? 'bg-indigo-900/60 text-indigo-300 border-indigo-500' : 'bg-slate-800 text-slate-400 border-white/10'
                }`}
                title="Toggle FFT Spectrum Analyzer"
              >
                FFT
              </button>
            )}

            {/* Snapshot PNG Export */}
            <button
              onClick={handleCaptureSnapshot}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 border border-white/10 transition-colors text-[10px] sm:text-xs font-bold"
              title="Capture Oscilloscope PNG"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>PNG</span>
            </button>
          </div>
        </div>

        {/* Live Canvas Element (Oscilloscope View) */}
        {activeView === 'oscilloscope' && (
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[500px]">
            <canvas
              ref={canvasRef}
              width={1280}
              height={600}
              className="w-full h-full block cursor-crosshair"
            />
          </div>
        )}

        {/* Bode Frequency Response Canvas View */}
        {activeView === 'bode' && (
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[500px]">
            <canvas
              ref={bodeCanvasRef}
              width={1280}
              height={600}
              className="w-full h-full block"
            />
          </div>
        )}

        {/* Cursor Slider Controls (Rendered when cursors are active) */}
        {cursorActive && activeView === 'oscilloscope' && (
          <div className="p-3 bg-slate-900/95 border-t border-white/10 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <div className="flex justify-between text-slate-400 mb-1 text-[11px]">
                <span>Cursor T1:</span>
                <span className="text-rose-400 font-bold">{cursorT1}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={cursorT1}
                onChange={(e) => setCursorT1(Number(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded bg-slate-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1 text-[11px]">
                <span>Cursor T2:</span>
                <span className="text-rose-400 font-bold">{cursorT2}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={cursorT2}
                onChange={(e) => setCursorT2(Number(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded bg-slate-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1 text-[11px]">
                <span>Cursor V1:</span>
                <span className="text-amber-400 font-bold">{cursorV1}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={cursorV1}
                onChange={(e) => setCursorV1(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 rounded bg-slate-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1 text-[11px]">
                <span>Cursor V2:</span>
                <span className="text-amber-400 font-bold">{cursorV2}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={cursorV2}
                onChange={(e) => setCursorV2(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 rounded bg-slate-800 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Scope Bottom Telemetry Strip (Mobile 2 cols, Tablet 3 cols, Desktop 6 cols) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-2.5 sm:p-3 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-white/10 text-xs font-mono">
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">Vpp Amplitude:</span>
            <span className="font-bold text-cyan-400 text-xs sm:text-sm">{calculations.vpp.toFixed(2)} V</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">RMS Voltage:</span>
            <span className="font-bold text-cyan-300 text-xs sm:text-sm">{calculations.vrms.toFixed(2)} Vrms</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">Signal Freq:</span>
            <span className="font-bold text-emerald-400 text-xs sm:text-sm">{frequency} Hz</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">Period (1/f):</span>
            <span className="font-bold text-slate-200 text-xs sm:text-sm">{calculations.periodMs.toFixed(2)} ms</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">
              {topology === '555-timer' 
                ? '555 Duty:' 
                : topology === 'rectifier' 
                ? 'Ripple:' 
                : topology === 'rlc-resonance' 
                ? 'Resonant f0:' 
                : 'Cutoff fc:'}
            </span>
            <span className="font-bold text-indigo-400 text-xs sm:text-sm truncate block">
              {topology === '555-timer' 
                ? `${calculations.dutyCycle555.toFixed(1)}%` 
                : topology === 'rectifier' 
                ? `${calculations.rippleFactor.toFixed(1)}%` 
                : topology === 'rlc-resonance'
                ? `${calculations.f0Rlc.toFixed(1)} Hz`
                : `${calculations.fc.toFixed(1)} Hz`}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">Phase (Δϕ):</span>
            <span className="font-bold text-amber-400 text-xs sm:text-sm">{calculations.phaseShiftDeg.toFixed(1)}°</span>
          </div>
        </div>
      </div>

      {/* Hardware Control Dashboard & Schematic Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-6 sm:mt-8">
        
        {/* Left: Interactive Analog Circuit Controls */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 gap-2">
            <h4 className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
              Analog Signal Generator &amp; Circuit Controls
            </h4>
            <span className="text-[10px] sm:text-[11px] font-mono text-sky-600 dark:text-cyan-400">GTU / IIT Bombay eSim Netlist</span>
          </div>

          {/* Row 1: Frequency & Amplitude Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-2 font-semibold">Input Waveform Type:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
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
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
            
            {/* If RC Filter: Show R and C */}
            {(topology === 'rc-lowpass' || topology === 'rc-highpass') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Resistor R (kΩ):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{resistorKohm} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={resistorKohm}
                    onChange={(e) => setResistorKohm(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Standard 1/4W Metal Film Resistor</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Capacitor C (μF):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{capacitorUf} μF</span>
                  </div>
                  <input
                    type="range"
                    min="0.005"
                    max="1.0"
                    step="0.005"
                    value={capacitorUf}
                    onChange={(e) => setCapacitorUf(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Ceramic / Mylar Decoupling Cap</span>
                </div>
              </div>
            )}

            {/* If RLC Resonance: Show R, L, and C */}
            {topology === 'rlc-resonance' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Damping R (kΩ):</span>
                    <span className="font-bold text-sky-600 dark:text-cyan-400">{resistorKohm} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={resistorKohm}
                    onChange={(e) => setResistorKohm(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Lower R = Higher Q Factor</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Inductor L (mH):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{inductorMh} mH</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={inductorMh}
                    onChange={(e) => setInductorMh(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Ferrite Core RF Inductor</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Capacitor C (μF):</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{capacitorUf} μF</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="1.0"
                    step="0.01"
                    value={capacitorUf}
                    onChange={(e) => setCapacitorUf(Number(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">f0 = {calculations.f0Rlc.toFixed(1)} Hz</span>
                </div>
              </div>
            )}

            {/* If Wien Bridge Oscillator: Timing R and C */}
            {topology === 'wien-bridge' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Bridge Resistor R (kΩ):</span>
                    <span className="font-bold text-sky-600 dark:text-cyan-400">{resistorKohm} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={resistorKohm}
                    onChange={(e) => setResistorKohm(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Matched lead-lag resistor</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Bridge Cap C (μF):</span>
                    <span className="font-bold text-sky-600 dark:text-cyan-400">{capacitorUf} μF</span>
                  </div>
                  <input
                    type="range"
                    min="0.005"
                    max="0.5"
                    step="0.005"
                    value={capacitorUf}
                    onChange={(e) => setCapacitorUf(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">f0 = 1/(2πRC) = {calculations.fc.toFixed(1)} Hz</span>
                </div>
              </div>
            )}

            {/* If Rectifier: Show Filter Capacitor & Load Resistor */}
            {topology === 'rectifier' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Smoothing Cap C (μF):</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{capacitorUf} μF</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10.0"
                    step="0.1"
                    value={capacitorUf}
                    onChange={(e) => setCapacitorUf(Number(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Reduces output voltage ripple</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Load Resistor R_L (kΩ):</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{resistorKohm} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={resistorKohm}
                    onChange={(e) => setResistorKohm(Number(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Simulates DC current draw</span>
                </div>
              </div>
            )}

            {/* If Op-Amp: Gain and Inverting Switch */}
            {topology === 'op-amp' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Op-Amp Gain (Rf / Rin):</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{opAmpGain.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="6.0"
                    step="0.2"
                    value={opAmpGain}
                    onChange={(e) => setOpAmpGain(Number(e.target.value))}
                    className="w-full accent-purple-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Values &gt; 3.0 clip at ±4.5V rails</span>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">Configuration:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpAmpInverting(true)}
                      className={`flex-1 py-1.5 sm:py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-colors border ${
                        isOpAmpInverting ? 'bg-purple-600 text-white border-purple-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/5'
                      }`}
                    >
                      Inverting (180°)
                    </button>
                    <button
                      onClick={() => setIsOpAmpInverting(false)}
                      className={`flex-1 py-1.5 sm:py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-colors border ${
                        !isOpAmpInverting ? 'bg-purple-600 text-white border-purple-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/5'
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
                    <span className="text-slate-600 dark:text-slate-400">Timing Ra (kΩ):</span>
                    <span className="font-bold text-sky-600 dark:text-cyan-400">{resistorKohm} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={resistorKohm}
                    onChange={(e) => setResistorKohm(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Controls charging time</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Discharge Rb (kΩ):</span>
                    <span className="font-bold text-sky-600 dark:text-cyan-400">{resistorB555} kΩ</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={resistorB555}
                    onChange={(e) => setResistorB555(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Discharge time to pin 7</span>
                </div>
              </div>
            )}

            {/* If AM Modulator: Modulation Index */}
            {topology === 'am-mod' && (
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Modulation Index (m = Am/Ac):</span>
                  <span className={`font-bold ${modIndex > 1 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {(modIndex * 100).toFixed(0)}% {modIndex > 1 ? '(OVER-MOD!)' : '(NORMAL)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={modIndex}
                  onChange={(e) => setModIndex(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  AM broadcast requires m &le; 100% to avoid envelope distortion.
                </span>
              </div>
            )}

            {/* Oscilloscope Timebase & Voltage Division (Responsive Wrapping) */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-600 dark:text-slate-400 block mb-1.5">Timebase (ms/DIV):</span>
                <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {[0.2, 0.5, 1.0, 2.0, 5.0].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimebaseMs(t)}
                      className={`flex-1 min-w-[36px] py-1 rounded-lg text-[10px] font-bold border ${
                        timebaseMs === t ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/5'
                      }`}
                    >
                      {t}ms
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-600 dark:text-slate-400 block mb-1.5">Volts/Div (CH1 &amp; CH2):</span>
                <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {[0.5, 1.0, 2.0, 5.0].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVoltsPerDiv(v)}
                      className={`flex-1 min-w-[36px] py-1 rounded-lg text-[10px] font-bold border ${
                        voltsPerDiv === v ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/5'
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
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          
          {/* Schematic Box */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-3 sm:mb-4">
              <span className="text-xs font-mono font-bold text-sky-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
                Live Schematic &amp; Netlist
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">Ngspice Engine</span>
            </div>

            {/* Visual SVG Schematic Diagram (Scalable width, responsive centering) */}
            <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-center min-h-[150px] sm:min-h-[170px] overflow-hidden">
              {topology === 'rc-lowpass' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <line x1="20" y1="40" x2="70" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="20" cy="40" r="4" fill="#38bdf8" />
                  <text x="12" y="25" fill="#38bdf8" fontSize="10" fontFamily="monospace">Vin</text>
                  <rect x="70" y="32" width="50" height="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="82" y="44" fill="#38bdf8" fontSize="10" fontFamily="monospace">R={resistorKohm}k</text>
                  <line x1="120" y1="40" x2="190" y2="40" stroke="#34d399" strokeWidth="2.5" />
                  <circle cx="160" cy="40" r="4" fill="#34d399" />
                  <text x="195" y="44" fill="#34d399" fontSize="10" fontFamily="monospace">Vout</text>
                  <circle cx="230" cy="40" r="4" fill="#34d399" />
                  <line x1="160" y1="40" x2="160" y2="65" stroke="#34d399" strokeWidth="2" />
                  <line x1="145" y1="65" x2="175" y2="65" stroke="#34d399" strokeWidth="2" />
                  <line x1="145" y1="72" x2="175" y2="72" stroke="#34d399" strokeWidth="2" />
                  <line x1="160" y1="72" x2="160" y2="95" stroke="#94a3b8" strokeWidth="2" />
                  <text x="180" y="72" fill="#34d399" fontSize="10" fontFamily="monospace">C={capacitorUf}μF</text>
                  <line x1="150" y1="95" x2="170" y2="95" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="154" y1="100" x2="166" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="158" y1="105" x2="162" y2="105" stroke="#94a3b8" strokeWidth="1" />
                </svg>
              )}

              {topology === 'rc-highpass' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <line x1="20" y1="40" x2="70" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
                  <circle cx="20" cy="40" r="4" fill="#38bdf8" />
                  <text x="12" y="25" fill="#38bdf8" fontSize="10" fontFamily="monospace">Vin</text>
                  <line x1="70" y1="28" x2="70" y2="52" stroke="#38bdf8" strokeWidth="2.5" />
                  <line x1="77" y1="28" x2="77" y2="52" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="65" y="20" fill="#38bdf8" fontSize="10" fontFamily="monospace">C={capacitorUf}μF</text>
                  <line x1="77" y1="40" x2="160" y2="40" stroke="#34d399" strokeWidth="2.5" />
                  <circle cx="160" cy="40" r="4" fill="#34d399" />
                  <line x1="160" y1="40" x2="230" y2="40" stroke="#34d399" strokeWidth="2.5" />
                  <text x="235" y="44" fill="#34d399" fontSize="10" fontFamily="monospace">Vout</text>
                  <circle cx="230" cy="40" r="4" fill="#34d399" />
                  <line x1="160" y1="40" x2="160" y2="58" stroke="#34d399" strokeWidth="2" />
                  <rect x="152" y="58" width="16" height="35" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                  <text x="175" y="78" fill="#34d399" fontSize="10" fontFamily="monospace">R={resistorKohm}k</text>
                  <line x1="160" y1="93" x2="160" y2="102" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="150" y1="102" x2="170" y2="102" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="154" y1="107" x2="166" y2="107" stroke="#94a3b8" strokeWidth="1.5" />
                </svg>
              )}

              {topology === 'rlc-resonance' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <line x1="15" y1="40" x2="55" y2="40" stroke="#38bdf8" strokeWidth="2" />
                  <text x="10" y="25" fill="#38bdf8" fontSize="9" fontFamily="monospace">Vin</text>
                  <rect x="55" y="32" width="35" height="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="60" y="44" fill="#38bdf8" fontSize="8" fontFamily="monospace">R={resistorKohm}k</text>
                  <line x1="90" y1="40" x2="115" y2="40" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 115 40 Q 125 25, 135 40 Q 145 25, 155 40 Q 165 25, 175 40" stroke="#34d399" strokeWidth="2" fill="none" />
                  <text x="130" y="20" fill="#34d399" fontSize="8" fontFamily="monospace">L={inductorMh}mH</text>
                  <line x1="175" y1="40" x2="200" y2="40" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="200" y1="30" x2="200" y2="50" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="206" y1="30" x2="206" y2="50" stroke="#fbbf24" strokeWidth="2" />
                  <text x="195" y="20" fill="#fbbf24" fontSize="8" fontFamily="monospace">C={capacitorUf}μ</text>
                  <line x1="206" y1="40" x2="255" y2="40" stroke="#34d399" strokeWidth="2" />
                  <text x="240" y="30" fill="#34d399" fontSize="9" fontFamily="monospace">Vout</text>
                  <line x1="230" y1="40" x2="230" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="220" y1="85" x2="240" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
                </svg>
              )}

              {topology === 'wien-bridge' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <polygon points="120,30 120,90 190,60" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="130" y="48" fill="#38bdf8" fontSize="11" fontFamily="monospace">-</text>
                  <text x="130" y="78" fill="#38bdf8" fontSize="11" fontFamily="monospace">+</text>
                  <line x1="190" y1="60" x2="250" y2="60" stroke="#34d399" strokeWidth="2.5" />
                  <text x="220" y="52" fill="#34d399" fontSize="9" fontFamily="monospace">Sine Vout</text>
                  <line x1="30" y1="75" x2="120" y2="75" stroke="#fbbf24" strokeWidth="2" />
                  <text x="25" y="70" fill="#fbbf24" fontSize="8" fontFamily="monospace">Wien RC Loop</text>
                </svg>
              )}

              {topology === 'rectifier' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <polygon points="100,60 130,30 160,60 130,90" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                  <text x="115" y="64" fill="#fbbf24" fontSize="10" fontFamily="monospace">4x Diodes</text>
                  <line x1="20" y1="45" x2="100" y2="60" stroke="#38bdf8" strokeWidth="2" />
                  <text x="15" y="40" fill="#38bdf8" fontSize="10" fontFamily="monospace">AC IN</text>
                  <line x1="160" y1="60" x2="230" y2="60" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="235" y="64" fill="#fbbf24" fontSize="10" fontFamily="monospace">+DC</text>
                  <line x1="195" y1="60" x2="195" y2="78" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="185" y1="78" x2="205" y2="78" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="185" y1="84" x2="205" y2="84" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="195" y1="84" x2="195" y2="100" stroke="#94a3b8" strokeWidth="2" />
                  <text x="180" y="112" fill="#94a3b8" fontSize="8" fontFamily="monospace">C={capacitorUf}μF</text>
                </svg>
              )}

              {topology === 'op-amp' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <polygon points="110,25 110,95 190,60" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                  <text x="120" y="45" fill="#a855f7" fontSize="12" fontFamily="monospace">-</text>
                  <text x="120" y="80" fill="#a855f7" fontSize="12" fontFamily="monospace">+</text>
                  <text x="135" y="64" fill="#a855f7" fontSize="9" fontFamily="monospace">Av={opAmpGain}x</text>
                  <line x1="30" y1="40" x2="110" y2="40" stroke="#38bdf8" strokeWidth="2" />
                  <text x="20" y="35" fill="#38bdf8" fontSize="10" fontFamily="monospace">Vin</text>
                  <line x1="190" y1="60" x2="250" y2="60" stroke="#a855f7" strokeWidth="2.5" />
                  <text x="240" y="50" fill="#a855f7" fontSize="10" fontFamily="monospace">Vout</text>
                  <line x1="150" y1="18" x2="150" y2="18" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="135" y="15" fill="#a855f7" fontSize="8" fontFamily="monospace">Rf={opAmpGain * 10}k</text>
                </svg>
              )}

              {topology === '555-timer' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <rect x="90" y="25" width="100" height="70" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                  <circle cx="102" cy="35" r="3" fill="#06b6d4" />
                  <text x="110" y="62" fill="#06b6d4" fontSize="11" fontFamily="monospace" fontWeight="bold">NE555</text>
                  <text x="105" y="78" fill="#94a3b8" fontSize="8" fontFamily="monospace">Astable PWM</text>
                  <line x1="40" y1="45" x2="90" y2="45" stroke="#38bdf8" strokeWidth="2" />
                  <text x="35" y="40" fill="#38bdf8" fontSize="9" fontFamily="monospace">Vcc</text>
                  <line x1="190" y1="60" x2="250" y2="60" stroke="#06b6d4" strokeWidth="2.5" />
                  <text x="210" y="52" fill="#06b6d4" fontSize="9" fontFamily="monospace">Pin 3 OUT</text>
                </svg>
              )}

              {topology === 'am-mod' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <circle cx="140" cy="60" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="126" y1="46" x2="154" y2="74" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="126" y1="74" x2="154" y2="46" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="30" y1="40" x2="114" y2="52" stroke="#34d399" strokeWidth="2" />
                  <text x="25" y="32" fill="#34d399" fontSize="9" fontFamily="monospace">m(t) Baseband</text>
                  <line x1="30" y1="80" x2="114" y2="68" stroke="#38bdf8" strokeWidth="2" />
                  <text x="25" y="94" fill="#38bdf8" fontSize="9" fontFamily="monospace">c(t) RF Carrier</text>
                  <line x1="168" y1="60" x2="250" y2="60" stroke="#fbbf24" strokeWidth="2.5" />
                  <text x="200" y="52" fill="#fbbf24" fontSize="9" fontFamily="monospace">s(t) AM Wave</text>
                </svg>
              )}
            </div>

            {/* Circuit Equations Description */}
            <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1.5">
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
              {topology === 'rlc-resonance' && (
                <>
                  <div className="text-cyan-700 dark:text-cyan-400 font-bold">Series RLC: f0 = 1/[2π√(LC)] = {calculations.f0Rlc.toFixed(1)} Hz</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Quality Factor Q = {calculations.qFactorRlc.toFixed(2)}. Bandwidth BW = {calculations.bandwidthRlc.toFixed(1)} Hz. Peak impedance at f0.
                  </div>
                </>
              )}
              {topology === 'wien-bridge' && (
                <>
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold">Wien Bridge Barkhausen: A·β = 1</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Oscillation f0 = 1/(2πRC) = {calculations.fc.toFixed(1)} Hz. Lead-lag network provides β = 1/3, Av = 3.
                  </div>
                </>
              )}
              {topology === 'rectifier' && (
                <>
                  <div className="text-amber-700 dark:text-amber-400 font-bold">Graetz Bridge + Capacitor Filter</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Peak DC = Vm - 2*Vd (1.4V drop). Ripple factor r = 1 / (4√3 * f * RL * C).
                  </div>
                </>
              )}
              {topology === 'op-amp' && (
                <>
                  <div className="text-purple-700 dark:text-purple-400 font-bold">Closed-Loop Gain: Av = -Rf / Rin</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Inverts signal by 180° with virtual ground. Clips symmetrically at ±4.5V rails.
                  </div>
                </>
              )}
              {topology === '555-timer' && (
                <>
                  <div className="text-sky-700 dark:text-cyan-400 font-bold">Frequency: f = 1.44 / [(Ra + 2Rb) * C]</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Duty cycle: D = (Ra + Rb) / (Ra + 2Rb). Cap charges between 1/3 and 2/3 Vcc.
                  </div>
                </>
              )}
              {topology === 'am-mod' && (
                <>
                  <div className="text-sky-700 dark:text-cyan-400 font-bold">AM Equation: s(t) = [1 + m*m(t)] * c(t)</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Creates upper (fc + fm) and lower (fc - fm) sidebands. Modulation index = m.
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Academic Relevance Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 dark:bg-gradient-to-br dark:from-indigo-950/60 dark:via-slate-900 dark:to-black border border-indigo-200 dark:border-indigo-500/20 text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold uppercase text-[11px]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>IIT Bombay Spoken Tutorial Methodology</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              This digital lab directly translates my academic internship with IIT Bombay on <strong className="text-slate-900 dark:text-white">eSim and CircuitJS</strong>. By modeling differential equations, Kirchhoff laws, and Fourier spectral harmonics, it bridges theoretical communication engineering with high-performance browser graphics.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
export default InteractiveSignalLab;
