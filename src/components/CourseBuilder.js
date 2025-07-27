import React, { useState } from 'react';
import { X, Upload, Video, FileText, Save, Eye, Plus, Trash2 } from 'lucide-react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { CREATE_COURSE } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import { StepFunctionsService } from '../services/stepFunctionsService';
import WorkflowMonitor from './WorkflowMonitor';

const CourseBuilder = ({ onClose, onCourseCreated }) => {
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [workflowExecution, setWorkflowExecution] = useState(null);
  const [showWorkflowMonitor, setShowWorkflowMonitor] = useState(false);
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    price: 0,
    duration: '',
    level: 'BEGINNER',
    category: 'Web Development',
    thumbnail: null,
    thumbnailFile: null,
    lessons: [],
    learningObjectives: [''],
    requirements: [''],
    tags: []
  });

  const steps = [
    { id: 1, name: 'Basic Info', icon: FileText },
    { id: 2, name: 'Content', icon: Video },
    { id: 3, name: 'Preview', icon: Eye }
  ];

  const categories = [
    'Web Development', 'Mobile Development', 'Data Science',
    'Machine Learning', 'Cloud Computing', 'DevOps',
    'Cybersecurity', 'UI/UX Design', 'Digital Marketing', 'Business'
  ];

  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setCourseData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const uploadFile = async (file, folder = 'courses') => {
    try {
      const fileExtension = file.name.split('.').pop();
      const fileName = `${folder}/${uuidv4()}.${fileExtension}`;
      
      const result = await Storage.put(fileName, file, {
        contentType: file.type,
        progressCallback: (progress) => {
          const percentage = (progress.loaded / progress.total) * 100;
          setUploadProgress(prev => ({ ...prev, [file.name]: percentage }));
        }
      });
      
      const fileUrl = await Storage.get(result.key);
      return fileUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // For local development, just use the object URL
    setCourseData(prev => ({ 
      ...prev, 
      thumbnailFile: file,
      thumbnail: URL.createObjectURL(file)
    }));
  };

  const addLesson = () => {
    const newLesson = {
      id: uuidv4(),
      title: '',
      description: '',
      videoUrl: '',
      videoFile: null,
      duration: '',
      order: courseData.lessons.length + 1
    };
    setCourseData(prev => ({
      ...prev,
      lessons: [...prev.lessons, newLesson]
    }));
  };

  const updateLesson = (lessonId, field, value) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.map(lesson => 
        lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
      )
    }));
  };

  const removeLesson = (lessonId) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.filter(lesson => lesson.id !== lessonId)
    }));
  };

  const handleLessonVideoUpload = async (lessonId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    // For local development, use object URL
    updateLesson(lessonId, 'videoFile', file);
    updateLesson(lessonId, 'videoUrl', URL.createObjectURL(file));
  };

  const isValidForSubmission = () => {
    return courseData.title && 
           courseData.description && 
           courseData.shortDescription &&
           courseData.thumbnail &&
           courseData.lessons.length > 0 &&
           courseData.lessons.every(lesson => lesson.title && lesson.description);
  };

  const saveCourse = async (status = 'draft') => {
    if (!courseData.title || !courseData.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      const courseId = uuidv4();
      const courseToSave = {
        ...courseData,
        id: courseId,
        thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
        lessons: courseData.lessons.map(lesson => ({
          ...lesson,
          videoUrl: lesson.videoUrl || 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          videoFile: undefined
        })),
        instructorId: currentUser.username,
        enrollmentCount: 0,
        rating: 0,
        status: status,
        isPublished: false,
        submittedAt: status === 'pending' ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (status === 'pending') {
        // Use Step Functions workflow for course creation and approval
        const workflowResult = await StepFunctionsService.startCourseCreation(courseToSave);
        
        if (workflowResult.success) {
          setWorkflowExecution(workflowResult.executionArn);
          setShowWorkflowMonitor(true);
          alert('Course creation workflow started! Monitor progress below.');
        } else {
          throw new Error(workflowResult.message);
        }
      } else {
        // For drafts, save directly
        try {
          const result = await API.graphql(graphqlOperation(CREATE_COURSE, {
            input: courseToSave
          }));
          
          alert('Course saved as draft successfully!');
          onCourseCreated && onCourseCreated(result.data.createCourse);
          onClose && onClose();
        } catch (apiError) {
          console.log('GraphQL/AWS failed, using localStorage for local development:', apiError);
          
          const existingCourses = JSON.parse(localStorage.getItem('skillbridge_courses') || '[]');
          existingCourses.push(courseToSave);
          localStorage.setItem('skillbridge_courses', JSON.stringify(existingCourses));
          
          alert('Course saved as draft! (Local development mode)');
          onCourseCreated && onCourseCreated(courseToSave);
          onClose && onClose();
        }
      }
      
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkflowStatusChange = (status) => {
    if (status === 'SUCCEEDED') {
      alert('Course created and processed successfully!');
      onCourseCreated && onCourseCreated({ id: courseData.id });
      onClose && onClose();
    } else if (status === 'FAILED') {
      alert('Course creation workflow failed. Please try again.');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-2">Course Title *</label>
        <input
          type="text"
          value={courseData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm"
          placeholder="Enter course title"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Price (USD)</label>
          <input
            type="number"
            step="0.01"
            value={courseData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Level</label>
          <select
            value={courseData.level}
            onChange={(e) => handleInputChange('level', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm"
          >
            {levels.map(level => (
              <option key={level} value={level} className="bg-slate-800">{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Category</label>
          <select
            value={courseData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-slate-800">{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Short Description *</label>
        <textarea
          value={courseData.shortDescription}
          onChange={(e) => handleInputChange('shortDescription', e.target.value)}
          rows="2"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm"
          placeholder="Brief description for course cards..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Full Description *</label>
        <textarea
          value={courseData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows="4"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm"
          placeholder="Detailed course description..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Course Thumbnail</label>
        <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center bg-white/5">
          {courseData.thumbnail ? (
            <div className="space-y-2">
              <img
                src={courseData.thumbnail}
                alt="Thumbnail preview"
                className="mx-auto h-32 w-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setCourseData(prev => ({ ...prev, thumbnail: null, thumbnailFile: null }))}
                className="text-red-400 text-sm hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <Upload className="mx-auto h-12 w-12 text-slate-400" />
              <div className="mt-2">
                <label className="cursor-pointer">
                  <span className="text-purple-400 hover:text-purple-300">Upload thumbnail</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Course Lessons</h3>
          <button
            type="button"
            onClick={addLesson}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lesson
          </button>
        </div>

        {courseData.lessons.map((lesson, index) => (
          <div key={lesson.id} className="bg-white/5 border border-white/20 rounded-xl p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-medium">Lesson {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeLesson(lesson.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Lesson Title</label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter lesson title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={lesson.duration}
                  onChange={(e) => updateLesson(lesson.id, 'duration', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="15"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">Lesson Description</label>
              <textarea
                value={lesson.description}
                onChange={(e) => updateLesson(lesson.id, 'description', e.target.value)}
                rows="2"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="What will students learn in this lesson?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Lesson Video</label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                {lesson.videoUrl ? (
                  <div className="space-y-2">
                    <video
                      src={lesson.videoUrl}
                      className="mx-auto h-32 w-48 object-cover rounded"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => updateLesson(lesson.id, 'videoUrl', '')}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      Remove Video
                    </button>
                  </div>
                ) : (
                  <div>
                    <Video className="mx-auto h-8 w-8 text-slate-400" />
                    <div className="mt-2">
                      <label className="cursor-pointer">
                        <span className="text-purple-400 hover:text-purple-300">Upload video</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleLessonVideoUpload(lesson.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Course Preview</h3>
        
        {courseData.thumbnail && (
          <img
            src={courseData.thumbnail}
            alt="Course thumbnail"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        
        <h4 className="text-lg font-semibold text-white mb-2">{courseData.title}</h4>
        <p className="text-slate-300 mb-4">{courseData.shortDescription}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <span className="text-slate-400">Price:</span>
            <span className="text-white ml-2">${courseData.price}</span>
          </div>
          <div>
            <span className="text-slate-400">Level:</span>
            <span className="text-white ml-2">{courseData.level}</span>
          </div>
          <div>
            <span className="text-slate-400">Category:</span>
            <span className="text-white ml-2">{courseData.category}</span>
          </div>
          <div>
            <span className="text-slate-400">Lessons:</span>
            <span className="text-white ml-2">{courseData.lessons.length}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h5 className="text-white font-medium mb-2">Description:</h5>
          <p className="text-slate-300 text-sm">{courseData.description}</p>
        </div>
        
        {courseData.lessons.length > 0 && (
          <div>
            <h5 className="text-white font-medium mb-2">Lessons:</h5>
            <div className="space-y-2">
              {courseData.lessons.map((lesson, index) => (
                <div key={lesson.id} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">{index + 1}. {lesson.title}</span>
                    {lesson.duration && (
                      <span className="text-slate-400 text-xs">{lesson.duration} min</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-6 border-b border-white/20 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Create New Course</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-purple-500 text-white' :
                    'bg-white/20 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-purple-400' : 'text-slate-400'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ml-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
          {showWorkflowMonitor && workflowExecution && (
            <div className="mt-6">
              <WorkflowMonitor 
                executionArn={workflowExecution}
                onStatusChange={handleWorkflowStatusChange}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-white/20 flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-white/20 rounded-xl text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex space-x-4">
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <>
                <button
                  onClick={() => saveCourse('draft')}
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-xl font-medium hover:from-gray-700 hover:to-slate-700 disabled:opacity-50 transition-all duration-300 flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => saveCourse('pending')}
                  disabled={loading || !isValidForSubmission()}
                  className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-medium hover:from-orange-700 hover:to-red-700 disabled:opacity-50 transition-all duration-300 flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Submit for Review
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBuilder;