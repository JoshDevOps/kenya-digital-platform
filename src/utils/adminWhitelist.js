// Admin whitelist - only these emails can access admin features
export const ADMIN_EMAILS = [
  'admin@skillbridge.com',
  'josh@skillbridge.com',
  'support@skillbridge.com',
  // Add more admin emails here
];

// Check if user is admin based on email whitelist
export const isAdminUser = (userEmail) => {
  if (!userEmail) return false;
  return ADMIN_EMAILS.includes(userEmail.toLowerCase());
};

// For local development, also allow these usernames
export const DEV_ADMIN_USERNAMES = [
  'admin',
  'josh',
  'test-admin'
];

export const isDevAdmin = (username) => {
  if (!username) return false;
  return DEV_ADMIN_USERNAMES.includes(username.toLowerCase());
};