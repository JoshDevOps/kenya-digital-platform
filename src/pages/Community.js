import React, { useState } from 'react';
import DiscussionForum from '../components/DiscussionForum';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 'react', name: 'React Fundamentals' },
    { id: 'python', name: 'Python for Beginners' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'data-science', name: 'Data Science Basics' }
  ];

  const studyGroups = [
    {
      id: 1,
      name: 'React Study Group',
      members: 45,
      description: 'Weekly meetups to discuss React concepts and projects',
      nextMeeting: 'Tomorrow 7:00 PM',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Python Beginners Circle',
      members: 32,
      description: 'Support group for Python beginners to share challenges and solutions',
      nextMeeting: 'Friday 6:00 PM',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Digital Marketing Pros',
      members: 28,
      description: 'Advanced discussions on digital marketing strategies and trends',
      nextMeeting: 'Sunday 3:00 PM',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Jane Wanjiku',
      expertise: 'Data Science & AI',
      rating: 4.9,
      sessions: 150,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      available: true
    },
    {
      id: 2,
      name: 'Michael Ochieng',
      expertise: 'Full Stack Development',
      rating: 4.8,
      sessions: 120,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      available: false
    },
    {
      id: 3,
      name: 'Sarah Kimani',
      expertise: 'Digital Marketing',
      rating: 4.9,
      sessions: 95,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
            Community
          </h1>
          <p className="text-slate-600 text-lg">Connect, learn, and grow with fellow learners</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-2">
            <nav className="flex space-x-2">
              {[
                { id: 'discussions', name: 'Discussions', icon: '💬' },
                { id: 'study-groups', name: 'Study Groups', icon: '👥' },
                { id: 'mentors', name: 'Mentors', icon: '🎓' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div>
            <div className="mb-6">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-3 border border-white/30 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white/80 transition-all duration-300 text-slate-700"
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <DiscussionForum 
              courseId={selectedCourse}
              courseName={courses.find(c => c.id === selectedCourse)?.name || 'All Courses'}
            />
          </div>
        )}

        {/* Study Groups Tab */}
        {activeTab === 'study-groups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studyGroups.map((group) => (
              <div key={group.id} className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/90">
                <div className="relative overflow-hidden">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-purple-700 transition-colors duration-300">{group.name}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{group.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{group.members}</div>
                      <div className="text-xs text-slate-500">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-slate-800">{group.nextMeeting}</div>
                      <div className="text-xs text-slate-500">Next Meeting</div>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="group bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/90">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white ${mentor.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-purple-700 transition-colors duration-300">{mentor.name}</h3>
                    <p className="text-slate-600 text-sm font-medium">{mentor.expertise}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span className="text-lg font-bold text-slate-800">{mentor.rating}</span>
                    </div>
                    <div className="text-xs text-slate-500">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-800">{mentor.sessions}</div>
                    <div className="text-xs text-slate-500">Sessions</div>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <span className={`text-sm font-medium ${
                    mentor.available ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {mentor.available ? '✓ Available now' : '• Busy'}
                  </span>
                </div>

                <button
                  disabled={!mentor.available}
                  className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    mentor.available
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {mentor.available ? 'Book Session' : 'Unavailable'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;