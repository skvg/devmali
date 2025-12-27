'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import HighResolutionImageViewer from './HighResolutionImageViewer';
import SpiritualAmbiancePlayer from './SpiritualAmbiancePlayer';
import PrayerRequestForm from './PrayerRequestForm';
import SpiritualGuidanceForm from './SpiritualGuidanceForm';

interface DarshanImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  significance: string;
  mantra?: string;
}

const VirtualDarshanExperience: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<DarshanImage | null>(null);
  const [activeTab, setActiveTab] = useState<'darshan' | 'prayer' | 'guidance'>('darshan');
  const [isAmbiancePlaying, setIsAmbiancePlaying] = useState(false);

  // Sample darshan images - in a real app, these would come from a CMS
  const darshanImages: DarshanImage[] = [
    {
      id: 'main-deity',
      title: 'Lord Devnarayan Main Deity',
      description: 'The magnificent main deity of Lord Devnarayan in all his divine glory',
      imageUrl: '/images/darshan/main-deity-hd.jpg',
      thumbnailUrl: '/images/darshan/main-deity-thumb.jpg',
      significance: 'The central focus of devotion, representing the divine presence of Lord Devnarayan',
      mantra: 'ॐ देवनारायण नमः'
    },
    {
      id: 'temple-sanctum',
      title: 'Sacred Sanctum Sanctorum',
      description: 'The holy inner sanctum where the divine energy is most concentrated',
      imageUrl: '/images/darshan/sanctum-hd.jpg',
      thumbnailUrl: '/images/darshan/sanctum-thumb.jpg',
      significance: 'The most sacred space where devotees experience the closest connection to the divine',
      mantra: 'ॐ श्रीं देवनारायणाय नमः'
    },
    {
      id: 'temple-entrance',
      title: 'Temple Entrance Gateway',
      description: 'The ornate entrance that welcomes devotees into the sacred space',
      imageUrl: '/images/darshan/entrance-hd.jpg',
      thumbnailUrl: '/images/darshan/entrance-thumb.jpg',
      significance: 'The threshold between the material and spiritual worlds',
      mantra: 'ॐ गं गणपतये नमः'
    },
    {
      id: 'prayer-hall',
      title: 'Main Prayer Hall',
      description: 'The spacious hall where devotees gather for collective worship',
      imageUrl: '/images/darshan/prayer-hall-hd.jpg',
      thumbnailUrl: '/images/darshan/prayer-hall-thumb.jpg',
      significance: 'A space for community worship and spiritual gathering',
      mantra: 'ॐ सर्वे भवन्तु सुखिनः'
    },
    {
      id: 'altar-decorations',
      title: 'Festival Decorations',
      description: 'The altar beautifully decorated during special festivals',
      imageUrl: '/images/darshan/decorations-hd.jpg',
      thumbnailUrl: '/images/darshan/decorations-thumb.jpg',
      significance: 'Represents the joy and celebration of divine festivals',
      mantra: 'ॐ आनन्दाय नमः'
    },
    {
      id: 'evening-aarti',
      title: 'Evening Aarti Scene',
      description: 'The divine atmosphere during the evening aarti ceremony',
      imageUrl: '/images/darshan/aarti-hd.jpg',
      thumbnailUrl: '/images/darshan/aarti-thumb.jpg',
      significance: 'The daily ritual that connects devotees with divine light',
      mantra: 'ॐ ज्योतिर्मयाय नमः'
    }
  ];

  const tabs = [
    { id: 'darshan', label: 'Virtual Darshan', icon: '🕉️' },
    { id: 'prayer', label: 'Prayer Request', icon: '🙏' },
    { id: 'guidance', label: 'Spiritual Guidance', icon: '📿' },
  ] as const;

  const handleImageSelect = (image: DarshanImage) => {
    setSelectedImage(image);
  };

  const handleCloseViewer = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Spiritual Ambiance Player */}
      <div className="text-center">
        <SpiritualAmbiancePlayer 
          isPlaying={isAmbiancePlaying}
          onToggle={setIsAmbiancePlaying}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-6 py-3"
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      {activeTab === 'darshan' && (
        <div className="space-y-8">
          {/* Instructions */}
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-orange-700 mb-3">
                🙏 How to Experience Virtual Darshan
              </h3>
              <div className="text-sm text-gray-700 space-y-2 max-w-3xl mx-auto">
                <p>1. Click on any image below to view in high resolution</p>
                <p>2. Enable spiritual ambiance for a complete experience</p>
                <p>3. Chant the associated mantra while viewing each image</p>
                <p>4. Offer your prayers with sincere devotion</p>
                <p>5. Take time to meditate on the divine presence</p>
              </div>
            </div>
          </Card>

          {/* Darshan Image Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {darshanImages.map((image) => (
              <Card 
                key={image.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleImageSelect(image)}
              >
                <div className="relative">
                  <img
                    src={image.thumbnailUrl}
                    alt={image.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to a placeholder image
                      (e.target as HTMLImageElement).src = '/images/placeholder-temple.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium">Click to view in high resolution</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-orange-700 mb-2">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {image.description}
                  </p>
                  
                  {image.mantra && (
                    <div className="bg-orange-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-orange-600 font-medium mb-1">Sacred Mantra:</p>
                      <p className="text-sm text-orange-800 font-medium text-center">
                        {image.mantra}
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500">
                      <strong>Significance:</strong> {image.significance}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Devotional Guidelines */}
          <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-orange-700 mb-4">
                📿 Devotional Guidelines
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium text-orange-600 mb-2">Before Darshan:</h4>
                  <ul className="space-y-1 text-left">
                    <li>• Wash your hands and face</li>
                    <li>• Light a diya or incense if available</li>
                    <li>• Sit facing east if possible</li>
                    <li>• Clear your mind of worldly thoughts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-600 mb-2">During Darshan:</h4>
                  <ul className="space-y-1 text-left">
                    <li>• Maintain respectful silence</li>
                    <li>• Focus on the divine form</li>
                    <li>• Chant mantras with devotion</li>
                    <li>• Offer mental prayers and gratitude</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'prayer' && (
        <div>
          <h2 className="text-3xl font-bold text-orange-800 text-center mb-8">
            🙏 Submit Your Prayer Request
          </h2>
          <PrayerRequestForm />
        </div>
      )}

      {activeTab === 'guidance' && (
        <div>
          <h2 className="text-3xl font-bold text-orange-800 text-center mb-8">
            📿 Seek Spiritual Guidance
          </h2>
          <SpiritualGuidanceForm />
        </div>
      )}

      {/* High Resolution Image Viewer Modal */}
      {selectedImage && (
        <HighResolutionImageViewer
          image={selectedImage}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
};

export default VirtualDarshanExperience;