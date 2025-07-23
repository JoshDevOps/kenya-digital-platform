// GraphQL mutations for AWS AppSync

export const CREATE_COURSE = `
  mutation CreateCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
      id
      title
      description
      instructorId
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

export const UPDATE_COURSE = `
  mutation UpdateCourse($input: UpdateCourseInput!) {
    updateCourse(input: $input) {
      id
      title
      description
      price
      duration
      level
      category
      thumbnail
      videoUrl
      materials
      isPublished
      updatedAt
    }
  }
`;

export const ENROLL_IN_COURSE = `
  mutation EnrollInCourse($courseId: ID!) {
    enrollInCourse(courseId: $courseId) {
      id
      userId
      courseId
      progress
      enrolledAt
    }
  }
`;

export const UPDATE_PROGRESS = `
  mutation UpdateProgress($enrollmentId: ID!, $progress: Float!, $completedLessons: [String]) {
    updateProgress(enrollmentId: $enrollmentId, progress: $progress, completedLessons: $completedLessons) {
      id
      progress
      completedLessons
    }
  }
`;

export const CREATE_SESSION = `
  mutation CreateSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      id
      courseId
      title
      description
      scheduledAt
      duration
      meetingUrl
      isLive
      createdAt
    }
  }
`;