import React from 'react';
import { Users, Crown, BarChart3, Smartphone, Wifi, MessageSquare, Award, Filter } from 'lucide-react';

const Phase2Features = () => {
  const features = [
    {
      category: 'Advanced Course Management',
      icon: <Filter className="w-8 h-8 text-blue-600" />,
      items: [
        'Course categories with visual icons',
        'Advanced filtering and search',
        'Prerequisites and learning paths',
        'Course difficulty levels',
        'Enhanced course discovery'
      ]
    },
    {
      category: 'Enhanced Payment System',
      icon: <Crown className="w-8 h-8 text-purple-600" />,
      items: [
        'Subscription plans (Basic, Premium, Pro)',
        'Flexible billing (monthly/yearly)',
        'Multiple payment methods',
        'Automatic plan management',
        'Revenue optimization'
      ]
    },
    {
      category: 'Community Features',
      icon: <Users className="w-8 h-8 text-green-600" />,
      items: [
        'Discussion forums by course',
        'Study groups and meetups',
        'Peer-to-peer learning',
        'Mentor booking system',
        'Community engagement tools'
      ]
    },
    {
      category: 'Advanced Analytics',
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      items: [
        'Detailed student engagement metrics',
        'Revenue breakdown by category',
        'Student demographics analysis',
        'Course performance tracking',
        'Advanced reporting dashboard'
      ]
    },
    {
      category: 'Mobile App Support',
      icon: <Smartphone className="w-8 h-8 text-indigo-600" />,
      items: [
        'Progressive Web App (PWA)',
        'Install prompt for mobile',
        'Offline content access',
        'Push notifications',
        'Mobile-optimized interface'
      ]
    },
    {
      category: 'Enhanced User Experience',
      icon: <Award className="w-8 h-8 text-red-600" />,
      items: [
        'Improved navigation structure',
        'Real-time connection status',
        'Enhanced course categorization',
        'Better mobile responsiveness',
        'Streamlined user workflows'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SkillBridge Phase 2 Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced features that enhance learning, community engagement, and platform scalability
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Implementation Status */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Implementation Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Course Categories</h3>
              <p className="text-sm text-gray-600">Visual category system implemented</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Subscriptions</h3>
              <p className="text-sm text-gray-600">Flexible pricing plans ready</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
              <p className="text-sm text-gray-600">Forums and study groups active</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">PWA Support</h3>
              <p className="text-sm text-gray-600">Mobile app capabilities enabled</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready for Phase 3</h2>
          <p className="text-lg mb-6">
            Phase 2 implementation complete! The platform now includes advanced course management, 
            subscription billing, community features, enhanced analytics, and mobile app support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">🚀 Enhanced Learning</h4>
              <p>Better course discovery and categorization</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💰 Revenue Growth</h4>
              <p>Subscription model for recurring revenue</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">👥 Community Building</h4>
              <p>Forums and peer learning features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase2Features;