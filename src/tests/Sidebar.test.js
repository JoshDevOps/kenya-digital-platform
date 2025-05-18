import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// Mock function for logout
const mockLogout = jest.fn();

// Wrapper component to provide router context
const SidebarWithRouter = ({ onLogout }) => (
  <BrowserRouter>
    <Sidebar onLogout={onLogout} />
  </BrowserRouter>
);

describe('Sidebar Component', () => {
  beforeEach(() => {
    mockLogout.mockClear();
  });

  test('renders all navigation links', () => {
    render(<SidebarWithRouter onLogout={mockLogout} />);
    
    // Check if all navigation links are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Content Management')).toBeInTheDocument();
    expect(screen.getByText('Live Sessions')).toBeInTheDocument();
    expect(screen.getByText('Payment Settings')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Student View')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('calls logout function when logout link is clicked', () => {
    render(<SidebarWithRouter onLogout={mockLogout} />);
    
    // Click the logout link
    fireEvent.click(screen.getByText('Logout'));
    
    // Check if the logout function was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});