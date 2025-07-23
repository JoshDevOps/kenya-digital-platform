import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { 
  getCoursesByOwner, 
  getCourseDetails, 
  getUserCourseProgress,
  markLessonCompleted,
  trackCourseProgress
} from '../services/courses';
import { getUserPurchases } from '../services/api';

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
      
      // If user is a coach, fetch created courses
      if (userAttributes && userAttributes['custom:user_type'] === 'COACH') {
        userCourses = await getCoursesByOwner(currentUser.username);
      } else {
        // For learners, fetch enrolled courses (purchased courses)
        const purchases = await getUserPurchases(currentUser.username);
        const coursePurchases = purchases.filter(p => p.course);
        
        // Get full course details for each purchased course
        userCourses = await Promise.all(
          coursePurchases.map(async (purchase) => {
            const course = await getCourseDetails(purchase.course.id);
            return course;
          })
        );
      }
      
      setCourses(userCourses);
    } catch (err) {
      setError('Failed to fetch courses: ' + err.message);
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load course details
  const loadCourse = async (courseId) => {
    try {
      setLoading(true);
      const courseDetails = await getCourseDetails(courseId);
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
      const progress = await getUserCourseProgress(currentUser.username, courseId);
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
      // Mark the lesson as completed
      await markLessonCompleted(currentUser.username, lessonId);
      
      // Update course progress
      if (currentCourse) {
        // Count total lessons in the course
        let totalLessons = 0;
        let completedLessons = 0;
        
        currentCourse.modules.forEach(module => {
          totalLessons += module.lessons.length;
        });
        
        // Add the newly completed lesson
        completedLessons = (courseProgress[currentCourse.id]?.completedLessons || 0) + 1;
        
        // Calculate progress percentage
        const progress = (completedLessons / totalLessons) * 100;
        
        // Update progress in backend
        await trackCourseProgress({
          userId: currentUser.username,
          courseId: currentCourse.id,
          completedLessons,
          progress
        });
        
        // Update local state
        setCourseProgress(prev => ({
          ...prev,
          [currentCourse.id]: {
            ...prev[currentCourse.id],
            completedLessons,
            progress
          }
        }));
      }
      
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

  // Context value
  const value = {
    courses,
    currentCourse,
    currentLesson,
    courseProgress,
    loading,
    error,
    fetchUserCourses,
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