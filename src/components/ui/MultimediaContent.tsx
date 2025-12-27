'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Modal } from './Modal';
import { MediaAsset, Language } from '@/types';

export interface MultimediaContentProps {
  media: MediaAsset[];
  language?: Language;
  className?: string;
  layout?: 'grid' | 'carousel' | 'masonry';
  showCaptions?: boolean;
  enableLightbox?: boolean;
}

const MultimediaContent: React.FC<MultimediaContentProps> = ({
  media,
  language = 'en',
  className,
  layout = 'grid',
  showCaptions = true,
  enableLightbox = true,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});

  const openLightbox = (mediaItem: MediaAsset) => {
    if (enableLightbox) {
      setSelectedMedia(mediaItem);
    }
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const togglePlay = (mediaId: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [mediaId]: !prev[mediaId]
    }));
  };

  const renderMediaItem = (mediaItem: MediaAsset, index: number) => {
    const alt = mediaItem.alt[language] || mediaItem.alt.en;
    const caption = mediaItem.caption?.[language] || mediaItem.caption?.en;

    switch (mediaItem.type) {
      case 'image':
        return (
          <div
            key={mediaItem.id}
            className={cn(
              "relative group cursor-pointer overflow-hidden rounded-cultural shadow-cultural hover:shadow-spiritual transition-all duration-300",
              enableLightbox && "hover:scale-[1.02]"
            )}
            onClick={() => openLightbox(mediaItem)}
          >
            <div className="relative aspect-video">
              <Image
                src={mediaItem.url}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Zoom icon overlay */}
              {enableLightbox && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            
            {showCaptions && caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{caption}</p>
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div
            key={mediaItem.id}
            className="relative group overflow-hidden rounded-cultural shadow-cultural hover:shadow-spiritual transition-all duration-300"
          >
            <div className="relative aspect-video bg-black">
              <video
                className="w-full h-full object-cover"
                controls={isPlaying[mediaItem.id]}
                poster={mediaItem.url.replace('.mp4', '-poster.jpg')}
                onClick={() => togglePlay(mediaItem.id)}
              >
                <source src={mediaItem.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play button overlay */}
              {!isPlaying[mediaItem.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300">
                  <button
                    onClick={() => togglePlay(mediaItem.id)}
                    className="p-4 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                    aria-label="Play video"
                  >
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {showCaptions && caption && (
              <div className="p-3 bg-secondary-cream">
                <p className="text-secondary-charcoal text-sm">{caption}</p>
              </div>
            )}
          </div>
        );

      case 'audio':
        return (
          <div
            key={mediaItem.id}
            className="relative group overflow-hidden rounded-cultural shadow-cultural bg-gradient-to-br from-primary-saffron/10 to-primary-golden/10 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-saffron/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-saffron" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-secondary-charcoal mb-2">{alt}</h4>
                <audio
                  controls
                  className="w-full"
                  preload="metadata"
                >
                  <source src={mediaItem.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            
            {showCaptions && caption && (
              <div className="mt-4 pt-4 border-t border-primary-saffron/20">
                <p className="text-secondary-charcoal/80 text-sm">{caption}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderLayout = () => {
    switch (layout) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((mediaItem, index) => renderMediaItem(mediaItem, index))}
          </div>
        );

      case 'masonry':
        return (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {media.map((mediaItem, index) => (
              <div key={mediaItem.id} className="break-inside-avoid mb-6">
                {renderMediaItem(mediaItem, index)}
              </div>
            ))}
          </div>
        );

      case 'carousel':
        return (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {media.map((mediaItem, index) => (
              <div key={mediaItem.id} className="flex-shrink-0 w-80 snap-start">
                {renderMediaItem(mediaItem, index)}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {renderLayout()}

      {/* Lightbox Modal for Images */}
      {selectedMedia && selectedMedia.type === 'image' && (
        <Modal
          isOpen={!!selectedMedia}
          onClose={closeLightbox}
          size="full"
          variant="default"
          className="bg-black/95"
        >
          <div className="relative flex items-center justify-center min-h-[90vh] p-4">
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
                src={selectedMedia.url}
                alt={selectedMedia.alt[language] || selectedMedia.alt.en}
                width={selectedMedia.dimensions?.width || 1200}
                height={selectedMedia.dimensions?.height || 800}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
            </div>

            {/* Caption */}
            {selectedMedia.caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-black/70 rounded-cultural px-6 py-4 backdrop-blur-sm">
                  <p className="text-white text-lg font-medium">
                    {selectedMedia.caption[language] || selectedMedia.caption.en}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export { MultimediaContent };