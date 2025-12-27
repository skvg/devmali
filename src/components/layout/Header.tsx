'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Language } from '@/types';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = {
    en: [
      { label: 'Home', href: '/' },
      { label: 'Heritage', href: '/heritage' },
      { label: 'Spiritual', href: '/spiritual' },
      { label: 'Virtual Tour', href: '/tour' },
      { label: 'Visit', href: '/visit' },
      { label: 'Stories', href: '/stories' },
    ],
    hi: [
      { label: 'होम', href: '/' },
      { label: 'विरासत', href: '/heritage' },
      { label: 'आध्यात्मिक', href: '/spiritual' },
      { label: 'वर्चुअल टूर', href: '/tour' },
      { label: 'यात्रा', href: '/visit' },
      { label: 'कहानियां', href: '/stories' },
    ],
    raj: [
      { label: 'घर', href: '/' },
      { label: 'विरासत', href: '/heritage' },
      { label: 'आध्यात्मिक', href: '/spiritual' },
      { label: 'वर्चुअल टूर', href: '/tour' },
      { label: 'यात्रा', href: '/visit' },
      { label: 'कहानियां', href: '/stories' },
    ],
  };

  const languageLabels = {
    en: 'English',
    hi: 'हिंदी',
    raj: 'राजस्थानी',
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-primary-saffron rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">द</span>
              </div>
              <span className="ml-2 text-xl font-playfair font-semibold text-primary-maroon">
                Devmali
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems[currentLanguage].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-secondary-charcoal hover:text-primary-saffron transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-saffron"
            >
              {Object.entries(languageLabels).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-secondary-charcoal hover:text-primary-saffron focus:outline-none focus:text-primary-saffron"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigationItems[currentLanguage].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-secondary-charcoal hover:text-primary-saffron transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <select
                  value={currentLanguage}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-saffron"
                >
                  {Object.entries(languageLabels).map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;