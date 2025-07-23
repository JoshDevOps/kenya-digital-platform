import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Clock, Calendar, Download, Filter } from 'lucide-react';
import AdvancedAnalytics from '../components/AdvancedAnalytics';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [viewMode, setViewMode] = useState('overview');

  // Mock analytics data
  const stats = {
    totalRevenue: 24750,
    totalStudents: 156,
    totalViews: 2340,
    avgWatchTime: 28.5,
    conversionRate: 12.3,
    completionRate: 78.2
  };

  const revenueData = [
    { month: 'Jan', revenue: 3200, students: 25 },
    { month: 'Feb', revenue: 4100, students: 32 },
    { month: 'Mar', revenue: 3800, students: 28 },
    { month: 'Apr', revenue: 4500, students: 35 },
    { month: 'May', revenue: 5200, students: 42 },
    { month: 'Jun', revenue: 3950, students: 38 }
  ];

  const topCourses = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      students: 45,
      revenue: 4500,
      views: 890,
      rating: 4.8,
      completion: 82,
      growth: '+15%'
    },
    {
      id: 2,
      title: 'Advanced Social Media Strategy',
      students: 32,
      revenue: 4800,
      views: 640,
      rating: 4.6,
      completion: 75,
      growth: '+8%'
    },
    {
      id: 3,
      title: 'Content Creation Masterclass',
      students: 28,
      revenue: 2240,
      views: 520,
      rating: 4.7,
      completion: 68,
      growth: '+22%'
    },
    {
      id: 4,
      title: 'Email Marketing Bootcamp',
      students: 35,
      revenue: 3150,
      views: 710,
      rating: 4.5,
      completion: 71,
      growth: '+12%'
    }
  ];

  const studentDemographics = [
    { category: 'Age 18-25', percentage: 35, count: 55 },
    { category: 'Age 26-35', percentage: 42, count: 66 },
    { category: 'Age 36-45', percentage: 18, count: 28 },
    { category: 'Age 46+', percentage: 5, count: 7 }
  ];

  const trafficSources = [
    { source: 'Direct', percentage: 45, visitors: 1053 },
    { source: 'Social Media', percentage: 28, visitors: 655 },
    { source: 'Search Engines', percentage: 18, visitors: 421 },
    { source: 'Referrals', percentage: 9, visitors: 211 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your performance and growth</p>
          </div>
          <div className="flex space-x-3">
            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'overview' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('advanced')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'advanced' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Advanced
              </button>
            </div>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {viewMode === 'advanced' ? (
          <AdvancedAnalytics />
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12.5%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                <p className="text-sm text-blue-600">+8.3%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-purple-600">+15.2%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Watch</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgWatchTime}m</p>
                <p className="text-sm text-orange-600">+5.1%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                <p className="text-sm text-indigo-600">+2.1%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-pink-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                <p className="text-sm text-pink-600">+3.8%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Revenue & Student Growth</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 rounded text-sm ${selectedMetric === 'revenue' ? 'bg-orange-600 text-white' : 'text-gray-600'}`}
              >
                Revenue
              </button>
              <button 
                onClick={() => setSelectedMetric('students')}
                className={`px-3 py-1 rounded text-sm ${selectedMetric === 'students' ? 'bg-orange-600 text-white' : 'text-gray-600'}`}
              >
                Students
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end space-x-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-orange-600 rounded-t-lg transition-all duration-300 hover:bg-orange-700"
                  style={{ 
                    height: selectedMetric === 'revenue' 
                      ? `${(data.revenue / 6000) * 100}%` 
                      : `${(data.students / 50) * 100}%` 
                  }}
                ></div>
                <p className="text-sm text-gray-600 mt-2">{data.month}</p>
                <p className="text-xs text-gray-500">
                  {selectedMetric === 'revenue' ? `$${data.revenue}` : `${data.students} students`}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performing Courses */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Courses</h2>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{course.students} students</span>
                      <span>{course.views} views</span>
                      <span>{course.completion}% completion</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${course.revenue}</p>
                    <p className="text-sm text-green-600">{course.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Demographics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Student Demographics</h2>
            <div className="space-y-4">
              {studentDemographics.map((demo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 w-20">{demo.category}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${demo.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{demo.percentage}%</span>
                    <p className="text-xs text-gray-500">{demo.count} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Traffic Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trafficSources.map((source, index) => (
              <div key={index} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${source.percentage * 2.51} 251`}
                      className="text-orange-600"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">{source.percentage}%</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">{source.source}</h3>
                <p className="text-sm text-gray-600">{source.visitors} visitors</p>
              </div>
            ))}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;