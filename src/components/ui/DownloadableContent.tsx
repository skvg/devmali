'use client';

import React, { useState } from 'react';
import { SpiritualContent, Language } from '@/types';
import { Card } from './Card';
import { Button } from './Button';

interface DownloadableContentProps {
  content: SpiritualContent[];
  language: Language;
}

interface DownloadItem {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  type: 'pdf' | 'audio' | 'text' | 'image';
  url: string;
  size: string;
  category: 'prayers' | 'mantras' | 'teachings' | 'stories' | 'calendars';
}

const DownloadableContent: React.FC<DownloadableContentProps> = ({ content, language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Generate downloadable items from spiritual content
  const downloadItems: DownloadItem[] = [
    // From spiritual content with download URLs
    ...content
      .filter(item => item.downloadUrl)
      .map(item => ({
        id: item.id,
        title: item.title,
        description: {
          en: `Download ${item.type} content: ${item.title.en}`,
          hi: `${item.type} सामग्री डाउनलोड करें: ${item.title.hi}`,
          raj: `${item.type} सामग्री डाउनलोड करो: ${item.title.raj}`
        },
        type: 'pdf' as const,
        url: item.downloadUrl!,
        size: '2.5 MB',
        category: item.type === 'prayer' ? 'prayers' as const : 
                 item.type === 'mantra' ? 'mantras' as const :
                 item.type === 'teaching' ? 'teachings' as const : 'stories' as const
      })),
    
    // Additional downloadable resources
    {
      id: 'complete-prayer-book',
      title: {
        en: 'Complete Prayer Book',
        hi: 'संपूर्ण प्रार्थना पुस्तक',
        raj: 'संपूर्ण प्रार्थना पुस्तक'
      },
      description: {
        en: 'Comprehensive collection of all daily prayers, mantras, and devotional practices',
        hi: 'सभी दैनिक प्रार्थनाओं, मंत्रों और भक्ति प्रथाओं का व्यापक संग्रह',
        raj: 'सभी दैनिक प्रार्थनावां, मंत्रां अर भक्ति प्रथावां रो व्यापक संग्रह'
      },
      type: 'pdf',
      url: '/downloads/complete-prayer-book.pdf',
      size: '15.2 MB',
      category: 'prayers'
    },
    {
      id: 'festival-calendar-2024',
      title: {
        en: 'Festival Calendar 2024',
        hi: 'त्योहार कैलेंडर 2024',
        raj: 'त्योहार कैलेंडर 2024'
      },
      description: {
        en: 'Complete calendar with all festival dates, rituals, and cultural significance',
        hi: 'सभी त्योहार तिथियों, अनुष्ठानों और सांस्कृतिक महत्व के साथ पूर्ण कैलेंडर',
        raj: 'सभी त्योहार तिथियां, अनुष्ठान अर सांस्कृतिक महत्व सूं पूर्ण कैलेंडर'
      },
      type: 'pdf',
      url: '/downloads/festival-calendar-2024.pdf',
      size: '8.7 MB',
      category: 'calendars'
    },
    {
      id: 'devnarayan-teachings',
      title: {
        en: 'Lord Devnarayan Teachings',
        hi: 'भगवान देवनारायण की शिक्षाएं',
        raj: 'भगवान देवनारायण री शिक्षावां'
      },
      description: {
        en: 'Collection of spiritual teachings and wisdom from Lord Devnarayan',
        hi: 'भगवान देवनारायण से आध्यात्मिक शिक्षाओं और ज्ञान का संग्रह',
        raj: 'भगवान देवनारायण सूं आध्यात्मिक शिक्षावां अर ज्ञान रो संग्रह'
      },
      type: 'pdf',
      url: '/downloads/devnarayan-teachings.pdf',
      size: '12.4 MB',
      category: 'teachings'
    },
    {
      id: 'sacred-mantras-audio',
      title: {
        en: 'Sacred Mantras Audio Collection',
        hi: 'पवित्र मंत्र ऑडियो संग्रह',
        raj: 'पवित्र मंत्र ऑडियो संग्रह'
      },
      description: {
        en: 'High-quality audio recordings of sacred mantras with proper pronunciation',
        hi: 'सही उच्चारण के साथ पवित्र मंत्रों की उच्च गुणवत्ता वाली ऑडियो रिकॉर्डिंग',
        raj: 'सही उच्चारण सूं पवित्र मंत्रां री उच्च गुणवत्ता वाळी ऑडियो रिकॉर्डिंग'
      },
      type: 'audio',
      url: '/downloads/sacred-mantras-collection.zip',
      size: '45.8 MB',
      category: 'mantras'
    },
    {
      id: 'village-stories',
      title: {
        en: 'Sacred Stories of Devmali',
        hi: 'देवमाली की पवित्र कहानियां',
        raj: 'देवमाली री पवित्र कहानियां'
      },
      description: {
        en: 'Traditional stories and legends from Devmali village heritage',
        hi: 'देवमाली गांव की विरासत से पारंपरिक कहानियां और किंवदंतियां',
        raj: 'देवमाली गांव री विरासत सूं पारंपरिक कहानियां अर किंवदंतियां'
      },
      type: 'pdf',
      url: '/downloads/village-stories.pdf',
      size: '9.3 MB',
      category: 'stories'
    }
  ];

  const categories = [
    { id: 'all', label: { en: 'All Downloads', hi: 'सभी डाउनलोड', raj: 'सभी डाउनलोड' } },
    { id: 'prayers', label: { en: 'Prayers', hi: 'प्रार्थनाएं', raj: 'प्रार्थनावां' } },
    { id: 'mantras', label: { en: 'Mantras', hi: 'मंत्र', raj: 'मंत्र' } },
    { id: 'teachings', label: { en: 'Teachings', hi: 'शिक्षाएं', raj: 'शिक्षावां' } },
    { id: 'stories', label: { en: 'Stories', hi: 'कहानियां', raj: 'कहानियां' } },
    { id: 'calendars', label: { en: 'Calendars', hi: 'कैलेंडर', raj: 'कैलेंडर' } }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? downloadItems 
    : downloadItems.filter(item => item.category === selectedCategory);

  const getFileTypeIcon = (type: DownloadItem['type']) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'audio': return '🎵';
      case 'text': return '📝';
      case 'image': return '🖼️';
      default: return '📁';
    }
  };

  const getFileTypeColor = (type: DownloadItem['type']) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800 border-red-200';
      case 'audio': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'text': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'image': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDownload = (item: DownloadItem) => {
    // In a real application, this would handle the actual download
    // For now, we'll just open the URL
    window.open(item.url, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label[language]}
          </Button>
        ))}
      </div>

      {/* Download Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* File Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getFileTypeIcon(item.type)}</span>
                <div>
                  <h3 className="font-semibold text-orange-700 text-sm">
                    {item.title[language]}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getFileTypeColor(item.type)}`}>
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{item.size}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {item.description[language]}
            </p>

            {/* Download Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleDownload(item)}
              className="w-full flex items-center justify-center gap-2"
            >
              <span>⬇️</span>
              <span>
                {language === 'en' ? 'Download' : 
                 language === 'hi' ? 'डाउनलोड करें' : 'डाउनलोड करो'}
              </span>
            </Button>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {language === 'en' ? 'No downloads available in this category' :
             language === 'hi' ? 'इस श्रेणी में कोई डाउनलोड उपलब्ध नहीं है' :
             'इस श्रेणी में कोई डाउनलोड उपलब्ध कोनी है'}
          </p>
        </div>
      )}

      {/* Usage Guidelines */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-orange-700 mb-3">
            📖 Usage Guidelines
          </h3>
          <div className="text-sm text-gray-700 space-y-2 max-w-3xl mx-auto">
            <p>
              {language === 'en' ? 
                'These spiritual resources are provided for personal devotional use and educational purposes. Please use them with respect and reverence.' :
                language === 'hi' ?
                'ये आध्यात्मिक संसाधन व्यक्तिगत भक्ति उपयोग और शैक्षिक उद्देश्यों के लिए प्रदान किए गए हैं। कृपया इन्हें सम्मान और श्रद्धा के साथ उपयोग करें।' :
                'ये आध्यात्मिक संसाधन व्यक्तिगत भक्ति उपयोग अर शैक्षिक उद्देश्यां खातर प्रदान करे गए हैं। कृपया इनका सम्मान अर श्रद्धा सूं उपयोग करो।'
              }
            </p>
            <p className="text-xs text-gray-500">
              {language === 'en' ? 
                'For commercial use or distribution, please contact the village authorities.' :
                language === 'hi' ?
                'व्यावसायिक उपयोग या वितरण के लिए, कृपया गांव के अधिकारियों से संपर्क करें।' :
                'व्यावसायिक उपयोग या वितरण खातर, कृपया गांव रै अधिकारियां सूं संपर्क करो।'
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DownloadableContent;