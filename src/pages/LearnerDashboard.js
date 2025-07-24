import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play, Clock, Award, TrendingUp, Calendar, Search, Filter, Star, Users, CheckCircle } from 'lucide-react';
import { useCourses } from '../contexts/CourseContext';
import EnrollmentButton from '../components/EnrollmentButton';

const LearnerDashboard = () => {
  const { courses, loading } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Sarah Johnson',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      nextLesson: 'Email Marketing Strategies',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      category: 'Marketing',
      rating: 4.8,
      estimatedTime: '2 hours left'
    },
    {
      id: 2,
      title: 'Web Development with React',
      instructor: 'Michael Chen',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      nextLesson: 'State Management with Redux',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      category: 'Development',
      rating: 4.9,
      estimatedTime: '8 hours left'
    },
    {
      id: 3,
      title: 'Data Analytics with Python',
      instructor: 'Dr. Emily Rodriguez',
      progress: 90,
      totalLessons: 15,
      completedLessons: 13,
      nextLesson: 'Final Project Review',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      category: 'Data Science',
      rating: 4.7,
      estimatedTime: '1 hour left'
    }
  ];

  // Mock data for recommended courses
  const recommendedCourses = [
    {
      id: 4,
      title: 'Advanced JavaScript Concepts',
      instructor: 'Alex Thompson',
      duration: '6 weeks',
      students: 1250,
      rating: 4.8,
      price: 'Free',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
      category: 'Development',
      level: 'Intermediate'
    },
    {
      id: 5,
      title: 'Digital Entrepreneurship',
      instructor: 'Grace Wanjiku',
      duration: '4 weeks',
      students: 890,
      rating: 4.6,
      price: '$29',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      category: 'Business',
      level: 'Beginner'
    },
    {
      id: 6,
      title: 'Cloud Computing Basics',
      instructor: 'James Ochieng',
      duration: '8 weeks',
      students: 567,
      rating: 4.5,
      price: '$49',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop',
      category: 'Technology',
      level: 'Beginner'
    }
  ];

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      title: 'Live Q&A: Digital Marketing Trends 2024',
      instructor: 'Sarah Johnson',
      date: '2024-01-25',
      time: '14:00',
      duration: '1 hour',
      attendees: 45
    },
    {
      id: 2,
      title: 'React Best Practices Workshop',
      instructor: 'Michael Chen',
      date: '2024-01-27',
      time: '16:00',
      duration: '2 hours',
      attendees: 32
    }
  ];

  const categories = ['all', 'Development', 'Marketing', 'Data Science', 'Business', 'Technology'];

  const filteredRecommended = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Continue your learning journey and explore new courses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-orange-600 font-medium">{course.category}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                  
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
                  
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>{course.estimatedTime}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Next:</strong> {course.nextLesson}
                  </p>
                  
                  <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Live Sessions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Live Sessions</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {upcomingSessions.map((session, index) => (
              <div key={session.id} className={`p-6 ${index !== upcomingSessions.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
                    <p className="text-gray-600 mb-2">with {session.instructor}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {session.time} ({session.duration})
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {session.attendees} attending
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Join Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            <Link to="/courses" className="text-orange-600 hover:text-orange-700 font-medium">
              View All Courses
            </Link>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommended.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'} 
                    alt={course.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-orange-600 font-medium">{course.category}</span>
                      <span className="text-lg font-bold text-orange-600">Free</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}{typeof course.duration === 'number' ? ' hours' : ''}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.enrollmentCount || course.students || 0}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        {course.rating || 0}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded ${
                        (course.level === 'BEGINNER' || course.level === 'Beginner') ? 'bg-green-100 text-green-800' :
                        (course.level === 'INTERMEDIATE' || course.level === 'Intermediate') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.level || 'Beginner'}
                      </span>
                      <EnrollmentButton course={course} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;