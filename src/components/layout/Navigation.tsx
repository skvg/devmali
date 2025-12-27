'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, NavigationItem } from '@/types';

interface NavigationProps {
  currentLanguage: Language;
  items: NavigationItem[];
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentLanguage, 
  items, 
  className = '' 
}) => {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  return (
    <nav className={`navigation ${className}`}>
      <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
        {items.map((item) => (
          <li key={item.id} className="relative group">
            <Link
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`
                block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${isActiveLink(item.href)
                  ? 'text-primary-saffron bg-primary-saffron bg-opacity-10'
                  : 'text-secondary-charcoal hover:text-primary-saffron hover:bg-gray-50'
                }
              `}
            >
              {item.label[currentLanguage]}
            </Link>
            
            {/* Dropdown for children */}
            {item.children && item.children.length > 0 && (
              <ul className="
                absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200 z-50
              ">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={child.href}
                      onClick={(e) => handleClick(e, child.href)}
                      className={`
                        block px-4 py-2 text-sm transition-colors duration-200
                        ${isActiveLink(child.href)
                          ? 'text-primary-saffron bg-primary-saffron bg-opacity-10'
                          : 'text-secondary-charcoal hover:text-primary-saffron hover:bg-gray-50'
                        }
                        first:rounded-t-md last:rounded-b-md
                      `}
                    >
                      {child.label[currentLanguage]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;