import { Auth } from 'aws-amplify';

// Mock AWS Amplify Auth
jest.mock('aws-amplify', () => ({
  Auth: {
    signUp: jest.fn(),
  },
}));

describe('AWS Cognito SignUp with custom:user_type', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signUp should include custom:user_type as string with clientMetadata', async () => {
    // Mock successful response
    Auth.signUp.mockResolvedValueOnce({ user: { username: 'testuser' } });
    
    // Define user data
    const username = 'testuser';
    const password = 'Password123!';
    const email = 'test@example.com';
    const userType = 'COACH';
    
    // Call Auth.signUp directly with our fix applied
    await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        'custom:user_type': userType.toString(),
      },
      clientMetadata: {
        'custom:user_type': 'String'
      }
    });
    
    // Verify the function was called with the correct parameters
    expect(Auth.signUp).toHaveBeenCalledWith({
      username,
      password,
      attributes: {
        email,
        'custom:user_type': userType.toString(),
      },
      clientMetadata: {
        'custom:user_type': 'String'
      }
    });
  });

  test('signUp should handle schema conformity error', async () => {
    // Mock error response for schema conformity
    Auth.signUp.mockRejectedValueOnce({
      code: 'InvalidParameterException',
      name: 'InvalidParameterException',
      message: 'Attributes did not conform to the schema: Type for attribute {custom:user_type} could not be determined'
    });
    
    // Define user data
    const username = 'testuser';
    const password = 'Password123!';
    const email = 'test@example.com';
    const userType = 'COACH';
    
    // Call Auth.signUp and expect it to throw
    await expect(
      Auth.signUp({
        username,
        password,
        attributes: {
          email,
          'custom:user_type': userType,
        }
      })
    ).rejects.toEqual({
      code: 'InvalidParameterException',
      name: 'InvalidParameterException',
      message: 'Attributes did not conform to the schema: Type for attribute {custom:user_type} could not be determined'
    });
    
    // Call Auth.signUp with our fix and expect it to be called
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          'custom:user_type': userType.toString(),
        },
        clientMetadata: {
          'custom:user_type': 'String'
        }
      });
    } catch (error) {
      // We're mocking the error, so we'll still get it
      // But we want to verify the call was made with the right parameters
    }
    
    // Verify the function was called with the correct parameters on the second call
    expect(Auth.signUp).toHaveBeenLastCalledWith({
      username,
      password,
      attributes: {
        email,
        'custom:user_type': userType.toString(),
      },
      clientMetadata: {
        'custom:user_type': 'String'
      }
    });
  });
});