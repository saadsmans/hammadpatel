import { Project, AcademicSemester, SkillCategory, LanguageSkill } from '../types/portfolio';

export const IMAGES = {
  heroSatellite: "/src/assets/images/hero_satellite_orbit_1794372302764.jpg",
  microchipCircuit: "/src/assets/images/circuit_die_microchip_1794372303815.jpg",
  ecommerceMockup: "/src/assets/images/project_ecommerce_mockup_1794372304820.jpg",
  satelliteDish: "/src/assets/images/project_satellite_dish_1794372304928.jpg",
};

export const PERSONAL_INFO = {
  name: "HAMMAD PATEL",
  tagline: "Electronics & Communication Engineering Student | ECE Systems & Web Development Enthusiast",
  email: "patelhammad132@gmail.com",
  phone: "+91 99747 61355",
  location: "Bharuch, Gujarat, India",
  college: "Government Engineering College, Bharuch",
  degree: "Bachelor of Engineering (BE) in Electronics & Communication Engineering",
  academicDuration: "2023 – 2027",
  currentSem: "Entering Semester 7 (Winter 2026) · Final Year",
  cgpaTillSem6: 6.38,
  summary: "Motivated and analytical Electronics & Communication Engineering student at Government Engineering College, Bharuch (6.38 CGPA till Sem 6) with strong foundations in RF & Satellite Communication, VLSI Design, Digital Signal Processing (DSP), Radar Systems, and Electronic Circuit Simulation (CircuitJS & eSim via IIT Bombay Spoken Tutorial Internship), complemented by modern Web Development and Programming skills in Java, Python, and C.",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  whatsapp: "https://wa.me/919974761355?text=Hello%20Hammad,%20I%20would%20like%20to%20connect%20regarding%20an%20Electronics%20%26%20Communication%20Engineering%20opportunity!",
};

