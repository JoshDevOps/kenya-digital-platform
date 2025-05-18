import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Toast from './components/Toast';

// Components
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/ContentManagement';
import LiveSessions from './pages/LiveSessions';
import PaymentSettings from './pages/PaymentSettings';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentView from './pages/StudentView';
import VideoPlayer from './pages/VideoPlayer';
import SessionRoom from './pages/SessionRoom';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ConfirmAccount from './pages/ConfirmAccount';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Coach only route
const CoachRoute = ({ children }) => {
  const { userAttributes, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>;
  }
  
  if (!userAttributes || userAttributes['custom:user_type'] !== 'COACH') {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppContent() {
  const { currentUser } = useAuth();
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Toast />
        {currentUser ? (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 flex-shrink-0">
              <Sidebar />
            </div>
            <div className="flex-grow p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/content" element={
                  <CoachRoute>
                    <ContentManagement />
                  </CoachRoute>
                } />
                <Route path="/live" element={
                  <CoachRoute>
                    <LiveSessions />
                  </CoachRoute>
                } />
                <Route path="/payments" element={
                  <CoachRoute>
                    <PaymentSettings />
                  </CoachRoute>
                } />
                <Route path="/analytics" element={
                  <CoachRoute>
                    <Analytics />
                  </CoachRoute>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/learn" element={<StudentView />} />
                <Route path="/video/:videoId" element={<VideoPlayer />} />
                <Route path="/session/:sessionId" element={<SessionRoom />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-md w-full space-y-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/confirm" element={<ConfirmAccount />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;