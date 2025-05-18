// Test file to verify react-player module
try {
  const ReactPlayer = require('react-player');
  console.log('react-player module is accessible');
} catch (error) {
  console.error('Error accessing react-player module:', error.message);
}