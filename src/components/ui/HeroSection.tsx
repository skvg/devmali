'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface HeroSectionProps {
  videoSrc?: string;
  fallbackImageSrc?: string;
  title: string;
  subtitle: string;
  spiritualQuote: string;
  onExploreClick?: () => void;
  onVirtualTourClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  videoSrc = '/videos/devmali-village.mp4',
  fallbackImageSrc = '/images/devmali-hero-bg.jpg',
  title,
  subtitle,
  spiritualQuote,
  onExploreClick,
  onVirtualTourClick
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.play().catch(console.error);
      };

      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  // Smooth scroll to next section
  const handleScrollToNext = () => {
    const nextSection = document.querySelector('#overview-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const parallaxOffset = scrollY * 0.5;

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        {videoSrc && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        
        {/* Fallback Background Image */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${fallbackImageSrc})`,
          }}
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Rajasthani Pattern Overlay */}
      <div className="absolute inset-0 rajasthani-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Animated Title */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <div className="w-24 h-1 bg-primary-golden mx-auto mb-6 animate-expand" />
        </div>

        {/* Animated Subtitle */}
        <div className="mb-8 animate-fade-in-up animation-delay-300">
          <p className="text-xl md:text-2xl lg:text-3xl text-secondary-cream leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        {/* Spiritual Quote */}
        <div className="mb-12 animate-fade-in-up animation-delay-600">
          <blockquote className="text-lg md:text-xl text-primary-golden font-devanagari italic max-w-3xl mx-auto leading-relaxed">
            "{spiritualQuote}"
          </blockquote>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-900">
          <Button
            variant="primary"
            size="lg"
            className="rounded-full px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-golden"
            onClick={onExploreClick || handleScrollToNext}
          >
            Explore Heritage
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-maroon transform hover:scale-105 transition-all duration-300"
            onClick={onVirtualTourClick}
          >
            Virtual Tour
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div 
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center cursor-pointer hover:border-primary-golden transition-colors duration-300"
            onClick={handleScrollToNext}
          >
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;