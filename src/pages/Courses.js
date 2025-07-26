import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star } from 'lucide-react';
import { CourseService } from '../services/courseService';
import { sampleCourses } from '../services/sampleData';
import EnrollmentButton from '../components/EnrollmentButton';
import { useAuth } from '../contexts/AuthContext';

const Courses = () => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllCourses();
  }, []);

  const loadAllCourses = async () => {
    try {
      setLoading(true);
      const dbCourses = await CourseService.getAllCourses();
      setCourses([...dbCourses, ...sampleCourses]);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  };

  const staticCourses = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the basics of digital marketing including SEO, social media, and content marketing.',
      duration: '8 weeks',
      students: 1250,
      rating: 4.8,
      level: 'Beginner',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Web Development with React',
      description: 'Build modern web applications using React, JavaScript, and modern development tools.',
      duration: '12 weeks',
      students: 890,
      rating: 4.9,
      level: 'Intermediate',
      price: '$49'
    },
    {
      id: 3,
      title: 'Data Analytics with Python',
      description: 'Analyze data and create insights using Python, pandas, and visualization libraries.',
      duration: '10 weeks',
      students: 675,
      rating: 4.7,
      level: 'Beginner',
      price: '$39'
    },
    {
      id: 4,
      title: 'Mobile App Development',
      description: 'Create mobile applications for Android and iOS using React Native.',
      duration: '14 weeks',
      students: 432,
      rating: 4.6,
      level: 'Advanced',
      price: '$79'
    },
    {
      id: 5,
      title: 'Digital Entrepreneurship',
      description: 'Start and grow your digital business with proven strategies and frameworks.',
      duration: '6 weeks',
      students: 980,
      rating: 4.8,
      level: 'Beginner',
      price: 'Free'
    },
    {
      id: 6,
      title: 'Cloud Computing Basics',
      description: 'Introduction to cloud services, AWS fundamentals, and cloud architecture.',
      duration: '8 weeks',
      students: 567,
      rating: 4.5,
      level: 'Intermediate',
      price: '$59'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SkillBridge
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Browse Courses
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-300">
            Discover courses designed to advance your digital skills
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="group bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden hover:bg-white/90 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                  <img 
                    src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'} 
                    alt={course.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        (course.level === 'BEGINNER' || course.level === 'Beginner') ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' :
                        (course.level === 'INTERMEDIATE' || course.level === 'Intermediate') ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800' :
                        'bg-gradient-to-r from-red-100 to-pink-100 text-red-800'
                      }`}>
                        {course.level || 'Beginner'}
                      </span>
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Free</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">{course.title}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}{course.duration && typeof course.duration === 'number' ? ' hours' : ''}
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
                    
                    <EnrollmentButton course={course} onEnrollmentChange={loadAllCourses} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;