import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdminUser, isDevAdmin } from '../utils/adminWhitelist';

const AdminRoute = ({ children }) => {
  const { currentUser, userAttributes } = useAuth();
  
  // Check for mock admin session (local development)
  const mockSession = localStorage.getItem('skillbridge_admin_session');
  const hasMockSession = mockSession && JSON.parse(mockSession).timestamp > (Date.now() - 24 * 60 * 60 * 1000);
  
  // Check if user is authenticated and is an admin
  const isAdmin = hasMockSession || (currentUser && (
    isAdminUser(currentUser.username) ||
    isAdminUser(userAttributes?.email) ||
    isDevAdmin(currentUser.username)
  ));

  if (!currentUser && !hasMockSession) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-600 mb-6">You don't have permission to access this admin area.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;