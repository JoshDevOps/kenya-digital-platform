import React, { createContext, useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sign up function
  const signUp = async (username, email, password, firstName, lastName, userType) => {
    try {
      // Validate userType to ensure it's a valid value
      const validUserTypes = ['COACH', 'LEARNER', 'CHURCH', 'STUDENT'];
      if (!validUserTypes.includes(userType)) {
        throw new Error(`Invalid user type: ${userType}. Must be one of: ${validUserTypes.join(', ')}`);
      }

      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          given_name: firstName,
          family_name: lastName,
          // Explicitly specify the custom:user_type as a string attribute
          'custom:user_type': userType.toString(),
        },
        clientMetadata: {
          // Add client metadata to help with attribute type determination
          'custom:user_type': 'String'
        }
      });
      return user;
    } catch (error) {
      // Handle specific error for schema conformity
      if (error.message && error.message.includes('Attributes did not conform to the schema')) {
        console.error('Custom attribute schema error:', error);
        setError('There was an issue with the user type attribute. Please contact support.');
      } else {
        setError(error.message);
      }
      throw error;
    }
  };

  // Confirm sign up function
  const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in function
  const signIn = async (usernameOrEmail, password) => {
    try {
      const user = await Auth.signIn(usernameOrEmail, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await Auth.signOut();
      setCurrentUser(null);
      setUserAttributes(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      await Auth.forgotPassword(email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Confirm reset password function
  const confirmResetPassword = async (email, code, newPassword) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Get user attributes
  const getUserAttributes = async (user) => {
    try {
      const attributes = await Auth.userAttributes(user);
      const attributesObj = {};
      attributes.forEach(attribute => {
        attributesObj[attribute.Name] = attribute.Value;
      });
      setUserAttributes(attributesObj);
      return attributesObj;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Effect to check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
        await getUserAttributes(user);
      } catch (error) {
        // User is not authenticated
        setCurrentUser(null);
        setUserAttributes(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Context value
  const value = {
    currentUser,
    userAttributes,
    loading,
    error,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    resetPassword,
    confirmResetPassword,
    getUserAttributes,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;