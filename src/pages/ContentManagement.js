import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Play, DollarSign, Users, Calendar, MoreVertical, Wand2 } from 'lucide-react';
import CourseBuilder from '../components/CourseBuilder';
import { CourseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';

const ContentManagement = () => {
  const { courses, loading, refreshCourses } = useCourses();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSaveCourse = (courseData) => {
    // Refresh courses from context
    refreshCourses();
  };

  const categories = ['all', 'Marketing', 'Development', 'Design', 'Business', 'Content'];
  const statuses = ['all', 'draft', 'pending', 'approved', 'rejected'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await CourseService.deleteCourse(courseId);
        refreshCourses();
      } catch (error) {
        alert('Failed to delete course: ' + error.message);
      }
    }
  };

  const handleStatusChange = async (courseId, newStatus) => {
    try {
      await CourseService.updateCourse(courseId, { isPublished: newStatus === 'published' });
      refreshCourses();
    } catch (error) {
      alert('Failed to update course status: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
              Content Studio
            </h1>
            <p className="text-slate-600 text-lg">Create, manage, and optimize your educational content</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create Course
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Courses</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{courses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Students</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{courses.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${courses.reduce((sum, course) => sum + ((course.price || 0) * (course.enrollmentCount || 0)), 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Published</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{courses.filter(c => c.isPublished).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your courses..."
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
                <option key={category} value={category} className="bg-white">
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-4 border border-white/30 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/80 transition-all duration-300 text-slate-700 min-w-[140px]"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-white">
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            
            <div className="flex bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Course Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/90">
                    <div className="relative overflow-hidden">
                      <img 
                        src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'} 
                        alt={course.title} 
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">{course.category}</span>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(course.status || (course.isPublished ? 'approved' : 'draft'))}`}>
                      {course.status || (course.isPublished ? 'approved' : 'draft')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-purple-700 transition-colors duration-300">{course.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{Array.isArray(course.lessons) ? course.lessons.length : 0}</div>
                      <div className="text-xs text-slate-500">Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{course.duration || 0}h</div>
                      <div className="text-xs text-slate-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{course.enrollmentCount || 0}</div>
                      <div className="text-xs text-slate-500">Students</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${course.price || 0}</div>
                      <div className="text-xs text-slate-500">Course Price</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">${((course.price || 0) * (course.enrollmentCount || 0))}</div>
                      <div className="text-xs text-slate-500">Total Earned</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button className="p-3 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-xl transition-all duration-300 hover:scale-110">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-3 bg-orange-100 text-orange-600 hover:bg-orange-200 rounded-xl transition-all duration-300 hover:scale-110">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-xl transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <select
                      value={course.status || (course.isPublished ? 'approved' : 'draft')}
                      onChange={(e) => handleStatusChange(course.id, e.target.value)}
                      className="text-sm border border-white/30 rounded-xl px-3 py-2 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500">{Array.isArray(course.lessons) ? course.lessons.length : 0} lessons • {course.duration} hours</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${course.price || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.enrollmentCount || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${((course.price || 0) * (course.enrollmentCount || 0))}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(course.isPublished ? 'published' : 'draft')}`}>
                          {course.isPublished ? 'published' : 'draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-orange-600 hover:text-orange-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Play className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">Create your first course to get started</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Create Course
              </button>
            </div>
          )}
          </>
        )}

        {showCreateModal && (
          <CourseBuilder 
            onClose={() => setShowCreateModal(false)}
            onCourseCreated={handleSaveCourse}
          />
        )}

        {/* Quick AI Access */}
        <div className="fixed right-4 bottom-4 z-40">
          <a
            href="/ai-content"
            className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center"
          >
            <Wand2 className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;