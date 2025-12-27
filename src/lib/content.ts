import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import {
  VillageContent,
  SpiritualContent,
  TourLocation,
  MediaAsset,
  Language,
  ContentCategory,
  validateContent,
  isValidLanguage,
  isValidContentCategory,
} from '@/types';

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), 'content');
const HERITAGE_DIR = path.join(CONTENT_DIR, 'heritage');
const SPIRITUAL_DIR = path.join(CONTENT_DIR, 'spiritual');
const TOURISM_DIR = path.join(CONTENT_DIR, 'tourism');
const COMMUNITY_DIR = path.join(CONTENT_DIR, 'community');

// Ensure content directories exist
export function ensureContentDirectories() {
  const dirs = [CONTENT_DIR, HERITAGE_DIR, SPIRITUAL_DIR, TOURISM_DIR, COMMUNITY_DIR];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Markdown processing utility
export async function processMarkdown(content: string): Promise<string> {
  const result = await remark().use(html).process(content);
  return result.toString();
}

// Generic content loader
interface ContentFile {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
  processedContent: string;
}

export async function loadContentFile(filePath: string): Promise<ContentFile | null> {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    const processedContent = await processMarkdown(content);
    const slug = path.basename(filePath, '.md');

    return {
      slug,
      frontmatter,
      content,
      processedContent,
    };
  } catch (error) {
    console.error(`Error loading content file ${filePath}:`, error);
    return null;
  }
}

// Load all content files from a directory
export async function loadContentFromDirectory(dirPath: string): Promise<ContentFile[]> {
  try {
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));
    const contentFiles: ContentFile[] = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const contentFile = await loadContentFile(filePath);
      if (contentFile) {
        contentFiles.push(contentFile);
      }
    }

    return contentFiles;
  } catch (error) {
    console.error(`Error loading content from directory ${dirPath}:`, error);
    return [];
  }
}

// Village content loaders
export async function loadVillageContent(slug?: string): Promise<VillageContent[]> {
  const contentFiles = await loadContentFromDirectory(HERITAGE_DIR);
  const villageContents: VillageContent[] = [];

  for (const file of contentFiles) {
    if (slug && file.slug !== slug) continue;

    try {
      // Transform frontmatter to VillageContent format
      const villageContent: VillageContent = {
        id: file.slug,
        title: file.frontmatter.title || { en: '', hi: '', raj: '' },
        description: file.frontmatter.description || { en: '', hi: '', raj: '' },
        images: file.frontmatter.images || [],
        category: isValidContentCategory(file.frontmatter.category) 
          ? file.frontmatter.category 
          : 'heritage',
        publishedDate: file.frontmatter.publishedDate 
          ? new Date(file.frontmatter.publishedDate) 
          : new Date(),
        featured: file.frontmatter.featured || false,
      };

      // Validate the content
      const validatedContent = validateContent.villageContent(villageContent);
      villageContents.push(validatedContent);
    } catch (error) {
      console.error(`Error processing village content ${file.slug}:`, error);
    }
  }

  return villageContents;
}

// Spiritual content loaders
export async function loadSpiritualContent(slug?: string): Promise<SpiritualContent[]> {
  const contentFiles = await loadContentFromDirectory(SPIRITUAL_DIR);
  const spiritualContents: SpiritualContent[] = [];

  for (const file of contentFiles) {
    if (slug && file.slug !== slug) continue;

    try {
      const spiritualContent: SpiritualContent = {
        id: file.slug,
        title: file.frontmatter.title || { en: '', hi: '', raj: '' },
        content: {
          en: file.processedContent,
          hi: file.frontmatter.content_hi || file.processedContent,
          raj: file.frontmatter.content_raj || file.processedContent,
        },
        type: ['prayer', 'mantra', 'story', 'teaching'].includes(file.frontmatter.type)
          ? file.frontmatter.type
          : 'story',
        audioUrl: file.frontmatter.audioUrl,
        downloadUrl: file.frontmatter.downloadUrl,
        significance: file.frontmatter.significance || { en: '', hi: '', raj: '' },
      };

      const validatedContent = validateContent.spiritualContent(spiritualContent);
      spiritualContents.push(validatedContent);
    } catch (error) {
      console.error(`Error processing spiritual content ${file.slug}:`, error);
    }
  }

  return spiritualContents;
}

