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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
              Learning Progress
            </h1>
            <p className="text-slate-600 text-lg">Track your learning journey and celebrate achievements</p>
          </div>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-3 border border-white/30 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/80 transition-all duration-300 text-slate-700"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Hours</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{learningStats.totalHours}</p>
                <p className="text-sm text-blue-600 font-medium">+5 this week</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{learningStats.coursesCompleted}</p>
                <p className="text-sm text-green-600 font-medium">1 certificate</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Current Streak</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{learningStats.currentStreak}</p>
                <p className="text-sm text-orange-600 font-medium">days</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Avg Score</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{learningStats.averageScore}%</p>
                <p className="text-sm text-purple-600 font-medium">Excellent!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-6">Weekly Learning Activity</h2>
          <div className="h-64 flex items-end space-x-4">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col space-y-1">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-2xl transition-all duration-300 hover:from-purple-700 hover:to-blue-600 shadow-lg"
                    style={{ height: `${(week.hours / 15) * 100}%` }}
                  ></div>
                  <div 
                    className="w-full bg-gradient-to-t from-green-600 to-emerald-500 rounded-b-2xl transition-all duration-300 hover:from-green-700 hover:to-emerald-600 shadow-lg"
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
              <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded mr-2"></div>
              <span className="text-sm text-slate-600 font-medium">Hours</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded mr-2"></div>
              <span className="text-sm text-slate-600 font-medium">Lessons</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Course Progress */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-6">Course Progress</h2>
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
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 shadow-sm ${
                              course.completed ? 'bg-gradient-to-r from-green-600 to-emerald-500' : 'bg-gradient-to-r from-purple-600 to-blue-500'
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
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-6">Current Goals</h2>
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
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-500 h-3 rounded-full transition-all duration-300 shadow-sm"
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-6">Achievements</h2>
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`border rounded-2xl p-6 transition-all duration-300 ${
                      achievement.earned 
                        ? 'border-green-200/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50 shadow-lg' 
                        : 'border-slate-200/50 bg-slate-50/50'
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