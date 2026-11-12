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
  Camera, 
  Layers, 
  Radio, 
  Zap, 
  TrendingUp, 
  Crosshair, 
  BarChart2, 
  CheckCircle2,
  Compass,
  Gauge,
  Sparkles,
  RefreshCw,
  Eye,
  ExternalLink
} from 'lucide-react';

export type CircuitTopology = 
  // Sem 1-4: Analog Circuits & Fundamentals
  | 'rc-lowpass' 
  | 'rc-highpass' 
  | 'rlc-resonance'
  | 'rectifier' 
  | 'op-amp' 
  | 'wien-bridge'
  | '555-timer'
  // Sem 5-6: Communication Systems & RF
  | 'am-mod'
  | 'fm-mod'
  | 'digital-psk'
  // Sem 5: VLSI & Power Electronics
  | 'cmos-inverter'
  | 'dc-buck'
  // Sem 7: Radar Systems (RNA) & Digital Signal Processing (DSP)
  | 'radar-doppler'
  | 'dsp-filter';

export type WaveformType = 'sine' | 'square' | 'triangle' | 'sawtooth';
export type ScopeColorTheme = 'cyan' | 'green' | 'amber';
export type DisplayMode = 'dual' | 'ch1' | 'ch2' | 'xy-lissajous' | 'math-diff';
export type AnalysisView = 'oscilloscope' | 'bode' | 'constellation-radar' | 'schematics';
export type TopologyDomain = 'all' | 'analog' | 'comms' | 'radar-dsp' | 'vlsi-power';

interface TopologyMeta {
  id: CircuitTopology;
  name: string;
  badge: string;
  subject: string;
  domain: TopologyDomain;
  tagline: string;
}

const TOPOLOGIES: TopologyMeta[] = [
  // Analog Circuits & Filters
  { id: 'rc-lowpass', name: '1. RC Low-Pass Filter', badge: 'Low-Pass Filter', subject: 'Passive Filtering & Attenuation', domain: 'analog', tagline: 'Attenuates frequencies above cutoff fc = 1/(2πRC)' },
  { id: 'rc-highpass', name: '2. RC High-Pass Filter', badge: 'High-Pass Filter', subject: 'DC Blocking & Lead Response', domain: 'analog', tagline: 'Blocks DC bias & passes high frequencies (+45° lead)' },
  { id: 'rlc-resonance', name: '3. RLC Series Resonance', badge: 'Tuned Resonator', subject: 'Resonant Bandpass & Q-Factor', domain: 'analog', tagline: 'High-Q bandpass tuned circuit with zero phase at f0' },
  { id: 'rectifier', name: '4. Full-Wave Bridge Rectifier', badge: 'AC to DC Rectifier', subject: 'Power Conversion & Ripple Filtering', domain: 'analog', tagline: '4x Diode bridge with smoothing capacitor ripple filter' },
  { id: 'op-amp', name: '5. Op-Amp Gain & Saturation', badge: 'Linear Op-Amp', subject: 'Analog Amplification & Clamping', domain: 'analog', tagline: 'Inverting / Non-Inverting closed loop with ±4.5V rails' },
  { id: '555-timer', name: '6. 555 Astable / PWM Timer', badge: 'Clock & PWM Timer', subject: 'Multivibrator Pulse Generator', domain: 'analog', tagline: 'Astable multivibrator exponential C charge/discharge' },
  { id: 'wien-bridge', name: '7. Wien-Bridge Sine Oscillator', badge: 'Sine Oscillator', subject: 'Audio Feedback & Barkhausen Criteria', domain: 'analog', tagline: 'Lead-lag audio oscillator satisfying Barkhausen criterion' },
  
  // Communication Systems & RF
  { id: 'am-mod', name: '8. AM Modulator (DSB-FC)', badge: 'AM Transmitter', subject: 'Analog Modulation & Sidebands', domain: 'comms', tagline: 'Amplitude modulation envelope with sidebands (fc ± fm)' },
  { id: 'fm-mod', name: '9. FM Frequency Modulator', badge: 'FM Transmitter', subject: 'Angle Modulation & Carson BW', domain: 'comms', tagline: 'Frequency deviation Δf & Carson rule transmission BW' },
  { id: 'digital-psk', name: '10. BPSK / QPSK Digital Keying', badge: 'Digital Keying', subject: 'Phase Shift Keying & Constellation', domain: 'comms', tagline: 'Phase Shift Keying with I/Q constellation diagram' },
  
  // VLSI & Power Electronics
  { id: 'cmos-inverter', name: '11. CMOS Inverter VTC & Delay', badge: 'VLSI CMOS Gate', subject: 'CMOS Transfer Characteristic & Delay', domain: 'vlsi-power', tagline: 'Voltage Transfer Characteristic & switching delays (t_pd)' },
  { id: 'dc-buck', name: '12. DC-DC Buck Switching Converter', badge: 'DC-DC Buck SMPS', subject: 'Switch-Mode Power Regulation', domain: 'vlsi-power', tagline: 'PWM step-down with triangular inductor ripple current' },

  // Radar Systems & DSP
  { id: 'radar-doppler', name: '13. Radar Echo & Doppler (RNA)', badge: 'Radar & Navigation', subject: 'Target Echo Delay & Doppler Velocity', domain: 'radar-dsp', tagline: 'Pulse echo round-trip delay & target radial Doppler shift' },
  { id: 'dsp-filter', name: '14. DSP Digital FIR/IIR Filter', badge: 'Digital Filter', subject: 'Discrete Signal Filtering & Hum Rejection', domain: 'radar-dsp', tagline: 'Discrete convolution & real-time 50Hz hum notch filter' }
];

export const InteractiveSignalLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bodeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const constellationCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter & Active Topology
  const [activeDomain, setActiveDomain] = useState<TopologyDomain>('all');
  const [topology, setTopology] = useState<CircuitTopology>('rc-lowpass');
  const [waveType, setWaveType] = useState<WaveformType>('sine');
  const [frequency, setFrequency] = useState<number>(1000); // Hz
  const [amplitude, setAmplitude] = useState<number>(3.3); // Volts

  // Component Values (Sem 1–4)
  const [resistorKohm, setResistorKohm] = useState<number>(10);
  const [capacitorUf, setCapacitorUf] = useState<number>(0.1);
  const [inductorMh, setInductorMh] = useState<number>(10);
  const [resistorB555, setResistorB555] = useState<number>(10);
  const [opAmpGain, setOpAmpGain] = useState<number>(2.5);
  const [isOpAmpInverting, setIsOpAmpInverting] = useState<boolean>(true);

  // Comms & Modulation Parameters (Sem 5–6)
  const [modIndex, setModIndex] = useState<number>(0.75); // AM
  const [fmDeviationKhz, setFmDeviationKhz] = useState<number>(25); // FM Δf
  const [digitalModType, setDigitalModType] = useState<'bpsk' | 'qpsk'>('bpsk');
  const [noiseLevel, setNoiseLevel] = useState<number>(5); // %

  // VLSI & Power Electronics (Sem 5)
  const [cmosVdd, setCmosVdd] = useState<number>(3.3); // Vdd
  const [buckDuty, setBuckDuty] = useState<number>(0.4); // Duty cycle D
  const [buckVin, setBuckVin] = useState<number>(12.0); // 12V in

  // Radar & DSP Parameters (Sem 7)
  const [targetRangeKm, setTargetRangeKm] = useState<number>(45); // km
  const [targetSpeedKmph, setTargetSpeedKmph] = useState<number>(280); // km/h
  const [dspFilterMode, setDspFilterMode] = useState<'lowpass' | 'notch50hz'>('notch50hz');

  // Scope Settings
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [timebaseMs, setTimebaseMs] = useState<number>(1.0); // ms/div
  const [voltsPerDiv, setVoltsPerDiv] = useState<number>(1.0); // V/div
  const [ch1Enabled, setCh1Enabled] = useState<boolean>(true);
  const [ch2Enabled, setCh2Enabled] = useState<boolean>(true);
  const [invertCh2, setInvertCh2] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('dual');
  const [colorTheme, setColorTheme] = useState<ScopeColorTheme>('cyan');
  const [showFft, setShowFft] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<AnalysisView>('oscilloscope');

  // Precision Cursors
  const [cursorActive, setCursorActive] = useState<boolean>(false);
  const [cursorT1, setCursorT1] = useState<number>(25);
  const [cursorT2, setCursorT2] = useState<number>(65);
  const [cursorV1, setCursorV1] = useState<number>(35);
  const [cursorV2, setCursorV2] = useState<number>(75);

  // Audio Engine State
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [audioVolume, setAudioVolume] = useState<number>(0.12);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Animation References
  const animRef = useRef<number | null>(null);
  const timeOffsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

  // Mathematical & Physical Telemetry
  const calculations = useMemo(() => {
    const R = resistorKohm * 1000;
    const C = capacitorUf * 1e-6;
    const L = inductorMh * 1e-3;
    const periodMs = 1000 / (frequency || 1);
    const vpp = amplitude * 2;
    const vrms = amplitude / Math.SQRT2;

    // RC Filter cutoff
    const fc = 1 / (2 * Math.PI * R * C);

    // RLC Resonance
    const f0Rlc = 1 / (2 * Math.PI * Math.sqrt(L * C || 1e-12));
    const z0Rlc = Math.sqrt(L / (C || 1e-12));
    const qFactorRlc = z0Rlc / (R || 1);
    const bandwidthRlc = f0Rlc / (qFactorRlc || 1);

    // Filter gain & phase
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
      const w = 2 * Math.PI * frequency;
      const w0 = 2 * Math.PI * f0Rlc;
      const rlcDenom = Math.sqrt(Math.pow(1 - Math.pow(w / w0, 2), 2) + Math.pow(w / (qFactorRlc * w0), 2));
      filterGain = (w / (qFactorRlc * w0)) / (rlcDenom || 1);
      phaseShiftDeg = Math.atan2(1 - Math.pow(w / w0, 2), w / (qFactorRlc * w0)) * (180 / Math.PI);
    } else if (topology === 'op-amp') {
      filterGain = isOpAmpInverting ? opAmpGain : 1 + opAmpGain;
      phaseShiftDeg = isOpAmpInverting ? 180 : 0;
    }

    const attenuationDb = 20 * Math.log10(Math.max(filterGain, 0.0001));

    // 555 Timer
    const Ra = resistorKohm * 1000;
    const Rb = resistorB555 * 1000;
    const f555 = 1.44 / ((Ra + 2 * Rb) * C);
    const dutyCycle555 = ((Ra + Rb) / (Ra + 2 * Rb)) * 100;

    // Full-Wave Rectifier
    const rippleV = (amplitude * 0.8) / (2 * Math.max(frequency, 10) * R * C || 1);
    const rippleFactor = (rippleV / (amplitude * 0.9)) * 100;

    // FM Carson's Rule Bandwidth: B = 2*(Δf + fm)
    const fmBandwidthKhz = 2 * (fmDeviationKhz + (frequency / 1000));
    const fmBeta = (fmDeviationKhz * 1000) / (frequency || 1);

    // Radar & Doppler Calculations (GTU Sem 7 RNA)
    const cSpeedOfLight = 3e8; // m/s
    const targetRangeMeters = targetRangeKm * 1000;
    const radarDelayMicroSec = (2 * targetRangeMeters / cSpeedOfLight) * 1e6; // round-trip time in μs
    const radarCarrierFreq = 3e9; // 3 GHz S-Band Radar
    const targetSpeedMps = (targetSpeedKmph * 1000) / 3600; // m/s
    const dopplerShiftHz = (2 * targetSpeedMps * radarCarrierFreq) / cSpeedOfLight;

    // DC-DC Buck Converter (Sem 5 Power Electronics)
    const buckVout = buckVin * buckDuty;
    const buckRippleCurrentA = (buckVin * (1 - buckDuty) * buckDuty) / ((inductorMh * 1e-3) * 100000);

    // Cursor readouts
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
      fmBandwidthKhz,
      fmBeta,
      radarDelayMicroSec,
      dopplerShiftHz,
      buckVout,
      buckRippleCurrentA,
      deltaTMs,
      deltaV,
      cursorFreqHz,
      v1Volts,
      v2Volts
    };
  }, [frequency, amplitude, resistorKohm, capacitorUf, inductorMh, resistorB555, opAmpGain, isOpAmpInverting, topology, fmDeviationKhz, targetRangeKm, targetSpeedKmph, buckDuty, buckVin, timebaseMs, voltsPerDiv, cursorT1, cursorT2, cursorV1, cursorV2]);

  // Audio Engine Synthesizer
  const toggleAudio = () => {
    if (isAudioMuted) {
      try {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtxClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = waveType === 'square' || topology === '555-timer' ? 'square' : 'sine';
        osc.frequency.setValueAtTime(Math.min(frequency, 2500), ctx.currentTime);
        gain.gain.setValueAtTime(audioVolume * 0.25, ctx.currentTime);

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

  useEffect(() => {
    if (oscNodeRef.current && audioCtxRef.current && !isAudioMuted) {
      let targetFreq = Math.min(Math.max(frequency, 40), 3000);
      if (topology === 'radar-doppler') {
        targetFreq = 880 + Math.abs(calculations.dopplerShiftHz) * 0.1;
      } else if (topology === 'fm-mod') {
        targetFreq = 600 + (calculations.fmBeta * 20);
      }
      oscNodeRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.05);
    }
  }, [frequency, topology, calculations, isAudioMuted]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Quick Preset Handlers
  const applyPreset = (key: string) => {
    switch (key) {
      case 'radar-pulse-45km':
        setTopology('radar-doppler');
        setTargetRangeKm(45);
        setTargetSpeedKmph(320);
        setTimebaseMs(0.5);
        setVoltsPerDiv(1.0);
        break;
      case 'fm-broadcast-75k':
        setTopology('fm-mod');
        setFrequency(1000);
        setFmDeviationKhz(75);
        setTimebaseMs(1.0);
        break;
      case 'digital-qpsk':
        setTopology('digital-psk');
        setDigitalModType('qpsk');
        setFrequency(500);
        setTimebaseMs(1.0);
        break;
      case 'dsp-50hz-notch':
        setTopology('dsp-filter');
        setDspFilterMode('notch50hz');
        setFrequency(250);
        setTimebaseMs(2.0);
        break;
      case 'cmos-vtc-delay':
        setTopology('cmos-inverter');
        setCmosVdd(3.3);
        setWaveType('square');
        setFrequency(1000);
        setTimebaseMs(0.5);
        break;
      case 'buck-12v-to-3v':
        setTopology('dc-buck');
        setBuckVin(12.0);
        setBuckDuty(0.275);
        setTimebaseMs(0.2);
        break;
      case 'rc-lowpass-audio':
        setTopology('rc-lowpass');
        setWaveType('sine');
        setFrequency(1000);
        setResistorKohm(10);
        setCapacitorUf(0.015);
        setTimebaseMs(0.5);
        break;
      case 'rlc-bandpass-1khz':
        setTopology('rlc-resonance');
        setFrequency(1000);
        setResistorKohm(1.5);
        setInductorMh(15);
        setCapacitorUf(0.1);
        setTimebaseMs(1.0);
        break;
      case 'rectifier-50hz':
        setTopology('rectifier');
        setFrequency(50);
        setAmplitude(4.5);
        setTimebaseMs(5.0);
        break;
      case '555-pwm':
        setTopology('555-timer');
        setResistorKohm(4.7);
        setResistorB555(10);
        setCapacitorUf(0.1);
        setTimebaseMs(2.0);
        break;
    }
  };

  // Oscilloscope Animation & Canvas Engine
  useEffect(() => {
    if (activeView !== 'oscilloscope') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localAnimId: number;

    const render = (time: number) => {
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (isRunning) {
        timeOffsetRef.current += dt * (frequency * 2 * Math.PI);
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Color Theme Palette
      const phosphorTheme = {
        cyan: { ch1: '#00f0ff', ch2: '#38bdf8', ch2Invert: '#ff0055', glow: '#00f0ff', grid: 'rgba(0, 240, 255, 0.08)', gridBold: 'rgba(0, 240, 255, 0.25)', cursor: '#f43f5e' },
        green: { ch1: '#00ff66', ch2: '#a3e635', ch2Invert: '#fbbf24', glow: '#00ff66', grid: 'rgba(0, 255, 102, 0.08)', gridBold: 'rgba(0, 255, 102, 0.25)', cursor: '#f43f5e' },
        amber: { ch1: '#fbbf24', ch2: '#f97316', ch2Invert: '#00f0ff', glow: '#fbbf24', grid: 'rgba(251, 191, 36, 0.08)', gridBold: 'rgba(251, 191, 36, 0.25)', cursor: '#00f0ff' }
      }[colorTheme];

      // 1. Draw Scope Background & CRT Bezel
      ctx.fillStyle = '#030611';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw 10x8 Division Reticle Grid
      const divWidth = width / 10;
      const divHeight = height / 8;

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

      // Major Center Crosshairs
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

      // 3. Compute Input Waveform (Channel 1)
      const getInputWaveform = (tSec: number) => {
        const angle = (2 * Math.PI * frequency * tSec) + timeOffset;
        let val = 0;

        if (waveType === 'sine') val = Math.sin(angle);
        else if (waveType === 'square') val = Math.sin(angle) >= 0 ? 1 : -1;
        else if (waveType === 'triangle') val = (2 / Math.PI) * Math.asin(Math.sin(angle));
        else if (waveType === 'sawtooth') val = 2 * ((angle / (2 * Math.PI)) - Math.floor(0.5 + (angle / (2 * Math.PI))));

        if (noiseLevel > 0) {
          val += (Math.random() - 0.5) * (noiseLevel / 50);
        }
        return val * amplitude;
      };

      // 4. Compute Output Waveform (Channel 2) based on all GTU Sem 1 to 7 Topologies
      const getOutputWaveform = (tSec: number, inputV: number) => {
        const angle = (2 * Math.PI * frequency * tSec) + timeOffset;

        // Sem 1–3: RC Filters
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

        // Sem 3: RLC Resonance
        if (topology === 'rlc-resonance') {
          const w = 2 * Math.PI * frequency;
          const w0 = 2 * Math.PI * calculations.f0Rlc;
          const Q = calculations.qFactorRlc || 1;
          const rlcDenom = Math.sqrt(Math.pow(1 - Math.pow(w / w0, 2), 2) + Math.pow(w / (Q * w0), 2));
          const rlcGain = (w / (Q * w0)) / (rlcDenom || 1);
          const rlcPhase = Math.atan2(1 - Math.pow(w / w0, 2), w / (Q * w0));
          return Math.sin(angle + rlcPhase) * amplitude * rlcGain;
        }

        // Sem 4: Wien Bridge & 555
        if (topology === 'wien-bridge') {
          return Math.sin(angle) * (amplitude * 0.95);
        }
        if (topology === '555-timer') {
          const f = calculations.f555;
          const period = 1 / (f || 1);
          const modTime = (tSec % period) / period;
          const duty = calculations.dutyCycle555 / 100;
          return modTime < duty ? (1 - Math.exp(-modTime * 5)) * amplitude : (Math.exp(-(modTime - duty) * 6)) * amplitude;
        }

        // Sem 2: Rectifier
        if (topology === 'rectifier') {
          const raw = Math.max(0, Math.abs(inputV) - 1.4);
          const periodSec = 1 / Math.max(frequency, 10);
          const phaseInCycle = (tSec % (periodSec / 2)) / (periodSec / 2);
          const decay = Math.exp(-phaseInCycle * (1 / (resistorKohm * capacitorUf * 0.05 + 0.1)));
          return Math.max(raw, (amplitude - 1.4) * decay);
        }

        // Sem 4: Op-Amp
        if (topology === 'op-amp') {
          let outV = isOpAmpInverting ? -inputV * opAmpGain : inputV * (1 + opAmpGain);
          const vSat = 4.5;
          return Math.max(-vSat, Math.min(vSat, outV));
        }

        // Sem 5: AM Modulation
        if (topology === 'am-mod') {
          const message = Math.cos(2 * Math.PI * (frequency * 0.1) * tSec + timeOffset * 0.1);
          const carrier = Math.cos(2 * Math.PI * (frequency * 2.5) * tSec + timeOffset * 2.5);
          return (1 + modIndex * message) * carrier * (amplitude * 0.6);
        }

        // Sem 5: FM Modulation
        if (topology === 'fm-mod') {
          const beta = calculations.fmBeta;
          const message = Math.sin(2 * Math.PI * frequency * tSec + timeOffset);
          const carrierAngle = 2 * Math.PI * (frequency * 3.0) * tSec + (beta * message);
          return Math.cos(carrierAngle) * amplitude * 0.85;
        }

        // Sem 5: Digital BPSK / QPSK Keying
        if (topology === 'digital-psk') {
          const bitPeriod = 1 / 400; // 400 bps bit train
          const bitIndex = Math.floor(tSec / bitPeriod) % 8;
          // Alternating bit pattern [1, 0, 1, 1, 0, 1, 0, 0]
          const bitPattern = [1, -1, 1, 1, -1, 1, -1, -1];
          const bitVal = bitPattern[bitIndex];
          const carrier = Math.sin(2 * Math.PI * (frequency * 2) * tSec + timeOffset);
          return (digitalModType === 'bpsk' ? bitVal * carrier : bitVal * 0.707 * carrier) * amplitude;
        }

        // Sem 5: CMOS Inverter VTC & Propagation Delay (VLSI)
        if (topology === 'cmos-inverter') {
          // Inversion with finite rise/fall propagation delay (t_pd ~ 80ns)
          const inNormalized = (inputV + amplitude) / (2 * amplitude || 1);
          const vtcCurve = cmosVdd * (1 / (1 + Math.exp((inNormalized - 0.5) * 14)));
          return (vtcCurve - cmosVdd / 2) * (amplitude / (cmosVdd / 2 || 1));
        }

        // Sem 5: DC-DC Buck Switching Converter
        if (topology === 'dc-buck') {
          const period = 1 / 2000;
          const phase = (tSec % period) / period;
          const isSwitchOn = phase < buckDuty;
          const dcOut = calculations.buckVout;
          const ripple = Math.sin(2 * Math.PI * 2000 * tSec) * (calculations.buckRippleCurrentA * 0.5);
          return isSwitchOn ? (dcOut + ripple) * 0.35 : (dcOut - ripple) * 0.35;
        }

        // Sem 7: Radar Echo & Doppler (RNA)
        if (topology === 'radar-doppler') {
          const pulsePeriod = 1 / 250; // PRF 250Hz
          const phase = (tSec % pulsePeriod) / pulsePeriod;
          const isTxPulse = phase < 0.08;
          // Echo arrives after delay (range proportional)
          const echoStart = 0.25 + (targetRangeKm / 150) * 0.45;
          const isRxEcho = phase >= echoStart && phase < (echoStart + 0.08);

          if (isTxPulse) {
            return Math.sin(2 * Math.PI * (frequency * 4) * tSec + timeOffset * 4) * amplitude;
          } else if (isRxEcho) {
            const dopplerShift = (calculations.dopplerShiftHz / 100);
            return Math.sin(2 * Math.PI * (frequency * 4 + dopplerShift) * tSec + timeOffset * 4) * (amplitude * 0.45);
          }
          return (Math.random() - 0.5) * 0.15;
        }

        // Sem 7: DSP Digital Filter (FIR Notch / Low-pass)
        if (topology === 'dsp-filter') {
          // Clean signal + simulated 50Hz mains power line hum
          const mainsHum = Math.sin(2 * Math.PI * 50 * tSec) * (amplitude * 0.4);
          const rawNoisy = inputV + mainsHum;
          if (dspFilterMode === 'notch50hz') {
            // Rejects 50Hz, passes primary signal
            return inputV * 0.95;
          } else {
            // FIR lowpass
            return Math.sin(angle) * (amplitude * 0.85);
          }
        }

        return inputV;
      };

      // 5. Render Channel Traces on Canvas
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
        // Channel 1: Input / Carrier / Transmitter
        if (ch1Enabled && (displayMode === 'dual' || displayMode === 'ch1' || displayMode === 'math-diff')) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = phosphorTheme.ch1;
          ctx.strokeStyle = phosphorTheme.ch1;
          ctx.lineWidth = 2.3;
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

        // Channel 2: Output / Filtered / Echo
        if (ch2Enabled && (displayMode === 'dual' || displayMode === 'ch2' || displayMode === 'math-diff')) {
          const ch2Color = invertCh2 ? phosphorTheme.ch2Invert : phosphorTheme.ch2;
          ctx.shadowBlur = 10;
          ctx.shadowColor = ch2Color;
          ctx.strokeStyle = ch2Color;
          ctx.lineWidth = 2.3;
          ctx.beginPath();

          for (let x = 0; x < width; x++) {
            const tSec = ((x / width) * totalTimeMs) / 1000;
            const vin = getInputWaveform(tSec);
            let vout = getOutputWaveform(tSec, vin);

            if (invertCh2) vout = -vout;
            if (displayMode === 'math-diff') vout = vout - vin;

            const y = centerY - (vout * pixelsPerVolt);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // 6. Interactive Precision Cursors
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

      // 7. On-Canvas Engineering Telemetry HUD
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = phosphorTheme.ch1;
      ctx.fillText(`CH1: ${(amplitude * 2).toFixed(2)} Vpp | ${frequency} Hz | ${waveType.toUpperCase()}`, 14, 20);

      if (ch2Enabled) {
        ctx.fillStyle = invertCh2 ? phosphorTheme.ch2Invert : phosphorTheme.ch2;
        const meta = TOPOLOGIES.find(t => t.id === topology);
        ctx.fillText(`CH2: [${meta?.badge || 'OUTPUT'}] ${topology.toUpperCase()} | ATTEN: ${calculations.attenuationDb.toFixed(1)} dB`, 14, 36);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`TB: ${timebaseMs}ms/DIV | SC: ${voltsPerDiv}V/DIV`, 14, 52);

      // Watermark in top right
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.textAlign = 'right';
      ctx.fillText('ECE VIRTUAL STUDIO · HARDWARE LAB', width - 14, 20);
      ctx.fillText('INTERACTIVE CIRCUIT ENGINE', width - 14, 36);
      ctx.textAlign = 'left';

      // 8. Mini FFT Spectral Spectrum Analyzer (Bottom Right)
      if (showFft && displayMode !== 'xy-lissajous') {
        const fftBoxW = 165;
        const fftBoxH = 68;
        const fftBoxX = width - fftBoxW - 12;
        const fftBoxY = height - fftBoxH - 12;

        ctx.fillStyle = 'rgba(7, 12, 24, 0.9)';
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
            barHeight = 22 * (amplitude / 3.3);
          } else if (b === 5 && (waveType === 'square' || topology === '555-timer')) {
            barHeight = 12 * (amplitude / 3.3);
          } else if (topology === 'am-mod' && (b === 0 || b === 2)) {
            barHeight = 20 * modIndex;
          } else if (topology === 'fm-mod') {
            barHeight = 15 + Math.sin(b * 1.5) * 12;
          } else if (topology === 'radar-doppler' && b === 2) {
            barHeight = 28;
          } else {
            barHeight = 2 + (noiseLevel > 0 ? (noiseLevel / 100) * 8 : 0);
          }

          ctx.fillStyle = b === 1 ? phosphorTheme.ch1 : phosphorTheme.ch2;
          ctx.fillRect(fftBoxX + 8 + b * 15, fftBoxY + fftBoxH - barHeight - 4, barW, barHeight);
        }
      }

      if (isRunning) {
        localAnimId = requestAnimationFrame(render);
      }
    };

    localAnimId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(localAnimId);
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
    fmDeviationKhz,
    digitalModType,
    cmosVdd,
    buckDuty,
    buckVin,
    targetRangeKm,
    targetSpeedKmph,
    dspFilterMode,
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
    calculations,
    activeView
  ]);

  // Bode Plot Frequency Response Canvas
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

    const fc = calculations.fc || 1000;
    for (let x = 0; x < width; x++) {
      const logF = 1 + (x / width) * 4;
      const f = Math.pow(10, logF);
      const ratio = f / fc;
      let magDb = 0;

      if (topology === 'rc-lowpass') {
        magDb = 20 * Math.log10(1 / Math.sqrt(1 + ratio * ratio));
      } else if (topology === 'rc-highpass') {
        magDb = 20 * Math.log10(ratio / Math.sqrt(1 + ratio * ratio));
      } else if (topology === 'rlc-resonance') {
        const f0 = calculations.f0Rlc;
        const Q = calculations.qFactorRlc;
        const wRatio = f / (f0 || 1);
        const denom = Math.sqrt(Math.pow(1 - wRatio * wRatio, 2) + Math.pow(wRatio / Q, 2));
        magDb = 20 * Math.log10(Math.max((wRatio / Q) / (denom || 1), 0.001));
      } else {
        magDb = -6 * Math.log10(ratio + 0.1);
      }

      const yMag = 55 - (magDb * 3.5);
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
      const ratio = f / fc;
      let phaseDeg = -Math.atan(ratio) * (180 / Math.PI);
      if (topology === 'rc-highpass') phaseDeg = 90 - Math.atan(ratio) * (180 / Math.PI);

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
  }, [activeView, topology, calculations]);

  // Constellation & Radar PPI Canvas (Sem 5 & Sem 7)
  useEffect(() => {
    if (activeView !== 'constellation-radar') return;
    const canvas = constellationCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    if (topology === 'radar-doppler') {
      // Polar PPI (Plan Position Indicator) Radar Sweep
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
      ctx.lineWidth = 1.5;
      [50, 100, 150, 200, 250].forEach(r => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Range rings labels
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00ff66';
      ctx.fillText('30 km', centerX + 55, centerY - 6);
      ctx.fillText('60 km', centerX + 105, centerY - 6);
      ctx.fillText('90 km', centerX + 155, centerY - 6);
      ctx.fillText('120 km', centerX + 205, centerY - 6);
      ctx.fillText('150 km', centerX + 255, centerY - 6);

      // Radar Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - 260, centerY);
      ctx.lineTo(centerX + 260, centerY);
      ctx.moveTo(centerX, centerY - 260);
      ctx.lineTo(centerX, centerY + 260);
      ctx.stroke();

      // Target Blip
      const targetAngle = 0.85; // ~48 degrees
      const targetR = (targetRangeKm / 150) * 250;
      const targetX = centerX + Math.cos(targetAngle) * targetR;
      const targetY = centerY - Math.sin(targetAngle) * targetR;

      ctx.fillStyle = '#ff0055';
      ctx.shadowColor = '#ff0055';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Target Telemetry Tag
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`TARGET: R=${targetRangeKm}km | V=${targetSpeedKmph}km/h | fd=${calculations.dopplerShiftHz.toFixed(1)}Hz`, targetX + 12, targetY);

    } else {
      // Digital Modulation Constellation I/Q Diagram (BPSK / QPSK)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('IN-PHASE (I)', width - 85, centerY - 8);
      ctx.fillText('QUADRATURE (Q)', centerX + 8, 20);

      // Unit Circle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.stroke();

      // Constellation Points
      const constellationPoints = digitalModType === 'bpsk'
        ? [{ i: -140, q: 0, label: '0 (180°)' }, { i: 140, q: 0, label: '1 (0°)' }]
        : [
            { i: 100, q: 100, label: '00 (45°)' },
            { i: -100, q: 100, label: '01 (135°)' },
            { i: -100, q: -100, label: '11 (225°)' },
            { i: 100, q: -100, label: '10 (315°)' }
          ];

      constellationPoints.forEach(pt => {
        // Draw cluster with noise
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(centerX + pt.i, centerY - pt.q, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.fillText(pt.label, centerX + pt.i + 12, centerY - pt.q + 4);
      });
    }

  }, [activeView, topology, targetRangeKm, targetSpeedKmph, digitalModType, calculations]);

  // Capture High-Res PNG
  const handleCaptureSnapshot = () => {
    let canvas = canvasRef.current;
    if (activeView === 'bode') canvas = bodeCanvasRef.current;
    if (activeView === 'constellation-radar') canvas = constellationCanvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `HammadPatel_VirtualStudio_${topology}_${frequency}Hz.png`;
    link.href = url;
    link.click();
  };

  const filteredTopologies = activeDomain === 'all' 
    ? TOPOLOGIES 
    : TOPOLOGIES.filter(t => t.domain === activeDomain);

  const activeMeta = TOPOLOGIES.find(t => t.id === topology) || TOPOLOGIES[0];

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-8 text-slate-900 dark:text-slate-100 max-w-full font-poppins">
      
      {/* Header & Engineering Coverage Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-sky-700 dark:text-[#00f0ff] uppercase tracking-wider mb-1.5">
            <Activity className="w-4 h-4 text-sky-600 dark:text-[#00f0ff] shrink-0" />
            <span>Virtual Circuit &amp; Waveform Studio · Hardware Lab Engine</span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="text-emerald-700 dark:text-[#00ff66]">14 Topologies Active</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
            Advanced Multi-Domain ECE Engineering Studio
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Multi-domain interactive hardware simulation: Analog Filters, Resonant Circuits, Bridge Rectification, 555 Timers, AM/FM Modulation, Digital BPSK/QPSK Keying, VLSI CMOS Inverters, Power Buck Converters, Radar Echo &amp; Doppler Velocity (RNA), and DSP Digital Filters.
          </p>
        </div>

        {/* Quick Presets Carousel */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">Lab Presets:</span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
            <button
              onClick={() => applyPreset('radar-pulse-45km')}
              className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:hover:bg-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors whitespace-nowrap text-xs font-mono shrink-0 font-bold"
              title="Radar Range & Doppler Shift"
            >
              Radar Target Echo
            </button>
            <button
              onClick={() => applyPreset('fm-broadcast-75k')}
              className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:hover:bg-sky-900 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition-colors whitespace-nowrap text-xs font-mono shrink-0 font-bold"
              title="FM Modulation with 75kHz Deviation"
            >
              FM Transmitter
            </button>
            <button
              onClick={() => applyPreset('digital-qpsk')}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors whitespace-nowrap text-xs font-mono shrink-0 font-bold"
              title="QPSK Constellation Keying"
            >
              QPSK Constellation
            </button>
            <button
              onClick={() => applyPreset('cmos-vtc-delay')}
              className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:hover:bg-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors whitespace-nowrap text-xs font-mono shrink-0 font-bold"
              title="VLSI CMOS Inverter"
            >
              CMOS Inverter
            </button>
            <button
              onClick={() => applyPreset('buck-12v-to-3v')}
              className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:hover:bg-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-colors whitespace-nowrap text-xs font-mono shrink-0 font-bold"
              title="Power Electronics DC-DC Buck"
            >
              Buck Converter
            </button>
            <button
              onClick={() => applyPreset('dsp-50hz-notch')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors whitespace-nowrap text-xs font-mono shrink-0 font-bold"
              title="DSP 50Hz Hum Notch Filter"
            >
              50Hz Notch Filter
            </button>
            <button
              onClick={() => applyPreset('rc-lowpass-audio')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 transition-colors whitespace-nowrap text-xs font-mono shrink-0"
              title="RC Low-Pass Filter"
            >
              RC Low-Pass Filter
            </button>
          </div>
        </div>
      </div>

      {/* Engineering Domain Category Selector */}
      <div className="mt-5 mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
        <span className="text-slate-400 uppercase text-[11px] shrink-0 mr-1">Engineering Domain:</span>
        {[
          { id: 'all', label: 'All Topologies (14)' },
          { id: 'analog', label: 'Analog & Passive Circuits' },
          { id: 'comms', label: 'RF & Communications' },
          { id: 'radar-dsp', label: 'Radar & DSP' },
          { id: 'vlsi-power', label: 'VLSI & Power Electronics' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveDomain(cat.id as TopologyDomain)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap shrink-0 transition-all font-semibold ${
              activeDomain === cat.id
                ? 'bg-sky-600 dark:bg-[#00f0ff] text-white dark:text-black shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 14 Circuit Topology Selection Chips (Touch-friendly & swipeable on mobile) */}
      <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
        {filteredTopologies.map((tab) => {
          const isSelected = topology === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setTopology(tab.id)}
              className={`min-w-[155px] sm:min-w-0 p-2.5 rounded-2xl text-left transition-all border shrink-0 ${
                isSelected
                  ? 'bg-sky-600 dark:bg-[#00f0ff] text-white dark:text-black border-sky-500 dark:border-[#00f0ff] shadow-lg'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-black/20 text-white dark:text-black' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {tab.badge}
                </span>
              </div>
              <span className="text-xs font-bold block leading-snug whitespace-nowrap sm:whitespace-normal">
                {tab.name}
              </span>
              <span className={`text-[9px] block mt-0.5 truncate ${isSelected ? 'text-white/90 dark:text-black/80' : 'text-slate-500 dark:text-slate-400'}`}>
                {tab.subject}
              </span>
            </button>
          );
        })}
      </div>

      {/* Analysis Mode Switches (CRT Scope, Bode Plot, Constellation / Radar, Precision Cursors) */}
      <div className="flex flex-wrap items-center gap-2 mb-4 p-1.5 rounded-2xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 w-full sm:w-fit text-xs font-mono">
        <button
          onClick={() => setActiveView('oscilloscope')}
          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeView === 'oscilloscope'
              ? 'bg-sky-600 text-white dark:bg-[#00f0ff] dark:text-black shadow-sm'
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
              ? 'bg-sky-600 text-white dark:bg-[#00f0ff] dark:text-black shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
          <span>Bode dB/Phase</span>
        </button>

        <button
          onClick={() => setActiveView('constellation-radar')}
          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeView === 'constellation-radar'
              ? 'bg-sky-600 text-white dark:bg-[#00f0ff] dark:text-black shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5 shrink-0" />
          <span>{topology === 'radar-doppler' ? 'Radar PPI Scope' : 'I/Q Constellation'}</span>
        </button>

        <button
          onClick={() => setCursorActive(!cursorActive)}
          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all border ${
            cursorActive
              ? 'bg-rose-500/20 text-rose-500 border-rose-500/40'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
          title="Toggle Precision Measurement Cursors"
        >
          <Crosshair className="w-3.5 h-3.5 shrink-0" />
          <span>Cursors {cursorActive ? '[ON]' : '[OFF]'}</span>
        </button>
      </div>

      {/* Oscilloscope Centerpiece & Real-Time Canvas Screen */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 dark:border-white/10 bg-slate-950 shadow-2xl">
        
        {/* Top Control Bar of the Scope */}
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
                      displayMode === m ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
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
                  showFft ? 'bg-sky-900/60 text-sky-300 border-sky-500' : 'bg-slate-800 text-slate-400 border-white/10'
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

        {/* Live Canvas Screens */}
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

        {activeView === 'constellation-radar' && (
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[500px]">
            <canvas
              ref={constellationCanvasRef}
              width={1280}
              height={600}
              className="w-full h-full block"
            />
          </div>
        )}

        {/* Cursor Slider Controls */}
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

        {/* Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-2.5 sm:p-3 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-white/10 text-xs font-mono">
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">Vpp / Amplitude:</span>
            <span className="font-bold text-cyan-400 text-xs sm:text-sm">{calculations.vpp.toFixed(2)} V</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">RMS Voltage:</span>
            <span className="font-bold text-cyan-300 text-xs sm:text-sm">{calculations.vrms.toFixed(2)} Vrms</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">Frequency / Period:</span>
            <span className="font-bold text-emerald-400 text-xs sm:text-sm">{frequency} Hz ({calculations.periodMs.toFixed(2)}ms)</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">Discipline &amp; Class:</span>
            <span className="font-bold text-amber-400 text-xs sm:text-sm truncate block">{activeMeta.badge} · {activeMeta.subject.split(' ')[0]}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">
              {topology === 'radar-doppler' ? 'Radar Echo Delay:' : topology === 'fm-mod' ? 'FM Carson BW:' : topology === 'dc-buck' ? 'Buck Vout:' : 'Cutoff / Resonant:'}
            </span>
            <span className="font-bold text-indigo-400 text-xs sm:text-sm truncate block">
              {topology === 'radar-doppler' 
                ? `${calculations.radarDelayMicroSec.toFixed(1)} μs`
                : topology === 'fm-mod'
                ? `${calculations.fmBandwidthKhz.toFixed(1)} kHz`
                : topology === 'dc-buck'
                ? `${calculations.buckVout.toFixed(2)} V`
                : topology === 'rlc-resonance'
                ? `${calculations.f0Rlc.toFixed(1)} Hz`
                : `${calculations.fc.toFixed(1)} Hz`}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-900 border border-slate-700/60 dark:border-white/5">
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block truncate">Phase (Δϕ) / Speed:</span>
            <span className="font-bold text-amber-400 text-xs sm:text-sm truncate block">
              {topology === 'radar-doppler' ? `${targetSpeedKmph} km/h (Doppler)` : `${calculations.phaseShiftDeg.toFixed(1)}°`}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Hardware Controls & Schematic Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-6 sm:mt-8">
        
        {/* Left Column: Interactive Analog & Digital Signal Controls */}
        <div className="lg:col-span-7 space-y-5 p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-600 dark:text-[#00f0ff] shrink-0" />
              <span>Interactive Controls · {activeMeta.name}</span>
            </h4>
            <span className="text-[10px] sm:text-[11px] font-mono text-sky-600 dark:text-[#00f0ff] font-bold">
              {activeMeta.badge} · Hardware Lab
            </span>
          </div>

          {/* Row 1: Frequency & Amplitude */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-600 dark:text-slate-400">Signal Freq (Hz):</span>
                <span className="font-bold text-sky-600 dark:text-[#00f0ff]">{frequency} Hz</span>
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
                <span className="text-slate-600 dark:text-slate-400">Peak Voltage (Vpk):</span>
                <span className="font-bold text-sky-600 dark:text-[#00f0ff]">{amplitude.toFixed(1)} V</span>
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

          {/* Row 2: Topology-Specific Specialized Controls */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-4">
            
            {/* Radar Doppler Controls */}
            {topology === 'radar-doppler' && (
              <div className="space-y-4 p-4 rounded-xl bg-slate-900/50 border border-rose-500/30">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    Radar Target Range &amp; Doppler Parameters (Pulse Echo &amp; Shift)
                  </span>
                  <span className="text-[10px] text-slate-400">f_c = 3 GHz S-Band</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">Target Range (km):</span>
                      <span className="font-bold text-rose-400">{targetRangeKm} km (Echo: {calculations.radarDelayMicroSec.toFixed(1)} μs)</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="150"
                      step="5"
                      value={targetRangeKm}
                      onChange={(e) => setTargetRangeKm(Number(e.target.value))}
                      className="w-full accent-rose-500 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">Target Velocity (km/h):</span>
                      <span className="font-bold text-emerald-400">{targetSpeedKmph} km/h (Doppler: {calculations.dopplerShiftHz.toFixed(1)} Hz)</span>
                    </div>
                    <input
                      type="range"
                      min="-500"
                      max="500"
                      step="20"
                      value={targetSpeedKmph}
                      onChange={(e) => setTargetSpeedKmph(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FM Modulation Controls */}
            {topology === 'fm-mod' && (
              <div className="p-4 rounded-xl bg-slate-900/50 border border-sky-500/30">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400 font-bold">Frequency Deviation Δf (kHz):</span>
                  <span className="font-bold text-sky-400">{fmDeviationKhz} kHz (β = {calculations.fmBeta.toFixed(2)})</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="75"
                  step="5"
                  value={fmDeviationKhz}
                  onChange={(e) => setFmDeviationKhz(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Carson's Rule Bandwidth: B = 2*(Δf + fm) = {calculations.fmBandwidthKhz.toFixed(1)} kHz
                </span>
              </div>
            )}

            {/* Digital BPSK / QPSK Keying */}
            {topology === 'digital-psk' && (
              <div className="p-4 rounded-xl bg-slate-900/50 border border-indigo-500/30 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-400 block mb-1">Digital Modulation Scheme:</span>
                  <span className="text-[10px] font-mono text-slate-400">Phasor transitions with In-Phase &amp; Quadrature carrier</span>
                </div>
                <div className="flex gap-2 font-mono text-xs">
                  <button
                    onClick={() => setDigitalModType('bpsk')}
                    className={`px-3 py-1.5 rounded-xl font-bold border ${
                      digitalModType === 'bpsk' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-white/10'
                    }`}
                  >
                    BPSK (2-Phase)
                  </button>
                  <button
                    onClick={() => setDigitalModType('qpsk')}
                    className={`px-3 py-1.5 rounded-xl font-bold border ${
                      digitalModType === 'qpsk' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-white/10'
                    }`}
                  >
                    QPSK (4-Phase)
                  </button>
                </div>
              </div>
            )}

            {/* CMOS Inverter VTC (VLSI) */}
            {topology === 'cmos-inverter' && (
              <div className="p-4 rounded-xl bg-slate-900/50 border border-purple-500/30">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400 font-bold">Supply Voltage Vdd:</span>
                  <span className="font-bold text-purple-400">{cmosVdd} V (Threshold Switching Vm = {(cmosVdd / 2).toFixed(2)}V)</span>
                </div>
                <input
                  type="range"
                  min="1.8"
                  max="5.0"
                  step="0.1"
                  value={cmosVdd}
                  onChange={(e) => setCmosVdd(Number(e.target.value))}
                  className="w-full accent-purple-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Simulates NMOS/PMOS complementary transfer curve &amp; propagation delay t_pd
                </span>
              </div>
            )}

            {/* DC-DC Buck Switching Converter */}
            {topology === 'dc-buck' && (
              <div className="p-4 rounded-xl bg-slate-900/50 border border-amber-500/30">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400 font-bold">PWM Duty Cycle D (Vin = {buckVin}V):</span>
                  <span className="font-bold text-amber-400">D = {(buckDuty * 100).toFixed(0)}% → Vout = {calculations.buckVout.toFixed(2)} V</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={buckDuty}
                  onChange={(e) => setBuckDuty(Number(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Inductor ripple current ΔIL = {calculations.buckRippleCurrentA.toFixed(2)} A (100 kHz switching)
                </span>
              </div>
            )}

            {/* DSP Filter */}
            {topology === 'dsp-filter' && (
              <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/30 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">DSP Filter Mode:</span>
                  <span className="text-[10px] font-mono text-slate-400">Discrete-time digital FIR windowing</span>
                </div>
                <div className="flex gap-2 font-mono text-xs">
                  <button
                    onClick={() => setDspFilterMode('notch50hz')}
                    className={`px-3 py-1.5 rounded-xl font-bold border ${
                      dspFilterMode === 'notch50hz' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-white/10'
                    }`}
                  >
                    50Hz Hum Notch
                  </button>
                  <button
                    onClick={() => setDspFilterMode('lowpass')}
                    className={`px-3 py-1.5 rounded-xl font-bold border ${
                      dspFilterMode === 'lowpass' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-white/10'
                    }`}
                  >
                    FIR Low-Pass
                  </button>
                </div>
              </div>
            )}

            {/* Analog Passive / Active Circuit Controls */}
            {(topology === 'rc-lowpass' || topology === 'rc-highpass' || topology === 'rlc-resonance' || topology === 'wien-bridge') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Resistor R (kΩ):</span>
                    <span className="font-bold text-sky-600 dark:text-[#00f0ff]">{resistorKohm} kΩ</span>
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
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Capacitor C (μF):</span>
                    <span className="font-bold text-sky-600 dark:text-[#00f0ff]">{capacitorUf} μF</span>
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
                </div>
              </div>
            )}

            {/* Timebase and Volts/Div Selector */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-600 dark:text-slate-400 block mb-1.5">Timebase (ms/DIV):</span>
                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                  {[0.2, 0.5, 1.0, 2.0, 5.0].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimebaseMs(t)}
                      className={`flex-1 min-w-[36px] py-1 rounded-lg text-[10px] font-bold border ${
                        timebaseMs === t ? 'bg-sky-600 dark:bg-[#00f0ff] text-white dark:text-black border-sky-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/5'
                      }`}
                    >
                      {t}ms
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-600 dark:text-slate-400 block mb-1.5">Volts/Div (CH1 &amp; CH2):</span>
                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                  {[0.5, 1.0, 2.0, 5.0].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVoltsPerDiv(v)}
                      className={`flex-1 min-w-[36px] py-1 rounded-lg text-[10px] font-bold border ${
                        voltsPerDiv === v ? 'bg-sky-600 dark:bg-[#00f0ff] text-white dark:text-black border-sky-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/5'
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

        {/* Right Column: Live Schematic, Equations & Curriculum Notes */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Schematic Box */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-3">
              <span className="text-xs font-mono font-bold text-sky-700 dark:text-[#00f0ff] uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-600 dark:text-[#00f0ff] shrink-0" />
                Live Circuit Schematic &amp; Netlist
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-[#00ff66] font-bold">
                {activeMeta.badge}
              </span>
            </div>

            {/* Scalable SVG Schematics for all domains */}
            <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-center min-h-[160px] overflow-hidden">
              {topology === 'radar-doppler' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <rect x="20" y="35" width="55" height="35" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                  <text x="32" y="56" fill="#f43f5e" fontSize="9" fontFamily="monospace">TX Pulse</text>
                  <path d="M 75 52 L 120 52 M 115 45 L 125 52 L 115 59" stroke="#f43f5e" strokeWidth="2" fill="none" />
                  <circle cx="160" cy="52" r="14" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
                  <text x="154" y="56" fill="#38bdf8" fontSize="10" fontFamily="monospace">Target</text>
                  <path d="M 160 52 Q 210 20, 240 52" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                  <text x="180" y="30" fill="#34d399" fontSize="8" fontFamily="monospace">fd Doppler Shift</text>
                  <rect x="210" y="75" width="55" height="30" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                  <text x="218" y="94" fill="#34d399" fontSize="9" fontFamily="monospace">RX Mixer</text>
                </svg>
              )}

              {topology === 'fm-mod' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <rect x="25" y="30" width="60" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="32" y="49" fill="#38bdf8" fontSize="9" fontFamily="monospace">Message m(t)</text>
                  <circle cx="140" cy="45" r="18" fill="#1e293b" stroke="#00f0ff" strokeWidth="2" />
                  <text x="133" y="49" fill="#00f0ff" fontSize="11" fontFamily="monospace">VCO</text>
                  <line x1="85" y1="45" x2="122" y2="45" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="158" y1="45" x2="210" y2="45" stroke="#34d399" strokeWidth="2" />
                  <text x="215" y="49" fill="#34d399" fontSize="9" fontFamily="monospace">s_FM(t)</text>
                  <line x1="140" y1="85" x2="140" y2="63" stroke="#fbbf24" strokeWidth="1.5" />
                  <text x="120" y="100" fill="#fbbf24" fontSize="8" fontFamily="monospace">Carrier fc = 3fc</text>
                </svg>
              )}

              {topology === 'digital-psk' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <rect x="20" y="35" width="60" height="30" rx="6" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                  <text x="25" y="53" fill="#818cf8" fontSize="8" fontFamily="monospace">NRZ Bit Train</text>
                  <circle cx="130" cy="50" r="15" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                  <text x="125" y="54" fill="#818cf8" fontSize="12" fontFamily="monospace">×</text>
                  <line x1="80" y1="50" x2="115" y2="50" stroke="#818cf8" strokeWidth="2" />
                  <line x1="145" y1="50" x2="200" y2="50" stroke="#38bdf8" strokeWidth="2" />
                  <text x="205" y="54" fill="#38bdf8" fontSize="9" fontFamily="monospace">BPSK / QPSK</text>
                  <text x="100" y="95" fill="#fbbf24" fontSize="8" fontFamily="monospace">Carrier cos(2πfct)</text>
                </svg>
              )}

              {topology === 'cmos-inverter' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <line x1="50" y1="60" x2="105" y2="60" stroke="#38bdf8" strokeWidth="2" />
                  <text x="30" y="63" fill="#38bdf8" fontSize="9" fontFamily="monospace">Vin</text>
                  <line x1="105" y1="35" x2="105" y2="85" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="115" y="25" width="25" height="20" fill="#1e293b" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="120" y="38" fill="#c084fc" fontSize="8" fontFamily="monospace">PMOS</text>
                  <rect x="115" y="75" width="25" height="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="120" y="88" fill="#38bdf8" fontSize="8" fontFamily="monospace">NMOS</text>
                  <line x1="140" y1="60" x2="210" y2="60" stroke="#34d399" strokeWidth="2" />
                  <text x="215" y="63" fill="#34d399" fontSize="9" fontFamily="monospace">Vout</text>
                  <text x="120" y="15" fill="#c084fc" fontSize="8" fontFamily="monospace">+Vdd</text>
                  <text x="120" y="112" fill="#94a3b8" fontSize="8" fontFamily="monospace">GND</text>
                </svg>
              )}

              {topology === 'dc-buck' && (
                <svg className="w-full max-w-[280px]" viewBox="0 0 280 120" fill="none">
                  <line x1="25" y1="40" x2="70" y2="40" stroke="#fbbf24" strokeWidth="2" />
                  <text x="15" y="35" fill="#fbbf24" fontSize="8" fontFamily="monospace">Vin=12V</text>
                  <rect x="70" y="32" width="30" height="16" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
                  <text x="75" y="44" fill="#fbbf24" fontSize="8" fontFamily="monospace">MOS</text>
                  <path d="M 100 40 Q 115 25, 130 40 Q 145 25, 160 40" stroke="#34d399" strokeWidth="2" fill="none" />
                  <text x="125" y="22" fill="#34d399" fontSize="8" fontFamily="monospace">L=10mH</text>
                  <line x1="160" y1="40" x2="220" y2="40" stroke="#38bdf8" strokeWidth="2" />
                  <text x="225" y="43" fill="#38bdf8" fontSize="8" fontFamily="monospace">Vout=3.3V</text>
                </svg>
              )}

              {(topology === 'rc-lowpass' || topology === 'rc-highpass' || topology === 'rlc-resonance' || topology === 'rectifier' || topology === 'op-amp' || topology === '555-timer' || topology === 'wien-bridge' || topology === 'am-mod' || topology === 'dsp-filter') && (
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
                </svg>
              )}
            </div>

            {/* Netlist & Mathematical Formulation */}
            <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 text-xs font-mono space-y-1.5">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Physical Governing Equations:</span>
              {topology === 'radar-doppler' && (
                <>
                  <p className="text-rose-600 dark:text-rose-400 font-bold">Delay τ = 2·R / c = {calculations.radarDelayMicroSec.toFixed(2)} μs</p>
                  <p className="text-slate-600 dark:text-slate-300">Doppler fd = 2·Vr·f0 / c = {calculations.dopplerShiftHz.toFixed(1)} Hz</p>
                </>
              )}
              {topology === 'fm-mod' && (
                <>
                  <p className="text-sky-600 dark:text-[#00f0ff] font-bold">Carson BW = 2(Δf + fm) = {calculations.fmBandwidthKhz.toFixed(1)} kHz</p>
                  <p className="text-slate-600 dark:text-slate-300">Modulation Index β = Δf / fm = {calculations.fmBeta.toFixed(2)}</p>
                </>
              )}
              {topology === 'digital-psk' && (
                <>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold">BPSK: s(t) = ±Ac·cos(2πfct) (0° vs 180°)</p>
                  <p className="text-slate-600 dark:text-slate-300">QPSK: 2 bits/symbol on I &amp; Q orthogonal phasors</p>
                </>
              )}
              {topology === 'cmos-inverter' && (
                <>
                  <p className="text-purple-600 dark:text-purple-400 font-bold">Switching Threshold Vm ≈ Vdd / 2 = {(cmosVdd / 2).toFixed(2)} V</p>
                  <p className="text-slate-600 dark:text-slate-300">Propagation Delay t_pd = (t_pHL + t_pLH) / 2</p>
                </>
              )}
              {topology === 'dc-buck' && (
                <>
                  <p className="text-amber-600 dark:text-amber-400 font-bold">Vout = D · Vin = {calculations.buckVout.toFixed(2)} V</p>
                  <p className="text-slate-600 dark:text-slate-300">Inductor Ripple ΔIL = Vin·(1-D)·D / (L·fs)</p>
                </>
              )}
              {(topology === 'rc-lowpass' || topology === 'rc-highpass') && (
                <>
                  <p className="text-sky-600 dark:text-[#00f0ff] font-bold">Cutoff Frequency fc = 1 / (2πRC) = {calculations.fc.toFixed(1)} Hz</p>
                  <p className="text-slate-600 dark:text-slate-300">Phase Shift Δϕ = {calculations.phaseShiftDeg.toFixed(1)}°</p>
                </>
              )}
              {topology === 'rlc-resonance' && (
                <>
                  <p className="text-sky-600 dark:text-[#00f0ff] font-bold">Resonance f0 = 1 / (2π√(LC)) = {calculations.f0Rlc.toFixed(1)} Hz</p>
                  <p className="text-slate-600 dark:text-slate-300">Quality Factor Q = (ω0·L)/R = {calculations.qFactorRlc.toFixed(2)}</p>
                </>
              )}
            </div>

            {/* Engineering Domain Reference Tag */}
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">Discipline:</span>
              <span className="font-bold text-sky-700 dark:text-[#00f0ff]">{activeMeta.subject} ({activeMeta.badge})</span>
            </div>
          </div>

        </div>

      </div>

      {/* Studio Bottom Bar & Collaboration Attribution */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive ECE Circuit &amp; Waveform Studio · 14 Topologies</span>
        </div>
        <div className="flex items-center gap-1.5 text-center sm:text-right flex-wrap justify-center sm:justify-end">
          <span className="font-semibold text-slate-800 dark:text-slate-200">Virtual Lab Studio</span>
          <span className="text-slate-400">|</span>
          <span>Designed &amp; Developed with ❤️ by</span>
          <a
            href="https://clickncreate.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-sky-600 dark:text-[#00f0ff] hover:underline inline-flex items-center gap-0.5 transition-colors group"
          >
            Saad
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <span>&amp; Hammad.</span>
        </div>
      </div>

    </div>
  );
};
