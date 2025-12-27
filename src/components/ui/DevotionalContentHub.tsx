'use client';

import React, { useState } from 'react';
import { SpiritualContent, Language } from '@/types';
import { Card } from './Card';
import { Button } from './Button';
import AudioPlayer from './AudioPlayer';
import FestivalCalendar from './FestivalCalendar';
import DownloadableContent from './DownloadableContent';

interface DevotionalContentHubProps {
  content: SpiritualContent[];
}

const DevotionalContentHub: React.FC<DevotionalContentHubProps> = ({ content }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'teachings' | 'prayers' | 'festivals' | 'downloads'>('teachings');

  // Filter content by type
  const teachings = content.filter(item => item.type === 'teaching');
  const prayers = content.filter(item => item.type === 'prayer');
  const mantras = content.filter(item => item.type === 'mantra');
  const stories = content.filter(item => item.type === 'story');

  const tabs = [
    { id: 'teachings', label: 'Lord Devnarayan Teachings', icon: '🕉️' },
    { id: 'prayers', label: 'Daily Prayers', icon: '🙏' },
    { id: 'festivals', label: 'Festival Calendar', icon: '📅' },
    { id: 'downloads', label: 'Spiritual Downloads', icon: '📖' },
  ] as const;

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'raj', label: 'राजस्थानी' },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Language Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={selectedLanguage === lang.code ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedLanguage(lang.code as Language)}
              className="min-w-[100px]"
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
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

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Lord Devnarayan Teachings */}
        {activeTab === 'teachings' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-orange-800 text-center mb-8">
              Lord Devnarayan Teachings & Stories
            </h2>
            
            {/* Teachings Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {teachings.map((teaching) => (
                <Card key={teaching.id} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-orange-700 mb-3">
                    {teaching.title[selectedLanguage]}
                  </h3>
                  <div 
                    className="text-gray-700 mb-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: teaching.content[selectedLanguage] }}
                  />
                  <div className="border-t pt-4">
                    <p className="text-sm text-orange-600 font-medium mb-2">Significance:</p>
                    <p className="text-sm text-gray-600">
                      {teaching.significance[selectedLanguage]}
                    </p>
                  </div>
                  {teaching.audioUrl && (
                    <div className="mt-4">
                      <AudioPlayer src={teaching.audioUrl} title={teaching.title[selectedLanguage]} />
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Stories Section */}
            {stories.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-orange-700 mb-6">Sacred Stories</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stories.map((story) => (
                    <Card key={story.id} className="p-4 hover:shadow-lg transition-shadow">
                      <h4 className="text-lg font-medium text-orange-600 mb-2">
                        {story.title[selectedLanguage]}
                      </h4>
                      <div 
                        className="text-gray-600 text-sm prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: story.content[selectedLanguage] }}
                      />
                      {story.audioUrl && (
                        <div className="mt-3">
                          <AudioPlayer src={story.audioUrl} title={story.title[selectedLanguage]} compact />
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Daily Prayers */}
        {activeTab === 'prayers' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-orange-800 text-center mb-8">
              Daily Prayers & Mantras
            </h2>
            
            {/* Prayers Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {prayers.map((prayer) => (
                <Card key={prayer.id} className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🙏</span>
                    <h3 className="text-xl font-semibold text-orange-700">
                      {prayer.title[selectedLanguage]}
                    </h3>
                  </div>
                  
                  <div 
                    className="text-gray-700 mb-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: prayer.content[selectedLanguage] }}
                  />
                  
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm text-orange-600 font-medium mb-2">Spiritual Significance:</p>
                    <p className="text-sm text-gray-600">
                      {prayer.significance[selectedLanguage]}
                    </p>
                  </div>

                  {prayer.audioUrl && (
                    <AudioPlayer src={prayer.audioUrl} title={prayer.title[selectedLanguage]} />
                  )}
                </Card>
              ))}
            </div>

            {/* Mantras Section */}
            {mantras.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-orange-700 mb-6 text-center">Sacred Mantras</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {mantras.map((mantra) => (
                    <Card key={mantra.id} className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
                      <div className="text-center">
                        <h4 className="text-lg font-medium text-orange-600 mb-4">
                          {mantra.title[selectedLanguage]}
                        </h4>
                        <div 
                          className="text-gray-700 mb-4 text-lg font-medium"
                          dangerouslySetInnerHTML={{ __html: mantra.content[selectedLanguage] }}
                        />
                        <p className="text-sm text-gray-600 italic">
                          {mantra.significance[selectedLanguage]}
                        </p>
                        {mantra.audioUrl && (
                          <div className="mt-4">
                            <AudioPlayer src={mantra.audioUrl} title={mantra.title[selectedLanguage]} />
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Festival Calendar */}
        {activeTab === 'festivals' && (
          <div>
            <h2 className="text-3xl font-bold text-orange-800 text-center mb-8">
              Festival Calendar & Cultural Significance
            </h2>
            <FestivalCalendar language={selectedLanguage} />
          </div>
        )}

        {/* Downloadable Content */}
        {activeTab === 'downloads' && (
          <div>
            <h2 className="text-3xl font-bold text-orange-800 text-center mb-8">
              Spiritual Downloads
            </h2>
            <DownloadableContent content={content} language={selectedLanguage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DevotionalContentHub;