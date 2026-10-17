import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { useAccessibility } from '../context/AccessibilityContext';

interface FooterProps {
  onOpenDonate?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const { t } = useAccessibility();
  const [copied, setCopied] = useState(false);
  const email = 'fossforthecommonneed@proton.me';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#0D031B] text-[#FAF0E6] border-t-4 border-[#8FB31D] py-16 text-xs font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand & Bio */}
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center">
            <LogoMark size="lg" variant="dark" />
          </div>

          <p className="text-[#FAF0E6]/90 leading-relaxed font-medium text-sm">
            {t('footerDesc')}
          </p>

          {/* Contact Section */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-[#DAEE01] text-sm font-mono">
            <span className="text-[#FAF0E6]">{t('getInTouch')}</span>
            <div className="inline-flex items-center gap-2 bg-[#0D031B] border-2 border-[#806517] rounded-xl px-3.5 py-2 shadow-[2px_2px_0px_#DAEE01]">
              <Mail className="w-4 h-4 text-[#8FB31D] shrink-0" />
              <a
                href={`mailto:${email}`}
                className="text-[#DAEE01] hover:text-[#FAF0E6] font-mono text-xs sm:text-sm transition-colors hover:underline font-bold"
              >
                {email}
              </a>
              <button
                onClick={handleCopy}
                title="Copy email address"
                className="ml-1 p-1 text-[#DAEE01] hover:text-[#FAF0E6] rounded hover:bg-[#806517]/30 transition-colors cursor-pointer"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#8FB31D]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            {copied && (
              <span className="text-xs text-[#8FB31D] font-mono font-bold">
                {t('copied')}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
