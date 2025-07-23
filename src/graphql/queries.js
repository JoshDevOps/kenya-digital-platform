import { gql } from '@apollo/client';

export const LIST_COURSES = gql`
  query ListCourses($limit: Int, $nextToken: String) {
    listCourses(limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        instructorId
        price
        duration
        level
        category
        thumbnail
        enrollmentCount
        rating
        isPublished
        createdAt
      }
      nextToken
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      title
      description
      instructorId
      instructor {
        id
        firstName
        lastName
        email
      }
      price
      duration
      level
      category
      thumbnail
      videoUrl
      materials
      enrollmentCount
      rating
      isPublished
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_ENROLLMENTS = gql`
  query GetUserEnrollments($userId: ID!) {
    getUserEnrollments(userId: $userId) {
      id
      userId
      courseId
      course {
        id
        title
        description
        thumbnail
        instructorId
        duration
        level
      }
      progress
      completedLessons
      enrolledAt
      completedAt
    }
  }
`;

export const LIST_SESSIONS = gql`
  query ListSessions($courseId: ID) {
    listSessions(courseId: $courseId) {
      id
      courseId
      title
      description
      scheduledAt
      duration
      meetingUrl
      isLive
      attendees
      createdAt
    }
  }
`;

export const GET_SESSION = gql`
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      courseId
      title
      description
      scheduledAt
      duration
      meetingUrl
      isLive
      attendees
      createdAt
    }
  }
`;