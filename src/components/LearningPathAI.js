import React, { useState } from 'react';
import { MapPin, Target, CheckCircle, Clock, Brain } from 'lucide-react';

const LearningPathAI = ({ userId }) => {
  const [goals, setGoals] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [timeCommitment, setTimeCommitment] = useState('5');
  const [generatedPath, setGeneratedPath] = useState(null);
  const [generating, setGenerating] = useState(false);

  const generatePath = async () => {
    if (!goals.trim()) return;
    
    setGenerating(true);
    
    // Simulate AI path generation
    setTimeout(() => {
      const path = {
        title: `Personalized Learning Path: ${goals}`,
        duration: `${Math.ceil(parseInt(timeCommitment) * 4)} weeks`,
        courses: [
          {
            id: 1,
            title: 'Fundamentals',
            duration: '2 weeks',
            status: 'available',
            description: 'Build strong foundation concepts'
          },
          {
            id: 2,
            title: 'Intermediate Concepts',
            duration: '3 weeks',
            status: 'locked',
            description: 'Advance your understanding'
          },
          {
            id: 3,
            title: 'Advanced Applications',
            duration: '2 weeks',
            status: 'locked',
            description: 'Master complex scenarios'
          },
          {
            id: 4,
            title: 'Capstone Project',
            duration: '1 week',
            status: 'locked',
            description: 'Apply everything you\'ve learned'
          }
        ],
        skills: ['Problem Solving', 'Critical Thinking', 'Practical Application'],
        confidence: 94
      };
      setGeneratedPath(path);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <MapPin className="w-6 h-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">AI Learning Path Generator</h3>
      </div>

      {!generatedPath ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What do you want to learn?
            </label>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g., I want to become a full-stack developer, learn digital marketing, master data science..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="beginner">Complete Beginner</option>
                <option value="some">Some Experience</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours per week
              </label>
              <select
                value={timeCommitment}
                onChange={(e) => setTimeCommitment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2">2-3 hours</option>
                <option value="5">5-7 hours</option>
                <option value="10">10-15 hours</option>
                <option value="20">20+ hours</option>
              </select>
            </div>
          </div>

          <button
            onClick={generatePath}
            disabled={!goals.trim() || generating}
            className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
              !goals.trim() || generating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Generating Your Path...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate Learning Path
              </>
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{generatedPath.title}</h4>
              <p className="text-sm text-gray-600">
                Estimated duration: {generatedPath.duration} • {generatedPath.confidence}% confidence match
              </p>
            </div>
            <button
              onClick={() => setGeneratedPath(null)}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Generate New Path
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {generatedPath.courses.map((course, index) => (
              <div key={course.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 mr-4">
                  {course.status === 'available' ? (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 font-semibold text-sm">{index + 1}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{course.title}</h5>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {course.duration}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {course.status === 'available' ? (
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                      Start
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="font-semibold text-blue-900 mb-2">Skills You'll Gain:</h5>
            <div className="flex flex-wrap gap-2">
              {generatedPath.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathAI;