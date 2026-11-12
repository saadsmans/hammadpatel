import React, { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CyberSectionRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  effect?: 'glitch' | 'fade-up' | 'matrix-reveal';
}

export const CyberSectionReveal: React.FC<CyberSectionRevealProps> = ({
  children,
  className = '',
  threshold = 0.1,
  effect = 'glitch'
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const getEffectClass = () => {
    if (!isVisible) {
      return 'opacity-0 translate-y-6 filter blur-[2px] transition-all duration-700 ease-out';
    }

    switch (effect) {
      case 'glitch':
        return 'opacity-100 translate-y-0 filter-none transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-4';
      case 'fade-up':
        return 'opacity-100 translate-y-0 filter-none transition-all duration-700 ease-out';
      default:
        return 'opacity-100 translate-y-0 filter-none transition-all duration-700 ease-out';
    }
  };

  return (
    <div ref={ref} className={`${getEffectClass()} ${className}`}>
      {children}
    </div>
  );
};
