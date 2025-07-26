import React, { useState } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { CREATE_COURSE } from '../graphql/mutations';
import { Upload, Video, FileText, DollarSign, Save, X, Eye, CheckCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import DragDropUpload from './DragDropUpload';

const CourseCreator = ({ onClose, onCourseCreated }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  
  const steps = [
    { id: 1, name: 'Basic Info', icon: FileText },
    { id: 2, name: 'Content', icon: Video },
    { id: 3, name: 'Preview', icon: Eye }
  ];
  
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: 'BEGINNER',
    category: 'Web Development',
    thumbnail: null,
    videoUrl: '',
    materials: []
  });

  const categories = [
    'Web Development',
    'Mobile Development', 
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'UI/UX Design',
    'Digital Marketing',
    'Business'
  ];

  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
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

    try {
      setLoading(true);
      const thumbnailUrl = await uploadFile(file, 'thumbnails');
      setCourseData(prev => ({ ...prev, thumbnail: thumbnailUrl }));
    } catch (error) {
      alert('Failed to upload thumbnail: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMaterialUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    try {
      setLoading(true);
      const uploadPromises = files.map(file => uploadFile(file, 'materials'));
      const materialUrls = await Promise.all(uploadPromises);
      
      const newMaterials = files.map((file, index) => ({
        name: file.name,
        url: materialUrls[index],
        type: file.type
      }));

      setCourseData(prev => ({
        ...prev,
        materials: [...prev.materials, ...newMaterials]
      }));
    } catch (error) {
      alert('Failed to upload materials: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveCourseToStorage = async (course) => {
    try {
      // Try GraphQL API first
      const result = await API.graphql(graphqlOperation(CREATE_COURSE, {
        input: {
          title: course.title,
          description: course.description,
          price: course.price,
          duration: course.duration,
          level: course.level,
          category: course.category,
          thumbnail: course.thumbnail,
          videoUrl: course.videoUrl,
          materials: course.materials || []
        }
      }));
      
      return result.data.createCourse;
    } catch (error) {
      console.log('GraphQL API failed, using localStorage:', error);
      
      // Fallback to localStorage
      const existingCourses = JSON.parse(localStorage.getItem('skillbridge_courses') || '[]');
      const newCourse = {
        ...course,
        id: uuidv4(),
        instructorId: currentUser.username,
        enrollmentCount: 0,
        rating: 0,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      existingCourses.push(newCourse);
      localStorage.setItem('skillbridge_courses', JSON.stringify(existingCourses));
      return newCourse;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!courseData.title || !courseData.description || !courseData.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // For now, save to localStorage (production would use DynamoDB)
      const savedCourse = await saveCourseToStorage({
        ...courseData,
        price: parseFloat(courseData.price),
        duration: parseInt(courseData.duration) || 1
      });

      alert('Course created successfully! The course is now available.');
      onCourseCreated && onCourseCreated(savedCourse);
      onClose && onClose();
      
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-orange-500 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ml-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={courseData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter course title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={courseData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="49.99"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={courseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what students will learn..."
              required
            />
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (hours)
              </label>
              <input
                type="number"
                value={courseData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                value={courseData.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={courseData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Thumbnail
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {courseData.thumbnail ? (
                <div className="space-y-2">
                  <img
                    src={courseData.thumbnail}
                    alt="Thumbnail preview"
                    className="mx-auto h-32 w-48 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setCourseData(prev => ({ ...prev, thumbnail: null }))}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label className="cursor-pointer">
                      <span className="text-blue-500 hover:text-blue-700">Upload thumbnail</span>
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

          {/* Materials Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Materials
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center mb-4">
                <FileText className="mx-auto h-8 w-8 text-gray-400" />
                <label className="cursor-pointer">
                  <span className="text-blue-500 hover:text-blue-700">Upload materials</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleMaterialUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              {courseData.materials.length > 0 && (
                <div className="space-y-2">
                  {courseData.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-700">{material.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCourseData(prev => ({
                            ...prev,
                            materials: prev.materials.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreator;