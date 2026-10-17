import React from 'react';
import {
  X,
  Languages,
  Type,
  Eye,
  Sparkles,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  ZapOff,
  Crosshair
} from 'lucide-react';
import { useAccessibility, LanguageCode } from '../context/AccessibilityContext';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES: { code: LanguageCode; name: string; native: string; flag: string }[] = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇲🇽' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh', name: 'Chinese', native: '中文 / 廣東話', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
];

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
  const {
    settings,
    updateSettings,
    resetSettings,
    t,
    speakText,
    stopSpeech,
    isSpeaking
  } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0D031B]/75 backdrop-blur-xs flex items-center justify-center p-4 font-sans text-[#0D031B]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
    >
      <div className="bg-[#FAF0E6] rounded-2xl border-2 border-[#0D031B] max-w-lg w-full p-6 sm:p-8 relative shadow-[8px_8px_0px_#DAEE01]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-[#0D031B]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#8FB31D] border border-[#0D031B] text-[#0D031B]">
              <Languages className="w-5 h-5" />
            </span>
            <h2 id="a11y-modal-title" className="text-xl sm:text-2xl font-bold font-editorial text-[#0D031B]">
              {t('accessibilityTitle')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-[#0D031B] bg-[#FAF0E6] hover:bg-[#8FB31D] text-[#0D031B] transition cursor-pointer"
            aria-label={t('close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          {/* 1. Language Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] block flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-[#806517]" />
              <span>{t('selectLanguage')}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => updateSettings({ language: lang.code })}
                  className={`p-2.5 rounded-xl border-2 text-left font-bold transition flex flex-col justify-between cursor-pointer ${
                    settings.language === lang.code
                      ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                      : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span>{lang.flag}</span>
                    {settings.language === lang.code && <Check className="w-3.5 h-3.5 text-[#8FB31D]" />}
                  </div>
                  <div className="text-xs font-bold mt-1">{lang.native}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Text Size */}
          <div className="space-y-2 pt-3 border-t-2 border-[#0D031B]/20">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] block flex items-center gap-1.5">
              <Type className="w-4 h-4 text-[#806517]" />
              <span>{t('textSize')}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: '100% Default' },
                { id: 'large', label: '115% Large' },
                { id: 'xlarge', label: '130% Extra' },
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => updateSettings({ fontSize: size.id as any })}
                  className={`py-2 px-3 rounded-xl border-2 text-xs font-mono font-bold text-center cursor-pointer transition ${
                    settings.fontSize === size.id
                      ? 'bg-[#0D031B] text-[#FAF0E6] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                      : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Contrast, Dyslexia, Motion, Focus Toggles */}
          <div className="space-y-2.5 pt-3 border-t-2 border-[#0D031B]/20">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] block flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#806517]" />
              <span>Visual & Motion Adjustments</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Dark Mode Theme */}
              <button
                onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                className={`p-3 rounded-xl border-2 flex items-center justify-between text-xs font-bold transition cursor-pointer ${
                  settings.darkMode
                    ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                    : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[#806517]" />
                  <span>{t('darkMode')}</span>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${settings.darkMode ? 'bg-[#8FB31D]' : 'bg-[#FAF0E6]'}`}>
                  {settings.darkMode && <Check className="w-3 h-3 text-[#0D031B]" />}
                </div>
              </button>

              {/* High Contrast */}
              <button
                onClick={() => updateSettings({ contrast: settings.contrast === 'normal' ? 'high' : 'normal' })}
                className={`p-3 rounded-xl border-2 flex items-center justify-between text-xs font-bold transition cursor-pointer ${
                  settings.contrast === 'high'
                    ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                    : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{t('highContrast')}</span>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${settings.contrast === 'high' ? 'bg-[#8FB31D]' : 'bg-[#FAF0E6]'}`}>
                  {settings.contrast === 'high' && <Check className="w-3 h-3 text-[#0D031B]" />}
                </div>
              </button>

              {/* Dyslexia Friendly */}
              <button
                onClick={() => updateSettings({ dyslexicFont: !settings.dyslexicFont })}
                className={`p-3 rounded-xl border-2 flex items-center justify-between text-xs font-bold transition cursor-pointer ${
                  settings.dyslexicFont
                    ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                    : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  <span>{t('dyslexiaFont')}</span>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${settings.dyslexicFont ? 'bg-[#8FB31D]' : 'bg-[#FAF0E6]'}`}>
                  {settings.dyslexicFont && <Check className="w-3 h-3 text-[#0D031B]" />}
                </div>
              </button>

              {/* Reduced Motion */}
              <button
                onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                className={`p-3 rounded-xl border-2 flex items-center justify-between text-xs font-bold transition cursor-pointer ${
                  settings.reducedMotion
                    ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                    : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ZapOff className="w-4 h-4" />
                  <span>{t('reducedMotion')}</span>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${settings.reducedMotion ? 'bg-[#8FB31D]' : 'bg-[#FAF0E6]'}`}>
                  {settings.reducedMotion && <Check className="w-3 h-3 text-[#0D031B]" />}
                </div>
              </button>

              {/* Focus Ring Highlights */}
              <button
                onClick={() => updateSettings({ focusHighlights: !settings.focusHighlights })}
                className={`p-3 rounded-xl border-2 flex items-center justify-between text-xs font-bold transition cursor-pointer ${
                  settings.focusHighlights
                    ? 'bg-[#0D031B] text-[#DAEE01] border-[#0D031B] shadow-[2px_2px_0px_#806517]'
                    : 'bg-[#FAF0E6] text-[#0D031B] border-[#0D031B] hover:bg-[#8FB31D]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Crosshair className="w-4 h-4" />
                  <span>{t('focusRing')}</span>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${settings.focusHighlights ? 'bg-[#8FB31D]' : 'bg-[#FAF0E6]'}`}>
                  {settings.focusHighlights && <Check className="w-3 h-3 text-[#0D031B]" />}
                </div>
              </button>
            </div>
          </div>

          {/* 4. Text to Speech Read Aloud */}
          <div className="space-y-2 pt-3 border-t-2 border-[#0D031B]/20">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D031B] block flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#806517]" />
              <span>{t('readAloud')}</span>
            </label>

            <div className="bg-[#8FB31D]/20 p-3.5 rounded-xl border-2 border-[#0D031B] flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-[#0D031B]">
                Listen to the page summary read aloud in your chosen language.
              </p>

              {isSpeaking ? (
                <button
                  onClick={stopSpeech}
                  className="px-3 py-1.5 bg-[#0D031B] text-[#DAEE01] rounded-lg border border-[#0D031B] text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  onClick={() => speakText(`${t('heroTitle')} ${t('heroDesc')}`)}
                  className="px-3 py-1.5 bg-[#806517] text-[#FAF0E6] rounded-lg border border-[#0D031B] text-xs font-bold flex items-center gap-1 shrink-0 hover:bg-[#0D031B] hover:text-[#DAEE01] transition cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 mt-6 border-t-2 border-[#0D031B]">
          <button
            onClick={resetSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#0D031B] bg-[#FAF0E6] text-xs font-mono font-bold text-[#0D031B] hover:bg-[#8FB31D] transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('reset')}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border-2 border-[#0D031B] bg-[#806517] text-[#FAF0E6] text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#0D031B] hover:bg-[#0D031B] hover:text-[#DAEE01] transition cursor-pointer"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
