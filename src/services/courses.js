import { API, graphqlOperation } from 'aws-amplify';
import { LIST_COURSES, GET_USER_ENROLLMENTS } from '../graphql/queries';
import { CREATE_COURSE, ENROLL_IN_COURSE } from '../graphql/mutations';

// Course service with localStorage fallback
export const getCoursesByOwner = async (ownerId) => {
  try {
    // Use localStorage for now
    const courses = JSON.parse(localStorage.getItem('skillbridge_courses') || '[]');
    return courses.filter(course => course.instructorId === ownerId);
  } catch (error) {
    console.error('Error fetching courses by owner:', error);
    return [];
  }
};

export const getCourseDetails = async (courseId) => {
  try {
    // Use localStorage for now
    const courses = JSON.parse(localStorage.getItem('skillbridge_courses') || '[]');
    return courses.find(course => course.id === courseId);
  } catch (error) {
    console.error('Error fetching course details:', error);
    return null;
  }
};

export const getUserCourseProgress = async (userId, courseId) => {
  try {
    // Use localStorage for now
    const enrollments = JSON.parse(localStorage.getItem('skillbridge_enrollments') || '[]');
    return enrollments.find(enrollment => enrollment.userId === userId && enrollment.courseId === courseId);
  } catch (error) {
    console.error('Error fetching course progress:', error);
    return null;
  }
};

export const markLessonCompleted = async (userId, lessonId) => {
  // This would be implemented with a separate mutation
  console.log('Mark lesson completed:', userId, lessonId);
  return true;
};

export const trackCourseProgress = async (progressData) => {
  // This would be implemented with a separate mutation
  console.log('Track course progress:', progressData);
  return true;
};