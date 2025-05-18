import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MPesaPaymentModal from '../components/MPesaPaymentModal';
import './react-bootstrap-mock';

// Mock functions
const mockClose = jest.fn();
const mockPaymentComplete = jest.fn();

describe('MPesaPaymentModal Component', () => {
  beforeEach(() => {
    mockClose.mockClear();
    mockPaymentComplete.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders payment information correctly', () => {
    render(
      <MPesaPaymentModal 
        show={true} 
        handleClose={mockClose} 
        amount={500} 
        itemName="Test Item" 
        onPaymentComplete={mockPaymentComplete} 
      />
    );
    
    // Check if payment information is rendered
    expect(screen.getByText('Pay KSh 500 for Test Item')).toBeInTheDocument();
    expect(screen.getByText('M-Pesa Payment')).toBeInTheDocument();
    expect(screen.getByText('You will receive an M-Pesa prompt on your phone')).toBeInTheDocument();
    expect(screen.getByLabelText('M-Pesa Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Pay Now')).toBeInTheDocument();
  });

  test('validates phone number format', async () => {
    render(
      <MPesaPaymentModal 
        show={true} 
        handleClose={mockClose} 
        amount={500} 
        itemName="Test Item" 
        onPaymentComplete={mockPaymentComplete} 
      />
    );
    
    // Enter invalid phone number
    const phoneInput = screen.getByLabelText('M-Pesa Phone Number');
    fireEvent.change(phoneInput, { target: { value: '12345' } });
    
    // Submit the form
    const submitButton = screen.getByText('Pay Now');
    fireEvent.click(submitButton);
    
    // Check if error message is displayed
    expect(screen.getByText('Please enter a valid Kenyan phone number')).toBeInTheDocument();
    
    // Enter valid phone number
    fireEvent.change(phoneInput, { target: { value: '0712345678' } });
    
    // Submit the form again
    fireEvent.click(submitButton);
    
    // Check if processing state is shown
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    
    // Fast-forward timers
    jest.advanceTimersByTime(3000);
    
    // Check if success message is shown
    expect(screen.getByText('Payment Successful!')).toBeInTheDocument();
    
    // Fast-forward timers again
    jest.advanceTimersByTime(2000);
    
    // Check if modal was closed and payment complete callback was called
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(mockPaymentComplete).toHaveBeenCalledTimes(1);
    expect(mockPaymentComplete.mock.calls[0][0]).toHaveProperty('transactionId');
    expect(mockPaymentComplete.mock.calls[0][0]).toHaveProperty('amount', 500);
    expect(mockPaymentComplete.mock.calls[0][0]).toHaveProperty('phoneNumber', '0712345678');
  });

  test('closes modal when close button is clicked', () => {
    render(
      <MPesaPaymentModal 
        show={true} 
        handleClose={mockClose} 
        amount={500} 
        itemName="Test Item" 
        onPaymentComplete={mockPaymentComplete} 
      />
    );
    
    // Click the close button
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    // Check if the close function was called
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});