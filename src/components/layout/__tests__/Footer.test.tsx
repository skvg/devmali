import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { Language } from '@/types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Footer Component', () => {
  const defaultProps = {
    currentLanguage: 'en' as Language,
  };

  describe('Component Rendering', () => {
    it('renders footer with brand section in English', () => {
      render(<Footer {...defaultProps} />);
      
      // Check brand elements
      expect(screen.getByText('द')).toBeInTheDocument();
      expect(screen.getByText('Devmali Heritage Village')).toBeInTheDocument();
      expect(screen.getByText('Preserving 1100 years of cultural heritage')).toBeInTheDocument();
      expect(screen.getByText("Recognized as India's Best Tourist Village")).toBeInTheDocument();
    });

    it('renders footer content in Hindi when language is set to Hindi', () => {
      render(<Footer {...defaultProps} currentLanguage="hi" />);
      
      expect(screen.getByText('देवमाली विरासत गांव')).toBeInTheDocument();
      expect(screen.getByText('1100 साल की सांस्कृतिक विरासत का संरक्षण')).toBeInTheDocument();
      expect(screen.getByText('भारत के सर्वश्रेष्ठ पर्यटन गांव के रूप में मान्यता प्राप्त')).toBeInTheDocument();
    });

    it('renders footer content in Rajasthani when language is set to Rajasthani', () => {
      render(<Footer {...defaultProps} currentLanguage="raj" />);
      
      expect(screen.getByText('देवमाली विरासत गांव')).toBeInTheDocument();
      expect(screen.getByText('1100 साल री सांस्कृतिक विरासत रो संरक्षण')).toBeInTheDocument();
    });

    it('renders quick links section with correct navigation items', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByText('Quick Links')).toBeInTheDocument();
      expect(screen.getByText('Heritage')).toBeInTheDocument();
      expect(screen.getByText('Spiritual Content')).toBeInTheDocument();
      expect(screen.getByText('Virtual Tour')).toBeInTheDocument();
      expect(screen.getByText('Plan Your Visit')).toBeInTheDocument();
      expect(screen.getByText('Community Stories')).toBeInTheDocument();
    });

    it('renders contact information section', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByText('Contact Information')).toBeInTheDocument();
      expect(screen.getByText('Devmali Village, Aravalli Hills, Rajasthan, India')).toBeInTheDocument();
      expect(screen.getByText('+91 XXXXX XXXXX')).toBeInTheDocument();
      expect(screen.getByText('info@devmali.com')).toBeInTheDocument();
    });

    it('renders copyright information', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByText('© 2024 Devmali Heritage Village. All rights reserved.')).toBeInTheDocument();
    });
  });

  describe('Quick Links Navigation', () => {
    it('renders all quick links with correct href attributes', () => {
      render(<Footer {...defaultProps} />);
      
      const heritageLink = screen.getByText('Heritage').closest('a');
      expect(heritageLink).toHaveAttribute('href', '/heritage');
      
      const spiritualLink = screen.getByText('Spiritual Content').closest('a');
      expect(spiritualLink).toHaveAttribute('href', '/spiritual');
      
      const tourLink = screen.getByText('Virtual Tour').closest('a');
      expect(tourLink).toHaveAttribute('href', '/tour');
      
      const visitLink = screen.getByText('Plan Your Visit').closest('a');
      expect(visitLink).toHaveAttribute('href', '/visit');
      
      const storiesLink = screen.getByText('Community Stories').closest('a');
      expect(storiesLink).toHaveAttribute('href', '/stories');
    });

    it('renders quick links in Hindi when language is set to Hindi', () => {
      render(<Footer {...defaultProps} currentLanguage="hi" />);
      
      expect(screen.getByText('त्वरित लिंक')).toBeInTheDocument();
      expect(screen.getByText('विरासत')).toBeInTheDocument();
      expect(screen.getByText('आध्यात्मिक सामग्री')).toBeInTheDocument();
      expect(screen.getByText('वर्चुअल टूर')).toBeInTheDocument();
      expect(screen.getByText('अपनी यात्रा की योजना बनाएं')).toBeInTheDocument();
      expect(screen.getByText('सामुदायिक कहानियां')).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('renders social media icons with proper accessibility', () => {
      render(<Footer {...defaultProps} />);
      
      const facebookLink = screen.getByLabelText('Facebook');
      expect(facebookLink).toBeInTheDocument();
      expect(facebookLink).toHaveAttribute('href', '#');
      
      const instagramLink = screen.getByLabelText('Instagram');
      expect(instagramLink).toBeInTheDocument();
      expect(instagramLink).toHaveAttribute('href', '#');
    });

    it('social media links have proper hover states', () => {
      render(<Footer {...defaultProps} />);
      
      const facebookLink = screen.getByLabelText('Facebook');
      expect(facebookLink).toHaveClass('hover:text-primary-golden');
      
      const instagramLink = screen.getByLabelText('Instagram');
      expect(instagramLink).toHaveClass('hover:text-primary-golden');
    });
  });

  describe('Responsive Layout', () => {
    it('applies correct responsive grid classes', () => {
      render(<Footer {...defaultProps} />);
      
      const footerContent = screen.getByText('Devmali Heritage Village').closest('div')?.parentElement?.parentElement;
      expect(footerContent).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8');
    });

    it('has proper container and spacing classes', () => {
      render(<Footer {...defaultProps} />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-primary-maroon', 'text-white');
      
      const container = screen.getByText('Devmali Heritage Village').closest('div')?.parentElement?.parentElement?.parentElement;
      expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-12');
    });
  });

  describe('Cultural Design Elements', () => {
    it('displays logo with cultural styling', () => {
      render(<Footer {...defaultProps} />);
      
      const logoContainer = screen.getByText('द').parentElement;
      expect(logoContainer).toHaveClass('w-10', 'h-10', 'bg-primary-saffron', 'rounded-full');
    });

    it('displays recognition badge with proper styling', () => {
      render(<Footer {...defaultProps} />);
      
      const badge = screen.getByText("Recognized as India's Best Tourist Village");
      expect(badge).toHaveClass('bg-primary-golden', 'text-primary-maroon', 'px-3', 'py-1', 'rounded-full');
    });

    it('applies cultural color scheme', () => {
      render(<Footer {...defaultProps} />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-primary-maroon', 'text-white');
      
      const quickLinksHeading = screen.getByText('Quick Links');
      expect(quickLinksHeading).toHaveClass('text-primary-golden');
      
      const contactHeading = screen.getByText('Contact Information');
      expect(contactHeading).toHaveClass('text-primary-golden');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic HTML structure', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<Footer {...defaultProps} />);
      
      const quickLinksHeading = screen.getByText('Quick Links');
      expect(quickLinksHeading.tagName).toBe('H3');
      
      const contactHeading = screen.getByText('Contact Information');
      expect(contactHeading.tagName).toBe('H3');
    });

    it('social media links have proper aria-labels', () => {
      render(<Footer {...defaultProps} />);
      
      expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    });
  });
});