export const ACADEMIC_SEMESTERS: AcademicSemester[] = [
  {
    semester: 1,
    term: "Winter 2023",
    year: "2023",
    status: "completed",
    highlightCourse: "Basic Electrical Engineering & Mathematics – 1",
    courses: [
      {
        name: "Basic Electrical Engineering",
        domain: "circuits-vlsi",
        description: "DC & AC circuit laws, Kirchhoff's laws, magnetic circuits, single & three-phase systems.",
        practicalApp: "Laboratory testing of RL/RC circuits, transformer voltage ratios, and power factor analysis."
      },
      {
        name: "Basic Mechanical Engineering",
        domain: "foundations",
        description: "Thermodynamics fundamentals, power transmission, internal combustion engines, and materials.",
        practicalApp: "Mechanical work systems, heat transfer models, and thermal dissipation in hardware."
      },
      {
        name: "Environmental Sciences",
        domain: "foundations",
        description: "Ecosystems, natural resources, environmental pollution, electronic waste mitigation, and green tech.",
        practicalApp: "Sustainable electronics lifecycle, RoHS compliance standards, and eco-friendly packaging."
      },
      {
        name: "Workshop / Manufacturing Practices",
        domain: "foundations",
        description: "Hands-on manufacturing, machining, fitting, tin-smithy, carpentry, and electrical wiring.",
        practicalApp: "Hardware fabrication, chassis assembly, PCB mounting, and soldering safety."
      },
      {
        name: "Mathematics – 1",
        domain: "foundations",
        description: "Differential and integral calculus, Taylor series, multivariate calculus, and partial derivatives.",
        practicalApp: "Mathematical modeling of signal gradients, circuit optimization, and continuous rate change."
      },
      {
        name: "Induction Program",
        domain: "foundations",
        description: "Universal human values, engineering ethics, team-building, and technological social impact.",
        practicalApp: "Professional integrity, peer collaboration, and engineering project management."
      }
    ]
  },
  {
    semester: 2,
    term: "Summer 2024",
    year: "2024",
    status: "completed",
    highlightCourse: "Basic Electronics & Programming for Problem Solving",
    courses: [
      {
        name: "Programming for Problem Solving",
        domain: "computing-web",
        description: "Algorithm formulation, structured programming in C, pointers, arrays, memory management.",
        practicalApp: "Implementing computational sorting, numerical data structures, and embedded microcontroller algorithms."
      },
      {
        name: "Basic Electronics",
        domain: "circuits-vlsi",
        description: "Semiconductor diodes, BJT transistors, biasing, rectification, operational amplifiers, and logic gates.",
        practicalApp: "Breadboard assembly of full-wave rectifiers, Zener regulators, and transistor switches."
      },
      {
        name: "Mathematics – 2",
        domain: "foundations",
        description: "Linear algebra, matrix operations, eigenvalues, eigenvectors, and vector calculus.",
        practicalApp: "State-space circuit representation, antenna coordinate transformations, and RF geometry."
      },
      {
        name: "Physics",
        domain: "foundations",
        description: "Electromagnetic theory, wave optics, interference, diffraction, lasers, and quantum mechanics.",
        practicalApp: "Laser transmission, fiber optic light propagation, and quantum semiconductor conduction."
      },
      {
        name: "Engineering Graphics & Design",
        domain: "foundations",
        description: "Orthographic projections, isometric views, CAD drafting, and mechanical/electronic layouts.",
        practicalApp: "Schematic drafting, 3D spatial enclosure models, and PCB layout drawing."
      },
      {
        name: "English",
        domain: "foundations",
        description: "Professional technical communication, writing clarity, presentation delivery, and reading comprehension.",
        practicalApp: "Writing structured technical whitepapers, documentation, and stakeholder briefings."
      }
    ]
  },
  {
    semester: 3,
    term: "Winter 2024",
    year: "2024",
    status: "completed",
    highlightCourse: "Digital System Design & Network Theory",
    courses: [
      {
        name: "Digital System Design",
        domain: "circuits-vlsi",
        description: "Boolean algebra, Karnaugh maps, combinational logic (multiplexers, adders), sequential flip-flops, counters.",
        practicalApp: "Designing synchronous finite state machines, binary counters, and HDL logic validation."
      },
      {
        name: "Network Theory",
        domain: "circuits-vlsi",
        description: "Node & mesh analysis, Thevenin/Norton theorems, two-port network parameters, Laplace s-domain transient response.",
        practicalApp: "Impedance matching, passive attenuator design, and frequency response analysis."
      },
      {
        name: "Control Systems",
        domain: "signals-dsp",
        description: "Transfer functions, block diagrams, signal flow graphs, Routh-Hurwitz stability, Bode & Nyquist plots, PID.",
        practicalApp: "Feedback loop stability tuning for antenna servo positioning and power supply voltage regulators."
      },
      {
        name: "Probability and Statistics",
        domain: "signals-dsp",
        description: "Random variables, Gaussian distributions, central limit theorem, correlation, and stochastic processes.",
        practicalApp: "Modeling thermal noise in RF receivers and bit error rate (BER) probabilities in wireless channels."
      },
      {
        name: "Design Engineering – I A",
        domain: "foundations",
        description: "Design thinking methodology, AEIOU framework, user empathy mapping, and rapid hardware prototyping.",
        practicalApp: "Problem identification, human-centered circuit tool prototyping, and ideation canvas design."
      },
      {
        name: "Effective Technical Communication",
        domain: "foundations",
        description: "Group discussions, engineering reports, business ethics, and oral presentations.",
        practicalApp: "Technical RFP evaluation, team sprint meetings, and documentation clarity."
      },
      {
        name: "Indian Constitution",
        domain: "foundations",
        description: "Constitutional history, fundamental rights, directive principles, governance, and civic responsibility.",
        practicalApp: "Understanding regulatory compliance, public communication law, and institutional governance."
      }
    ]
  },
  {
    semester: 4,
    term: "Summer 2025",
    year: "2025",
    status: "completed",
    highlightCourse: "Signal & Systems & Microprocessor & Microcontroller",
    courses: [
      {
        name: "Signal & Systems",
        domain: "signals-dsp",
        description: "Continuous and discrete-time signals, LTI systems, convolution, Fourier Series, Fourier Transform, Z-transform.",
        practicalApp: "Spectral decomposition of square and voice waves, filter response computation, and sampling reconstruction."
      },
      {
        name: "Analog Circuit Design",
        domain: "circuits-vlsi",
        description: "Operational amplifiers (inverting, non-inverting, differential), active filters, oscillators, 555 timers.",
        practicalApp: "Designing Butterworth low-pass filters, Wien-bridge oscillators, and instrumentation amplifiers."
      },
      {
        name: "Microprocessor & Microcontroller",
        domain: "computing-web",
        description: "8085/8086 microprocessor architecture, 8051 microcontroller, assembly programming, timers, interrupts, I/O.",
        practicalApp: "Interfacing LCD displays, stepper motors, ADC converters, and keypad inputs to microcontrollers."
      },
      {
        name: "Electromagnetic Theory",
        domain: "rf-comm",
        description: "Maxwell's equations, Poynting vector, uniform plane waves in media, boundary conditions, wave propagation.",
        practicalApp: "Evaluating wave reflection, polarization loss, and dielectric boundary phase shifts in waveguides."
      },
      {
        name: "Electronic Measurement Laboratory",
        domain: "circuits-vlsi",
        description: "Digital storage oscilloscopes, function generators, frequency counters, spectrum analyzers, sensor transducers.",
        practicalApp: "Calibration of precision measurement equipment, oscilloscope trigger captures, and distortion analysis."
      },
      {
        name: "Design Engineering – I B",
        domain: "foundations",
        description: "Prototyping, proof of concept testing, user feedback iteration, and functional product modeling.",
        practicalApp: "Bench-testing physical circuit enclosures, schematic iteration, and component sourcing."
      },
      {
        name: "Professional Ethics",
        domain: "foundations",
        description: "Engineering professional liability, whistleblower responsibilities, intellectual property, and safety.",
        practicalApp: "Adherence to IEEE code of ethics, open-source software licenses, and consumer hardware safety."
      }
    ]
  },
  {
    semester: 5,
    term: "Winter 2025",
    year: "2025",
    status: "completed",
    highlightCourse: "Analog and Digital Communication & VLSI Design",
    courses: [
      {
        name: "Analog and Digital Communication",
        domain: "rf-comm",
        description: "AM, FM, PM modulation, PCM, ASK, FSK, PSK, QAM, noise analysis, signal-to-noise ratio in receivers.",
        practicalApp: "Building software-defined digital modulation visualizers, constellation diagrams, and spectral plots."
      },
      {
        name: "VLSI Design",
        domain: "circuits-vlsi",
        description: "MOS transistor physics, CMOS inverter characteristics, stick diagrams, layout design rules, ASIC flow.",
        practicalApp: "Simulating CMOS logic propagation delay, static/dynamic power dissipation, and silicon floorplanning."
      },
      {
        name: "Python Programming",
        domain: "computing-web",
        description: "Data analysis (NumPy, SciPy, Matplotlib), OOP in Python, automation scripts, socket programming, APIs.",
        practicalApp: "Writing automated signal analysis scripts, Fast Fourier Transform (FFT) computational plots, and math tools."
      },
      {
        name: "Power Electronics",
        domain: "circuits-vlsi",
        description: "Thyristors, SCRs, TRIACs, MOSFETs, IGBTs, phase-controlled rectifiers, DC-DC buck/boost converters, inverters.",
        practicalApp: "Switch-mode power supply (SMPS) regulation, PWM gate driving, and motor speed controllers."
      },
      {
        name: "Principles of Management",
        domain: "foundations",
        description: "Organizational structures, operational planning, resource allocation, leadership, and project execution.",
        practicalApp: "Managing software development sprints, client project deliverables, and team timelines."
      },
      {
        name: "Design Engineering – II A",
        domain: "foundations",
        description: "Advanced engineering design project phase 1, patent search, competitive benchmarking, and architecture.",
        practicalApp: "System-level architecture diagramming, Bill of Materials (BOM) creation, and feasibility audit."
      },
      {
        name: "Integrated Personality Development Course",
        domain: "foundations",
        description: "Interpersonal communication, stress management, professional conduct, and holistic leadership.",
        practicalApp: "Public speaking, stakeholder negotiation, and cross-functional engineering team coordination."
      }
    ]
  },
  {
    semester: 6,
    term: "Summer 2026",
    year: "2026",
    status: "completed",
    highlightCourse: "Satellite Communication, Antennas & Propagation & Web Technology",
    courses: [
      {
        name: "Satellite Communication",
        domain: "rf-comm",
        description: "Orbital mechanics (Kepler's laws), look angles, transponders, link budget equation, earth station design, VSAT.",
        practicalApp: "Interactive computational model for Free Space Path Loss, C/N0 carrier-to-noise, and antenna gain calculations."
      },
      {
        name: "Antennas and Propagation",
        domain: "rf-comm",
        description: "Radiation mechanisms, dipole antennas, antenna arrays, Friis transmission equation, ground wave & ionospheric propagation.",
        practicalApp: "Calculating radiation patterns, beamwidth (-3dB), directivity, and atmospheric fading margins."
      },
      {
        name: "Fiber Optic Communication",
        domain: "rf-comm",
        description: "Optical fiber modes, attenuation, chromatic dispersion, laser diodes, photodetectors (PIN, APD), WDM systems.",
        practicalApp: "Evaluating multi-gigabit optical link budgets, fiber splicing loss, and dispersion compensation."
      },
      {
        name: "Web Technology",
        domain: "computing-web",
        description: "HTTP/HTTPS protocols, HTML5 semantic structures, CSS3 styling, JavaScript/TypeScript, DOM, REST APIs.",
        practicalApp: "Architecting responsive, high-performance web applications, CMS platforms, and API integration pipelines."
      },
      {
        name: "Computer Networks",
        domain: "computing-web",
        description: "OSI and TCP/IP models, routing protocols (OSPF, BGP), TCP flow control, IP subnetting, socket programming.",
        practicalApp: "Packet tracing, network protocol analysis, and client-server socket communication."
      },
      {
        name: "Design Engineering – II B",
        domain: "foundations",
        description: "Finalization of hardware/software prototype, deployment testing, validation metrics, and demonstration.",
        practicalApp: "End-to-end testing of working prototype, technical project documentation, and peer evaluation."
      },
      {
        name: "Integrated Personality Development Course",
        domain: "foundations",
        description: "Values-based leadership, global citizenship, ethical decision-making, and professional adaptability.",
        practicalApp: "Conducting professional client meetings and navigating cross-cultural communication."
      }
    ]
  },
  {
    semester: 7,
    term: "Winter 2026",
    year: "2026",
    status: "active-final-year",
    highlightCourse: "Radar and Navigation Aids (RNA) & Digital Signal Processing (DSP)",
    courses: [
      {
        name: "Radar and Navigation Aids (RNA)",
        domain: "rf-comm",
        description: "Radar range equation, pulsed radar, CW and FMCW radar, MTI and Doppler radar, tracking radar, GPS, ILS.",
        practicalApp: "Interactive Plan Position Indicator (PPI) sweep simulation, target azimuth/range tracking, Doppler shift math."
      },
      {
        name: "Digital Signal Processing (DSP)",
        domain: "signals-dsp",
        description: "Discrete Fourier Transform (DFT), Fast Fourier Transform (FFT), FIR and IIR digital filter design (Butterworth, Chebyshev).",
        practicalApp: "Implementing real-time digital filtering algorithms, frequency spectrum analysis, and signal decimation."
      },
      {
        name: "Wireless Communication (WC)",
        domain: "rf-comm",
        description: "Cellular radio principles, frequency reuse, handoff, fading channels (Rayleigh, Rician), CDMA, OFDM, 4G LTE, 5G NR.",
        practicalApp: "Cellular cluster capacity planning, Doppler spread calculation, and multi-carrier modulation modeling."
      },
      {
        name: "Microwave Theory and Techniques (MTT)",
        domain: "rf-comm",
        description: "Transmission lines, Smith chart, microstrip lines, S-parameters, waveguide components, Gunn diodes, microwave amplifiers.",
        practicalApp: "Smith chart impedance matching, S-parameter network characterization, and high-frequency RF routing."
      },
      {
        name: "Wireless Sensor Networks (WSN)",
        domain: "rf-comm",
        description: "WSN node architecture, Zigbee/IEEE 802.15.4, routing protocols (LEACH, Directed Diffusion), energy harvesting.",
        practicalApp: "Low-power mesh sensor topologies, environmental telemetry logging, and packet forwarding algorithms."
      },
      {
        name: "Artificial Intelligence (AI)",
        domain: "computing-web",
        description: "Search algorithms (A*, minimax), heuristic optimization, knowledge representation, machine learning basics, neural networks.",
        practicalApp: "Integrating AI search models, predictive classification for engineering telemetry, and intelligent user workflows."
      }
    ]
  }
];

