import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Register from '../pages/Register';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the AuthContext
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    signUp: jest.fn().mockImplementation((username, email, password, firstName, lastName, userType) => {
      // Validate username is not in email format
      if (username.includes('@')) {
        throw new Error('Username cannot be in email format');
      }
      return Promise.resolve();
    }),
  }),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

const renderRegisterComponent = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Register Component', () => {
  test('renders register form', () => {
    renderRegisterComponent();
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  test('shows error when username is in email format', async () => {
    renderRegisterComponent();
    
    // Fill in the form with email format username
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByLabelText(/I agree to the/i));
    
    // Submit the form
    fireEvent.click(screen.getByText('Create Account'));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('Username cannot be in email format')).toBeInTheDocument();
    });
  });

  test('allows registration with valid username (not email format)', async () => {
    renderRegisterComponent();
    
    // Fill in the form with valid username
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByLabelText(/I agree to the/i));
    
    // Submit the form
    fireEvent.click(screen.getByText('Create Account'));
    
    // No error message should be shown for username format
    await waitFor(() => {
      expect(screen.queryByText('Username cannot be in email format')).not.toBeInTheDocument();
    });
  });
});