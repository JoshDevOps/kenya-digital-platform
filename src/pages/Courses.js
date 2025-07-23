import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Star } from 'lucide-react';

const Courses = () => {
  const courses = [
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              SkillBridge
            </Link>
            <Link to="/login" className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Browse Courses</h1>
          <p className="text-xl">Discover courses designed to advance your digital skills</p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                    <span className="text-lg font-bold text-orange-600">{course.price}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                  
                  <Link 
                    to="/register" 
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors block text-center"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;