export const IIT_BOMBAY_INTERNSHIP = {
  role: "Project Intern – Spoken Tutorial Project",
  organization: "IIT Bombay",
  type: "Academic Internship",
  domain: "Electronic Circuit Simulation using eSim and CircuitJS",
  summary: "Successfully completed an academic internship under the prestigious IIT Bombay Spoken Tutorial Project, deeply focusing on Electronic Circuit Simulation using eSim and CircuitJS.",
  keyActivities: [
    "Worked extensively with Electronic Circuit Simulation tools, including eSim and CircuitJS.",
    "Explored both analog and digital electronic circuits, testing non-linear behaviors and frequency responses.",
    "Studied circuit behavior, signal conversion (A/D & D/A), and voltage waveforms across various loads.",
    "Practised schematic capture, netlist generation, circuit design, simulation, and transient analysis.",
    "Developed foundational knowledge of electronic circuit simulation techniques and verification procedures."
  ],
  toolsUsed: ["eSim", "CircuitJS", "Ngspice", "KiCad Schematic Editor", "Virtual Oscilloscope"],
  competencies: ["Signal Analysis", "Transient Simulation", "Schematic Netlists", "Voltage Waveforms", "Frequency Response"]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Electronics & Communication Systems (Core ECE)",
    iconName: "Radio",
    description: "RF engineering, satellite link design, radar systems, digital signal processing, and circuit simulation.",
    skills: [
      { name: "CircuitJS & eSim SPICE Simulation", level: 94, experience: "Real-time schematic capture, Ngspice netlist execution & transient waveform analysis (IIT Bombay)", highlight: true },
      { name: "Satellite Communication Systems", level: 90, experience: "Link budget calculation, orbital mechanics, transponders & earth station architecture", highlight: true },
      { name: "Radar & Navigation Aids (RNA)", level: 88, experience: "Radar range equation, Doppler frequency shift, MTI/pulsed radar & target tracking", highlight: true },
      { name: "Antennas & Wave Propagation", level: 87, experience: "Radiation patterns, dipole arrays, beamwidth, directivity & atmospheric propagation", highlight: true },
      { name: "Digital Signal Processing (DSP)", level: 86, experience: "FFT, DFT, FIR & IIR filter design, Z-transforms & spectral waveform analysis", highlight: true },
      { name: "Wireless Communication & WSN", level: 85, experience: "Cellular radio propagation, fading channels, OFDM, 5G & low-power sensor networks", highlight: true }
    ]
  },
  {
    title: "VLSI, Embedded Systems & Hardware Design",
    iconName: "Cpu",
    description: "Semiconductor physics, CMOS VLSI layout, microcontrollers, and optical communication hardware.",
    skills: [
      { name: "VLSI Technology & CMOS Design", level: 86, experience: "MOSFET fabrication, CMOS inverter delay, stick diagrams, DRC/LVS & RTL logic", highlight: true },
      { name: "Microcontrollers & Interfacing (8051 / ARM)", level: 88, experience: "Assembly & Embedded C programming, UART/SPI/I2C protocols & sensor interfacing", highlight: true },
      { name: "Fiber Optic Communication", level: 87, experience: "Optical waveguiding, WDM, PIN/APD photodetectors, laser diodes & link power budgets", highlight: true },
      { name: "Microwave Theory & Techniques (MTT)", level: 84, experience: "Transmission lines, Smith chart impedance matching, waveguides & S-parameters", highlight: true },
      { name: "Analog & Digital Electronics", level: 92, experience: "Op-Amp signal conditioning, BJT/MOSFET amplifiers, combinational & sequential logic", highlight: true }
    ]
  },
  {
    title: "Programming Languages & Scientific Computing",
    iconName: "Code2",
    description: "Core programming languages, algorithmic problem-solving, network protocols, and AI.",
    skills: [
      { name: "Python Programming", level: 88, experience: "NumPy, SciPy, scientific computing, AI search models & automated signal scripts", highlight: true },
      { name: "Java (Core & OOP)", level: 86, experience: "Object-oriented design, data structures, algorithms & modular application logic", highlight: true },
      { name: "C & Embedded C", level: 86, experience: "Memory pointers, register-level firmware logic, data structures & numerical routines", highlight: true },
      { name: "Computer Networks & Protocols", level: 86, experience: "TCP/IP, OSI stack, routing protocols (OSPF, BGP), socket communication & telemetry" },
      { name: "Artificial Intelligence (AI)", level: 82, experience: "Heuristic search (A*, Minimax), machine learning fundamentals & pattern recognition" }
    ]
  },
  {
    title: "Web Development & Engineering Tools",
    iconName: "Globe",
    description: "Modern web development skills for technical interfaces, simulation dashboards, and web platforms.",
    skills: [
      { name: "Frontend Web Development (HTML5, CSS3, JS/TS)", level: 92, experience: "Interactive engineering dashboards, responsive UI layouts & modern web standards", highlight: true },
      { name: "React & Tailwind CSS Architecture", level: 90, experience: "Component-based interfaces, real-time HTML5 Canvas oscilloscopes & dark/light themes", highlight: true },
      { name: "CMS & Web Platforms (WordPress, Shopify)", level: 92, experience: "Full web platform configuration, custom layouts, responsive structures & SEO", highlight: true },
      { name: "Git, GitHub & Technical Documentation", level: 88, experience: "Version control workflows, LaTeX/Office lab reports & engineering documentation" }
    ]
  }
];

