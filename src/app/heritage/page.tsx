import { Metadata } from 'next';
import Link from 'next/link';
import { CulturalHeritageGallery, CulturalImage } from '@/components/ui/CulturalHeritageGallery';
import HeroSection from '@/components/ui/HeroSection';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Cultural Heritage - Devmali Village',
  description: 'Explore the rich cultural heritage of Devmali village, from ancient architecture to vibrant festivals and traditional way of life.',
  keywords: 'Devmali heritage, Rajasthani culture, village traditions, mud house architecture, cultural festivals',
};

// Sample heritage images - In production, these would come from a CMS or API
const heritageImages: CulturalImage[] = [
  {
    id: 'mud-house-1',
    src: '/images/heritage/mud-house-traditional.jpg',
    alt: 'Traditional mud house architecture in Devmali village',
    caption: 'Traditional mud house showcasing 1100 years of architectural wisdom',
    category: 'architecture',
    width: 800,
    height: 600,
    featured: true,
  },
  {
    id: 'festival-1',
    src: '/images/heritage/devnarayan-festival.jpg',
    alt: 'Lord Devnarayan festival celebration in Devmali',
    caption: 'Annual Lord Devnarayan festival bringing the community together',
    category: 'festivals',
    width: 600,
    height: 800,
    featured: true,
  },
  {
    id: 'daily-life-1',
    src: '/images/heritage/village-daily-life.jpg',
    alt: 'Daily life in Devmali village',
    caption: 'Peaceful daily life maintaining ancient traditions',
    category: 'daily-life',
    width: 700,
    height: 500,
  },
  {
    id: 'architecture-2',
    src: '/images/heritage/temple-architecture.jpg',
    alt: 'Ancient temple architecture in Devmali',
    caption: 'Sacred temple architecture reflecting spiritual devotion',
    category: 'architecture',
    width: 600,
    height: 900,
  },
  {
    id: 'crafts-1',
    src: '/images/heritage/traditional-crafts.jpg',
    alt: 'Traditional Rajasthani crafts in Devmali',
    caption: 'Handcrafted items preserving ancestral skills',
    category: 'crafts',
    width: 500,
    height: 700,
  },
  {
    id: 'traditions-1',
    src: '/images/heritage/community-gathering.jpg',
    alt: 'Community gathering in Devmali village',
    caption: 'Community gathering maintaining social bonds',
    category: 'traditions',
    width: 800,
    height: 500,
  },
];

const heritageStories = [
  {
    id: 'village-history',
    title: '1100 Years of Heritage',
    description: 'Discover the remarkable journey of Devmali village through eleven centuries of cultural preservation and spiritual devotion.',
    image: '/images/heritage/historical-timeline.jpg',
    link: '/heritage/village-history'
  },
  {
    id: 'mud-architecture',
    title: 'Sacred Mud House Architecture',
    description: 'Explore the significance of traditional mud house construction and its harmony with the Aravalli landscape.',
    image: '/images/heritage/mud-house-detail.jpg',
    link: '/heritage/architecture'
  },
  {
    id: 'living-traditions',
    title: 'Living Community Traditions',
    description: 'Experience the vibrant traditions that have shaped daily life in Devmali for over 1000 years, from spiritual practices to community celebrations.',
    image: '/images/heritage/community-traditions.jpg',
    link: '/heritage/traditions'
  },
  {
    id: 'heritage-stories',
    title: 'Sacred Stories & Legends',
    description: 'Journey through the captivating stories and legends that have shaped Devmali village over eleven centuries of cultural heritage.',
    image: '/images/heritage/village-legends.jpg',
    link: '/heritage/stories'
  },
];

export default function HeritagePage() {
  return (
    <div className="min-h-screen bg-secondary-cream">
      {/* Hero Section */}
      <HeroSection
        title="Cultural Heritage of Devmali"
        subtitle="Preserving 1100 Years of Sacred Traditions"
        spiritualQuote="Journey through the rich cultural tapestry of Devmali village, where ancient wisdom meets modern preservation efforts in the heart of Rajasthan."
      />

      {/* Quick Navigation */}
      <section className="py-8 px-4 bg-white border-b border-secondary-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/heritage/village-history" className="px-6 py-3 bg-primary-saffron/10 text-primary-saffron rounded-cultural hover:bg-primary-saffron hover:text-white transition-colors font-medium">
              1100 Years History
            </Link>
            <Link href="/heritage/architecture" className="px-6 py-3 bg-primary-earth/10 text-primary-earth rounded-cultural hover:bg-primary-earth hover:text-white transition-colors font-medium">
              Sacred Architecture
            </Link>
            <Link href="/heritage/traditions" className="px-6 py-3 bg-primary-golden/10 text-primary-golden rounded-cultural hover:bg-primary-golden hover:text-white transition-colors font-medium">
              Living Traditions
            </Link>
            <Link href="/heritage/stories" className="px-6 py-3 bg-primary-maroon/10 text-primary-maroon rounded-cultural hover:bg-primary-maroon hover:text-white transition-colors font-medium">
              Sacred Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Stories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-charcoal mb-4 font-playfair">
            Stories of Our Heritage
          </h2>
          <p className="text-lg text-secondary-charcoal/80 max-w-3xl mx-auto">
            Each tradition, each structure, each custom tells a story of resilience, 
            faith, and community that has been passed down through generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {heritageStories.map((story) => (
            <Link key={story.id} href={story.link}>
              <Card
                variant="cultural"
                className="group cursor-pointer hover:shadow-spiritual transition-all duration-300 h-full"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-cultural">
                  <div className="w-full h-full bg-gradient-to-br from-primary-saffron/20 to-primary-golden/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary-saffron/20 rounded-cultural flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className="text-sm text-secondary-charcoal/60">Heritage Story</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-secondary-charcoal mb-3 group-hover:text-primary-saffron transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-secondary-charcoal/70 mb-4 leading-relaxed flex-1">
                    {story.description}
                  </p>
                  <div className="flex items-center text-primary-saffron font-medium mt-auto">
                    <span>Read More</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Cultural Heritage Gallery */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Heritage Gallery
            </h2>
            <p className="text-lg text-secondary-charcoal/80 max-w-3xl mx-auto">
              Immerse yourself in the visual journey through Devmali's cultural heritage. 
              From ancient architecture to vibrant festivals, witness the beauty of our traditions.
            </p>
          </div>

          <CulturalHeritageGallery
            images={heritageImages}
            showFilters={true}
            enableLazyLoading={true}
            columns={3}
            className="mb-8"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-saffron to-primary-golden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-playfair">
            Experience Devmali Heritage
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Ready to witness the living heritage of Devmali? Take our virtual tour or plan your visit 
            to experience the authentic culture and traditions firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/virtual-tour"
              className="px-8 py-3 bg-white text-primary-saffron font-semibold rounded-cultural hover:bg-secondary-cream transition-colors shadow-cultural"
            >
              Start Virtual Tour
            </a>
            <a
              href="/visit"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-cultural hover:bg-white hover:text-primary-saffron transition-colors"
            >
              Plan Your Visit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}