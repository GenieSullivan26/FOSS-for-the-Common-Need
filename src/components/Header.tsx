import React from 'react';
import { LogoMark } from './LogoMark';
import { Languages } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

interface HeaderProps {
  onOpenDonate?: () => void;
  onOpenAccessibility?: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenAccessibility
}) => {
  const { t, settings } = useAccessibility();

  const navLinks = [
    { id: 'about', label: t('about') },
    { id: 'pillars', label: t('actions') },
    { id: 'alpha', label: t('apps') },
  ];

  const currentLangCode = settings.language.toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-[#8FB31D] border-b-2 border-[#0D031B] shadow-[0_4px_0px_#0D031B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-3 sm:gap-4">
          {/* Logo / Brand */}
          <button
            onClick={() => onNavigate('about')}
            className="flex items-center text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#806517] rounded-md p-1 transition-all cursor-pointer shrink-0"
            aria-label="FOSS for The Common Need Home"
          >
            <LogoMark size="md" variant="light" />
          </button>

          {/* Right Navigation & Accessibility Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Header Tabs */}
            <nav className="flex items-center gap-1 sm:gap-1.5 bg-[#FAF0E6] border-2 border-[#0D031B] p-1 sm:p-1.5 rounded-full shadow-[2px_2px_0px_#0D031B]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer whitespace-nowrap border-2 ${
                      isActive
                        ? 'bg-[#0D031B] text-[#FAF0E6] border-[#806517] shadow-[2px_2px_0px_#806517]'
                        : 'bg-transparent text-[#0D031B] border-transparent hover:border-[#0D031B] hover:bg-[#8FB31D]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Accessibility & Language Trigger Button */}
            <button
              onClick={onOpenAccessibility}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border-2 border-[#0D031B] bg-[#0D031B] text-[#DAEE01] hover:bg-[#806517] hover:text-[#FAF0E6] text-xs font-mono font-bold shadow-[2px_2px_0px_#806517] transition cursor-pointer shrink-0"
              aria-label="Open Accessibility and Language Settings"
              title="Accessibility & Language Settings"
            >
              <Languages className="w-4 h-4 text-[#8FB31D]" />
              <span className="hidden sm:inline">Accessibility</span>
              <span className="px-1 py-0.2 text-[10px] rounded bg-[#806517] text-[#FAF0E6] font-bold">
                {currentLangCode}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