export const LANGUAGES: LanguageSkill[] = [
  { name: "English", proficiency: "Professional", levelPercentage: 88, badge: "Technical documentation & engineering communication" },
  { name: "Hindi", proficiency: "Fluent", levelPercentage: 96, badge: "Conversational & technical fluency" },
  { name: "Gujarati", proficiency: "Native", levelPercentage: 100, badge: "Mother tongue & native language proficiency" }
];

export const PROJECTS: Project[] = [
  {
    id: "circuit-waveform-studio",
    title: "Virtual Circuit & Waveform Studio (Advanced ECE Lab)",
    subtitle: "Real-Time Interactive SPICE & Signal Synthesis Engineering Platform",
    category: "ece",
    description: "Advanced web-based electronic circuit simulation laboratory inspired by IIT Bombay Spoken Tutorial learnings. Features real-time CRT dual-trace oscilloscope, 14 active circuit topologies (RLC resonance, passive/active filters, 555 timers, AM/FM modulation, QPSK constellation, VLSI CMOS, DC-DC Buck converter, radar echo & DSP filters), cursor delta measurement, dynamic Bode plot, and Web Audio acoustic synthesis.",
    longDescription: "Engineered to simulate non-linear differential analog behaviors in real-time in the browser. Users can adjust frequency, amplitude, resistance, capacitance, and inductance while observing instantaneous AC/DC transient responses, phase shifts, cut-off resonance peaks, and audio frequency acoustic synthesis.",
    technologies: ["CircuitJS Logic", "eSim / Ngspice", "Bode Frequency Response", "Web Audio API", "HTML5 Canvas CRT Engine", "React 19", "TypeScript", "Tailwind CSS"],
    metrics: ["60 FPS Phosphor Trace", "14 Circuit Topologies", "Bode & FFT Analysis", "Interactive Scope Cursors"],
    features: [
      "14 Interactive Topologies: RC Low/High-Pass, RLC Resonance, Bridge Rectifier, Op-Amp, 555 Timer, Wien Bridge, AM/FM Modulation, QPSK Keying, CMOS Inverter, Buck Converter, Radar Doppler & DSP Filter",
      "Dual-Channel Time-Domain CRT Scope with P31 Green, Cyan & Amber Phosphor Glow",
      "Interactive Cursors for Precision Voltage Delta (ΔV) & Time Interval (Δt) Readouts",
      "Dynamic Bode Plot for Logarithmic Frequency Magnitude (dB) & Phase Shift (Degrees)",
      "Radar PPI Sweep Display & Digital I/Q Constellation Phasor Plane",
      "Full Web Audio Tone Synthesizer with Live Frequency Synchronization"
    ],
    demoUrl: "#portfolio",
    githubUrl: "https://github.com",
    badge: "IIT Bombay Spoken Tutorial Centerpiece",
    imageAlt: "Advanced Virtual Circuit & Waveform Studio"
  },
  {
    id: "personal-portfolio-platform",
    title: "Personal Engineering Portfolio Website (Recent Work)",
    subtitle: "Interactive Engineering Showcase & Academic Web Platform",
    category: "web",
    description: "Designed and engineered an interactive personal portfolio website showcasing core ECE academic credentials, IIT Bombay Spoken Tutorial practical training, and web development skills. Features real-time CRT circuit simulation, full GTU syllabus explorer, and client-side PDF CV generation.",
    longDescription: "Architected a high-performance web platform combining Electronics & Communication Engineering fundamentals with modern web development. Built with React 19, TypeScript, Tailwind CSS, HTML5 Canvas, and Web Audio API, featuring mobile-first responsive architecture and client-side PDF export.",
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "HTML5 Canvas", "Vite", "jsPDF"],
    metrics: ["100% Mobile Responsive", "Client-Side PDF Generator", "Interactive Lab Engine", "Fast Load Speed"],
    features: [
      "Responsive Dark & Cyberpunk Design System with Poppins & Orbitron Typography",
      "Integrated Virtual Circuit & Waveform Studio with 14 Active Topologies",
      "Direct In-Browser PDF CV Viewer & Downloader powered by jsPDF",
      "Interactive 7-Semester GTU ECE Coursework Explorer & Academic Milestones",
      "Optimized Mobile Navigation with Touch Controls & Dynamic Route Tabs"
    ],
    demoUrl: "#home",
    githubUrl: "https://github.com",
    badge: "Recent Work / Featured Project",
    imageAlt: "Hammad Patel Portfolio Website"
  }
];

