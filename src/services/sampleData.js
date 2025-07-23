// Sample data for testing real AWS integration
export const sampleCourses = [
  {
    id: 'course-1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, state, and props. Perfect for beginners starting their React journey.',
    instructorId: 'instructor-1',
    price: 49.99,
    duration: 8,
    level: 'BEGINNER',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    materials: ['React Documentation', 'Code Examples', 'Practice Exercises'],
    enrollmentCount: 156,
    rating: 4.8,
    isPublished: true
  },
  {
    id: 'course-2',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Includes authentication and API design.',
    instructorId: 'instructor-1',
    price: 79.99,
    duration: 12,
    level: 'INTERMEDIATE',
    category: 'Backend Development',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    materials: ['Node.js Guide', 'API Templates', 'Database Schemas'],
    enrollmentCount: 89,
    rating: 4.6,
    isPublished: true
  },
  {
    id: 'course-3',
    title: 'AWS Cloud Fundamentals',
    description: 'Master AWS services including EC2, S3, Lambda, and RDS. Learn cloud architecture and deployment strategies.',
    instructorId: 'instructor-2',
    price: 99.99,
    duration: 16,
    level: 'INTERMEDIATE',
    category: 'Cloud Computing',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    materials: ['AWS Documentation', 'Architecture Diagrams', 'Hands-on Labs'],
    enrollmentCount: 234,
    rating: 4.9,
    isPublished: true
  },
  {
    id: 'course-4',
    title: 'Python Data Science',
    description: 'Analyze data with Python using pandas, numpy, and matplotlib. Includes machine learning basics with scikit-learn.',
    instructorId: 'instructor-2',
    price: 89.99,
    duration: 14,
    level: 'BEGINNER',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_3mb.mp4',
    materials: ['Jupyter Notebooks', 'Datasets', 'Python Libraries Guide'],
    enrollmentCount: 178,
    rating: 4.7,
    isPublished: true
  }
];

export const sampleSessions = [
  {
    id: 'session-1',
    courseId: 'course-1',
    title: 'React Components Deep Dive',
    description: 'Live session covering advanced component patterns and best practices',
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    duration: 90,
    meetingUrl: 'https://meet.google.com/sample-link-1',
    isLive: false,
    attendees: []
  },
  {
    id: 'session-2',
    courseId: 'course-2',
    title: 'Building REST APIs',
    description: 'Hands-on session for creating robust REST APIs with Node.js',
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
    duration: 120,
    meetingUrl: 'https://meet.google.com/sample-link-2',
    isLive: false,
    attendees: []
  }
];

export const sampleEnrollments = [
  {
    id: 'enrollment-1',
    userId: 'current-user',
    courseId: 'course-1',
    progress: 65,
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-3'],
    enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    completedAt: null
  },
  {
    id: 'enrollment-2',
    userId: 'current-user',
    courseId: 'course-3',
    progress: 30,
    completedLessons: ['lesson-1'],
    enrolledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    completedAt: null
  }
];