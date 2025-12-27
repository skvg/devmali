'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface DarshanImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  significance: string;
  mantra?: string;
}

interface HighResolutionImageViewerProps {
  image: DarshanImage;
  onClose: () => void;
}

const HighResolutionImageViewer: React.FC<HighResolutionImageViewerProps> = ({ 
  image, 
  onClose 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset zoom and position when image changes
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsLoading(true);
  }, [image.id]);

  useEffect(() => {
    // Handle escape key to close viewer
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(5, prev * delta)));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close button */}
      <Button
        variant="secondary"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100"
      >
        ✕ Close
      </Button>

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <Button
          variant="secondary"
          onClick={handleZoomIn}
          className="bg-white hover:bg-gray-100 w-10 h-10 p-0"
          disabled={zoom >= 5}
        >
          +
        </Button>
        <Button
          variant="secondary"
          onClick={handleZoomOut}
          className="bg-white hover:bg-gray-100 w-10 h-10 p-0"
          disabled={zoom <= 0.5}
        >
          -
        </Button>
        <Button
          variant="secondary"
          onClick={handleResetZoom}
          className="bg-white hover:bg-gray-100 text-xs px-2 py-1"
        >
          Reset
        </Button>
      </div>

      {/* Image container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-lg">Loading high resolution image...</div>
          </div>
        )}
        
        <img
          ref={imageRef}
          src={image.imageUrl}
          alt={image.title}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transformOrigin: 'center center'
          }}
          onLoad={handleImageLoad}
          onError={(e) => {
            // Fallback to thumbnail if high-res fails
            (e.target as HTMLImageElement).src = image.thumbnailUrl;
            setIsLoading(false);
          }}
          draggable={false}
        />
      </div>

      {/* Image information panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
          <p className="text-gray-200 mb-3">{image.description}</p>
          
          {image.mantra && (
            <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-3">
              <p className="text-orange-300 font-medium mb-2">Sacred Mantra for Meditation:</p>
              <p className="text-xl text-center text-yellow-200 font-medium">
                {image.mantra}
              </p>
            </div>
          )}
          
          <div className="text-sm text-gray-300">
            <strong>Spiritual Significance:</strong> {image.significance}
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            <p>💡 Use mouse wheel or zoom buttons to zoom in/out • Drag to pan when zoomed • Press ESC to close</p>
          </div>
        </div>
      </div>

      {/* Zoom indicator */}
      {zoom !== 1 && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
          {Math.round(zoom * 100)}%
        </div>
      )}
    </div>
  );
};

export default HighResolutionImageViewer;