import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

// Upload video to S3
export const uploadVideo = async (file, onProgress) => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `videos/${uuidv4()}.${fileExtension}`;
    
    const result = await Storage.put(fileName, file, {
      contentType: file.type,
      progressCallback: (progress) => {
        const percentCompleted = Math.round((progress.loaded / progress.total) * 100);
        if (onProgress) {
          onProgress(percentCompleted);
        }
      },
    });
    
    // Get the public URL
    const url = await Storage.get(result.key);
    
    return {
      key: result.key,
      url,
    };
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

// Upload thumbnail to S3
export const uploadThumbnail = async (file) => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `thumbnails/${uuidv4()}.${fileExtension}`;
    
    const result = await Storage.put(fileName, file, {
      contentType: file.type,
    });
    
    // Get the public URL
    const url = await Storage.get(result.key);
    
    return {
      key: result.key,
      url,
    };
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    throw error;
  }
};

// Delete file from S3
export const deleteFile = async (key) => {
  try {
    await Storage.remove(key);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Generate video thumbnail from video file
export const generateThumbnail = async (videoFile) => {
  return new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      video.crossOrigin = 'anonymous';
      video.muted = true;
      
      // Take screenshot at 25% of the video duration
      video.addEventListener('loadeddata', () => {
        video.currentTime = video.duration * 0.25;
      });
      
      video.addEventListener('seeked', () => {
        // Create canvas and draw video frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          const thumbnailFile = new File([blob], `thumbnail-${Date.now()}.jpg`, { type: 'image/jpeg' });
          resolve(thumbnailFile);
        }, 'image/jpeg', 0.95);
      });
      
      video.addEventListener('error', (error) => {
        reject(error);
      });
      
      // Load the video
      video.load();
    } catch (error) {
      reject(error);
    }
  });
};

// Get video duration
export const getVideoDuration = async (videoFile) => {
  return new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      
      video.addEventListener('loadedmetadata', () => {
        // Format duration as MM:SS
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        resolve(formattedDuration);
      });
      
      video.addEventListener('error', (error) => {
        reject(error);
      });
      
      // Load the video
      video.load();
    } catch (error) {
      reject(error);
    }
  });
};