import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, Star } from 'lucide-react';

const SmartRecommendations = ({ userId, currentCourse }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI recommendation generation
    setTimeout(() => {
      const aiRecommendations = [
        {
          id: 1,
          title: 'Advanced React Patterns',
          reason: 'Based on your progress in React Fundamentals',
          confidence: 92,
          type: 'next-level',
          duration: '6 weeks',
          rating: 4.8,
          students: 234
        },
        {
          id: 2,
          title: 'JavaScript ES6+ Features',
          reason: 'Fills knowledge gaps identified in your learning',
          confidence: 87,
          type: 'skill-gap',
          duration: '4 weeks',
          rating: 4.7,
          students: 456
        },
        {
          id: 3,
          title: 'Node.js Backend Development',
          reason: 'Popular among learners with similar interests',
          confidence: 78,
          type: 'peer-based',
          duration: '8 weeks',
          rating: 4.6,
          students: 189
        }
      ];
      setRecommendations(aiRecommendations);
      setLoading(false);
    }, 1000);
  }, [userId, currentCourse]);

  const getReasonIcon = (type) => {
    switch (type) {
      case 'next-level': return '🚀';
      case 'skill-gap': return '🎯';
      case 'peer-based': return '👥';
      default: return '💡';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="w-6 h-6 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <span className="text-sm text-gray-500">Powered by AI</span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="mr-2">{getReasonIcon(rec.type)}</span>
                  <span>{rec.reason}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(rec.confidence)}`}>
                {rec.confidence}% match
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {rec.duration}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  {rec.rating}
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {rec.students} students
                </div>
              </div>
            </div>

            <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
              View Course
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700">
          <Brain className="w-4 h-4 inline mr-1" />
          These recommendations are generated based on your learning patterns, progress, and preferences.
        </p>
      </div>
    </div>
  );
};

export default SmartRecommendations;