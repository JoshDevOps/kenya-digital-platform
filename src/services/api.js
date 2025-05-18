import { API, graphqlOperation } from 'aws-amplify';

// Videos
export const createVideo = async (videoData) => {
  const mutation = `
    mutation CreateVideo($input: CreateVideoInput!) {
      createVideo(input: $input) {
        id
        title
        description
        videoUrl
        thumbnailUrl
        duration
        isPaid
        price
        views
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: videoData }));
    return response.data.createVideo;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

export const updateVideo = async (videoData) => {
  const mutation = `
    mutation UpdateVideo($input: UpdateVideoInput!) {
      updateVideo(input: $input) {
        id
        title
        description
        videoUrl
        thumbnailUrl
        duration
        isPaid
        price
        views
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: videoData }));
    return response.data.updateVideo;
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
};

export const deleteVideo = async (videoId) => {
  const mutation = `
    mutation DeleteVideo($input: DeleteVideoInput!) {
      deleteVideo(input: $input) {
        id
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: { id: videoId } }));
    return response.data.deleteVideo;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

export const getVideosByOwner = async (ownerId) => {
  const query = `
    query GetVideosByOwner($ownerId: ID!) {
      getVideosByOwner(ownerId: $ownerId) {
        id
        title
        description
        videoUrl
        thumbnailUrl
        duration
        isPaid
        price
        views
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(query, { ownerId }));
    return response.data.getVideosByOwner;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Live Sessions
export const createLiveSession = async (sessionData) => {
  const mutation = `
    mutation CreateLiveSession($input: CreateLiveSessionInput!) {
      createLiveSession(input: $input) {
        id
        title
        description
        date
        time
        platform
        meetingLink
        isPaid
        price
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: sessionData }));
    return response.data.createLiveSession;
  } catch (error) {
    console.error('Error creating live session:', error);
    throw error;
  }
};

export const updateLiveSession = async (sessionData) => {
  const mutation = `
    mutation UpdateLiveSession($input: UpdateLiveSessionInput!) {
      updateLiveSession(input: $input) {
        id
        title
        description
        date
        time
        platform
        meetingLink
        isPaid
        price
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: sessionData }));
    return response.data.updateLiveSession;
  } catch (error) {
    console.error('Error updating live session:', error);
    throw error;
  }
};

export const deleteLiveSession = async (sessionId) => {
  const mutation = `
    mutation DeleteLiveSession($input: DeleteLiveSessionInput!) {
      deleteLiveSession(input: $input) {
        id
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: { id: sessionId } }));
    return response.data.deleteLiveSession;
  } catch (error) {
    console.error('Error deleting live session:', error);
    throw error;
  }
};

export const getLiveSessionsByOwner = async (ownerId) => {
  const query = `
    query GetLiveSessionsByOwner($ownerId: ID!) {
      getLiveSessionsByOwner(ownerId: $ownerId) {
        id
        title
        description
        date
        time
        platform
        meetingLink
        isPaid
        price
        createdAt
        updatedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(query, { ownerId }));
    return response.data.getLiveSessionsByOwner;
  } catch (error) {
    console.error('Error fetching live sessions:', error);
    throw error;
  }
};

// Payments
export const processPayment = async (paymentData) => {
  const mutation = `
    mutation ProcessPayment($input: PaymentInput!) {
      processPayment(input: $input) {
        id
        transactionId
        amount
        currency
        status
        paymentMethod
        phoneNumber
        purchaseDate
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: paymentData }));
    return response.data.processPayment;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export const getUserPurchases = async (userId) => {
  const query = `
    query GetUserPurchases($userId: ID!) {
      getUserPurchases(userId: $userId) {
        id
        transactionId
        amount
        currency
        status
        paymentMethod
        phoneNumber
        purchaseDate
        video {
          id
          title
        }
        liveSession {
          id
          title
        }
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(query, { userId }));
    return response.data.getUserPurchases;
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    throw error;
  }
};

// Analytics
export const recordVideoEngagement = async (engagementData) => {
  const mutation = `
    mutation RecordVideoEngagement($input: VideoEngagementInput!) {
      recordVideoEngagement(input: $input) {
        id
        videoId
        userId
        watchedDuration
        watchedPercentage
        completed
        lastWatchedAt
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: engagementData }));
    return response.data.recordVideoEngagement;
  } catch (error) {
    console.error('Error recording video engagement:', error);
    throw error;
  }
};

export const recordSessionAttendance = async (attendanceData) => {
  const mutation = `
    mutation RecordSessionAttendance($input: SessionAttendanceInput!) {
      recordSessionAttendance(input: $input) {
        id
        sessionId
        userId
        joinTime
        leaveTime
        duration
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(mutation, { input: attendanceData }));
    return response.data.recordSessionAttendance;
  } catch (error) {
    console.error('Error recording session attendance:', error);
    throw error;
  }
};

export const getVideoEngagementStats = async (videoId) => {
  const query = `
    query GetVideoEngagementStats($videoId: ID!) {
      getVideoEngagementStats(videoId: $videoId) {
        videoId
        totalViews
        uniqueViewers
        averageWatchPercentage
        completionRate
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(query, { videoId }));
    return response.data.getVideoEngagementStats;
  } catch (error) {
    console.error('Error fetching video engagement stats:', error);
    throw error;
  }
};

export const getSessionAttendanceStats = async (sessionId) => {
  const query = `
    query GetSessionAttendanceStats($sessionId: ID!) {
      getSessionAttendanceStats(sessionId: $sessionId) {
        sessionId
        totalAttendees
        averageDuration
      }
    }
  `;
  
  try {
    const response = await API.graphql(graphqlOperation(query, { sessionId }));
    return response.data.getSessionAttendanceStats;
  } catch (error) {
    console.error('Error fetching session attendance stats:', error);
    throw error;
  }
};