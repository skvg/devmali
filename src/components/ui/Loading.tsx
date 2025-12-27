import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'mandala' | 'dots' | 'pulse';
  className?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  className,
  text,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const renderSpinner = () => (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-primary-saffron',
        sizes[size],
        className
      )}
    />
  );

  const renderMandala = () => (
    <div
      className={cn(
        'mandala-loader',
        sizes[size],
        className
      )}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="70 30"
          className="text-primary-golden"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="50 20"
          className="text-primary-saffron"
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="30 10"
          className="text-primary-maroon"
        />
      </svg>
    </div>
  );

  const renderDots = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full bg-primary-saffron animate-pulse',
            size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      className={cn(
        'rounded-full bg-gradient-to-r from-primary-saffron to-primary-golden animate-pulse',
        sizes[size],
        className
      )}
    />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'mandala':
        return renderMandala();
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {renderLoader()}
      {text && (
        <p className="text-sm text-secondary-charcoal font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export { Loading };