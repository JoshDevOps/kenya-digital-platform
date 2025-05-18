import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';

const SessionRoom = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentUser, userAttributes } = useAuth();
  
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch session data
  useEffect(() => {
    const fetchSession = async () => {
      try {
        // In a real implementation, this would fetch the session from the API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockSession = {
            id: sessionId,
            title: 'Live Coaching Session',
            description: 'Interactive coaching session with Q&A.',
            date: '2023-12-15',
            time: '14:00',
            platform: 'Zoom',
            meetingLink: 'https://zoom.us/j/123456789',
            isPaid: true,
            price: 1000,
            owner: {
              id: '123',
              firstName: 'John',
              lastName: 'Doe',
            },
          };
          
          setSession(mockSession);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to load session. Please try again.');
        setLoading(false);
      }
    };
    
    fetchSession();
  }, [sessionId]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Session not found.</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">{session.title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {session.date} at {session.time}
          </p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{session.description}</dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Platform</dt>
              <dd className="mt-1 text-sm text-gray-900">{session.platform}</dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Instructor</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {session.owner.firstName} {session.owner.lastName}
              </dd>
            </div>
          </dl>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <a
            href={session.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Join Session
          </a>
        </div>
      </div>
    </div>
  );
};

export default SessionRoom;