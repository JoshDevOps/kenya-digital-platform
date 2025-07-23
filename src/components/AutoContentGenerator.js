import React, { useState } from 'react';
import { Wand2, FileText, Video, HelpCircle, Lightbulb } from 'lucide-react';

const AutoContentGenerator = ({ onContentGenerated }) => {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('lesson');
  const [difficulty, setDifficulty] = useState('beginner');
  const [generating, setGenerating] = useState(false);

  const contentTypes = [
    { id: 'lesson', name: 'Lesson Plan', icon: <FileText className="w-4 h-4" /> },
    { id: 'quiz', name: 'Quiz Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'assignment', name: 'Assignment', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'outline', name: 'Course Outline', icon: <Video className="w-4 h-4" /> }
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const generatedContent = generateContent(topic, contentType, difficulty);
      onContentGenerated(generatedContent);
      setGenerating(false);
    }, 2000);
  };

  const generateContent = (topic, type, level) => {
    const templates = {
      lesson: {
        title: `${topic} - ${level.charAt(0).toUpperCase() + level.slice(1)} Level`,
        content: `
# ${topic} Lesson Plan

## Learning Objectives
- Understand the fundamentals of ${topic}
- Apply key concepts in practical scenarios
- Develop problem-solving skills

## Lesson Structure
1. Introduction (10 minutes)
2. Core Concepts (20 minutes)
3. Practical Examples (15 minutes)
4. Hands-on Exercise (10 minutes)
5. Q&A and Wrap-up (5 minutes)

## Key Points
- Essential concepts and terminology
- Real-world applications
- Common pitfalls to avoid

## Assessment
- Quick knowledge check
- Practical exercise completion
        `
      },
      quiz: {
        title: `${topic} Quiz - ${level} Level`,
        content: `
# ${topic} Assessment

## Question 1 (Multiple Choice)
What is the primary purpose of ${topic}?
A) Option A
B) Option B  
C) Option C
D) Option D

## Question 2 (True/False)
${topic} is essential for modern development.
True / False

## Question 3 (Short Answer)
Explain how ${topic} can be applied in real-world scenarios.

## Answer Key
1. C) Option C
2. True
3. [Sample answer provided]
        `
      }
    };

    return templates[type] || templates.lesson;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Wand2 className="w-6 h-6 text-purple-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">AI Content Generator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic or Subject
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., React Hooks, Digital Marketing, Python Basics"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setContentType(type.id)}
                className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                  contentType === type.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {type.icon}
                <span className="ml-2 text-sm">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || generating}
          className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
            !topic.trim() || generating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          {generating ? (
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

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700">
          <Lightbulb className="w-4 h-4 inline mr-1" />
          AI will generate structured content including objectives, outlines, and assessments based on your specifications.
        </p>
      </div>
    </div>
  );
};

export default AutoContentGenerator;