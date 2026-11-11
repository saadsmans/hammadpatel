import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CourseworkExplorer } from './components/CourseworkExplorer';
import { AcademicMilestones } from './components/AcademicMilestones';
import { IITBombayExperience } from './components/IITBombayExperience';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { HireMeSection } from './components/HireMeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hammad_theme');
      if (stored) return stored === 'dark';
      return true; // Default to dark obsidian aesthetic
    }
    return true;
  });

  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('hammad_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('hammad_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleOpenCV = () => {
    setIsCVModalOpen(true);
  };

  const handleCloseCV = () => {
    setIsCVModalOpen(false);
  };

  const handleOpenHireMe = () => {
    const el = document.getElementById('hire-me');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-indigo-500 selection:text-white">
      {/* Subtle micro-dot technical grid */}
      <div className="fixed inset-0 tech-grid pointer-events-none opacity-40 dark:opacity-20 z-0" />

      {/* Sticky morphing pill header */}
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenCV={handleOpenCV}
        onOpenHireMe={handleOpenHireMe}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero with Syne typography, 3D WebGL Canvas & full-width KPI strip */}
        <HeroSection
          isDarkMode={isDarkMode}
          onOpenCV={handleOpenCV}
          onOpenHireMe={handleOpenHireMe}
        />

        {/* 2. About Hammad Patel */}
        <AboutSection
          onOpenCV={handleOpenCV}
          onOpenHireMe={handleOpenHireMe}
        />

        {/* 3. Comprehensive Academic Coursework Syllabus (Sem 1 to Sem 7: 2023–2026) */}
        <CourseworkExplorer />

        {/* 4. Academic Milestones (6.38 CGPA till Sem 6 @ GEC Bharuch) */}
        <AcademicMilestones />

        {/* 5. IIT Bombay Spoken Tutorial Internship */}
        <IITBombayExperience />

        {/* 6. Unified My Projects & Interactive Engineering Suite (Circuit Lab, Radar RNA, Satellite Tool, Web Platforms) */}
        <ProjectsSection />

        {/* 7. Skills & Engineering Competencies (Web, Shopify, WordPress, Java, Python, ECE) */}
        <SkillsSection />

        {/* 8. Dedicated Hire Me Section & Scope Builder */}
        <HireMeSection />

        {/* 9. Direct Contact Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenCV={handleOpenCV}
        onOpenHireMe={handleOpenHireMe}
      />

      {/* Viewable and Downloadable CV Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={handleCloseCV}
      />
    </div>
  );
}

export default App;
