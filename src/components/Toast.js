import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';

const Toast = () => {
  const { darkMode } = useTheme();

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: darkMode ? '#1f2937' : '#ffffff',
          color: darkMode ? '#f3f4f6' : '#1f2937',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: darkMode ? '#1f2937' : '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: darkMode ? '#1f2937' : '#ffffff',
          },
        },
      }}
    />
  );
};

export default Toast;