#!/bin/bash

# SkillBridge Deployment Script

echo "🚀 Starting SkillBridge deployment..."

# Step 1: Install CDK dependencies
echo "📦 Installing CDK dependencies..."
cd infrastructure
npm install

# Step 2: Bootstrap CDK (only needed once per account/region)
echo "🔧 Bootstrapping CDK..."
cdk bootstrap

# Step 3: Deploy infrastructure
echo "🏗️ Deploying infrastructure..."
cdk deploy SkillBridgeStack --require-approval never

# Step 4: Get outputs and update environment
echo "📝 Getting deployment outputs..."
OUTPUTS=$(cdk output --json)

# Step 5: Deploy pipeline (optional)
echo "🔄 Deploying CI/CD pipeline..."
cdk deploy SkillBridgePipelineStack --require-approval never

echo "✅ Deployment complete!"
echo "📋 Next steps:"
echo "1. Update your .env file with the output values"
echo "2. Push to GitHub to trigger the pipeline"
echo "3. Your app will be available at the CloudFront URL"