import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Users, Star, Play, CheckCircle, Award } from 'lucide-react';
import CourseCategories from '../components/CourseCategories';
import SmartRecommendations from '../components/SmartRecommendations';

const LearnerCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState('all');

  const categories = ['all', 'Marketing', 'Development', 'Design', 'Business', 'Data Science'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const allCourses = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Sarah Johnson',
      description: 'Master the essentials of digital marketing including SEO, social media, and content strategy.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      category: 'Marketing',
      level: 'Beginner',
      duration: '8 weeks',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      price: 99,
      enrolled: true,
      progress: 75,
      completedLessons: 18,
      lastAccessed: '2024-01-20',
      certificate: false
    },
    {
      id: 2,
      title: 'React Development Masterclass',
      instructor: 'Michael Chen',
      description: 'Build modern web applications with React, Redux, and modern JavaScript.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      category: 'Development',
      level: 'Intermediate',
      duration: '12 weeks',
      lessons: 36,
      students: 890,
      rating: 4.9,
      price: 149,
      enrolled: true,
      progress: 45,
      completedLessons: 16,
      lastAccessed: '2024-01-18',
      certificate: false
    },
    {
      id: 3,
      title: 'Data Analytics with Python',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Learn data analysis, visualization, and machine learning with Python.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      category: 'Data Science',
      level: 'Beginner',
      duration: '10 weeks',
      lessons: 30,
      students: 675,
      rating: 4.7,
      price: 129,
      enrolled: true,
      progress: 100,
      completedLessons: 30,
      lastAccessed: '2024-01-15',
      certificate: true
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      instructor: 'Alex Thompson',
      description: 'Create beautiful and user-friendly interfaces with modern design principles.',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
      category: 'Design',
      level: 'Beginner',
      duration: '6 weeks',
      lessons: 18,
      students: 432,
      rating: 4.6,
      price: 79,
      enrolled: false,
      progress: 0,
      completedLessons: 0,
      lastAccessed: null,
      certificate: false
    },
    {
      id: 5,
      title: 'Digital Entrepreneurship',
      instructor: 'Grace Wanjiku',
      description: 'Start and scale your digital business with proven strategies.',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      category: 'Business',
      level: 'Intermediate',
      duration: '8 weeks',
      lessons: 24,
      students: 980,
      rating: 4.8,
      price: 119,
      enrolled: false,
      progress: 0,
      completedLessons: 0,
      lastAccessed: null,
      certificate: false
    }
  ];

  const enrolledCourses = allCourses.filter(course => course.enrolled);
  const availableCourses = allCourses.filter(course => !course.enrolled);

  const getCoursesToShow = () => {
    let courses = viewMode === 'enrolled' ? enrolledCourses : 
                  viewMode === 'available' ? availableCourses : allCourses;

    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  };

  const filteredCourses = getCoursesToShow();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue learning and discover new courses</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled</p>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.filter(c => c.progress === 100).length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">47</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.filter(c => c.certificate).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Categories */}
        <CourseCategories 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
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
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>
          
          {/* View Toggle */}
          <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mt-4 w-fit">
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'all' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setViewMode('enrolled')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'enrolled' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Courses ({enrolledCourses.length})
            </button>
            <button
              onClick={() => setViewMode('available')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'available' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Available ({availableCourses.length})
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                {course.enrolled && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full">
                      Enrolled
                    </span>
                  </div>
                )}
                {course.certificate && (
                  <div className="absolute top-4 right-4">
                    <Award className="w-6 h-6 text-yellow-500" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-orange-600 font-medium">{course.category}</span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                
                {course.enrolled && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.completedLessons}/{course.lessons} lessons completed
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {course.enrolled ? 'Enrolled' : `$${course.price}`}
                  </span>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                    course.enrolled 
                      ? 'bg-orange-600 text-white hover:bg-orange-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    {course.enrolled ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </>
                    ) : (
                      'Enroll Now'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        {viewMode === 'available' && (
          <div className="mt-8">
            <SmartRecommendations userId="current-user" currentCourse="none" />
          </div>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerCourses;