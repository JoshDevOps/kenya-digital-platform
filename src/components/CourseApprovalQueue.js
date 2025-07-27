import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, MessageSquare, Clock, User } from 'lucide-react';
import { CourseService } from '../services/courseService';

const CourseApprovalQueue = () => {
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    loadPendingCourses();
  }, []);

  const loadPendingCourses = async () => {
    try {
      setLoading(true);
      // Load from localStorage for local development
      const allCourses = JSON.parse(localStorage.getItem('skillbridge_courses') || '[]');
      const pending = allCourses.filter(course => course.status === 'pending');
      setPendingCourses(pending);
    } catch (error) {
      console.error('Error loading pending courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (courseId, approved, notes = '') => {
    try {
      const allCourses = JSON.parse(localStorage.getItem('skillbridge_courses') || '[]');
      const updatedCourses = allCourses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            status: approved ? 'approved' : 'rejected',
            isPublished: approved,
            reviewNotes: notes,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Admin' // In production, use actual admin user
          };
        }
        return course;
      });
      
      localStorage.setItem('skillbridge_courses', JSON.stringify(updatedCourses));
      
      // Send notification to coach (in production, use real notification system)
      const course = allCourses.find(c => c.id === courseId);
      console.log(`Notification sent to ${course.instructorId}: Course "${course.title}" ${approved ? 'approved' : 'rejected'}`);
      
      loadPendingCourses();
      setSelectedCourse(null);
      setReviewNotes('');
      
      alert(`Course ${approved ? 'approved' : 'rejected'} successfully!`);
    } catch (error) {
      alert('Error updating course status: ' + error.message);
    }
  };

  const getQualityScore = (course) => {
    let score = 0;
    let maxScore = 0;

    // Title quality (20 points)
    maxScore += 20;
    if (course.title && course.title.length >= 10) score += 20;
    else if (course.title && course.title.length >= 5) score += 10;

    // Description quality (20 points)
    maxScore += 20;
    if (course.description && course.description.length >= 100) score += 20;
    else if (course.description && course.description.length >= 50) score += 10;

    // Thumbnail (15 points)
    maxScore += 15;
    if (course.thumbnail) score += 15;

    // Lessons (25 points)
    maxScore += 25;
    if (course.lessons && course.lessons.length >= 5) score += 25;
    else if (course.lessons && course.lessons.length >= 3) score += 15;
    else if (course.lessons && course.lessons.length >= 1) score += 10;

    // Lesson quality (20 points)
    maxScore += 20;
    if (course.lessons && course.lessons.every(l => l.title && l.description)) score += 20;
    else if (course.lessons && course.lessons.some(l => l.title && l.description)) score += 10;

    return Math.round((score / maxScore) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Course Approval Queue</h1>
          <p className="text-slate-600">Review and approve courses before they go live</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending Review</p>
                <p className="text-2xl font-bold text-slate-800">{pendingCourses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Avg Quality Score</p>
                <p className="text-2xl font-bold text-slate-800">
                  {pendingCourses.length > 0 
                    ? Math.round(pendingCourses.reduce((sum, course) => sum + getQualityScore(course), 0) / pendingCourses.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-xl">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Unique Coaches</p>
                <p className="text-2xl font-bold text-slate-800">
                  {new Set(pendingCourses.map(c => c.instructorId)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        {pendingCourses.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">All caught up!</h3>
            <p className="text-slate-600">No courses pending review at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {pendingCourses.map((course) => {
              const qualityScore = getQualityScore(course);
              
              return (
                <div key={course.id} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                        Pending Review
                      </span>
                      <span className={`text-sm font-bold ${getScoreColor(qualityScore)}`}>
                        {qualityScore}% Quality
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{course.shortDescription}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span>By {course.instructorId}</span>
                      <span>{course.lessons?.length || 0} lessons</span>
                      <span>${course.price || 0}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </button>
                    </div>
                    
                    <div className="mt-3 text-xs text-slate-500">
                      Submitted: {new Date(course.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Review Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">Review Course</h2>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Course Preview */}
                  <div>
                    <img 
                      src={selectedCourse.thumbnail} 
                      alt={selectedCourse.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedCourse.title}</h3>
                    <p className="text-slate-600 mb-4">{selectedCourse.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-slate-500">Price:</span>
                        <span className="ml-2 font-medium">${selectedCourse.price}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Level:</span>
                        <span className="ml-2 font-medium">{selectedCourse.level}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Category:</span>
                        <span className="ml-2 font-medium">{selectedCourse.category}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Lessons:</span>
                        <span className="ml-2 font-medium">{selectedCourse.lessons?.length || 0}</span>
                      </div>
                    </div>
                    
                    {selectedCourse.lessons && selectedCourse.lessons.length > 0 && (
                      <div>
                        <h4 className="font-medium text-slate-800 mb-2">Lessons:</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {selectedCourse.lessons.map((lesson, index) => (
                            <div key={lesson.id} className="bg-slate-50 p-3 rounded-lg">
                              <div className="font-medium text-sm">{index + 1}. {lesson.title}</div>
                              {lesson.description && (
                                <div className="text-xs text-slate-600 mt-1">{lesson.description}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Review Panel */}
                  <div>
                    <div className="bg-slate-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium text-slate-800 mb-3">Quality Assessment</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Title Quality:</span>
                          <span className={selectedCourse.title?.length >= 10 ? 'text-green-600' : 'text-red-600'}>
                            {selectedCourse.title?.length >= 10 ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Description Length:</span>
                          <span className={selectedCourse.description?.length >= 100 ? 'text-green-600' : 'text-red-600'}>
                            {selectedCourse.description?.length >= 100 ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Has Thumbnail:</span>
                          <span className={selectedCourse.thumbnail ? 'text-green-600' : 'text-red-600'}>
                            {selectedCourse.thumbnail ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sufficient Lessons:</span>
                          <span className={selectedCourse.lessons?.length >= 3 ? 'text-green-600' : 'text-red-600'}>
                            {selectedCourse.lessons?.length >= 3 ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span>Overall Score:</span>
                            <span className={getScoreColor(getQualityScore(selectedCourse))}>
                              {getQualityScore(selectedCourse)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Review Notes (optional)
                      </label>
                      <textarea
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Add feedback for the coach..."
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleApproval(selectedCourse.id, false, reviewNotes)}
                        className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                      
                      <button
                        onClick={() => handleApproval(selectedCourse.id, true, reviewNotes)}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseApprovalQueue;