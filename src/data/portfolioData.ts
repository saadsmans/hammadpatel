import { Project, AcademicSemester, SkillCategory, LanguageSkill } from '../types/portfolio';

export const IMAGES = {
  heroSatellite: "/src/assets/images/hero_satellite_orbit_1794372302764.jpg",
  microchipCircuit: "/src/assets/images/circuit_die_microchip_1794372303815.jpg",
  ecommerceMockup: "/src/assets/images/project_ecommerce_mockup_1794372304820.jpg",
  satelliteDish: "/src/assets/images/project_satellite_dish_1794372304928.jpg",
};

export const PERSONAL_INFO = {
  name: "HAMMAD PATEL",
  tagline: "Electronics & Communication Engineering Student | WordPress & Shopify Website Specialist",
  email: "patelhammad132@gmail.com",
  phone: "+91 99747 61355",
  location: "Bharuch, Gujarat, India",
  college: "Government Engineering College, Bharuch",
  degree: "Bachelor of Engineering (BE) in Electronics & Communication Engineering",
  academicDuration: "2023 – 2027",
  currentSem: "Entering Semester 7 (Winter 2026) · Final Year",
  cgpaTillSem6: 6.38,
  summary: "Motivated and enthusiastic Electronics & Communication Engineering student with an interest in communication technologies, satellite communication, and modern website creation. Specializes in designing and building high-performance websites through WordPress and Shopify, creating responsive business websites, e-commerce stores, and custom CMS layouts. Possesses strong analytical thinking, adaptability, and experience in electronic circuit simulation through the IIT Bombay Spoken Tutorial Project.",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  whatsapp: "https://wa.me/919974761355?text=Hello%20Hammad,%20I%20would%20like%20to%20discuss%20a%20WordPress%20or%20Shopify%20website%20project!",
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
    title: "WordPress, Shopify & Website Platforms",
    iconName: "Globe",
    description: "Specialized in creating modern, high-converting websites through WordPress, Shopify, and visual website builders.",
    skills: [
      { name: "WordPress Website Making", level: 96, experience: "Complete website creation, theme customization, Elementor, Gutenberg & speed tuning", highlight: true },
      { name: "Shopify Website Making", level: 94, experience: "End-to-end Shopify store setup, product variants, collection management & checkout", highlight: true },
      { name: "Website Builders (Framer, Webflow, Wix)", level: 90, experience: "Modern landing page design, visual site builders & client-ready delivery", highlight: true },
      { name: "WooCommerce E-Commerce", level: 92, experience: "Online store setup, payment gateways, product catalogs & order management", highlight: true },
      { name: "Responsive UI/UX & Web Design", level: 95, experience: "Mobile-first layouts, typography hierarchy & clean user interfaces", highlight: true },
      { name: "Technical SEO & Speed Optimization", level: 90, experience: "Google Search Console, meta tags, image compression & fast loading times" },
      { name: "HTML & CSS Customization", level: 92, experience: "Visual styling adjustments, responsive CSS tweaks & custom layout enhancements" }
    ]
  },
  {
    title: "Programming Languages & Computing",
    iconName: "Code2",
    description: "Core computer science fundamentals, object-oriented design, scientific algorithms, and AI.",
    skills: [
      { name: "Java (Core & OOP)", level: 86, experience: "Object-oriented architecture, data structures, algorithms & multithreading", highlight: true },
      { name: "Python Programming", level: 88, experience: "NumPy, SciPy, scientific computing, AI algorithms & automated signal scripts", highlight: true },
      { name: "C Programming", level: 85, experience: "Memory pointers, data structures, embedded firmware logic & performance" },
      { name: "Computer Networks & Protocols", level: 86, experience: "TCP/IP, OSI layers, routing protocols (OSPF, BGP) & HTTP/REST APIs" },
      { name: "Artificial Intelligence (AI)", level: 82, experience: "Heuristic search, machine learning models & data classification" }
    ]
  },
  {
    title: "Electronics & Communication Systems",
    iconName: "Radio",
    description: "Hardware modeling, RF communications, radar systems, satellite links, and DSP.",
    skills: [
      { name: "Satellite Communication", level: 90, experience: "Link budget calculation, orbital mechanics, transponders & earth station design", highlight: true },
      { name: "Radar & Navigation Aids (RNA)", level: 85, experience: "Radar range equation, Doppler frequency shift, pulsed radar & target tracking", highlight: true },
      { name: "CircuitJS & eSim Simulation", level: 94, experience: "Real-time schematic capture, Ngspice netlist execution & transient analysis", highlight: true },
      { name: "Antennas & Propagation", level: 86, experience: "Radiation patterns, beamwidth, directivity, antenna arrays & atmospheric fading", highlight: true },
      { name: "Digital Signal Processing (DSP)", level: 85, experience: "FFT, DFT, FIR & IIR filter design, convolution & spectral analysis", highlight: true },
      { name: "Wireless Communication & WSN", level: 84, experience: "Cellular radio propagation, fading channels, OFDM, 5G & sensor networks" }
    ]
  },
  {
    title: "Digital Tools & Growth Engineering",
    iconName: "Cpu",
    description: "Productivity accelerators, technical SEO architecture, and business productivity.",
    skills: [
      { name: "Technical SEO & Schema.org", level: 90, experience: "Core Web Vitals, JSON-LD structured data, meta optimization & Lighthouse 95+", highlight: true },
      { name: "AI Tools & Accelerated Workflows", level: 92, experience: "AI code reviews, prompt engineering, automated testing & documentation synthesis", highlight: true },
      { name: "Microsoft Office Suite", level: 94, experience: "Advanced Excel modeling, technical Word reporting & executive PowerPoint decks" },
      { name: "Git & GitHub Collaboration", level: 88, experience: "Branching workflows, code reviews, version control & open-source tools" }
    ]
  }
];

