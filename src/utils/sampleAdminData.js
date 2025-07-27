// Sample data for admin pages
export const createSampleCourses = () => {
  const sampleCourses = [
    {
      id: 'course-1',
      title: 'Advanced React Development',
      description: 'Learn advanced React patterns, hooks, and performance optimization techniques.',
      shortDescription: 'Master advanced React concepts and build scalable applications.',
      price: 99,
      level: 'ADVANCED',
      category: 'Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      lessons: [
        { id: 'l1', title: 'Advanced Hooks', description: 'Custom hooks and advanced patterns' },
        { id: 'l2', title: 'Performance Optimization', description: 'React.memo, useMemo, useCallback' },
        { id: 'l3', title: 'State Management', description: 'Context API and Redux patterns' }
      ],
      instructorId: 'coach1@example.com',
      enrollmentCount: 45,
      rating: 4.8,
      status: 'pending',
      isPublished: false,
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'course-2', 
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to digital marketing including SEO, social media, and content marketing.',
      shortDescription: 'Master digital marketing strategies and grow your online presence.',
      price: 79,
      level: 'INTERMEDIATE',
      category: 'Digital Marketing',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      lessons: [
        { id: 'l4', title: 'SEO Fundamentals', description: 'Search engine optimization basics' },
        { id: 'l5', title: 'Social Media Strategy', description: 'Building effective social campaigns' },
        { id: 'l6', title: 'Content Marketing', description: 'Creating engaging content' }
      ],
      instructorId: 'coach2@example.com',
      enrollmentCount: 78,
      rating: 4.6,
      status: 'pending',
      isPublished: false,
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'course-3',
      title: 'Python Data Science',
      description: 'Learn data science with Python, pandas, numpy, and machine learning basics.',
      shortDescription: 'Analyze data and build ML models with Python.',
      price: 120,
      level: 'BEGINNER',
      category: 'Data Science',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      lessons: [
        { id: 'l7', title: 'Python Basics', description: 'Python fundamentals for data science' },
        { id: 'l8', title: 'Data Analysis with Pandas', description: 'Working with datasets' },
        { id: 'l9', title: 'Machine Learning Intro', description: 'Basic ML concepts and algorithms' }
      ],
      instructorId: 'coach3@example.com',
      enrollmentCount: 32,
      rating: 4.9,
      status: 'approved',
      isPublished: true,
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Store in localStorage if not exists
  const existing = localStorage.getItem('skillbridge_courses');
  if (!existing) {
    localStorage.setItem('skillbridge_courses', JSON.stringify(sampleCourses));
  }
  
  return sampleCourses;
};

export const initializeAdminData = () => {
  createSampleCourses();
  console.log('Sample admin data initialized');
};