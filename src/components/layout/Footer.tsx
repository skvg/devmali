'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/types';

interface FooterProps {
  currentLanguage: Language;
}

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const footerContent = {
    en: {
      title: 'Devmali Heritage Village',
      subtitle: 'Preserving 1100 years of cultural heritage',
      quickLinks: 'Quick Links',
      contact: 'Contact Information',
      address: 'Devmali Village, Aravalli Hills, Rajasthan, India',
      phone: '+91 XXXXX XXXXX',
      email: 'info@devmali.com',
      copyright: '© 2024 Devmali Heritage Village. All rights reserved.',
      acknowledgment: 'Recognized as India\'s Best Tourist Village',
    },
    hi: {
      title: 'देवमाली विरासत गांव',
      subtitle: '1100 साल की सांस्कृतिक विरासत का संरक्षण',
      quickLinks: 'त्वरित लिंक',
      contact: 'संपर्क जानकारी',
      address: 'देवमाली गांव, अरावली पहाड़ियां, राजस्थान, भारत',
      phone: '+91 XXXXX XXXXX',
      email: 'info@devmali.com',
      copyright: '© 2024 देवमाली विरासत गांव। सभी अधिकार सुरक्षित।',
      acknowledgment: 'भारत के सर्वश्रेष्ठ पर्यटन गांव के रूप में मान्यता प्राप्त',
    },
    raj: {
      title: 'देवमाली विरासत गांव',
      subtitle: '1100 साल री सांस्कृतिक विरासत रो संरक्षण',
      quickLinks: 'त्वरित लिंक',
      contact: 'संपर्क री जानकारी',
      address: 'देवमाली गांव, अरावली पहाड़ियां, राजस्थान, भारत',
      phone: '+91 XXXXX XXXXX',
      email: 'info@devmali.com',
      copyright: '© 2024 देवमाली विरासत गांव। सगळा अधिकार सुरक्षित।',
      acknowledgment: 'भारत के सर्वश्रेष्ठ पर्यटन गांव के रूप में मान्यता प्राप्त',
    },
  };

  const quickLinks = {
    en: [
      { label: 'Heritage', href: '/heritage' },
      { label: 'Spiritual Content', href: '/spiritual' },
      { label: 'Virtual Tour', href: '/tour' },
      { label: 'Plan Your Visit', href: '/visit' },
      { label: 'Community Stories', href: '/stories' },
    ],
    hi: [
      { label: 'विरासत', href: '/heritage' },
      { label: 'आध्यात्मिक सामग्री', href: '/spiritual' },
      { label: 'वर्चुअल टूर', href: '/tour' },
      { label: 'अपनी यात्रा की योजना बनाएं', href: '/visit' },
      { label: 'सामुदायिक कहानियां', href: '/stories' },
    ],
    raj: [
      { label: 'विरासत', href: '/heritage' },
      { label: 'आध्यात्मिक सामग्री', href: '/spiritual' },
      { label: 'वर्चुअल टूर', href: '/tour' },
      { label: 'आपरी यात्रा री योजना बनावो', href: '/visit' },
      { label: 'सामुदायिक कहानियां', href: '/stories' },
    ],
  };

  const content = footerContent[currentLanguage];
  const links = quickLinks[currentLanguage];

  return (
    <footer className="bg-primary-maroon text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-saffron rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">द</span>
              </div>
              <span className="ml-2 text-xl font-playfair font-semibold">
                {content.title}
              </span>
            </div>
            <p className="text-secondary-cream text-sm leading-relaxed">
              {content.subtitle}
            </p>
            <div className="bg-primary-golden text-primary-maroon px-3 py-1 rounded-full text-xs font-medium inline-block">
              {content.acknowledgment}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-golden">
              {content.quickLinks}
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-cream hover:text-primary-golden transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-golden">
              {content.contact}
            </h3>
            <div className="space-y-2 text-sm text-secondary-cream">
              <p>{content.address}</p>
              <p>{content.phone}</p>
              <p>{content.email}</p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="text-secondary-cream hover:text-primary-golden transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-secondary-cream hover:text-primary-golden transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.926 1.365 2.077 1.365 3.374s-.49 2.448-1.365 3.323c-.875.875-2.026 1.167-3.323 1.167z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-earth mt-8 pt-8 text-center">
          <p className="text-secondary-cream text-sm">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;