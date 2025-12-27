import { Metadata } from 'next';
import VirtualDarshanExperience from '@/components/ui/VirtualDarshanExperience';

export const metadata: Metadata = {
  title: 'Virtual Darshan - Lord Devnarayan Temple | Devmali Heritage',
  description: 'Experience the divine presence of Lord Devnarayan through our immersive virtual darshan. High-resolution imagery and spiritual ambiance for devotees worldwide.',
  keywords: 'virtual darshan, Lord Devnarayan, temple, spiritual experience, online worship, devotion',
};

export default function VirtualDarshanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-800 mb-4">
            🕉️ Virtual Darshan
          </h1>
          <p className="text-xl text-orange-700 max-w-3xl mx-auto mb-6">
            Experience the divine presence of Lord Devnarayan from anywhere in the world. 
            Immerse yourself in the sacred atmosphere of our ancient temple.
          </p>
          <div className="bg-white rounded-lg shadow-md p-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-600 italic">
              "भगवान के दर्शन से मन को शांति मिलती है और आत्मा को सुकून मिलता है"
            </p>
            <p className="text-xs text-gray-500 mt-1">
              "Divine darshan brings peace to the mind and solace to the soul"
            </p>
          </div>
        </div>

        {/* Virtual Darshan Experience */}
        <VirtualDarshanExperience />
      </div>
    </div>
  );
}