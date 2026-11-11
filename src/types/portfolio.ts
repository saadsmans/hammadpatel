export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'ece' | 'seo';
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  badge?: string;
  imageAlt: string;
}

export interface CourseDetail {
  code?: string;
  name: string;
  domain: 'rf-comm' | 'circuits-vlsi' | 'signals-dsp' | 'computing-web' | 'foundations';
  description: string;
  practicalApp: string;
}

export interface AcademicSemester {
  semester: number;
  term: string; // e.g. "Winter 2023", "Summer 2026", "Winter 2026"
  year: string;
  status: 'completed' | 'active-final-year';
  highlightCourse: string;
  courses: CourseDetail[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number;
    experience: string;
    highlight?: boolean;
  }[];
}

export interface LanguageSkill {
  name: string;
  proficiency: string;
  levelPercentage: number;
  badge: string;
}
