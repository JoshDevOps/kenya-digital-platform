const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️ Deploying SkillBridge Infrastructure...');
console.log('📍 Working directory:', process.cwd());
console.log('⏰ Started at:', new Date().toLocaleString());

try {
  // Step 1: Check if we're in the right directory
  if (!fs.existsSync('infrastructure')) {
    throw new Error('Infrastructure directory not found. Are you in the project root?');
  }
  console.log('✅ Found infrastructure directory');

  // Step 2: Navigate to infrastructure directory
  process.chdir('infrastructure');
  console.log('📁 Changed to infrastructure directory');

  // Step 3: Install CDK dependencies
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing CDK dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ CDK dependencies installed');
  } else {
    console.log('✅ CDK dependencies already installed');
  }

  // Step 4: Bootstrap CDK (if needed)
  console.log('🚀 Checking CDK bootstrap status...');
  try {
    execSync('npx cdk bootstrap', { stdio: 'inherit' });
    console.log('✅ CDK bootstrap completed');
  } catch (error) {
    console.log('ℹ️ CDK already bootstrapped or bootstrap failed (continuing...)');
  }

  // Step 5: Deploy Step Functions stack
  console.log('🔄 Deploying Step Functions stack...');
  const deployStart = Date.now();
  execSync('npx cdk deploy StepFunctionsStack --require-approval never', { stdio: 'inherit' });
  const deployTime = ((Date.now() - deployStart) / 1000).toFixed(1);
  console.log(`✅ Step Functions stack deployed in ${deployTime}s`);

  // Step 6: Get stack outputs
  console.log('📋 Getting stack outputs...');
  try {
    const outputs = execSync('npx cdk list --json', { encoding: 'utf8' });
    console.log('✅ Stack outputs retrieved');
  } catch (error) {
    console.log('⚠️ Could not retrieve stack outputs (continuing...)');
  }

  console.log('\n🎉 Infrastructure deployment completed!');
  console.log('📋 Next steps:');
  console.log('1. Update your .env file with the new ARNs and bucket names');
  console.log('2. Run the main deployment script to deploy the frontend');
  console.log('⏰ Completed at:', new Date().toLocaleString());

} catch (error) {
  console.error('\n❌ Infrastructure deployment failed!');
  console.error('🔍 Error details:', error.message);
  
  if (error.message.includes('CDK')) {
    console.log('💡 Make sure AWS CDK is installed: npm install -g aws-cdk');
  } else if (error.message.includes('credentials')) {
    console.log('💡 Check your AWS credentials: aws configure');
  } else if (error.message.includes('bootstrap')) {
    console.log('💡 Try running: npx cdk bootstrap');
  }
  
  console.log('⏰ Failed at:', new Date().toLocaleString());
  process.exit(1);
}