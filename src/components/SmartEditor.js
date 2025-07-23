import React, { useState } from 'react';
import { Wand2, Save, Eye, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';

const SmartEditor = ({ content, onSave, onCancel }) => {
  const [editedContent, setEditedContent] = useState(content?.content || '');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeContent = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const suggestions = [
        {
          id: 1,
          type: 'improvement',
          title: 'Add Learning Objectives',
          description: 'Consider adding specific, measurable learning objectives at the beginning.',
          severity: 'medium',
          suggestion: 'By the end of this lesson, students will be able to:\n- Understand key concepts\n- Apply practical skills\n- Demonstrate knowledge'
        },
        {
          id: 2,
          type: 'enhancement',
          title: 'Include Interactive Elements',
          description: 'Add interactive components to increase engagement.',
          severity: 'low',
          suggestion: '💡 **Quick Check**: What do you think is the most important concept covered so far?'
        },
        {
          id: 3,
          type: 'correction',
          title: 'Grammar Improvement',
          description: 'Minor grammar adjustments for better readability.',
          severity: 'high',
          suggestion: 'Replace "This are the key points" with "These are the key points"'
        }
      ];
      
      setAiSuggestions(suggestions);
      setIsAnalyzing(false);
    }, 1500);
  };

  const applySuggestion = (suggestion) => {
    if (suggestion.type === 'correction') {
      // Simple text replacement for corrections
      setEditedContent(prev => prev + '\n\n' + suggestion.suggestion);
    } else {
      // Add suggestions as new content
      setEditedContent(prev => prev + '\n\n' + suggestion.suggestion);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Lightbulb className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Smart Content Editor</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                showPreview ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4 mr-1" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={analyzeContent}
              disabled={isAnalyzing}
              className="flex items-center px-3 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-1"></div>
              ) : (
                <Wand2 className="w-4 h-4 mr-1" />
              )}
              AI Analyze
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Editor */}
        <div className="flex-1 p-4">
          {showPreview ? (
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                {editedContent}
              </pre>
            </div>
          ) : (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Start writing your content..."
              className="w-full h-96 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
            />
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              {editedContent.length} characters • {editedContent.split('\n').length} lines
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave({ ...content, content: editedContent })}
                className="flex items-center px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4 mr-1" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* AI Suggestions Sidebar */}
        {aiSuggestions.length > 0 && (
          <div className="w-80 border-l border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-4">AI Suggestions</h4>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(suggestion.severity)}`}>
                        {getSeverityIcon(suggestion.severity)}
                        <span className="ml-1 capitalize">{suggestion.severity}</span>
                      </span>
                    </div>
                  </div>
                  
                  <h5 className="font-medium text-gray-900 mb-1">{suggestion.title}</h5>
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  
                  {suggestion.suggestion && (
                    <div className="bg-gray-50 rounded p-2 mb-3">
                      <p className="text-xs text-gray-700 font-mono">{suggestion.suggestion}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => applySuggestion(suggestion)}
                      className="px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                    >
                      Apply
                    </button>
                    <button className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartEditor;