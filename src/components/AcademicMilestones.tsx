import React, { useState } from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Layers
} from 'lucide-react';
import { PERSONAL_INFO, ACADEMIC_SEMESTERS } from '../data/portfolioData';

export const AcademicMilestones: React.FC = () => {
  const [selectedSem, setSelectedSem] = useState<number>(6);

  const activeSemData = ACADEMIC_SEMESTERS.find(s => s.semester === selectedSem) || ACADEMIC_SEMESTERS[5];

  return (
    <section id="academics" className="py-24 relative bg-slate-900/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-indigo-400 uppercase mb-3">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            Academic Trajectory · Government Engineering College, Bharuch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Academic Milestones & Performance
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Documenting progressive performance, core electronics coursework, and analytical growth at Government Engineering College, Bharuch.
          </p>
        </div>

        {/* Primary Education Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left institution info */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                <span>{PERSONAL_INFO.academicDuration}</span>
                <span aria-hidden="true">·</span>
                <span>4-Year Full-Time Degree</span>
                <span aria-hidden="true">·</span>
                <span>GTU Affiliation</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mb-2">
                {PERSONAL_INFO.degree}
              </h3>
              
              <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-rose-500" />
                {PERSONAL_INFO.college}, {PERSONAL_INFO.location}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Underwent rigorous theoretical and laboratory training in digital system design, communication network theory, analog circuitry, signal processing, satellite systems, and microcontroller architecture. Maintained an upward academic record culminating in <strong className="text-indigo-400">6.38 CGPA</strong> through Semester 6.
              </p>

              {/* Clean Unboxed Key Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-white/5 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">Current Standing:</span>
                  <span className="font-bold text-slate-900 dark:text-white">Sem 6 Complete (Final Year)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Discipline:</span>
                  <span className="font-bold text-cyan-400">Electronics & Comm.</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Practicals:</span>
                  <span className="font-bold text-emerald-400">eSim & CircuitJS Certified</span>
                </div>
              </div>
            </div>

            {/* Right Standout CGPA Display */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-white shadow-2xl border border-white/10 text-center">
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-indigo-300 mb-1">
                Cumulative CGPA (Till Sem 6)
              </span>
              
              <div className="my-2 flex items-baseline justify-center gap-1">
                <span className="text-6xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-white">
                  {PERSONAL_INFO.cgpaTillSem6}
                </span>
                <span className="text-lg font-mono text-indigo-300">/ 10.0</span>
              </div>

              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Verified Semester 1 to 6 Trajectory</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Reflects steady semester-over-semester progression across core electrical physics, advanced circuit labs, and communication system examinations.
              </p>
            </div>

          </div>
        </div>

        {/* Semester-by-Semester Progression Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                Semester Progression & Course Highlights
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select any semester to inspect academic achievements and core subjects
              </p>
            </div>
            
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Sem 1 to Sem 6 Engineering Track
            </div>
          </div>

          {/* Segmented Semester Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-8">
            {ACADEMIC_SEMESTERS.slice(0, 6).map((sem) => {
              const isSelected = sem.semester === selectedSem;
              return (
                <button
                  key={sem.semester}
                  onClick={() => setSelectedSem(sem.semester)}
                  className={`p-3.5 rounded-2xl flex flex-col items-center text-center transition-all border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/25 scale-102'
                      : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/5'
                  }`}
                >
                  <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    Sem {sem.semester}
                  </span>
                  <span className="text-sm font-bold font-mono mt-0.5">
                    {sem.courses.length} Subjects
                  </span>
                  <span className={`text-[10px] mt-1 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {sem.term}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Semester Deep Dive */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-white/5">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Semester {activeSemData.semester} Details ({activeSemData.term})
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Core Focus: {activeSemData.highlightCourse}
                </h4>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Academic Standing:</span>
                  <span className="text-sm font-bold text-indigo-400">Semester {activeSemData.semester} Complete</span>
                </div>
                <div className="h-6 w-px bg-slate-300 dark:bg-white/10" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Cumulative Result:</span>
                  <span className="text-base font-bold text-emerald-400">{PERSONAL_INFO.cgpaTillSem6} CGPA</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2 uppercase font-mono">
                Official Semester Subjects:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeSemData.courses.map((course, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{course.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
