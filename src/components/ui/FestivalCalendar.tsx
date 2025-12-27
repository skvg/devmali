'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { Card } from './Card';
import { Button } from './Button';

interface Festival {
  id: string;
  name: Record<Language, string>;
  date: string;
  month: string;
  description: Record<Language, string>;
  significance: Record<Language, string>;
  rituals: Record<Language, string[]>;
  type: 'major' | 'minor' | 'seasonal';
}

interface FestivalCalendarProps {
  language: Language;
}

const FestivalCalendar: React.FC<FestivalCalendarProps> = ({ language }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Festival data - in a real app, this would come from a content management system
  const festivals: Festival[] = [
    {
      id: 'devnarayan-jayanti',
      name: {
        en: 'Lord Devnarayan Jayanti',
        hi: 'भगवान देवनारायण जयंती',
        raj: 'भगवान देवनारायण जयंती'
      },
      date: 'Bhadrapada Shukla Saptami',
      month: 'August-September',
      description: {
        en: 'The most important festival celebrating the birth of Lord Devnarayan',
        hi: 'भगवान देवनारायण के जन्म का सबसे महत्वपूर्ण त्योहार',
        raj: 'भगवान देवनारायण रै जन्म रो सबसूं महत्वपूर्ण त्योहार'
      },
      significance: {
        en: 'This day marks the divine incarnation of Lord Devnarayan and is celebrated with great devotion across Rajasthan',
        hi: 'यह दिन भगवान देवनारायण के दिव्य अवतार को चिह्नित करता है और राजस्थान भर में बड़ी भक्ति के साथ मनाया जाता है',
        raj: 'यो दिन भगवान देवनारायण रै दिव्य अवतार नै चिह्नित करै है अर राजस्थान भर में बड़ी भक्ति सूं मनायो जावै है'
      },
      rituals: {
        en: ['Special prayers and aarti', 'Community feast (bhandara)', 'Folk performances and bhajans', 'Village procession'],
        hi: ['विशेष प्रार्थना और आरती', 'सामुदायिक भोज (भंडारा)', 'लोक प्रदर्शन और भजन', 'गांव की शोभायात्रा'],
        raj: ['विशेष प्रार्थना अर आरती', 'सामुदायिक भोज (भंडारा)', 'लोक प्रदर्शन अर भजन', 'गांव री शोभायात्रा']
      },
      type: 'major'
    },
    {
      id: 'holi-celebration',
      name: {
        en: 'Holi - Festival of Colors',
        hi: 'होली - रंगों का त्योहार',
        raj: 'होली - रंगां रो त्योहार'
      },
      date: 'Phalguna Purnima',
      month: 'March',
      description: {
        en: 'Celebrated with traditional colors and community gatherings',
        hi: 'पारंपरिक रंगों और सामुदायिक सभाओं के साथ मनाया जाता है',
        raj: 'पारंपरिक रंगां अर सामुदायिक सभावां सूं मनायो जावै है'
      },
      significance: {
        en: 'Celebrates the victory of good over evil and the arrival of spring',
        hi: 'बुराई पर अच्छाई की जीत और वसंत के आगमन का जश्न मनाता है',
        raj: 'बुराई पर अच्छाई री जीत अर वसंत रै आगमन रो जश्न मनावै है'
      },
      rituals: {
        en: ['Holika Dahan bonfire', 'Playing with natural colors', 'Traditional sweets sharing', 'Community celebrations'],
        hi: ['होलिका दहन अलाव', 'प्राकृतिक रंगों से खेलना', 'पारंपरिक मिठाइयों का बांटना', 'सामुदायिक उत्सव'],
        raj: ['होलिका दहन अलाव', 'प्राकृतिक रंगां सूं खेलणो', 'पारंपरिक मिठाइयां रो बांटणो', 'सामुदायिक उत्सव']
      },
      type: 'major'
    },
    {
      id: 'diwali-celebration',
      name: {
        en: 'Diwali - Festival of Lights',
        hi: 'दिवाली - रोशनी का त्योहार',
        raj: 'दिवाली - रोशनी रो त्योहार'
      },
      date: 'Kartik Amavasya',
      month: 'October-November',
      description: {
        en: 'Five-day festival of lights celebrated with traditional lamps and prayers',
        hi: 'पारंपरिक दीपों और प्रार्थनाओं के साथ मनाया जाने वाला पांच दिवसीय प्रकाश उत्सव',
        raj: 'पारंपरिक दीपां अर प्रार्थनावां सूं मनायो जाण वाळो पांच दिवसीय प्रकाश उत्सव'
      },
      significance: {
        en: 'Celebrates the return of Lord Rama and the triumph of light over darkness',
        hi: 'भगवान राम की वापसी और अंधकार पर प्रकाश की विजय का जश्न मनाता है',
        raj: 'भगवान राम री वापसी अर अंधकार पर प्रकाश री विजय रो जश्न मनावै है'
      },
      rituals: {
        en: ['Lighting diyas and candles', 'Rangoli decorations', 'Lakshmi Puja', 'Fireworks and celebrations'],
        hi: ['दीये और मोमबत्तियां जलाना', 'रंगोली सजावट', 'लक्ष्मी पूजा', 'आतिशबाजी और उत्सव'],
        raj: ['दीये अर मोमबत्तियां जळावणो', 'रंगोली सजावट', 'लक्ष्मी पूजा', 'आतिशबाजी अर उत्सव']
      },
      type: 'major'
    },
    {
      id: 'teej-celebration',
      name: {
        en: 'Teej Festival',
        hi: 'तीज का त्योहार',
        raj: 'तीज रो त्योहार'
      },
      date: 'Shravana Shukla Tritiya',
      month: 'July-August',
      description: {
        en: 'Monsoon festival celebrated by women with traditional songs and dances',
        hi: 'महिलाओं द्वारा पारंपरिक गीतों और नृत्यों के साथ मनाया जाने वाला मानसून त्योहार',
        raj: 'महिलावां द्वारा पारंपरिक गीतां अर नृत्यां सूं मनायो जाण वाळो मानसून त्योहार'
      },
      significance: {
        en: 'Celebrates marital bliss and the monsoon season',
        hi: 'वैवाहिक आनंद और मानसून के मौसम का जश्न मनाता है',
        raj: 'वैवाहिक आनंद अर मानसून रै मौसम रो जश्न मनावै है'
      },
      rituals: {
        en: ['Swinging on decorated swings', 'Traditional folk songs', 'Henna application', 'Special prayers for marital happiness'],
        hi: ['सजे हुए झूलों पर झूलना', 'पारंपरिक लोक गीत', 'मेहंदी लगाना', 'वैवाहिक खुशी के लिए विशेष प्रार्थना'],
        raj: ['सजे होए झूलां पर झूलणो', 'पारंपरिक लोक गीत', 'मेहंदी लगावणो', 'वैवाहिक खुशी खातर विशेष प्रार्थना']
      },
      type: 'seasonal'
    }
  ];

  const months = [
    'all', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredFestivals = selectedMonth === 'all' 
    ? festivals 
    : festivals.filter(festival => festival.month.includes(selectedMonth));

  const getFestivalTypeColor = (type: Festival['type']) => {
    switch (type) {
      case 'major': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'minor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'seasonal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Month Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {months.map((month) => (
          <Button
            key={month}
            variant={selectedMonth === month ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedMonth(month)}
            className="capitalize"
          >
            {month === 'all' ? 'All Months' : month}
          </Button>
        ))}
      </div>

      {/* Festival Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredFestivals.map((festival) => (
          <Card key={festival.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* Festival Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-orange-700 mb-2">
                  {festival.name[language]}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>📅</span>
                  <span>{festival.date}</span>
                  <span className="text-gray-400">•</span>
                  <span>{festival.month}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getFestivalTypeColor(festival.type)}`}>
                {festival.type.charAt(0).toUpperCase() + festival.type.slice(1)}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">
              {festival.description[language]}
            </p>

            {/* Significance */}
            <div className="bg-orange-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-orange-700 mb-2">Spiritual Significance</h4>
              <p className="text-sm text-gray-700">
                {festival.significance[language]}
              </p>
            </div>

            {/* Rituals */}
            <div>
              <h4 className="font-medium text-orange-700 mb-3">Traditional Rituals</h4>
              <ul className="space-y-2">
                {festival.rituals[language].map((ritual, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{ritual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {filteredFestivals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No festivals found for {selectedMonth === 'all' ? 'the selected criteria' : selectedMonth}
          </p>
        </div>
      )}

      {/* Cultural Note */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-orange-700 mb-3">
            🕉️ Cultural Preservation
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            These festivals are celebrated with great devotion in Devmali village, maintaining centuries-old traditions 
            while fostering community unity and spiritual growth. Each celebration strengthens the bond between 
            generations and preserves our rich cultural heritage.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default FestivalCalendar;