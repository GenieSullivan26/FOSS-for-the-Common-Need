import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AlphaSection } from './components/AlphaSection';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AccessibilityModal } from './components/AccessibilityModal';

function AppContent() {
  const [activeSection, setActiveSection] = useState('about');
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [a11yModalOpen, setA11yModalOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState(50);
  const [donateIsMonthly, setDonateIsMonthly] = useState(false);

  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDonate = (amount: number = 50, isMonthly: boolean = false) => {
    setDonateAmount(amount);
    setDonateIsMonthly(isMonthly);
    setDonateModalOpen(true);
  };

  // Intersection observer to highlight current nav link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'pillars', 'alpha'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF0E6] text-[#0D031B] selection:bg-[#DAEE01] selection:text-[#0D031B]">
      {/* Header */}
      <Header
        onOpenDonate={() => handleOpenDonate(50, false)}
        onOpenAccessibility={() => setA11yModalOpen(true)}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenDonate={() => handleOpenDonate(50, false)}
          onNavigate={navigateToSection}
        />

        {/* About, Mission, Vision, 4 Economic Pillars & Nonpartisan Charter */}
        <AboutSection />

        {/* Alpha Version App Wireframes */}
        <AlphaSection />
      </main>

      {/* Grounded Obsidian Footer */}
      <Footer
        onOpenDonate={() => handleOpenDonate(50, false)}
        onNavigate={navigateToSection}
      />

      {/* Tax-Deductible Donation Checkout & Receipt Modal */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        initialAmount={donateAmount}
        initialMonthly={donateIsMonthly}
      />

      {/* Accessibility & Language Settings Modal */}
      <AccessibilityModal
        isOpen={a11yModalOpen}
        onClose={() => setA11yModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}
