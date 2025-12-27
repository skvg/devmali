'use client';

import { Layout } from '@/components/layout';
import { 
  HeroSection, 
  OverviewSection, 
  FeaturedContentCards, 
  TestimonialCarousel 
} from '@/components/ui';

export default function Home() {
  // Sample data for featured content
  const featuredContents = [
    {
      id: 'heritage-1',
      title: 'Cultural Heritage',
      description: 'Explore ancient traditions, mud house architecture, and community values preserved for centuries in this living museum of Rajasthani culture.',
      icon: '🏛️',
      category: 'heritage' as const,
      image: '/images/heritage-bg.jpg',
      link: '/heritage'
    },
    {
      id: 'spiritual-1',
      title: 'Spiritual Journey',
      description: 'Connect with Lord Devnarayan\'s teachings and experience the village\'s spiritual essence through prayers, festivals, and sacred traditions.',
      icon: '🙏',
      category: 'spiritual' as const,
      image: '/images/spiritual-bg.jpg',
      link: '/spiritual'
    },
    {
      id: 'tourism-1',
      title: 'Natural Beauty',
      description: 'Discover the stunning Aravalli landscape and the village\'s harmony with nature in India\'s Best Tourist Village.',
      icon: '🌄',
      category: 'tourism' as const,
      image: '/images/tourism-bg.jpg',
      link: '/tourism'
    }
  ];

  // Sample testimonials data
  const testimonials = [
    {
      id: 'testimonial-1',
      name: 'Priya Sharma',
      location: 'Delhi, India',
      role: 'Cultural Enthusiast',
      content: 'Visiting Devmali was like stepping back in time. The authentic village life, the spiritual atmosphere, and the warm hospitality of the villagers made it an unforgettable experience.',
      rating: 5,
      image: '/images/testimonials/priya.jpg'
    },
    {
      id: 'testimonial-2',
      name: 'James Wilson',
      location: 'London, UK',
      role: 'Travel Blogger',
      content: 'As someone who has traveled extensively across India, Devmali stands out for its genuine preservation of traditions. The virtual tour convinced me to visit, and the reality exceeded all expectations.',
      rating: 5,
      image: '/images/testimonials/james.jpg'
    },
    {
      id: 'testimonial-3',
      name: 'Rajesh Patel',
      location: 'Mumbai, India',
      role: 'Devotee',
      content: 'The spiritual energy of this place is incredible. Lord Devnarayan\'s presence can be felt everywhere. This village has maintained its sacred traditions beautifully.',
      rating: 5,
      image: '/images/testimonials/rajesh.jpg'
    }
  ];

  // Overview section data
  const overviewHighlights = [
    {
      icon: '🏺',
      title: '1100 Years',
      description: 'Of continuous cultural heritage and traditions passed down through generations'
    },
    {
      icon: '🏆',
      title: 'Best Tourist Village',
      description: 'Recognized by the Government of India for exceptional cultural preservation'
    },
    {
      icon: '🌱',
      title: 'Sustainable Living',
      description: 'Traditional mud house architecture and eco-friendly lifestyle practices'
    },
    {
      icon: '🎭',
      title: 'Living Culture',
      description: 'Active festivals, daily rituals, and community traditions still practiced today'
    },
    {
      icon: '🙏',
      title: 'Spiritual Center',
      description: 'Sacred site dedicated to Lord Devnarayan with daily prayers and devotional activities'
    },
    {
      icon: '🌄',
      title: 'Natural Beauty',
      description: 'Nestled in the scenic Aravalli hills with breathtaking landscapes and serenity'
    }
  ];

  const handleVirtualTour = () => {
    // Navigate to virtual tour page
    window.location.href = '/virtual-tour';
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title="Welcome to Devmali"
          subtitle="Discover the rich cultural heritage of India's Best Tourist Village"
          spiritualQuote="धर्म की रक्षा करने वाले देवनारायण की इस पावन भूमि में आपका स्वागत है"
          onVirtualTourClick={handleVirtualTour}
        />

        {/* Overview Section */}
        <OverviewSection
          subtitle="Heritage & Tradition"
          title="1100 Years of Living Heritage"
          description="Experience the timeless traditions, spiritual significance, and architectural marvels of Devmali village, nestled in the beautiful Aravalli hills. This sacred village has been home to Lord Devnarayan's devotees for over eleven centuries, preserving ancient customs while embracing visitors from around the world."
          highlights={overviewHighlights}
          backgroundImage="/images/village-landscape.jpg"
          className="bg-gradient-to-b from-secondary-cream to-white"
        />

        {/* Featured Content Cards */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary-saffron text-sm font-semibold uppercase tracking-wider mb-4 block">
                Explore Devmali
              </span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-maroon mb-6">
                Discover Our Rich Heritage
              </h2>
              <p className="text-lg text-secondary-charcoal max-w-2xl mx-auto">
                Immerse yourself in the diverse aspects of Devmali village - from ancient cultural traditions to spiritual practices and natural beauty.
              </p>
            </div>

            <FeaturedContentCards contents={featuredContents} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary-cream to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary-saffron text-sm font-semibold uppercase tracking-wider mb-4 block">
                Visitor Experiences
              </span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-maroon mb-6">
                What Our Visitors Say
              </h2>
              <p className="text-lg text-secondary-charcoal max-w-2xl mx-auto">
                Hear from travelers, devotees, and cultural enthusiasts who have experienced the magic of Devmali village.
              </p>
            </div>

            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-20 px-4 bg-primary-maroon text-white relative overflow-hidden">
          <div className="absolute inset-0 rajasthani-pattern opacity-10" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Ready to Experience Devmali?
            </h2>
            <p className="text-xl mb-8 text-secondary-cream">
              Plan your visit to this sacred village and immerse yourself in 1100 years of living heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary-golden text-primary-maroon font-semibold rounded-full hover:bg-primary-saffron hover:text-white transition-all duration-300 transform hover:scale-105">
                Plan Your Visit
              </button>
              <button 
                onClick={handleVirtualTour}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary-maroon transition-all duration-300 transform hover:scale-105"
              >
                Take Virtual Tour
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
