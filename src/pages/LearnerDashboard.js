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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
            Welcome back, John!
          </h1>
          <p className="text-slate-600 text-lg">Continue your learning journey and discover new opportunities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Enrolled Courses</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">3</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">1</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Hours Learned</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Certificates</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/90">
                <div className="relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">{course.category}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-slate-600 font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">{course.title}</h3>
                  <p className="text-sm text-slate-600 mb-6">by {course.instructor}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span className="font-medium">Progress</span>
                      <span className="font-bold text-purple-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-500 h-3 rounded-full shadow-sm" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{course.completedLessons}/{course.totalLessons}</div>
                      <div className="text-xs text-slate-500">Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{course.estimatedTime}</div>
                      <div className="text-xs text-slate-500">Remaining</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-purple-600">Next:</span> {course.nextLesson}
                    </p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Live Sessions */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-6">Upcoming Live Sessions</h2>
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20">
            {upcomingSessions.map((session, index) => (
              <div key={session.id} className={`p-8 ${index !== upcomingSessions.length - 1 ? 'border-b border-white/20' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{session.title}</h3>
                    <p className="text-slate-600 mb-3 font-medium">with {session.instructor}</p>
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
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
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
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">Recommended for You</h2>
            <Link to="/courses" className="text-purple-600 hover:text-purple-700 font-semibold">
              View All Courses
            </Link>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-white/30 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/80 transition-all duration-300 text-slate-700 placeholder-slate-400"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-4 border border-white/30 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/80 transition-all duration-300 text-slate-700 min-w-[160px]"
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