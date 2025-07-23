import React, { useState } from 'react';
import { Trophy, Target, Calendar, Clock, BookOpen, Award, TrendingUp, CheckCircle } from 'lucide-react';

const LearnerProgress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const learningStats = {
    totalHours: 47,
    coursesCompleted: 1,
    coursesInProgress: 2,
    certificatesEarned: 1,
    currentStreak: 7,
    longestStreak: 14,
    averageScore: 87,
    totalLessons: 64
  };

  const weeklyProgress = [
    { week: 'Week 1', hours: 8, lessons: 12 },
    { week: 'Week 2', hours: 12, lessons: 18 },
    { week: 'Week 3', hours: 6, lessons: 9 },
    { week: 'Week 4', hours: 10, lessons: 15 },
    { week: 'Week 5', hours: 11, lessons: 16 }
  ];

  const courseProgress = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Sarah Johnson',
      progress: 75,
      completedLessons: 18,
      totalLessons: 24,
      hoursSpent: 22,
      lastActivity: '2024-01-20',
      nextLesson: 'Email Marketing Automation',
      averageScore: 92,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'React Development Masterclass',
      instructor: 'Michael Chen',
      progress: 45,
      completedLessons: 16,
      totalLessons: 36,
      hoursSpent: 18,
      lastActivity: '2024-01-18',
      nextLesson: 'State Management with Redux',
      averageScore: 85,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Data Analytics with Python',
      instructor: 'Dr. Emily Rodriguez',
      progress: 100,
      completedLessons: 30,
      totalLessons: 30,
      hoursSpent: 25,
      lastActivity: '2024-01-15',
      nextLesson: 'Course Completed',
      averageScore: 94,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      completed: true,
      certificate: true
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course',
      icon: '🎓',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Learned for 7 consecutive days',
      icon: '🔥',
      earned: true,
      date: '2024-01-20'
    },
    {
      id: 3,
      title: 'High Achiever',
      description: 'Maintained 90+ average score',
      icon: '⭐',
      earned: true,
      date: '2024-01-18'
    },
    {
      id: 4,
      title: 'Speed Learner',
      description: 'Complete 5 lessons in one day',
      icon: '⚡',
      earned: false,
      date: null
    },
    {
      id: 5,
      title: 'Marathon Learner',
      description: 'Study for 50+ hours total',
      icon: '🏃',
      earned: false,
      date: null
    }
  ];

  const upcomingGoals = [
    {
      id: 1,
      title: 'Complete React Course',
      description: 'Finish React Development Masterclass',
      progress: 45,
      target: 100,
      deadline: '2024-02-15'
    },
    {
      id: 2,
      title: 'Study Streak',
      description: 'Maintain 14-day learning streak',
      progress: 7,
      target: 14,
      deadline: '2024-02-05'
    },
    {
      id: 3,
      title: 'Weekly Hours',
      description: 'Study 15 hours this week',
      progress: 8,
      target: 15,
      deadline: '2024-01-28'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
            <p className="text-gray-600">Track your learning journey and achievements</p>
          </div>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">{learningStats.totalHours}</p>
                <p className="text-sm text-blue-600">+5 this week</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{learningStats.coursesCompleted}</p>
                <p className="text-sm text-green-600">1 certificate</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">{learningStats.currentStreak}</p>
                <p className="text-sm text-orange-600">days</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">{learningStats.averageScore}%</p>
                <p className="text-sm text-purple-600">Excellent!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Learning Activity</h2>
          <div className="h-64 flex items-end space-x-4">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col space-y-1">
                  <div 
                    className="w-full bg-orange-600 rounded-t-lg transition-all duration-300 hover:bg-orange-700"
                    style={{ height: `${(week.hours / 15) * 100}%` }}
                  ></div>
                  <div 
                    className="w-full bg-blue-600 rounded-b-lg transition-all duration-300 hover:bg-blue-700"
                    style={{ height: `${(week.lessons / 20) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{week.week}</p>
                <p className="text-xs text-gray-500">{week.hours}h • {week.lessons} lessons</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-600 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Hours</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Lessons</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Progress</h2>
            <div className="space-y-6">
              {courseProgress.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        {course.certificate && (
                          <Award className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              course.completed ? 'bg-green-600' : 'bg-orange-600'
                            }`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span>{course.hoursSpent}h spent</span>
                        <span>Score: {course.averageScore}%</span>
                      </div>
                      
                      {!course.completed && (
                        <p className="text-sm text-gray-700 mt-2">
                          <strong>Next:</strong> {course.nextLesson}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals & Achievements */}
          <div className="space-y-8">
            {/* Current Goals */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Current Goals</h2>
              <div className="space-y-4">
                {upcomingGoals.map((goal) => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}/{goal.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`border rounded-lg p-4 ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-green-600 mt-1">
                            Earned on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {achievement.earned && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerProgress;