import React, { useState } from 'react';
import { Row, Col, Button, Card, Tab, Nav, Alert } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import VideoCard from '../components/VideoCard';
import VideoUploadModal from '../components/VideoUploadModal';

const ContentManagement = () => {
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
      uploadDate: '2023-05-20T16:00:00Z',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');

  // Filter videos based on search term and active tab
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'free') return matchesSearch && !video.isPaid;
    if (activeTab === 'paid') return matchesSearch && video.isPaid;
    
    return false;
  });

  // Handle video save (new or edit)
  const handleSaveVideo = (videoData) => {
    if (editVideo) {
      // Update existing video
      setVideos(videos.map(v => v.id === videoData.id ? { ...v, ...videoData } : v));
      setSuccessMessage('Video updated successfully!');
    } else {
      // Add new video
      setVideos([...videos, videoData]);
      setSuccessMessage('Video uploaded successfully!');
    }
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Handle video edit
  const handleEditVideo = (video) => {
    setEditVideo(video);
    setShowModal(true);
  };

  // Handle video play
  const handlePlayVideo = (video) => {
    // In a real app, this would navigate to a video player page or open a player modal
    alert(`Playing video: ${video.title}`);
  };

  // Close modal and reset edit video
  const handleCloseModal = () => {
    setShowModal(false);
    setEditVideo(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Content Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Upload New Video
        </Button>
      </div>
      
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}
      
      <Card className="mb-4">
        <Card.Body>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Row>
              <Col sm={8}>
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="all">All Videos ({videos.length})</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="free">Free Videos ({videos.filter(v => !v.isPaid).length})</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="paid">Paid Videos ({videos.filter(v => v.isPaid).length})</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={4}>
                <div className="position-relative">
                  <FaSearch className="position-absolute" style={{ top: '10px', left: '10px' }} />
                  <input
                    type="text"
                    className="form-control ps-4"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
      
      {filteredVideos.length > 0 ? (
        <Row>
          {filteredVideos.map(video => (
            <Col key={video.id} md={4} className="mb-4">
              <VideoCard 
                video={video} 
                onPlay={handlePlayVideo} 
                onEdit={handleEditVideo}
                isAdmin={true}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">No videos found. Upload your first video to get started!</p>
        </div>
      )}
      
      <VideoUploadModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleSave={handleSaveVideo}
        editVideo={editVideo}
      />
    </div>
  );
};

export default ContentManagement;