export const LANGUAGES: LanguageSkill[] = [
  { name: "English", proficiency: "Professional", levelPercentage: 88, badge: "Technical documentation & global communication" },
  { name: "Hindi", proficiency: "Fluent", levelPercentage: 96, badge: "Conversational & technical fluency" },
  { name: "Gujarati", proficiency: "Native", levelPercentage: 100, badge: "Mother tongue & native language proficiency" }
];

export const PROJECTS: Project[] = [
  {
    id: "hammadpatel-portfolio",
    title: "Hammad Patel Cyberpunk Portfolio & Engineering Workspace",
    subtitle: "Production Web Architecture · Deployed on Vercel",
    category: "web",
    description: "Official portfolio and technical workspace deployed live at hammadpatel.vercel.app. Engineered with high-contrast cyberpunk gaming aesthetics, interactive circuit and waveform simulation laboratory, interactive project price & hour estimator tailored for Indian markets, and full ECE academic coursework explorer.",
    longDescription: "Built with responsive performance and modern cyberpunk neon contrasts. Integrates real-time CRT waveform oscilloscope synthesis via Web Audio API, dynamic Indian Rupee proposal builder with pre-encoded WhatsApp dispatch, and full 7-semester syllabus matrix.",
    technologies: ["React 19", "Tailwind CSS", "TypeScript", "Three.js", "Web Audio API", "Vercel"],
    metrics: ["Live at hammadpatel.vercel.app", "<1s Fast Load", "100% Mobile Responsive"],
    features: ["Cyberpunk Gaming HUD", "Virtual Oscilloscope & Tone Synth", "Instant Indian Rupee Project Estimator", "Direct WhatsApp & Email Pipeline"],
    demoUrl: "https://hammadpatel.vercel.app",
    githubUrl: "https://hammadpatel.vercel.app",
    badge: "Live on Vercel",
    imageAlt: "Hammad Patel Cyberpunk Portfolio Platform"
  },
  {
    id: "circuit-waveform-studio",
    title: "Virtual Circuit & Waveform Studio",
    subtitle: "Interactive CircuitJS & eSim Companion",
    category: "ece",
    description: "Web-based interactive electronic circuit simulation and waveform oscilloscope inspired by IIT Bombay Spoken Tutorial learnings. Visualizes RC/RLC filter behavior, diode rectification, and operational amplifier signal shaping in real time.",
    longDescription: "Allows users to adjust input frequencies, resistance, and capacitance on the fly while watching the dynamic voltage waveform update across a live HTML5 canvas oscilloscope with real Web Audio tone synthesis.",
    technologies: ["React 19", "Tailwind CSS", "Python", "TypeScript", "HTML5 Canvas", "CircuitJS Logic", "Web Audio API"],
    metrics: ["60 FPS Trace Render", "Live Web Audio Oscillator", "Zero-latency Controls"],
    features: ["Sine, Square, Triangle & AM generators", "Real-time low-pass & high-pass filtering", "Peak-to-Peak (Vpp) & RMS telemetry", "Direct waveform screenshot capture"],
    demoUrl: "#portfolio",
    githubUrl: "https://github.com",
    badge: "IIT Bombay Inspired",
    imageAlt: "Virtual Circuit Simulator"
  },
  {
    id: "seo-optimization-engine",
    title: "SEO Optimization & Digital Growth Initiative",
    subtitle: "Technical Search Engine Architecture",
    category: "seo",
    description: "Comprehensive SEO audit and optimization initiative implemented across web platforms. Enhanced discoverability via semantic HTML5, JSON-LD structured schema, canonical setups, and Core Web Vitals optimizations.",
    longDescription: "Systematic enhancement targeting organic Google search rankings. Conducted keyword mapping, OpenGraph metadata integration, robots.txt routing, and asset compression to maximize visibility.",
    technologies: ["Technical SEO", "Python", "React 19", "Tailwind CSS", "Schema.org JSON-LD", "Core Web Vitals"],
    metrics: ["98/100 Lighthouse Performance", "100/100 SEO Score", "+240% Organic Impressions"],
    features: ["Rich Snippets & Microdata", "Mobile Viewport Optimization", "Asset Lazy Loading", "Social Share Cards"],
    demoUrl: "#portfolio",
    githubUrl: "https://github.com",
    badge: "SEO Initiative",
    imageAlt: "SEO Optimization Dashboard"
  }
];

