import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { CulturalHeritageGallery, CulturalImage } from '@/components/ui/CulturalHeritageGallery';

export const metadata: Metadata = {
  title: 'Living Traditions - Devmali Heritage',
  description: 'Experience the living traditions of Devmali village, from the pure vegetarian lifestyle to community festivals and daily spiritual practices.',
  keywords: 'Devmali traditions, vegetarian lifestyle, community practices, spiritual traditions, Rajasthani customs',
};

const traditionImages: CulturalImage[] = [
  {
    id: 'community-gathering',
    src: '/images/traditions/community-gathering.jpg',
    alt: 'Community gathering in Devmali village',
    caption: 'Village elders sharing wisdom during community gathering',
    category: 'traditions',
    width: 800,
    height: 600,
    featured: true,
  },
  {
    id: 'vegetarian-cooking',
    src: '/images/traditions/vegetarian-cooking.jpg',
    alt: 'Traditional vegetarian cooking in Devmali',
    caption: 'Preparing traditional vegetarian meals with local ingredients',
    category: 'daily-life',
    width: 700,
    height: 500,
  },
  {
    id: 'festival-celebration',
    src: '/images/traditions/festival-celebration.jpg',
    alt: 'Festival celebration in Devmali',
    caption: 'Colorful festival celebration bringing the community together',
    category: 'festivals',
    width: 600,
    height: 800,
    featured: true,
  },
  {
    id: 'daily-prayers',
    src: '/images/traditions/daily-prayers.jpg',
    alt: 'Daily prayer rituals in Devmali',
    caption: 'Morning prayers at the village temple',
    category: 'traditions',
    width: 500,
    height: 700,
  },
];

const coreTraditons = [
  {
    title: 'Pure Vegetarian Lifestyle',
    description: 'The entire village follows a strict vegetarian diet, reflecting deep spiritual values and respect for all life forms.',
    practices: [
      'No meat, fish, or eggs consumed by any villager',
      'Locally grown organic vegetables and grains',
      'Traditional cooking methods preserving nutritional value',
      'Community sharing of meals during festivals'
    ],
    significance: 'This practice reflects the village\'s commitment to ahimsa (non-violence) and spiritual purity, creating a harmonious relationship with nature.',
    icon: '🌱'
  },
  {
    title: 'Community Decision Making',
    description: 'Important village decisions are made collectively through traditional panchayat system, ensuring everyone\'s voice is heard.',
    practices: [
      'Regular village assemblies for important decisions',
      'Consensus-based decision making process',
      'Respect for elder wisdom and guidance',
      'Collective responsibility for community welfare'
    ],
    significance: 'This democratic tradition has maintained social harmony and ensured that development benefits the entire community.',
    icon: '🤝'
  },
  {
    title: 'Spiritual Daily Routine',
    description: 'Daily life is structured around spiritual practices, with morning and evening prayers being central to village rhythm.',
    practices: [
      'Community morning prayers at sunrise',
      'Evening aarti at the village temple',
      'Regular recitation of devotional songs',
      'Meditation and spiritual study groups'
    ],
    significance: 'These practices maintain the spiritual foundation of the village and strengthen community bonds through shared devotion.',
    icon: '🕉️'
  },
  {
    title: 'Seasonal Festivals',
    description: 'Traditional festivals mark the agricultural and spiritual calendar, celebrating the cycles of nature and devotion.',
    practices: [
      'Lord Devnarayan festival as the main celebration',
      'Harvest festivals celebrating agricultural abundance',
      'Seasonal celebrations aligned with natural cycles',
      'Community preparation and participation in all festivals'
    ],
    significance: 'Festivals maintain cultural continuity and provide opportunities for the community to come together in celebration and gratitude.',
    icon: '🎉'
  }
];

export default function TraditionsPage() {
  return (
    <div className="min-h-screen bg-secondary-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-maroon to-primary-golden py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            Living Traditions of Devmali
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Experience the vibrant traditions that have shaped daily life in Devmali for over 
            1000 years, from spiritual practices to community celebrations.
          </p>
        </div>
      </div>

      {/* Core Traditions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Four Pillars of Our Traditions
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              These core traditions form the foundation of life in Devmali, 
              creating a harmonious community rooted in spiritual values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreTraditons.map((tradition) => (
              <Card key={tradition.title} variant="cultural" className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{tradition.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-charcoal mb-2 font-playfair">
                      {tradition.title}
                    </h3>
                  </div>
                </div>
                <p className="text-secondary-charcoal/80 mb-4 leading-relaxed">
                  {tradition.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-medium text-secondary-charcoal mb-2">Key Practices:</h4>
                  <ul className="space-y-1">
                    {tradition.practices.map((practice, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-secondary-charcoal/70">
                        <div className="w-1.5 h-1.5 bg-primary-saffron rounded-full mt-2 flex-shrink-0"></div>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-l-4 border-primary-golden pl-4">
                  <p className="text-sm text-secondary-charcoal/70 italic">
                    <strong>Significance:</strong> {tradition.significance}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Traditions Gallery */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Traditions in Practice
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              Witness the beauty of living traditions through moments captured 
              from daily life, festivals, and community gatherings.
            </p>
          </div>

          <CulturalHeritageGallery
            images={traditionImages}
            showFilters={true}
            enableLazyLoading={true}
            columns={3}
            className="mb-8"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-golden to-primary-saffron">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-playfair">
            Experience Living Traditions
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            Come and witness these beautiful traditions firsthand. Join us for festivals, 
            participate in community activities, and experience the warmth of our 
            traditional hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/visit"
              className="px-8 py-3 bg-white text-primary-saffron font-semibold rounded-cultural hover:bg-secondary-cream transition-colors shadow-cultural"
            >
              Plan Your Visit
            </a>
            <a
              href="/spiritual"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-cultural hover:bg-white hover:text-primary-saffron transition-colors"
            >
              Explore Spiritual Content
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}