// Tour location loaders
export async function loadTourLocations(slug?: string): Promise<TourLocation[]> {
  const contentFiles = await loadContentFromDirectory(TOURISM_DIR);
  const tourLocations: TourLocation[] = [];

  for (const file of contentFiles) {
    if (slug && file.slug !== slug) continue;

    try {
      const tourLocation: TourLocation = {
        id: file.slug,
        name: file.frontmatter.name || { en: '', hi: '', raj: '' },
        coordinates: file.frontmatter.coordinates || { lat: 0, lng: 0 },
        panoramicImageUrl: file.frontmatter.panoramicImageUrl || '',
        hotspots: file.frontmatter.hotspots || [],
        audioNarration: file.frontmatter.audioNarration || { en: '', hi: '', raj: '' },
        description: {
          en: file.processedContent,
          hi: file.frontmatter.description_hi || file.processedContent,
          raj: file.frontmatter.description_raj || file.processedContent,
        },
      };

      const validatedContent = validateContent.tourLocation(tourLocation);
      tourLocations.push(validatedContent);
    } catch (error) {
      console.error(`Error processing tour location ${file.slug}:`, error);
    }
  }

  return tourLocations;
}

// Content by category
export async function loadContentByCategory(category: ContentCategory): Promise<VillageContent[]> {
  let dirPath: string;
  
  switch (category) {
    case 'heritage':
      dirPath = HERITAGE_DIR;
      break;
    case 'spiritual':
      dirPath = SPIRITUAL_DIR;
      break;
    case 'tourism':
      dirPath = TOURISM_DIR;
      break;
    case 'community':
      dirPath = COMMUNITY_DIR;
      break;
    default:
      return [];
  }

  const contentFiles = await loadContentFromDirectory(dirPath);
  const contents: VillageContent[] = [];

  for (const file of contentFiles) {
    try {
      const content: VillageContent = {
        id: file.slug,
        title: file.frontmatter.title || { en: '', hi: '', raj: '' },
        description: {
          en: file.processedContent,
          hi: file.frontmatter.description_hi || file.processedContent,
          raj: file.frontmatter.description_raj || file.processedContent,
        },
        images: file.frontmatter.images || [],
        category,
        publishedDate: file.frontmatter.publishedDate 
          ? new Date(file.frontmatter.publishedDate) 
          : new Date(),
        featured: file.frontmatter.featured || false,
      };

      const validatedContent = validateContent.villageContent(content);
      contents.push(validatedContent);
    } catch (error) {
      console.error(`Error processing content ${file.slug}:`, error);
    }
  }

  return contents;
}

// Featured content loader
export async function loadFeaturedContent(): Promise<VillageContent[]> {
  const categories: ContentCategory[] = ['heritage', 'spiritual', 'tourism', 'community'];
  const allContent: VillageContent[] = [];

  for (const category of categories) {
    const categoryContent = await loadContentByCategory(category);
    allContent.push(...categoryContent);
  }

  return allContent.filter(content => content.featured);
}

// Search functionality
export async function searchContent(query: string, language: Language = 'en'): Promise<VillageContent[]> {
  const categories: ContentCategory[] = ['heritage', 'spiritual', 'tourism', 'community'];
  const allContent: VillageContent[] = [];

  for (const category of categories) {
    const categoryContent = await loadContentByCategory(category);
    allContent.push(...categoryContent);
  }

  const searchTerm = query.toLowerCase();
  
  return allContent.filter(content => {
    const title = content.title[language]?.toLowerCase() || '';
    const description = content.description[language]?.toLowerCase() || '';
    
    return title.includes(searchTerm) || description.includes(searchTerm);
  });
}

// Content statistics
export async function getContentStats() {
  const categories: ContentCategory[] = ['heritage', 'spiritual', 'tourism', 'community'];
  const stats: Record<ContentCategory, number> = {
    heritage: 0,
    spiritual: 0,
    tourism: 0,
    community: 0,
  };

  for (const category of categories) {
    const content = await loadContentByCategory(category);
    stats[category] = content.length;
  }

  return {
    ...stats,
    total: Object.values(stats).reduce((sum, count) => sum + count, 0),
  };
}