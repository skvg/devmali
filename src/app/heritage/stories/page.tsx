import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { MultimediaContent } from '@/components/ui/MultimediaContent';
import { MediaAsset } from '@/types';

export const metadata: Metadata = {
  title: '1100 Years of Stories - Devmali Heritage',
  description: 'Discover the captivating stories and legends that have shaped Devmali village over eleven centuries of cultural heritage.',
  keywords: 'Devmali stories, village legends, cultural heritage, historical narratives, Rajasthani folklore',
};

// Sample multimedia content showcasing different media types
const heritageMedia: MediaAsset[] = [
  {
    id: 'village-founding-story',
    url: '/media/videos/village-founding-story.mp4',
    alt: {
      en: 'The founding story of Devmali village narrated by village elders',
      hi: 'गांव के बुजुर्गों द्वारा सुनाई गई देवमाली गांव की स्थापना की कहानी',
      raj: 'गांव रे बुजुर्गों द्वारा सुणाई गई देवमाली गांव री स्थापना री कहानी'
    },
    caption: {
      en: 'Village elders share the ancient story of how Devmali was founded over 1100 years ago',
      hi: 'गांव के बुजुर्ग 1100 साल पहले देवमाली की स्थापना की प्राचीन कहानी साझा करते हैं',
      raj: '1100 साल पहले देवमाली री स्थापना री प्राचीन कहानी गांव रे बुजुर्ग साझा करै है'
    },
    type: 'video',
    dimensions: { width: 1920, height: 1080 }
  },
  {
    id: 'traditional-songs',
    url: '/media/audio/traditional-heritage-songs.mp3',
    alt: {
      en: 'Traditional songs celebrating Devmali heritage',
      hi: 'देवमाली विरासत का जश्न मनाने वाले पारंपरिक गीत',
      raj: 'देवमाली विरासत रो जश्न मनावण वाळे पारंपरिक गीत'
    },
    caption: {
      en: 'Ancient folk songs that preserve the oral history and cultural memory of the village',
      hi: 'प्राचीन लोक गीत जो गांव के मौखिक इतिहास और सांस्कृतिक स्मृति को संरक्षित करते हैं',
      raj: 'प्राचीन लोक गीत जो गांव रे मौखिक इतिहास अर सांस्कृतिक स्मृति नै संरक्षित करै है'
    },
    type: 'audio'
  },
  {
    id: 'historical-artifacts',
    url: '/images/heritage/historical-artifacts.jpg',
    alt: {
      en: 'Ancient artifacts discovered in Devmali village',
      hi: 'देवमाली गांव में खोजी गई प्राचीन कलाकृतियां',
      raj: 'देवमाली गांव में खोजी गई प्राचीन कलाकृतियां'
    },
    caption: {
      en: 'Archaeological artifacts that tell the story of continuous habitation for over a millennium',
      hi: 'पुरातत्व कलाकृतियां जो एक सहस्राब्दी से अधिक निरंतर निवास की कहानी कहती हैं',
      raj: 'पुरातत्व कलाकृतियां जो एक सहस्राब्दी सूं अधिक निरंतर निवास री कहानी कहै है'
    },
    type: 'image',
    dimensions: { width: 1200, height: 800 }
  },
  {
    id: 'temple-construction',
    url: '/images/heritage/temple-construction-history.jpg',
    alt: {
      en: 'Historical documentation of temple construction',
      hi: 'मंदिर निर्माण का ऐतिहासिक दस्तावेजीकरण',
      raj: 'मंदिर निर्माण रो ऐतिहासिक दस्तावेजीकरण'
    },
    caption: {
      en: 'Ancient inscriptions and architectural details from the 12th century temple construction',
      hi: '12वीं शताब्दी के मंदिर निर्माण से प्राचीन शिलालेख और वास्तुकला विवरण',
      raj: '12वीं शताब्दी रे मंदिर निर्माण सूं प्राचीन शिलालेख अर वास्तुकला विवरण'
    },
    type: 'image',
    dimensions: { width: 1000, height: 750 }
  }
];

const legendaryStories = [
  {
    id: 'lord-devnarayan-legend',
    title: 'The Legend of Lord Devnarayan',
    period: '9th Century CE',
    description: 'The divine story of how Lord Devnarayan chose this sacred location for his earthly manifestation, leading to the establishment of the village.',
    significance: 'This foundational legend explains the spiritual significance of the location and the deep devotion that has characterized the village for over 1000 years.',
    themes: ['Divine manifestation', 'Sacred geography', 'Spiritual calling']
  },
  {
    id: 'first-settlement',
    title: 'The First Settlement',
    period: '10th Century CE',
    description: 'The story of the first families who were called to settle around the sacred site, establishing the community that would grow into modern Devmali.',
    significance: 'This story explains the origins of the village\'s social structure and the principles that continue to guide community life.',
    themes: ['Community founding', 'Divine guidance', 'Social harmony']
  },
  {
    id: 'temple-miracle',
    title: 'The Temple Construction Miracle',
    period: '12th Century CE',
    description: 'The miraculous events surrounding the construction of the main temple, including divine interventions and community unity.',
    significance: 'This legend reinforces the sacred nature of the temple and the importance of community cooperation in spiritual endeavors.',
    themes: ['Divine intervention', 'Community unity', 'Sacred architecture']
  },
  {
    id: 'drought-salvation',
    title: 'The Great Drought Salvation',
    period: '16th Century CE',
    description: 'How the village survived a seven-year drought through faith, community support, and divine grace, emerging stronger than before.',
    significance: 'This story demonstrates the resilience of the community and the power of collective faith in overcoming challenges.',
    themes: ['Community resilience', 'Divine grace', 'Environmental challenges']
  }
];

