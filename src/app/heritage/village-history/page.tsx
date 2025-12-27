import { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: '1100 Years of Village History - Devmali Heritage',
  description: 'Discover the remarkable 1100-year journey of Devmali village, from its ancient origins to its recognition as India\'s Best Tourist Village.',
  keywords: 'Devmali history, village heritage, 1100 years, ancient village, Rajasthan history',
};

const timelineEvents = [
  {
    year: '900 CE',
    title: 'Foundation of Devmali',
    description: 'The village was established around 900 CE, with the first settlements built around the sacred site dedicated to Lord Devnarayan.',
    significance: 'Marks the beginning of continuous habitation and spiritual practice in the region.'
  },
  {
    year: '1200 CE',
    title: 'Temple Construction',
    description: 'The main temple complex was constructed, becoming the spiritual heart of the village and surrounding region.',
    significance: 'Established Devmali as a significant pilgrimage destination in Rajasthan.'
  },
  {
    year: '1400 CE',
    title: 'Community Traditions',
    description: 'The vegetarian lifestyle and community governance systems were formally established, creating the social fabric that exists today.',
    significance: 'Laid the foundation for the unique cultural identity that defines Devmali.'
  },
  {
    year: '1600 CE',
    title: 'Architectural Heritage',
    description: 'The distinctive mud house architecture reached its refined form, perfectly adapted to the Aravalli climate and landscape.',
    significance: 'Created the architectural heritage that makes Devmali visually distinctive.'
  },
  {
    year: '1800 CE',
    title: 'Cultural Preservation',
    description: 'Despite external influences, the village maintained its traditional practices and spiritual devotion through challenging times.',
    significance: 'Demonstrated the resilience of community values and cultural preservation.'
  },
  {
    year: '2023 CE',
    title: 'National Recognition',
    description: 'Devmali was honored as India\'s Best Tourist Village, recognizing its successful preservation of heritage while embracing sustainable tourism.',
    significance: 'Validates centuries of cultural preservation and community dedication.'
  }
];

const culturalAspects = [
  {
    title: 'Spiritual Foundation',
    description: 'The village was built around devotion to Lord Devnarayan, with every aspect of daily life reflecting spiritual values and community harmony.',
    icon: '🕉️'
  },
  {
    title: 'Architectural Wisdom',
    description: 'Traditional mud house construction techniques developed over centuries, creating homes that are both beautiful and perfectly suited to the local climate.',
    icon: '🏘️'
  },
  {
    title: 'Community Bonds',
    description: 'Strong social structures and collective decision-making have preserved the village\'s unity and cultural identity through generations.',
    icon: '🤝'
  },
  {
    title: 'Environmental Harmony',
    description: 'Living practices that work in harmony with the Aravalli landscape, demonstrating sustainable lifestyle choices made centuries ago.',
    icon: '🌿'
  }
];

export default function VillageHistoryPage() {
  return (
    <div className="min-h-screen bg-secondary-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-maroon to-primary-saffron py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            1100 Years of Sacred Heritage
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Journey through eleven centuries of continuous cultural preservation, 
            spiritual devotion, and community resilience in the heart of Rajasthan.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-secondary-charcoal mb-6 font-playfair">
                A Living Testament to Time
              </h2>
              <p className="text-secondary-charcoal/80 text-lg leading-relaxed mb-6">
                Devmali village stands as a remarkable example of cultural continuity, where ancient 
                traditions have been preserved and practiced for over eleven centuries. This is not 
                merely a historical site, but a living community that has maintained its spiritual 
                essence while adapting to the modern world.
              </p>
              <p className="text-secondary-charcoal/80 text-lg leading-relaxed">
                From its humble beginnings as a spiritual settlement to its recent recognition as 
                India's Best Tourist Village, Devmali's journey reflects the power of community 
                dedication and cultural preservation.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-saffron/20 to-primary-golden/20 rounded-cultural flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-primary-saffron/20 rounded-cultural flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-secondary-charcoal/60">Historical Village</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Historical Timeline
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              Trace the remarkable journey of Devmali through the centuries, from its spiritual 
              founding to its modern recognition as a model heritage village.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-saffron h-full hidden lg:block"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={event.year} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="flex-1">
                    <Card variant="cultural" className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="px-3 py-1 bg-primary-saffron text-white text-sm font-bold rounded-cultural">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-semibold text-secondary-charcoal font-playfair">
                          {event.title}
                        </h3>
                      </div>
                      <p className="text-secondary-charcoal/80 mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="border-l-4 border-primary-golden pl-4">
                        <p className="text-sm text-secondary-charcoal/70 italic">
                          <strong>Significance:</strong> {event.significance}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:block w-4 h-4 bg-primary-saffron rounded-full border-4 border-white shadow-cultural z-10"></div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Aspects */}
      <section className="py-16 px-4 bg-secondary-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Pillars of Cultural Heritage
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              The enduring elements that have shaped Devmali's identity and enabled its 
              cultural preservation across eleven centuries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalAspects.map((aspect) => (
              <Card key={aspect.title} variant="spiritual" className="p-6 text-center">
                <div className="text-4xl mb-4">{aspect.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-charcoal mb-4 font-playfair">
                  {aspect.title}
                </h3>
                <p className="text-secondary-charcoal/80 leading-relaxed">
                  {aspect.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Recognition */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-golden to-primary-saffron">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-playfair">
            India's Best Tourist Village 2023
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            After 1100 years of cultural preservation, Devmali's dedication has been recognized 
            at the national level. This honor validates not just our heritage, but our commitment 
            to sharing it responsibly with the world while maintaining its authentic essence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/heritage"
              className="px-8 py-3 bg-white text-primary-saffron font-semibold rounded-cultural hover:bg-secondary-cream transition-colors shadow-cultural"
            >
              Explore More Heritage
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