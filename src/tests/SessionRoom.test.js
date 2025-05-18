import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SessionRoom from '../pages/SessionRoom';
import { AuthProvider } from '../contexts/AuthContext';

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  ...jest.requireActual('../contexts/AuthContext'),
  useAuth: () => ({
    currentUser: { username: 'testuser' },
    userAttributes: { 'custom:user_type': 'STUDENT' },
    loading: false
  })
}));

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ sessionId: '123' }),
  useNavigate: () => jest.fn()
}));

describe('SessionRoom Component', () => {
  test('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/session/123']}>
        <AuthProvider>
          <Routes>
            <Route path="/session/:sessionId" element={<SessionRoom />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  
  test('renders session details after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/session/123']}>
        <AuthProvider>
          <Routes>
            <Route path="/session/:sessionId" element={<SessionRoom />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );
    
    // Wait for the mock data to load
    await waitFor(() => {
      expect(screen.getByText('Live Coaching Session')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Interactive coaching session with Q&A.')).toBeInTheDocument();
    expect(screen.getByText('2023-12-15 at 14:00')).toBeInTheDocument();
    expect(screen.getByText('Zoom')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Join Session')).toBeInTheDocument();
  });
});