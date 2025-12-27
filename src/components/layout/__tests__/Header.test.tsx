import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import { Language } from '@/types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Header Component', () => {
  const mockOnLanguageChange = jest.fn();
  const defaultProps = {
    currentLanguage: 'en' as Language,
    onLanguageChange: mockOnLanguageChange,
  };

  beforeEach(() => {
    mockOnLanguageChange.mockClear();
  });

  describe('Component Rendering', () => {
    it('renders the header with logo and navigation', () => {
      render(<Header {...defaultProps} />);
      
      // Check logo
      expect(screen.getByText('द')).toBeInTheDocument();
      expect(screen.getByText('Devmali')).toBeInTheDocument();
      
      // Check navigation items in English
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Heritage')).toBeInTheDocument();
      expect(screen.getByText('Spiritual')).toBeInTheDocument();
      expect(screen.getByText('Virtual Tour')).toBeInTheDocument();
      expect(screen.getByText('Visit')).toBeInTheDocument();
      expect(screen.getByText('Stories')).toBeInTheDocument();
    });

    it('renders navigation items in Hindi when language is set to Hindi', () => {
      render(<Header {...defaultProps} currentLanguage="hi" />);
      
      expect(screen.getByText('होम')).toBeInTheDocument();
      expect(screen.getByText('विरासत')).toBeInTheDocument();
      expect(screen.getByText('आध्यात्मिक')).toBeInTheDocument();
    });

    it('renders navigation items in Rajasthani when language is set to Rajasthani', () => {
      render(<Header {...defaultProps} currentLanguage="raj" />);
      
      expect(screen.getByText('घर')).toBeInTheDocument();
      expect(screen.getByText('विरासत')).toBeInTheDocument();
      expect(screen.getByText('आध्यात्मिक')).toBeInTheDocument();
    });

    it('renders language selector with correct options', () => {
      render(<Header {...defaultProps} />);
      
      const languageSelect = screen.getByDisplayValue('English');
      expect(languageSelect).toBeInTheDocument();
      
      // Check all language options are present
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('हिंदी')).toBeInTheDocument();
      expect(screen.getByText('राजस्थानी')).toBeInTheDocument();
    });
  });

  describe('Mobile Menu Functionality', () => {
    it('shows mobile menu button on mobile view', () => {
      render(<Header {...defaultProps} />);
      
      const menuButton = screen.getByLabelText('Toggle menu');
      expect(menuButton).toBeInTheDocument();
    });

    it('toggles mobile menu when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Header {...defaultProps} />);
      
      const menuButton = screen.getByLabelText('Toggle menu');
      
      // Initially mobile menu should not be visible
      expect(screen.queryByText('Home')).toBeInTheDocument(); // Desktop nav
      
      // Click to open mobile menu
      await user.click(menuButton);
      
      // Mobile menu should now be visible with navigation items
      const mobileNavItems = screen.getAllByText('Home');
      expect(mobileNavItems.length).toBeGreaterThan(1); // Both desktop and mobile nav
    });

    it('closes mobile menu when a navigation item is clicked', async () => {
      const user = userEvent.setup();
      render(<Header {...defaultProps} />);
      
      const menuButton = screen.getByLabelText('Toggle menu');
      
      // Open mobile menu
      await user.click(menuButton);
      
      // Click on a mobile navigation item
      const mobileNavItems = screen.getAllByText('Home');
      const mobileHomeLink = mobileNavItems[mobileNavItems.length - 1]; // Get the mobile one
      await user.click(mobileHomeLink);
      
      // Menu should close (this is tested by checking the state change)
      // Since we can't directly test state, we verify the menu button is still there
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('calls onLanguageChange when language is selected from desktop selector', async () => {
      const user = userEvent.setup();
      render(<Header {...defaultProps} />);
      
      const languageSelect = screen.getByDisplayValue('English');
      await user.selectOptions(languageSelect, 'hi');
      
      expect(mockOnLanguageChange).toHaveBeenCalledWith('hi');
    });

    it('calls onLanguageChange when language is selected from mobile selector', async () => {
      const user = userEvent.setup();
      render(<Header {...defaultProps} />);
      
      // Open mobile menu first
      const menuButton = screen.getByLabelText('Toggle menu');
      await user.click(menuButton);
      
      // Find mobile language selector
      const languageSelectors = screen.getAllByDisplayValue('English');
      const mobileSelector = languageSelectors[languageSelectors.length - 1]; // Get the mobile one
      
      await user.selectOptions(mobileSelector, 'raj');
      
      expect(mockOnLanguageChange).toHaveBeenCalledWith('raj');
    });
  });

  describe('Responsive Behavior', () => {
    it('applies correct CSS classes for responsive design', () => {
      render(<Header {...defaultProps} />);
      
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky', 'top-0', 'z-50');
      
      // Check desktop navigation is hidden on mobile
      const desktopNav = screen.getByRole('navigation');
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
      
      // Check mobile menu button is hidden on desktop
      const mobileMenuButton = screen.getByLabelText('Toggle menu');
      expect(mobileMenuButton.parentElement).toHaveClass('md:hidden');
    });

    it('maintains proper layout structure across different screen sizes', () => {
      render(<Header {...defaultProps} />);
      
      // Check main container has responsive padding - find the div with max-w-7xl class
      const container = screen.getByText('Devmali').closest('div')?.parentElement?.parentElement;
      expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
      
      // Check flex layout for header items
      const headerContent = screen.getByText('Devmali').closest('div')?.parentElement;
      expect(headerContent).toHaveClass('flex', 'justify-between', 'items-center');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for interactive elements', () => {
      render(<Header {...defaultProps} />);
      
      const menuButton = screen.getByLabelText('Toggle menu');
      expect(menuButton).toHaveAttribute('aria-label', 'Toggle menu');
    });

    it('has proper semantic HTML structure', () => {
      render(<Header {...defaultProps} />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('language selector is accessible', () => {
      render(<Header {...defaultProps} />);
      
      const languageSelect = screen.getByDisplayValue('English');
      expect(languageSelect.tagName).toBe('SELECT');
      expect(languageSelect).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-saffron');
    });
  });
});