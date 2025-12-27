'use client';

import React from 'react';
import { Card, CardContent } from './Card';
import { Button } from './Button';

interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'heritage' | 'spiritual' | 'tourism';
  image?: string;
  link: string;
}

interface FeaturedContentCardsProps {
  contents: FeaturedContent[];
  onCardClick?: (content: FeaturedContent) => void;
  className?: string;
}

const FeaturedContentCards: React.FC<FeaturedContentCardsProps> = ({
  contents,
  onCardClick,
  className = ''
}) => {
  const getCategoryStyles = (category: FeaturedContent['category']) => {
    switch (category) {
      case 'heritage':
        return {
          cardVariant: 'cultural' as const,
          shadowClass: 'hover:shadow-cultural',
          iconBg: 'bg-primary-saffron',
          titleColor: 'text-primary-maroon',
          buttonVariant: 'primary' as const
        };
      case 'spiritual':
        return {
          cardVariant: 'spiritual' as const,
          shadowClass: 'hover:shadow-spiritual',
          iconBg: 'bg-primary-golden',
          titleColor: 'text-primary-maroon',
          buttonVariant: 'secondary' as const
        };
      case 'tourism':
        return {
          cardVariant: 'elevated' as const,
          shadowClass: 'hover:shadow-earth',
          iconBg: 'bg-secondary-sage',
          titleColor: 'text-primary-maroon',
          buttonVariant: 'outline' as const
        };
      default:
        return {
          cardVariant: 'elevated' as const,
          shadowClass: 'hover:shadow-medium',
          iconBg: 'bg-secondary-charcoal',
          titleColor: 'text-primary-maroon',
          buttonVariant: 'primary' as const
        };
    }
  };

  const handleCardClick = (content: FeaturedContent) => {
    if (onCardClick) {
      onCardClick(content);
    } else {
      // Default behavior - could navigate to the link
      window.location.href = content.link;
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {contents.map((content) => {
        const styles = getCategoryStyles(content.category);
        
        return (
          <Card
            key={content.id}
            variant={styles.cardVariant}
            className={`group cursor-pointer transform hover:scale-105 transition-all duration-300 ${styles.shadowClass} bg-white`}
            onClick={() => handleCardClick(content)}
          >
            <CardContent className="p-6 text-center h-full flex flex-col">
              {/* Background Image (if provided) */}
              {content.image && (
                <div className="absolute inset-0 rounded-lg overflow-hidden opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Icon */}
              <div className={`relative w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white text-2xl">{content.icon}</span>
              </div>

              {/* Title */}
              <h3 className={`text-xl font-semibold ${styles.titleColor} mb-3 font-playfair`}>
                {content.title}
              </h3>

              {/* Description */}
              <p className="text-secondary-charcoal leading-relaxed mb-6 flex-grow">
                {content.description}
              </p>

              {/* Call-to-Action Button */}
              <Button
                variant={styles.buttonVariant}
                size="sm"
                className="w-full group-hover:shadow-lg transition-shadow duration-300"
              >
                Explore More
              </Button>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  content.category === 'heritage' 
                    ? 'bg-primary-saffron text-white'
                    : content.category === 'spiritual'
                    ? 'bg-primary-golden text-white'
                    : 'bg-secondary-sage text-white'
                }`}>
                  {content.category.charAt(0).toUpperCase() + content.category.slice(1)}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FeaturedContentCards;