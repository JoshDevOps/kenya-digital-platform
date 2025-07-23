import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Users, BookOpen, TrendingUp, Calendar, Eye, Edit, Plus, BarChart3, PieChart } from 'lucide-react';
import PaymentSplitCalculator from '../components/PaymentSplitCalculator';

const CoachDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Mock data for coach analytics
  const stats = {
    totalRevenue: 12450,
    grossRevenue: 14647, // Before platform commission
    platformFees: 2197, // 15% commission
    totalStudents: 156,
    activeCourses: 8,
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

  const courses = [
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Coach Dashboard</h1>
            <p className="text-gray-600">Manage your courses and track your success</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/content" className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Course
            </Link>
            <Link to="/live" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Session
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                <p className="text-sm text-blue-600">+8 new this week</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
                <p className="text-sm text-purple-600">2 in draft</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                <p className="text-sm text-orange-600">+5% improvement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  className="w-full bg-orange-600 rounded-t-lg transition-all duration-300 hover:bg-orange-700"
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Course Performance</h2>
              <Link to="/content" className="text-orange-600 hover:text-orange-700 font-medium">View All</Link>
            </div>
            <div className="space-y-4">
              {courses.slice(0, 3).map((course) => (
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Enrollments</h2>
              <Link to="/analytics" className="text-orange-600 hover:text-orange-700 font-medium">View All</Link>
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
                        className="bg-orange-600 h-2 rounded-full" 
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Live Sessions</h2>
            <Link to="/live" className="text-orange-600 hover:text-orange-700 font-medium">Manage Sessions</Link>
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
                <button className="mt-3 w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
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