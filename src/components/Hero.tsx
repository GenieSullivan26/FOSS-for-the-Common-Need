import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

interface HeroProps {
  onOpenDonate?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const { t } = useAccessibility();
  const rawTitle = t('heroTitle');

  const renderTitle = (title: string) => {
    // English custom 3-line structured layout
    if (title.includes('Building Economic Democracy through User-Controlled Digital Tools')) {
      return (
        <span className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
          <span className="block">Building Economic Democracy</span>
          <span className="block text-2xl sm:text-4xl lg:text-5xl font-editorial italic text-[#806517]">
            through
          </span>
          <span className="block">
            <span className="relative inline-block px-1.5 py-0.5 z-10 mx-1">
              <span className="relative z-10 text-[#0D031B]">User-Controlled</span>
              <span
                className="absolute inset-0 bg-[#8FB31D] -z-10"
                style={{
                  borderRadius: '225px 15px 255px 15px/15px 225px 15px 255px',
                  transform: 'rotate(-0.8deg) scaleX(1.04) scaleY(0.82) translateY(2px)',
                }}
              />
            </span>{' '}
            Digital Tools.
          </span>
        </span>
      );
    }

    // Other language translations fallback
    const highlights = [
      'Controladas por Usuarios',
      'do Người dùng Kiểm soát',
      '用户控制的',
      'يتحكم فيها المستخدم',
    ];

    for (const phrase of highlights) {
      if (title.includes(phrase)) {
        const parts = title.split(phrase);
        return (
          <span className="text-center block">
            {parts[0]}
            <span className="relative inline-block px-1.5 py-0.5 z-10 mx-1">
              <span className="relative z-10 text-[#0D031B]">{phrase}</span>
              <span
                className="absolute inset-0 bg-[#8FB31D] -z-10"
                style={{
                  borderRadius: '225px 15px 255px 15px/15px 225px 15px 255px',
                  transform: 'rotate(-0.8deg) scaleX(1.04) scaleY(0.82) translateY(2px)',
                }}
              />
            </span>
            {parts[1]}
          </span>
        );
      }
    }

    return <span className="text-center block">{title}</span>;
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b-2 border-[#0D031B] bg-[#FAF0E6] bg-graph-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Centered Hero Headline */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0D031B] tracking-tight leading-[1.2] mb-6 font-editorial flex justify-center">
            {renderTitle(rawTitle)}
          </h1>

          <p className="text-base sm:text-xl text-[#0D031B]/90 leading-relaxed max-w-3xl mx-auto font-medium text-center">
            {t('heroDesc')}
          </p>
        </div>
      </div>
    </section>
  );
};
