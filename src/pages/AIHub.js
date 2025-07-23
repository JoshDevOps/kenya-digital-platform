import React, { useState } from 'react';
import { Brain, Wand2, Route, MessageSquare, TrendingUp, Zap } from 'lucide-react';
import AITutor from '../components/AITutor';
import SmartRecommendations from '../components/SmartRecommendations';
import AutoContentGenerator from '../components/AutoContentGenerator';
import LearningPathAI from '../components/LearningPathAI';

const AIHub = () => {
  const [activeTab, setActiveTab] = useState('tutor');
  const [generatedContent, setGeneratedContent] = useState(null);

  const tabs = [
    { id: 'tutor', name: 'AI Tutor', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'recommendations', name: 'Smart Recommendations', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'content', name: 'Content Generator', icon: <Wand2 className="w-5 h-5" /> },
    { id: 'paths', name: 'Learning Paths', icon: <Route className="w-5 h-5" /> }
  ];

  const handleContentGenerated = (content) => {
    setGeneratedContent(content);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 text-purple-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">AI Learning Hub</h1>
          </div>
          <p className="text-gray-600">
            Leverage artificial intelligence to enhance your learning experience
          </p>
        </div>

        {/* AI Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Tutor</h3>
            <p className="text-sm text-gray-600">Get instant help and explanations</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
            <p className="text-sm text-gray-600">Personalized course suggestions</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
              <Wand2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Content Generator</h3>
            <p className="text-sm text-gray-600">Auto-create lessons and quizzes</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
              <Route className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Learning Paths</h3>
            <p className="text-sm text-gray-600">Customized learning journeys</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'tutor' && (
              <AITutor courseId="current" courseName="React Fundamentals" />
            )}
            
            {activeTab === 'recommendations' && (
              <SmartRecommendations userId="current-user" currentCourse="react-fundamentals" />
            )}
            
            {activeTab === 'content' && (
              <div className="space-y-6">
                <AutoContentGenerator onContentGenerated={handleContentGenerated} />
                {generatedContent && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Generated Content</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{generatedContent.title}</h5>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">{generatedContent.content}</pre>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                        Use Content
                      </button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'paths' && (
              <LearningPathAI userId="current-user" />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">AI Usage Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Questions Asked</span>
                  <span className="text-sm font-medium text-gray-900">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Content Generated</span>
                  <span className="text-sm font-medium text-gray-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Recommendations Used</span>
                  <span className="text-sm font-medium text-gray-900">8</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 mr-2" />
                <h3 className="font-semibold">AI Premium</h3>
              </div>
              <p className="text-sm mb-4">
                Unlock advanced AI features with unlimited usage
              </p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHub;