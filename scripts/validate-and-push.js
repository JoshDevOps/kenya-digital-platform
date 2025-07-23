const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Running pre-push validation...');

try {
  // Step 1: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Step 2: Run build test
  console.log('🏗️ Testing build...');
  execSync('CI=false npm run build', { stdio: 'inherit' });

  // Step 3: Check if build directory exists
  if (!fs.existsSync('build')) {
    throw new Error('Build directory not created');
  }

  console.log('✅ Build successful!');

  // Step 4: Git operations
  console.log('📝 Adding changes to git...');
  execSync('git add .', { stdio: 'inherit' });

  console.log('💾 Committing changes...');
  const commitMessage = process.argv[2] || 'Fix import errors and update dependencies';
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  console.log('🚀 Pushing to GitHub...');
  execSync('git push origin master', { stdio: 'inherit' });

  console.log('🎉 Successfully validated and pushed!');
  console.log('📋 Pipeline will now deploy to: https://d3md2krnlhzrff.cloudfront.net');

} catch (error) {
  console.error('❌ Validation failed:', error.message);
  console.log('💡 Fix the errors above before pushing');
  process.exit(1);
}