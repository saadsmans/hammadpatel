import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight, 
  X, 
  Sparkles,
  Cpu,
  Code2,
  Terminal,
  Coffee,
  Palette,
  ShoppingBag,
  Server,
  Activity,
  TrendingUp,
  FileCode,
  Filter,
  RotateCcw,
  Info
} from 'lucide-react';
import { PROJECTS, IMAGES } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { InteractiveSignalLab } from './InteractiveSignalLab';

interface TechConfig {
  label: string;
  category: 'frontend' | 'backend' | 'hardware' | 'growth';
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
  roleDescription: string;
}

const TECH_DEFINITIONS: Record<string, TechConfig> = {
  'React 19': {
    label: 'React 19',
    category: 'frontend',
    color: '#06b6d4',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    bgColor: 'bg-cyan-500/10 hover:bg-cyan-500/20 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/60',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    icon: <Code2 className="w-3 h-3 text-cyan-500 shrink-0" />,
    roleDescription: 'Concurrent UI rendering, reactive state management, and modular hook architecture.'
  },
  'Tailwind CSS': {
    label: 'Tailwind CSS',
    category: 'frontend',
    color: '#38bdf8',
    borderColor: 'border-sky-500/40 hover:border-sky-400',
    bgColor: 'bg-sky-500/10 hover:bg-sky-500/20 dark:bg-sky-950/40 dark:hover:bg-sky-900/60',
    textColor: 'text-sky-700 dark:text-sky-300',
    icon: <Palette className="w-3 h-3 text-sky-500 shrink-0" />,
    roleDescription: 'Modern utility-first styling, dark/light theme switching, and fluid responsive design.'
  },
  'Python': {
    label: 'Python',
    category: 'backend',
    color: '#eab308',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    bgColor: 'bg-amber-500/10 hover:bg-amber-500/20 dark:bg-amber-950/40 dark:hover:bg-amber-900/60',
    textColor: 'text-amber-700 dark:text-amber-300',
    icon: <Terminal className="w-3 h-3 text-amber-500 shrink-0" />,
    roleDescription: 'Numerical FFT signal calculations, automated data parsing, and scientific scripts.'
  },
  'Java': {
    label: 'Java',
    category: 'backend',
    color: '#f97316',
    borderColor: 'border-orange-500/40 hover:border-orange-400',
    bgColor: 'bg-orange-500/10 hover:bg-orange-500/20 dark:bg-orange-950/40 dark:hover:bg-orange-900/60',
    textColor: 'text-orange-700 dark:text-orange-300',
    icon: <Coffee className="w-3 h-3 text-orange-500 shrink-0" />,
    roleDescription: 'Enterprise object-oriented backend architecture, data structures, and REST endpoints.'
  },
  'TypeScript': {
    label: 'TypeScript',
    category: 'frontend',
    color: '#3b82f6',
    borderColor: 'border-blue-500/40 hover:border-blue-400',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/20 dark:bg-blue-950/40 dark:hover:bg-blue-900/60',
    textColor: 'text-blue-700 dark:text-blue-300',
    icon: <FileCode className="w-3 h-3 text-blue-500 shrink-0" />,
    roleDescription: 'Strict compile-time type validation, typed interfaces, and zero-runtime-type-errors.'
  },
  'WordPress': {
    label: 'WordPress',
    category: 'backend',
    color: '#0284c7',
    borderColor: 'border-sky-600/40 hover:border-sky-500',
    bgColor: 'bg-sky-600/10 hover:bg-sky-600/20 dark:bg-sky-950/50 dark:hover:bg-sky-900/60',
    textColor: 'text-sky-800 dark:text-sky-200',
    icon: <Globe className="w-3 h-3 text-sky-600 shrink-0" />,
    roleDescription: 'Custom theme creation, custom post types, Gutenberg blocks, and editorial pipeline.'
  },
  'PHP': {
    label: 'PHP',
    category: 'backend',
    color: '#8b5cf6',
    borderColor: 'border-purple-500/40 hover:border-purple-400',
    bgColor: 'bg-purple-500/10 hover:bg-purple-500/20 dark:bg-purple-950/40 dark:hover:bg-purple-900/60',
    textColor: 'text-purple-700 dark:text-purple-300',
    icon: <Server className="w-3 h-3 text-purple-500 shrink-0" />,
    roleDescription: 'Server-side rendering, relational MySQL querying, and security sanitation.'
  },
  'Shopify Liquid': {
    label: 'Shopify Liquid',
    category: 'frontend',
    color: '#10b981',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    bgColor: 'bg-emerald-500/10 hover:bg-emerald-500/20 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    icon: <ShoppingBag className="w-3 h-3 text-emerald-500 shrink-0" />,
    roleDescription: 'Custom Shopify sections, Liquid templating engine, and high-conversion cart flows.'
  },
  'HTML5 Canvas': {
    label: 'HTML5 Canvas',
    category: 'frontend',
    color: '#14b8a6',
    borderColor: 'border-teal-500/40 hover:border-teal-400',
    bgColor: 'bg-teal-500/10 hover:bg-teal-500/20 dark:bg-teal-950/40 dark:hover:bg-teal-900/60',
    textColor: 'text-teal-700 dark:text-teal-300',
    icon: <Activity className="w-3 h-3 text-teal-500 shrink-0" />,
    roleDescription: 'Real-time 60 FPS CRT phosphor oscilloscope tracing, graticule grids, and waveform math.'
  },
  'CircuitJS Logic': {
    label: 'CircuitJS Logic',
    category: 'hardware',
    color: '#6366f1',
    borderColor: 'border-indigo-500/40 hover:border-indigo-400',
    bgColor: 'bg-indigo-500/10 hover:bg-indigo-500/20 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    icon: <Cpu className="w-3 h-3 text-indigo-500 shrink-0" />,
    roleDescription: 'Interactive SPICE node calculations, transient analysis, and Kirchhoff circuit models.'
  },
  'Web Audio API': {
    label: 'Web Audio API',
    category: 'hardware',
    color: '#ec4899',
    borderColor: 'border-pink-500/40 hover:border-pink-400',
    bgColor: 'bg-pink-500/10 hover:bg-pink-500/20 dark:bg-pink-950/40 dark:hover:bg-pink-900/60',
    textColor: 'text-pink-700 dark:text-pink-300',
    icon: <Activity className="w-3 h-3 text-pink-500 shrink-0" />,
    roleDescription: 'Synthesizing audible harmonic tones matching real circuit oscillator frequencies.'
  },
  'Technical SEO': {
    label: 'Technical SEO',
    category: 'growth',
    color: '#d946ef',
    borderColor: 'border-fuchsia-500/40 hover:border-fuchsia-400',
    bgColor: 'bg-fuchsia-500/10 hover:bg-fuchsia-500/20 dark:bg-fuchsia-950/40 dark:hover:bg-fuchsia-900/60',
    textColor: 'text-fuchsia-700 dark:text-fuchsia-300',
    icon: <TrendingUp className="w-3 h-3 text-fuchsia-500 shrink-0" />,
    roleDescription: 'Schema.org JSON-LD microdata, Core Web Vitals optimization, and 98+ PageSpeed.'
  },
  'Schema.org JSON-LD': {
    label: 'Schema.org JSON-LD',
    category: 'growth',
    color: '#a855f7',
    borderColor: 'border-purple-500/40 hover:border-purple-400',
    bgColor: 'bg-purple-500/10 hover:bg-purple-500/20 dark:bg-purple-950/40 dark:hover:bg-purple-900/60',
    textColor: 'text-purple-700 dark:text-purple-300',
    icon: <TrendingUp className="w-3 h-3 text-purple-500 shrink-0" />,
    roleDescription: 'Rich search engine snippet cards, structured entity graphs, and OpenGraph metadata.'
  },
  'Core Web Vitals': {
    label: 'Core Web Vitals',
    category: 'growth',
    color: '#10b981',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    bgColor: 'bg-emerald-500/10 hover:bg-emerald-500/20 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    icon: <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />,
    roleDescription: 'Sub-second LCP, 0 CLS layout stability, and optimized browser render thread.'
  },
  'MySQL': {
    label: 'MySQL',
    category: 'backend',
    color: '#0284c7',
    borderColor: 'border-cyan-600/40 hover:border-cyan-500',
    bgColor: 'bg-cyan-600/10 hover:bg-cyan-600/20 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/60',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    icon: <Server className="w-3 h-3 text-cyan-600 shrink-0" />,
    roleDescription: 'Relational data indexing, order records, customer queries, and caching.'
  },
  'REST API': {
    label: 'REST API',
    category: 'backend',
    color: '#64748b',
    borderColor: 'border-slate-500/40 hover:border-slate-400',
    bgColor: 'bg-slate-500/10 hover:bg-slate-500/20 dark:bg-slate-800 dark:hover:bg-slate-700',
    textColor: 'text-slate-700 dark:text-slate-300',
    icon: <Code2 className="w-3 h-3 text-slate-500 shrink-0" />,
    roleDescription: 'JSON endpoints, secure bearer authentication, and microservice integration.'
  }
};

