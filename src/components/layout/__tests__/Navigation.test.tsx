import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation';
import { Language, NavigationItem } from '@/types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, onClick }: { 
    children: React.ReactNode; 
    href: string; 
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }) {
    return <a href={href} onClick={onClick}>{children}</a>;
  };
});

// Mock usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock scrollIntoView
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
});

describe('Navigation Component', () => {
  const mockNavigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: { en: 'Home', hi: 'होम', raj: 'घर' },
      href: '/',
    },
    {
      id: 'heritage',
      label: { en: 'Heritage', hi: 'विरासत', raj: 'विरासत' },
      href: '/heritage',
      children: [
        {
          id: 'traditions',
          label: { en: 'Traditions', hi: 'परंपराएं', raj: 'परंपराएं' },
          href: '/heritage/traditions',
        },
        {
          id: 'architecture',
          label: { en: 'Architecture', hi: 'वास्तुकला', raj: 'वास्तुकला' },
          href: '/heritage/architecture',
        },
      ],
    },
    {
      id: 'spiritual',
      label: { en: 'Spiritual', hi: 'आध्यात्मिक', raj: 'आध्यात्मिक' },
      href: '/spiritual',
    },
    {
      id: 'section',
      label: { en: 'Section', hi: 'अनुभाग', raj: 'अनुभाग' },
      href: '#section',
    },
  ];

  const defaultProps = {
    currentLanguage: 'en' as Language,
    items: mockNavigationItems,
  };

  beforeEach(() => {
    // Reset pathname mock
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/');
  });

  describe('Component Rendering', () => {
    it('renders navigation items in English', () => {
      render(<Navigation {...defaultProps} />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Heritage')).toBeInTheDocument();
      expect(screen.getByText('Spiritual')).toBeInTheDocument();
      expect(screen.getByText('Section')).toBeInTheDocument();
    });

    it('renders navigation items in Hindi when language is set to Hindi', () => {
      render(<Navigation {...defaultProps} currentLanguage="hi" />);
      
      expect(screen.getByText('होम')).toBeInTheDocument();
      expect(screen.getByText('विरासत')).toBeInTheDocument();
      expect(screen.getByText('आध्यात्मिक')).toBeInTheDocument();
      expect(screen.getByText('अनुभाग')).toBeInTheDocument();
    });

    it('renders navigation items in Rajasthani when language is set to Rajasthani', () => {
      render(<Navigation {...defaultProps} currentLanguage="raj" />);
      
      expect(screen.getByText('घर')).toBeInTheDocument();
      expect(screen.getByText('विरासत')).toBeInTheDocument();
      expect(screen.getByText('आध्यात्मिक')).toBeInTheDocument();
      expect(screen.getByText('अनुभाग')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      render(<Navigation {...defaultProps} className="custom-nav-class" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('navigation', 'custom-nav-class');
    });
  });

  describe('Active Link Highlighting', () => {
    it('renders home link correctly when on home page', () => {
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/');
      
      render(<Navigation {...defaultProps} />);
      
      const homeLink = screen.getByText('Home');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('renders heritage link correctly when on heritage page', () => {
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/heritage');
      
      render(<Navigation {...defaultProps} />);
      
      const heritageLink = screen.getByText('Heritage');
      expect(heritageLink).toBeInTheDocument();
      expect(heritageLink.closest('a')).toHaveAttribute('href', '/heritage');
    });

    it('renders heritage link correctly when on heritage subpage', () => {
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/heritage/traditions');
      
      render(<Navigation {...defaultProps} />);
      
      const heritageLink = screen.getByText('Heritage');
      expect(heritageLink).toBeInTheDocument();
      expect(heritageLink.closest('a')).toHaveAttribute('href', '/heritage');
    });

    it('renders all navigation links correctly', () => {
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/heritage');
      
      render(<Navigation {...defaultProps} />);
      
      const spiritualLink = screen.getByText('Spiritual');
      expect(spiritualLink).toBeInTheDocument();
      expect(spiritualLink.closest('a')).toHaveAttribute('href', '/spiritual');
    });
  });

  describe('Dropdown Menu Functionality', () => {
    it('renders dropdown menu for items with children', () => {
      render(<Navigation {...defaultProps} />);
      
      // Heritage item should have children
      const heritageItem = screen.getByText('Heritage').closest('li');
      const dropdown = heritageItem?.querySelector('ul');
      expect(dropdown).toBeInTheDocument();
      
      // Check dropdown items
      expect(screen.getByText('Traditions')).toBeInTheDocument();
      expect(screen.getByText('Architecture')).toBeInTheDocument();
    });

    it('dropdown items have correct href attributes', () => {
      render(<Navigation {...defaultProps} />);
      
      const traditionsLink = screen.getByText('Traditions').closest('a');
      expect(traditionsLink).toHaveAttribute('href', '/heritage/traditions');
      
      const architectureLink = screen.getByText('Architecture').closest('a');
      expect(architectureLink).toHaveAttribute('href', '/heritage/architecture');
    });

    it('renders active dropdown items correctly', () => {
      const { usePathname } = require('next/navigation');
      usePathname.mockReturnValue('/heritage/traditions');
      
      render(<Navigation {...defaultProps} />);
      
      const traditionsLink = screen.getByText('Traditions');
      expect(traditionsLink).toBeInTheDocument();
      expect(traditionsLink.closest('a')).toHaveAttribute('href', '/heritage/traditions');
    });

    it('dropdown has proper CSS classes for hover behavior', () => {
      render(<Navigation {...defaultProps} />);
      
      const heritageItem = screen.getByText('Heritage').closest('li');
      const dropdown = heritageItem?.querySelector('ul');
      
      expect(dropdown).toHaveClass(
        'absolute', 'left-0', 'top-full', 'mt-1', 'w-48', 'bg-white', 'rounded-md', 'shadow-lg', 'border',
        'opacity-0', 'invisible', 'group-hover:opacity-100', 'group-hover:visible',
        'transition-all', 'duration-200', 'z-50'
      );
    });
  });

  describe('Smooth Scrolling for Hash Links', () => {
    it('prevents default behavior and scrolls to section for hash links', async () => {
      const user = userEvent.setup();
      const mockScrollIntoView = jest.fn();
      
      // Mock querySelector to return an element with scrollIntoView
      const mockElement = { scrollIntoView: mockScrollIntoView };
      jest.spyOn(document, 'querySelector').mockReturnValue(mockElement as any);
      
      render(<Navigation {...defaultProps} />);
      
      const sectionLink = screen.getByText('Section');
      await user.click(sectionLink);
      
      expect(document.querySelector).toHaveBeenCalledWith('#section');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Cleanup
      jest.restoreAllMocks();
    });

    it('does not prevent default for regular links', async () => {
      const user = userEvent.setup();
      render(<Navigation {...defaultProps} />);
      
      const homeLink = screen.getByText('Home');
      
      // This should not throw an error and should behave normally
      await user.click(homeLink);
      
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('handles case when target element is not found', async () => {
      const user = userEvent.setup();
      
      // Mock querySelector to return null
      jest.spyOn(document, 'querySelector').mockReturnValue(null);
      
      render(<Navigation {...defaultProps} />);
      
      const sectionLink = screen.getByText('Section');
      
      // This should not throw an error
      await user.click(sectionLink);
      
      expect(document.querySelector).toHaveBeenCalledWith('#section');
      
      // Cleanup
      jest.restoreAllMocks();
    });
  });

  describe('Responsive Design', () => {
    it('applies correct responsive classes to navigation list', () => {
      render(<Navigation {...defaultProps} />);
      
      const navLists = screen.getAllByRole('list');
      const mainNavList = navLists[0]; // Get the main navigation list
      expect(mainNavList).toHaveClass('flex', 'flex-col', 'md:flex-row', 'space-y-2', 'md:space-y-0', 'md:space-x-6');
    });

    it('navigation items are rendered with proper structure', () => {
      render(<Navigation {...defaultProps} />);
      
      const homeLink = screen.getByText('Home');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('dropdown items are rendered with proper structure', () => {
      render(<Navigation {...defaultProps} />);
      
      const traditionsLink = screen.getByText('Traditions');
      expect(traditionsLink).toBeInTheDocument();
      expect(traditionsLink.closest('a')).toHaveAttribute('href', '/heritage/traditions');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic HTML structure', () => {
      render(<Navigation {...defaultProps} />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      const navLists = screen.getAllByRole('list');
      expect(navLists.length).toBeGreaterThan(0);
    });

    it('navigation links are properly accessible', () => {
      render(<Navigation {...defaultProps} />);
      
      const homeLink = screen.getByText('Home');
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
      
      const heritageLink = screen.getByText('Heritage');
      expect(heritageLink.closest('a')).toHaveAttribute('href', '/heritage');
    });

    it('dropdown items are accessible', () => {
      render(<Navigation {...defaultProps} />);
      
      const traditionsLink = screen.getByText('Traditions');
      expect(traditionsLink.closest('a')).toHaveAttribute('href', '/heritage/traditions');
      
      const architectureLink = screen.getByText('Architecture');
      expect(architectureLink.closest('a')).toHaveAttribute('href', '/heritage/architecture');
    });
  });
});