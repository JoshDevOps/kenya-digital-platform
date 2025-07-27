// Test admin credentials for local development
export const TEST_ADMIN_ACCOUNTS = [
  {
    username: 'admin',
    email: 'admin@skillbridge.com',
    password: 'Admin123!',
    firstName: 'System',
    lastName: 'Administrator'
  },
  {
    username: 'josh',
    email: 'josh@skillbridge.com', 
    password: 'Josh123!',
    firstName: 'Josh',
    lastName: 'Admin'
  }
];

// Create test admin accounts in localStorage for local development
export const createTestAdmins = () => {
  const existingUsers = JSON.parse(localStorage.getItem('skillbridge_test_users') || '[]');
  
  TEST_ADMIN_ACCOUNTS.forEach(admin => {
    const userExists = existingUsers.find(u => u.username === admin.username);
    if (!userExists) {
      existingUsers.push({
        ...admin,
        userType: 'COACH', // Register as coach but with admin privileges
        createdAt: new Date().toISOString(),
        isTestAdmin: true
      });
    }
  });
  
  localStorage.setItem('skillbridge_test_users', JSON.stringify(existingUsers));
  console.log('Test admin accounts created:', TEST_ADMIN_ACCOUNTS.map(a => ({ username: a.username, password: a.password })));
};

// Check test admin credentials
export const validateTestAdmin = (username, password) => {
  const admin = TEST_ADMIN_ACCOUNTS.find(a => 
    a.username.toLowerCase() === username.toLowerCase() || 
    a.email.toLowerCase() === username.toLowerCase()
  );
  
  return admin && admin.password === password;
};