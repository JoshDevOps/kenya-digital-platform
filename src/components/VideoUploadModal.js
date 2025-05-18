import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const VideoUploadModal = ({ show, handleClose, handleSave, editVideo = null }) => {
  const [title, setTitle] = useState(editVideo ? editVideo.title : '');
  const [description, setDescription] = useState(editVideo ? editVideo.description : '');
  const [isPaid, setIsPaid] = useState(editVideo ? editVideo.isPaid : false);
  const [price, setPrice] = useState(editVideo ? editVideo.price : 0);
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const videoData = {
      id: editVideo ? editVideo.id : Date.now(),
      title,
      description,
      isPaid,
      price: isPaid ? price : 0,
      file,
      thumbnail,
      uploadDate: new Date().toISOString(),
      views: editVideo ? editVideo.views : 0,
      duration: editVideo ? editVideo.duration : '00:00',
    };
    
    handleSave(videoData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editVideo ? 'Edit Video' : 'Upload New Video'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter video title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder="Enter video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          
          {!editVideo && (
            <Form.Group className="mb-3">
              <Form.Label>Video File</Form.Label>
              <Form.Control 
                type="file" 
                accept="video/*"
                onChange={(e) => setFile(e.target.files[0])}
                required={!editVideo}
              />
              <Form.Text className="text-muted">
                Maximum file size: 500MB
              </Form.Text>
            </Form.Group>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Thumbnail</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
            <Form.Text className="text-muted">
              Recommended size: 1280x720 pixels
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Check 
              type="checkbox" 
              label="This is paid content" 
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
            />
          </Form.Group>
          
          {isPaid && (
            <Form.Group className="mb-3">
              <Form.Label>Price (KSh)</Form.Label>
              <InputGroup>
                <InputGroup.Text>KSh</InputGroup.Text>
                <Form.Control 
                  type="number" 
                  min="0" 
                  step="50"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required={isPaid}
                />
              </InputGroup>
            </Form.Group>
          )}
          
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editVideo ? 'Save Changes' : 'Upload Video'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VideoUploadModal;