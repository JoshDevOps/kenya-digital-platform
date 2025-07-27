import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Video, BarChart, CheckCircle, Clock, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data - in production, fetch from API
  const stats = {
    totalUsers: 1250,
    totalCourses: 45,
    pendingApprovals: 8,
    approvedToday: 3,
    rejectedToday: 1,
    revenue: 15420
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-xl">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Courses</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-slate-800">{stats.pendingApprovals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Approved Today</p>
                <p className="text-2xl font-bold text-slate-800">{stats.approvedToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-xl">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Rejected Today</p>
                <p className="text-2xl font-bold text-slate-800">{stats.rejectedToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-xl">
                <BarChart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-800">${stats.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/approvals"
            className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-orange-600 text-sm font-medium">
                {stats.pendingApprovals} pending
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Course Approvals</h3>
            <p className="text-slate-600 text-sm">Review and approve pending courses</p>
          </Link>

          <Link
            to="/admin/users"
            className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-blue-600 text-sm font-medium">
                {stats.totalUsers} users
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">User Management</h3>
            <p className="text-slate-600 text-sm">Manage users and permissions</p>
          </Link>

          <Link
            to="/admin/analytics"
            className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <BarChart className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-purple-600 text-sm font-medium">
                ${stats.revenue.toLocaleString()}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Platform Analytics</h3>
            <p className="text-slate-600 text-sm">View detailed platform metrics</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;