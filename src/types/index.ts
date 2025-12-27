import { z } from 'zod';

// Language types
export type Language = 'en' | 'hi' | 'raj';

// Content category types
export type ContentCategory = 'heritage' | 'spiritual' | 'tourism' | 'community';

// Validation schemas
export const LanguageSchema = z.enum(['en', 'hi', 'raj']);

export const ContentCategorySchema = z.enum(['heritage', 'spiritual', 'tourism', 'community']);

export const MultilingualStringSchema = z.object({
  en: z.string(),
  hi: z.string(),
  raj: z.string(),
});

export const OptionalMultilingualStringSchema = z.object({
  en: z.string(),
  hi: z.string(),
  raj: z.string(),
}).optional();

// Media asset interface and schema
export interface MediaAsset {
  id: string;
  url: string;
  alt: Record<Language, string>;
  caption?: Record<Language, string>;
  type: 'image' | 'video' | 'audio';
  dimensions?: { width: number; height: number };
}

export const MediaAssetSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
  alt: MultilingualStringSchema,
  caption: OptionalMultilingualStringSchema,
  type: z.enum(['image', 'video', 'audio']),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional(),
});

// Village content interface and schema
export interface VillageContent {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  images: MediaAsset[];
  category: ContentCategory;
  publishedDate: Date;
  featured: boolean;
}

export const VillageContentSchema = z.object({
  id: z.string().min(1),
  title: MultilingualStringSchema,
  description: MultilingualStringSchema,
  images: z.array(MediaAssetSchema),
  category: ContentCategorySchema,
  publishedDate: z.date(),
  featured: z.boolean(),
});

// Spiritual content interface and schema
export interface SpiritualContent {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  type: 'prayer' | 'mantra' | 'story' | 'teaching';
  audioUrl?: string;
  downloadUrl?: string;
  significance: Record<Language, string>;
}

export const SpiritualContentSchema = z.object({
  id: z.string().min(1),
  title: MultilingualStringSchema,
  content: MultilingualStringSchema,
  type: z.enum(['prayer', 'mantra', 'story', 'teaching']),
  audioUrl: z.string().url().optional(),
  downloadUrl: z.string().url().optional(),
  significance: MultilingualStringSchema,
});

// Tour hotspot interface and schema
export interface TourHotspot {
  id: string;
  position: { x: number; y: number };
  title: Record<Language, string>;
  description: Record<Language, string>;
  mediaUrl?: string;
}

export const TourHotspotSchema = z.object({
  id: z.string().min(1),
  position: z.object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
  }),
  title: MultilingualStringSchema,
  description: MultilingualStringSchema,
  mediaUrl: z.string().url().optional(),
});

// Tour location interface and schema
export interface TourLocation {
  id: string;
  name: Record<Language, string>;
  coordinates: { lat: number; lng: number };
  panoramicImageUrl: string;
  hotspots: TourHotspot[];
  audioNarration: Record<Language, string>;
  description: Record<Language, string>;
}

export const TourLocationSchema = z.object({
  id: z.string().min(1),
  name: MultilingualStringSchema,
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  panoramicImageUrl: z.string().url(),
  hotspots: z.array(TourHotspotSchema),
  audioNarration: MultilingualStringSchema,
  description: MultilingualStringSchema,
});

// Navigation item interface and schema
export interface NavigationItem {
  id: string;
  label: Record<Language, string>;
  href: string;
  children?: NavigationItem[];
}

export const NavigationItemSchema: z.ZodType<NavigationItem> = z.lazy(() =>
  z.object({
    id: z.string().min(1),
    label: MultilingualStringSchema,
    href: z.string().min(1),
    children: z.array(NavigationItemSchema).optional(),
  })
);

// Site configuration interface and schema
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

export const SiteConfigSchema = z.object({
  name: MultilingualStringSchema,
  description: MultilingualStringSchema,
  url: z.string().url(),
  ogImage: z.string().url(),
  links: z.object({
    twitter: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
  }),
});

// Content validation utilities
export const validateContent = {
  villageContent: (data: unknown): VillageContent => VillageContentSchema.parse(data),
  spiritualContent: (data: unknown): SpiritualContent => SpiritualContentSchema.parse(data),
  tourLocation: (data: unknown): TourLocation => TourLocationSchema.parse(data),
  mediaAsset: (data: unknown): MediaAsset => MediaAssetSchema.parse(data),
  navigationItem: (data: unknown): NavigationItem => NavigationItemSchema.parse(data),
  siteConfig: (data: unknown): SiteConfig => SiteConfigSchema.parse(data),
};

// Type guards
export const isValidLanguage = (lang: string): lang is Language => {
  return ['en', 'hi', 'raj'].includes(lang);
};

export const isValidContentCategory = (category: string): category is ContentCategory => {
  return ['heritage', 'spiritual', 'tourism', 'community'].includes(category);
};