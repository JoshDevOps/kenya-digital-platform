import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, Loader } from 'lucide-react';
import { CourseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';
import { API, graphqlOperation } from 'aws-amplify';
import { ENROLL_IN_COURSE } from '../graphql/mutations';

const EnrollmentButton = ({ course, onEnrollmentChange }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // Check if user is already enrolled
  React.useEffect(() => {
    checkEnrollmentStatus();
  }, [currentUser, course.id]);

  const checkEnrollmentStatus = async () => {
    if (!currentUser) return;
    
    try {
      const enrollments = await CourseService.getUserEnrollments(currentUser.username);
      const isEnrolled = enrollments.some(e => e.courseId === course.id);
      setEnrolled(isEnrolled);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handleEnroll = async () => {
    if (!currentUser) {
      alert('Please log in to enroll in courses');
      return;
    }

    if (enrolled) {
      window.location.href = `/courses/${course.id}`;
      return;
    }

    try {
      // Step 1: Course overview
      const confirmOverview = window.confirm(
        `📚 Course: ${course.title}\n💰 Price: FREE\n⏱️ Duration: ${course.duration} hours\n📈 Level: ${course.level || 'Beginner'}\n\nProceed to enrollment?`
      );
      
      if (!confirmOverview) return;
      
      // Step 2: Final confirmation
      const confirmEnroll = window.confirm(
        `✅ Ready to enroll?\n\nBy clicking OK, you will:\n• Get instant access to course materials\n• Join the learning community\n• Track your progress\n\nConfirm enrollment in "${course.title}"?`
      );
      
      if (!confirmEnroll) return;
      
      setLoading(true);
      
      try {
        // Try GraphQL API first
        await API.graphql(graphqlOperation(ENROLL_IN_COURSE, {
          courseId: course.id
        }));
        
        setEnrolled(true);
        
        // Success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.innerHTML = `
          <div class="flex items-center">
            <span class="mr-2">🎉</span>
            <div>
              <div class="font-semibold">Enrollment Successful!</div>
              <div class="text-sm">Welcome to "${course.title}"</div>
            </div>
          </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 5000);
        
      } catch (apiError) {
        console.log('GraphQL enrollment failed, using localStorage:', apiError);
        
        // Fallback to localStorage
        await CourseService.enrollInCourse(currentUser.username, course.id);
        setEnrolled(true);
        alert('Successfully enrolled! You can now access the course content.');
      }
      
      onEnrollmentChange && onEnrollmentChange();
      
    } catch (error) {
      alert('Enrollment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <button
        onClick={() => window.location.href = '/login'}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Login to Enroll
      </button>
    );
  }

  if (enrolled) {
    return (
      <button
        onClick={handleEnroll}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center"
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        Access Course
      </button>
    );
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
    >
      {loading ? (
        <>
          <Loader className="w-5 h-5 mr-2 animate-spin" />
          Enrolling...
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Enroll for FREE
        </>
      )}
    </button>
  );
};

export default EnrollmentButton;