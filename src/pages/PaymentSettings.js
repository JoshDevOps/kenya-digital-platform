import React, { useState } from 'react';
import { Card, Form, Button, Table, Badge, Alert } from 'react-bootstrap';
import { FaMobileAlt, FaCreditCard, FaPaypal } from 'react-icons/fa';

const PaymentSettings = () => {
  // Mock payment methods state
  const [paymentMethods, setPaymentMethods] = useState({
    mpesa: {
      enabled: true,
      businessNumber: '174379',
      accountNumber: 'KenyaDigital',
      apiKey: '****************************************',
      apiSecret: '************************',
    },
    card: {
      enabled: false,
      merchantId: '',
      apiKey: '',
    },
    paypal: {
      enabled: false,
      clientId: '',
      clientSecret: '',
    },
  });

  // Mock transaction history
  const [transactions, setTransactions] = useState([
    {
      id: 'MP123456789',
      date: '2023-06-15T10:30:00Z',
      amount: 500,
      method: 'mpesa',
      status: 'completed',
      customer: 'John Doe',
      item: 'Introduction to Digital Marketing',
    },
    {
      id: 'MP987654321',
      date: '2023-06-14T14:45:00Z',
      amount: 750,
      method: 'mpesa',
      status: 'completed',
      customer: 'Jane Smith',
      item: 'Mathematics: Algebra Basics',
    },
    {
      id: 'MP456789123',
      date: '2023-06-12T09:15:00Z',
      amount: 300,
      method: 'mpesa',
      status: 'completed',
      customer: 'Michael Johnson',
      item: 'Q&A Session: Digital Marketing Strategies',
    },
    {
      id: 'MP789123456',
      date: '2023-06-10T16:00:00Z',
      amount: 600,
      method: 'mpesa',
      status: 'failed',
      customer: 'Sarah Williams',
      item: 'Effective Public Speaking',
    },
  ]);

  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e, method) => {
    e.preventDefault();
    setSuccessMessage(`${method.charAt(0).toUpperCase() + method.slice(1)} payment settings updated successfully!`);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Handle payment method toggle
  const handleToggleMethod = (method) => {
    setPaymentMethods({
      ...paymentMethods,
      [method]: {
        ...paymentMethods[method],
        enabled: !paymentMethods[method].enabled,
      },
    });
  };

  // Handle input change
  const handleInputChange = (method, field, value) => {
    setPaymentMethods({
      ...paymentMethods,
      [method]: {
        ...paymentMethods[method],
        [field]: value,
      },
    });
  };

  return (
    <div>
      <h2 className="mb-4">Payment Settings</h2>
      
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}
      
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex align-items-center">
            <FaMobileAlt className="me-2 text-success" />
            <h5 className="mb-0">M-Pesa Integration</h5>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => handleSubmit(e, 'mpesa')}>
            <Form.Group className="mb-3">
              <Form.Check 
                type="switch"
                id="mpesa-toggle"
                label="Enable M-Pesa Payments"
                checked={paymentMethods.mpesa.enabled}
                onChange={() => handleToggleMethod('mpesa')}
              />
            </Form.Group>
            
            {paymentMethods.mpesa.enabled && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Business Number (Paybill/Till)</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={paymentMethods.mpesa.businessNumber}
                        onChange={(e) => handleInputChange('mpesa', 'businessNumber', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Account Number</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={paymentMethods.mpesa.accountNumber}
                        onChange={(e) => handleInputChange('mpesa', 'accountNumber', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>API Key</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={paymentMethods.mpesa.apiKey}
                        onChange={(e) => handleInputChange('mpesa', 'apiKey', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>API Secret</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={paymentMethods.mpesa.apiSecret}
                        onChange={(e) => handleInputChange('mpesa', 'apiSecret', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                
                <Button variant="success" type="submit">
                  Save M-Pesa Settings
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
      
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex align-items-center">
            <FaCreditCard className="me-2 text-primary" />
            <h5 className="mb-0">Credit/Debit Card Integration</h5>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => handleSubmit(e, 'card')}>
            <Form.Group className="mb-3">
              <Form.Check 
                type="switch"
                id="card-toggle"
                label="Enable Card Payments"
                checked={paymentMethods.card.enabled}
                onChange={() => handleToggleMethod('card')}
              />
            </Form.Group>
            
            {paymentMethods.card.enabled && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Merchant ID</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={paymentMethods.card.merchantId}
                        onChange={(e) => handleInputChange('card', 'merchantId', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>API Key</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={paymentMethods.card.apiKey}
                        onChange={(e) => handleInputChange('card', 'apiKey', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                
                <Button variant="primary" type="submit">
                  Save Card Settings
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
      
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex align-items-center">
            <FaPaypal className="me-2 text-info" />
            <h5 className="mb-0">PayPal Integration</h5>
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => handleSubmit(e, 'paypal')}>
            <Form.Group className="mb-3">
              <Form.Check 
                type="switch"
                id="paypal-toggle"
                label="Enable PayPal Payments"
                checked={paymentMethods.paypal.enabled}
                onChange={() => handleToggleMethod('paypal')}
              />
            </Form.Group>
            
            {paymentMethods.paypal.enabled && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Client ID</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={paymentMethods.paypal.clientId}
                        onChange={(e) => handleInputChange('paypal', 'clientId', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Client Secret</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={paymentMethods.paypal.clientSecret}
                        onChange={(e) => handleInputChange('paypal', 'clientSecret', e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                
                <Button variant="info" type="submit">
                  Save PayPal Settings
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
      
      <h4 className="mb-3">Recent Transactions</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>KSh {transaction.amount}</td>
              <td>
                {transaction.method === 'mpesa' && (
                  <Badge bg="success">M-Pesa</Badge>
                )}
                {transaction.method === 'card' && (
                  <Badge bg="primary">Card</Badge>
                )}
                {transaction.method === 'paypal' && (
                  <Badge bg="info">PayPal</Badge>
                )}
              </td>
              <td>
                {transaction.status === 'completed' ? (
                  <Badge bg="success">Completed</Badge>
                ) : (
                  <Badge bg="danger">Failed</Badge>
                )}
              </td>
              <td>{transaction.customer}</td>
              <td>{transaction.item}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentSettings;