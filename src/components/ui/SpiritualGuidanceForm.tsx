'use client';

import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';

interface GuidanceRequest {
  name: string;
  email: string;
  age: string;
  occupation: string;
  location: string;
  questionCategory: string;
  question: string;
  background: string;
  urgency: 'low' | 'medium' | 'high';
  preferredResponse: 'email' | 'phone' | 'both';
  language: 'en' | 'hi' | 'raj';
}

const SpiritualGuidanceForm: React.FC = () => {
  const [formData, setFormData] = useState<GuidanceRequest>({
    name: '',
    email: '',
    age: '',
    occupation: '',
    location: '',
    questionCategory: 'life-purpose',
    question: '',
    background: '',
    urgency: 'medium',
    preferredResponse: 'email',
    language: 'en'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questionCategories = [
    { value: 'life-purpose', label: { en: 'Life Purpose & Direction', hi: 'जीवन का उद्देश्य और दिशा', raj: 'जीवन रो उद्देश्य अर दिशा' } },
    { value: 'relationships', label: { en: 'Relationships & Family', hi: 'रिश्ते और परिवार', raj: 'रिश्ते अर परिवार' } },
    { value: 'career', label: { en: 'Career & Business', hi: 'करियर और व्यवसाय', raj: 'करियर अर व्यवसाय' } },
    { value: 'health', label: { en: 'Health & Wellness', hi: 'स्वास्थ्य और कल्याण', raj: 'स्वास्थ्य अर कल्याण' } },
    { value: 'spiritual-growth', label: { en: 'Spiritual Growth', hi: 'आध्यात्मिक विकास', raj: 'आध्यात्मिक विकास' } },
    { value: 'financial', label: { en: 'Financial Concerns', hi: 'वित्तीय चिंताएं', raj: 'वित्तीय चिंतावां' } },
    { value: 'education', label: { en: 'Education & Learning', hi: 'शिक्षा और सीखना', raj: 'शिक्षा अर सीखणो' } },
    { value: 'personal-growth', label: { en: 'Personal Development', hi: 'व्यक्तिगत विकास', raj: 'व्यक्तिगत विकास' } },
    { value: 'difficult-times', label: { en: 'Difficult Times & Challenges', hi: 'कठिन समय और चुनौतियां', raj: 'कठिन समय अर चुनौतियां' } },
    { value: 'other', label: { en: 'Other Spiritual Matters', hi: 'अन्य आध्यात्मिक मामले', raj: 'अन्य आध्यात्मिक मामले' } }
  ];

  const urgencyLevels = [
    { value: 'low', label: { en: 'General Guidance (7-10 days)', hi: 'सामान्य मार्गदर्शन (7-10 दिन)', raj: 'सामान्य मार्गदर्शन (7-10 दिन)' } },
    { value: 'medium', label: { en: 'Important Matter (3-5 days)', hi: 'महत्वपूर्ण मामला (3-5 दिन)', raj: 'महत्वपूर्ण मामलो (3-5 दिन)' } },
    { value: 'high', label: { en: 'Urgent Guidance (1-2 days)', hi: 'तत्काल मार्गदर्शन (1-2 दिन)', raj: 'तत्काल मार्गदर्शन (1-2 दिन)' } }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, this would send the guidance request to a backend service
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Spiritual guidance request submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting guidance request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      occupation: '',
      location: '',
      questionCategory: 'life-purpose',
      question: '',
      background: '',
      urgency: 'medium',
      preferredResponse: 'email',
      language: 'en'
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="space-y-4">
          <div className="text-6xl">📿</div>
          <h3 className="text-2xl font-semibold text-blue-700">
            Guidance Request Received
          </h3>
          <p className="text-blue-600">
            Your request for spiritual guidance has been received. Our experienced spiritual counselors 
            will review your question and provide thoughtful guidance based on Lord Devnarayan's teachings.
          </p>
          <div className="bg-white rounded-lg p-4 my-4">
            <p className="text-sm text-gray-700 italic">
              "गुरु की कृपा से सभी समस्याओं का समाधान मिलता है"
            </p>
            <p className="text-xs text-gray-500 mt-1">
              "Through the guru's grace, solutions to all problems are found"
            </p>
          </div>
          <div className="space-y-2 text-sm text-blue-600">
            <p>✓ Your request will be reviewed by experienced spiritual counselors</p>
            <p>✓ Guidance will be based on traditional wisdom and Lord Devnarayan's teachings</p>
            <p>✓ You will receive a personalized response within the specified timeframe</p>
            <p>✓ All communications are kept strictly confidential</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 mt-4">
            <p className="text-sm text-yellow-700">
              <strong>Expected Response Time:</strong> {
                formData.urgency === 'high' ? '1-2 days' :
                formData.urgency === 'medium' ? '3-5 days' : '7-10 days'
              }
            </p>
          </div>
          <Button
            variant="primary"
            onClick={resetForm}
            className="mt-6"
          >
            Submit Another Request
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            📿 Seek Spiritual Guidance
          </h3>
          <p className="text-sm text-gray-700 max-w-3xl mx-auto">
            Connect with experienced spiritual counselors who follow the teachings of Lord Devnarayan. 
            Share your questions, concerns, or challenges, and receive personalized guidance rooted in 
            ancient wisdom and practical spirituality.
          </p>
        </div>
      </Card>

      {/* Guidance Request Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Language / भाषा चुनें *
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address / ईमेल पता *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age / आयु
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="1"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupation / व्यवसाय
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your profession or occupation"
              />
            </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City, State, Country"
            />
          </div>

          {/* Question Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Category / प्रश्न की श्रेणी *
            </label>
            <select
              name="questionCategory"
              value={formData.questionCategory}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {questionCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label[formData.language]}
                </option>
              ))}
            </select>
          </div>

          {/* Main Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Question / आपका प्रश्न *
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                formData.language === 'hi' 
                  ? "कृपया अपना प्रश्न विस्तार से लिखें..."
                  : formData.language === 'raj'
                  ? "कृपया अपनो प्रश्न विस्तार सूं लिखो..."
                  : "Please describe your question or concern in detail..."
              }
            />
          </div>

          {/* Background Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Context / पृष्ठभूमि की जानकारी
            </label>
            <textarea
              name="background"
              value={formData.background}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                formData.language === 'hi' 
                  ? "कोई भी अतिरिक्त जानकारी जो आपके प्रश्न को समझने में मदद कर सकती है..."
                  : formData.language === 'raj'
                  ? "कोई भी अतिरिक्त जानकारी जो आपरै प्रश्न नै समझणै में मदद कर सकै है..."
                  : "Any additional context that might help us understand your situation better..."
              }
            />
            <p className="mt-1 text-xs text-gray-500">
              Optional: Share relevant background information to help provide more personalized guidance
            </p>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level / तत्कालता का स्तर *
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {urgencyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label[formData.language]}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Response Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Response Method / पसंदीदा उत्तर विधि *
            </label>
            <select
              name="preferredResponse"
              value={formData.preferredResponse}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">Email Response</option>
              <option value="phone">Phone Consultation</option>
              <option value="both">Both Email and Phone</option>
            </select>
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
                  Submitting Request...
                </>
              ) : (
                <>
                  📿 Submit Guidance Request
                </>
              )}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
            <p className="font-medium mb-2">Important Information:</p>
            <ul className="space-y-1">
              <li>• Spiritual guidance is provided based on traditional wisdom and Lord Devnarayan's teachings</li>
              <li>• All communications are kept strictly confidential</li>
              <li>• Guidance is for spiritual and personal growth purposes only</li>
              <li>• For medical, legal, or financial issues, please consult appropriate professionals</li>
              <li>• Response times may vary based on the complexity of your question</li>
            </ul>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SpiritualGuidanceForm;