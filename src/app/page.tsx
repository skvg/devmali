import { Layout } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-secondary-cream to-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 rajasthani-pattern opacity-80"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-primary-maroon mb-6">
              Welcome to Devmali
            </h1>
            <p className="text-xl md:text-2xl text-secondary-charcoal mb-8 leading-relaxed">
              Discover the rich cultural heritage of India's Best Tourist Village
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="rounded-full">
                Explore Heritage
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Virtual Tour
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Overview Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-maroon mb-4">
                1100 Years of Living Heritage
              </h2>
              <p className="text-lg text-secondary-charcoal max-w-2xl mx-auto">
                Experience the timeless traditions, spiritual significance, and architectural marvels 
                of Devmali village, nestled in the beautiful Aravalli hills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card variant="cultural" className="text-center hover:shadow-spiritual transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🏛️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-maroon mb-2">Cultural Heritage</h3>
                  <p className="text-secondary-charcoal">
                    Explore ancient traditions, mud house architecture, and community values preserved for centuries.
                  </p>
                </CardContent>
              </Card>

              <Card variant="spiritual" className="text-center hover:shadow-golden transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary-golden rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🙏</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-maroon mb-2">Spiritual Journey</h3>
                  <p className="text-secondary-charcoal">
                    Connect with Lord Devnarayan's teachings and experience the village's spiritual essence.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center hover:shadow-earth transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-secondary-sage rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🌄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-maroon mb-2">Natural Beauty</h3>
                  <p className="text-secondary-charcoal">
                    Discover the stunning Aravalli landscape and the village's harmony with nature.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
