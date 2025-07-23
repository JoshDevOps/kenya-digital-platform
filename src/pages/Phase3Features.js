import React from 'react';
import { Brain, MessageSquare, Wand2, Route, TrendingUp, Zap, Target, Lightbulb } from 'lucide-react';

const Phase3Features = () => {
  const aiFeatures = [
    {
      category: 'AI Tutor & Assistant',
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      items: [
        'Real-time Q&A with AI tutor',
        'Contextual help based on course content',
        'Instant explanations and examples',
        'Interactive learning conversations',
        'Personalized study assistance'
      ]
    },
    {
      category: 'Smart Recommendations',
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      items: [
        'AI-powered course suggestions',
        'Learning path optimization',
        'Skill gap identification',
        'Peer-based recommendations',
        'Confidence-scored matches'
      ]
    },
    {
      category: 'Auto Content Generation',
      icon: <Wand2 className="w-8 h-8 text-purple-600" />,
      items: [
        'Automated lesson plan creation',
        'Quiz and assessment generation',
        'Assignment templates',
        'Course outline structuring',
        'Multi-difficulty level content'
      ]
    },
    {
      category: 'Personalized Learning Paths',
      icon: <Route className="w-8 h-8 text-orange-600" />,
      items: [
        'Goal-based path generation',
        'Adaptive learning sequences',
        'Progress-driven unlocking',
        'Time-optimized scheduling',
        'Skill progression tracking'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Enhanced Learning Experience',
      description: 'AI tutors provide 24/7 support and personalized assistance',
      icon: <Brain className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Accelerated Content Creation',
      description: 'Generate course materials 10x faster with AI assistance',
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
    {
      title: 'Improved Learning Outcomes',
      description: 'Personalized paths increase completion rates by 40%',
      icon: <Target className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Smart Insights',
      description: 'AI-driven analytics reveal learning patterns and opportunities',
      icon: <Lightbulb className="w-6 h-6 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              SkillBridge Phase 3: AI Integration
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leveraging artificial intelligence to revolutionize online learning in Kenya
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {aiFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 p-3 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-sm text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            AI-Powered Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Phase 3 Implementation Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">AI Tutor</h3>
              <p className="text-sm text-gray-600">Interactive chat assistant ready</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Smart Recommendations</h3>
              <p className="text-sm text-gray-600">AI-powered course suggestions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Content Generator</h3>
              <p className="text-sm text-gray-600">Automated course creation tools</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Learning Paths</h3>
              <p className="text-sm text-gray-600">Personalized learning journeys</p>
            </div>
          </div>
        </div>

        {/* AI Hub Preview */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-8 text-white">
          <div className="text-center mb-6">
            <Brain className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">AI Hub Now Available</h2>
            <p className="text-lg mb-6">
              Access all AI-powered features from one centralized hub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🤖 AI Tutor</h4>
              <p>Get instant help and explanations</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎯 Smart Recommendations</h4>
              <p>Discover your next perfect course</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✨ Content Generation</h4>
              <p>Create courses with AI assistance</p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <a
              href="/ai-hub"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Explore AI Hub
            </a>
          </div>
        </div>

        {/* Future Roadmap */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Future AI Enhancements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">🎥 AI Video Generation</h3>
              <p className="text-sm text-gray-600">Automatically create video lessons from text content</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">🗣️ Voice AI Tutor</h3>
              <p className="text-sm text-gray-600">Voice-activated learning assistant for hands-free study</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Predictive Analytics</h3>
              <p className="text-sm text-gray-600">Predict student success and intervention needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase3Features;