import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ReactPlayer from 'react-player';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import MPesaPaymentModal from '../components/MPesaPaymentModal';
import { VideoPlayerTracker } from '../services/analytics';
import { processPayment } from '../services/api';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { currentUser, userAttributes } = useAuth();
  const playerRef = useRef(null);
  
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [analyticsTracker, setAnalyticsTracker] = useState(null);
  
  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // In a real implementation, this would fetch the video from the API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockVideo = {
            id: videoId,
            title: 'Introduction to Digital Marketing',
            description: 'Learn the basics of digital marketing and how to get started.',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            thumbnailUrl: 'https://via.placeholder.com/1280x720?text=Digital+Marketing',
            duration: '00:45',
            isPaid: true,
            price: 500,
            views: 120,
            owner: {
              id: '123',
              firstName: 'John',
              lastName: 'Doe',
            },
          };
          
          setVideo(mockVideo);
          setLoading(false);
          
          // Check if user has purchased this video
          // In a real implementation, this would check the user's purchases
          setHasPurchased(false);
        }, 1000);
      } catch (error) {
        setError('Failed to load video. Please try again.');
        setLoading(false);
      }
    };
    
    fetchVideo();
  }, [videoId]);
  
  // Initialize analytics tracker
  useEffect(() => {
    if (video && currentUser && hasPurchased) {
      const tracker = new VideoPlayerTracker(videoId, currentUser.username);
      setAnalyticsTracker(tracker);
      
      return () => {
        if (tracker) {
          tracker.cleanup();
        }
      };
    }
  }, [video, currentUser, hasPurchased, videoId]);
  
  // Handle player events
  const handleReady = () => {
    if (analyticsTracker && playerRef.current) {
      const duration = playerRef.current.getDuration();
      analyticsTracker.init(duration);
    }
  };
  
  const handlePlay = () => {
    if (analyticsTracker) {
      analyticsTracker.onPlay();
    }
  };
  
  const handlePause = () => {
    if (analyticsTracker) {
      analyticsTracker.onPause();
    }
  };
  
  const handleEnded = () => {
    if (analyticsTracker) {
      analyticsTracker.onEnded();
    }
  };
  
  const handleSeek = () => {
    if (analyticsTracker) {
      analyticsTracker.onSeek();
    }
  };
  
  // Handle payment completion
  const handlePaymentComplete = async (paymentDetails) => {
    try {
      // In a real implementation, this would call the API to process the payment
      // and update the user's purchases
      await processPayment({
        videoId,
        amount: video.price,
        phoneNumber: paymentDetails.phoneNumber,
      });
      
      setHasPurchased(true);
    } catch (error) {
      setError('Failed to process payment. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }
  
  if (!video) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Video not found.</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {video.isPaid && !hasPurchased ? (
          <div className="relative bg-gray-800 rounded-t-lg aspect-video flex items-center justify-center">
            <img 
              src={video.thumbnailUrl} 
              alt={video.title} 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <FaLock className="text-5xl mb-4" />
              <h2 className="text-2xl font-bold mb-2">Premium Content</h2>
              <p className="mb-4">Purchase this video to unlock access</p>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md font-medium"
              >
                Pay KSh {video.price} to Unlock
              </button>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-black rounded-t-lg">
            <ReactPlayer
              ref={playerRef}
              url={video.videoUrl}
              width="100%"
              height="100%"
              controls
              onReady={handleReady}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onSeek={handleSeek}
            />
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>{video.views} views</span>
            <span className="mx-2">•</span>
            <span>Duration: {video.duration}</span>
            {video.isPaid && (
              <>
                <span className="mx-2">•</span>
                <span className="text-primary-600 font-medium">Premium Content</span>
              </>
            )}
          </div>
          
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{video.description}</p>
          </div>
          
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900">Instructor</h2>
            <p className="mt-2 text-gray-600">
              {video.owner.firstName} {video.owner.lastName}
            </p>
          </div>
        </div>
      </div>
      
      {showPaymentModal && (
        <MPesaPaymentModal
          show={showPaymentModal}
          handleClose={() => setShowPaymentModal(false)}
          amount={video.price}
          itemName={video.title}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default VideoPlayer;