import React, { useState } from 'react';
import { Row, Col, Card, Tab, Nav, Button } from 'react-bootstrap';
import { FaSearch, FaPlay, FaLock } from 'react-icons/fa';
import VideoCard from '../components/VideoCard';
import MPesaPaymentModal from '../components/MPesaPaymentModal';

const StudentView = () => {
  // Mock videos data
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Introduction to Digital Marketing',
      description: 'Learn the basics of digital marketing and how to get started.',
      thumbnail: 'https://via.placeholder.com/300x200?text=Digital+Marketing',
      duration: '45:30',
      views: 120,
      isPaid: true,
      price: 500,
      purchased: false,
      uploadDate: '2023-06-10T10:30:00Z',
    },
    {
      id: 2,
      title: 'Social Media Strategy for Churches',
      description: 'Effective strategies for churches to engage with their congregation on social media.',
      thumbnail: 'https://via.placeholder.com/300x200?text=Church+Social+Media',
      duration: '32:15',
      views: 85,
      isPaid: false,
      price: 0,
      purchased: true,
      uploadDate: '2023-06-05T14:45:00Z',
    },
    {
      id: 3,
      title: 'Mathematics: Algebra Basics',
      description: 'A comprehensive guide to basic algebra concepts for high school students.',
      thumbnail: 'https://via.placeholder.com/300x200?text=Algebra+Basics',
      duration: '58:20',
      views: 210,
      isPaid: true,
      price: 750,
      purchased: true,
      uploadDate: '2023-05-28T09:15:00Z',
    },
    {
      id: 4,
      title: 'Effective Public Speaking',
      description: 'Tips and techniques to improve your public speaking skills.',
      thumbnail: 'https://via.placeholder.com/300x200?text=Public+Speaking',
      duration: '41:05',
      views: 95,
      isPaid: true,
      price: 600,
      purchased: false,
      uploadDate: '2023-05-20T16:00:00Z',
    },
  ]);

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
      purchased: false,
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
      purchased: true,
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
      purchased: true,
      createdAt: '2023-06-12T09:15:00Z',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter videos based on search term and active tab
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'free') return matchesSearch && !video.isPaid;
    if (activeTab === 'purchased') return matchesSearch && video.purchased;
    
    return false;
  });

  // Handle video play
  const handlePlayVideo = (video) => {
    if (video.isPaid && !video.purchased) {
      setSelectedItem({
        type: 'video',
        id: video.id,
        title: video.title,
        price: video.price
      });
      setShowPaymentModal(true);
    } else {
      // In a real app, this would navigate to a video player page or open a player modal
      alert(`Playing video: ${video.title}`);
    }
  };

  // Handle session join
  const handleJoinSession = (session) => {
    if (session.isPaid && !session.purchased) {
      setSelectedItem({
        type: 'session',
        id: session.id,
        title: session.title,
        price: session.price
      });
      setShowPaymentModal(true);
    } else {
      // In a real app, this would open the meeting link
      window.open(session.meetingLink, '_blank');
    }
  };

  // Handle payment completion
  const handlePaymentComplete = (paymentDetails) => {
    if (selectedItem.type === 'video') {
      // Update video purchased status
      setVideos(videos.map(video => 
        video.id === selectedItem.id ? { ...video, purchased: true } : video
      ));
    } else if (selectedItem.type === 'session') {
      // Update session purchased status
      setSessions(sessions.map(session => 
        session.id === selectedItem.id ? { ...session, purchased: true } : session
      ));
    }
    
    setSelectedItem(null);
  };

  return (
    <div>
      <h2 className="mb-4">Learning Portal</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Row>
              <Col sm={8}>
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="all">All Content</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="free">Free Content</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="purchased">My Purchased Content</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={4}>
                <div className="position-relative">
                  <FaSearch className="position-absolute" style={{ top: '10px', left: '10px' }} />
                  <input
                    type="text"
                    className="form-control ps-4"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
      
      <h4 className="mb-3">Videos</h4>
      {filteredVideos.length > 0 ? (
        <Row>
          {filteredVideos.map(video => (
            <Col key={video.id} md={4} className="mb-4">
              <VideoCard 
                video={video} 
                onPlay={handlePlayVideo}
                isAdmin={false}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-4">
          <p className="text-muted">No videos found matching your criteria.</p>
        </div>
      )}
      
      <h4 className="mb-3 mt-5">Upcoming Live Sessions</h4>
      {sessions.filter(session => {
        const sessionDate = new Date(`${session.date}T${session.time}`);
        return sessionDate >= new Date();
      }).length > 0 ? (
        sessions.filter(session => {
          const sessionDate = new Date(`${session.date}T${session.time}`);
          return sessionDate >= new Date();
        }).map(session => (
          <Card key={session.id} className="mb-3">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5>{session.title}</h5>
                  <p className="text-muted">{session.description}</p>
                  <p>
                    <strong>Date:</strong> {new Date(`${session.date}T${session.time}`).toLocaleDateString()} at {session.time}
                    <br />
                    <strong>Platform:</strong> {session.platform === 'zoom' ? 'Zoom' : 'Google Meet'}
                  </p>
                </Col>
                <Col md={4} className="d-flex flex-column justify-content-center align-items-end">
                  {session.isPaid && !session.purchased ? (
                    <>
                      <div className="mb-2">KSh {session.price}</div>
                      <Button 
                        variant="warning" 
                        onClick={() => handleJoinSession(session)}
                      >
                        <FaLock className="me-2" /> Purchase Access
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="success" 
                      onClick={() => handleJoinSession(session)}
                    >
                      <FaPlay className="me-2" /> Join Session
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="text-center py-4">
          <p className="text-muted">No upcoming live sessions found.</p>
        </div>
      )}
      
      {showPaymentModal && selectedItem && (
        <MPesaPaymentModal 
          show={showPaymentModal}
          handleClose={() => setShowPaymentModal(false)}
          amount={selectedItem.price}
          itemName={selectedItem.title}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default StudentView;