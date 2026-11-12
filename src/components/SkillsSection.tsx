import React, { useState } from 'react';
import { 
  Code2, 
  Radio, 
  Cpu, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Languages as LanguagesIcon,
  Zap
} from 'lucide-react';
import { SKILL_CATEGORIES, LANGUAGES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories = activeTab === 'all' 
    ? SKILL_CATEGORIES 
    : SKILL_CATEGORIES.filter(cat => cat.title.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section id="skills" className="py-24 relative bg-white dark:bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-3">
            <Cpu className="w-4 h-4 text-indigo-500" />
            Engineering & Software Stack
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            ECE &amp; Web Development Skills
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Strong academic and practical competencies across Electronics &amp; Communication Systems, VLSI &amp; Embedded Hardware, Scientific Programming, and Modern Web Development.
          </p>

          {/* Clean Segmented Filter Bar (Mobile Horizontal Swipe Support) */}
          <div className="flex sm:flex-wrap items-center overflow-x-auto pb-2 sm:pb-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 mt-8 text-xs font-semibold max-w-full scrollbar-none justify-start sm:justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Domains ({SKILL_CATEGORIES.length})
            </button>
            <button
              onClick={() => setActiveTab('electronics')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'electronics'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Core ECE, RF &amp; Satellite
            </button>
            <button
              onClick={() => setActiveTab('vlsi')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'vlsi'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              VLSI &amp; Embedded
            </button>
            <button
              onClick={() => setActiveTab('programming')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'programming'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Python, Java &amp; C
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'web'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Web Development
            </button>
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-7 sm:p-8 shadow-xl flex flex-col justify-between hover:border-indigo-500/60 transition-all hover:shadow-2xl"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100 dark:border-white/5">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shrink-0">
                    {category.iconName === 'Globe' && <Globe className="w-5 h-5" />}
                    {category.iconName === 'Code2' && <Code2 className="w-5 h-5" />}
                    {category.iconName === 'Radio' && <Radio className="w-5 h-5" />}
                    {category.iconName === 'Cpu' && <Cpu className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          {skill.name}
                          {skill.highlight && (
                            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
                              · Core
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-slate-500 dark:text-slate-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-400 rounded-full transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        {skill.experience}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Languages Competency Showcase */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-black text-white p-6 sm:p-10 shadow-2xl border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 flex items-center justify-center text-cyan-400 border border-indigo-500/40 shrink-0">
                <LanguagesIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-indigo-400">
                  Multilingual Fluency
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  Communication & Languages
                </h3>
                <p className="text-xs text-slate-300 max-w-md mt-0.5">
                  Facilitating seamless team collaboration, technical writing, and regional engagement across global and local engineering projects.
                </p>
              </div>
            </div>

            {/* Language Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.name}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{lang.name}</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {lang.proficiency}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">{lang.badge}</span>
                  <div className="w-full h-1 bg-white/10 rounded-full mt-2.5 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full" 
                      style={{ width: `${lang.levelPercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
