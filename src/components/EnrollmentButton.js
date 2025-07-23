import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, Loader } from 'lucide-react';
import { CourseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';

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
      // Navigate to course content
      window.location.href = `/courses/${course.id}`;
      return;
    }

    try {
      setLoading(true);
      
      // In production, this would integrate with payment processing
      const confirmEnroll = window.confirm(
        `Enroll in "${course.title}" for $${course.price}?\n\nThis is a demo - no payment will be processed.`
      );
      
      if (!confirmEnroll) return;

      await CourseService.enrollInCourse(currentUser.username, course.id);
      setEnrolled(true);
      onEnrollmentChange && onEnrollmentChange();
      
      alert('Successfully enrolled! You can now access the course content.');
      
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
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
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
        className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
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
      className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 transition-colors flex items-center justify-center"
    >
      {loading ? (
        <>
          <Loader className="w-5 h-5 mr-2 animate-spin" />
          Enrolling...
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Enroll for ${course.price}
        </>
      )}
    </button>
  );
};

export default EnrollmentButton;