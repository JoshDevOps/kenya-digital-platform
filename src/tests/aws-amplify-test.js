// Test file to verify aws-amplify module
try {
  const Amplify = require('aws-amplify');
  console.log('aws-amplify module is accessible');
} catch (error) {
  console.error('Error accessing aws-amplify module:', error.message);
}