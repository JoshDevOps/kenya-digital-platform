import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Users, BookOpen, TrendingUp, Calendar, Eye, Edit, Plus, BarChart3, PieChart } from 'lucide-react';
import PaymentSplitCalculator from '../components/PaymentSplitCalculator';
import { useCourses } from '../contexts/CourseContext';

const CoachDashboard = () => {
  const { courses, loading } = useCourses();
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Calculate real stats from courses
  const realStats = {
    totalRevenue: courses.reduce((sum, course) => sum + ((course.price || 0) * (course.enrollmentCount || 0)), 0),
    totalStudents: courses.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0),
    activeCourses: courses.filter(course => course.isPublished).length,
    draftCourses: courses.filter(course => !course.isPublished).length,
    avgRating: courses.length > 0 ? 
      (courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length).toFixed(1) : 0
  };

  // Mock data for additional analytics
  const stats = {
    ...realStats,
    grossRevenue: realStats.totalRevenue * 1.18, // Before platform commission
    platformFees: realStats.totalRevenue * 0.18, // 18% commission
    completionRate: 78
  };

  const revenueData = [
    { month: 'Jan', revenue: 2400 },
    { month: 'Feb', revenue: 3200 },
    { month: 'Mar', revenue: 2800 },
    { month: 'Apr', revenue: 3600 },
    { month: 'May', revenue: 4200 },
    { month: 'Jun', revenue: 3800 }
  ];

  const mockCourses = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      students: 45,
      revenue: 4500,
      price: 100,
      status: 'active',
      completionRate: 82,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Advanced Social Media Strategy',
      students: 32,
      revenue: 3200,
      price: 150,
      status: 'active',
      completionRate: 75,
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Content Creation Masterclass',
      students: 28,
      revenue: 2800,
      price: 120,
      status: 'draft',
      completionRate: 0,
      rating: 0,
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop'
    }
  ];

  const recentStudents = [
    { id: 1, name: 'John Doe', course: 'Digital Marketing Fundamentals', enrolled: '2024-01-20', progress: 65 },
    { id: 2, name: 'Jane Smith', course: 'Advanced Social Media Strategy', enrolled: '2024-01-18', progress: 45 },
    { id: 3, name: 'Mike Johnson', course: 'Digital Marketing Fundamentals', enrolled: '2024-01-15', progress: 90 },
    { id: 4, name: 'Sarah Wilson', course: 'Content Creation Masterclass', enrolled: '2024-01-12', progress: 30 }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Q&A: Digital Marketing Trends',
      date: '2024-01-25',
      time: '14:00',
      attendees: 23,
      course: 'Digital Marketing Fundamentals'
    },
    {
      id: 2,
      title: 'Live Workshop: Content Strategy',
      date: '2024-01-27',
      time: '16:00',
      attendees: 18,
      course: 'Content Creation Masterclass'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
              Coach Dashboard
            </h1>
            <p className="text-slate-600 text-lg">Manage your courses and track your teaching success</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/content" className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl hover:-translate-y-1">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              New Course
            </Link>
            <Link to="/live" className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl hover:-translate-y-1">
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Schedule Session
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-medium">+12% from last month</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Students</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{stats.totalStudents}</p>
                <p className="text-sm text-blue-600 font-medium">+8 new this week</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Active Courses</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stats.activeCourses}</p>
                <p className="text-sm text-purple-600 font-medium">{stats.draftCourses} in draft</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Avg Completion</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{stats.completionRate}%</p>
                <p className="text-sm text-orange-600 font-medium">+5% improvement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">Revenue Overview</h2>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-3 border border-white/30 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/80 transition-all duration-300 text-slate-700"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
          <div className="h-64 flex items-end space-x-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-2xl transition-all duration-300 hover:from-purple-700 hover:to-blue-600 shadow-lg"
                  style={{ height: `${(data.revenue / 5000) * 100}%` }}
                ></div>
                <p className="text-sm text-gray-600 mt-2">{data.month}</p>
                <p className="text-xs text-gray-500">${data.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Split Calculator */}
        <PaymentSplitCalculator 
          price={99} 
          sales={156} 
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Course Performance */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">Course Performance</h2>
              <Link to="/content" className="text-purple-600 hover:text-purple-700 font-medium">View All</Link>
            </div>
            <div className="space-y-4">
              {(courses.length > 0 ? courses : mockCourses).slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{course.students} students</span>
                        <span>${course.revenue} revenue</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">Recent Enrollments</h2>
              <Link to="/analytics" className="text-purple-600 hover:text-purple-700 font-medium">View All</Link>
            </div>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.course}</p>
                    <p className="text-xs text-gray-500">Enrolled {new Date(student.enrolled).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{student.progress}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 rounded-full" 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">Upcoming Live Sessions</h2>
            <Link to="/live" className="text-purple-600 hover:text-purple-700 font-medium">Manage Sessions</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{session.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{session.course}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(session.date).toLocaleDateString()} at {session.time}</span>
                  <span>{session.attendees} registered</span>
                </div>
                <button className="mt-3 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Start Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;