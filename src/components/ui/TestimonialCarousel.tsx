'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './Card';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  content: string;
  image?: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && testimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, testimonials.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-primary-golden' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={`relative max-w-4xl mx-auto ${className}`}>
      {/* Main Testimonial Display */}
      <div className="relative overflow-hidden">
        <Card variant="elevated" className="min-h-[300px] bg-white shadow-spiritual">
          <CardContent className="p-8 md:p-12 text-center">
            {/* Quote Icon */}
            <div className="text-6xl text-primary-golden opacity-20 mb-4">
              "
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-lg md:text-xl text-secondary-charcoal leading-relaxed mb-6 font-light italic">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Rating */}
            <div className="flex justify-center mb-4">
              {renderStars(currentTestimonial.rating)}
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-center space-x-4">
              {currentTestimonial.image && (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-golden">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <h4 className="font-semibold text-primary-maroon text-lg">
                  {currentTestimonial.name}
                </h4>
                <p className="text-secondary-charcoal text-sm">
                  {currentTestimonial.role}
                </p>
                <p className="text-secondary-sage text-sm">
                  {currentTestimonial.location}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Controls */}
      {testimonials.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-medium flex items-center justify-center text-primary-maroon hover:bg-primary-saffron hover:text-white transition-all duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-medium flex items-center justify-center text-primary-maroon hover:bg-primary-saffron hover:text-white transition-all duration-300 z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-golden scale-125'
                    : 'bg-gray-300 hover:bg-primary-saffron'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-primary-maroon hover:bg-opacity-100 transition-all duration-300"
            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default TestimonialCarousel;