'use client';

import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';

interface PrayerRequest {
  name: string;
  email: string;
  phone: string;
  location: string;
  prayerType: string;
  prayerText: string;
  isAnonymous: boolean;
  language: 'en' | 'hi' | 'raj';
}

const PrayerRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<PrayerRequest>({
    name: '',
    email: '',
    phone: '',
    location: '',
    prayerType: 'general',
    prayerText: '',
    isAnonymous: false,
    language: 'en'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const prayerTypes = [
    { value: 'general', label: { en: 'General Blessings', hi: 'सामान्य आशीर्वाद', raj: 'सामान्य आशीर्वाद' } },
    { value: 'health', label: { en: 'Health & Healing', hi: 'स्वास्थ्य और चिकित्सा', raj: 'स्वास्थ्य अर चिकित्सा' } },
    { value: 'prosperity', label: { en: 'Prosperity & Success', hi: 'समृद्धि और सफलता', raj: 'समृद्धि अर सफलता' } },
    { value: 'family', label: { en: 'Family Harmony', hi: 'पारिवारिक सद्भावना', raj: 'पारिवारिक सद्भावना' } },
    { value: 'education', label: { en: 'Education & Wisdom', hi: 'शिक्षा और ज्ञान', raj: 'शिक्षा अर ज्ञान' } },
    { value: 'marriage', label: { en: 'Marriage & Relationships', hi: 'विवाह और रिश्ते', raj: 'विवाह अर रिश्ते' } },
    { value: 'protection', label: { en: 'Protection & Safety', hi: 'सुरक्षा और रक्षा', raj: 'सुरक्षा अर रक्षा' } },
    { value: 'spiritual', label: { en: 'Spiritual Growth', hi: 'आध्यात्मिक विकास', raj: 'आध्यात्मिक विकास' } },
    { value: 'gratitude', label: { en: 'Gratitude & Thanks', hi: 'कृतज्ञता और धन्यवाद', raj: 'कृतज्ञता अर धन्यवाद' } }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, this would send the prayer request to a backend service
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Prayer request submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting prayer request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      prayerType: 'general',
      prayerText: '',
      isAnonymous: false,
      language: 'en'
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 max-w-2xl mx-auto text-center bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="space-y-4">
          <div className="text-6xl">🙏</div>
          <h3 className="text-2xl font-semibold text-green-700">
            Prayer Request Submitted
          </h3>
          <p className="text-green-600">
            Your prayer has been received and will be offered at the Lord Devnarayan temple during the next aarti ceremony.
          </p>
          <div className="bg-white rounded-lg p-4 my-4">
            <p className="text-sm text-gray-700 italic">
              "भगवान देवनारायण आपकी सभी मनोकामनाएं पूर्ण करें"
            </p>
            <p className="text-xs text-gray-500 mt-1">
              "May Lord Devnarayan fulfill all your wishes"
            </p>
          </div>
          <div className="space-y-2 text-sm text-green-600">
            <p>✓ Your prayer will be included in daily temple rituals</p>
            <p>✓ Temple priests will offer special prayers on your behalf</p>
            <p>✓ You will receive divine blessings from Lord Devnarayan</p>
          </div>
          <Button
            variant="primary"
            onClick={resetForm}
            className="mt-6"
          >
            Submit Another Prayer
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-orange-700 mb-3">
            🙏 Submit Your Prayer Request
          </h3>
          <p className="text-sm text-gray-700 max-w-3xl mx-auto">
            Share your prayers and intentions with Lord Devnarayan. Your prayer requests will be offered 
            during the daily aarti ceremonies at the temple in Devmali village. All prayers are treated 
            with utmost respect and devotion.
          </p>
        </div>
      </Card>

      {/* Prayer Request Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Language / भाषा चुनें
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="raj">राजस्थानी (Rajasthani)</option>
            </select>
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name / पूरा नाम *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!formData.isAnonymous}
                disabled={formData.isAnonymous}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address / ईमेल पता
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={formData.isAnonymous}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number / फोन नंबर
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={formData.isAnonymous}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location / स्थान
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="City, State, Country"
              />
            </div>
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Submit prayer anonymously / गुमनाम रूप से प्रार्थना भेजें
            </label>
          </div>

          {/* Prayer Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prayer Category / प्रार्थना की श्रेणी *
            </label>
            <select
              name="prayerType"
              value={formData.prayerType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {prayerTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label[formData.language]}
                </option>
              ))}
            </select>
          </div>

          {/* Prayer Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Prayer / आपकी प्रार्थना *
            </label>
            <textarea
              name="prayerText"
              value={formData.prayerText}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={
                formData.language === 'hi' 
                  ? "कृपया अपनी प्रार्थना यहाँ लिखें..."
                  : formData.language === 'raj'
                  ? "कृपया अपनी प्रार्थना यहाँ लिखो..."
                  : "Please write your prayer here..."
              }
            />
            <p className="mt-1 text-xs text-gray-500">
              Share your heartfelt prayers, wishes, or gratitude with Lord Devnarayan
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="px-8 py-3 text-lg"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">🔄</span>
                  Submitting Prayer...
                </>
              ) : (
                <>
                  🙏 Submit Prayer Request
                </>
              )}
            </Button>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
            <p className="font-medium mb-2">Privacy & Respect:</p>
            <ul className="space-y-1">
              <li>• All prayer requests are treated with complete confidentiality</li>
              <li>• Your personal information is never shared with third parties</li>
              <li>• Prayers are offered with sincere devotion during temple ceremonies</li>
              <li>• Anonymous prayers receive the same reverence as named prayers</li>
            </ul>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PrayerRequestForm;