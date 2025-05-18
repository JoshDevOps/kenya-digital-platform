import { recordVideoEngagement, recordSessionAttendance } from './api';

// Track video engagement
export const trackVideoEngagement = async (videoId, userId, duration, percentage, completed) => {
  try {
    const engagementData = {
      videoId,
      watchedDuration: duration,
      watchedPercentage: percentage,
      completed,
    };
    
    await recordVideoEngagement(engagementData);
  } catch (error) {
    console.error('Error tracking video engagement:', error);
    // Don't throw error to prevent disrupting user experience
  }
};

// Track video view
export const trackVideoView = async (videoId, userId) => {
  try {
    // Initial view tracking with 0 duration
    const engagementData = {
      videoId,
      watchedDuration: 0,
      watchedPercentage: 0,
      completed: false,
    };
    
    await recordVideoEngagement(engagementData);
  } catch (error) {
    console.error('Error tracking video view:', error);
    // Don't throw error to prevent disrupting user experience
  }
};

// Track session attendance
export const trackSessionJoin = async (sessionId, userId) => {
  try {
    const attendanceData = {
      sessionId,
      joinTime: new Date().toISOString(),
    };
    
    await recordSessionAttendance(attendanceData);
    
    // Return the join time for later use when tracking leave
    return attendanceData.joinTime;
  } catch (error) {
    console.error('Error tracking session join:', error);
    // Don't throw error to prevent disrupting user experience
    return new Date().toISOString();
  }
};

// Track session leave
export const trackSessionLeave = async (sessionId, userId, joinTime) => {
  try {
    const leaveTime = new Date().toISOString();
    const joinDateTime = new Date(joinTime);
    const leaveDateTime = new Date(leaveTime);
    
    // Calculate duration in seconds
    const durationSeconds = Math.floor((leaveDateTime - joinDateTime) / 1000);
    
    const attendanceData = {
      sessionId,
      joinTime,
      leaveTime,
      duration: durationSeconds,
    };
    
    await recordSessionAttendance(attendanceData);
  } catch (error) {
    console.error('Error tracking session leave:', error);
    // Don't throw error to prevent disrupting user experience
  }
};

// Video player event tracking
export class VideoPlayerTracker {
  constructor(videoId, userId) {
    this.videoId = videoId;
    this.userId = userId;
    this.startTime = null;
    this.lastUpdateTime = null;
    this.totalDuration = 0;
    this.videoDuration = 0;
    this.checkpointInterval = 10; // seconds
    this.checkpointTimer = null;
    this.completed = false;
  }
  
  // Initialize tracker
  init(videoDuration) {
    this.videoDuration = videoDuration;
    this.startTime = new Date();
    this.lastUpdateTime = this.startTime;
    
    // Track initial view
    trackVideoView(this.videoId, this.userId);
    
    // Set up checkpoint timer
    this.checkpointTimer = setInterval(() => {
      this.checkpoint();
    }, this.checkpointInterval * 1000);
  }
  
  // Track play event
  onPlay() {
    if (!this.startTime) {
      this.startTime = new Date();
    }
    this.lastUpdateTime = new Date();
  }
  
  // Track pause event
  onPause() {
    if (this.startTime) {
      const now = new Date();
      this.totalDuration += (now - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = null;
    }
  }
  
  // Track seek event
  onSeek() {
    if (this.lastUpdateTime) {
      const now = new Date();
      this.totalDuration += (now - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = now;
    }
  }
  
  // Track end event
  onEnded() {
    this.completed = true;
    this.checkpoint();
    this.cleanup();
  }
  
  // Periodic checkpoint to update engagement data
  checkpoint() {
    if (this.lastUpdateTime) {
      const now = new Date();
      this.totalDuration += (now - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = now;
    }
    
    const percentage = this.videoDuration > 0 ? 
      Math.min(100, (this.totalDuration / this.videoDuration) * 100) : 0;
    
    trackVideoEngagement(
      this.videoId,
      this.userId,
      Math.round(this.totalDuration),
      Math.round(percentage),
      this.completed
    );
  }
  
  // Clean up resources
  cleanup() {
    if (this.checkpointTimer) {
      clearInterval(this.checkpointTimer);
      this.checkpointTimer = null;
    }
  }
}