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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Connect, learn, and grow with fellow learners</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'discussions', name: 'Discussions', icon: '💬' },
              { id: 'study-groups', name: 'Study Groups', icon: '👥' },
              { id: 'mentors', name: 'Mentors', icon: '🎓' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div>
            <div className="mb-6">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>👥 {group.members} members</span>
                    <span>📅 {group.nextMeeting}</span>
                  </div>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-gray-600 text-sm">{mentor.expertise}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span>{mentor.rating}</span>
                  </div>
                  <span>{mentor.sessions} sessions</span>
                </div>

                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 rounded-full mr-2 ${mentor.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-600">
                    {mentor.available ? 'Available now' : 'Busy'}
                  </span>
                </div>

                <button
                  disabled={!mentor.available}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    mentor.available
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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