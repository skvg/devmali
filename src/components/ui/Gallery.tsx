'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Modal } from './Modal';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  width?: number;
  height?: number;
}

export interface GalleryProps {
  images: GalleryImage[];
  layout?: 'masonry' | 'grid' | 'carousel';
  columns?: 2 | 3 | 4 | 5;
  showCategories?: boolean;
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  layout = 'masonry',
  columns = 3,
  showCategories = false,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = showCategories
    ? ['all', ...Array.from(new Set(images.map(img => img.category).filter((cat): cat is string => Boolean(cat))))]
    : [];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

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

  const renderMasonryLayout = () => (
    <div
      className={cn(
        'columns-2 gap-4 space-y-4',
        columns === 3 && 'md:columns-3',
        columns === 4 && 'md:columns-4',
        columns === 5 && 'md:columns-5'
      )}
    >
      {filteredImages.map((image) => (
        <div
          key={image.id}
          className="break-inside-avoid mb-4 cursor-pointer group"
          onClick={() => openLightbox(image)}
        >
          <div className="relative overflow-hidden rounded-cultural shadow-cultural hover:shadow-spiritual transition-all duration-300 group-hover:scale-[1.02]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 400}
              height={image.height || 300}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {image.caption && (
                <p className="text-white text-sm font-medium">{image.caption}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGridLayout = () => (
    <div
      className={cn(
        'grid gap-4',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        columns === 5 && 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'
      )}
    >
      {filteredImages.map((image) => (
        <div
          key={image.id}
          className="cursor-pointer group"
          onClick={() => openLightbox(image)}
        >
          <div className="relative aspect-square overflow-hidden rounded-cultural shadow-cultural hover:shadow-spiritual transition-all duration-300 group-hover:scale-[1.02]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {image.caption && (
                <p className="text-white text-sm font-medium">{image.caption}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn('w-full', className)}>
      {/* Category Filter */}
      {showCategories && categories.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-cultural text-sm font-medium transition-all duration-200',
                selectedCategory === category
                  ? 'bg-primary-saffron text-white shadow-cultural'
                  : 'bg-secondary-cream text-secondary-charcoal hover:bg-primary-golden/20'
              )}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Gallery */}
      {layout === 'masonry' ? renderMasonryLayout() : renderGridLayout()}

      {/* Lightbox Modal */}
      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={closeLightbox}
          size="full"
          variant="default"
          className="bg-black/90"
        >
          <div className="relative flex items-center justify-center min-h-[80vh]">
            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative max-w-full max-h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width || 800}
                height={selectedImage.height || 600}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
            </div>

            {/* Caption */}
            {selectedImage.caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg font-medium bg-black/50 rounded-cultural px-4 py-2">
                  {selectedImage.caption}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export { Gallery };