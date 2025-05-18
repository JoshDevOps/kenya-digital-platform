import { Auth } from 'aws-amplify';

// Mock AWS Amplify Auth
jest.mock('aws-amplify', () => ({
  Auth: {
    signUp: jest.fn(),
  },
}));

describe('AuthContext signUp function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signUp function should convert userType to string and add clientMetadata', async () => {
    // Import the actual function we want to test
    const { signUp } = require('../contexts/AuthContext').useAuth();
    
    // Mock implementation for Auth.signUp
    Auth.signUp.mockResolvedValueOnce({ user: { username: 'testuser' } });
    
    // Call the signUp function directly
    await signUp('testuser', 'test@example.com', 'password123', 'John', 'Doe', 'COACH');
    
    // Verify the function was called with the correct parameters
    expect(Auth.signUp).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
      attributes: {
        email: 'test@example.com',
        given_name: 'John',
        family_name: 'Doe',
        'custom:user_type': 'COACH',
      },
      clientMetadata: {
        'custom:user_type': 'String'
      }
    });
  });

  test('signUp function should validate userType parameter', async () => {
    // Import the actual function we want to test
    const { signUp } = require('../contexts/AuthContext').useAuth();
    
    // Expect the function to throw an error for invalid user type
    await expect(
      signUp('testuser', 'test@example.com', 'password123', 'John', 'Doe', 'INVALID_TYPE')
    ).rejects.toThrow('Invalid user type: INVALID_TYPE');
    
    // Verify Auth.signUp was not called
    expect(Auth.signUp).not.toHaveBeenCalled();
  });

  test('signUp function should handle schema conformity error', async () => {
    // Import the actual function we want to test
    const { signUp } = require('../contexts/AuthContext').useAuth();
    
    // Mock the console.error function
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock Auth.signUp to throw a schema conformity error
    Auth.signUp.mockRejectedValueOnce({
      message: 'Attributes did not conform to the schema: Type for attribute {custom:user_type} could not be determined'
    });
    
    // Call the signUp function and expect it to throw
    await expect(
      signUp('testuser', 'test@example.com', 'password123', 'John', 'Doe', 'COACH')
    ).rejects.toEqual({
      message: 'Attributes did not conform to the schema: Type for attribute {custom:user_type} could not be determined'
    });
    
    // Verify that the error was logged
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock.calls[0][0]).toBe('Custom attribute schema error:');
    
    consoleSpy.mockRestore();
  });
});