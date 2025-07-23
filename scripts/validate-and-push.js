const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Running pre-push validation...');
console.log('📍 Working directory:', process.cwd());
console.log('⏰ Started at:', new Date().toLocaleString());

try {
  // Step 1: Check if package.json exists
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json not found. Are you in the right directory?');
  }
  console.log('✅ Found package.json');

  // Step 2: Install dependencies (skip if node_modules exists and is recent)
  const nodeModulesExists = fs.existsSync('node_modules');
  const packageLockExists = fs.existsSync('package-lock.json');
  
  if (!nodeModulesExists || !packageLockExists) {
    console.log('📦 Installing dependencies...');
    console.log('⚠️  This may take a few minutes...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } else {
    console.log('✅ Dependencies already installed, skipping npm install');
  }

  // Step 3: Run build test with verbose output
  console.log('🏗️ Testing build...');
  console.log('📝 Running: npm run build');
  
  const buildStart = Date.now();
  execSync('npm run build', { stdio: 'inherit', env: { ...process.env, CI: 'false' } });
  const buildTime = ((Date.now() - buildStart) / 1000).toFixed(1);
  
  console.log(`✅ Build completed in ${buildTime}s`);

  // Step 4: Verify build output
  if (!fs.existsSync('build')) {
    throw new Error('Build directory not created');
  }
  
  const buildFiles = fs.readdirSync('build');
  console.log(`✅ Build directory created with ${buildFiles.length} files/folders`);
  
  if (!fs.existsSync('build/index.html')) {
    throw new Error('index.html not found in build directory');
  }
  console.log('✅ index.html found in build');

  // Step 5: Git operations
  console.log('📝 Adding changes to git...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Check if there are changes to commit
  try {
    execSync('git diff --cached --exit-code', { stdio: 'pipe' });
    console.log('ℹ️  No changes to commit');
    return;
  } catch {
    console.log('✅ Changes detected, proceeding with commit');
  }

  console.log('💾 Committing changes...');
  const commitMessage = process.argv[2] || 'Fix import errors and update dependencies';
  console.log(`📝 Commit message: "${commitMessage}"`);
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  console.log('✅ Changes committed');

  console.log('🚀 Pushing to GitHub...');
  execSync('git push origin master', { stdio: 'inherit' });
  console.log('✅ Successfully pushed to GitHub');

  console.log('\n🎉 Validation and deployment initiated!');
  console.log('📋 Monitor pipeline at: AWS Console → CodePipeline → skillbridge-pipeline');
  console.log('🌐 App will be live at: https://d3md2krnlhzrff.cloudfront.net');
  console.log('⏰ Completed at:', new Date().toLocaleString());

} catch (error) {
  console.error('\n❌ Validation failed!');
  console.error('🔍 Error details:', error.message);
  
  if (error.message.includes('npm install')) {
    console.log('💡 Try running: npm install manually');
  } else if (error.message.includes('build')) {
    console.log('💡 Try running: npm run build manually to see detailed errors');
  } else if (error.message.includes('git')) {
    console.log('💡 Check git status and resolve any conflicts');
  }
  
  console.log('⏰ Failed at:', new Date().toLocaleString());
  process.exit(1);
}