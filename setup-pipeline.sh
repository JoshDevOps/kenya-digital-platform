#!/bin/bash

# Pipeline Setup Script

echo "🔧 Setting up CI/CD Pipeline..."

# Check if GitHub token exists
if ! aws secretsmanager describe-secret --secret-id github-token >/dev/null 2>&1; then
    echo "❌ GitHub token not found in Secrets Manager"
    echo "Please create a GitHub Personal Access Token with repo permissions"
    echo "Then run: aws secretsmanager create-secret --name github-token --secret-string 'your-token-here'"
    exit 1
fi

# Get GitHub username and repo
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name (default: kenya-digital-platform): " REPO_NAME
REPO_NAME=${REPO_NAME:-kenya-digital-platform}

# Update pipeline stack with GitHub details
sed -i "s/YOUR_GITHUB_USERNAME/$GITHUB_USERNAME/g" infrastructure/lib/pipeline-stack.ts
sed -i "s/kenya-digital-platform/$REPO_NAME/g" infrastructure/lib/pipeline-stack.ts

echo "✅ Pipeline configuration updated"
echo "📋 Next steps:"
echo "1. Commit and push your changes to GitHub"
echo "2. Deploy the pipeline: cd infrastructure && cdk deploy SkillBridgePipelineStack"
echo "3. Future pushes to main branch will trigger automatic deployment"