import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CourseProvider } from './contexts/CourseContext';
import Toast from './components/Toast';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';

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
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LearnerDashboard from './pages/LearnerDashboard';
import LearnerCourses from './pages/LearnerCourses';
import LearnerProgress from './pages/LearnerProgress';
import MyCourses from './pages/MyCourses';
import CoachDashboard from './pages/CoachDashboard';
import Subscriptions from './pages/Subscriptions';
import Community from './pages/Community';
import Phase2Features from './pages/Phase2Features';
import AIHub from './pages/AIHub';
import Phase3Features from './pages/Phase3Features';
import AIContentCreator from './pages/AIContentCreator';
import About from './pages/About';
import Pricing from './pages/Pricing';


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
  const { currentUser, userAttributes } = useAuth();
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Toast />
        <OfflineIndicator />
        <PWAInstallPrompt />
        {currentUser ? (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 flex-shrink-0">
              <Sidebar />
            </div>
            <div className="flex-grow p-4 md:p-6">
              <Routes>
                <Route path="/" element={
                  userAttributes && userAttributes['custom:user_type'] === 'LEARNER' ? 
                    <LearnerDashboard /> : 
                  userAttributes && userAttributes['custom:user_type'] === 'COACH' ? 
                    <CoachDashboard /> : <Dashboard />
                } />
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
                <Route path="/courses" element={<LearnerCourses />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/progress" element={<LearnerProgress />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/community" element={<Community />} />
                <Route path="/ai-hub" element={<AIHub />} />
                <Route path="/ai-content" element={
                  <CoachRoute>
                    <AIContentCreator />
                  </CoachRoute>
                } />
                <Route path="/phase2" element={<Phase2Features />} />
                <Route path="/phase3" element={<Phase3Features />} />
                <Route path="/video/:videoId" element={<VideoPlayer />} />
                <Route path="/session/:sessionId" element={<SessionRoom />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
                <div className="max-w-md w-full space-y-8">
                  <Login />
                </div>
              </div>
            } />
            <Route path="/register" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
                <div className="max-w-md w-full space-y-8">
                  <Register />
                </div>
              </div>
            } />
            <Route path="/forgot-password" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
                <div className="max-w-md w-full space-y-8">
                  <ForgotPassword />
                </div>
              </div>
            } />
            <Route path="/confirm" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
                <div className="max-w-md w-full space-y-8">
                  <ConfirmAccount />
                </div>
              </div>
            } />
          </Routes>
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CourseProvider>
          <AppContent />
        </CourseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;