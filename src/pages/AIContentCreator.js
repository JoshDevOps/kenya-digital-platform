import React, { useState } from 'react';
import { Wand2, FileText, Settings, BarChart3 } from 'lucide-react';
import AIContentStudio from '../components/AIContentStudio';
import ContentWorkflow from '../components/ContentWorkflow';
import SmartEditor from '../components/SmartEditor';

const AIContentCreator = () => {
  const [activeTab, setActiveTab] = useState('studio');
  const [editingContent, setEditingContent] = useState(null);

  const tabs = [
    { id: 'studio', name: 'AI Studio', icon: <Wand2 className="w-5 h-5" /> },
    { id: 'workflow', name: 'Workflow', icon: <FileText className="w-5 h-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> }
  ];

  const handleEditContent = (content) => {
    setEditingContent(content);
  };

  const handleSaveContent = (updatedContent) => {
    console.log('Saving content:', updatedContent);
    setEditingContent(null);
  };

  const analyticsData = {
    totalGenerated: 47,
    published: 32,
    avgAiScore: 89,
    timesSaved: 156,
    contentTypes: [
      { type: 'Lessons', count: 18, percentage: 38 },
      { type: 'Quizzes', count: 15, percentage: 32 },
      { type: 'Assignments', count: 14, percentage: 30 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Wand2 className="w-8 h-8 text-purple-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">AI Content Creator</h1>
          </div>
          <p className="text-gray-600">
            Generate, review, and publish course content with AI assistance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Wand2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Generated</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalGenerated}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.published}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg AI Score</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.avgAiScore}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.timesSaved}h</p>
              </div>
            </div>
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
        {editingContent ? (
          <SmartEditor
            content={editingContent}
            onSave={handleSaveContent}
            onCancel={() => setEditingContent(null)}
          />
        ) : (
          <>
            {activeTab === 'studio' && <AIContentStudio />}
            
            {activeTab === 'workflow' && <ContentWorkflow onEdit={handleEditContent} />}
            
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Content Types Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Types Generated</h3>
                  <div className="space-y-4">
                    {analyticsData.contentTypes.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-sm text-gray-700">{item.type}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-8">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Performance</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Content Quality Score</span>
                        <span>89%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Review Pass Rate</span>
                        <span>76%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Student Engagement</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AIContentCreator;