import { API, graphqlOperation } from 'aws-amplify';
import { LIST_COURSES, GET_USER_ENROLLMENTS } from '../graphql/queries';
import { CREATE_COURSE, ENROLL_IN_COURSE } from '../graphql/mutations';

// Course service with GraphQL integration
export const getCoursesByOwner = async (ownerId) => {
  try {
    const result = await API.graphql(graphqlOperation(LIST_COURSES, { limit: 100 }));
    const allCourses = result.data.listCourses.items || [];
    return allCourses.filter(course => course.instructorId === ownerId);
  } catch (error) {
    console.error('Error fetching courses by owner:', error);
    return [];
  }
};

export const getCourseDetails = async (courseId) => {
  try {
    const result = await API.graphql(graphqlOperation(LIST_COURSES, { limit: 100 }));
    const allCourses = result.data.listCourses.items || [];
    return allCourses.find(course => course.id === courseId);
  } catch (error) {
    console.error('Error fetching course details:', error);
    return null;
  }
};

export const getUserCourseProgress = async (userId, courseId) => {
  try {
    const result = await API.graphql(graphqlOperation(GET_USER_ENROLLMENTS, { userId }));
    const enrollments = result.data.getUserEnrollments || [];
    return enrollments.find(enrollment => enrollment.courseId === courseId);
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