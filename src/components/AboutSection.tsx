import React, { useState } from 'react';
import { MISSION_STATEMENT, VISION_STATEMENT, ECONOMIC_PILLARS, CORE_ACTIVITIES } from '../data/projectData';
import { CheckCircle } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export const AboutSection: React.FC = () => {
  const { t } = useAccessibility();

  // Dynamic Localized Economic Pillars
  const economicPillars = [
    {
      id: 'purchasing-power',
      category: t('p1Category'),
      title: t('p1Title'),
      problem: t('p1Problem'),
      solution: t('p1Solution'),
      metric: t('p1Metric'),
    },
    {
      id: 'business-models',
      category: t('p2Category'),
      title: t('p2Title'),
      problem: t('p2Problem'),
      solution: t('p2Solution'),
      metric: t('p2Metric'),
    },
    {
      id: 'nonprofit-sustainability',
      category: t('p3Category'),
      title: t('p3Title'),
      problem: t('p3Problem'),
      solution: t('p3Solution'),
      metric: t('p3Metric'),
    },
    {
      id: 'public-finance',
      category: t('p4Category'),
      title: t('p4Title'),
      problem: t('p4Problem'),
      solution: t('p4Solution'),
      metric: t('p4Metric'),
    },
  ];

  // Dynamic Localized Core Activities
  const coreActivities = [
    {
      title: t('act1Title'),
      subtitle: t('act1Subtitle'),
      description: t('act1Desc'),
    },
    {
      title: t('act2Title'),
      subtitle: t('act2Subtitle'),
      description: t('act2Desc'),
    },
    {
      title: t('act3Title'),
      subtitle: t('act3Subtitle'),
      description: t('act3Desc'),
    },
    {
      title: t('act4Title'),
      subtitle: t('act4Subtitle'),
      description: t('act4Desc'),
    },
  ];

  // Activities Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Pillars Carousel State
  const [currentPillarSlide, setCurrentPillarSlide] = useState(0);
  const [pillarTouchStart, setPillarTouchStart] = useState<number | null>(null);
  const [pillarTouchEnd, setPillarTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  // Touch Handlers for Activities
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < coreActivities.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Touch Handlers for Pillars
  const onPillarTouchStart = (e: React.TouchEvent) => {
    setPillarTouchEnd(null);
    setPillarTouchStart(e.targetTouches[0].clientX);
  };

  const onPillarTouchMove = (e: React.TouchEvent) => {
    setPillarTouchEnd(e.targetTouches[0].clientX);
  };

  const onPillarTouchEnd = () => {
    if (!pillarTouchStart || !pillarTouchEnd) return;
    const distance = pillarTouchStart - pillarTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPillarSlide < economicPillars.length - 1) {
      setCurrentPillarSlide((prev) => prev + 1);
    }
    if (isRightSwipe && currentPillarSlide > 0) {
      setCurrentPillarSlide((prev) => prev - 1);
    }
  };

  return (
    <section id="about" className="py-20 sm:py-28 border-b-2 border-[#0D031B] bg-[#FAF0E6] text-[#0D031B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Origin, Mission & Vision Header */}
        <div className="max-w-4xl mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0D031B] font-editorial leading-tight">
            {t('missionTitle')}
          </h2>
        </div>

        {/* Side-by-Side Symmetrical Mission & Vision Dossier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Card 1: Charitable Mission Statement */}
          <div className="rounded-2xl p-7 sm:p-10 flex flex-col justify-between border-2 border-[#0D031B] shadow-[4px_4px_0px_#DAEE01] bg-[#8FB31D] relative">
            <span className="absolute -top-3 left-6 bg-[#0D031B] text-[#DAEE01] font-mono text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider border border-[#0D031B]">
              [ {t('charitableMission')} ]
            </span>

            <div>
              <blockquote className="text-xl sm:text-2xl text-[#0D031B] font-editorial italic leading-relaxed pt-2">
                “{t('missionStatement')}”
              </blockquote>
            </div>
          </div>

          {/* Card 2: Long-Term Systemic Vision */}
          <div className="rounded-2xl p-7 sm:p-10 flex flex-col justify-between border-2 border-[#0D031B] shadow-[4px_4px_0px_#DAEE01] bg-[#FAF0E6] relative">
            <span className="absolute -top-3 left-6 bg-[#806517] text-[#FAF0E6] font-mono text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider border border-[#0D031B]">
              [ {t('systemicVision')} ]
            </span>

            <div>
              <blockquote className="text-xl sm:text-2xl text-[#0D031B] font-editorial italic leading-relaxed pt-2">
                “{t('visionStatement')}”
              </blockquote>
            </div>
          </div>
        </div>

        {/* Swipable The Four Economic Pillars Carousel */}
        <div id="pillars" className="mb-24 pt-6">
          <div className="border-b-2 border-[#0D031B] pb-4 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#806517] bg-[#8FB31D] px-2.5 py-1 rounded-md border border-[#0D031B]">
                {t('whyThisMatters')}
              </span>
              <h3 className="text-2xl sm:text-4xl font-normal text-[#0D031B] mt-3 font-editorial">
                {t('addressingProblems')}
              </h3>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {economicPillars.map((pillar, pIdx) => (
                <button
                  key={pillar.id}
                  onClick={() => setCurrentPillarSlide(pIdx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 transition cursor-pointer ${
                    currentPillarSlide === pIdx
                      ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                      : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                  }`}
                >
                  {pIdx + 1}. {pillar.category}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#0D031B]/80 font-medium leading-relaxed mb-8">
            {t('pillarsDesc')}
          </p>

          {/* Swipable Pillar Card Frame */}
          <div
            onTouchStart={onPillarTouchStart}
            onTouchMove={onPillarTouchMove}
            onTouchEnd={onPillarTouchEnd}
            className="relative overflow-hidden touch-pan-y rounded-2xl"
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentPillarSlide * 100}%)` }}
            >
              {economicPillars.map((pillar, pIdx) => (
                <div key={pillar.id} className="w-full shrink-0 px-1">
                  <div className="rounded-2xl p-7 sm:p-10 flex flex-col justify-between border-2 border-[#0D031B] shadow-[6px_6px_0px_#DAEE01] bg-[#FAF0E6] min-h-[340px]">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] bg-[#8FB31D] px-2.5 py-1 rounded border border-[#0D031B]">
                          {pillar.category}
                        </span>
                        <span className="font-mono text-xs text-[#0D031B] font-bold bg-[#FAF0E6] px-2 py-0.5 rounded border border-[#0D031B]">
                          {t('pillarWord')} 0{pIdx + 1} {t('ofWord')} 0{economicPillars.length}
                        </span>
                      </div>

                      <h4 className="text-2xl sm:text-3xl font-bold text-[#0D031B] mb-5 font-editorial">
                        {pillar.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-[#8FB31D]/30 p-4 sm:p-5 rounded-xl border-2 border-[#0D031B]">
                          <div className="text-[11px] font-mono font-bold text-[#0D031B] bg-[#0D031B] text-[#DAEE01] px-2 py-0.5 rounded inline-block uppercase tracking-wide mb-2">
                            {t('theProblem')}
                          </div>
                          <p className="text-xs sm:text-sm text-[#0D031B] font-medium leading-relaxed">{pillar.problem}</p>
                        </div>

                        <div className="bg-[#FAF0E6] p-4 sm:p-5 rounded-xl border-2 border-[#0D031B]">
                          <div className="text-[11px] font-mono font-bold text-[#FAF0E6] bg-[#806517] px-2 py-0.5 rounded inline-block uppercase tracking-wide mb-2 border border-[#0D031B]">
                            {t('ourSolution')}
                          </div>
                          <p className="text-xs sm:text-sm text-[#0D031B] font-medium leading-relaxed">{pillar.solution}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-[#0D031B] text-xs font-bold font-mono text-[#0D031B] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#806517]" />
                        <span>{pillar.metric}</span>
                      </div>
                      <span className="text-[11px] text-[#0D031B]/60 font-mono">{t('swipeNavPillars')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Swipable Daily Operations Carousel */}
        <div className="mb-24">
          <div className="border-b-2 border-[#0D031B] pb-4 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] bg-[#8FB31D] px-2.5 py-1 rounded-md border border-[#0D031B]">
                {t('ourWork')}
              </span>
              <h3 className="text-2xl sm:text-4xl font-normal text-[#0D031B] mt-3 font-editorial">
                {t('whatWeDo')}
              </h3>
            </div>

            {/* Direct Activity Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {coreActivities.map((act, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 transition cursor-pointer ${
                    currentSlide === index
                      ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                      : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                  }`}
                >
                  {index + 1}. {act.title}
                </button>
              ))}
            </div>
          </div>

          {/* Swipable Card Frame */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="relative overflow-hidden touch-pan-y rounded-2xl"
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {coreActivities.map((act, index) => (
                <div key={index} className="w-full shrink-0 px-1">
                  <div className="p-7 sm:p-10 rounded-2xl flex flex-col justify-between border-2 border-[#0D031B] shadow-[6px_6px_0px_#DAEE01] bg-[#FAF0E6] min-h-[260px]">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-mono font-bold text-[#DAEE01] bg-[#0D031B] px-2.5 py-1 rounded border border-[#0D031B]">
                          [ 0{index + 1} {t('ofWord')} 0{coreActivities.length} ]
                        </span>
                        <span className="text-xs font-mono font-bold text-[#806517] uppercase bg-[#8FB31D]/40 px-2.5 py-1 rounded border border-[#0D031B]">
                          {act.subtitle}
                        </span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-bold text-[#0D031B] mb-4 font-editorial">
                        {act.title}
                      </h4>
                      <p className="text-base sm:text-lg text-[#0D031B]/90 font-medium leading-relaxed">
                        {act.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t-2 border-[#0D031B] flex items-center justify-between text-xs font-mono text-[#0D031B]/70">
                      <span>{t('swipeNavActivities')}</span>
                      <span className="font-bold text-[#806517]">{t('stepWord')} 0{index + 1}</span>
                    </div>
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
