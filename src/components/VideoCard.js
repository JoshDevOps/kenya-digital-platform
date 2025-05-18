import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaPlay, FaLock } from 'react-icons/fa';

const VideoCard = ({ video, onPlay, onEdit, isAdmin = false }) => {
  return (
    <Card className="h-100">
      <div className="video-thumbnail">
        <Card.Img 
          variant="top" 
          src={video.thumbnail || 'https://via.placeholder.com/300x200?text=Video+Thumbnail'} 
          alt={video.title} 
        />
        <div className="overlay">
          {video.isPaid && !video.purchased ? (
            <FaLock size={40} color="white" />
          ) : (
            <FaPlay size={40} color="white" onClick={() => onPlay(video)} />
          )}
        </div>
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title>{video.title}</Card.Title>
          {video.isPaid && (
            <Badge bg="warning" text="dark">
              {video.price} KSh
            </Badge>
          )}
        </div>
        <Card.Text>{video.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Duration: {video.duration}</small>
          {isAdmin && (
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(video)}>
              Edit
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;