export const HIRE_ME_SERVICES = [
  {
    id: "ece-graduate-role",
    title: "Graduate ECE Engineer & Core Electronics Roles",
    iconName: "Radio",
    tagline: "Full-time or final-year placement opportunities in RF, Telecom, VLSI, and Core Electronics",
    features: [
      "Strong foundation across 7 Semesters of GTU ECE curriculum (6.38 CGPA till Sem 6)",
      "RF & Microwave Engineering, Satellite Link Design & Radar Navigation Systems",
      "Analog & Digital Circuit Analysis, CMOS VLSI & Fiber Optic Communications",
      "Ready for 2027 Graduation placements & final-year industrial traineeships"
    ],
    availability: "Final Year (2026–2027)",
    locationType: "On-Site / Hybrid / Remote"
  },
  {
    id: "circuit-simulation-internship",
    title: "Circuit Simulation, SPICE & Hardware R&D Internships",
    iconName: "Cpu",
    tagline: "Electronic schematic capture, Ngspice verification, and filter/waveform modeling",
    features: [
      "Trained via IIT Bombay Spoken Tutorial Project in eSim & CircuitJS",
      "Analog/Digital schematic capture, netlist generation & transient simulation",
      "RC/RLC filter design, operational amplifier conditioning & rectifier testing",
      "Signal integrity verification, Bode plot analysis & lab documentation"
    ],
    availability: "Immediate / Semester 7–8",
    locationType: "Bharuch / Gujarat / Pan-India"
  },
  {
    id: "embedded-iot-systems",
    title: "Embedded Systems, IoT & Signal Processing Projects",
    iconName: "Activity",
    tagline: "Microcontroller firmware, wireless sensor networks (WSN), and Python DSP scripts",
    features: [
      "8051 & ARM microcontroller programming in C / Embedded C",
      "Wireless Sensor Networks (WSN), Zigbee & IoT telemetry architectures",
      "Digital Signal Processing (FFT, FIR/IIR filters) using Python & SciPy",
      "Hardware-software co-design and real-time sensor data visualization"
    ],
    availability: "Project / Collaboration",
    locationType: "Academic & Industrial R&D"
  },
  {
    id: "engineering-web-interfaces",
    title: "Technical Web Dashboards & Simulation Interfaces",
    iconName: "Code2",
    tagline: "Combining ECE domain expertise with modern Web Development skills",
    features: [
      "Interactive web-based oscilloscopes and hardware telemetry dashboards",
      "Engineering calculators, RF link budget tools & educational lab portals",
      "Clean, responsive web applications built with React, TypeScript & Python",
      "Bridging hardware engineering data with intuitive browser visualizations"
    ],
    availability: "Technical Collaboration",
    locationType: "Remote / Hybrid"
  }
];
