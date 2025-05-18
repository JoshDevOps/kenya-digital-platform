import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoCard from '../components/VideoCard';
import './react-bootstrap-mock';

// Mock functions
const mockPlay = jest.fn();
const mockEdit = jest.fn();

// Mock video data
const mockVideo = {
  id: 1,
  title: 'Test Video',
  description: 'This is a test video description',
  thumbnail: 'https://via.placeholder.com/300x200',
  duration: '10:30',
  views: 100,
  isPaid: false,
  price: 0,
  uploadDate: '2023-06-10T10:30:00Z',
};

const mockPaidVideo = {
  ...mockVideo,
  isPaid: true,
  price: 500,
  purchased: false,
};

const mockPurchasedVideo = {
  ...mockPaidVideo,
  purchased: true,
};

describe('VideoCard Component', () => {
  beforeEach(() => {
    mockPlay.mockClear();
    mockEdit.mockClear();
  });

  test('renders video information correctly', () => {
    render(<VideoCard video={mockVideo} onPlay={mockPlay} onEdit={mockEdit} />);
    
    // Check if video information is rendered
    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('This is a test video description')).toBeInTheDocument();
    expect(screen.getByText('Duration: 10:30')).toBeInTheDocument();
  });

  test('shows edit button when isAdmin is true', () => {
    render(<VideoCard video={mockVideo} onPlay={mockPlay} onEdit={mockEdit} isAdmin={true} />);
    
    // Check if edit button is rendered
    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument();
    
    // Click the edit button
    fireEvent.click(editButton);
    
    // Check if the edit function was called with the video
    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith(mockVideo);
  });

  test('does not show edit button when isAdmin is false', () => {
    render(<VideoCard video={mockVideo} onPlay={mockPlay} onEdit={mockEdit} isAdmin={false} />);
    
    // Check if edit button is not rendered
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('shows price badge for paid videos', () => {
    render(<VideoCard video={mockPaidVideo} onPlay={mockPlay} onEdit={mockEdit} />);
    
    // Check if price badge is rendered
    expect(screen.getByText('500 KSh')).toBeInTheDocument();
  });

  test('calls onPlay when play button is clicked for free or purchased videos', () => {
    // For free video
    const { rerender } = render(<VideoCard video={mockVideo} onPlay={mockPlay} onEdit={mockEdit} />);
    
    // Simulate clicking on the play button (by clicking the thumbnail overlay)
    const overlay = document.querySelector('.overlay');
    fireEvent.click(overlay);
    
    // Check if the play function was called with the video
    expect(mockPlay).toHaveBeenCalledTimes(1);
    expect(mockPlay).toHaveBeenCalledWith(mockVideo);
    
    mockPlay.mockClear();
    
    // For purchased video
    rerender(<VideoCard video={mockPurchasedVideo} onPlay={mockPlay} onEdit={mockEdit} />);
    
    // Simulate clicking on the play button again
    fireEvent.click(overlay);
    
    // Check if the play function was called with the purchased video
    expect(mockPlay).toHaveBeenCalledTimes(1);
    expect(mockPlay).toHaveBeenCalledWith(mockPurchasedVideo);
  });
});