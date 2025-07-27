import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { isAdminUser, isDevAdmin } from '../utils/adminWhitelist';
import { createTestAdmins, validateTestAdmin } from '../utils/createTestAdmin';
import { initializeAdminData } from '../utils/sampleAdminData';

const AdminLogin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Create test admin accounts and sample data on component mount
  React.useEffect(() => {
    createTestAdmins();
    initializeAdminData();
  }, []);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // For local development, check test admin credentials first
      if (validateTestAdmin(usernameOrEmail, password)) {
        // Mock successful login for test admin
        const mockUser = {
          username: usernameOrEmail,
          attributes: { email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@skillbridge.com` }
        };
        
        // Store mock session
        localStorage.setItem('skillbridge_admin_session', JSON.stringify({
          user: mockUser,
          timestamp: Date.now()
        }));
        
        navigate('/');
        return;
      }
      
      // Try regular AWS Cognito login
      const user = await signIn(usernameOrEmail, password);
      
      // Check if user is admin after successful login
      const isAdmin = isAdminUser(usernameOrEmail) || 
                     isAdminUser(user.attributes?.email) || 
                     isDevAdmin(usernameOrEmail);
      
      if (!isAdmin) {
        setError('Access denied. This account is not authorized for admin access.');
        setIsLoading(false);
        return;
      }
      
      navigate('/');
    } catch (error) {
      setError(error.message || 'Failed to sign in. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <Link to="/" className="flex justify-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            SkillBridge Admin
          </div>
        </Link>
        
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Admin Access Only
        </h2>
        <p className="mt-2 text-center text-sm text-slate-300">
          Authorized personnel only.{' '}
          <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Regular login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-white">
                Admin Email or Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  autoComplete="username"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg placeholder-slate-400 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm backdrop-blur-sm"
                  placeholder="admin@skillbridge.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-white/20 rounded-lg placeholder-slate-400 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm backdrop-blur-sm"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying Access...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Sign In
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center space-y-3">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-xs text-blue-200 mb-2">
                <strong>Development Mode:</strong> Test admin credentials:
              </p>
              <div className="text-xs text-blue-100 space-y-1">
                <div>Username: <code className="bg-blue-900/50 px-1 rounded">admin</code> | Password: <code className="bg-blue-900/50 px-1 rounded">Admin123!</code></div>
                <div>Username: <code className="bg-blue-900/50 px-1 rounded">josh</code> | Password: <code className="bg-blue-900/50 px-1 rounded">Josh123!</code></div>
              </div>
            </div>
            
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-xs text-yellow-200">
                <strong>Security Notice:</strong> Only authorized SkillBridge employees can access admin features. 
                All access attempts are logged and monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;