import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Layers, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  Activity, 
  Globe, 
  Compass, 
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { ACADEMIC_SEMESTERS, PERSONAL_INFO } from '../data/portfolioData';
import { CourseDetail } from '../types/portfolio';

export const CourseworkExplorer: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<number>(6);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collect all courses with semester info for global searching
  const allCoursesWithMeta = useMemo(() => {
    const list: { course: CourseDetail; semNumber: number; semTerm: string; semStatus: string }[] = [];
    ACADEMIC_SEMESTERS.forEach(s => {
      s.courses.forEach(c => {
        list.push({
          course: c,
          semNumber: s.semester,
          semTerm: s.term,
          semStatus: s.status
        });
      });
    });
    return list;
  }, []);

  // Filtered list
  const filteredCourses = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return allCoursesWithMeta.filter(item => 
        item.course.name.toLowerCase().includes(q) ||
        item.course.description.toLowerCase().includes(q) ||
        item.course.practicalApp.toLowerCase().includes(q)
      );
    }

    // Otherwise filter by selected semester
    const currentSemData = ACADEMIC_SEMESTERS.find(s => s.semester === selectedSemester);
    if (!currentSemData) return [];

    let courses = currentSemData.courses.map(c => ({
      course: c,
      semNumber: currentSemData.semester,
      semTerm: currentSemData.term,
      semStatus: currentSemData.status
    }));

    if (selectedDomain !== 'all') {
      courses = courses.filter(item => item.course.domain === selectedDomain);
    }

    return courses;
  }, [searchQuery, selectedSemester, selectedDomain, allCoursesWithMeta]);

  const activeSemData = ACADEMIC_SEMESTERS.find(s => s.semester === selectedSemester) || ACADEMIC_SEMESTERS[5];

  const getDomainLabel = (domain: string) => {
    switch(domain) {
      case 'rf-comm': return 'RF & Telecommunications';
      case 'circuits-vlsi': return 'Circuits, Hardware & VLSI';
      case 'signals-dsp': return 'Signals & DSP';
      case 'computing-web': return 'Computing, Web & AI';
      default: return 'Foundational Sciences & Design';
    }
  };

  const getDomainIcon = (domain: string) => {
    switch(domain) {
      case 'rf-comm': return <Radio className="w-3.5 h-3.5 text-cyan-400" />;
      case 'circuits-vlsi': return <Cpu className="w-3.5 h-3.5 text-indigo-400" />;
      case 'signals-dsp': return <Activity className="w-3.5 h-3.5 text-emerald-400" />;
      case 'computing-web': return <Globe className="w-3.5 h-3.5 text-amber-400" />;
      default: return <Compass className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <section id="coursework" className="py-24 relative bg-slate-100/60 dark:bg-[#07090e] border-y border-slate-200/80 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-3">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            Complete Academic Syllabus · Sem 1 to Sem 7 (2023–2026)
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Engineering Coursework & Syllabus Matrix
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            In-depth academic mastery across all 7 semesters at Government Engineering College, Bharuch. Spanning Satellite Communication, Radar (RNA), Antennas, VLSI, DSP, Fiber Optics, and Web Technology.
          </p>

          {/* Quick Search Bar */}
          <div className="w-full max-w-xl mt-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 44+ subjects (e.g. Radar, Satellite, VLSI, Web, DSP)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* If Not Searching: Show Semester Navigation Tabs */}
        {!searchQuery && (
          <div className="space-y-6 mb-10">
            {/* Semester Buttons Row (Horizontal Swipe on Mobile, 7 cols on Desktop) */}
            <div className="flex md:grid md:grid-cols-7 gap-2.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {ACADEMIC_SEMESTERS.map((sem) => {
                const isSelected = sem.semester === selectedSemester;
                const isFinalYear = sem.semester === 7;

                return (
                  <button
                    key={sem.semester}
                    onClick={() => setSelectedSemester(sem.semester)}
                    className={`min-w-[130px] md:min-w-0 p-3 sm:p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-xl shadow-indigo-600/25 scale-102'
                        : 'bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[11px] font-mono font-bold uppercase ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                          Sem {sem.semester}
                        </span>
                        {isFinalYear && (
                          <span className={`text-[9px] font-mono font-semibold px-1 py-0.2 rounded ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold block line-clamp-1">
                        {sem.term}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5 flex items-baseline justify-between text-[11px] font-mono">
                      <span className={isSelected ? 'text-indigo-100' : 'text-slate-500'}>
                        {sem.courses.length} Subjects
                      </span>
                      <span className={`font-semibold ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {sem.semester <= 6 ? 'Evaluated' : 'Final Year'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Semester Summary Banner */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold uppercase mb-1">
                  <span>Semester {activeSemData.semester} ({activeSemData.term})</span>
                  <span>·</span>
                  <span>{activeSemData.status === 'completed' ? 'Completed Academic Curriculum' : 'Active Final Year Syllabus'}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Focus: {activeSemData.highlightCourse}
                </h3>
              </div>

              {/* Overall Verified CGPA Badge */}
              <div className="flex items-center gap-3 font-mono text-xs shrink-0">
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px]">Overall Degree Score:</span>
                  <span className="text-base font-bold text-emerald-500 dark:text-emerald-400">
                    {PERSONAL_INFO.cgpaTillSem6} CGPA (till Sem 6)
                  </span>
                </div>
              </div>
            </div>

            {/* Domain Filter Pills for Active Semester */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400 mr-1 font-mono text-[11px]">Filter Domain:</span>
              {[
                { id: 'all', label: 'All Subjects' },
                { id: 'rf-comm', label: 'RF & Telecommunications' },
                { id: 'circuits-vlsi', label: 'Circuits & VLSI' },
                { id: 'signals-dsp', label: 'Signals & DSP' },
                { id: 'computing-web', label: 'Computing, Web & AI' },
                { id: 'foundations', label: 'Core Foundations' }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDomain(d.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedDomain === d.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Searching Header Indicator */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Found {filteredCourses.length} subjects matching &quot;{searchQuery}&quot;</span>
            <button onClick={() => setSearchQuery('')} className="text-indigo-400 underline">
              Show by Semester
            </button>
          </div>
        )}

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((item, idx) => (
            <div
              key={`${item.course.name}-${idx}`}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xl flex flex-col justify-between hover:border-indigo-500/60 transition-all hover:shadow-2xl"
            >
              <div>
                {/* Card Top: Semester and Domain */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    Sem {item.semNumber} ({item.semTerm})
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                    {getDomainIcon(item.course.domain)}
                    <span className="truncate max-w-[130px]">{getDomainLabel(item.course.domain)}</span>
                  </div>
                </div>

                {/* Course Name */}
                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 leading-snug">
                  {item.course.name}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.course.description}
                </p>
              </div>

              {/* Practical Application Highlight Box */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Practical Application & Lab:
                </span>
                <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-white/5 leading-relaxed">
                  {item.course.practicalApp}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
