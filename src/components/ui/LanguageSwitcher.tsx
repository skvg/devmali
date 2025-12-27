'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface Language {
  code: 'en' | 'hi' | 'raj';
  name: string;
  nativeName: string;
  flag?: string;
}

export interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  className?: string;
  variant?: 'dropdown' | 'tabs' | 'compact';
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'raj', name: 'Rajasthani', nativeName: 'राजस्थानी', flag: '🏛️' },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className,
  variant = 'dropdown',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  const renderDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-2 px-3 py-2 rounded-cultural border border-primary-golden/30 bg-white hover:bg-secondary-cream/50 transition-all duration-200 shadow-cultural',
          'focus:outline-none focus:ring-2 focus:ring-primary-saffron focus:ring-offset-2',
          className
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="font-medium text-secondary-charcoal">{currentLang.nativeName}</span>
        <svg
          className={cn(
            'w-4 h-4 text-secondary-charcoal transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-white border border-primary-golden/30 rounded-cultural shadow-spiritual z-20">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-secondary-cream/50 transition-colors duration-200',
                    currentLanguage === language.code && 'bg-primary-golden/10 text-primary-saffron'
                  )}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{language.nativeName}</span>
                    <span className="text-sm text-gray-500">{language.name}</span>
                  </div>
                  {currentLanguage === language.code && (
                    <svg className="w-4 h-4 ml-auto text-primary-saffron" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderTabs = () => (
    <div className={cn('flex space-x-1 p-1 bg-secondary-cream/30 rounded-cultural', className)}>
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageSelect(language.code)}
          className={cn(
            'flex items-center space-x-2 px-3 py-2 rounded-cultural text-sm font-medium transition-all duration-200',
            currentLanguage === language.code
              ? 'bg-white text-primary-saffron shadow-cultural'
              : 'text-secondary-charcoal hover:bg-white/50'
          )}
        >
          <span>{language.flag}</span>
          <span>{language.nativeName}</span>
        </button>
      ))}
    </div>
  );

  const renderCompact = () => (
    <div className={cn('flex items-center space-x-1', className)}>
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageSelect(language.code)}
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200',
            currentLanguage === language.code
              ? 'bg-primary-saffron text-white shadow-cultural scale-110'
              : 'bg-white hover:bg-secondary-cream/50 text-secondary-charcoal shadow-soft hover:shadow-medium'
          )}
          title={language.nativeName}
          aria-label={`Switch to ${language.name}`}
        >
          {language.flag}
        </button>
      ))}
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'tabs':
        return renderTabs();
      case 'compact':
        return renderCompact();
      default:
        return renderDropdown();
    }
  };

  return (
    <div className="relative">
      {renderVariant()}
      
      {/* Cultural motif decoration */}
      <div className="absolute -top-1 -right-1 w-3 h-3 opacity-20">
        <svg viewBox="0 0 24 24" className="w-full h-full text-primary-golden">
          <path
            fill="currentColor"
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
          />
        </svg>
      </div>
    </div>
  );
};

export { LanguageSwitcher };