export const HIRE_ME_SERVICES = [
  {
    id: "wordpress-website",
    title: "WordPress Website Making",
    iconName: "Globe",
    tagline: "Complete business websites, portfolio sites, blogs, and WooCommerce stores",
    features: [
      "Complete WordPress website design & setup",
      "Custom page layouts with Elementor / Gutenberg",
      "WooCommerce store & product catalog setup",
      "Plugin configuration, contact forms & speed tuning"
    ],
    startingPrice: "Project Basis",
    turnaround: "3 - 7 Days"
  },
  {
    id: "shopify-website",
    title: "Shopify Website Making",
    iconName: "ShoppingBag",
    tagline: "High-converting Shopify online stores, theme customization, and checkout setup",
    features: [
      "Full Shopify store creation & theme setup",
      "Product catalog, variants & collection organization",
      "Payment gateway & shipping setup",
      "Mobile-friendly design & conversion optimization"
    ],
    startingPrice: "Project Basis",
    turnaround: "5 - 10 Days"
  },
  {
    id: "cms-builders",
    title: "Website Builders (Wix, Webflow, Framer)",
    iconName: "Layout",
    tagline: "Modern landing pages, company profiles, and visual CMS platforms",
    features: [
      "Visual website design on Framer, Webflow, and Wix",
      "Modern clean typography & interactive layouts",
      "Domain connection & live site launch",
      "Responsive layout adaptation for all screen sizes"
    ],
    startingPrice: "Project Basis",
    turnaround: "3 - 7 Days"
  },
  {
    id: "seo-maintenance",
    title: "Website SEO & Maintenance",
    iconName: "TrendingUp",
    tagline: "Google visibility, fast loading speed, and ongoing website management",
    features: [
      "On-page SEO setup & Google indexing",
      "Website speed audit & asset optimization",
      "Regular content updates & security backups",
      "Mobile UI fixes & responsiveness checks"
    ],
    startingPrice: "Monthly / Per-Audit",
    turnaround: "2 - 5 Days"
  }
];
