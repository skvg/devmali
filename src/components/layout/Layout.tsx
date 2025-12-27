'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Language } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('devmali-language') as Language;
    if (savedLanguage && ['en', 'hi', 'raj'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when changed
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('devmali-language', language);
    
    // Update document language attribute
    document.documentElement.lang = language === 'raj' ? 'hi' : language;
  };

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};

export default Layout;