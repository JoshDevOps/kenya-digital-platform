import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserTypeDebug = () => {
  const { currentUser, userAttributes } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-sm max-w-xs">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <p><strong>User:</strong> {userAttributes?.name || 'N/A'}</p>
      <p><strong>Email:</strong> {userAttributes?.email || 'N/A'}</p>
      <p><strong>User Type:</strong> {userAttributes?.['custom:user_type'] || 'Not set'}</p>
      <p><strong>Username:</strong> {currentUser.username || 'N/A'}</p>
    </div>
  );
};

export default UserTypeDebug;