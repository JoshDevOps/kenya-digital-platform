import React, { useState } from 'react';
import { Upload, Video, FileText, DollarSign, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const QuickCourseCreator = ({ show, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    price: '',
    thumbnail: null,
    videos: [],
    type: 'video' // video, live, document
  });

  const categories = [
    'Marketing', 'Development', 'Design', 'Business', 
    'Data Science', 'Health', 'Finance', 'Education'
  ];

  const courseTemplates = {
    video: {
      title: 'Video Course',
      description: 'Create a comprehensive video-based learning experience',
      icon: <Video className="w-8 h-8" />,
      steps: ['Basic Info', 'Content Upload', 'Pricing', 'Review']
    },
    live: {
      title: 'Live Workshop',
      description: 'Host interactive live sessions with your audience',
      icon: <Video className="w-8 h-8" />,
      steps: ['Basic Info', 'Schedule', 'Pricing', 'Review']
    },
    document: {
      title: 'Document Course',
      description: 'Share knowledge through PDFs, guides, and resources',
      icon: <FileText className="w-8 h-8" />,
      steps: ['Basic Info', 'Documents', 'Pricing', 'Review']
    }
  };

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    const finalCourse = {
      ...courseData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'draft',
      platformCommission: 0.15, // 15% commission
      providerEarnings: courseData.price * 0.85
    };
    onSave(finalCourse);
    onClose();
  };

  const suggestedPrice = () => {
    const basePrices = {
      'Marketing': 79,
      'Development': 99,
      'Design': 69,
      'Business': 89,
      'Data Science': 129,
      'Health': 59,
      'Finance': 99,
      'Education': 49
    };
    return basePrices[courseData.category] || 79;
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-12 h-1 ${
                      step < currentStep ? 'bg-orange-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Course Type</span>
              <span>Content</span>
              <span>Pricing</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {/* Step 1: Course Type & Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Course Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(courseTemplates).map(([type, template]) => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('type', type)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        courseData.type === type 
                          ? 'border-orange-600 bg-orange-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        {template.icon}
                        <h4 className="font-semibold mt-2">{template.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., Digital Marketing for Beginners"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={courseData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Description</label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe what students will learn in this course..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <div className="flex space-x-4">
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('level', level)}
                      className={`px-4 py-2 rounded-lg border ${
                        courseData.level === level
                          ? 'border-orange-600 bg-orange-50 text-orange-600'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content Upload */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Upload Course Content</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Course Thumbnail</h4>
                <p className="text-gray-600 mb-4">Drag and drop or click to select (JPG, PNG)</p>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
                  Choose File
                </button>
              </div>

              {courseData.type === 'video' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Video Lessons</h4>
                  <p className="text-gray-600 mb-4">Upload multiple videos (MP4, MOV, AVI)</p>
                  <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
                    Upload Videos
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Set Your Price</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <h4 className="font-medium text-blue-900">Suggested Price: ${suggestedPrice()}</h4>
                    <p className="text-sm text-blue-700">Based on similar {courseData.category} courses</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Price ($)</label>
                <input
                  type="number"
                  value={courseData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder={suggestedPrice().toString()}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Revenue Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Course Price:</span>
                    <span>${courseData.price || suggestedPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (15%):</span>
                    <span>-${((courseData.price || suggestedPrice()) * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-green-600 border-t pt-2">
                    <span>Your Earnings:</span>
                    <span>${((courseData.price || suggestedPrice()) * 0.85).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Review & Publish</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Course Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Title:</span>
                    <p className="font-medium">{courseData.title}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <p className="font-medium">{courseData.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Level:</span>
                    <p className="font-medium">{courseData.level}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <p className="font-medium">${courseData.price}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-gray-600">Description:</span>
                  <p className="font-medium mt-1">{courseData.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!courseData.title || !courseData.category}
              className="flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Create Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickCourseCreator;