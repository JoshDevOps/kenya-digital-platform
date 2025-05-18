import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaMobileAlt } from 'react-icons/fa';

const MPesaPaymentModal = ({ show, handleClose, amount, itemName, onPaymentComplete }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone number (simple validation for Kenya phone numbers)
    if (!phoneNumber.match(/^(?:254|\+254|0)?(7[0-9]{8})$/)) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }
    
    setError('');
    setIsProcessing(true);
    
    // Simulate M-Pesa API call
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      
      // After showing success message, close modal and notify parent
      setTimeout(() => {
        handleClose();
        onPaymentComplete({
          transactionId: 'MP' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          amount,
          phoneNumber,
          timestamp: new Date().toISOString()
        });
      }, 2000);
    }, 3000);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>M-Pesa Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!success ? (
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <FaMobileAlt size={50} className="text-success mb-3" />
              <h5>Pay KSh {amount} for {itemName}</h5>
              <p className="text-muted">You will receive an M-Pesa prompt on your phone</p>
            </div>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>M-Pesa Phone Number</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="e.g. 0712345678" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                disabled={isProcessing}
              />
              <Form.Text className="text-muted">
                Enter the phone number registered with M-Pesa
              </Form.Text>
            </Form.Group>
            
            <div className="d-grid gap-2">
              <Button 
                variant="success" 
                type="submit"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </div>
          </Form>
        ) : (
          <div className="text-center py-4">
            <div className="mb-4">
              <div className="bg-success text-white rounded-circle d-inline-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-check-lg" style={{ fontSize: '3rem' }}></i>
              </div>
            </div>
            <h4>Payment Successful!</h4>
            <p className="text-muted">Thank you for your purchase</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MPesaPaymentModal;