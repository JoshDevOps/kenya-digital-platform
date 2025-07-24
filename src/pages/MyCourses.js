import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, Play, CheckCircle, BarChart3 } from 'lucide-react';
import { CourseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';

const MyCourses = () => {
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrolledCourses();
  }, [currentUser]);

  const loadEnrolledCourses = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      const enrollments = await CourseService.getUserEnrollments(currentUser.username);
      const allCourses = await CourseService.getAllCourses();
      
      const enrolledCoursesData = enrollments.map(enrollment => {
        const course = allCourses.find(c => c.id === enrollment.courseId);
        return {
          ...course,
          enrollment,
          progress: enrollment.progress || 0,
          enrolledAt: enrollment.enrolledAt
        };
      }).filter(Boolean);
      
      setEnrolledCourses(enrolledCoursesData);
    } catch (error) {
      console.error('Error loading enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your courses</h2>
          <Link to="/login" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent"></div>
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses yet</h3>
            <p className="text-gray-600 mb-6">Explore our course catalog and start learning today!</p>
            <Link 
              to="/courses" 
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'} 
                  alt={course.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-orange-600 font-medium">{course.category}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{course.rating || 0}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration} hours
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.enrollmentCount || 0}
                    </div>
                    {course.progress === 100 && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completed
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {course.progress > 0 ? 'Continue' : 'Start'}
                    </Link>
                    <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;