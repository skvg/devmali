// Language types
export type Language = 'en' | 'hi' | 'raj';

// Content category types
export type ContentCategory = 'heritage' | 'spiritual' | 'tourism' | 'community';

// Media asset interface
export interface MediaAsset {
  id: string;
  url: string;
  alt: Record<Language, string>;
  caption?: Record<Language, string>;
  type: 'image' | 'video' | 'audio';
  dimensions?: { width: number; height: number };
}

// Village content interface
export interface VillageContent {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  images: MediaAsset[];
  category: ContentCategory;
  publishedDate: Date;
  featured: boolean;
}

// Spiritual content interface
export interface SpiritualContent {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  type: 'prayer' | 'mantra' | 'story' | 'teaching';
  audioUrl?: string;
  downloadUrl?: string;
  significance: Record<Language, string>;
}

// Tour hotspot interface
export interface TourHotspot {
  id: string;
  position: { x: number; y: number };
  title: Record<Language, string>;
  description: Record<Language, string>;
  mediaUrl?: string;
}

// Tour location interface
export interface TourLocation {
  id: string;
  name: Record<Language, string>;
  coordinates: { lat: number; lng: number };
  panoramicImageUrl: string;
  hotspots: TourHotspot[];
  audioNarration: Record<Language, string>;
  description: Record<Language, string>;
}

// Navigation item interface
export interface NavigationItem {
  id: string;
  label: Record<Language, string>;
  href: string;
  children?: NavigationItem[];
}

// Site configuration interface
export interface SiteConfig {
  name: Record<Language, string>;
  description: Record<Language, string>;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}