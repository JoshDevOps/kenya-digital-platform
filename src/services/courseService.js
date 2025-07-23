import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

// Course service for production-ready course management
export class CourseService {
  
  // Get all courses (with fallback to localStorage)
  static async getAllCourses() {
    try {
      // Try to get from localStorage first
      const localCourses = JSON.parse(localStorage.getItem('skillbridge_courses') || '[]');
      return localCourses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  // Get courses by instructor
  static async getCoursesByInstructor(instructorId) {
    try {
      const allCourses = await this.getAllCourses();
      return allCourses.filter(course => course.instructorId === instructorId);
    } catch (error) {
      console.error('Error fetching instructor courses:', error);
      return [];
    }
  }

  // Get single course
  static async getCourse(courseId) {
    try {
      const allCourses = await this.getAllCourses();
      return allCourses.find(course => course.id === courseId);
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }

  // Create new course
  static async createCourse(courseData, instructorId) {
    try {
      const newCourse = {
        ...courseData,
        id: uuidv4(),
        instructorId,
        enrollmentCount: 0,
        rating: 0,
        reviews: [],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to localStorage
      const existingCourses = await this.getAllCourses();
      existingCourses.push(newCourse);
      localStorage.setItem('skillbridge_courses', JSON.stringify(existingCourses));

      return newCourse;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  // Update course
  static async updateCourse(courseId, updates) {
    try {
      const allCourses = await this.getAllCourses();
      const courseIndex = allCourses.findIndex(course => course.id === courseId);
      
      if (courseIndex === -1) {
        throw new Error('Course not found');
      }

      allCourses[courseIndex] = {
        ...allCourses[courseIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('skillbridge_courses', JSON.stringify(allCourses));
      return allCourses[courseIndex];
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  // Delete course
  static async deleteCourse(courseId) {
    try {
      const allCourses = await this.getAllCourses();
      const filteredCourses = allCourses.filter(course => course.id !== courseId);
      localStorage.setItem('skillbridge_courses', JSON.stringify(filteredCourses));
      return true;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }

  // Upload file to S3
  static async uploadFile(file, folder = 'courses') {
    try {
      const fileExtension = file.name.split('.').pop();
      const fileName = `${folder}/${uuidv4()}.${fileExtension}`;
      
      const result = await Storage.put(fileName, file, {
        contentType: file.type,
        level: 'public'
      });
      
      const fileUrl = await Storage.get(result.key, { level: 'public' });
      return fileUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Get user enrollments
  static async getUserEnrollments(userId) {
    try {
      const enrollments = JSON.parse(localStorage.getItem('skillbridge_enrollments') || '[]');
      return enrollments.filter(enrollment => enrollment.userId === userId);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      return [];
    }
  }

  // Enroll user in course
  static async enrollInCourse(userId, courseId) {
    try {
      const enrollment = {
        id: uuidv4(),
        userId,
        courseId,
        progress: 0,
        completedLessons: [],
        enrolledAt: new Date().toISOString(),
        completedAt: null
      };

      const existingEnrollments = await this.getUserEnrollments(userId);
      
      // Check if already enrolled
      if (existingEnrollments.some(e => e.courseId === courseId)) {
        throw new Error('Already enrolled in this course');
      }

      const allEnrollments = JSON.parse(localStorage.getItem('skillbridge_enrollments') || '[]');
      allEnrollments.push(enrollment);
      localStorage.setItem('skillbridge_enrollments', JSON.stringify(allEnrollments));

      // Update course enrollment count
      const allCourses = await this.getAllCourses();
      const courseIndex = allCourses.findIndex(course => course.id === courseId);
      if (courseIndex !== -1) {
        allCourses[courseIndex].enrollmentCount += 1;
        localStorage.setItem('skillbridge_courses', JSON.stringify(allCourses));
      }

      return enrollment;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  }

  // Update progress
  static async updateProgress(enrollmentId, progress, completedLessons = []) {
    try {
      const allEnrollments = JSON.parse(localStorage.getItem('skillbridge_enrollments') || '[]');
      const enrollmentIndex = allEnrollments.findIndex(e => e.id === enrollmentId);
      
      if (enrollmentIndex === -1) {
        throw new Error('Enrollment not found');
      }

      allEnrollments[enrollmentIndex] = {
        ...allEnrollments[enrollmentIndex],
        progress,
        completedLessons,
        updatedAt: new Date().toISOString()
      };

      if (progress >= 100) {
        allEnrollments[enrollmentIndex].completedAt = new Date().toISOString();
      }

      localStorage.setItem('skillbridge_enrollments', JSON.stringify(allEnrollments));
      return allEnrollments[enrollmentIndex];
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }
}