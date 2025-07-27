import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, Play, CheckCircle, BarChart3, Grid3X3, List } from 'lucide-react';
import { CourseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';

const MyCourses = () => {
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-12 text-center max-w-md">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-6">Please log in to view your courses</h2>
          <Link to="/login" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
              My Courses
            </h1>
            <p className="text-slate-600 text-lg">Continue your learning journey and track your progress</p>
          </div>
          <div className="flex bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent"></div>
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-12 max-w-md mx-auto">
              <BookOpen className="w-20 h-20 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No enrolled courses yet</h3>
              <p className="text-slate-600 mb-8">Explore our course catalog and start learning today!</p>
              <Link 
                to="/courses" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img 
                      src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'} 
                      alt={course.title} 
                      className="w-full h-40 object-cover" 
                    />
                    <div className="absolute top-3 right-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.progress === 100 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white/90 text-slate-700'
                      }`}>
                        {course.progress === 100 ? 'Complete' : `${course.progress}%`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">{course.category}</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-slate-600">{course.rating || 0}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 leading-tight">{course.title}</h3>
                    
                    <div className="mb-3">
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            course.progress === 100 
                              ? 'bg-green-500' 
                              : 'bg-gradient-to-r from-purple-500 to-blue-500'
                          }`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration || 0}h
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {course.enrollmentCount || 0}
                      </div>
                    </div>
                    
                    <Link
                      to={`/courses/${course.id}`}
                      className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-center text-sm"
                    >
                      {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'} 
                        alt={course.title} 
                        className="w-32 h-20 object-cover rounded-xl" 
                      />
                      <div className="absolute -top-2 -right-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.progress === 100 
                            ? 'bg-green-500 text-white' 
                            : 'bg-purple-500 text-white'
                        }`}>
                          {course.progress === 100 ? 'Complete' : `${course.progress}%`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">{course.category}</span>
                          <h3 className="text-xl font-bold text-slate-900 mt-1">{course.title}</h3>
                          <p className="text-slate-600 mt-1 line-clamp-2">{course.description}</p>
                        </div>
                        <div className="flex items-center ml-4">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-slate-600">{course.rating || 0}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              course.progress === 100 
                                ? 'bg-green-500' 
                                : 'bg-gradient-to-r from-purple-500 to-blue-500'
                            }`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-slate-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration || 0} hours
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.enrollmentCount || 0} students
                          </div>
                          <div className="text-xs">
                            Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                            <BarChart3 className="w-4 h-4" />
                          </button>
                          <Link
                            to={`/courses/${course.id}`}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {course.progress > 0 ? 'Continue' : 'Start'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;