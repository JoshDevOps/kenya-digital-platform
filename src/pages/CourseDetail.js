import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Play, BookOpen, Award, ArrowLeft } from 'lucide-react';
import { CourseService } from '../services/courseService';
import { sampleCourses } from '../services/sampleData';
import EnrollmentButton from '../components/EnrollmentButton';
import { useAuth } from '../contexts/AuthContext';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      
      // Try to get from created courses first
      let courseData = await CourseService.getCourse(courseId);
      
      // Fallback to sample data
      if (!courseData) {
        courseData = sampleCourses.find(c => c.id === courseId);
      }
      
      setCourse(courseData);
      
      // Check enrollment status
      if (currentUser && courseData) {
        const enrollments = await CourseService.getUserEnrollments(currentUser.username);
        const isEnrolled = enrollments.some(e => e.courseId === courseId);
        setEnrolled(isEnrolled);
      }
      
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollmentChange = () => {
    setEnrolled(true);
    // Refresh course data to update enrollment count
    loadCourse();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="flex items-center text-sm text-blue-600 mb-4">
                <span className="bg-blue-100 px-3 py-1 rounded-full">{course.category}</span>
                <span className="ml-4 bg-gray-100 px-3 py-1 rounded-full text-gray-700">{course.level}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>
              
              {/* Course Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration} hours
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {course.enrollmentCount || 0} students
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  {course.rating || 0} rating
                </div>
              </div>
            </div>

            {/* Course Content Preview */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Master the fundamentals',
                  'Build real-world projects',
                  'Best practices and patterns',
                  'Industry-standard tools',
                  'Problem-solving techniques',
                  'Career advancement skills'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Materials */}
            {course.materials && course.materials.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Materials</h2>
                <div className="space-y-3">
                  {course.materials.map((material, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-gray-700">
                        {typeof material === 'string' ? material : material.name || 'Course Material'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Course Thumbnail */}
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}

              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${course.price}
                </div>
                <div className="text-sm text-gray-500">One-time payment</div>
              </div>

              {/* Enrollment Button */}
              <EnrollmentButton 
                course={course} 
                onEnrollmentChange={handleEnrollmentChange}
              />

              {/* Course Info */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration} hours</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{course.enrollmentCount || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{course.category}</span>
                </div>
              </div>

              {/* Preview Video */}
              {course.videoUrl && (
                <div className="mt-6">
                  <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Preview Course
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;