export const ProjectsSection: React.FC = () => {
  const [selectedWebProject, setSelectedWebProject] = useState<Project | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);
  const [hoveredBadge, setHoveredBadge] = useState<{ tech: string; role: string } | null>(null);

  const getProjectImage = (id: string) => {
    if (id === 'e-commerce-platform') return IMAGES.ecommerceMockup;
    if (id === 'circuit-waveform-studio') return IMAGES.microchipCircuit;
    if (id === 'wordpress-custom-cms') return IMAGES.satelliteDish;
    if (id === 'seo-optimization-engine') return IMAGES.heroSatellite;
    return IMAGES.ecommerceMockup;
  };

  // Base list of web and CMS projects below the flagship studio
  const webProjects = useMemo(() => {
    return PROJECTS.filter(p => p.id !== 'circuit-waveform-studio');
  }, []);

  // Filtered projects based on active interactive technology badge selection
  const filteredProjects = useMemo(() => {
    if (!activeTechFilter) return webProjects;
    return webProjects.filter(p => 
      p.technologies.some(t => t.toLowerCase() === activeTechFilter.toLowerCase())
    );
  }, [webProjects, activeTechFilter]);

  // Key technologies available for quick interactive filtering
  const highlightedTechs = ['WordPress', 'Shopify Liquid', 'Tailwind CSS', 'React 19', 'Python', 'Java', 'TypeScript', 'PHP'];

  const handleTechClick = (techName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeTechFilter === techName) {
      setActiveTechFilter(null); // toggle off
    } else {
      setActiveTechFilter(techName);
      // Smooth scroll to the projects section grid
      const el = document.getElementById('commercial-projects-grid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const renderInteractiveBadge = (techName: string, isClickable: boolean = true) => {
    const config = TECH_DEFINITIONS[techName] || {
      label: techName,
      category: 'frontend',
      color: '#6366f1',
      borderColor: 'border-slate-300 dark:border-white/10 hover:border-indigo-400',
      bgColor: 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700',
      textColor: 'text-slate-800 dark:text-slate-200',
      icon: <Code2 className="w-3 h-3 text-indigo-400 shrink-0" />,
      roleDescription: `${techName} integrated into application architecture.`
    };

    const isFiltered = activeTechFilter === techName;

    return (
      <div 
        key={techName} 
        className="relative inline-block group"
        onMouseEnter={() => setHoveredBadge({ tech: techName, role: config.roleDescription })}
        onMouseLeave={() => setHoveredBadge(null)}
      >
        <button
          type="button"
          onClick={(e) => isClickable ? handleTechClick(techName, e) : undefined}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold transition-all duration-200 border shadow-xs ${
            config.bgColor
          } ${
            isFiltered 
              ? 'ring-2 ring-indigo-500 scale-105 border-indigo-500 shadow-md' 
              : config.borderColor
          } ${config.textColor} ${isClickable ? 'cursor-pointer hover:scale-103' : 'cursor-default'}`}
          title={`Click to filter projects built with ${techName}`}
        >
          {config.icon}
          <span>{techName}</span>
        </button>
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-24 relative bg-slate-50 dark:bg-[#06080e] border-t border-slate-200/80 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-3">
            <Layers className="w-4 h-4 text-indigo-500" />
            Engineering Portfolio & Flagship Laboratory
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Virtual Circuit Studio & Web Engineering Portfolio
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            Featuring the flagship <strong>Virtual Circuit & Waveform Studio</strong> modeled on IIT Bombay eSim & CircuitJS methodologies, alongside commercial Shopify, WordPress, and React 19 web platforms.
          </p>
        </div>

        {/* 1. Flagship Centerpiece: Virtual Circuit & Waveform Studio */}
        <div className="mb-20">
          <InteractiveSignalLab />
        </div>

        {/* 2. Commercial Web, Shopify & CMS Development Portfolio */}
        <div id="commercial-projects-grid">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-1">
                <Globe className="w-4 h-4 text-indigo-500" />
                Website Creation, E-Commerce & CMS Platforms
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                WordPress Website Making, Shopify Stores & CMS
              </h3>
            </div>
            
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Interactive Stack Badges · Click to Filter Builds
            </p>
          </div>

          {/* Interactive Technology Stack Filter Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-indigo-500" />
                <span>Filter By Stack:</span>
              </span>

              {/* "All" button */}
              <button
                onClick={() => setActiveTechFilter(null)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  activeTechFilter === null
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All Tools ({webProjects.length})
              </button>

              {/* Technology Filter Chips */}
              {highlightedTechs.map((tech) => {
                const config = TECH_DEFINITIONS[tech];
                const isSelected = activeTechFilter === tech;
                return (
                  <button
                    key={tech}
                    onClick={() => handleTechClick(tech)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm scale-102'
                        : `${config.bgColor} ${config.borderColor} ${config.textColor}`
                    }`}
                  >
                    {config.icon}
                    <span>{tech}</span>
                  </button>
                );
              })}
            </div>

            {/* Active filter status pill & clear action */}
            {activeTechFilter && (
              <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 px-3 py-1 rounded-xl text-xs font-mono text-indigo-700 dark:text-indigo-300 shrink-0">
                <span>Filtering: <strong>{activeTechFilter}</strong> ({filteredProjects.length} builds)</span>
                <button
                  onClick={() => setActiveTechFilter(null)}
                  className="p-1 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-lg text-indigo-600 dark:text-indigo-200 transition-colors"
                  title="Clear filter"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Interactive Tooltip Helper Banner (Shows what the hovered badge does in that build) */}
          {hoveredBadge && (
            <div className="mb-6 p-3 px-4 rounded-xl bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-500/20 text-xs font-mono text-indigo-700 dark:text-indigo-300 flex items-center gap-2.5 animate-in fade-in">
              <Info className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                <strong className="text-slate-900 dark:text-white">{hoveredBadge.tech}</strong>: {hoveredBadge.role}
              </span>
            </div>
          )}

          {/* Projects Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const projectImg = getProjectImage(project.id);

              return (
                <div
                  key={project.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/60 transition-all duration-300 hover:shadow-2xl group"
                >
                  {/* Image Header */}
                  <div className="relative w-full h-52 overflow-hidden bg-slate-950">
                    <img
                      src={projectImg}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                    
                    <div className="absolute top-3 left-3 text-[11px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      {project.badge}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-semibold truncate">{project.subtitle}</span>
                      <span className="text-[11px] font-mono text-cyan-300">View Specs →</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Performance Metrics */}
                      <div className="space-y-1.5 mb-5">
                        {project.metrics.map((m, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Interactive Technology Stack Badges */}
                      <div className="pt-3 border-t border-slate-100 dark:border-white/5 mb-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                            Tools & Technology Stack:
                          </span>
                          <span className="text-[10px] font-mono text-indigo-400">
                            Click to Filter
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((t) => renderInteractiveBadge(t, true))}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedWebProject(project)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-1.5 shadow"
                      >
                        <span>Inspect Technical Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 p-8">
              <p className="text-sm font-mono text-slate-500 mb-3">
                No projects found with tag &quot;{activeTechFilter}&quot;.
              </p>
              <button
                onClick={() => setActiveTechFilter(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-mono font-bold"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Project Specs Modal with Deep Interactive Tech Badges */}
      {selectedWebProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedWebProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-indigo-500 dark:text-indigo-400">
              <span>{selectedWebProject.badge}</span>
              <span>·</span>
              <span>Hammad Patel Engineering Portfolio</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-1">
              {selectedWebProject.title}
            </h3>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
              {selectedWebProject.subtitle}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {selectedWebProject.longDescription}
            </p>

            {/* Interactive Stack in Modal */}
            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Integrated Technology Stack & Implementation Role:
              </h4>
              <div className="space-y-2">
                {selectedWebProject.technologies.map((tech) => {
                  const config = TECH_DEFINITIONS[tech];
                  return (
                    <div 
                      key={tech} 
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 flex items-start gap-3"
                    >
                      <div className="mt-0.5">
                        {renderInteractiveBadge(tech, false)}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
                        {config ? config.roleDescription : 'Core architectural module.'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Deliverables & Architecture:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedWebProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Metrics & Quality Indicators:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedWebProject.metrics.map((m, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedWebProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <a
                href="#hire-me"
                onClick={() => setSelectedWebProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500"
              >
                Commission Similar Project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
