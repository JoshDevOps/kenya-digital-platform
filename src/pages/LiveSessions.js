import React, { useState } from 'react';
import { Plus, Video, Calendar, Users, Clock, Edit, Trash2, ExternalLink, Play, Settings } from 'lucide-react';

const LiveSessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Digital Marketing Q&A Session',
      description: 'Interactive Q&A session covering the latest digital marketing trends and strategies.',
      date: '2024-01-28',
      time: '14:00',
      duration: 60,
      platform: 'zoom',
      meetingLink: 'https://zoom.us/j/123456789',
      isPaid: true,
      price: 25,
      maxAttendees: 50,
      registeredCount: 32,
      status: 'scheduled',
      category: 'Marketing'
    },
    {
      id: 2,
      title: 'React Development Workshop',
      description: 'Hands-on workshop building a complete React application from scratch.',
      date: '2024-01-30',
      time: '16:00',
      duration: 120,
      platform: 'zoom',
      meetingLink: 'https://zoom.us/j/987654321',
      isPaid: true,
      price: 49,
      maxAttendees: 30,
      registeredCount: 28,
      status: 'scheduled',
      category: 'Development'
    },
    {
      id: 3,
      title: 'Content Strategy Masterclass',
      description: 'Learn how to create compelling content that drives engagement and conversions.',
      date: '2024-01-25',
      time: '10:00',
      duration: 90,
      platform: 'zoom',
      meetingLink: 'https://zoom.us/j/456789123',
      isPaid: false,
      price: 0,
      maxAttendees: 100,
      registeredCount: 67,
      status: 'completed',
      category: 'Content'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [viewMode, setViewMode] = useState('upcoming');

  const now = new Date();
  const upcomingSessions = sessions.filter(session => {
    const sessionDate = new Date(`${session.date}T${session.time}`);
    return sessionDate >= now;
  });

  const pastSessions = sessions.filter(session => {
    const sessionDate = new Date(`${session.date}T${session.time}`);
    return sessionDate < now;
  });

  const handleDeleteSession = (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      setSessions(sessions.filter(s => s.id !== sessionId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date, time) => {
    const sessionDate = new Date(`${date}T${time}`);
    return sessionDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Sessions</h1>
            <p className="text-gray-600">Schedule and manage your live training sessions</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Schedule Session
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingSessions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Registered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.reduce((sum, session) => sum + session.registeredCount, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{pastSessions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length)}m
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8 w-fit">
          <button
            onClick={() => setViewMode('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'upcoming' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setViewMode('past')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'past' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past ({pastSessions.length})
          </button>
        </div>

        {/* Sessions List */}
        <div className="space-y-6">
          {(viewMode === 'upcoming' ? upcomingSessions : pastSessions).map((session) => (
            <div key={session.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{session.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                      {session.isPaid && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">
                          ${session.price}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{session.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(session.date, session.time)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {formatTime(session.time)} ({session.duration}min)
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {session.registeredCount}/{session.maxAttendees} registered
                      </div>
                      <div className="flex items-center">
                        <Video className="w-4 h-4 mr-2" />
                        {session.platform === 'zoom' ? 'Zoom' : 'Google Meet'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    {viewMode === 'upcoming' && (
                      <>
                        <button 
                          onClick={() => window.open(session.meetingLink, '_blank')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteSession(session.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar for Registration */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Registration Progress</span>
                    <span>{Math.round((session.registeredCount / session.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(session.registeredCount / session.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(viewMode === 'upcoming' ? upcomingSessions : pastSessions).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Video className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {viewMode} sessions
            </h3>
            <p className="text-gray-600 mb-6">
              {viewMode === 'upcoming' 
                ? 'Schedule your first live session to engage with your students'
                : 'Your completed sessions will appear here'
              }
            </p>
            {viewMode === 'upcoming' && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Schedule Session
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSessions;