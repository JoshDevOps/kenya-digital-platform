import { API, graphqlOperation } from 'aws-amplify';

// Create a new course
export const createCourse = async (courseData) => {
  const mutation = `
    mutation CreateCourse($input: CreateCourseInput!) {
      createCourse(input: $input) {
        id
        title
        description
        level
        duration
        isPaid
        price
        coverImageUrl
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: courseData }));
    return response.data.createCourse;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Update an existing course
export const updateCourse = async (courseData) => {
  const mutation = `
    mutation UpdateCourse($input: UpdateCourseInput!) {
      updateCourse(input: $input) {
        id
        title
        description
        level
        duration
        isPaid
        price
        coverImageUrl
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: courseData }));
    return response.data.updateCourse;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Delete a course
export const deleteCourse = async (courseId) => {
  const mutation = `
    mutation DeleteCourse($input: DeleteCourseInput!) {
      deleteCourse(input: $input) {
        id
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: { id: courseId } }));
    return response.data.deleteCourse;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

// Get courses by owner
export const getCoursesByOwner = async (ownerId) => {
  const query = `
    query GetCoursesByOwner($ownerId: ID!) {
      getCoursesByOwner(ownerId: $ownerId) {
        id
        title
        description
        level
        duration
        isPaid
        price
        coverImageUrl
        createdAt
        updatedAt
        modules {
          id
          title
          position
        }
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(query, { ownerId }));
    return response.data.getCoursesByOwner;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get course details with modules and lessons
export const getCourseDetails = async (courseId) => {
  const query = `
    query GetCourse($id: ID!) {
      getCourse(id: $id) {
        id
        title
        description
        level
        duration
        isPaid
        price
        coverImageUrl
        createdAt
        updatedAt
        modules {
          id
          title
          description
          position
          lessons {
            id
            title
            description
            type
            contentUrl
            duration
            position
          }
        }
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(query, { id: courseId }));
    return response.data.getCourse;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

// Add module to course
export const addModuleToCourse = async (moduleData) => {
  const mutation = `
    mutation CreateModule($input: CreateModuleInput!) {
      createModule(input: $input) {
        id
        courseId
        title
        description
        position
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: moduleData }));
    return response.data.createModule;
  } catch (error) {
    console.error('Error adding module:', error);
    throw error;
  }
};

// Add lesson to module
export const addLessonToModule = async (lessonData) => {
  const mutation = `
    mutation CreateLesson($input: CreateLessonInput!) {
      createLesson(input: $input) {
        id
        moduleId
        title
        description
        type
        contentUrl
        duration
        position
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: lessonData }));
    return response.data.createLesson;
  } catch (error) {
    console.error('Error adding lesson:', error);
    throw error;
  }
};

// Track course progress
export const trackCourseProgress = async (progressData) => {
  const mutation = `
    mutation TrackCourseProgress($input: CourseProgressInput!) {
      trackCourseProgress(input: $input) {
        id
        userId
        courseId
        completedLessons
        progress
        lastAccessedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: progressData }));
    return response.data.trackCourseProgress;
  } catch (error) {
    console.error('Error tracking course progress:', error);
    throw error;
  }
};

// Get user course progress
export const getUserCourseProgress = async (userId, courseId) => {
  const query = `
    query GetUserCourseProgress($userId: ID!, $courseId: ID!) {
      getUserCourseProgress(userId: $userId, courseId: $courseId) {
        id
        userId
        courseId
        completedLessons
        progress
        lastAccessedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(query, { userId, courseId }));
    return response.data.getUserCourseProgress;
  } catch (error) {
    console.error('Error fetching user course progress:', error);
    throw error;
  }
};

// Mark lesson as completed
export const markLessonCompleted = async (userId, lessonId) => {
  const mutation = `
    mutation MarkLessonCompleted($input: LessonCompletionInput!) {
      markLessonCompleted(input: $input) {
        id
        userId
        lessonId
        completedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { 
      input: { 
        userId, 
        lessonId,
        completedAt: new Date().toISOString()
      } 
    }));
    return response.data.markLessonCompleted;
  } catch (error) {
    console.error('Error marking lesson as completed:', error);
    throw error;
  }
};