// Mock Step Functions service for development
// In production, this would use AWS SDK v3 or AWS Amplify API

export class StepFunctionsService {
  static async startCourseCreation(courseData) {
    try {
      console.log('StepFunctionsService: Starting course creation workflow');
      console.log('Course data:', courseData);
      console.log('Environment variables:', {
        stateMachineArn: process.env.REACT_APP_COURSE_CREATION_STATE_MACHINE_ARN,
        region: process.env.REACT_APP_AWS_REGION
      });
      
      // Check if we have the required environment variables
      if (!process.env.REACT_APP_COURSE_CREATION_STATE_MACHINE_ARN) {
        console.warn('Step Functions ARN not found, using mock implementation');
        
        // Mock implementation for development
        const mockExecutionArn = `arn:aws:states:us-east-1:123456789012:execution:course-creation:${courseData.id}-${Date.now()}`;
        
        console.log('Mock: Starting course creation workflow for:', courseData.title);
        
        // Simulate workflow execution
        setTimeout(() => {
          console.log('Mock: Course creation workflow completed');
        }, 3000);
        
        return {
          success: true,
          executionArn: mockExecutionArn,
          message: 'Course creation workflow started successfully (Mock - No ARN configured)'
        };
      }
      
      // In a real implementation, this would use AWS SDK
      // For now, return mock success
      const mockExecutionArn = `arn:aws:states:us-east-1:637423178245:execution:course-creation:${courseData.id}-${Date.now()}`;
      
      console.log('Mock: Starting course creation workflow for:', courseData.title);
      
      return {
        success: true,
        executionArn: mockExecutionArn,
        message: 'Course creation workflow started successfully (Mock)'
      };
    } catch (error) {
      console.error('Error starting course creation workflow:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to start course creation workflow'
      };
    }
  }

  static async startCourseApproval(courseId, adminId) {
    try {
      const mockExecutionArn = `arn:aws:states:us-east-1:123456789012:execution:course-approval:${courseId}-${Date.now()}`;
      console.log('Mock: Starting course approval workflow for:', courseId);
      
      return {
        success: true,
        executionArn: mockExecutionArn,
        message: 'Course approval workflow started successfully (Mock)'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to start course approval workflow'
      };
    }
  }

  static async getExecutionStatus(executionArn) {
    try {
      // Mock execution status
      const mockStatus = Math.random() > 0.5 ? 'RUNNING' : 'SUCCEEDED';
      
      return {
        success: true,
        status: mockStatus,
        startDate: new Date(Date.now() - 60000),
        stopDate: mockStatus === 'SUCCEEDED' ? new Date() : null,
        input: { courseId: 'mock-course-id' },
        output: mockStatus === 'SUCCEEDED' ? { status: 'success', message: 'Course processed successfully' } : null
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get execution status'
      };
    }
  }

  static async listExecutions(stateMachineArn, maxResults = 10) {
    try {
      return {
        success: true,
        executions: [
          {
            executionArn: 'arn:aws:states:us-east-1:123456789012:execution:course-creation:mock-1',
            name: 'course-creation-mock-1',
            status: 'SUCCEEDED',
            startDate: new Date(Date.now() - 120000),
            stopDate: new Date(Date.now() - 60000)
          }
        ]
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to list executions'
      };
    }
  }

  static async stopExecution(executionArn, cause = 'User requested stop') {
    try {
      console.log('Mock: Stopping execution:', executionArn);
      return {
        success: true,
        message: 'Execution stopped successfully (Mock)'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to stop execution'
      };
    }
  }
}