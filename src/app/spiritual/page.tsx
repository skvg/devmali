import { Metadata } from 'next';
import Link from 'next/link';
import { loadSpiritualContent } from '@/lib/content';
import { SpiritualContent } from '@/types';
import DevotionalContentHub from '@/components/ui/DevotionalContentHub';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Spiritual & Devotional Content - Devmali Heritage',
  description: 'Explore the spiritual teachings of Lord Devnarayan, daily prayers, and devotional practices from Devmali village.',
  keywords: 'Lord Devnarayan, spiritual content, prayers, devotional practices, Rajasthani spirituality',
};

export default async function SpiritualPage() {
  const spiritualContent = await loadSpiritualContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-800 mb-4">
            Spiritual Journey
          </h1>
          <p className="text-xl text-orange-700 max-w-3xl mx-auto">
            Discover the divine teachings of Lord Devnarayan and immerse yourself in the spiritual traditions of Devmali village
          </p>
        </div>

        {/* Devotional Content Hub */}
        <DevotionalContentHub content={spiritualContent} />

        {/* Virtual Darshan Call-to-Action */}
        <div className="text-center mt-12">
          <Card className="p-8 bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              🕉️ Experience Virtual Darshan
            </h2>
            <p className="text-orange-700 mb-6 max-w-2xl mx-auto">
              Immerse yourself in the divine presence of Lord Devnarayan through our high-resolution virtual darshan experience. 
              View sacred temple imagery, listen to spiritual ambiance, and submit your prayers from anywhere in the world.
            </p>
            <Link href="/spiritual/darshan">
              <Button
                variant="primary"
                size="lg"
                className="px-8 py-4 text-lg"
              >
                🙏 Begin Virtual Darshan
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}