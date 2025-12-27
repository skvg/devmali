import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { CulturalHeritageGallery, CulturalImage } from '@/components/ui/CulturalHeritageGallery';

export const metadata: Metadata = {
  title: 'Sacred Mud House Architecture - Devmali Heritage',
  description: 'Discover the significance and beauty of Devmali\'s traditional mud house architecture, perfectly adapted to the Aravalli landscape.',
  keywords: 'mud house architecture, traditional building, Rajasthani architecture, sustainable construction, Devmali buildings',
};

const architecturalImages: CulturalImage[] = [
  {
    id: 'mud-house-exterior',
    src: '/images/architecture/mud-house-exterior.jpg',
    alt: 'Traditional mud house exterior in Devmali',
    caption: 'Classic mud house exterior showcasing traditional Rajasthani design',
    category: 'architecture',
    width: 800,
    height: 600,
    featured: true,
  },
  {
    id: 'mud-house-interior',
    src: '/images/architecture/mud-house-interior.jpg',
    alt: 'Interior of traditional mud house',
    caption: 'Cool and comfortable interior spaces designed for desert climate',
    category: 'architecture',
    width: 700,
    height: 500,
  },
  {
    id: 'construction-technique',
    src: '/images/architecture/construction-process.jpg',
    alt: 'Traditional mud house construction technique',
    caption: 'Ancient construction techniques passed down through generations',
    category: 'architecture',
    width: 600,
    height: 800,
  },
  {
    id: 'temple-architecture',
    src: '/images/architecture/temple-details.jpg',
    alt: 'Temple architectural details',
    caption: 'Intricate temple architecture reflecting spiritual devotion',
    category: 'architecture',
    width: 500,
    height: 700,
    featured: true,
  },
];

const architecturalFeatures = [
  {
    title: 'Climate Adaptation',
    description: 'Thick mud walls provide excellent insulation, keeping interiors cool in summer and warm in winter, perfectly suited to the Aravalli climate.',
    benefits: ['Natural temperature regulation', 'Energy efficient', 'Comfortable year-round living'],
    icon: '🌡️'
  },
  {
    title: 'Sustainable Materials',
    description: 'Built entirely from local materials - mud, straw, and wood - creating structures that are both environmentally friendly and culturally authentic.',
    benefits: ['Zero carbon footprint', 'Locally sourced materials', 'Biodegradable construction'],
    icon: '🌱'
  },
  {
    title: 'Structural Integrity',
    description: 'Despite their organic materials, these structures have stood for centuries, demonstrating remarkable durability and engineering wisdom.',
    benefits: ['Earthquake resistant', 'Long-lasting construction', 'Low maintenance requirements'],
    icon: '🏗️'
  },
  {
    title: 'Aesthetic Harmony',
    description: 'The natural earth tones and organic shapes create buildings that blend seamlessly with the landscape, enhancing rather than disrupting the natural beauty.',
    benefits: ['Landscape integration', 'Natural beauty', 'Cultural authenticity'],
    icon: '🎨'
  }
];

const constructionSteps = [
  {
    step: 1,
    title: 'Foundation Preparation',
    description: 'Stone foundations are laid to protect the mud walls from ground moisture and provide structural stability.',
    materials: ['Local stone', 'Sand', 'Lime mortar']
  },
  {
    step: 2,
    title: 'Wall Construction',
    description: 'Mud mixed with straw and water is shaped into bricks or applied directly to create thick, insulating walls.',
    materials: ['Clay-rich mud', 'Wheat straw', 'Water', 'Natural binding agents']
  },
  {
    step: 3,
    title: 'Roof Structure',
    description: 'Wooden beams support a roof of mud and straw, creating excellent insulation and weather protection.',
    materials: ['Local timber', 'Bamboo', 'Mud plaster', 'Straw thatch']
  },
  {
    step: 4,
    title: 'Finishing Touches',
    description: 'Walls are plastered with fine mud and decorated with traditional patterns, creating both beauty and protection.',
    materials: ['Fine clay', 'Natural pigments', 'Cow dung (for binding)', 'Decorative elements']
  }
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-secondary-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-earth to-primary-saffron py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            Sacred Mud House Architecture
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Discover the wisdom of traditional construction that has created beautiful, 
            sustainable homes perfectly adapted to the Aravalli landscape for over 1000 years.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-secondary-charcoal mb-6 font-playfair">
                Architecture in Harmony with Nature
              </h2>
              <p className="text-secondary-charcoal/80 text-lg leading-relaxed mb-6">
                The mud house architecture of Devmali represents centuries of refined building 
                techniques that create structures perfectly suited to their environment. These 
                homes are not just shelters, but expressions of a deep understanding of climate, 
                materials, and sustainable living.
              </p>
              <p className="text-secondary-charcoal/80 text-lg leading-relaxed">
                Every element, from the thick walls to the sloped roofs, serves both practical 
                and aesthetic purposes, creating homes that are beautiful, comfortable, and 
                environmentally responsible.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-earth/20 to-primary-golden/20 rounded-cultural flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-primary-earth/20 rounded-cultural flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary-earth" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <p className="text-secondary-charcoal/60">Traditional Architecture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Architectural Wisdom
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              Each aspect of mud house design reflects centuries of accumulated knowledge 
              about creating comfortable, sustainable, and beautiful living spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {architecturalFeatures.map((feature) => (
              <Card key={feature.title} variant="cultural" className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-charcoal mb-2 font-playfair">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-secondary-charcoal/80 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-secondary-charcoal">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-secondary-charcoal/70">
                        <div className="w-1.5 h-1.5 bg-primary-saffron rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Process */}
      <section className="py-16 px-4 bg-secondary-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Traditional Construction Process
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              The time-honored process of building mud houses, passed down through generations 
              of skilled craftsmen and community builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {constructionSteps.map((step) => (
              <Card key={step.step} variant="spiritual" className="p-6 text-center">
                <div className="w-12 h-12 bg-primary-saffron text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-secondary-charcoal mb-3 font-playfair">
                  {step.title}
                </h3>
                <p className="text-secondary-charcoal/80 text-sm mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="border-t border-secondary-charcoal/20 pt-4">
                  <h4 className="font-medium text-secondary-charcoal text-sm mb-2">Materials:</h4>
                  <ul className="space-y-1">
                    {step.materials.map((material, index) => (
                      <li key={index} className="text-xs text-secondary-charcoal/70">
                        • {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Gallery */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-charcoal mb-4 font-playfair">
              Architectural Heritage Gallery
            </h2>
            <p className="text-secondary-charcoal/80 text-lg max-w-3xl mx-auto">
              Explore the beauty and functionality of Devmali's traditional architecture 
              through detailed photographs and documentation.
            </p>
          </div>

          <CulturalHeritageGallery
            images={architecturalImages}
            showFilters={false}
            enableLazyLoading={true}
            columns={3}
            className="mb-8"
          />
        </div>
      </section>

      {/* Sustainability Message */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-earth to-primary-golden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-playfair">
            Ancient Wisdom for Modern Times
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            In an era of environmental consciousness, Devmali's mud house architecture offers 
            timeless lessons in sustainable construction. These buildings prove that beauty, 
            comfort, and environmental responsibility can coexist harmoniously.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/virtual-tour"
              className="px-8 py-3 bg-white text-primary-earth font-semibold rounded-cultural hover:bg-secondary-cream transition-colors shadow-cultural"
            >
              Virtual Architecture Tour
            </a>
            <a
              href="/heritage"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-cultural hover:bg-white hover:text-primary-earth transition-colors"
            >
              Explore More Heritage
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}