const culturalMemories = [
  {
    category: 'Architectural Heritage',
    stories: [
      'The Secret of Mud House Longevity',
      'The Master Builder\'s Wisdom',
      'The Sacred Geometry of Village Layout'
    ]
  },
  {
    category: 'Spiritual Traditions',
    stories: [
      'The Origin of Daily Prayers',
      'The First Festival Celebration',
      'The Miracle of Community Harmony'
    ]
  },
  {
    category: 'Social Customs',
    stories: [
      'The Vegetarian Commitment',
      'The Panchayat Tradition',
      'The Guest Welcome Ritual'
    ]
  },
  {
    category: 'Natural Harmony',
    stories: [
      'The Covenant with the Aravalli Hills',
      'The Sacred Water Sources',
      'The Seasonal Celebration Cycle'
    ]
  }
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-secondary-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-maroon to-primary-earth py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            1100 Years of Sacred Stories
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Journey through the legends, memories, and narratives that have shaped 
            Devmali village across eleven centuries of continuous cultural heritage.
          </p>
        </div>
      </div>

      {/* Multimedia Heritage Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Living Heritage in Multiple Forms
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              Experience our heritage through various media - from ancient songs and stories 
              passed down orally to visual documentation of our architectural treasures.
            </p>
          </div>

          <MultimediaContent
            media={heritageMedia}
            language="en"
            layout="grid"
            showCaptions={true}
            enableLightbox={true}
            className="mb-16"
          />
        </div>
      </section>

      {/* Legendary Stories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Legendary Stories Through Time
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              The great stories that have defined our village identity and continue 
              to inspire each generation with their timeless wisdom.
            </p>
          </div>

          <div className="space-y-8">
            {legendaryStories.map((story, index) => (
              <Card key={story.id} variant="cultural" className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary-saffron text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-secondary-charcoal font-playfair">
                          {story.title}
                        </h3>
                        <p className="text-primary-saffron font-medium">{story.period}</p>
                      </div>
                    </div>
                    
                    <p className="text-secondary-charcoal/80 text-lg leading-relaxed mb-6">
                      {story.description}
                    </p>
                    
                    <div className="border-l-4 border-primary-golden pl-6">
                      <h4 className="font-semibold text-secondary-charcoal mb-2">Cultural Significance:</h4>
                      <p className="text-secondary-charcoal/70 italic leading-relaxed">
                        {story.significance}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-primary-saffron/10 to-primary-golden/10 rounded-cultural p-6">
                      <h4 className="font-semibold text-secondary-charcoal mb-4">Key Themes:</h4>
                      <div className="space-y-2">
                        {story.themes.map((theme, themeIndex) => (
                          <div key={themeIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary-saffron rounded-full"></div>
                            <span className="text-secondary-charcoal/80 text-sm">{theme}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Memory Categories */}
      <section className="py-16 px-4 bg-secondary-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Cultural Memory Traditions
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              The countless smaller stories and memories that form the rich tapestry 
              of daily life and cultural practice in Devmali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalMemories.map((category) => (
              <Card key={category.category} variant="spiritual" className="p-6">
                <h3 className="text-xl font-semibold text-secondary-charcoal mb-4 font-playfair">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.stories.map((story, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-cultural hover:bg-white/80 transition-colors cursor-pointer">
                      <div className="w-6 h-6 bg-primary-saffron/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-primary-saffron rounded-full"></div>
                      </div>
                      <span className="text-secondary-charcoal/80 leading-relaxed">{story}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-earth to-primary-maroon">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-playfair">
            Become Part of Our Story
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            Every visitor to Devmali becomes part of our continuing story. Come and 
            experience these living traditions, add your own chapter to our heritage, 
            and help us preserve these precious narratives for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/visit"
              className="px-8 py-3 bg-white text-primary-earth font-semibold rounded-cultural hover:bg-secondary-cream transition-colors shadow-cultural"
            >
              Plan Your Visit
            </a>
            <a
              href="/virtual-tour"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-cultural hover:bg-white hover:text-primary-earth transition-colors"
            >
              Virtual Heritage Tour
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}