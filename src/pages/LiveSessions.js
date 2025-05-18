import React, { useState } from 'react';
import { Row, Col, Button, Card, Badge, Alert } from 'react-bootstrap';
import { FaPlus, FaVideo, FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import LiveSessionModal from '../components/LiveSessionModal';

const LiveSessions = () => {
  // Mock live sessions data
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Q&A Session: Digital Marketing Strategies',
      description: 'Join us for a live Q&A session about effective digital marketing strategies for small businesses.',
      date: '2023-06-20',
      time: '14:00',
      platform: 'zoom',
      meetingLink: 'https://zoom.us/j/123456789',
      isPaid: true,
      price: 300,
      createdAt: '2023-06-10T10:30:00Z',
    },
    {
      id: 2,
      title: 'Sunday Virtual Service',
      description: 'Weekly virtual church service with worship and sermon.',
      date: '2023-06-18',
      time: '09:00',
      platform: 'google-meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      isPaid: false,
      price: 0,
      createdAt: '2023-06-05T14:45:00Z',
    },
    {
      id: 3,
      title: 'Mathematics Tutoring: Calculus',
      description: 'Live tutoring session covering calculus concepts for college students.',
      date: '2023-06-22',
      time: '16:30',
      platform: 'zoom',
      meetingLink: 'https://zoom.us/j/987654321',
      isPaid: true,
      price: 500,
      createdAt: '2023-06-12T09:15:00Z',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editSession, setEditSession] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle session save (new or edit)
  const handleSaveSession = (sessionData) => {
    if (editSession) {
      // Update existing session
      setSessions(sessions.map(s => s.id === sessionData.id ? { ...s, ...sessionData } : s));
      setSuccessMessage('Live session updated successfully!');
    } else {
      // Add new session
      setSessions([...sessions, sessionData]);
      setSuccessMessage('Live session created successfully!');
    }
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Handle session edit
  const handleEditSession = (session) => {
    setEditSession(session);
    setShowModal(true);
  };

  // Handle session delete
  const handleDeleteSession = (sessionId) => {
    if (window.confirm('Are you sure you want to delete this live session?')) {
      setSessions(sessions.filter(s => s.id !== sessionId));
      setSuccessMessage('Live session deleted successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  // Close modal and reset edit session
  const handleCloseModal = () => {
    setShowModal(false);
    setEditSession(null);
  };

  // Sort sessions by date (upcoming first)
  const sortedSessions = [...sessions].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  // Separate upcoming and past sessions
  const now = new Date();
  const upcomingSessions = sortedSessions.filter(session => {
    const sessionDate = new Date(`${session.date}T${session.time}`);
    return sessionDate >= now;
  });
  
  const pastSessions = sortedSessions.filter(session => {
    const sessionDate = new Date(`${session.date}T${session.time}`);
    return sessionDate < now;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Live Sessions</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Create New Session
        </Button>
      </div>
      
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}
      
      <h4 className="mb-3">Upcoming Sessions</h4>
      {upcomingSessions.length > 0 ? (
        upcomingSessions.map(session => (
          <Card key={session.id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <h5 className="mb-0 me-2">{session.title}</h5>
                    {session.isPaid && (
                      <Badge bg="warning" text="dark">
                        KSh {session.price}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted mb-3">{session.description}</p>
                  <div className="d-flex align-items-center mb-2">
                    <FaVideo className="me-2 text-primary" />
                    <span>
                      {session.platform === 'zoom' ? 'Zoom' : 'Google Meet'} | 
                      {' '}{new Date(`${session.date}T${session.time}`).toLocaleDateString()} | 
                      {' '}{session.time}
                    </span>
                  </div>
                </div>
                <div>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    href={session.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt className="me-1" /> Join
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleEditSession(session)}
                  >
                    <FaEdit />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-muted">No upcoming sessions. Create a new session to get started!</p>
      )}
      
      {pastSessions.length > 0 && (
        <>
          <h4 className="mb-3 mt-5">Past Sessions</h4>
          {pastSessions.map(session => (
            <Card key={session.id} className="mb-3 bg-light">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <h5 className="mb-0 me-2">{session.title}</h5>
                      {session.isPaid && (
                        <Badge bg="secondary">
                          KSh {session.price}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted mb-3">{session.description}</p>
                    <div className="d-flex align-items-center mb-2">
                      <FaVideo className="me-2 text-secondary" />
                      <span>
                        {session.platform === 'zoom' ? 'Zoom' : 'Google Meet'} | 
                        {' '}{new Date(`${session.date}T${session.time}`).toLocaleDateString()} | 
                        {' '}{session.time}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
      
      <LiveSessionModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleSave={handleSaveSession}
        editSession={editSession}
      />
    </div>
  );
};

export default LiveSessions;