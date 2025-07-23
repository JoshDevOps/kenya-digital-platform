import React, { useState } from 'react';
import { FileText, Edit, Eye, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';

const ContentWorkflow = () => {
  const [contents, setContents] = useState([
    {
      id: 1,
      title: 'React Hooks Fundamentals',
      type: 'lesson',
      status: 'ai_generated',
      aiScore: 92,
      createdAt: '2024-01-20',
      lastModified: '2024-01-20'
    },
    {
      id: 2,
      title: 'JavaScript ES6 Quiz',
      type: 'quiz',
      status: 'under_review',
      aiScore: 88,
      createdAt: '2024-01-19',
      lastModified: '2024-01-20'
    },
    {
      id: 3,
      title: 'Web Development Assignment',
      type: 'assignment',
      status: 'approved',
      aiScore: 95,
      createdAt: '2024-01-18',
      lastModified: '2024-01-19'
    }
  ]);

  const getStatusConfig = (status) => {
    const configs = {
      ai_generated: {
        label: 'AI Generated',
        color: 'bg-blue-100 text-blue-800',
        icon: <FileText className="w-4 h-4" />
      },
      under_review: {
        label: 'Under Review',
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Eye className="w-4 h-4" />
      },
      needs_revision: {
        label: 'Needs Revision',
        color: 'bg-red-100 text-red-800',
        icon: <AlertCircle className="w-4 h-4" />
      },
      approved: {
        label: 'Approved',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="w-4 h-4" />
      },
      published: {
        label: 'Published',
        color: 'bg-purple-100 text-purple-800',
        icon: <CheckCircle className="w-4 h-4" />
      }
    };
    return configs[status] || configs.ai_generated;
  };

  const updateStatus = (id, newStatus) => {
    setContents(contents.map(content => 
      content.id === id 
        ? { ...content, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
        : content
    ));
  };

  const workflowSteps = [
    { id: 'ai_generated', label: 'AI Generated', description: 'Content created by AI' },
    { id: 'under_review', label: 'Review', description: 'Human review and editing' },
    { id: 'approved', label: 'Approved', description: 'Ready for publishing' },
    { id: 'published', label: 'Published', description: 'Live for students' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Workflow</h3>

      {/* Workflow Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{step.label}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < workflowSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-400 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {contents.map((content) => {
          const statusConfig = getStatusConfig(content.status);
          
          return (
            <div key={content.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{content.title}</h4>
                    <p className="text-sm text-gray-600">
                      {content.type} • AI Score: {content.aiScore}% • Modified: {content.lastModified}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                    {statusConfig.icon}
                    <span className="ml-1">{statusConfig.label}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </button>
                  <button className="flex items-center px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>

                {/* Status Actions */}
                <div className="flex space-x-2">
                  {content.status === 'ai_generated' && (
                    <button
                      onClick={() => updateStatus(content.id, 'under_review')}
                      className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      Start Review
                    </button>
                  )}
                  
                  {content.status === 'under_review' && (
                    <>
                      <button
                        onClick={() => updateStatus(content.id, 'needs_revision')}
                        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Needs Revision
                      </button>
                      <button
                        onClick={() => updateStatus(content.id, 'approved')}
                        className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                    </>
                  )}
                  
                  {content.status === 'approved' && (
                    <button
                      onClick={() => updateStatus(content.id, 'published')}
                      className="px-3 py-1.5 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                    >
                      Publish
                    </button>
                  )}
                  
                  {content.status === 'needs_revision' && (
                    <button
                      onClick={() => updateStatus(content.id, 'under_review')}
                      className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Resubmit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workflow Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {workflowSteps.map((step) => {
          const count = contents.filter(c => c.status === step.id).length;
          return (
            <div key={step.id} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600">{step.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentWorkflow;