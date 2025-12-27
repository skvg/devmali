'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Modal } from './Modal';
import { Loading } from './Loading';

export interface CulturalImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: 'architecture' | 'festivals' | 'daily-life' | 'traditions' | 'crafts';
  width?: number;
  height?: number;
  featured?: boolean;
}

export interface CulturalHeritageGalleryProps {
  images: CulturalImage[];
  className?: string;
  showFilters?: boolean;
  enableLazyLoading?: boolean;
  columns?: 2 | 3 | 4;
}

const categoryLabels = {
  'architecture': 'Architecture',
  'festivals': 'Festivals',
  'daily-life': 'Daily Life',
  'traditions': 'Traditions',
  'crafts': 'Crafts'
};

const CulturalHeritageGallery: React.FC<CulturalHeritageGalleryProps> = ({
  images,
  className,
  showFilters = true,
  enableLazyLoading = true,
  columns = 3,
}) => {
  const [selectedImage, setSelectedImage] = useState<CulturalImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Get unique categories from images
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(images.map(img => img.category)));
    return ['all', ...uniqueCategories];
  }, [images]);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') {
      return images;
    }
    return images.filter(img => img.category === selectedCategory);
  }, [images, selectedCategory]);

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Simulate loading delay for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  };

  // Handle image load
  const handleImageLoad = (imageId: string) => {
    setImagesLoaded(prev => new Set(prev).add(imageId));
  };

  // Open lightbox
  const openLightbox = (image: CulturalImage) => {
    setSelectedImage(image);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Navigate between images in lightbox
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  // Masonry layout with cultural styling
  const renderMasonryLayout = () => (
    <div
      className={cn(
        'columns-1 gap-6 space-y-6',
        columns === 2 && 'md:columns-2',
        columns === 3 && 'md:columns-2 lg:columns-3',
        columns === 4 && 'md:columns-2 lg:columns-3 xl:columns-4'
      )}
    >
      {filteredImages.map((image) => {
        const isLoaded = imagesLoaded.has(image.id);
        
        return (
          <div
            key={image.id}
            className="break-inside-avoid mb-6 cursor-pointer group"
            onClick={() => openLightbox(image)}
          >
            <div className="relative overflow-hidden rounded-cultural shadow-cultural hover:shadow-spiritual transition-all duration-500 group-hover:scale-[1.02] bg-secondary-cream">
              {/* Loading placeholder */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-secondary-cream animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary-saffron border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width || 400}
                height={image.height || 300}
                className={cn(
                  "w-full h-auto object-cover transition-opacity duration-300",
                  isLoaded ? "opacity-100" : "opacity-0"
                )}
                loading={enableLazyLoading ? "lazy" : "eager"}
                onLoad={() => handleImageLoad(image.id)}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category badge */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2 py-1 bg-primary-saffron text-white text-xs font-medium rounded-cultural">
                  {categoryLabels[image.category]}
                </span>
              </div>
              
              {/* Featured badge */}
              {image.featured && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-primary-golden rounded-full shadow-golden animate-pulse" />
                </div>
              )}
              
              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium leading-relaxed">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={cn('w-full', className)}>
      {/* Category Filters */}
      {showFilters && categories.length > 1 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-secondary-charcoal mb-4 font-playfair">
            Explore by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  'px-4 py-2 rounded-cultural text-sm font-medium transition-all duration-300 border-2',
                  selectedCategory === category
                    ? 'bg-primary-saffron text-white border-primary-saffron shadow-cultural'
                    : 'bg-secondary-cream text-secondary-charcoal border-secondary-cream hover:border-primary-saffron hover:text-primary-saffron hover:shadow-soft'
                )}
                disabled={isLoading}
              >
                {category === 'all' ? 'All Heritage' : categoryLabels[category as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loading size="lg" variant="mandala" />
        </div>
      )}

      {/* Gallery */}
      {!isLoading && (
        <>
          {filteredImages.length > 0 ? (
            renderMasonryLayout()
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary-cream rounded-cultural flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-secondary-charcoal text-lg">No images found in this category</p>
            </div>
          )}
        </>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={closeLightbox}
          size="full"
          variant="default"
          className="bg-black/95"
        >
          <div className="relative flex items-center justify-center min-h-[90vh] p-4">
            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 z-10 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 z-10 backdrop-blur-sm"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 z-10 backdrop-blur-sm"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative max-w-full max-h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width || 1200}
                height={selectedImage.height || 800}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-black/70 rounded-cultural px-6 py-4 backdrop-blur-sm">
                {selectedImage.caption && (
                  <p className="text-white text-lg font-medium mb-2">
                    {selectedImage.caption}
                  </p>
                )}
                <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                  <span className="px-2 py-1 bg-primary-saffron/80 rounded-cultural">
                    {categoryLabels[selectedImage.category]}
                  </span>
                  <span>
                    {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export { CulturalHeritageGallery };