import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { API, graphqlOperation } from 'aws-amplify';
import { LIST_COURSES, GET_USER_ENROLLMENTS } from '../graphql/queries';
import { sampleCourses, sampleEnrollments } from '../services/sampleData';
import { CourseService } from '../services/courseService';

// Create the course context
const CourseContext = createContext();

// Custom hook to use the course context
export const useCourses = () => {
  return useContext(CourseContext);
};

// Provider component that makes course data available
export const CourseProvider = ({ children }) => {
  const { currentUser, userAttributes } = useAuth();
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [courseProgress, setCourseProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user's courses
  const fetchUserCourses = async () => {
    if (!currentUser) {
      setCourses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let userCourses = [];
      
      // Use local data only until GraphQL auth is fixed
      if (userAttributes && userAttributes['custom:user_type'] === 'COACH') {
        const instructorCourses = await CourseService.getCoursesByInstructor(currentUser.username);
        userCourses = [...instructorCourses, ...sampleCourses];
      } else {
        const enrollments = await CourseService.getUserEnrollments(currentUser.username);
        const allCourses = [...await CourseService.getAllCourses(), ...sampleCourses];
        
        userCourses = enrollments.map(enrollment => 
          allCourses.find(course => course.id === enrollment.courseId)
        ).filter(Boolean);
        
        const sampleEnrolled = sampleEnrollments
          .filter(e => e.userId === 'current-user')
          .map(enrollment => sampleCourses.find(course => course.id === enrollment.courseId))
          .filter(Boolean);
        
        userCourses = [...userCourses, ...sampleEnrolled];
      }
      
      setCourses(userCourses);
    } catch (err) {
      setError('Failed to fetch courses: ' + err.message);
      console.error('Error fetching courses:', err);
      // Final fallback to sample data
      setCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  };

  // Load course details
  const loadCourse = async (courseId) => {
    try {
      setLoading(true);
      // Use sample data for now
      const courseDetails = sampleCourses.find(course => course.id === courseId);
      setCurrentCourse(courseDetails);
      
      // Load course progress if user is a learner
      if (currentUser && userAttributes && 
          (userAttributes['custom:user_type'] === 'LEARNER' || 
           userAttributes['custom:user_type'] === 'STUDENT')) {
        await loadCourseProgress(courseId);
      }
      
      return courseDetails;
    } catch (err) {
      setError('Failed to load course: ' + err.message);
      console.error('Error loading course:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load course progress
  const loadCourseProgress = async (courseId) => {
    if (!currentUser) return;
    
    try {
      // Use sample enrollment data
      const enrollment = sampleEnrollments.find(e => 
        e.userId === 'current-user' && e.courseId === courseId
      );
      
      const progress = enrollment ? {
        progress: enrollment.progress,
        completedLessons: enrollment.completedLessons.length,
        enrolledAt: enrollment.enrolledAt
      } : null;
      
      setCourseProgress(prev => ({
        ...prev,
        [courseId]: progress
      }));
      return progress;
    } catch (err) {
      console.error('Error loading course progress:', err);
      return null;
    }
  };

  // Set current lesson
  const setActiveLesson = (lesson) => {
    setCurrentLesson(lesson);
  };

  // Mark lesson as completed
  const completeLesson = async (lessonId) => {
    if (!currentUser || !currentCourse) return;
    
    try {
      // For now, just update local state
      const currentProgress = courseProgress[currentCourse.id] || { completedLessons: 0, progress: 0 };
      const newCompletedLessons = currentProgress.completedLessons + 1;
      const newProgress = Math.min((newCompletedLessons / 10) * 100, 100); // Assume 10 lessons per course
      
      // Update local state
      setCourseProgress(prev => ({
        ...prev,
        [currentCourse.id]: {
          ...prev[currentCourse.id],
          completedLessons: newCompletedLessons,
          progress: newProgress
        }
      }));
      
      return true;
    } catch (err) {
      setError('Failed to mark lesson as completed: ' + err.message);
      console.error('Error completing lesson:', err);
      return false;
    }
  };

  // Effect to fetch courses when user changes
  useEffect(() => {
    fetchUserCourses();
  }, [currentUser, userAttributes]);

  // Refresh courses function
  const refreshCourses = () => {
    fetchUserCourses();
  };

  // Context value
  const value = {
    courses,
    currentCourse,
    currentLesson,
    courseProgress,
    loading,
    error,
    fetchUserCourses,
    refreshCourses,
    loadCourse,
    setActiveLesson,
    completeLesson
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;