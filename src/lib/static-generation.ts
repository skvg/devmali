import { GetStaticProps, GetStaticPaths } from 'next';
import {
  loadVillageContent,
  loadSpiritualContent,
  loadTourLocations,
  loadContentByCategory,
  loadFeaturedContent,
  searchContent,
  getContentStats,
} from './content';
import {
  VillageContent,
  SpiritualContent,
  TourLocation,
  Language,
  ContentCategory,
} from '@/types';

// Static generation helpers for Next.js pages

// Generate static paths for content pages
export async function generateContentPaths(category: ContentCategory) {
  const content = await loadContentByCategory(category);
  const languages: Language[] = ['en', 'hi', 'raj'];
  
  const paths = content.flatMap(item =>
    languages.map(lang => ({
      params: { slug: item.id, lang },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

// Generate static props for content pages
export async function generateContentProps(
  slug: string,
  category: ContentCategory,
  language: Language = 'en'
) {
  const content = await loadContentByCategory(category);
  const item = content.find(c => c.id === slug);

  if (!item) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: item,
      language,
      category,
    },
    revalidate: 3600, // Revalidate every hour
  };
}

// Generate homepage props
export async function generateHomepageProps() {
  const [featuredContent, contentStats] = await Promise.all([
    loadFeaturedContent(),
    getContentStats(),
  ]);

  return {
    props: {
      featuredContent,
      contentStats,
    },
    revalidate: 1800, // Revalidate every 30 minutes
  };
}

// Generate spiritual content props
export async function generateSpiritualProps(slug?: string) {
  const spiritualContent = await loadSpiritualContent(slug);

  return {
    props: {
      spiritualContent: slug ? spiritualContent[0] || null : spiritualContent,
    },
    revalidate: 3600,
  };
}

// Generate tour props
export async function generateTourProps(slug?: string) {
  const tourLocations = await loadTourLocations(slug);

  return {
    props: {
      tourLocations: slug ? tourLocations[0] || null : tourLocations,
    },
    revalidate: 3600,
  };
}