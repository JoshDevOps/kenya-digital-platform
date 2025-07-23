const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Extracting environment variables from CDK outputs...');

try {
  // Get CDK outputs
  const outputs = JSON.parse(execSync('cd infrastructure && cdk output --json', { encoding: 'utf8' }));
  
  const stackOutputs = outputs.SkillBridgeStack || {};
  
  // Create .env file content
  const envContent = `# AWS Configuration - Generated from CDK deployment
REACT_APP_AWS_REGION=${process.env.CDK_DEFAULT_REGION || 'us-east-1'}
REACT_APP_USER_POOL_ID=${stackOutputs.UserPoolId || ''}
REACT_APP_USER_POOL_CLIENT_ID=${stackOutputs.UserPoolClientId || ''}
REACT_APP_IDENTITY_POOL_ID=${stackOutputs.IdentityPoolId || ''}
REACT_APP_GRAPHQL_ENDPOINT=${stackOutputs.GraphQLAPIURL || ''}
REACT_APP_UPLOADS_BUCKET=skillbridge-uploads-${process.env.CDK_DEFAULT_ACCOUNT || 'your-account'}
REACT_APP_WEBSITE_URL=${stackOutputs.WebsiteURL || ''}
`;

  // Write to .env file
  fs.writeFileSync('.env', envContent);
  
  console.log('✅ Environment variables written to .env file');
  console.log('📋 Configuration:');
  console.log(envContent);
  
} catch (error) {
  console.error('❌ Error extracting environment variables:', error.message);
  console.log('💡 Make sure you have deployed the infrastructure first');
}