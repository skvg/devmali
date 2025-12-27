'use client';

import React from 'react';

interface OverviewSectionProps {
  title: string;
  subtitle: string;
  description: string;
  highlights: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  backgroundImage?: string;
  className?: string;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  title,
  subtitle,
  description,
  highlights,
  backgroundImage,
  className = ''
}) => {
  return (
    <section 
      id="overview-section"
      className={`relative py-20 px-4 ${className}`}
    >
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-white bg-opacity-90" />
        </>
      )}

      {/* Decorative Pattern */}
      <div className="absolute inset-0 rajasthani-pattern opacity-5" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-primary-saffron text-sm font-semibold uppercase tracking-wider">
              {subtitle}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-primary-maroon mb-6 leading-tight">
            {title}
          </h2>
          
          <div className="w-24 h-1 bg-primary-golden mx-auto mb-8" />
          
          <p className="text-lg md:text-xl text-secondary-charcoal max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm hover:bg-opacity-80 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary-saffron to-primary-golden rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-golden transition-shadow duration-300">
                <span className="text-white text-3xl">{highlight.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-primary-maroon mb-3 font-playfair">
                {highlight.title}
              </h3>

              {/* Description */}
              <p className="text-secondary-charcoal leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-primary-saffron rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-primary-golden rounded-full animate-pulse animation-delay-300" />
            <div className="w-2 h-2 bg-primary-maroon rounded-full animate-pulse animation-delay-600" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;