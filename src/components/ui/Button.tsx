import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cultural' | 'spiritual' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-cultural font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-primary-saffron hover:bg-primary-600 text-white shadow-cultural focus:ring-primary-saffron',
      secondary: 'bg-secondary-sage hover:bg-green-600 text-white shadow-medium focus:ring-secondary-sage',
      cultural: 'bg-primary-golden hover:bg-secondary-golden-600 text-secondary-charcoal shadow-golden focus:ring-primary-golden',
      spiritual: 'bg-primary-maroon hover:bg-secondary-maroon-600 text-white shadow-spiritual focus:ring-primary-maroon',
      outline: 'border-2 border-primary-saffron text-primary-saffron hover:bg-primary-saffron hover:text-white focus:ring-primary-saffron',
      ghost: 'text-secondary-charcoal hover:bg-secondary-cream focus:ring-secondary-sage',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };