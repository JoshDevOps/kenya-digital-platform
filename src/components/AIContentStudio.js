import React, { useState } from 'react';
import { Wand2, Edit3, Eye, Save, Trash2, RefreshCw, CheckCircle, Clock } from 'lucide-react';

const AIContentStudio = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [contentDrafts, setContentDrafts] = useState([]);

  const [prompt, setPrompt] = useState({
    topic: '',
    type: 'lesson',
    audience: 'beginner',
    duration: '30',
    style: 'practical'
  });

  const generateContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const content = {
        id: Date.now(),
        title: `${prompt.topic} - ${prompt.audience} Level`,
        type: prompt.type,
        content: generateContentByType(prompt),
        metadata: {
          duration: `${prompt.duration} minutes`,
          audience: prompt.audience,
          style: prompt.style,
          createdAt: new Date().toISOString()
        },
        status: 'draft'
      };
      
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const generateContentByType = (prompt) => {
    const templates = {
      lesson: `# ${prompt.topic} Lesson Plan

## Learning Objectives
- Master the fundamentals of ${prompt.topic}
- Apply concepts in real-world scenarios
- Build practical skills through hands-on exercises

## Lesson Structure (${prompt.duration} minutes)
1. **Introduction** (5 min)
   - Welcome and overview
   - Learning objectives review

2. **Core Concepts** (${Math.floor(prompt.duration * 0.5)} min)
   - Key principles of ${prompt.topic}
   - Essential terminology
   - Common use cases

3. **Practical Application** (${Math.floor(prompt.duration * 0.3)} min)
   - Step-by-step demonstration
   - Real-world examples
   - Best practices

4. **Interactive Exercise** (${Math.floor(prompt.duration * 0.15)} min)
   - Hands-on activity
   - Student participation
   - Q&A session

5. **Wrap-up** (5 min)
   - Key takeaways
   - Next steps
   - Resources for further learning

## Assessment
- Quick knowledge check
- Practical exercise completion
- Participation in discussions

## Resources
- Recommended readings
- Additional practice materials
- Community discussion topics`,

      quiz: `# ${prompt.topic} Assessment

## Question 1 (Multiple Choice)
What is the primary benefit of ${prompt.topic}?
A) Increased efficiency
B) Better user experience  
C) Cost reduction
D) All of the above

## Question 2 (True/False)
${prompt.topic} requires advanced technical knowledge to implement effectively.
**Answer:** False

## Question 3 (Short Answer)
Describe a real-world scenario where ${prompt.topic} would be most beneficial.

## Question 4 (Problem Solving)
Given the following situation, how would you apply ${prompt.topic} principles?
[Scenario description]

## Answer Key
1. D) All of the above
2. False - ${prompt.topic} can be learned by beginners
3. [Sample answer provided]
4. [Step-by-step solution]`,

      assignment: `# ${prompt.topic} Assignment

## Objective
Apply your understanding of ${prompt.topic} to complete a practical project.

## Instructions
1. **Research Phase** (30 minutes)
   - Review course materials on ${prompt.topic}
   - Identify key concepts and principles

2. **Planning Phase** (45 minutes)
   - Define your project scope
   - Create an implementation plan
   - List required resources

3. **Implementation Phase** (2-3 hours)
   - Execute your plan
   - Document your process
   - Test and refine your solution

4. **Reflection Phase** (30 minutes)
   - Analyze your results
   - Identify lessons learned
   - Suggest improvements

## Deliverables
- Project documentation
- Implementation files/screenshots
- Reflection report (500 words)

## Grading Criteria
- Understanding of concepts (30%)
- Implementation quality (40%)
- Documentation clarity (20%)
- Critical reflection (10%)

## Due Date
Submit within 1 week of assignment release`
    };

    return templates[prompt.type] || templates.lesson;
  };

  const saveAsDraft = () => {
    if (generatedContent) {
      setContentDrafts([...contentDrafts, { ...generatedContent, savedAt: new Date().toISOString() }]);
      setGeneratedContent(null);
    }
  };

  const publishContent = () => {
    if (generatedContent) {
      // Simulate publishing
      console.log('Publishing content:', generatedContent);
      setGeneratedContent(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wand2 className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">AI Content Studio</h2>
          </div>
          <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'generate' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Generate
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'drafts' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Drafts ({contentDrafts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'generate' && (
          <div className="space-y-6">
            {/* Generation Form */}
            {!generatedContent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                  <input
                    type="text"
                    value={prompt.topic}
                    onChange={(e) => setPrompt({...prompt, topic: e.target.value})}
                    placeholder="e.g., React Hooks, Digital Marketing Strategy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                  <select
                    value={prompt.type}
                    onChange={(e) => setPrompt({...prompt, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="lesson">Lesson Plan</option>
                    <option value="quiz">Quiz/Assessment</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={prompt.audience}
                    onChange={(e) => setPrompt({...prompt, audience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <select
                    value={prompt.duration}
                    onChange={(e) => setPrompt({...prompt, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    onClick={generateContent}
                    disabled={!prompt.topic || isGenerating}
                    className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      !prompt.topic || isGenerating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Generating Content...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Content
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Generated Content Review */}
            {generatedContent && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      {editMode ? 'Preview' : 'Edit'}
                    </button>
                    <button
                      onClick={() => setGeneratedContent(null)}
                      className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Regenerate
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{generatedContent.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Type: {generatedContent.type}</span>
                      <span>Duration: {generatedContent.metadata.duration}</span>
                      <span>Level: {generatedContent.metadata.audience}</span>
                    </div>
                  </div>

                  {editMode ? (
                    <textarea
                      value={generatedContent.content}
                      onChange={(e) => setGeneratedContent({...generatedContent, content: e.target.value})}
                      rows="20"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{generatedContent.content}</pre>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={saveAsDraft}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </button>
                  <button
                    onClick={publishContent}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Publish Content
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'drafts' && (
          <div className="space-y-4">
            {contentDrafts.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts yet</h3>
                <p className="text-gray-600">Generated content will appear here for review</p>
              </div>
            ) : (
              contentDrafts.map((draft) => (
                <div key={draft.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{draft.title}</h4>
                      <p className="text-sm text-gray-600">
                        Saved {new Date(draft.savedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Type: {draft.type} • Duration: {draft.metadata.duration} • Level: {draft.metadata.audience}
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                      Continue Editing
                    </button>
                    <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      Publish
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIContentStudio;